import React, { useState } from "react";
import {
  List,
  CartCheck,
  Boxes,        // for Stock Category
  BoxSeam,      // for Manage Item
  Bell,         // for Reorder Alert
  ClipboardData,// for Stock Summary
  ShieldCheck,  // for Warranty Claim
  Receipt,      // for Transaction
  CashStack,     // for Go to Cashier
  BoxArrowRight
} from "react-bootstrap-icons";

import styles from "./Sidebar.module.css";
import { useNavigate } from "react-router-dom";  // ✅ useNavigate for redirect
const Sidebar = ({ setActivePage }) => {
  const [collapsed, setCollapsed] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
  // You can also clear auth tokens here if needed
  navigate("/"); // ✅ redirect to login page
  };

  return (
    <div className={`${styles.sidebar} ${collapsed ? styles.collapsed : ""}`}>
      <button
        className={styles.collapseBtn}
        onClick={() => setCollapsed(!collapsed)}
      >
        <List />
      </button>

      <div
        className={styles.sidebarItem}
        onClick={() => setActivePage("Order")}
      >
        <CartCheck /> {!collapsed && "Order"}
      </div>

      <div
        className={styles.sidebarItem}
        onClick={() => setActivePage("StockC")}
      >
        <Boxes /> {!collapsed && "Stock Category"}
      </div>

      <div
        className={styles.sidebarItem}
        onClick={() => setActivePage("Item")}
      >
        <BoxSeam /> {!collapsed && "Manage Item"}
      </div>

      <div
        className={styles.sidebarItem}
        onClick={() => setActivePage("Reorder")}
      >
        <Bell /> {!collapsed && "Reorder Alert"}
      </div>

      <div
        className={styles.sidebarItem}
        onClick={() => setActivePage("StockS")}
      >
        <ClipboardData /> {!collapsed && "Stock Summary"}
      </div>

      <div
        className={styles.sidebarItem}
        onClick={() => setActivePage("Warranty")}
      >
        <ShieldCheck /> {!collapsed && "Warranty Claim"}
      </div>

      <div
        className={styles.sidebarItem}
        onClick={() => setActivePage("Transaction")}
      >
        <Receipt /> {!collapsed && "Transaction"}
      </div>
<br></br>
     <button
  onClick={() => navigate("/cashier")}
  className={styles.buttongoing}
>
  <CashStack /> {!collapsed && "Go to Cashier"}
</button>


{/* ✅ Logout at the bottom */}
      <div className={styles.logoutBtn} onClick={handleLogout}>
        <BoxArrowRight /> {!collapsed && "Logout"}
      </div>
      
    </div>
  );
};

export default Sidebar;
