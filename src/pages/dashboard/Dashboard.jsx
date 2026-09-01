import React from "react";
import { Users, FolderKanban, LayoutGrid, Puzzle } from "lucide-react";
import "./Dashboard.css";
import StatCard from "@/components/layout/statecard/StatCard";
import { useDashboardOverQuery } from "@/api/dashboardApi";

export default function Dashboard() {
  const {data , isLoading} = useDashboardOverQuery();
  const overview = data?.data 

  return (
    <div className="dashboard-content">
      <h3>Dashboard</h3>
      <p className="subtitle">Overview of your plugin platform.</p>

       <div className="dashboard-cards">

              <StatCard
    label="Total Clients"
    value={overview?.totalsClient || 0}
    icon={Users}
/>


                <StatCard
                    label="Total Projects"
                    value={
                        overview?.totalProjects || 0
                    }
                    icon={FolderKanban}
                />


                <StatCard
                    label="Active Projects"
                    value={
                        overview?.activeProject || 0
                    }
                    icon={LayoutGrid}
                />


                <StatCard
                    label="Available Features"
                    value={
                        overview?.ActiveFeature
 || 0
                    }
                    icon={Puzzle}
                />

            </div>

        </div>
  );
}
