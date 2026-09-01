import React from "react";
import {
  LayoutGrid,
  Users,
  FolderKanban,
  Puzzle,
  Layers,
  Settings,
  LogOut,
} from "lucide-react";
import "./Sidebar.css";
import { NavLink, useNavigate } from "react-router-dom";

const navItems = [

  {
    label: "Overview",
    icon: LayoutGrid,
    path: "/admin/dashboard",
  },

  {
    label: "Clients",
    icon: Users,
    path: "/admin/client",
  },

  {
    label: "Projects",
    icon: FolderKanban,
    path: "/admin/projects",
  },

  {
    label: "Features",
    icon: Puzzle,
    path: "/admin/features",
  },

  {
    label: "Project Features",
    icon: Layers,
    path: "/admin/project-feature",
  },

  {
    label: "Settings",
    icon: Settings,
    path: "/admin/settings",
  },

];

export default function Sidebar() {
  const navigate = useNavigate()
   const logout = () => {
    // Token delete
    localStorage.removeItem("accessToken");

    // Login page par redirect
    navigate("/", {
      replace: true,
    });
  };
  return (
    <aside className="sidebar">
      <div className="sidebar-brand">
        <h1>Plugin DashBoard</h1>
        <span>Master Admin</span>
      </div>

      <ul className="nav-list">
        {navItems.map((item) => {
          const Icon = item.icon;

          return (
            <li key={item.path}>
              <NavLink
                to={item.path}
                className={({ isActive }) =>
                  `nav-item ${isActive ? "active" : ""}`
                }
              >
                <Icon size={16} />
                <span>{item.label}</span>
              </NavLink>
            </li>
          );
        })}
      </ul>

      <button
        className="logout-row"
        onClick={logout}
        type="button"
      >
        <LogOut size={16} />
        <span>Logout</span>
      </button>
    </aside>
  )
}
