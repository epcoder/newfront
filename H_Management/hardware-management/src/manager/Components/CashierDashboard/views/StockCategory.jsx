import React, { useState, useEffect } from 'react';
import styles from './StockCategory.module.css';

const CategoryBrandManager = () => {
  const [categories, setCategories] = useState([]);
  const [newCategoryName, setNewCategoryName] = useState('');
  const [newCategoryDesc, setNewCategoryDesc] = useState('');
  const [categoryError, setCategoryError] = useState('');
  const [editingCategoryId, setEditingCategoryId] = useState(null);
  const [editedCategory, setEditedCategory] = useState({ name: '', description: '' });

  const [brands, setBrands] = useState([]);
  const [newBrandName, setNewBrandName] = useState('');
  const [brandError, setBrandError] = useState('');
  const [editingBrandId, setEditingBrandId] = useState(null);
  const [editedBrandName, setEditedBrandName] = useState('');

  const [showBrandForm, setShowBrandForm] = useState(false);
  const [selectedCategoryForBrand, setSelectedCategoryForBrand] = useState(null);

  useEffect(() => {
    const initialCategories = [
      { _id: '1', name: 'Electrical', description: 'Electrical items' },
      { _id: '2', name: 'Plumbing', description: 'Plumbing items' },
    ];
    const initialBrands = [
      { _id: 'b1', name: 'Makita', categoryIds: ['1'] },
      { _id: 'b2', name: 'Kohler', categoryIds: ['2'] },
    ];
    setCategories(initialCategories);
    setBrands(initialBrands);
  }, []);

  const handleAddCategory = (e) => {
    e.preventDefault();
    if (!newCategoryName.trim()) {
      setCategoryError('Category name is required');
      return;
    }
    setCategoryError('');
    const newCat = {
      _id: Date.now().toString(),
      name: newCategoryName.trim(),
      description: newCategoryDesc.trim(),
    };
    setCategories((prev) => [...prev, newCat]);
    setNewCategoryName('');
    setNewCategoryDesc('');
  };

  const handleEditCategory = (cat) => {
    setEditingCategoryId(cat._id);
    setEditedCategory({ name: cat.name, description: cat.description });
  };

  const handleSaveCategory = (id) => {
    if (!editedCategory.name.trim()) {
      setCategoryError('Name cannot be empty');
      return;
    }
    setCategories((prev) =>
      prev.map((cat) =>
        cat._id === id ? { ...cat, name: editedCategory.name, description: editedCategory.description } : cat
      )
    );
    setEditingCategoryId(null);
    setEditedCategory({ name: '', description: '' });
    setCategoryError('');
  };

  const handleDeleteCategory = (id) => {
    setCategories((prev) => prev.filter((cat) => cat._id !== id));
    setBrands((prev) => prev.filter((b) => !b.categoryIds.includes(id)));
  };

  const openBrandForm = (category) => {
    setSelectedCategoryForBrand(category);
    setNewBrandName('');
    setBrandError('');
    setShowBrandForm(true);
  };

  const handleAddBrand = (e) => {
    e.preventDefault();
    if (!newBrandName.trim()) {
      setBrandError('Brand name is required');
      return;
    }

    const exists = brands.some(
      (b) => b.name.toLowerCase() === newBrandName.trim().toLowerCase()
    );
    if (exists) {
      setBrandError('Brand with this name already exists');
      return;
    }

    const newBrand = {
      _id: Date.now().toString(),
      name: newBrandName.trim(),
      categoryIds: [selectedCategoryForBrand._id],
    };

    setBrands((prev) => [...prev, newBrand]);
    setShowBrandForm(false);
  };

  const handleEditBrand = (brand) => {
    setEditingBrandId(brand._id);
    setEditedBrandName(brand.name);
  };

  const handleSaveBrand = (id) => {
    if (!editedBrandName.trim()) {
      setBrandError('Brand name is required');
      return;
    }
    setBrands((prev) =>
      prev.map((b) =>
        b._id === id ? { ...b, name: editedBrandName.trim() } : b
      )
    );
    setEditingBrandId(null);
    setEditedBrandName('');
  };

  const handleDeleteBrand = (brandId) => {
    setBrands((prev) => prev.filter((b) => b._id !== brandId));
  };

  return (
    <div className={styles.container}>
      <h1>Category & Brand Manager</h1>

      <form className={styles.form} onSubmit={handleAddCategory}>
        <h2>Add Category</h2>
        <input
          type="text"
          placeholder="Category Name"
          value={newCategoryName}
          onChange={(e) => setNewCategoryName(e.target.value)}
          className={styles.input}
        />
        <textarea
          placeholder="Description (optional)"
          value={newCategoryDesc}
          onChange={(e) => setNewCategoryDesc(e.target.value)}
          className={styles.textarea}
        />
        {categoryError && <p className={styles.error}>{categoryError}</p>}
        <button type="submit" className={styles.btn}>
          Add Category
        </button>
      </form>

      <h2>Categories</h2>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>Name</th>
            <th>Description</th>
            <th>Actions</th>
            <th>Brands</th>
          </tr>
        </thead>
        <tbody>
          {categories.map((cat) => (
            <tr key={cat._id}>
              <td>
                {editingCategoryId === cat._id ? (
                  <input
                    value={editedCategory.name}
                    onChange={(e) =>
                      setEditedCategory((prev) => ({ ...prev, name: e.target.value }))
                    }
                    className={styles.inputSmall}
                  />
                ) : (
                  cat.name
                )}
              </td>
              <td>
                {editingCategoryId === cat._id ? (
                  <input
                    value={editedCategory.description}
                    onChange={(e) =>
                      setEditedCategory((prev) => ({ ...prev, description: e.target.value }))
                    }
                    className={styles.inputSmall}
                  />
                ) : (
                  cat.description
                )}
              </td>
              <td>
                {editingCategoryId === cat._id ? (
                  <button onClick={() => handleSaveCategory(cat._id)} className={styles.btnMini}>
                    Save
                  </button>
                ) : (
                  <>
                    <button onClick={() => openBrandForm(cat)} className={styles.btnMini}>+Brand</button>
                    <button onClick={() => handleEditCategory(cat)} className={styles.btnMini}>Edit</button>
                    <button onClick={() => handleDeleteCategory(cat._id)} className={styles.btnMiniDanger}>
                      Delete
                    </button>
                  </>
                )}
              </td>
              <td>
                {brands
                  .filter((b) => b.categoryIds.includes(cat._id))
                  .map((brand) =>
                    editingBrandId === brand._id ? (
                      <span key={brand._id}>
                        <input
                          value={editedBrandName}
                          onChange={(e) => setEditedBrandName(e.target.value)}
                          className={styles.inputSmall}
                        />
                        <button onClick={() => handleSaveBrand(brand._id)} className={styles.btnMini}>
                          ✔
                        </button>
                      </span>
                    ) : (
                      <span key={brand._id} className={styles.brandTag}>
                        {brand.name}
                        <button onClick={() => handleEditBrand(brand)} className={styles.editIcon}>✏️</button>
                        <button onClick={() => handleDeleteBrand(brand._id)} className={styles.deleteIcon}>🗑️</button>
                      </span>
                    )
                  )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Brand Form Modal */}
      {showBrandForm && (
        <div className={styles.modalBackdrop}>
          <div className={styles.modal}>
            <h2>Add Brand for "{selectedCategoryForBrand.name}"</h2>
            <form onSubmit={handleAddBrand}>
              <input
                type="text"
                placeholder="Brand Name"
                value={newBrandName}
                onChange={(e) => setNewBrandName(e.target.value)}
                className={styles.input}
              />
              {brandError && <p className={styles.error}>{brandError}</p>}
              <button type="submit" className={styles.btn}>
                Save Brand
              </button>
              <button
                type="button"
                className={styles.cancelBtn}
                onClick={() => setShowBrandForm(false)}
              >
                Cancel
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default CategoryBrandManager;
