import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Calendar, 
  Clock, 
//   MapPin, 
  Search, 
  Bell, 
  LogOut,
  User,
//   Filter,
//   ChevronLeft,
//   ChevronRight
} from 'lucide-react';
import type { Doctor, Appointment } from '../types';

const PatientDashboard = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'appointments' | 'doctors'>('appointments');
  const [selectedDoctor, setSelectedDoctor] = useState<string>('');
  const [selectedDate, setSelectedDate] = useState<string>('');
  const [selectedTime, setSelectedTime] = useState<string>('');
  const [reason, setReason] = useState('');

  // داده‌های نمونه
  const doctors: Doctor[] = [
    {
      id: 'd1',
      userId: 'ud1',
      name: 'دکتر علی محمدی',
      specialization: 'متخصص داخلی',
      availableDays: ['شنبه', 'یکشنبه', 'دوشنبه', 'سه‌شنبه'],
      availableHours: ['08:00', '09:00', '10:00', '11:00', '14:00', '15:00'],
      consultationFee: 150000
    },
    {
      id: 'd2',
      userId: 'ud2',
      name: 'دکتر فاطمه کریمی',
      specialization: 'متخصص زنان',
      availableDays: ['شنبه', 'یکشنبه', 'دوشنبه'],
      availableHours: ['09:00', '10:00', '11:00', '15:00', '16:00'],
      consultationFee: 180000
    }
  ];

  const appointments: Appointment[] = [
    {
      id: 'a1',
      patientId: 'p1',
      doctorId: 'd1',
      date: '1402/10/15',
      time: '10:30',
      status: 'confirmed',
      reason: 'معاینه عمومی'
    },
    {
      id: 'a2',
      patientId: 'p1',
      doctorId: 'd2',
      date: '1402/10/16',
      time: '14:00',
      status: 'pending',
      reason: 'پیگیری درمان'
    }
  ];

  const handleLogout = () => {
    localStorage.removeItem('user');
    navigate('/login');
  };

  const handleBookAppointment = () => {
    if (!selectedDoctor || !selectedDate || !selectedTime) {
      alert('لطفاً پزشک، تاریخ و زمان را انتخاب کنید');
      return;
    }

    const appointment = {
      doctorId: selectedDoctor,
      date: selectedDate,
      time: selectedTime,
      reason,
      patientName: 'علی رضایی'
    };

    console.log('Appointment booked:', appointment);
    alert('نوبت شما با موفقیت ثبت شد!');
    
    // ریست فرم
    setSelectedDoctor('');
    setSelectedDate('');
    setSelectedTime('');
    setReason('');
  };

  const generateDates = () => {
    const dates = [];
    const today = new Date();
    for (let i = 0; i < 14; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() + i);
      dates.push(date);
    }
    return dates;
  };

  const timeSlots = [
    '08:00', '08:30', '09:00', '09:30', '10:00', '10:30',
    '11:00', '11:30', '14:00', '14:30', '15:00', '15:30',
    '16:00', '16:30', '17:00'
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow">
        <div className="px-6 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-4 space-x-reverse">
            <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
              <User className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-800">پنل بیمار</h1>
              <p className="text-gray-600 text-sm">علی رضایی - خوش آمدید!</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-4 space-x-reverse">
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

      <div className="p-6">
        <div className="max-w-7xl mx-auto">
          {/* Tabs */}
          <div className="flex space-x-4 space-x-reverse mb-8 border-b">
            <button
              onClick={() => setActiveTab('appointments')}
              className={`pb-3 px-4 font-medium transition-colors ${
                activeTab === 'appointments'
                  ? 'text-blue-600 border-b-2 border-blue-600'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              <Calendar className="w-5 h-5 inline ml-2" />
              قرارهای من
            </button>
            <button
              onClick={() => setActiveTab('doctors')}
              className={`pb-3 px-4 font-medium transition-colors ${
                activeTab === 'doctors'
                  ? 'text-blue-600 border-b-2 border-blue-600'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              <Search className="w-5 h-5 inline ml-2" />
              رزرو نوبت جدید
            </button>
          </div>

          {/* Appointments Tab */}
          {activeTab === 'appointments' && (
            <div className="bg-white rounded-2xl shadow">
              <div className="p-6 border-b">
                <h2 className="text-xl font-bold text-gray-800">قرارهای ملاقات من</h2>
              </div>
              <div className="p-6">
                <div className="space-y-4">
                  {appointments.map((appointment) => {
                    const doctor = doctors.find(d => d.id === appointment.doctorId);
                    return (
                      <div key={appointment.id} className="p-4 border rounded-xl hover:shadow-md transition-shadow">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center">
                            <div className={`w-3 h-3 rounded-full ml-3 ${
                              appointment.status === 'confirmed' ? 'bg-green-500' :
                              appointment.status === 'pending' ? 'bg-yellow-500' :
                              appointment.status === 'cancelled' ? 'bg-red-500' : 'bg-blue-500'
                            }`}></div>
                            <div>
                              <p className="font-medium">{doctor?.name}</p>
                              <p className="text-gray-600 text-sm">{doctor?.specialization}</p>
                            </div>
                          </div>
                          <div className="text-right">
                            <p className="font-medium">{appointment.date} - ساعت {appointment.time}</p>
                            <p className="text-gray-600 text-sm">{appointment.reason}</p>
                          </div>
                        </div>
                        <div className="flex justify-end mt-4 space-x-2 space-x-reverse">
                          <button className="px-4 py-2 text-sm bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100">
                            ویرایش
                          </button>
                          <button className="px-4 py-2 text-sm bg-red-50 text-red-600 rounded-lg hover:bg-red-100">
                            لغو نوبت
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          )}

          {/* Doctors & Booking Tab */}
          {activeTab === 'doctors' && (
            <div className="bg-white rounded-2xl shadow p-6">
              <div className="mb-8">
                <h2 className="text-2xl font-bold text-gray-800 mb-4">رزرو نوبت جدید</h2>
                <p className="text-gray-600">پزشک مورد نظر خود را انتخاب کنید</p>
              </div>

              {/* Step 1: Select Doctor */}
              <div className="mb-8">
                <h3 className="text-lg font-semibold mb-4 flex items-center">
                  <span className="w-8 h-8 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center ml-2">
                    ۱
                  </span>
                  انتخاب پزشک
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {doctors.map((doctor) => (
                    <div
                      key={doctor.id}
                      className={`border-2 rounded-xl p-6 cursor-pointer transition-all ${
                        selectedDoctor === doctor.id
                          ? 'border-blue-500 bg-blue-50'
                          : 'border-gray-200 hover:border-blue-300'
                      }`}
                      onClick={() => setSelectedDoctor(doctor.id)}
                    >
                      <div className="flex items-center mb-4">
                        <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center ml-4">
                          <User className="w-8 h-8 text-blue-600" />
                        </div>
                        <div>
                          <h4 className="font-bold text-lg">{doctor.name}</h4>
                          <p className="text-gray-600">{doctor.specialization}</p>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <div className="flex items-center text-gray-600">
                          <Clock className="w-4 h-4 ml-2" />
                          <span className="text-sm">ساعات کاری: {doctor.availableHours.join(', ')}</span>
                        </div>
                        <div className="flex items-center text-gray-600">
                          <Calendar className="w-4 h-4 ml-2" />
                          <span className="text-sm">روزهای فعالیت: {doctor.availableDays.join('، ')}</span>
                        </div>
                        <div className="flex items-center text-green-600 font-medium">
                          <span>هزینه ویزیت: {doctor.consultationFee.toLocaleString()} تومان</span>
                        </div>
                      </div>
                      {selectedDoctor === doctor.id && (
                        <div className="mt-4 p-2 bg-green-100 text-green-800 rounded-lg text-sm text-center">
                          ✓ انتخاب شده
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Step 2: Select Date */}
              {selectedDoctor && (
                <div className="mb-8">
                  <h3 className="text-lg font-semibold mb-4 flex items-center">
                    <span className="w-8 h-8 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center ml-2">
                      ۲
                    </span>
                    انتخاب تاریخ
                  </h3>
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-7 gap-3">
                    {generateDates().map((date, index) => {
                      const dateStr = date.toLocaleDateString('fa-IR');
                      const isSelected = selectedDate === dateStr;
                      return (
                        <button
                          key={index}
                          onClick={() => setSelectedDate(dateStr)}
                          className={`p-4 border rounded-lg text-center transition-all ${
                            isSelected
                              ? 'bg-blue-500 text-white border-blue-500'
                              : 'border-gray-300 hover:border-blue-400'
                          }`}
                        >
                          <div className="text-sm">
                            {date.toLocaleDateString('fa-IR', { weekday: 'short' })}
                          </div>
                          <div className="text-lg font-medium mt-1">
                            {date.toLocaleDateString('fa-IR', { day: 'numeric' })}
                          </div>
                          <div className="text-xs mt-1">
                            {date.toLocaleDateString('fa-IR', { month: 'long' })}
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Step 3: Select Time */}
              {selectedDate && (
                <div className="mb-8">
                  <h3 className="text-lg font-semibold mb-4 flex items-center">
                    <span className="w-8 h-8 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center ml-2">
                      ۳
                    </span>
                    انتخاب زمان
                  </h3>
                  <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-3">
                    {timeSlots.map((time) => {
                      const isSelected = selectedTime === time;
                      return (
                        <button
                          key={time}
                          onClick={() => setSelectedTime(time)}
                          className={`p-3 border rounded-lg text-center transition-all ${
                            isSelected
                              ? 'bg-green-500 text-white border-green-500'
                              : 'border-gray-300 hover:border-green-400'
                          }`}
                        >
                          {time}
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Step 4: Reason & Submit */}
              {selectedTime && (
                <div className="mb-8">
                  <h3 className="text-lg font-semibold mb-4 flex items-center">
                    <span className="w-8 h-8 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center ml-2">
                      ۴
                    </span>
                    تکمیل اطلاعات
                  </h3>
                  <div>
                    <label className="block text-gray-700 mb-2">علت مراجعه (اختیاری)</label>
                    <textarea
                      value={reason}
                      onChange={(e) => setReason(e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="علت مراجعه خود را شرح دهید..."
                      rows={3}
                    />
                  </div>
                </div>
              )}

              {/* Submit Button */}
              {selectedDoctor && selectedDate && selectedTime && (
                <div className="border-t pt-6">
                  <div className="bg-blue-50 rounded-xl p-6 mb-6">
                    <h4 className="font-bold text-lg mb-2">خلاصه نوبت</h4>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <p className="text-gray-600 text-sm">پزشک</p>
                        <p className="font-medium">{doctors.find(d => d.id === selectedDoctor)?.name}</p>
                      </div>
                      <div>
                        <p className="text-gray-600 text-sm">تاریخ</p>
                        <p className="font-medium">{selectedDate}</p>
                      </div>
                      <div>
                        <p className="text-gray-600 text-sm">زمان</p>
                        <p className="font-medium">{selectedTime}</p>
                      </div>
                    </div>
                  </div>
                  <button
                    onClick={handleBookAppointment}
                    className="w-full bg-gradient-to-r from-blue-600 to-green-600 text-white py-4 rounded-xl font-bold text-lg hover:from-blue-700 hover:to-green-700 transition-all shadow-lg hover:shadow-xl"
                  >
                    تایید و رزرو نوبت
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PatientDashboard;