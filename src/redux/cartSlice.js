import { createSlice } from '@reduxjs/toolkit'

const cartSlice = createSlice({
  name: 'cart',

  initialState: {
    items: [],
    orders: [],
    isCartOpen: false
  },

  reducers: {

    addToCart: (state, action) => {
      const existing = state.items.find(
        item => item._id === action.payload._id
      )
      if (existing) {
        existing.quantity += 1
      } else {
        state.items.push({ ...action.payload, quantity: 1 })
      }
    },

    removeFromCart: (state, action) => {
      const existing = state.items.find(
        item => item._id === action.payload
      )
      if (existing) {
        if (existing.quantity === 1) {
          state.items = state.items.filter(
            item => item._id !== action.payload
          )
        } else {
          existing.quantity -= 1
        }
      }
    },

    placeOrder: (state) => {
      const newOrder = {
        id: Date.now(),
        items: state.items,
        total: state.items.reduce(
          (total, item) => total + item.price * item.quantity,
          0
        )
      }
      state.orders.push(newOrder)
      state.items = []
    },

    clearCart: (state) => {
      state.items = []
    },

    openCart: (state) => {
      state.isCartOpen = true
    },

    closeCart: (state) => {
      state.isCartOpen = false
    },

    toggleCart: (state) => {
      state.isCartOpen = !state.isCartOpen
    }
  }
})

export const {
  addToCart,
  removeFromCart,
  placeOrder,
  clearCart,
  openCart,
  closeCart,
  toggleCart
} = cartSlice.actions

export default cartSlice.reducer