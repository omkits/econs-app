const express = require('express')
const router = express.Router()
const {getCart,
    addCart,
    updateCart,
    deleteCart,
} = require('../controller/cartController')
const {protect} = require('../middleware/authMiddleware')

router.get('/',protect, getCart)
router.post('/add', protect,addCart)
router.put('/:id/update',protect, updateCart)
router.delete('/:id/delete',protect, deleteCart)

module.exports = router;