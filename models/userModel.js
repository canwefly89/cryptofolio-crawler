const mongoose = require("mongoose");
const { Schema } = mongoose;
const { ObjectId } = Schema.Types;

const UserSchema = new Schema({
  email: {
    type: String,
    trim: true,
    unique: true,
    required: true,
  },
  name: {
    type: String,
    trim: true,
    default: "noname",
    required: true,
  },
  password: {
    type: String,
  },
  cryptofolios: {
    type: [ObjectId],
    ref: "Cryptofolio",
    default: [],
    required: true,
  },
});

const User = mongoose.model("User", UserSchema);

module.exports = User;
