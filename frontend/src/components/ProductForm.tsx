import React, { useState } from "react";
import showToast from "../services/Toast";
import "toastify-js/src/toastify.css";
import "../styles/ProductForm.css";

type Product = {
  name: string;
  price: number;
  stock: number;
  description?: string;
  category?: string;
};

const ProductForm: React.FC = () => {
  const [product, setProduct] = useState<Product>({
    name: "",
    price: 0,
    stock: 0,
    description: "",
    category: ""
  });
  const [image, setImage] = useState<File | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setProduct(prev => ({
      ...prev,
      [name]: name === 'price' || name === 'stock' ? Number(value) : value
    }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!product.name || !product.price || !product.stock || !image) {
      showToast("Please fill all required fields!");
      return;
    }

    const formData = new FormData();
    formData.append("product", JSON.stringify(product)); // product as JSON string
    formData.append("file", image); // image as file

    try {
      const token = localStorage.getItem("access_token");
      const response = await fetch("http://localhost:8080/api/product/createNew", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token || ""}`,
        },
        body: formData,
      });

      const msg = await response.text();
      if (!response.ok) {
        showToast(msg || "Failed to add product");
        return;
      }

      showToast(msg || "Product added successfully!");
      setProduct({
        name: "",
        price: 0,
        stock: 0,
        description: "",
        category: ""
      });
      setImage(null);
      (document.getElementById("product-image-input") as HTMLInputElement).value = "";
    } catch (error) {
      showToast("Network error - please try again");
    }
  };

  return (
    <form className="product-form" onSubmit={handleSubmit}>
      <h2 style={{ color: "#ab49de" }}>Add New Product</h2>
      <label>
        Name*:
        <input 
          type="text" 
          name="name"
          value={product.name} 
          onChange={handleChange} 
          required 
        />
      </label>
      <label>
        Price*:
        <input 
          type="number" 
          name="price"
          value={product.price} 
          onChange={handleChange} 
          min="0" 
          step="0.01" 
          required 
        />
      </label>
      <label>
        Description:
        <textarea 
          name="description"
          value={product.description} 
          onChange={handleChange} 
          maxLength={500} 
        />
      </label>
      <label>
        Category:
        <input 
          type="text" 
          name="category"
          value={product.category} 
          onChange={handleChange} 
        />
      </label>
      <label>
        Stock*:
        <input 
          type="number" 
          name="stock"
          value={product.stock} 
          onChange={handleChange} 
          min="0" 
          required 
        />
      </label>
      <label>
        Image*:
        <input 
          id="product-image-input" 
          type="file" 
          accept="image/png,image/jpeg,image/gif,image/jpg" 
          onChange={handleImageChange} 
          required 
        />
      </label>
      <button 
        type="submit" 
        style={{ 
          background: "#ab49de", 
          color: "#fff", 
          padding: "0.7em 2em", 
          border: "none", 
          borderRadius: 5, 
          fontWeight: "bold", 
          fontSize: "1em", 
          cursor: "pointer", 
          marginTop: "1em" 
        }}
      >
        Add Product
      </button>
    </form>
  );
};

export default ProductForm;