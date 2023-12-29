// Service is only for making http request and sending the data back and setting the localstorage

import axios from "axios";

const API_URL = 'http://localhost:7000/api/users/'

// Register User

const register = async (userData) => {
    const response = await axios.post(API_URL, userData)

    if(response.data){
        localStorage.setItem('user', JSON.stringify(response.data))
    }

    return response.data;
}

const login = async (userData) => {
    const response = await axios.post(API_URL+'login', userData)

    if(response.data){
        localStorage.setItem('user', JSON.stringify(response.data))
    }

    return response.data;
}

const logout = async () => {
    localStorage.removeItem('user')
}

const authService = {
    register,
    logout,
    login,
}

export default authService