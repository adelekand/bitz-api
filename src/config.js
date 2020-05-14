module.exports = {
  baseURL: 'https://apiv2.bitz.com/',
  requestHeader: {
    MARKET: { "Content-Type": "application/json" },
    EXCHANGE: { "Content-Type": "application/x-www-form-urlencoded" }
  },
  endpoints: {
    // Market endpoints
    GET_CURRENCY_RATE: '/Market/currencyRate',
    GET_CURRENCY_COIN_RATE: '/Market/currencyCoinRate',
    GET_COIN_RATE: '/Market/coinRate',
    GET_SERVER_TIME: '/Market/getServerTime',
    GET_TRADE_SUMMARY: '/Market/ticker',
    GET_ALL_TRADE_SUMMARY: '/Market/tickerall',
    GET_MARKET_DEPTH: '/Market/depth',
    GET_LAST_TRADE: '/Market/order',
    GET_KLINE: '/Market/kline',
    GET_AVALIABLE_CURRENCIES: '/Market/symbolList',
    GET_SYMBOL_LIST_RATE: '/Market/symbolListRate',

    // Trade endpoints
    GET_USER_ADDRESS: '/Assets/getUserAssets',
    GET_COIN_ADDRESS: '/Trade/getCoinAddress',
    GET_COIN_ADDRESS_LIST: '/Trade/getCoinAddressList',
    COIN_OUT: '/Trade/coinOut',
  },
};
