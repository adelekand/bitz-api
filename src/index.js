const CryptoJS = require("crypto-js");
const queryString = require("query-string");
const request = require("./httpRequest");
const { requestHeader, endpoints } = require("./config");

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

/**
 * Get currency rate
 * @param {string} symbols - currency symbol pairs (e.g cny_usdt,usdt_cny).
 */
Bitz.prototype.getCurrencyRate = async function (symbols) {
  const options = {
    method: "GET",
    url: endpoints.GET_CURRENCY_RATE,
    params: { symbols },
    headers: requestHeader.MARKET,
  };
  return await request(options);
};

/**
 * Get currency coin rate
 * @param {string} symbols - currency symbols (e.g btc,usdt,eth).
 */
Bitz.prototype.getCurrencyCoinRate = async function (coins) {
  const options = {
    method: "GET",
    url: endpoints.GET_CURRENCY_COIN_RATE,
    params: { coins },
    headers: requestHeader.MARKET,
  };
  return await request(options);
};

/**
 * Get coin rate data
 * @param {string} coin - coin symbol (e.g usdt).
 */
Bitz.prototype.getCoinRate = async function (coins) {
  const options = {
    method: "GET",
    url: endpoints.GET_COIN_RATE,
    params: { coins },
    headers: requestHeader.MARKET,
  };
  return await request(options);
};

/**
 * Obtain the current time of the server
 */
Bitz.prototype.getServerTime = async function () {
  const options = {
    method: "GET",
    url: endpoints.GET_SERVER_TIME,
    headers: requestHeader.MARKET,
  };
  return await request(options);
};

/**
 * Account balance
 */
Bitz.prototype.getUserAssets = async function () {
  const data = this.getSignBaseParams();
  const params = this.signParams(data);

  const options = {
    method: "POST",
    url: endpoints.GET_USER_ADDRESS,
    params,
    headers: requestHeader.EXCHANGE,
  };
  return await request(options);
};

/**
 * Get deposit address
 * @param {string} coin - coin symbol (e.g usdt).
 * @param {string} type - type， usdt requested，accepted value: erc20,omni.
 */
Bitz.prototype.getCoinAddress = async function (coin, type) {
  const data = this.getSignBaseParams();
  data.coin = coin;
  if (type) data.type = type;
  const params = this.signParams(data);

  const options = {
    method: "POST",
    url: endpoints.GET_COIN_ADDRESS,
    params,
    headers: requestHeader.EXCHANGE,
  };
  return await request(options);
};

/**
 * Get withdrawal address list
 * @param {string} coin - coin symbol (e.g usdt).
 */
Bitz.prototype.getCoinAddressList = async function (coin) {
  const data = this.getSignBaseParams();
  data.coin = coin;
  const params = this.signParams(data);

  const options = {
    method: "POST",
    url: endpoints.GET_COIN_ADDRESS_LIST,
    params,
    headers: requestHeader.EXCHANGE,
  };
  return await request(options);
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
  data.coin = coin;
  data.number = number;
  data.address = address;
  if (memo) data.memo = memo;
  if (type) data.type = type;
  const params = this.signParams(data);

  const options = {
    method: "POST",
    url: endpoints.COIN_OUT,
    params,
    headers: requestHeader.EXCHANGE,
  };
  return await request(options);
};

/**
 * Get the price data
 * @param {string} symbols - coin pairs (e.g eth_btc).
 */
Bitz.prototype.getTradeSummary = async function (symbol) {
  const options = {
    method: "GET",
    url: endpoints.GET_TRADE_SUMMARY,
    params: { symbol },
    headers: requestHeader.MARKET,
  };
  return await request(options);
};


/**
 * Get depth data
 * @param {string} symbols - coin pairs (e.g eth_btc).
 */
Bitz.prototype.getMarketDepth = async function (symbol) {
  const options = {
    method: "GET",
    url: endpoints.GET_MARKET_DEPTH,
    params: { symbol },
    headers: requestHeader.MARKET,
  };
  return await request(options);
};


/**
 * Get the order
 * @param {string} symbols - coin pairs (e.g eth_btc).
 */
Bitz.prototype.getLastTrade = async function (symbol) {
  const options = {
    method: "GET",
    url: endpoints.GET_LAST_TRADE,
    params: { symbol },
    headers: requestHeader.MARKET,
  };
  return await request(options);
};


/**
 * Get the price of all symbol
 @param {string} symbols - coinsymbol pairs (e.g eth_btc,ltc_btc).
 */
Bitz.prototype.getAllTradeSumarry = async function (symbols) {
  const options = {
    method: "GET",
    url: endpoints.GET_ALL_TRADE_SUMMARY,
    params: { symbols },
    headers: requestHeader.MARKET,
  };
  return await request(options);
};

/**
 * Get Kline data
 * @param {string} symbol - coin symbol (e.g eth_btc)
 * @param {string} resolution - (e.g 1min, 5min, 15min)
 * @param {integer between 1-300} size
 * @param {string} to (Optional) - (microsecond) returns data before microsecond
 */
Bitz.prototype.getKLine = async function (symbol, resolution, size, to) {
  const options = {
    method: "GET",
    url: endpoints.GET_KLINE,
    params: { symbol, resolution, size, to },
    headers: requestHeader.MARKET,
  };
  return await request(options);
};


/**
 * Get the detail of every symbol
 @param {string} symbols - coinsymbol pairs (e.g eth_btc,ltc_btc).
 */
Bitz.prototype.getAvailableCurrencies = async function (symbols) {
  const options = {
    method: "GET",
    url: endpoints.GET_AVALIABLE_CURRENCIES,
    params: { symbols },
    headers: requestHeader.MARKET,
  };
  return await request(options);
};


/**
 * Obtian commission of trading mainstream cryptocurrency and new cryptocurrency
 @param {string} symbols - coinsymbol pairs (e.g eth_btc,ltc_btc).
 */
Bitz.prototype.getSymbolListRate = async function (symbols) {
  const options = {
    method: "GET",
    url: endpoints.GET_SYMBOL_LIST_RATE,
    params: { symbols },
    headers: requestHeader.MARKET,
  };
  return await request(options);
};

// TODO: implement other bitz api endpoint integration

// Currency Trading API Interface

// Contract Market View API Interface

// Contract Trade API Interface

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
