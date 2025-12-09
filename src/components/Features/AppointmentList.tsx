import React from 'react';
import { Calendar, Clock, User, CheckCircle, XCircle, Clock as ClockIcon } from 'lucide-react';
import type { Appointment } from '../../types';

interface AppointmentListProps {
  appointments: Appointment[];
  onEdit?: (appointment: Appointment) => void;
  onCancel?: (appointmentId: string) => void;
}

const AppointmentList: React.FC<AppointmentListProps> = ({ 
  appointments, 
  onEdit, 
  onCancel 
}) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'cancelled':
        return 'bg-red-100 text-red-800 border-red-200';
      case 'completed':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'confirmed':
        return <CheckCircle className="w-4 h-4" />;
      case 'pending':
        return <ClockIcon className="w-4 h-4" />;
      case 'cancelled':
        return <XCircle className="w-4 h-4" />;
      default:
        return <Calendar className="w-4 h-4" />;
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'confirmed':
        return 'تأیید شده';
      case 'pending':
        return 'در انتظار';
      case 'cancelled':
        return 'لغو شده';
      case 'completed':
        return 'انجام شده';
      default:
        return status;
    }
  };

  if (appointments.length === 0) {
    return (
      <div className="text-center py-12">
        <Calendar className="w-16 h-16 text-gray-300 mx-auto mb-4" />
        <h3 className="text-lg font-medium text-gray-900 mb-2">هیچ قرار ملاقاتی یافت نشد</h3>
        <p className="text-gray-500">هنوز هیچ قرار ملاقاتی ثبت نشده است.</p>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr className="bg-gray-50">
            <th className="py-3 px-4 text-right text-gray-600 font-medium text-sm">بیمار</th>
            <th className="py-3 px-4 text-right text-gray-600 font-medium text-sm">تاریخ و زمان</th>
            <th className="py-3 px-4 text-right text-gray-600 font-medium text-sm">علت مراجعه</th>
            <th className="py-3 px-4 text-right text-gray-600 font-medium text-sm">وضعیت</th>
            <th className="py-3 px-4 text-right text-gray-600 font-medium text-sm">عملیات</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100">
          {appointments.map((appointment) => (
            <tr key={appointment.id} className="hover:bg-gray-50 transition-colors">
              <td className="py-4 px-4">
                <div className="flex items-center">
                  <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center ml-3">
                    <User className="w-5 h-5 text-blue-600" />
                  </div>
                  <div className="text-right">
                    <p className="font-medium text-gray-900">
                      {appointment.patient?.name || 'نامشخص'}
                    </p>
                    <p className="text-sm text-gray-500">
                      کد: {appointment.patient?.id || appointment.patientId}
                    </p>
                  </div>
                </div>
              </td>
              <td className="py-4 px-4">
                <div className="flex items-center">
                  <Calendar className="w-4 h-4 text-gray-400 ml-2" />
                  <span className="font-medium">{appointment.date}</span>
                </div>
                <div className="flex items-center mt-1">
                  <Clock className="w-4 h-4 text-gray-400 ml-2" />
                  <span className="text-gray-600">{appointment.time}</span>
                </div>
              </td>
              <td className="py-4 px-4">
                <div className="max-w-xs">
                  <p className="text-gray-900 line-clamp-2">
                    {appointment.reason || 'معاینه عمومی'}
                  </p>
                </div>
              </td>
              <td className="py-4 px-4">
                <div className={`inline-flex items-center px-3 py-1 rounded-full border ${getStatusColor(appointment.status)}`}>
                  <span className="ml-1">{getStatusIcon(appointment.status)}</span>
                  <span className="text-sm font-medium">
                    {getStatusText(appointment.status)}
                  </span>
                </div>
              </td>
              <td className="py-4 px-4">
                <div className="flex space-x-2 space-x-reverse">
                  {appointment.status === 'pending' && (
                    <>
                      <button
                        onClick={() => onEdit?.(appointment)}
                        className="px-3 py-1 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 text-sm font-medium"
                      >
                        ویرایش
                      </button>
                      <button
                        onClick={() => onCancel?.(appointment.id)}
                        className="px-3 py-1 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 text-sm font-medium"
                      >
                        لغو
                      </button>
                    </>
                  )}
                  {appointment.status === 'confirmed' && (
                    <button
                      onClick={() => onEdit?.(appointment)}
                      className="px-3 py-1 bg-green-50 text-green-600 rounded-lg hover:bg-green-100 text-sm font-medium"
                    >
                      شروع ویزیت
                    </button>
                  )}
                  <button
                    onClick={() => onEdit?.(appointment)}
                    className="px-3 py-1 bg-gray-50 text-gray-600 rounded-lg hover:bg-gray-100 text-sm font-medium"
                  >
                    مشاهده
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      
      {/* View for Mobile */}
      <div className="md:hidden space-y-4 mt-4">
        {appointments.map((appointment) => (
          <div key={appointment.id} className="bg-white border rounded-xl p-4 shadow-sm">
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center">
                <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center ml-3">
                  <User className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <p className="font-medium">{appointment.patient?.name || 'نامشخص'}</p>
                  <div className={`inline-flex items-center px-2 py-1 rounded-full text-xs mt-1 ${getStatusColor(appointment.status)}`}>
                    <span className="ml-1">{getStatusIcon(appointment.status)}</span>
                    {getStatusText(appointment.status)}
                  </div>
                </div>
              </div>
            </div>
            
            <div className="space-y-2 text-sm text-gray-600">
              <div className="flex items-center">
                <Calendar className="w-4 h-4 ml-2" />
                <span>{appointment.date} - {appointment.time}</span>
              </div>
              {appointment.reason && (
                <div>
                  <span className="font-medium">علت: </span>
                  <span>{appointment.reason}</span>
                </div>
              )}
            </div>
            
            <div className="flex justify-end space-x-2 space-x-reverse mt-4 pt-3 border-t">
              <button className="px-3 py-1 bg-blue-50 text-blue-600 rounded-lg text-sm">
                مشاهده
              </button>
              {appointment.status === 'pending' && (
                <button className="px-3 py-1 bg-red-50 text-red-600 rounded-lg text-sm">
                  لغو
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AppointmentList;