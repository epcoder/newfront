import React, { useState } from 'react';
import styles from './StockSummary.module.css';

const dummyData = [
  { id: 1, name: 'Hammer', category: 'Tools', brand: 'Stanley', stock: 15 },
  { id: 2, name: 'Screwdriver', category: 'Tools', brand: 'Bosch', stock: 5 },
  { id: 3, name: 'Paint Brush', category: 'Paint', brand: 'Nippon', stock: 25 },
  { id: 4, name: 'Drill Machine', category: 'Tools', brand: 'Bosch', stock: 8 },
  { id: 5, name: 'Wall Putty', category: 'Paint', brand: 'Dulux', stock: 12 },
];

const StockSummaryViewer = () => {
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedBrand, setSelectedBrand] = useState('');
  const [selectedItem, setSelectedItem] = useState('');

  const categories = [...new Set(dummyData.map(item => item.category))];
  const brands = [...new Set(
    dummyData.filter(item =>
      selectedCategory ? item.category === selectedCategory : true
    ).map(item => item.brand)
  )];
  const items = [...new Set(
    dummyData.filter(item => {
      return (
        (!selectedCategory || item.category === selectedCategory) &&
        (!selectedBrand || item.brand === selectedBrand)
      );
    }).map(item => item.name)
  )];

  const filteredData = dummyData.filter(item => {
    return (
      (!selectedCategory || item.category === selectedCategory) &&
      (!selectedBrand || item.brand === selectedBrand) &&
      (!selectedItem || item.name === selectedItem)
    );
  });

  return (
    <div className={styles.container}>
      <h2 className={styles.heading}>Stock Summary Viewer</h2>

      <div className={styles.filters}>
        <select value={selectedCategory} onChange={e => setSelectedCategory(e.target.value)}>
          <option value=''>-- Select Category --</option>
          {categories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
        </select>

        <select value={selectedBrand} onChange={e => setSelectedBrand(e.target.value)}>
          <option value=''>-- Select Brand --</option>
          {brands.map(br => <option key={br} value={br}>{br}</option>)}
        </select>

        <select value={selectedItem} onChange={e => setSelectedItem(e.target.value)}>
          <option value=''>-- Select Item --</option>
          {items.map(it => <option key={it} value={it}>{it}</option>)}
        </select>
      </div>

      <table className={styles.table}>
        <thead>
          <tr>
            <th>Item</th>
            <th>Category</th>
            <th>Brand</th>
            <th>Stock</th>
          </tr>
        </thead>
        <tbody>
          {filteredData.map(item => (
            <tr key={item.id}>
              <td>{item.name}</td>
              <td>{item.category}</td>
              <td>{item.brand}</td>
              <td>{item.stock}</td>
            </tr>
          ))}
          {filteredData.length === 0 && (
            <tr>
              <td colSpan="4" className={styles.noData}>No items found</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default StockSummaryViewer;
