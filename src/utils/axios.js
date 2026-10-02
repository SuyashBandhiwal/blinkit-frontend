// HTTP library import kar rahe ho — backend se data lene ke liye
import axios from 'axios'

// Ek custom axios object banaya jisse API calls easy ho jaye!
const instance = axios.create({
    baseURL: 'https://blinkit-fv6m.onrender.com'
})

export default instance
