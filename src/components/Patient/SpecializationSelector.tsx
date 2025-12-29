import React from 'react';
import { Stethoscope } from 'lucide-react';

interface SpecializationSelectorProps {
  selectedSpecialization: string;
  onSelect: (specialization: string) => void;
  specializations: string[];
  loading?: boolean;
}

const SpecializationSelector: React.FC<SpecializationSelectorProps> = ({
  selectedSpecialization,
  onSelect,
  specializations,
  loading = false,
}) => {
  if (loading) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-500">در حال بارگذاری تخصص‌ها...</p>
      </div>
    );
  }

  if (specializations.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-500">تخصصی یافت نشد</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {specializations.map((specialization) => (
        <button
          key={specialization}
          type="button"
          onClick={() => onSelect(specialization)}
          className={`
            p-6 border-2 rounded-xl text-right transition-all hover:shadow-md
            ${selectedSpecialization === specialization
              ? 'border-blue-500 bg-blue-50'
              : 'border-gray-200 hover:border-blue-300'
            }
          `}
        >
          <div className="flex items-center mb-3">
            <div className={`
              w-12 h-12 rounded-full flex items-center justify-center ml-3
              ${selectedSpecialization === specialization
                ? 'bg-blue-600'
                : 'bg-gray-100'
              }
            `}>
              <Stethoscope className={`
                w-6 h-6
                ${selectedSpecialization === specialization
                  ? 'text-white'
                  : 'text-gray-600'
                }
              `} />
            </div>
            <div>
              <p className={`
                font-bold text-lg
                ${selectedSpecialization === specialization
                  ? 'text-blue-600'
                  : 'text-gray-800'
                }
              `}>
                {specialization}
              </p>
            </div>
          </div>
          {selectedSpecialization === specialization && (
            <div className="mt-3 p-2 bg-green-100 text-green-800 rounded-lg text-sm text-center">
              ✓ انتخاب شده
            </div>
          )}
        </button>
      ))}
    </div>
  );
};

export default SpecializationSelector;

