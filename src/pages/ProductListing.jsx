import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { addToCart, removeFromCart } from '../redux/cartSlice'
import axios from '../utils/axios'

const ProductListing = () => {
  const { category } = useParams()
  const dispatch = useDispatch()
  const cartItems = useSelector((state) => state.cart.items)
  const [products, setProducts] = useState([])
  const [categoryName, setCategoryName] = useState('')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true)
        setError(null)
        const res = await axios.get(`/products/category/${category}`)  // ← fixed: /api removed
        setProducts(res.data.products || res.data)
        setCategoryName(res.data.categoryName || '')
      } catch (err) {
        console.error(err)
        setError('Failed to load products. Please try again.')
      } finally {
        setLoading(false)
      }
    }
    fetchProducts()
  }, [category])

  const getCartItem = (productId) => {
    return cartItems.find((item) => item._id === productId)
  }

  const handleAdd = (product) => {
    dispatch(addToCart({ ...product, quantity: 1 }))
  }

  const handleIncrease = (product) => {
    dispatch(addToCart({ ...product, quantity: 1 }))
  }

  const handleDecrease = (product) => {
    dispatch(removeFromCart(product._id))
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-500" />
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center text-red-500">
        <p>{error}</p>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-6xl mx-auto px-4 py-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">
          {categoryName || 'Products'}
        </h1>

        {products.length === 0 ? (
          <div className="text-center py-20 text-gray-400">
            <p className="text-5xl mb-4">📦</p>
            <p className="text-lg font-semibold">No products found</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {products.map((product) => (
              <ProductCard
                key={product._id}
                product={product}
                cartItem={getCartItem(product._id)}
                onAdd={handleAdd}
                onIncrease={handleIncrease}
                onDecrease={handleDecrease}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

const ProductCard = ({ product, cartItem, onAdd, onIncrease, onDecrease }) => {
  const navigate = useNavigate()

  return (
    <div
      onClick={() => navigate(`/product/${product._id}`)}
      className="border border-gray-100 rounded-2xl p-3 hover:shadow-md transition bg-white cursor-pointer"
    >
      <div className="bg-gray-50 rounded-xl mb-3 h-36 flex items-center justify-center overflow-hidden">
        <img
          src={product.image}
          alt={product.name}
          className="h-full w-full object-contain p-2"
          onError={(e) => { e.target.src = 'https://placehold.co/150' }}
        />
      </div>

      <div className="flex items-center gap-1 mb-1">
        <span className="text-xs bg-gray-100 text-gray-500 px-2 py-0.5 rounded-full">⚡ 10 mins</span>
      </div>

      <p className="text-sm font-semibold text-gray-800 leading-tight mb-1 line-clamp-2">
        {product.name}
      </p>
      <p className="text-xs text-gray-400 mb-2">{product.unit || '1 pc'}</p>

      <div className="flex items-center justify-between mt-auto">
        <div>
          <p className="text-sm font-bold text-gray-800">₹{product.price}</p>
          {product.originalPrice && (
            <p className="text-xs text-gray-400 line-through">₹{product.originalPrice}</p>
          )}
        </div>

        {!cartItem ? (
          <button
            onClick={(e) => { e.stopPropagation(); onAdd(product) }}
            className="border-2 border-green-500 text-green-600 font-bold text-sm px-4 py-1.5 rounded-lg hover:bg-green-50 transition"
          >
            ADD
          </button>
        ) : (
          <div
            onClick={(e) => e.stopPropagation()}
            className="flex items-center gap-2 border-2 border-green-500 rounded-lg overflow-hidden"
          >
            <button onClick={() => onDecrease(product)} className="text-green-600 font-bold text-lg px-2 hover:bg-green-50">−</button>
            <span className="text-sm font-bold text-green-600 min-w-[16px] text-center">{cartItem.quantity}</span>
            <button onClick={() => onIncrease(product)} className="text-green-600 font-bold text-lg px-2 hover:bg-green-50">+</button>
          </div>
        )}
      </div>
    </div>
  )
}

export default ProductListing