import React from 'react';
import { Users } from 'lucide-react';
import type{ Patient } from '../../types';
import PatientTable from './PatientTable';

interface PatientsSectionProps {
  patients: Patient[];
  onViewMedicalRecord: (patientId: string) => void;
  onPrescribe: (patientId: string) => void;
}

const PatientsSection: React.FC<PatientsSectionProps> = ({
  patients,
  onViewMedicalRecord,
  onPrescribe,
}) => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow dark:shadow-gray-900">
      <div className="p-6 border-b border-gray-200 dark:border-gray-700">
        <h2 className="text-xl font-bold text-gray-800 dark:text-gray-100 flex items-center">
          <Users className="w-6 h-6 ml-2 text-blue-600 dark:text-blue-400" />
          لیست بیماران
        </h2>
      </div>
      <div className="p-6">
        <PatientTable
          patients={patients}
          onViewMedicalRecord={onViewMedicalRecord}
          onPrescribe={onPrescribe}
        />
      </div>
    </div>
  );
};

export default PatientsSection;