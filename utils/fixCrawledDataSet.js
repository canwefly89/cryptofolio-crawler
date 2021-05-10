const categoryData = require("../crawler/crawled/category/category.json");
const { parseNumber } = require("./parseNumber");
const { upbitTickers } = require("../crawler/baseList/upbitList");
const { binanceTickers } = require("../crawler/baseList/binanceList");

exports.fixCrawledDataSet = (data) => {
  const fixedData = { ...data };

  // 1. put in categories
  Object.entries(fixedData).forEach(([dkey, dvalue]) => {
    Object.entries(categoryData).forEach(([ckey, cvalue]) => {
      if (cvalue.ticker.indexOf(dvalue.ticker) !== -1) {
        fixedData[dkey].categories.push(ckey);
      }
    });
  });

  // 1-1. fix empty data
  Object.entries(fixedData).forEach(([key, value]) => {
    if (value.categories.length === 0) {
      fixedData[key].categories.push("etc");
    }
  });

  // 2. push Exchages each other
  Object.entries(data).forEach(([key, value]) => {
    if (upbitTickers.includes(value.ticker)) {
      fixedData[key].exchanges.unshift("upbit");
    }

    if (binanceTickers.includes(value.ticker)) {
      fixedData[key].exchanges.push("binance");
    }
  });

  // 3. parse to Number
  Object.entries(data).forEach(([key, value]) => {
    const {
      circulatingSupply,
      totalSupply,
      maxSupply,
      date,
      marketCap: { marketCap },
      price: { price },
      dominance,
    } = value;

    const parsedCirculatingSupply = parseNumber(circulatingSupply);
    const parsedTotalSupply = parseNumber(totalSupply);
    const parsedMaxSupply = parseNumber(maxSupply);
    const parsedMarketCap = parseNumber(marketCap);
    const parsedPrice = parseNumber(price);
    const parsedDominance = parseNumber(dominance);

    fixedData[key] = {
      ...fixedData[key],
      circulatingSupply: parsedCirculatingSupply,
      totalSupply: parsedTotalSupply,
      maxSupply: parsedMaxSupply,
      marketCap: {
        marketCap: parsedMarketCap,
        date,
      },
      price: {
        price: parsedPrice,
        date,
      },
      dominance: parsedDominance,
    };
  });

  return fixedData;
};
