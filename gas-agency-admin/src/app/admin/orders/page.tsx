'use client';

import { useState, useEffect } from 'react';
import axios from 'axios';
import { Package } from 'lucide-react';

interface OrderData {
  _id: string;
  orderType: 'LPG' | 'Lubes';
  category: string;
  product: string;
  vehicleNumber?: string;
  serviceDate: string;
  serviceTime: string;
  bookingDate: string;
  status: string;
}

const AdminOrdersPage = () => {
  const [loading, setLoading] = useState(true);
  const [orders, setOrders] = useState<OrderData[]>([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchOrders = async () => {
      setLoading(true);
      setError('');
      try {
        const response = await axios.get<OrderData[]>('http://192.168.1.79:5000/api/orders/admin/orders');
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
                <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
                <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Product</th>
                <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Vehicle No.</th>
                <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Booking Date</th>
                <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Service Date</th>
                <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Service Time</th>
                <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="py-3 px-6 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order, index) => (
                <tr key={order._id} className="hover:bg-gray-50">
                  <td className="py-4 px-6 whitespace-nowrap">{index + 1}</td>
                  <td className="py-4 px-6 whitespace-nowrap">{order.orderType}</td>
                  <td className="py-4 px-6 whitespace-nowrap">{order.category}</td>
                  <td className="py-4 px-6 whitespace-nowrap">{order.product}</td>
                  <td className="py-4 px-6 whitespace-nowrap">{order.vehicleNumber || '-'}</td>
                  <td className="py-4 px-6 whitespace-nowrap">{new Date(order.bookingDate).toLocaleDateString()}</td>
                  <td className="py-4 px-6 whitespace-nowrap">{order.serviceDate}</td>
                  <td className="py-4 px-6 whitespace-nowrap">{order.serviceTime}</td>
                  <td className="py-4 px-6 whitespace-nowrap">{order.status}</td>
                  <td className="py-4 px-6 whitespace-nowrap text-right">
                    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                      View
                    </button>
                    <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded ml-2">
                      Update Status
                    </button>
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

export default AdminOrdersPage;
