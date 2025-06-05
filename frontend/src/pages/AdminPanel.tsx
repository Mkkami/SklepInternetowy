import { Link } from "react-router-dom";
import Layout from "../components/Layout";

const AdminPanel = () => (
  <Layout>
    <div className="admin-panel-container" style={{ maxWidth: 500, margin: "2em auto", background: "#171717", padding: "2em", borderRadius: 8 }}>
      <h2 style={{ color: "#fff", textAlign: "center" }}>Panel administratora</h2>
      <div style={{ display: "flex", flexDirection: "column", gap: "1.5em", marginTop: "2em" }}>
        <Link to="/admin-panel/products" style={{ color: "#1976d2", fontSize: "1.1em", textAlign: "center" }}>
          Wyświetl wszystkie produkty
        </Link>
        <Link to="/create-product" style={{ color: "#1976d2", fontSize: "1.1em", textAlign: "center" }}>
          Dodaj nowy produkt
        </Link>
      </div>
    </div>
  </Layout>
);

export default AdminPanel;