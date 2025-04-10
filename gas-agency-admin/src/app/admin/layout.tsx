'use client';

import Sidebar from '@/app/components/Sidebar'; // Adjust the import path if needed
import './admin.css'; // Or your preferred CSS file for admin layout
import { ReactNode } from 'react';

export default function AdminLayout({ children }: { children: ReactNode }) {
  return (
    <div className="admin-layout flex"> {/* Make the layout a flex container */}
      <Sidebar />
      <main className="admin-content flex-grow p-5"> {/* Add padding to the main content */}
        {children}
      </main>
    </div>
  );
}