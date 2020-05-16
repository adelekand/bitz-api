const axios = require('axios');
const { baseURL, requestHeader } = require('./config');

const instance = axios.create({ 
  baseURL,
  timeout: 3000,
});

async function marketRequest(url, params) {
  const options = {
    method: "GET",
    url,
    params,
    headers: requestHeader.MARKET,
  };
  try {
    return await instance.request(options);
  } catch (error) {
    console.error(error);
  }
};

async function tradeRequest(url, params) {
  const options = {
    method: "POST",
    url,
    params,
    headers: requestHeader.EXCHANGE,
  };

  try {
    return await instance.request(options);
  } catch (error) {
    console.error(error);
  }
}

module.exports = { marketRequest, tradeRequest };
