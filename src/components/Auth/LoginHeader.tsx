import React from 'react';
import { LogIn } from 'lucide-react';

const LoginHeader: React.FC = () => {
  return (
    <div className="text-center mb-10">
      <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
        <LogIn className="w-10 h-10" />
      </div>
      <h1 className="text-3xl font-bold mb-2">درمانگاه آنلاین</h1>
      <p className="text-blue-200">سیستم مدیریت جامع درمانگاه</p>
    </div>
  );
};

export default LoginHeader;