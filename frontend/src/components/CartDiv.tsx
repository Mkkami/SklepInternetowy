import React, { useEffect, useState } from "react";
import CartItem from "./CartItem";
import "../styles/Cart.css"; // You'll need to create this CSS file
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { checkToken } from "../services/CheckToken";
import Toastify from "toastify-js";
import "toastify-js/src/toastify.css";
import { showToast } from "../services/Toast";

type Item = {
  id: number;
  name: string;
  image: string;
  quantity: number;
  price: number;
  description: string | null;
  mimeType: string;
};

// type CartProps = {
//     items: Item[];
//     onItemRemoved: (itemId: number) => void;
//     onQuantityUpdated: (itemId: number, newQuantity: number) => void;
// };

const CartDiv: React.FC = () => {
  const navigate = useNavigate();
  const [items, setItems] = useState<Item[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [token, setToken] = useState<string | null>(null);

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

  return (
    <div className="cart-container">
      <h2>Your Shopping Cart</h2>
      <div>
        {loading ? (
          //true
          <p>Loading...</p>
        ) : (
          //false
          items.map((item: Item) => <CartItem key={item.id} item={item}/>)
        )}
      </div>
      <div className="cart-total">
        <span>Total: {calculateTotal()} zł</span>
        <button onClick={() => showToast("Buying not there yet")}>Buy</button>
      </div>
    </div>
  );
};
export default CartDiv;
