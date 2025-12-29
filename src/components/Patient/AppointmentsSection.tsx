import React from 'react';
import type{ Appointment, Doctor } from '../../types';
import AppointmentCard from './AppointmentCard';

interface AppointmentsSectionProps {
  appointments: Appointment[];
  getDoctorById: (doctorId: string) => Doctor | undefined;
  onEditAppointment?: (appointmentId: string) => void;
  onCancelAppointment?: (appointmentId: string) => void;
}

const AppointmentsSection: React.FC<AppointmentsSectionProps> = ({
  appointments,
  getDoctorById,
  onEditAppointment,
  onCancelAppointment,
}) => {
  const handleEdit = (appointmentId: string) => {
    onEditAppointment?.(appointmentId);
  };

  const handleCancel = (appointmentId: string) => {
    onCancelAppointment?.(appointmentId);
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow dark:shadow-gray-900">
      <div className="p-6 border-b dark:border-gray-700">
        <h2 className="text-xl font-bold text-gray-800 dark:text-gray-100">قرارهای ملاقات من</h2>
      </div>
      <div className="p-6">
        <div className="space-y-4">
          {appointments.map((appointment) => (
            <AppointmentCard
              key={appointment.id}
              appointment={appointment}
              doctor={getDoctorById(appointment.doctorId)}
              onEdit={() => handleEdit(appointment.id)}
              onCancel={() => handleCancel(appointment.id)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default AppointmentsSection;