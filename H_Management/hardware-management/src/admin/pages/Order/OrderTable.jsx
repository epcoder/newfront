import React, { useEffect, useState } from 'react';
import styles from './OrderTable.module.css';

const OrderTable = () => {
  const [orders, setOrders] = useState([]);

  // ✅ Mock data
  const mockOrders = [
    {
      id: 'PO-001',
      supplierId: 'ABC Hardware',
      expectedDeliveryDate: '2025-08-05',
      status: 'Pending',
    },
    {
      id: 'PO-002',
      supplierId: 'XYZ Traders',
      expectedDeliveryDate: '2025-08-10',
      status: 'Ordered',
    },
  ];

  // 🚫 No backend call — using mock data
  const loadOrders = () => {
    setOrders(mockOrders);
  };

  useEffect(() => {
    loadOrders();
  }, []);

  const updateStatus = (id, status) => {
    const updatedOrders = orders.map(order =>
      order.id === id ? { ...order, status } : order
    );
    setOrders(updatedOrders);
  };

  return (
    <div className={styles.section}>
      <h2>📋 Supplier Order List</h2>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>Order ID</th>
            <th>Supplier</th>
            <th>Expected Delivery</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {orders.map(o => (
            <tr key={o.id}>
              <td>{o.id}</td>
              <td>{o.supplierId}</td>
              <td>{o.expectedDeliveryDate}</td>
              <td>{o.status}</td>
              <td>
                <button onClick={() => updateStatus(o.id, 'Ordered')}>Mark Ordered</button>
                <button onClick={() => updateStatus(o.id, 'Delivered')}>Receive</button>
                <button onClick={() => updateStatus(o.id, 'Cancelled')}>Cancel</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default OrderTable;
