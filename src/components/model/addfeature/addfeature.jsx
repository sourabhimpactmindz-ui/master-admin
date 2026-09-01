import React from "react";
import { createPortal } from "react-dom";
import { Check, X } from "lucide-react";
import "./addfeature.css";
import { useFeatureAddMutation } from "@/api/featureApi";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

export default function AddFeatureModal({
  onClose,
  onUpdated,
}) {
 
    const [FeatureAdd] = useFeatureAddMutation()
  const {
    register,
    handleSubmit,
  } = useForm({
    
  });

  const handleadd = async (data) => {
    try {
      await FeatureAdd(
        data
      ).unwrap();

      toast.success("Feature added successfully");

      onUpdated?.();
      onClose?.();

    } catch (err) {
      console.log(err);
      toast.error(
        err?.data?.message || "Failed to add feature"
      );
    }
  };

  return createPortal(
    <div className="edit-feat-backdrop" onClick={onClose}>
      <div
        className="edit-feat-page"
        onClick={(e) => e.stopPropagation()}
      >
       

        <div className="edit-feat-header-row">
          <div className="edit-feat-breadcrumb">
            <span className="edit-feat-breadcrumb-current">
         Add Feature
            </span>
          </div>
        </div>

        <form
          className="edit-feat-card"
          onSubmit={handleSubmit(handleadd)}
        >
          <div className="form-group">
            <label htmlFor="featureName">
              Feature Name
            </label>

            <input
              id="name"
              type="text"
              placeholder="Enter feature name"
              {...register("name", {
                required: "Feature name is required",
              })}
            />
          </div>

          <div className="form-group">
            <label htmlFor="description">
              Description
            </label>

            <textarea
              id="description"
              rows={4}
              placeholder="Enter feature description"
              {...register("description", {
                required: "Description is required",
              })}
            />
          </div>

          <div className="form-actions">
            <button
              type="button"
              className="btn btn-cancel"
              onClick={onClose}
            >
              Cancel
            </button>

            <button
              type="submit"
              className="btn btn-update"
            >
              <Check size={15} />
              Add Feature
            </button>
          </div>
        </form>
      </div>
    </div>,
    document.body
  );
}