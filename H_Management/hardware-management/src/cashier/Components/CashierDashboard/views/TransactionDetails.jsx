import React, { useState, useEffect } from 'react';
import styles from './TransactionDetails.module.css';

// Sample transaction data (replace with backend fetch later)
const sampleTransactions = [
  {
    id: 'TXN001',
    customer: 'Nimal Perera',
    date: '2025-08-01',
    type: 'sale',
    total: 45000.00
  },
  {
    id: 'TXN002',
    customer: 'Sunil Fernando',
    date: '2025-08-01',
    type: 'credit',
    total: 21000.50
  },
  {
    id: 'TXN003',
    customer: 'Nadeesha Kumari',
    date: '2025-08-02',
    type: 'return',
    total: 7500.00
  }
];

const TransactionList = () => {
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    // Replace this with API call later
    setTransactions(sampleTransactions);
  }, []);

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
          {transactions.map((txn, index) => (
            <tr key={index}>
              <td>{txn.id}</td>
              <td>{txn.customer}</td>
              <td>{txn.date}</td>
              <td>{txn.type}</td>
              <td>{txn.total.toFixed(2)}</td>
              <td>
                <button className={styles.viewBtn}>👁️ View</button>
                <button className={styles.deleteBtn}>🗑️ Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TransactionList;
