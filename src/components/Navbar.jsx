import { useState, useRef, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { FiMapPin, FiSearch, FiChevronDown } from 'react-icons/fi'
import { BsCart3 } from 'react-icons/bs'
import toast from 'react-hot-toast'
import { toggleCart } from '../redux/cartSlice'

const Navbar = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const cartItems = useSelector((state) => state.cart.items)
  const totalItems = cartItems.reduce((acc, item) => acc + item.quantity, 0)
  const [search, setSearch] = useState('')
  const [location, setLocation] = useState(() => {
  const savedLocation = localStorage.getItem('location')
  return savedLocation ? JSON.parse(savedLocation) : null
})

  const [isAccountOpen, setIsAccountOpen] = useState(false)
  const accountRef = useRef(null)

  const user = JSON.parse(localStorage.getItem('user'))
  

  const getLocation = () => {
     navigator.geolocation.getCurrentPosition(
      (position) => { 
        setLocation({ latitude : position.coords.latitude, longitude: position.coords.longitude })
      },
      (error) => {
        console.error('Error getting location:', error)
      }
    )
  }
  useEffect(() => {
  if (location) {
    localStorage.setItem('location', JSON.stringify(location))
  }
}, [location])


  // Dropdown ke bahar click karne pe band ho jaaye
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (accountRef.current && !accountRef.current.contains(e.target)) {
        setIsAccountOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const handleLogout = () => {
    localStorage.removeItem('user')
    toast.success('Logout successful')
    setIsAccountOpen(false)
    navigate('/login')
  }

  return (
    <nav className="sticky top-0 z-50 bg-white border-b border-gray-200 shadow-sm">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center gap-4">

        {/* Logo */}
        <div
          onClick={() => navigate('/')}
          className="cursor-pointer flex-shrink-0"
        >
          <span className="text-2xl font-extrabold text-yellow-400">blink</span>
          <span className="text-2xl font-extrabold text-green-500">it</span>
        </div>

        {/* Location */}
        <div className="flex items-center gap-1 cursor-pointer flex-shrink-0 border-r border-gray-200 pr-4">
          <div>
            <p className="text-xs font-bold text-gray-800 leading-tight">Delivery in 17 minutes</p>
            <div className="flex items-center gap-1">
              <FiMapPin className="text-green-500 text-xs" />
              <p className="text-xs text-gray-500 truncate max-w-[120px]">Your Location</p>
              <FiChevronDown className="text-gray-500 text-xs" />
              <button
                onClick={getLocation}
                className="text-xs text-green-500 hover:text-green-600 transition"
              >
                Get My Location
              </button>
            
            </div>
          </div>
        </div>

        {/* Search Bar */}
        <div className="flex-1 relative">
          <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-lg" />
          <input
            type="text"
            placeholder='Search "sugar"'
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                navigate(`/search/${search}`)
              }
            }}
            className="w-full bg-gray-100 rounded-lg pl-10 pr-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-green-400 transition"
          />
        </div>

        {/* Account / Login */}
        {
          user ? (

            <div className="relative flex-shrink-0" ref={accountRef}>

              <button
                onClick={() => setIsAccountOpen((prev) => !prev)}
                className="flex items-center gap-1 text-sm font-semibold text-gray-700 hover:text-green-600 transition"
              >
                Account
                <FiChevronDown className={`text-xs transition-transform ${isAccountOpen ? 'rotate-180' : ''}`} />
              </button>

              {
                isAccountOpen && (
                  <div className="absolute right-0 top-10 w-72 bg-white rounded-xl shadow-2xl border border-gray-100 py-2 z-50">

                    <div className="px-5 py-3 border-b border-gray-100">
                      <p className="font-bold text-gray-800">My Account</p>
                      <p className="text-xs text-gray-500 mt-1">{user.email}</p>
                    </div>

                    <button
                      onClick={() => { setIsAccountOpen(false); navigate('/orders') }}
                      className="w-full text-left px-5 py-3 text-sm text-gray-700 hover:bg-gray-50 transition"
                    >
                      My Orders
                    </button>

                    <button
                      onClick={() => { setIsAccountOpen(false); navigate('/addresses') }}
                      className="w-full text-left px-5 py-3 text-sm text-gray-700 hover:bg-gray-50 transition"
                    >
                      Saved Addresses
                    </button>

                    <button
                      onClick={() => { setIsAccountOpen(false); navigate('/faqs') }}
                      className="w-full text-left px-5 py-3 text-sm text-gray-700 hover:bg-gray-50 transition"
                    >
                      FAQ's
                    </button>

                    <button
                      onClick={() => { setIsAccountOpen(false); navigate('/privacy') }}
                      className="w-full text-left px-5 py-3 text-sm text-gray-700 hover:bg-gray-50 transition"
                    >
                      Account Privacy
                    </button>

                    <div className="border-t border-gray-100 mt-1">
                      <button
                        onClick={handleLogout}
                        className="w-full text-left px-5 py-3 text-sm font-semibold text-red-500 hover:bg-red-50 transition"
                      >
                        Log Out
                      </button>
                    </div>

                  </div>
                )
              }

            </div>

          ) : (

            <button
              onClick={() => navigate('/login')}
              className="text-sm font-semibold text-gray-700 hover:text-green-600 transition flex-shrink-0"
            >
              Login
            </button>
          )
        }

        {/* Cart */}
        <button
          onClick={() => dispatch(toggleCart())}
          className="flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white text-sm font-semibold px-4 py-2.5 rounded-lg transition flex-shrink-0"
        >
          <BsCart3 className="text-lg" />
          <span>My Cart</span>
          {totalItems > 0 && (
            <span className="bg-white text-green-600 text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
              {totalItems}
            </span>
          )}
        </button>

      </div>
    </nav>
  )
}

export default Navbar