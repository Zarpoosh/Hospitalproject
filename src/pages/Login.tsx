import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  User, 
  Stethoscope, 
  Pill, 
  Shield, 
  LogIn,
  Eye,
  EyeOff
} from 'lucide-react';
import type { UserRole } from '../types';

const Login = () => {
  const navigate = useNavigate();
  const [selectedRole, setSelectedRole] = useState<UserRole>('patient');
  const [credentials, setCredentials] = useState({
    username: '',
    password: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');

  const roles = [
    { id: 'patient' as UserRole, name: 'بیمار', icon: User, color: 'bg-blue-100 text-blue-600' },
    { id: 'doctor' as UserRole, name: 'پزشک', icon: Stethoscope, color: 'bg-green-100 text-green-600' },
    { id: 'pharmacist' as UserRole, name: 'داروساز', icon: Pill, color: 'bg-orange-100 text-orange-600' },
    { id: 'admin' as UserRole, name: 'مدیر سیستم', icon: Shield, color: 'bg-purple-100 text-purple-600' },
  ];

  // داده‌های تست
  const mockUsers = {
    patient: { username: 'patient123', password: '123456', name: 'علی رضایی' },
    doctor: { username: 'doctor123', password: '123456', name: 'دکتر محمدی' },
    pharmacist: { username: 'pharmacist123', password: '123456', name: 'داروساز کریمی' },
    admin: { username: 'admin123', password: '123456', name: 'مدیر سیستم' }
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    const user = mockUsers[selectedRole];
    
    if (credentials.username === user.username && credentials.password === user.password) {
      // ذخیره اطلاعات کاربر
      const userData = {
        role: selectedRole,
        username: credentials.username,
        name: user.name,
        token: 'mock-jwt-token'
      };
      
      localStorage.setItem('user', JSON.stringify(userData));
      
      // هدایت بر اساس نقش
      switch (selectedRole) {
        case 'patient':
          navigate('/patient/dashboard');
          break;
        case 'doctor':
          navigate('/doctor/dashboard');
          break;
        case 'pharmacist':
          navigate('/pharmacist/dashboard');
          break;
        case 'admin':
          navigate('/admin/dashboard');
          break;
        default:
          navigate('/dashboard');
      }
    } else {
      setError('نام کاربری یا رمز عبور اشتباه است');
    }
  };

  const handleDemoLogin = (role: UserRole) => {
    const user = mockUsers[role];
    setSelectedRole(role);
    setCredentials({
      username: user.username,
      password: user.password
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-6xl overflow-hidden">
        <div className="md:flex">
          {/* بخش انتخاب نقش */}
          <div className="md:w-2/5 bg-gradient-to-b from-blue-600 to-blue-800 p-8 text-white">
            <div className="text-center mb-10">
              <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <LogIn className="w-10 h-10" />
              </div>
              <h1 className="text-3xl font-bold mb-2">درمانگاه آنلاین</h1>
              <p className="text-blue-200">سیستم مدیریت جامع درمانگاه</p>
            </div>
            
            <div className="mb-6">
              <h2 className="text-lg font-semibold mb-4">انتخاب نقش:</h2>
              <div className="space-y-3">
                {roles.map((role) => {
                  const Icon = role.icon;
                  const isSelected = selectedRole === role.id;
                  return (
                    <button
                      key={role.id}
                      type="button"
                      onClick={() => setSelectedRole(role.id)}
                      className={`w-full flex items-center p-4 rounded-xl transition-all duration-200 ${
                        isSelected 
                          ? 'bg-white text-gray-800 shadow-lg transform scale-105' 
                          : 'bg-blue-700 hover:bg-blue-600 hover:shadow-md'
                      }`}
                    >
                      <div className={`p-3 rounded-lg ${role.color}`}>
                        <Icon className="w-6 h-6" />
                      </div>
                      <span className="mr-3 text-lg font-medium">{role.name}</span>
                      {isSelected && (
                        <div className="mr-auto w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* دکمه‌های دمو */}
            <div className="mt-8">
              <p className="text-sm text-blue-200 mb-3">ورود سریع با دمو:</p>
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => handleDemoLogin('patient')}
                  className="px-3 py-2 bg-blue-500 hover:bg-blue-400 rounded-lg text-sm transition-colors"
                >
                  بیمار دمو
                </button>
                <button
                  type="button"
                  onClick={() => handleDemoLogin('doctor')}
                  className="px-3 py-2 bg-green-500 hover:bg-green-400 rounded-lg text-sm transition-colors"
                >
                  پزشک دمو
                </button>
                <button
                  type="button"
                  onClick={() => handleDemoLogin('pharmacist')}
                  className="px-3 py-2 bg-orange-500 hover:bg-orange-400 rounded-lg text-sm transition-colors"
                >
                  داروساز دمو
                </button>
                <button
                  type="button"
                  onClick={() => handleDemoLogin('admin')}
                  className="px-3 py-2 bg-purple-500 hover:bg-purple-400 rounded-lg text-sm transition-colors"
                >
                  مدیر دمو
                </button>
              </div>
            </div>
          </div>
          
          {/* بخش فرم لاگین */}
          <div className="md:w-3/5 p-8 md:p-12">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-2">
                ورود به عنوان {roles.find(r => r.id === selectedRole)?.name}
              </h2>
              <p className="text-gray-600">لطفاً اطلاعات خود را وارد کنید</p>
            </div>
            
            <form onSubmit={handleLogin} className="space-y-6">
              <div>
                <label className="block text-gray-700 mb-2 font-medium">
                  نام کاربری
                </label>
                <input
                  type="text"
                  value={credentials.username}
                  onChange={(e) => setCredentials({...credentials, username: e.target.value})}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  placeholder="نام کاربری خود را وارد کنید"
                  required
                />
              </div>
              
              <div>
                <label className="block text-gray-700 mb-2 font-medium">
                  رمز عبور
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    value={credentials.password}
                    onChange={(e) => setCredentials({...credentials, password: e.target.value})}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all pr-12"
                    placeholder="رمز عبور خود را وارد کنید"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                  >
                    {showPassword ? (
                      <EyeOff className="w-5 h-5" />
                    ) : (
                      <Eye className="w-5 h-5" />
                    )}
                  </button>
                </div>
              </div>
              
              {error && (
                <div className="p-3 bg-red-50 border border-red-200 text-red-600 rounded-lg">
                  {error}
                </div>
              )}
              
              <div className="flex items-center justify-between">
                <label className="flex items-center">
                  <input 
                    type="checkbox" 
                    className="rounded text-blue-600 ml-2 focus:ring-blue-500"
                  />
                  <span className="text-gray-600">مرا به خاطر بسپار</span>
                </label>
                <a href="#" className="text-blue-600 hover:text-blue-800 font-medium text-sm">
                  رمز عبور را فراموش کرده‌اید؟
                </a>
              </div>
              
              <button
                type="submit"
                className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white py-3 rounded-xl font-medium hover:from-blue-700 hover:to-blue-800 transition-all duration-200 shadow-md hover:shadow-lg"
              >
                ورود به سیستم
              </button>
              
              <div className="text-center pt-4 border-t">
                <p className="text-gray-600">
                  حساب کاربری ندارید؟{' '}
                  <a href="#" className="text-blue-600 font-medium hover:text-blue-800">
                    ثبت نام کنید
                  </a>
                </p>
                <p className="text-sm text-gray-500 mt-2">
                  اطلاعات دمو: patient123 / 123456
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;