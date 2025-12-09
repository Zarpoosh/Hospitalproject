// انواع نقش کاربران
export type UserRole = 'patient' | 'doctor' | 'pharmacist' | 'admin';

// نوع کاربر
export interface User {
  id: string;
  username: string;
  password: string;
  role: UserRole;
  name: string;
  email?: string;
  phone?: string;
}

// نوع پزشک
export interface Doctor {
  id: string;
  userId: string;
  name: string;
  specialization: string;
  availableDays: string[];
  availableHours: string[];
  consultationFee: number;
}

// نوع بیمار
export interface Patient {
  id: string;
  userId: string;
  name: string;
  nationalId: string;
  dateOfBirth: string;
  bloodType?: string;
  allergies?: string[];
}

// نوع قرار ملاقات
export interface Appointment {
  id: string;
  patientId: string;
  doctorId: string;
  date: string;
  time: string;
  status: 'pending' | 'confirmed' | 'cancelled' | 'completed';
  reason?: string;
  patient?: Patient;
  doctor?: Doctor;
}

// نوع دارو
export interface Medication {
  id: string;
  name: string;
  genericName?: string;
  dosageForm: string;
  strength: string;
  manufacturer: string;
  price: number;
  stock: number;
  description?: string;
}

// نوع نسخه
export interface Prescription {
  id: string;
  patientId: string;
  doctorId: string;
  date: string;
  diagnosis: string;
  instructions: string;
  status: 'pending' | 'dispensed';
  medications: PrescriptionItem[];
}

// نوع آیتم نسخه
export interface PrescriptionItem {
  medicationId: string;
  dosage: string;
  frequency: string;
  duration: string;
  notes?: string;
}