import React, { useState } from 'react';
import styles from './ReOrder.module.css';

const dummyItems = [
  { id: 1, name: 'Hammer', category: 'Tools', brand: 'Makita', stock: 8, reorderLevel: 10 },
  { id: 2, name: 'PVC Pipe', category: 'Plumbing', brand: 'Kohler', stock: 4, reorderLevel: 3 },
  { id: 3, name: 'Screwdriver', category: 'Tools', brand: 'Bosch', stock: 5, reorderLevel: 7 },
];

const ReorderLevelManager = () => {
  const [items, setItems] = useState(dummyItems);
  const [editingId, setEditingId] = useState(null);
  const [editedValue, setEditedValue] = useState(0);
  const [selectedItemId, setSelectedItemId] = useState('');
  const [newReorderLevel, setNewReorderLevel] = useState('');

  const handleEdit = (id, currentValue) => {
    setEditingId(id);
    setEditedValue(currentValue);
  };

  const handleSave = (id) => {
    setItems(prev => prev.map(item => item.id === id ? { ...item, reorderLevel: editedValue } : item));
    setEditingId(null);
  };

  const handleAddReorderLevel = (e) => {
    e.preventDefault();
    if (!selectedItemId || !newReorderLevel) return;
    setItems(prev => prev.map(item => item.id === parseInt(selectedItemId) ? { ...item, reorderLevel: parseInt(newReorderLevel) } : item));
    setSelectedItemId('');
    setNewReorderLevel('');
  };

  return (
    <div className={styles.container}>
      <h2>Set Reorder Levels</h2>

      <form onSubmit={handleAddReorderLevel} className={styles.form}>
        <select value={selectedItemId} onChange={(e) => setSelectedItemId(e.target.value)} required>
          <option value="">Select Item</option>
          {items.map(item => (
            <option key={item.id} value={item.id}>{item.name}</option>
          ))}
        </select>
        <input
          type="number"
          placeholder="New Reorder Level"
          value={newReorderLevel}
          onChange={(e) => setNewReorderLevel(e.target.value)}
          required
        />
        <button type="submit">Update Reorder Level</button>
      </form>

      <table className={styles.table}>
        <thead>
          <tr>
            <th>Item</th>
            <th>Category</th>
            <th>Brand</th>
            <th>Stock</th>
            <th>Reorder Level</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {items.map(item => (
            <tr
              key={item.id}
              className={
                item.stock < item.reorderLevel ? styles.low :
                item.stock === item.reorderLevel ? styles.warning :
                styles.ok
              }
            >
              <td>{item.name}</td>
              <td>{item.category}</td>
              <td>{item.brand}</td>
              <td>{item.stock}</td>
              <td>
                {editingId === item.id ? (
                  <input
                    type="number"
                    value={editedValue}
                    onChange={(e) => setEditedValue(Number(e.target.value))}
                  />
                ) : (
                  item.reorderLevel
                )}
              </td>
              <td>
                {editingId === item.id ? (
                  <button onClick={() => handleSave(item.id)}>Save</button>
                ) : (
                  <button onClick={() => handleEdit(item.id, item.reorderLevel)}>Edit</button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ReorderLevelManager;
