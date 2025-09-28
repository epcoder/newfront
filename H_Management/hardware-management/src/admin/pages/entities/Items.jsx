import React, { useState, useEffect } from "react";
import styles from "./Items.module.css";
import {
  getAllItems,
  updateItem,
  deleteItem,
} from "../../../Api/AA/FindItemApi"; // only need getAllItems, updateItem, deleteItem

const Items = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [allItems, setAllItems] = useState([]); // full list
  const [items, setItems] = useState([]); // displayed list
  const [editItemId, setEditItemId] = useState(null);
  const [editedItem, setEditedItem] = useState({});

  // ✅ Fetch all items once
  const fetchItems = () => {
    getAllItems()
      .then((res) => {
        setAllItems(res.data);
        setItems(res.data);
      })
      .catch((err) => console.error("Error fetching items:", err));
  };

  useEffect(() => {
    fetchItems();
  }, []);

  // ✅ Handle search locally
  const handleSearch = (e) => {
    const value = e.target.value;
    setSearchTerm(value);

    if (!value) {
      setItems(allItems);
      return;
    }

    const filtered = allItems.filter(
      (item) =>
        item.item_id.toString().includes(value) ||
        item.item_name.toLowerCase().includes(value.toLowerCase()) ||
        (item.item_brand && item.item_brand.toLowerCase().includes(value.toLowerCase()))
    );

    setItems(filtered);
  };

  // ✅ Edit handlers
  const handleEditClick = (item) => {
    setEditItemId(item.item_id);
    setEditedItem({ ...item });
  };

  const handleCancelEdit = () => {
    setEditItemId(null);
    setEditedItem({});
  };

  const handleInputChange = (e, field) => {
    setEditedItem({
      ...editedItem,
      [field]: e.target.value,
    });
  };

  const handleSaveEdit = () => {
    updateItem(editedItem)
      .then(() => {
        fetchItems();
        setEditItemId(null);
        setEditedItem({});
      })
      .catch((err) => console.error("Error updating item:", err));
  };

  const handleDelete = (item) => {
    deleteItem(item)
      .then(() => fetchItems())
      .catch((err) => console.error("Error deleting item:", err));
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h2>Items</h2>
        <input
          type="text"
          placeholder="Search by ID, name, or brand..."
          value={searchTerm}
          onChange={handleSearch}
          className={styles.searchInput}
        />
      </div>

      <table className={styles.table}>
        <thead>
          <tr>
            <th>Item Code</th>
            <th>Item Name</th>
            <th>Group</th>
            <th>Type</th>
            <th>Brand</th>
            <th>Cost</th>
            <th>Discount</th>
            <th>Selling Price</th>
            <th>Supplier</th>
            <th>Reorder Level</th>
            <th>Quantity</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {items.length > 0 ? (
            items.map((item) => (
              <tr key={item.item_id}>
                <td>{item.item_id}</td>
                <td>
                  {editItemId === item.item_id ? (
                    <input
                      value={editedItem.item_name || ""}
                      onChange={(e) => handleInputChange(e, "item_name")}
                    />
                  ) : (
                    item.item_name
                  )}
                </td>
                <td>{item.item_group}</td>
                <td>{item.item_type}</td>
                <td>
                  {editItemId === item.item_id ? (
                    <input
                      value={editedItem.item_brand || ""}
                      onChange={(e) => handleInputChange(e, "item_brand")}
                    />
                  ) : (
                    item.item_brand
                  )}
                </td>
                <td>{item.item_cost}</td>
                <td>{item.item_discount ?? "N/A"}</td>
                <td>{item.item_price}</td>
                <td>{item.item_supplier ?? "N/A"}</td>
                <td>{item.item_reoder_level}</td>
                <td>{item.quantity}</td>
                <td>
                  {editItemId === item.item_id ? (
                    <>
                      <button onClick={handleSaveEdit} className={styles.saveBtn}>
                        Save
                      </button>
                      <button onClick={handleCancelEdit} className={styles.cancelBtn}>
                        Cancel
                      </button>
                    </>
                  ) : (
                    <>
                      <button onClick={() => handleEditClick(item)} className={styles.editBtn}>
                        Edit
                      </button>
                      <button onClick={() => handleDelete(item)} className={styles.deleteBtn}>
                        Delete
                      </button>
                    </>
                  )}
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="12" style={{ textAlign: "center" }}>
                No items found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Items;
