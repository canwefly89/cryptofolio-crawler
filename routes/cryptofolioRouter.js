const express = require("express");
const router = express.Router();
const cryptofolioController = require("./controllers/cryptofolioController");

router.route("/").post(cryptofolioController.mockfunc);

module.exports = router;
