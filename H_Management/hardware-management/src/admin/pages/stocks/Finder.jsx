import React, { useState } from 'react';
import styles from './Finder.module.css';

const sampleStockData = [
  {
    code: 'ITM001',
    name: 'Holcim Cement 50kg',
    brand: 'Holcim',
    type: 'Cement',
    group: 'Building Material',
    quantity: 120,
    location: 'Main Store',
    unit: 'Bag',
  },
  {
    code: 'ITM002',
    name: 'Nippon Paint 1L',
    brand: 'Nippon',
    type: 'Paint',
    group: 'Finishing',
    quantity: 50,
    location: 'Branch 1',
    unit: 'Can',
  },
  // Add more sample items
];

const StockFinder = () => {
  const [search, setSearch] = useState('');
  const [filteredStock, setFilteredStock] = useState(sampleStockData);

  const handleSearch = (e) => {
    const value = e.target.value;
    setSearch(value);

    const filtered = sampleStockData.filter((item) =>
      Object.values(item).some((val) =>
        String(val).toLowerCase().includes(value.toLowerCase())
      )
    );
    setFilteredStock(filtered);
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.heading}>Stock Finder</h2>

      <input
        type="text"
        placeholder="Search by item name, code, type, brand..."
        value={search}
        onChange={handleSearch}
        className={styles.searchInput}
      />

      <table className={styles.stockTable}>
        <thead>
          <tr>
            <th>Item Code</th>
            <th>Item Name</th>
            <th>Brand</th>
            <th>Type</th>
            <th>Group</th>
            <th>Qty</th>
            <th>Location</th>
            <th>Unit</th>
          </tr>
        </thead>
        <tbody>
          {filteredStock.length > 0 ? (
            filteredStock.map((item) => (
              <tr key={item.code}>
                <td>{item.code}</td>
                <td>{item.name}</td>
                <td>{item.brand}</td>
                <td>{item.type}</td>
                <td>{item.group}</td>
                <td>{item.quantity}</td>
                <td>{item.location}</td>
                <td>{item.unit}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="8" className={styles.noData}>
                No matching items found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default StockFinder;
