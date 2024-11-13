import React, { useState } from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import Search from '../components/Search';

const Home = ({ products, handleAddToCart, getProductQuantityInCart }) => {
  const [searchQuery, setSearchQuery] = useState('');

  // Handle product search by updating searchQuery state
  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  // Filter products based on search query
  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    product.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div>
      <Search handleSearch={handleSearch} />
      <div className="container my-4">
        <div className="row">
          {filteredProducts.length > 0 ? (
            filteredProducts.map((product) => {
              const productQuantityInCart = getProductQuantityInCart(product.id);

              return (
                <div key={product.id} className="col-md-3 mb-4 ">
                  <div className="card h-100 product-card hover">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="card-img-top product-image"
                    />
                    <div className="card-body">
                      <h5 className="card-title">{product.name}</h5>
                      <p className="card-text">{product.description}</p>
                      <p className="card-text">
                        <strong>Price:</strong> ${product.price}
                      </p>

                      {productQuantityInCart > 0 ? (
                        <div className="cart-info mb-2">
                          <p className="card-text text-success">
                            Added to cart: {productQuantityInCart} item(s)
                          </p>
                          <p className="card-text text-success">
                            Total: ${product.price * productQuantityInCart}
                          </p>
                        </div>
                      ) : (
                        <p className="card-text text-muted">No items in cart</p>
                      )}

                      <button
                        onClick={() => handleAddToCart(product)}
                        className="btn btn-primary w-100"
                      >
                        Add to Cart
                      </button>
                    </div>
                  </div>
                </div>
              );
            })
          ) : (
            <p>No products found matching your search criteria.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
