'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  Stethoscope,
  Users,
  Calendar,
  FlaskConical,
  Pill,
  CreditCard,
  BarChart3,
  CheckCircle2,
  ArrowRight,
  Sparkles,
  UserPlus,
  Clock,
  ShieldCheck,
  RefreshCcw
} from 'lucide-react';
import { useDemoStore } from '@/store/demoStore';

export default function DemoHubPage() {
  const {
    patients,
    doctors,
    appointments,
    labOrders,
    prescriptions,
    medicines,
    bills,
    payments,
    addPatient,
    bookAppointment,
    checkInAppointment,
    addLabOrder,
    updateLabOrderStatus,
    addPrescription,
    dispensePrescription,
    processPayment,
    resetDemoState
  } = useDemoStore();

  const [activeStep, setActiveStep] = useState<number>(1);
  const [newPatientName, setNewPatientName] = useState('Ananya Rao');
  const [newPatientAge, setNewPatientAge] = useState(24);
  const [newPatientPhone, setNewPatientPhone] = useState('+91 98765 43210');
  const [newPatientDept, setNewPatientDept] = useState('General Medicine');
  const [createdPatientId, setCreatedPatientId] = useState<string | null>('P-1001');

  const [selectedDoctorId, setSelectedDoctorId] = useState('DR-102');
  const [createdAptId, setCreatedAptId] = useState<string | null>('APT-2026-001');

  const [selectedLabTest, setSelectedLabTest] = useState('Complete Blood Count (CBC)');
  const [createdLabId, setCreatedLabId] = useState<string | null>('LR-2026-002');

  const [paymentMethod, setPaymentMethod] = useState<'Cash' | 'Card' | 'UPI'>('UPI');
  const [paymentSuccessTxn, setPaymentSuccessTxn] = useState<string | null>(null);

  // Journey Step 1: Register Patient
  const handleStep1Register = (e: React.FormEvent) => {
    e.preventDefault();
    const p = addPatient({
      name: newPatientName,
      age: Number(newPatientAge),
      gender: 'Female',
      phone: newPatientPhone,
      email: `${newPatientName.toLowerCase().replace(/\s+/g, '.')}@example.com`,
      address: '42 Jubliee Hills, Hyderabad',
      emergencyContact: 'Emergency Contact (+91 98765 43211)',
      bloodGroup: 'O+ Positive',
      department: newPatientDept
    });
    setCreatedPatientId(p.id);
    setActiveStep(2);
  };

  // Journey Step 2: Book Appointment
  const handleStep2Book = (e: React.FormEvent) => {
    e.preventDefault();
    const doc = doctors.find((d) => d.id === selectedDoctorId) || doctors[0];
    const pat = patients.find((p) => p.id === createdPatientId) || patients[0];

    const apt = bookAppointment({
      patientId: pat.id,
      patientName: pat.name,
      doctorId: doc.id,
      doctorName: doc.name,
      department: doc.department,
      appointmentDate: new Date().toISOString().split('T')[0],
      appointmentTime: '10:30 AM'
    });
    setCreatedAptId(apt.id);
    setActiveStep(3);
  };

  // Journey Step 3: Check In
  const handleStep3CheckIn = () => {
    if (createdAptId) {
      checkInAppointment(createdAptId);
      setActiveStep(4);
    }
  };

  // Journey Step 4: Doctor Consultation & Orders
  const handleStep4Consultation = () => {
    const pat = patients.find((p) => p.id === createdPatientId) || patients[0];
    const doc = doctors.find((d) => d.id === selectedDoctorId) || doctors[0];

    // Order lab test
    const lab = addLabOrder({
      patientId: pat.id,
      patientName: pat.name,
      doctorId: doc.id,
      doctorName: doc.name,
      testName: selectedLabTest
    });
    setCreatedLabId(lab.id);

    // Add prescription
    addPrescription({
      patientId: pat.id,
      patientName: pat.name,
      doctorId: doc.id,
      doctorName: doc.name,
      medicines: [
        { medicineName: 'Paracetamol 500mg', dosage: '500mg', frequency: '1-0-1', duration: '5 days', qty: 10 },
        { medicineName: 'Cetirizine 10mg', dosage: '10mg', frequency: '0-0-1', duration: '5 days', qty: 5 }
      ]
    });

    setActiveStep(5);
  };

  // Journey Step 5: Process Lab Test
  const handleStep5ProcessLab = () => {
    if (createdLabId) {
      updateLabOrderStatus(createdLabId, 'Sample Collected');
      setTimeout(() => {
        updateLabOrderStatus(createdLabId, 'Processing');
        updateLabOrderStatus(createdLabId, 'Approved', 'WBC: 6,800 /uL, Hemoglobin: 13.5 g/dL (Normal)', 'Verified');
      }, 500);
      setActiveStep(6);
    }
  };

  // Journey Step 6: Dispense Pharmacy
  const handleStep6Dispense = () => {
    const rx = prescriptions.find((r) => r.patientId === createdPatientId) || prescriptions[0];
    if (rx) {
      dispensePrescription(rx.id);
      setActiveStep(7);
    }
  };

  // Journey Step 7: Process Payment
  const handleStep7Pay = () => {
    const bill = bills.find((b) => b.patientId === createdPatientId) || bills[0];
    if (bill) {
      const pay = processPayment(bill.id, bill.netAmount, paymentMethod);
      setPaymentSuccessTxn(pay.transactionId);
      setActiveStep(8);
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* Header Banner */}
      <div className="p-8 rounded-3xl bg-gradient-to-r from-blue-900 via-indigo-950 to-purple-950 text-white border border-blue-800 space-y-4 shadow-xl">
        <div className="flex items-center justify-between">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/20 text-blue-300 text-xs font-bold border border-blue-500/30">
            <Stethoscope className="w-4 h-4" /> FACULTY DEMONSTRATION MODE
          </div>

          <button
            onClick={resetDemoState}
            className="px-3.5 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-bold transition flex items-center gap-1.5"
          >
            <RefreshCcw className="w-3.5 h-3.5" />
            <span>Reset Demo State</span>
          </button>
        </div>

        <h1 className="text-3xl font-black tracking-tight">
          Interactive Patient Journey Walkthrough
        </h1>
        <p className="text-xs text-blue-200 max-w-3xl leading-relaxed">
          Step-by-step interactive workflow simulating end-to-end hospital operations from Patient Registration → Appointment Booking → OP Check-In → Doctor Consultation → Lab Diagnostics → Pharmacy Dispensing → Billing & Payment Settlement.
        </p>

        {/* Live Counters */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
          <div className="p-3 rounded-2xl bg-white/10 text-center">
            <div className="text-xl font-black text-blue-300">{patients.length}</div>
            <div className="text-[10px] opacity-80 uppercase tracking-wider">Patients Registered</div>
          </div>
          <div className="p-3 rounded-2xl bg-white/10 text-center">
            <div className="text-xl font-black text-indigo-300">{appointments.length}</div>
            <div className="text-[10px] opacity-80 uppercase tracking-wider">Appointments</div>
          </div>
          <div className="p-3 rounded-2xl bg-white/10 text-center">
            <div className="text-xl font-black text-emerald-300">{labOrders.length}</div>
            <div className="text-[10px] opacity-80 uppercase tracking-wider">Lab Orders</div>
          </div>
          <div className="p-3 rounded-2xl bg-white/10 text-center">
            <div className="text-xl font-black text-amber-300">{bills.length}</div>
            <div className="text-[10px] opacity-80 uppercase tracking-wider">Bills Invoiced</div>
          </div>
        </div>
      </div>

      {/* Quick Navigation to Dedicated Demo Sub-Pages */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
        <Link href="/demo/patients" className="p-4 rounded-2xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 hover:border-blue-500 text-center space-y-1 transition group">
          <Users className="w-5 h-5 mx-auto text-blue-500 group-hover:scale-110 transition-transform" />
          <div className="text-xs font-bold text-gray-900 dark:text-white">Patients</div>
        </Link>
        <Link href="/demo/appointments" className="p-4 rounded-2xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 hover:border-indigo-500 text-center space-y-1 transition group">
          <Calendar className="w-5 h-5 mx-auto text-indigo-500 group-hover:scale-110 transition-transform" />
          <div className="text-xs font-bold text-gray-900 dark:text-white">Appointments</div>
        </Link>
        <Link href="/demo/laboratory" className="p-4 rounded-2xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 hover:border-emerald-500 text-center space-y-1 transition group">
          <FlaskConical className="w-5 h-5 mx-auto text-emerald-500 group-hover:scale-110 transition-transform" />
          <div className="text-xs font-bold text-gray-900 dark:text-white">Laboratory</div>
        </Link>
        <Link href="/demo/pharmacy" className="p-4 rounded-2xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 hover:border-cyan-500 text-center space-y-1 transition group">
          <Pill className="w-5 h-5 mx-auto text-cyan-500 group-hover:scale-110 transition-transform" />
          <div className="text-xs font-bold text-gray-900 dark:text-white">Pharmacy</div>
        </Link>
        <Link href="/demo/billing" className="p-4 rounded-2xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 hover:border-amber-500 text-center space-y-1 transition group">
          <CreditCard className="w-5 h-5 mx-auto text-amber-500 group-hover:scale-110 transition-transform" />
          <div className="text-xs font-bold text-gray-900 dark:text-white">Billing</div>
        </Link>
        <Link href="/demo/reports" className="p-4 rounded-2xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 hover:border-rose-500 text-center space-y-1 transition group">
          <BarChart3 className="w-5 h-5 mx-auto text-rose-500 group-hover:scale-110 transition-transform" />
          <div className="text-xs font-bold text-gray-900 dark:text-white">Reports</div>
        </Link>
      </div>

      {/* Interactive Step-by-Step Stepper Component */}
      <section className="p-8 rounded-3xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 shadow-xl space-y-6">
        {/* Stepper Progress Bar */}
        <div className="flex items-center justify-between overflow-x-auto pb-4 gap-2 border-b border-gray-100 dark:border-gray-800">
          {[1, 2, 3, 4, 5, 6, 7, 8].map((s) => (
            <button
              key={s}
              onClick={() => setActiveStep(s)}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold transition shrink-0 ${
                activeStep === s
                  ? 'bg-blue-600 text-white shadow-md'
                  : activeStep > s
                  ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300'
                  : 'bg-gray-100 dark:bg-gray-800 text-gray-500'
              }`}
            >
              <span>Step 0{s}</span>
            </button>
          ))}
        </div>

        {/* STEP 1: Registration */}
        {activeStep === 1 && (
          <form onSubmit={handleStep1Register} className="space-y-4 max-w-xl">
            <h3 className="font-extrabold text-gray-900 dark:text-white text-lg">Step 1: Patient Registration (FR-01)</h3>
            <p className="text-xs text-gray-500">Register new patient and generate Universal Health Identifier (UHID).</p>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-[11px] font-bold text-gray-400 block mb-1">Full Name</label>
                <input type="text" value={newPatientName} onChange={(e) => setNewPatientName(e.target.value)} required className="w-full p-2.5 rounded-xl bg-gray-50 dark:bg-gray-950 border border-gray-200 dark:border-gray-800 text-xs text-gray-900 dark:text-white" />
              </div>
              <div>
                <label className="text-[11px] font-bold text-gray-400 block mb-1">Age</label>
                <input type="number" value={newPatientAge} onChange={(e) => setNewPatientAge(Number(e.target.value))} required className="w-full p-2.5 rounded-xl bg-gray-50 dark:bg-gray-950 border border-gray-200 dark:border-gray-800 text-xs text-gray-900 dark:text-white" />
              </div>
              <div>
                <label className="text-[11px] font-bold text-gray-400 block mb-1">Phone Number</label>
                <input type="text" value={newPatientPhone} onChange={(e) => setNewPatientPhone(e.target.value)} required className="w-full p-2.5 rounded-xl bg-gray-50 dark:bg-gray-950 border border-gray-200 dark:border-gray-800 text-xs text-gray-900 dark:text-white" />
              </div>
              <div>
                <label className="text-[11px] font-bold text-gray-400 block mb-1">Department</label>
                <select value={newPatientDept} onChange={(e) => setNewPatientDept(e.target.value)} className="w-full p-2.5 rounded-xl bg-gray-50 dark:bg-gray-950 border border-gray-200 dark:border-gray-800 text-xs text-gray-900 dark:text-white">
                  <option value="General Medicine">General Medicine</option>
                  <option value="Cardiology">Cardiology</option>
                  <option value="Orthopedics">Orthopedics</option>
                </select>
              </div>
            </div>
            <button type="submit" className="px-6 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-md transition">
              Register Patient & Generate UHID →
            </button>
          </form>
        )}

        {/* STEP 2: Book Appointment */}
        {activeStep === 2 && (
          <form onSubmit={handleStep2Book} className="space-y-4 max-w-xl">
            <h3 className="font-extrabold text-gray-900 dark:text-white text-lg">Step 2: Book Appointment (FR-04)</h3>
            <p className="text-xs text-gray-500">Book doctor consultation slot for Patient UHID: {createdPatientId}.</p>
            <div>
              <label className="text-[11px] font-bold text-gray-400 block mb-1">Select Doctor</label>
              <select value={selectedDoctorId} onChange={(e) => setSelectedDoctorId(e.target.value)} className="w-full p-2.5 rounded-xl bg-gray-50 dark:bg-gray-950 border border-gray-200 dark:border-gray-800 text-xs text-gray-900 dark:text-white">
                {doctors.map((d) => (
                  <option key={d.id} value={d.id}>{d.name} ({d.specialization}) - Room: {d.room}</option>
                ))}
              </select>
            </div>
            <button type="submit" className="px-6 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-md transition">
              Confirm Appointment Booking →
            </button>
          </form>
        )}

        {/* STEP 3: Check-In */}
        {activeStep === 3 && (
          <div className="space-y-4 max-w-xl">
            <h3 className="font-extrabold text-gray-900 dark:text-white text-lg">Step 3: OP Desk Check-In & Token (FR-06)</h3>
            <p className="text-xs text-gray-500">Process desk arrival check-in for Appointment ID: {createdAptId}.</p>
            <button onClick={handleStep3CheckIn} className="px-6 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-md transition">
              Process Desk Check-In & Issue Token →
            </button>
          </div>
        )}

        {/* STEP 4: Doctor Consultation */}
        {activeStep === 4 && (
          <div className="space-y-4 max-w-xl">
            <h3 className="font-extrabold text-gray-900 dark:text-white text-lg">Step 4: Doctor Consultation & Clinical Orders (FR-08)</h3>
            <p className="text-xs text-gray-500">Record clinical examination notes, issue digital prescription, and order lab tests.</p>
            <div>
              <label className="text-[11px] font-bold text-gray-400 block mb-1">Order Laboratory Test</label>
              <select value={selectedLabTest} onChange={(e) => setSelectedLabTest(e.target.value)} className="w-full p-2.5 rounded-xl bg-gray-50 dark:bg-gray-950 border border-gray-200 dark:border-gray-800 text-xs text-gray-900 dark:text-white">
                <option value="Complete Blood Count (CBC)">Complete Blood Count (CBC)</option>
                <option value="Lipid Profile & Serum Cholesterol">Lipid Profile & Serum Cholesterol</option>
                <option value="Right Knee Digital X-Ray">Right Knee Digital X-Ray</option>
              </select>
            </div>
            <button onClick={handleStep4Consultation} className="px-6 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-md transition">
              Save Consultation Notes & Issue Orders →
            </button>
          </div>
        )}

        {/* STEP 5: Process Lab */}
        {activeStep === 5 && (
          <div className="space-y-4 max-w-xl">
            <h3 className="font-extrabold text-gray-900 dark:text-white text-lg">Step 5: Process Laboratory Diagnostic (FR-12, FR-14)</h3>
            <p className="text-xs text-gray-500">Collect biological sample, run lab analyzer, and sign off pathologist approval.</p>
            <button onClick={handleStep5ProcessLab} className="px-6 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-md transition">
              Collect Sample & Approve Lab Report →
            </button>
          </div>
        )}

        {/* STEP 6: Dispense Pharmacy */}
        {activeStep === 6 && (
          <div className="space-y-4 max-w-xl">
            <h3 className="font-extrabold text-gray-900 dark:text-white text-lg">Step 6: Pharmacy Dispensing & Inventory Sync (FR-18)</h3>
            <p className="text-xs text-gray-500">Verify prescription and dispense drugs while synchronously decrementing inventory stock.</p>
            <button onClick={handleStep6Dispense} className="px-6 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-md transition">
              Dispense Medicines & Sync Stock →
            </button>
          </div>
        )}

        {/* STEP 7: Process Payment */}
        {activeStep === 7 && (
          <div className="space-y-4 max-w-xl">
            <h3 className="font-extrabold text-gray-900 dark:text-white text-lg">Step 7: Billing & Payment Settlement (FR-21)</h3>
            <p className="text-xs text-gray-500">Consolidate consultation, lab, and pharmacy charges into invoice and process payment.</p>
            <div>
              <label className="text-[11px] font-bold text-gray-400 block mb-1">Select Payment Adapter Mode</label>
              <select value={paymentMethod} onChange={(e) => setPaymentMethod(e.target.value as any)} className="w-full p-2.5 rounded-xl bg-gray-50 dark:bg-gray-950 border border-gray-200 dark:border-gray-800 text-xs text-gray-900 dark:text-white">
                <option value="UPI">Digital UPI Payment Adapter</option>
                <option value="Card">Credit / Debit Card POS Gateway</option>
                <option value="Cash">Cash Drawer</option>
              </select>
            </div>
            <button onClick={handleStep7Pay} className="px-6 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-md transition">
              Execute Simulated Payment & Issue Receipt →
            </button>
          </div>
        )}

        {/* STEP 8: Journey Complete Summary */}
        {activeStep === 8 && (
          <div className="space-y-4 max-w-xl text-center py-6">
            <CheckCircle2 className="w-12 h-12 text-emerald-500 mx-auto animate-bounce" />
            <h3 className="font-extrabold text-gray-900 dark:text-white text-2xl">Patient Journey Completed Successfully!</h3>
            <p className="text-xs text-gray-500">
              The entire clinical and financial workflow was executed across the local session state store.
            </p>
            {paymentSuccessTxn && (
              <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400 font-mono text-xs">
                Transaction ID: {paymentSuccessTxn}
              </div>
            )}
            <div className="flex justify-center gap-3 pt-2">
              <button onClick={() => setActiveStep(1)} className="px-5 py-2 rounded-xl bg-blue-600 text-white font-bold text-xs hover:bg-blue-700 transition">
                Start New Patient Journey
              </button>
              <Link href="/admin/audit" className="px-5 py-2 rounded-xl bg-gray-800 text-white font-bold text-xs hover:bg-gray-700 transition">
                Inspect Security Audit Trail
              </Link>
            </div>
          </div>
        )}
      </section>
    </div>
  );
}
