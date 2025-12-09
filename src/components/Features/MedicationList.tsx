import React, { useState } from 'react';
import { 
  Pill, 
  Search, 
  Filter, 
  Edit, 
  Trash2, 
  Package, 
  AlertCircle,
  TrendingUp,
  TrendingDown
} from 'lucide-react';
import type { Medication } from '../../types';

interface MedicationListProps {
  medications: Medication[];
  onEdit?: (medication: Medication) => void;
  onDelete?: (medicationId: string) => void;
  onAdd?: () => void;
  onStockUpdate?: (medicationId: string, newStock: number) => void;
}

const MedicationList: React.FC<MedicationListProps> = ({ 
  medications, 
  onEdit, 
  onDelete, 
  onAdd,
  onStockUpdate 
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterForm, setFilterForm] = useState('all');
  const [sortBy, setSortBy] = useState('name');
  const [sortOrder, setSortOrder] = useState('asc');

  const filteredMedications = medications.filter(medication => {
    const matchesSearch = 
      medication.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      medication.genericName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      medication.manufacturer.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesForm = filterForm === 'all' || medication.dosageForm === filterForm;
    
    return matchesSearch && matchesForm;
  });

  const sortedMedications = [...filteredMedications].sort((a, b) => {
    let aValue: any, bValue: any;
    
    switch (sortBy) {
      case 'name':
        aValue = a.name;
        bValue = b.name;
        break;
      case 'stock':
        aValue = a.stock;
        bValue = b.stock;
        break;
      case 'price':
        aValue = a.price;
        bValue = b.price;
        break;
      default:
        return 0;
    }
    
    if (sortOrder === 'asc') {
      return aValue > bValue ? 1 : -1;
    } else {
      return aValue < bValue ? 1 : -1;
    }
  });

  const getStockStatus = (stock: number) => {
    if (stock === 0) return { color: 'bg-red-100 text-red-800', text: 'اتمام', icon: <AlertCircle className="w-4 h-4" /> };
    if (stock < 20) return { color: 'bg-orange-100 text-orange-800', text: 'کمبود', icon: <TrendingDown className="w-4 h-4" /> };
    if (stock > 100) return { color: 'bg-green-100 text-green-800', text: 'کافی', icon: <TrendingUp className="w-4 h-4" /> };
    return { color: 'bg-blue-100 text-blue-800', text: 'متوسط', icon: null };
  };

  const getDosageFormColor = (form: string) => {
    const colors: Record<string, string> = {
      'قرص': 'bg-purple-100 text-purple-800',
      'کپسول': 'bg-blue-100 text-blue-