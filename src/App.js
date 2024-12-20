import React, { useState, useEffect } from 'react';
import { HashRouter as Router, Route, Routes, Link } from 'react-router-dom'; // Use HashRouter
import Footer from './components/Footer';
import Header from './components/Header';
import Home from './pages/Home';
import AdminLogin from './components/AdminLogin';
import AdminDashboard from './components/AdminDashboard';
import About from './pages/About';
import Contact from './pages/Contact';
import NewProductList from './components/NewProductList';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [cart, setCart] = useState([]);
  const [isAdmin, setIsAdmin] = useState(false);
  const [error, setError] = useState(null);

  const handleLogin = (username, password) => {
    if (username === 'admin' && password === 'password123') {
      setIsAdmin(true);
    } else {
      alert('Invalid credentials');
    }
  };

  const fetchProducts = () => {
    fetch('https://my-json-server.typicode.com/JOEL-GAYE/phase-2-project/products')
      .then((res) => res.json())
      .then((data) => {
        setProducts(Array.isArray(data) ? data : []);
      })
      .catch((error) => {
        console.error('Error fetching products:', error);
        setError('Failed to load products. Please try again later.');
      });
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleAddProduct = (newProduct) => {
    fetch('https://my-json-server.typicode.com/JOEL-GAYE/phase-2-project/products', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newProduct),
    })
      .then((res) => res.json())
      .then((addedProduct) => {
        setProducts((prevProducts) => [...prevProducts, addedProduct]);
      })
      .catch((error) => {
        console.error('Error adding product:', error);
        setError('Failed to add product. Please try again later.');
      });
  };

  const handleUpdateProduct = (productId, updatedProduct) => {
    fetch(`https://my-json-server.typicode.com/JOEL-GAYE/phase-2-project/products/${productId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedProduct),
    })
      .then((res) => res.json())
      .then((updatedProductData) => {
        setProducts((prevProducts) =>
          prevProducts.map((product) =>
            product.id === productId ? updatedProductData : product
          )
        );
      })
      .catch((error) => {
        console.error('Error updating product:', error);
        setError('Failed to update product. Please try again later.');
      });
  };

  const handleDeleteProduct = (productId) => {
    fetch(`https://my-json-server.typicode.com/JOEL-GAYE/phase-2-project/products/${productId}`, {
      method: 'DELETE',
    })
      .then(() => {
        setProducts((prevProducts) =>
          prevProducts.filter((product) => product.id !== productId)
        );
      })
      .catch((error) => {
        console.error('Error deleting product:', error);
        setError('Failed to delete product. Please try again later.');
      });
  };

  const handleAddToCart = (product) => {
    const existingProductIndex = cart.findIndex((item) => item.id === product.id);

    if (existingProductIndex > -1) {
      const updatedCart = [...cart];
      updatedCart[existingProductIndex].quantity += 1;
      setCart(updatedCart);
    } else {
      const newProduct = { ...product, quantity: 1 };
      setCart([...cart, newProduct]);
    }
  };

  const handleUpdateCart = (productId, quantity) => {
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.id === productId ? { ...item, quantity } : item
      )
    );
  };

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getProductQuantityInCart = (productId) => {
    const product = cart.find((item) => item.id === productId);
    return product ? product.quantity : 0;
  };

  return (
    <div>
      <Header />
      <Router>
        <nav className="navbar navbar-expand-lg navbar-light bg-success shadow-sm py-3">
          <div className="container-fluid">
            <div className="navbar-nav me-auto">
              <Link to="/" className="nav-link custom-nav-link mx-3">Home</Link>
              <Link to="/about" className="nav-link custom-nav-link mx-3">About</Link>
              <Link to="/contact" className="nav-link custom-nav-link mx-3">Contact Us</Link>
            </div>

            <div className="navbar-nav ms-auto">
              <Link to="/adminLogin" className="nav-link custom-nav-link mx-3">Admin Login</Link>
            </div>
          </div>
        </nav>

        <Routes>
          <Route 
            path="/" 
            element={ 
              <Home 
                products={filteredProducts} 
                handleAddToCart={handleAddToCart} 
                getProductQuantityInCart={getProductQuantityInCart} 
                handleUpdateCart={handleUpdateCart} 
              />
            } 
          />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/adminLogin" element={!isAdmin ? <AdminLogin onLogin={handleLogin} /> : <AdminDashboard />} />
          <Route 
            path="/adminDashboard" 
            element={
              <AdminDashboard>
                <NewProductList 
                  products={products} 
                  onAddProduct={handleAddProduct} 
                  onUpdateProduct={handleUpdateProduct}  
                  onDeleteProduct={handleDeleteProduct}  
                />
              </AdminDashboard>
            }
          />
        </Routes>

        {(window.location.hash === '#/' || window.location.hash === '#/about' || window.location.hash === '#/contact') && <Footer />}
      </Router>

      {error && <div className="alert alert-danger">{error}</div>}
    </div>
  );
}

export default App;
