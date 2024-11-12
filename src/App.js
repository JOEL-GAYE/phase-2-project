import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Footer from "./components/Footer";
import Header from "./components/Header";
import Search from "./components/Search";
import React, { useState, useEffect } from "react";
import NewProductList from "./components/NewProductList";
import AdminLogin from "./components/AdminLogin";
import AdminDashboard from "./components/AdminDashboard";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

function App() {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [cart, setCart] = useState([]);
  const [isAdmin, setIsAdmin] = useState(false);

  // Handle login
  const handleLogin = (username, password) => {
    if (username === "admin" && password === "password123") {
      setIsAdmin(true);
    } else {
      alert("Invalid credentials");
    }
  };

  // Fetch products
  const fetchProduct = () => {
    fetch("http://localhost:5600/products")
      .then((res) => res.json())
      .then((data) => setProducts(data));
  };

  useEffect(() => {
    fetchProduct();
  }, []);

  // Handle adding products to the cart
  const handleAddToCart = (product) => {
    const existingProductIndex = cart.findIndex((item) => item.id === product.id);
    
    if (existingProductIndex > -1) {
      // If the product already exists in the cart, increase the quantity
      const updatedCart = [...cart];
      updatedCart[existingProductIndex].quantity += 1;
      setCart(updatedCart);
    } else {
      // If the product doesn't exist in the cart, add it
      const newProduct = { ...product, quantity: 1 };
      setCart([...cart, newProduct]);
    }
  };

  // Handle adding a new product (Admin functionality)
  const handleAddProduct = (newProduct) => {
    fetch("http://localhost:5600/products", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newProduct),
    })
      .then((response) => response.json())
      .then(() => {
        fetchProduct(); // Re-fetch the updated product list after adding a new product
      });
  };

  // Handle searching for products
  const handleSearch = (e) => setSearchTerm(e.target.value.toLowerCase());

  // Filter products based on search term
  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchTerm)
  );

  // Get the product's current quantity in the cart
  const getProductQuantityInCart = (productId) => {
    const product = cart.find((item) => item.id === productId);
    return product ? product.quantity : 0;
  };

  // Calculate the total price of items in the cart
  const calculateTotalPrice = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  return (
    <Router>
      <div>
        <div>
        <Header />
        {/* Admin Dashboard */}
        <Routes>
          <Route
            path="/"
            element={
              !isAdmin ? (
                <AdminLogin onLogin={handleLogin} />
              ) : (
                <Navigate to="/admin/dashboard" replace />
              )
            }
          />
          <Route
            path="/admin/dashboard"
            element={
              isAdmin ? (
                <div>
                  <AdminDashboard />
                  <NewProductList onAddProduct={handleAddProduct} />
                </div>
              ) : (
                <Navigate to="/" replace />
              )
            }
          />
        </Routes>
        </div>
        
        <Search handleSearch={handleSearch} />
        
        {/* Display filtered products */}
        <div className="product-list">
          {filteredProducts.map((product) => {
            // Get the current quantity of this product in the cart
            const productQuantityInCart = getProductQuantityInCart(product.id);

            return (
              <div key={product.id} className="product-card">
                <img src={product.image} alt={product.name} className="product-image" />
                <h3>{product.name}</h3>
                <p>{product.description}</p>
                <p><strong>Price:</strong> ${product.price}</p>

                {/* Display cart information for this product */}
                {productQuantityInCart > 0 ? (
                  <div className="cart-info">
                    <p>Added to cart: {productQuantityInCart} item(s)</p>
                    <p>Total: ${product.price * productQuantityInCart}</p>
                  </div>
                ) : (
                  <p>No items in cart</p>
                )}

                <button onClick={() => handleAddToCart(product)} className="btn btn-primary">
                  Add to Cart
                </button>
              </div>
            );
          })}
        </div>

        

        <Footer />
      </div>
    </Router>
  );
}

export default App;
