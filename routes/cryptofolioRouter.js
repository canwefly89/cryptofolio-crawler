const express = require("express");
const router = express.Router();
const {
  getCryptoFoliosDB,
  createCryptoFolioDB,
} = require("./controllers/cryptofolioController");

router.route("/").get(getCryptoFoliosDB);
router.route("/new").post(createCryptoFolioDB);

module.exports = router;
