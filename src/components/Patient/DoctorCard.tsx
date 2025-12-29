import React from 'react';
import { Clock, Calendar, User } from 'lucide-react';
import type{ Doctor } from '../../types';

interface DoctorCardProps {
  doctor: Doctor;
  isSelected: boolean;
  onSelect: (doctorId: string) => void;
}

const DoctorCard: React.FC<DoctorCardProps> = ({
  doctor,
  isSelected,
  onSelect,
}) => {
  return (
    <div
      className={`border-2 rounded-xl p-6 cursor-pointer transition-all ${
        isSelected
          ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/30 dark:border-blue-400'
          : 'border-gray-200 dark:border-gray-700 hover:border-blue-300 dark:hover:border-blue-600 bg-white dark:bg-gray-800'
      }`}
      onClick={() => onSelect(doctor.id)}
    >
      <div className="flex items-center mb-4">
        <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center ml-4">
          <User className="w-8 h-8 text-blue-600 dark:text-blue-300" />
        </div>
        <div>
          <h4 className="font-bold text-lg dark:text-gray-100">{doctor.name}</h4>
          <p className="text-gray-600 dark:text-gray-300">{doctor.specialization}</p>
        </div>
      </div>
      <div className="space-y-2">
        <div className="flex items-center text-gray-600 dark:text-gray-300">
          <Clock className="w-4 h-4 ml-2" />
          <span className="text-sm">ساعات کاری: {doctor.availableHours.join(', ')}</span>
        </div>
        <div className="flex items-center text-gray-600 dark:text-gray-300">
          <Calendar className="w-4 h-4 ml-2" />
          <span className="text-sm">روزهای فعالیت: {doctor.availableDays.join('، ')}</span>
        </div>
        <div className="flex items-center text-green-600 dark:text-green-400 font-medium">
          <span>هزینه ویزیت: {doctor.consultationFee.toLocaleString()} تومان</span>
        </div>
      </div>
      {isSelected && (
        <div className="mt-4 p-2 bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300 rounded-lg text-sm text-center">
          ✓ انتخاب شده
        </div>
      )}
    </div>
  );
};

export default DoctorCard;