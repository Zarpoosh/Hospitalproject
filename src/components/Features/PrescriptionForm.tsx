import React, { useState } from 'react';
import { 
  X, 
  Plus, 
  Search, 
  Trash2, 
  FileText, 
  User, 
  Pill,
  AlertCircle,
  CheckCircle
} from 'lucide-react';
import type { Patient, Medication } from '../../types';

interface PrescriptionFormProps {
  onClose: () => void;
  patientId?: string;
  onSubmit?: (prescription: unknown) => void;
}

const PrescriptionForm: React.FC<PrescriptionFormProps> = ({ 
  onClose, 
  patientId,
  onSubmit 
}) => {
  const [selectedPatient, setSelectedPatient] = useState<string>(patientId || '');
  const [diagnosis, setDiagnosis] = useState('');
  const [instructions, setInstructions] = useState('');
  const [medications, setMedications] = useState<any[]>([]);
  const [newMedication, setNewMedication] = useState({
    name: '',
    dosage: '',
    frequency: '',
    duration: '',
    notes: ''
  });
  const [searchTerm, setSearchTerm] = useState('');
  const [step, setStep] = useState(1);
  const [errors, setErrors] = useState<Record<string, string>>({});

  // داده‌های نمونه
  const patients: Patient[] = [
    { id: '1', userId: 'u1', name: 'علی رضایی', nationalId: '0012345678', dateOfBirth: '1365/05/20' },
    { id: '2', userId: 'u2', name: 'فاطمه کریمی', nationalId: '0022345678', dateOfBirth: '1370/08/15' },
    { id: '3', userId: 'u3', name: 'محمد حسینی', nationalId: '0032345678', dateOfBirth: '1375/03/10' },
  ];

  const commonMedications: Medication[] = [
    { id: '1', name: 'آموکسی‌سیلین', dosageForm: 'کپسول', strength: '500mg', manufacturer: 'عبیدی', price: 15000, stock: 100 },
    { id: '2', name: 'استامینوفن', dosageForm: 'قرص', strength: '325mg', manufacturer: 'اسوه', price: 8000, stock: 200 },
    { id: '3', name: 'ایبوپروفن', dosageForm: 'قرص', strength: '400mg', manufacturer: 'کوثر', price: 12000, stock: 150 },
    { id: '4', name: 'کلسیم', dosageForm: 'قرص', strength: '1000mg', manufacturer: 'حکیم', price: 5000, stock: 300 },
    { id: '5', name: 'ویتامین C', dosageForm: 'قرص', strength: '1000mg', manufacturer: 'دانا', price: 10000, stock: 180 },
  ];

  const filteredMedications = commonMedications.filter(med =>
    med.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    med.manufacturer.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const validateStep = () => {
    const newErrors: Record<string, string> = {};

    if (step === 1 && !selectedPatient) {
      newErrors.patient = 'لطفاً بیمار را انتخاب کنید';
    }

    if (step === 2 && !diagnosis.trim()) {
      newErrors.diagnosis = 'لطفاً تشخیص بیماری را وارد کنید';
    }

    if (step === 3 && medications.length === 0) {
      newErrors.medications = 'لطفاً حداقل یک دارو اضافه کنید';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep()) {
      setStep(step + 1);
    }
  };

  const handlePrev = () => {
    setStep(step - 1);
  };

  const addMedication = () => {
    if (!newMedication.name || !newMedication.dosage || !newMedication.frequency) {
      setErrors({ ...errors, medication: 'لطفاً اطلاعات دارو را کامل کنید' });
      return;
    }

    setMedications([
      ...medications,
      {
        id: Date.now(),
        ...newMedication,
        price: Math.floor(Math.random() * 50000) + 5000 // قیمت تصادفی برای نمونه
      }
    ]);

    setNewMedication({
      name: '',
      dosage: '',
      frequency: '',
      duration: '',
      notes: ''
    });

    setErrors({ ...errors, medication: '' });
  };

  const removeMedication = (id: number) => {
    setMedications(medications.filter(med => med.id !== id));
  };

  const selectCommonMedication = (medication: Medication) => {
    setNewMedication({
      name: medication.name,
      dosage: medication.strength,
      frequency: 'هر ۸ ساعت',
      duration: '۷ روز',
      notes: `${medication.dosageForm} - ${medication.manufacturer}`
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateStep()) {
      return;
    }

    const prescription = {
      patientId: selectedPatient,
      diagnosis,
      instructions,
      medications,
      date: new Date().toISOString(),
      status: 'pending'
    };

    console.log('Prescription submitted:', prescription);
    
    if (onSubmit) {
      onSubmit(prescription);
    }
    
    alert('نسخه با موفقیت ثبت شد!');
    onClose();
  };

  const calculateTotal = () => {
    return medications.reduce((sum, med) => sum + (med.price || 0), 0);
  };

  const selectedPatientData = patients.find(p => p.id === selectedPatient);

  return (
    <form onSubmit={handleSubmit} className="p-6 max-h-[90vh] overflow-y-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-8 pb-4 border-b">
        <div>
          <h2 className="text-2xl font-bold text-gray-800 flex items-center">
            <FileText className="w-8 h-8 ml-2 text-blue-600" />
            نسخه‌نویسی جدید
          </h2>
          <p className="text-gray-600 mt-1">لطفاً اطلاعات نسخه را وارد کنید</p>
        </div>
        <button
          type="button"
          onClick={onClose}
          className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
        >
          <X className="w-6 h-6 text-gray-500" />
        </button>
      </div>

      {/* Progress Steps */}
      <div className="mb-8">
        <div className="flex items-center justify-center mb-6">
          {[1, 2, 3, 4].map((stepNumber) => (
            <React.Fragment key={stepNumber}>
              <div className="flex flex-col items-center">
                <div className={`
                  w-10 h-10 rounded-full flex items-center justify-center
                  ${step >= stepNumber ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-400'}
                  ${step === stepNumber ? 'ring-4 ring-blue-100' : ''}
                  font-medium
                `}>
                  {stepNumber}
                </div>
                <span className="text-xs mt-2 text-gray-600">
                  {stepNumber === 1 && 'انتخاب بیمار'}
                  {stepNumber === 2 && 'تشخیص'}
                  {stepNumber === 3 && 'داروها'}
                  {stepNumber === 4 && 'تأیید'}
                </span>
              </div>
              {stepNumber < 4 && (
                <div className={`
                  h-1 w-16 mx-2
                  ${step > stepNumber ? 'bg-blue-600' : 'bg-gray-200'}
                `} />
              )}
            </React.Fragment>
          ))}
        </div>
      </div>

      {/* Step 1: Select Patient */}
      {step === 1 && (
        <div className="space-y-6">
          <h3 className="text-xl font-semibold text-gray-800">انتخاب بیمار</h3>
          
          {errors.patient && (
            <div className="p-3 bg-red-50 border border-red-200 text-red-600 rounded-lg flex items-center">
              <AlertCircle className="w-5 h-5 ml-2" />
              {errors.patient}
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {patients.map(patient => (
              <button
                key={patient.id}
                type="button"
                onClick={() => {
                  setSelectedPatient(patient.id);
                  setErrors({ ...errors, patient: '' });
                }}
                className={`
                  p-4 border-2 rounded-xl text-right transition-all hover:shadow-md
                  ${selectedPatient === patient.id 
                    ? 'border-blue-500 bg-blue-50' 
                    : 'border-gray-200 hover:border-blue-300'
                  }
                `}
              >
                <div className="flex items-center mb-3">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center ml-3">
                    <User className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <p className="font-bold text-lg">{patient.name}</p>
                    <p className="text-gray-600 text-sm">کدملی: {patient.nationalId}</p>
                  </div>
                </div>
                <div className="text-sm text-gray-500 space-y-1">
                  <p>تاریخ تولد: {patient.dateOfBirth}</p>
                  <p>سن: {new Date().getFullYear() - parseInt(patient.dateOfBirth.split('/')[0])} سال</p>
                </div>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Step 2: Diagnosis */}
      {step === 2 && (
        <div className="space-y-6">
          <h3 className="text-xl font-semibold text-gray-800">تشخیص بیماری</h3>
          
          {errors.diagnosis && (
            <div className="p-3 bg-red-50 border border-red-200 text-red-600 rounded-lg flex items-center">
              <AlertCircle className="w-5 h-5 ml-2" />
              {errors.diagnosis}
            </div>
          )}

          <div>
            <label className="block text-gray-700 mb-2 font-medium">
              تشخیص بیماری *
            </label>
            <textarea
              value={diagnosis}
              onChange={(e) => {
                setDiagnosis(e.target.value);
                setErrors({ ...errors, diagnosis: '' });
              }}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 h-40"
              placeholder="تشخیص بیماری و شرح حال بیمار را بنویسید..."
              required
            />
          </div>

          <div>
            <label className="block text-gray-700 mb-2 font-medium">
              دستورات و توصیه‌ها
            </label>
            <textarea
              value={instructions}
              onChange={(e) => setInstructions(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 h-32"
              placeholder="دستورات کلی مانند استراحت، رژیم غذایی، مراجعه مجدد..."
            />
          </div>
        </div>
      )}

      {/* Step 3: Medications */}
      {step === 3 && (
        <div className="space-y-6">
          <h3 className="text-xl font-semibold text-gray-800">داروها</h3>
          
          {errors.medications && (
            <div className="p-3 bg-red-50 border border-red-200 text-red-600 rounded-lg flex items-center">
              <AlertCircle className="w-5 h-5 ml-2" />
              {errors.medications}
            </div>
          )}

          {/* Search Medications */}
          <div className="bg-gray-50 p-4 rounded-xl">
            <div className="flex items-center mb-4">
              <Search className="w-5 h-5 text-gray-400 ml-2" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="flex-1 bg-white border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="جستجوی دارو..."
              />
            </div>

            {searchTerm && (
              <div className="space-y-2 max-h-60 overflow-y-auto">
                {filteredMedications.map(medication => (
                  <button
                    key={medication.id}
                    type="button"
                    onClick={() => selectCommonMedication(medication)}
                    className="w-full p-3 bg-white border border-gray-200 rounded-lg hover:bg-blue-50 hover:border-blue-300 text-right flex items-center justify-between"
                  >
                    <div className="flex items-center">
                      <Pill className="w-5 h-5 text-blue-600 ml-2" />
                      <div>
                        <p className="font-medium">{medication.name}</p>
                        <p className="text-sm text-gray-500">
                          {medication.strength} - {medication.manufacturer}
                        </p>
                      </div>
                    </div>
                    <span className="text-green-600 font-medium">
                      {medication.price.toLocaleString()} تومان
                    </span>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Add Medication Form */}
          <div className="bg-white border border-gray-200 rounded-xl p-4">
            <h4 className="font-medium text-gray-800 mb-4">افزودن داروی جدید</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
              <div>
                <label className="block text-sm text-gray-600 mb-1">نام دارو *</label>
                <input
                  type="text"
                  value={newMedication.name}
                  onChange={(e) => setNewMedication({...newMedication, name: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="نام دارو"
                />
              </div>
              
              <div>
                <label className="block text-sm text-gray-600 mb-1">میزان مصرف *</label>
                <input
                  type="text"
                  value={newMedication.dosage}
                  onChange={(e) => setNewMedication({...newMedication, dosage: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="مثال: 500mg"
                />
              </div>
              
              <div>
                <label className="block text-sm text-gray-600 mb-1">دفعات مصرف *</label>
                <input
                  type="text"
                  value={newMedication.frequency}
                  onChange={(e) => setNewMedication({...newMedication, frequency: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="مثال: هر ۸ ساعت"
                />
              </div>
              
              <div>
                <label className="block text-sm text-gray-600 mb-1">مدت مصرف</label>
                <input
                  type="text"
                  value={newMedication.duration}
                  onChange={(e) => setNewMedication({...newMedication, duration: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="مثال: ۷ روز"
                />
              </div>
              
              <div className="flex items-end">
                <button
                  type="button"
                  onClick={addMedication}
                  className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 flex items-center justify-center"
                >
                  <Plus className="w-5 h-5 ml-1" />
                  افزودن
                </button>
              </div>
            </div>
            
            <div className="mt-4">
              <label className="block text-sm text-gray-600 mb-1">یادداشت</label>
              <input
                type="text"
                value={newMedication.notes}
                onChange={(e) => setNewMedication({...newMedication, notes: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="یادداشت اضافی"
              />
            </div>
          </div>

          {/* Medications List */}
          {medications.length > 0 && (
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <h4 className="font-medium text-gray-800">داروهای اضافه شده</h4>
                <span className="text-green-600 font-medium">
                  مجموع: {calculateTotal().toLocaleString()} تومان
                </span>
              </div>
              
              {medications.map(medication => (
                <div key={medication.id} className="bg-gray-50 p-4 rounded-xl border border-gray-200">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <Pill className="w-5 h-5 text-blue-600 ml-3" />
                      <div>
                        <p className="font-medium">{medication.name}</p>
                        <p className="text-sm text-gray-600">
                          {medication.dosage} - {medication.frequency} - {medication.duration}
                        </p>
                        {medication.notes && (
                          <p className="text-xs text-gray-500 mt-1">{medication.notes}</p>
                        )}
                      </div>
                    </div>
                    <div className="flex items-center space-x-3 space-x-reverse">
                      <span className="text-green-600 font-medium">
                        {medication.price?.toLocaleString()} تومان
                      </span>
                      <button
                        type="button"
                        onClick={() => removeMedication(medication.id)}
                        className="p-1 text-red-600 hover:bg-red-50 rounded-lg"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Step 4: Summary */}
      {step === 4 && (
        <div className="space-y-6">
          <h3 className="text-xl font-semibold text-gray-800">خلاصه و تأیید</h3>
          
          <div className="bg-green-50 border border-green-200 rounded-xl p-4 mb-6">
            <div className="flex items-center">
              <CheckCircle className="w-6 h-6 text-green-600 ml-2" />
              <div>
                <p className="font-medium text-green-800">نسخه آماده ارسال است</p>
                <p className="text-sm text-green-600 mt-1">لطفاً اطلاعات زیر را بررسی و تأیید کنید</p>
              </div>
            </div>
          </div>

          {/* Patient Info */}
          <div className="bg-white border border-gray-200 rounded-xl p-4">
            <h4 className="font-medium text-gray-800 mb-3">اطلاعات بیمار</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-600">نام بیمار</p>
                <p className="font-medium">{selectedPatientData?.name}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">کد ملی</p>
                <p className="font-medium">{selectedPatientData?.nationalId}</p>
              </div>
            </div>
          </div>

          {/* Diagnosis */}
          <div className="bg-white border border-gray-200 rounded-xl p-4">
            <h4 className="font-medium text-gray-800 mb-3">تشخیص</h4>
            <p className="text-gray-700">{diagnosis}</p>
            {instructions && (
              <div className="mt-3">
                <p className="text-sm text-gray-600 mb-1">دستورات:</p>
                <p className="text-gray-700">{instructions}</p>
              </div>
            )}
          </div>

          {/* Medications Summary */}
          <div className="bg-white border border-gray-200 rounded-xl p-4">
            <div className="flex items-center justify-between mb-4">
              <h4 className="font-medium text-gray-800">داروها ({medications.length} مورد)</h4>
              <span className="text-lg font-bold text-green-600">
                {calculateTotal().toLocaleString()} تومان
              </span>
            </div>
            
            <div className="space-y-3">
              {medications.map((medication, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center">
                    <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center ml-3">
                      <Pill className="w-4 h-4 text-blue-600" />
                    </div>
                    <div>
                      <p className="font-medium">{medication.name}</p>
                      <p className="text-sm text-gray-600">
                        {medication.dosage} - {medication.frequency} - {medication.duration}
                      </p>
                    </div>
                  </div>
                  <span className="text-green-600 font-medium">
                    {medication.price?.toLocaleString()} تومان
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Navigation Buttons */}
      <div className="flex justify-between pt-6 mt-8 border-t">
        <div>
          {step > 1 && (
            <button
              type="button"
              onClick={handlePrev}
              className="px-6 py-3 border border-gray-300 rounded-xl hover:bg-gray-50 font-medium"
            >
              ← مرحله قبل
            </button>
          )}
        </div>
        
        <div className="flex space-x-3 space-x-reverse">
          <button
            type="button"
            onClick={onClose}
            className="px-6 py-3 border border-gray-300 rounded-xl hover:bg-gray-50 font-medium"
          >
            انصراف
          </button>
          
          {step < 4 ? (
            <button
              type="button"
              onClick={handleNext}
              className="px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 font-medium"
            >
              مرحله بعد →
            </button>
          ) : (
            <button
              type="submit"
              className="px-6 py-3 bg-green-600 text-white rounded-xl hover:bg-green-700 font-medium"
            >
              ثبت و ارسال نسخه
            </button>
          )}
        </div>
      </div>
    </form>
  );
};

export default PrescriptionForm;