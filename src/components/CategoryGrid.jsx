import { useNavigate } from 'react-router-dom'
import CategoryCard from './CategoryCard'

const categories = [
  {
    name: 'Paan Corner',
    slug: 'paan-corner',
    image:
      'https://cdn-icons-png.flaticon.com/512/3075/3075977.png'
  },

  {
    name: 'Dairy, Bread & Eggs',
    slug: 'dairy-bread-eggs',
    image:
      'https://cdn-icons-png.flaticon.com/512/3050/3050153.png'
  },

  {
    name: 'Fruits & Vegetables',
    slug: 'fruits-vegetables',
    image:
      'https://cdn-icons-png.flaticon.com/512/2153/2153788.png'
  },

  {
    name: 'Cold Drinks & Juices',
    slug: 'cold-drinks-juices',
    image:
      'https://cdn-icons-png.flaticon.com/512/2405/2405479.png'
  },

  {
    name: 'Snacks & Munchies',
    slug: 'snacks-munchies',
    image:
      'https://cdn-icons-png.flaticon.com/512/2553/2553691.png'
  },

  {
    name: 'Bakery & Biscuits',
    slug: 'bakery-biscuits',
    image:
      'https://cdn-icons-png.flaticon.com/512/3082/3082037.png'
  },

  {
    name: 'Sweet Tooth',
    slug: 'sweet-tooth',
    image:
      'https://cdn-icons-png.flaticon.com/512/1046/1046784.png'
  },

  {
    name: 'Atta, Rice & Dal',
    slug: 'atta-rice-dal',
    image:
      'https://cdn-icons-png.flaticon.com/512/2515/2515183.png'
  },

  {
    name: 'Masala & Dry Fruits',
    slug: 'masala-dry-fruits',
    image:
      'https://cdn-icons-png.flaticon.com/512/135/135620.png'
  },

  {
    name: 'Tea, Coffee & Health Drink',
    slug: 'tea-coffee',
    image:
      'https://cdn-icons-png.flaticon.com/512/924/924514.png'
  },

  {
    name: 'Instant Food',
    slug: 'instant-food',
    image:
      'https://cdn-icons-png.flaticon.com/512/737/737967.png'
  },

  {
    name: 'Sauces & Spreads',
    slug: 'sauces-spreads',
    image:
      'https://cdn-icons-png.flaticon.com/512/2713/2713474.png'
  },

  {
    name: 'Chicken, Meat & Fish',
    slug: 'meat-fish',
    image:
      'https://cdn-icons-png.flaticon.com/512/1046/1046769.png'
  },

  {
    name: 'Organic & Premium',
    slug: 'organic-premium',
    image:
      'https://cdn-icons-png.flaticon.com/512/2909/2909763.png'
  },

  {
    name: 'Baby Care',
    slug: 'baby-care',
    image:
      'https://cdn-icons-png.flaticon.com/512/3048/3048122.png'
  },

  {
    name: 'Cleaning Essentials',
    slug: 'cleaning-essentials',
    image:
      'https://cdn-icons-png.flaticon.com/512/995/995053.png'
  },

  {
    name: 'Home & Office',
    slug: 'home-office',
    image:
      'https://cdn-icons-png.flaticon.com/512/1046/1046857.png'
  },

  {
    name: 'Personal Care',
    slug: 'personal-care',
    image:
      'https://cdn-icons-png.flaticon.com/512/2927/2927347.png'
  },

  {
    name: 'Pet Care',
    slug: 'pet-care',
    image:
      'https://cdn-icons-png.flaticon.com/512/616/616408.png'
  },

  {
    name: 'Pharma & Wellness',
    slug: 'pharma-wellness',
    image:
      'https://cdn-icons-png.flaticon.com/512/2966/2966480.png'
  }
]

const CategoryGrid = () => {
  const navigate = useNavigate()

  return (
    <section className="px-4 py-6 max-w-7xl mx-auto">
      <h2 className="text-xl font-semibold text-gray-800 mb-1">Shop by Category</h2>
      <p className="text-sm text-gray-500 mb-4">Delivered in 10 minutes</p>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3">
        {categories.map((cat) => (
          <CategoryCard
            key={cat.slug}
            category={cat}
            onClick={() => navigate(`/category/${cat.slug}`)}
          />
        ))}
      </div>
    </section>
  )
}

export default CategoryGrid