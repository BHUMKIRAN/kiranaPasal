'use client'
import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import axios from 'axios'

const CreateUsers = () => {
  const router = useRouter()

  const [id, setId] = useState("")
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [phone, setPhone] = useState("")
  const [password, setPassword] = useState("")

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    try {
      await axios.post("http://localhost:4000/users", {
        id, name, email, phone, password
      })
      alert("User added successfully!")
      router.push("/admin/users")
    } catch (err) {
      console.error(err)
      alert("Failed to add user!")
    }
  }

  return (
    <div className="flex justify-center items-center min-h-screen py-8 px-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl p-8">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-800 mb-2">Enter User Details</h2>
          <p className="text-gray-500 text-sm">Fill in the information below</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label htmlFor="id" className="block text-sm font-semibold text-gray-700 mb-2">ID</label>
            <input
              type="number"
              id="id"
              value={id}
              onChange={(e) => setId(e.target.value)}
              placeholder="Enter ID"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition duration-200"
              required
            />
          </div>

          <div>
            <label htmlFor="name" className="block text-sm font-semibold text-gray-700 mb-2">Full Name</label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter full name"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition duration-200"
              required
            />
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2">Email Address</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="example@email.com"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition duration-200"
              required
            />
          </div>

          <div>
            <label htmlFor="phone" className="block text-sm font-semibold text-gray-700 mb-2">Phone Number</label>
            <input
              type="tel"
              id="phone"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="+1 234 567 8900"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition duration-200"
              required
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-semibold text-gray-700 mb-2">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter password"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition duration-200"
              required
            />
          </div>

          <div className="flex gap-4 pt-4">
            <button
              type="submit"
              className="flex-1 bg-gradient-to-r from-green-500 to-green-600 text-white font-semibold py-3 px-6 rounded-lg hover:from-green-600 hover:to-green-700 transition duration-200 shadow-lg"
            >
              Save
            </button>
            <button
              type="button"
              onClick={() => router.push("/admin/users")}
              className="flex-1 bg-gradient-to-r from-red-500 to-red-600 text-white font-semibold py-3 px-6 rounded-lg hover:from-red-600 hover:to-red-700 transition duration-200 shadow-lg"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default CreateUsers
