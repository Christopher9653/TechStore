//No tocar ya esta, son el diseño del producto

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ShoppingCart, Check } from 'lucide-react';
import { formatCurrency } from '../utils/helpers';

const ProductCard = ({ product, onAddToCart }) => {
  const [addCount, setAddCount] = useState(0);

  const handleAddToCart = () => {
    onAddToCart(product);
    setAddCount(prev => prev + 1);
  };

  return (
    <motion.div
      className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-200/50 flex flex-col relative"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      whileHover={{ scale: 1.03, boxShadow: "0 10px 20px rgba(0,0,0,0.1)" }}
    >
      {/* Badge de cantidad en la imagen */}
      {addCount > 0 && (
        <motion.div
          className="absolute top-3 right-3 bg-green-500 text-white px-3 py-1 rounded-full z-10 flex items-center shadow-lg"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          exit={{ scale: 0 }}
          transition={{ type: 'spring', stiffness: 500 }}
        >
          <Check className="w-4 h-4 mr-1" />
          <span className="text-sm font-bold">{addCount} en carrito</span>
        </motion.div>
      )}
      <div className="relative h-48 overflow-hidden">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
      </div>
      <div className="p-6 flex flex-col flex-grow">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm text-blue-600 font-medium bg-blue-50 px-2 py-1 rounded">{product.category}</span>
          <div class="flex items-center space-x-1"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-star w-4 h-4 text-yellow-400 fill-current"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-star w-4 h-4 text-yellow-400 fill-current"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-star w-4 h-4 text-yellow-400 fill-current"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-star w-4 h-4 text-yellow-400 fill-current"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-star w-4 h-4 text-gray-300">
            <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
          </svg><span class="text-sm text-gray-600 ml-1">
              {product.rating && (
                <span>{product.rating.toFixed(1)}</span>
              )}</span></div>
        </div>

        <h3 className="text-xl font-semibold text-gray-800 mb-2">{product.name}</h3>
        <p className="text-gray-600 text-sm mb-4 flex-grow">{product.description}</p>
        <div className="flex items-center justify-between mb-2">
          <span className="text-black text-xl font-bold drop-shadow-md">
            {formatCurrency(product.price)}
          </span>
          <div className="flex items-center justify-between text-gray-500 text-base mb-4">
            <span>Disponibles: {product.stock}</span>
          </div>
        </div>
        <motion.button
          onClick={handleAddToCart}
          className={`mt-auto py-3 px-6 rounded-lg font-semibold flex items-center justify-center gap-2 shadow-md hover:shadow-lg transition-all duration-300 ${addCount > 0
              ? 'bg-green-500 text-white'
              : 'bg-gradient-to-r from-blue-500 to-purple-600 text-white'
            }`}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          {addCount > 0 ? (
            <>
              <Check className="w-5 h-5" />
              {addCount} agregado(s)
            </>
          ) : (
            <>
              <ShoppingCart className="w-5 h-5" />
              Agregar al Carrito
            </>
          )}
        </motion.button>
      </div>
    </motion.div>
  );
};

export default ProductCard;