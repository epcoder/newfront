import React, { useState, useEffect } from "react";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import styles from "./InvoicePage.module.css";
import { getAllItems, saveTransaction } from "../../../Api/CA/TransactionApi";

const InvoicePage = () => {
  const [items, setItems] = useState([]); // all items from DB
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [billItems, setBillItems] = useState([]);

  // Load all items on page load
  useEffect(() => {
    async function fetchItems() {
      const data = await getAllItems();
      setItems(data || []);
    }
    fetchItems();
  }, []);

  // --- Search items locally by name or ID ---
  const handleSearch = (e) => {
    const query = e.target.value.trim().toLowerCase();
    setSearchQuery(query);

    if (!query) {
      setSearchResults([]);
      return;
    }

    const results = items.filter(
      (item) =>
        (item.itemName && item.itemName.toLowerCase().includes(query)) ||
        (item.itemId && item.itemId.toLowerCase().includes(query))
    );

    setSearchResults(results);
  };

  const addToBill = (item) => {
    if (!item?.itemId) return;
    const exists = billItems.find((b) => b.itemId === item.itemId);
    if (exists) {
      setBillItems(
        billItems.map((b) =>
          b.itemId === item.itemId ? { ...b, qty: b.qty + 1 } : b
        )
      );
    } else {
      setBillItems([
        ...billItems,
        {
          itemId: item.itemId,
          itemName: item.itemName || "Unknown",
          itemPrice: Number(item.itemPrice) || 0,
          itemQty: Number(item.itemQty) || 0,
          qty: 1,
        },
      ]);
    }
    setSearchQuery("");
    setSearchResults([]);
  };

  const updateQuantity = (id, qty) => {
    const n = parseInt(qty);
    if (isNaN(n) || n < 1) return;
    setBillItems(
      billItems.map((b) => (b.itemId === id ? { ...b, qty: n } : b))
    );
  };

  const removeFromBill = (id) => {
    setBillItems(billItems.filter((b) => b.itemId !== id));
  };

  const calculateTotal = () =>
    billItems.reduce((acc, item) => acc + (item.itemPrice || 0) * (item.qty || 0), 0);

  const saveInvoiceToBackend = async () => {
    if (billItems.length === 0) {
      alert("No items in bill!");
      return;
    }

    const today = new Date().toISOString().split("T")[0];
    const invoiceData = {
      transactionId: `TXN-${Date.now()}`,
      itemId: billItems.map((i) => i.itemId).join(","),
      itemName: billItems.map((i) => i.itemName).join(","),
      quantity: billItems.reduce((sum, i) => sum + (i.qty || 0), 0),
      totalAmount: calculateTotal(),
      date: today,
    };

    try {
      const saved = await saveTransaction(invoiceData);
      alert(`✅ Invoice saved! Transaction ID: ${saved.transactionId}`);
      setBillItems([]);
    } catch (err) {
      console.error(err);
      alert("❌ Error saving invoice");
    }
  };

  const generatePDF = () => {
    const doc = new jsPDF();
    doc.setFontSize(18);
    doc.text("Invoice", 14, 15);

    const today = new Date().toLocaleDateString();
    const invoiceNo = Math.floor(Math.random() * 100000);
    doc.setFontSize(11);
    doc.text(`Date: ${today}`, 14, 22);
    doc.text(`Invoice No: ${invoiceNo}`, 150, 22);

    autoTable(doc, {
      startY: 30,
      head: [["Item", "Price", "Qty", "Total"]],
      body: billItems.map((item) => [
        item.itemName || "Unknown",
        `Rs. ${item.itemPrice || 0}`,
        item.qty || 0,
        `Rs. ${(item.itemPrice || 0) * (item.qty || 0)}`,
      ]),
    });

    const finalY = doc.lastAutoTable?.finalY || 30;
    doc.setFontSize(12);
    doc.text(`Grand Total: Rs. ${calculateTotal()}`, 14, finalY + 10);
    doc.save("invoice.pdf");
  };

  return (
    <div className={styles.invoicePage}>
      <h2>Invoice Page</h2>
      <input
        type="text"
        placeholder="Search by item name or ID..."
        value={searchQuery}
        onChange={handleSearch}
        className={styles.searchBar}
      />

      {searchResults.length > 0 && (
        <div className={styles.searchResults}>
          {searchResults.map((item) => (
            <div key={item.itemId} className={styles.itemCard}>
              <p><b>{item.itemName}</b></p>
              <p>Price: Rs. {item.itemPrice || 0}</p>
              <p>Available: {item.itemQty || 0}</p>
              <button onClick={() => addToBill(item)}>Add</button>
            </div>
          ))}
        </div>
      )}

      <h3>Bill</h3>
      <table className={styles.billTable}>
        <thead>
          <tr>
            <th>Item</th>
            <th>Price (Rs.)</th>
            <th>Qty</th>
            <th>Total</th>
            <th>Remove</th>
          </tr>
        </thead>
        <tbody>
          {billItems.map((item) => (
            <tr key={item.itemId}>
              <td>{item.itemName}</td>
              <td>{item.itemPrice || 0}</td>
              <td>
                <input
                  type="number"
                  min="1"
                  value={item.qty}
                  onChange={(e) => updateQuantity(item.itemId, e.target.value)}
                  className={styles.qtyInput}
                />
              </td>
              <td>{(item.itemPrice || 0) * (item.qty || 0)}</td>
              <td>
                <button onClick={() => removeFromBill(item.itemId)}>X</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className={styles.summary}>
        <h3>Total: Rs. {calculateTotal()}</h3>
        <button onClick={saveInvoiceToBackend}>Save Invoice</button>
        <button onClick={generatePDF} disabled={billItems.length === 0}>Generate PDF</button>
      </div>
    </div>
  );
};

export default InvoicePage;
