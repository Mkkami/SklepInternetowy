import React from "react";
import "../styles/Product.css";
import { useNavigate } from "react-router-dom";
import cartAdd from "../assets/cart-add.svg";
import Toastify from "toastify-js";
import "toastify-js/src/toastify.css";
import { showToast } from "../services/Toast";

type Product = {
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
        const response = await fetch("http://localhost:8080/cart", {
          // cart/add
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            id: product.id,
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

      showToast("Product added to cart!");
    } catch (error) {
      console.error("Error adding product to cart:", error);
      showToast("Product already in cart");
    }};
  return (
    <div className="product-card">
      <div className="product-image">
        <img src={imageSrc} alt={"Brak obrazu"} />
      </div>
      <h3 className="product-name">{product.name}</h3>
      <div className="product-footer">
        <span className="product-price">Price: ${product.price}</span>
        {/* <p>Stock: {product.stock}</p> */}
        {/* <img className="cart-add-btn" src={cartAdd} onClick={handleAddToCart}></img> */}
        <button className="cart-add-btn" onClick={handleAddToCart}>
          <img src={cartAdd} alt="Add to cart" />
        </button>
      </div>
    </div>
  );
};
export default ProductCard;
