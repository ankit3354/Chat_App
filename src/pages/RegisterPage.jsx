import React, { useEffect, useState } from "react";
import { useAuth } from "../utils/AuthContext";
import { Link } from "react-router-dom";

const RegisterPage = () => {
  const { handleResgiter } = useAuth();

  const [credentials, setCreadentials] = useState({
    name: "",
    email: "",
    password1: "",
    password2: "",
  });
  const handleInputChange = (e) => {
    let name = e.target.name;
    let value = e.target.value;
    setCreadentials({ ...credentials, [name]: value });
  };

  return (
    <div className="auth--container">
      <div className="form--wrapper">
        <form
          onSubmit={(e) => {
            handleResgiter(e, credentials);
          }}
        >
          <div className="field--wrapper">
            <label>Name:</label>
            <input
              type="text"
              required
              name="name"
              placeholder="Enter your name..."
              value={credentials.name}
              onChange={handleInputChange}
            />
          </div>
          <div className="field--wrapper">
            <label>Email:</label>
            <input
              type="email"
              required
              name="email"
              placeholder="Enter your email..."
              value={credentials.email}
              onChange={handleInputChange}
            />
          </div>
          <div className="field--wrapper">
            <label>Paasword</label>
            <input
              type="password"
              required
              name="password1"
              placeholder="Enter password..."
              value={credentials.password1}
              onChange={handleInputChange}
            />
          </div>
          <div className="field--wrapper">
            <label>Confirm Paasword</label>
            <input
              type="password"
              required
              name="password2"
              placeholder="Enter Confirm password..."
              value={credentials.password2}
              onChange={handleInputChange}
            />
          </div>

          <div className="field--wrapper">
            <input
              type="submit"
              value="Resgister"
              className="btn btn--lg btn--main"
            />
          </div>
        </form>

        <p>
          Already have an account <Link to="/login">LogIn</Link>
        </p>
      </div>
    </div>
  );
};

export default RegisterPage;
