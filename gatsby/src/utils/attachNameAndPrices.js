import calculatePizzaPrice from './calculatePizzaPrice';
import formatMoney from './formatMoney';

export default function attachNameAndPrice(order, pizzas) {
  return order.map((item) => {
    const pizza = pizzas.find((pizzaOrder) => pizzaOrder.id === item.id);
    return {
      ...item,
      name: pizza.name,
      thumbnail: pizza.image.asset.fluid.src,
      price: formatMoney(calculatePizzaPrice(pizza.price, item.size)),
    };
  });
}
