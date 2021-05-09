const categoryData = require("../crawler/baseData/category.json");
const { parseNumber } = require("./parseNumber");
const { upbitTickers } = require("../crawler/baseList/upbitList");
const { binanceTickers } = require("../crawler/baseList/binanceList");

exports.fixCrawledData = (data) => {
  let fixedData = { ...data };

  // 1. put in categories
  Object.entries(categoryData).forEach(([key, value]) => {
    if (value.ticker.includes(fixedData.ticker)) {
      fixedData.categories.push(key);
    }
  });

  // 1-1. fix empty data
  if (fixedData.categories.length === 0) {
    fixedData.categories.push("etc");
  }

  // 2. push Exchages each other

  if (upbitTickers.includes(fixedData.ticker)) {
    fixedData.exchanges.unshift("upbit");
  }

  if (binanceTickers.includes(fixedData.ticker)) {
    fixedData.exchanges.push("binance");
  }

  // 3. parse to Number
  const {
    circulatingSupply,
    totalSupply,
    maxSupply,
    date,
    marketCap: { marketCap },
    price: { price },
    dominance,
  } = fixedData;

  const parsedCirculatingSupply = parseNumber(circulatingSupply);
  const parsedTotalSupply = parseNumber(totalSupply);
  const parsedMaxSupply = parseNumber(maxSupply);
  const parsedMarketCap = parseNumber(marketCap);
  const parsedPrice = parseNumber(price);
  const parsedDominance = parseNumber(dominance);

  fixedData = {
    ...fixedData,
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

  return fixedData;
};
