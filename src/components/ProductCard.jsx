import { Link } from 'react-router-dom'
import { useCart } from '../context/CartContext'

function ProductCard({ product }) {
  const { addToCart } = useCart()

  const handleAddToCart = (e) => {
    e.preventDefault()
    addToCart(product)
  }

  return (
    <Link to={`/product/${product.id}`} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
      <div className="aspect-square overflow-hidden bg-gray-100">
        <img
          src={product.images?.[0] || product.image}
          alt={product.title}
          className="w-full h-full object-cover"
          onError={(e) => {
            e.target.src = 'https://via.placeholder.com/300?text=No+Image'
          }}
        />
      </div>
      <div className="p-4">
        <p className="text-xs text-gray-500 mb-1">{product.category?.name || 'Uncategorized'}</p>
        <h3 className="text-lg font-semibold text-gray-800 mb-2 line-clamp-2">
          {product.title}
        </h3>
        <div className="flex justify-between items-center">
          <span className="text-xl font-bold text-gray-900">${product.price}</span>
          <button
            onClick={handleAddToCart}
            className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </Link>
  )
}

export default ProductCard
