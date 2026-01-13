"use client";
import { useState } from "react";

type User = {
  id: number;
  name: string;
  email: string;
  password: string;
};

 function AdminDashboard() {
  const initialUsers: User[] = [
    { id: 1, name: "Kiran Doe", email: "kiran@gmail.com", password: "123456" },
    { id: 2, name: "Jane Doe", email: "jane@gmail.com", password: "password@123" },
  ];

  const [users, setUsers] = useState<User[]>(initialUsers);
  const [showPassword, setShowPassword] = useState<number | null>(null);
  const [editUserId, setEditUserId] = useState<number | null>(null);
  const [editFormData, setEditFormData] = useState<User>({
    id: 0,
    name: "",
    email: "",
    password: "",
  });

  // Delete user
  const handleDelete = (id: number) => {
    const filtered = users.filter((user) => user.id !== id);
    setUsers(filtered);
  };

  // Start editing
  const handleEdit = (user: User) => {
    setEditUserId(user.id);
    setEditFormData(user);
  };

  // Save edited user
  const handleSave = () => {
    setUsers(
      users.map((user) =>
        user.id === editUserId ? { ...editFormData } : user
      )
    );
    setEditUserId(null);
  };

  // Handle form changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditFormData({ ...editFormData, [e.target.name]: e.target.value });
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h2 className="text-3xl font-bold mb-6 text-gray-800">
        User Management
      </h2>

      <div className="overflow-x-auto bg-white shadow-md rounded-lg">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-500 uppercase">
                ID
              </th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-500 uppercase">
                Name
              </th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-500 uppercase">
                Email
              </th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-500 uppercase">
                Password
              </th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-500 uppercase">
                Actions
              </th>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-200">
            {users.map((user) => (
              <tr key={user.id} className="hover:bg-gray-100">
                <td className="px-6 py-4">{user.id}</td>

                <td className="px-6 py-4">
                  {editUserId === user.id ? (
                    <input
                      type="text"
                      name="name"
                      value={editFormData.name}
                      onChange={handleChange}
                      className="border px-2 py-1 rounded w-full"
                    />
                  ) : (
                    user.name
                  )}
                </td>

                <td className="px-6 py-4">
                  {editUserId === user.id ? (
                    <input
                      type="email"
                      name="email"
                      value={editFormData.email}
                      onChange={handleChange}
                      className="border px-2 py-1 rounded w-full"
                    />
                  ) : (
                    user.email
                  )}
                </td>

                <td className="px-6 py-4 flex items-center gap-3">
                  {editUserId === user.id ? (
                    <input
                      type="text"
                      name="password"
                      value={editFormData.password}
                      onChange={handleChange}
                      className="border px-2 py-1 rounded w-full font-mono"
                    />
                  ) : (
                    <span className="font-mono">
                      {showPassword === user.id
                        ? user.password
                        : "********"}
                    </span>
                  )}

                  {!editUserId && (
                    <button
                      onClick={() =>
                        setShowPassword(
                          showPassword === user.id ? null : user.id
                        )
                      }
                      className="text-blue-600 text-sm hover:underline"
                    >
                      {showPassword === user.id ? "Hide" : "Show"}
                    </button>
                  )}
                </td>

                <td className="px-6 py-4 flex gap-2">
                  {editUserId === user.id ? (
                    <>
                      <button
                        onClick={handleSave}
                        className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600"
                      >
                        Save
                      </button>
                      <button
                        onClick={() => setEditUserId(null)}
                        className="bg-gray-300 px-3 py-1 rounded hover:bg-gray-400"
                      >
                        Cancel
                      </button>
                    </>
                  ) : (
                    <>
                      <button
                        onClick={() => handleEdit(user)}
                        className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(user.id)}
                        className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                      >
                        Delete
                      </button>
                    </>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
export default AdminDashboard;