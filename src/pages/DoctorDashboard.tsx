import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Calendar, 
  Users, 
  FileText, 
  Clock, 
  Bell, 
  LogOut,
  PlusCircle,
  Activity,
  Search,
  Filter
} from 'lucide-react';
import PrescriptionForm from '../components/Features/PrescriptionForm';
import AppointmentList from '../components/Features/AppointmentList';
import type { Appointment, Patient } from '../types';

const DoctorDashboard = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'appointments' | 'patients' | 'prescriptions'>('appointments');
  const [showPrescriptionForm, setShowPrescriptionForm] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  // داده‌های نمونه
  const appointments: Appointment[] = [
    {
      id: '1',
      patientId: 'p1',
      doctorId: 'd1',
      date: '1402/10/15',
      time: '10:30',
      status: 'confirmed',
      reason: 'معاینه عمومی',
      patient: {
        id: 'p1',
        userId: 'u1',
        name: 'علی رضایی',
        nationalId: '0012345678',
        dateOfBirth: '1365/05/20',
        bloodType: 'O+'
      }
    },
    {
      id: '2',
      patientId: 'p2',
      doctorId: 'd1',
      date: '1402/10/15',
      time: '11:15',
      status: 'pending',
      reason: 'پیگیری درمان',
      patient: {
        id: 'p2',
        userId: 'u2',
        name: 'فاطمه کریمی',
        nationalId: '0022345678',
        dateOfBirth: '1370/08/15'
      }
    }
  ];

  const patients: Patient[] = [
    {
      id: 'p1',
      userId: 'u1',
      name: 'علی رضایی',
      nationalId: '0012345678',
      dateOfBirth: '1365/05/20',
      bloodType: 'O+',
      allergies: ['پنی‌سیلین']
    },
    {
      id: 'p2',
      userId: 'u2',
      name: 'فاطمه کریمی',
      nationalId: '0022345678',
      dateOfBirth: '1370/08/15',
      allergies: ['آسپرین']
    }
  ];

  const stats = {
    totalPatients: 245,
    todayAppointments: appointments.length,
    pendingPrescriptions: 5,
    monthlyVisits: 156
  };

  const handleLogout = () => {
    localStorage.removeItem('user');
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-lg">
        <div className="px-6 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-4 space-x-reverse">
            <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
              <Stethoscope className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-800">پنل پزشک</h1>
              <p className="text-gray-600 text-sm">دکتر علی محمدی - متخصص داخلی</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-4 space-x-reverse">
            <div className="relative">
              <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="جستجوی بیمار..."
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            
            <button className="relative p-2 text-gray-600 hover:text-blue-600">
              <Bell className="w-6 h-6" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
            </button>
            
            <button 
              onClick={handleLogout}
              className="flex items-center text-gray-600 hover:text-red-600 px-3 py-2 hover:bg-red-50 rounded-lg transition-colors"
            >
              <LogOut className="w-5 h-5 ml-1" />
              <span className="hidden md:inline">خروج</span>
            </button>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar */}
        <aside className="w-64 bg-white shadow-lg min-h-[calc(100vh-80px)] hidden md:block">
          <nav className="p-6">
            <div className="space-y-6">
              <div className="p-4 bg-blue-50 rounded-xl">
                <h3 className="font-medium text-blue-700 mb-2">امروز</h3>
                <p className="text-2xl font-bold">{new Date().toLocaleDateString('fa-IR')}</p>
                <p className="text-sm text-blue-600 mt-1">{stats.todayAppointments} قرار ملاقات</p>
              </div>
              
              <div className="space-y-2">
                <button
                  onClick={() => setActiveTab('appointments')}
                  className={`w-full flex items-center p-3 rounded-xl transition-colors ${
                    activeTab === 'appointments'
                      ? 'bg-blue-100 text-blue-600'
                      : 'hover:bg-gray-100 text-gray-700'
                  }`}
                >
                  <Calendar className="w-5 h-5 ml-2" />
                  قرارهای ملاقات
                </button>
                
                <button
                  onClick={() => setActiveTab('patients')}
                  className={`w-full flex items-center p-3 rounded-xl transition-colors ${
                    activeTab === 'patients'
                      ? 'bg-blue-100 text-blue-600'
                      : 'hover:bg-gray-100 text-gray-700'
                  }`}
                >
                  <Users className="w-5 h-5 ml-2" />
                  بیماران من
                </button>
                
                <button
                  onClick={() => setShowPrescriptionForm(true)}
                  className="w-full flex items-center p-3 rounded-xl hover:bg-green-100 text-green-600"
                >
                  <PlusCircle className="w-5 h-5 ml-2" />
                  نسخه جدید
                </button>
              </div>
            </div>
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-6">
          {/* Statistics */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <div className="bg-white rounded-2xl shadow p-6 border border-gray-100">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-500 text-sm">کل بیماران</p>
                  <p className="text-3xl font-bold mt-2">{stats.totalPatients}</p>
                </div>
                <div className="p-3 bg-blue-100 rounded-xl">
                  <Users className="w-8 h-8 text-blue-600" />
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-2xl shadow p-6 border border-gray-100">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-500 text-sm">قرارهای امروز</p>
                  <p className="text-3xl font-bold mt-2">{stats.todayAppointments}</p>
                </div>
                <div className="p-3 bg-green-100 rounded-xl">
                  <Calendar className="w-8 h-8 text-green-600" />
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-2xl shadow p-6 border border-gray-100">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-500 text-sm">نسخه‌های در انتظار</p>
                  <p className="text-3xl font-bold mt-2">{stats.pendingPrescriptions}</p>
                </div>
                <div className="p-3 bg-orange-100 rounded-xl">
                  <FileText className="w-8 h-8 text-orange-600" />
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-2xl shadow p-6 border border-gray-100">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-500 text-sm">بازدید ماهانه</p>
                  <p className="text-3xl font-bold mt-2">{stats.monthlyVisits}</p>
                </div>
                <div className="p-3 bg-purple-100 rounded-xl">
                  <Activity className="w-8 h-8 text-purple-600" />
                </div>
              </div>
            </div>
          </div>

          {/* Appointments Section */}
          {activeTab === 'appointments' && (
            <div className="bg-white rounded-2xl shadow">
              <div className="p-6 border-b border-gray-200">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-bold text-gray-800 flex items-center">
                    <Clock className="w-6 h-6 ml-2 text-blue-600" />
                    قرارهای ملاقات امروز
                  </h2>
                  <button className="flex items-center text-blue-600 hover:text-blue-800">
                    <Filter className="w-5 h-5 ml-1" />
                    فیلتر
                  </button>
                </div>
              </div>
              <AppointmentList appointments={appointments} />
            </div>
          )}

          {/* Patients Section */}
          {activeTab === 'patients' && (
            <div className="bg-white rounded-2xl shadow">
              <div className="p-6 border-b border-gray-200">
                <h2 className="text-xl font-bold text-gray-800 flex items-center">
                  <Users className="w-6 h-6 ml-2 text-blue-600" />
                  لیست بیماران
                </h2>
              </div>
              <div className="p-6">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="bg-gray-50">
                        <th className="py-3 px-4 text-right text-gray-600 font-medium">نام بیمار</th>
                        <th className="py-3 px-4 text-right text-gray-600 font-medium">کد ملی</th>
                        <th className="py-3 px-4 text-right text-gray-600 font-medium">سن</th>
                        <th className="py-3 px-4 text-right text-gray-600 font-medium">گروه خونی</th>
                        <th className="py-3 px-4 text-right text-gray-600 font-medium">حساسیت‌ها</th>
                        <th className="py-3 px-4 text-right text-gray-600 font-medium">عملیات</th>
                      </tr>
                    </thead>
                    <tbody>
                      {patients.map((patient) => {
                        const age = new Date().getFullYear() - parseInt(patient.dateOfBirth.split('/')[0]);
                        return (
                          <tr key={patient.id} className="border-b border-gray-100 hover:bg-gray-50">
                            <td className="py-4 px-4">
                              <div className="flex items-center">
                                <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center ml-3">
                                  <span className="text-blue-600 font-medium">ب</span>
                                </div>
                                <div>
                                  <p className="font-medium">{patient.name}</p>
                                  <p className="text-sm text-gray-500">ID: {patient.id}</p>
                                </div>
                              </div>
                            </td>
                            <td className="py-4 px-4">{patient.nationalId}</td>
                            <td className="py-4 px-4">{age} سال</td>
                            <td className="py-4 px-4">
                              {patient.bloodType ? (
                                <span className="px-3 py-1 bg-red-100 text-red-800 rounded-full text-sm">
                                  {patient.bloodType}
                                </span>
                              ) : (
                                <span className="text-gray-400">---</span>
                              )}
                            </td>
                            <td className="py-4 px-4">
                              {patient.allergies && patient.allergies.length > 0 ? (
                                <div className="flex flex-wrap gap-1">
                                  {patient.allergies.map((allergy, index) => (
                                    <span key={index} className="px-2 py-1 bg-yellow-100 text-yellow-800 rounded text-xs">
                                      {allergy}
                                    </span>
                                  ))}
                                </div>
                              ) : (
                                <span className="text-gray-400">ندارد</span>
                              )}
                            </td>
                            <td className="py-4 px-4">
                              <div className="flex space-x-2 space-x-reverse">
                                <button className="px-4 py-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 text-sm">
                                  مشاهده پرونده
                                </button>
                                <button className="px-4 py-2 bg-green-50 text-green-600 rounded-lg hover:bg-green-100 text-sm">
                                  ثبت نسخه
                                </button>
                              </div>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* Prescription Form Modal */}
          {showPrescriptionForm && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
              <div className="bg-white rounded-2xl w-full max-w-3xl max-h-[90vh] overflow-y-auto">
                <PrescriptionForm onClose={() => setShowPrescriptionForm(false)} />
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default DoctorDashboard;