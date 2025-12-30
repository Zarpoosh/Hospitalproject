/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from 'react';
import { 
  Pill, 
  Search, 
  Filter, 
  Edit, 
  Trash2, 
  Package, 
  AlertCircle,
  TrendingUp,
  TrendingDown
} from 'lucide-react';
import type { Medication } from '../../types';

interface MedicationListProps {
  medications: Medication[];
  onEdit?: (medication: Medication) => void;
  onDelete?: (medicationId: string) => void;
  onAdd?: () => void;
  onStockUpdate?: (medicationId: string, newStock: number) => void;
}

const MedicationList: React.FC<MedicationListProps> = ({ 
  medications, 
  onEdit, 
  onDelete, 
  onAdd,
  onStockUpdate 
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterForm, setFilterForm] = useState('all');
  const [sortBy, setSortBy] = useState('name');
  const [sortOrder, setSortOrder] = useState('asc');

  const filteredMedications = medications.filter(medication => {
    const matchesSearch = 
      medication.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      medication.genericName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      medication.manufacturer.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesForm = filterForm === 'all' || medication.dosageForm === filterForm;
    
    return matchesSearch && matchesForm;
  });

  const sortedMedications = [...filteredMedications].sort((a, b) => {
    let aValue: any, bValue: any;
    
    switch (sortBy) {
      case 'name':
        aValue = a.name;
        bValue = b.name;
        break;
      case 'stock':
        aValue = a.stock;
        bValue = b.stock;
        break;
      case 'price':
        aValue = a.price;
        bValue = b.price;
        break;
      default:
        return 0;
    }
    
    if (sortOrder === 'asc') {
      return aValue > bValue ? 1 : -1;
    } else {
      return aValue < bValue ? 1 : -1;
    }
  });

  const getStockStatus = (stock: number) => {
    if (stock === 0) return { color: 'bg-red-100 text-red-800', text: 'اتمام', icon: <AlertCircle className="w-4 h-4" /> };
    if (stock < 20) return { color: 'bg-orange-100 text-orange-800', text: 'کمبود', icon: <TrendingDown className="w-4 h-4" /> };
    if (stock > 100) return { color: 'bg-green-100 text-green-800', text: 'کافی', icon: <TrendingUp className="w-4 h-4" /> };
    return { color: 'bg-blue-100 text-blue-800', text: 'متوسط', icon: null };
  };

  const getDosageFormColor = (form: string) => {
    const colors: Record<string, string> = {
      'قرص': 'bg-purple-100 text-purple-800',
      'کپسول': 'bg-blue-100 text-blue-800',
      'شربت': 'bg-green-100 text-green-800',
      'آمپول': 'bg-red-100 text-red-800',
      'پماد': 'bg-yellow-100 text-yellow-800',
      'قطره': 'bg-indigo-100 text-indigo-800',
    };
    return colors[form] || 'bg-gray-100 text-gray-800';
  };

  const totalStock = medications.reduce((sum, med) => sum + med.stock, 0);
  const totalValue = medications.reduce((sum, med) => sum + (med.price * med.stock), 0);
  const lowStockCount = medications.filter(med => med.stock < 20).length;

  if (medications.length === 0) {
    return (
      <div className="text-center py-12">
        <Pill className="w-16 h-16 text-gray-300 mx-auto mb-4" />
        <h3 className="text-lg font-medium text-gray-900 mb-2">هیچ دارویی ثبت نشده است</h3>
        <p className="text-gray-500 mb-6">برای شروع داروهای خود را اضافه کنید.</p>
        {onAdd && (
          <button
            onClick={onAdd}
            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            افزودن اولین دارو
          </button>
        )}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white rounded-xl shadow p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm">کل داروها</p>
              <p className="text-3xl font-bold mt-2">{medications.length}</p>
            </div>
            <div className="p-3 bg-blue-100 rounded-xl">
              <Pill className="w-8 h-8 text-blue-600" />
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-xl shadow p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm">موجودی کل</p>
              <p className="text-3xl font-bold mt-2">{totalStock.toLocaleString()}</p>
            </div>
            <div className="p-3 bg-green-100 rounded-xl">
              <Package className="w-8 h-8 text-green-600" />
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-xl shadow p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm">داروهای کم‌موجود</p>
              <p className="text-3xl font-bold mt-2">{lowStockCount}</p>
            </div>
            <div className="p-3 bg-orange-100 rounded-xl">
              <AlertCircle className="w-8 h-8 text-orange-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Filters and Search */}
      <div className="bg-white rounded-xl shadow p-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="جستجوی دارو بر اساس نام، ژنریک یا سازنده..."
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
          
          <div className="flex flex-wrap gap-3">
            <select
              value={filterForm}
              onChange={(e) => setFilterForm(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">همه فرم‌ها</option>
              <option value="قرص">قرص</option>
              <option value="کپسول">کپسول</option>
              <option value="شربت">شربت</option>
              <option value="آمپول">آمپول</option>
              <option value="پماد">پماد</option>
              <option value="قطره">قطره</option>
            </select>
            
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="name">مرتب‌سازی بر اساس نام</option>
              <option value="stock">مرتب‌سازی بر اساس موجودی</option>
              <option value="price">مرتب‌سازی بر اساس قیمت</option>
            </select>
            
            <button
              onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
              className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 flex items-center"
            >
              <Filter className="w-5 h-5 ml-2" />
              {sortOrder === 'asc' ? 'صعودی' : 'نزولی'}
            </button>
            
            {onAdd && (
              <button
                onClick={onAdd}
                className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center"
              >
                <span className="ml-2">+</span>
                افزودن دارو
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl shadow overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50">
                <th className="py-4 px-6 text-right text-gray-600 font-medium">نام دارو</th>
                <th className="py-4 px-6 text-right text-gray-600 font-medium">فرم دارویی</th>
                <th className="py-4 px-6 text-right text-gray-600 font-medium">میزان</th>
                <th className="py-4 px-6 text-right text-gray-600 font-medium">سازنده</th>
                <th className="py-4 px-6 text-right text-gray-600 font-medium">قیمت (تومان)</th>
                <th className="py-4 px-6 text-right text-gray-600 font-medium">موجودی</th>
                <th className="py-4 px-6 text-right text-gray-600 font-medium">ارزش موجودی</th>
                <th className="py-4 px-6 text-right text-gray-600 font-medium">عملیات</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {sortedMedications.map((medication) => {
                const stockStatus = getStockStatus(medication.stock);
                const dosageColor = getDosageFormColor(medication.dosageForm);
                const itemValue = medication.price * medication.stock;
                
                return (
                  <tr key={medication.id} className="hover:bg-gray-50 transition-colors">
                    <td className="py-4 px-6">
                      <div className="flex items-center">
                        <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center ml-4">
                          <Pill className="w-5 h-5 text-blue-600" />
                        </div>
                        <div className="text-right">
                          <p className="font-medium text-gray-900">{medication.name}</p>
                          {medication.genericName && (
                            <p className="text-sm text-gray-500">{medication.genericName}</p>
                          )}
                          {medication.description && (
                            <p className="text-xs text-gray-400 mt-1 line-clamp-1">{medication.description}</p>
                          )}
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <span className={`px-3 py-1 rounded-full text-sm ${dosageColor}`}>
                        {medication.dosageForm}
                      </span>
                    </td>
                    <td className="py-4 px-6 font-medium">{medication.strength}</td>
                    <td className="py-4 px-6">{medication.manufacturer}</td>
                    <td className="py-4 px-6">
                      <span className="font-medium">{medication.price.toLocaleString()}</span>
                    </td>
                    <td className="py-4 px-6">
                      <div className="flex items-center">
                        <div className={`px-3 py-1 rounded-full text-sm font-medium inline-flex items-center ${stockStatus.color}`}>
                          {stockStatus.icon && <span className="ml-1">{stockStatus.icon}</span>}
                          <span>{medication.stock}</span>
                          <span className="mr-1 text-xs"> ({stockStatus.text})</span>
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <span className="font-medium text-green-600">
                        {itemValue.toLocaleString()}
                      </span>
                    </td>
                    <td className="py-4 px-6">
                      <div className="flex space-x-2 space-x-reverse">
                        {onEdit && (
                          <button
                            onClick={() => onEdit(medication)}
                            className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                            title="ویرایش"
                          >
                            <Edit className="w-5 h-5" />
                          </button>
                        )}
                        {onDelete && (
                          <button
                            onClick={() => onDelete(medication.id)}
                            className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                            title="حذف"
                          >
                            <Trash2 className="w-5 h-5" />
                          </button>
                        )}
                        {onStockUpdate && (
                          <div className="flex items-center space-x-1 space-x-reverse">
                            <button
                              onClick={() => onStockUpdate(medication.id, medication.stock - 1)}
                              className="w-8 h-8 flex items-center justify-center border border-gray-300 rounded-lg hover:bg-gray-50"
                              disabled={medication.stock <= 0}
                            >
                              -
                            </button>
                            <button
                              onClick={() => onStockUpdate(medication.id, medication.stock + 1)}
                              className="w-8 h-8 flex items-center justify-center border border-gray-300 rounded-lg hover:bg-gray-50"
                            >
                              +
                            </button>
                          </div>
                        )}
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Mobile View */}
        <div className="md:hidden space-y-4 p-4">
          {sortedMedications.map((medication) => {
            const stockStatus = getStockStatus(medication.stock);
            const dosageColor = getDosageFormColor(medication.dosageForm);
            
            return (
              <div key={medication.id} className="bg-gray-50 rounded-xl p-4 border border-gray-200">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center">
                    <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center ml-3">
                      <Pill className="w-5 h-5 text-blue-600" />
                    </div>
                    <div>
                      <p className="font-medium">{medication.name}</p>
                      {medication.genericName && (
                        <p className="text-sm text-gray-600">{medication.genericName}</p>
                      )}
                    </div>
                  </div>
                  <span className={`px-2 py-1 rounded-full text-xs ${dosageColor}`}>
                    {medication.dosageForm}
                  </span>
                </div>
                
                <div className="space-y-2 text-sm text-gray-600">
                  <div className="flex justify-between">
                    <span>سازنده:</span>
                    <span className="font-medium">{medication.manufacturer}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>میزان:</span>
                    <span className="font-medium">{medication.strength}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>قیمت:</span>
                    <span className="font-medium">{medication.price.toLocaleString()} تومان</span>
                  </div>
                  <div className="flex justify-between">
                    <span>موجودی:</span>
                    <div className={`px-2 py-1 rounded-full text-xs ${stockStatus.color}`}>
                      {medication.stock} ({stockStatus.text})
                    </div>
                  </div>
                  <div className="flex justify-between">
                    <span>ارزش موجودی:</span>
                    <span className="font-medium text-green-600">
                      {(medication.price * medication.stock).toLocaleString()} تومان
                    </span>
                  </div>
                </div>
                
                <div className="flex justify-end space-x-2 space-x-reverse mt-4 pt-3 border-t">
                  {onEdit && (
                    <button
                      onClick={() => onEdit(medication)}
                      className="px-3 py-1 text-blue-600 hover:bg-blue-50 rounded-lg text-sm"
                    >
                      ویرایش
                    </button>
                  )}
                  {onDelete && (
                    <button
                      onClick={() => onDelete(medication.id)}
                      className="px-3 py-1 text-red-600 hover:bg-red-50 rounded-lg text-sm"
                    >
                      حذف
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Summary Footer */}
        <div className="bg-gray-50 p-4 border-t">
          <div className="flex flex-col md:flex-row md:items-center justify-between">
            <div className="text-sm text-gray-600">
              نمایش {sortedMedications.length} از {medications.length} دارو
            </div>
            <div className="flex items-center space-x-4 space-x-reverse mt-2 md:mt-0">
              <div className="text-sm">
                <span className="text-gray-600">ارزش کل موجودی: </span>
                <span className="font-bold text-green-600 text-lg">
                  {(totalValue / 1000000).toFixed(1)} میلیون تومان
                </span>
              </div>
              <div className="flex items-center space-x-2 space-x-reverse">
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                <span className="text-xs text-gray-600">کافی (100)</span>
                <div className="w-3 h-3 bg-blue-500 rounded-full ml-2"></div>
                <span className="text-xs text-gray-600">متوسط (20-100)</span>
                <div className="w-3 h-3 bg-orange-500 rounded-full ml-2"></div>
                <span className="text-xs text-gray-600">کمبود (20)</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MedicationList;