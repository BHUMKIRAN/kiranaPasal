'use client'
import React, { useState } from 'react'

const ResetPassword = () => {
  const [newPassword, setNewPassword] = useState('')
  const [confirmNewPassword, setConfirmNewPassword] = useState('')

  const handleResetPassword = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault() // prevent page reload

    if (newPassword === confirmNewPassword) {
      alert('Password successfully changed!')
      // TODO: Update password to database here
      setNewPassword('')
      setConfirmNewPassword('')
    } else {
      alert("Passwords do not match!")
    }
  }

  return (
    <div className="flex justify-center items-center bg-gray-300 min-h-screen p-5">
      <form
        className="flex flex-col bg-white p-6 rounded shadow-md w-80 space-y-4"
        onSubmit={handleResetPassword}
      >
        <h2 className="text-xl font-semibold text-center">Reset Password</h2>

        <div className="flex flex-col">
          <label htmlFor="newPassword">New Password</label>
          <input
            id="newPassword"
            type="password"
            className="border rounded p-2"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            required
          />
        </div>

        <div className="flex flex-col">
          <label htmlFor="confirmNewPassword">Confirm New Password</label>
          <input
            id="confirmNewPassword"
            type="password"
            className="border rounded p-2"
            value={confirmNewPassword}
            onChange={(e) => setConfirmNewPassword(e.target.value)}
            required
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-500 text-white rounded py-2 font-semibold hover:bg-blue-600"
        >
          Reset Password
        </button>
      </form>
    </div>
  )
}

export default ResetPassword
