import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { getProductById } from '../services/api'
import { useCart } from '../context/CartContext'

function ProductDetails() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { addToCart } = useCart()
  const [product, setProduct] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    fetchProduct()
  }, [id])

  const fetchProduct = async () => {
    try {
      setLoading(true)
      const data = await getProductById(id)
      setProduct(data)
      setError(null)
    } catch (err) {
      setError('Failed to load product details')
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  const handleAddToCart = () => {
    addToCart(product)
    alert('Product added to cart!')
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-xl text-gray-600">Loading...</div>
      </div>
    )
  }

  if (error || !product) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-xl text-red-600">{error || 'Product not found'}</div>
      </div>
    )
  }

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <button
        onClick={() => navigate(-1)}
        className="mb-6 text-blue-500 hover:text-blue-600"
      >
        ← Back
      </button>

      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="grid md:grid-cols-2 gap-8 p-8">
          <div className="aspect-square overflow-hidden bg-gray-100 rounded-lg">
            <img
              src={product.images?.[0] || product.image}
              alt={product.title}
              className="w-full h-full object-cover"
              onError={(e) => {
                e.target.src = 'https://via.placeholder.com/500?text=No+Image'
              }}
            />
          </div>

          <div className="flex flex-col">
            <p className="text-sm text-gray-500 mb-2">
              {product.category?.name || 'Uncategorized'}
            </p>
            <h1 className="text-3xl font-bold text-gray-800 mb-4">
              {product.title}
            </h1>
            <p className="text-gray-600 mb-6">
              {product.description}
            </p>
            <div className="text-3xl font-bold text-gray-900 mb-6">
              ${product.price}
            </div>
            <button
              onClick={handleAddToCart}
              className="bg-blue-500 text-white px-8 py-3 rounded-lg hover:bg-blue-600 transition-colors text-lg font-semibold"
            >
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProductDetails
