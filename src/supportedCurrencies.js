import { BANXA, MERCURYO, MOONPAY, RAMPNETWORK, SIMPLEX, TRANSAK, XANPOOL } from './utils/enums'

/**
 * From https://min-api.cryptocompare.com/data/v2/pair/mapping/fsym?fsym=BTC&extraParams=YourSite
 * GET https://min-api.cryptocompare.com/data/v2/pair/mapping/fsym?fsym=BTC
 * Then map over returned entries, picking tsym
 *
 * Last updated: Date of commit
 */
export const CRYPTO_COMPARE_CURRENCIES = [
  'ETH',
  'USDT',
  'USDC',
  'TUSD',
  'EOSDT',
  'USD',
  'DAI',
  'GUSD',
  'DKKT',
  'PAX',
  'ILS',
  'RUB',
  'BYN',
  'EUR',
  'GBP',
  'JPY',
  'KRW',
  'PLN',
  'MXN',
  'AUD',
  'BRL',
  'CAD',
  'CHF',
  'KPW',
  'LAK',
  'LBP',
  'LKR',
  'XOF',
  'CNHT',
  'DOGE',
  'UAH',
  'TRY',
  'HKD',
  'XJP',
  'SGD',
  'USC',
  'NZD',
  'NGN',
  'RUR',
  'COP',
  'GHS',
  'EGP',
  'IDR',
  'BHD',
  'CRC',
  'PEN',
  'AED',
  'DOP',
  'PKR',
  'HUF',
  'VND',
  'XAR',
  'LTC',
  'RON',
  'OMR',
  'MYR',
  'DKK',
  'UGX',
  'ZMW',
  'SAR',
  'SEK',
  'GEL',
  'RWF',
  'IRR',
  'TZS',
  'CNY',
  'VEF',
  'BDT',
  'HRK',
  'CLP',
  'THB',
  'XAF',
  'ARS',
  'UYU',
  'SZL',
  'KZT',
  'NOK',
  'KES',
  'PAB',
  'INR',
  'CZK',
  'MAD',
  'TWD',
  'PHP',
  'ZAR',
  'BOB',
  'CDF',
  'DASH',
  'VES',
  'ISK',
  'MWK',
  'BAM',
  'TTD',
  'XRP',
  'JOD',
  'RSD',
  'HNL',
  'BGN',
  'GTQ',
  'BWP',
  'XMR',
  'MMK',
  'QAR',
  'AOA',
  'KWD',
  'MUR',
  'WUSD',
  'WEUR',
  'WAVES',
  'WTRY',
  'LRD',
  'LSL',
  'LYD',
  'AWG',
  'MDL',
  'BTO',
  'EURS',
  'CHFT',
  'MKD',
  'MNT',
  'MOP',
  'MRO',
  'MVR',
  'VOLLAR',
  'CKUSD',
  'KHR',
  'VUV',
  'BITCNY',
  'QC',
  'BBD',
  'NAD',
  'NPR',
  'PGK',
  'PYG',
  'BIF',
  'BMD',
  'BND',
  'XLM',
  'BNB',
  'SCR',
  'BAT',
  'CRO',
  'HT',
  'KCS',
  'LEO',
  'LINK',
  'MKR',
  'NPXS',
  'OMG',
  'REP',
  'ZB',
  'ZIL',
  'ZRX',
  'BCH',
  'BZD',
  'CUP',
  'CVE',
  'DJF',
  'DZD',
  'ERN',
  'ETB',
  'FJD',
  'FKP',
  'BUSD',
  'ANCT',
  'ALL',
  'AMD',
  'ANG',
  'CNYX',
  'IQD',
  'UZS',
  'TND',
  'GGP',
  'XAU',
  'KGS',
  'GIP',
  'JMD',
  'ZEC',
  'USDP',
  'BSV',
  'EMC2',
  'SNT',
  'GTO',
  'POWR',
  'EUSD',
  'EURT',
  'BCY',
  'BTS',
  'ATM',
  'BLOCKPAY',
  'ARDR',
  'AMP',
  'B2X',
  'BITGOLD',
  'BITEUR',
  'ATB',
  'BITUSD',
  'AGRS',
  'DFXT',
  'HIKEN',
  'BIX',
  'KNC',
  'EOS',
  'COB',
  'COSS',
  'BMH',
  'NANO',
  'BDG',
  'BNT',
  'XVG',
  'LKK1Y',
  'LKK',
  'USDK',
  'EURN',
  'NZDT',
  'JSE',
  'GMD',
  'GNF',
  'GYD',
  'YER',
  'XPF',
  'HTG',
  'SLL',
  'SOS',
  'WST',
  'SVC',
  'SYP',
  'NEO',
  'KMF',
  'JUMP',
  'AYA',
  'BLAST',
  'WGR',
  'BCN',
  'BTG',
  'URALS',
  'INN',
  'USDQ',
  'CNH',
  'HUSD',
  'BKRW',
  'NZDX',
  'EURX',
  'CADX',
  'USDEX',
  'JPYX',
  'AUDX',
  'VNDC',
  'EON',
  'GBPX',
  'CHFX',
  'USDJ',
  'IDRT',
  'USDS',
  'USDN',
  'BIDR',
  'IDK',
  'BSD',
  'BTN',
  'KYD',
  'NIO',
  'SBD',
  'SDG',
  'SHP',
  'TOP',
  'XCD',
  'XCHF',
  'CNYT',
  'GYEN',
  'ZUSD',
  'GOLD',
  'TRX',
  'TRYB',
  'PLATC',
  'STRAX',
  'UST',
  'GLM',
  'VAI',
  'BRZ',
  'DDRST',
  'XAUT',
  'MIM',
]

