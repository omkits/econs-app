import axios from "axios";

const API_URL = '/api/user'

// const removeuser = () => {
//     localStorage.setItem(' ')
// }

// removeuser()


//registering user
const register = async(userData) => {
    const response = await axios.post(API_URL + '/register', userData)

    if (response) {
        localStorage.setItem('user', JSON.stringify(response.data))
    }
    return response.data
}

//login user
const login = async(userData) => {
    const response = await axios.post(API_URL + '/login', userData)

    if (response) {
        localStorage.setItem('user', JSON.stringify(response.data))
    }
    return response.data
}

//get user
const getUser = async(token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    }
    const response = await axios.get(`${API_URL}/getme`, config)
    return response.data
}

//log out user
const logout = async() => {
    localStorage.removeItem('user')
}

const authService = {
    register,
    login,
    logout,
    getUser,
}

export default authService;