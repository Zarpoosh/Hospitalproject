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
import DateSelector from '../components/Patient/DateSelector';
import TimeSelector from '../components/Patient/TimeSelector';
import BookingStep from '../components/Patient/BookingStep';
import BookingSummary from '../components/Patient/BookingSummary';


const PatientDashboard: React.FC = () => {
  const {
    activeTab,
    setActiveTab,
    selectedDoctor,
    setSelectedDoctor,
    selectedDate,
    setSelectedDate,
    selectedTime,
    setSelectedTime,
    reason,
    setReason,
    doctors,
    appointments,
    dates,
    timeSlots,
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
                <p className="text-gray-600">پزشک مورد نظر خود را انتخاب کنید</p>
              </div>

              {/* Step 1: Select Doctor */}
              <BookingStep
                step={BOOKING_STEPS[0].step}
                label={BOOKING_STEPS[0].label}
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {doctors.map((doctor) => (
                    <DoctorCard
                      key={doctor.id}
                      doctor={doctor}
                      isSelected={selectedDoctor === doctor.id}
                      onSelect={setSelectedDoctor}
                    />
                  ))}
                </div>
              </BookingStep>

              {/* Step 2: Select Date */}
              <BookingStep
                step={BOOKING_STEPS[1].step}
                label={BOOKING_STEPS[1].label}
                isActive={!!selectedDoctor}
              >
                <DateSelector
                  dates={dates}
                  selectedDate={selectedDate}
                  onSelectDate={setSelectedDate}
                />
              </BookingStep>

              {/* Step 3: Select Time */}
              <BookingStep
                step={BOOKING_STEPS[2].step}
                label={BOOKING_STEPS[2].label}
                isActive={!!selectedDate}
              >
                <TimeSelector
                  timeSlots={timeSlots}
                  selectedTime={selectedTime}
                  onSelectTime={setSelectedTime}
                />
              </BookingStep>

              {/* Step 4: Reason & Submit */}
              <BookingStep
                step={BOOKING_STEPS[3].step}
                label={BOOKING_STEPS[3].label}
                isActive={!!selectedTime}
              >
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
              </BookingStep>

              {/* Submit Button & Summary */}
              {selectedDoctor && selectedDate && selectedTime && (
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