/**
 * currencies supported by the payment provider
 * Last updated: Date of commit
 */
const PROVIDER_SUPPORTED_FIAT_CURRENCIES = {
  // https://integrations.simplex.com/supported_currencies
  [SIMPLEX]: [
    'ALL',
    'ARS',
    'AMD',
    'AUD',
    'AZN',
    'BHD',
    'BDT',
    'BBD',
    'BYN',
    'BMD',
    'BOB',
    'BAM',
    'BWP',
    'BRL',
    'GBP',
    'BND',
    'BGN',
    'KHR',
    'CAD',
    'KYD',
    'CLP',
    'CNY',
    'COP',
    'CRC',
    'HRK',
    'CZK',
    'DKK',
    'DJF',
    'DOP',
    'EGP',
    'EUR',
    'GEL',
    'GHS',
    'GTQ',
    'HNL',
    'HKD',
    'HUF',
    'ISK',
    'INR',
    'IDR',
    'IQD',
    'ILS',
    'XOF',
    'JMD',
    'JPY',
    'JOD',
    'KZT',
    'KES',
    'KWD',
    'KGS',
    'LBP',
    'MOP',
    'MYR',
    'MUR',
    'MXN',
    'MDL',
    'MNT',
    'MAD',
    'MZN',
    'NAD',
    'ANG',
    'TWD',
    'NZD',
    'NGN',
    'MKD',
    'NOK',
    'OMR',
    'PKR',
    'PAB',
    'PGK',
    'PYG',
    'PEN',
    'UYU',
    'PHP',
    'PLN',
    'QAR',
    'XAF',
    'RON',
    'RUB',
    'SAR',
    'RSD',
    'SGD',
    'SOS',
    'ZAR',
    'KRW',
    'LKR',
    'SEK',
    'CHF',
    'TZS',
    'THB',
    'TTD',
    'TRY',
    'UGX',
    'UAH',
    'AED',
    'USD',
    'UZS',
    'VND',
    'ZMW',
  ],
  // https://support.moonpay.com/hc/en-gb/articles/360011931457-Which-fiat-currencies-are-supported-
  [MOONPAY]: [
    'AUD',
    'BGN',
    'BRL',
    'CAD',
    'CHF',
    'CNY',
    'COP',
    'CZK',
    'DKK',
    'DOP',
    'EGP',
    'EUR',
    'GBP',
    'HKD',
    'HRK',
    'IDR',
    'ILS',
    'JPY',
    'JOD',
    'KES',
    'KRW',
    'KWD',
    'LKR',
    'MAD',
    'MXN',
    'MYR',
    'NGN',
    'NOK',
    'NZD',
    'OMR',
    'PEN',
    'PKR',
    'PLN',
    'RON',
    'RUB',
    'SEK',
    'SGD',
    'THB',
    'TRY',
    'TWD',
    'USD',
    'VND',
    'ZAR',
  ],
  // https://support.ramp.network/en/articles/471-supported-fiat-currencies
  [RAMPNETWORK]: [
    'USD',
    'EUR',
    'GBP',
    'BMD',
    'BAM',
    'BWP',
    'BRL',
    'BGN',
    'COP',
    'CRC',
    'CZK',
    'DKK',
    'DOP',
    'GEL',
    'GTQ',
    'HNL',
    'HUF',
    'ISK',
    'INR',
    'ILS',
    'KZT',
    'KES',
    'KWD',
    'LAK',
    'MKD',
    'MYR',
    'MXN',
    'MDL',
    'MZN',
    'NZD',
    'NGN',
    'PYG',
    'PEN',
    'PLN',
    'RON',
    'RSD',
    'SGD',
    'ZAR',
    'LKR',
    'SEK',
    'CHF',
    'TJS',
    'THB',
    'UYU',
  ],
  // From https://xanpool.com/ fiat select dropdown
  [XANPOOL]: ['SGD', 'HKD', 'THB', 'PHP', 'INR', 'IDR', 'MYR', 'AUD', 'NZD', 'KRW'],
  // https://help.mercuryo.io/en/articles/6121246-which-fiat-currencies-are-supported
  // RUB / UAH currently not supported
  [MERCURYO]: [
    'EUR',
    'USD',
    'GBP',
    'TRY',
    'JPY',
    'BRL',
    'NGN',
    'VND',
    'MXN',
    'KRW',
    'PLN',
    'SEK',
    'CHF',
    'CAD',
    'CZK',
    'DKK',
    'BGN',
    'HKD',
    'AUD',
    'INR',
  ],
  /**
   * https://support.transak.com/hc/en-us/articles/360020615578-Credit-and-Debit-Card-Payments-through-Transak
   * or
   * https://transak.stoplight.io/docs/transak-docs/b3A6OTk1ODQ0-2-get-fiat-currencies
   */
  [TRANSAK]: [
    'ARS',
    'AUD',
    'BBD',
    'BGN',
    'BMD',
    'BRL',
    'CAD',
    'CHF',
    'CLP',
    'CRC',
    'CZK',
    'DKK',
    'DOP',
    'EUR',
    'FJD',
    'FKP',
    'GBP',
    'GIP',
    'HRK',
    'HUF',
    'IDR',
    'ILS',
    'ISK',
    'JMD',
    'JPY',
    'KES',
    'KRW',
    'MDL',
    'MXN',
    'MYR',
    'NOK',
    'NZD',
    'PEN',
    'PHP',
    'PLN',
    'PYG',
    'RON',
    'SEK',
    'SGD',
    'THB',
    'TRY',
    'TZS',
    'USD',
    'ZAR',
  ],
  [BANXA]: ['AUD', 'CAD', 'CZK', 'DKK', 'EUR', 'GBP', 'HKD', 'JPY', 'NOK', 'NZD', 'NZD', 'PLN', 'RUB', 'SEK', 'SGD', 'TRY', 'USD'],
}

const cryptoCompareCurrenciesSet = new Set(CRYPTO_COMPARE_CURRENCIES)
/**
 * Fiat currencies that we support
 */
export function supportedFiatCurrencies(provider) {
  const providerSupportedFiatCurrencies = PROVIDER_SUPPORTED_FIAT_CURRENCIES[provider]
  return providerSupportedFiatCurrencies.filter((currency) => cryptoCompareCurrenciesSet.has(currency))
}

// TODO use symbols for currencies
