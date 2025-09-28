import React, { useEffect, useState } from 'react';
import styles from './SalesReturnPage.module.css';

const SalesReturnPage = () => {
  const [returns, setReturns] = useState([]);

  useEffect(() => {
    const dummyReturns = [
      {
        returnId: 'SR001',
        invoiceId: 'INV001',
        customer: 'Nimal Perera',
        date: '2025-08-02',
        items: ['Hammer', 'Paint'],
        reason: 'Damaged on delivery',
        total: 1500.00,
      },
      {
        returnId: 'SR002',
        invoiceId: 'INV004',
        customer: 'Kamal Silva',
        date: '2025-08-03',
        items: ['Drill Machine'],
        reason: 'Wrong item delivered',
        total: 7500.00,
      }
    ];
    setReturns(dummyReturns);
  }, []);

  const handleViewDetails = (id) => {
    alert(`Viewing return details for: ${id}`);
  };

  return (
    <div className={styles.container}>
      <h2>↩️ Sales Returns</h2>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>Return ID</th>
            <th>Invoice No</th>
            <th>Customer</th>
            <th>Date</th>
            <th>Items</th>
            <th>Reason</th>
            <th>Total (Rs)</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {returns.map(r => (
            <tr key={r.returnId}>
              <td>{r.returnId}</td>
              <td>{r.invoiceId}</td>
              <td>{r.customer}</td>
              <td>{r.date}</td>
              <td>{r.items.join(', ')}</td>
              <td>{r.reason}</td>
              <td>{r.total.toFixed(2)}</td>
              <td><button onClick={() => handleViewDetails(r.returnId)}>View</button></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default SalesReturnPage;
