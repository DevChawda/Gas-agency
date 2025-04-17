'use client';

import { useState, useEffect } from 'react';
import { MessageCircle, Pencil, Save } from 'lucide-react';
import axios from 'axios';

interface SimpleFeedbackData {
  _id: string;
  message: string;
  createdAt: string;
}

const FeedbackPage = () => {
  const [loading, setLoading] = useState(true);
  const [feedback, setFeedback] = useState<SimpleFeedbackData[]>([]);
  const [error, setError] = useState('');
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editingMessage, setEditingMessage] = useState('');
  const baseURL = process.env.NEXT_PUBLIC_API_BASE_URL;

  useEffect(() => {
    const fetchFeedback = async () => {
      setLoading(true);
      setError('');
      try {
        const response = await axios.get<SimpleFeedbackData[]>(`${baseURL}api/feedback`);
        setFeedback(response.data);
      } catch (err: any) {
        setError(err?.response?.data?.message || err.message || 'Failed to fetch feedback');
      } finally {
        setLoading(false);
      }
    };

    fetchFeedback();
  }, [baseURL]);

  const handleEditClick = (id: string, message: string) => {
    setEditingId(id);
    setEditingMessage(message);
  };

  const handleUpdate = async () => {
    if (!editingId || !editingMessage.trim()) return;

    try {
      await axios.put(`${baseURL}api/feedback/${editingId}`, {
        message: editingMessage,
      });

      setFeedback((prev) =>
        prev.map((item) =>
          item._id === editingId ? { ...item, message: editingMessage } : item
        )
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
        User Feedback
      </h1>

      {loading ? (
        <p className="text-gray-600">Loading feedback...</p>
      ) : error ? (
        <p className="text-red-500">Error: {error}</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white shadow-md rounded-lg">
            <thead className="bg-gray-100">
              <tr>
                <th className="py-3 px-6 text-left">#</th>
                <th className="py-3 px-6 text-left">Message</th>
                <th className="py-3 px-6 text-left">Submitted At</th>
                <th className="py-3 px-6 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {feedback.map((item, index) => (
                <tr key={item._id} className="hover:bg-gray-50">
                  <td className="py-4 px-6 text-sm text-gray-700">{index + 1}</td>
                  <td className="py-4 px-6">
                    {editingId === item._id ? (
                      <input
                        type="text"
                        value={editingMessage}
                        onChange={(e) => setEditingMessage(e.target.value)}
                        className="border p-2 w-full rounded text-sm"
                        autoFocus
                      />
                    ) : (
                      <p className="text-sm text-gray-800">{item.message}</p>
                    )}
                  </td>
                  <td className="py-4 px-6 text-sm text-gray-600">
                    {new Date(item.createdAt).toLocaleDateString()}
                  </td>
                  <td className="py-4 px-6 text-right">
                    {editingId === item._id ? (
                      <button
                        onClick={handleUpdate}
                        className="bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded flex items-center gap-1 text-sm"
                      >
                        <Save size={16} />
                        Save
                      </button>
                    ) : (
                      <button
                        onClick={() => handleEditClick(item._id, item.message)}
                        className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded flex items-center gap-1 text-sm"
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
