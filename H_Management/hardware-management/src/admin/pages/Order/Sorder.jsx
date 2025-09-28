import React, { useState, useEffect } from 'react';
import styles from './Sorder.module.css';

const CreateOrderForm = () => {
  const [suppliers, setSuppliers] = useState([]);
  const [items, setItems] = useState([]);
  const [selectedSupplier, setSelectedSupplier] = useState('');
  const [orderItems, setOrderItems] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [expectedDate, setExpectedDate] = useState('');

  // Mock suppliers with emails
  useEffect(() => {
    setSuppliers([
      { id: 's1', name: 'ABC Suppliers', email: 'abc@suppliers.com' },
      { id: 's2', name: 'XYZ Traders', email: 'xyz@traders.com' },
    ]);
    setItems([
      { id: 'i1', name: 'Cement Bag' },
      { id: 'i2', name: 'Iron Rod' },
      { id: 'i3', name: 'Paint Bucket' },
    ]);
  }, []);

  const handleAddItem = (item) => {
    if (!orderItems.find(i => i.id === item.id)) {
      setOrderItems([...orderItems, { ...item, quantity: 1 }]);
    }
  };

  const handleQuantityChange = (id, quantity) => {
    setOrderItems(orderItems.map(item =>
      item.id === id ? { ...item, quantity: parseInt(quantity) || 1 } : item
    ));
  };

  const handleRemoveItem = (id) => {
    setOrderItems(orderItems.filter(item => item.id !== id));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!selectedSupplier || orderItems.length === 0 || !expectedDate) {
      alert("Please fill all required fields.");
      return;
    }
    const supplier = suppliers.find(s => s.id === selectedSupplier);
    const orderData = {
      supplierId: selectedSupplier,
      supplierEmail: supplier?.email,
      expectedDeliveryDate: expectedDate,
      items: orderItems.map(({ id, name, quantity }) => ({ id, name, quantity })),
    };
    console.log("Simulated Order Submission:", orderData);
    alert(`Order sent to ${orderData.supplierEmail} (simulation)`);

    // Reset form
    setSelectedSupplier('');
    setOrderItems([]);
    setSearchTerm('');
    setExpectedDate('');
  };

  const filteredItems = items.filter(item =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className={styles.ccontainer}>
      <h2>Create Purchase Order</h2>
      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.formGroup}>
          <label>Supplier:</label>
          <select
            value={selectedSupplier}
            onChange={e => setSelectedSupplier(e.target.value)}
            required
          >
            <option value="">Select Supplier</option>
            {suppliers.map(s => (
              <option key={s.id} value={s.id}>{s.name}</option>
            ))}
          </select>
        </div>

        <div className={styles.formGroup}>
          <label>Search Items:</label>
          <input
            type="text"
            placeholder="Type item name..."
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
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

        <div className={styles.formGroup}>
          <label>Selected Items:</label>
          {orderItems.length === 0 ? (
            <p>No items added.</p>
          ) : (
            <ul>
              {orderItems.map(item => (
                <li key={item.id}>
                  {item.name} &nbsp;
                  <input
                    type="number"
                    min="1"
                    value={item.quantity}
                    onChange={e => handleQuantityChange(item.id, e.target.value)}
                    className={styles.quantityInput}
                  /> &nbsp;
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
          )}
        </div>

        <div className={styles.formGroup}>
          <label>Expected Delivery Date:</label>
          <input
            type="date"
            value={expectedDate}
            onChange={e => setExpectedDate(e.target.value)}
            required
          />
        </div>

        <button type="submit" className={styles.submitBtn}>
          Create Order
        </button>
      </form>
    </div>
  );
};

export default CreateOrderForm;
