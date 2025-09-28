import React, { useState } from 'react';
import styles from './CustomerForm.module.css';

const CustomerForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    nic: '',
    phone: '',
    email: '',
    type: 'Regular',
    address: ''
  });

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

  return (
    <div className={styles.formContainer}>
      <h2>Customer Details</h2>
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
        <button className={`${styles.actionButton} ${styles.green}`}>💾 Save Customer</button>
        <button className={`${styles.actionButton} ${styles.orange}`}>🔍 Search Customer</button>
        <button className={`${styles.actionButton} ${styles.red}`} onClick={clearForm}>
          🗑️ Clear Form
        </button>
      </div>
    </div>
  );
};

export default CustomerForm;
