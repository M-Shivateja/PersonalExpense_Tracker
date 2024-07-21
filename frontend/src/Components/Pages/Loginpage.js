import React, { useState } from "react";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import "../Pages/Loginpage.css";

import axios from "axios";

function Loginpage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:5000/login", {
        email,
        password,
      });
      const token = response.data.token;
      if (token) {
        localStorage.setItem("token", token);
        navigate("/myprofile");
        toast.success("Login successful!");
      } else {
        toast.error("Failed to retrieve token.");
      }
    } catch (error) {
      toast.error(
        error.response.data.message || "Login failed. Please try again."
      );
    }
  };
  return (
    <div className="login-page">
      <div className="container mt-5 ">
        <div className="row justify-content-center">
          <div className="col-md-4">
            <div className="card shadow-lg">
              <div className="card-body">
                <h1 className="text-center">Login</h1>
                <form onSubmit={handleLogin}>
                  <div className="form-group">
                    <label htmlFor="email" class="floating-label">
                      Email
                    </label>
                    <input
                      type="email"
                      className="form-control"
                      id="email"
                      placeholder="Enter your email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      autoComplete="off"
                      required
                    />
                  </div>
                  <div className="form-group" autocomplete="new-password">
                    <label htmlFor="password" class="floating-label">
                      Password
                    </label>
                    <input
                      type="password"
                      className="form-control"
                      id="password"
                      placeholder="Enter your password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      autoComplete="off"
                      autocomplete="new-password"
                      required
                    />
                  </div>
                  <div class="form-group text-right">
                    <Link
                      to="/reset-pass"
                      class="hover-link text-decoration-none text-dark "
                      id="reset"
                    >
                      ForgotPassword?
                    </Link>
                  </div>
                  <button type="submit" class="btn btn-primary btn-block mt-3">
                    Login
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
        <ToastContainer
          position="top-center"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
      </div>
    </div>
  );
}

export default Loginpage;
