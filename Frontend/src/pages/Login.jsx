import React, { useState } from "react";
import "./Login.css";
import popup from "../assets/images/png/popup.png";
import cross from "../assets/images/png/cross.png";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import loginImg from "../assets/images/icons/login.png";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [alertMsg, setAlertMsg] = useState("");
  const [alertType, setAlertType] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:5000/api/auth/login",
        { email, password }
      );

      console.log("RESPONSE:", response.data);

      const { token, role } = response.data;

      // ❌ safety check
      if (!token || !role) {
        setAlertMsg("Token ya Role backend se nahi aa raha ❌");
        setAlertType("error");
        return;
      }

      // ✅ normalize role
      const roleLower = role.toLowerCase();

      // ✅ store
      localStorage.setItem("token", token);
      localStorage.setItem("role", roleLower);

      setAlertMsg(response.data.message || "Login Successful ✅");
      setAlertType("success");

      // ✅ navigation
      setTimeout(() => {
        if (roleLower === "superadmin") {
          navigate("/superadmin-dashboard");
        } else if (roleLower === "admin") {
          navigate("/admin-dashboard");
        } else {
          navigate("/employee-dashboard");
        }
      }, 1000);

    } catch (error) {
      console.log("ERROR:", error);

      if (error.response) {
        setAlertMsg(error.response.data.message);
      } else {
        setAlertMsg("Something went wrong!");
      }

      setAlertType("error");
    }

    // auto hide alert
    setTimeout(() => {
      setAlertMsg("");
      setAlertType("");
    }, 3000);
  };

  return (
    <div className="login-wrapper">
      <div className="login-container">

        {/* LEFT */}
        <div className="login-left">
          <img src={loginImg} alt="Login" className="left-image" />
        </div>

        {/* RIGHT */}
        <div className="login-right">
          <h2>Welcome Back!</h2>

          <form onSubmit={handleLogin} autoComplete="off">

            {/* EMAIL */}
            <input
              type="email"
              placeholder="Username or email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />

            {/* PASSWORD */}
            <div className="password-field">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />

              <span
                className="eye-icon"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <FaEyeSlash size={18} /> : <FaEye size={18} />}
              </span>
            </div>

            {/* OPTIONS */}
            <div className="options">
              <label>
                <input type="checkbox" /> Remember me
              </label>
              <a href="#">Forgot password?</a>
            </div>

            {/* BUTTON */}
            <button type="submit">Sign In</button>

          </form>

          {/* ALERT */}
          {alertMsg && (
            <div className={`custom-alert-box ${alertType}`}>
              <div className="alert-content">
                <h3 className="alert-title">{alertMsg}</h3>

                <div className="alert-icon-circle">
                  <img
                    src={alertType === "success" ? popup : cross}
                    alt="icon"
                    className="check-icon"
                  />
                </div>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}