import React from "react";
import CartItem from "./CartItem";
import "../styles/Cart.css"; // You'll need to create this CSS file
type Item = {
    id: number;
    name: string;
    image: string;
    quantity: number;
    price: number;
    description: string | null;
    mimeType: string;
}

type CartProps = {
    items: Item[];
    token: string;
    onItemRemoved: (itemId: number) => void;
    onQuantityUpdated: (itemId: number, newQuantity: number) => void;
};

const CartDiv = ({ items, token, onItemRemoved, onQuantityUpdated }: CartProps) => {
    const calculateTotal = () => {
        return items.reduce((total, item) => total + (item.price * item.quantity), 0).toFixed(2);
    };

    return (
        <div className="cart-container">
            <h2>Your Shopping Cart</h2>
            
            {items.length === 0 ? (
                <div className="empty-cart-message">
                    Your cart is empty. Start shopping!
                </div>
            ) : (
                <>
                    <div className="cart-header">
                        <div className="header-product">Product</div>
                        <div className="header-quantity">Quantity</div>
                        <div className="header-price">Price</div>
                        <div className="header-total">Total</div>
                        <div className="header-actions">Actions</div>
                    </div>

                    <div className="cart-items">
                        {items.map((item) => (
                            <div key={item.id} className="cart-item-card">
                                <div className="item-product">
                                    <img 
                                        src={item.image} 
                                        alt={item.name} 
                                        className="item-image" 
                                    />
                                    <span className="item-name">{item.name}</span>
                                </div>
                                <div className="item-quantity">
                                    <CartItem 
                                        item={item} 
                                        token={token} 
                                        onRemoveFromCart={() => onItemRemoved(item.id)}
                                        onUpdateQuantity={(newQty:number) => onQuantityUpdated(item.id, newQty)}
                                    />
                                </div>
                                <div className="item-price">${item.price.toFixed(2)}</div>
                                <div className="item-total">
                                    ${(item.price * item.quantity).toFixed(2)}
                                </div>
                                <div className="item-actions">
                                    <button 
                                        onClick={() => onItemRemoved(item.id)}
                                        className="remove-button"
                                    >
                                        Remove
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="cart-summary">
                        <div className="summary-total">
                            <span>Total:</span>
                            <span>${calculateTotal()}</span>
                        </div>
                        <button className="checkout-button">
                            Proceed to Checkout
                        </button>
                    </div>
                </>
            )}
        </div>
    );
};

export default CartDiv;