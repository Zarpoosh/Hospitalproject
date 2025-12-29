const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001/api';

export interface Medication {
  id: number;
  name: string;
  genericName?: string | null;
  dosageForm: string;
  strength: string;
  manufacturer?: string | null;
  price?: number | null;
  stock?: number | null;
  description?: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface MedicationInput {
  name: string;
  genericName?: string;
  dosageForm: string;
  strength: string;
  manufacturer?: string;
  price?: number;
  stock?: number;
  description?: string;
}

export const medicationApi = {
  // دریافت همه داروها
  getAll: async (): Promise<Medication[]> => {
    const response = await fetch(`${API_BASE_URL}/medications`);
    if (!response.ok) {
      const error = await response.json().catch(() => ({ error: 'خطا در دریافت داروها' }));
      throw new Error(error.error || 'خطا در دریافت داروها');
    }
    return response.json();
  },

  // دریافت یک دارو
  getById: async (id: number): Promise<Medication> => {
    const response = await fetch(`${API_BASE_URL}/medications/${id}`);
    if (!response.ok) {
      const error = await response.json().catch(() => ({ error: 'خطا در دریافت دارو' }));
      throw new Error(error.error || 'خطا در دریافت دارو');
    }
    return response.json();
  },

  // اضافه کردن دارو
  create: async (data: MedicationInput): Promise<Medication> => {
    try {
      const response = await fetch(`${API_BASE_URL}/medications`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({ error: 'خطا در اضافه کردن دارو' }));
        console.error('API Error:', errorData);
        throw new Error(errorData.error || `خطا در اضافه کردن دارو (${response.status})`);
      }
      
      return response.json();
    } catch (error: any) {
      console.error('Error creating medication:', error);
      if (error.message.includes('Failed to fetch') || error.message.includes('NetworkError')) {
        throw new Error('خطا در اتصال به سرور. لطفاً مطمئن شوید Backend در حال اجراست.');
      }
      throw error;
    }
  },

  // به‌روزرسانی دارو
  update: async (id: number, data: Partial<MedicationInput>): Promise<Medication> => {
    const response = await fetch(`${API_BASE_URL}/medications/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    if (!response.ok) {
      const error = await response.json().catch(() => ({ error: 'خطا در به‌روزرسانی دارو' }));
      throw new Error(error.error || 'خطا در به‌روزرسانی دارو');
    }
    return response.json();
  },

  // حذف دارو
  delete: async (id: number): Promise<void> => {
    const response = await fetch(`${API_BASE_URL}/medications/${id}`, {
      method: 'DELETE',
    });
    if (!response.ok) {
      const error = await response.json().catch(() => ({ error: 'خطا در حذف دارو' }));
      throw new Error(error.error || 'خطا در حذف دارو');
    }
  },
};

