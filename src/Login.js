import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import "./Login.css";

const Login = () => {
  const navigate = useNavigate();

  const [data, setData] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({
    email: "",
    password: "",
  });

  const regexEmail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  const regexPassword =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

  useEffect(() => {
    let login = localStorage.getItem("login");
    if (login) {
      navigate("/dashboard");
    }
  }, [navigate]);

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: false });
  };

  const validate = () => {
    if (!regexEmail.test(data.email)) {
      return setErrors({ email: true });
    }
    if (!regexPassword.test(data.password)) {
      return setErrors({ password: true });
    }
    setErrors({ data });
    return true;
  };

  const handleLogin = (e) => {
    e.preventDefault();
    console.log(data.email, data.password);

    if (validate()) {
      alert("Login successfully!");

      localStorage.setItem("login", true);
      navigate("/dashboard");

      let loginUser = JSON.parse(localStorage.getItem("login_user")) || [];
      loginUser.push(data);
      localStorage.setItem("login_user", JSON.stringify(loginUser));

      setData({
        email: "",
        password: "",
      });

      axios.post("http://localhost:3004/login", data).then((resp) => {
        console.log(resp);
      });
    }
  };

  console.log("Login component rendered");
  console.log("Data:", data);
  console.log("Errors:", errors);
  return (
    <div className="main-1">
      <div className="form-login">
        <div className="logo-login">HAZE.</div>

        <div className="login-title">
          <h1>Hi there!</h1>
          <p>Welcome to Haze. Community Dashboard</p>
        </div>

        <div className="input-login">
          <input
            type="email"
            name="email"
            value={data.email}
            onChange={handleChange}
            placeholder="Email"
          />
          {errors.email && (
            <p className="error-login">
              {data.email === "" ? "Email is required" : "Invalid email"}
            </p>
          )}
        </div>
        <br />

        <div className="input-login">
          <input
            type="password"
            name="password"
            value={data.password}
            onChange={handleChange}
            placeholder="Password"
          />
          {errors.password && (
            <p className="error-login">
              {data.password === ""
                ? "Password is required"
                : "Please enter strong password"}
            </p>
          )}
        </div>
        <br />

        <button className="login-btn" type="submit" onClick={handleLogin}>
          Log in
        </button>

        <div className="signup">
          <p className="signup-link">
            {" "}
            Don't have an account?<Link to="/">Sign up</Link>
          </p>
        </div>
      </div>

      {/* <div className="form-login2">
        <div className="link-login">
          <Link to="/" className="signup-login">
            Sign up
          </Link>
          <Link to="/login" className="link-login1">
            Log in
          </Link>
        </div>
        <div className="logo-login1">
          <h4>Largest Space Community</h4>
        </div>
        <div className="content-login">
          <h1 className="login-title1">
            Go anywhere you want in a Galaxy full of wonders!
          </h1>
          <h3 className="login-p1">01____06</h3>
        </div>
      </div> */}
    </div>
  );
};

export default Login;
