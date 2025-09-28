import React, { useState, useEffect, useMemo } from "react";
import styles from "./Billing.module.css";
import { getAllItems } from "../../../Api/CA/ItemApi";
import { saveTransaction } from "../../../Api/CA/TransactionApi";

export default function BillingPage() {
  const [itemQuery, setItemQuery] = useState("");
  const [itemSuggestions, setItemSuggestions] = useState([]);
  const [cart, setCart] = useState([]);
  const [allItems, setAllItems] = useState([]);
  const [transactionType, setTransactionType] = useState("SALE");

  // Fetch all items
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

  // Filter item suggestions
  useEffect(() => {
    if (!itemQuery.trim()) return setItemSuggestions([]);
    const filtered = allItems.filter((it) =>
      it.item_name.toLowerCase().includes(itemQuery.toLowerCase())
    );
    setItemSuggestions(filtered);
  }, [itemQuery, allItems]);

  const addItemToCart = (item) => {
    const idx = cart.findIndex((c) => c.item_id === item.item_id);
    if (idx >= 0) {
      const newCart = [...cart];
      newCart[idx].qty += 1;
      setCart(newCart);
    } else {
      setCart((prev) => [
        ...prev,
        {
          item_id: item.item_id,
          itemName: item.item_name,
          itemQuantity: 1,
          itemUnitPrice: item.item_price,
          itemCostPrice: item.item_cost_price || 0,
        },
      ]);
    }
    setItemQuery("");
    setItemSuggestions([]);
  };

  const updateCartItem = (itemId, updates) => {
    setCart((prev) =>
      prev.map((it) =>
        it.item_id === itemId
          ? {
              ...it,
              ...updates,
              itemQuantity: Number(updates.itemQuantity || it.itemQuantity),
            }
          : it
      )
    );
  };

  const removeCartItem = (itemId) =>
    setCart(cart.filter((c) => c.item_id !== itemId));

  const grandTotal = useMemo(() => {
    return cart.reduce(
      (sum, it) => sum + it.itemQuantity * it.itemUnitPrice,
      0
    );
  }, [cart]);

  const handleCompletePayment = async () => {
    if (cart.length === 0) return alert("Add items to cart first.");

    const transaction = {
      transactionType,
      cashierId: "CASH001",
      cashierName: "Priya Perera",
      transactionDate: new Date().toISOString(),
      items: cart,
    };

    try {
      console.log("Saving transaction:", transaction);
      await saveTransaction(transaction);
      alert("Payment completed successfully!");
      setCart([]);
    } catch (err) {
      console.error("Error saving transaction:", err.response?.data || err);
      alert("Failed to save transaction.");
    }
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Billing</h1>

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

      <div className={styles.section}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Item</th>
              <th>Qty</th>
              <th>Price</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {cart.length === 0 && (
              <tr>
                <td colSpan="4" style={{ textAlign: "center" }}>
                  No items
                </td>
              </tr>
            )}
            {cart.map((it) => (
              <tr key={it.item_id}>
                <td>{it.itemName}</td>
                <td>
                  <input
                    type="number"
                    min="1"
                    value={it.itemQuantity}
                    onChange={(e) =>
                      updateCartItem(it.item_id, { itemQuantity: e.target.value })
                    }
                  />
                </td>
                <td>{it.itemUnitPrice}</td>
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

      <div className={styles.section}>
        <div>Grand Total: {grandTotal}</div>
        <button onClick={handleCompletePayment}>Complete Payment</button>
      </div>
    </div>
  );
}