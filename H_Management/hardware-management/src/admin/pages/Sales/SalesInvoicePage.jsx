import React, { useState, useEffect } from 'react';
import styles from './SalesInvoicePage.module.css';

const SalesInvoicePage = () => {
  const [invoices, setInvoices] = useState([]);

  // Dummy data since backend isn't ready
  useEffect(() => {
    const dummyInvoices = [
      {
        id: 'INV001',
        customer: 'Nimal Perera',
        date: '2025-08-02',
        total: 12500.00,
        status: 'Paid',
      },
      {
        id: 'INV002',
        customer: 'Saman Kumara',
        date: '2025-08-03',
        total: 7800.00,
        status: 'Credit',
      },
    ];
    setInvoices(dummyInvoices);
  }, []);

  const viewInvoice = (id) => {
    alert(`View full details for invoice: ${id}`);
  };

  return (
    <div className={styles.container}>
      <h2>🧾 Sales Invoices</h2>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>Invoice No</th>
            <th>Customer</th>
            <th>Date</th>
            <th>Total (Rs)</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {invoices.map(inv => (
            <tr key={inv.id}>
              <td>{inv.id}</td>
              <td>{inv.customer}</td>
              <td>{inv.date}</td>
              <td>{inv.total.toFixed(2)}</td>
              <td>{inv.status}</td>
              <td>
                <button onClick={() => viewInvoice(inv.id)}>View Details</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default SalesInvoicePage;
