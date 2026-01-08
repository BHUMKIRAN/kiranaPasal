'use client'
import React, { useState } from 'react'

const Register = () => {
  // State for form inputs
  const [formData, setFormData] = useState({
    fullname: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  }

  // Check if passwords match
  const checkPasswords = (password, confirmPassword) => {
    if (password !== confirmPassword) {
      alert("Your passwords do not match!");
      return false;
    }
    return true;
  }

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault(); // prevent page refresh

    // Validate passwords
    if (!checkPasswords(formData.password, formData.confirmPassword)) {
      return; // stop submission if passwords don't match
    }

    // If valid, submit to database (placeholder)
    console.log('Form Data Submitted:', formData);

    // Reset form (optional)
    setFormData({
      fullname: '',
      email: '',
      password: '',
      confirmPassword: ''
    });

    alert("Registration successful!");
  }

  return (
    <div className="flex justify-center">
      <div className="flex flex-col justify-center items-center m-5 h-auto w-80 font-serif bg-gray-400 rounded-xl shadow-2xl p-5 space-y-4">
        <h1 className="text-2xl font-semibold text-center">Register</h1>
        
        <form className="flex flex-col space-y-3 w-full" onSubmit={handleSubmit}>
          <div className="flex flex-col">
            <label htmlFor="fullname"><span className="text-red-700">*</span> Full Name</label>
            <input
              className="w-full border rounded p-2"
              type="text"
              name="fullname"
              id="fullname"
              value={formData.fullname}
              onChange={handleChange}
              required
            />
          </div>

          <div className="flex flex-col">
            <label htmlFor="email"><span className="text-red-700">*</span> Email</label>
            <input
              className="w-full border rounded p-2"
              type="email"
              name="email"
              id="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="flex flex-col">
            <label htmlFor="password"><span className="text-red-700">*</span> Password</label>
            <input
              className="w-full border rounded p-2"
              type="password"
              name="password"
              id="password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>

          <div className="flex flex-col">
            <label htmlFor="confirmPassword"><span className="text-red-700">*</span> Confirm Password</label>
            <input
              className="w-full border rounded p-2"
              type="password"
              name="confirmPassword"
              id="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
            />
          </div>

          <button
            className="bg-cyan-500 shadow-lg shadow-cyan-500/50 border border-blue-800 rounded py-2 mt-2 text-white font-semibold hover:bg-cyan-600"
            type="submit"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  )
}

export default Register
