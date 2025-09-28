import React, { useEffect, useState } from "react";
import styles from "./WarrantyPage1.module.css";
import WarrantyForm from "./WarrantyForm";
import {
  getAllWarranties,
  addWarrantyApi,
  updateWarrantyApi,
} from "../../../Api/AA/WarrantyApi"; // ✅ adjust path

const WarrantyPage = () => {
  const [warranties, setWarranties] = useState([]);
  const [selectedWarranty, setSelectedWarranty] = useState(null);
  const [message, setMessage] = useState("");

  // ✅ Load all warranties
  const fetchWarranties = async () => {
    try {
      const res = await getAllWarranties();
      setWarranties(res.data);
    } catch (error) {
      console.error("❌ Error fetching warranties", error);
    }
  };

  useEffect(() => {
    fetchWarranties();
  }, []);

  // ✅ When user clicks Edit
  const handleEdit = (warranty) => {
    // pass everything except warrantyId to the form
    setSelectedWarranty({
      itemId: warranty.itemId,
      itemName: warranty.itemName,
      duration: warranty.duration,
      startDate: warranty.startDate,
      claimed: warranty.claimed,
      warrantyId: warranty.warrantyId, // keep it hidden, needed for update
    });
  };

  // ✅ Submit form (add or update)
  const handleSubmit = async (formData) => {
    try {
      if (formData.warrantyId) {
        // update existing
        await updateWarrantyApi(formData);
        setMessage("✅ Warranty updated successfully");
      } else {
        // add new (no warrantyId sent → backend will generate)
        await addWarrantyApi(formData);
        setMessage("✅ Warranty added successfully");
      }
      setSelectedWarranty(null);
      fetchWarranties();
    } catch (error) {
      console.error("❌ Error submitting warranty", error);
      setMessage("❌ Failed to submit warranty");
    }
  };

  return (
    <div className={styles.container}>
      <h2>Warranty Claim Management</h2>

      {message && <p className={styles.message}>{message}</p>}

      {/* ✅ WarrantyForm will not display warrantyId field */}
      <WarrantyForm onSubmit={handleSubmit} warranty={selectedWarranty} />

      <table className={styles.table}>
        <thead>
          <tr>
            <th>Warranty ID</th>
            <th>Item ID</th>
            <th>Item Name</th>
            <th>Duration</th>
            <th>Start Date</th>
            <th>Claimed</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {warranties.map((w) => (
            <tr key={w.warrantyId}>
              <td>{w.warrantyId}</td> {/* ✅ shown only in table */}
              <td>{w.itemId}</td>
              <td>{w.itemName}</td>
              <td>{w.duration}</td>
              <td>{w.startDate}</td>
              <td>{w.claimed ? "Yes" : "No"}</td>
              <td>
                <button onClick={() => handleEdit(w)}>Edit</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default WarrantyPage;
