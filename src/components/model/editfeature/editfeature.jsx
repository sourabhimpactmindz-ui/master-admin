import React from "react";
import { createPortal } from "react-dom";
import { Check, X } from "lucide-react";
import "./editfeature.css";
import { useFeatureUpdateMutation } from "@/api/featureApi";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

export default function EditFeatureModal({
  feature,
  onClose,
  onUpdated,
}) {
  const [FeatureUpdate] = useFeatureUpdateMutation();

  const {
    register,
    handleSubmit,
  } = useForm({
    defaultValues: {
      name: feature?.name || "",
      description: feature?.description || "",
    },
  });

  const handleUpdate = async (data) => {
    try {
      await FeatureUpdate({
        featureId: feature._id,
        data: {
          name: data.name,
          description: data.description,
        },
      }).unwrap();

      toast.success("Feature updated successfully");

      onUpdated?.();
      onClose?.();

    } catch (err) {
      console.log(err);
      toast.error(
        err?.data?.message || "Failed to update feature"
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
              Edit Feature
            </span>
          </div>
        </div>

        <form
          className="edit-feat-card"
          onSubmit={handleSubmit(handleUpdate)}
        >
          <div className="form-group">
            <label htmlFor="featureName">
              Feature Name
            </label>

            <input
              id="featureName"
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
              Update Feature
            </button>
          </div>
        </form>
      </div>
    </div>,
    document.body
  );
}