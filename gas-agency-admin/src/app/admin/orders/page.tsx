'use client';

import { useState, useEffect } from 'react';
import axios from 'axios';
import { Package, Pencil } from 'lucide-react';

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

const baseURL =
  process.env.NEXT_PUBLIC_API_BASE_URL?.endsWith('/')
    ? process.env.NEXT_PUBLIC_API_BASE_URL
    : `${process.env.NEXT_PUBLIC_API_BASE_URL}/` || 'http://localhost:5000/';

const AdminOrdersPage = () => {
  const [loading, setLoading] = useState(true);
  const [orders, setOrders] = useState<OrderData[]>([]);
  const [error, setError] = useState('');
  const [editOrder, setEditOrder] = useState<OrderData | null>(null);
  const [editStatus, setEditStatus] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [ordersPerPage] = useState(5); // Number of orders per page

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

  const handleEditClick = (order: OrderData) => {
    setEditOrder(order);
    setEditStatus(order.status);
  };

  const handleUpdateOrder = async () => {
    if (!editOrder) return;

    try {
      await axios.put(`${baseURL}api/orders/updateOrderStatus`, {
        orderId: editOrder._id,
        orderType: editOrder.orderType,
        status: editStatus,
      });

      setOrders((prev) =>
        prev.map((o) =>
          o._id === editOrder._id ? { ...o, status: editStatus } : o
        )
      );

      setEditOrder(null);
    } catch (err) {
      alert('Failed to update order status');
    }
  };

  // Search function to filter orders based on the query
  const filteredOrders = orders.filter((order) => {
    return (
      order.orderType.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.product.toLowerCase().includes(searchQuery.toLowerCase())
    );
  });

  // Pagination logic
  const indexOfLastOrder = currentPage * ordersPerPage;
  const indexOfFirstOrder = indexOfLastOrder - ordersPerPage;
  const currentOrders = filteredOrders.slice(indexOfFirstOrder, indexOfLastOrder);

  // Calculate total pages
  const totalPages = Math.ceil(filteredOrders.length / ordersPerPage);

  // Pagination control
  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  return (
    <div className="p-6 space-y-4">
      <h1 className="text-2xl font-bold mb-4 flex items-center">
        <Package className="inline-block mr-2 h-6 w-6" />
        View Orders
      </h1>

      <div className="mb-4">
        {/* Search Input */}
        <input
          type="text"
          className="border p-2 w-full rounded"
          placeholder="Search orders by type, category, or product"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      {loading ? (
        <p>Loading Orders...</p>
      ) : error ? (
        <p className="text-red-500">Error: {error}</p>
      ) : filteredOrders.length === 0 ? (
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
              {currentOrders.map((order, index) => (
                <tr key={order._id} className="hover:bg-gray-50">
                  <td className="py-4 px-6">{index + 1}</td>
                  <td className="py-4 px-6">{order.orderType}</td>
                  <td className="py-4 px-6">{order.category}</td>
                  <td className="py-4 px-6">{order.product}</td>
                  <td className="py-4 px-6">{order.vehicleNumber || '-'}</td>
                  <td className="py-4 px-6">
                    {new Date(order.bookingDate).toLocaleDateString()}
                  </td>
                  <td className="py-4 px-6">{order.serviceDate}</td>
                  <td className="py-4 px-6">{order.serviceTime}</td>
                  <td className="py-4 px-6">{order.status}</td>
                  <td className="py-4 px-6 text-right">
                    <button
                      onClick={() => handleEditClick(order)}
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

      {/* Modal */}
      {editOrder && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50">
          <div className="bg-white p-6 rounded-xl shadow-md space-y-4 w-full max-w-md">
            <h2 className="text-xl font-semibold">Edit Order Status</h2>
            <input
              type="text"
              className="border p-2 w-full rounded"
              value={editStatus}
              onChange={(e) => setEditStatus(e.target.value)}
              placeholder="Status"
            />
            <div className="flex justify-end gap-2">
              <button
                onClick={() => setEditOrder(null)}
                className="px-4 py-2 bg-gray-300 rounded"
              >
                Cancel
              </button>
              <button
                onClick={handleUpdateOrder}
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

export default AdminOrdersPage;
