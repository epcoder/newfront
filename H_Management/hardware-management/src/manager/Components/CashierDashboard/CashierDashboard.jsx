import React,{ useState } from 'react';
import styles from './CashierDashboard.module.css';
import Header from './Header';
import Sidebar from './Sidebar';

// Import views
import CustomerForm from './views/CustomerForm';
import TransactionDetails from './views/TransactionDetails';
import PaymentForm from './views/PaymentForm';
import StockCategory from './views/StockCategory';
import ManageItem from './views/ManageItem';
import ReorderLevelManager from './views/ReOrder';
import StockSummaryViewer from './views/StockSummary';


import { ThemeContext } from './../../Theme';
import WarrantyPage from '../../../admin/pages/warranty/WarrantyClaim';

const CashierDashboard = () => {
  const [activeView, setActiveView] = useState('category');  // default view

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
      case 'customer':
        return <CustomerForm />;
      case 'update stock':
        return <ManageItem />;
      case 'category':
        return <StockCategory />;
      case 'reorder':
        return <ReorderLevelManager/>;
      case 'summary':
        return <StockSummaryViewer />;
     case 'claim':
        return <WarrantyPage />;
    
    case 'transaction':
        return <PaymentForm />;
      default:
        return <div>Select an option</div>;
    }
  };

  return (
    <ThemeContext>
    <div className={styles.container}>
      <Header />
      <div className={styles.main}>
        <Sidebar activeView={activeView} setActiveView={handleViewChange} />
        <div className={styles.viewArea}> {renderContent()}</div>
       
      </div>
    </div></ThemeContext>
  );
};

export default CashierDashboard;
