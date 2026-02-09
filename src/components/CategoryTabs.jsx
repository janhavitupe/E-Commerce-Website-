function CategoryTabs({ categories, selectedCategory, onSelectCategory }) {
  return (
    <div className="flex gap-2 overflow-x-auto pb-2">
      <button
        onClick={() => onSelectCategory(null)}
        className={`px-4 py-2 rounded-lg whitespace-nowrap ${
          selectedCategory === null
            ? 'bg-blue-500 text-white'
            : 'bg-white text-gray-700 hover:bg-gray-100'
        }`}
      >
        All
      </button>
      {categories.map(category => (
        <button
          key={category.id}
          onClick={() => onSelectCategory(category.id)}
          className={`px-4 py-2 rounded-lg whitespace-nowrap ${
            selectedCategory === category.id
              ? 'bg-blue-500 text-white'
              : 'bg-white text-gray-700 hover:bg-gray-100'
          }`}
        >
          {category.name}
        </button>
      ))}
    </div>
  )
}

export default CategoryTabs
