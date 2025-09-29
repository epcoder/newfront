import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import styles from "./Login.module.css";
import logo from "./logo.png";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    try {
      // ✅ Get all users from backend
      const response = await axios.get("https://hms-back-5gbr.onrender.com/api/v1/user/all");
      const users = response.data;

      // ✅ Check if entered user exists
      const user = users.find(
        (u) => u.user_name === username && u.password === password
      );

      if (user) {
        // ✅ Save minimal info in localStorage (for role-based navigation)
        localStorage.setItem("username", user.user_name);
        localStorage.setItem("role", user.role);

        // ✅ Navigate based on role
        if (user.role === "admin") navigate("/admin");
        else if (user.role === "manager") navigate("/manager");
        else if (user.role === "cashier") navigate("/cashier");
      } else {
        setError("Invalid username or password");
      }
    } catch (err) {
      console.error("Login failed", err);
      setError("Server error. Please try again.");
    }
  };

  return (
    <div className={styles.loginContainer}>
      <form onSubmit={handleLogin} className={styles.loginForm}>
        <img src={logo} alt="Vithmal Hardware Logo" className={styles.logo} />

        {error && <p className={styles.error}>{error}</p>}

        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
          autoComplete="username"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          autoComplete="current-password"
        />
        <button type="submit">LOG IN</button>
        <a href="#" className={styles.forgotPassword}>
          Forgot Password?
        </a>
      </form>
    </div>
  );
};

export default Login;