import React, { useState } from "react";
import { createPortal } from "react-dom";
import { ChevronRight, Plus, X } from "lucide-react";
import "./addclient.css";
import { useAddClientMutation } from "@/api/dashboardApi";
import { toast } from "sonner";
import { useForm } from "react-hook-form";

export default function AddClient({ onClose, onCreated }) {
  const [clientName, setClientName] = useState("");
  const [email, setEmail] = useState("");
  const [addClient , {isLoading  : adding}] = useAddClientMutation()
  const {
    register,
    handleSubmit,
    formState : {errors}
  } = useForm()


  const handleCancel = () => {
    setClientName("");
    setEmail("");
    onClose?.();
  };

  const handleCreate = async(data) => {
    try{
    const res = await addClient(data).unwrap()

    if(res.status){
        toast.success("Client added successfully")
    }
      }catch(err){
        toast.error("Somthing went wrong")
      }
    onCreated?.(); 
    onClose?.();   
  };

  return createPortal(
 
    <div className="add-client-backdrop" onClick={onClose}>
      
      <div className="add-client-page" onClick={(e) => e.stopPropagation()}>
        <div className="add-client-content">
          <div className="add-client-header-row">
            <div className="breadcrumb">
              <span className="breadcrumb-link">Clients</span>
              <ChevronRight size={13} />
              <span className="breadcrumb-current">Add Client</span>
            </div>

          </div>

          <h3>Add New Client</h3>
          <p className="subtitle">Create a new client for the plugin platform.</p>

          <form className="add-client-card" onSubmit={handleSubmit(handleCreate)}>
            <div className="form-group">
              <label htmlFor="clientName">
                Client Name <span className="required">*</span>
              </label>
              <input
                id="clientName"
                type="text"
                placeholder="Enter client name"
                {...register("name")}
              />
            </div>

            <div className="form-group">
              <label htmlFor="email">
                Email Address <span className="required">*</span>
              </label>
              <input
                id="email"
                type="email"
                placeholder="Enter client email address"
                {...register("email")}
              />
            </div>

            <div className="form-actions">
              <button type="button" className="btn btn-cancel" onClick={handleCancel}>
                Cancel
              </button>
              <button type="submit" className="btn btn-create">
                <Plus size={15} />
                Create Client
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>,
    document.body 
  );
}