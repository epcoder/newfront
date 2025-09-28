import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './Login.module.css';
import logo from './logo.png'; // ✅ Use transparent PNG logo

const users = [
  { username: 'admin1', password: '1234', role: 'admin' },
  { username: 'manager1', password: '1234', role: 'manager' },
  { username: 'cashier1', password: '1234', role: 'cashier' }
];

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    const user = users.find(
      (u) => u.username === username && u.password === password
    );

    if (user) {
      if (user.role === 'admin') navigate('/admin');
      else if (user.role === 'manager') navigate('/manager');
      else if (user.role === 'cashier') navigate('/cashier');
    } else {
      setError('Invalid username or password');
    }
  };

  return (
    <div className={styles.loginContainer}>
      <form onSubmit={handleLogin} className={styles.loginForm}>
        {/* ✅ Add your logo here */}
        <img src={logo} alt="Vithmal Hardware Logo" className={styles.logo} />

        {error && <p>{error}</p>}

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
        <a href="#" className={styles.forgotPassword}>Forgot Password?</a>
      </form>
    </div>
  );
};

export default Login;
