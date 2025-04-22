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

const baseURL = 'http://192.168.1.115:5000/';

const AdminOrdersPage = () => {
  const [loading, setLoading] = useState(true);
  const [orders, setOrders] = useState<OrderData[]>([]);
  const [error, setError] = useState('');
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editingStatus, setEditingStatus] = useState<string>('');

  useEffect(() => {
    const fetchOrders = async () => {
      setLoading(true);
      setError('');
      try {
        const response = await axios.get<OrderData[]>(`${baseURL}api/orders/admin/orders`);
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

  const handleUpdate = async () => {
    if (!editingId || !editingStatus.trim()) return;

    try {
      await axios.put(`${baseURL}api/orders/${editingId}`, {
        status: editingStatus,
      });

      setOrders((prev) =>
        prev.map((order) =>
          order._id === editingId ? { ...order, status: editingStatus } : order
        )
      );
      setEditingId(null);
      setEditingStatus('');
    } catch (err) {
      alert('Failed to update status');
    }
  };

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
                <th className="py-3 px-6">#</th>
                <th className="py-3 px-6">Type</th>
                <th className="py-3 px-6">Category</th>
                <th className="py-3 px-6">Product</th>
                <th className="py-3 px-6">Vehicle No.</th>
                <th className="py-3 px-6">Booking Date</th>
                <th className="py-3 px-6">Service Date</th>
                <th className="py-3 px-6">Service Time</th>
                <th className="py-3 px-6">Status</th>
                <th className="py-3 px-6 text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order, index) => (
                <tr key={order._id} className="hover:bg-gray-50">
                  <td className="py-4 px-6">{index + 1}</td>
                  <td className="py-4 px-6">{order.orderType}</td>
                  <td className="py-4 px-6">{order.category}</td>
                  <td className="py-4 px-6">{order.product}</td>
                  <td className="py-4 px-6">{order.vehicleNumber || '-'}</td>
                  <td className="py-4 px-6">{new Date(order.bookingDate).toLocaleDateString()}</td>
                  <td className="py-4 px-6">{order.serviceDate}</td>
                  <td className="py-4 px-6">{order.serviceTime}</td>
                  <td className="py-4 px-6">
                    {editingId === order._id ? (
                      <input
                        className="border p-1 rounded"
                        value={editingStatus}
                        onChange={(e) => setEditingStatus(e.target.value)}
                      />
                    ) : (
                      order.status
                    )}
                  </td>
                  <td className="py-4 px-6 text-right">
                    {editingId === order._id ? (
                      <button
                        onClick={handleUpdate}
                        className="bg-green-600 hover:bg-green-700 text-white font-bold py-1 px-3 rounded"
                      >
                        Save
                      </button>
                    ) : (
                      <button
                        onClick={() => {
                          setEditingId(order._id);
                          setEditingStatus(order.status);
                        }}
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-3 rounded"
                      >
                        Update Status
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

export default AdminOrdersPage;
