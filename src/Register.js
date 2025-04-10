import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./Register.css";

const Register = () => {
  const [data, setData] = useState({
    fullName: "",
    email: "",
    phone: "",
    password: "",
  });
  const [errors, setErrors] = useState({
    fullName: "",
    email: "",
    phone: "",
    password: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const regexEmail = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
  const regexPassword =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  const regexName = /^[a-zA-Z ]+$|^$/;
  const regexPhone = /^[0-9]{10}$/;

  const handleChange = (e) => {
    if (e.target.name === "fullName" && !regexName.test(e.target.value)) return;
    setData({ ...data, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: false });
  };

  const validate = () => {
    if (!data.fullName) {
      return setErrors({ fullName: true });
    }
    if (!regexEmail.test(data.email)) {
      return setErrors({ email: true });
    }
    if (!regexPhone.test(data.phone)) {
      return setErrors({ phone: true });
    }
    if (!regexPassword.test(data.password)) {
      return setErrors({ password: true });
    }
    setErrors({ data });
    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (validate()) {
      alert("Register successfully!");

      let users = JSON.parse(localStorage.getItem("users")) || [];
      users.push(data);
      localStorage.setItem("users", JSON.stringify(users));

      setSubmitted(true);
    }
  };

  useEffect(() => {
    if (submitted) {
      axios
        .post("http://localhost:3004/users", data)
        .then((resp) => {
          console.log("User registered:", resp);
        })
        .catch((error) => {
          console.error("Error registering user:", error);
        })
        .finally(() => {
          setSubmitted(false);
          setData({
            fullName: "",
            email: "",
            phone: "",
            password: "",
          });
        });
    }
  }, [submitted]);

  return (
    <div className="main">
      <div className="form-1">
        <div className="logo">HAZE.</div>

        <div className="title">
          <h1>Hi there!</h1>
          <p>Welcome to Haze. Community Dashboard</p>
        </div>

        <div className="input-reg">
          <input
            type="text"
            name="fullName"
            value={data.fullName}
            onChange={handleChange}
            placeholder="Full Name"
          />
          {errors.fullName && (
            <p className="error-reg">Full Name is required</p>
          )}
        </div>

        <div className="input-reg">
          <input
            type="email"
            name="email"
            value={data.email}
            onChange={handleChange}
            placeholder="Email"
          />
          {errors.email && (
            <p className="error-reg">
              {data.email === "" ? "Email is required" : "Invalid email"}
            </p>
          )}
        </div>

        <div className="input-reg">
          <input
            type="number"
            name="phone"
            value={data.phone}
            onChange={handleChange}
            placeholder="Phone Number"
          />
          {errors.phone && (
            <p className="error-reg">
              {data.phone === ""
                ? "Phone Number is required"
                : "Invalid Phone Number"}
            </p>
          )}
        </div>

        <div className="input-reg">
          <input
            type="password"
            name="password"
            value={data.password}
            onChange={handleChange}
            placeholder="Password"
          />
          {errors.password && (
            <p className="error-reg">
              {data.password === ""
                ? "Password is required"
                : "Please enter strong Password"}
            </p>
          )}
        </div>

        <button type="submit" onClick={handleSubmit}>
          Create Account
        </button>

        <div className="login">
          <p className="login-link">
            {" "}
            Already have an account?<Link to="/login">Login</Link>
          </p>
        </div>
      </div>

      {/* <div className="form-2">
        <div className="link">
          <Link to="/" className="signup-link1">
            Sign up
          </Link>
          <Link to="/login" className="login-link1">
            Log in
          </Link>
        </div>

        <div className="logo-1">
          <h4>Largest Space Community</h4>
        </div>
        <div className="content">
          <h1 className="reg-title">
            Go anywhere you want in a Galaxy full of wonders!
          </h1>
          <h3 className="reg-h3">01____06</h3>
        </div>
      </div> */}
    </div>
  );
};

export default Register;
