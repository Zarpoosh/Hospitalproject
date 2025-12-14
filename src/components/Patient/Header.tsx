import React from 'react';
import { Bell, LogOut, User } from 'lucide-react';

interface HeaderProps {
  patientName: string;
  onLogout: () => void;
}

const Header: React.FC<HeaderProps> = ({ patientName, onLogout }) => {
  return (
    <header className="bg-white shadow">
      <div className="px-6 py-4 flex items-center justify-between">
        <div className="flex items-center space-x-4 space-x-reverse">
          <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
            <User className="w-6 h-6 text-blue-600" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-gray-800">پنل بیمار</h1>
            <p className="text-gray-600 text-sm">{patientName} - خوش آمدید!</p>
          </div>
        </div>
        
        <div className="flex items-center space-x-4 space-x-reverse">
          <button 
            className="relative p-2 text-gray-600 hover:text-blue-600"
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
