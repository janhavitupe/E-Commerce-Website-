import { Link } from 'react-router-dom'
import { useCart } from '../context/CartContext'

function Navbar() {
  const { getCartCount } = useCart()

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="text-2xl font-bold text-gray-800">
            Shopi
          </Link>
          
          <div className="flex items-center gap-6">
            <Link to="/" className="text-gray-600 hover:text-gray-900">
              Home
            </Link>
            <Link to="/cart" className="relative text-gray-600 hover:text-gray-900">
              Cart
              {getCartCount() > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {getCartCount()}
                </span>
              )}
            </Link>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
