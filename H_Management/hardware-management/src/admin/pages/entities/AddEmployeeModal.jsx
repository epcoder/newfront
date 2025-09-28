// src/components/employee/AddEmployeeModal.jsx
import React, { useState, useEffect } from "react";
import styles from "./AddEmployeeModal.module.css";
import { addEmployee, getAllEmployees } from "../../../Api/AA/EmployeeApi";

const AddEmployeeModal = ({ onClose }) => {
  const [formData, setFormData] = useState({
    fullName: "",
    position: "",
    department: "",
    nic: "",
    email: "",
    phone: "",
  });

  const [employees, setEmployees] = useState([]);

  useEffect(() => {
    fetchEmployees();
  }, []);

  const fetchEmployees = async () => {
    try {
      const res = await getAllEmployees();
      setEmployees(res.data);
    } catch (err) {
      console.error("Error fetching employees", err);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addEmployee(formData);
      fetchEmployees(); // refresh table
      setFormData({ fullName: "", position: "", department: "", nic: "", email: "", phone: "" });
    } catch (err) {
      console.error("Error adding employee", err);
    }
  };

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modal}>
        <h3>Add Employee</h3>
        <form onSubmit={handleSubmit} className={styles.emform}>
          <input type="text" name="fullName" placeholder="Full Name" value={formData.fullName} onChange={handleChange} required />
          <input type="text" name="position" placeholder="Position" value={formData.position} onChange={handleChange} required />
          <input type="text" name="department" placeholder="Department" value={formData.department} onChange={handleChange} />
          <input type="text" name="nic" placeholder="NIC" value={formData.nic} onChange={handleChange} required />
          <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} />
          <input type="text" name="phone" placeholder="Phone" value={formData.phone} onChange={handleChange} />
          <button type="submit" className={styles.submitBtn}>Add</button>
          <button type="button" className={styles.closeBtn} onClick={onClose}>Close</button>
        </form>

        <h4>Employee List</h4>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Name</th>
              <th>Position</th>
              <th>NIC</th>
              <th>Email</th>
              <th>Phone</th>
            </tr>
          </thead>
          <tbody>
            {employees.map((emp) => (
              <tr key={emp.id}>
                <td>{emp.fullName}</td>
                <td>{emp.position}</td>
                <td>{emp.nic}</td>
                <td>{emp.email}</td>
                <td>{emp.phone}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AddEmployeeModal;
