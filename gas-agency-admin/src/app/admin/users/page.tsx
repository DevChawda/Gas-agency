'use client';

import { useState, useEffect } from 'react';
import { User, Pencil } from 'lucide-react';
import axios from 'axios';

interface UserData {
  _id: string;
  name: string;
  email: string;
  createdAt: string;
  updatedAt: string;
}

const UsersPage = () => {
  const [loading, setLoading] = useState(true);
  const [users, setUsers] = useState<UserData[]>([]);
  const [error, setError] = useState('');
  const [editUser, setEditUser] = useState<UserData | null>(null);
  const [editName, setEditName] = useState('');
  const [editEmail, setEditEmail] = useState('');

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setLoading(true);
        const backendBaseURL = process.env.NEXT_PUBLIC_API_BASE_URL ;
        const response = await axios.get<UserData[]>(`${backendBaseURL}api/admin/users`);
        setUsers(response.data);
      } catch (err: any) {
        setError(err.message || 'Failed to fetch users');
      } finally {
        setLoading(false);
      }
    };
    fetchUsers();
  }, []);

  const handleEditClick = (user: UserData) => {
    setEditUser(user);
    setEditName(user.name);
    setEditEmail(user.email);
  };

  const handleUpdateUser = async () => {
    if (!editUser) return;

    try {
      const backendBaseURL = process.env.NEXT_PUBLIC_BACKEND_URL;
      await axios.put(`${backendBaseURL}api/admin/users/${editUser._id}`, {
        name: editName,
        email: editEmail,
      });

      setUsers((prev) =>
        prev.map((u) => (u._id === editUser._id ? { ...u, name: editName, email: editEmail } : u))
      );

      setEditUser(null);
    } catch (err) {
      alert('Failed to update user');
    }
  };

  return (
    <div className="p-6 space-y-4">
      <h1 className="text-2xl font-bold mb-4 flex items-center">
        <User className="inline-block mr-2 h-6 w-6" />
        View Users
      </h1>

      {loading ? (
        <p>Loading Users...</p>
      ) : error ? (
        <p className="text-red-500">Error: {error}</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white shadow-md rounded-lg">
            <thead className="bg-gray-100">
              <tr>
                <th className="py-3 px-6 text-left">ID</th>
                <th className="py-3 px-6 text-left">Name</th>
                <th className="py-3 px-6 text-left">Email</th>
                <th className="py-3 px-6 text-left">Registration Date</th>
                <th className="py-3 px-6 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user._id} className="hover:bg-gray-50">
                  <td className="py-4 px-6">{user._id}</td>
                  <td className="py-4 px-6">{user.name}</td>
                  <td className="py-4 px-6">{user.email}</td>
                  <td className="py-4 px-6">{new Date(user.createdAt).toLocaleDateString()}</td>
                  <td className="py-4 px-6 text-right">
                    <button
                      onClick={() => handleEditClick(user)}
                      className="text-blue-600 hover:underline flex items-center gap-1"
                    >
                      <Pencil size={16} />
                      Edit
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {editUser && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50">
          <div className="bg-white p-6 rounded-xl shadow-md space-y-4 w-full max-w-md">
            <h2 className="text-xl font-semibold">Edit User</h2>
            <input
              type="text"
              className="border p-2 w-full rounded"
              value={editName}
              onChange={(e) => setEditName(e.target.value)}
              placeholder="Name"
            />
            <input
              type="email"
              className="border p-2 w-full rounded"
              value={editEmail}
              onChange={(e) => setEditEmail(e.target.value)}
              placeholder="Email"
            />
            <div className="flex justify-end gap-2">
              <button
                onClick={() => setEditUser(null)}
                className="px-4 py-2 bg-gray-300 rounded"
              >
                Cancel
              </button>
              <button
                onClick={handleUpdateUser}
                className="px-4 py-2 bg-blue-600 text-white rounded"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UsersPage;
