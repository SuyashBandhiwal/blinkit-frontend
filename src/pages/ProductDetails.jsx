import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { addToCart, removeFromCart } from '../redux/cartSlice'
import axios from '../utils/axios'

const ProductDetails = () => {

  const { id } = useParams()
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const [product, setProduct] = useState(null)
  const [loading, setLoading] = useState(true)

  const cartItems = useSelector((state) => state.cart.items)
  const cartItem = cartItems.find((item) => item._id === id)

  useEffect(() => {

    const fetchProduct = async () => {

      try {

        const { data } = await axios.get(`/products/${id}`)

        setProduct(data)

      } catch (error) {

        console.log(error)

      } finally {

        setLoading(false)
      }
    }

    fetchProduct()

  }, [id])

  if (loading) {

    return (
      <div className='flex justify-center items-center h-screen'>
        <h1 className='text-2xl font-bold'>Loading...</h1>
      </div>
    )
  }

  if (!product) {

    return (
      <div className='flex justify-center items-center h-screen'>
        <h1 className='text-2xl font-bold text-gray-500'>
          Product not found
        </h1>
      </div>
    )
  }

  return (

    <div className='max-w-4xl mx-auto p-6'>

      <button
        onClick={() => navigate(-1)}
        className='mb-4 text-green-600 font-semibold'
      >
        &larr; Back
      </button>

      <div className='grid md:grid-cols-2 gap-8'>

        <div className='bg-gray-50 rounded-2xl p-8 flex items-center justify-center'>

          <img
            src={product.image}
            alt={product.name}
            className='max-h-80 object-contain'
            onError={(e) => {
              e.target.src = 'https://placehold.co/300x300?text=Product'
            }}
          />

        </div>

        <div>

          <h1 className='text-2xl font-bold text-gray-800 mb-2'>
            {product.name}
          </h1>

          <p className='text-gray-500 mb-1'>
            {product.category}
          </p>

          <p className='text-sm text-gray-400 mb-4'>
            {product.stock > 0
              ? `In stock: ${product.stock}`
              : 'Out of stock'}
          </p>

          <p className='text-3xl font-bold text-gray-900 mb-4'>
            &#8377;{product.price}
          </p>

          <p className='text-gray-600 mb-6'>
            {product.description}
          </p>

          {
            !cartItem ? (

              <button
                onClick={() => dispatch(addToCart({ ...product, quantity: 1 }))}
                disabled={product.stock === 0}
                className='bg-green-500 hover:bg-green-600 disabled:bg-gray-300 text-white font-bold px-8 py-3 rounded-lg transition'
              >
                ADD TO CART
              </button>

            ) : (

              <div className='flex items-center gap-4 border-2 border-green-500 rounded-lg w-fit px-4 py-2'>

                <button
                  onClick={() => dispatch(removeFromCart(product._id))}
                  className='text-green-600 font-bold text-xl'
                >
                  &minus;
                </button>

                <span className='font-bold text-lg'>
                  {cartItem.quantity}
                </span>

                <button
                  onClick={() => dispatch(addToCart({ ...product, quantity: 1 }))}
                  className='text-green-600 font-bold text-xl'
                >
                  +
                </button>

              </div>
            )
          }

        </div>

      </div>

    </div>
  )
}

export default ProductDetails
