import React, { useState } from 'react';
import styles from './TaxSummaryPage.module.css';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import * as XLSX from 'xlsx';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const TaxSummaryPage = () => {
  const [selectedYear, setSelectedYear] = useState('2025');
  const [selectedMonth, setSelectedMonth] = useState('All');

  // Sample Data
  const taxData = [
    { month: 'January', salesTax: 25000, purchaseTax: 15000 },
    { month: 'February', salesTax: 22000, purchaseTax: 12000 },
    { month: 'March', salesTax: 30000, purchaseTax: 18000 },
    { month: 'April', salesTax: 28000, purchaseTax: 17000 },
    { month: 'May', salesTax: 26000, purchaseTax: 16000 },
  ];

  const filteredData = selectedMonth === 'All'
    ? taxData
    : taxData.filter(data => data.month === selectedMonth);

  const totalSalesTax = filteredData.reduce((sum, d) => sum + d.salesTax, 0);
  const totalPurchaseTax = filteredData.reduce((sum, d) => sum + d.purchaseTax, 0);
  const netTax = totalSalesTax - totalPurchaseTax;

  const chartData = {
    labels: filteredData.map(d => d.month),
    datasets: [
      {
        label: 'Sales Tax',
        data: filteredData.map(d => d.salesTax),
        backgroundColor: '#4CAF50'
      },
      {
        label: 'Purchase Tax',
        data: filteredData.map(d => d.purchaseTax),
        backgroundColor: '#FF9800'
      }
    ]
  };

  const exportPDF = () => {
    const doc = new jsPDF();
    doc.text('Tax Summary Report', 14, 16);
    autoTable(doc, {
      head: [['Month', 'Sales Tax', 'Purchase Tax', 'Net Tax']],
      body: filteredData.map(row => [
        row.month,
        row.salesTax,
        row.purchaseTax,
        row.salesTax - row.purchaseTax
      ]),
    });
    doc.save('tax_summary.pdf');
  };

  const exportExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(filteredData.map(row => ({
      Month: row.month,
      Sales_Tax: row.salesTax,
      Purchase_Tax: row.purchaseTax,
      Net_Tax: row.salesTax - row.purchaseTax
    })));
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Tax Summary');
    XLSX.writeFile(workbook, 'tax_summary.xlsx');
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.heading}>Tax Summary</h2>

      <div className={styles.filters}>
        <select value={selectedYear} onChange={e => setSelectedYear(e.target.value)}>
          <option value="2025">2025</option>
          <option value="2024">2024</option>
        </select>
        <select value={selectedMonth} onChange={e => setSelectedMonth(e.target.value)}>
          <option value="All">All</option>
          {taxData.map(d => (
            <option key={d.month} value={d.month}>{d.month}</option>
          ))}
        </select>
      </div>

      <div className={styles.summaryCards}>
        <div className={styles.card}>
          <p>Total Sales Tax Collected</p>
          <h3>Rs. {totalSalesTax.toLocaleString()}</h3>
        </div>
        <div className={styles.card}>
          <p>Tax Paid on Purchases</p>
          <h3>Rs. {totalPurchaseTax.toLocaleString()}</h3>
        </div>
        <div className={styles.card}>
          <p>Net Tax Payable</p>
          <h3>Rs. {netTax.toLocaleString()}</h3>
        </div>
      </div>

      <div className={styles.tableSection}>
        <table className={styles.taxTable}>
          <thead>
            <tr>
              <th>Month</th>
              <th>Sales Tax</th>
              <th>Purchase Tax</th>
              <th>Net Tax</th>
            </tr>
          </thead>
          <tbody>
            {filteredData.map((row, index) => (
              <tr key={index}>
                <td>{row.month}</td>
                <td>Rs. {row.salesTax.toLocaleString()}</td>
                <td>Rs. {row.purchaseTax.toLocaleString()}</td>
                <td>Rs. {(row.salesTax - row.purchaseTax).toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className={styles.chartContainer}>
        <Bar data={chartData} options={{ responsive: true }} />
      </div>

      <div className={styles.exportButtons}>
        <button onClick={exportPDF}>Export PDF</button>
        <button onClick={exportExcel}>Export Excel</button>
      </div>
    </div>
  );
};

export default TaxSummaryPage;
