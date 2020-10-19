import { useContext, useState } from 'react';
import OrderContext from '../components/OrderContext';
import attachNameAndPrice from './attachNameAndPrices';
import calculateOrderTotal from './calculateOrderTotal';

export default function usePizza({ pizzas, values }) {
  const [order, setOrder] = useContext(OrderContext);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  function addToOrder(orderedPizza) {
    setOrder([...order, orderedPizza]);
  }
  function removeFromOrder(index) {
    setOrder([...order.slice(0, index), ...order.slice(index + 1)]);
  }
  async function submitOrder(e) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    // setMessage('Go eat');
    const body = {
      order: attachNameAndPrice(order, pizzas),
      total: calculateOrderTotal(order, pizzas),
      name: values.name,
      email: values.email,
      bottrap: values.bottrap,
    };
    const res = await fetch(
      `${process.env.GATSBY_SERVERLESS_BASE}/placeOrder`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
      }
    );
    const text = JSON.parse(await res.text());
    if (res.status >= 400 && res.status < 600) {
      setLoading(false);
      setError(text.message);
    } else {
      setLoading(false);
      setMessage('Success sended');
    }
  }

  return {
    order,
    addToOrder,
    removeFromOrder,
    error,
    message,
    loading,
    submitOrder,
  };
}
