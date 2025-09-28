// src/components/employee/EmployeePage.jsx
import React, { useState, useEffect } from "react";
import styles from "./EmployeePage.module.css";
import { getAllEmployees } from "../../../Api/AA/EmployeeApi";
import AddEmployeeModal from "./AddEmployeeModal";
import AttendanceModal from "./AttendanceModal";

const EmployeePage = () => {
  const [employeeCount, setEmployeeCount] = useState(0);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showAttendanceModal, setShowAttendanceModal] = useState(false);

  useEffect(() => {
    fetchEmployees();
  }, []);

  const fetchEmployees = async () => {
    try {
      const res = await getAllEmployees();
      setEmployeeCount(res.data.length);
    } catch (err) {
      console.error("Error fetching employees", err);
    }
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.heading}>Employee Management</h2>

      <div className={styles.cardContainer}>
        {/* Add Employee Card */}
        <div className={styles.card} onClick={() => setShowAddModal(true)}>
          <h3>Add Employees</h3>
          <p>Total Employees: {employeeCount}</p>
        </div>

        {/* Attendance Card */}
        <div className={styles.card} onClick={() => setShowAttendanceModal(true)}>
          <h3>Manage Attendance</h3>
          <p>Click to open attendance system</p>
        </div>
      </div>

      {/* Modals */}
      {showAddModal && <AddEmployeeModal onClose={() => { setShowAddModal(false); fetchEmployees(); }} />}
      {showAttendanceModal && <AttendanceModal onClose={() => setShowAttendanceModal(false)} />}
    </div>
  );
};

export default EmployeePage;
