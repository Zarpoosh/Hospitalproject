import React from 'react';
import { 
  PATIENT_TABS,
  BOOKING_STEPS,
} from '../constants/patient';
import { usePatientDashboard } from '../hooks/usePatientDashboard';
import Header from '../components/Patient/Header';
import Tabs from '../components/Patient/Tabs';
import AppointmentsSection from '../components/Patient/AppointmentsSection';
import DoctorCard from '../components/Patient/DoctorCard';
import SpecializationSelector from '../components/Patient/SpecializationSelector';
import DateSelector from '../components/Patient/DateSelector';
import TimeSelector from '../components/Patient/TimeSelector';
import BookingStep from '../components/Patient/BookingStep';
import BookingSummary from '../components/Patient/BookingSummary';


const PatientDashboard: React.FC = () => {
  const {
    activeTab,
    setActiveTab,
    selectedSpecialization,
    setSelectedSpecialization,
    selectedDoctor,
    setSelectedDoctor,
    selectedDate,
    setSelectedDate,
    selectedTime,
    setSelectedTime,
    reason,
    setReason,
    filteredDoctors,
    specializations,
    appointments,
    dates,
    timeSlots,
    loading,
    handleLogout,
    handleBookAppointment,
    getDoctorById,
    // getAppointmentDoctor,
  } = usePatientDashboard('p1');

  const selectedDoctorData = getDoctorById(selectedDoctor);

  const handleEditAppointment = (appointmentId: string) => {
    console.log('Edit appointment:', appointmentId);
    // Implement edit logic
  };

  const handleCancelAppointment = (appointmentId: string) => {
    console.log('Cancel appointment:', appointmentId);
    // Implement cancel logic
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header 
        patientName="علی رضایی"
        onLogout={handleLogout}
      />

      <div className="p-6">
        <div className="max-w-7xl mx-auto">
          <Tabs
            tabs={PATIENT_TABS}
            activeTab={activeTab}
            onTabChange={setActiveTab}
          />

          {activeTab === 'appointments' && (
            <AppointmentsSection
              appointments={appointments}
              getDoctorById={getDoctorById}
              onEditAppointment={handleEditAppointment}
              onCancelAppointment={handleCancelAppointment}
            />
          )}

          {activeTab === 'doctors' && (
            <div className="bg-white rounded-2xl shadow p-6">
              <div className="mb-8">
                <h2 className="text-2xl font-bold text-gray-800 mb-4">رزرو نوبت جدید</h2>
                <p className="text-gray-600">لطفاً مراحل زیر را به ترتیب تکمیل کنید</p>
              </div>

              {/* Step 1: Select Specialization */}
              <BookingStep
                step={BOOKING_STEPS[0].step}
                label={BOOKING_STEPS[0].label}
              >
                <SpecializationSelector
                  selectedSpecialization={selectedSpecialization}
                  onSelect={setSelectedSpecialization}
                  specializations={specializations}
                  loading={loading}
                />
              </BookingStep>

              {/* Step 2: Select Doctor */}
              <BookingStep
                step={BOOKING_STEPS[1].step}
                label={BOOKING_STEPS[1].label}
                isActive={!!selectedSpecialization}
              >
                {selectedSpecialization ? (
                  loading ? (
                    <div className="text-center py-8 text-gray-500">
                      <p>در حال بارگذاری پزشکان...</p>
                    </div>
                  ) : filteredDoctors.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {filteredDoctors.map((doctor) => (
                        <DoctorCard
                          key={doctor.id}
                          doctor={doctor}
                          isSelected={selectedDoctor === doctor.id}
                          onSelect={setSelectedDoctor}
                        />
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-8 text-gray-500">
                      <p>در حال حاضر پزشکی در این تخصص موجود نیست</p>
                    </div>
                  )
                ) : (
                  <div className="text-center py-8 text-gray-400">
                    <p>لطفاً ابتدا تخصص را انتخاب کنید</p>
                  </div>
                )}
              </BookingStep>

              {/* Step 3: Select Date */}
              <BookingStep
                step={BOOKING_STEPS[2].step}
                label={BOOKING_STEPS[2].label}
                isActive={!!selectedDoctor}
              >
                {selectedDoctor ? (
                  <DateSelector
                    dates={dates}
                    selectedDate={selectedDate}
                    onSelectDate={setSelectedDate}
                  />
                ) : (
                  <div className="text-center py-8 text-gray-400">
                    <p>لطفاً ابتدا پزشک را انتخاب کنید</p>
                  </div>
                )}
              </BookingStep>

              {/* Step 4: Select Time */}
              <BookingStep
                step={BOOKING_STEPS[3].step}
                label={BOOKING_STEPS[3].label}
                isActive={!!selectedDate}
              >
                {selectedDate ? (
                  <TimeSelector
                    timeSlots={timeSlots}
                    selectedTime={selectedTime}
                    onSelectTime={setSelectedTime}
                  />
                ) : (
                  <div className="text-center py-8 text-gray-400">
                    <p>لطفاً ابتدا تاریخ را انتخاب کنید</p>
                  </div>
                )}
              </BookingStep>

              {/* Step 5: Reason & Submit */}
              <BookingStep
                step={BOOKING_STEPS[4].step}
                label={BOOKING_STEPS[4].label}
                isActive={!!selectedTime}
              >
                {selectedTime ? (
                  <div>
                    <label className="block text-gray-700 mb-2">علت مراجعه (اختیاری)</label>
                    <textarea
                      value={reason}
                      onChange={(e) => setReason(e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="علت مراجعه خود را شرح دهید..."
                      rows={3}
                    />
                  </div>
                ) : (
                  <div className="text-center py-8 text-gray-400">
                    <p>لطفاً ابتدا زمان را انتخاب کنید</p>
                  </div>
                )}
              </BookingStep>

              {/* Submit Button & Summary */}
              {selectedSpecialization && selectedDoctor && selectedDate && selectedTime && (
                <BookingSummary
                  doctor={selectedDoctorData}
                  selectedDate={selectedDate}
                  selectedTime={selectedTime}
                  onBookAppointment={handleBookAppointment}
                />
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PatientDashboard;