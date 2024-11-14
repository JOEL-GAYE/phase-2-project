import React, { useState, useEffect } from 'react'; 
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Footer from './components/Footer';
import Header from './components/Header';
import Home from './pages/Home';
import AdminLogin from './components/AdminLogin';
import AdminDashboard from './components/AdminDashboard';
import About from './pages/About';
import Contact from './pages/Contact';

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

  const fetchProduct = () => {
    fetch('https://my-json-server.typicode.com/JOEL-GAYE/phase-2-project/products')
      .then((res) => res.json())
      .then((data) => setProducts(data))
      .catch((error) => {
        console.error('Error fetching products:', error);
        setError('Failed to load products. Please try again later.');
      });
  };

  useEffect(() => {
    fetchProduct();
  }, []);

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

  

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchTerm)
  );

  const getProductQuantityInCart = (productId) => {
    const product = cart.find((item) => item.id === productId);
    return product ? product.quantity : 0;
  };

  return (
    <div>
      <Header />
      <Router>
        <nav className="navbar navbar-expand-lg navbar-light bg-light shadow-sm py-3">
          <div className="container-fluid">
            <div className="navbar-nav me-auto">
              <Link to="/" className="navbar-brand text-dark fw-bold">Home</Link>
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
              />
            } 
          />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/adminLogin" element={!isAdmin ? <AdminLogin onLogin={handleLogin} /> : <AdminDashboard />} />
          <Route path="adminDashboard/*" element={<AdminDashboard />} />
        </Routes>

        {/* Conditionally render the Footer only for Home, About, and Contact pages */}
        {(window.location.pathname === '/' || window.location.pathname === '/About' || window.location.pathname === '/contact') && <Footer />}
        
      </Router>

      {error && <div className="alert alert-danger">{error}</div>}
    </div>
  );
}

export default App;
