'use client';

import { useEffect, useState } from 'react';
import { DashboardCard } from "@/app/components/DashboardCards";
import { Users, Package, MessageCircle, Truck, Flame } from 'lucide-react';
import axiosInstance from '../../utils/axiosInstance';

interface DashboardStats {
  totalConsumers?: number;
  pendingOrders?: number;
  newComplaints?: number;
  averageDeliveryTime?: string;
  totalGasCylinders?: number | string;
}

interface UserData { _id: string }
interface FeedbackData { _id: string }

export default function AdminDashboard() {
  const [loading, setLoading] = useState(true);
  const [dashboardData, setDashboardData] = useState<DashboardStats | null>(null);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchDashboardStats = async () => {
      setLoading(true);
      setError('');
      try {
        const [usersRes, feedbackRes] = await Promise.all([
          axiosInstance.get<UserData[]>('/api/admin/users'),
          axiosInstance.get<FeedbackData[]>('/api/enquiries'),
        ]);

        setDashboardData({
          totalConsumers: usersRes.data.length,
          newComplaints: feedbackRes.data.length,
          averageDeliveryTime: 'N/A',
          totalGasCylinders: 'N/A',
        });
      } catch (err: any) {
        console.error('Dashboard error:', err);
        setError(err?.response?.data?.message || 'Failed to fetch dashboard data');
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
        <DashboardCard title="Total Consumers" value={dashboardData.totalConsumers} icon={<Users className="h-5 w-5" />} description="Total registered consumers" />
        <DashboardCard title="New Complaints" value={dashboardData.newComplaints} icon={<MessageCircle className="h-5 w-5" />} description="New feedback received" />
        <DashboardCard title="Avg. Delivery Time" value={dashboardData.averageDeliveryTime} icon={<Truck className="h-5 w-5" />} description="Average delivery timeframe" />
        <DashboardCard title="Total Gas Cylinders" value={dashboardData.totalGasCylinders} icon={<Flame className="h-5 w-5" />} description="Total cylinders in inventory" />
      </div>

      <div className="mt-8">
        <h2 className="text-xl font-semibold mb-2">Recent Activity</h2>
        <p>Fetching recent activity from backend...</p>
      </div>
    </div>
  );
}
