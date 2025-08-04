//carrito

import React from 'react';
import { motion } from 'framer-motion';
import { Trash2, Plus, Minus } from 'lucide-react';
import { formatCurrency } from '../utils/helpers';

const CartItem = ({ item, onUpdateQuantity, onRemoveItem }) => {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, x: -50 }}
      transition={{ duration: 0.3 }}
      className="flex items-center bg-white rounded-xl shadow-sm p-4 border border-gray-200/50"
    >
      <img
        src={item.image}
        alt={item.name}
        className="w-20 h-20 object-cover rounded-lg mr-4 flex-shrink-0"
      />
      <div className="flex-grow">
        <h4 className="font-semibold text-gray-800 text-lg">{item.name}</h4>
        <p className="text-gray-600 text-sm">{formatCurrency(item.price)} c/u</p>
        <p className="text-gray-800 font-bold mt-1">
          Subtotal: {formatCurrency(item.price * item.quantity)}
        </p>
      </div>
      <div className="flex items-center gap-2 ml-4 flex-shrink-0">
        <motion.button
          onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
          disabled={item.quantity <= 1}
          className="p-2 rounded-full bg-gray-100 text-gray-600 hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <Minus className="w-4 h-4" />
        </motion.button>
        <span className="font-medium text-gray-800 w-6 text-center">{item.quantity}</span>
        <motion.button
          onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
          className="p-2 rounded-full bg-gray-100 text-gray-600 hover:bg-gray-200 transition-colors"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <Plus className="w-4 h-4" />
        </motion.button>
        <motion.button
          onClick={() => onRemoveItem(item.id)}
          className="ml-3 p-2 rounded-full bg-red-100 text-red-600 hover:bg-red-200 transition-colors"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <Trash2 className="w-4 h-4" />
        </motion.button>
      </div>
    </motion.div>
  );
};

export default CartItem;