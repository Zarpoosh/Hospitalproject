import { useState, useMemo, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import type { Medication } from '../types';
import { 
  generateMockMedications, 
  INITIAL_MEDICATION_FORM 
} from '../constants/pharmacist';

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

export const usePharmacistDashboard = (): UsePharmacistDashboardReturn => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingMedication, setEditingMedication] = useState<Medication | null>(null);
  const [medicationForm, setMedicationForm] = useState<MedicationForm>(INITIAL_MEDICATION_FORM);
  const [medications, setMedications] = useState<Medication[]>(generateMockMedications());

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
    const totalStock = medications.reduce((sum, med) => sum + med.stock, 0);
    const lowStockCount = medications.filter(med => med.stock < 20).length;
    const totalValue = medications.reduce((sum, med) => sum + (med.price * med.stock), 0);
    
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

  const handleAddMedication = useCallback(() => {
    if (!validateMedicationForm()) return;

    const newMedication: Medication = {
      id: Date.now().toString(),
      name: medicationForm.name,
      genericName: medicationForm.genericName || undefined,
      dosageForm: medicationForm.dosageForm,
      strength: medicationForm.strength,
      manufacturer: medicationForm.manufacturer,
      price: parseInt(medicationForm.price) || 0,
      stock: parseInt(medicationForm.stock) || 0,
      description: medicationForm.description || undefined,
    };

    setMedications(prev => [...prev, newMedication]);
    resetMedicationForm();
    setShowAddModal(false);
    alert('دارو با موفقیت اضافه شد');
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

  const handleUpdateMedication = useCallback(() => {
    if (!editingMedication || !validateMedicationForm()) return;

    const updatedMedication: Medication = {
      ...editingMedication,
      name: medicationForm.name,
      genericName: medicationForm.genericName || undefined,
      dosageForm: medicationForm.dosageForm,
      strength: medicationForm.strength,
      manufacturer: medicationForm.manufacturer,
      price: parseInt(medicationForm.price) || 0,
      stock: parseInt(medicationForm.stock) || 0,
      description: medicationForm.description || undefined,
    };

    setMedications(prev => 
      prev.map(m => m.id === editingMedication.id ? updatedMedication : m)
    );
    
    resetMedicationForm();
    setShowAddModal(false);
    alert('دارو با موفقیت به‌روزرسانی شد');
  }, [editingMedication, medicationForm, validateMedicationForm, resetMedicationForm]);

  const handleDeleteMedication = useCallback((id: string) => {
    if (window.confirm('آیا از حذف این دارو مطمئن هستید؟')) {
      setMedications(prev => prev.filter(m => m.id !== id));
      alert('دارو با موفقیت حذف شد');
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