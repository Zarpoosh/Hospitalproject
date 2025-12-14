import React from 'react';
import { Bell, LogOut, Search, Pill } from 'lucide-react';

interface HeaderProps {
  searchTerm: string;
  onSearchChange: (term: string) => void;
  onLogout: () => void;
}

const Header: React.FC<HeaderProps> = ({
  searchTerm,
  onSearchChange,
  onLogout,
}) => {
  return (
    <header className="bg-white shadow">
      <div className="px-6 py-4 flex items-center justify-between">
        <div className="flex items-center space-x-4 space-x-reverse">
          <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center">
            <Pill className="w-6 h-6 text-orange-600" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-gray-800">پنل داروساز</h1>
            <p className="text-gray-600 text-sm">مدیریت داروخانه</p>
          </div>
        </div>
        
        <div className="flex items-center space-x-4 space-x-reverse">
          <div className="relative">
            <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="جستجوی دارو..."
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
              value={searchTerm}
              onChange={(e) => onSearchChange(e.target.value)}
            />
          </div>
          
          <button 
            className="relative p-2 text-gray-600 hover:text-orange-600"
            aria-label="اعلانات"
          >
            <Bell className="w-6 h-6" />
            <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
          </button>
          
          <button 
            onClick={onLogout}
            className="flex items-center text-gray-600 hover:text-red-600 px-3 py-2 hover:bg-red-50 rounded-lg transition-colors"
            aria-label="خروج از سیستم"
          >
            <LogOut className="w-5 h-5 ml-1" />
            <span className="hidden md:inline">خروج</span>
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;