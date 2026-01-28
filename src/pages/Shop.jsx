import { useState } from 'react'
import HeroSection from '../components/HeroSection'

const ShopModal = ({ title, items, isOpen, onClose, category, onAddToCart }) => {
  const [quantity, setQuantity] = useState(1)
  const [selectedType, setSelectedType] = useState('')

  if (!isOpen) return null

  const handleAddToCart = () => {
    if (!selectedType) {
      alert('Please select a type')
      return
    }
    const item = items.find(i => i.value === selectedType)
    onAddToCart({
      category,
      itemType: selectedType,
      itemName: item.label.split(' - ')[0],
      price: item.price,
      quantity: parseInt(quantity),
    })
    setQuantity(1)
    setSelectedType('')
  }

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg max-w-md w-full">
        <div className="border-b p-4 flex justify-between items-center">
          <h3 className="text-xl font-zuumebold text-primary">Select {title}</h3>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 font-bold"
          >
            ✕
          </button>
        </div>
        <div className="p-6 space-y-4">
          <div>
            <label className="block text-sm font-lora font-semibold text-secondary mb-2">
              {title} Type
            </label>
            <select
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 font-lora"
            >
              <option value="">Select type</option>
              {items.map((item) => (
                <option key={item.value} value={item.value}>
                  {item.label}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-lora font-semibold text-secondary mb-2">
              Quantity
            </label>
            <input
              type="number"
              min="1"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 font-lora"
            />
          </div>
        </div>
        <div className="border-t p-4 flex gap-2">
          <button
            onClick={onClose}
            className="flex-1 px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 font-lora"
          >
            Close
          </button>
          <button
            onClick={handleAddToCart}
            className="flex-1 px-4 py-2 bg-primary text-white rounded-lg hover:bg-orange-600 font-lora font-semibold"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  )
}

export default function Shop() {
  const [cart, setCart] = useState([])
  const [openModal, setOpenModal] = useState(null)
  const [customerName, setCustomerName] = useState('')
  const [phoneNumber, setPhoneNumber] = useState('')
  const [deliveryArea, setDeliveryArea] = useState('')

  const shopItems = {
    tshirts: [
      { value: 'running', label: 'Running Tees - KES 1500', price: 1500 },
      { value: 'normal', label: 'Normal Tees - KES 1000', price: 1000 },
      { value: 'longsleeve', label: 'Long Sleeved Tees - KES 1200', price: 1200 },
      { value: 'vneck', label: 'V Neck Tees - KES 1100', price: 1100 },
      { value: 'polo', label: 'Polo Shirts - KES 1300', price: 1300 },
    ],
    caps: [
      { value: 'hiking', label: 'Hiking Caps - KES 800', price: 800 },
      { value: 'golf', label: 'Golf/Sun Caps - KES 900', price: 900 },
      { value: 'normal', label: 'Normal Caps - KES 700', price: 700 },
    ],
    stickers: [
      { value: 'wheels', label: 'Wheels and Boots - KES 200', price: 200 },
      { value: 'james', label: 'James Muhia - KES 250', price: 250 },
    ],
    flasks: [
      { value: 'withCap', label: 'With Cap - KES 1000', price: 1000 },
      { value: 'withoutCapStandard', label: 'Without Cap (Standard) - KES 800', price: 800 },
      { value: 'withoutCapPremium', label: 'Without Cap (Premium) - KES 900', price: 900 },
    ],
  }

  const products = [
    {
      id: 'tshirts',
      title: 'Tshirts',
      image: '/img/shirt.jpeg',
      category: 'tshirts',
    },
    {
      id: 'caps',
      title: 'Caps',
      image: '/img/logo.png',
      category: 'caps',
    },
    {
      id: 'stickers',
      title: 'Stickers',
      image: '/img/logo.png',
      category: 'stickers',
    },
    {
      id: 'flasks',
      title: 'Flasks',
      image: '/img/logo.png',
      category: 'flasks',
    },
  ]

  const handleAddToCart = (item) => {
    setCart([...cart, item])
    alert(`${item.itemName} (x${item.quantity}) added to cart!`)
    setOpenModal(null)
  }

  const handleRemoveFromCart = (index) => {
    setCart(cart.filter((_, i) => i !== index))
  }

  const calculateTotal = () => {
    let total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0)
    if (deliveryArea === 'nairobi') {
      total += 250
    }
    return total
  }

  const handlePayment = () => {
    if (!customerName || !phoneNumber || !deliveryArea || cart.length === 0) {
      alert('Please complete all fields and add items to cart')
      return
    }

    const total = calculateTotal()
    const paymentData = {
      tillNumber: '9096432',
      businessName: 'JAMES MUNGAI MUHIA',
      amount: total,
      customerName,
      phoneNumber,
      items: cart,
    }

    console.log('Initiating M-Pesa STK Push:', paymentData)
    alert('M-Pesa STK Push initiated. Please check your phone to complete the payment.')

    setTimeout(() => {
      alert('Payment received successfully!')
      setCart([])
      setCustomerName('')
      setPhoneNumber('')
      setDeliveryArea('')
    }, 3000)
  }

  return (
    <div>
      <HeroSection
        title="Accessories"
        backgroundImage="/img/khantegri.jpg"
        logo="/img/logo.png"
      />

      {/* Products Section */}
      <section className="max-w-7xl mx-auto md:mx-0 px-4 sm:px-6 lg:px-8 py-12 md:py-20 w-full md:pl-[20%]">
        <h2 className="font-zuumebold text-clamp-h2 text-primary mb-6 text-center">
          Gears and Accessories
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {products.map((product) => (
            <div key={product.id} className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow">
              <div className="aspect-square bg-light flex items-center justify-center overflow-hidden">
                <img
                  src={product.image}
                  alt={product.title}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-4 text-center">
                <h3 className="font-zuumebold text-primary text-lg mb-3">
                  {product.title}
                </h3>
                <button
                  onClick={() => setOpenModal(product.category)}
                  className="bg-primary text-white px-6 py-2 rounded-lg hover:bg-orange-600 font-lora font-semibold"
                >
                  Shop
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Modals */}
      <ShopModal
        title="Tshirt"
        items={shopItems.tshirts}
        isOpen={openModal === 'tshirts'}
        onClose={() => setOpenModal(null)}
        category="tshirts"
        onAddToCart={handleAddToCart}
      />
      <ShopModal
        title="Cap"
        items={shopItems.caps}
        isOpen={openModal === 'caps'}
        onClose={() => setOpenModal(null)}
        category="caps"
        onAddToCart={handleAddToCart}
      />
      <ShopModal
        title="Sticker"
        items={shopItems.stickers}
        isOpen={openModal === 'stickers'}
        onClose={() => setOpenModal(null)}
        category="stickers"
        onAddToCart={handleAddToCart}
      />
      <ShopModal
        title="Flask"
        items={shopItems.flasks}
        isOpen={openModal === 'flasks'}
        onClose={() => setOpenModal(null)}
        category="flasks"
        onAddToCart={handleAddToCart}
      />

      {/* Checkout Section */}
      <section className="max-w-7xl mx-auto md:mx-0 px-4 sm:px-6 lg:px-8 py-12 md:py-20 w-full md:pl-[20%]">
        <h2 className="font-zuumebold text-clamp-h2 text-primary mb-8 text-center">
          Checkout
        </h2>

        <div className="bg-white rounded-lg shadow-lg p-6 max-w-2xl mx-auto">
          <h3 className="font-zuumebold text-primary text-xl mb-4">Cart</h3>

          {cart.length === 0 ? (
            <p className="text-secondary text-center py-8 font-lora">
              Your cart is empty
            </p>
          ) : (
            <ul className="space-y-3 mb-6">
              {cart.map((item, index) => (
                <li key={index} className="flex justify-between items-center bg-light p-3 rounded-lg">
                  <span className="font-lora">
                    {item.itemName} (x{item.quantity}) - KES {item.price * item.quantity}
                  </span>
                  <button
                    onClick={() => handleRemoveFromCart(index)}
                    className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 text-sm font-lora"
                  >
                    Remove
                  </button>
                </li>
              ))}
            </ul>
          )}

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-lora font-semibold text-secondary mb-2">
                Customer Name
              </label>
              <input
                type="text"
                value={customerName}
                onChange={(e) => setCustomerName(e.target.value)}
                placeholder="Enter your name"
                className="w-full border border-gray-300 rounded-lg px-3 py-2 font-lora"
              />
            </div>

            <div>
              <label className="block text-sm font-lora font-semibold text-secondary mb-2">
                Delivery Area
              </label>
              <select
                value={deliveryArea}
                onChange={(e) => setDeliveryArea(e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 font-lora"
              >
                <option value="">Select delivery area</option>
                <option value="nairobi">Nairobi - KES 250</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-lora font-semibold text-secondary mb-2">
                Phone Number (for M-Pesa)
              </label>
              <input
                type="tel"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                placeholder="Enter phone number"
                className="w-full border border-gray-300 rounded-lg px-3 py-2 font-lora"
              />
            </div>

            <div className="bg-light p-4 rounded-lg">
              <h4 className="font-zuumebold text-primary text-lg">
                Total: KES {calculateTotal()}
              </h4>
            </div>

            <button
              onClick={handlePayment}
              className="w-full bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 font-zuumebold text-lg"
            >
              Pay with M-Pesa
            </button>
          </div>
        </div>
      </section>
    </div>
  )
}
