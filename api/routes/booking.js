const express = require("express");
const {
  postBooking,
  getBooking,
  deleteBooking,
} = require("../controllers/home/booking");

const router = express.Router();

router.get("/:user_id", getBooking);

router.post("/post", postBooking);
router.post("/deleteBooking", deleteBooking);
// router.put("/:id", updateService);

module.exports = router;
