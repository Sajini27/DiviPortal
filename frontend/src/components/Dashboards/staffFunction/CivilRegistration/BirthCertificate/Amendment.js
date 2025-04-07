import React, { useState, useEffect } from "react";
import Sidebar from "../../sideBar";
import '../../CivilRegistrationForm.css';
import axios from "axios";

const AmendmentStaff = () => {
  const [amendments, setAmendments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [expanded, setExpanded] = useState({});

  useEffect(() => {
    const fetchAmendments = async () => {
      try {
        const token = localStorage.getItem("authToken");
        if (!token) throw new Error("Please log in.");
        const response = await axios.get("http://localhost:5000/api/upload", {
          params: { serviceId: "amendent@" },
          headers: { Authorization: `Bearer ${token}` }, // Add auth header
        });
        setAmendments(response.data);
        setLoading(false);
      } catch (err) {
        setError(err.response?.data?.message || "Error fetching amendment data");
        setLoading(false);
        console.error(err);
      }
    };

    fetchAmendments();
  }, []);

  const toggleFiles = (id) => {
    setExpanded((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const updateStatus = async (uploadId, newStatus) => {
    try {
      const token = localStorage.getItem("authToken");
      if (!token) throw new Error("Please log in.");
      const response = await axios.put(
        `http://localhost:5000/api/upload/${uploadId}/status`,
        { status: newStatus },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setAmendments((prev) =>
        prev.map((amendment) =>
          amendment._id === uploadId ? { ...amendment, status: newStatus } : amendment
        )
      );
    } catch (err) {
      console.error("Error updating status:", err.response?.data);
      setError(err.response?.data?.message || "Error updating status");
    }
  };

  if (loading) {
    return (
      <div className="staff-dashboard-container">
        <Sidebar />
        <div className="main-content">
          <h1>Amendment</h1>
          <p>Loading...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="staff-dashboard-container">
        <Sidebar />
        <div className="main-content">
          <h1>Amendment</h1>
          <p>{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="staff-dashboard-container">
      <Sidebar />
      <div className="main-content">
        <h1>Amendment Applications</h1>

        {amendments.length === 0 ? (
          <p>No amendment applications found.</p>
        ) : (
          <table className="amendment-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Name with Initials</th>
                <th>Email</th>
                <th>Contact Number</th>
                <th>Files</th>
                <th>Submitted At</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {amendments.map((amendment) => (
                <React.Fragment key={amendment._id}>
                  <tr className="amendment-row">
                    <td>{amendment._id}</td>
                    <td>{amendment.nameWithInitials}</td>
                    <td>{amendment.email}</td>
                    <td>{amendment.contactNumber}</td>
                    <td>
                      <button
                        onClick={() => toggleFiles(amendment._id)}
                        className="toggle-files-btn"
                      >
                        {expanded[amendment._id]
                          ? `Hide Files (${amendment.files.length})`
                          : `Show Files (${amendment.files.length})`}
                      </button>
                    </td>
                    <td>{new Date(amendment.createdAt).toLocaleString()}</td>
                    <td>{amendment.status}</td>
                    <td>
                      <select
                        value={amendment.status}
                        onChange={(e) => updateStatus(amendment._id, e.target.value)}
                        className="status-select"
                      >
                        <option value="Pending">Pending</option>
                        <option value="Approved">Approve</option>
                        <option value="Rejected">Reject</option>
                      </select>
                    </td>
                  </tr>
                  {expanded[amendment._id] &&
                    amendment.files.map((file, index) => (
                      <tr
                        key={`${amendment._id}-${index}`}
                        className="file-row"
                      >
                        <td colSpan="4"></td>
                        <td>
                          {file.name}:{" "}
                          <a
                            href={`http://localhost:5000/${file.path}`}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            View File
                          </a>
                        </td>
                        <td colSpan="3"></td> {/* Span across Status and Action */}
                      </tr>
                    ))}
                </React.Fragment>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default AmendmentStaff;