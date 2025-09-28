import React, { useState } from 'react';
import styles from './Deduction.module.css';

const StockDeduction = () => {
  const [formData, setFormData] = useState({
    item: '',
    quantity: '',
    reason: '',
    date: '',
    remarks: '',
    file: null,
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'file') {
      setFormData((prev) => ({ ...prev, file: files[0] }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Deduction Data:', formData);
    // Handle file upload + backend API here
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.heading}>➖ Stock Deduction</h2>
      <form className={styles.form} onSubmit={handleSubmit}>
        <div className={styles.field}>
          <label>Select Item</label>
          <select name="item" value={formData.item} onChange={handleChange} required>
            <option value="">-- Select Item --</option>
            <option value="Cement">Cement</option>
            <option value="Paint">Paint</option>
          </select>
        </div>

        <div className={styles.field}>
          <label>Quantity Deducted</label>
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
          <label>Reason</label>
          <select name="reason" value={formData.reason} onChange={handleChange} required>
            <option value="">-- Select Reason --</option>
            <option value="Damage">Damage</option>
            <option value="Expired">Expired</option>
            <option value="Theft">Theft</option>
            <option value="Audit Adjustment">Audit Adjustment</option>
            <option value="Lost">Lost</option>
          </select>
        </div>

        <div className={styles.field}>
          <label>Date</label>
          <input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            required
          />
        </div>

        <div className={`${styles.field} ${styles.fullWidth}`}>
          <label>Remarks</label>
          <textarea
            name="remarks"
            value={formData.remarks}
            onChange={handleChange}
            placeholder="Optional details..."
            rows="3"
          />
        </div>

        <div className={`${styles.field} ${styles.fullWidth}`}>
          <label>Attach Photo Evidence (Optional)</label>
          <input
            type="file"
            name="file"
            accept="image/*"
            onChange={handleChange}
          />
        </div>

        <button type="submit" className={styles.submitBtn}>
          Deduct Stock
        </button>
      </form>
    </div>
  );
};

export default StockDeduction;
