import React, { useState,useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../App.css";
import Resources from "../sideBar/Resources";
import AboutUs from "../sideBar/AboutUs";
import Project from "../sideBar/Project";
import Dashboard from "../sideBar/Dashboard";
import HandleInvoice from "../sideBar/handleinvoice/HandleInvoice";

import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

var baseUrl = "http://localhost:4040";

const pages = [
  { name: "Dashboard" },
  { name: "Invoice" },
  { name: "Resources" },
  { name: "About Us" },
];

function HomePage() {
  let userId = "654b8a5b4901b2bdbb672c69";
  const [content, setContent] = useState("Dashboard");
  const [activeItem, setActiveItem] = useState(pages[0].name);

   const [userData, setUserData] = useState([]);
   const [isDropdownOpen, setIsDropdownOpen] = useState(false);

   const navigate = useNavigate(); // Access the history object for navigation
   const token = localStorage.getItem("token"); // Retrieve the JWT token

   useEffect(() => {
     // Check if a valid JWT token exists, otherwise redirect to the login page
     if (!token) {
       navigate("/login");
     }
   }, [token, navigate]);
   const handleSidebarClick = async (selectedContent, userId) => {
     setContent(selectedContent);
     setActiveItem(selectedContent);

     if (selectedContent === "Dashboard") {
       try {
         if (userId) {
           const response = await fetch(`${baseUrl}/user/${userId}`);
           if (response.ok) {
             const userData = await response.json();
             // alert(userData.userId)
             setUserData(userData.data);
           } else {
             console.error("Failed to fetch user data");
           }
         } else {
           console.error("userId is undefined");
         }
       } catch (error) {
         console.error("Error in fetchClientData:", error);
       }
     }
   };

   useEffect(() => {
     // Fetch user data when the component mounts (initial load)
     if (userId) {
       handleSidebarClick("Dashboard", userId);
     }
   }, [userId]);

   const toggleDropdown = () => {
     setIsDropdownOpen(!isDropdownOpen);
   };

   const handleLogout = () => {
     // Perform any logout-related actions here
     navigate("/"); // Navigate to the login page or the desired logout destination
     localStorage.removeItem("token");
   };

   const handleForgotPassword = () => {
     // Perform any logout-related actions here
     navigate("/forgotpassword"); // Navigate to the login page or the desired logout destination
   };  

  //  header handle  admin

     const HandleAdmin = ({ show, handleClose }) => {
       return (
         <Modal className="profile_model" show={show} onHide={handleClose}>
           <Modal.Header closeButton>
            
           </Modal.Header>

           <div className="admin_data">
            {userData && <span className="admin_name">{userData.name}</span>} <br/>
            {userData && <span className="text-right">{userData.email}</span>}
            <p className="text-right" >{userData.mobileNo}</p>
            <p className='btn text-right' onClick={() => handleForgotPassword()}>Change Password</p>
             <p className="btn btn-add text-right" onClick={handleLogout}>Logout</p>  

           </div>

           <div className="addclient_butto">
             <Button className="addclient_cancelbutto" variant="secondary"><span> Cancel</span></Button>
             <Button className="addclient_okbutto" variant="primary"> ok</Button>
           </div>

         </Modal>
       );
     };

   


  


  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        height: "100vh",
        overflow: "hidden",
      }}
    >
      <div className="navbar">
        <div className="header_navbar">
          <div className="header_image">
            <img
              src="https://styles.redditmedia.com/t5_99izx1/styles/profileIcon_ykendi29jkmb1.png?width=256&height=256&frame=1&auto=webp&crop=256:256,smart&s=36e3d35003607ceaa4ad0bc7e9f3fda840a0e4ef"
              alt="Invent colabs"
              height="50px"
              width="50px"
            ></img>
          </div>

          <div className="header_admin" onClick={toggleDropdown}>
            {userData && <span className="admin">{userData.name}</span>}<br />
            {userData && <span className="text-right">{userData.email}</span>} <br/>
            {<Button className="header_editbutton" type="button">Edit</Button> }
            {isDropdownOpen && ( <HandleAdmin show={true} handleClose={toggleDropdown} /> )}
          </div>
        </div>
      </div>
      <div style={{ display: "flex" }}>
        <div className="side_bar">
          {pages.map((item, index) => {
            return (
              <a
                onClick={() => handleSidebarClick(item.name)}
                style={{
                  cursor: "pointer",
                  color: activeItem === item.name ? "#6d38cf" : "#000",
                }}
              >
                {item.name}
              </a>
            );
          })}
        </div>
        <div className="page-content">
          {content === "Dashboard" && <Dashboard userData={userData} />}
          {content === "Invoice" && <HandleInvoice />}
          {content === "Resources" && <Resources />}
          {content === "Project" && <Project />}
          {content === "About Us" && <AboutUs />}
        </div>
      </div>
    </div>
  );
}

export default HomePage;
