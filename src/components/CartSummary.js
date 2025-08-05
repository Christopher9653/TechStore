//Pasarela de pago
import React from 'react';
import { motion } from 'framer-motion';
import { formatCurrency } from '../utils/helpers';

const CartSummary = ({ subtotal, taxes, total, onCheckout }) => {
  return (
    <motion.div
      className="bg-white rounded-xl shadow-lg p-6 border border-gray-200/50"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
    >
      <h3 className="text-2xl font-bold text-gray-800 mb-4 border-b pb-3">Resumen del Carrito</h3>
      <div className="space-y-2 text-gray-700">
        <div className="flex justify-between">
          <span>Subtotal:</span>
          <span className="font-semibold">{formatCurrency(subtotal)}</span>
        </div>
        <div className="flex justify-between">
          <span>Impuestos (15%):</span>
          <span className="font-semibold">{formatCurrency(taxes)}</span>
        </div>
        <div className="flex justify-between text-xl font-bold text-gray-900 pt-2 border-t mt-2">
          <span>Total:</span>
          <span>{formatCurrency(total)}</span>
        </div>
      </div>
      <motion.button
        onClick={onCheckout}
        className="mt-6 w-full bg-gradient-to-r from-green-500 to-teal-600 text-white py-3 px-6 rounded-lg font-semibold shadow-md hover:shadow-lg transition-all duration-300"
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        Proceder al Pago
      </motion.button>
    </motion.div>
  );
};

export default CartSummary;
