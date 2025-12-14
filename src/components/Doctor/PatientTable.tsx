import React from 'react';
import type{ Patient } from '../../types';

interface PatientTableProps {
  patients: Patient[];
  onViewMedicalRecord: (patientId: string) => void;
  onPrescribe: (patientId: string) => void;
}

const PatientTable: React.FC<PatientTableProps> = ({
  patients,
  onViewMedicalRecord,
  onPrescribe,
}) => {
  const calculateAge = (dateOfBirth: string): number => {
    const birthYear = parseInt(dateOfBirth.split('/')[0]);
    return new Date().getFullYear() - birthYear;
  };

  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr className="bg-gray-50">
            <th className="py-3 px-4 text-right text-gray-600 font-medium">نام بیمار</th>
            <th className="py-3 px-4 text-right text-gray-600 font-medium">کد ملی</th>
            <th className="py-3 px-4 text-right text-gray-600 font-medium">سن</th>
            <th className="py-3 px-4 text-right text-gray-600 font-medium">گروه خونی</th>
            <th className="py-3 px-4 text-right text-gray-600 font-medium">حساسیت‌ها</th>
            <th className="py-3 px-4 text-right text-gray-600 font-medium">عملیات</th>
          </tr>
        </thead>
        <tbody>
          {patients.map((patient) => (
            <tr key={patient.id} className="border-b border-gray-100 hover:bg-gray-50">
              <td className="py-4 px-4">
                <div className="flex items-center">
                  <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center ml-3">
                    <span className="text-blue-600 font-medium">ب</span>
                  </div>
                  <div>
                    <p className="font-medium">{patient.name}</p>
                    <p className="text-sm text-gray-500">ID: {patient.id}</p>
                  </div>
                </div>
              </td>
              <td className="py-4 px-4">{patient.nationalId}</td>
              <td className="py-4 px-4">{calculateAge(patient.dateOfBirth)} سال</td>
              <td className="py-4 px-4">
                {patient.bloodType ? (
                  <span className="px-3 py-1 bg-red-100 text-red-800 rounded-full text-sm">
                    {patient.bloodType}
                  </span>
                ) : (
                  <span className="text-gray-400">---</span>
                )}
              </td>
              <td className="py-4 px-4">
                {patient.allergies && patient.allergies.length > 0 ? (
                  <div className="flex flex-wrap gap-1">
                    {patient.allergies.map((allergy, index) => (
                      <span 
                        key={index} 
                        className="px-2 py-1 bg-yellow-100 text-yellow-800 rounded text-xs"
                      >
                        {allergy}
                      </span>
                    ))}
                  </div>
                ) : (
                  <span className="text-gray-400">ندارد</span>
                )}
              </td>
              <td className="py-4 px-4">
                <div className="flex space-x-2 space-x-reverse">
                  <button
                    onClick={() => onViewMedicalRecord(patient.id)}
                    className="px-4 py-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 text-sm"
                  >
                    مشاهده پرونده
                  </button>
                  <button
                    onClick={() => onPrescribe(patient.id)}
                    className="px-4 py-2 bg-green-50 text-green-600 rounded-lg hover:bg-green-100 text-sm"
                  >
                    ثبت نسخه
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

export default PatientTable;
