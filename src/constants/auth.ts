import type { UserRole } from '../types';
import { User, Stethoscope, Pill, Shield } from 'lucide-react';

export const USER_ROLES = {
  PATIENT: 'patient' as UserRole,
  DOCTOR: 'doctor' as UserRole,
  PHARMACIST: 'pharmacist' as UserRole,
  ADMIN: 'admin' as UserRole,
} as const;

export const ROLE_CONFIG = [
  {
    id: USER_ROLES.PATIENT,
    name: 'بیمار',
    icon: User,
    color: 'bg-blue-100 text-blue-600',
    demoColor: 'bg-blue-500 hover:bg-blue-400',
  },
  {
    id: USER_ROLES.DOCTOR,
    name: 'پزشک',
    icon: Stethoscope,
    color: 'bg-green-100 text-green-600',
    demoColor: 'bg-green-500 hover:bg-green-400',
  },
  {
    id: USER_ROLES.PHARMACIST,
    name: 'داروساز',
    icon: Pill,
    color: 'bg-orange-100 text-orange-600',
    demoColor: 'bg-orange-500 hover:bg-orange-400',
  },
  {
    id: USER_ROLES.ADMIN,
    name: 'مدیر سیستم',
    icon: Shield,
    color: 'bg-purple-100 text-purple-600',
    demoColor: 'bg-purple-500 hover:bg-purple-400',
  },
] as const;

export const MOCK_USERS = {
  patient: { username: 'patient123', password: '123456', name: 'علی رضایی' },
  doctor: { username: 'doctor123', password: '123456', name: 'دکتر محمدی' },
  pharmacist: { username: 'pharmacist123', password: '123456', name: 'داروساز کریمی' },
  admin: { username: 'admin123', password: '123456', name: 'مدیر سیستم' },
} as const;