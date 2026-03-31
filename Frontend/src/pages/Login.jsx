import React, { useState } from "react";
import "./Login.css";
import logo from "../assets/Images/icons/logo.png";
import popup from "../assets/images/png/popup.png";
import cross from "../assets/images/png/cross.png";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import loginImg from "../assets/images/icons/login.png";
import axios from "axios";

export default function Login() {
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
        { email, password },
      );

      const { token, role } = response.data;

      localStorage.setItem("token", token);
      localStorage.setItem("role", role);

      setAlertMsg(response.data.message);
      setAlertType("success");

      setTimeout(() => {
        if (role === "admin") {
          window.location.href = "/admin-dashboard";
        } else {
          window.location.href = "/employee-dashboard";
        }
      }, 1000);
    } catch (error) {
      if (error.response) {
        setAlertMsg(error.response.data.message);
      } else {
        setAlertMsg("Something went wrong!");
      }
      setAlertType("error");
    }

    setTimeout(() => {
      setAlertMsg("");
      setAlertType("");
    }, 3000);
  };

  return (
    <div className="login-wrapper">
      <div className="login-container">
        {/* Left side: just an image now */}
        <div className="login-left">
          <div className="brand">
            {/* <img src={logo} alt="Logo" />
            <h2>
              InfraTrack <span>by Arcelormittal</span>
            </h2> */}
          </div>
          <img src={loginImg} alt="Login Illustration" className="left-image" />
        </div>

        {/* Right side login form */}
        <div className="login-right">
          <h2>Welcome Back!</h2>
          <form onSubmit={handleLogin} autoComplete="off">
            <input
              type="email"
              autoComplete="new-email"
              placeholder="Username or email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <div className="password-field">
              <input
                type={showPassword ? "text" : "password"}
                autoComplete="new-password"
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
            <div className="options">
              <label>
                <input type="checkbox" /> Remember me
              </label>
              <a href="#">Forgot password?</a>
            </div>
            <button type="submit">Sign In</button>
          </form>

          {alertMsg && (
            <div className={`custom-alert-box ${alertType}`}>
              <div className="alert-content">
                <h3 className="alert-title">{alertMsg}</h3>
                <div className="alert-icon-circle">
                  <img
                    src={alertType === "success" ? popup : cross}
                    alt={alertType}
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
