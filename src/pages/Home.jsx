import { useNavigate } from 'react-router-dom'
import CategoryGrid from '../components/CategoryGrid'  // ← import karo

const banners = [
  { id: 1, title: "Get printouts delivered", subtitle: "Safe & secure • Convenient & Fast", bg: "bg-blue-700", emoji: "🖨️", slug: "printouts" },
  { id: 2, title: "Pharmacy at your doorstep!", subtitle: "Cough syrups, pain relief sprays & more", bg: "bg-teal-500", emoji: "💊", slug: "pharma-wellness" },
  { id: 3, title: "Pet care supplies at your door", subtitle: "Food, treats, toys & more", bg: "bg-yellow-500", emoji: "🐾", slug: "pet-care" },
  { id: 4, title: "No time for a diaper run?", subtitle: "Get baby care essentials", bg: "bg-gray-800", emoji: "👶", slug: "baby-care" },
]

const Home = () => {
  const navigate = useNavigate()

  return (
    <div className="min-h-screen bg-white">

      {/* Banner Section */}
      <div className="max-w-6xl mx-auto px-4 pt-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-8">
          {banners.map((banner) => (
            <div
              key={banner.id}
              onClick={() => navigate(`/category/${banner.slug}`)}
              className={`${banner.bg} rounded-xl p-4 text-white cursor-pointer hover:opacity-90 transition min-h-[120px] flex flex-col justify-between`}
            >
              <div>
                <p className="font-bold text-sm leading-tight">{banner.title}</p>
                <p className="text-xs mt-1 opacity-80">{banner.subtitle}</p>
              </div>
              <div className="flex items-center justify-between mt-2">
                <button className="bg-white text-black text-xs font-semibold px-3 py-1 rounded-full">
                  Order Now
                </button>
                <span className="text-3xl">{banner.emoji}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Categories - CategoryGrid component use karo */}
        <CategoryGrid />  {/* ← bas yeh ek line */}

      </div>

      {/* Footer */}
      <footer className="bg-gray-50 border-t border-gray-200 mt-6 py-10 px-6">
        <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-3 gap-8">
          <div>
            <h4 className="font-bold text-gray-800 mb-3">Useful Links</h4>
            {["Blog", "Privacy", "Terms", "FAQs", "Security", "Contact", "Partner", "Franchise", "Seller", "Warehouse"].map(link => (
              <p
                key={link}
                onClick={() => navigate(`/page/${link.toLowerCase()}`)}
                className="text-sm text-gray-500 hover:text-green-600 cursor-pointer mb-1"
              >
                {link}
              </p>
            ))}
          </div>
          <div>
            <h4 className="font-bold text-gray-800 mb-3">
              Categories{' '}
              <span
                onClick={() => navigate('/category/all')}
                className="text-green-600 text-sm font-normal cursor-pointer hover:underline"
              >
                see all
              </span>
            </h4>
            {[
              { name: "Vegetables & Fruits", slug: "fruits-vegetables" },
              { name: "Cold Drinks & Juices", slug: "cold-drinks-juices" },
              { name: "Bakery & Biscuits", slug: "bakery-biscuits" },
              { name: "Dry Fruits, Masala & Oil", slug: "masala-dry-fruits" },
              { name: "Paan Corner", slug: "paan-corner" },
              { name: "Pharma & Wellness", slug: "pharma-wellness" },
              { name: "Personal Care", slug: "personal-care" },
              { name: "Electronics & Electricals", slug: "electronics-electricals" },
              { name: "Toys & Games", slug: "toys-games" },
            ].map(cat => (
              <p
                key={cat.slug}
                onClick={() => navigate(`/category/${cat.slug}`)}
                className="text-sm text-gray-500 hover:text-green-600 cursor-pointer mb-1"
              >
                {cat.name}
              </p>
            ))}
          </div>
          <div className="mt-7">
            {[
              { name: "Dairy & Breakfast", slug: "dairy-bread-eggs" },
              { name: "Instant & Frozen Food", slug: "instant-food" },
              { name: "Sweet Tooth", slug: "sweet-tooth" },
              { name: "Sauces & Spreads", slug: "sauces-spreads" },
              { name: "Organic & Premium", slug: "organic-premium" },
              { name: "Cleaning Essentials", slug: "cleaning-essentials" },
              { name: "Pet Care", slug: "pet-care" },
              { name: "Kitchen & Dining", slug: "kitchen-dining" },
              { name: "Stationery Needs", slug: "home-office" },
            ].map(cat => (
              <p
                key={cat.slug}
                onClick={() => navigate(`/category/${cat.slug}`)}
                className="text-sm text-gray-500 hover:text-green-600 cursor-pointer mb-1"
              >
                {cat.name}
              </p>
            ))}
          </div>
        </div>
        <div className="max-w-6xl mx-auto mt-8 pt-6 border-t border-gray-200 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-gray-400">© Blink Commerce Private Limited, 2016-2026</p>
          <div className="flex gap-3 text-gray-500 text-sm">
            {["📱 App Store", "▶️ Play Store"].map(app => (
              <button key={app} className="border border-gray-300 rounded-lg px-3 py-1 text-xs hover:border-green-500">{app}</button>
            ))}
          </div>
          <div className="flex gap-3 text-xl">
            {["📘", "🐦", "📸", "💼", "🔴"].map((icon, i) => (
              <span key={i} className="cursor-pointer hover:scale-110 transition">{icon}</span>
            ))}
          </div>
        </div>
      </footer>

    </div>
  )
}

export default Home