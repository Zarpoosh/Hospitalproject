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
    label: 'انتخاب تخصص',
    color: 'text-blue-600',
    bgColor: 'bg-blue-100',
  },
  {
    step: 2,
    label: 'انتخاب پزشک',
    color: 'text-blue-600',
    bgColor: 'bg-blue-100',
  },
  {
    step: 3,
    label: 'انتخاب تاریخ',
    color: 'text-blue-600',
    bgColor: 'bg-blue-100',
  },
  {
    step: 4,
    label: 'انتخاب زمان',
    color: 'text-blue-600',
    bgColor: 'bg-blue-100',
  },
  {
    step: 5,
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

// لیست تخصص‌ها
export const SPECIALIZATIONS = [
  'متخصص داخلی',
  'متخصص زنان',
  'متخصص قلب',
  'متخصص اطفال',
  'متخصص چشم',
  'متخصص پوست',
  'متخصص ارتوپدی',
  'متخصص مغز و اعصاب',
] as const;

// تولید لیست کامل دکترها
export const generateMockDoctors = (): Doctor[] => [
  // متخصص داخلی
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
    name: 'دکتر احمد رضایی',
    specialization: 'متخصص داخلی',
    availableDays: ['یکشنبه', 'دوشنبه', 'سه‌شنبه', 'چهارشنبه'],
    availableHours: ['09:00', '10:00', '11:00', '14:00', '15:00', '16:00'],
    consultationFee: 160000,
  },
  {
    id: 'd3',
    userId: 'ud3',
    name: 'دکتر مریم حسینی',
    specialization: 'متخصص داخلی',
    availableDays: ['شنبه', 'یکشنبه', 'چهارشنبه'],
    availableHours: ['08:00', '09:00', '10:00', '15:00', '16:00'],
    consultationFee: 145000,
  },
  // متخصص زنان
  {
    id: 'd4',
    userId: 'ud4',
    name: 'دکتر فاطمه کریمی',
    specialization: 'متخصص زنان',
    availableDays: ['شنبه', 'یکشنبه', 'دوشنبه'],
    availableHours: ['09:00', '10:00', '11:00', '15:00', '16:00'],
    consultationFee: 180000,
  },
  {
    id: 'd5',
    userId: 'ud5',
    name: 'دکتر زهرا احمدی',
    specialization: 'متخصص زنان',
    availableDays: ['دوشنبه', 'سه‌شنبه', 'چهارشنبه'],
    availableHours: ['08:00', '09:00', '10:00', '14:00', '15:00'],
    consultationFee: 175000,
  },
  // متخصص قلب
  {
    id: 'd6',
    userId: 'ud6',
    name: 'دکتر محمود نوری',
    specialization: 'متخصص قلب',
    availableDays: ['شنبه', 'یکشنبه', 'دوشنبه', 'سه‌شنبه'],
    availableHours: ['08:00', '09:00', '10:00', '11:00', '14:00'],
    consultationFee: 200000,
  },
  {
    id: 'd7',
    userId: 'ud7',
    name: 'دکتر سعید امینی',
    specialization: 'متخصص قلب',
    availableDays: ['یکشنبه', 'دوشنبه', 'چهارشنبه'],
    availableHours: ['09:00', '10:00', '11:00', '15:00', '16:00'],
    consultationFee: 195000,
  },
  // متخصص اطفال
  {
    id: 'd8',
    userId: 'ud8',
    name: 'دکتر لیلا موسوی',
    specialization: 'متخصص اطفال',
    availableDays: ['شنبه', 'یکشنبه', 'دوشنبه', 'سه‌شنبه'],
    availableHours: ['08:00', '09:00', '10:00', '11:00', '14:00', '15:00'],
    consultationFee: 170000,
  },
  {
    id: 'd9',
    userId: 'ud9',
    name: 'دکتر رضا صادقی',
    specialization: 'متخصص اطفال',
    availableDays: ['دوشنبه', 'سه‌شنبه', 'چهارشنبه'],
    availableHours: ['09:00', '10:00', '11:00', '14:00', '15:00'],
    consultationFee: 165000,
  },
  // متخصص چشم
  {
    id: 'd10',
    userId: 'ud10',
    name: 'دکتر حسن کاظمی',
    specialization: 'متخصص چشم',
    availableDays: ['شنبه', 'یکشنبه', 'دوشنبه'],
    availableHours: ['08:00', '09:00', '10:00', '14:00', '15:00', '16:00'],
    consultationFee: 190000,
  },
  // متخصص پوست
  {
    id: 'd11',
    userId: 'ud11',
    name: 'دکتر نرگس رحمانی',
    specialization: 'متخصص پوست',
    availableDays: ['یکشنبه', 'دوشنبه', 'سه‌شنبه', 'چهارشنبه'],
    availableHours: ['09:00', '10:00', '11:00', '14:00', '15:00'],
    consultationFee: 185000,
  },
  // متخصص ارتوپدی
  {
    id: 'd12',
    userId: 'ud12',
    name: 'دکتر مهدی قاسمی',
    specialization: 'متخصص ارتوپدی',
    availableDays: ['شنبه', 'یکشنبه', 'دوشنبه', 'سه‌شنبه'],
    availableHours: ['08:00', '09:00', '10:00', '11:00', '14:00'],
    consultationFee: 210000,
  },
  // متخصص مغز و اعصاب
  {
    id: 'd13',
    userId: 'ud13',
    name: 'دکتر سارا فرهادی',
    specialization: 'متخصص مغز و اعصاب',
    availableDays: ['دوشنبه', 'سه‌شنبه', 'چهارشنبه'],
    availableHours: ['09:00', '10:00', '11:00', '15:00', '16:00'],
    consultationFee: 220000,
  },
];

// تابع برای دریافت دکترهای یک تخصص
export const getDoctorsBySpecialization = (specialization: string, doctors: Doctor[]): Doctor[] => {
  return doctors.filter(doctor => doctor.specialization === specialization);
};

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