const express = require("express");
const {
  register,
  login,
  lougout,
  getUsersInfor,
  updateUserInfor,
  updatePassword,
} = require("../controllers/home/auth");

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.post("/logout", lougout);
router.get("/user/:user_id", getUsersInfor);
router.put("/users/update/:user_id", updateUserInfor);
router.post("/users/changepass", updatePassword);
module.exports = router;
