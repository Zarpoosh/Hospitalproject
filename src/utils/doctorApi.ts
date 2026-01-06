const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001/api';

export interface Doctor {
  id: string;
  userId: string;
  name: string;
  specialization: string;
  availableDays: string[];
  availableHours: string[];
  consultationFee: number;
  email?: string | null;
  phone?: string | null;
}

export const doctorApi = {
  // دریافت همه پزشکان
  getAll: async (): Promise<Doctor[]> => {
    try {
      const response = await fetch(`${API_BASE_URL}/doctors`);
      if (!response.ok) {
        const error = await response.json().catch(() => ({ error: 'خطا در دریافت پزشکان' }));
        throw new Error(error.error || 'خطا در دریافت پزشکان');
      }
      return response.json();
    } catch (error: any) {
      console.error('Fetch Error:', error);
      if (error.message?.includes('Failed to fetch') || error.message?.includes('NetworkError')) {
        throw new Error('خطا در اتصال به سرور. لطفاً مطمئن شوید Backend در حال اجراست.');
      }
      throw error;
    }
  },

  // دریافت پزشکان بر اساس تخصص
  getBySpecialization: async (specialization: string): Promise<Doctor[]> => {
    try {
      const response = await fetch(`${API_BASE_URL}/doctors/specialization/${encodeURIComponent(specialization)}`);
      if (!response.ok) {
        const error = await response.json().catch(() => ({ error: 'خطا در دریافت پزشکان' }));
        throw new Error(error.error || 'خطا در دریافت پزشکان');
      }
      return response.json();
    } catch (error: any) {
      console.error('Fetch Error:', error);
      if (error.message?.includes('Failed to fetch') || error.message?.includes('NetworkError')) {
        throw new Error('خطا در اتصال به سرور. لطفاً مطمئن شوید Backend در حال اجراست.');
      }
      throw error;
    }
  },

  // دریافت یک پزشک
  getById: async (id: number): Promise<Doctor> => {
    const response = await fetch(`${API_BASE_URL}/doctors/${id}`);
    if (!response.ok) {
      const error = await response.json().catch(() => ({ error: 'خطا در دریافت پزشک' }));
      throw new Error(error.error || 'خطا در دریافت پزشک');
    }
    return response.json();
  },

  // دریافت لیست تخصص‌ها
  getSpecializations: async (): Promise<string[]> => {
    try {
      const response = await fetch(`${API_BASE_URL}/doctors/specializations/list`);
      if (!response.ok) {
        const error = await response.json().catch(() => ({ error: 'خطا در دریافت تخصص‌ها' }));
        throw new Error(error.error || 'خطا در دریافت تخصص‌ها');
      }
      return response.json();
    } catch (error: any) {
      console.error('Fetch Error:', error);
      if (error.message?.includes('Failed to fetch') || error.message?.includes('NetworkError')) {
        throw new Error('خطا در اتصال به سرور. لطفاً مطمئن شوید Backend در حال اجراست.');
      }
      throw error;
    }
  },
};

