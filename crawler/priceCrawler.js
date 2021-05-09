const puppeteer = require("puppeteer");
const fs = require("fs");
const priceLog = require(`${__dirname}/crawledData/priceData/priceLog.json`);
const priceData = require(`${__dirname}/crawledData/priceData/priceData.json`);
const date = new Date().toISOString().slice(0, 16);

exports.priceCrawler = async () => {
  try {
    const browser = await puppeteer.launch({
      headless: true,
      args: ["--window-size=1920, 1080", "--disable-notifications"],
    });

    let crawlResult = {
      price: {},
      date,
    };

    for (let i = 1; i < 11; i++) {
      const page = await browser.newPage();

      await page.setUserAgent(
        "Mozilla/5.0 (Macintosh; Intel Mac OS X 11_2_3) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/89.0.4389.114 Safari/537.36"
      );
      await page.setViewport({
        width: 1920,
        height: 1080,
      });
      await page.goto(`https://coinmarketcap.com/?page=${i}`);

      await page.waitForTimeout(Math.floor(Math.random() * 500 + 1000));
      await page.evaluate(async () => {
        window.scrollBy(0, 1500);
      });
      await page.waitForTimeout(Math.floor(Math.random() * 500 + 1000));
      await page.evaluate(async () => {
        window.scrollBy(0, 1500);
      });
      await page.waitForTimeout(Math.floor(Math.random() * 500 + 1000));
      await page.evaluate(async () => {
        window.scrollBy(0, 1500);
      });
      await page.waitForTimeout(Math.floor(Math.random() * 500 + 1000));
      await page.evaluate(async () => {
        window.scrollBy(0, 1500);
      });
      await page.waitForTimeout(Math.floor(Math.random() * 500 + 1000));
      await page.evaluate(async () => {
        window.scrollBy(0, 1500);
      });
      await page.waitForTimeout(Math.floor(Math.random() * 500 + 1000));
      await page.evaluate(async () => {
        window.scrollBy(0, 1500);
      });
      await page.waitForTimeout(Math.floor(Math.random() * 1000 + 2000));

      const crawledData = await page.evaluate(() => {
        const coinData = {};
        const NANRegex = /[^0-9.]/g;

        // ticker
        const ticker = Array.from(
          document.querySelectorAll("td .coin-item-symbol")
        ).map((v) => v.textContent);

        // price
        const price = Array.from(
          document.querySelectorAll("td .price___3rj7O")
        ).map((v) => parseFloat(v.textContent?.replace(NANRegex, "")));

        ticker.forEach((value, index) => {
          coinData[value] = price[index];
        });

        return coinData;
      });

      crawlResult = { price: { ...crawlResult.price, ...crawledData } };

      await page.waitForTimeout(Math.floor(Math.random() * 2000 + 1000));
      await page.close();
    }

    crawlResult.date = date;

    const updatedData = { ...priceData, crawlResult };
    const updatedLog = [...priceLog, date];

    if (updatedLog.length > 20) {
      delete updatedData[updatedLog[0]];
      updatedLog.shift();
    }

    fs.writeFileSync(
      `${__dirname}/crawledData/priceData/price_${date}.json`,
      JSON.stringify(updatedData)
    );

    fs.writeFileSync(
      `${__dirname}/crawledData/priceData/priceLog.json`,
      JSON.stringify(updatedLog)
    );

    console.log(priceLog[priceLog.length - 1]);

    await browser.close();
  } catch (e) {
    console.error(e);
  }
};
