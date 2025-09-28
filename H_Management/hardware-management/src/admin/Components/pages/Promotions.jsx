import React, { useState } from "react";
import styles from "./Promotions.module.css";

const Promotion = () => {
  const [search, setSearch] = useState("");
  const [items] = useState([
    { code: "ITM001", name: "Cement Bag", price: 1200 },
    { code: "ITM002", name: "Paint Bucket", price: 3500 },
    { code: "ITM003", name: "Steel Rod", price: 950 },
    { code: "ITM004", name: "Tile Pack", price: 4200 },
  ]);

  const [selectedItem, setSelectedItem] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [sellingPrice, setSellingPrice] = useState("");
  const [discount, setDiscount] = useState("");
  const [promotionList, setPromotionList] = useState([]);

  const handleSelectItem = (item) => {
    setSelectedItem(item);
    setSellingPrice(item.price);
    setQuantity(1);
    setDiscount(0);
    setSearch("");
  };

  const handleAddPromotion = (e) => {
    e.preventDefault();
    if (!selectedItem) return;

    const newPromo = {
      code: selectedItem.code,
      name: selectedItem.name,
      price: selectedItem.price,
      quantity,
      sellingPrice,
      discount,
    };

    setPromotionList([...promotionList, newPromo]);
    setSelectedItem(null);
    setQuantity(1);
    setSellingPrice("");
    setDiscount("");
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.heading}>Promotion Management</h2>

      {/* 🔍 Search Bar */}
      <input
        type="text"
        placeholder="Search item by name..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className={styles.searchBar}
      />

      {/* Search Results */}
      {search && (
        <ul className={styles.searchResults}>
          {items
            .filter((i) =>
              i.name.toLowerCase().includes(search.toLowerCase())
            )
            .map((item) => (
              <li
                key={item.code}
                onClick={() => handleSelectItem(item)}
                className={styles.resultItem}
              >
                {item.name} - Rs.{item.price}
              </li>
            ))}
        </ul>
      )}

      {/* 📋 Form for selected item */}
      {selectedItem && (
        <form onSubmit={handleAddPromotion} className={styles.form}>
          <div className={styles.formGroup}>
            <label>Code:</label>
            <input type="text" value={selectedItem.code} readOnly />
          </div>
          <div className={styles.formGroup}>
            <label>Name:</label>
            <input type="text" value={selectedItem.name} readOnly />
          </div>
          <div className={styles.formGroup}>
            <label>Price:</label>
            <input type="number" value={selectedItem.price} readOnly />
          </div>
          <div className={styles.formGroup}>
            <label>Quantity:</label>
            <input
              type="number"
              value={quantity}
              min="1"
              onChange={(e) => setQuantity(e.target.value)}
              required
            />
          </div>
          <div className={styles.formGroup}>
            <label>Selling Price:</label>
            <input
              type="number"
              value={sellingPrice}
              onChange={(e) => setSellingPrice(e.target.value)}
              required
            />
          </div>
          <div className={styles.formGroup}>
            <label>Discount (%):</label>
            <input
              type="number"
              value={discount}
              min="0"
              max="100"
              onChange={(e) => setDiscount(e.target.value)}
            />
          </div>
          <button type="submit" className={styles.addBtn}>
            ➕ Add to Promotion
          </button>
        </form>
      )}

      {/* 📊 Promotion Table */}
      {promotionList.length > 0 && (
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Code</th>
              <th>Name</th>
              <th>Price</th>
              <th>Quantity</th>
              <th>Selling Price</th>
              <th>Discount (%)</th>
            </tr>
          </thead>
          <tbody>
            {promotionList.map((promo, index) => (
              <tr key={index}>
                <td>{promo.code}</td>
                <td>{promo.name}</td>
                <td>Rs.{promo.price}</td>
                <td>{promo.quantity}</td>
                <td>Rs.{promo.sellingPrice}</td>
                <td>{promo.discount}%</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default Promotion;
