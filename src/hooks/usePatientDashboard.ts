import { useState, useMemo, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import type { Doctor, Appointment } from '../types';
import { 
  generateMockDoctors, 
  generateMockAppointments, 
  generateDates,
  TIME_SLOTS,
} from '../constants/patient';

type ActiveTab = 'appointments' | 'doctors';

interface UsePatientDashboardReturn {
  activeTab: ActiveTab;
  setActiveTab: (tab: ActiveTab) => void;
  selectedDoctor: string;
  setSelectedDoctor: (doctorId: string) => void;
  selectedDate: string;
  setSelectedDate: (date: string) => void;
  selectedTime: string;
  setSelectedTime: (time: string) => void;
  reason: string;
  setReason: (reason: string) => void;
  doctors: Doctor[];
  appointments: Appointment[];
  dates: Date[];
  timeSlots: readonly string[];
  handleLogout: () => void;
  handleBookAppointment: () => void;
  resetBookingForm: () => void;
  getDoctorById: (doctorId: string) => Doctor | undefined;
  getAppointmentDoctor: (appointment: Appointment) => Doctor | undefined;
}

export const usePatientDashboard = (patientId: string = 'p1'): UsePatientDashboardReturn => {
  const navigate = useNavigate();
  
  const [activeTab, setActiveTab] = useState<ActiveTab>('appointments');
  const [selectedDoctor, setSelectedDoctor] = useState<string>('');
  const [selectedDate, setSelectedDate] = useState<string>('');
  const [selectedTime, setSelectedTime] = useState<string>('');
  const [reason, setReason] = useState<string>('');

  const doctors = useMemo(() => generateMockDoctors(), []);
  const appointments = useMemo(() => generateMockAppointments(patientId), [patientId]);
  const dates = useMemo(() => generateDates(), []);
  const timeSlots = TIME_SLOTS;

  const getDoctorById = useCallback((doctorId: string) => 
    doctors.find(doctor => doctor.id === doctorId),
    [doctors]
  );

  const getAppointmentDoctor = useCallback((appointment: Appointment) => 
    getDoctorById(appointment.doctorId),
    [getDoctorById]
  );

  const handleLogout = useCallback(() => {
    localStorage.removeItem('user');
    navigate('/login');
  }, [navigate]);

  const resetBookingForm = useCallback(() => {
    setSelectedDoctor('');
    setSelectedDate('');
    setSelectedTime('');
    setReason('');
  }, []);

  const handleBookAppointment = useCallback(() => {
    if (!selectedDoctor || !selectedDate || !selectedTime) {
      alert('لطفاً پزشک، تاریخ و زمان را انتخاب کنید');
      return;
    }

    const appointment = {
      doctorId: selectedDoctor,
      date: selectedDate,
      time: selectedTime,
      reason,
      patientName: 'علی رضایی',
    };

    console.log('Appointment booked:', appointment);
    alert('نوبت شما با موفقیت ثبت شد!');
    resetBookingForm();
  }, [selectedDoctor, selectedDate, selectedTime, reason, resetBookingForm]);

  return {
    activeTab,
    setActiveTab,
    selectedDoctor,
    setSelectedDoctor,
    selectedDate,
    setSelectedDate,
    selectedTime,
    setSelectedTime,
    reason,
    setReason,
    doctors,
    appointments,
    dates,
    timeSlots,
    handleLogout,
    handleBookAppointment,
    resetBookingForm,
    getDoctorById,
    getAppointmentDoctor,
  };
};