'use client';

import { useState, useEffect } from 'react';
import axios from 'axios';
import { MessageCircle, Pencil, Trash } from 'lucide-react';

interface SimpleFeedbackData {
  _id: string;
  message: string;
  submittedAt: string;
}

const UserFeedbackPage = () => {
  const [loading, setLoading] = useState(true);
  const [feedback, setFeedback] = useState<SimpleFeedbackData[]>([]);
  const [filteredFeedback, setFilteredFeedback] = useState<SimpleFeedbackData[]>([]);
  const [error, setError] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [feedbackPerPage] = useState(5); // Number of feedback per page
  const baseURL = process.env.NEXT_PUBLIC_API_BASE_URL;

  useEffect(() => {
    const fetchFeedback = async () => {
      setLoading(true);
      setError('');
      try {
        const response = await axios.get<SimpleFeedbackData[]>(`${baseURL}api/feedback/`);
        setFeedback(response.data);
        setFilteredFeedback(response.data); // Initially show all feedback
      } catch (err: any) {
        setError(err?.response?.data?.message || err.message || 'Failed to fetch feedback');
      } finally {
        setLoading(false);
      }
    };

    fetchFeedback();
  }, [baseURL]);

  useEffect(() => {
    if (searchQuery === '') {
      setFilteredFeedback(feedback);
    } else {
      setFilteredFeedback(
        feedback.filter((item) =>
          item.message.toLowerCase().includes(searchQuery.toLowerCase())
        )
      );
    }
  }, [searchQuery, feedback]);

  // Pagination logic
  const indexOfLastFeedback = currentPage * feedbackPerPage;
  const indexOfFirstFeedback = indexOfLastFeedback - feedbackPerPage;
  const currentFeedback = filteredFeedback.slice(indexOfFirstFeedback, indexOfLastFeedback);

  // Calculate total pages
  const totalPages = Math.ceil(filteredFeedback.length / feedbackPerPage);

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  return (
    <div className="p-6 space-y-4">
      <h1 className="text-2xl font-bold mb-4 flex items-center">
        <MessageCircle className="inline-block mr-2 h-6 w-6" />
        Your Feedback
      </h1>

      <div className="mb-4">
        <input
          type="text"
          placeholder="Search by message"
          className="border px-4 py-2 rounded-md w-full"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      {loading ? (
        <p className="text-gray-600">Loading feedback...</p>
      ) : error ? (
        <p className="text-red-500">Error: {error}</p>
      ) : filteredFeedback.length === 0 ? (
        <p>No feedback found.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white shadow-md rounded-lg">
            <thead className="bg-gray-100">
              <tr>
                <th className="py-3 px-6 text-left">#</th>
                <th className="py-3 px-6 text-left">Message</th>
                <th className="py-3 px-6 text-left">Submitted At</th>
                <th className="py-3 px-6 text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {currentFeedback.map((item, index) => (
                <tr key={item._id} className="hover:bg-gray-50">
                  <td className="py-4 px-6 text-sm text-gray-700">{index + 1}</td>
                  <td className="py-4 px-6 text-sm text-gray-800">{item.message}</td>
                  <td className="py-4 px-6 text-sm text-gray-600">
                    {new Date(item.submittedAt).toLocaleDateString()}
                  </td>
                  <td className="py-4 px-6 text-right space-x-2 flex justify-center">
                    <button className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded flex items-center gap-1 text-sm">
                      <Pencil size={16} />
                      Edit
                    </button>
                    <button className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded flex items-center gap-1 text-sm">
                      <Trash size={16} />
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Pagination Controls */}
      <div className="flex justify-between items-center mt-4">
        <button
          disabled={currentPage === 1}
          onClick={() => setCurrentPage(currentPage - 1)}
          className="px-4 py-2 bg-gray-300 rounded"
        >
          Previous
        </button>
        <span>
          Page {currentPage} of {totalPages}
        </span>
        <button
          disabled={currentPage === totalPages}
          onClick={() => setCurrentPage(currentPage + 1)}
          className="px-4 py-2 bg-gray-300 rounded"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default UserFeedbackPage;
