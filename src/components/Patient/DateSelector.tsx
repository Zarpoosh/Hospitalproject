import React from 'react';

interface DateSelectorProps {
  dates: Date[];
  selectedDate: string;
  onSelectDate: (dateStr: string) => void;
}

const DateSelector: React.FC<DateSelectorProps> = ({
  dates,
  selectedDate,
  onSelectDate,
}) => {
  const formatDate = (date: Date) => ({
    weekday: date.toLocaleDateString('fa-IR', { weekday: 'short' }),
    day: date.toLocaleDateString('fa-IR', { day: 'numeric' }),
    month: date.toLocaleDateString('fa-IR', { month: 'long' }),
    fullDate: date.toLocaleDateString('fa-IR'),
  });

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-7 gap-3">
      {dates.map((date, index) => {
        const { weekday, day, month, fullDate } = formatDate(date);
        const isSelected = selectedDate === fullDate;

        return (
          <button
            key={index}
            onClick={() => onSelectDate(fullDate)}
            className={`p-4 border rounded-lg text-center transition-all ${
              isSelected
                ? 'bg-blue-500 text-white border-blue-500'
                : 'border-gray-300 hover:border-blue-400'
            }`}
          >
            <div className="text-sm">{weekday}</div>
            <div className="text-lg font-medium mt-1">{day}</div>
            <div className="text-xs mt-1">{month}</div>
          </button>
        );
      })}
    </div>
  );
};

export default DateSelector;