const express = require("express");
const {getProvince, getDistrict, getWard} = require("../controllers/home/dropdown")

const router = express.Router();

router.get('/province',getProvince)
router.get('/district/',getDistrict)
router.get('/ward/',getWard)

module.exports = router;