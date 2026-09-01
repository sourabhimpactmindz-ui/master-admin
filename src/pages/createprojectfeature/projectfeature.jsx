import React, { useState } from "react";
import {
    ChevronDown,
    Check,
    Zap,
} from "lucide-react";

import "./projectfeature.css";

import {
    useGetProjectFeaturesQuery,
    useUpdateProjectFeatureStatusMutation
} from "@/api/projectfeature";

import {
    useGetProjectsQuery,
} from "@/api/projectApi";

import { getFeatureIcon } from "@/utils/featureIcon";

import { toast } from "sonner";

export default function ProjectFeatures() {

    const [selectedProject, setSelectedProject] =
        useState("");
    const [updateProjectFeatureStatus] = useUpdateProjectFeatureStatusMutation();
    const {
        data: projectsResponse,
        isLoading: projectsLoading,
    } = useGetProjectsQuery();


    const projects =
        projectsResponse?.data || [];


    const {
        data: response,
        isLoading,
    } = useGetProjectFeaturesQuery(
        selectedProject,
        {
            skip: !selectedProject,
        }
    );


    const features =
        response?.data || [];

const handleToggle = async (feature) => {
    try {
        await updateProjectFeatureStatus({
            projectId: selectedProject,
            featureId: feature._id,
            enabled: !feature.enabled,
        }).unwrap();

        toast.success("Status updated");

    } catch (err) {
        toast.error("Something went wrong");
    }
};


    return (
        <div className="pf-content">

            <div className="pf-header">

                <div>
                    <h3>Project Features</h3>

                    <p className="subtitle">
                        Enable or disable plugin features for a selected project.
                    </p>
                </div>


                <div className="pf-select-wrapper">

                    <select
                        value={selectedProject}
                        onChange={(e) =>
                            setSelectedProject(e.target.value)
                        }
                    >

                        <option value="" disabled>
                            Select Project
                        </option>


                        {projects.map((p) => (
                            <option
                                key={p._id}
                                value={p._id}
                            >
                                {p.name}
                            </option>
                        ))}

                    </select>

                    <ChevronDown
                        size={15}
                        className="pf-select-icon"
                    />

                </div>

            </div>


            {projectsLoading && (
                <p>Loading projects...</p>
            )}


            {isLoading && selectedProject && (
                <p>Loading features...</p>
            )}


            <div className="pf-grid">

                {features.map((feature) => {


                    const Icon =
                        getFeatureIcon(feature.name) || Zap;


                    return (
                        <div
                            className="pf-card"
                            key={feature._id}
                        >

                            <div className="pf-card-top">

                                <h4>
                                    {feature.name}
                                </h4>


                          <button
    className={`pf-toggle-badge ${
        feature.enabled ? "pf-toggle-on" : ""
    }`}
    onClick={() => handleToggle(feature)}
>
    {feature.enabled && <Check size={12} />}
</button>

                            </div>


                            <span
                                className={`pf-status-pill ${feature.enabled
                                        ? "pf-status-enabled"
                                        : "pf-status-disabled"
                                    }`}
                            >

                                {feature.enabled
                                    ? "Enabled"
                                    : "Disabled"}

                            </span>


                            <p className="pf-description">
                                {feature.description}
                            </p>


                            <div className="pf-card-icon">
                                <Icon size={32} />
                            </div>

                        </div>
                    );
                })}

            </div>

        </div>
    );
}