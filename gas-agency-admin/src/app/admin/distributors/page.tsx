'use client';

import { useState, useEffect } from 'react';
import { UserCog } from 'lucide-react';

// Simulated distributor data
const simulatedDistributors = [
  { id: 101, name: 'Shiva Gas Agency', location: 'Indore', contactPerson: 'Ramesh Sharma', phone: '9876543210' },
  { id: 102, name: 'Sai Krupa Gas', location: 'Bhopal', contactPerson: 'Priya Verma', phone: '8765432109' },
  { id: 103, name: 'Omkar Gas Service', location: 'Ujjain', contactPerson: 'Suresh Patel', phone: '7654321098' },
  // Add more simulated distributors as needed
];

const DistributorsPage = () => {
  const [loading, setLoading] = useState(true);
  const [distributors, setDistributors] = useState(simulatedDistributors);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);

  if (loading) return <div>Loading Distributors...</div>;

  return (
    <div className="p-6 space-y-4">
      <h1 className="text-2xl font-bold mb-4">Manage Distributors</h1>
      {distributors.length === 0 ? (
        <p>No distributors found.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white shadow-md rounded-lg">
            <thead className="bg-gray-100">
              <tr>
                <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Location</th>
                <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Contact Person</th>
                <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Phone</th>
                <th className="py-3 px-6 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody>
              {distributors.map((distributor) => (
                <tr key={distributor.id} className="hover:bg-gray-50">
                  <td className="py-4 px-6 whitespace-nowrap">{distributor.id}</td>
                  <td className="py-4 px-6 whitespace-nowrap">{distributor.name}</td>
                  <td className="py-4 px-6 whitespace-nowrap">{distributor.location}</td>
                  <td className="py-4 px-6 whitespace-nowrap">{distributor.contactPerson}</td>
                  <td className="py-4 px-6 whitespace-nowrap">{distributor.phone}</td>
                  <td className="py-4 px-6 whitespace-nowrap text-right">
                    {/* Add action buttons here (e.g., Edit, Delete) */}
                    <button className="text-yellow-500 hover:text-yellow-700 mr-2">Edit</button>
                    <button className="text-red-500 hover:text-red-700">Delete</button>
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

export default DistributorsPage;