import React, { useState, useEffect } from 'react';
import styles from './PaymentForm.module.css';

const sampleCustomers = ['Nimal Perera', 'Nadeesha Kumari', 'Kasun Silva', 'Nuwan Jayasuriya', 'Kavindi Fernando'];
const sampleItems = ['Cement', 'Paint', 'Tile', 'Pipe', 'Iron'];
const sampleBrands = {
  Cement: ['Holcim', 'Tokyo Super'],
  Paint: ['Nippon', 'Multilac'],
  Tile: ['Rocell', 'LankaTiles'],
  Pipe: ['S-Lon', 'National'],
  Iron: ['Lanwa', 'Melwa']
};

const InvoiceSection = () => {
  const [items, setItems] = useState([
    { item: '', brand: '', price: 0, quantity: 1, discount: 0 }
  ]);
  const [customer, setCustomer] = useState('');
  const [customerSuggestions, setCustomerSuggestions] = useState([]);
  const [amountPaid, setAmountPaid] = useState(0);
  const [paymentMethod, setPaymentMethod] = useState('Cash');

  const handleItemChange = (index, field, value) => {
    const newItems = [...items];
    newItems[index][field] = field === 'price' || field === 'quantity' || field === 'discount'
      ? parseFloat(value)
      : value;
    setItems(newItems);
  };

  const addItem = () => {
    setItems([...items, { item: '', brand: '', price: 0, quantity: 1, discount: 0 }]);
  };

  const removeItem = (index) => {
    const newItems = items.filter((_, i) => i !== index);
    setItems(newItems);
  };

  const handleCustomerInput = (value) => {
    setCustomer(value);
    if (value.length === 0) {
      setCustomerSuggestions([]);
      return;
    }
    const filtered = sampleCustomers.filter(name =>
      name.toLowerCase().startsWith(value.toLowerCase())
    );
    setCustomerSuggestions(filtered);
  };

  const subtotal = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const totalDiscount = items.reduce((sum, item) => sum + item.discount, 0);
  const tax = (subtotal - totalDiscount) * 0.15;
  const grandTotal = subtotal - totalDiscount + tax;
  const balance = amountPaid - grandTotal;

  return (
    <div className={styles.container}>
      <h2>Invoice Generator</h2>

      {/* Customer Input */}
      <div className={styles.customerSection}>
        <label>Customer:</label>
        <input
          list="customerList"
          value={customer}
          onChange={(e) => handleCustomerInput(e.target.value)}
          placeholder="Enter customer name"
        />
        <datalist id="customerList">
          {customerSuggestions.map((name, i) => (
            <option key={i} value={name} />
          ))}
        </datalist>
        <button className={styles.addCustomerBtn}>+ Add New Customer</button>
      </div>

      {/* Items Table */}
      <table className={styles.invoiceTable}>
        <thead>
          <tr>
            <th>Item</th>
            <th>Brand</th>
            <th>Price (Rs.)</th>
            <th>Qty</th>
            <th>Discount</th>
            <th>Total</th>
            <th>Remove</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item, index) => {
            const brandOptions = sampleBrands[item.item] || [];

            return (
              <tr key={index}>
                <td>
                  <input
                    list={`itemList-${index}`}
                    value={item.item}
                    onChange={(e) => handleItemChange(index, 'item', e.target.value)}
                  />
                  <datalist id={`itemList-${index}`}>
                    {sampleItems.map((itemName, i) => (
                      <option key={i} value={itemName} />
                    ))}
                  </datalist>
                </td>

                <td>
                  <input
                    list={`brandList-${index}`}
                    value={item.brand}
                    onChange={(e) => handleItemChange(index, 'brand', e.target.value)}
                  />
                  <datalist id={`brandList-${index}`}>
                    {brandOptions.map((brand, i) => (
                      <option key={i} value={brand} />
                    ))}
                  </datalist>
                </td>

                <td><input type="number" value={item.price} onChange={(e) => handleItemChange(index, 'price', e.target.value)} /></td>
                <td><input type="number" value={item.quantity} onChange={(e) => handleItemChange(index, 'quantity', e.target.value)} /></td>
                <td><input type="number" value={item.discount} onChange={(e) => handleItemChange(index, 'discount', e.target.value)} /></td>
                <td>{(item.price * item.quantity - item.discount).toFixed(2)}</td>
                <td><button onClick={() => removeItem(index)}>❌</button></td>
              </tr>
            );
          })}
        </tbody>
      </table>

      <button className={styles.addItemBtn} onClick={addItem}>+ Add Item</button>

      {/* Summary Section */}
      <div className={styles.summary}>
        <div><strong>Subtotal:</strong> Rs. {subtotal.toFixed(2)}</div>
        <div><strong>Total Discount:</strong> Rs. {totalDiscount.toFixed(2)}</div>
        <div><strong>Tax (15%):</strong> Rs. {tax.toFixed(2)}</div>
        <div><strong>Grand Total:</strong> Rs. {grandTotal.toFixed(2)}</div>

        <label>Amount Paid:</label>
        <input
          type="number"
          value={amountPaid}
          onChange={(e) => setAmountPaid(parseFloat(e.target.value))}
        />

        <label>Payment Method:</label>
        <select value={paymentMethod} onChange={(e) => setPaymentMethod(e.target.value)}>
          <option>Cash</option>
          <option>Card</option>
          <option>Credit</option>
          <option>Online</option>
        </select>

        <div><strong>Balance / Change:</strong> Rs. {balance.toFixed(2)}</div>
      </div>

      {/* Buttons */}
      <div className={styles.buttonGroup}>
        <button className={styles.generateBtn}>Generate Invoice</button>
        <button className={styles.printBtn}>Print</button>
        <button className={styles.clearBtn} onClick={() => window.location.reload()}>Clear</button>
      </div>
    </div>
  );
};

export default InvoiceSection;
