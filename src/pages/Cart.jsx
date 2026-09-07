import React from 'react'
import toast from 'react-hot-toast'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { addToCart, removeFromCart } from '../redux/cartSlice'


const Cart = () => {

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const cartItems = useSelector((state) => state.cart.items)

  const totalPrice = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  )

  return (

    <div className='max-w-4xl mx-auto p-6'>

      <h1 className='text-3xl font-bold mb-6'>
        My Cart
      </h1>

      {
        cartItems.length === 0 ? (

          <div className='text-center mt-20'>
            <h2 className='text-2xl font-semibold text-gray-500'>
              Your Cart is Empty
            </h2>
          </div>

        ) : (

          <>
            {
              cartItems.map((item) => (

                <div
                  key={item._id}
                  className='flex items-center justify-between border border-gray-200 rounded-xl p-4 mb-4 shadow-sm'
                >

                  {/* LEFT SIDE */}
                  <div className='flex items-center gap-4'>

                    <img
                      src={item.image}
                      alt={item.name}
                      className='w-20 h-20 object-cover bg-gray-50 rounded-lg p-2'
                      onError={(e) => {
                        e.target.src =
                          'https://placehold.co/100x100?text=Product'
                      }}
                    />

                    <div>

                      <h2 className='text-lg font-bold text-gray-800'>
                        {item.name}
                      </h2>

                      <p className='text-gray-500 mt-1'>
                        ₹{item.price}
                      </p>

                    </div>

                  </div>

                  {/* RIGHT SIDE */}
                  <div className='flex items-center gap-3'>

                    <button
                      onClick={() =>
                        dispatch(removeFromCart(item._id))
                      }
                      className='bg-green-500 text-white px-3 py-1 rounded-md hover:bg-green-600'
                    >
                      -
                    </button>

                    <span className='font-bold text-lg min-w-[20px] text-center'>
                      {item.quantity}
                    </span>

                    <button
                      onClick={() =>
                        dispatch(addToCart(item))
                      }
                      className='bg-green-500 text-white px-3 py-1 rounded-md hover:bg-green-600'
                    >
                      +
                    </button>

                  </div>

                </div>
              ))
            }

            {/* TOTAL SECTION */}
            <div className='mt-8 flex justify-between items-center border-t pt-5'>

              <h2 className='text-2xl font-bold'>
                Total: ₹{totalPrice}
              </h2>

              <button
                onClick={() => {

  const user = localStorage.getItem('user')

  if (!user) {

    toast.error('Please login first')

    navigate('/login')

    return
  }

  navigate('/checkout')
}}
                className='bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-lg font-semibold transition'
              >
                Checkout
              </button>

            </div>

          </>
        )
      }

    </div>
  )
}

export default Cart