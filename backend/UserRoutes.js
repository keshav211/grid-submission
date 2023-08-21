const express = require("express");

const {
  createUser,
  getAllUser,
  loginUser,
  logoutUser,
} = require("./UserController");

const router = express.Router();
router.get("/",  getAllUser);
router.route("/register").post(createUser);
router.route("/login").post(loginUser);

module.exports = router;