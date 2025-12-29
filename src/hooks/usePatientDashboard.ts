import { useState, useMemo, useCallback, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import type { Doctor, Appointment } from '../types';
import { 
  generateMockAppointments, 
  generateDates,
  TIME_SLOTS,
  SPECIALIZATIONS,
} from '../constants/patient';
import { doctorApi, type Doctor as ApiDoctor } from '../utils/doctorApi';

type ActiveTab = 'appointments' | 'doctors';

interface UsePatientDashboardReturn {
  activeTab: ActiveTab;
  setActiveTab: (tab: ActiveTab) => void;
  selectedSpecialization: string;
  setSelectedSpecialization: (specialization: string) => void;
  selectedDoctor: string;
  setSelectedDoctor: (doctorId: string) => void;
  selectedDate: string;
  setSelectedDate: (date: string) => void;
  selectedTime: string;
  setSelectedTime: (time: string) => void;
  reason: string;
  setReason: (reason: string) => void;
  doctors: Doctor[];
  filteredDoctors: Doctor[];
  specializations: string[];
  appointments: Appointment[];
  dates: Date[];
  timeSlots: readonly string[];
  loading: boolean;
  handleLogout: () => void;
  handleBookAppointment: () => void;
  resetBookingForm: () => void;
  getDoctorById: (doctorId: string) => Doctor | undefined;
  getAppointmentDoctor: (appointment: Appointment) => Doctor | undefined;
}

export const usePatientDashboard = (patientId: string = 'p1'): UsePatientDashboardReturn => {
  const navigate = useNavigate();
  
  const [activeTab, setActiveTab] = useState<ActiveTab>('appointments');
  const [selectedSpecialization, setSelectedSpecialization] = useState<string>('');
  const [selectedDoctor, setSelectedDoctor] = useState<string>('');
  const [selectedDate, setSelectedDate] = useState<string>('');
  const [selectedTime, setSelectedTime] = useState<string>('');
  const [reason, setReason] = useState<string>('');
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [specializations, setSpecializations] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  const appointments = useMemo(() => generateMockAppointments(patientId), [patientId]);
  const dates = useMemo(() => generateDates(), []);
  const timeSlots = TIME_SLOTS;

  // بارگذاری تخصص‌ها و پزشکان از API
  useEffect(() => {
    loadDoctorsAndSpecializations();
  }, []);

  // بارگذاری پزشکان بر اساس تخصص انتخاب شده
  useEffect(() => {
    if (selectedSpecialization) {
      loadDoctorsBySpecialization(selectedSpecialization);
    } else {
      setDoctors([]);
    }
  }, [selectedSpecialization]);

  const loadDoctorsAndSpecializations = useCallback(async () => {
    try {
      setLoading(true);
      const [specializationsList, allDoctors] = await Promise.all([
        doctorApi.getSpecializations(),
        doctorApi.getAll(),
      ]);
      
      setSpecializations(specializationsList.length > 0 ? specializationsList : SPECIALIZATIONS);
      setDoctors(allDoctors);
    } catch (error) {
      console.error('Error loading doctors and specializations:', error);
      // در صورت خطا، از لیست پیش‌فرض استفاده کن
      setSpecializations(SPECIALIZATIONS);
      setDoctors([]);
    } finally {
      setLoading(false);
    }
  }, []);

  const loadDoctorsBySpecialization = useCallback(async (specialization: string) => {
    try {
      setLoading(true);
      const doctorsList = await doctorApi.getBySpecialization(specialization);
      setDoctors(doctorsList);
    } catch (error) {
      console.error('Error loading doctors by specialization:', error);
      setDoctors([]);
    } finally {
      setLoading(false);
    }
  }, []);

  // فیلتر کردن دکترها بر اساس تخصص انتخاب شده (اگر از API استفاده نمی‌کنیم)
  const filteredDoctors = useMemo(() => {
    if (!selectedSpecialization) return [];
    return doctors.filter(doctor => doctor.specialization === selectedSpecialization);
  }, [selectedSpecialization, doctors]);

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
    setSelectedSpecialization('');
    setSelectedDoctor('');
    setSelectedDate('');
    setSelectedTime('');
    setReason('');
  }, []);

  // وقتی تخصص تغییر می‌کند، دکتر را reset کن
  const handleSpecializationChange = useCallback((specialization: string) => {
    setSelectedSpecialization(specialization);
    setSelectedDoctor(''); // reset doctor selection
    setSelectedDate(''); // reset date
    setSelectedTime(''); // reset time
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
    selectedSpecialization,
    setSelectedSpecialization: handleSpecializationChange,
    selectedDoctor,
    setSelectedDoctor,
    selectedDate,
    setSelectedDate,
    selectedTime,
    setSelectedTime,
    reason,
    setReason,
    doctors,
    filteredDoctors,
    specializations,
    appointments,
    dates,
    timeSlots,
    loading,
    handleLogout,
    handleBookAppointment,
    resetBookingForm,
    getDoctorById,
    getAppointmentDoctor,
  };
};