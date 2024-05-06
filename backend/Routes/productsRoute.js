const express = require('express');
const router = express.Router();
const {protect} = require('../middleware/authMiddleware')
const {getProducts, getCategory} = require('../controller/productsController')


router.get('/',protect, getProducts)
router.post('/category',protect, getCategory)


module.exports = router;