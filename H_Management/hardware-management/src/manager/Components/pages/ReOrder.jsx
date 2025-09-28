// src/components/ReOrder/ReorderLevelManager.jsx
import React, { useState, useEffect } from "react";
import styles from "./ReOrder.module.css";
import { getItems, updateItemApi } from "../../../Api/MA/ItemApi";

const ReorderLevelManager = () => {
  const [items, setItems] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [editedValue, setEditedValue] = useState(0);
  const [selectedItemId, setSelectedItemId] = useState("");
  const [newReorderLevel, setNewReorderLevel] = useState("");

  // Fetch items from backend
  useEffect(() => {
    const fetchItems = async () => {
      try {
        const res = await getItems();
        setItems(res.data);
      } catch (err) {
        console.error("Error fetching items:", err);
      }
    };
    fetchItems();
  }, []);

  // Edit row
  const handleEdit = (id, currentValue) => {
    setEditingId(id);
    setEditedValue(currentValue);
  };

  // Save edited reorder level
  const handleSave = async (item) => {
    try {
      const updatedItem = { ...item, item_reoder_level: editedValue };
      const res = await updateItemApi(updatedItem); // call backend
      setItems((prev) =>
        prev.map((it) => (it.item_id === item.item_id ? res.data : it))
      );
    } catch (err) {
      console.error("Error updating reorder level:", err);
    }
    setEditingId(null);
  };

  // Add or update reorder level using form
  const handleAddReorderLevel = async (e) => {
    e.preventDefault();
    if (!selectedItemId || !newReorderLevel) return;

    const item = items.find((it) => it.item_id === selectedItemId);
    if (!item) return;

    try {
      const updatedItem = {
        ...item,
        item_reoder_level: parseInt(newReorderLevel),
      };
      const res = await updateItemApi(updatedItem);
      setItems((prev) =>
        prev.map((it) => (it.item_id === item.item_id ? res.data : it))
      );
    } catch (err) {
      console.error("Error setting reorder level:", err);
    }

    setSelectedItemId("");
    setNewReorderLevel("");
  };

  return (
    <div className={styles.container}>
      <h2>Set Reorder Levels</h2>

      <form onSubmit={handleAddReorderLevel} className={styles.form}>
        <select
          value={selectedItemId}
          onChange={(e) => setSelectedItemId(e.target.value)}
          required
        >
          <option value="">Select Item</option>
          {items.map((item) => (
            <option key={item.item_id} value={item.item_id}>
              {item.item_name}
            </option>
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
          {items.map((item) => (
            <tr
              key={item.item_id}
              className={
                item.item_quantity < item.item_reoder_level
                  ? styles.low
                  : item.item_quantity === item.item_reoder_level
                  ? styles.warning
                  : styles.ok
              }
            >
              <td>{item.item_name}</td>
              <td>{item.item_type}</td>
              <td>{item.item_brand}</td>
              <td>{item.item_quantity}</td>
              <td>
                {editingId === item.item_id ? (
                  <input
                    type="number"
                    value={editedValue}
                    onChange={(e) =>
                      setEditedValue(Number(e.target.value))
                    }
                  />
                ) : (
                  item.item_reoder_level
                )}
              </td>
              <td>
                {editingId === item.item_id ? (
                  <button onClick={() => handleSave(item)}>Save</button>
                ) : (
                  <button
                    onClick={() =>
                      handleEdit(item.item_id, item.item_reoder_level)
                    }
                  >
                    Edit
                  </button>
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
