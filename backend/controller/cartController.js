const Cart = require('../model/cartModel')
const asyncHandler = require('express-async-handler')


const getCart = asyncHandler(async (req, res) => {
    const userId = req.user._id;
    try {
        const cartItems = await Cart.find({ userId });
        if (!cartItems) {
            return res.status(404).json({ message: 'Cart not found' });
        }
        console.log(cartItems)
        res.status(200).json(cartItems);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});


const addCart = asyncHandler(async(req, res) => {
    const {cartData} = req.body
    const {userId, productId, quantity} = cartData;
    // console.log(cartData)
    // const userId = req.user._id;
    // console.log(userId)

    const cartitems = {
        user: userId,
        productId: productId,
        quantity: quantity,
    }
    try {
        const addCart = await Cart.create(cartitems)
        await addCart.save()
        // console.log(addCart)
        res.status(201).json(addCart)
        
    } catch (error) {
        console.error(error)
        res.status(500).json({ message: 'Internal Server Error' });
    }
})

const updateCart = asyncHandler(async(req, res) => {
    res.status(200).json('working')
})

const deleteCart = asyncHandler(async(req, res) => {
    const {cartitemId} = req.body;
    try {
        await Cart.findByIdAndDelete(cartitemId)
        res.status(200).json('cart item deleted sucessfully')
    } catch (error) {
        console.error(error)
        res.status(500).json({ message: 'Internal Server Error' });
    }
})

module.exports = {
    getCart,
    addCart,
    updateCart,
    deleteCart,
}