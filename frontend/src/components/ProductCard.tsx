import React from "react";
import "../styles/Product.css";
import { useNavigate } from "react-router-dom";

type Product ={
    id: number;
    name: string;
    image: string;
    stock: number;
    price: number;
};

type ProductCardProps = {
    product: Product;
    // onAddToCart: (product: Product) => void;
};

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
    const imageSrc = `data:image/png;base64,${product.image}`;
    const navigate = useNavigate();
    const handleAddToCart = async () => {
        const token = localStorage.getItem("access_token");
        if (!token) {
            navigate("/login");
            return;
        }

        try {
            const response = await fetch("http://localhost:8080/cart", { // cart/add
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({
                    productId: product.id,
                    quantity: 1,
                }),
            });

            if (!response.ok) {
                if (response.status === 401) {
                    navigate("/login");
                } else {
                    throw new Error("Failed1 to add product to cart");
                }
            }

            alert("Product added to cart!");

        } catch (error) {
            console.error("Error adding product to cart:", error);
            alert("Failed2 to add product to cart"); 
        }

    }
    return (
        <div className="product-card">
            <div className="product-image">
                <img src={imageSrc} alt={"Brak obrazu"}/>
            </div>
            <h3 className="product-name">{product.name}</h3>
            <span className="product-price">Price: ${product.price}</span>
            {/* <p>Stock: {product.stock}</p> */}
            <button onClick={handleAddToCart}>+</button>
        </div>
    );
};
export default ProductCard;
