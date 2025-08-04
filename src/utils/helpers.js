//cambio de moneda
export const formatCurrency = (amount) => {
  return new Intl.NumberFormat('es-ES', {
    style: 'currency',
    currency: 'USD',
  }).format(amount);
};

export const calculateCartTotals = (cartItems) => {
  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const taxRate = 0.13; // 13% de impuestos
  const taxes = subtotal * taxRate;
  const total = subtotal + taxes;
  return { subtotal, taxes, total };
};