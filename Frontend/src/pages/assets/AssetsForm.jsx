import React, { useState } from "react";
import "./AssetsData.css";

export default function AssetsForm() {
  const [formData, setFormData] = useState({
    assetName: "",
    assetId: "",
    category: "",
    brandModel: "",
    purchaseDate: "",
    warrantyDate: "",
    age: "",
  });

  const [assetsList, setAssetsList] = useState([]);
  const [editIndex, setEditIndex] = useState(null);
  const [sortConfig, setSortConfig] = useState({ key: "", direction: "asc" });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (editIndex !== null) {
      const updatedList = [...assetsList];
      updatedList[editIndex] = formData;
      setAssetsList(updatedList);
      setEditIndex(null);
    } else {
      setAssetsList([...assetsList, formData]);
    }

    setFormData({
      assetName: "",
      assetId: "",
      category: "",
      brandModel: "",
      purchaseDate: "",
      warrantyDate: "",
      age: "",
    });
  };

  const handleEdit = (index) => {
    setFormData(assetsList[index]);
    setEditIndex(index);
  };

  const handleDelete = (index) => {
    setAssetsList(assetsList.filter((_, i) => i !== index));
  };

  const handleSort = (key) => {
    let direction = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }

    setSortConfig({ key, direction });

    const sorted = [...assetsList].sort((a, b) => {
      if (a[key] < b[key]) return direction === "asc" ? -1 : 1;
      if (a[key] > b[key]) return direction === "asc" ? 1 : -1;
      return 0;
    });

    setAssetsList(sorted);
  };

  return (
    <div className="assets-container">

      {/* FORM */}
      <form className="compact-form" onSubmit={handleSubmit}>
        <div className="form-title">
          {editIndex !== null ? "Update Asset" : "Add Asset"}
        </div>

        <div className="form-row">
          <div className="form-field">
            <label>Asset Name</label>
            <input name="assetName" value={formData.assetName} onChange={handleChange} />
          </div>

          <div className="form-field">
            <label>Asset ID</label>
            <input name="assetId" value={formData.assetId} onChange={handleChange} />
          </div>

          <div className="form-field">
            <label>Category</label>
            <select name="category" value={formData.category} onChange={handleChange}>
              <option value="">Select</option>
              <option>Laptop</option>
              <option>Keyboard</option>
              <option>Mouse</option>
              <option>Monitor</option>
            </select>
          </div>

          <div className="form-field">
            <label>Brand & Model</label>
            <input name="brandModel" value={formData.brandModel} onChange={handleChange} />
          </div>
        </div>

        <div className="form-row">
          <div className="form-field">
            <label>Purchase Date</label>
            <input type="date" name="purchaseDate" value={formData.purchaseDate} onChange={handleChange} />
          </div>

          <div className="form-field">
            <label>Warranty Date</label>
            <input type="date" name="warrantyDate" value={formData.warrantyDate} onChange={handleChange} />
          </div>

          <div className="form-field">
            <label>Age</label>
            <input name="age" value={formData.age} onChange={handleChange} />
          </div>

          <div className="form-field button-field">
            <button type="submit">
              {editIndex !== null ? "Update" : "Add"}
            </button>
          </div>
        </div>
      </form>

      {/* TABLE */}
      <div className="table-container">
        <h2>Assets List</h2>

        <table className="assets-table">
          <thead>
            <tr>
              <th onClick={() => handleSort("assetName")}>Name</th>
              <th onClick={() => handleSort("assetId")}>ID</th>
              <th onClick={() => handleSort("category")}>Category</th>
              <th onClick={() => handleSort("brandModel")}>Brand</th>
              <th onClick={() => handleSort("purchaseDate")}>Purchase</th>
              <th onClick={() => handleSort("warrantyDate")}>Warranty</th>
              <th onClick={() => handleSort("age")}>Age</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {assetsList.map((asset, index) => (
              <tr key={index}>
                <td>{asset.assetName}</td>
                <td>{asset.assetId}</td>
                <td>{asset.category}</td>
                <td>{asset.brandModel}</td>
                <td>{asset.purchaseDate}</td>
                <td>{asset.warrantyDate}</td>
                <td>{asset.age}</td>
                <td>
                  <button onClick={() => handleEdit(index)}>Edit</button>
                  <button onClick={() => handleDelete(index)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}