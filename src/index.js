const CryptoJS = require('crypto-js');
const queryString = require('query-string');
const request = require('./httpRequest');
const { requestHeader, endpoints }  = require('./config');

function Bitz() {
  this.config = {};
}

Bitz.prototype.setConfig = function(config) {
  this.config = config;
}


// Public API Interface

Bitz.prototype.getCoinRate = async function(coins) {
  const options = {
    method: 'GET',
    url: endpoints.GET_COIN_RATE,
    params: { coins },
    headers: requestHeader.MARKET
  };
  return await request(options);
};

Bitz.prototype.getCurrencyRate = async function(symbols) {
  const options = {
    method: 'GET',
    url: endpoints.GET_CURRENCY_RATE,
    params: { symbols },
    headers: requestHeader.MARKET
  };
  return await request(options);
};

Bitz.prototype.getCurrencyCoinRate = async function(coins) {
  const options = {
    method: 'GET',
    url: endpoints.GET_CURRENCY_COIN_RATE,
    params: { coins },
    headers: requestHeader.MARKET
  };
  return await request(options);
};

Bitz.prototype.getServerTime = async function() {
  const options = {
    method: 'GET',
    url: endpoints.GET_SERVER_TIME,
    headers: requestHeader.MARKET
  };
  return await request(options);
};



// Transfer API Interface


Bitz.prototype.getUserAssets = async function() {
  const data = this.getSignBaseParams();
  const params = this.signParams(data);

  const options = {
    method: 'POST',
    url: endpoints.GET_USER_ADDRESS,
    params,
    headers: requestHeader.EXCHANGE
  };
  return await request(options);
};

Bitz.prototype.getCoinAddress = async function(coin, type) {
  const data = this.getSignBaseParams();
  data.coin = coin;
  if(type) data.type = type;
  const params = this.signParams(data);

  const options = {
    method: 'POST',
    url: endpoints.GET_COIN_ADDRESS,
    params,
    headers: requestHeader.EXCHANGE
  };
  return await request(options);
};

Bitz.prototype.getCoinAddressList = async function(coin) {
  const data = this.getSignBaseParams();
  data.coin = coin;
  const params = this.signParams(data);

  const options = {
    method: 'POST',
    url: endpoints.GET_COIN_ADDRESS_LIST,
    params,
    headers: requestHeader.EXCHANGE
  };
  return await request(options);
};

Bitz.prototype.coinOut = async function() {};



// Currency Market View API Interface


Bitz.prototype.getTradeSummary = async function() {};

Bitz.prototype.getAllTradeSumarry = async function() {};

Bitz.prototype.getMarketDepth = async function() {};

Bitz.prototype.getLastTrade = async function() {};

Bitz.prototype.getKLine = async function() {};

Bitz.prototype.getAvailableCurrencies = async function() {};

Bitz.prototype.getSymbolListRate = async function() {};



// Currency Trading API Interface



// Contract Market View API Interface



// Contract Trade API Interface



// internal methods

Bitz.prototype.getSignBaseParams = function() {
  const timeStamp = Math.round(new Date().getTime() / 1000) + "";
  return {
      "apiKey": this.config.apiKey,
      timeStamp,
      "nonce": timeStamp.substr(-6)
  };
};

Bitz.prototype.signParams = function(params) {
  let sign = queryString.stringify(params);
  sign = sign + this.config.apiSecret;
  sign = CryptoJS.MD5(sign).toString().toLowerCase();
  params.sign = sign;
  return params;
}

module.exports = new Bitz;
 
