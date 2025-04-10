import { ReactNode } from 'react';

interface DashboardCardProps {
  title: string;
  value: string | number | undefined;
  icon: React.ReactNode;
  description?: string;
}


export const DashboardCard = ({ title, value, icon, description }: DashboardCardProps) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 flex items-center space-x-4">
      <div className="rounded-full bg-gray-100 p-3">{icon}</div>
      <div>
        <h3 className="text-lg font-semibold text-gray-800">{title}</h3>
        <p className="text-2xl font-bold text-blue-600">{value}</p>
        {description && <p className="text-sm text-gray-500">{description}</p>}
      </div>
    </div>
  );
};