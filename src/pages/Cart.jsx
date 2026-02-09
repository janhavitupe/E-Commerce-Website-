import { Link } from 'react-router-dom'
import { useCart } from '../context/CartContext'

function Cart() {
  const { cart, removeFromCart, updateQuantity, getCartTotal } = useCart()

  if (cart.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Your cart is empty</h2>
          <Link to="/" className="text-blue-500 hover:text-blue-600">
            Continue shopping
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-8">Shopping Cart</h1>

      <div className="space-y-4">
        {cart.map(item => (
          <div key={item.id} className="bg-white rounded-lg shadow-md p-4 flex gap-4">
            <img
              src={item.images?.[0] || item.image}
              alt={item.title}
              className="w-24 h-24 object-cover rounded"
              onError={(e) => {
                e.target.src = 'https://via.placeholder.com/100?text=No+Image'
              }}
            />
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-gray-800">{item.title}</h3>
              <p className="text-gray-600">${item.price}</p>
              <div className="flex items-center gap-2 mt-2">
                <button
                  onClick={() => updateQuantity(item.id, item.quantity - 1)}
                  className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300"
                >
                  -
                </button>
                <span className="px-4">{item.quantity}</span>
                <button
                  onClick={() => updateQuantity(item.id, item.quantity + 1)}
                  className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300"
                >
                  +
                </button>
              </div>
            </div>
            <div className="flex flex-col justify-between items-end">
              <button
                onClick={() => removeFromCart(item.id)}
                className="text-red-500 hover:text-red-600"
              >
                Remove
              </button>
              <p className="text-xl font-bold text-gray-800">
                ${(item.price * item.quantity).toFixed(2)}
              </p>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-8 bg-white rounded-lg shadow-md p-6">
        <div className="flex justify-between items-center mb-4">
          <span className="text-xl font-semibold">Total:</span>
          <span className="text-2xl font-bold text-gray-800">
            ${getCartTotal().toFixed(2)}
          </span>
        </div>
        <Link
          to="/checkout"
          className="block w-full bg-blue-500 text-white text-center py-3 rounded-lg hover:bg-blue-600 transition-colors"
        >
          Proceed to Checkout
        </Link>
      </div>
    </div>
  )
}

export default Cart
