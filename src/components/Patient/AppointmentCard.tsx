import React from 'react';
import type{ Doctor, Appointment } from '../../types';
import { APPOINTMENT_STATUS_COLORS } from '../../constants/patient';

interface AppointmentCardProps {
  appointment: Appointment;
  doctor?: Doctor;
  onEdit?: () => void;
  onCancel?: () => void;
}

const AppointmentCard: React.FC<AppointmentCardProps> = ({
  appointment,
  doctor,
  onEdit,
  onCancel,
}) => {
  const statusColor = APPOINTMENT_STATUS_COLORS[appointment.status] || 'bg-gray-500';

  return (
    <div className="p-4 border rounded-xl hover:shadow-md transition-shadow">
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <div className={`w-3 h-3 rounded-full ml-3 ${statusColor}`}></div>
          <div>
            <p className="font-medium">{doctor?.name || 'پزشک نامشخص'}</p>
            <p className="text-gray-600 text-sm">{doctor?.specialization || ''}</p>
          </div>
        </div>
        <div className="text-right">
          <p className="font-medium">{appointment.date} - ساعت {appointment.time}</p>
          <p className="text-gray-600 text-sm">{appointment.reason}</p>
        </div>
      </div>
      <div className="flex justify-end mt-4 space-x-2 space-x-reverse">
        <button
          onClick={onEdit}
          className="px-4 py-2 text-sm bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100"
        >
          ویرایش
        </button>
        <button
          onClick={onCancel}
          className="px-4 py-2 text-sm bg-red-50 text-red-600 rounded-lg hover:bg-red-100"
        >
          لغو نوبت
        </button>
      </div>
    </div>
  );
};

export default AppointmentCard;