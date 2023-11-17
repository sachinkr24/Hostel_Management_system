import React from "react";
import "../styles/LayoutStyles.css";
import { adminMenu, userMenu } from "./../Data/data";

import { Link, useLocation, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { Badge, message } from "antd";
const Layout = ({ children }) => {
  const { user } = useSelector((state) => state.user);
  const location = useLocation();
  const navigate = useNavigate();
  // logout funtion
  const handleLogout = () => {
    localStorage.clear();
    message.success("Logout Successfully");
    navigate("/login");
  };

  const WardenMenu = [
    {
      name: "Home",
      path: "/",
      icon: "fa-solid fa-house",
    },
    {
      name: "Complaints",
      path: "/complaints",
      icon: "fa-solid fa-list",
    },
    
    {
      name: "Profile",
      path: `/warden/profile/${user?._id}`,
      icon: "fa-solid fa-user",
    },
    {
      name: "Notice Board",
      path: "/Notice",
      icon: "fa-regular fa-file",
    },
    {
      name: "Upload notice",
      path: "/UploadNotice",
      icon: "fa-regular fa-file",
    },
  ];

  // redering menu list
  const SidebarMenu = user?.isAdmin
 ? adminMenu 
 : user?.isWarden
 ?WardenMenu
 : userMenu;
  return (
    <>
      <div className="main">
        <div className="layout">
          <div className="sidebar">
            <div className="logo">
              <h6>Hostel Mangement System</h6>
              <hr />
            </div>
            <div className="menu">
              {SidebarMenu.map((menu) => {
                const isActive = location.pathname === menu.path;
                return (
                  <>
                    <div className={`menu-item ${isActive && "active"}`}>
                      <i className={menu.icon}></i>
                      <Link to={menu.path}>{menu.name}</Link>
                    </div>
                  </>
                );
              })}
              <div className={`menu-item `} onClick={handleLogout}>
                <i className="fa-solid fa-right-from-bracket"></i>
                <Link to="/login">Logout</Link>
              </div>
            </div>
          </div>
          <div className="content">
            <div className="header">
              <div className="header-content" style={{cursor:"pointer"}}>
                <Badge count={user && user.notification.length} onClick={()=>{navigate('/notification')}} >
                  <i class="fa-solid fa-bell"></i>
                </Badge>

                <Link to="/profile">{user?.name}</Link>
              </div>
            </div>
            <div className="body">{children}</div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Layout;