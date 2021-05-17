const path = require("path");
const dotenv = require("dotenv");
dotenv.config({
  path: path.join(__dirname, ".env"),
});

const express = require("express");
const app = express();
const mongoose = require("mongoose");
const server = require("http").Server(app);
const port = process.env.PORT || 6000;
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const schedule = require("node-schedule");

const { getCoinData } = require("./controller/coinDataController");
const { getPriceData } = require("./controller/priceController");
const { getMetadata } = require("./controller/metadataController");
const { priceCrawler } = require("./crawler/priceCrawler");
const { coinCrawler } = require("./crawler/coinCrawler");
const { metadataCrawler } = require("./crawler/metadataCrawler");
// coinCrawler();
// const { foo } = require("./dummyfunc");
// foo();
// priceCrawler();

schedule.scheduleJob("0 6 * * *", () => {
  console.log("run price Crawler", new Date());
  priceCrawler();
});

schedule.scheduleJob("0 7 * * *", () => {
  console.log("run coin Crawler", new Date());
  coinCrawler();
});

schedule.scheduleJob("*/30 * * * *", () => {
  console.log("run metadata Crawler", new Date());
  metadataCrawler();
});

const mongoURL = process.env.MONGO_URL.replace(
  "<PASSWORD>",
  process.env.MONGO_PASSWORD
);

mongoose
  .connect(mongoURL, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("MongoDB connection success");
  })
  .catch((err) => {
    console.log(`ERROR: ${err.name}, ${err.message}`);
  });

app.use(cors());
app.use(morgan("dev"));
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));

app.get("/metadata", getMetadata);
app.get("/price", getPriceData);
app.get("/coinData", getCoinData);

app.use((req, res, next) => {
  const err = new Error("Not Found");

  err.status = 404;
  next(err);
});

app.use((err, req, res, next) => {
  console.log(err);
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  res.status(err.status || 500).json({
    result: "error",
  });
});

server.listen(port, () => {
  console.log(`Listening to PORT: ${port}`);
});
