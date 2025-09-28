import React, { useState } from 'react';
import styles from './CustomerOrder.module.css';

const CustomerOrders = () => {
  const [orders, setOrders] = useState([
    {
      orderId: 'ORD001',
      customerName: 'Kamal Perera',
      item: 'Cement Bags',
      quantity: 50,
      status: 'Pending',
    },
    {
      orderId: 'ORD002',
      customerName: 'Nimal Silva',
      item: 'Steel Rods',
      quantity: 20,
      status: 'Pending',
    },
  ]);

  const handleAccept = (orderId) => {
    const updatedOrders = orders.map((order) =>
      order.orderId === orderId ? { ...order, status: 'Accepted' } : order
    );
    setOrders(updatedOrders);
  };

  const handleReject = (orderId) => {
    const updatedOrders = orders.map((order) =>
      order.orderId === orderId ? { ...order, status: 'Cannot Process' } : order
    );
    setOrders(updatedOrders);
  };

  return (
    <div className={styles.container}>
      <h2>📋 Customer Order Requests</h2>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>Order ID</th>
            <th>Customer</th>
            <th>Item</th>
            <th>Qty</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr key={order.orderId}>
              <td>{order.orderId}</td>
              <td>{order.customerName}</td>
              <td>{order.item}</td>
              <td>{order.quantity}</td>
              <td
                className={
                  order.status === 'Accepted'
                    ? styles.accepted
                    : order.status === 'Cannot Process'
                    ? styles.rejected
                    : styles.pending
                }
              >
                {order.status}
              </td>
              <td>
                {order.status === 'Pending' ? (
                  <>
                    <button
                      className={styles.accept}
                      onClick={() => handleAccept(order.orderId)}
                    >
                      Accept
                    </button>
                    <button
                      className={styles.reject}
                      onClick={() => handleReject(order.orderId)}
                    >
                      Reject
                    </button>
                  </>
                ) : (
                  <span>-</span>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CustomerOrders;
