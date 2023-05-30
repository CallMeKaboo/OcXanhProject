const express = require('express');
const { getService, getUsers, getStaffs, getBooking, getContact, getReport, login } = require('../controllers/admin/admin');

const router = express.Router();

router.post("/login", login);
router.get('/service',getService);
router.get('/user',getUsers);
router.get('/staff',getStaffs);
router.get('/booking',getBooking);
router.get('/contact',getContact);
router.get('/report',getReport);


module.exports  = router;