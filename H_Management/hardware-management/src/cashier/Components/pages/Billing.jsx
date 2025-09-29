// src/components/cashier/TransactionDetails/BillingPage.jsx
import React, { useState, useEffect, useMemo, useRef } from "react";
import styles from "./Billing.module.css";
import { getAllItems } from "../../../Api/CA/ItemApi";
import { saveTransaction } from "../../../Api/CA/TransactionApi";

export default function BillingPage() {
  // --- Item state ---
  const [itemQuery, setItemQuery] = useState("");
  const [itemSuggestions, setItemSuggestions] = useState([]);
  const [cart, setCart] = useState([]);
  const [allItems, setAllItems] = useState([]);

  // --- Transaction state ---
  const [transactionType, setTransactionType] = useState("CASH");
  const [amountGiven, setAmountGiven] = useState(0);

  const printRef = useRef(); // For print

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

  // --- Filter item suggestions ---
  useEffect(() => {
    if (itemQuery.length >= 1) {
      const filtered = allItems.filter(
        (i) =>
          (i.item_name &&
            i.item_name.toLowerCase().includes(itemQuery.toLowerCase())) ||
          (i.item_id &&
            i.item_id.toLowerCase().includes(itemQuery.toLowerCase()))
      );
      setItemSuggestions(filtered);
    } else setItemSuggestions([]);
  }, [itemQuery, allItems]);

  // --- Add item to cart ---
  const addItemToCart = (item) => {
    if (item.item_quantity === 0) {
      return alert(`❌ Item "${item.item_name}" is out of stock!`);
    }

    const idx = cart.findIndex((c) => c.item_id === item.item_id);
    if (idx >= 0) {
      const newCart = [...cart];
      newCart[idx].itemQuantity += 1;
      newCart[idx].totalPrice =
        newCart[idx].itemQuantity * newCart[idx].itemUnitPrice -
        (newCart[idx].discount || 0);
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

  // --- Update cart item quantity ---
  const updateCartItem = (itemId, qty) => {
    setCart((prev) =>
      prev.map((it) =>
        it.item_id === itemId
          ? {
              ...it,
              itemQuantity: Number(qty),
              totalPrice:
                Number(qty) * it.itemUnitPrice - (it.discount || 0),
            }
          : it
      )
    );
  };

  const removeCartItem = (itemId) =>
    setCart(cart.filter((c) => c.item_id !== itemId));

  const subTotal = useMemo(
    () => cart.reduce((sum, i) => sum + i.totalPrice, 0),
    [cart]
  );
  const change = transactionType === "CASH" ? amountGiven - subTotal : 0;

  // --- Complete payment ---
  const handleCompletePayment = async () => {
    if (cart.length === 0) return alert("Add items to cart first");

    const transaction = {
      transactionType,
      cashierId: "CASH001",
      cashierName: "Priya Perera",
      customerId: null, // ✅ removed customer requirement
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
      setAmountGiven(0);
    } catch (err) {
      console.error(err);
      alert("Failed to save transaction");
    }
  };

  // --- Print invoice ---
  const handlePrint = () => {
    const printContents = printRef.current.innerHTML;
    const newWin = window.open("", "", "width=800,height=600");
    newWin.document.write(`
      <html>
        <head>
          <title>Invoice</title>
          <style>
            body { font-family: Arial, sans-serif; padding: 20px; }
            table { width: 100%; border-collapse: collapse; margin-top: 20px; }
            th, td { border: 1px solid #000; padding: 8px; text-align: left; }
            th { background-color: #f2f2f2; }
          </style>
        </head>
        <body>
          ${printContents}
        </body>
      </html>
    `);
    newWin.document.close();
    newWin.focus();
    newWin.print();
    newWin.close();
  };

  return (
    <div className={styles.container}>
      <h1>💳 Billing Page</h1>

      <div ref={printRef}>
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
                  {i.item_id} - {i.item_name} (Price: {i.item_price}, Stock:{" "}
                  {i.item_quantity})
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
              </tr>
            </thead>
            <tbody>
              {cart.length === 0 && (
                <tr>
                  <td colSpan="6">No items</td>
                </tr>
              )}
              {cart.map((i) => (
                <tr key={i.item_id}>
                  <td>{i.item_id}</td>
                  <td>{i.itemName}</td>
                  <td>{i.itemQuantity}</td>
                  <td>{i.itemUnitPrice}</td>
                  <td>{i.discount}</td>
                  <td>{i.totalPrice.toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Summary */}
          <p>Subtotal: {subTotal.toFixed(2)}</p>
          {transactionType === "CASH" && <p>Amount Given: {amountGiven}</p>}
          {transactionType === "CASH" && <p>Change: {change.toFixed(2)}</p>}
        </div>
      </div>

      {/* Actions */}
      <div className={styles.section}>
        <button onClick={handleCompletePayment}>💾 Save Payment</button>
        <button onClick={handlePrint}>🖨️ Print Invoice</button>
        <button
          onClick={() => {
            setCart([]);
            setAmountGiven(0);
          }}
        >
          🔄 New Transaction
        </button>
        <label>
          Transaction Type:
          <select
            value={transactionType}
            onChange={(e) => setTransactionType(e.target.value)}
          >
            <option value="CASH">Cash</option>
            <option value="CREDIT">Credit</option>
          </select>
        </label>
      </div>
    </div>
  );
}
