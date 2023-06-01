const express = require("express");
const { getReviews, postReview } = require("../controllers/home/review");

const router = express.Router();

router.get("/:service_detail_id", getReviews);
router.post("/post", postReview);

module.exports = router;
