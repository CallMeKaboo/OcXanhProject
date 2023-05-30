const express = require('express');
const { getServices, getService, searchService,postService, deleteService, updateService, getTime } = require('../controllers/home/service');

const router = express.Router();

router.get('/',getServices);
router.get('/details/:detail_id',getService);
router.get('/times/:service_id',getTime);
router.get('/search',searchService);
router.post('/',postService);
router.delete('/:id',deleteService);
router.put('/:id',updateService);

module.exports  = router;