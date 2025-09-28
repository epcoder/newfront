import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styles from './ManageItem.module.css';

const ManageItem = () => {
  const [items, setItems] = useState([]);
  const [newItem, setNewItem] = useState({
    item_id: '',
    item_name: '',
    item_type: '',
    item_group: '',
    item_brand: '',
    item_price: '',
    item_cost: '',
    item_quantity: '',
    item_discount: '',
    item_supplier: '',
    item_reoder_level: '',
  });

  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    try {
      const response = await axios.get('http://localhost:8080/api/v1/item/getitem');
      setItems(response.data);
    } catch (error) {
      console.error('Failed to fetch items:', error);
    }
  };

  const handleChange = (e) => {
    setNewItem({ ...newItem, [e.target.name]: e.target.value });
  };

  const generateItemId = () => {
    const next = items.length + 1;
    return `ITEM${next.toString().padStart(3, '0')}`;
  };

  const resetForm = () => {
    setNewItem({
      item_id: '',
      item_name: '',
      item_type: '',
      item_group: '',
      item_brand: '',
      item_price: '',
      item_cost: '',
      item_quantity: '',
      item_discount: '',
      item_supplier: '',
      item_reoder_level: '',
    });
    setIsEditing(false);
  };

  const addItem = async () => {
    const itemToAdd = {
      ...newItem,
      item_id: generateItemId(),
    };

    try {
      await axios.post('http://localhost:8080/api/v1/item/saveItem', itemToAdd);
      fetchItems();
      resetForm();
    } catch (error) {
      console.error('Failed to add item:', error);
    }
  };

  const editItem = (item) => {
    setNewItem(item);
    setIsEditing(true);
  };

  const updateItem = async () => {
    try {
      await axios.put('http://localhost:8080/api/v1/item/updateItem', newItem);
      fetchItems();
      resetForm();
    } catch (error) {
      console.error('Failed to update item:', error);
    }
  };

  const deleteItem = async (item) => {
    if (!window.confirm('Are you sure you want to delete this item?')) return;

    try {
      await axios.delete('http://localhost:8080/api/v1/item/deleteItem', {
        data: item,
      });
      fetchItems();
    } catch (error) {
      console.error('Failed to delete item:', error);
    }
  };

  return (
    <div className={styles.container}>
      <h2>Manage Items</h2>

      {/* Add/Edit Form */}
      <div className={styles.formSection}>
        <h3>{isEditing ? 'Edit Item' : 'Add New Item'}</h3>
        <div className={styles.formGroup}>
          <input name="item_name" placeholder="Item Name" value={newItem.item_name} onChange={handleChange} />
          <input name="item_type" placeholder="Type" value={newItem.item_type} onChange={handleChange} />
          <input name="item_group" placeholder="Group" value={newItem.item_group} onChange={handleChange} />
          <input name="item_brand" placeholder="Brand" value={newItem.item_brand} onChange={handleChange} />
          <input name="item_supplier" placeholder="Supplier" value={newItem.item_supplier} onChange={handleChange} />
          <input name="item_price" type="number" placeholder="Selling Price" value={newItem.item_price} onChange={handleChange} />
          <input name="item_cost" type="number" placeholder="Cost Price" value={newItem.item_cost} onChange={handleChange} />
          <input name="item_quantity" type="number" placeholder="Quantity" value={newItem.item_quantity} onChange={handleChange} />
          <input name="item_discount" type="number" placeholder="Discount (%)" value={newItem.item_discount} onChange={handleChange} />
          <input name="item_reoder_level" type="number" placeholder="Reorder Level" value={newItem.item_reoder_level} onChange={handleChange} />

          {isEditing ? (
            <>
              <button onClick={updateItem} className={styles.updateButton}>Update Item</button>
              <button onClick={resetForm} className={styles.cancelButton}>Cancel</button>
            </>
          ) : (
            <button onClick={addItem} className={styles.addButton}>Add Item</button>
          )}
        </div>
      </div>

      {/* Items Table */}
      <div className={styles.tableSection}>
        <h3>Item List</h3>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Item ID</th>
              <th>Name</th>
              <th>Type</th>
              <th>Group</th>
              <th>Brand</th>
              <th>Supplier</th>
              <th>Cost</th>
              <th>Price</th>
              <th>Quantity</th>
              <th>Discount</th>
              <th>Reorder Level</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item) => (
              <tr key={item.item_id}>
                <td>{item.item_id}</td>
                <td>{item.item_name}</td>
                <td>{item.item_type}</td>
                <td>{item.item_group}</td>
                <td>{item.item_brand}</td>
                <td>{item.item_supplier}</td>
                <td>{item.item_cost}</td>
                <td>{item.item_price}</td>
                <td>{item.item_quantity}</td>
                <td>{item.item_discount}%</td>
                <td>{item.item_reoder_level}</td>
                <td>
                  <button onClick={() => editItem(item)} className={styles.editButton}>Edit</button>
                  <button onClick={() => deleteItem(item)} className={styles.deleteButton}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageItem;
