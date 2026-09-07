import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import axios from '../utils/axios'

const SearchResults = () => {

  const { query } = useParams()
  const navigate = useNavigate()

  const [products, setProducts] = useState([])

  const [loading, setLoading] = useState(true)

  useEffect(() => {

    const fetchProducts = async () => {

      try {

        const res = await axios.get('/products')

        const allProducts = res.data.products || res.data

        console.log(allProducts)

        const filteredProducts = allProducts.filter((product) => {

  return (
    product.name &&
    product.name.toLowerCase().includes(query.toLowerCase())
  )
})

        setProducts(filteredProducts)

      } catch (error) {

        console.log(error)

      } finally {

        setLoading(false)
      }
    }

    fetchProducts()

  }, [query])

  if (loading) {

    return (

      <div className='flex justify-center items-center h-screen'>
        <h1 className='text-2xl font-bold'>
          Loading...
        </h1>
      </div>
    )
  }

  return (

    <div className='max-w-6xl mx-auto p-6'>

      <h1 className='text-3xl font-bold mb-8'>
        Search Results for "{query}"
      </h1>

      {
        products.length === 0 ? (

          <div className='text-center mt-20'>

            <h2 className='text-2xl font-semibold text-gray-500'>
              No Products Found
            </h2>

          </div>

        ) : (

          <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4'>

            {
              products.map((product) => (

                <div
                  key={product._id}
                  onClick={() => navigate(`/product/${product._id}`)}
                  className='border border-gray-200 rounded-xl p-3 shadow-sm cursor-pointer hover:shadow-md transition'
                >

                  <img
                    src={product.image}
                    alt={product.name}
                    className='w-full h-32 object-contain bg-gray-50 rounded-lg p-2'
                    onError={(e) => {
                      e.target.src =
                        'https://placehold.co/100x100?text=Product'
                    }}
                  />

                  <h2 className='font-semibold mt-3 line-clamp-2'>
                    {product.name}
                  </h2>

                  <p className='text-green-600 font-bold mt-2'>
                    ₹{product.price}
                  </p>

                </div>
              ))
            }

          </div>
        )
      }

    </div>
  )
}

export default SearchResults