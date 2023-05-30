const express = require("express");
const {
  register,
  login,
  lougout,
  getUsersInfor,
  updateUserInfor,
} = require("../controllers/home/auth");

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.post("/logout", lougout);
router.get("/user/:user_id", getUsersInfor);
router.put("/users/:user_id", updateUserInfor);
module.exports = router;
