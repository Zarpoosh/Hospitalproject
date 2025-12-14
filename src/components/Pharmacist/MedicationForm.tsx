import React from 'react';
// import { Medication } from '../../types';
import { DOSAGE_FORMS } from '../../constants/pharmacist';

interface MedicationFormProps {
  isEditing: boolean;
  formData: {
    name: string;
    genericName: string;
    dosageForm: string;
    strength: string;
    manufacturer: string;
    price: string;
    stock: string;
    description: string;
  };
  onFormChange: (field: string, value: string) => void;
  onSubmit: () => void;
  onCancel: () => void;
}

const MedicationForm: React.FC<MedicationFormProps> = ({
  isEditing,
  formData,
  onFormChange,
  onSubmit,
  onCancel,
}) => {
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    onFormChange(name, value);
  };

  const renderInputField = (
    label: string,
    name: keyof typeof formData,
    type: string = 'text',
    required: boolean = false,
    placeholder: string = ''
  ) => (
    <div>
      <label className="block text-gray-700 mb-2 font-medium">
        {label} {required && '*'}
      </label>
      {name === 'dosageForm' ? (
        <select
          name={name}
          value={formData[name]}
          onChange={handleInputChange}
          className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500"
          required={required}
        >
          <option value="">انتخاب کنید</option>
          {DOSAGE_FORMS.map((form) => (
            <option key={form.value} value={form.value}>
              {form.label}
            </option>
          ))}
        </select>
      ) : name === 'description' ? (
        <textarea
          name={name}
          value={formData[name]}
          onChange={handleInputChange}
          className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500"
          placeholder={placeholder}
          rows={3}
        />
      ) : (
        <input
          type={type}
          name={name}
          value={formData[name]}
          onChange={handleInputChange}
          className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500"
          placeholder={placeholder}
          required={required}
        />
      )}
    </div>
  );

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">
        {isEditing ? 'ویرایش دارو' : 'افزودن داروی جدید'}
      </h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {renderInputField('نام دارو', 'name', 'text', true, 'نام دارو')}
        {renderInputField('نام ژنریک', 'genericName', 'text', false, 'نام ژنریک')}
        {renderInputField('فرم دارویی', 'dosageForm', 'select', true)}
        {renderInputField('میزان', 'strength', 'text', true, 'مثال: 500mg')}
        {renderInputField('سازنده', 'manufacturer', 'text', false, 'نام سازنده')}
        {renderInputField('قیمت (تومان)', 'price', 'number', false, 'قیمت')}
        {renderInputField('موجودی', 'stock', 'number', false, 'تعداد موجودی')}
        <div className="md:col-span-2">
          {renderInputField('توضیحات', 'description', 'textarea', false, 'توضیحات درباره دارو')}
        </div>
      </div>
      
      <div className="flex justify-end space-x-3 space-x-reverse mt-8 pt-6 border-t">
        <button
          onClick={onCancel}
          className="px-6 py-3 border border-gray-300 rounded-xl hover:bg-gray-50"
        >
          انصراف
        </button>
        <button
          onClick={onSubmit}
          className="px-6 py-3 bg-orange-600 text-white rounded-xl hover:bg-orange-700"
        >
          {isEditing ? 'به‌روزرسانی' : 'افزودن'}
        </button>
      </div>
    </div>
  );
};

export default MedicationForm;