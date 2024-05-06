const asyncHandler = require('express-async-handler')
const axios = require('axios')



const getProducts = asyncHandler(async(req, res) => {
  try {
    const response =await axios.get(process.env.FAKE_SHOP)
    res.status(200).send(response.data)
    // return response.data
    return response.data
    
  } catch (error) {
    console.error('Error fetching products:', error.message);
    res.status(500).json({ message: 'Error fetching products' });
  }
  
})


const getCategory = asyncHandler(async(req, res) => {
  let {category} = req.body;
  // console.log(category)
  try {
    const response = await axios.get(`https://fakestoreapi.com/products/category/${category}`)
    res.status(200).send(response.data)
  } catch (error) {
    console.error('Error fetching products by category:', error.message);
    res.status(500).json({ message: 'Error fetching products by category' });
  }
})




module.exports = {
  getProducts,
  getCategory,
}

