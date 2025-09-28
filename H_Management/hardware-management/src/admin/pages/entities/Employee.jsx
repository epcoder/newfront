import React, { useState, useEffect } from "react";
import styles from "./Employee.module.css";
import { getAllEmployees, addEmployee } from "../../../Api/AA/EmployeeApi";

const Employee = () => {
  const [employees, setEmployees] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    position: "Worker",
    department: "",
    nic: "",
    email: "",
    phone: "",
  });

  useEffect(() => {
    fetchEmployees();
  }, []);

  const fetchEmployees = async () => {
    try {
      const data = await getAllEmployees();
      setEmployees(data);
    } catch (err) {
      console.error("Failed to fetch employees:", err);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleAddEmployee = async (e) => {
    e.preventDefault();
    try {
      await addEmployee(formData);
      alert("Employee added!");
      setFormData({
        fullName: "",
        position: "Worker",
        department: "",
        nic: "",
        email: "",
        phone: "",
      });
      setIsModalOpen(false);
      fetchEmployees();
    } catch (err) {
      console.error("Failed to add employee:", err);
      alert("Failed to add employee.");
    }
  };

  const filteredEmployees = employees.filter(
    (e) =>
      (e.fullName?.toLowerCase() || "").includes(searchTerm.toLowerCase()) ||
      (e.position?.toLowerCase() || "").includes(searchTerm.toLowerCase()) ||
      (e.department?.toLowerCase() || "").includes(searchTerm.toLowerCase()) ||
      (e.nic?.toLowerCase() || "").includes(searchTerm.toLowerCase())
  );

  return (
    <div className={styles.container}>
      <h2>Employee List</h2>
      <div className={styles.topBar}>
        <input
          type="text"
          placeholder="Search by name, position, department, or NIC"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className={styles.search}
        />
        <br></br>
        <button
          className={styles.addBtn}
          onClick={() => setIsModalOpen(true)}
        >
          Add Employee
        </button>
        <br></br>
      </div>

      <div className={styles.tableContainer}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Full Name</th>
              <th>Position</th>
              <th>Department</th>
              <th>NIC</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredEmployees.map((emp) => (
              <tr key={emp.id}>
                <td>{emp.fullName}</td>
                <td>{emp.position}</td>
                <td>{emp.department}</td>
                <td>{emp.nic}</td>
                <td>{emp.email}</td>
                <td>{emp.phone}</td>
                <td>
                  <button className={styles.editBtn} disabled>Edit</button>
                  <button className={styles.deleteBtn} disabled>Delete</button>
                </td>
              </tr>
            ))}
            {filteredEmployees.length === 0 && (
              <tr>
                <td colSpan="7" style={{ textAlign: "center" }}>
                  No results
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className={styles.modalOverlay}>
          <div className={styles.modal}>
            <h2>Add Employee</h2>
            <form onSubmit={handleAddEmployee} className={styles.emform}>
              <input
                type="text"
                name="fullName"
                placeholder="Full Name"
                value={formData.fullName}
                onChange={handleChange}
                required
              />
              <select name="position" value={formData.position} onChange={handleChange}>
                <option value="Worker">Worker</option>
                <option value="Temporary">Temporary</option>
                <option value="Manager">Manager</option>
              </select>
              <input
                type="text"
                name="department"
                placeholder="Department (Optional)"
                value={formData.department}
                onChange={handleChange}
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
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
              />
              <input
                type="text"
                name="phone"
                placeholder="Phone"
                value={formData.phone}
                onChange={handleChange}
                required
              />
              <div className={styles.modalButtons}>
                <button type="submit" className={styles.addBtn}>Add</button>
                <button
                  type="button"
                  className={styles.cancelBtn}
                  onClick={() => setIsModalOpen(false)}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Employee;
