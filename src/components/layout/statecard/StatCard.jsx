import React from "react";
import "./StatCard.css";

export default function StatCard({ label, value, icon: Icon, color, bg }) {
  return (
    <div className="stat-card">
      <div className="stat-card-top">
        <span className="stat-label" style={{ color }}>
          {label}
        </span>
        <div className="stat-icon" style={{ background: bg }}>
          {Icon && <Icon size={14} style={{ color }} />}
        </div>
      </div>
      <div className="stat-value">{value}</div>
    </div>
  );
}
