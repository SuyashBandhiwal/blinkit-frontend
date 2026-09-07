import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'
import { FiMapPin, FiTrash2, FiPlus } from 'react-icons/fi'

const SavedAddresses = () => {

  const navigate = useNavigate()

  const [addresses, setAddresses] = useState([])
  const [showForm, setShowForm] = useState(false)
  const [label, setLabel] = useState('Home')
  const [address, setAddress] = useState('')

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem('addresses')) || []
    setAddresses(saved)
  }, [])

  const handleAdd = (e) => {
    e.preventDefault()

    if (!address.trim()) {
      toast.error('Please enter an address')
      return
    }

    const newAddress = { id: Date.now(), label, address }
    const updated = [...addresses, newAddress]

    setAddresses(updated)
    localStorage.setItem('addresses', JSON.stringify(updated))

    setAddress('')
    setLabel('Home')
    setShowForm(false)
    toast.success('Address saved')
  }

  const handleDelete = (id) => {
    const updated = addresses.filter((a) => a.id !== id)
    setAddresses(updated)
    localStorage.setItem('addresses', JSON.stringify(updated))
    toast.success('Address removed')
  }

  return (
    <div className='max-w-2xl mx-auto p-6'>

      <button onClick={() => navigate(-1)} className='mb-4 text-green-600 font-semibold'>
        &larr; Back
      </button>

      <div className='flex items-center justify-between mb-6'>
        <h1 className='text-2xl font-bold'>Saved Addresses</h1>
        <button
          onClick={() => setShowForm((prev) => !prev)}
          className='flex items-center gap-1 bg-green-500 hover:bg-green-600 text-white text-sm font-semibold px-4 py-2 rounded-lg transition'
        >
          <FiPlus /> Add New
        </button>
      </div>

      {
        showForm && (
          <form onSubmit={handleAdd} className='bg-gray-50 border border-gray-200 rounded-xl p-4 mb-6 flex flex-col gap-3'>

            <div className='flex gap-2'>
              {['Home', 'Work', 'Other'].map((opt) => (
                <button
                  type='button'
                  key={opt}
                  onClick={() => setLabel(opt)}
                  className={`px-4 py-1.5 rounded-full text-sm font-semibold border ${
                    label === opt
                      ? 'bg-green-500 text-white border-green-500'
                      : 'bg-white text-gray-600 border-gray-300'
                  }`}
                >
                  {opt}
                </button>
              ))}
            </div>

            <textarea
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              placeholder='Enter full address'
              rows='3'
              className='border border-gray-300 rounded-lg p-3 outline-none focus:ring-2 focus:ring-green-400'
            />

            <button
              type='submit'
              className='bg-green-500 hover:bg-green-600 text-white font-semibold py-2.5 rounded-lg transition'
            >
              Save Address
            </button>

          </form>
        )
      }

      {
        addresses.length === 0 ? (

          <div className='text-center mt-16'>
            <FiMapPin className='text-5xl text-gray-300 mx-auto mb-3' />
            <p className='text-gray-500'>No saved addresses yet</p>
          </div>

        ) : (

          <div className='space-y-3'>
            {
              addresses.map((a) => (
                <div
                  key={a.id}
                  className='flex items-start justify-between border border-gray-200 rounded-xl p-4'
                >
                  <div className='flex gap-3'>
                    <FiMapPin className='text-green-600 text-xl mt-1 flex-shrink-0' />
                    <div>
                      <p className='font-bold text-gray-800'>{a.label}</p>
                      <p className='text-sm text-gray-500 mt-1'>{a.address}</p>
                    </div>
                  </div>
                  <button onClick={() => handleDelete(a.id)}>
                    <FiTrash2 className='text-gray-400 hover:text-red-500 transition' />
                  </button>
                </div>
              ))
            }
          </div>
        )
      }

    </div>
  )
}

export default SavedAddresses