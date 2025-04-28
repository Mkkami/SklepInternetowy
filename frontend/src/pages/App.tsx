import { useState } from "react";
import "../styles/App.css";
import Layout from "../components/Layout";
import ProductsDiv from "../components/ProductsDiv";

function App() {
  return (
    <Layout>
      <main>
        <ProductsDiv />
      </main>
    </Layout>
  );
}

export default App;
