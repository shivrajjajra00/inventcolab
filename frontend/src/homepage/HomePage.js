import React, { useState } from "react";
import "../App.css";
import Resources from "../sideBar/Resources"
import AboutUs from "../sideBar/AboutUs";
import Project from "../sideBar/Project"
import Dashboard from "../sideBar/Dashboard";
import HandleInvoice from "../sideBar/HandleInvoice";




var baseUrl = "http://localhost:4040";

  function CreateUserForm() {
  const [content, setContent] = useState("Dashboard");
  const [activeItem, setActiveItem] = useState("Dashboard");

  const handleSidebarClick = (selectedContent) => {
    setContent(selectedContent);
    setActiveItem(selectedContent);
  };

  return (
    <>
      <div className="navbar">
        <ul>
          <li>
            <img
              src="https://styles.redditmedia.com/t5_99izx1/styles/profileIcon_ykendi29jkmb1.png?width=256&height=256&frame=1&auto=webp&crop=256:256,smart&s=36e3d35003607ceaa4ad0bc7e9f3fda840a0e4ef"
              alt="Invent colabs"
              height="50px"
              width="50px"
            ></img>
          </li>
        </ul>
      </div>
      <div style={{ display: "flex" }}>
        <div className="side_bar">
          <ul>
            <li onClick={() => handleSidebarClick("Dashboard")}><a style={{ cursor: 'pointer',color: activeItem === "Dashboard" ? "#6d38cf" : "#000" }}>Dashboard</a></li>
            <li onClick={() => handleSidebarClick("Invoice")}><a style={{ cursor: 'pointer', color: activeItem === "Invoice" ? "#6d38cf" : "#000", }}>Invoice</a></li>
            <li onClick={() => handleSidebarClick("Resources")}><a style={{ cursor: 'pointer', color: activeItem === "Resources" ? "#6d38cf" : "#000" }}>Resources</a></li>
            <li onClick={() => handleSidebarClick("Project")}><a style={{ cursor: 'pointer',color: activeItem === "Project" ? "#6d38cf" : "#000", }}>Project</a></li>
            <li onClick={() => handleSidebarClick("About Us")}><a style={{ cursor: 'pointer',color: activeItem === "About Us" ? "#6d38cf" : "#000", }}>About Us</a></li>
          </ul>
        </div>
        <div style={{ padding: "20px" }}>
         
          {content === "Dashboard" && <Dashboard/>}
          {content === "Invoice" && <HandleInvoice/>}
          {content === "Resources" && <Resources/>}
          {content === "Project" && <Project/>}
          {content === "About Us" && <AboutUs/>}
        </div>
      </div>
    </>
  );
}

export default CreateUserForm;

