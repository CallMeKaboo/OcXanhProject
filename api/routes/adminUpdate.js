const express = require("express");
const {
  updateContact,
  updateBooking,
  updateService,
  updateStaff,
} = require("../controllers/admin/adminUpdate");

const router = express.Router();

router.put("/contact/:id", updateContact);
router.put("/booking/:id", updateBooking);
router.put("/service/:id", updateService);
router.put("/staff/:id", updateStaff);

module.exports = router;
