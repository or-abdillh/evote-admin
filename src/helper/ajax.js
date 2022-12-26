import axios from 'axios'

const ajax = axios.create({
    baseURL: import.meta.env.VITE_BASE_URL
})

export default ajax 