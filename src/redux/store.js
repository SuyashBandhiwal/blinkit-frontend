// configureStore = Redux store banane ka easy way
import { configureStore } from '@reduxjs/toolkit'
// cartReducer = Cart ka logic (add, remove, clear)
import cartReducer from './cartSlice'

const store = configureStore({
    reducer: {
        cart: cartReducer
    }
})

export default store


