import React from 'react';
import type{ Doctor } from '../../types';

interface BookingSummaryProps {
  doctor?: Doctor;
  selectedDate: string;
  selectedTime: string;
  onBookAppointment: () => void;
}

const BookingSummary: React.FC<BookingSummaryProps> = ({
  doctor,
  selectedDate,
  selectedTime,
  onBookAppointment,
}) => {
  return (
    <div className="border-t pt-6">
      <div className="bg-blue-50 rounded-xl p-6 mb-6">
        <h4 className="font-bold text-lg mb-2">خلاصه نوبت</h4>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <p className="text-gray-600 text-sm">پزشک</p>
            <p className="font-medium">{doctor?.name}</p>
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
        onClick={onBookAppointment}
        className="w-full bg-gradient-to-r from-blue-600 to-green-600 text-white py-4 rounded-xl font-bold text-lg hover:from-blue-700 hover:to-green-700 transition-all shadow-lg hover:shadow-xl"
      >
        تایید و رزرو نوبت
      </button>
    </div>
  );
};

export default BookingSummary;