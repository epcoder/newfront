import React ,{ useContext } from 'react';
import styles from './Sidebar.module.css';




const Sidebar = ( { activeView, setActiveView } ) =>{
// const { theme, toggleTheme } = useContext(ThemeContext); // IGNORE
// const isDarkMode = theme === 'dark'; // IGNORE

  return (
  <div className={styles.sidebar}>
    <div className={styles.section}>
      <h3>🛒 Transaction Management</h3>
         <button
        onClick={() => setActiveView('payment')}
        className={`${styles.button} ${activeView === 'payment' ? styles.active : ''}`}
      >
        💳 Payment
      </button>

      <button
        onClick={() => setActiveView('transaction')}
        className={`${styles.button} ${activeView === 'transaction' ? styles.active : ''}`}
      >
        🧾 Transaction
      </button>

      
    </div>
    <div className={styles.section}>
      <h3>👤 Customer Management </h3>
     <button
        onClick={() => setActiveView('addcustomer')}
        className={`${styles.button} ${activeView === 'addcustomer' ? styles.active : ''}`}
      >
        👤Add Customer
      </button>
      <button
        onClick={() => setActiveView('viewcustomer')}
        className={`${styles.button} ${activeView === 'viewcustomer' ? styles.active : ''}`}
      >
        👥 Customer List
      </button>
      <button
        onClick={() => setActiveView('credit')}
        className={`${styles.button} ${activeView === 'credit' ? styles.active : ''}`}
      >
        💳 Credit details
      </button>
      <button
        onClick={() => setActiveView('creditsettle')}
        className={`${styles.button} ${activeView === 'creditsettle' ? styles.active : ''}`}
      >
        ✔️ Credit Settle
      </button>
    </div>
  </div>
);
}
export default Sidebar;
