import React, { useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  CartesianGrid,
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
} from "recharts";

const ProfitLossDashboard = () => {
  const [transactions, setTransactions] = useState([]);
  const [totalRevenue, setTotalRevenue] = useState(0);
  const [totalCost, setTotalCost] = useState(0);
  const [totalProfit, setTotalProfit] = useState(0);
  const [monthlyData, setMonthlyData] = useState([]);

  // Fetch transactions from backend
  useEffect(() => {
    fetch("http://localhost:8080/api/v1/cashiertransaction/all")
      .then((res) => res.json())
      .then((data) => {
        setTransactions(data);

        let revenueSum = 0;
        let costSum = 0;
        let profitSum = 0;

        // Initialize all 12 months with 0
        const months = [
          "Jan", "Feb", "Mar", "Apr", "May", "Jun",
          "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
        ];
        const monthlyMap = {};
        months.forEach((m) => {
          monthlyMap[m] = { month: m, profit: 0 };
        });

        data.forEach((txn) => {
          const revenue = txn.totalPrice || 0;
          const cost = txn.totalCostPrice || 0;
          const profit = txn.totalProfit || 0;

          revenueSum += revenue;
          costSum += cost;
          profitSum += profit;

          const date = new Date(txn.transactionDate);
          const monthKey = date.toLocaleString("default", { month: "short" });

          if (monthlyMap[monthKey]) {
            monthlyMap[monthKey].profit += profit;
          }
        });

        setTotalRevenue(revenueSum);
        setTotalCost(costSum);
        setTotalProfit(profitSum);

        // convert monthly map to array (always 12 months)
        setMonthlyData(Object.values(monthlyMap));
      })
      .catch((err) => console.error("Error fetching transactions:", err));
  }, []);

  // Inline styles
  const styles = {
    container: {
      padding: "20px",
      fontFamily: "Arial, sans-serif",
    },
    heading: {
      textAlign: "center",
      marginBottom: "20px",
      fontSize: "24px",
    },
    cardGrid: {
      display: "grid",
      gridTemplateColumns: "repeat(4, 1fr)",
      gap: "15px",
    },
    card: {
      padding: "20px",
      borderRadius: "12px",
      color: "white",
      textAlign: "center",
      fontWeight: "bold",
      boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
    },
    primary: { backgroundColor: "#007bff" }, // Revenue
    danger: { backgroundColor: "#dc3545" }, // Cost
    success: { backgroundColor: "#28a745" }, // Profit
    warning: { backgroundColor: "#ffc107", color: "#333" }, // Transactions count
    chartContainer: {
      marginTop: "40px",
      width: "100%",
      height: "400px",
    },
    rowCharts: {
      display: "grid",
      gridTemplateColumns: "1fr 1fr",
      gap: "30px",
      marginTop: "40px",
      height: "400px",
    },
  };

  const totalChartData = [
    { name: "Revenue", value: totalRevenue },
    { name: "Cost", value: totalCost },
    { name: "Profit", value: totalProfit },
  ];

  const COLORS = ["#007bff", "#dc3545", "#28a745"];

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>Profit & Loss Dashboard</h2>

      {/* Summary Cards */}
      <div style={styles.cardGrid}>
        <div style={{ ...styles.card, ...styles.primary }}>
          <h3>Total Revenue</h3>
          <p>LKR {totalRevenue.toLocaleString()}</p>
        </div>

        <div style={{ ...styles.card, ...styles.danger }}>
          <h3>Total Cost</h3>
          <p>LKR {totalCost.toLocaleString()}</p>
        </div>

        <div style={{ ...styles.card, ...styles.success }}>
          <h3>Total Profit</h3>
          <p>LKR {totalProfit.toLocaleString()}</p>
        </div>

        <div style={{ ...styles.card, ...styles.warning }}>
          <h3>No. of Transactions</h3>
          <p>{transactions.length}</p>
        </div>
      </div>

      {/* 📊 Monthly Profit Bar Chart */}
      <div style={styles.chartContainer}>
        <h3 style={{ textAlign: "center" }}>Monthly Profit (Jan - Dec)</h3>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={monthlyData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="profit" fill="#28a745" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* 📊 Next Charts in a Row */}
      <div style={styles.rowCharts}>
        {/* Monthly Profit Line Chart */}
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={monthlyData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="profit" stroke="#28a745" strokeWidth={3} />
          </LineChart>
        </ResponsiveContainer>

        {/* Pie Chart */}
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={totalChartData}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius={120}
              label
            >
              {totalChartData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default ProfitLossDashboard;