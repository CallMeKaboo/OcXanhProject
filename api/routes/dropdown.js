const express = require("express");
const {getProvince, getDistrict, getWard} = require("../controllers/home/dropdown")

const router = express.Router();

router.get('/province',getProvince)
router.get('/district/:id',getDistrict)
router.get('/ward/:id',getWard)

module.exports = router;