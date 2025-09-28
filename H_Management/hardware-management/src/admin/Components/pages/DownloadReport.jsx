import React, { useState } from 'react';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import * as XLSX from 'xlsx';


const reportsList = [
  'Sales Report',
  'Stock Report',
  'Purchase Orders',
  'Customer Invoices',
  'Warranty Claims Summary',
  'Profit & Loss Report',
  'Tax Summary Report',
  'Credit/Debit Reports',
];

const dateFilters = [
  'Today',
  'Last 7 Days',
  'Last 30 Days',
  'This Month',
  'Last Month',
  'Custom Range',
];

const downloadFormats = ['PDF', 'Excel'];

const DownloadReportsPage = () => {
  const [reportType, setReportType] = useState(reportsList[0]);
  const [dateFilter, setDateFilter] = useState(dateFilters[0]);
  const [format, setFormat] = useState(downloadFormats[0]);
  const [customDateFrom, setCustomDateFrom] = useState('');
  const [customDateTo, setCustomDateTo] = useState('');

  // Fake sample data for demonstration
  const sampleData = [
    { id: 1, name: 'Item A', quantity: 10, price: 100 },
    { id: 2, name: 'Item B', quantity: 5, price: 200 },
    { id: 3, name: 'Item C', quantity: 15, price: 150 },
  ];

  const handleDownload = () => {
    if (format === 'PDF') {
      generatePDF();
    } else if (format === 'Excel') {
      generateExcel();
    }
  };

  const generatePDF = () => {
    const doc = new jsPDF();

    doc.text(`${reportType} (${dateFilter})`, 14, 15);

    // Simple table columns and rows from sampleData
    const columns = ['ID', 'Name', 'Quantity', 'Price'];
    const rows = sampleData.map(d => [d.id, d.name, d.quantity, d.price]);

    autoTable(doc, {
      startY: 20,
      head: [columns],
      body: rows,
    });

    doc.save(`${reportType.replace(/ /g, '_')}.pdf`);
  };

  const generateExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(sampleData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Report');

    XLSX.writeFile(workbook, `${reportType.replace(/ /g, '_')}.xlsx`);
  };

  return (
    <div style={{ maxWidth: 600, margin: '2rem auto', padding: '1rem', fontFamily: 'Arial, sans-serif' }}>
      <h2>Download Reports</h2>

      <label>
        Select Report:
        <select value={reportType} onChange={e => setReportType(e.target.value)} style={{ marginLeft: 10 }}>
          {reportsList.map(r => (
            <option key={r} value={r}>{r}</option>
          ))}
        </select>
      </label>

      <br /><br />

      <label>
        Date Filter:
        <select value={dateFilter} onChange={e => setDateFilter(e.target.value)} style={{ marginLeft: 10 }}>
          {dateFilters.map(df => (
            <option key={df} value={df}>{df}</option>
          ))}
        </select>
      </label>

      {dateFilter === 'Custom Range' && (
        <div style={{ marginTop: 10 }}>
          <label>
            From: <input type="date" value={customDateFrom} onChange={e => setCustomDateFrom(e.target.value)} />
          </label>
          <label style={{ marginLeft: 20 }}>
            To: <input type="date" value={customDateTo} onChange={e => setCustomDateTo(e.target.value)} />
          </label>
        </div>
      )}

      <br />

      <label>
        Download Format:
        <select value={format} onChange={e => setFormat(e.target.value)} style={{ marginLeft: 10 }}>
          {downloadFormats.map(df => (
            <option key={df} value={df}>{df}</option>
          ))}
        </select>
      </label>

      <br /><br />

      <button onClick={handleDownload} style={{ padding: '10px 20px', fontSize: 16, cursor: 'pointer' }}>
        Download
      </button>
    </div>
  );
};

export default DownloadReportsPage;
// This component allows users to select a report type, date filter, and download format,
// then generates a PDF or Excel file with sample data. The date filter includes options for
// predefined ranges as well as a custom range with start and end date pickers.