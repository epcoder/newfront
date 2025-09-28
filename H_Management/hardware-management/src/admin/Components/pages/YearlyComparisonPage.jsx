import React, { useState, useEffect } from "react";
import styles from "./YearlyComparisonPage.module.css";
import { Bar, Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const YearlyComparisonPage = () => {
  const [transactions, setTransactions] = useState([]);
  const [financialData, setFinancialData] = useState({});
  const [selectedYears, setSelectedYears] = useState([]);

  // 🔹 Fetch transactions from backend
  useEffect(() => {
    fetch("http://localhost:8080/api/v1/cashiertransaction/all")
      .then((res) => res.json())
      .then((data) => {
        setTransactions(data);

        // Aggregate yearly data
        const yearlyMap = {};

        data.forEach((txn) => {
          const date = new Date(txn.transactionDate);
          const year = date.getFullYear();

          if (!yearlyMap[year]) {
            yearlyMap[year] = {
              revenue: 0,
              cogs: 0,
              expenses: 0,
              netProfit: 0,
              monthlySales: Array(12).fill(0),
            };
          }

          const revenue = txn.totalPrice || 0;
          const cost = txn.totalCostPrice || 0;
          const profit = txn.totalProfit || 0;

          yearlyMap[year].revenue += revenue;
          yearlyMap[year].cogs += cost;
          yearlyMap[year].netProfit += profit;
          // ⚠️ If you have expenses separately, replace this logic
          yearlyMap[year].expenses += cost * 0.2; // Dummy: 20% of cost as expenses

          yearlyMap[year].monthlySales[date.getMonth()] += revenue;
        });

        setFinancialData(yearlyMap);

        // Select the last 2 years by default
        const allYears = Object.keys(yearlyMap).sort();
        setSelectedYears(allYears.slice(-2));
      })
      .catch((err) => console.error("Error fetching transactions:", err));
  }, []);

  const years = Object.keys(financialData);

  // 📊 Chart Data
  const salesData = {
    labels: selectedYears,
    datasets: [
      {
        label: "Total Sales (Revenue)",
        data: selectedYears.map((y) => financialData[y]?.revenue || 0),
        backgroundColor: "#42a5f5",
      },
    ],
  };

  const profitData = {
    labels: selectedYears,
    datasets: [
      {
        label: "Net Profit",
        data: selectedYears.map((y) => financialData[y]?.netProfit || 0),
        backgroundColor: "#66bb6a",
      },
    ],
  };

  const lineChartData = {
    labels: [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ],
    datasets: selectedYears.map((year, idx) => ({
      label: `${year} Monthly Sales`,
      data: financialData[year]?.monthlySales || [],
      borderColor: idx === 0 ? "#42a5f5" : "#66bb6a",
      fill: false,
      tension: 0.4,
    })),
  };

  // 📊 Utils
  const getChangePercentage = (current, previous) => {
    if (!previous || previous === 0) return "N/A";
    const change = ((current - previous) / previous) * 100;
    return `${change > 0 ? "+" : ""}${change.toFixed(1)}%`;
  };

  const handleYearToggle = (year) => {
    setSelectedYears((prev) =>
      prev.includes(year)
        ? prev.filter((y) => y !== year)
        : [...prev, year].slice(-2)
    );
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.heading}>Yearly Financial Comparison</h2>

      {/* Year Select Buttons */}
      <div className={styles.yearFilters}>
        {years.map((year) => (
          <button
            key={year}
            className={`${styles.yearButton} ${
              selectedYears.includes(year) ? styles.active : ""
            }`}
            onClick={() => handleYearToggle(year)}
          >
            {year}
          </button>
        ))}
      </div>

      {/* Bar Charts */}
      <div className={styles.charts}>
        <div className={styles.chartBlock}>
          <h4>Sales by Year</h4>
          <Bar data={salesData} />
        </div>
        <div className={styles.chartBlock}>
          <h4>Profit by Year</h4>
          <Bar data={profitData} />
        </div>
      </div>

      {/* Line Chart */}
      <div className={styles.chartBlock}>
        <h4>Monthly Sales Trend Comparison</h4>
        <Line data={lineChartData} />
      </div>

      
    </div>
  );
};

export default YearlyComparisonPage;