import React from "react";
import { useTheme } from "../context/ThemeContext";
import { Sun, Moon } from "react-bootstrap-icons";
import styles from "./Header.module.css";
import { motion } from "framer-motion";
import logoImg from "./logo.png"; // 🖼️ adjust path to your logo

const Header = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <motion.header
      className={styles.header}
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <motion.div
        className={styles.logo}
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.5 }}
      >
        <img src={logoImg} alt="Logo" className={styles.logoImg} />
        <span className={styles.logoText}>Manager Dashboard</span>
      </motion.div>

      <div className={styles.headerActions}>
        <span className={styles.username}>Username-00</span>
        <motion.button
          whileHover={{ rotate: 180, scale: 1.2 }}
          transition={{ duration: 0.3 }}
          onClick={toggleTheme}
          className={styles.themeToggle}
        >
          {theme === "light" ? <Moon /> : <Sun />}
        </motion.button>
      </div>
    </motion.header>
  );
};

export default Header;
