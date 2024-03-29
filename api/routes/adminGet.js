const express = require("express");
const {
  getService,
  getUsers,
  getStaffs,
  getBooking,
  getContact,
  getReport,
  getServiceDetail,
  getTotal,
} = require("../controllers/admin/adminGet");

const router = express.Router();

router.get("/service", getService);
router.get("/serviceD", getServiceDetail);
router.get("/user", getUsers);
router.get("/staff", getStaffs);
router.get("/booking", getBooking);
router.get("/contact", getContact);
router.get("/report", getReport);
router.get("/total", getTotal);

module.exports = router;
