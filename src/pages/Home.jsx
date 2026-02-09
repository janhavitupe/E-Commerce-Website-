import { useState, useEffect } from 'react'
import { getProducts, getCategories } from '../services/api'
import ProductCard from '../components/ProductCard'
import CategoryTabs from '../components/CategoryTabs'

function Home() {
  const [products, setProducts] = useState([])
  const [categories, setCategories] = useState([])
  const [filteredProducts, setFilteredProducts] = useState([])
  const [selectedCategory, setSelectedCategory] = useState(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    fetchData()
  }, [])

  useEffect(() => {
    filterProducts()
  }, [products, selectedCategory, searchTerm])

  const fetchData = async () => {
    try {
      setLoading(true)
      const [productsData, categoriesData] = await Promise.all([
        getProducts(),
        getCategories()
      ])
      setProducts(productsData)
      setCategories(categoriesData)
      setError(null)
    } catch (err) {
      setError('Failed to load products. Please try again later.')
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  const filterProducts = () => {
    let filtered = products

    if (selectedCategory) {
      filtered = filtered.filter(p => p.category?.id === selectedCategory)
    }

    if (searchTerm) {
      filtered = filtered.filter(p =>
        p.title.toLowerCase().includes(searchTerm.toLowerCase())
      )
    }

    setFilteredProducts(filtered)
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-xl text-gray-600">Loading...</div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-xl text-red-600">{error}</div>
      </div>
    )
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-6">
        <input
          type="text"
          placeholder="Search products..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div className="mb-6">
        <CategoryTabs
          categories={categories}
          selectedCategory={selectedCategory}
          onSelectCategory={setSelectedCategory}
        />
      </div>

      {filteredProducts.length === 0 ? (
        <div className="text-center text-gray-600 py-12">
          No products found
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredProducts.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  )
}

export default Home
