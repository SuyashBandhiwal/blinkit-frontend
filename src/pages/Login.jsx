import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from '../utils/axios'
import toast, { Toaster } from 'react-hot-toast'

function Login() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const navigate = useNavigate()

    const handleLogin = async (e) => {
        e.preventDefault()
        try {
            const { data } = await axios.post('/auth/login', { email, password })
            localStorage.setItem('user', JSON.stringify(data))
            toast.success('Login successful!')
            navigate('/')
        } catch (error) {

            console.log(error)

            toast.error(error.response?.data?.message || 'Something went wrong')
        }
    }

    return (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center">
            <Toaster />
            <div className="bg-white p-10 rounded-2xl shadow-lg w-full max-w-md flex flex-col items-center gap-4">
                
                {/* Blinkit Logo */}
                <div className="bg-yellow-400 px-6 py-2 rounded-xl">
                    <span className="text-green-700 font-extrabold text-2xl">blinkit</span>
                </div>

                {/* Heading */}
                <h1 className="text-3xl font-extrabold text-gray-900">India's last minute app</h1>
                <p className="text-gray-500">Log in or Sign up</p>

                {/* Form */}
                <form onSubmit={handleLogin} className="w-full flex flex-col gap-3 mt-2">
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
                        Continue
                    </button>
                </form>

                {/* Terms */}
                <div className="text-gray-400 text-sm text-center mt-2">

                    <p className="text-sm text-gray-500 mt-3">

  Don't have an account?{' '}

  <span
    onClick={() => navigate('/register')}
    className="text-green-600 font-semibold cursor-pointer"
  >
    Register
  </span>

</p>

                    By continuing, you agree to our{' '}
                    <span className="underline cursor-pointer">Terms of service</span>
                    {' & '}
                    <span className="underline cursor-pointer">Privacy policy</span>
                </div>
            </div>
        </div>
    )
}

export default Login