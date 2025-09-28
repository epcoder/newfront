import React  from 'react';
import styles from './Sidebar.module.css';
import { useNavigate } from 'react-router-dom';




const Sidebar = ( { activeView, setActiveView } ) =>{
// const { theme, toggleTheme } = useContext(ThemeContext); // IGNORE
// const isDarkMode = theme === 'dark'; // IGNORE
const navigate = useNavigate();
  return (
  <div className={styles.sidebar}>
    <div className={styles.section}>
      <h3>🛒 Stock Management</h3>
         <button
        onClick={() => setActiveView('category')}
        className={`${styles.button} ${activeView === 'category' ? styles.active : ''}`}
      >
        🗂️ Stock Category
      </button>


      <button
        onClick={() => setActiveView('update stock')}
        className={`${styles.button} ${activeView === 'update stock' ? styles.active : ''}`}
      >
       🔄 Manage Items
      </button>

      <button
        onClick={() => setActiveView('reorder')}
        className={`${styles.button} ${activeView === 'reorder' ? styles.active : ''}`}
      >
       🔔 Reorder Alerts
      </button>

      <button
        onClick={() => setActiveView('summary')}
        className={`${styles.button} ${activeView === 'summary' ? styles.active : ''}`}
      >
        📊 View Stock Summary
      </button>
    </div>
    <div className={styles.section}>
      <h3> 🧾 Transaction Management</h3>
      <button
        onClick={() => setActiveView('claim')}
        className={`${styles.button} ${activeView === 'claim' ? styles.active : ''}`}
      >
       📜 Warranty Claim
      </button>
      <button
        onClick={() => setActiveView('transaction')}
        className={`${styles.button} ${activeView === 'transaction' ? styles.active : ''}`}
       >
       ✏️ Update Transactions
      </button>

      <button
  onClick={() => navigate('/cashier')}  // Change path to your route
  className={styles.button}
>
  👥Go to Cashier
</button>


    </div>
  </div>
);
}
export default Sidebar;
