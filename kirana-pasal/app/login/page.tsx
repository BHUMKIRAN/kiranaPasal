'use client' // important for client-side hooks

import React from 'react'
import { useRouter } from 'next/navigation'

const Login = () => {
  const router = useRouter();

  const handleForgetPassword = () => {
    router.push('/forgetPassword'); // redirect to forget password page
  }

  const handleRegister = () => {
    router.push('/register'); // redirect to register page
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="flex flex-col justify-center items-center border-2 border-blue-300 shadow-2xl shadow-amber-300 rounded-2xl h-[28rem] w-80 m-5 p-5 space-y-4 bg-gray-200">
        <h1 className="uppercase text-xl font-bold text-center">Login to Mero Kirana Pasal</h1>

        <div className="flex flex-col w-full">
          <label htmlFor="email" className="mb-1 font-medium">Username:</label>
          <input
            className="ring ring-blue-500/50 rounded p-2"
            type="email"
            name="email"
            id="email"
            placeholder="Enter your email"
          />
        </div>

        <div className="flex flex-col w-full">
          <label htmlFor="password" className="mb-1 font-medium">Password:</label>
          <input
            className="ring ring-blue-500/50 rounded p-2"
            type="password"
            name="password"
            id="password"
            placeholder="Enter your password"
          />
        </div>

        <div className="flex space-x-4 mt-4">
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            onClick={handleRegister}
          >
            Register
          </button>

          <button
            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
            onClick={handleForgetPassword}
          >
            Forget Password
          </button>
        </div>
      </div>
    </div>
  )
}

export default Login
