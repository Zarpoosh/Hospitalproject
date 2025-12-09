import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Pill, 
  Search, 
  Filter, 
  Plus, 
  Edit, 
  Trash2, 
  Package, 
  Bell, 
  LogOut,
  BarChart3,
  RefreshCw
} from 'lucide-react';
import type { Medication } from '../types';

const PharmacistDashboard = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingMedication, setEditingMedication] = useState<Medication | null>(null);
  const [newMedication, setNewMedication] = useState({
    name: '',
    genericName: '',
    dosageForm: '',
    strength: '',
    manufacturer: '',
    price: '',
    stock: '',
    description: ''
  });

  // داده‌های نمونه
  const [medications, setMedications] = useState<Medication[]>([
    {
      id: '1',
      name: 'آموکسی‌سیلین',
      genericName: 'Amoxicillin',
      dosageForm: 'کپسول',
      strength: '500mg',
      manufacturer: 'داروسازی عبیدی',
      price: 15000,
      stock: 45,
      description: 'آنتی‌بیوتیک'
    },
    {
      id: '2',
      name: 'استامینوفن',
      genericName: 'Acetaminophen',
      dosageForm: 'قرص',
      strength: '325mg',
      manufacturer: 'داروسازی اسوه',
      price: 8000,
      stock: 120,
      description: 'مسکن و تب‌بر'
    },
    {
      id: '3',
      name: 'ایبوپروفن',
      genericName: 'Ibuprofen',
      dosageForm: 'قرص',
      strength: '400mg',
      manufacturer: 'داروسازی کوثر',
      price: 12000,
      stock: 35,
      description: 'ضد التهاب غیر استروئیدی'
    }
  ]);

  const handleLogout = () => {
    localStorage.removeItem('user');
    navigate('/login');
  };

  const handleAddMedication = () => {
    if (!newMedication.name || !newMedication.dosageForm || !newMedication.strength) {
      alert('لطفاً اطلاعات ضروری را وارد کنید');
      return;
    }

    const medication: Medication = {
      id: Date.now().toString(),
      name: newMedication.name,
      genericName: newMedication.genericName || undefined,
      dosageForm: newMedication.dosageForm,
      strength: newMedication.strength,
      manufacturer: newMedication.manufacturer,
      price: parseInt(newMedication.price) || 0,
      stock: parseInt(newMedication.stock) || 0,
      description: newMedication.description || undefined
    };

    setMedications([...medications, medication]);
    setNewMedication({
      name: '',
      genericName: '',
      dosageForm: '',
      strength: '',
      manufacturer: '',
      price: '',
      stock: '',
      description: ''
    });
    setShowAddModal(false);
    alert('دارو با موفقیت اضافه شد');
  };

  const handleEditMedication = (medication: Medication) => {
    setEditingMedication(medication);
    setNewMedication({
      name: medication.name,
      genericName: medication.genericName || '',
      dosageForm: medication.dosageForm,
      strength: medication.strength,
      manufacturer: medication.manufacturer,
      price: medication.price.toString(),
      stock: medication.stock.toString(),
      description: medication.description || ''
    });
    setShowAddModal(true);
  };

  const handleUpdateMedication = () => {
    if (!editingMedication || !newMedication.name) {
      alert('لطفاً اطلاعات را وارد کنید');
      return;
    }

    const updatedMedication: Medication = {
      ...editingMedication,
      name: newMedication.name,
      genericName: newMedication.genericName || undefined,
      dosageForm: newMedication.dosageForm,
      strength: newMedication.strength,
      manufacturer: newMedication.manufacturer,
      price: parseInt(newMedication.price) || 0,
      stock: parseInt(newMedication.stock) || 0,
      description: newMedication.description || undefined
    };

    setMedications(medications.map(m => 
      m.id === editingMedication.id ? updatedMedication : m
    ));
    
    setShowAddModal(false);
    setEditingMedication(null);
    setNewMedication({
      name: '',
      genericName: '',
      dosageForm: '',
      strength: '',
      manufacturer: '',
      price: '',
      stock: '',
      description: ''
    });
    
    alert('دارو با موفقیت به‌روزرسانی شد');
  };

  const handleDeleteMedication = (id: string) => {
    if (window.confirm('آیا از حذف این دارو مطمئن هستید؟')) {
      setMedications(medications.filter(m => m.id !== id));
      alert('دارو با موفقیت حذف شد');
    }
  };

  const filteredMedications = medications.filter(medication =>
    medication.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    medication.genericName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    medication.description?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow">
        <div className="px-6 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-4 space-x-reverse">
            <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center">
              <Pill className="w-6 h-6 text-orange-600" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-800">پنل داروساز</h1>
              <p className="text-gray-600 text-sm">مدیریت داروخانه</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-4 space-x-reverse">
            <div className="relative">
              <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="جستجوی دارو..."
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            
            <button className="relative p-2 text-gray-600 hover:text-orange-600">
              <Bell className="w-6 h-6" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
            </button>
            
            <button 
              onClick={handleLogout}
              className="flex items-center text-gray-600 hover:text-red-600 px-3 py-2 hover:bg-red-50 rounded-lg transition-colors"
            >
              <LogOut className="w-5 h-5 ml-1" />
              <span className="hidden md:inline">خروج</span>
            </button>
          </div>
        </div>
      </header>

      <div className="p-6">
        <div className="max-w-7xl mx-auto">
          {/* Statistics */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <div className="bg-white rounded-2xl shadow p-6">
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
            
            <div className="bg-white rounded-2xl shadow p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-500 text-sm">موجودی کل</p>
                  <p className="text-3xl font-bold mt-2">
                    {medications.reduce((sum, med) => sum + med.stock, 0)}
                  </p>
                </div>
                <div className="p-3 bg-green-100 rounded-xl">
                  <Package className="w-8 h-8 text-green-600" />
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-2xl shadow p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-500 text-sm">داروهای کم‌موجود</p>
                  <p className="text-3xl font-bold mt-2">
                    {medications.filter(med => med.stock < 20).length}
                  </p>
                </div>
                <div className="p-3 bg-yellow-100 rounded-xl">
                  <RefreshCw className="w-8 h-8 text-yellow-600" />
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-2xl shadow p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-500 text-sm">ارزش موجودی</p>
                  <p className="text-3xl font-bold mt-2">
                    {(medications.reduce((sum, med) => sum + (med.price * med.stock), 0) / 1000000).toFixed(1)}M
                  </p>
                </div>
                <div className="p-3 bg-purple-100 rounded-xl">
                  <BarChart3 className="w-8 h-8 text-purple-600" />
                </div>
              </div>
            </div>
          </div>

          {/* Medications Table */}
          <div className="bg-white rounded-2xl shadow">
            <div className="p-6 border-b flex items-center justify-between">
              <h2 className="text-xl font-bold text-gray-800">لیست داروها</h2>
              <div className="flex space-x-3 space-x-reverse">
                <button
                  onClick={() => setShowAddModal(true)}
                  className="flex items-center bg-orange-600 text-white px-4 py-2 rounded-lg hover:bg-orange-700"
                >
                  <Plus className="w-5 h-5 ml-2" />
                  افزودن داروی جدید
                </button>
                <button className="flex items-center border border-gray-300 px-4 py-2 rounded-lg hover:bg-gray-50">
                  <Filter className="w-5 h-5 ml-2" />
                  فیلتر
                </button>
              </div>
            </div>
            
            <div className="p-6">
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
                    {filteredMedications.map((medication) => (
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
                          <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
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
                            <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                              medication.stock > 50 ? 'bg-green-100 text-green-800' :
                              medication.stock > 20 ? 'bg-yellow-100 text-yellow-800' :
                              'bg-red-100 text-red-800'
                            }`}>
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
                              onClick={() => handleEditMedication(medication)}
                              className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg"
                            >
                              <Edit className="w-5 h-5" />
                            </button>
                            <button
                              onClick={() => handleDeleteMedication(medication.id)}
                              className="p-2 text-red-600 hover:bg-red-50 rounded-lg"
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
            </div>
          </div>
        </div>
      </div>

      {/* Add/Edit Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">
                {editingMedication ? 'ویرایش دارو' : 'افزودن داروی جدید'}
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-gray-700 mb-2 font-medium">
                    نام دارو *
                  </label>
                  <input
                    type="text"
                    value={newMedication.name}
                    onChange={(e) => setNewMedication({...newMedication, name: e.target.value})}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500"
                    placeholder="نام دارو"
                  />
                </div>
                
                <div>
                  <label className="block text-gray-700 mb-2 font-medium">
                    نام ژنریک
                  </label>
                  <input
                    type="text"
                    value={newMedication.genericName}
                    onChange={(e) => setNewMedication({...newMedication, genericName: e.target.value})}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500"
                    placeholder="نام ژنریک"
                  />
                </div>
                
                <div>
                  <label className="block text-gray-700 mb-2 font-medium">
                    فرم دارویی *
                  </label>
                  <select
                    value={newMedication.dosageForm}
                    onChange={(e) => setNewMedication({...newMedication, dosageForm: e.target.value})}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500"
                  >
                    <option value="">انتخاب کنید</option>
                    <option value="قرص">قرص</option>
                    <option value="کپسول">کپسول</option>
                    <option value="شربت">شربت</option>
                    <option value="آمپول">آمپول</option>
                    <option value="پماد">پماد</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-gray-700 mb-2 font-medium">
                    میزان *
                  </label>
                  <input
                    type="text"
                    value={newMedication.strength}
                    onChange={(e) => setNewMedication({...newMedication, strength: e.target.value})}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500"
                    placeholder="مثال: 500mg"
                  />
                </div>
                
                <div>
                  <label className="block text-gray-700 mb-2 font-medium">
                    سازنده
                  </label>
                  <input
                    type="text"
                    value={newMedication.manufacturer}
                    onChange={(e) => setNewMedication({...newMedication, manufacturer: e.target.value})}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500"
                    placeholder="نام سازنده"
                  />
                </div>
                
                <div>
                  <label className="block text-gray-700 mb-2 font-medium">
                    قیمت (تومان)
                  </label>
                  <input
                    type="number"
                    value={newMedication.price}
                    onChange={(e) => setNewMedication({...newMedication, price: e.target.value})}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500"
                    placeholder="قیمت"
                  />
                </div>
                
                <div>
                  <label className="block text-gray-700 mb-2 font-medium">
                    موجودی
                  </label>
                  <input
                    type="number"
                    value={newMedication.stock}
                    onChange={(e) => setNewMedication({...newMedication, stock: e.target.value})}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500"
                    placeholder="تعداد موجودی"
                  />
                </div>
                
                <div className="md:col-span-2">
                  <label className="block text-gray-700 mb-2 font-medium">
                    توضیحات
                  </label>
                  <textarea
                    value={newMedication.description}
                    onChange={(e) => setNewMedication({...newMedication, description: e.target.value})}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500"
                    placeholder="توضیحات درباره دارو"
                    rows={3}
                  />
                </div>
              </div>
              
              <div className="flex justify-end space-x-3 space-x-reverse mt-8 pt-6 border-t">
                <button
                  onClick={() => {
                    setShowAddModal(false);
                    setEditingMedication(null);
                    setNewMedication({
                      name: '',
                      genericName: '',
                      dosageForm: '',
                      strength: '',
                      manufacturer: '',
                      price: '',
                      stock: '',
                      description: ''
                    });
                  }}
                  className="px-6 py-3 border border-gray-300 rounded-xl hover:bg-gray-50"
                >
                  انصراف
                </button>
                <button
                  onClick={editingMedication ? handleUpdateMedication : handleAddMedication}
                  className="px-6 py-3 bg-orange-600 text-white rounded-xl hover:bg-orange-700"
                >
                  {editingMedication ? 'به‌روزرسانی' : 'افزودن'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PharmacistDashboard;