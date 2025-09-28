// src/components/User.jsx
import React, { useState, useEffect } from "react";
import styles from "./User.module.css";
import { addUser, getAllUsers, getUserById } from "../../../Api/AA/UserApi"; // ✅ import API helpers

const User = () => {
  const [users, setUsers] = useState([]);
  const [formData, setFormData] = useState({
    user_id: "",
    user_name: "",
    password: "",
    email: "",
    role: "manager",
  });
  const [searchTerm, setSearchTerm] = useState("");

  // Fetch users from backend
  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const data = await getAllUsers();
      setUsers(data);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleAddUser = async (e) => {
    e.preventDefault();
    try {
      await addUser(formData);
      alert("User added successfully!");
      fetchUsers();
      setFormData({
        user_id: "",
        user_name: "",
        password: "",
        email: "",
        role: "manager",
      });
    } catch (error) {
      console.error("Error adding user:", error);
      alert("Failed to add user.");
    }
  };

  // ⚠️ Delete API is not yet in UserApi.jsx or your backend
  // we can extend later with `deleteUser()` API helper
  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      try {
        // TODO: implement deleteUser in UserApi.jsx when backend supports it
        alert("Delete API not yet implemented.");
      } catch (error) {
        console.error("Error deleting user:", error);
        alert("Failed to delete user.");
      }
    }
  };

  const filteredUsers = users.filter(
    (u) =>
      u.user_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      u.role.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className={styles.container}>
      <div className={styles.left}>
        <h2>User List</h2>
        <input
          type="text"
          placeholder="Search by name or role"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className={styles.search}
        />
        <table className={styles.table}>
          <thead>
            <tr>
              <th>User ID</th>
              <th>Name</th>
              <th>Role</th>
              <th>Email</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.length > 0 ? (
              filteredUsers.map((user) => (
                <tr key={user.user_id}>
                  <td>{user.user_id}</td>
                  <td>{user.user_name}</td>
                  <td>{user.role}</td>
                  <td>{user.email}</td>
                  <td>
                    <button className={styles.editBtn} disabled>
                      Edit
                    </button>
                    <button
                      className={styles.deleteBtn}
                      onClick={() => handleDelete(user.user_id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" style={{ textAlign: "center" }}>
                  No users found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <div className={styles.right}>
        <h2>Add User</h2>
        <form onSubmit={handleAddUser} className={styles.form}>
          <input
            type="text"
            name="user_id"
            placeholder="User ID"
            value={formData.user_id}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="user_name"
            placeholder="Full Name"
            value={formData.user_name}
            onChange={handleChange}
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <select name="role" value={formData.role} onChange={handleChange}>
            <option value="manager">Manager</option>
            <option value="cashier">Cashier</option>
            <option value="admin">Admin</option>
          </select>
          <button type="submit" className={styles.addBtn}>
            Add User
          </button>
        </form>
      </div>
    </div>
  );
};

export default User;
