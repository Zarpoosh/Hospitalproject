import React from 'react';
import { Plus, Filter } from 'lucide-react';

interface TableHeaderProps {
  onAddClick: () => void;
}

const TableHeader: React.FC<TableHeaderProps> = ({ onAddClick }) => {
  return (
    <div className="p-6 border-b flex items-center justify-between">
      <h2 className="text-xl font-bold text-gray-800">لیست داروها</h2>
      <div className="flex space-x-3 space-x-reverse">
        <button
          onClick={onAddClick}
          className="flex items-center bg-orange-600 text-white px-4 py-2 rounded-lg hover:bg-orange-700 transition-colors"
          aria-label="افزودن داروی جدید"
        >
          <Plus className="w-5 h-5 ml-2" />
          افزودن داروی جدید
        </button>
        <button 
          className="flex items-center border border-gray-300 px-4 py-2 rounded-lg hover:bg-gray-50 transition-colors"
          aria-label="فیلتر کردن"
        >
          <Filter className="w-5 h-5 ml-2" />
          فیلتر
        </button>
      </div>
    </div>
  );
};

export default TableHeader;