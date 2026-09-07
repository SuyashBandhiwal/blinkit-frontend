import { useParams, Link } from 'react-router-dom'

const content = {
  blog: { title: 'Blog', body: 'Read the latest updates, stories, and announcements from our team.' },
  privacy: { title: 'Privacy Policy', body: 'Learn how we collect, use, and protect your personal data.' },
  terms: { title: 'Terms & Conditions', body: 'The terms you agree to when using our platform.' },
  faqs: { title: 'FAQs', body: 'Answers to the most commonly asked questions.' },
  security: { title: 'Security', body: 'Details on how we keep your account and payments secure.' },
  contact: { title: 'Contact Us', body: 'Reach out to our support team for any help you need.' },
  partner: { title: 'Partner With Us', body: 'Information for delivery and business partners.' },
  franchise: { title: 'Franchise', body: 'Explore franchise opportunities with us.' },
  seller: { title: 'Become a Seller', body: 'List your products and start selling on our platform.' },
  warehouse: { title: 'Warehouse', body: 'Information about our warehousing and fulfilment network.' },
}

const StaticPage = () => {
  const { slug } = useParams()
  const page = content[slug] || { title: 'Page Not Found', body: "This page doesn't exist yet." }

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-3xl mx-auto px-4 py-16">
        <Link to="/" className="text-sm text-green-600 hover:underline">← Back to Home</Link>
        <h1 className="text-3xl font-bold text-gray-800 mt-4 mb-4">{page.title}</h1>
        <p className="text-gray-500 leading-relaxed">{page.body}</p>
        <p className="text-sm text-gray-400 mt-10">🚧 This page is a placeholder — content coming soon.</p>
      </div>
    </div>
  )
}

export default StaticPage