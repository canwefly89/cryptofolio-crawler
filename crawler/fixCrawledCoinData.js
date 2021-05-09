const categoryData = require("./baseData/category.json");
const { upbitTickers } = require("./baseList/upbitList");
const { binanceTickers } = require("./baseList/binanceList");

exports.fixCrawledData = (data, exchange) => {
  const fixedData = { ...data };
  const NANRegex = /[^0-9.]/g;

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
  if (exchange === "upbit") {
    Object.entries(data).forEach(([key, value]) => {
      binanceTickers.indexOf(value.ticker) !== -1 &&
        fixedData[key].exchanges.push("binance");
    });
  } else if (exchange === "binance") {
    Object.entries(data).forEach(([key, value]) => {
      upbitTickers.indexOf(value.ticker) !== -1 &&
        fixedData[key].exchanges.unshift("upbit");
    });
  }

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

    const parsedCirculatingSupply = parseInt(
      circulatingSupply?.replace(NANRegex, ""),
      10
    );
    const parsedTotalSupply = parseInt(totalSupply?.replace(NANRegex, ""), 10);
    const parsedMaxSupply = parseInt(maxSupply?.replace(NANRegex, ""), 10);
    const parsedMarketCap = parseInt(marketCap?.replace(NANRegex, ""), 10);
    const parsedPrice = parseFloat(price?.replace(NANRegex, ""));
    const parsedDominance = parseFloat(dominance);

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
