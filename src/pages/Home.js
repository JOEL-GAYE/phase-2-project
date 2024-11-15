import React, { useState, useEffect } from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import Search from '../components/Search';

const Home = ({ handleAddToCart, getProductQuantityInCart, handleUpdateCart }) => {
  const [products, setProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('https://my-json-server.typicode.com/JOEL-GAYE/phase-2-project/products');
        if (!response.ok) throw new Error('Failed to fetch products');
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };
    fetchProducts();
  }, []);

  const handleSearch = (query) => setSearchQuery(query);

  const filteredProducts = products.filter(({ name, description }) =>
    name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const cartItems = products.filter((product) => 
    getProductQuantityInCart ? getProductQuantityInCart(product.id) > 0 : false
  );

  useEffect(() => {
    const newTotalPrice = cartItems.reduce((acc, { id, price }) => 
      acc + price * (getProductQuantityInCart ? getProductQuantityInCart(id) : 0), 0
    );
    setTotalPrice(newTotalPrice);
  }, [cartItems, getProductQuantityInCart]);

  const handleUpdateCartQuantity = (productId, action) => {
    if (!getProductQuantityInCart) return;
    const currentQuantity = getProductQuantityInCart(productId);
    const updatedQuantity = action === 'increase' ? currentQuantity + 1 : Math.max(currentQuantity - 1, 0);
    handleUpdateCart(productId, updatedQuantity);
  };
  console.log(products)

  return (
    <div>
      <Search handleSearch={handleSearch} />
      <div className="container my-4">
        <div className="row">
          {filteredProducts.length > 0 ? (
            filteredProducts.map(({ id, name, description, price, image }) => (
              <div key={id} className="col-md-3 mb-4">
                <div className="card h-100 product-card hover">
                  <img src={image} alt={name} className="card-img-top product-image" />
                  <div className="card-body">
                    <h5 className="card-title">{name}</h5>
                    <p className="card-text">{description}</p>
                    <p className="card-text">
                      <strong>Price:</strong> ${price}
                    </p>
                    {getProductQuantityInCart && getProductQuantityInCart(id) > 0 ? (
                      <div className="cart-info mb-2">
                        <p className="card-text text-success">
                          Added to cart: {getProductQuantityInCart(id)} item(s)
                        </p>
                        <p className="card-text text-success">
                          Total: ${price * getProductQuantityInCart(id)}
                        </p>
                      </div>
                    ) : (
                      <p className="card-text text-muted">No items in cart</p>
                    )}
                    <button onClick={() => handleAddToCart({ id, name, price })} className="btn btn-primary w-100">
                      Add to Cart
                    </button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p>No products found matching your search criteria.</p>
          )}
        </div>

        <div className="mt-5">
          <h3>Cart List</h3>
          {cartItems.length > 0 ? (
            <div>
              <ul className="list-group">
                {cartItems.map(({ id, name, price }) => (
                  <li key={id} className="list-group-item d-flex justify-content-between align-items-center">
                    <div>
                      <h5>{name}</h5>
                      <p>
                        Quantity: {getProductQuantityInCart ? getProductQuantityInCart(id) : 0} 
                        <button onClick={() => handleUpdateCartQuantity(id, 'increase')} className="btn btn-sm btn-success mx-2">
                          +
                        </button>
                        <button onClick={() => handleUpdateCartQuantity(id, 'decrease')} className="btn btn-sm btn-danger mx-2">
                          -
                        </button>
                      </p>
                      <p>Total Price: ${price * (getProductQuantityInCart ? getProductQuantityInCart(id) : 0)}</p>
                    </div>
                  </li>
                ))}
              </ul>
              <div className="mt-4 text-right">
                <h4>Total Price: ${totalPrice}</h4>
                <button className="btn btn-success">Proceed to Purchase</button>
              </div>
            </div>
          ) : (
            <p>Your cart is empty.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
