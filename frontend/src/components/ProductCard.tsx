import React from "react";
import "../styles/Product.css";

type Product ={
    id: number;
    name: string;
    imageUrl: string;
    stock: number;
    price: number;
};

type ProductCardProps = {
    product: Product;
    // onAddToCart: (product: Product) => void;
};

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
    return (
        <div className="product-card">
            <img src={product.imageUrl} alt={product.name} className="product-image"/>
            <h2>{product.name}</h2>
            <p>Price: ${product.price}</p>
            <p>Stock: {product.stock}</p>
            {/* <button onClick={() => onAddToCart(product)}>Add to Cart</button> */}
        </div>
    );
};
export default ProductCard;
