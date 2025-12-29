import { useState, useMemo, useCallback, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import type { Medication } from '../types';
import { 
  INITIAL_MEDICATION_FORM 
} from '../constants/pharmacist';
import { medicationApi, type Medication as ApiMedication } from '../utils/medicationApi';

interface MedicationForm {
  name: string;
  genericName: string;
  dosageForm: string;
  strength: string;
  manufacturer: string;
  price: string;
  stock: string;
  description: string;
}

interface UsePharmacistDashboardReturn {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  showAddModal: boolean;
  setShowAddModal: (show: boolean) => void;
  editingMedication: Medication | null;
  setEditingMedication: (medication: Medication | null) => void;
  medicationForm: MedicationForm;
  setMedicationForm: (form: MedicationForm | ((prev: MedicationForm) => MedicationForm)) => void;
  medications: Medication[];
  handleLogout: () => void;
  handleAddMedication: () => void;
  handleEditMedication: (medication: Medication) => void;
  handleUpdateMedication: () => void;
  handleDeleteMedication: (id: string) => void;
  resetMedicationForm: () => void;
  filteredMedications: Medication[];
  stats: {
    totalMedications: number;
    totalStock: number;
    lowStockCount: number;
    totalValue: number;
  };
}

// تبدیل API Medication به Frontend Medication
const apiToFrontendMedication = (apiMed: ApiMedication): Medication => ({
  id: apiMed.id.toString(),
  name: apiMed.name,
  genericName: apiMed.genericName || undefined,
  dosageForm: apiMed.dosageForm,
  strength: apiMed.strength,
  manufacturer: apiMed.manufacturer || '',
  price: apiMed.price || 0,
  stock: apiMed.stock || 0,
  description: apiMed.description || undefined,
});

export const usePharmacistDashboard = (): UsePharmacistDashboardReturn => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingMedication, setEditingMedication] = useState<Medication | null>(null);
  const [medicationForm, setMedicationForm] = useState<MedicationForm>(INITIAL_MEDICATION_FORM);
  const [medications, setMedications] = useState<Medication[]>([]);
  const [loading, setLoading] = useState(true);

  // بارگذاری داروها از API
  useEffect(() => {
    loadMedications();
  }, []);

  const loadMedications = useCallback(async () => {
    try {
      setLoading(true);
      const apiMedications = await medicationApi.getAll();
      const frontendMedications = apiMedications.map(apiToFrontendMedication);
      setMedications(frontendMedications);
    } catch (error) {
      console.error('Error loading medications:', error);
      alert('خطا در بارگذاری داروها');
    } finally {
      setLoading(false);
    }
  }, []);

  const filteredMedications = useMemo(() => {
    if (!searchTerm.trim()) return medications;
    
    const term = searchTerm.toLowerCase();
    return medications.filter(medication =>
      medication.name.toLowerCase().includes(term) ||
      medication.genericName?.toLowerCase().includes(term) ||
      medication.description?.toLowerCase().includes(term)
    );
  }, [medications, searchTerm]);

  const stats = useMemo(() => {
    const totalStock = medications.reduce((sum, med) => sum + (med.stock || 0), 0);
    const lowStockCount = medications.filter(med => (med.stock || 0) < 20).length;
    const totalValue = medications.reduce((sum, med) => sum + ((med.price || 0) * (med.stock || 0)), 0);
    
    return {
      totalMedications: medications.length,
      totalStock,
      lowStockCount,
      totalValue,
    };
  }, [medications]);

  const handleLogout = useCallback(() => {
    localStorage.removeItem('user');
    navigate('/login');
  }, [navigate]);

  const resetMedicationForm = useCallback(() => {
    setMedicationForm(INITIAL_MEDICATION_FORM);
    setEditingMedication(null);
  }, []);

  const validateMedicationForm = useCallback((): boolean => {
    if (!medicationForm.name.trim()) {
      alert('نام دارو الزامی است');
      return false;
    }
    if (!medicationForm.dosageForm.trim()) {
      alert('فرم دارویی الزامی است');
      return false;
    }
    if (!medicationForm.strength.trim()) {
      alert('میزان دارو الزامی است');
      return false;
    }
    return true;
  }, [medicationForm]);

  const handleAddMedication = useCallback(async () => {
    if (!validateMedicationForm()) return;

    try {
      const newMedication = await medicationApi.create({
        name: medicationForm.name,
        genericName: medicationForm.genericName || undefined,
        dosageForm: medicationForm.dosageForm,
        strength: medicationForm.strength,
        manufacturer: medicationForm.manufacturer || undefined,
        price: medicationForm.price ? parseInt(medicationForm.price) : undefined,
        stock: medicationForm.stock ? parseInt(medicationForm.stock) : undefined,
        description: medicationForm.description || undefined,
      });

      const frontendMedication = apiToFrontendMedication(newMedication);
      setMedications(prev => [frontendMedication, ...prev]);
      resetMedicationForm();
      setShowAddModal(false);
      alert('دارو با موفقیت اضافه شد');
    } catch (error) {
      console.error('Error adding medication:', error);
      alert('خطا در اضافه کردن دارو');
    }
  }, [medicationForm, validateMedicationForm, resetMedicationForm]);

  const handleEditMedication = useCallback((medication: Medication) => {
    setEditingMedication(medication);
    setMedicationForm({
      name: medication.name,
      genericName: medication.genericName || '',
      dosageForm: medication.dosageForm,
      strength: medication.strength,
      manufacturer: medication.manufacturer,
      price: medication.price.toString(),
      stock: medication.stock.toString(),
      description: medication.description || '',
    });
    setShowAddModal(true);
  }, []);

  const handleUpdateMedication = useCallback(async () => {
    if (!editingMedication || !validateMedicationForm()) return;

    try {
      const medicationId = parseInt(editingMedication.id);
      const updatedMedication = await medicationApi.update(medicationId, {
        name: medicationForm.name,
        genericName: medicationForm.genericName || undefined,
        dosageForm: medicationForm.dosageForm,
        strength: medicationForm.strength,
        manufacturer: medicationForm.manufacturer || undefined,
        price: medicationForm.price ? parseInt(medicationForm.price) : undefined,
        stock: medicationForm.stock ? parseInt(medicationForm.stock) : undefined,
        description: medicationForm.description || undefined,
      });

      const frontendMedication = apiToFrontendMedication(updatedMedication);
      setMedications(prev => 
        prev.map(m => m.id === editingMedication.id ? frontendMedication : m)
      );
      
      resetMedicationForm();
      setShowAddModal(false);
      alert('دارو با موفقیت به‌روزرسانی شد');
    } catch (error) {
      console.error('Error updating medication:', error);
      alert('خطا در به‌روزرسانی دارو');
    }
  }, [editingMedication, medicationForm, validateMedicationForm, resetMedicationForm]);

  const handleDeleteMedication = useCallback(async (id: string) => {
    if (!window.confirm('آیا از حذف این دارو مطمئن هستید؟')) return;

    try {
      const medicationId = parseInt(id);
      await medicationApi.delete(medicationId);
      setMedications(prev => prev.filter(m => m.id !== id));
      alert('دارو با موفقیت حذف شد');
    } catch (error) {
      console.error('Error deleting medication:', error);
      alert('خطا در حذف دارو');
    }
  }, []);

  return {
    searchTerm,
    setSearchTerm,
    showAddModal,
    setShowAddModal,
    editingMedication,
    setEditingMedication,
    medicationForm,
    setMedicationForm,
    medications,
    handleLogout,
    handleAddMedication,
    handleEditMedication,
    handleUpdateMedication,
    handleDeleteMedication,
    resetMedicationForm,
    filteredMedications,
    stats,
  };
};