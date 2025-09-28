import React, { useState } from 'react';
import styles from './WarrantyPage.module.css';
import WarrantyModal from './WarrantyModal';
import * as XLSX from 'xlsx';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

const WarrantyPage = () => {
  const [warranties, setWarranties] = useState([
    { warrantyId: 'W-007', name: '1 Year', type: 'Warranty', duration: 12, description: '365 Days Warranty' },
    { warrantyId: 'W-004', name: '6 Month', type: 'Warranty', duration: 6, description: '180 Days Warranty' },
  ]);

  const [search, setSearch] = useState('');
  const [modalOpen, setModalOpen] = useState(false);
  const [editWarranty, setEditWarranty] = useState(null);
  const [sortField, setSortField] = useState('name');
  const [sortOrder, setSortOrder] = useState('asc');

  const handleAddOrUpdate = (data) => {
    if (editWarranty) {
      setWarranties(prev => prev.map(w => (w.warrantyId === data.warrantyId ? data : w)));
    } else {
      setWarranties(prev => [...prev, data]);
    }
    setEditWarranty(null);
    setModalOpen(false);
  };

  const handleEdit = (warranty) => {
    setEditWarranty(warranty);
    setModalOpen(true);
  };

  const handleDelete = (id) => {
    setWarranties(warranties.filter(w => w.warrantyId !== id));
  };

  const handleExportExcel = () => {
    const ws = XLSX.utils.json_to_sheet(warranties);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Warranties');
    XLSX.writeFile(wb, 'warranties.xlsx');
  };

  const handleExportPDF = () => {
    const doc = new jsPDF();
    doc.text('Warranty / Guarantee Report', 10, 10);
    doc.autoTable({
      head: [['ID', 'Name', 'Type', 'Duration', 'Description']],
      body: warranties.map(w => [
        w.warrantyId,
        w.name,
        w.type,
        `${w.duration} Months`,
        w.description,
      ]),
    });
    doc.save('warranties.pdf');
  };

  const filtered = warranties.filter(w =>
    w.name.toLowerCase().includes(search.toLowerCase())
  );

  const sorted = [...filtered].sort((a, b) => {
    const aVal = a[sortField]?.toString().toLowerCase();
    const bVal = b[sortField]?.toString().toLowerCase();
    return sortOrder === 'asc' ? aVal.localeCompare(bVal) : bVal.localeCompare(aVal);
  });

  return (
    <div className={styles.wcontainer}>
      <h2>Warranties / Guaranties</h2>
      <div className={styles.actions}>
        <input
          type="text"
          placeholder="Search"
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
        <select value={sortField} onChange={e => setSortField(e.target.value)}>
          <option value="name">Name</option>
          <option value="duration">Duration</option>
          <option value="warrantyId">ID</option>
        </select>
        <select value={sortOrder} onChange={e => setSortOrder(e.target.value)}>
          <option value="asc">Asc</option>
          <option value="desc">Desc</option>
        </select>
        <div className={styles.exportButtons}>
          <button onClick={handleExportExcel}>Export Excel</button>
          <button onClick={handleExportPDF}>Export PDF</button>
          <button className={styles.add} onClick={() => setModalOpen(true)}>+ Add Warranty</button>
        </div>
      </div>

      <table className={styles.table}>
        <thead>
          <tr>
            <th>Warranty ID</th>
            <th>Name</th>
            <th>Type</th>
            <th>Duration</th>
            <th>Description</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {sorted.map(w => (
            <tr key={w.warrantyId}>
              <td>{w.warrantyId}</td>
              <td>{w.name}</td>
              <td>{w.type}</td>
              <td>{w.duration} Months</td>
              <td>{w.description}</td>
              <td>
                <button className={styles.edit} onClick={() => handleEdit(w)}>✏️</button>
                <button className={styles.delete} onClick={() => handleDelete(w.warrantyId)}>🗑️</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {modalOpen && (
        <WarrantyModal
          onClose={() => { setEditWarranty(null); setModalOpen(false); }}
          onSave={handleAddOrUpdate}
          defaultValues={editWarranty}
        />
      )}
    </div>
  );
};

export default WarrantyPage;
