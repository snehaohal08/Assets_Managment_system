import React, { useState, useEffect } from "react";
import axios from "axios";
import "./AssetsData.css";

const initialState = {
  assetName: "",
  assetId: "",
  category: "",
  brandModel: "",
  purchaseDate: "",
  warrantyDate: "",
  age: "",
};

export default function AssetsForm() {
  const [formData, setFormData] = useState(initialState);
  const [assetsList, setAssetsList] = useState([]);
  const [editId, setEditId] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteId, setDeleteId] = useState(null);

  // ================= FETCH =================
  const fetchAssets = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/assets-db");
      setAssetsList(res.data || []);
    } catch (err) {
      console.log(err);
      setAssetsList([]);
    }
  };

  useEffect(() => {
    fetchAssets();
  }, []);

  // ================= HANDLE CHANGE =================
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // ================= SUBMIT (ADD / UPDATE) =================
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (editId) {
        await axios.put(
          `http://localhost:5000/api/assets-db/${editId}`,
          formData
        );
        alert("Updated Successfully ✅");
      } else {
        await axios.post("http://localhost:5000/api/assets-db", formData);
        alert("Added Successfully ✅");
      }

      setFormData(initialState);
      setEditId(null);
      fetchAssets();
    } catch (err) {
      console.log(err);
      alert("Something went wrong ❌");
    }
  };

  // ================= EDIT =================
  const handleEdit = (asset) => {
    setFormData({
      assetName: asset.assetName || "",
      assetId: asset.assetId || "",
      category: asset.category || "",
      brandModel: asset.brandModel || "",
      purchaseDate: asset.purchaseDate || "",
      warrantyDate: asset.warrantyDate || "",
      age: asset.age || "",
    });
    setEditId(asset.id);
  };

  // ================= DELETE =================
  const handleDeleteClick = (id) => {
    setDeleteId(id);
    setShowDeleteModal(true);
  };

  const confirmDelete = async () => {
    try {
      await axios.delete(`http://localhost:5000/api/assets-db/${deleteId}`);
      alert("Deleted Successfully 🗑️");
      fetchAssets();
    } catch (err) {
      console.log(err);
    }

    setDeleteId(null);
    setShowDeleteModal(false);
  };

  const cancelDelete = () => {
    setShowDeleteModal(false);
    setDeleteId(null);
  };

  return (
    <div className="assets-container">

      {/* ================= FORM ================= */}
      <form className="compact-form" onSubmit={handleSubmit}>
        <div className="form-title">
          {editId ? "Update Asset" : "Add Asset"}
        </div>

        <div className="form-row">
          <div className="form-field">
            <label>Asset Name</label>
            <input
              name="assetName"
              value={formData.assetName}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-field">
            <label>Asset ID</label>
            <input
              name="assetId"
              value={formData.assetId}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-field">
            <label>Category</label>
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
            >
              <option value="">Select</option>
              <option>Laptop</option>
              <option>Keyboard</option>
              <option>Mouse</option>
              <option>Monitor</option>
            </select>
          </div>

          <div className="form-field">
            <label>Brand</label>
            <input
              name="brandModel"
              value={formData.brandModel}
              onChange={handleChange}
            />
          </div>
        </div>

        <div className="form-row">
          <div className="form-field">
            <label>Purchase Date</label>
            <input
              type="date"
              name="purchaseDate"
              value={formData.purchaseDate}
              onChange={handleChange}
            />
          </div>

          <div className="form-field">
            <label>Warranty Date</label>
            <input
              type="date"
              name="warrantyDate"
              value={formData.warrantyDate}
              onChange={handleChange}
            />
          </div>

          <div className="form-field">
            <label>Age</label>
            <input
              name="age"
              value={formData.age}
              onChange={handleChange}
            />
          </div>

          <div className="form-field button-field">
            <button type="submit">
              {editId ? "Update" : "Add"}
            </button>
          </div>
        </div>
      </form>

      {/* ================= DELETE MODAL ================= */}
      {showDeleteModal && (
        <div className="modal-overlay">
          <div className="modal-box">
            <h3>Delete Asset?</h3>
            <p>Are you sure you want to delete this asset?</p>

            <div className="modal-buttons">
              <button className="cancel-btn" onClick={cancelDelete}>
                Cancel
              </button>
              <button className="delete-btn" onClick={confirmDelete}>
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ================= TABLE ================= */}
      <div className="table-container">
        <h2>Assets List</h2>

        {assetsList.length === 0 ? (
          <p>No Data Found</p>
        ) : (
          <table className="assets-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>ID</th>
                <th>Category</th>
                <th>Brand</th>
                <th>Purchase</th>
                <th>Warranty</th>
                <th>Age</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>
              {assetsList.map((asset) => (
                <tr key={asset.id}>
                  <td>{asset.assetName}</td>
                  <td>{asset.assetId}</td>
                  <td>{asset.category}</td>
                  <td>{asset.brandModel}</td>
                  <td>{asset.purchaseDate}</td>
                  <td>{asset.warrantyDate}</td>
                  <td>{asset.age}</td>

                  <td>
                    <button type="button" onClick={() => handleEdit(asset)}>
                      Edit
                    </button>
                    <button
                      type="button"
                      onClick={() => handleDeleteClick(asset.id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}