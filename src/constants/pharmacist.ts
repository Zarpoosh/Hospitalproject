import { 
    Pill, 
    // Search, 
    // Filter, 
    // Plus, 
    // Edit, 
    // Trash2, 
    Package, 
    BarChart3,
    RefreshCw 
  } from 'lucide-react';
  import type{ Medication } from '../types';
  
  export const STAT_CARDS = [
    {
      id: 'totalMedications',
      label: 'کل داروها',
      icon: Pill,
      color: 'text-blue-600',
      bgColor: 'bg-blue-100',
    },
    {
      id: 'totalStock',
      label: 'موجودی کل',
      icon: Package,
      color: 'text-green-600',
      bgColor: 'bg-green-100',
    },
    {
      id: 'lowStockCount',
      label: 'داروهای کم‌موجود',
      icon: RefreshCw,
      color: 'text-yellow-600',
      bgColor: 'bg-yellow-100',
    },
    {
      id: 'totalValue',
      label: 'ارزش موجودی',
      icon: BarChart3,
      color: 'text-purple-600',
      bgColor: 'bg-purple-100',
      format: (value: number) => `${(value / 1000000).toFixed(1)}M`,
    },
  ] as const;
  
  export const DOSAGE_FORMS = [
    { value: 'قرص', label: 'قرص' },
    { value: 'کپسول', label: 'کپسول' },
    { value: 'شربت', label: 'شربت' },
    { value: 'آمپول', label: 'آمپول' },
    { value: 'پماد', label: 'پماد' },
    { value: 'قطره', label: 'قطره' },
  ] as const;
  
  export const INITIAL_MEDICATION_FORM = {
    name: '',
    genericName: '',
    dosageForm: '',
    strength: '',
    manufacturer: '',
    price: '',
    stock: '',
    description: '',
  };
  
  export const generateMockMedications = (): Medication[] => [
    {
      id: '1',
      name: 'آموکسی‌سیلین',
      genericName: 'Amoxicillin',
      dosageForm: 'کپسول',
      strength: '500mg',
      manufacturer: 'داروسازی عبیدی',
      price: 15000,
      stock: 45,
      description: 'آنتی‌بیوتیک',
    },
    {
      id: '2',
      name: 'استامینوفن',
      genericName: 'Acetaminophen',
      dosageForm: 'قرص',
      strength: '325mg',
      manufacturer: 'داروسازی اسوه',
      price: 8000,
      stock: 120,
      description: 'مسکن و تب‌بر',
    },
    {
      id: '3',
      name: 'ایبوپروفن',
      genericName: 'Ibuprofen',
      dosageForm: 'قرص',
      strength: '400mg',
      manufacturer: 'داروسازی کوثر',
      price: 12000,
      stock: 35,
      description: 'ضد التهاب غیر استروئیدی',
    },
  ];