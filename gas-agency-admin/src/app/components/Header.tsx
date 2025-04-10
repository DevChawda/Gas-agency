export default function Header() {
    return (
      <header className="bg-white shadow-sm h-16 border-b flex items-center justify-between px-6 fixed w-[calc(100%-16rem)] ml-64">
        <div className="flex items-center space-x-4">
          <h2 className="text-lg font-semibold">Admin Panel</h2>
        </div>
        <div className="flex items-center space-x-4">
          <button className="p-2 rounded-full hover:bg-gray-100">
            <span>🔔</span>
          </button>
          <div className="flex items-center">
            <div className="w-8 h-8 rounded-full bg-gray-300 flex items-center justify-center mr-2">
              <span>👤</span>
            </div>
            <span>Admin</span>
          </div>
        </div>
      </header>
    );
  }