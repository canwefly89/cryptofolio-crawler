const mongoose = require("mongoose");
const { Schema } = mongoose;

const MetaDataSchema = new Schema({
  date: {
    type: Date,
    default: Date.now(),
    required: true,
  },
  weather: {
    type: String,
    enum: ["sunny", "cloudy", "rainy", "stormy"],
    required: true,
  },
  premium: {
    btc: {
      type: Number,
    },
    eth: {
      type: Number,
    },
    xrp: {
      type: Number,
    },
  },
});

const MetaData = mongoose.model("MetaData", MetaDataSchema);

module.exports = MetaData;
