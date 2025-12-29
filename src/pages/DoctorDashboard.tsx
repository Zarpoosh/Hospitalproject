import React from 'react';
import { useDoctorDashboard } from '../hooks/useDoctorDashboard';
import { 
  SIDEBAR_ITEMS, 
  STAT_CARDS 
} from '../constants/doctor';
import Header from '../components/Doctor/Header';
import Sidebar from '../components/Doctor/Sidebar';
import StatCard from '../components/Doctor/StatCard';
import AppointmentsSection from '../components/Doctor/AppointmentsSection';
import PatientsSection from '../components/Doctor/PatientsSection';
import PrescriptionForm from '../components/Features/PrescriptionForm';
import Modal from '../components/Common/Modal';

const DoctorDashboard: React.FC = () => {
  const {
    activeTab,
    setActiveTab,
    showPrescriptionForm,
    setShowPrescriptionForm,
    searchTerm,
    setSearchTerm,
    appointments,
    filteredPatients,
    stats,
    handleLogout,
  } = useDoctorDashboard();

  const handleViewMedicalRecord = (patientId: string) => {
    console.log('View medical record for patient:', patientId);
    // Implement view medical record logic
  };

  const handlePrescribe = (patientId: string) => {
    console.log('Prescribe for patient:', patientId);
    setShowPrescriptionForm(true);
  };

  const handleEditAppointment = (appointment: any) => {
    console.log('Edit appointment:', appointment);
    // Implement edit appointment logic
  };

  const handleCancelAppointment = (appointmentId: string) => {
    console.log('Cancel appointment:', appointmentId);
    // Implement cancel appointment logic
  };

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      <Header
        doctorName="دکتر علی محمدی"
        specialty="متخصص داخلی"
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        onLogout={handleLogout}
      />

      <div className="flex">
        <Sidebar
          items={SIDEBAR_ITEMS}
          activeTab={activeTab}
          onTabChange={setActiveTab}
          onActionClick={() => setShowPrescriptionForm(true)}
          todayAppointments={stats.todayAppointments}
        />

        <main className="flex-1 p-6">
          {/* Statistics Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {STAT_CARDS.map((stat) => (
              <StatCard
                key={stat.id}
                label={stat.label}
                value={stats[stat.id as keyof typeof stats]}
                icon={stat.icon}
                color={stat.color}
                bgColor={stat.bgColor}
              />
            ))}
          </div>

          {/* Dynamic Content Section */}
          {activeTab === 'appointments' && (
            <AppointmentsSection
              appointments={appointments}
              onEditAppointment={handleEditAppointment}
              onCancelAppointment={handleCancelAppointment}
            />
          )}

          {activeTab === 'patients' && (
            <PatientsSection
              patients={filteredPatients}
              onViewMedicalRecord={handleViewMedicalRecord}
              onPrescribe={handlePrescribe}
            />
          )}
        </main>
      </div>

      {/* Prescription Form Modal */}
      <Modal
        isOpen={showPrescriptionForm}
        onClose={() => setShowPrescriptionForm(false)}
        maxWidth="max-w-3xl"
      >
        <PrescriptionForm onClose={() => setShowPrescriptionForm(false)} />
      </Modal>
    </div>
  );
};

export default DoctorDashboard;