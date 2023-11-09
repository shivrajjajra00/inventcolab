// Sidebar.js
import React, { useState } from 'react';
import DropdownMenu from './DropdownMenu'
import '../Sidebar.css';

const Sidebar = () => {
    const [isDropdownOpen, setDropdownOpen] = useState(false);

    const handleToggleDropdown = () => {
        setDropdownOpen(!isDropdownOpen);
    };

      const Sidebar = () => {
            return (
                <div className="sidebar">
                    <h2>Sidebar</h2>
                    {/* Add your sidebar content here */}
                </div>
            );
        };
  
};

export default Sidebar;
