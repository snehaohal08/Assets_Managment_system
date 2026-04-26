import React, { useState } from "react";
import "./EmployeeList.css";

import popup from "../../assets/images/png/popup.png";
import cross from "../../assets/images/png/cross.png";

export default function EmployeeForm({ addEmployee, goBack }) {
  const [formData, setFormData] = useState({
    firstName: "",
    middleName: "",
    lastName: "",
    id: "",
    brandModel: "",
    assetsCategory: "",
    email: "",
    contact: "",
    department: "",
    dateOfJoining: "",
  });

  const [errors, setErrors] = useState({});
  const [alertMsg, setAlertMsg] = useState("");
  const [alertType, setAlertType] = useState("");

  // ✅ COMMON INPUT HANDLER
  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  // ✅ CONTACT INPUT HANDLER (FIXED)
  const handleContactChange = (e) => {
    let value = e.target.value;

    // allow only numbers
    value = value.replace(/[^0-9]/g, "");

    // max 10 digits
    if (value.length > 10) return;

    setFormData((prev) => ({
      ...prev,
      contact: value,
    }));

    if (errors.contact) {
      setErrors((prev) => ({ ...prev, contact: "" }));
    }
  };

  // ✅ VALIDATION
  const validate = () => {
    let newErrors = {};

    if (!formData.firstName.trim())
      newErrors.firstName = "First name is required";

    if (!formData.lastName.trim())
      newErrors.lastName = "Last name is required";

    if (!formData.id.trim())
      newErrors.id = "Employee ID is required";

    if (!formData.brandModel.trim())
      newErrors.brandModel = "Brand & Model is required";

    if (!formData.assetsCategory.trim())
      newErrors.assetsCategory = "Category is required";

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
      newErrors.email = "Invalid email format";
    }

    if (!formData.contact.trim()) {
      newErrors.contact = "Contact is required";
    } else if (!/^[0-9]{10}$/.test(formData.contact)) {
      newErrors.contact = "Enter valid 10 digit number";
    }

    if (!formData.department.trim())
      newErrors.department = "Department is required";

    if (!formData.dateOfJoining)
      newErrors.dateOfJoining = "Select date";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // ✅ SUBMIT
  const handleSubmit = (e) => {
    e.preventDefault();

    if (validate()) {
      addEmployee(formData);

      setAlertMsg("Employee Added Successfully!");
      setAlertType("success");

      setTimeout(() => {
        setAlertMsg("");
        goBack();
      }, 1500);
    } else {
      setAlertMsg("Please fill all required fields!");
      setAlertType("error");

      setTimeout(() => {
        setAlertMsg("");
      }, 3000);
    }
  };

  return (
    <div className="container">
      <h2>Add Employee</h2>

      <form onSubmit={handleSubmit} className="form-container">

        {/* FIRST NAME */}
        <div className="form-group">
          <label>First Name *</label>
          <input
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
          />
          {errors.firstName && <p className="error">{errors.firstName}</p>}
        </div>

        {/* MIDDLE NAME */}
        <div className="form-group">
          <label>Middle Name</label>
          <input
            name="middleName"
            value={formData.middleName}
            onChange={handleChange}
          />
        </div>

        {/* LAST NAME */}
        <div className="form-group">
          <label>Last Name *</label>
          <input
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
          />
          {errors.lastName && <p className="error">{errors.lastName}</p>}
        </div>

        {/* EMPLOYEE ID */}
        <div className="form-group">
          <label>Employee ID *</label>
          <input
            name="id"
            value={formData.id}
            onChange={handleChange}
          />
          {errors.id && <p className="error">{errors.id}</p>}
        </div>

        {/* BRAND */}
        <div className="form-group">
          <label>Brand & Model *</label>
          <input
            name="brandModel"
            value={formData.brandModel}
            onChange={handleChange}
          />
          {errors.brandModel && <p className="error">{errors.brandModel}</p>}
        </div>

        {/* CATEGORY */}
        <div className="form-group">
          <label>Assets Category *</label>
          <input
            name="assetsCategory"
            value={formData.assetsCategory}
            onChange={handleChange}
          />
          {errors.assetsCategory && (
            <p className="error">{errors.assetsCategory}</p>
          )}
        </div>

        {/* EMAIL */}
        <div className="form-group">
          <label>Email *</label>
          <input
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
          {errors.email && <p className="error">{errors.email}</p>}
        </div>

        {/* 🔥 CONTACT FIXED */}
        <div className="form-group">
          <label>Contact *</label>
          <input
            type="text"
            name="contact"
            value={formData.contact}
            onChange={handleContactChange}
            placeholder="Enter 10 digit number"
          />
          {errors.contact && <p className="error">{errors.contact}</p>}
        </div>

        {/* DEPARTMENT */}
        <div className="form-group">
          <label>Department *</label>
          <input
            name="department"
            value={formData.department}
            onChange={handleChange}
          />
          {errors.department && <p className="error">{errors.department}</p>}
        </div>

        {/* DATE */}
        <div className="form-group">
          <label>Date of Joining *</label>
          <input
            type="date"
            name="dateOfJoining"
            value={formData.dateOfJoining}
            onChange={handleChange}
          />
          {errors.dateOfJoining && (
            <p className="error">{errors.dateOfJoining}</p>
          )}
        </div>

        {/* BUTTONS */}
        <div className="form-buttons">
          <button type="submit" className="save-btn">Submit</button>
          <button type="button" className="cancel-btn" onClick={goBack}>
            Cancel
          </button>
        </div>
      </form>

      {/* ALERT */}
      {alertMsg && (
        <div className={`custom-alert-box ${alertType}`}>
          <img src={alertType === "success" ? popup : cross} alt="icon" />
          <span>{alertMsg}</span>
        </div>
      )}
    </div>
  );
}