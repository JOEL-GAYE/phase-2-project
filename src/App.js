import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Footer from "./components/Footer";
import Header from "./components/Header";
import Search from "./components/Search";
import React, { useState, useEffect } from "react";
import NewProductList from "./components/NewProductList";

function App() {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  const fetchProduct = () => {
    fetch("http://localhost:5600/products")
      .then((res) => res.json())
      .then((data) => setProducts(data));
  };

  useEffect(() => {
    fetchProduct();
  }, []);

  const handleAddProduct = (newProduct) => {
    fetch("http://localhost:5600/products", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newProduct),
    })
      .then((response) => response.json())
      .then(() => {
        fetchProduct();
      });
  };

  const handleSearch = (e) => setSearchTerm(e.target.value.toLowerCase());

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchTerm)
  );

  return (
    <div>
      <Header />
      <Search handleSearch={handleSearch} />
      <NewProductList onAddProduct={handleAddProduct}/>
      <div className="product-list">
        {filteredProducts.map((product) => (
          <div key={product.id} className="product-card">
            <img src={product.image} alt={product.name} className="product-image" />
            <h3>{product.name}</h3>
            <p>{product.description}</p>
            <p><strong>Price:</strong> ${product.price}</p>
          </div>
        ))}
      </div>
      <Footer />
    </div>
  );
}

export default App;
