import React from 'react';
import { Pill, Edit, Trash2 } from 'lucide-react';
import type{ Medication } from '../../types';

interface MedicationTableProps {
  medications: Medication[];
  onEdit: (medication: Medication) => void;
  onDelete: (id: string) => void;
}

const MedicationTable: React.FC<MedicationTableProps> = ({
  medications,
  onEdit,
  onDelete,
}) => {
  const getStockColor = (stock: number) => {
    if (stock > 50) return 'bg-green-100 text-green-800';
    if (stock > 20) return 'bg-yellow-100 text-yellow-800';
    return 'bg-red-100 text-red-800';
  };

  const getDosageFormColor = (form: string) => {
    const colors: Record<string, string> = {
      'قرص': 'bg-blue-100 text-blue-800',
      'کپسول': 'bg-purple-100 text-purple-800',
      'شربت': 'bg-green-100 text-green-800',
      'آمپول': 'bg-red-100 text-red-800',
      'پماد': 'bg-yellow-100 text-yellow-800',
      'قطره': 'bg-indigo-100 text-indigo-800',
    };
    return colors[form] || 'bg-gray-100 text-gray-800';
  };

  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr className="bg-gray-50">
            <th className="py-3 px-4 text-right text-gray-600 font-medium">نام دارو</th>
            <th className="py-3 px-4 text-right text-gray-600 font-medium">نام ژنریک</th>
            <th className="py-3 px-4 text-right text-gray-600 font-medium">فرم دارویی</th>
            <th className="py-3 px-4 text-right text-gray-600 font-medium">میزان</th>
            <th className="py-3 px-4 text-right text-gray-600 font-medium">سازنده</th>
            <th className="py-3 px-4 text-right text-gray-600 font-medium">قیمت (تومان)</th>
            <th className="py-3 px-4 text-right text-gray-600 font-medium">موجودی</th>
            <th className="py-3 px-4 text-right text-gray-600 font-medium">عملیات</th>
          </tr>
        </thead>
        <tbody>
          {medications.map((medication) => (
            <tr key={medication.id} className="border-b border-gray-100 hover:bg-gray-50">
              <td className="py-4 px-4">
                <div className="flex items-center">
                  <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center ml-3">
                    <Pill className="w-5 h-5 text-orange-600" />
                  </div>
                  <div>
                    <p className="font-medium">{medication.name}</p>
                    {medication.description && (
                      <p className="text-sm text-gray-500">{medication.description}</p>
                    )}
                  </div>
                </div>
              </td>
              <td className="py-4 px-4">
                {medication.genericName || (
                  <span className="text-gray-400">---</span>
                )}
              </td>
              <td className="py-4 px-4">
                <span className={`px-3 py-1 rounded-full text-sm ${getDosageFormColor(medication.dosageForm)}`}>
                  {medication.dosageForm}
                </span>
              </td>
              <td className="py-4 px-4 font-medium">{medication.strength}</td>
              <td className="py-4 px-4">{medication.manufacturer}</td>
              <td className="py-4 px-4">
                {medication.price.toLocaleString()}
              </td>
              <td className="py-4 px-4">
                <div className="flex items-center">
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStockColor(medication.stock)}`}>
                    {medication.stock}
                  </span>
                  {medication.stock < 20 && (
                    <span className="mr-2 text-xs text-red-500">کمبود</span>
                  )}
                </div>
              </td>
              <td className="py-4 px-4">
                <div className="flex space-x-2 space-x-reverse">
                  <button
                    onClick={() => onEdit(medication)}
                    className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                    title="ویرایش"
                    aria-label={`ویرایش ${medication.name}`}
                  >
                    <Edit className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() => onDelete(medication.id)}
                    className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                    title="حذف"
                    aria-label={`حذف ${medication.name}`}
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default MedicationTable;