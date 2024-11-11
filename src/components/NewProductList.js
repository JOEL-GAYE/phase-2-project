import React, {useState}from 'react'

function NewProductList ({onAddProduct}){
  const [name, setName] = useState("");
  const [image, setImage] = useState("");
  const [price, setPrice] = useState("");
  const[category,setCategory]=useState("");
  const[description, setDescription]=useState("");

  function handleSubmit(event){
    event.preventDefault();

    const newProduct={
      name,
      image,
      category,
      description,
      price: parseFloat(price) || 0  // Ensuring price is a number 
    };
    // POSTS a new product to the server
    fetch("http://localhost:5600/products", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(newProduct),
    })
      .then(response => response.json())
      .then(onAddProduct);

    // Clear form inputs after submission
    setName("");
    setImage("");
    setCategory("");
    setDescription("");
    setPrice("");
  }
  return (
    <div className="new-product-form">
      <h2>New Product</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Product name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="text"
          name="image"
          placeholder="Image URL"
          value={image}
          onChange={(e) => setImage(e.target.value)}
        />
        <input
        type="text"
        name="category"
        placeholder="products category"
        value={category}
        onChange={(e)=>setCategory(e.target.value)}
        />
        <input
        type="text"
        name="description"
        placeholder="products description"
        value={description}
        onChange={(e)=>setDescription(e.target.value)}
        />
        <input
          type="number"
          name="price"
          step="0.01"
          placeholder="Price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />
        <button type="submit">Add Product</button>
      </form>
    </div>
  );
}


export default NewProductList
