import React, { useState } from "react";
import styles from "./../styles/Sidebar.module.css";
import {
  Bell, ArrowRepeat, UpcScan, Megaphone,
  ChevronDown, ChevronRight, BarChart, Download,
  Receipt, Calendar3, GraphUp, BoxArrowRight,Gear
} from "react-bootstrap-icons";

import { useNavigate } from "react-router-dom";

const Sidebar = () => {
  const [isFinanceOpen, setFinanceOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear();
    window.location.href = "/";
  };

  return (
    <aside className={styles.sidebar}>
      

      <ul>
        <li>
          <button onClick={() => navigate("/admin/reorder-Alert")}>
            <Bell /> <b>Reorder Alerts</b>
          </button>
        </li>
        <li>
          <button onClick={() => navigate("/admin/switch-dashboard")}>
            <ArrowRepeat /> <b>Switch Dashboard</b>
          </button>
        </li>
        <li>
          <button onClick={() => navigate("/admin/barcodes")}>
            <UpcScan /> <b>Create Barcode</b>
          </button>
        </li>
        <li>
          <button onClick={() => navigate("/admin/promotions")}>
            <Megaphone /> <b>Promotions</b>
          </button>
        </li>
        <li>
          <button onClick={() => navigate("/admin/promotions")}>
            <Gear /> <b>Settings</b>
          </button>
        </li>

        {/* Financial Reports Expandable */}
        <li
          className={`${styles.parentMenu} ${isFinanceOpen ? styles.activeParent : ""}`}
          onClick={() => setFinanceOpen(!isFinanceOpen)}
        >
          <span>
            <GraphUp /> Financial Reports
          </span>
          {isFinanceOpen ? <ChevronDown /> : <ChevronRight />}
        </li>
      </ul>

      {isFinanceOpen && (
        <ul className={styles.subMenu}>
          <li>
            <button onClick={() => navigate("/admin/profit-loss-statement")}>
              <BarChart /> Profit & Loss Statement
            </button>
          </li>
          
          
          <li>
            <button onClick={() => navigate("/admin/yearly-comparison")}>
              <Calendar3 /> Yearly Comparison
            </button>
          </li>
        </ul>
      )}

      {/* Logout Button at Bottom */}
      <div className={styles.logoutSection}>
        <button className={styles.logoutBtn} onClick={handleLogout}>
          <BoxArrowRight /> Logout
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
