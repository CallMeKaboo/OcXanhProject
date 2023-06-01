const express = require("express");
const {
  login,
  deleteMultipleContact,
  deleteMultipleService,
  deleteMultipleStaff,
  deleteMultipleUser,
  deleteMultipleBooking,
  postStaff,
  postService,
} = require("../controllers/admin/adminPost");

const router = express.Router();

router.post("/login", login);
router.post("/deleteService", deleteMultipleService);
router.post("/deleteStaff", deleteMultipleStaff);
router.post("/deleteUser", deleteMultipleUser);
router.post("/deleteBooking", deleteMultipleBooking);
router.post("/deleteContact", deleteMultipleContact);
router.post("/addStaff", postStaff);
router.post("/addService", postService);

module.exports = router;
