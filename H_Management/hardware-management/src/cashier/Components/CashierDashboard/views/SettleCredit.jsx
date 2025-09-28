import React, { useState } from 'react';
import styles from './SettleCredit.module.css';

const SettleCredit = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [settleAmount, setSettleAmount] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  // Sample credit customers (replace with API call)
  const customers = [
    { name: 'Nimal Perera', nic: '902112345V', credit: 5400 },
    { name: 'Sunil Silva', nic: '911234567V', credit: 0 },
    { name: 'Kamala Wijesinghe', nic: '882344561V', credit: 2500 },
  ];

  const handleSearch = (e) => {
    const term = e.target.value;
    setSearchTerm(term);
    const customer = customers.find((c) =>
      c.name.toLowerCase().includes(term.toLowerCase())
    );
    setSelectedCustomer(customer || null);
    setSuccessMessage('');
  };

  const handleSettle = () => {
    if (!selectedCustomer || settleAmount <= 0 || settleAmount > selectedCustomer.credit) {
      alert('Invalid payment amount.');
      return;
    }

    // Here you'd send data to backend
    setSuccessMessage(
      `Payment of Rs. ${settleAmount} recorded for ${selectedCustomer.name}.`
    );

    // Reset
    setSettleAmount('');
  };

  return (
    <div className={styles.container}>
      <h2>Settle Credit</h2>

      {/* Search Bar */}
      <div className={styles.section}>
        <label>Search Customer</label>
        <input
          type="text"
          placeholder="Enter name or NIC"
          value={searchTerm}
          onChange={handleSearch}
        />
      </div>

      {/* Customer Details */}
      {selectedCustomer && (
        <div className={styles.customerInfo}>
          <p><strong>Name:</strong> {selectedCustomer.name}</p>
          <p><strong>NIC:</strong> {selectedCustomer.nic}</p>
          <p><strong>Outstanding Credit:</strong> Rs. {selectedCustomer.credit.toFixed(2)}</p>

          <label>Enter Settlement Amount</label>
          <input
            type="number"
            value={settleAmount}
            onChange={(e) => setSettleAmount(e.target.value)}
            placeholder="Amount to pay"
          />
          <button onClick={handleSettle}>Settle Payment</button>
        </div>
      )}

      {/* Success Message */}
      {successMessage && <p className={styles.success}>{successMessage}</p>}
    </div>
  );
};

export default SettleCredit;
