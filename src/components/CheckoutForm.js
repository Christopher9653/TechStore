//Formulario de pago
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle } from 'lucide-react';

const CheckoutForm = ({ onConfirmPurchase, onBackToCart }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    address: '',
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Aquí podrías enviar los datos a un backend real
    console.log('Datos del cliente:', formData);
    setIsSubmitted(true);
    onConfirmPurchase();
  };

  if (isSubmitted) {
    return (
      <motion.div
        className="bg-white rounded-xl shadow-lg p-8 text-center border border-gray-200/50"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <CheckCircle className="w-20 h-20 text-green-500 mx-auto mb-6" />
        <h3 className="text-3xl font-bold text-gray-800 mb-4">¡Compra Confirmada!</h3>
        <p className="text-gray-600 text-lg mb-6">
          Gracias por tu compra. Recibirás un correo de confirmación pronto.
        </p>
        <motion.button
          onClick={onBackToCart}
          className="bg-blue-500 text-white py-3 px-8 rounded-lg font-semibold shadow-md hover:bg-blue-600 transition-colors"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Volver a la Tienda
        </motion.button>
      </motion.div>
    );
  }

  return (
    <motion.div
      className="bg-white rounded-xl shadow-lg p-8 border border-gray-200/50"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h3 className="text-2xl font-bold text-gray-800 mb-6 border-b pb-4">Datos de Envío</h3>
      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label htmlFor="name" className="block text-gray-700 font-medium mb-2">
            Nombre Completo
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/50"
            required
          />
        </div>
        <div>
          <label htmlFor="email" className="block text-gray-700 font-medium mb-2">
            Correo Electrónico
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/50"
            required
          />
        </div>
        <div>
          <label htmlFor="address" className="block text-gray-700 font-medium mb-2">
            Dirección de Envío
          </label>
          <textarea
            id="address"
            name="address"
            value={formData.address}
            onChange={handleChange}
            rows="3"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/50"
            required
          ></textarea>
        </div>
        <div className="flex justify-between gap-4 pt-4">
          <motion.button
            type="button"
            onClick={onBackToCart}
            className="flex-1 bg-gray-200 text-gray-800 py-3 px-6 rounded-lg font-semibold shadow-md hover:bg-gray-300 transition-colors"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            Volver al Carrito
          </motion.button>
          <motion.button
            type="submit"
            className="flex-1 bg-gradient-to-r from-blue-500 to-purple-600 text-white py-3 px-6 rounded-lg font-semibold shadow-md hover:shadow-lg transition-all duration-300"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            Confirmar Compra
          </motion.button>
        </div>
      </form>
    </motion.div>
  );
};

export default CheckoutForm;