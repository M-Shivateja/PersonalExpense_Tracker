import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "./Registerpage.css";

function Registerpage() {
  const [email, setEmail] = useState("");
  const [Name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmpassword, setConfirmpassword] = useState("");
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:5000/register", {
        email,
        Name,
        phone,
        password,
        confirmpassword,
      });
      toast.success(response.data.message);
      navigate("/login");
    } catch (error) {
      toast.error(
        error.response.data.message || "Registration failed. Please try again."
      );
    }
  };

  return (
    <div className="register-page">
      <div className="container mt-5">
        <div className="row justify-content-center">
          <div className="col-md-4">
            <div className="card shadow-lg">
              <div className="card-body">
                <h1 className="text-center mb-4">Register</h1>
                <form onSubmit={handleRegister} autoComplete="new-password">
                  <div className="form-group">
                    <label htmlFor="email">Email:</label>
                    <input
                      type="email"
                      className="form-control"
                      id="email"
                      name="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="name">Name:</label>
                    <input
                      type="text"
                      className="form-control"
                      id="name"
                      name="name"
                      value={Name}
                      onChange={(e) => setName(e.target.value)}
                      autoComplete="new-password"
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="phone">Phone:</label>
                    <input
                      type="tel"
                      className="form-control"
                      id="phone"
                      name="phone"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      autocomplete="new-password"
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="password">Password:</label>
                    <input
                      type="password"
                      className="form-control"
                      id="password"
                      name="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      autocomplete="new-password"
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="confirmpassword">Confirm Password:</label>
                    <input
                      type="password"
                      className="form-control"
                      id="confirmpassword"
                      name="confirmpassword"
                      value={confirmpassword}
                      onChange={(e) => setConfirmpassword(e.target.value)}
                      autocomplete="new-password"
                      required
                    />
                  </div>
                  <button
                    type="submit"
                    className="btn btn-primary btn-block mt-4"
                  >
                    Register
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

export default Registerpage;
