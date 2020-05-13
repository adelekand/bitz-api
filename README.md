# bitz-api

## A JavaScript library for [bitz-api Exchange](https://www.bitz-api.com/) api integration

#### Install

```
npm install bitz-api
```

#### Usage

```
const Bitz = require('bitz-api');

Bitz.setConfig({ apiKey: 'XXXXXX', apiSecret: 'XXXXXX', tradePassword: 'XXXXXX' });

const currencyRate = await Bitz.getCurrencyRate('cny_usdt,usdt_cny');
const currencyCoinRate = await Bitz.getCurrencyCoinRate('btc,usdt,eth');
const currencyRate = await Bitz.getCoinRate('edc,btc');
const serverTime = await Bitz.getServerTime();
const userAssets = await Bitz.getUserAssets();
const coinAddress = await Bitz.getCoinAddress('btc');
const coinAddressList = await Bitz.getCoinAddressList('edc');
```
