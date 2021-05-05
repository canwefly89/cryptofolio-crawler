const mongoose = require("mongoose");
const { Schema } = mongoose;
const { ObjectId } = Schema.Types;

const CryptofolioSchema = new Schema({
  name: {
    type: String,
    trim: true,
    unique: true,
    default: Date.now(),
    required: true,
  },
  owner: {
    type: ObjectId,
    ref: "User",
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
    required: true,
  },
  profit: {
    date: {
      type: Date,
      required: true,
    },
    profit: {
      type: Number,
      required: true,
    },
  },
  coins: {
    _id: {
      type: ObjectId,
      ref: "Coin",
      required: true,
    },
    number: {
      type: Number,
      required: true,
    },
    percent: {
      type: Number,
      required: true,
    },
  },
});

const Cryptofolio = mongoose.model("Cryptofolio", CryptofolioSchema);

module.exports = Cryptofolio;
