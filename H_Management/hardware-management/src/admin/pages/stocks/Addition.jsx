import React, { useState } from 'react';
import styles from './Addition.module.css';

const StockAddition = () => {
  const [formData, setFormData] = useState({
    item: '',
    quantity: '',
    cost: '',
    arrivalDate: '',
    supplier: '',
    invoiceNumber: '',
    remarks: '',
    invoiceFile: null,
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'invoiceFile') {
      setFormData({ ...formData, [name]: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Stock Added:', formData);
    alert('Stock successfully added!');
    setFormData({
      item: '',
      quantity: '',
      cost: '',
      arrivalDate: '',
      supplier: '',
      invoiceNumber: '',
      remarks: '',
      invoiceFile: null,
    });
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.heading}>➕ Stock Addition</h2>
      <form className={styles.form} onSubmit={handleSubmit}>
        {/* Item Selection */}
        <div className={styles.field}>
          <label>Select Item</label>
          <input
            type="text"
            name="item"
            value={formData.item}
            onChange={handleChange}
            placeholder="Search or enter new item"
            required
          />
          <small className={styles.inlineNote}>Can add new item inline if not found</small>
        </div>

        {/* Quantity */}
        <div className={styles.field}>
          <label>Quantity Added</label>
          <input
            type="number"
            name="quantity"
            min="1"
            value={formData.quantity}
            onChange={handleChange}
            required
          />
        </div>

        {/* Cost */}
        <div className={styles.field}>
          <label>Cost per Unit</label>
          <input
            type="number"
            name="cost"
            min="0"
            step="0.01"
            value={formData.cost}
            onChange={handleChange}
            required
          />
        </div>

        {/* Arrival Date */}
        <div className={styles.field}>
          <label>Date of Arrival</label>
          <input
            type="date"
            name="arrivalDate"
            value={formData.arrivalDate}
            onChange={handleChange}
            required
          />
        </div>

        {/* Supplier */}
        <div className={styles.field}>
          <label>Supplier</label>
          <input
            type="text"
            name="supplier"
            value={formData.supplier}
            onChange={handleChange}
            placeholder="Enter supplier name"
            required
          />
        </div>

        {/* Invoice Number */}
        <div className={styles.field}>
          <label>Invoice Number (optional)</label>
          <input
            type="text"
            name="invoiceNumber"
            value={formData.invoiceNumber}
            onChange={handleChange}
          />
        </div>

        {/* Remarks */}
        <div className={styles.field}>
          <label>Remarks (optional)</label>
          <textarea
            name="remarks"
            rows="3"
            value={formData.remarks}
            onChange={handleChange}
            placeholder="Ex: Received in good condition"
          />
        </div>

        {/* Upload File */}
        <div className={styles.field}>
          <label>Upload Invoice (PDF or Image)</label>
          <input
            type="file"
            name="invoiceFile"
            accept="application/pdf,image/*"
            onChange={handleChange}
          />
        </div>

        <button type="submit" className={styles.submitBtn}>Add Stock</button>
      </form>
    </div>
  );
};

export default StockAddition;
