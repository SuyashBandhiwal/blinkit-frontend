import { useNavigate } from 'react-router-dom'
import { FiShield, FiLock, FiEye, FiTrash2 } from 'react-icons/fi'

const AccountPrivacy = () => {

  const navigate = useNavigate()

  const sections = [
    {
      icon: <FiLock />,
      title: 'Password Security',
      text: 'Your password is encrypted and never stored in plain text. We use industry-standard hashing to keep your account safe.'
    },
    {
      icon: <FiEye />,
      title: 'Data We Collect',
      text: 'We only collect your name, email, and order history to provide our delivery service. We never sell your data to third parties.'
    },
    {
      icon: <FiShield />,
      title: 'Payment Security',
      text: 'All payments are processed securely through Razorpay. We do not store your card details on our servers.'
    },
    {
      icon: <FiTrash2 />,
      title: 'Delete Your Account',
      text: 'You can request account deletion anytime by contacting our support team. All your data will be permanently removed.'
    }
  ]

  return (
    <div className='max-w-2xl mx-auto p-6'>

      <button onClick={() => navigate(-1)} className='mb-4 text-green-600 font-semibold'>
        &larr; Back
      </button>

      <h1 className='text-2xl font-bold mb-6'>Account Privacy</h1>

      <div className='space-y-4'>
        {
          sections.map((s, index) => (
            <div key={index} className='border border-gray-200 rounded-xl p-5 flex gap-4'>
              <div className='bg-green-50 text-green-600 rounded-lg p-3 h-fit text-xl'>
                {s.icon}
              </div>
              <div>
                <h3 className='font-bold text-gray-800 mb-1'>{s.title}</h3>
                <p className='text-sm text-gray-600'>{s.text}</p>
              </div>
            </div>
          ))
        }
      </div>

    </div>
  )
}

export default AccountPrivacy