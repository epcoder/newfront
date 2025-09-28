import React, { useEffect, useState } from 'react';
import styles from './Sorder.module.css'; // CSS module styling

const mockLowStockItems = [
  { item_id: 'I001', item_name: 'Cement 50kg', currentQty: 12, reorderLevel: 20 },
  { item_id: 'I002', item_name: '8mm Iron Rod', currentQty: 5, reorderLevel: 15 },
  { item_id: 'I003', item_name: 'Paint (Red)', currentQty: 3, reorderLevel: 10 },
];

const ReorderSuggestions = () => {
  const [lowStockItems, setLowStockItems] = useState([]);

  useEffect(() => {
    // Simulate backend API delay
    setTimeout(() => {
      setLowStockItems(mockLowStockItems);
    }, 500);
  }, []);

  const handleOrderNow = (item) => {
    alert(`Redirect to CreateOrderForm pre-filled with: ${item.item_name}`);
    // In future: navigate('/supplier-order-form', { state: { item } });
  };

  return (
    <div className={styles.section}>
      <h2 style={{ color: 'white' }}>⚠️ Reorder Suggestions</h2>

      <table>
        <thead>
          <tr>
            <th>Item</th>
            <th>Current Qty</th>
            <th>Reorder Level</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {lowStockItems.length === 0 ? (
            <tr>
              <td colSpan="4">✅ All stock levels are sufficient.</td>
            </tr>
          ) : (
            lowStockItems.map((i) => (
              <tr key={i.item_id}>
                <td>{i.item_name}</td>
                <td>{i.currentQty}</td>
                <td>{i.reorderLevel}</td>
                <td>
                  <button onClick={() => handleOrderNow(i)}>Order Now</button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default ReorderSuggestions;
