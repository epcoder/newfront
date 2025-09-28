import React, { useState } from 'react';
import styles from './Customer.module.css';

const Customer = () => {
  const [customers, setCustomers] = useState([
    {
      id: 1,
      name: 'Nimal Perera',
      nic : '20000000000',
      phone: '0771234567',
      email: 'nimal@gmail.com',
      address: 'Colombo',
      type: 'Regular',
    },
    {
      id: 2,
      name: 'Kamal Silva',
      nic:'200000000001',
      phone: '0719876543',
      email: 'kamal@gmail.com',
      address: 'Matara',
      type: 'VIP',
    },
  ]);

  const [formData, setFormData] = useState({
    name: '',
    nic:'',
    phone: '',
    email: '',
    address: '',
    type: 'Regular',
  });

  const [searchTerm, setSearchTerm] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleAddCustomer = (e) => {
    e.preventDefault();
    const newCustomer = {
      id: customers.length + 1,
      ...formData,
    };
    setCustomers([...customers, newCustomer]);
    setFormData({ name: '',nic: '', phone: '', email: '', address: '', type: 'Regular' });
  };

  const filteredCustomers = customers.filter(
    (c) =>
      c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.phone.includes(searchTerm)
  );

  return (
    <div className={styles.container}>
      <div className={styles.left}>
        <h2>Customer List</h2>
        <input
          type="text"
          placeholder="Search by name or phone"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className={styles.search}
        />
        <table className={styles.table}>
          <thead>
            <tr>
              
              <th>Name</th>
              <th>NIC</th>
              <th>Phone</th>
              <th>Email</th>
              <th>Type</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredCustomers.map((cust) => (
              <tr key={cust.id}>
                <td>{cust.name}</td>
                <td>{cust.nic}</td>
                <td>{cust.phone}</td>
                <td>{cust.email}</td>
                <td>{cust.type}</td>
                <td>
                  <button className={styles.editBtn}>Edit</button>
                  <button className={styles.deleteBtn}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className={styles.right}>
        <h2>Add Customer</h2>
        <form onSubmit={handleAddCustomer} className={styles.cusform}>
          <input
            type="text"
            name="name"
            placeholder="Name"
            value={formData.name}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="nic"
            placeholder="NIC"
            value={formData.nic}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="phone"
            placeholder="Phone"
            value={formData.phone}
            onChange={handleChange}
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
          />
          <input
            type="text"
            name="address"
            placeholder="Address"
            value={formData.address}
            onChange={handleChange}
          />
          <select name="type" value={formData.type} onChange={handleChange}>
            <option value="Regular">Regular</option>
            <option value="VIP">VIP</option>
            <option value="Wholesale">Wholesale</option>
          </select>
          <button type="submit" className={styles.addBtn}>Add Customer</button>
        </form>
      </div>
    </div>
  );
};

export default Customer;
