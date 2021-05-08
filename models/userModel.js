const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const SALT_ROUNDS = 10;
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

UserSchema.pre("save", function (next) {
  const user = this;

  bcrypt.genSalt(SALT_ROUNDS, (err, salt) => {
    if (err) {
      return next(err);
    }

    bcrypt.hash(user.password, salt, (err, hash) => {
      if (err) {
        return next(err);
      }

      user.password = hash;
      next();
    });
  });
});

const User = mongoose.model("User", UserSchema);

module.exports = User;
