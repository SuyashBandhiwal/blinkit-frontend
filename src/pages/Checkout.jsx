import { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { clearCart } from '../redux/cartSlice'
import axios from '../utils/axios'
import toast from 'react-hot-toast'

const Checkout = () => {

  const cartItems = useSelector((state) => state.cart.items)

  const [address, setAddress] = useState('')

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const subtotal = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  )

  const deliveryCharge = 40

  const totalAmount = subtotal + deliveryCharge

  const handlePlaceOrder = async () => {

    if (!address) {
      toast.error('Please enter address')
      return
    }

    try {

      const user = JSON.parse(localStorage.getItem('user'))

      // Step 1: Razorpay order backend se banao
      const { data: razorpayOrder } = await axios.post(
        '/payment/create-order',
        { amount: totalAmount },
        { headers: { Authorization: `Bearer ${user.token}` } }
      )

      // Step 2: Razorpay checkout kholo
      const options = {
        key: 'rzp_test_TKddPZrWrQzhQN', // apni Key ID daalo
        amount: razorpayOrder.amount,
        currency: 'INR',
        name: 'Blinkit Clone',
        description: 'Order Payment',
        order_id: razorpayOrder.id,

        handler: async function (response) {

          // Step 3: Payment success hone pe order backend mein save karo
          try {

            const items = cartItems.map((item) => ({
              product: item._id,
              quantity: item.quantity,
              price: item.price
            }))

            await axios.post(
              '/orders',
              { items, totalAmount, address },
              { headers: { Authorization: `Bearer ${user.token}` } }
            )

            dispatch(clearCart())
            toast.success('Order Placed Successfully 😄')
            navigate('/orders')

          } catch (error) {
            toast.error('Order save failed')
          }
        },

        prefill: {
          name: user.name,
          email: user.email
        },

        theme: {
          color: '#22c55e'
        }
      }

      const razorpayObject = new window.Razorpay(options)
      razorpayObject.open()

    } catch (error) {
      toast.error('Payment initiation failed')
    }
  }

  return (

    <div className='max-w-6xl mx-auto p-6'>

      <h1 className='text-3xl font-bold mb-8'>
        Checkout
      </h1>

      <div className='grid md:grid-cols-2 gap-8'>

        {/* LEFT SIDE */}
        <div>

          <h2 className='text-2xl font-bold mb-4'>
            Delivery Address
          </h2>

          <textarea
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            placeholder='Enter your address'
            className='w-full border border-gray-300 rounded-lg p-4 outline-none focus:ring-2 focus:ring-green-500'
            rows='5'
          />

        </div>

        {/* RIGHT SIDE */}
        <div className='border border-gray-200 rounded-xl p-5 shadow-sm h-fit'>

          <h2 className='text-2xl font-bold mb-5'>
            Order Summary
          </h2>

          <div className='space-y-4'>

            {
              cartItems.map((item) => (

                <div
                  key={item._id}
                  className='flex justify-between items-center'
                >

                  <div>

                    <p className='font-semibold'>
                      {item.name}
                    </p>

                    <p className='text-sm text-gray-500'>
                      Qty: {item.quantity}
                    </p>

                  </div>

                  <p className='font-semibold'>
                    ₹{item.price * item.quantity}
                  </p>

                </div>
              ))
            }

          </div>

          <div className='border-t mt-6 pt-4 space-y-2'>

            <div className='flex justify-between'>
              <span>Subtotal</span>
              <span>₹{subtotal}</span>
            </div>

            <div className='flex justify-between'>
              <span>Delivery Charge</span>
              <span>₹{deliveryCharge}</span>
            </div>

            <div className='flex justify-between text-xl font-bold mt-3'>
              <span>Total</span>
              <span>₹{totalAmount}</span>
            </div>

          </div>

          <button
            onClick={handlePlaceOrder}
            className='w-full bg-green-500 hover:bg-green-600 text-white py-3 rounded-lg font-semibold mt-6 transition'
          >
            Place Order
          </button>

        </div>

      </div>

    </div>
  )
}

export default Checkout