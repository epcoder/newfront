import React, { useState } from 'react';
import styles from './Transfer.module.css';

const StockTransfer = () => {
  const [formData, setFormData] = useState({
    item: '',
    fromLocation: '',
    toLocation: '',
    quantity: '',
    transferDate: '',
    remarks: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Transfer Submitted:', formData);
    // Add backend submission here
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.heading}>🔁 Stock Transfer</h2>
      <form className={styles.form} onSubmit={handleSubmit}>
        <div className={styles.field}>
          <label>Select Item</label>
          <select name="item" value={formData.item} onChange={handleChange} required>
            <option value="">-- Select Item --</option>
            <option value="cement">Cement</option>
            <option value="paint">Paint</option>
          </select>
        </div>

        <div className={styles.field}>
          <label>From Location</label>
          <select name="fromLocation" value={formData.fromLocation} onChange={handleChange} required>
            <option value="">-- From --</option>
            <option value="Warehouse 1">Warehouse 1</option>
            <option value="Branch 1">Branch 1</option>
          </select>
        </div>

        <div className={styles.field}>
          <label>To Location</label>
          <select name="toLocation" value={formData.toLocation} onChange={handleChange} required>
            <option value="">-- To --</option>
            <option value="Branch 2">Branch 2</option>
            <option value="Selling Area">Selling Area</option>
          </select>
        </div>

        <div className={styles.field}>
          <label>Quantity</label>
          <input
            type="number"
            name="quantity"
            value={formData.quantity}
            onChange={handleChange}
            min="1"
            required
          />
        </div>

        <div className={styles.field}>
          <label>Date of Transfer</label>
          <input
            type="date"
            name="transferDate"
            value={formData.transferDate}
            onChange={handleChange}
            required
          />
        </div>

        <div className={`${styles.field} ${styles.fullWidth}`}>
          <label>Remarks / Reason</label>
          <textarea
            name="remarks"
            value={formData.remarks}
            onChange={handleChange}
            rows="3"
            placeholder="e.g., Transfer to meet branch demand"
          />
        </div>

        <button type="submit" className={styles.submitBtn}>
          Transfer Stock
        </button>
      </form>
    </div>
  );
};

export default StockTransfer;
