export const formatCurrency = (amount) => {
  return new Intl.NumberFormat('es-ES', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,  // Fuerza 2 decimales
    maximumFractionDigits: 2,  // Evita más de 2 decimales
  }).format(amount);
};
export const calculateCartTotals = (cartItems) => {
  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const taxRate = 0.15; // 15% de impuestos
  const taxes = parseFloat((subtotal * taxRate).toFixed(2)); // Redondea a 2 decimales
  const total = parseFloat((subtotal + taxes).toFixed(2));   // Redondea a 2 decimales
  return { subtotal, taxes, total };
};
