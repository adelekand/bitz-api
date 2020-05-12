const axios = require('axios');
const { baseURL } = require('./config');

const instance = axios.create({ 
  baseURL,
  timeout: 3000,
});

async function request(options) {
  try {
    return await instance.request(options);
  } catch (error) {
    console.error(error);
  }
};

module.exports = request;
