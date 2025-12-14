import React from 'react';

interface TimeSelectorProps {
  timeSlots: readonly string[];
  selectedTime: string;
  onSelectTime: (time: string) => void;
}

const TimeSelector: React.FC<TimeSelectorProps> = ({
  timeSlots,
  selectedTime,
  onSelectTime,
}) => {
  return (
    <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-3">
      {timeSlots.map((time) => {
        const isSelected = selectedTime === time;

        return (
          <button
            key={time}
            onClick={() => onSelectTime(time)}
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
  );
};

export default TimeSelector;