'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LayoutDashboard, UserCog, UserSearch, PackageSearch, MessagesSquare } from 'lucide-react';

const navItems = [
  { label: 'Dashboard', href: '/admin/dashboard', icon: LayoutDashboard },
  { label: 'Manage Distributors', href: '/admin/distributors', icon: UserCog },
  { label: 'View Users', href: '/admin/users', icon: UserSearch },
  { label: 'View Orders', href: '/admin/orders', icon: PackageSearch },
  { label: 'Feedback Panel', href: '/admin/feedback', icon: MessagesSquare },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="h-screen w-64 bg-white shadow-lg p-4 fixed">
      <div className="text-2xl font-bold mb-6 text-center text-blue-600">Admin Panel</div>
      <nav className="space-y-2">
        {navItems.map(({ label, href, icon: Icon }) => {
          const isActive = pathname === href;
          return (
            <Link
              key={href}
              href={href}
              className={`flex items-center gap-3 p-3 rounded-xl transition-colors ${
                isActive ? 'bg-blue-100 text-blue-600 font-semibold' : 'hover:bg-gray-100'
              }`}
            >
              <Icon size={20} />
              {label}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}