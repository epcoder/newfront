import React, { useState } from 'react';
import styles from './YearlyComparisonPage.module.css';
import { Bar, Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, BarElement, Title, Tooltip, Legend);

const YearlyComparisonPage = () => {
  const [selectedYears, setSelectedYears] = useState(['2024', '2025']);

  const financialData = {
    '2023': {
      revenue: 700000,
      cogs: 400000,
      expenses: 150000,
      netProfit: 150000,
      monthlySales: [50000, 52000, 58000, 62000, 55000, 63000, 67000, 60000, 59000, 62000, 65000, 70000]
    },
    '2024': {
      revenue: 800000,
      cogs: 420000,
      expenses: 160000,
      netProfit: 220000,
      monthlySales: [60000, 62000, 64000, 70000, 68000, 75000, 72000, 71000, 69000, 72000, 76000, 78000]
    },
    '2025': {
      revenue: 950000,
      cogs: 470000,
      expenses: 180000,
      netProfit: 300000,
      monthlySales: [75000, 77000, 80000, 82000, 79000, 86000, 88000, 85000, 87000, 90000, 92000, 95000]
    }
  };

  const years = Object.keys(financialData);

  const salesData = {
    labels: selectedYears,
    datasets: [
      {
        label: 'Total Sales (Revenue)',
        data: selectedYears.map(year => financialData[year].revenue),
        backgroundColor: '#42a5f5'
      }
    ]
  };

  const profitData = {
    labels: selectedYears,
    datasets: [
      {
        label: 'Net Profit',
        data: selectedYears.map(year => financialData[year].netProfit),
        backgroundColor: '#66bb6a'
      }
    ]
  };

  const lineChartData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    datasets: selectedYears.map((year, idx) => ({
      label: `${year} Monthly Sales`,
      data: financialData[year].monthlySales,
      borderColor: idx === 0 ? '#42a5f5' : '#66bb6a',
      fill: false,
      tension: 0.4
    }))
  };

  const getChangePercentage = (current, previous) => {
    if (!previous || previous === 0) return 'N/A';
    const change = ((current - previous) / previous) * 100;
    return `${change > 0 ? '+' : ''}${change.toFixed(1)}%`;
  };

  const handleYearToggle = (year) => {
    setSelectedYears(prev =>
      prev.includes(year) ? prev.filter(y => y !== year) : [...prev, year].slice(-2)
    );
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.heading}>Yearly Financial Comparison</h2>

      <div className={styles.yearFilters}>
        {years.map(year => (
          <button
            key={year}
            className={`${styles.yearButton} ${selectedYears.includes(year) ? styles.active : ''}`}
            onClick={() => handleYearToggle(year)}
          >
            {year}
          </button>
        ))}
      </div>

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

      <div className={styles.chartBlock}>
        <h4>Monthly Sales Trend Comparison</h4>
        <Line data={lineChartData} />
      </div>

      <div className={styles.tableSection}>
        <h4>Yearly Financial Summary</h4>
        <table className={styles.summaryTable}>
          <thead>
            <tr>
              <th>Year</th>
              <th>Revenue</th>
              <th>COGS</th>
              <th>Expenses</th>
              <th>Net Profit</th>
              <th>Profit Change</th>
            </tr>
          </thead>
          <tbody>
            {selectedYears.map((year, index) => {
              const current = financialData[year];
              const previous = index > 0 ? financialData[selectedYears[index - 1]] : null;
              return (
                <tr key={year}>
                  <td>{year}</td>
                  <td>Rs. {current.revenue.toLocaleString()}</td>
                  <td>Rs. {current.cogs.toLocaleString()}</td>
                  <td>Rs. {current.expenses.toLocaleString()}</td>
                  <td>Rs. {current.netProfit.toLocaleString()}</td>
                  <td>{previous ? getChangePercentage(current.netProfit, previous.netProfit) : '—'}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default YearlyComparisonPage;
