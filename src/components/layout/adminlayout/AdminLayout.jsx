import React from "react";

import "./AdminLayout.css";
import Header from "../header/Header";
import Footer from "../footer/Footer";
import Sidebar from "../sidebar/Sidebar";
import { Outlet } from "react-router-dom";


export default function AdminLayout() {

  return (
    <div className="admin-layout">
      <Sidebar />
      <div className="main-column">
        <Header />
        <main className="admin-content">
          <Outlet />
        </main>
        {/* <Footer /> */}
      </div>
    </div>
  );
}
