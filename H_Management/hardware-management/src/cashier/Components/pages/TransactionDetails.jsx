// src/components/cashier/TransactionDetails/TransactionList.jsx
import React, { useState, useEffect } from 'react';
import styles from './TransactionDetails.module.css';
import { getAllTransactions, getTransactionById } from '../../../Api/CA/TDApi';

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
      const data = await getAllTransactions();
      setTransactions(data);
    } catch (error) {
      alert("Failed to fetch transactions from backend.");
    } finally {
      setLoading(false);
    }
  };

  // View single transaction details
  const handleView = async (transactionId) => {
    try {
      const data = await getTransactionById(transactionId);
      setSelectedTransaction(data);
    } catch (error) {
      alert("Failed to fetch transaction details.");
    }
  };

  // Close transaction details modal
  const handleCloseModal = () => {
    setSelectedTransaction(null);
  };

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
          {transactions.map((txn) => (
            <tr key={txn.transactionId}>
              <td>{txn.transactionId}</td>
              <td>{txn.customer}</td>
              <td>{txn.date}</td>
              <td>{txn.type}</td>
              <td>{txn.total.toFixed(2)}</td>
              <td>
                <button className={styles.viewBtn} onClick={() => handleView(txn.transactionId)}>
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
            <p><strong>ID:</strong> {selectedTransaction.transactionId}</p>
            <p><strong>Customer:</strong> {selectedTransaction.customer}</p>
            <p><strong>Date:</strong> {selectedTransaction.date}</p>
            <p><strong>Type:</strong> {selectedTransaction.type}</p>
            <p><strong>Total:</strong> Rs. {selectedTransaction.total.toFixed(2)}</p>
            {/* Add more fields if needed */}
            <button className={styles.closeBtn} onClick={handleCloseModal}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default TransactionList;
