const marketEndpointPrefix = '/Market';
const tradeEndpointPrefix = '/Trade';

module.exports = {
  baseURL: 'https://apiv2.bitz.com/',
  requestHeader: {
    MARKET: { "Content-Type": "application/json" },
    EXCHANGE: { "Content-Type": "application/x-www-form-urlencoded" }
  },
  endpoints: {
    // Market endpoints
    GET_CURRENCY_RATE: `${marketEndpointPrefix}/currencyRate`,
    GET_CURRENCY_COIN_RATE: `${marketEndpointPrefix}/currencyCoinRate`,
    GET_COIN_RATE: `${marketEndpointPrefix}/coinRate`,
    GET_SERVER_TIME: `${marketEndpointPrefix}/getServerTime`,
    GET_TRADE_SUMMARY: `${marketEndpointPrefix}/ticker`,
    GET_ALL_TRADE_SUMMARY: `${marketEndpointPrefix}/tickerall`,
    GET_MARKET_DEPTH: `${marketEndpointPrefix}/depth`,
    GET_LAST_TRADE: `${marketEndpointPrefix}/order`,
    GET_KLINE: `${marketEndpointPrefix}/kline`,
    GET_AVALIABLE_CURRENCIES: `${marketEndpointPrefix}/symbolList`,
    GET_SYMBOL_LIST_RATE: `${marketEndpointPrefix}/symbolListRate`,
    GET_CONTRACT_COIN: `${marketEndpointPrefix}/getContractCoin`,
    GET_CONTRACT_ORDER_BOOK: `${marketEndpointPrefix}/getContractOrderBook`,
    GET_CONTRACT_TRADE_HISTORY: `${marketEndpointPrefix}/getContractTradesHistory`,
    GET_CONTRACT_TICKERS: `${marketEndpointPrefix}/getContractTickers`,
    GET_CONTRACT_KLINE: `${marketEndpointPrefix}/getContractKline`,

    // Trade endpoints
    GET_USER_ADDRESS: '/Assets/getUserAssets',
    GET_COIN_ADDRESS: `${tradeEndpointPrefix}/getCoinAddress`,
    GET_COIN_ADDRESS_LIST: `${tradeEndpointPrefix}/getCoinAddressList`,
    COIN_OUT: `${tradeEndpointPrefix}/coinOut`,
    ADD_ENTRUST_SHEET: `${tradeEndpointPrefix}/addEntrustSheet`,
    GET_USER_ENTRUST_SHEET: `${tradeEndpointPrefix}/getUserNowEntrustSheet`,
    GET_USER_ENTRUST_SHEET_INFO: `${tradeEndpointPrefix}/getEntrustSheetInfo`,
    GET_USER_HISTORY_ENTRUST_SHEET: `${tradeEndpointPrefix}/getUserHistoryEntrustSheet`,
    CANCEL_ENTRUST_SHEET: `${tradeEndpointPrefix}/cancelEntrustSheet`,
    CANCEL_ALL_ENTRUST_SHEET: `${tradeEndpointPrefix}/cancelAllEntrustSheet`,
    SUBMIT_MARKET_TRADE: `${tradeEndpointPrefix}/MarketTrade`,
  },
};
