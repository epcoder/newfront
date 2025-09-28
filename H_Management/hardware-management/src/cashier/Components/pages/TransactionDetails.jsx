// src/components/cashier/TransactionDetails/TransactionList.jsx
import React, { useState, useEffect } from "react";
import styles from "./TransactionDetails.module.css";
import axios from "axios";

const API_BASE = "https://hms-back-5gbr.onrender.com/api/v1/cashiertransaction";

const TransactionList = () => {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedTransaction, setSelectedTransaction] = useState(null);

  useEffect(() => {
    fetchTransactions();
  }, []);

  // Fetch all transactions from backend
  const fetchTransactions = async () => {
    try {
      const res = await axios.get(`${API_BASE}/all`);
      setTransactions(res.data);
    } catch (error) {
      console.error("Failed to fetch transactions:", error);
      alert("Failed to fetch transactions from backend.");
    } finally {
      setLoading(false);
    }
  };

  // Fetch single transaction by ID
  const handleView = async (transactionId) => {
    try {
      const res = await axios.get(`${API_BASE}/transactionId/${transactionId}`);
      setSelectedTransaction(res.data);
    } catch (error) {
      console.error("Failed to fetch transaction details:", error);
      alert("Failed to fetch transaction details.");
    }
  };

  const handleCloseModal = () => setSelectedTransaction(null);

  if (loading) return <p>Loading transactions...</p>;

  return (
    <div className={styles.container}>
      <h2>📋 All Transactions</h2>

      <table className={styles.table}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Customer</th>
            <th>Date</th>
            <th>Type</th>
            <th>Total (Rs.)</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {transactions.length === 0 && (
            <tr>
              <td colSpan={6} style={{ textAlign: "center" }}>
                No transactions found
              </td>
            </tr>
          )}
          {transactions.map((txn) => (
            <tr key={txn.transactionId}>
              <td>{txn.transactionId}</td>
              <td>{txn.customerName || txn.customerId}</td>
              <td>{new Date(txn.transactionDate).toLocaleString()}</td>
              <td>{txn.transactionType}</td>
              <td>{txn.total?.toFixed(2) || 0}</td>
              <td>
                <button
                  className={styles.viewBtn}
                  onClick={() => handleView(txn.transactionId)}
                >
                  👁️ View
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Transaction Details Modal */}
      {selectedTransaction && (
        <div className={styles.modal}>
          <div className={styles.modalContent}>
            <h3>Transaction Details</h3>
            <p>
              <strong>ID:</strong> {selectedTransaction.transactionId}
            </p>
            <p>
              <strong>Customer:</strong>{" "}
              {selectedTransaction.customerName || selectedTransaction.customerId}
            </p>
            <p>
              <strong>Date:</strong>{" "}
              {new Date(selectedTransaction.transactionDate).toLocaleString()}
            </p>
            <p>
              <strong>Type:</strong> {selectedTransaction.transactionType}
            </p>
            <p>
              <strong>Total:</strong> Rs. {selectedTransaction.total?.toFixed(2)}
            </p>

            {/* Items in transaction */}
            {selectedTransaction.items && selectedTransaction.items.length > 0 && (
              <table className={styles.table} style={{ marginTop: "10px" }}>
                <thead>
                  <tr>
                    <th>Code</th>
                    <th>Name</th>
                    <th>Qty</th>
                    <th>Unit Price</th>
                    <th>Discount</th>
                    <th>Total</th>
                  </tr>
                </thead>
                <tbody>
                  {selectedTransaction.items.map((item) => (
                    <tr key={item.itemId}>
                      <td>{item.itemId}</td>
                      <td>{item.itemName}</td>
                      <td>{item.itemQuantity}</td>
                      <td>{item.itemUnitPrice}</td>
                      <td>{item.discount}</td>
                      <td>
                        {(
                          item.itemQuantity * item.itemUnitPrice -
                          (item.discount || 0)
                        ).toFixed(2)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}

            <button className={styles.closeBtn} onClick={handleCloseModal}>
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default TransactionList;
