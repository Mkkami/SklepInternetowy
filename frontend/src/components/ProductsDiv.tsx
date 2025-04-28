import React, { useEffect, useState } from "react";
import ProductCard from "./ProductCard";
import axios from "axios";
import "../styles/App.css";
import "../styles/Product.css";

type Product = {
  id: number;
  name: string;
  price: number;
  description: string | null;
  stock: number;
  image: string;
  category: string;
};

const ProductsDiv: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState<number>(0);

  const fetchProducts = async (page: number) => {
    try {
      const response = await axios.get<Product[]>(
        `http://localhost:8080/api/products/${page}`
      );
      setProducts(response.data);
      setLoading(false);
    } catch (error) {
      console.error("Błąd podczas pobierania produktów:", error);
      setError("Nie udało się pobrać produktów.");
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts(page);
  }, [page]);

  if (loading)
    return <p className="text-center text-gray-500">Ładowanie produktów...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;

  return (
    <div className="product-div">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
};
export default ProductsDiv;
