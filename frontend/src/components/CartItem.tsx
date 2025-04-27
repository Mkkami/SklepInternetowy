import React, { useState } from "react";
import "../styles/CartItem.css";
import { useNavigate } from "react-router-dom";

type Item = {
    id: number;
    name: string;
    image: string;
    quantity: number;
    price: number;
}

type ItemProps = {
    item: Item;
    onRemoveFromCart: (item: Item) => void;
    onUpdateQuantity: (item: Item, quantity: number) => void;
};

const CartItem = ({ item, token }: { item: any; token: string }) => {
    const [quantity, setQuantity] = useState(item.quantity || 1);
    const navigate = useNavigate();

    const handleIncreaseQuantity = async () => {
        setQuantity((prev:number) => prev + 1);
        await updateCartQuantity(item.id, quantity + 1);
    };

    const handleDecreaseQuantity = async () => {
        if (quantity > 1) {
            setQuantity((prev:number) => prev - 1);
            await updateCartQuantity(item.id, quantity - 1);
        } else {
            alert("Quantity cannot be less than 1");
        }
    };

    const handleQuantityChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const newQuantity = Math.max(1, parseInt(e.target.value) || 1);
        setQuantity(newQuantity);
        await updateCartQuantity(item.id, newQuantity);
    };

    const handleRemoveFromCart = async () => {
        if (!token) {
            navigate("/login");
            return;
        }

        try {
            const response = await fetch("http://localhost:8080/cart/item", {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({
                    productId: item.id,
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

            alert("Product removed from cart!");
        } catch (error) {
            console.error("Error removing product from cart:", error);
            alert("Failed to remove product from cart");
        }
    };

    const updateCartQuantity = async (productId: string, newQuantity: number) => {
        try {
            const response = await fetch("http://localhost:8080/cart/item", {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({
                    productId,
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

    const totalPrice = (item.price * quantity).toFixed(2);

    return (
        <div className="cart-item">
            <span className="cart-item-name">{item.name}</span>
            <button onClick={handleDecreaseQuantity}>-</button>
            <input
                type="number"
                value={quantity}
                onChange={handleQuantityChange}
                className="quantity-input"
                min="1"
            />
            <button onClick={handleIncreaseQuantity}>+</button>
            <span className="total-price">${totalPrice}</span>
            <button onClick={handleRemoveFromCart}>TRASH</button>
        </div>
    );
};

export default CartItem;