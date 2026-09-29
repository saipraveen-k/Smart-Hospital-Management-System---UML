'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useDemoStore } from '@/store/demoStore';
import {
  Calendar,
  Clock,
  User,
  Stethoscope,
  Plus,
  CheckCircle,
  XCircle,
  Search,
  Filter,
  ArrowLeft,
  AlertCircle,
  FileText
} from 'lucide-react';

export default function AppointmentsDemoPage() {
  const { appointments, patients, doctors, bookAppointment, checkInAppointment, cancelAppointment, updateAppointmentStatus, demoRole } = useDemoStore();

  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [isBookModalOpen, setBookModalOpen] = useState(false);

  // Form State
  const [patientId, setPatientId] = useState(patients[0]?.id || '');
  const [doctorId, setDoctorId] = useState(doctors[0]?.id || '');
  const [aptDate, setAptDate] = useState('2026-09-30');
  const [aptTime, setAptTime] = useState('10:30 AM');
  const [symptoms, setSymptoms] = useState('');

  const filteredAppointments = appointments.filter((a) => {
    const matchesSearch =
      a.patientName.toLowerCase().includes(search.toLowerCase()) ||
      a.doctorName.toLowerCase().includes(search.toLowerCase()) ||
      a.id.toLowerCase().includes(search.toLowerCase());
    const matchesStatus = statusFilter === 'All' || a.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const handleBook = (e: React.FormEvent) => {
    e.preventDefault();
    const selPatient = patients.find((p) => p.id === patientId);
    const selDoctor = doctors.find((d) => d.id === doctorId);

    if (!selPatient || !selDoctor) return;

    bookAppointment({
      patientId: selPatient.id,
      patientName: selPatient.name,
      doctorId: selDoctor.id,
      doctorName: selDoctor.name,
      department: selDoctor.department,
      appointmentDate: aptDate,
      appointmentTime: aptTime,
      symptoms: symptoms || 'General Checkup'
    });

    setBookModalOpen(false);
    setSymptoms('');
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'Completed':
        return 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30';
      case 'In Consultation':
        return 'bg-blue-500/20 text-blue-400 border-blue-500/30';
      case 'Checked In':
        return 'bg-amber-500/20 text-amber-400 border-amber-500/30';
      case 'Confirmed':
        return 'bg-purple-500/20 text-purple-400 border-purple-500/30';
      case 'Cancelled':
        return 'bg-red-500/20 text-red-400 border-red-500/30';
      default:
        return 'bg-slate-700 text-slate-300 border-slate-600';
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 p-6 md:p-10 space-y-8">
      {/* Header Breadcrumb */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-6">
        <div>
          <div className="flex items-center gap-2 text-sm text-cyan-400 mb-2">
            <Link href="/demo" className="hover:underline flex items-center gap-1">
              <ArrowLeft className="w-4 h-4" /> Demo Hub
            </Link>
            <span>/</span>
            <span className="text-slate-400">Appointment Management</span>
          </div>
          <h1 className="text-3xl font-bold tracking-tight text-white flex items-center gap-3">
            <Calendar className="w-8 h-8 text-cyan-400" />
            OPD & Appointment Scheduling
          </h1>
          <p className="text-slate-400 text-sm mt-1">
            Real-time queue token generation, check-in, and consultation status management (FR-05, FR-06).
          </p>
        </div>

        <button
          onClick={() => setBookModalOpen(true)}
          className="flex items-center gap-2 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white px-5 py-2.5 rounded-xl font-semibold shadow-lg shadow-cyan-500/20 transition-all hover:scale-105"
        >
          <Plus className="w-5 h-5" /> Book Appointment
        </button>
      </div>

      {/* Control Bar */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
        <div className="md:col-span-8 relative">
          <Search className="absolute left-3.5 top-3 w-5 h-5 text-slate-400" />
          <input
            type="text"
            placeholder="Search by Patient Name, Doctor, or Appointment ID..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-11 pr-4 py-2.5 bg-slate-900 border border-slate-800 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-cyan-500"
          />
        </div>

        <div className="md:col-span-4 relative flex items-center gap-2">
          <Filter className="w-5 h-5 text-slate-400" />
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-2.5 text-slate-200 focus:outline-none focus:ring-2 focus:ring-cyan-500"
          >
            <option value="All">All Statuses</option>
            <option value="Confirmed">Confirmed</option>
            <option value="Checked In">Checked In</option>
            <option value="In Consultation">In Consultation</option>
            <option value="Completed">Completed</option>
            <option value="Cancelled">Cancelled</option>
          </select>
        </div>
      </div>

      {/* Appointment Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredAppointments.map((apt) => (
          <div
            key={apt.id}
            className="bg-slate-900/80 border border-slate-800 hover:border-cyan-500/40 rounded-2xl p-6 transition-all shadow-lg hover:shadow-cyan-950/30 flex flex-col justify-between space-y-4"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-bold text-cyan-400 bg-cyan-950/60 px-2.5 py-1 rounded-md border border-cyan-800/40">
                  {apt.id}
                </span>
                <span className={`text-xs px-2.5 py-1 rounded-full border font-semibold ${getStatusBadge(apt.status)}`}>
                  {apt.status}
                </span>
              </div>

              <div>
                <h3 className="text-lg font-bold text-white flex items-center gap-2">
                  <User className="w-5 h-5 text-cyan-400" /> {apt.patientName}
                </h3>
                <p className="text-xs text-slate-400 mt-0.5">Patient ID: {apt.patientId}</p>
              </div>

              <div className="border-t border-slate-800/80 pt-3 space-y-2 text-sm">
                <div className="flex items-center gap-2 text-slate-300">
                  <Stethoscope className="w-4 h-4 text-blue-400" />
                  <span className="font-semibold text-white">{apt.doctorName}</span>
                  <span className="text-xs text-slate-400">({apt.department})</span>
                </div>
                <div className="flex items-center gap-2 text-slate-400 text-xs">
                  <Clock className="w-4 h-4 text-amber-400" />
                  <span>{apt.appointmentDate} at {apt.appointmentTime}</span>
                  <span className="ml-auto font-mono text-cyan-400 font-bold">Token #{apt.tokenNumber}</span>
                </div>
                {apt.symptoms && (
                  <div className="text-xs text-slate-400 bg-slate-950 p-2.5 rounded-lg border border-slate-800/60 italic">
                    &ldquo;{apt.symptoms}&rdquo;
                  </div>
                )}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="border-t border-slate-800/80 pt-4 flex items-center gap-2">
              {apt.status === 'Confirmed' && (
                <button
                  onClick={() => checkInAppointment(apt.id)}
                  className="flex-1 bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 border border-amber-500/30 text-xs font-semibold py-2 px-3 rounded-lg transition-all flex items-center justify-center gap-1.5"
                >
                  <CheckCircle className="w-3.5 h-3.5" /> Patient Check-In
                </button>
              )}
              {apt.status === 'Checked In' && (
                <button
                  onClick={() => updateAppointmentStatus(apt.id, 'In Consultation')}
                  className="flex-1 bg-blue-500/20 hover:bg-blue-500/30 text-blue-300 border border-blue-500/30 text-xs font-semibold py-2 px-3 rounded-lg transition-all flex items-center justify-center gap-1.5"
                >
                  <Stethoscope className="w-3.5 h-3.5" /> Start Consultation
                </button>
              )}
              {apt.status === 'In Consultation' && (
                <button
                  onClick={() => updateAppointmentStatus(apt.id, 'Completed')}
                  className="flex-1 bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-300 border border-emerald-500/30 text-xs font-semibold py-2 px-3 rounded-lg transition-all flex items-center justify-center gap-1.5"
                >
                  <CheckCircle className="w-3.5 h-3.5" /> Complete Visit
                </button>
              )}

              {apt.status !== 'Cancelled' && apt.status !== 'Completed' && (
                <button
                  onClick={() => cancelAppointment(apt.id)}
                  className="bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/30 text-xs font-semibold p-2 rounded-lg transition-all"
                  title="Cancel Appointment"
                >
                  <XCircle className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Book Appointment Modal */}
      {isBookModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-700 rounded-2xl p-6 w-full max-w-lg shadow-2xl space-y-6">
            <div className="flex items-center justify-between border-b border-slate-800 pb-4">
              <h3 className="text-xl font-bold text-white flex items-center gap-2">
                <Calendar className="w-6 h-6 text-cyan-400" /> Book New OPD Appointment
              </h3>
              <button
                onClick={() => setBookModalOpen(false)}
                className="text-slate-400 hover:text-white p-1"
              >
                <XCircle className="w-6 h-6" />
              </button>
            </div>

            <form onSubmit={handleBook} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Select Patient</label>
                <select
                  value={patientId}
                  onChange={(e) => setPatientId(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-slate-200 text-sm focus:ring-2 focus:ring-cyan-500"
                >
                  {patients.map((p) => (
                    <option key={p.id} value={p.id}>
                      {p.name} ({p.uhid}) - {p.gender}, {p.age} yrs
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Select Consulting Doctor</label>
                <select
                  value={doctorId}
                  onChange={(e) => setDoctorId(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-slate-200 text-sm focus:ring-2 focus:ring-cyan-500"
                >
                  {doctors.map((d) => (
                    <option key={d.id} value={d.id}>
                      {d.name} ({d.department} - {d.specialization})
                    </option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Date</label>
                  <input
                    type="date"
                    value={aptDate}
                    onChange={(e) => setAptDate(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-slate-200 text-sm focus:ring-2 focus:ring-cyan-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Preferred Time</label>
                  <input
                    type="text"
                    value={aptTime}
                    onChange={(e) => setAptTime(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-slate-200 text-sm focus:ring-2 focus:ring-cyan-500"
                    placeholder="e.g. 10:30 AM"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Chief Complaints / Symptoms</label>
                <textarea
                  value={symptoms}
                  onChange={(e) => setSymptoms(e.target.value)}
                  rows={3}
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-slate-200 text-sm focus:ring-2 focus:ring-cyan-500"
                  placeholder="Describe patient symptoms..."
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setBookModalOpen(false)}
                  className="px-4 py-2 text-slate-400 hover:text-slate-200 text-sm font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold px-5 py-2 rounded-lg text-sm transition-all"
                >
                  Confirm Booking
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
