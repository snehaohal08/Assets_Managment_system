import React, { useState } from "react";
import "./EmployeeList.css";
import axios from "axios";

import popup from "../../assets/images/png/popup.png";
import cross from "../../assets/images/png/cross.png";

export default function EmployeeForm({ goBack }) {
  const [formData, setFormData] = useState({
    firstName: "",
    middleName: "",
    lastName: "",
    id: "", // 👈 this is empCode (EM101)
    email: "",
    contact: "",
    department: "",
    dateOfJoining: "",
  });

  const [errors, setErrors] = useState({});
  const [alertMsg, setAlertMsg] = useState("");
  const [alertType, setAlertType] = useState("");

  // ✅ INPUT HANDLER
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

  // ✅ CONTACT FIX
  const handleContactChange = (e) => {
    let value = e.target.value.replace(/[^0-9]/g, "");

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
      newErrors.id = "Employee Code is required (EM101)";

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

  // ✅ SUBMIT → BACKEND API
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validate()) {
      setAlertMsg("Please fill all required fields!");
      setAlertType("error");
      return;
    }

    try {
      await axios.post("http://localhost:5000/api/employees/add", {
        empCode: formData.id, // 👈 EM101
        firstName: formData.firstName,
        middleName: formData.middleName,
        lastName: formData.lastName,
        email: formData.email,
        contact: formData.contact,
        department: formData.department,
        dateOfJoining: formData.dateOfJoining,
      });

      setAlertMsg("Employee Added Successfully ✅");
      setAlertType("success");

      setTimeout(() => {
        setAlertMsg("");
        goBack();
      }, 1500);

    } catch (err) {
      console.error(err);
      setAlertMsg("Error saving employee ❌");
      setAlertType("error");
    }
  };

  return (
    <div className="container">
      <h2>Add Employee</h2>

      <form onSubmit={handleSubmit} className="form-container">

        {/* FIRST NAME */}
        <div className="form-group">
          <label>First Name *</label>
          <input name="firstName" value={formData.firstName} onChange={handleChange} />
          {errors.firstName && <p className="error">{errors.firstName}</p>}
        </div>

        {/* MIDDLE NAME */}
        <div className="form-group">
          <label>Middle Name</label>
          <input name="middleName" value={formData.middleName} onChange={handleChange} />
        </div>

        {/* LAST NAME */}
        <div className="form-group">
          <label>Last Name *</label>
          <input name="lastName" value={formData.lastName} onChange={handleChange} />
          {errors.lastName && <p className="error">{errors.lastName}</p>}
        </div>

        {/* EMPLOYEE CODE */}
        <div className="form-group">
          <label>Employee Code *</label>
          <input name="id" value={formData.id} onChange={handleChange} placeholder="EM101" />
          {errors.id && <p className="error">{errors.id}</p>}
        </div>

        {/* EMAIL */}
        <div className="form-group">
          <label>Email *</label>
          <input name="email" value={formData.email} onChange={handleChange} />
          {errors.email && <p className="error">{errors.email}</p>}
        </div>

        {/* CONTACT */}
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
          <input name="department" value={formData.department} onChange={handleChange} />
          {errors.department && <p className="error">{errors.department}</p>}
        </div>

        {/* DATE */}
        <div className="form-group">
          <label>Date of Joining *</label>
          <input type="date" name="dateOfJoining" value={formData.dateOfJoining} onChange={handleChange} />
          {errors.dateOfJoining && <p className="error">{errors.dateOfJoining}</p>}
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