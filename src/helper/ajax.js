import axios from 'axios'

const ajax = axios.create({
    baseURL: import.meta.env.VITE_BASE_URL,
    headers: {
        token: localStorage.getItem('evote-himati:token') || 'YOUR_TOKEN_HERE'
    }
})

export default ajax 