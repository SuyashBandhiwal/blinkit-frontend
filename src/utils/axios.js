// HTTP library import kar rahe ho — backend se data lene ke liye
import axios from 'axios'

// Ek custom axios object banaya jisse API calls easy ho jaye!
const instance = axios.create({
    baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000/api'
})

export default instance
