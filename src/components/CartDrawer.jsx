import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { FiX, FiClock } from 'react-icons/fi'
import { addToCart, removeFromCart, closeCart } from '../redux/cartSlice'

const CartDrawer = () => {

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const isCartOpen = useSelector((state) => state.cart.isCartOpen)
  const cartItems = useSelector((state) => state.cart.items)

  const totalItems = cartItems.reduce((acc, item) => acc + item.quantity, 0)

  const itemsTotal = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  )

  const deliveryCharge = itemsTotal >= 199 ? 0 : 40
  const handlingCharge = 2

  const grandTotal = itemsTotal + deliveryCharge + handlingCharge

  const handleProceed = () => {
    const user = JSON.parse(localStorage.getItem('user'))
    dispatch(closeCart())
    if (!user) {
      navigate('/login')
      return
    }
    navigate('/checkout')
  }

  return (
    <>
      <div
        onClick={() => dispatch(closeCart())}
        className={`fixed inset-0 bg-black/40 z-[60] transition-opacity duration-300 ${
          isCartOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
      />

      <div
        className={`fixed top-0 right-0 h-full w-full max-w-md bg-white z-[70] shadow-2xl transform transition-transform duration-300 flex flex-col ${
          isCartOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >

        <div className='flex items-center justify-between px-5 py-4 border-b border-gray-100'>
          <div className='flex items-center gap-3'>
            <button onClick={() => dispatch(closeCart())}>
              <FiX className='text-2xl text-gray-700' />
            </button>
            <h2 className='text-lg font-bold'>My Cart</h2>
          </div>
        </div>

        {
          cartItems.length === 0 ? (

            <div className='flex-1 flex flex-col items-center justify-center gap-3 p-6'>
              <p className='text-6xl'>🛒</p>
              <h3 className='text-lg font-bold text-gray-700'>Your cart is empty</h3>
              <p className='text-sm text-gray-400 text-center'>Add items to get started</p>
              <button
                onClick={() => dispatch(closeCart())}
                className='mt-2 bg-green-500 hover:bg-green-600 text-white font-semibold px-6 py-2.5 rounded-lg transition'
              >
                Continue Shopping
              </button>
            </div>

          ) : (

            <>
              <div className='flex-1 overflow-y-auto'>

                <div className='flex items-center gap-3 px-5 py-4 bg-gray-50'>
                  <div className='bg-white border border-gray-200 rounded-full p-2'>
                    <FiClock className='text-green-600 text-lg' />
                  </div>
                  <div>
                    <p className='font-bold text-gray-800'>Delivery in 10 minutes</p>
                    <p className='text-xs text-gray-500'>Shipment of {totalItems} item{totalItems > 1 ? 's' : ''}</p>
                  </div>
                </div>

                <div className='px-5 divide-y divide-gray-100'>
                  {
                    cartItems.map((item) => (
                      <div key={item._id} className='flex items-center gap-3 py-4'>

                        <img
                          src={item.image}
                          alt={item.name}
                          className='w-16 h-16 object-contain bg-gray-50 rounded-lg p-1 flex-shrink-0'
                          onError={(e) => { e.target.src = 'https://placehold.co/100x100?text=Product' }}
                        />

                        <div className='flex-1 min-w-0'>
                          <p className='text-sm font-medium text-gray-800 line-clamp-2'>{item.name}</p>
                          <p className='text-sm font-bold text-gray-900 mt-1'>₹{item.price}</p>
                        </div>

                        <div className='flex items-center gap-2 border-2 border-green-500 rounded-lg overflow-hidden flex-shrink-0'>
                          <button
                            onClick={() => dispatch(removeFromCart(item._id))}
                            className='text-green-600 font-bold text-lg px-2.5 py-1 hover:bg-green-50'
                          >
                            −
                          </button>
                          <span className='text-sm font-bold text-green-600 min-w-[16px] text-center'>
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => dispatch(addToCart(item))}
                            className='text-green-600 font-bold text-lg px-2.5 py-1 hover:bg-green-50'
                          >
                            +
                          </button>
                        </div>

                      </div>
                    ))
                  }
                </div>

                <div className='px-5 py-4 mt-2'>
                  <h3 className='font-bold text-gray-800 mb-3'>Bill details</h3>

                  <div className='space-y-2 text-sm'>
                    <div className='flex justify-between text-gray-600'>
                      <span>Items total</span>
                      <span className='font-medium text-gray-900'>₹{itemsTotal}</span>
                    </div>

                    <div className='flex justify-between text-gray-600'>
                      <span>Delivery charge</span>
                      <span className='font-medium'>
                        {deliveryCharge === 0 ? (
                          <span className='text-green-600'>FREE</span>
                        ) : (
                          `₹${deliveryCharge}`
                        )}
                      </span>
                    </div>

                    <div className='flex justify-between text-gray-600'>
                      <span>Handling charge</span>
                      <span className='font-medium text-gray-900'>₹{handlingCharge}</span>
                    </div>
                  </div>

                  <div className='flex justify-between items-center border-t border-gray-200 mt-3 pt-3'>
                    <span className='font-bold text-gray-800'>Grand total</span>
                    <span className='font-bold text-gray-900'>₹{grandTotal}</span>
                  </div>
                </div>

              </div>

              <div className='border-t border-gray-100 p-4'>
                <button
                  onClick={handleProceed}
                  className='w-full bg-green-500 hover:bg-green-600 text-white font-bold py-3.5 rounded-xl flex items-center justify-between px-5 transition'
                >
                  <span>₹{grandTotal}<br /><span className='text-xs font-normal'>TOTAL</span></span>
                  <span>
                    {localStorage.getItem('user') ? 'Proceed to Checkout' : 'Login to Proceed'} &rarr;
                  </span>
                </button>
              </div>
            </>
          )
        }

      </div>
    </>
  )
}

export default CartDrawer