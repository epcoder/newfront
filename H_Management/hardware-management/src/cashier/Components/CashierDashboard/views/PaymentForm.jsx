import React, { useState, useEffect } from "react";
import styles from "./PaymentForm.module.css";

const sampleItems = {
  Cement: ["Holcim", "Tokyo Super"],
  Paint: ["Nippon", "Multilac"],
  Tile: ["Rocell", "LankaTiles"],
  Pipe: ["S-Lon", "National"],
  Iron: ["Lanwa", "Melwa"],
};

const sampleCustomers = [
  { id: 1, name: "Nimal Perera", nic: "123456789V", isCreditor: true },
  { id: 2, name: "Sunil Fernando", nic: "987654321V", isCreditor: false },
  { id: 3, name: "Nadeesha Kumari", nic: "200123456V", isCreditor: true },
  { id: 4, name: "Tharindu Silva", nic: "981236547V", isCreditor: false },
];

const TransactionDetails = () => {
  const [transaction, setTransaction] = useState({
    transactionId: "",
    transactionDate: "",
    cashierId: "",
    cashierName: "",
    transactionType: "",
  });

  const [itemInput, setItemInput] = useState("");
  const [filteredItems, setFilteredItems] = useState([]);
  const [brands, setBrands] = useState([]);
  const [selectedItem, setSelectedItem] = useState("");
  const [selectedBrand, setSelectedBrand] = useState("");
  const [quantity, setQuantity] = useState("");
  const [unitPrice, setUnitPrice] = useState("");
  const [itemsTable, setItemsTable] = useState([]);

  const [customerInput, setCustomerInput] = useState("");
  const [filteredCustomers, setFilteredCustomers] = useState([]);
  const [selectedCustomer, setSelectedCustomer] = useState(null);

  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

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

  // Filter customers by name
  useEffect(() => {
    const matches = sampleCustomers.filter((c) =>
      c.name.toLowerCase().startsWith(customerInput.toLowerCase())
    );
    setFilteredCustomers(matches);
  }, [customerInput]);

  const handleTransactionChange = (e) => {
    setTransaction({ ...transaction, [e.target.name]: e.target.value });
  };

  const handleAddItem = () => {
    if (!selectedItem || !selectedBrand || !quantity || !unitPrice) return;
    const qty = parseInt(quantity);
    const price = parseFloat(unitPrice);
    const total = qty * price;

    setItemsTable([
      ...itemsTable,
      { itemName: selectedItem, brand: selectedBrand, qty, unitPrice: price, total },
    ]);

    setItemInput("");
    setSelectedItem("");
    setSelectedBrand("");
    setQuantity("");
    setUnitPrice("");
    setFilteredItems([]);
    setBrands([]);
  };

  const handleClear = () => {
    setTransaction({
      transactionId: "",
      transactionDate: "",
      cashierId: "",
      cashierName: "",
      transactionType: "",
    });
    setItemsTable([]);
    setCustomerInput("");
    setSelectedCustomer(null);
    setSuccessMessage("");
    setErrorMessage("");
  };

  // Convert date string (YYYY-MM-DD) to ISO datetime string with current time
  const getISODateTime = (dateString) => {
    if (!dateString) return new Date().toISOString();
    const date = new Date(dateString);
    const now = new Date();
    // Use date from input, time from now
    date.setHours(now.getHours(), now.getMinutes(), now.getSeconds(), now.getMilliseconds());
    return date.toISOString();
  };

  const handleSaveTransaction = async () => {
    if (itemsTable.length === 0) {
      setErrorMessage("Add at least one item before saving.");
      return;
    }
    if (!transaction.cashierId || !transaction.cashierName) {
      setErrorMessage("Cashier ID and Name are required.");
      return;
    }
    if (!transaction.transactionType) {
      setErrorMessage("Select transaction type.");
      return;
    }

    setErrorMessage("");
    try {
      // Loop through each item and send POST to backend
      for (const item of itemsTable) {
        const transactionId =
          transaction.transactionId ||
          "TXN" + new Date().toISOString().slice(2, 16).replace(/[-:T]/g, "");

        const body = {
          transactionId: transactionId,
          cashierId: transaction.cashierId,
          cashierName: transaction.cashierName,
          transactionDate: getISODateTime(transaction.transactionDate),
          transactionType: transaction.transactionType, // you may ignore or send if backend supports
          itemName: item.itemName,
          itemQuantity: item.qty,
          itemUnitPrice: item.unitPrice,
          totalPrice: item.total,
        };

        const response = await fetch(
          "http://localhost:8080/api/v1/cashiertransaction/save",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(body),
          }
        );

        if (!response.ok) {
          throw new Error(`Failed to save item: ${item.itemName}`);
        }
      }
      setSuccessMessage("✅ Transaction saved successfully!");
      setTimeout(() => setSuccessMessage(""), 3000);
      handleClear();
    } catch (error) {
      setErrorMessage(error.message || "Failed to save transaction.");
    }
  };

  return (
    <div className={styles.formContainer}>
      <h2>🧾 PAYMENT </h2>

      {successMessage && <div className={styles.successMessage}>{successMessage}</div>}
      {errorMessage && <div className={styles.errorMessage}>{errorMessage}</div>}

      {/* Customer Search */}
      <div className={styles.formGrid}>
        <input
          type="text"
          placeholder="Type Customer Name"
          value={customerInput}
          onChange={(e) => {
            setCustomerInput(e.target.value);
            setSelectedCustomer(null);
          }}
          list="customerList"
        />
        <datalist id="customerList">
          {filteredCustomers.map((cust) => (
            <option key={cust.id} value={cust.name} />
          ))}
        </datalist>

        <button
          className={styles.green}
          onClick={() => {
            const match = sampleCustomers.find((c) => c.name === customerInput);
            if (match) {
              setSelectedCustomer(match);
            }
          }}
        >
          🔍 Select Customer
        </button>
      </div>

      {selectedCustomer && (
        <div className={styles.customerDetails}>
          <p>
            <strong>NIC:</strong> {selectedCustomer.nic}
          </p>
          <p>
            <strong>Status:</strong>{" "}
            {selectedCustomer.isCreditor ? (
              <span className={styles.creditor}>Creditor ❗</span>
            ) : (
              <span className={styles.nonCreditor}>Not a Creditor ✅</span>
            )}
          </p>
        </div>
      )}

      {/* Transaction Info */}
      <div className={styles.formGrid}>
        <input
          type="text"
          name="transactionId"
          placeholder="Transaction ID (optional)"
          value={transaction.transactionId}
          onChange={handleTransactionChange}
        />
        <input
          type="date"
          name="transactionDate"
          value={transaction.transactionDate}
          onChange={handleTransactionChange}
        />
        <input
          type="text"
          name="cashierId"
          placeholder="Cashier ID"
          value={transaction.cashierId}
          onChange={handleTransactionChange}
        />
        <input
          type="text"
          name="cashierName"
          placeholder="Cashier Name"
          value={transaction.cashierName}
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
            setSelectedItem(e.target.value);
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
            <th>Total (Rs.)</th>
          </tr>
        </thead>
        <tbody>
          {itemsTable.map((row, index) => (
            <tr key={index}>
              <td>{row.itemName}</td>
              <td>{row.brand}</td>
              <td>{row.qty}</td>
              <td>{row.unitPrice.toFixed(2)}</td>
              <td>{row.total.toFixed(2)}</td>
            </tr>
          ))}
        </tbody>
        <tfoot>
          <tr>
            <td colSpan="4" style={{ textAlign: "right" }}>
              <strong>Total :</strong>
            </td>
            <td>
              <strong>
                {itemsTable.reduce((sum, row) => sum + row.total, 0).toFixed(2)}
              </strong>
            </td>
          </tr>
        </tfoot>
      </table>

      {/* Action Buttons */}
      <div className={styles.buttonGroup}>
        <button
          className={`${styles.actionButton} ${styles.green}`}
          onClick={handleSaveTransaction}
        >
          💾 Save Transaction
        </button>

        <button className={`${styles.actionButton} ${styles.red}`} onClick={handleClear}>
          🗑️ Clear
        </button>
      </div>
    </div>
  );
};

export default TransactionDetails;
