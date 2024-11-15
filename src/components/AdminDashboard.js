import React, { useState, useEffect } from 'react';
import NewProductList from './NewProductList';

// AdminDashboard Component: Contains product management logic (add, update, delete)
function AdminDashboard() {
  const [products, setProducts] = useState([]);

  // Fetch products from the API on component mount
  useEffect(() => {
    fetchProducts();
  }, []);

  // Fetch all products from the API
  const fetchProducts = async () => {
    try {
      const response = await fetch('https://my-json-server.typicode.com/JOEL-GAYE/phase-2-project/products');
      const data = await response.json();
      setProducts(data);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  // Add a new product
  const handleAddProduct = async (newProduct) => {
    try {
      const response = await fetch('https://my-json-server.typicode.com/JOEL-GAYE/phase-2-project/products', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newProduct),
      });
      const addedProduct = await response.json();
      setProducts((prevProducts) => [...prevProducts, addedProduct]);
    } catch (error) {
      console.error('Error adding product:', error);
    }
  };

  // Update an existing product
  const handleUpdateProduct = async (id, updatedProduct) => {
    try {
      const response = await fetch(`https://my-json-server.typicode.com/JOEL-GAYE/phase-2-project/products/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedProduct),
      });
      const updated = await response.json();
      setProducts((prevProducts) =>
        prevProducts.map((product) =>
          product.id === id ? { ...product, ...updated } : product
        )
      );
    } catch (error) {
      console.error('Error updating product:', error);
    }
  };

  // Delete a product
  const handleDeleteProduct = async (id) => {
    try {
      await fetch(`https://my-json-server.typicode.com/JOEL-GAYE/phase-2-project/products/${id}`, {
        method: 'DELETE',
      });
      setProducts((prevProducts) =>
        prevProducts.filter((product) => product.id !== id)
      );
    } catch (error) {
      console.error('Error deleting product:', error);
    }
  };

  return (
    <div>
      <h2 className='admin'>Admin Dashboard</h2>
      <NewProductList
        products={products}
        onAddProduct={handleAddProduct}
        onUpdateProduct={handleUpdateProduct}
        onDeleteProduct={handleDeleteProduct}
      />
    </div>
  );
}

export default AdminDashboard;
