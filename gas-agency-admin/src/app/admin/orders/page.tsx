'use client';

import { useState, useEffect } from 'react';
import { Package } from 'lucide-react';
import axios from 'axios';

interface OrderData {
  _id: string;
  name: string;
  amount: number;
  date: string;
  status: string;
  // Add other properties based on your transactionModel
}

const OrdersPage = () => {
  const [loading, setLoading] = useState(true);
  const [orders, setOrders] = useState<OrderData[]>([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchOrders = async () => {
      setLoading(true);
      setError('');
      try {
        const backendBaseURL = process.env.NEXT_PUBLIC_BACKEND_URL;
        const response = await axios.get<OrderData[]>(`${backendBaseURL}api/transactions`);
        setOrders(response.data);
      } catch (err: any) {
        setError(err.message || 'Failed to fetch orders');
        console.error('Error fetching orders:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  if (loading) return <div>Loading Orders...</div>;
  if (error) return <div className="text-red-500">Error: {error}</div>;

  return (
    <div className="p-6 space-y-4">
      <h1 className="text-2xl font-bold mb-4 flex items-center">
        <Package className="inline-block mr-2 h-6 w-6" />
        View Orders
      </h1>
      {orders.length === 0 ? (
        <p>No orders found.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white shadow-md rounded-lg">
            <thead className="bg-gray-100">
              <tr>
                <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="py-3 px-6 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order._id} className="hover:bg-gray-50">
                  <td className="py-4 px-6 whitespace-nowrap">{order._id}</td>
                  <td className="py-4 px-6 whitespace-nowrap">{order.name}</td>
                  <td className="py-4 px-6 whitespace-nowrap">${order.amount}</td>
                  <td className="py-4 px-6 whitespace-nowrap">{new Date(order.date).toLocaleDateString()}</td>
                  <td className="py-4 px-6 whitespace-nowrap">{order.status}</td>
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

export default OrdersPage;