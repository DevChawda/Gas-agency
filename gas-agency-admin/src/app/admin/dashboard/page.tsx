'use client';

import { useEffect, useState } from 'react';
import { DashboardCard } from "@/app/components/DashboardCards";
import { Users, Package, MessageCircle, Truck, Flame } from 'lucide-react';
import axios from 'axios';

interface DashboardStats {
  totalConsumers?: number;
  pendingOrders?: number;
  newComplaints?: number;
  averageDeliveryTime?: string;
  totalGasCylinders?: number | string; // Modified to allow string
}

interface UserData { _id: string; }
interface OrderData { _id: string; status: string; }
interface FeedbackData { _id: string; }

export default function AdminDashboard() {
  const [loading, setLoading] = useState(true);
  const [dashboardData, setDashboardData] = useState<DashboardStats | null>(null);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchDashboardStats = async () => {
      setLoading(true);
      setError('');
      try {
        const backendBaseURL = process.env.NEXT_PUBLIC_BACKEND_URL;
        console.log("Backend URL:", backendBaseURL); // Log the URL for debugging
        const usersResponse = await axios.get<UserData[]>(`${backendBaseURL}api/admin/users`);
        console.log("Users Response:", usersResponse.data); // Log the users data
        // const ordersResponse = await axios.get<OrderData[]>(`${backendBaseURL}api/transactions`);
        // console.log("Orders Response:", ordersResponse.data); // Log the orders data
        const feedbackResponse = await axios.get<FeedbackData[]>(`${backendBaseURL}api/enquiries`);
        console.log("Feedback Response:", feedbackResponse.data); // Log the feedback data

        setDashboardData({
          totalConsumers: usersResponse.data.length,
          // pendingOrders: ordersResponse.data.filter(order => order.status === 'pending').length, // Example
          newComplaints: feedbackResponse.data.length, // Basic count - adjust if needed
          averageDeliveryTime: 'N/A', // You might need a specific API endpoint for this
          totalGasCylinders: 'N/A', // Temporarily allowing string
        });
      } catch (err: any) {
        setError(err.message || 'Failed to fetch dashboard data');
        console.error('Error fetching dashboard data:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardStats();
  }, []);

  if (loading) return <div>Loading Dashboard...</div>;
  if (error) return <div className="text-red-500">Error: {error}</div>;
  if (!dashboardData) return <div>No dashboard data available.</div>;

  return (
    <div className="p-5 space-y-5">
      <h1 className="text-2xl font-bold mb-4">Admin Dashboard</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {dashboardData.totalConsumers !== undefined && (
          <DashboardCard
            title="Total Consumers"
            value={dashboardData.totalConsumers}
            icon={<Users className="h-5 w-5" />}
            description="Total registered consumers"
          />
        )}
        {dashboardData.pendingOrders !== undefined && (
          <DashboardCard
            title="Pending Orders"
            value={dashboardData.pendingOrders}
            icon={<Package className="h-5 w-5" />}
            description="Orders awaiting processing"
          />
        )}
        {dashboardData.newComplaints !== undefined && (
          <DashboardCard
            title="New Complaints"
            value={dashboardData.newComplaints}
            icon={<MessageCircle className="h-5 w-5" />}
            description="New feedback received"
          />
        )}
        {dashboardData.averageDeliveryTime !== undefined && (
          <DashboardCard
            title="Avg. Delivery Time"
            value={dashboardData.averageDeliveryTime}
            icon={<Truck className="h-5 w-5" />}
            description="Average delivery timeframe"
          />
        )}
        {dashboardData.totalGasCylinders !== undefined && (
          <DashboardCard
            title="Total Gas Cylinders"
            value={dashboardData.totalGasCylinders}
            icon={<Flame className="h-5 w-5" />}
            description="Total cylinders in inventory"
          />
        )}
        {/* Add more DashboardCard components based on your backend data */}
      </div>

      <div className="mt-8">
        <h2 className="text-xl font-semibold mb-2">Recent Activity (From Backend)</h2>
        {/* You'll likely need to fetch and display recent activity from your backend here */}
        <p>Fetching recent activity from backend...</p>
      </div>
    </div>
  );
}