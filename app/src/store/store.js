import Vue from 'vue'
import Vuex from 'vuex'
import log from 'loglevel'
import torus from '../torus'
import config from '../config'
import VuexPersist from 'vuex-persist'
import { hexToText } from '../utils/utils'

Vue.use(Vuex)

const vuexPersist = new VuexPersist({
  key: 'my-app',
  storage: window.sessionStorage,
  reducer: state => {
    return { ...state, popupVisible: false }
  }
})

var VuexStore = new Vuex.Store({
  plugins: [vuexPersist.plugin],
  state: {
    email: '',
    idToken: '',
    wallet: {},
    weiBalance: 0,
    selectedAddress: '',
    networkId: 0
  },
  getters: {},
  mutations: {
    setEmail(state, email) {
      state.email = email
    },
    setIdToken(state, idToken) {
      state.idToken = idToken
    },
    setWallet(state, wallet) {
      state.wallet = wallet
    },
    setWeiBalance(state, weiBalance) {
      state.weiBalance = weiBalance
    },
    setSelectedAddress(state, selectedAddress) {
      state.selectedAddress = selectedAddress
    },
    setNetworkId(state, networkId) {
      state.networkId = networkId
    }
  },
  actions: {
    showPopup(context, payload) {
      var bc = new BroadcastChannel(`torus_channel_${torus.instanceId}`)
      window.open(
        `/confirm?instanceId=${torus.instanceId}`,
        '_blank',
        'directories=0,titlebar=0,toolbar=0,status=0,location=0,menubar=0,height=350,width=600'
      )
      if (isTorusTransaction()) {
        var txParams = getTransactionParams()
        var balance = window.Vue.torus.web3.utils.fromWei(this.state.weiBalance.toString())
        bc.onmessage = function(ev) {
          if (ev.data === 'popup-loaded') {
            bc.postMessage({
              origin: window.location.ancestorOrigins ? window.location.ancestorOrigins[0] : document.referrer,
              type: 'transaction',
              txParams,
              balance
            })
            bc.close()
          }
        }
      } else {
        var msgParams = getLatestMessageParams()
        bc.onmessage = function(ev) {
          if (ev.data === 'popup-loaded') {
            bc.postMessage({
              origin: window.location.ancestorOrigins ? window.location.ancestorOrigins[0] : document.referrer,
              type: 'message',
              msgParams
            })
            bc.close()
          }
        }
      }
    },
    showNetworkChangePopup(context, payload) {
      var bc = new BroadcastChannel('torus_network_channel')
      window.open('/networkChange', '_blank', 'directories=0,titlebar=0,toolbar=0,status=0,location=0,menubar=0,height=350,width=600')
      bc.onmessage = function(ev) {
        if (ev.data === 'popup-loaded') {
          bc.postMessage({
            origin: window.location.ancestorOrigins ? window.location.ancestorOrigins[0] : document.referrer,
            network: payload.network
          })
          bc.close()
        }
      }
    },
    updateEmail(context, payload) {
      context.commit('setEmail', payload.email)
    },
    updateIdToken(context, payload) {
      context.commit('setIdToken', payload.idToken)
    },
    addWallet(context, payload) {
      if (payload.ethAddress) {
        context.commit('setWallet', { ...context.state.wallet, [payload.ethAddress]: payload.privKey })
      }
    },
    removeWallet(context, payload) {
      if (payload.ethAddress) {
        var stateWallet = { ...context.state.wallet }
        delete stateWallet[payload.ethAddress]
        context.commit('setWallet', { ...stateWallet })
        if (context.state.balance[payload.ethAddress]) {
          var stateBalance = { ...context.state.balance }
          delete stateBalance[payload.ethAddress]
          context.commit('setBalance', { ...stateBalance })
        }
      }
    },
    updateWeiBalance(context, payload) {
      if (this.state.selectedAddress) {
        torus.web3.eth.getBalance(this.state.selectedAddress, function(err, res) {
          if (err) {
            log.error(err)
          }
          context.commit('setWeiBalance', res)
        })
      }
    },
    updateSelectedAddress(context, payload) {
      context.commit('setSelectedAddress', payload.selectedAddress)
      torus.updateStaticData({ selectedAddress: payload.selectedAddress })
    },
    updateNetworkId(context, payload) {
      context.commit('setNetworkId', payload.networkId)
      torus.updateStaticData({ networkId: payload.networkId })
    },
    setProviderType(context, payload) {
      torus.torusController.networkController.setProviderType(payload.network)
    },
    triggerLogin: function(context, payload) {
      if (window.auth2 === undefined) {
        log.error('Could not find window.auth2, might not be loaded yet')
        return
      }
      window.auth2.signIn().then(function(googleUser) {
        log.info('GOOGLE USER: ', googleUser)
        let profile = googleUser.getBasicProfile()
        // console.log(googleUser)
        log.info('ID: ' + profile.getId()) // Do not send to your backend! Use an ID token instead.
        log.info('Name: ' + profile.getName())
        log.info('Image URL: ' + profile.getImageUrl())
        log.info('Email: ' + profile.getEmail()) // This is null if the 'email' scope is not present.

        VuexStore.dispatch('updateIdToken', { idToken: googleUser.getAuthResponse().id_token })
        let email = profile.getEmail()
        VuexStore.dispatch('updateEmail', { email })
        window.gapi.auth2
          .getAuthInstance()
          .disconnect()
          .then(handleLogin(email, payload))
          .catch(function(err) {
            log.error(err)
          })
      })
    }
  }
})

