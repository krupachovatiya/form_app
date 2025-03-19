import React, { useState, useEffect } from 'react'
import axios from 'axios'
import './Dashboard.css'

const Dashboard = () => {
  const [data, setData] = useState([])

  const getData = () => {
    axios.get('http://localhost:5002/users').then((resp) => {
        console.log('Result:', resp)
        setData(resp.data)
    })
}

useEffect(() => {
    getData()
}, [])

  return (
    <div className='dashboard'>
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
          {data.map((item) => 
          <tr key={item.id}>
            <td>{item.id}</td>
            <td>{item.fullName}</td>
            <td>{item.email}</td>
            <td>{item.phone}</td>
            <td>{item.password}</td>
          </tr>
          )}
        </tbody>
        
      </table>
    </div>
  )
}

export default Dashboard


