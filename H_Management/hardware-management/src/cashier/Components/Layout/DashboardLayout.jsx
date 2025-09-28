import React from "react";
import Sidebar from "./Sidebar";
import Header from "./Header";
import styles from "./DashboardLayout.module.css";
import  { useState } from "react";

import Credit from "../pages/CreditTransactions";
import Customer from "../pages/CustomerForm";
import CL from "../pages/CustomerList";
import Item from "../pages/ManageItem";
import Payment from "../pages/Billing";
import SC from "../pages/SettleCredit";
import Transaction from "../pages/TransactionDetails";



const DashboardLayout = ({ children }) => {
    
  const [activePage, setActivePage] = useState("Dashboard");

  // Render relevant component based on state
  const renderContent = () => {
    switch (activePage) {
      case "Payment":
        return <Payment />;
      case "Credit":
        return <Credit />;
      case "Transaction":
        return <Transaction />;
      case "Add Customer":
        return <Customer />;
      case "Customer List":
        return <CL />;
      case "Credit Settle":
        return <SC />;
      default:
        return <Payment />;
    }
  };
  return (
    <div className={styles.layout}>
      <Sidebar setActivePage={setActivePage} />
      <div className={styles.mainContent}>
        <Header />
        <div className={styles.content}>{renderContent()}</div>
      </div>
    </div>
  );
};

export default DashboardLayout;
