'use client';

import { useState, useEffect } from 'react';
import { MessageCircle } from 'lucide-react';
import axios from 'axios';

interface FeedbackData {
  _id: string;
  name: string;
  mobile: string;
  address: string;
  message: string;
  quantity: number;
  type: 'IPG' | 'Lubes';
  createdAt: string;
  updatedAt: string;
}

const FeedbackPage = () => {
  const [loading, setLoading] = useState(true);
  const [feedback, setFeedback] = useState<FeedbackData[]>([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchFeedback = async () => {
      setLoading(true);
      setError('');
      try {
        const backendBaseURL = process.env.NEXT_PUBLIC_BACKEND_URL;
        const response = await axios.get<FeedbackData[]>(`${backendBaseURL}api/enquiries`);
        setFeedback(response.data);
      } catch (err: any) {
        setError(err.message || 'Failed to fetch feedback');
        console.error('Error fetching feedback:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchFeedback();
  }, []);

  if (loading) return <div>Loading Feedback...</div>;
  if (error) return <div className="text-red-500">Error: {error}</div>;

  return (
    <div className="p-6 space-y-4">
      <h1 className="text-2xl font-bold mb-4 flex items-center">
        <MessageCircle className="inline-block mr-2 h-6 w-6" />
        Feedback Panel
      </h1>
      {feedback.length === 0 ? (
        <p>No feedback available.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white shadow-md rounded-lg">
            <thead className="bg-gray-100">
              <tr>
                <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Mobile</th>
                <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Message</th>
                <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                <th className="py-3 px-6 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody>
              {feedback.map((item) => (
                <tr key={item._id} className="hover:bg-gray-50">
                  <td className="py-4 px-6 whitespace-nowrap">{item._id}</td>
                  <td className="py-4 px-6 whitespace-nowrap">{item.name}</td>
                  <td className="py-4 px-6 whitespace-nowrap">{item.mobile}</td>
                  <td className="py-4 px-6">{item.message}</td>
                  <td className="py-4 px-6 whitespace-nowrap">{item.type}</td>
                  <td className="py-4 px-6 whitespace-nowrap">{new Date(item.createdAt).toLocaleDateString()}</td>
                  <td className="py-4 px-6 whitespace-nowrap text-right">
                    {/* Add action buttons */}
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

export default FeedbackPage;