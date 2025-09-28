// src/components/StockSummary/StockSummaryViewer.jsx
import React, { useEffect, useMemo, useState } from "react";
import styles from "./StockSummary.module.css";
import { getItems } from "../../../Api/MA/ItemApi"; // your existing API file

// helper: normalize a raw backend item to a predictable shape
const normalizeItem = (raw = {}, index = 0) => {
  // try several common keys used in backends
  const name =
    raw.itemName ??
    raw.name ??
    raw.item_name ??
    raw.productName ??
    raw.product_name ??
    raw.item ??
    "";
  const type =
    raw.itemType ??
    raw.type ??
    raw.category ??
    raw.item_type ??
    raw.itemCategory ??
    "";
  const brand =
    raw.itemBrand ??
    raw.brand ??
    raw.manufacturer ??
    raw.item_brand ??
    "";
  const stock =
    raw.stock ??
    raw.qty ??
    raw.quantity ??
    raw.qtyOnHand ??
    raw.quantityOnHand ??
    raw.available ??
    0;
  const id = raw.itemId ?? raw.id ?? raw._id ?? index;

  const nameDisplay = String(name ?? "").trim();
  const typeDisplay = String(type ?? "").trim();
  const brandDisplay = String(brand ?? "").trim();

  // keys for case-insensitive comparisons
  const nameKey = nameDisplay.toLowerCase();
  const typeKey = typeDisplay.toLowerCase();
  const brandKey = brandDisplay.toLowerCase();

  return {
    id,
    name: nameDisplay,
    nameKey,
    type: typeDisplay,
    typeKey,
    brand: brandDisplay,
    brandKey,
    stock: Number(stock ?? 0),
    raw, // keep raw around for debugging if needed
  };
};

const StockSummaryViewer = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState(""); // stores typeKey
  const [selectedBrand, setSelectedBrand] = useState(""); // stores brandKey
  const [selectedItem, setSelectedItem] = useState(""); // stores nameKey
  const [error, setError] = useState(null);

  // fetch + normalize on mount
  useEffect(() => {
    let mounted = true;
    const fetchItems = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await getItems();
        console.log("Raw items from backend:", res.data); // <-- inspect the shape in console
        const normalized = (res.data || []).map((r, i) => normalizeItem(r, i));
        if (mounted) {
          setItems(normalized);
        }
      } catch (err) {
        console.error("Error fetching items:", err);
        setError(err.message || "Failed to fetch items");
      } finally {
        if (mounted) setLoading(false);
      }
    };
    fetchItems();
    return () => (mounted = false);
  }, []);

  // When a parent selection changes, reset dependent selections
  useEffect(() => {
    setSelectedBrand("");
    setSelectedItem("");
  }, [selectedCategory]);

  useEffect(() => {
    setSelectedItem("");
  }, [selectedBrand]);

  // build unique category list (display + key) in order of appearance
  const categories = useMemo(() => {
    const map = new Map();
    items.forEach((it) => {
      if (it.typeKey) map.set(it.typeKey, it.type);
    });
    return Array.from(map, ([key, display]) => ({ key, display }));
  }, [items]);

  // brands filtered by current category (if any)
  const brands = useMemo(() => {
    const map = new Map();
    items
      .filter((it) => (selectedCategory ? it.typeKey === selectedCategory : true))
      .forEach((it) => {
        if (it.brandKey) map.set(it.brandKey, it.brand);
      });
    return Array.from(map, ([key, display]) => ({ key, display }));
  }, [items, selectedCategory]);

  // item names filtered by current category+brand
  const itemNames = useMemo(() => {
    const map = new Map();
    items
      .filter((it) => {
        if (selectedCategory && it.typeKey !== selectedCategory) return false;
        if (selectedBrand && it.brandKey !== selectedBrand) return false;
        return true;
      })
      .forEach((it) => {
        if (it.nameKey) map.set(it.nameKey, it.name);
      });
    return Array.from(map, ([key, display]) => ({ key, display }));
  }, [items, selectedCategory, selectedBrand]);

  // rows to display in table
  const filteredData = useMemo(() => {
    return items.filter((it) => {
      if (selectedCategory && it.typeKey !== selectedCategory) return false;
      if (selectedBrand && it.brandKey !== selectedBrand) return false;
      if (selectedItem && it.nameKey !== selectedItem) return false;
      return true;
    });
  }, [items, selectedCategory, selectedBrand, selectedItem]);

  if (loading) {
    return <div className={styles.container}>Loading items...</div>;
  }

  if (error) {
    return <div className={styles.container}>Error: {error}</div>;
  }

  return (
    <div className={styles.container}>
      <h2 className={styles.heading}>Stock Summary Viewer</h2>

      <div className={styles.filters}>
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
        >
          <option value="">-- Select Category --</option>
          {categories.map((c) => (
            <option key={c.key} value={c.key}>
              {c.display}
            </option>
          ))}
        </select>

        <select
          value={selectedBrand}
          onChange={(e) => setSelectedBrand(e.target.value)}
          disabled={!brands.length}
        >
          <option value="">-- Select Brand --</option>
          {brands.map((b) => (
            <option key={b.key} value={b.key}>
              {b.display}
            </option>
          ))}
        </select>

        <select
          value={selectedItem}
          onChange={(e) => setSelectedItem(e.target.value)}
          disabled={!itemNames.length}
        >
          <option value="">-- Select Item --</option>
          {itemNames.map((it) => (
            <option key={it.key} value={it.key}>
              {it.display}
            </option>
          ))}
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
          {filteredData.length ? (
            filteredData.map((item) => (
              <tr key={item.id}>
                <td>{item.name}</td>
                <td>{item.type}</td>
                <td>{item.brand}</td>
                <td>{item.stock}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4" className={styles.noData}>
                No items found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default StockSummaryViewer;
