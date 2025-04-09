import React from "react";
import "../styles/Product.css";

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
    return (
        <div className="product-card">
            <div className="product-image">
                <img src={imageSrc} alt={"Brak obrazu"}/>
            </div>
            <h3 className="product-name">{product.name}</h3>
            <span className="product-price">Price: ${product.price}</span>
            {/* <p>Stock: {product.stock}</p> */}
            {/* <button onClick={() => onAddToCart(product)}>Add to Cart</button> */}
        </div>
    );
};
export default ProductCard;
