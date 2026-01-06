import React from 'react';
import { Bell, LogOut, User, Moon, Sun } from 'lucide-react';
import { useDarkMode } from '../../contexts/DarkModeContext';

interface HeaderProps {
  patientName: string;
  onLogout: () => void;
}

const Header: React.FC<HeaderProps> = ({ patientName, onLogout }) => {
  const { isDark, toggleDarkMode } = useDarkMode();

  return (
    <header className="bg-white dark:bg-gray-800 shadow dark:shadow-gray-900">
      <div className="px-6 py-4 flex items-center justify-between">
        <div className="flex items-center space-x-4 space-x-reverse">
          <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center">
            <User className="w-6 h-6 text-blue-600 dark:text-blue-300" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-gray-800 dark:text-gray-100">پنل بیمار</h1>
            <p className="text-gray-600 dark:text-gray-300 text-sm">{patientName} - خوش آمدید!</p>
          </div>
        </div>
        
        <div className="flex items-center space-x-4 space-x-reverse">
          <button 
            className="relative p-2 text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
            aria-label="اعلانات"
          >
            <Bell className="w-6 h-6" />
            <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
          </button>
          
          <button 
            onClick={toggleDarkMode}
            className="p-2 text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-yellow-400 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
            aria-label={isDark ? "حالت روشن" : "حالت تاریک"}
          >
            {isDark ? (
              <Sun className="w-5 h-5" />
            ) : (
              <Moon className="w-5 h-5" />
            )}
          </button>
          
          <button 
            onClick={onLogout}
            className="flex items-center text-gray-600 dark:text-gray-300 hover:text-red-600 dark:hover:text-red-400 px-3 py-2 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
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
