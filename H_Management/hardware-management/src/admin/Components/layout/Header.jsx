import React from "react";
import styles from "./../styles/Header.module.css";
import { motion } from "framer-motion";
import logo from "./logo.png"; // adjust path

const Header = () => (
  <header className={styles.header}>
    <div className={styles.left}>
      <img src={logo} alt="Logo" className={styles.logo} />
      <h1 className={styles.title}>Hardware Management System</h1>
    </div>

    <div className={styles.right}>
      <motion.span
        style={{ display: "inline-block", whiteSpace: "nowrap" }}
        animate={{ x: ["100%", "-100%"] }}
        transition={{ repeat: Infinity, duration: 8, ease: "linear" }}
      >
        Welcome, Admin1
      </motion.span>
    </div>
  </header>
);

export default Header;
