import React, { useState, useEffect, useRef } from 'react';
import styles from './Valuation.module.css';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import * as XLSX from 'xlsx';

const initialStock = [
  { name: 'Cement', brand: 'Holcim', category: 'Building', qty: 100, unitCost: 1200 },
  { name: 'Paint', brand: 'Nippon', category: 'Finishing', qty: 60, unitCost: 850 },
  { name: 'Tile', brand: 'LankaTile', category: 'Flooring', qty: 200, unitCost: 300 },
];

const StockValuation = () => {
  const [filter, setFilter] = useState('');
  const [filteredStock, setFilteredStock] = useState(initialStock);
  const tableRef = useRef();

  useEffect(() => {
    if (!filter) {
      setFilteredStock(initialStock);
    } else {
      const lower = filter.toLowerCase();
      setFilteredStock(
        initialStock.filter(
          (item) =>
            item.name.toLowerCase().includes(lower) ||
            item.brand.toLowerCase().includes(lower) ||
            item.category.toLowerCase().includes(lower)
        )
      );
    }
  }, [filter]);

  const grandTotal = filteredStock.reduce(
    (sum, item) => sum + item.qty * item.unitCost,
    0
  );

  const exportPDF = () => {
    const input = tableRef.current;
    html2canvas(input).then((canvas) => {
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4');
      const pageWidth = pdf.internal.pageSize.getWidth();
      const pageHeight = (canvas.height * pageWidth) / canvas.width;

      pdf.addImage(imgData, 'PNG', 0, 10, pageWidth, pageHeight);
      pdf.save('stock_valuation.pdf');
    });
  };

  const exportExcel = () => {
    const data = filteredStock.map(item => ({
      'Item Name': item.name,
      'Brand': item.brand,
      'Category': item.category,
      'Quantity': item.qty,
      'Unit Cost (Rs)': item.unitCost,
      'Total Value (Rs)': item.qty * item.unitCost,
    }));

    data.push({
      'Item Name': '',
      'Brand': '',
      'Category': '',
      'Quantity': '',
      'Unit Cost (Rs)': 'Grand Total',
      'Total Value (Rs)': grandTotal,
    });

    const worksheet = XLSX.utils.json_to_sheet(data);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Stock Valuation');
    XLSX.writeFile(workbook, 'stock_valuation.xlsx');
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.heading}>📊 Stock Valuation</h2>

      <div className={styles.filterSection}>
        <input
          type="text"
          placeholder="Filter by Item, Brand, or Category..."
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className={styles.filterInput}
        />
        <button onClick={exportPDF} className={styles.exportBtn}>⬇️ Export PDF</button>
        <button onClick={exportExcel} className={styles.exportBtn}>⬇️ Export Excel</button>
      </div>

      <div ref={tableRef}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Item Name</th>
              <th>Brand</th>
              <th>Category</th>
              <th>Quantity</th>
              <th>Unit Cost (Rs)</th>
              <th>Total Value (Rs)</th>
            </tr>
          </thead>
          <tbody>
            {filteredStock.map((item, index) => (
              <tr key={index}>
                <td>{item.name}</td>
                <td>{item.brand}</td>
                <td>{item.category}</td>
                <td>{item.qty}</td>
                <td>{item.unitCost.toLocaleString()}</td>
                <td>{(item.qty * item.unitCost).toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr>
              <td colSpan="5" className={styles.totalLabel}>Grand Total</td>
              <td className={styles.totalValue}>{grandTotal.toLocaleString()}</td>
            </tr>
          </tfoot>
        </table>
      </div>
    </div>
  );
};

export default StockValuation;
