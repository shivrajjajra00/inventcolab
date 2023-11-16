import React, { useState } from "react";

import "../App.css";
import Resources from "../sideBar/Resources";
import AboutUs from "../sideBar/AboutUs";
import Project from "../sideBar/Project";
import Dashboard from "../sideBar/Dashboard";
import HandleInvoice from "../sideBar/handleinvoice/HandleInvoice";

var baseUrl = "http://localhost:4040";

const pages = [
  { name: "Dashboard" },
  { name: "Invoice" },
  { name: "Resources" },
  { name: "About Us" },
];

function HomePage() {
  const [content, setContent] = useState("Dashboard");
  const [activeItem, setActiveItem] = useState(pages[0].name);

  const handleSidebarClick = (selectedContent) => {
    setContent(selectedContent);
    setActiveItem(selectedContent);
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
        <img
          src="https://styles.redditmedia.com/t5_99izx1/styles/profileIcon_ykendi29jkmb1.png?width=256&height=256&frame=1&auto=webp&crop=256:256,smart&s=36e3d35003607ceaa4ad0bc7e9f3fda840a0e4ef"
          alt="Invent colabs"
          height="50px"
          width="50px"
        />
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
          {content === "Dashboard" && <Dashboard />}
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
