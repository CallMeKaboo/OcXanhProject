const express = require("express");
const {
  postBooking, getBooking
} = require("../controllers/home/booking");

const router = express.Router();

router.get("/:user_id", getBooking);

router.post("/post", postBooking);
// router.delete("/:id", deleteService);
// router.put("/:id", updateService);

module.exports = router;
