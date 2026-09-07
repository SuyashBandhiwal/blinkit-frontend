import { useEffect, useState } from 'react'
import axios from '../utils/axios'

const Orders = () => {

  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {

    const fetchOrders = async () => {
      try {
        const user = JSON.parse(localStorage.getItem('user'))

        const { data } = await axios.get('/orders/myorders', {
          headers: { Authorization: `Bearer ${user.token}` }
        })

        setOrders(data)
      } catch (error) {
        console.log(error)
      } finally {
        setLoading(false)
      }
    }

    fetchOrders()

  }, [])

  if (loading) {
    return (
      <div className='flex justify-center items-center h-screen'>
        <h1 className='text-2xl font-bold'>Loading...</h1>
      </div>
    )
  }

  return (

    <div className='max-w-5xl mx-auto p-6'>

      <h1 className='text-3xl font-bold mb-8'>
        My Orders
      </h1>

      {
        orders.length === 0 ? (

          <div className='text-center mt-20'>

            <h2 className='text-2xl font-semibold text-gray-500'>
              No Orders Yet
            </h2>

          </div>

        ) : (

          <div className='space-y-6'>

            {
              orders.map((order) => (

                <div
                  key={order._id}
                  className='border border-gray-200 rounded-xl p-5 shadow-sm'
                >

                  <div className='mb-4 flex justify-between items-center'>

                    <h2 className='text-lg font-bold'>
                      Order #{order._id.slice(-8)}
                    </h2>

                    <p className='text-green-600 font-semibold capitalize'>
                      {order.status}
                    </p>

                  </div>

                  <div className='space-y-4'>

                    {
                      order.items.map((item, index) => (

                        <div
                          key={index}
                          className='flex items-center justify-between'
                        >

                          <div className='flex items-center gap-4'>

                            <img
                              src={item.product?.image}
                              alt={item.product?.name}
                              className='w-16 h-16 object-cover bg-gray-50 rounded-lg p-2'
                              onError={(e) => {
                                e.target.src =
                                  'https://placehold.co/100x100?text=Product'
                              }}
                            />

                            <div>

                              <h3 className='font-semibold'>
                                {item.product?.name}
                              </h3>

                              <p className='text-sm text-gray-500'>
                                Quantity: {item.quantity}
                              </p>

                            </div>

                          </div>

                          <p className='font-bold'>
                            ₹{item.price * item.quantity}
                          </p>

                        </div>
                      ))
                    }

                  </div>

                  <div className='border-t mt-5 pt-4 flex justify-between items-center'>

                    <h3 className='text-xl font-bold'>
                      Total
                    </h3>

                    <h3 className='text-xl font-bold text-green-600'>
                      ₹{order.totalAmount}
                    </h3>

                  </div>

                </div>
              ))
            }

          </div>
        )
      }

    </div>
  )
}

export default Orders
