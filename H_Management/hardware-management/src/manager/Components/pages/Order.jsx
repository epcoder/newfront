import React, { useEffect, useState } from "react";
import styles from "./Order.module.css"; // CSS Module
import axios from "axios";

const OrderDisplay = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch all orders from backend
  const fetchOrders = async () => {
    try {
      const response = await axios.get("https://hms-back-5gbr.onrender.com/api/v1/order/all");
      setOrders(response.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching orders:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  // Optional: Payment verification
  const handleVerifyPayment = async (orderId) => {
    try {
      const response = await axios.post(
        "https://hms-back-5gbr.onrender.com/api/v1/order/payment-verify",
        { orderId } // adjust payload as needed
      );
      alert(response.data);
    } catch (error) {
      console.error(error);
      alert("Payment verification failed");
    }
  };

  // Optional: Ship order
  const handleShipOrder = async (orderId) => {
    try {
      const response = await axios.post(
        "https://hms-back-5gbr.onrender.com/api/v1/order/ship-order",
        { orderId } // adjust payload as needed
      );
      alert(response.data);
    } catch (error) {
      console.error(error);
      alert("Order shipping failed");
    }
  };

  if (loading) return <p>Loading orders...</p>;

  return (
    <div className={styles.container}>
      <h2>Order List</h2>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>Order ID</th>
            <th>Customer</th>
            <th>Total Amount</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr key={order.id}>
              <td>{order.id}</td>
              <td>{order.customerName}</td>
              <td>{order.totalAmount}</td>
              <td>{order.status}</td>
              <td>
                <button
                  className={styles.verifyBtn}
                  onClick={() => handleVerifyPayment(order.id)}
                >
                  Verify Payment
                </button>
                <button
                  className={styles.shipBtn}
                  onClick={() => handleShipOrder(order.id)}
                >
                  Ship Order
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default OrderDisplay;