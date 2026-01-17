'use client'
import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation';
import { useParams } from 'next/navigation';
import axios from 'axios';

const ViewUser = () => {

  const router = useRouter()
  const { id } = useParams()

  const [user, setUser] = useState([])

  const fetchUser = async () => {
    const { data } = await axios.get(`http://localhost:4000/users/${id}`)
    setUser(data)
  }

  useEffect(() => {
    fetchUser();
  }, [id])
  return (
    <div className="flex items-center justify-center bg-gradient-to-br from-indigo-100 via-sky-100 to-purple-100 p-6">
      <div className="w-[50%] max-w-md rounded-3xl bg-white shadow-xl ring-1 ring-gray-200">

        {/* Header */}
        <div className="flex flex-col items-center gap-3 rounded-t-3xl bg-gradient-to-r from-indigo-500 to-purple-600 p-6 text-white">

          <div>
            {user.image ? (
              <img
                src={user.image}
                alt={user.name}
                className="h-24 w-24 rounded-full border-4 border-white object-cover shadow-md"
              />
            ) : (
              <div className="flex h-24 w-24 items-center justify-center rounded-full border-4 border-white bg-gray-300 text-2xl font-bold text-gray-700 shadow-md">
                {user.name?.charAt(0)}
              </div>
            )}
          </div>
          <h2 className="text-xl font-semibold tracking-wide">
            {user.name}
          </h2>
          <p className="text-sm opacity-90">User Profile</p>
        </div>

        {/* Body */}
        <div className="space-y-4 p-6">
          <div className="flex items-center justify-between rounded-xl bg-gray-50 px-4 py-3 shadow-sm">
            <span className="text-sm font-medium text-gray-500">Email</span>
            <span className="text-sm font-semibold text-gray-800">
              {user.email}
            </span>
          </div>

          <div className="flex items-center justify-between rounded-xl bg-gray-50 px-4 py-3 shadow-sm">
            <span className="text-sm font-medium text-gray-500">Phone</span>
            <span className="text-sm font-semibold text-gray-800">
              {user.phone}
            </span>
          </div>
        </div>

        {/* Footer */}
        <div className="flex justify-end gap-3 rounded-b-3xl bg-gray-50 p-4">
          <button
            onClick={() => router.back()}
            className="rounded-xl bg-gray-200 px-4 py-2 text-sm font-semibold text-gray-700 transition hover:bg-gray-300"
          >
            Back
          </button>

          <button
            className="rounded-xl bg-indigo-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-indigo-700"
           onClick={()=> router.push(`/admin/users/${user.id}/EditUser`)}
           >
            Edit
          </button>
        </div>
      </div>
    </div>

  )
}

export default ViewUser