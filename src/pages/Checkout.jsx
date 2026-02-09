import { useNavigate } from 'react-router-dom'
import { useCart } from '../context/CartContext'
import { useEffect } from 'react'

function Checkout() {
  const navigate = useNavigate()
  const { cart, clearCart, getCartTotal } = useCart()

  useEffect(() => {
    if (cart.length === 0) {
      navigate('/')
    }
  }, [cart, navigate])

  const handleCheckout = () => {
    clearCart()
    alert('Order placed successfully!')
    navigate('/')
  }

  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-8">Checkout</h1>

      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
        <div className="space-y-2">
          {cart.map(item => (
            <div key={item.id} className="flex justify-between">
              <span className="text-gray-600">
                {item.title} x {item.quantity}
              </span>
              <span className="font-semibold">
                ${(item.price * item.quantity).toFixed(2)}
              </span>
            </div>
          ))}
        </div>
        <div className="border-t mt-4 pt-4">
          <div className="flex justify-between text-xl font-bold">
            <span>Total:</span>
            <span>${getCartTotal().toFixed(2)}</span>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <h2 className="text-xl font-semibold mb-4">Shipping Information</h2>
        <form className="space-y-4">
          <input
            type="text"
            placeholder="Full Name"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="email"
            placeholder="Email"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="text"
            placeholder="Address"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <div className="grid grid-cols-2 gap-4">
            <input
              type="text"
              placeholder="City"
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="text"
              placeholder="Postal Code"
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </form>
      </div>

      <button
        onClick={handleCheckout}
        className="w-full bg-blue-500 text-white py-3 rounded-lg hover:bg-blue-600 transition-colors text-lg font-semibold"
      >
        Place Order
      </button>
    </div>
  )
}

export default Checkout
