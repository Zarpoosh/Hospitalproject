import React from 'react';
import { STAT_CARDS } from '../constants/pharmacist';
import { usePharmacistDashboard } from '../hooks/usePharmacistDashboard';
import Header from '../components/Pharmacist/Header';
import StatCard from '../components/Doctor/StatCard';
import TableHeader from '../components/Pharmacist/TableHeader';
import MedicationTable from '../components/Pharmacist/MedicationTable';
import MedicationForm from '../components/Pharmacist/MedicationForm';
import Modal from '../components/Common/Modal';

const PharmacistDashboard: React.FC = () => {
  const {
    searchTerm,
    setSearchTerm,
    showAddModal,
    setShowAddModal,
    editingMedication,
    medicationForm,
    setMedicationForm,
    filteredMedications,
    stats,
    handleLogout,
    handleAddMedication,
    handleEditMedication,
    handleUpdateMedication,
    handleDeleteMedication,
    resetMedicationForm,
  } = usePharmacistDashboard();

  const handleFormChange = (field: string, value: string) => {
    setMedicationForm(prev => ({ ...prev, [field]: value }));
  };

  const handleModalClose = () => {
    setShowAddModal(false);
    resetMedicationForm();
  };

  const handleFormSubmit = () => {
    if (editingMedication) {
      handleUpdateMedication();
    } else {
      handleAddMedication();
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        onLogout={handleLogout}
      />

      <div className="p-6">
        <div className="max-w-7xl mx-auto">
          {/* Statistics Section */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            {STAT_CARDS.map((stat) => {
              const value = stats[stat.id as keyof typeof stats];
              const displayValue = stat.format ? stat.format(value as number) : value;
              
              return (
                <StatCard
                  key={stat.id}
                  label={stat.label}
                  value={displayValue}
                  icon={stat.icon}
                  color={stat.color}
                  bgColor={stat.bgColor}
                />
              );
            })}
          </div>

          {/* Medications Table Section */}
          <div className="bg-white rounded-2xl shadow">
            <TableHeader onAddClick={() => setShowAddModal(true)} />
            
            <div className="p-6">
              {filteredMedications.length === 0 ? (
                <div className="text-center py-12">
                  <p className="text-gray-500">دارویی یافت نشد</p>
                </div>
              ) : (
                <MedicationTable
                  medications={filteredMedications}
                  onEdit={handleEditMedication}
                  onDelete={handleDeleteMedication}
                />
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Add/Edit Medication Modal */}
      <Modal
        isOpen={showAddModal}
        onClose={handleModalClose}
        maxWidth="max-w-2xl"
      >
        <MedicationForm
          isEditing={!!editingMedication}
          formData={medicationForm}
          onFormChange={handleFormChange}
          onSubmit={handleFormSubmit}
          onCancel={handleModalClose}
        />
      </Modal>
    </div>
  );
};

export default PharmacistDashboard;