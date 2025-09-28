import React, { useState } from 'react';
import styles from './ProfitLossStatement.module.css';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Tooltip, Legend } from 'chart.js';
import { Bar } from 'react-chartjs-2';
import * as XLSX from 'xlsx';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

const ProfitLossStatement = () => {
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  // Sample financial data
  const totalRevenue = 200000;
  const cogs = 120000;
  const grossProfit = totalRevenue - cogs;
  const operatingExpenses = 30000;
  const netProfit = grossProfit - operatingExpenses;

  const data = {
    labels: ['Revenue', 'COGS', 'Operating Expenses', 'Net Profit'],
    datasets: [
      {
        label: 'Amount (LKR)',
        data: [totalRevenue, cogs, operatingExpenses, netProfit],
        backgroundColor: ['#007bff', '#dc3545', '#ffc107', '#28a745'],
      },
    ],
  };

  // Export data to Excel
  const exportToExcel = () => {
    const wb = XLSX.utils.book_new();
    const wsData = [
      ['Metric', 'Amount (LKR)'],
      ['Total Revenue', totalRevenue],
      ['Cost of Goods Sold', cogs],
      ['Gross Profit', grossProfit],
      ['Operating Expenses', operatingExpenses],
      ['Net Profit', netProfit],
    ];
    const ws = XLSX.utils.aoa_to_sheet(wsData);
    XLSX.utils.book_append_sheet(wb, ws, 'Profit & Loss');
    XLSX.writeFile(wb, 'Profit_Loss_Report.xlsx');
  };

  // Export data to PDF
  const exportToPDF = () => {
    const doc = new jsPDF();

    // Title
    doc.setFontSize(18);
    doc.text('Profit & Loss Statement', 14, 20);

    // Date range (optional, if selected)
    if (startDate && endDate) {
      doc.setFontSize(11);
      doc.text(`From: ${startDate}   To: ${endDate}`, 14, 28);
    }

    // Add table with financial data
    autoTable(doc, {
      startY: 35,
      head: [['Metric', 'Amount (LKR)']],
      body: [
        ['Total Revenue', totalRevenue.toLocaleString()],
        ['Cost of Goods Sold', cogs.toLocaleString()],
        ['Gross Profit', grossProfit.toLocaleString()],
        ['Operating Expenses', operatingExpenses.toLocaleString()],
        ['Net Profit', netProfit.toLocaleString()],
      ],
      styles: { fontSize: 12 },
      headStyles: { fillColor: '#007bff', textColor: 'white' },
      alternateRowStyles: { fillColor: '#f2f2f2' },
    });

    doc.save('Profit_Loss_Report.pdf');
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.heading}>Profit & Loss Statement</h2>

      <div className={styles.filterSection}>
        <label htmlFor="startDate">From:</label>
        <input
          id="startDate"
          type="date"
          value={startDate}
          onChange={e => setStartDate(e.target.value)}
        />

        <label htmlFor="endDate">To:</label>
        <input
          id="endDate"
          type="date"
          value={endDate}
          onChange={e => setEndDate(e.target.value)}
        />
      </div>

      <table className={styles.financialTable}>
        <tbody>
          <tr>
            <td>Total Revenue:</td>
            <td>LKR {totalRevenue.toLocaleString()}</td>
          </tr>
          <tr>
            <td>Cost of Goods Sold:</td>
            <td>LKR {cogs.toLocaleString()}</td>
          </tr>
          <tr>
            <td>Gross Profit:</td>
            <td>LKR {grossProfit.toLocaleString()}</td>
          </tr>
          <tr>
            <td>Operating Expenses:</td>
            <td>LKR {operatingExpenses.toLocaleString()}</td>
          </tr>
          <tr className={styles.netProfitRow}>
            <td>Net Profit:</td>
            <td>LKR {netProfit.toLocaleString()}</td>
          </tr>
        </tbody>
      </table>

      <div className={styles.chartContainer}>
        <Bar data={data} />
      </div>

      <div className={styles.buttonGroup}>
        <button onClick={exportToPDF}>Export to PDF</button>
        <button onClick={exportToExcel}>Export to Excel</button>
      </div>
    </div>
  );
};

export default ProfitLossStatement;
