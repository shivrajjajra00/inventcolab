import React, { useState, useEffect } from 'react';
import { MdClose } from 'react-icons/md';
import '../App.css';
import { useNavigate } from 'react-router-dom';

var baseUrl = "http://localhost:4040";

function CreateUserForm() {

    const [isSidebarOpen, setSidebarOpen] = useState(false);

    const toggleSidebar = () => {
        setSidebarOpen(!isSidebarOpen);
    };

    return (
        <>
            <div className="navbar">

                <ul>
                    <li><img src="https://styles.redditmedia.com/t5_99izx1/styles/profileIcon_ykendi29jkmb1.png?width=256&height=256&frame=1&auto=webp&crop=256:256,smart&s=36e3d35003607ceaa4ad0bc7e9f3fda840a0e4ef" alt="Invent colabs" height="50px" width="50px"></img></li>
                </ul>
            </div>

            <div className={`sidebar-toggle ${isSidebarOpen ? 'open' : ''}`} onClick={toggleSidebar}>
                <MdClose />
            </div>


            < div className={`sidebar ${isSidebarOpen ? 'open' : ''}`}>
                <h2>Sidebar</h2>
                <ul>
                    <li>Home</li>
                    <li>About</li>
                    <li className="dropdown">
                        Services
                        <ul className="dropdown-content">
                        </ul>
                    </li>
                    <li>Contact</li>
                </ul>
            </div >
        </>

    );
}

// function Sidebar() {
//   // Add state to manage the sidebar visibility
//   const [isSidebarOpen, setSidebarOpen] = useState(false);

//   // Function to toggle the sidebar
//   const toggleSidebar = () => {
//     setSidebarOpen(!isSidebarOpen);
//   };

//   return (
//     <>
//       {/* Sidebar Button */}
//       <div className={`sidebar-toggle ${isSidebarOpen ? 'open' : ''}`} onClick={toggleSidebar}>
//         <MdClose />
//       </div>

//       {/* Sidebar Content */}
//       <div className={`sidebar ${isSidebarOpen ? 'open' : ''}`}>
//         <h2>Sidebar</h2>
//         {/* Add your sidebar content here */}
//       </div>
//     </>
//   );
// }

export default CreateUserForm;
