import React, { useState } from 'react';
import styles from './CustomerForm.module.css';
import { createCustomer, getAllCustomers } from '../../../Api/CA/CustomerApi';

const CustomerForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    nic: '',
    phone: '',
    email: '',
    type: 'Regular',
    address: ''
  });

  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [searchResult, setSearchResult] = useState(null);

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const clearForm = () =>
    setFormData({
      name: '',
      nic: '',
      phone: '',
      email: '',
      type: 'Regular',
      address: ''
    });

  // ✅ Save Customer
  const handleSave = async () => {
    try {
      const savedCustomer = await createCustomer(formData);
      console.log("Customer saved:", savedCustomer);
      setShowSuccessMessage(true);
      setTimeout(() => setShowSuccessMessage(false), 3000);
      clearForm();
    } catch (error) {
      console.error("Error saving customer:", error.message);
    }
  };

  // ✅ Search Customer (by NIC)
  const handleSearch = async () => {
    try {
      const customers = await getAllCustomers();
      const found = customers.find(c => c.nic === formData.nic);
      if (found) {
        setSearchResult(found);
        setFormData(found); // auto-fill form
      } else {
        alert("Customer not found!");
      }
    } catch (error) {
      console.error("Error searching customer:", error.message);
    }
  };

  return (
    <div className={styles.formContainer}>
      <h2>Customer Details</h2>

      {showSuccessMessage && (
        <p className={styles.successMessage}>✅ Customer added successfully!</p>
      )}

      <div className={styles.formGrid}>
        <input type="text" name="name" placeholder="Enter customer name" value={formData.name} onChange={handleChange} />
        <input type="text" name="nic" placeholder="Enter customer nic" value={formData.nic} onChange={handleChange} />
        <input type="text" name="phone" placeholder="Enter phone number" value={formData.phone} onChange={handleChange} />
        <input type="email" name="email" placeholder="Enter email address" value={formData.email} onChange={handleChange} />
        <select name="type" value={formData.type} onChange={handleChange}>
          <option value="Regular">Regular</option>
          <option value="VIP">VIP</option>
          <option value="Wholesale">Wholesale</option>
        </select>
      </div>
      <textarea
        name="address"
        placeholder="Enter customer address"
        value={formData.address}
        onChange={handleChange}
      ></textarea>

      <div className={styles.buttonGroup}>
        <button className={`${styles.actionButton} ${styles.green}`} onClick={handleSave}>💾 Save Customer</button>
        <button className={`${styles.actionButton} ${styles.orange}`} onClick={handleSearch}>🔍 Search Customer</button>
        <button className={`${styles.actionButton} ${styles.red}`} onClick={clearForm}>🗑️ Clear Form</button>
      </div>

      {searchResult && (
        <div className={styles.searchResult}>
          <h3>🔍 Found Customer</h3>
          <p><b>Name:</b> {searchResult.name}</p>
          <p><b>NIC:</b> {searchResult.nic}</p>
          <p><b>Phone:</b> {searchResult.phone}</p>
          <p><b>Email:</b> {searchResult.email}</p>
          <p><b>Type:</b> {searchResult.type}</p>
          <p><b>Address:</b> {searchResult.address}</p>
        </div>
      )}
    </div>
  );
};

export default CustomerForm;
