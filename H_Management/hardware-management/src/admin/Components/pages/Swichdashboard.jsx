import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Switchdashboard.module.css';

const Switchdashboard = () => {
  return (
    <div className={styles.container}>
      <h2>Select Dashboard</h2>
      <div className={styles.buttons}>
        <Link to="/cashier" className={styles.button}>
          Go to Cashier Dashboard
        </Link>
        <Link to="/manager" className={styles.button}>
          Go to Manager Dashboard
        </Link>
      </div>
    </div>
  );
};

export default  Switchdashboard;
