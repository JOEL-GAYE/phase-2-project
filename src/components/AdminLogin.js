import React, { useState } from "react"; 
import "bootstrap/dist/css/bootstrap.min.css"; 

function AdminLogin({ onLogin }) {
  const [username, setUsername] = useState(""); 
  const [password, setPassword] = useState(""); 

  const handleSubmit = (e) => { 
    e.preventDefault(); 
    onLogin(username, password); 
  };

  return (
    <div className="d-flex justify-content-center align-items-center min-vh-100 bg-light">
      <div className="login-container bg-white p-4 rounded shadow-sm w-100 w-md-50 w-lg-25">
        {/* SVG Icon */}
        <div className="text-center mb-3">
          <img
            src="/images/icons/login-lock-refresh-svgrepo-com.svg"
            alt="Lock Icon"
            width={40}
            height={40}
            className="hover-icon"
          />
        </div>

        {/* Login Form */}
        <h2 className="text-center mb-4">Admin Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group mb-3">
            <label htmlFor="username" className="form-label">Username:</label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              className="form-control"
            />
          </div>
          <div className="form-group mb-3">
            <label htmlFor="password" className="form-label">Password:</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="form-control"
            />
          </div>
          <button type="submit" className="btn btn-primary w-100">
            Login
          </button>
        </form>
      </div>
    </div>
  );
}

export default AdminLogin;
