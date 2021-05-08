const puppeteer = require("puppeteer");
const fs = require("fs");

const { upbitCoinName } = require("./baseList/upbitList");
const { binanceCoinName } = require("./baseList/binanceList");

fs.readdir("crawledData", (err) => {
  if (err) {
    console.error("crawledData 폴더가 없어 crawledData 폴더를 생성합니다.");
    fs.mkdirSync("crawledData");
  }
});

const coinCrawler = async (coinList) => {
  try {
    const browser = await puppeteer.launch({
      headless: false,
      args: ["--window-size=1920, 1080", "--disable-notifications"],
    });

    const result = {};
    const coins = [...coinList];

    for (let i = 0; i < coins.length; i++) {
      const correctedName = coins[i].replace(/ /gi, "-").toLowerCase();
      const page = await browser.newPage();

      await page.setUserAgent(
        "Mozilla/5.0 (Macintosh; Intel Mac OS X 11_2_3) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/89.0.4389.114 Safari/537.36"
      );
      await page.setViewport({
        width: 1920,
        height: 1080,
      });

      await page.goto(`https://coinmarketcap.com/currencies/${correctedName}`);

      const crawledData = await page.evaluate(() => {
        const coinData = {};

        coinData.ticker = document.querySelectorAll(
          ".nameSymbol___1arQV"
        )[0]?.textContent;

        coinData.imagePath = document.querySelectorAll(
          ".nameHeader___27HU_ img"
        )[0]?.src;

        coinData.circulatingSupply = document.querySelectorAll(
          ".statsValue___2iaoZ"
        )[4]?.textContent;

        coinData.totalSupply = document.querySelectorAll(
          ".maxSupplyValue___1nBaS"
        )[1]?.textContent;

        coinData.maxSupply = document.querySelectorAll(
          ".maxSupplyValue___1nBaS"
        )[0]?.textContent;

        coinData.marketCap = document.querySelectorAll(
          ".statsValue___2iaoZ"
        )[0]?.textContent;

        coinData.volumeDollar = document.querySelectorAll(
          ".statsValue___2iaoZ"
        )[2]?.textContent;

        coinData.dominance = document.querySelectorAll(
          ".statsValue___2iaoZ"
        )[3]?.textContent;

        coinData.date = new Date().toISOString().slice(0, 16);

        coinData.price = document.querySelectorAll(
          ".priceValue___11gHJ"
        )[0]?.textContent;

        coinData.exchanges = ["upbit"];

        return coinData;
      });

      result[correctionName] = { name: correctionName, ...crawledData };
      await page.waitForimeout(Math.floor(Math.random() * 2000 + 3000));
      await page.close();
    }

    await browser.close();

    return result;
  } catch (e) {
    console.error(e);
  }
};

const upbitData = coinCrawler(upbitCoinName);
const binanceData = coinCrawler(binanceCoinName);

fs.writeFileSync(
  `./crawledData/upbit_${new Date().toISOString().slice(0, 10)}.json`,
  JSON.stringify(upbitData)
);

fs.writeFileSync(
  `./crawledData/binance_${new Date().toISOString().slice(0, 10)}.json`,
  JSON.stringify(binanceData)
);
