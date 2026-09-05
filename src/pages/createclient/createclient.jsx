import React, { useEffect, useState } from "react";
import { Search, SlidersHorizontal, Plus, MoreVertical, Trash2, ChevronLeft, ChevronRight } from "lucide-react";
import "./createclient.css";
import { useDeleteClientMutation, useGelClientQuery, useUpdateClientMutation } from "@/api/dashboardApi";
import { toast } from "sonner";
import AddClient from "@/components/model/addclient/addclient";

export default function Clients() {
  const [page, setPage] = useState(1);
  const limit = 6;
  const [clients, setClients] = useState([]);
  const [search, setSearch] = useState("");
  const { data: response, isLoading } = useGelClientQuery({ page, limit });
  const [deleteClient] = useDeleteClientMutation();
  const [updateClient] = useUpdateClientMutation();
  const [show, setshow] = useState(false);

  const getInitials = (name = "") =>
    name
      .split(" ")
      .map((w) => w[0])
      .join("")
      .slice(0, 2)
      .toUpperCase();

  const handleToggleStatus = async (client) => {
    const newStatus =
      client.status === "active" ? "inactive" : "active";

    try {
      await updateClient({
        clientId: client._id,
        status: newStatus,
      }).unwrap();

      setClients((prev) =>
        prev.map((c) =>
          c._id === client._id
            ? { ...c, status: newStatus }
            : c
        )
      );

      toast.success("Status updated successfully");

    } catch (err) {
      console.log("Update error:", err);
      toast.error("Something went wrong");
    }
  };

  const filteredClients = clients.filter(
    (c) =>
      c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.email.toLowerCase().includes(search.toLowerCase()) ||
      c._id.toLowerCase().includes(search.toLowerCase())
  );

  useEffect(() => {
    if (isLoading) return;

    const data = response?.data || [];

    setClients(data);
  }, [response, isLoading]);

  // Reset to page 1 whenever the search term changes
  useEffect(() => {
    setPage(1);
  }, [search]);

  const pagination = response?.pagination || { page: 1, limit, total: 0, totalPages: 1 };

  const deleteclient = async (clientId) => {
    try {
      await deleteClient(clientId).unwrap();

      toast.success("Client deleted successfully");

      if (clients.length === 1 && page > 1) {
        setPage((p) => p - 1);
      }
    } catch (err) {
      console.log(err);
      toast.error("something went wrong");
    }
  };

  return (
    <div className="clients-content">
      <div className="clients-header">
        <div>
          <h3>Clients</h3>
          <p className="subtitle">Manage all registered clients</p>
        </div>
      </div>

      <div className="clients-toolbar">
        <div className="search-box">
          <Search size={16} className="search-icon" />
          <input
            type="text"
            placeholder="Search clients, emails, or IDs..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <div className="toolbar-actions">
          <button className="btn btn-outline">
            <SlidersHorizontal size={15} />
            Filters
          </button>
          <button className="btn btn-primary" onClick={() => setshow(true)}>
            <Plus size={15} />
            Add Client
          </button>
        </div>
      </div>

      <div className="clients-table-wrapper">
        <table className="clients-table">
          <thead>
            <tr>
              <th>Client Name</th>
              <th>Email</th>
              <th>Client ID</th>
              <th>Status</th>
              <th>Created Date</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {filteredClients.length === 0 && (
              <tr>
                <td colSpan={6} className="empty-row">
                  No clients found.
                </td>
              </tr>
            )}

            {filteredClients.map((client) => (
              <tr key={client._id}>

                <td>
                  <div className="client-name-cell">
                    <span className="avatar">
                      {getInitials(client.name)}
                    </span>
                    <span>{client.name}</span>
                  </div>
                </td>

                <td className="text-muted">
                  {client.email}
                </td>

                <td>
                  <span className="client-id-badge">
                    {client._id}
                  </span>
                </td>

                <td>
                  <span
                    className={`status-badge ${
                      client.status === "active"
                        ? "status-active"
                        : "status-inactive"
                    }`}
                  >
                    <span className="status-dot" />

                    {client.status === "active"
                      ? "Active"
                      : "Inactive"}
                  </span>
                </td>

                <td className="text-muted">
                  {client.createdAt}
                </td>

                <td>
                  <div className="actions-cell">

                    <button
                      className={`toggle-switch ${
                        client.status === "active"
                          ? "toggle-on"
                          : ""
                      }`}
                      onClick={() => handleToggleStatus(client)}
                    >
                      <span className="toggle-thumb" />
                    </button>

                    <button
                      className="action-btn delete-btn"
                      onClick={() => deleteclient(client._id)}
                      title="Delete Client"
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

      {show && (
        <AddClient
          onClose={() => setshow(false)} />
      )}
    </div>
  );
}