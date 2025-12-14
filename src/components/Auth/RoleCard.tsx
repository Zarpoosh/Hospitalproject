import React from 'react';
import type { LucideIcon } from 'lucide-react';
import type{ UserRole } from '../../types';

interface RoleCardProps {
  role: UserRole;
  name: string;
  icon: LucideIcon;
  color: string;
  isSelected: boolean;
  onClick: (role: UserRole) => void;
}

const RoleCard: React.FC<RoleCardProps> = ({
  role,
  name,
  icon: Icon,
  color,
  isSelected,
  onClick,
}) => {
  return (
    <button
      type="button"
      onClick={() => onClick(role)}
      className={`w-full flex items-center p-4 rounded-xl transition-all duration-200 ${
        isSelected 
          ? 'bg-white text-gray-800 shadow-lg transform scale-105' 
          : 'bg-blue-700 hover:bg-blue-600 hover:shadow-md text-white'
      }`}
      aria-selected={isSelected}
    >
      <div className={`p-3 rounded-lg ${color}`}>
        <Icon className="w-6 h-6" />
      </div>
      
      <span className="mr-3 text-lg font-medium flex-1 text-right">
        {name}
      </span>
      
      {isSelected && (
        <div 
          className="w-3 h-3 bg-green-500 rounded-full animate-pulse"
          aria-label="انتخاب شده"
        />
      )}
    </button>
  );
};

export default RoleCard;