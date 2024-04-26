import React, { useEffect, useState } from "react";
import { useAuth } from "../utils/AuthContext";
import { Link, useNavigate } from "react-router-dom";

function LoginPage() {
  const { user, handleUserLogin } = useAuth();
  const navigate = useNavigate();

  const [credentials, setCreadentials] = useState({
    email: "",
    password: "",
  });

  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, []);

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
            handleUserLogin(e, credentials);
          }}
        >
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
            <label>Paasword:</label>
            <input
              type="password"
              required
              name="password"
              placeholder="Enter password..."
              value={credentials.password}
              onChange={handleInputChange}
            />
          </div>

          <div className="field--wrapper">
            <input
              type="submit"
              value="Login"
              className="btn btn--lg btn--main"
            />
          </div>
        </form>

        <p>
          Don't have an account <Link to="/register">LogIn</Link>
        </p>
      </div>
    </div>
  );
}

export default LoginPage;
