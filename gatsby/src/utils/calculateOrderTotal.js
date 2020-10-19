import calculatePizzaPrice from './calculatePizzaPrice';
import formatMoney from './formatMoney';

export default function calculateOrderTotal(order, pizzas) {
  const total = order.reduce((acc, singleOrder) => {
    const pizzaOrder = pizzas.find((pizza) => pizza.id === singleOrder.id);
    return acc + calculatePizzaPrice(pizzaOrder.price, singleOrder.size);
  }, 0);
  return formatMoney(total);
}
