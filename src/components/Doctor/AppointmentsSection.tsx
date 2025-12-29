import React from 'react';
import { Clock, Filter } from 'lucide-react';
import type{ Appointment } from '../../types';
import AppointmentList from '../Features/AppointmentList';

interface AppointmentsSectionProps {
  appointments: Appointment[];
  onEditAppointment?: (appointment: Appointment) => void;
  onCancelAppointment?: (appointmentId: string) => void;
}

const AppointmentsSection: React.FC<AppointmentsSectionProps> = ({
  appointments,
  onEditAppointment,
  onCancelAppointment,
}) => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow dark:shadow-gray-900">
      <div className="p-6 border-b border-gray-200 dark:border-gray-700">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold text-gray-800 dark:text-gray-100 flex items-center">
            <Clock className="w-6 h-6 ml-2 text-blue-600 dark:text-blue-400" />
            قرارهای ملاقات امروز
          </h2>
          <button className="flex items-center text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300">
            <Filter className="w-5 h-5 ml-1" />
            فیلتر
          </button>
        </div>
      </div>
      <AppointmentList
        appointments={appointments}
        onEdit={onEditAppointment}
        onCancel={onCancelAppointment}
      />
    </div>
  );
};

export default AppointmentsSection;