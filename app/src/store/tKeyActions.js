import log from 'loglevel'

import router from '../router'
import torus from '../torus'
import { ACCOUNT_TYPE, THRESHOLD_KEY_QUESTION_INPUT, THRESHOLD_KEY_STORE_DEVICE_FLOW } from '../utils/enums'

const { torusController } = torus || {}
const { thresholdKeyController } = torusController || {}

export default {
  async addTKey({ dispatch }, { postboxKey, calledFromEmbed }) {
    const thresholdKey = await thresholdKeyController.login(postboxKey.privKey)
    log.info('tkey 2', thresholdKey)
    return dispatch('initTorusKeyring', { keys: [{ ...thresholdKey, accountType: ACCOUNT_TYPE.THRESHOLD }], calledFromEmbed, rehydrate: false })
  },
  async createNewTKey({ state, dispatch }, payload) {
    const thresholdKey = await thresholdKeyController.createNewTKey({ postboxKey: state.wallet[state.selectedAddress].privateKey, ...payload })
    log.info('tkey 2', thresholdKey)
    await dispatch('initTorusKeyring', {
      keys: [{ ...thresholdKey, accountType: ACCOUNT_TYPE.THRESHOLD }],
      calledFromEmbed: false,
      rehydrate: false,
    })
    dispatch('updateSelectedAddress', { selectedAddress: thresholdKey.ethAddress }) // synchronous
  },
  addPassword(_, payload) {
    return thresholdKeyController.addPassword(payload)
  },
  changePassword(_, payload) {
    return thresholdKeyController.changePassword(payload)
  },
  downloadShare(_, payload) {
    return thresholdKeyController.downloadShare(payload)
  },
  showThresholdKeyUi(_, payload) {
    const { type, data: { id } = {} } = payload
    log.info(id, type, router)
    if (type === THRESHOLD_KEY_QUESTION_INPUT) {
      router.push({ name: 'tkeyInputPassword', query: { type, id, ...router.currentRoute.query } })
    } else if (type === THRESHOLD_KEY_STORE_DEVICE_FLOW) {
      router.push({ name: 'tkeyInputDevice', query: { type, id, ...router.currentRoute.query } })
    }
  },
  setSecurityQuestionShareFromUserInput(_, payload) {
    const { id, password } = payload
    thresholdKeyController.setSecurityQuestionShareFromUserInput(id, { password })
  },
}
