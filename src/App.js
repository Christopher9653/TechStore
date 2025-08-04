import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingCart, Store } from 'lucide-react';
import ProductCard from './components/ProductCard';
import CartItem from './components/CartItem';
import CartSummary from './components/CartSummary';
import CheckoutForm from './components/CheckoutForm';
import PaymentGateway from './components/PaymentGateway';
import ProductFilters from './components/ProductFilters';
import { defaultProducts } from './mock/products';
import { calculateCartTotals } from './utils/helpers';

const App = () => {
  const [products] = useState(defaultProducts);
  const [cartItems, setCartItems] = useState([]);
  const [view, setView] = useState('products'); // 'products', 'cart', 'checkout', 'payment'
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  useEffect(() => {
    const storedCart = localStorage.getItem('shopcart_items');
    if (storedCart) {
      setCartItems(JSON.parse(storedCart));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('shopcart_items', JSON.stringify(cartItems));
  }, [cartItems]);

  const handleAddToCart = (productToAdd) => {
    setCartItems((prevItems) => {
      const existingItem = prevItems.find((item) => item.id === productToAdd.id);
      if (existingItem) {
        return prevItems.map((item) =>
          item.id === productToAdd.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      } else {
        return [...prevItems, { ...productToAdd, quantity: 1 }];
      }
    });
  };

  const handleUpdateQuantity = (id, newQuantity) => {
    if (newQuantity <= 0) {
      handleRemoveItem(id);
      return;
    }
    setCartItems((prevItems) =>
      prevItems.map((item) => (item.id === id ? { ...item, quantity: newQuantity } : item))
    );
  };

  const handleRemoveItem = (id) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.id !== id));
  };

  const handlePaymentSuccess = () => {
    setCartItems([]); // Vaciar el carrito después de la compra exitosa
    setView('products'); // Volver a la vista de productos
  };

  const handlePaymentError = (message) => {
    console.error("Error de pago:", message);
    // Aquí podrías mostrar un mensaje al usuario
  };

  const { subtotal, taxes, total } = calculateCartTotals(cartItems);

  const categories = useMemo(() => {
    const uniqueCategories = [...new Set(products.map(p => p.category))];
    return uniqueCategories;
  }, [products]);

  const filteredProducts = useMemo(() => {
    return products.filter(product => {
      const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            product.description.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [products, searchTerm, selectedCategory]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 via-orange-50 to-red-50 p-8">
      <div className="container mx-auto max-w-6xl">
        <motion.header
          className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl p-6 mb-8 flex flex-col md:flex-row items-center justify-between gap-6 border border-orange-200/50"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex items-center gap-4">
            <motion.div
              className="p-3 bg-gradient-to-br from-orange-500 to-red-600 rounded-2xl"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <ShoppingCart className="w-8 h-8 text-white" />
            </motion.div>
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-orange-900 to-red-600 bg-clip-text text-transparent">
                TechStore
              </h1>
              <p className="text-orange-700 font-medium">Tu destino de compras</p>
            </div>
          </div>
          <nav className="flex gap-4">
            <motion.button
              onClick={() => setView('products')}
              className={`px-5 py-2 rounded-xl font-semibold flex items-center gap-2 transition-all duration-300 ${
                view === 'products'
                  ? 'bg-orange-500 text-white shadow-md'
                  : 'bg-orange-100 text-orange-700 hover:bg-orange-200'
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Store className="w-5 h-5" />
              Productos
            </motion.button>
            <motion.button
              onClick={() => setView('cart')}
              className={`px-5 py-2 rounded-xl font-semibold flex items-center gap-2 transition-all duration-300 ${
                view === 'cart'
                  ? 'bg-orange-500 text-white shadow-md'
                  : 'bg-orange-100 text-orange-700 hover:bg-orange-200'
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <ShoppingCart className="w-5 h-5" />
              Carrito ({cartItems.length})
            </motion.button>
          </nav>
        </motion.header>

        <AnimatePresence mode="wait">
          {view === 'products' && (
            <motion.div
              key="products"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 50 }}
              transition={{ duration: 0.5 }}
            >
              <ProductFilters
                searchTerm={searchTerm}
                onSearchChange={setSearchTerm}
                selectedCategory={selectedCategory}
                onCategoryChange={setSelectedCategory}
                categories={categories}
              />
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredProducts.length > 0 ? (
                  filteredProducts.map((product) => (
                    <ProductCard key={product.id} product={product} onAddToCart={handleAddToCart} />
                  ))
                ) : (
                  <motion.div
                    className="lg:col-span-3 bg-white/80 backdrop-blur-xl rounded-3xl p-12 text-center shadow-xl border border-orange-200/50"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5 }}
                  >
                    <h3 className="text-2xl font-bold text-orange-900 mb-3">
                      No se encontraron productos
                    </h3>
                    <p className="text-orange-600">
                      Intenta ajustar tus filtros o tu búsqueda.
                    </p>
                  </motion.div>
                )}
              </div>
            </motion.div>
          )}

          {view === 'cart' && (
            <motion.div
              key="cart"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 50 }}
              transition={{ duration: 0.5 }}
              className="grid grid-cols-1 lg:grid-cols-3 gap-8"
            >
              <div className="lg:col-span-2 space-y-6">
                {cartItems.length === 0 ? (
                  <motion.div
                    className="bg-white/80 backdrop-blur-xl rounded-3xl p-12 text-center shadow-xl border border-orange-200/50"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5 }}
                  >
                    <ShoppingCart className="w-24 h-24 text-orange-400 mx-auto mb-6" />
                    <h3 className="text-2xl font-bold text-orange-900 mb-3">
                      Tu carrito está vacío
                    </h3>
                    <p className="text-orange-600">
                      ¡Parece que no has añadido nada aún! Explora nuestros productos.
                    </p>
                    <motion.button
                      onClick={() => setView('products')}
                      className="mt-6 bg-orange-500 text-white py-3 px-6 rounded-lg font-semibold shadow-md hover:bg-orange-600 transition-colors"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      Ir a la Tienda
                    </motion.button>
                  </motion.div>
                ) : (
                  <AnimatePresence>
                    {cartItems.map((item) => (
                      <CartItem
                        key={item.id}
                        item={item}
                        onUpdateQuantity={handleUpdateQuantity}
                        onRemoveItem={handleRemoveItem}
                      />
                    ))}
                  </AnimatePresence>
                )}
              </div>
              {cartItems.length > 0 && (
                <div className="lg:col-span-1">
                  <CartSummary
                    subtotal={subtotal}
                    taxes={taxes}
                    total={total}
                    onCheckout={() => setView('checkout')}
                  />
                </div>
              )}
            </motion.div>
          )}

          {view === 'checkout' && (
            <motion.div
              key="checkout"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 50 }}
              transition={{ duration: 0.5 }}
              className="max-w-2xl mx-auto"
            >
              <CheckoutForm
                onConfirmPurchase={() => setView('payment')}
                onBackToCart={() => setView('cart')}
              />
            </motion.div>
          )}

          {view === 'payment' && (
            <motion.div
              key="payment"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 50 }}
              transition={{ duration: 0.5 }}
              className="max-w-2xl mx-auto"
            >
              <PaymentGateway
                total={total}
                onPaymentSuccess={handlePaymentSuccess}
                onPaymentError={handlePaymentError}
                onBackToCheckout={() => setView('checkout')}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default App;