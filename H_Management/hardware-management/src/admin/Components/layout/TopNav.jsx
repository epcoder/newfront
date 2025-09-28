import React, { useState } from 'react';
import styles from './../styles/TopNav.module.css';
import { useNavigate } from 'react-router-dom';

const navItems = {
  Entities: ['Customer','Employees','User','Suppliers','Item Details'],
  Stocks: ['Stock finder','Stock Addition','Stock Transfer','Stock Deduction','Stock Valuation'],
   Sales: [
    'Customer Orders',
    'Sales Invoice',
    'Sales Return',
    
    
  ],
  Order : ['Create Order', 'Check Order', 'Reorder Suggestions', 'Upload Invoice'],
  Warranty:['Warranty Details', 'Warranty Claims'],
};

const TopNav = () => {
  const [activeDropdown, setActiveDropdown] = useState(null);
  const navigate = useNavigate();

  const toggleDropdown = (label) => {
    setActiveDropdown((prev) => (prev === label ? null : label));
  };

  const handleSelect = (label, option) => {
    const route = `/admin/${label.toLowerCase().replace(/\s+/g, '-')}/${option
      .toLowerCase()
      .replace(/\s+/g, '-')}`;
    navigate(route);
    setActiveDropdown(null);
  };

  return (
    <div className={styles.topnav}>
      {Object.entries(navItems).map(([label, options]) => (
        <div key={label} className={styles.dropdownWrapper}>
          <button className={styles.topButton} onClick={() => toggleDropdown(label)}>
            {label}
          </button>
          {activeDropdown === label && (
            <ul className={styles.dropdown}>
              {options.map((option) => (
                <li key={option} onClick={() => handleSelect(label, option)}>
                  {option}
                </li>
              ))}
            </ul>
          )}
        </div>
      ))}
    </div>
  );
};

export default TopNav;
