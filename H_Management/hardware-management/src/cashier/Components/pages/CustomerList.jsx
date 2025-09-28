// src/components/customer/CustomerList.jsx
import React, { useEffect, useState } from "react";
import styles from "./CustomerList.module.css";
import {
  getAllCustomers,
  deleteCustomer,
  updateCustomer,
} from "../../../Api/CA/CustomerApi";

const CustomerList = () => {
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingCustomer, setEditingCustomer] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  // Fetch customers
  const fetchCustomers = async () => {
    try {
      const data = await getAllCustomers();
      const updatedData = data.map((c) => ({
        ...c,
        isCreditor: false, // placeholder (real data can come from credit API later)
      }));
      setCustomers(updatedData);
    } catch (error) {
      console.error("Failed to fetch customers:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCustomers();
  }, []);

  // ✅ Delete customer
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this customer?")) return;
    try {
      await deleteCustomer(id);
      setCustomers(customers.filter((c) => c.id !== id));
    } catch (error) {
      console.error("Error deleting customer:", error);
    }
  };

  // ✅ Start editing
  const handleEdit = (customer) => {
    setEditingCustomer(customer);
  };

  // ✅ Save updated customer
  const handleUpdate = async () => {
    try {
      await updateCustomer(editingCustomer.id, editingCustomer);
      setEditingCustomer(null);
      fetchCustomers(); // refresh list
    } catch (error) {
      console.error("Error updating customer:", error);
    }
  };

  // ✅ Filter customers by search term (name or NIC)
  const filteredCustomers = customers.filter(
    (c) =>
      c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (c.nic && c.nic.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <div className={styles.listContainer}>
      <h2>Customer List</h2>

      {/* 🔍 Search bar */}
      <input
        type="text"
        placeholder="Search by Name or NIC..."
        className={styles.searchBar}
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      {loading ? (
        <p>Loading customers...</p>
      ) : (
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Name</th>
              <th>Phone</th>
              <th>Email</th>
              <th>Type</th>
              <th>Address</th>
              <th>Creditor?</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredCustomers.map((customer) => (
              <tr key={customer.id}>
                <td>
                  {editingCustomer?.id === customer.id ? (
                    <input
                      value={editingCustomer.name}
                      onChange={(e) =>
                        setEditingCustomer({
                          ...editingCustomer,
                          name: e.target.value,
                        })
                      }
                    />
                  ) : (
                    customer.name
                  )}
                </td>
                <td>
                  {editingCustomer?.id === customer.id ? (
                    <input
                      value={editingCustomer.phone}
                      onChange={(e) =>
                        setEditingCustomer({
                          ...editingCustomer,
                          phone: e.target.value,
                        })
                      }
                    />
                  ) : (
                    customer.phone
                  )}
                </td>
                <td>
                  {editingCustomer?.id === customer.id ? (
                    <input
                      value={editingCustomer.email}
                      onChange={(e) =>
                        setEditingCustomer({
                          ...editingCustomer,
                          email: e.target.value,
                        })
                      }
                    />
                  ) : (
                    customer.email
                  )}
                </td>
                <td>
                  {editingCustomer?.id === customer.id ? (
                    <select
                      value={editingCustomer.type}
                      onChange={(e) =>
                        setEditingCustomer({
                          ...editingCustomer,
                          type: e.target.value,
                        })
                      }
                    >
                      <option value="Regular">Regular</option>
                      <option value="VIP">VIP</option>
                      <option value="Wholesale">Wholesale</option>
                    </select>
                  ) : (
                    customer.type
                  )}
                </td>
                <td>
                  {editingCustomer?.id === customer.id ? (
                    <input
                      value={editingCustomer.address}
                      onChange={(e) =>
                        setEditingCustomer({
                          ...editingCustomer,
                          address: e.target.value,
                        })
                      }
                    />
                  ) : (
                    customer.address
                  )}
                </td>
                <td
                  className={
                    customer.isCreditor ? styles.creditor : styles.nonCreditor
                  }
                >
                  {customer.isCreditor ? "Yes" : "No"}
                </td>
                <td>
                  {editingCustomer?.id === customer.id ? (
                    <>
                      <button
                        className={styles.actionButton}
                        onClick={handleUpdate}
                      >
                        ✅ Save
                      </button>
                      <button
                        className={styles.actionButton}
                        onClick={() => setEditingCustomer(null)}
                      >
                        ❌ Cancel
                      </button>
                    </>
                  ) : (
                    <>
                      <button
                        className={styles.actionButton}
                        onClick={() => handleEdit(customer)}
                      >
                        ✏️ Edit
                      </button>
                      <button
                        className={styles.actionButton}
                        onClick={() => handleDelete(customer.id)}
                      >
                        🗑️ Delete
                      </button>
                    </>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default CustomerList;
