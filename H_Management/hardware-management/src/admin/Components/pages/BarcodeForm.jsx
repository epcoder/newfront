/*import React, { useState } from 'react';
import styles from './BarcodeForm.module.css';

const BarcodeForm = () => {
  const [itemName, setItemName] = useState('');
  const [quantity, setQuantity] = useState('');
  const [size, setSize] = useState('30x16');

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Creating ${quantity} barcodes for "${itemName}" [${size}]`);
    // Replace with actual backend call or logic
  };

  return (
    <div className={styles.container}>
      <h2>Create Barcodes</h2>
      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.field}>
          <label htmlFor="itemName">Item Name</label>
          <input
            type="text"
            id="itemName"
            value={itemName}
            onChange={(e) => setItemName(e.target.value)}
            required
          />
        </div>

        

        <div className={styles.field}>
          <label>Barcode Size</label>
          <div className={styles.radioGroup}>
            <label>
              <input
                type="radio"
                name="size"
                value="30x16"
                checked={size === '30x16'}
                onChange={(e) => setSize(e.target.value)}
              />
              30 x 16 mm (3 Col)
            </label>
            <label>
              <input
                type="radio"
                name="size"
                value="50x25"
                checked={size === '50x25'}
                onChange={(e) => setSize(e.target.value)}
              />
              50 x 25 mm (1 Col)
            </label>
          </div>
        </div>

        <button type="submit" className={styles.createButton}>
          Create
        </button>
      </form>
    </div>
  );
};

export default BarcodeForm;*/
