import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

import Login from './Components/Login';
//Import the main App components from each dashboard
import CashierApp from './cashier/App';
import AdminApp from './admin/App';
import ManagerApp from './manager/App'; // Assuming you have a Manager App

function App() {
  return (
    <Router>
      <Routes>
         <Route path="/" element={<Login />} />
        <Route path="/cashier/*" element={<CashierApp />} />
        <Route path="/admin/*" element={<AdminApp />} />
        <Route path='/manager/*' element={<ManagerApp/>}/>
        <Route path="/" element={<Navigate to="/admin" />} />
      </Routes>
    </Router>
  );
}

export default App;
