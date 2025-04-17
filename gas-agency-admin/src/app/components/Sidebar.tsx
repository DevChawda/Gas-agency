'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { LayoutDashboard, UserCog, UserSearch, PackageSearch, MessagesSquare, LogOut } from 'lucide-react';
import Cookies from 'js-cookie';  // Make sure to import Cookies

const navItems = [
  { label: 'Dashboard', href: '/admin/dashboard', icon: LayoutDashboard },
  { label: 'Manage Distributors', href: '/admin/distributors', icon: UserCog },
  { label: 'View Users', href: '/admin/users', icon: UserSearch },
  { label: 'View Orders', href: '/admin/orders', icon: PackageSearch },
  { label: 'Feedback Panel', href: '/admin/feedback', icon: MessagesSquare },
];

export default function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();

  const handleLogout = () => {
    // Remove admin data from localStorage
    localStorage.removeItem('adminToken');
    localStorage.removeItem('adminName');
    console.log('✅ Admin token and name removed from localStorage');
  
    // Remove admin data from cookies
    Cookies.remove('adminToken');
    Cookies.remove('adminName');
    console.log('✅ Admin token and name removed from cookies');
  
    // Redirect to login page
    router.push('/login');
  };
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
              className={`flex items-center gap-3 p-3 rounded-xl transition-colors ${isActive ? 'bg-blue-100 text-blue-600 font-semibold' : 'hover:bg-gray-100'
                }`}
            >
              <Icon size={20} />
              {label}
            </Link>
          );
        })}
      </nav>

      <button
        onClick={handleLogout}
        className="mt-6 w-full flex items-center gap-3 p-3 rounded-xl text-red-600 hover:bg-gray-100 transition-colors"
      >
        <LogOut size={20} />
        Logout
      </button>
    </aside>
  );
}
