# bitz-api

#### Description

A JavaScript library for [bitz-api Exchange](https://apidoc.bit-z.com/en/) api integration

#### Usage

```javascript
npm install bitz-api
```

Create an apiKey, apiSecret and tradePassword from https://u.bit-z.com/ucenter/api

```javascript
const Bitz = require('bitz-api');

Bitz.setConfig({ apiKey: 'XXXXXX', apiSecret: 'XXXXXX', tradePassword: 'XXXXXX' });
```

##### Market endpoints
```javascript
  const currencyRate = await Bitz.getCurrencyRate('cny_usdt,usdt_cny');

  const currencyCoinRate = await Bitz.getCurrencyCoinRate('btc,usdt,eth');

  const coinRate = await Bitz.getCoinRate('btc,eth');

  const serverTime = await Bitz.getServerTime();

  const tradeSummary = await Bitz.getTradeSummary('eth_btc');
  
  const marketDepth = await Bitz.getMarketDepth('eth_btc');
  
  const lastTrade = await Bitz.getLastTrade('eth_btc');
  
  const allTrade = await Bitz.getAllTradeSumarry('eth_btc,ltc_btc');

  const kLine = await Bitz.getKLine('eth_btc', '5day', 5);

  const availableCurrencies = await Bitz.getAvailableCurrencies('eth_btc,ltc_btc');

  const symbolListRate = await Bitz.getSymbolListRate('eth_btc,ltc_btc');
```

##### Trade endpoints
```javascript
  const userAssets = await Bitz.getUserAssets();
  const coinAddress = await Bitz.getCoinAddress('btc');
  const coinAddressList = await Bitz.getCoinAddressList('btc');
  const coinOut = await Bitz.coinOut('btc', 1000, 'XXXX');
```

#### TODOS

- Currency Market View API Interface

- Currency Trading API Interface

- Contract Market View API Interface

- Contract Trade API Interface

