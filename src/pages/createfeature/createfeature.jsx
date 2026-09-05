import React, { useEffect, useState } from "react";
import { Plus, Pencil, Zap, Trash2, ChevronLeft, ChevronRight } from "lucide-react";
import "./createfeature.css";
import { useGetFeatureQuery, useFeatureStatusMutation , useFeatureDeleteMutation } from "@/api/featureApi";
import { getFeatureIcon } from "@/utils/featureIcon";
import { toast } from "sonner"
import EditFeatureModal from "@/components/model/editfeature/editfeature";
import AddFeatureModal from "@/components/model/addfeature/addfeature";
export default function Features() {
    // const [featur, setFeatures] = useState([]);
    const [page , setPage] = useState(1);
    const limit = 6 

    const { data: response, isLoading } = useGetFeatureQuery({page , limit});
    const [featureStatus] = useFeatureStatusMutation();
    const [FeatureDelete] = useFeatureDeleteMutation();
    const [ShowEditModel , setShowEditModel] = useState(false);
    const [ShowAddFeatureModel , setShowAddFeatureModel] = useState(false);
    const [selectedFeature , setSelectedFeature] = useState(null);

   const features = response?.data || [];
    const pagination = response?.pagination || { page: 1, limit, total: 0, totalPages: 1 };
    const handleToggleStatus = async (feature) => {

        const newStatus = feature.status === "active" ? "inactive" : "active";
        try {
            await featureStatus({ featureId: feature._id, status: newStatus }).unwrap()
            // setFeatures((prev) =>
            //     prev.map((f) =>
            //         f._id === feature._id
            //             ? {
            //                 ...f,
            //                 status:
            //                     f.status === "active"
            //                         ? "inactive"
            //                         : "active",
            //             }
            //             : f
            //     )
            // );
            toast.success("Status updated successfully")
        } catch (err) {
            toast.error("Something went wrong")
        }

    };

    if (isLoading) {
        return <div>Loading...</div>;
    }

    const handleDeleteFeature = async(featureId) => {
        try {
            await FeatureDelete(featureId).unwrap();
            toast.success("Feature deleted successfully");

            if(features.length === 1 && page > 1){
                setPage((p) => p - 1);
            }
        }catch(err){
            toast.error("Something went wrong")
        }
    }

    return (
        <div className="feat-content">
            <div className="feat-header">
                <div>
                    <h3>Features</h3>
                    <p className="subtitle">
                        Create and manage available plugin features.
                    </p>
                </div>

                <button className="feat-btn feat-btn-primary" onClick={() => setShowAddFeatureModel(true)}>
                    <Plus size={16} />
                    Add Feature
                </button>
            </div>

            <div className="feat-card">
                <div className="feat-table-wrapper">
                    <table className="feat-table">
                        <thead>
                            <tr>
                                <th>Feature Name</th>
                                <th>Description</th>
                                <th>Status</th>
                                <th>Actions</th>
                            </tr>
                        </thead>

                        <tbody>
                            {features.length === 0 && (
                                <tr>
                                    <td colSpan={4} className="feat-empty-row">
                                        No features found.
                                    </td>
                                </tr>
                            )}

                            {features.map((feature) => {
                                const Icon =
                                    getFeatureIcon(feature.name) || Zap;

                                return (
                                    <tr key={feature._id}>
                                        <td>
                                            <div className="feature-name-cell">
                                                <span className="feature-icon">
                                                    <Icon size={16} />
                                                </span>

                                                <span>{feature.name}</span>
                                            </div>
                                        </td>

                                        <td className="text-muted feature-description">
                                            {feature.description}
                                        </td>

                                        <td>
                                            <span
                                                className={`feat-status-badge ${feature.status === "active"
                                                        ? "feat-status-active"
                                                        : "feat-status-inactive"
                                                    }`}
                                            >
                                                <span className="feat-status-dot" />

                                                {feature.status === "active"
                                                    ? "Active"
                                                    : "Inactive"}
                                            </span>
                                        </td>

                                        <td>
                                            <div className="feat-actions-cell">
                                                <button
                                                    className={`feat-toggle-switch ${feature.status === "active"
                                                            ? "feat-toggle-on"
                                                            : ""
                                                        }`}
                                                    onClick={() =>
                                                        handleToggleStatus(feature)
                                                    }
                                                >
                                                    <span className="feat-toggle-thumb" />
                                                </button>

                                                <button
                                                    className="feat-icon-btn"
                                                    title="Edit feature"
                                                    onClick={() => {
                                                        setSelectedFeature(feature);
                                                        setShowEditModel(true);
                                                    }}
                                                >
                                                    <Pencil size={15} />
                                                </button>
                                                <button
                                                    className="action-btn delete-btn"
                                                      onClick={() => handleDeleteFeature(feature._id)}
                                                    title="Delete project"
                                                >
                                                    <Trash2 size={16} />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
               
                {pagination.totalPages > 1 && (

                    <div className="feat-pagination">

                        <button
                            className="feat-icon-btn"
                            onClick={() => setPage((p) => Math.max(p - 1, 1))}
                            disabled={page <= 1}
                        >
                            <ChevronLeft size={16} />
                        </button>

                        <span>
                            Page {pagination.page} of {pagination.totalPages}
                        </span>

                        <button
                            className="feat-icon-btn"
                            onClick={() =>
                                setPage((p) => Math.min(p + 1, pagination.totalPages))
                            }
                            disabled={page >= pagination.totalPages}
                        >
                            <ChevronRight size={16} />
                        </button>

                    </div>

                )}

            </div>
            {ShowEditModel && (
                <EditFeatureModal
                    feature={selectedFeature}
                    onClose={() => setShowEditModel(false)}
                />
            )}

            {ShowAddFeatureModel && (
                <AddFeatureModal onClose={() => setShowAddFeatureModel(false)} />
            )}
        </div>
    );
}