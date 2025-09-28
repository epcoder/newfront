import React, { useState, useEffect } from "react";
import styles from "./WarrantyPage1.module.css";

const WarrantyForm = ({ onSubmit, warranty }) => {
  const [formData, setFormData] = useState({
    itemId: "",
    itemName: "",
    duration: "",
    startDate: "",
    claimed: false,
  });

  useEffect(() => {
    if (warranty) {
      // ✅ When editing, load warranty details (excluding warrantyId)
      const { warrantyId, ...rest } = warranty;
      setFormData(rest);
    } else {
      setFormData({
        itemId: "",
        itemName: "",
        duration: "",
        startDate: "",
        claimed: false,
      });
    }
  }, [warranty]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.itemId || !formData.itemName || !formData.duration || !formData.startDate) {
      alert("⚠ Please fill all fields");
      return;
    }
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      {/* Removed warrantyId field */}
      <input
        type="text"
        name="itemId"
        placeholder="Item ID"
        value={formData.itemId}
        onChange={handleChange}
        required
      />
      <input
        type="text"
        name="itemName"
        placeholder="Item Name"
        value={formData.itemName}
        onChange={handleChange}
        required
      />
      <input
        type="text"
        name="duration"
        placeholder="Duration (e.g., 6 months)"
        value={formData.duration}
        onChange={handleChange}
        required
      />
      <input
        type="date"
        name="startDate"
        value={formData.startDate}
        onChange={handleChange}
        required
      />
      <label>
        <input
          type="checkbox"
          name="claimed"
          checked={formData.claimed}
          onChange={handleChange}
        />{" "}
        Claimed
      </label>
      <button type="submit">Save Warranty</button>
    </form>
  );
};

export default WarrantyForm;
