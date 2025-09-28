import React, { useState, useEffect } from 'react';
import styles from './WarrantyPage.module.css';

const WarrantyModal = ({ onClose, onSave, defaultValues }) => {
  const [form, setForm] = useState({
    warrantyId: '',
    name: '',
    type: 'Warranty',
    duration: '',
    description: '',
  });

  useEffect(() => {
    if (defaultValues) setForm(defaultValues);
  }, [defaultValues]);

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    if (!form.warrantyId || !form.name || !form.duration) {
      alert('Please fill all required fields.');
      return;
    }
    onSave(form);
  };

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modal}>
        <h3>{defaultValues ? 'Edit' : 'Add'} Warranty/Guaranty</h3>
        <input
          name="warrantyId"
          placeholder="Warranty ID"
          value={form.warrantyId}
          onChange={handleChange}
          disabled={!!defaultValues} // Lock ID during edit
        />
        <input
          name="name"
          placeholder="Name"
          value={form.name}
          onChange={handleChange}
        />
        <select name="type" value={form.type} onChange={handleChange}>
          <option value="Warranty">Warranty</option>
          <option value="Guaranty">Guaranty</option>
        </select>
        <input
          name="duration"
          type="number"
          placeholder="Duration (months)"
          value={form.duration}
          onChange={handleChange}
        />
        <input
          name="description"
          placeholder="Description"
          value={form.description}
          onChange={handleChange}
        />
        <div className={styles.modalButtons}>
          <button onClick={handleSubmit}>Save</button>
          <button className={styles.close} onClick={onClose}>Cancel</button>
        </div>
      </div>
    </div>
  );
};

export default WarrantyModal;
