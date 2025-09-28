import React, { useState, useEffect } from "react";
import styles from "./Customer.module.css";
import {
  getAllCustomers,
  createCustomer,
  updateCustomer,
  deleteCustomer,
} from "../../../Api/AA/CustomerApi";

const Customer = () => {
  const [customers, setCustomers] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    nic: "",
    phone: "",
    email: "",
    address: "",
    type: "Regular",
  });
  const [searchTerm, setSearchTerm] = useState("");
  const [editingCustomer, setEditingCustomer] = useState(null);

  // Fetch all customers on mount
  useEffect(() => {
    fetchCustomers();
  }, []);

  const fetchCustomers = async () => {
    try {
      const res = await getAllCustomers();
      setCustomers(res.data);
    } catch (err) {
      console.error("Error fetching customers:", err);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingCustomer) {
        await updateCustomer(editingCustomer.id, formData);
      } else {
        await createCustomer(formData);
      }
      fetchCustomers();
      setFormData({ name: "", nic: "", phone: "", email: "", address: "", type: "Regular" });
      setEditingCustomer(null);
    } catch (err) {
      console.error("Error saving customer:", err);
    }
  };

  const handleEdit = (cust) => {
    setEditingCustomer(cust);
    setFormData({
      name: cust.name,
      nic: cust.nic,
      phone: cust.phone,
      email: cust.email,
      address: cust.address,
      type: cust.type,
    });
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this customer?")) {
      try {
        await deleteCustomer(id);
        fetchCustomers();
      } catch (err) {
        console.error("Error deleting customer:", err);
      }
    }
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
                  <button onClick={() => handleEdit(cust)} className={styles.editBtn}>
                    Edit
                  </button>
                  <button onClick={() => handleDelete(cust.id)} className={styles.deleteBtn}>
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className={styles.right}>
        <h2>{editingCustomer ? "Edit Customer" : "Add Customer"}</h2>
        <form onSubmit={handleSubmit} className={styles.cusform}>
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
          <button type="submit" className={styles.addBtn}>
            {editingCustomer ? "Update Customer" : "Add Customer"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Customer;