const CategoryCard = ({ category, onClick }) => {
  return (
    <div
      onClick={onClick}
      className="bg-white rounded-2xl border border-gray-100 p-3 flex flex-col items-center gap-2 cursor-pointer hover:border-green-400 hover:shadow-sm hover:-translate-y-0.5 transition-all duration-150"
    >
      <div className="w-20 h-20 rounded-xl overflow-hidden flex items-center justify-center bg-gray-50">
        <img
          src={category.image}
          alt={category.name}
          className="w-full h-full object-contain"
          onError={(e) => {
            e.target.style.display = 'none'
            e.target.parentNode.innerHTML = '🛒'
          }}
        />
      </div>
      <span className="text-xs font-medium text-gray-700 text-center leading-tight">
        {category.name}
      </span>
    </div>
  )
}

export default CategoryCard