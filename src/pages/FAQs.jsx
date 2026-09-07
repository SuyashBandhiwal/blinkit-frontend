import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { FiChevronDown } from 'react-icons/fi'

const faqData = [
  {
    q: 'How fast is delivery?',
    a: 'We deliver most orders within 10-17 minutes depending on your location and item availability.'
  },
  {
    q: 'What are the delivery charges?',
    a: 'Delivery is free on orders above ₹199. Below that, a small delivery charge of ₹40 applies.'
  },
  {
    q: 'How do I track my order?',
    a: 'You can check your order status anytime under "My Orders" in your account.'
  },
  {
    q: 'What payment methods are accepted?',
    a: 'We accept UPI, credit/debit cards, and net banking via Razorpay.'
  },
  {
    q: 'Can I cancel my order?',
    a: 'Since deliveries are very fast, orders usually cannot be cancelled once placed. Please review your cart before checkout.'
  },
  {
    q: 'How do I get a refund?',
    a: 'If an item is missing or damaged, please reach out to our support team from the Account Privacy page for assistance.'
  }
]

const FAQs = () => {

  const navigate = useNavigate()
  const [openIndex, setOpenIndex] = useState(null)

  return (
    <div className='max-w-2xl mx-auto p-6'>

      <button onClick={() => navigate(-1)} className='mb-4 text-green-600 font-semibold'>
        &larr; Back
      </button>

      <h1 className='text-2xl font-bold mb-6'>Frequently Asked Questions</h1>

      <div className='space-y-3'>
        {
          faqData.map((item, index) => (
            <div key={index} className='border border-gray-200 rounded-xl overflow-hidden'>

              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className='w-full flex items-center justify-between px-5 py-4 text-left'
              >
                <span className='font-semibold text-gray-800'>{item.q}</span>
                <FiChevronDown
                  className={`text-gray-500 transition-transform flex-shrink-0 ml-3 ${
                    openIndex === index ? 'rotate-180' : ''
                  }`}
                />
              </button>

              {
                openIndex === index && (
                  <div className='px-5 pb-4 text-sm text-gray-600'>
                    {item.a}
                  </div>
                )
              }

            </div>
          ))
        }
      </div>

    </div>
  )
}

export default FAQs