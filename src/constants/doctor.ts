import { Calendar, Users, FileText, PlusCircle, Activity } from 'lucide-react';
import type{ Appointment, Patient } from '../types';

export const DOCTOR_STATS = {
  totalPatients: 245,
  pendingPrescriptions: 5,
  monthlyVisits: 156,
} as const;

export const SIDEBAR_ITEMS = [
  {
    id: 'appointments',
    label: 'قرارهای ملاقات',
    icon: Calendar,
    color: 'text-blue-600',
    bgColor: 'bg-blue-100',
  },
  {
    id: 'patients',
    label: 'بیماران من',
    icon: Users,
    color: 'text-blue-600',
    bgColor: 'bg-blue-100',
  },
  {
    id: 'prescriptions',
    label: 'نسخه جدید',
    icon: PlusCircle,
    color: 'text-green-600',
    bgColor: 'hover:bg-green-100',
    action: true,
  },
] as const;

export const STAT_CARDS = [
  {
    id: 'totalPatients',
    label: 'کل بیماران',
    icon: Users,
    color: 'text-blue-600',
    bgColor: 'bg-blue-100',
  },
  {
    id: 'todayAppointments',
    label: 'قرارهای امروز',
    icon: Calendar,
    color: 'text-green-600',
    bgColor: 'bg-green-100',
  },
  {
    id: 'pendingPrescriptions',
    label: 'نسخه‌های در انتظار',
    icon: FileText,
    color: 'text-orange-600',
    bgColor: 'bg-orange-100',
  },
  {
    id: 'monthlyVisits',
    label: 'بازدید ماهانه',
    icon: Activity,
    color: 'text-purple-600',
    bgColor: 'bg-purple-100',
  },
] as const;

// Mock data generator functions
export const generateMockAppointments = (): Appointment[] => [
  {
    id: '1',
    patientId: 'p1',
    doctorId: 'd1',
    date: '1402/10/15',
    time: '10:30',
    status: 'confirmed',
    reason: 'معاینه عمومی',
    patient: {
      id: 'p1',
      userId: 'u1',
      name: 'علی رضایی',
      nationalId: '0012345678',
      dateOfBirth: '1365/05/20',
      bloodType: 'O+'
    }
  },
  {
    id: '2',
    patientId: 'p2',
    doctorId: 'd1',
    date: '1402/10/15',
    time: '11:15',
    status: 'pending',
    reason: 'پیگیری درمان',
    patient: {
      id: 'p2',
      userId: 'u2',
      name: 'فاطمه کریمی',
      nationalId: '0022345678',
      dateOfBirth: '1370/08/15'
    }
  }
];

export const generateMockPatients = (): Patient[] => [
  {
    id: 'p1',
    userId: 'u1',
    name: 'علی رضایی',
    nationalId: '0012345678',
    dateOfBirth: '1365/05/20',
    bloodType: 'O+',
    allergies: ['پنی‌سیلین']
  },
  {
    id: 'p2',
    userId: 'u2',
    name: 'فاطمه کریمی',
    nationalId: '0022345678',
    dateOfBirth: '1370/08/15',
    allergies: ['آسپرین']
  }
];