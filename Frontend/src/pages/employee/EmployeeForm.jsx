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

  // HANDLE INPUT
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  // VALIDATION
  const validate = () => {
    let newErrors = {};

    if (!formData.firstName.trim())
      newErrors.firstName = "First name is required";
    if (!formData.lastName.trim()) newErrors.lastName = "Last name is required";
    if (!formData.id.trim()) newErrors.id = "Employee ID is required";

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
    if (!formData.dateOfJoining) newErrors.dateOfJoining = "Select date";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // SUBMIT
  const handleSubmit = (e) => {
  e.preventDefault();

  if (validate()) {
    addEmployee(formData);

    setAlertMsg("Employee Added Successfully!");
    setAlertType("success");

    setTimeout(() => {
      setAlertMsg("");
      goBack();   // ✅ yaha close karo form
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

      {/* ✅ FORM START */}
      <form onSubmit={handleSubmit} className="form-container">
        <div className="form-group">
          <label>First Name <span className="error">*</span></label>
          <input
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
          />
          {errors.firstName && <p className="error">{errors.firstName}</p>}
        </div>

        <div className="form-group">
          <label>Middle Name</label>
          <input
            name="middleName"
            value={formData.middleName}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label>Last Name <span className="error">*</span></label>
          <input
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
          />
          {errors.lastName && <p className="error">{errors.lastName}</p>}
        </div>

        <div className="form-group">
          <label>Employee ID <span className="error">*</span></label>
          <input name="id" value={formData.id} onChange={handleChange} />
          {errors.id && <p className="error">{errors.id}</p>}
        </div>

        <div className="form-group">
          <label>Brand & Model <span className="error">*</span></label>
          <input
            name="brandModel"
            value={formData.brandModel}
            onChange={handleChange}
          />
          {errors.brandModel && <p className="error">{errors.brandModel}</p>}
        </div>

        <div className="form-group">
          <label>Assets Category <span className="error">*</span></label>
          <input
            name="assetsCategory"
            value={formData.assetsCategory}
            onChange={handleChange}
          />
          {errors.assetsCategory && (
            <p className="error">{errors.assetsCategory}</p>
          )}
        </div>

        <div className="form-group">
          <label>Email <span className="error">*</span></label>
          <input name="email" value={formData.email} onChange={handleChange} />
          {errors.email && <p className="error">{errors.email}</p>}
        </div>

        <div className="form-group">
          <label>Contact <span className="error">*</span></label>
          <input
            name="contact"
            value={formData.contact}
            onChange={handleChange}
          />
          {errors.contact && <p className="error">{errors.contact}</p>}
        </div>

  

        <div className="form-group">
          <label>Department <span className="error">*</span></label>
          <input
            name="department"
            value={formData.department}
            onChange={handleChange}
          />
          {errors.department && <p className="error">{errors.department}</p>}
        </div>

        <div className="form-group">
          <label>Date of Joining <span className="error">*</span></label>
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
          <button type="submit" className="save-btn">
            Submit
          </button>
          <button type="button" className="cancel-btn" onClick={goBack}>
            Cancel
          </button>
        </div>
      </form>

      {/* ✅ ALERT */}
      {alertMsg && (
        <div className={`custom-alert-box ${alertType}`}>
          <img src={alertType === "success" ? popup : cross} alt="icon" />
          <span>{alertMsg}</span>
        </div>
      )}
    </div>
  );
}
