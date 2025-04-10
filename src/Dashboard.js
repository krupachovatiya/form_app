import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Dashboard.css";

const Dashboard = () => {
  const [data, setData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  const getData = () => {
    axios.get("http://localhost:3004/users").then((resp) => {
      console.log("Result:", resp);
      setData(resp.data);
    });
  };

  useEffect(() => {
    getData();
  }, []);

  const filteredData = data.filter((user) =>
    user.fullName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="dashboard">
      <input
        type="text"
        placeholder="Search"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <h1>User Data</h1>
      <table>
        <thead>
          <tr>
            <td>Id</td>
            <td>Full Name</td>
            <td>Email</td>
            <td>Phone Number</td>
            <td>Password</td>
          </tr>
        </thead>

        <tbody>
          {filteredData.length === 0 ? (
            <tr>
              <td colSpan="5">No users found.</td>
            </tr>
          ) : (
            filteredData.map((item) => (
              <tr key={item.id}>
                <td>{item.id}</td>
                <td>{item.fullName}</td>
                <td>{item.email}</td>
                <td>{item.phone}</td>
                <td>{item.password}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Dashboard;
