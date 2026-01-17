'use client'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'

const UserTable = () => {

  const [user, setUser] = useState([])
 
  const router = useRouter();
  const fetchUsers = async () => {
    const { data } = await axios.get("http://localhost:4000/users")
    setUser(data)
  }
  useEffect(() => {
    fetchUsers()
  }, [])
  
  const handleDelete=async(id: number)=>{

       if(confirm("Are you sure want to delete ??"))
        await axios.delete(`http://localhost:4000/users/${id}`)
        setUser((prev)=>prev.filter((items)=>items.id !== id))
      
  }
  return (
    <div className='bg-white rounded-lg font-serif'>
      <div className="flex items-center justify-between bg-gray-400 px-4">
        <h2 className="text-3xl font-bold mx-auto">
          User Management
        </h2>

        <button className="bg-green-500 text-white rounded-lg px-4 py-2 hover:bg-green-700"
        onClick={()=>router.push(`/admin/users/CreateUsers`)}>
          Add User
        </button>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full ">
          <thead className="bg-gray-200 border border-gray-200">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">NAME</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email/Phone</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Password</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Action</th>
            </tr>
          </thead>
          <tbody>
            {user.map((users,index) =>
              <tr key={users.id}>
                <td className="px-6 py-3 tracking-wider whitespace-nowrap text-sm ">{index+1}</td>
                <td>{users.name}</td>
                <td>{users.email}</td>
                <td>{users.password}</td>
                <td>
                  <button className="text-blue-500 mr-3 hover:text-blue-700 "
                  onClick={()=>router.push(`/admin/users/${users.id}/ViewUser`)}>View</button>
                  <button className="text-green-500  hover:text-green-700 mr-3 "
                  onClick={()=>router.push(`/admin/users/${users.id}/EditUser`)}>Edit</button>
                  <button
                    className="text-red-500 hover:text-red-700 "
                    onClick={()=>handleDelete(users.id)}>Delete</button>
                </td>
              </tr>)
            }
          </tbody>
        </table>
      </div>
    </div>

  )
}

export default UserTable