'use client';

import Link from 'next/link';

const NewPage = () => {
  return (
    <div className="p-6 space-y-4">
      <h1 className="text-2xl font-bold mb-4">Create New</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Link href="/admin/new/user" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-4 px-6 rounded">
          Add New User
        </Link>
        <Link href="/admin/new/distributor" className="bg-green-500 hover:bg-green-700 text-white font-bold py-4 px-6 rounded">
          Add New Distributor
        </Link>
        {/* You can add more links for creating other new entities */}
      </div>
    </div>
  );
};

export default NewPage;