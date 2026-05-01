import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Assets.css";
import { FaSearch } from "react-icons/fa";

export default function AssetsTable() {
  const [assetsList, setAssetsList] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const fetchAssets = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/assets-db");
        setAssetsList(res.data || []);
      } catch (err) {
        console.log(err);
        setAssetsList([]);
      }
    };

    fetchAssets();
  }, []);

  // ✅ FILTER LOGIC (SEARCH)
  const filteredAssets = assetsList.filter((asset) => {
    const value = search.toLowerCase();

    return (
      asset.assetName?.toLowerCase().includes(value) ||
      asset.assetId?.toLowerCase().includes(value) ||
      asset.category?.toLowerCase().includes(value) ||
      asset.brandModel?.toLowerCase().includes(value)
    );
  });
  return (
    <div className="table-container">
      {/* TOP BAR */}
      <div className="table-top">
        <div className="table-title">
          {/* <h2>Assets List</h2> */}
        </div>

        {/* <div className="search-wrapper">
          <FaSearch className="search-icon" />

          <input
            type="text"
            placeholder="Search assets..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div> */}
      </div>

      {/* TABLE */}
      {filteredAssets.length === 0 ? (
        <p className="no-data">No Data Found</p>
      ) : (
        <table className="assets-table">
          <thead>
            <tr>
              <th>Sr No</th>
              <th>Name</th>
              <th>ID</th>
              <th>Category</th>
              <th>Brand</th>
              <th>Purchase</th>
              <th>Warranty</th>
              <th>Age</th>
            </tr>
          </thead>

          <tbody>
            {filteredAssets.map((asset, index) => (
              <tr key={asset.id || index}>
                <td>{index + 1}</td>
                <td>{asset.assetName}</td>
                <td>{asset.assetId}</td>
                <td>{asset.category}</td>
                <td>{asset.brandModel}</td>
                <td>{asset.purchaseDate}</td>
                <td>{asset.warrantyDate}</td>
                <td>{asset.age}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}