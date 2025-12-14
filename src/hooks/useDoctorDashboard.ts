import { useState, useMemo, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import type { Appointment, Patient } from '../types';
import { generateMockAppointments, generateMockPatients } from '../constants/doctor';

type ActiveTab = 'appointments' | 'patients' | 'prescriptions';

interface UseDoctorDashboardReturn {
  activeTab: ActiveTab;
  setActiveTab: (tab: ActiveTab) => void;
  showPrescriptionForm: boolean;
  setShowPrescriptionForm: (show: boolean) => void;
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  appointments: Appointment[];
  patients: Patient[];
  stats: {
    totalPatients: number;
    todayAppointments: number;
    pendingPrescriptions: number;
    monthlyVisits: number;
  };
  handleLogout: () => void;
  filteredPatients: Patient[];
}

export const useDoctorDashboard = (): UseDoctorDashboardReturn => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<ActiveTab>('appointments');
  const [showPrescriptionForm, setShowPrescriptionForm] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const appointments = useMemo(() => generateMockAppointments(), []);
  const patients = useMemo(() => generateMockPatients(), []);

  const stats = useMemo(() => ({
    totalPatients: 245,
    todayAppointments: appointments.length,
    pendingPrescriptions: 5,
    monthlyVisits: 156,
  }), [appointments.length]);

  const filteredPatients = useMemo(() => {
    if (!searchTerm.trim()) return patients;
    
    const term = searchTerm.toLowerCase();
    return patients.filter(patient =>
      patient.name.toLowerCase().includes(term) ||
      patient.nationalId.includes(term) ||
      patient.allergies?.some(allergy => allergy.toLowerCase().includes(term))
    );
  }, [patients, searchTerm]);

  const handleLogout = useCallback(() => {
    localStorage.removeItem('user');
    navigate('/login');
  }, [navigate]);

  return {
    activeTab,
    setActiveTab,
    showPrescriptionForm,
    setShowPrescriptionForm,
    searchTerm,
    setSearchTerm,
    appointments,
    patients,
    stats,
    handleLogout,
    filteredPatients,
  };
};