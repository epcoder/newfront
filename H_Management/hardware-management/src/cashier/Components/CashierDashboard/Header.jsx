import React from 'react';
import styles from './Header.module.css';

const Header = () => (
  <header className={styles.header}>
      <h1>Cashier Dashboard</h1>
      <div className={styles.right}>
        <span>Welcome, Cashier1</span>
      </div>
    </header>
);

export default Header;
