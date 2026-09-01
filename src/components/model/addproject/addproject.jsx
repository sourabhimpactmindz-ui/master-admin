import React, { useState } from "react";
import { createPortal } from "react-dom";
import { ChevronRight, Plus, X } from "lucide-react";
import "./addproject.css";
import { useAddProjectMutation } from "@/api/projectApi";
import { toast } from "sonner";
import { useForm } from "react-hook-form";
import { useGelClientQuery } from "@/api/dashboardApi";


export default function CreateProjectModal({ onClose, onCreated }) {
  const [clientId, setClientId] = useState("");
  const [name, setProjectName] = useState("");
  const [domain, setDomain] = useState("");
  const [addProject] = useAddProjectMutation()
  const {data : response , isLoading} = useGelClientQuery()
  const {
    register,
    handleSubmit,

  } = useForm()
  const handleCancel = () => {
    setClientId("");
    setProjectName("");
    setDomain("");
    onClose?.();
  };

  const res = response?.data || [];


  const handleCreate = async(data) => {
    try{
    const res = await addProject(data).unwrap();
    if(res.status){
        toast.success("Project added successfully")
    }
    }catch(err){
        toast.error("something wents wrong")
    }
    onCreated?.();
    onClose?.();
  };

  return createPortal(
    <div className="create-project-backdrop" onClick={onClose}>
      <div className="create-project-card" onClick={(e) => e.stopPropagation()}>
        <div className="create-project-content">
          <div className="header-row">
            <div className="breadcrumb">
              <span className="breadcrumb-link">Projects</span>
              <ChevronRight size={13} />
              <span className="breadcrumb-current">Create Project</span>
            </div>
            <button type="button" className="close-btn" onClick={onClose}>
              <X size={18} />
            </button>
          </div>

          <h3>Create New Project</h3>
          <p className="subtitle">Create a project and assign it to a client.</p>

           <form
            className="create-project-form"
            onSubmit={handleSubmit(handleCreate)}
          >
            <div className="form-group">
  <label htmlFor="client">Client</label>

  <select
    id="client"
    defaultValue=""
    {...register("clientId", {
      required: "Please select a client",
    })}
  >
    {/* Placeholder */}
    <option value="" disabled>
      Select a client
    </option>

    {res.map((client) => (
      <option
        key={client._id}
        value={client._id}
        disabled={client.status === "inactive"}
      >
        {client.name}
        {client.status === "inactive"
          ? " (Inactive)"
          : ""}
      </option>
    ))}
  </select>
</div>

            <div className="form-group">
              <label htmlFor="projectName">Project Name</label>
              <input
                id="name"
                type="text"
                placeholder="Enter project name"
                {...register("name")}
              />
            </div>

            <div className="form-group">
              <label htmlFor="domain">Project Domain</label>
              <div className="domain-input-group">
                <span className="domain-prefix">https://</span>
                <input
                  id="domain"
                  type="text"
                  placeholder="example.com"
                  {...register("domain")}
                />
              </div>
            </div>

            <div className="form-actions">
              <button type="button" className="btn btn-cancel" onClick={handleCancel}>
                Cancel
              </button>
              <button type="submit" className="btn btn-create">
                <Plus size={15} />
                Create Project
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>,
    document.body
  );
}