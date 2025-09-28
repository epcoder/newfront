import React, { useState } from 'react';
import styles from './Supliers.module.css';

const Supplier = () => {
  const [suppliers, setSuppliers] = useState([
    {
      id: 1,
      name: 'Super Cement Co.',
      contactPerson: 'Ruwan Jayasena',
      phone: '0712345678',
      email: 'supercement@gmail.com',
      address: 'Colombo',
      category: 'Cement',
      joinedDate: '2024-01-15',
    },
    {
      id: 2,
      name: 'Multilac Paints',
      contactPerson: 'Sanduni Weerasinghe',
      phone: '0779876543',
      email: 'multilac@gmail.com',
      address: 'Matara',
      category: 'Paint',
      joinedDate: '2024-06-10',
    },
  ]);

  const [formData, setFormData] = useState({
    name: '',
    contactPerson: '',
    phone: '',
    email: '',
    address: '',
    category: 'Cement',
    joinedDate: '',
  });

  const [searchTerm, setSearchTerm] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleAddSupplier = (e) => {
    e.preventDefault();
    const newSupplier = {
      id: suppliers.length + 1,
      ...formData,
    };
    setSuppliers([...suppliers, newSupplier]);
    setFormData({
      name: '',
      contactPerson: '',
      phone: '',
      email: '',
      address: '',
      category: 'Cement',
      joinedDate: '',
    });
  };

  const filteredSuppliers = suppliers.filter(
    (s) =>
      s.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      s.phone.includes(searchTerm) ||
      s.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className={styles.container}>
      <div className={styles.left}>
        <h2>Supplier List</h2>
        <input
          type="text"
          placeholder="Search by name, phone, or category"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className={styles.search}
        />
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Name</th>
              <th>Contact</th>
              <th>Phone</th>
              <th>Category</th>
              <th>Joined</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredSuppliers.map((s) => (
              <tr key={s.id}>
                <td>{s.name}</td>
                <td>{s.contactPerson}</td>
                <td>{s.phone}</td>
                <td>{s.category}</td>
                <td>{s.joinedDate}</td>
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
        <h2>Add Supplier</h2>
        <form onSubmit={handleAddSupplier} className={styles.form}>
          <input
            type="text"
            name="name"
            placeholder="Company Name"
            value={formData.name}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="contactPerson"
            placeholder="Contact Person"
            value={formData.contactPerson}
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
          <select name="category" value={formData.category} onChange={handleChange}>
            <option value="Cement">Cement</option>
            <option value="Paint">Paint</option>
            <option value="Tools">Tools</option>
            <option value="Tiles">Tiles</option>
            <option value="Electrical">Electrical</option>
          </select>
          <input
            type="date"
            name="joinedDate"
            value={formData.joinedDate}
            onChange={handleChange}
            required
          />
          <button type="submit" className={styles.addBtn}>
            Add Supplier
          </button>
        </form>
      </div>
    </div>
  );
};

export default Supplier;
