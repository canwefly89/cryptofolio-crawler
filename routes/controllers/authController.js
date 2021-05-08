const User = require("../../models/userModel");
const { createToken, verifyToken } = require("../../utils/tokenHandler");

exports.checkAuthDB = async (req, res, next) => {
  try {
    return res.status(200).json();
  } catch (err) {
    next(err);
  }
};

exports.loginDB = async (req, res, next) => {
  try {
    return res.status(200).json();
  } catch (err) {
    next(err);
  }
};

exports.socialLoginDB = async (req, res, next) => {
  try {
    const { email, name } = req.body;
    let user = await User.findOne({ email });

    console.log(user);

    if (!user) {
      user = await User.create({
        email,
        name,
      });
    }

    const token = createToken(user._id);

    res.status(200).json({
      message: "success",
      data: {
        user,
        token,
      },
    });
  } catch (err) {
    next(err);
  }
};

exports.sigininDB = async (req, res, next) => {
  try {
    return res.status(200).json();
  } catch (err) {
    next(err);
  }
};

// exports.logoutDB = async (req, res, next) => {
//   try {
//     return res.status(200).json();
//   } catch (err) {
//     next(err);
//   }
// };
