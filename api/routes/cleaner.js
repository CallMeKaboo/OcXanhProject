const express = require('express');
const { getCleaners,getCleaner } = require('../controllers/home/cleaner');

const router = express.Router();

router.get('/',getCleaners);
router.get('/:id',getCleaner);
// router.post('/',postService);
// router.delete('/:id',deleteService);
// router.put('/:id',updateService);

module.exports  = router;