import React from 'react';
import Img from 'gatsby-image';
import MenuItemStyles from '../styles/MenuItemStyles';
import calculatePizzaPrice from '../utils/calculatePizzaPrice';
import formatMoney from '../utils/formatMoney';

export default function PizzaOrder({ order, pizzas, removeFromOrder }) {
  return (
    <>
      {order.map((singleOrder, i) => {
        const pizzaOrder = pizzas.find((pizza) => pizza.id === singleOrder.id);
        return (
          <MenuItemStyles key={i}>
            <Img fluid={pizzaOrder.image.asset.fluid} alt={pizzaOrder.name} />
            <h2>{pizzaOrder.name}</h2>
            <p>
              {formatMoney(
                calculatePizzaPrice(pizzaOrder.price, singleOrder.size)
              )}
              <button
                type="button"
                className="remove"
                title={`Remove ${singleOrder.size} ${pizzaOrder.name}`}
                onClick={() => removeFromOrder(i)}
              >
                &times;
              </button>
            </p>
          </MenuItemStyles>
        );
      })}
    </>
  );
}
