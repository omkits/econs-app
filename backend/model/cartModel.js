const mongoose = require('mongoose')

const cartSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User',
      },
      productId: {
        type: String,
        required: true,
      },
      quantity: {
        type: String,
        required: true,
      }
})

module.exports = mongoose.model('Cart', cartSchema)