import React, { useState, useEffect } from "react";
import axios from "axios";
import styles from "./Order.module.css";

const OrdersPage = () => {
  const [orders, setOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [templateValues, setTemplateValues] = useState({}); // for email template
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  // Fetch all orders
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get("https://hms-back-5gbr.onrender.com/api/v1/order/getAllOrders");
        setOrders(response.data);
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    };
    fetchOrders();
  }, []);

  // Handle sending email
  const sendEmail = async (order) => {
    if (!order) return;
    setLoading(true);
    try {
      const response = await axios.post(
        `https://hms-back-5gbr.onrender.com/api/v1/email/sendTemplate`,
        templateValues,
        {
          params: {
            to: order.email,
            templateName: "orderTemplate", // replace with your template name
          },
        }
      );
      setMessage(`Email sent to ${order.email}`);
    } catch (error) {
      console.error("Error sending email:", error);
      setMessage("Failed to send email");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      <h1>Orders</h1>
      {message && <div className={styles.message}>{message}</div>}
      <table className={styles.ordersTable}>
        <thead>
          <tr>
            <th>Order ID</th>
            <th>Customer</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Payment Status</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr key={order.order_id}>
              <td>{order.order_id}</td>
              <td>
                {order.first_name} {order.last_name}
              </td>
              <td>{order.email}</td>
              <td>{order.phone_number}</td>
              <td>{order.payment_status ? "Paid" : "Pending"}</td>
              <td>{order.status ? "Shipped" : "Processing"}</td>
              <td>
                <button
                  className={styles.sendEmailButton}
                  onClick={() => {
                    setSelectedOrder(order);
                    sendEmail(order);
                  }}
                  disabled={loading}
                >
                  {loading && selectedOrder?.order_id === order.order_id
                    ? "Sending..."
                    : "Send Email"}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default OrdersPage;
