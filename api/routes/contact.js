const express = require("express");
const { getContact, postContact } = require("../controllers/home/contact");

const router = express.Router();

router.get("/", getContact);
router.post("/post", postContact);

module.exports = router;
