const metadata = require("../../crawler/crawled/metadata/metadata.json");
const coinData = require("../../crawler/crawled/coin/coinData.json");

exports.getHomeDB = (req, res, next) => {
  try {
    const data = {
      metadata,
      coinData,
    };

    return res.status(200).json({
      message: "success",
      data,
    });
  } catch (err) {
    next(err);
  }
};

exports.mockfunc = async (req, res, next) => {
  try {
    return res.status(200).json();
  } catch (err) {
    next(err);
  }
};
