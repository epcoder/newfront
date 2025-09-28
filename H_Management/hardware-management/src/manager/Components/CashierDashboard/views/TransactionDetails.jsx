import React, { useState, useEffect } from 'react';
import styles from './TransactionDetails.module.css';

const sampleItems = {
  Cement: ['Holcim', 'Tokyo Super'],
  Paint: ['Nippon', 'Multilac'],
  Tile: ['Rocell', 'LankaTiles'],
  Pipe: ['S-Lon', 'National'],
  Iron: ['Lanwa', 'Melwa']
};

const TransactionDetails = () => {
  const [transaction, setTransaction] = useState({
    id: '',
    date: '',
    cashierID: '',
    transactionType: ''
  });

  const [itemInput, setItemInput] = useState('');
  const [filteredItems, setFilteredItems] = useState([]);
  const [brands, setBrands] = useState([]);
  const [selectedItem, setSelectedItem] = useState('');
  const [selectedBrand, setSelectedBrand] = useState('');
  const [quantity, setQuantity] = useState('');
  const [unitPrice, setUnitPrice] = useState('');
  const [itemsTable, setItemsTable] = useState([]);

  // Filter items on typing
  useEffect(() => {
    const lower = itemInput.toLowerCase();
    const matches = Object.keys(sampleItems).filter((item) =>
      item.toLowerCase().startsWith(lower)
    );
    setFilteredItems(matches);
  }, [itemInput]);

  // Load brand options
  useEffect(() => {
    if (selectedItem && sampleItems[selectedItem]) {
      setBrands(sampleItems[selectedItem]);
    } else {
      setBrands([]);
    }
  }, [selectedItem]);

  const handleTransactionChange = (e) => {
    setTransaction({ ...transaction, [e.target.name]: e.target.value });
  };

  const handleAddItem = () => {
    if (!selectedItem || !selectedBrand || !quantity || !unitPrice) return;
    const qty = parseFloat(quantity);
    const price = parseFloat(unitPrice);
    const total = qty * price;

    setItemsTable([
      ...itemsTable,
      { item: selectedItem, brand: selectedBrand, qty, price, total }
    ]);

    // Clear inputs
    setItemInput('');
    setSelectedItem('');
    setSelectedBrand('');
    setQuantity('');
    setUnitPrice('');
    setFilteredItems([]);
    setBrands([]);
  };

  const handleClear = () => {
    setTransaction({
      id: '',
      date: '',
      cashierID: '',
      transactionType: ''
    });
    setItemsTable([]);
  };

  const totalAmount = itemsTable.reduce((sum, row) => sum + row.total, 0);

  return (
    <div className={styles.formContainer}>
      <h2>🧾 Add Transaction</h2>

      {/* Transaction Info */}
      <div className={styles.formGrid}>
        <input
          type="text"
          name="id"
          placeholder="Transaction ID"
          value={transaction.id}
          onChange={handleTransactionChange}
        />
        <input
          type="date"
          name="date"
          value={transaction.date}
          onChange={handleTransactionChange}
        />
        <input
          type="text"
          name="cashierID"
          placeholder="Cashier ID"
          value={transaction.cashierID}
          onChange={handleTransactionChange}
        />
        <select
          name="transactionType"
          value={transaction.transactionType}
          onChange={handleTransactionChange}
        >
          <option value="">Select Type</option>
          <option value="sale">Sale</option>
          <option value="return">Return</option>
          <option value="purchase">Purchase</option>
          <option value="damage">Damage</option>
          <option value="transfer">Transfer</option>
          <option value="adjustment">Adjustment</option>
          <option value="discounted">Discounted Sale</option>
          <option value="credit">Credit Sale</option>
          <option value="refund">Refund</option>
          <option value="sample">Sample</option>
        </select>
      </div>

      {/* Item Entry */}
      <div className={styles.formGrid}>
        <input
          type="text"
          placeholder="Type Item Name"
          value={itemInput}
          onChange={(e) => {
            setItemInput(e.target.value);
            setSelectedItem(e.target.value); // Pre-select
          }}
          list="itemList"
        />
        <datalist id="itemList">
          {filteredItems.map((item) => (
            <option key={item} value={item} />
          ))}
        </datalist>

        <select
          value={selectedBrand}
          onChange={(e) => setSelectedBrand(e.target.value)}
        >
          <option value="">Select Brand</option>
          {brands.map((brand, index) => (
            <option key={index} value={brand}>
              {brand}
            </option>
          ))}
        </select>

        <input
          type="number"
          placeholder="Qty"
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
        />
        <input
          type="number"
          placeholder="Unit Price"
          value={unitPrice}
          onChange={(e) => setUnitPrice(e.target.value)}
        />

        <button className={styles.green} onClick={handleAddItem}>
          ➕ Add Item
        </button>
      </div>

      {/* Items Table */}
      <table className={styles.table}>
        <thead>
          <tr>
            <th>Item</th>
            <th>Brand</th>
            <th>Qty</th>
            <th>Unit Price</th>
            <th>Total</th>
          </tr>
        </thead>
        <tbody>
          {itemsTable.map((row, index) => (
            <tr key={index}>
              <td>{row.item}</td>
              <td>{row.brand}</td>
              <td>{row.qty}</td>
              <td>{row.price.toFixed(2)}</td>
              <td>{row.total.toFixed(2)}</td>
            </tr>
          ))}
        </tbody>
        <tfoot>
          <tr>
            <td colSpan="4" style={{ textAlign: 'right' }}>
              <strong>Total:</strong>
            </td>
            <td>
              <strong>Rs. {totalAmount.toFixed(2)}</strong>
            </td>
          </tr>
        </tfoot>
      </table>

      {/* Actions */}
      <div className={styles.buttonGroup}>
        <button className={`${styles.actionButton} ${styles.green}`}>💾 Save Transaction</button>
        <button className={`${styles.actionButton} ${styles.red}`} onClick={handleClear}>
          🗑️ Clear
        </button>
      </div>
    </div>
  );
};

export default TransactionDetails;
