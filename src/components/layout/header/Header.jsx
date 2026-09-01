import React from "react";
import { Bell, UserCircle } from "lucide-react";
import "./Header.css";

export default function Header() {
  return (
    <header className="topbar">
   
      <div className="topbar-icons">
        <Bell size={18} />
        <UserCircle size={18} />
      </div>
    </header>
  );
}
