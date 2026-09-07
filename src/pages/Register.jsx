import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from '../utils/axios'
import toast, { Toaster } from 'react-hot-toast'

function Register() {

  const [name, setName] = useState('')

  const [email, setEmail] = useState('')

  const [password, setPassword] = useState('')

  const navigate = useNavigate()

  const handleRegister = async (e) => {

    e.preventDefault()

    try {

      await axios.post('/auth/register', {
        name,
        email,
        password
      })

      toast.success('Registration successful!')

      navigate('/login')

    } catch (error) {

      toast.error(
        error.response?.data?.message ||
        'Something went wrong'
      )
    }
  }

  return (

    <div className="min-h-screen bg-gray-100 flex items-center justify-center">

      <Toaster />

      <div className="bg-white p-10 rounded-2xl shadow-lg w-full max-w-md flex flex-col items-center gap-4">

        {/* Logo */}
        <div className="bg-yellow-400 px-6 py-2 rounded-xl">

          <span className="font-extrabold text-2xl">
            blinkit
          </span>

        </div>

        {/* Heading */}
        <h1 className="text-3xl font-extrabold text-gray-900">
          Create Account
        </h1>

        <p className="text-gray-500">
          Sign up to continue
        </p>

        {/* Form */}
        <form
          onSubmit={handleRegister}
          className="w-full flex flex-col gap-3 mt-2"
        >

          <input
            type="text"
            placeholder="Enter name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="border border-gray-300 p-3 rounded-full w-full outline-none focus:border-green-500 px-5"
          />

          <input
            type="email"
            placeholder="Enter email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="border border-gray-300 p-3 rounded-full w-full outline-none focus:border-green-500 px-5"
          />

          <input
            type="password"
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="border border-gray-300 p-3 rounded-full w-full outline-none focus:border-green-500 px-5"
          />

          <button
            type="submit"
            className="bg-gray-900 text-white py-3 rounded-full font-bold hover:bg-gray-800 mt-2"
          >
            Register
          </button>

        </form>

      </div>

    </div>
  )
}

export default Register