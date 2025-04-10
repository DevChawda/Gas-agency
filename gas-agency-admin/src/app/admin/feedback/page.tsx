'use client';

import { useState, useEffect } from 'react';
import { MessageCircle, Pencil } from 'lucide-react';
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
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editingMessage, setEditingMessage] = useState('');

  useEffect(() => {
    const fetchFeedback = async () => {
      try {
        setLoading(true);
        const backendBaseURL = process.env.NEXT_PUBLIC_API_BASE_URL;
        const response = await axios.get<FeedbackData[]>(`${backendBaseURL}api/enquiries`);
        setFeedback(response.data);
      } catch (err: any) {
        setError(err.message || 'Failed to fetch feedback');
      } finally {
        setLoading(false);
      }
    };

    fetchFeedback();
  }, []);

  const handleEditClick = (id: string, message: string) => {
    setEditingId(id);
    setEditingMessage(message);
  };

  const handleUpdate = async () => {
    if (!editingId) return;

    try {
      const backendBaseURL = process.env.NEXT_PUBLIC_BACKEND_URL;
      await axios.put(`${backendBaseURL}api/enquiries/${editingId}`, {
        message: editingMessage,
      });

      setFeedback((prev) =>
        prev.map((item) => (item._id === editingId ? { ...item, message: editingMessage } : item))
      );
      setEditingId(null);
    } catch (err) {
      alert('Failed to update message');
    }
  };

  return (
    <div className="p-6 space-y-4">
      <h1 className="text-2xl font-bold mb-4 flex items-center">
        <MessageCircle className="inline-block mr-2 h-6 w-6" />
        Feedback Panel
      </h1>

      {loading ? (
        <p>Loading Feedback...</p>
      ) : error ? (
        <p className="text-red-500">Error: {error}</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white shadow-md rounded-lg">
            <thead className="bg-gray-100">
              <tr>
                <th className="py-3 px-6 text-left">ID</th>
                <th className="py-3 px-6 text-left">Name</th>
                <th className="py-3 px-6 text-left">Mobile</th>
                <th className="py-3 px-6 text-left">Message</th>
                <th className="py-3 px-6 text-left">Type</th>
                <th className="py-3 px-6 text-left">Date</th>
                <th className="py-3 px-6 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {feedback.map((item) => (
                <tr key={item._id} className="hover:bg-gray-50">
                  <td className="py-4 px-6">{item._id}</td>
                  <td className="py-4 px-6">{item.name}</td>
                  <td className="py-4 px-6">{item.mobile}</td>
                  <td className="py-4 px-6">
                    {editingId === item._id ? (
                      <input
                        type="text"
                        value={editingMessage}
                        onChange={(e) => setEditingMessage(e.target.value)}
                        className="border p-1 w-full rounded"
                      />
                    ) : (
                      item.message
                    )}
                  </td>
                  <td className="py-4 px-6">{item.type}</td>
                  <td className="py-4 px-6">{new Date(item.createdAt).toLocaleDateString()}</td>
                  <td className="py-4 px-6 text-right">
                    {editingId === item._id ? (
                      <button
                        onClick={handleUpdate}
                        className="text-green-600 hover:underline mr-2"
                      >
                        Save
                      </button>
                    ) : (
                      <button
                        onClick={() => handleEditClick(item._id, item.message)}
                        className="text-blue-600 hover:underline flex items-center gap-1"
                      >
                        <Pencil size={16} />
                        Edit
                      </button>
                    )}
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
