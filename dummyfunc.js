const fs = require("fs");
const categories = require("./crawler/crawled/category/category.json");
const coinData = require("./crawler/crawled/coin/coinData.json");
const { coinCategories } = require("./crawler/baseList/categoryList");
const updatedPrice = require("./crawler/crawled/price/priceData_crawled.json");
const Coin = require("./models/coinModel");

exports.foo = async () => {
  // ******* SAVE COIN DATA
  // const coinDB = await Coin.find().lean();
  // const tickerList = coinDB.map((coin) => coin.ticker);
  // const dataList = Object.entries(coinData);

  // for (let i = 0; i < dataList.length; i++) {
  //   const ticker = dataList[i][0];
  //   const data = dataList[i][1];

  //   if (tickerList.includes(ticker)) {
  //     await Coin.findOneAndReplace({ ticker }, data);
  //   } else {
  //     await Coin.create(data);
  //   }
  // }

  const priceList = Object.entries(updatedPrice.price);
  const marketCapList = Object.entries(updatedPrice.marketCap);
  const priceTicker = Object.keys(updatedPrice.price);
  const marketCapTicker = Object.keys(updatedPrice.marketCap);
  const { date } = updatedPrice;
  console.log(marketCapList.length);
  console.log(priceList.length);
  priceTicker.forEach((ticker) => {
    if (!marketCapTicker.includes(ticker)) {
      console.log(ticker);
    }
  });

  for (let i = 0; i < Math.min(priceList.length, marketCapList.length); i++) {
    console.log(priceList[i]);
    await Coin.findOneAndUpdate(
      { ticker: priceList[i][0] },
      { price: { date, price: priceList[i][1] } }
    );

    console.log(marketCapList[i]);
    await Coin.findOneAndUpdate(
      { ticker: marketCapList[i][0] },
      { marketCap: { date, marketCap: marketCapList[i][1] } }
    );
  }

  console.log("done");
};
