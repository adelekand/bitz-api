module.exports = {
  baseURL: 'https://apiv2.bitz.com/',
  requestHeader: {
    MARKET: { "Content-Type": "application/json" },
    EXCHANGE: { "Content-Type": "application/x-www-form-urlencoded" }
  },
  endpoints: {
    GET_COIN_RATE: '/Market/coinRate',
    GET_CURRENCY_RATE: '/Market/currencyRate',
    GET_CURRENCY_COIN_RATE: '/Market/currencyCoinRate',
    GET_SERVER_TIME: '/Market/getServerTime',
    GET_USER_ADDRESS: '/Assets/getUserAssets',
    GET_COIN_ADDRESS: '/Trade/getCoinAddress',
    GET_COIN_ADDRESS_LIST: '/Trade/getCoinAddressList'
  },
};
