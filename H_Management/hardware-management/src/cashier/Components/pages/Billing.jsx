import React, { useState, useEffect, useMemo } from "react";
import styles from "./Billing.module.css";
import { getAllItems } from "../../../Api/CA/ItemApi";
import { saveTransaction } from "../../../Api/CA/TransactionApi";

export default function BillingPage() {
  const [customerQuery, setCustomerQuery] = useState(""); // optional customer
  const [transactionDate, setTransactionDate] = useState(
    new Date().toISOString().slice(0, 16) // default to current datetime
  );

  // items
  const [itemQuery, setItemQuery] = useState("");
  const [itemSuggestions, setItemSuggestions] = useState([]);
  const [cart, setCart] = useState([]);
  const [allItems, setAllItems] = useState([]);

  // fetch all items once on load
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

  // filter item suggestions locally
  useEffect(() => {
    if (!itemQuery.trim()) return setItemSuggestions([]);
    const filtered = allItems.filter((it) =>
      it.item_name.toLowerCase().includes(itemQuery.toLowerCase())
    );
    setItemSuggestions(filtered);
  }, [itemQuery, allItems]);

  // add item to cart
  const addItemToCart = (item) => {
    const idx = cart.findIndex((c) => c.item_id === item.item_id);
    if (idx >= 0) {
      const newCart = [...cart];
      newCart[idx].qty = (newCart[idx].qty || 1) + 1;
      newCart[idx].total =
        newCart[idx].qty * Number(newCart[idx].item_price) -
        Number(newCart[idx].item_discount || 0);
      setCart(newCart);
    } else {
      setCart((prev) => [
        ...prev,
        {
          ...item,
          qty: 1,
          total: Number(item.item_price) - Number(item.item_discount || 0),
        },
      ]);
    }
    setItemQuery("");
    setItemSuggestions([]);
  };

  // update cart
  const updateCartItem = (itemId, updates) => {
    const newCart = cart.map((it) => {
      if (it.item_id !== itemId) return it;
      const updated = { ...it, ...updates };
      updated.qty = Number(updated.qty);
      updated.total =
        updated.qty * Number(updated.item_price) -
        Number(updated.item_discount || 0);
      return updated;
    });
    setCart(newCart);
  };

  const removeCartItem = (itemId) =>
    setCart(cart.filter((c) => c.item_id !== itemId));

  // totals
  const subtotal = useMemo(
    () => cart.reduce((sum, it) => sum + (it.total || 0), 0),
    [cart]
  );
  const grandTotal = subtotal.toFixed(2);

  // complete payment → save transaction
  const handleCompletePayment = async () => {
    if (cart.length === 0) return alert("Add items to cart first.");

    try {
      for (let it of cart) {
        const transaction = {
          cashierId: "CASHIER001", // replace with logged-in cashier
          cashierName: "John Doe", // replace with logged-in cashier
          transactionDate: new Date(transactionDate).toISOString(), // user-selected date
          itemName: it.item_name,
          itemQuantity: Number(it.qty),
          itemUnitPrice: Number(it.item_price)
        };

        await saveTransaction(transaction);
      }

      alert("Payment completed successfully!");
      setCart([]);
      setCustomerQuery("");
      setTransactionDate(new Date().toISOString().slice(0, 16));
    } catch (err) {
      console.error("Error saving transaction:", err.response || err);
      alert("Failed to save transaction.");
    }
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Billing</h1>

      {/* Optional Customer input */}
      <div className={styles.section}>
        <input
          placeholder="Enter customer name (optional)"
          value={customerQuery}
          onChange={(e) => setCustomerQuery(e.target.value)}
        />
      </div>

      {/* Transaction Date Picker */}
      <div className={styles.section}>
        <label>Transaction Date:</label>
        <input
          type="datetime-local"
          value={transactionDate}
          onChange={(e) => setTransactionDate(e.target.value)}
        />
      </div>

      {/* Item input */}
      <div className={styles.section}>
        <input
          placeholder="Search item"
          value={itemQuery}
          onChange={(e) => setItemQuery(e.target.value)}
        />
        {itemSuggestions.length > 0 && (
          <ul className={styles.suggestions}>
            {itemSuggestions.map((it) => (
              <li key={it.item_id} onClick={() => addItemToCart(it)}>
                {it.item_name} — {it.item_price} (Stock: {it.item_quantity})
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Cart table */}
      <div className={styles.section}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Item</th>
              <th>Qty</th>
              <th>Price</th>
              <th>Discount</th>
              <th>Total</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {cart.length === 0 && (
              <tr>
                <td colSpan="6" style={{ textAlign: "center" }}>
                  No items
                </td>
              </tr>
            )}
            {cart.map((it) => (
              <tr key={it.item_id}>
                <td>{it.item_name}</td>
                <td>
                  <input
                    type="number"
                    min="1"
                    value={it.qty}
                    onChange={(e) =>
                      updateCartItem(it.item_id, { qty: e.target.value })
                    }
                  />
                </td>
                <td>{it.item_price}</td>
                <td>
                  <input
                    type="number"
                    min="0"
                    value={it.item_discount || 0}
                    onChange={(e) =>
                      updateCartItem(it.item_id, {
                        item_discount: e.target.value,
                      })
                    }
                  />
                </td>
                <td>{it.total.toFixed(2)}</td>
                <td>
                  <button onClick={() => removeCartItem(it.item_id)}>
                    Remove
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Totals */}
      <div className={styles.section}>
        <div>Grand Total: {grandTotal}</div>
        <button onClick={handleCompletePayment}>Complete Payment</button>
      </div>
    </div>
  );
}
