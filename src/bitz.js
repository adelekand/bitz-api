const CryptoJS = require("crypto-js");
const queryString = require("query-string");
const { marketRequest, tradeRequest } = require("./httpRequest");
const { endpoints } = require("./config");

/**
 * bitz-api
 * @constructor
 */
function Bitz() {
  this.config = {};
}

/**
 * Set Config
 * @param {object} config - { apiKey: String, apiSecret: String, tradePassword: String }.
 */
Bitz.prototype.setConfig = function (config) {
  this.config = config;
};


// MARKET ENDPOINT



/**
 * Get currency rate
 * @param {string} symbols - currency symbol pairs (e.g cny_usdt,usdt_cny).
 */
Bitz.prototype.getCurrencyRate = async function (symbols) {
  return await marketRequest(endpoints.GET_CURRENCY_RATE, { symbols });
};

/**
 * Get currency coin rate
 * @param {string} symbols - currency symbols (e.g btc,usdt,eth).
 */
Bitz.prototype.getCurrencyCoinRate = async function (coins) {
  return await marketRequest(endpoints.GET_CURRENCY_COIN_RATE, { coins });
};

/**
 * Get coin rate data
 * @param {string} coin - coin symbol (e.g usdt).
 */
Bitz.prototype.getCoinRate = async function (coins) {
  return await marketRequest(endpoints.GET_COIN_RATE, { coins });
};

/**
 * Obtain the current time of the server
 */
Bitz.prototype.getServerTime = async function () {
  return await marketRequest(endpoints.GET_SERVER_TIME);
};

/**
 * Get the price data
 * @param {string} symbols - coin pairs (e.g eth_btc).
 */
Bitz.prototype.getTradeSummary = async function (symbol) {
  return await marketRequest(endpoints.GET_TRADE_SUMMARY, { symbol });
};


/**
 * Get depth data
 * @param {string} symbols - coin pairs (e.g eth_btc).
 */
Bitz.prototype.getMarketDepth = async function (symbol) {
  return await marketRequest(endpoints.GET_MARKET_DEPTH, { symbol });
};


/**
 * Get the order
 * @param {string} symbols - coin pairs (e.g eth_btc).
 */
Bitz.prototype.getLastTrade = async function (symbol) {
  return await marketRequest(endpoints.GET_LAST_TRADE, { symbol });
};


/**
 * Get the price of all symbol
 * @param {string} symbols - coinsymbol pairs (e.g eth_btc,ltc_btc).
 */
Bitz.prototype.getAllTradeSumarry = async function (symbols) {
  return await marketRequest(endpoints.GET_ALL_TRADE_SUMMARY, { symbols });
};

/**
 * Get Kline data
 * @param {string} symbol - coin symbol (e.g eth_btc)
 * @param {string} resolution - (e.g 1min, 5min, 15min)
 * @param {integer between 1-300} size
 * @param {string} to (Optional) - (microsecond) returns data before microsecond
 */
Bitz.prototype.getKLine = async function (symbol, resolution, size, to) {
  return await marketRequest(endpoints.GET_KLINE, { symbol, resolution, size, to });
};


/**
 * Get the detail of every symbol
 * @param {string} symbols - coinsymbol pairs (e.g eth_btc,ltc_btc).
 */
Bitz.prototype.getAvailableCurrencies = async function (symbols) {
  return await marketRequest(endpoints.GET_AVALIABLE_CURRENCIES, { symbols });
};


/**
 * Obtian commission of trading mainstream cryptocurrency and new cryptocurrency
 * @param {string} symbols - coinsymbol pairs (e.g eth_btc,ltc_btc).
 */
Bitz.prototype.getSymbolListRate = async function (symbols) {
  return await marketRequest(endpoints.GET_SYMBOL_LIST_RATE, { symbols });
};


/**
 * Get Market List of Contract Transaction
 * @param {integer} contractId
 */
Bitz.prototype.getContractCoin = async function (contractId) {
  return await marketRequest(endpoints.GET_SYMBOL_LIST_RATE, { contractId });
};


/**
 * Get K Line Data of Contract
 * @param {integer} contractId
 * @param {string} type - (e.g 1min, 5min, 15min)
 * @param {integer between 1-300} size (Optional)
 */
Bitz.prototype.getContractKLine = async function (contractId, type, size) {
  return await marketRequest(endpoints.GET_CONTRACT_KLINE, { contractId, type, size });
};

/**
 * Get the market depth of contract transactions
 * @param {integer} contractId
 * @param {string} depth (optional) - (Depth type 5, 10, 15, 20, 30, 100,,default10)
 */
Bitz.prototype.getContractOrderBook = async function (contractId, depth) {
  return await marketRequest(endpoints.GET_CONTRACT_ORDER_BOOK, { contractId, depth });
};


/**
 * Get Trade History of Certain Contract
 * @param {integer} contractId
 * @param {integer} pageSize (optional) - (Get data volume range:10-300 default 10)
 */
Bitz.prototype.getContractTradesHistory = async function (contractId, pageSize) {
  return await marketRequest(endpoints.GET_CONTRACT_TRADE_HISTORY, { contractId, pageSize });
};


