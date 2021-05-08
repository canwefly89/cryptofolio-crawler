const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

exports.createToken = (userId) => {
  return jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

exports.verifyToken = async (clientToken) => {
  const decoded = jwt.verify(clientToken, process.env.JWT_SECRET);
  const user = await User.findOne({ userId: decoded.userId });
  const now = Date.now();
  const isExpired = decoded.exp * 1000 - now < 0;

  if (!user || isExpired) {
    return null;
  }

  return user;
};
