import React from 'react';

interface BookingStepProps {
  step: number;
  label: string;
  children: React.ReactNode;
  isActive?: boolean;
}

const BookingStep: React.FC<BookingStepProps> = ({
  step,
  label,
  children,
  isActive = true,
}) => {
  if (!isActive) return null;

  return (
    <div className="mb-8">
      <h3 className="text-lg font-semibold mb-4 flex items-center">
        <span className="w-8 h-8 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center ml-2">
          {step}
        </span>
        {label}
      </h3>
      {children}
    </div>
  );
};

export default BookingStep;