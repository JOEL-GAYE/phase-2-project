import React, { useState } from "react";

// NewProductList Component: Handles Add, Edit, and Delete functionalities
function NewProductList({ products, onAddProduct, onUpdateProduct, onDeleteProduct }) {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const [editingProductId, setEditingProductId] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();

    const newProduct = {
      name,
      price: parseFloat(price),
      description,
      image,
    };

    // If editing an existing product, call the update function
    if (editingProductId !== null) {
      onUpdateProduct(editingProductId, newProduct);
    } else {
      // Otherwise, add a new product
      onAddProduct(newProduct);
    }

    // Clear the form after submission
    setName("");
    setPrice("");
    setDescription("");
    setImage("");
    setEditingProductId(null);
  };

  // Function to handle editing a product
  const handleEdit = (product) => {
    setEditingProductId(product.id);
    setName(product.name);
    setPrice(product.price);
    setDescription(product.description);
    setImage(product.image);
  };

  // Function to handle deleting a product
  const handleDelete = (productId) => {
    onDeleteProduct(productId);
  };

  return (
    <div className="form-group">
      <h3>{editingProductId ? "Edit Product" : "Add New Product"}</h3>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Product Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="form-control"
            required
          />
        </div>
        <div className="form-group">
          <label>Price</label>
          <input
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            className="form-control"
            required
          />
        </div>
        <div className="form-group">
          <label>Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="form-control"
            required
          />
        </div>
        <div className="form-group">
          <label>Image URL</label>
          <input
            type="url"
            value={image}
            onChange={(e) => setImage(e.target.value)}
            className="form-control"
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">
          {editingProductId ? "Update Product" : "Add Product"}
        </button>
      </form>

      <h3>Product List</h3>
      <ul className="list-group">
        {products.map((product) => (
          <li key={product.id} className="list-group-item">
            <strong>{product.name}</strong> - ${product.price}
            <br />
            {product.description}
            <br />
            <img src={product.image} alt={product.name} width="50" height="50" />
            <div>
              <button
                className="btn btn-warning btn-sm mx-2"
                onClick={() => handleEdit(product)}
              >
                Edit
              </button>
              <button
                className="btn btn-danger btn-sm"
                onClick={() => handleDelete(product.id)}
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default NewProductList;
