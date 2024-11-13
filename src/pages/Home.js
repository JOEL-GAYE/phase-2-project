import React from 'react';
import "bootstrap/dist/css/bootstrap.min.css";

const Home = ({ products, handleAddToCart, getProductQuantityInCart }) => {
  return (
    <div className="container my-4">
      <div className="row">
        {products.map((product) => {
          const productQuantityInCart = getProductQuantityInCart(product.id);

          return (
            <div key={product.id} className="col-md-4 mb-4">
              <div className="card h-100 product-card hover ">
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
        })}
      </div>
    </div>
  );
};

export default Home;
