import axios from "axios";

const API_URL = '/api/cart';

const getcart = async(token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };
    try {
        const response = await axios.get(`${API_URL}/`, config)
        return response.data
    } catch (error) {
        throw error
    }
}

const addCart = async(token, cartData ) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        },
    }
    try {
        const response = await axios.post(`${API_URL}/add`, {cartData},config)
        console.log(cartData)
        return response.data
    } catch (error) {
        throw error
    }
}


const cartService = {
    getcart,
    addCart,
}

export default cartService;