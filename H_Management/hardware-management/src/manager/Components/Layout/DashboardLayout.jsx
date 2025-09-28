import React from "react";
import Sidebar from "./Sidebar";
import Header from "./Header";
import styles from "./DashboardLayout.module.css";
import  { useState } from "react";

import StockC from "../pages/StockCategory";
import Item from "../pages/ManageItem";
import Reorder from "../pages/ReOrder";
import StockS from "../pages/StockSummary";
import Transaction from "../pages/TransactionDetails";
import Order from "../pages/Order"; // Import Order page
import WarrantyPage from '../../../admin/pages/warranty/WarrantyClaim';
// Import other necessary components or pages as needed



const DashboardLayout = ({ children }) => {
    
  const [activePage, setActivePage] = useState("Dashboard");

  // Render relevant component based on state
  const renderContent = () => {
    switch (activePage) {
      case "StockC":
        return <StockC />;
      case "Order":
        return <Order />;
      case "Item":
        return <Item />;
      case "Reorder":
        return <Reorder />;
      case "StockS":
        return <StockS />;
      case "Transaction":
        return <Transaction />;
      case "Warranty":
        return <WarrantyPage />;
      
      default:
        return <Item/>;
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