/**
 * Get Newest Contract Tickers
 * @param {integer} contractId (optional)
 */
Bitz.prototype.getContractTickers = async function (contractId) {
  return await marketRequest(endpoints.GET_CONTRACT_TICKERS, { contractId });
};



// TRADE ENDPOINTS



/**
 * Account balance
 */
Bitz.prototype.getUserAssets = async function () {
  const data = this.getSignBaseParams();
  const params = this.signParams(data);
  return await tradeRequest(endpoints.GET_USER_ADDRESS, params);
};

/**
 * Get deposit address
 * @param {string} coin - coin symbol (e.g usdt).
 * @param {string} type - type， usdt requested，accepted value: erc20,omni.
 */
Bitz.prototype.getCoinAddress = async function (coin, type) {
  const data = this.getSignBaseParams();
  if (type) data.type = type;
  const params = this.signParams({ ...data, coin });
  return await tradeRequest(endpoints.GET_COIN_ADDRESS, params);
};

/**
 * Get withdrawal address list
 * @param {string} coin - coin symbol (e.g usdt).
 */
Bitz.prototype.getCoinAddressList = async function (coin) {
  const data = this.getSignBaseParams();
  const params = this.signParams({ ...data, coin });
  return await tradeRequest(endpoints.GET_COIN_ADDRESS_LIST, params);
};

/**
 * Coin Withdrawal
 * @param {string} coin - coin symbol (e.g usdt).
 * @param {number} number - quantity of coin.
 * @param {string} address - withdrawal address.
 * @param {string} memo - memo (Optional).
 * @param {string} type - type (Optional)， usdt requested，accepted value: erc20,omni.
 */
Bitz.prototype.coinOut = async function (coin, number, address, memo, type) {
  const data = this.getSignBaseParams();
  if (memo) data.memo = memo;
  if (type) data.type = type;
  const params = this.signParams({ ...data, coin, number, address });
  return await tradeRequest(endpoints.COIN_OUT, params);
};

/**
 * Add Limit price trade
 * @param {object} inputParams - (symbol, amount, price, type) - all required fields
 */
Bitz.prototype.addLimitTradeOrder = async function (inputParams) {
  const data = this.getSignBaseParams();
  const params = this.signParams({ ...data, ...inputParams, tradePwd: this.config.tradePassword });
  return await tradeRequest(endpoints.ADD_ENTRUST_SHEET, params);
};


/**
 * Get a list of your current orders
 * @param {object} inputParams - (coinFrom, coinTo, type, page, pageSize, startTime, endTime) - all optional fields
 */
Bitz.prototype.getOpenTradeOrders = async function (inputParams) {
  const data = this.getSignBaseParams();
  const params = this.signParams({...data, ...inputParams });
  return await tradeRequest(endpoints.GET_USER_ENTRUST_SHEET, params);
};


/**
 * Get a list of personal history orders
 * @param {object} inputParams - (coinFrom, coinTo, type, page, pageSize, startTime, endTime) - all optional fields
 */
Bitz.prototype.getTradeOrderHistory = async function (inputParams) {
  const data = this.getSignBaseParams();
  const params = this.signParams({...data, ...inputParams});
  return await tradeRequest(endpoints.GET_USER_HISTORY_ENTRUST_SHEET, params);
};


/**
 * Revocation of price limit order
 * @param {string} entrustSheetId
 */
Bitz.prototype.cancelTradeOrder = async function (entrustSheetId) {
  const data = this.getSignBaseParams();
  const params = this.signParams({ ...data, entrustSheetId });
  return await tradeRequest(endpoints.CANCEL_ENTRUST_SHEET, params);
};

/**
 * Get order details
 * @param {string} entrustSheetId
 */
Bitz.prototype.getTradeOrderDetails = async function (entrustSheetId) {
  const data = this.getSignBaseParams();
  const params = this.signParams({ ...data, entrustSheetId });
  return await tradeRequest(endpoints.GET_USER_ENTRUST_SHEET_INFO, params);
};

/**
 * Submit market order
 * @param {string} symbol - Transaction pair name
 * @param {string} total - Incoming amount at the time of purchase, incoming quantity at the time of sale
 * @param {integer} type - Type 1 -> Buy,  2 -> Sell
 */
Bitz.prototype.submitMarketTrade = async function (symbol, total, type) {
  const data = this.getSignBaseParams();
  const params = this.signParams({ ...data, symbol, total, type});
  return await tradeRequest(endpoints.SUBMIT_MARKET_TRADE, params);
};


// internal methods

Bitz.prototype.getSignBaseParams = function () {
  const timeStamp = Math.round(new Date().getTime() / 1000) + "";
  return {
    apiKey: this.config.apiKey,
    timeStamp,
    nonce: timeStamp.substr(-6),
  };
};

Bitz.prototype.signParams = function (params) {
  let sign = queryString.stringify(params);
  sign = sign + this.config.apiSecret;
  sign = CryptoJS.MD5(sign).toString().toLowerCase();
  params.sign = sign;
  return params;
};

module.exports = new Bitz();
