import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'
import axios from '../utils/axios'

const Admin = () => {

  const navigate = useNavigate()

  const [products, setProducts] = useState([])

  const [name, setName] = useState('')
  const [price, setPrice] = useState('')
  const [category, setCategory] = useState('')
  const [image, setImage] = useState('')
  const [stock, setStock] = useState('')
  const [description, setDescription] = useState('')

  useEffect(() => {

    const user = JSON.parse(localStorage.getItem('user'))

    if (!user) {

      toast.error('Please login first')

      navigate('/login')

      return
    }

    if (user.role !== 'admin') {

      toast.error('Access denied')

      navigate('/')

      return
    }

    fetchProducts()

  }, [])

  const fetchProducts = async () => {

    try {

      const { data } = await axios.get('/products')

      setProducts(data)

    } catch (error) {

      console.log(error)
    }
  }

  const handleAddProduct = async (e) => {

    e.preventDefault()

    try {

      const user = JSON.parse(localStorage.getItem('user'))

      await axios.post(
        '/products',
        {
          name,
          price,
          category,
          image,
          stock,
          description
        },
        {
          headers: {
            Authorization: `Bearer ${user.token}`
          }
        }
      )

      toast.success('Product added successfully')

      setName('')
      setPrice('')
      setCategory('')
      setImage('')
      setStock('')
      setDescription('')

      fetchProducts()

    } catch (error) {

      toast.error(
        error.response?.data?.message ||
        'Something went wrong'
      )
    }
  }

  const handleDelete = async (id) => {

    try {

      const user = JSON.parse(localStorage.getItem('user'))

      await axios.delete(
        `/products/${id}`,
        {
          headers: {
            Authorization: `Bearer ${user.token}`
          }
        }
      )

      toast.success('Product deleted')

      fetchProducts()

    } catch (error) {

      toast.error('Delete failed')
    }
  }

  const handleEdit = async (product) => {

    const updatedName = prompt(
      'Enter new product name',
      product.name
    )

    if (!updatedName) return

    try {

      const user = JSON.parse(localStorage.getItem('user'))

      await axios.put(
        `/products/${product._id}`,
        {
          name: updatedName
        },
        {
          headers: {
            Authorization: `Bearer ${user.token}`
          }
        }
      )

      toast.success('Product updated')

      fetchProducts()

    } catch (error) {

      toast.error('Update failed')
    }
  }

  return (

    <div className='max-w-5xl mx-auto p-6'>

      <h1 className='text-3xl font-bold mb-8'>
        Admin Dashboard
      </h1>

      <form
        onSubmit={handleAddProduct}
        className='bg-white shadow-md rounded-xl p-6 flex flex-col gap-4'
      >

        <input
          type='text'
          placeholder='Product Name'
          value={name}
          onChange={(e) => setName(e.target.value)}
          className='border p-3 rounded-lg'
        />

        <input
          type='number'
          placeholder='Price'
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          className='border p-3 rounded-lg'
        />

        <input
          type='text'
          placeholder='Category'
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className='border p-3 rounded-lg'
        />

        <input
          type='text'
          placeholder='Image URL'
          value={image}
          onChange={(e) => setImage(e.target.value)}
          className='border p-3 rounded-lg'
        />

        <input
          type='number'
          placeholder='Stock'
          value={stock}
          onChange={(e) => setStock(e.target.value)}
          className='border p-3 rounded-lg'
        />

        <textarea
          placeholder='Description'
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className='border p-3 rounded-lg'
        />

        <button
          type='submit'
          className='bg-green-500 hover:bg-green-600 text-white py-3 rounded-lg font-bold'
        >
          Add Product
        </button>

      </form>

      <div className='mt-10'>

        <h2 className='text-2xl font-bold mb-5'>
          All Products
        </h2>

        <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>

          {
            products.map((product) => (

              <div
                key={product._id}
                className='border rounded-xl p-4 flex items-center justify-between'
              >

                <div className='flex items-center gap-4'>

                  <img
                    src={product.image}
                    alt={product.name}
                    className='w-16 h-16 object-cover rounded-lg'
                  />

                  <div>

                    <h3 className='font-bold'>
                      {product.name}
                    </h3>

                    <p className='text-gray-500'>
                      ₹{product.price}
                    </p>

                  </div>

                </div>

                <div className='flex'>

                  <button
                    onClick={() => handleEdit(product)}
                    className='bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg mr-2'
                  >
                    Edit
                  </button>

                  <button
                    onClick={() => handleDelete(product._id)}
                    className='bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg'
                  >
                    Delete
                  </button>

                </div>

              </div>
            ))
          }

        </div>

      </div>

    </div>
  )
}

export default Admin