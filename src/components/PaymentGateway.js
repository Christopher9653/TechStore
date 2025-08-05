//Pago con tarjeta de crédito
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { CreditCard, CheckCircle, XCircle } from 'lucide-react';

const PaymentGateway = ({ total, onPaymentSuccess, onPaymentError, onBackToCheckout }) => {
  const [cardNumber, setCardNumber] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [cvv, setCvv] = useState('');
  const [nameOnCard, setNameOnCard] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [paymentStatus, setPaymentStatus] = useState(null); // 'success', 'error'

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setPaymentStatus(null);

    // Simulación de procesamiento de pago
    // En un entorno real, aquí integrarías Stripe.js, PayPal, etc.
    // Por ahora, un simple temporizador para simular la respuesta.
    await new Promise((resolve) => setTimeout(resolve, 2000));

    const isSuccess = Math.random() > 0.2; // 80% de éxito, 20% de error para probar

    setIsLoading(false);
    if (isSuccess) {
      setPaymentStatus('success');
      onPaymentSuccess();
    } else {
      setPaymentStatus('error');
      onPaymentError('Error en el procesamiento del pago. Inténtalo de nuevo.');
    }
  };

  return (
    <motion.div
      className="bg-white rounded-xl shadow-lg p-8 border border-gray-200/50"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h3 className="text-2xl font-bold text-gray-800 mb-6 border-b pb-4 flex items-center gap-3">
        <CreditCard className="w-7 h-7 text-blue-500" />
        Pasarela de Pago
      </h3>

      {paymentStatus === 'success' && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center py-8"
        >
          <CheckCircle className="w-24 h-24 text-green-500 mx-auto mb-6" />
          <h4 className="text-3xl font-bold text-gray-800 mb-3">¡Pago Exitoso!</h4>
          <p className="text-gray-600 text-lg">Tu transacción ha sido procesada correctamente.</p>
        </motion.div>
      )}

      {paymentStatus === 'error' && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center py-8"
        >
          <XCircle className="w-24 h-24 text-red-500 mx-auto mb-6" />
          <h4 className="text-3xl font-bold text-gray-800 mb-3">Error en el Pago</h4>
          <p className="text-red-600 text-lg">Hubo un problema al procesar tu pago. Por favor, verifica tus datos e inténtalo de nuevo.</p>
          <motion.button
            onClick={() => setPaymentStatus(null)}
            className="mt-6 bg-blue-500 text-white py-3 px-6 rounded-lg font-semibold shadow-md hover:bg-blue-600 transition-colors"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Reintentar
          </motion.button>
        </motion.div>
      )}

      {!paymentStatus && (
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label htmlFor="cardNumber" className="block text-gray-700 font-medium mb-2">
              Número de Tarjeta
            </label>
            <input
              type="text"
              id="cardNumber"
              value={cardNumber}
              onChange={(e) => setCardNumber(e.target.value.replace(/\D/g, '').slice(0, 16))}
              placeholder="XXXX XXXX XXXX XXXX"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/50"
              required
              inputMode="numeric"
            />
          </div>
          <div className="flex gap-4">
            <div className="flex-1">
              <label htmlFor="expiryDate" className="block text-gray-700 font-medium mb-2">
                Fecha de Vencimiento (MM/AA)
              </label>
              <input
                type="text"
                id="expiryDate"
                value={expiryDate}
                onChange={(e) => {
                  let value = e.target.value.replace(/\D/g, '');
                  if (value.length > 2) value = value.slice(0, 2) + '/' + value.slice(2, 4);
                  setExpiryDate(value);
                }}
                placeholder="MM/AA"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/50"
                required
                maxLength="5"
                inputMode="numeric"
              />
            </div>
            <div className="flex-1">
              <label htmlFor="cvv" className="block text-gray-700 font-medium mb-2">
                CVV
              </label>
              <input
                type="text"
                id="cvv"
                value={cvv}
                onChange={(e) => setCvv(e.target.value.replace(/\D/g, '').slice(0, 4))}
                placeholder="XXX"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/50"
                required
                maxLength="3"
                inputMode="numeric"
              />
            </div>
          </div>
          <div>
            <label htmlFor="nameOnCard" className="block text-gray-700 font-medium mb-2">
              Nombre en la Tarjeta
            </label>
            <input
              type="text"
              id="nameOnCard"
              value={nameOnCard}
              onChange={(e) => setNameOnCard(e.target.value)}
              placeholder="Nombre del Titular"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/50"
              required
            />
          </div>

          <div className="flex justify-between gap-4 pt-4">
            <motion.button
              type="button"
              onClick={onBackToCheckout}
              className="flex-1 bg-gray-200 text-gray-800 py-3 px-6 rounded-lg font-semibold shadow-md hover:bg-gray-300 transition-colors"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              disabled={isLoading}
            >
              Volver
            </motion.button>
            <motion.button
              type="submit"
              className={`flex-1 bg-gradient-to-r from-green-500 to-teal-600 text-white py-3 px-6 rounded-lg font-semibold shadow-md hover:shadow-lg transition-all duration-300 ${
                isLoading ? 'opacity-70 cursor-not-allowed' : ''
              }`}
              whileHover={{ scale: isLoading ? 1 : 1.02 }}
              whileTap={{ scale: isLoading ? 1 : 0.98 }}
              disabled={isLoading}
            >
              {isLoading ? 'Procesando...' : `Pagar ${total}`}
            </motion.button>
          </div>
        </form>
      )}
    </motion.div>
  );
};

export default PaymentGateway;
