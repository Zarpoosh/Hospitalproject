import React from 'react';
import { Home, AlertCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-blue-50">
      <div className="text-center p-8">
        <div className="w-24 h-24 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <AlertCircle className="w-12 h-12 text-red-600" />
        </div>
        
        <h1 className="text-6xl font-bold text-gray-800 mb-4">۴۰۴</h1>
        <h2 className="text-2xl font-semibold text-gray-700 mb-4">صفحه مورد نظر یافت نشد</h2>
        
        <p className="text-gray-600 max-w-md mx-auto mb-8">
          متأسفیم، صفحه‌ای که به دنبال آن هستید وجود ندارد یا ممکن است حذف شده باشد.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={() => navigate(-1)}
            className="px-6 py-3 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 flex items-center justify-center"
          >
            <span className="ml-2">←</span>
            بازگشت
          </button>
          
          <button
            onClick={() => navigate('/login')}
            className="px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 flex items-center justify-center"
          >
            <Home className="w-5 h-5 ml-2" />
            صفحه اصلی
          </button>
        </div>
      </div>
    </div>
  );
};

export default NotFound;