import React,{ useState } from 'react';
import styles from './CashierDashboard.module.css';
import Header from './Header';
import Sidebar from './Sidebar';

// Import views
import CustomerForm from './views/CustomerForm';
import TransactionDetails from './views/TransactionDetails';
import PaymentForm from './views/PaymentForm';


import { ThemeContext } from './../../Theme';
import CustomerList from './views/CustomerList';
import CreditTransactions from './views/CreditTransactions';
import SettleCredit from './views/SettleCredit';

const CashierDashboard = () => {
  const [activeView, setActiveView] = useState('payment');  // default view

  // Handle button clicks
  const handleViewChange = (view) => {
    if (activeView === view) {
      setActiveView('');
      setTimeout(() => setActiveView(view), 0);
    } else {
      setActiveView(view);
    }
  };


    // Function to change view
  const renderContent = () => {
    switch (activeView) {
      case 'addcustomer':
        return <CustomerForm />;
      case 'transaction':
        return <TransactionDetails />;
      case 'payment':
        return <PaymentForm />;
      case 'viewcustomer':
        return <CustomerList />;
      case 'credit':
        return <CreditTransactions />;
      case 'creditsettle':
        return <SettleCredit />;
      default:
        return <div>Select an option</div>;
    }
  };

  return (
    <ThemeContext>
      <Header />
    <div className={styles.container}>
      
      <div className={styles.main}>
        <Sidebar activeView={activeView} setActiveView={handleViewChange} />
        <div className={styles.viewArea}> {renderContent()}</div>
       
      </div>
    </div></ThemeContext>
  );
};

export default CashierDashboard;
