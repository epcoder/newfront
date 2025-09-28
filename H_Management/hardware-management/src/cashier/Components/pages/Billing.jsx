// src/components/cashier/TransactionDetails/BillingPage.jsx
import React, { useState, useEffect, useMemo } from "react";
import styles from "./Billing.module.css";
import axios from "axios";
import { getAllItems } from "../../../Api/CA/ItemApi";
import { saveTransaction } from "../../../Api/CA/TransactionApi";

export default function BillingPage() {
  // --- Customer state ---
  const [customerQuery, setCustomerQuery] = useState("");
  const [allCustomers, setAllCustomers] = useState([]);
  const [customerSuggestions, setCustomerSuggestions] = useState([]);
  const [selectedCustomer, setSelectedCustomer] = useState(null);

  // --- Item state ---
  const [itemQuery, setItemQuery] = useState("");
  const [itemSuggestions, setItemSuggestions] = useState([]);
  const [cart, setCart] = useState([]);
  const [allItems, setAllItems] = useState([]);

  // --- Transaction state ---
  const [transactionType, setTransactionType] = useState("CASH");
  const [amountGiven, setAmountGiven] = useState(0);

  // --- Fetch all customers ---
  useEffect(() => {
    axios
      .get("https://hms-back-5gbr.onrender.com/api/v1/customer")
      .then((res) => setAllCustomers(res.data))
      .catch(() => alert("Failed to fetch customers"));
  }, []);

  // --- Customer autocomplete ---
  useEffect(() => {
    if (customerQuery.length >= 1) {
      const filtered = allCustomers.filter((c) =>
        c.name.toLowerCase().includes(customerQuery.toLowerCase())
      );
      setCustomerSuggestions(filtered);
    } else setCustomerSuggestions([]);
  }, [customerQuery, allCustomers]);

  // --- Fetch all items ---
  useEffect(() => {
    const fetchItems = async () => {
      try {
        const res = await getAllItems();
        setAllItems(res.data);
      } catch (err) {
        console.error("Error fetching items:", err);
      }
    };
    fetchItems();
  }, []);

  // --- Item suggestions ---
  useEffect(() => {
    if (itemQuery.length >= 1) {
      const filtered = allItems.filter(
        (i) =>
          i.item_name.toLowerCase().includes(itemQuery.toLowerCase()) ||
          i.item_id.toLowerCase().includes(itemQuery.toLowerCase())
      );
      setItemSuggestions(filtered);
    } else setItemSuggestions([]);
  }, [itemQuery, allItems]);

  const addItemToCart = (item) => {
    if (item.item_quantity === 0) return alert(`❌ Item "${item.item_name}" is out of stock!`);

    const idx = cart.findIndex((c) => c.item_id === item.item_id);
    if (idx >= 0) {
      const newCart = [...cart];
      newCart[idx].itemQuantity += 1;
      newCart[idx].totalPrice =
        newCart[idx].itemQuantity * newCart[idx].itemUnitPrice - (newCart[idx].discount || 0);
      setCart(newCart);
    } else {
      setCart((prev) => [
        ...prev,
        {
          item_id: item.item_id,
          itemName: item.item_name,
          itemQuantity: 1,
          itemUnitPrice: item.item_price,
          itemCostPrice: item.item_cost_price,
          discount: item.discount || 0,
          totalPrice: item.item_price - (item.discount || 0),
        },
      ]);
    }
    setItemQuery("");
    setItemSuggestions([]);
  };

  const updateCartItem = (itemId, qty) => {
    setCart((prev) =>
      prev.map((it) =>
        it.item_id === itemId
          ? { ...it, itemQuantity: Number(qty), totalPrice: Number(qty) * it.itemUnitPrice - (it.discount || 0) }
          : it
      )
    );
  };

  const removeCartItem = (itemId) => setCart(cart.filter((c) => c.item_id !== itemId));

  const subTotal = useMemo(() => cart.reduce((sum, i) => sum + i.totalPrice, 0), [cart]);
  const change = transactionType === "CASH" ? amountGiven - subTotal : 0;

  const handleCompletePayment = async () => {
    if (transactionType === "CREDIT" && !selectedCustomer)
      return alert("⚠️ Customer must be selected for credit transactions!");
    if (cart.length === 0) return alert("Add items to cart first");

    const transaction = {
      transactionType,
      cashierId: "CASH001",
      cashierName: "Priya Perera",
      customerId: selectedCustomer?.id || null,
      items: cart.map((i) => ({
        itemId: i.item_id,
        itemName: i.itemName,
        itemQuantity: i.itemQuantity,
        itemUnitPrice: i.itemUnitPrice,
        itemCostPrice: i.itemCostPrice,
        discount: i.discount,
      })),
    };

    try {
      await saveTransaction(transaction);
      alert("Payment saved successfully!");
      setCart([]);
      setSelectedCustomer(null);
      setAmountGiven(0);
      setCustomerQuery("");
    } catch (err) {
      console.error(err);
      alert("Failed to save transaction");
    }
  };

  return (
    <div className={styles.container}>
      <h1>💳 Billing Page</h1>

      {/* Customer Section */}
      <div className={styles.section}>
        <h3>Customer (optional for Cash)</h3>
        <input
          placeholder="Type name..."
          value={customerQuery}
          onChange={(e) => setCustomerQuery(e.target.value)}
        />
        {customerSuggestions.length > 0 && (
          <ul className={styles.suggestions}>
            {customerSuggestions.map((c) => (
              <li key={c.id} onClick={() => setSelectedCustomer(c)}>
                {c.name} ({c.nic})
              </li>
            ))}
          </ul>
        )}
        {selectedCustomer && <p>✅ {selectedCustomer.name} ({selectedCustomer.nic})</p>}
      </div>

      {/* Item Section */}
      <div className={styles.section}>
        <h3>Items</h3>
        <input
          placeholder="Search item by name or ID"
          value={itemQuery}
          onChange={(e) => setItemQuery(e.target.value)}
        />
        {itemSuggestions.length > 0 && (
          <ul className={styles.suggestions}>
            {itemSuggestions.map((i) => (
              <li key={i.item_id} onClick={() => addItemToCart(i)}>
                {i.item_id} - {i.item_name} (Price: {i.item_price}, Stock: {i.item_quantity})
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Invoice Table */}
      <div className={styles.section}>
        <h3>Invoice</h3>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Code</th>
              <th>Name</th>
              <th>Qty</th>
              <th>Unit Price</th>
              <th>Discount</th>
              <th>Total</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {cart.length === 0 && <tr><td colSpan="7">No items</td></tr>}
            {cart.map((i) => (
              <tr key={i.item_id}>
                <td>{i.item_id}</td>
                <td>{i.itemName}</td>
                <td><input type="number" min="1" value={i.itemQuantity} onChange={(e) => updateCartItem(i.item_id, e.target.value)} /></td>
                <td>{i.itemUnitPrice}</td>
                <td>{i.discount}</td>
                <td>{i.totalPrice.toFixed(2)}</td>
                <td><button onClick={() => removeCartItem(i.item_id)}>Remove</button></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Summary Section */}
      <div className={styles.section}>
        <p>Subtotal: {subTotal.toFixed(2)}</p>
        <label>
          Transaction Type:
          <select value={transactionType} onChange={(e) => setTransactionType(e.target.value)}>
            <option value="CASH">Cash</option>
            <option value="CREDIT">Credit</option>
          </select>
        </label>
        {transactionType === "CASH" && (
          <>
            <input type="number" placeholder="Amount Given" value={amountGiven} onChange={(e) => setAmountGiven(Number(e.target.value))} />
            <p>Change: {change.toFixed(2)}</p>
          </>
        )}
      </div>

      {/* Actions */}
      <div className={styles.section}>
        <button onClick={handleCompletePayment}>💾 Save Payment</button>
        <button onClick={() => window.print()}>🖨️ Print Invoice</button>
        <button onClick={() => { setCart([]); setSelectedCustomer(null); setAmountGiven(0); setCustomerQuery(""); }}>🔄 New Transaction</button>
      </div>
    </div>
  );
}
