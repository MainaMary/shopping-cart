export const calculateTotal = (price: any, quantity: any) => {
  if (!price && !quantity) return;
  const s1 = price.substring(1);
  const total = s1 * quantity;

  return `$${total}`;
};
