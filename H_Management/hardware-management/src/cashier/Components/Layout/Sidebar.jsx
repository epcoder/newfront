import React, { useState } from "react";
import {
  List,
  ArrowLeftRight,
  BoxArrowRight,
  Receipt,
  CashStack,
  CreditCard,
  CreditCard2Front,
  Bank,
  CheckCircle,
  Wallet2,
  PersonPlus,
  People,
  ListUl
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
        onClick={() => setActivePage("Payment")}
      >
        <CashStack /> {!collapsed && "Payment"}
      </div>

      <div
        className={styles.sidebarItem}
        onClick={() => setActivePage("Transaction")}
      >
        <ArrowLeftRight /> {!collapsed && "Transaction"}
      </div>

      <div
        className={styles.sidebarItem}
        onClick={() => setActivePage("Add Customer")}
      >
        <PersonPlus /> {!collapsed && "Add Customer"}
      </div>

      <div
        className={styles.sidebarItem}
        onClick={() => setActivePage("Customer List")}
      >
        <ListUl /> {!collapsed && "Customer List"}
      </div>

      <div
        className={styles.sidebarItem}
        onClick={() => setActivePage("Credit")}
      >
        <CreditCard2Front /> {!collapsed && "Credit"}
      </div>

      <div
        className={styles.sidebarItem}
        onClick={() => setActivePage("Credit Settle")}
      >
        <CheckCircle /> {!collapsed && "Credit Settle"}
      </div>

{/* ✅ Logout at the bottom */}
      <div className={styles.logoutBtn} onClick={handleLogout}>
        <BoxArrowRight /> {!collapsed && "Logout"}
      </div>
      
    </div>
  );
};

export default Sidebar;
