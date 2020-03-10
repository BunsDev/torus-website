import { LOCALE_EN, ROPSTEN, ROPSTEN_CODE, ROPSTEN_DISPLAY_NAME, THEME_LIGHT_BLUE_NAME, USER_INFO_REQUEST_NEW } from '../utils/enums'

const initialState = {
  userInfo: {
    name: '', // first + last name
    profileImage: '', // image url
    email: '',
    verifier: '', // enum like GOOGLE
    verifierId: '', // usually email or facebook id
    verifierParams: {} // general params
  },
  // loaders
  loginInProgress: false,
  weiBalanceLoaded: false, // Use on showing spinners
  tokenDataLoaded: false, // Use on showing spinners
  loadingUserTransactions: true,
  isNewUser: false,
  // account handled
  wallet: {}, // Account specific object
  weiBalance: {}, // Account specific object
  networkId: 0,
  networkType: { host: ROPSTEN, chainId: ROPSTEN_CODE, networkName: ROPSTEN_DISPLAY_NAME },
  currencyData: {},
  tokenData: {}, // Account specific object
  assets: {}, // Account specific object
  tokenRates: {},
  transactions: [],
  unapprovedTypedMessages: {},
  unapprovedPersonalMsgs: {},
  unapprovedMsgs: {},

  // preferences
  selectedAddress: '',
  selectedEOA: '',
  jwtToken: '',

  selectedCurrency: 'USD',
  pastTransactions: [],
  paymentTx: [],
  theme: THEME_LIGHT_BLUE_NAME,
  locale: LOCALE_EN,
  billboard: [],
  contacts: [],
  permissions: [],
  userInfoAccess: USER_INFO_REQUEST_NEW, // deprecate
  errorMsg: '',
  successMsg: '',
  iframeMetadata: { origin: '', name: '', icon: '' }
}

export default initialState
