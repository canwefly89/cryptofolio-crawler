const User = require("../../models/userModel");
const { createToken, verifyToken } = require("../../utils/tokenHandler");

exports.checkAuthDB = async (req, res, next) => {
  try {
    const user = await verifyToken(req.body.token);

    if (!user) {
      return res.status(200).json({
        message: "unauthorized",
      });
    }

    return res.status(200).json({
      message: "success",
      data: {
        user,
      },
    });
  } catch (err) {
    console.log(err);
    next(err);
  }
};

exports.loginDB = async (req, res, next) => {
  try {
    return res.status(200).json();
  } catch (err) {
    console.log(err);
    next(err);
  }
};

exports.socialLoginDB = async (req, res, next) => {
  try {
    const { email, name } = req.body;
    let user = await User.findOne({ email });

    if (!user) {
      user = new User({
        email,
        name,
      });

      await user.save();
    }

    console.log(user);

    const token = createToken(user._id);
    console.log(token);

    res.status(200).json({
      message: "success",
      data: {
        user,
        token,
      },
    });
  } catch (err) {
    console.log(err);
    next(err);
  }
};

exports.sigininDB = async (req, res, next) => {
  try {
    const user = new User(req.body);
    await user.save();

    const token = createToken(user._id);

    delete user.password;

    return res.status(200).json({
      message: "success",
      data: {
        user,
        token,
      },
    });
  } catch (err) {
    console.log(err);
    next(err);
  }
};
