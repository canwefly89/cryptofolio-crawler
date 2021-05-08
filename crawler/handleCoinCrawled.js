const upbitCrawled = require(`./crawledData/upbit_${new Date()
  .toISOString()
  .slice(0, 10)}.json`);
const binanceCrawled = require(`./crawledData/binance_${new Date()
  .toISOString()
  .slice(0, 10)}.json`);
const categoryData = require("./baseData/category.json");

const fixCrawledData = (data, exchange) => {
  const fixedData = { ...data };
  const binanceTickers = Object.values(binanceCrawled).map((v) => v.ticker);
  const upbitTickers = Object.values(upbitCrawled).map((v) => v.ticker);

  // 1. put in categories
  Object.entries(fixedData).forEach(([dkey, dvalue]) => {
    Object.entries(categoryData).forEach(([ckey, cvalue]) => {
      if (cvalue.ticker.indexOf(dvalue.ticker) !== -1) {
        fixedData[dkey].categories.push(ckey);
      }
    });
  });

  // 1-1. fix empty data
  if (exchange === "binance") {
    Object.entries(fixedData).forEach(([key, value]) => {
      if (!value.ticker) {
        delete fixedData[key];
      }

      if (value.ticker?.indexOf("UP") !== -1) {
        delete fixedData[key];
      }

      if (value.ticker?.indexOf("DOWN") !== -1) {
        delete fixedData[key];
      }
    });
  }

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
      marketCap,
      volumeDollar,
      dominance,
    } = value;

    const parsedCirculatingSupply = parseInt(
      circulatingSupply?.replace(NANRegex, ""),
      10
    );
    const parsedTotalSupply = parseInt(totalSupply?.replace(NANRegex, ""), 10);
    const parsedMaxSupply = parseInt(maxSupply?.replace(NANRegex, ""), 10);
    const parsedMarketCap = parseInt(marketCap?.replace(NANRegex, ""), 10);
    const parsedVolumeDollar = parseInt(
      volumeDollar?.replace(NANRegex, ""),
      10
    );
    const parsedDominance = parseFloat(dominance);

    data[key] = {
      ...handledUpbit[key],
      circulatingSupply: parsedCirculatingSupply,
      totalSupply: parsedTotalSupply,
      maxSupply: parsedMaxSupply,
      marketCap: parsedMarketCap,
      volumeDollar: parsedVolumeDollar,
      dominance: parsedDominance,
    };
  });

  // 4. save to folder
  fs.writeFileSync(
    `./finalData/${exchange}_${new Date().toISOString().slice(0, 10)}.json`,
    JSON.stringify(handledUpbit)
  );
};

fixCrawledData(upbitCrawled, "upbit");
// fixCrawledData(binanceCrawled, "binance");
