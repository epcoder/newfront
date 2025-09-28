import React from 'react';
import styles from './Reorder.module.css';

const reorderItems = [
  { id: 1, name: 'Cement', currentStock: 8, reorderLevel: 10 },
  { id: 2, name: 'Paint - Nippon', currentStock: 5, reorderLevel: 12 },
  { id: 3, name: 'Tiles - Ceramic', currentStock: 3, reorderLevel: 7 },
];

const ReorderAlerts = () => {
  const alertCount = reorderItems.length;

  return (
    <div className={styles.container}>
      <h2>Reorder Alerts</h2>
      <div className={styles.alert}>
        <span className={styles.alertMark}>⚠️</span> You have <strong>{alertCount}</strong> item{alertCount !== 1 ? 's' : ''} that need reorder!
      </div>

      <table className={styles.table}>
        <thead>
          <tr>
            <th>Item Name</th>
            <th>Current Stock</th>
            <th>Reorder Level</th>
          </tr>
        </thead>
        <tbody>
          {reorderItems.map(item => (
            <tr key={item.id}>
              <td>{item.name}</td>
              <td>{item.currentStock}</td>
              <td>{item.reorderLevel}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ReorderAlerts;
