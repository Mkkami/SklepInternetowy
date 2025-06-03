import React, { useState, useEffect } from "react";
import "../styles/CartItem.css";
import { useNavigate } from "react-router-dom";
import { checkToken } from "../services/Token";
import { showToast } from "../services/Toast";
import trashIcon from "../assets/trash.svg";

type Item = {
  id: number;
  name: string;
  image: string;
  quantity: number;
  price: number;
};

const CartItem = ({ item }: { item: Item }) => {
  const [quantity, setQuantity] = useState(item.quantity || 1);
  const navigate = useNavigate();
  const [token, setToken] = useState<string | null>(null);
  const [tempQuantity, setTempQuantity] = useState(item.quantity || 1); // For editing

  useEffect(() => {
    async function fetchToken() {
        setToken(await checkToken(navigate));
    }
    fetchToken();
}, [navigate]);

const handleIncreaseQuantity = async () => {
  const newQuantity = quantity + 1;
  setQuantity(newQuantity);
  setTempQuantity(newQuantity);
  await updateCartQuantity(item.id, newQuantity);
};

const handleDecreaseQuantity = async () => {
  if (quantity > 1) {
    const newQuantity = quantity - 1;
    setQuantity(newQuantity);
    setTempQuantity(newQuantity);
    await updateCartQuantity(item.id, newQuantity);
  }
};

  const handleQuantityChange = async (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const newQuantity = Math.max(1, parseInt(e.target.value) || 1);
    setQuantity(newQuantity);
    await updateCartQuantity(item.id, newQuantity);
  };

  const handleRemoveFromCart = async () => {
    try {
      const response = await fetch("http://localhost:8080/cart/item", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          id: item.id,
          quantity: 1,
        }),
      });

      if (!response.ok) {
        if (response.status === 401) {
          navigate("/login");
        } else {
          throw new Error("Failed to remove product");
        }
      }

      showToast("Product removed from cart!");
    } catch (error) {
      console.error("Error removing product from cart:", error);
      alert("Failed to remove product from cart");
    }
  };

  const updateCartQuantity = async (productId: number, newQuantity: number) => {
    try {
      const response = await fetch("http://localhost:8080/cart/item", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          id: productId,
          quantity: newQuantity,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to update quantity");
      }
    } catch (error) {
      console.error("Error updating quantity:", error);
      alert("Failed to update quantity");
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, ""); // Remove non-digits
    setTempQuantity(value === "" ? 1 : parseInt(value));
  }

  const handleInputBlur = () => {
    setTempQuantity(quantity);
  };

  const handleInputKeyDown = async (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      if (tempQuantity < 1) {
        setTempQuantity(quantity); // Reset if invalid
        return;
      }
      setQuantity(tempQuantity);
      await updateCartQuantity(item.id, tempQuantity);
    }
  };


  const totalPrice = (item.price * quantity).toFixed(2);

  return (
    <div className="cart-item">
      <span className="product-name">{item.name}</span>
      <div className="quantity">
        <button onClick={handleDecreaseQuantity}>-</button>
        <input
          type="number"
          value={tempQuantity}
          onChange={handleInputChange}
          onKeyDown={handleInputKeyDown}
          onBlur={handleInputBlur}
          className="quantity-input"
          style={{ MozAppearance: "textfield" }}
          inputMode="numeric"
          pattern="[0-9]*"
          autoComplete="off"
          min="1"
        />
        <button onClick={handleIncreaseQuantity}>+</button>
      </div>
      <span className="single-price">zł{item.price}</span>
      <span className="total-price">zł{totalPrice}</span>
      <button className="trash" onClick={handleRemoveFromCart}>
          <img src={trashIcon} alt="TRASH" />
        </button>
    </div>
  );
};

export default CartItem;
