import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styles from './CreateOrderForm.module.css';

const CreateOrderForm = () => {
  const [suppliers, setSuppliers] = useState([]);
  const [items, setItems] = useState([]);
  const [selectedSupplier, setSelectedSupplier] = useState('');
  const [orderItems, setOrderItems] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [expectedDate, setExpectedDate] = useState('');

  // Load suppliers and items (mock for now)
  useEffect(() => {
    // You can replace these with actual API calls
    setSuppliers([
      { id: 's1', name: 'ABC Suppliers' },
      { id: 's2', name: 'XYZ Traders' },
    ]);

    setItems([
      { id: 'i1', name: 'Cement Bag' },
      { id: 'i2', name: 'Iron Rod' },
      { id: 'i3', name: 'Paint Bucket' },
    ]);
  }, []);

  const handleAddItem = (item) => {
    const alreadyAdded = orderItems.find(i => i.id === item.id);
    if (!alreadyAdded) {
      setOrderItems([...orderItems, { ...item, quantity: 1 }]);
    }
  };

  const handleQuantityChange = (id, quantity) => {
    const updatedItems = orderItems.map(item =>
      item.id === id ? { ...item, quantity: parseInt(quantity) || 1 } : item
    );
    setOrderItems(updatedItems);
  };

  const handleRemoveItem = (id) => {
    setOrderItems(orderItems.filter(item => item.id !== id));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const orderData = {
      supplierId: selectedSupplier,
      expectedDeliveryDate: expectedDate,
      items: orderItems.map(({ id, quantity }) => ({ id, quantity })),
    };
    console.log('Submitting Order:', orderData);
    alert('Order submitted (check console)');
    // axios.post('/api/orders', orderData)
    //   .then(res => alert('Order Created!'))
    //   .catch(err => console.error('Error creating order:', err));
  };

  const filteredItems = items.filter(item =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className={styles.container}>
      <h2>Create Purchase Order</h2>

      <form onSubmit={handleSubmit} className={styles.form}>
        {/* Supplier Dropdown */}
        <div className={styles.formGroup}>
          <label>Supplier:</label>
          <select
            value={selectedSupplier}
            onChange={(e) => setSelectedSupplier(e.target.value)}
            required
          >
            <option value="">Select Supplier</option>
            {suppliers.map(s => (
              <option key={s.id} value={s.id}>{s.name}</option>
            ))}
          </select>
        </div>

        {/* Item Search and Select */}
        <div className={styles.formGroup}>
          <label>Search Items:</label>
          <input
            type="text"
            placeholder="Type item name..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <div className={styles.itemList}>
            {filteredItems.map(item => (
              <button
                type="button"
                key={item.id}
                onClick={() => handleAddItem(item)}
                className={styles.itemButton}
              >
                ➕ {item.name}
              </button>
            ))}
          </div>
        </div>

        {/* Selected Items with Quantity */}
        <div className={styles.formGroup}>
          <label>Selected Items:</label>
          {orderItems.length === 0 && <p>No items added.</p>}
          <ul>
            {orderItems.map(item => (
              <li key={item.id}>
                {item.name} &nbsp;
                <input
                  type="number"
                  min="1"
                  value={item.quantity}
                  onChange={(e) => handleQuantityChange(item.id, e.target.value)}
                  className={styles.quantityInput}
                />
                &nbsp;
                <button
                  type="button"
                  onClick={() => handleRemoveItem(item.id)}
                  className={styles.removeBtn}
                >
                  ❌
                </button>
              </li>
            ))}
          </ul>
        </div>

        {/* Delivery Date */}
        <div className={styles.formGroup}>
          <label>Expected Delivery Date:</label>
          <input
            type="date"
            value={expectedDate}
            onChange={(e) => setExpectedDate(e.target.value)}
            required
          />
        </div>

        {/* Submit */}
        <button type="submit" className={styles.submitBtn}>Create Order</button>
      </form>
    </div>
  );
};

export default CreateOrderForm;
