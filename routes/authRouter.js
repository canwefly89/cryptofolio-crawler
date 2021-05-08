const express = require("express");
const router = express.Router();
const {
  checkAuthDB,
  loginDB,
  socialLoginDB,
  sigininDB,
} = require("./controllers/authController");

router.route("/check_auth").post(checkAuthDB);
router.route("/login").post(loginDB);
router.route("/social_login").post(socialLoginDB);
router.route("/signin").post(sigininDB);
// router.route("/logout").post(logoutDB);

module.exports = router;
