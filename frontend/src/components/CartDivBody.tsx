import React, { useEffect, useState } from "react";
import CartItem from "./CartItem";
import PaymentForm from "./PaymentForm";
import "../styles/Cart.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { checkToken } from "../services/Token";
import "toastify-js/src/toastify.css";

type Item = {
  id: number;
  name: string;
  image: string;
  quantity: number;
  price: number;
  description: string | null;
  mimeType: string;
};

const CartDivBody: React.FC = () => {
  const navigate = useNavigate();
  const [items, setItems] = useState<Item[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [token, setToken] = useState<string | null>(null);
  const [showPaymentForm, setShowPaymentForm] = useState(false);

  useEffect(() => {
    async function fetchToken() {
      setToken(await checkToken(navigate));
    }
    fetchToken();
  }, [navigate]);

  const fetchCart = async () => {
    if (!token) return;
    try {
      const response = await axios.get<Item[]>("http://localhost:8080/cart", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const sortedItems = response.data.sort((a, b) =>
        a.name.localeCompare(b.name)
      );
      setItems(sortedItems);
      setLoading(false);
    } catch (error) {
      console.error("Blad koszyka: ", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCart();
  }, [token]);

  const calculateTotal = () => {
    return items
      .reduce(
        (total: number, item: Item) => total + item.price * item.quantity,
        0
      )
      .toFixed(2);
  };

  const handleBuy = () => {
    setShowPaymentForm(true);
  };

  const handlePaymentSuccess = () => {
    setShowPaymentForm(false);
    // Możesz dodać przekierowanie na stronę główną lub wyczyścić koszyk
    navigate("/");
  };

  return (
    <div className="cart-container">
      <div>
        {loading ? (
          <p>Loading...</p>
        ) : (
          items.map((item: Item) => <CartItem key={item.id} item={item}/>)
        )}
      </div>
      <div className='cart-container'>
        <div className="cart-total">
          <span>Do zapłaty: {calculateTotal()} zł</span>
          {!showPaymentForm ? (
            <button onClick={handleBuy} disabled={!token}>
              Kup
            </button>
          ) : (
            token && (
              <PaymentForm
                token={token}
                onSuccess={handlePaymentSuccess}
                onCancel={() => setShowPaymentForm(false)}
              />
            )
          )}
        </div>
      </div>
    </div>
  );
};

export default CartDivBody;