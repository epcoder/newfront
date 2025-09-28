// src/components/manager/C2/ManageItem.jsx
import React, { useState } from 'react';
import styles from './ManageItem.module.css';

const ManageItem = () => {
  const [items, setItems] = useState([]);
  const [newItem, setNewItem] = useState({
    name: '',
    category: '',
    brand: '',
    unit: '',
    quantity: 0,
    costPrice: 0,
    sellingPrice: 0,
    reorderLevel: 0,
  });

  const handleChange = (e) => {
    setNewItem({ ...newItem, [e.target.name]: e.target.value });
  };

  // Generate next Item Code: ITEM001, ITEM002, ...
  const generateItemCode = () => {
    const nextId = items.length + 1;
    return `ITEM${nextId.toString().padStart(3, '0')}`;
  };

  const addItem = () => {
    const itemWithCode = {
      ...newItem,
      code: generateItemCode(),
      id: Date.now(),
    };
    setItems([...items, itemWithCode]);
    setNewItem({
      name: '',
      category: '',
      brand: '',
      unit: '',
      quantity: 0,
      costPrice: 0,
      sellingPrice: 0,
      reorderLevel: 0,
    });
  };

  const deleteItem = (id) => {
    setItems(items.filter(item => item.id !== id));
  };

  return (
    <div className={styles.container}>
      <h2>Manage Items</h2>

      {/* Add New Item Form */}
      <div className={styles.formSection}>
        <h3>Add New Item</h3>
        <div className={styles.formGroup}>
          <input name="name" placeholder="Item Name" value={newItem.name} onChange={handleChange} />
          <input name="category" placeholder="Category" value={newItem.category} onChange={handleChange} />
          <input name="brand" placeholder="Brand" value={newItem.brand} onChange={handleChange} />
          <input name="unit" placeholder="Unit (e.g., kg)" value={newItem.unit} onChange={handleChange} />
          <input name="quantity" type="number" placeholder="Quantity" value={newItem.quantity} onChange={handleChange} />
          <input name="costPrice" type="number" placeholder="Cost Price" value={newItem.costPrice} onChange={handleChange} />
          <input name="sellingPrice" type="number" placeholder="Selling Price" value={newItem.sellingPrice} onChange={handleChange} />
          <input name="reorderLevel" type="number" placeholder="Reorder Level" value={newItem.reorderLevel} onChange={handleChange} />
          <button onClick={addItem} className={styles.addButton}>Add Item</button>
        </div>
      </div>

      {/* Item Table */}
      <div className={styles.tableSection}>
        <h3>Item List</h3>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Code</th>
              <th>Name</th>
              <th>Category</th>
              <th>Brand</th>
              <th>Qty</th>
              <th>Reorder</th>
              <th>Cost</th>
              <th>Sell</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {items.map(item => (
              <tr key={item.id} className={item.quantity < item.reorderLevel ? styles.lowStock : ''}>
                <td>{item.code}</td>
                <td>{item.name}</td>
                <td>{item.category}</td>
                <td>{item.brand}</td>
                <td>{item.quantity}</td>
                <td>{item.reorderLevel}</td>
                <td>{item.costPrice}</td>
                <td>{item.sellingPrice}</td>
                <td>{item.quantity < item.reorderLevel ? '⚠️ Low Stock' : 'In Stock'}</td>
                <td><button onClick={() => deleteItem(item.id)} className={styles.deleteButton}>Delete</button></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageItem;
