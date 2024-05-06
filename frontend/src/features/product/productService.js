import axios from "axios";

const API_URL = '/api/products/';

//fetch products
const fetchProducts = async(token) => {

    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    }
    try {
        const response = await axios.get(`${API_URL}`,config)
        return response.data
    } catch (error) {
        throw error
    }
}

//fetch products by category
const productsByCategory = async(category, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    }
    try {
        const response = await axios.post(`${API_URL}category`, {category}, config)
        console.log(response.data)
        return response.data
    } catch (error) {
        throw error
    }
}



const productService ={
    fetchProducts,
    productsByCategory,
}


export default productService