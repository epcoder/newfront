import React, { useEffect, useState } from 'react';
import styles from './CustomerList.module.css';

const CustomerList = () => {
  const [customers, setCustomers] = useState([]);

  // Sample customer data (replace with API call later)
  useEffect(() => {
    const sampleData = [
      {
        id: '1',
        name: 'Nimal Perera',
        phone: '0771234567',
        email: 'nimal@example.com',
        type: 'VIP',
        address: 'Colombo',
        isCreditor: true
      },
      {
        id: '2',
        name: 'Sunil Silva',
        phone: '0712345678',
        email: 'sunil@example.com',
        type: 'Regular',
        address: 'Matara',
        isCreditor: false
      }
    ];
    setCustomers(sampleData);
  }, []);

  return (
    <div className={styles.listContainer}>
      <h2>Customer List</h2>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>Name</th>
            <th>Phone</th>
            <th>Email</th>
            <th>Type</th>
            <th>Address</th>
            <th>Creditor?</th>
          </tr>
        </thead>
        <tbody>
          {customers.map((customer) => (
            <tr key={customer.id}>
              <td>{customer.name}</td>
              <td>{customer.phone}</td>
              <td>{customer.email}</td>
              <td>{customer.type}</td>
              <td>{customer.address}</td>
              <td className={customer.isCreditor ? styles.creditor : styles.nonCreditor}>
                {customer.isCreditor ? 'Yes' : 'No'}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CustomerList;
