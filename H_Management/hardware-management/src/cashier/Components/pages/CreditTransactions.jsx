import React, { useEffect, useState } from 'react';
import styles from './CreditTransactions.module.css';

const CreditTransactions = () => {
  const [creditTransactions, setCreditTransactions] = useState([]);

  // Sample data (replace this with real API call later)
  useEffect(() => {
    const sampleData = [
      {
        invoiceNumber: 'INV-001',
        customerName: 'Nimal Perera',
        date: '2025-08-01',
        totalAmount: 5400,
        isCredit: true
      },
      {
        invoiceNumber: 'INV-002',
        customerName: 'Sunil Silva',
        date: '2025-08-01',
        totalAmount: 3000,
        isCredit: false
      },
      {
        invoiceNumber: 'INV-003',
        customerName: 'Nimal Perera',
        date: '2025-08-02',
        totalAmount: 2000,
        isCredit: true
      }
    ];

    const filtered = sampleData.filter((t) => t.isCredit);
    setCreditTransactions(filtered);
  }, []);

  return (
    <div className={styles.container}>
      <h2>Credit Transactions</h2>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>Invoice No</th>
            <th>Customer</th>
            <th>Date</th>
            <th>Total Amount</th>
            <th>Payment Status</th>
          </tr>
        </thead>
        <tbody>
          {creditTransactions.map((tx) => (
            <tr key={tx.invoiceNumber}>
              <td>{tx.invoiceNumber}</td>
              <td>{tx.customerName}</td>
              <td>{tx.date}</td>
              <td>Rs. {tx.totalAmount.toFixed(2)}</td>
              <td className={styles.credit}>CREDIT</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CreditTransactions;
