import React, { useEffect, useState } from "react";
import { Search, Plus, Copy, Eye ,EyeOff, Trash2} from "lucide-react";
import "./createproject.css";
import { useGetProjectsQuery, useUpdateProjectMutation , useDeleteProjectMutation } from "@/api/projectApi";
import { toast } from "sonner";
import CreateProjectModal from "@/components/model/addproject/addproject";


export default function Projects() {
  const [projec, setProjects] = useState([]);
  const [search, setSearch] = useState("");
  const {data : response , isLoading} = useGetProjectsQuery()
  const [visibleKeys, setVisibleKeys] = useState({});
  const [updateProject] = useUpdateProjectMutation();
  const [showModel , setShowModel] = useState(false);
  const [deleteProject] = useDeleteProjectMutation();

const projects = response?.data || [];

  const isClientInactive =
  projects.clientId?.status === "inactive";

 const handleToggleStatus = async (project) => {
  const newStatus =
    project.status === "active" ? "disabled" : "active";

  try {
    await updateProject({
      projectId: project._id,
      status: newStatus,
    }).unwrap();

    setProjects((prev) =>
      prev.map((p) =>
        p._id === project._id
          ? { ...p, status: newStatus }
          : p
      )
    );

    toast.success("Status updated successfully");

  } catch (err) {
    console.log(err);
    toast.error(
      err?.data?.message || "Something went wrong"
    );
  }
};


  const handleToggleApiKey = (id) => {
  setVisibleKeys((prev) => ({
    ...prev,
    [id]: !prev[id],
  }));
};

const handleCopyKey = async (key) => {
  try {
    await navigator.clipboard.writeText(key);
    toast.success("API key copied!");
  } catch (error) {
    toast.error("Copy failed:", error);
  }
};

  const filteredProjects = projects.filter(
    (p) =>
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.client.toLowerCase().includes(search.toLowerCase()) ||
      p.domain.toLowerCase().includes(search.toLowerCase())
  );
  
const TOTAL_PROJECTS = filteredProjects.length;

const deleteProjects = async(projectId) => {
  try{
    const res = await deleteProject(projectId).unwrap();
    toast.success("Project deleted successfully");

  }catch(err){
    toast.error("Something went wrong")
  }
}

  return (
    <div className="projects-content">
      <div className="projects-header">
        <div>
          <h3>Projects</h3>
          <p className="subtitle">Manage projects for your clients.</p>
        </div>
       
        <button className="pro-btn pro-btn-primary" onClick={() => setShowModel(true)}>
          <Plus size={16} />
          Create Project
        </button>
      </div>

      <div className="projects-card">
        <div className="pro-search-box">
          <Search size={16} className="search-icon" />
          <input
            type="text"
            placeholder="Search projects..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <div className="projects-table-wrapper">
          <table className="projects-table">
            <thead>
              <tr>
                <th>Project Name</th>
                <th>Client</th>
                <th>Domain</th>
                <th>API Key</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredProjects.length === 0 && (
                <tr>
                
                  <td colSpan={6} className="pro-empty-row">
                    No projects found.
                  </td>
                </tr>
              )}

              {filteredProjects.map((project) => (
                <tr key={project._id}>
                  <td className="project-name-cell">{project.name}</td>
                  <td className="text-muted">{project.clientId?.name }</td>
                  <td className="text-muted">{project.domain}</td>
              <td>
  <div className="api-key-cell">

    <span className="api-key-text">
      {visibleKeys[project._id]
        ? project.apiKey
        : "••••••••••••••••"}
    </span>

    <button
      className="copy-btn"
      onClick={() => handleCopyKey(project.apiKey)}
      title="Copy API key"
    >
      <Copy size={13} />
    </button>

    <button
      className="copy-btn"
      onClick={() => handleToggleApiKey(project._id)}
      title={
        visibleKeys[project._id]
          ? "Hide API key"
          : "Show API key"
      }
    >
      {visibleKeys[project._id] ? (
        <EyeOff size={14} />
      ) : (
        <Eye size={14} />
      )}
    </button>

  </div>
</td>
                  <td>
                    <span
                      className={`status-badge ${
                        project.status === "active"
                          ? "status-active"
                          : "status-disabled"
                      }`}
                    >
                      {project.status === "active" ? "Active" : "Disabled"}
                    </span>
                  </td>
                  <td>
                    <div className="actions-cell">
                     
                     <button
  className={`toggle-switch ${
    project.status === "active" ? "toggle-on" : ""
  }`}
  disabled={isClientInactive}
  onClick={() => handleToggleStatus(project)}
  title={
    isClientInactive
      ? "Cannot change project status because client is inactive"
      : project.status === "active"
      ? "Deactivate project"
      : "Activate project"
  }
>
  <span className="toggle-thumb" />
</button>
                             <button
  className="action-btn delete-btn"
  onClick={() => deleteProjects(project._id)}
  title="Delete project"
>
  <Trash2 size={16} />
</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="projects-footer">
          <span className="results-count">
            Showing 1 to {filteredProjects.length} of {TOTAL_PROJECTS} projects
          </span>

          <div className="pager">
            <button className="pager-btn" disabled>
              Previous
            </button>
            <button className="pager-btn">Next</button>
          </div>
        </div>
      </div>
      
      {showModel && (
  <CreateProjectModal
    onClose={() => setShowModel(false)}
  />
)}
    </div>
  );
}