function handleLogin(email, payload) {
  torus.getPubKeyAsync(torus.web3, config.torusNodeEndpoints, email, function(err, res) {
    if (err) {
      log.error(err)
    } else {
      log.info('New private key assigned to user at address ', res)
      torus.retrieveShares(config.torusNodeEndpoints, VuexStore.state.email, VuexStore.state.idToken, function(err, data) {
        if (err) {
          log.error(err)
        }
        VuexStore.dispatch('updateSelectedAddress', { selectedAddress: data.ethAddress })
        VuexStore.dispatch('addWallet', data)
        // continue enable function
        var ethAddress = data.ethAddress
        if (payload.calledFromEmbed) {
          setTimeout(function() {
            torus.continueEnable(ethAddress)
          }, 50)
        }
        torus.torusController.initTorusKeyring([data.privKey])
        const statusStream = torus.communicationMux.getStream('status')
        statusStream.write({ loggedIn: true })
        // torus.web3.eth.net
        //   .getId()
        //   .then(res => {
        //     VuexStore.dispatch('updateNetworkId', { networkId: res })
        //     // publicConfigOutStream.write(JSON.stringify({networkVersion: res}))
        //   })
        //   .catch(e => log.error(e))
      })
    }
  })
}

function getTransactionParams() {
  const torusController = window.Vue.torus.torusController
  const state = torusController.getState()
  const transactions = []
  for (let id in state.transactions) {
    if (state.transactions[id].status === 'unapproved') {
      transactions.push(state.transactions[id])
    }
  }
  return transactions[0].txParams
}

function getLatestMessageParams() {
  const torusController = window.Vue.torus.torusController
  const state = torusController.getState()
  let time = 0
  let msg = null
  for (let id in state.unapprovedMsgs) {
    const msgTime = state.unapprovedMsgs[id].time
    if (msgTime > time) {
      msg = state.unapprovedMsgs[id]
      time = msgTime
    }
  }
  
  for (let id in state.unapprovedPersonalMsgs) {
    const msgTime = state.unapprovedPersonalMsgs[id].time
    if (msgTime > time) {
      msg = state.unapprovedPersonalMsgs[id]
      time = msgTime
    }
  }

  // handle hex-based messages and convert to text
  if (msg) {
    msg.msgParams.message = hexToText(msg.msgParams.data)
  } 

  // handle typed messages
  for (let id in state.unapprovedTypedMessages) {
    console.log(id)
    const msgTime = state.unapprovedTypedMessages[id].time
    if (msgTime > time) {
      time = msgTime
      msg = state.unapprovedTypedMessages[id]
      msg.msgParams.typedMessages = msg.msgParams.data // TODO: use for differentiating msgs later on
    }
  }
  return msg ? msg.msgParams : {}
}

function isTorusTransaction() {
  let torusController = window.Vue.torus.torusController
  let state = torusController.getState()
  if (Object.keys(state.unapprovedPersonalMsgs).length > 0) {
    return false
  } else if (Object.keys(state.unapprovedMsgs).length > 0) {
    return false
  } else if (Object.keys(state.unapprovedTypedMessages).length > 0) {
    return false
  } else if (Object.keys(state.transactions).length > 0) {
    for (let id in state.transactions) {
      if (state.transactions[id].status === 'unapproved') {
        return true
      }
    }
  } else {
    throw new Error('No new transactions.')
  }
}

export default VuexStore
