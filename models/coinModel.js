const mongoose = require("mongoose");
const { Schema } = mongoose;

const CoinSchema = new Schema({
  name: {
    type: String,
    trim: true,
    required: true,
    unique: true,
  },
  ticker: {
    type: String,
    required: true,
  },
  imagePath: {
    type: String,
    required: true,
  },
  categories: {
    type: [Sting],
    default: [],
    required: true,
  },
  supply: {
    circulatingSupply: {
      type: Number,
      required: true,
    },
    totalSupply: {
      type: Number,
      required: true,
    },
    maxSupply: {
      type: Number,
      required: true,
    },
  },
  price: {
    time: {
      type: Date,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
  },
  exchanges: {
    type: [String],
    default: [],
    required: true,
  },
});

const Coin = mongoose.model("Coin", CoinSchema);

module.exports = Coin;
