import { Calendar, Search } from 'lucide-react';
import type{ Doctor, Appointment } from '../types';

export const PATIENT_TABS = [
  {
    id: 'appointments',
    label: 'قرارهای من',
    icon: Calendar,
  },
  {
    id: 'doctors',
    label: 'رزرو نوبت جدید',
    icon: Search,
  },
] as const;

export const APPOINTMENT_STATUS_COLORS = {
  confirmed: 'bg-green-500',
  pending: 'bg-yellow-500',
  cancelled: 'bg-red-500',
  completed: 'bg-blue-500',
} as const;

export const BOOKING_STEPS = [
  {
    step: 1,
    label: 'انتخاب پزشک',
    color: 'text-blue-600',
    bgColor: 'bg-blue-100',
  },
  {
    step: 2,
    label: 'انتخاب تاریخ',
    color: 'text-blue-600',
    bgColor: 'bg-blue-100',
  },
  {
    step: 3,
    label: 'انتخاب زمان',
    color: 'text-blue-600',
    bgColor: 'bg-blue-100',
  },
  {
    step: 4,
    label: 'تکمیل اطلاعات',
    color: 'text-blue-600',
    bgColor: 'bg-blue-100',
  },
] as const;

export const TIME_SLOTS = [
  '08:00', '08:30', '09:00', '09:30', '10:00', '10:30',
  '11:00', '11:30', '14:00', '14:30', '15:00', '15:30',
  '16:00', '16:30', '17:00',
] as const;

export const generateMockDoctors = (): Doctor[] => [
  {
    id: 'd1',
    userId: 'ud1',
    name: 'دکتر علی محمدی',
    specialization: 'متخصص داخلی',
    availableDays: ['شنبه', 'یکشنبه', 'دوشنبه', 'سه‌شنبه'],
    availableHours: ['08:00', '09:00', '10:00', '11:00', '14:00', '15:00'],
    consultationFee: 150000,
  },
  {
    id: 'd2',
    userId: 'ud2',
    name: 'دکتر فاطمه کریمی',
    specialization: 'متخصص زنان',
    availableDays: ['شنبه', 'یکشنبه', 'دوشنبه'],
    availableHours: ['09:00', '10:00', '11:00', '15:00', '16:00'],
    consultationFee: 180000,
  },
];

export const generateMockAppointments = (patientId: string): Appointment[] => [
  {
    id: 'a1',
    patientId,
    doctorId: 'd1',
    date: '1402/10/15',
    time: '10:30',
    status: 'confirmed',
    reason: 'معاینه عمومی',
  },
  {
    id: 'a2',
    patientId,
    doctorId: 'd2',
    date: '1402/10/16',
    time: '14:00',
    status: 'pending',
    reason: 'پیگیری درمان',
  },
];

export const generateDates = (daysCount: number = 14): Date[] => {
  const dates: Date[] = [];
  const today = new Date();
  
  for (let i = 0; i < daysCount; i++) {
    const date = new Date(today);
    date.setDate(today.getDate() + i);
    dates.push(date);
  }
  
  return dates;
};