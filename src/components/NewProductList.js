import React, { useState } from "react";

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

    if (editingProductId !== null) {
      onUpdateProduct(editingProductId, newProduct);
    } else {
      onAddProduct(newProduct);
    }

    setName("");
    setPrice("");
    setDescription("");
    setImage("");
    setEditingProductId(null);
  };

  const handleEdit = (product) => {
    setEditingProductId(product.id);
    setName(product.name);
    setPrice(product.price);
    setDescription(product.description);
    setImage(product.image);
  };

  const handleDelete = (productId) => {
    onDeleteProduct(productId);
  };

  return (
    <div className="container my-4">
      <h3>{editingProductId ? "Edit Product" : "Add New Product"}</h3>
      <form onSubmit={handleSubmit} className="mb-2">
        <div className="form-group mb-3">
          <label>Product Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="form-control"
            required
          />
        </div>
        <div className="form-group mb-3">
          <label>Price</label>
          <input
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            className="form-control"
            required
          />
        </div>
        <div className="form-group mb-3">
          <label>Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="form-control"
            required
          />
        </div>
        <div className="form-group mb-3">
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
      <div className="row">
        {Array.isArray(products) ? (
          products.map((product) => (
            <div key={product.id} className="col-md-3 mb-6">
              <div className="card shadow-sm">
                <img src={product.image} className="card-img-top" alt={product.name} style={{ height: "300px", objectFit: "cover" }} />
                <div className="card-body">
                  <h5 className="card-title">{product.name}</h5>
                  <p className="card-text text-muted">${product.price.toFixed(2)}</p>
                  <p className="card-text">{product.description}</p>
                  <div className="d-flex justify-content-between">
                    <button
                      className="btn btn-warning btn-sm"
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
                </div>
              </div>
            </div>
          ))
        ) : (
          <p>No products available</p>
        )}
      </div>
    </div>
  );
}

export default NewProductList;
