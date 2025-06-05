import { useEffect, useState } from "react";
import Layout from "../components/Layout";
import axios from "axios";
import "../styles/AdminProducts.css"; // Import your CSS styles

type Product = {
  id: number;
  name: string;
  price: number;
  description: string;
  category: string;
  stock: number;
  image?: string;
  imageMimeType?: string;
};

const AdminProducts = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const res = await axios.get("/api/products/0"); // pobiera pierwszą stronę
      setProducts(res.data);
      setError(null);
    } catch (e) {
      setError("Błąd pobierania produktów");
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleDelete = async (id: number) => {
    if (!window.confirm("Na pewno usunąć ten produkt?")) return;
    try {
      await axios.delete(`/api/product/delete/${id}`);
      setProducts(products.filter(p => p.id !== id));
    } catch (e) {
      alert("Błąd podczas usuwania produktu");
    }
  };

  return (
    <Layout>
      <div style={{ maxWidth: 900, margin: "2em auto", background: "#171717", padding: "2em", borderRadius: 8 }}>
        <h2 style={{ color: "#fff", textAlign: "center" }}>Wszystkie produkty</h2>
        {loading ? (
          <p style={{ color: "#fff" }}>Ładowanie...</p>
        ) : error ? (
          <p style={{ color: "red" }}>{error}</p>
        ) : (
        <table className="admin-products-table">
        <thead>
            <tr>
            <th className="id">ID</th>
            <th className="name">Nazwa</th>
            <th className="price">Cena</th>
            <th className="category">Kategoria</th>
            <th className="stock">Stan</th>
            <th className="actions">Akcje</th>
            </tr>
        </thead>
        <tbody>
            {products.map(prod => (
            <tr key={prod.id}>
                <td className="id">{prod.id}</td>
                <td className="name">{prod.name}</td>
                <td className="price">{prod.price}</td>
                <td className="category">{prod.category}</td>
                <td className="stock">{prod.stock}</td>
                <td className="actions">
                <button className="edit-btn" /* onClick={...} */>
                Edytuj
                </button>
                <button className="delete-btn" onClick={() => handleDelete(prod.id)}>
                    Usuń
                </button>
                </td>
            </tr>
            ))}
        </tbody>
        </table>
        )}
      </div>
    </Layout>
  );
};

export default AdminProducts;