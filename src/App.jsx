// App.jsx ek GUIDE HAI:
// "Agar user '/' pe jaye → Home dikhao"

import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Login from './pages/Login'
import Home from './pages/Home'
import ProductListing from './pages/ProductListing'
import Cart from './pages/Cart'
import Checkout from './pages/Checkout'
import Orders from './pages/Orders'
import SearchResults from './pages/SearchResults'
import Register from './pages/Register'
import Admin from './pages/Admin'
import ProductDetails from './pages/ProductDetails'
import StaticPage from './pages/StaticPage'
import CartDrawer from './components/CartDrawer'
import SavedAddresses from './pages/SavedAddresses'
import FAQs from './pages/FAQs'
import AccountPrivacy from './pages/AccountPrivacy'

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <CartDrawer />
      
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/category/:category" element={<ProductListing />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/orders" element={<Orders />} />
        <Route path="/search/:query" element={<SearchResults />} />
        <Route path="/register" element={<Register />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/product/:id" element={<ProductDetails />} />
        <Route path="/page/:slug" element={<StaticPage />} />
        <Route path="/addresses" element={<SavedAddresses />} />
        <Route path="/faqs" element={<FAQs />} />
        <Route path="/privacy" element={<AccountPrivacy />} />

      </Routes>
    </BrowserRouter>
  )
}

export default App