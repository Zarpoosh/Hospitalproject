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
    <div className="bg-white rounded-2xl shadow">
      <div className="p-6 border-b border-gray-200">
        <h2 className="text-xl font-bold text-gray-800 flex items-center">
          <Users className="w-6 h-6 ml-2 text-blue-600" />
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