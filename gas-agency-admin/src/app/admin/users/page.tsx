'use client';

import { useState, useEffect } from 'react';
import { User } from 'lucide-react';
import axios from 'axios';

interface UserData {
  _id: string;
  name: string;
  email: string;
  // Add other properties based on your User model
  createdAt: string;
  updatedAt: string;
}

const UsersPage = () => {
  const [loading, setLoading] = useState(true);
  const [users, setUsers] = useState<UserData[]>([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true);
      setError('');
      try {
        const backendBaseURL = process.env.NEXT_PUBLIC_BACKEND_URL;
        const response = await axios.get<UserData[]>(`${backendBaseURL}api/admin/users`);
        setUsers(response.data);
      } catch (err: any) {
        setError(err.message || 'Failed to fetch users');
        console.error('Error fetching users:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  if (loading) return <div>Loading Users...</div>;
  if (error) return <div className="text-red-500">Error: {error}</div>;

  return (
    <div className="p-6 space-y-4">
      <h1 className="text-2xl font-bold mb-4 flex items-center">
        <User className="inline-block mr-2 h-6 w-6" />
        View Users
      </h1>
      {users.length === 0 ? (
        <p>No users found.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white shadow-md rounded-lg">
            <thead className="bg-gray-100">
              <tr>
                <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Registration Date</th>
                <th className="py-3 px-6 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user._id} className="hover:bg-gray-50">
                  <td className="py-4 px-6 whitespace-nowrap">{user._id}</td>
                  <td className="py-4 px-6 whitespace-nowrap">{user.name}</td>
                  <td className="py-4 px-6 whitespace-nowrap">{user.email}</td>
                  <td className="py-4 px-6 whitespace-nowrap">{new Date(user.createdAt).toLocaleDateString()}</td>
                  <td className="py-4 px-6 whitespace-nowrap text-right">
                    {/* Add action buttons for edit/delete if your backend supports it */}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default UsersPage;