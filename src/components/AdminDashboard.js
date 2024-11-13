import React from 'react';
import NavBar from './AdminLogin';
import NewProductList from './NewProductList';

const AdminDashboard = () => {
  return (
    <div>
      <h1 className='welcome'>Welcome, Admin</h1>
        <NewProductList/>
    </div>
  );
};

export default AdminDashboard;
