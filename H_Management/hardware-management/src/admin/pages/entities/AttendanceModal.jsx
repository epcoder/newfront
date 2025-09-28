// src/components/employee/AttendanceModal.jsx
import React from "react";
import styles from "./AttendanceModal.module.css";

const AttendanceModal = ({ onClose }) => {
  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modal}>
        <h3>Employee Attendance</h3>
        <p>Attendance management will connect with EmployeeAttendanceDTO backend.</p>
        <button onClick={onClose} className={styles.closeBtn}>Close</button>
      </div>
    </div>
  );
};

export default AttendanceModal;
