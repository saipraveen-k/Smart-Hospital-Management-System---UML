'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useDemoStore } from '@/store/demoStore';
import {
  FlaskConical,
  FileCheck2,
  Plus,
  ArrowLeft,
  Search,
  Filter,
  CheckCircle2,
  Clock,
  AlertCircle,
  FileSpreadsheet,
  XCircle,
  User,
  Stethoscope
} from 'lucide-react';

export default function LaboratoryDemoPage() {
  const { labOrders, patients, doctors, addLabOrder, updateLabOrderStatus } = useDemoStore();

  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [isOrderModalOpen, setOrderModalOpen] = useState(false);

  // Result entry modal
  const [selectedOrderForResult, setSelectedOrderForResult] = useState<string | null>(null);
  const [resultText, setResultText] = useState('');
  const [resultNotes, setResultNotes] = useState('');

  // Form State for new order
  const [patientId, setPatientId] = useState(patients[0]?.id || '');
  const [doctorId, setDoctorId] = useState(doctors[0]?.id || '');
  const [testName, setTestName] = useState('Complete Blood Count (CBC)');

  const filteredOrders = labOrders.filter((o) => {
    const matchesSearch =
      o.patientName.toLowerCase().includes(search.toLowerCase()) ||
      o.testName.toLowerCase().includes(search.toLowerCase()) ||
      o.id.toLowerCase().includes(search.toLowerCase());
    const matchesStatus = statusFilter === 'All' || o.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const handleCreateOrder = (e: React.FormEvent) => {
    e.preventDefault();
    const p = patients.find((pat) => pat.id === patientId);
    const d = doctors.find((doc) => doc.id === doctorId);

    if (!p || !d) return;

    addLabOrder({
      patientId: p.id,
      patientName: p.name,
      doctorId: d.id,
      doctorName: d.name,
      testName
    });

    setOrderModalOpen(false);
  };

  const handleSaveResult = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedOrderForResult) return;

    updateLabOrderStatus(selectedOrderForResult, 'Result Entered', resultText, resultNotes);
    setSelectedOrderForResult(null);
    setResultText('');
    setResultNotes('');
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'Approved':
        return 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30';
      case 'Result Entered':
        return 'bg-cyan-500/20 text-cyan-400 border-cyan-500/30';
      case 'Processing':
        return 'bg-blue-500/20 text-blue-400 border-blue-500/30';
      case 'Sample Collected':
        return 'bg-purple-500/20 text-purple-400 border-purple-500/30';
      case 'Requested':
        return 'bg-amber-500/20 text-amber-400 border-amber-500/30';
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
            <span className="text-slate-400">Laboratory Information System</span>
          </div>
          <h1 className="text-3xl font-bold tracking-tight text-white flex items-center gap-3">
            <FlaskConical className="w-8 h-8 text-cyan-400" />
            Pathology & Diagnostics LIS
          </h1>
          <p className="text-slate-400 text-sm mt-1">
            Order tracking, specimen collection, result entry, and pathologist sign-off (FR-09, FR-10).
          </p>
        </div>

        <button
          onClick={() => setOrderModalOpen(true)}
          className="flex items-center gap-2 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white px-5 py-2.5 rounded-xl font-semibold shadow-lg shadow-cyan-500/20 transition-all hover:scale-105"
        >
          <Plus className="w-5 h-5" /> Request Lab Test
        </button>
      </div>

      {/* Control Bar */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
        <div className="md:col-span-8 relative">
          <Search className="absolute left-3.5 top-3 w-5 h-5 text-slate-400" />
          <input
            type="text"
            placeholder="Search by Patient, Test Name, or Lab Report ID..."
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
            <option value="All">All Test States</option>
            <option value="Requested">Requested</option>
            <option value="Sample Collected">Sample Collected</option>
            <option value="Processing">Processing</option>
            <option value="Completed">Completed</option>
            <option value="Approved">Approved</option>
          </select>
        </div>
      </div>

      {/* Lab Orders List */}
      <div className="space-y-4">
        {filteredOrders.map((order) => (
          <div
            key={order.id}
            className="bg-slate-900/80 border border-slate-800 hover:border-cyan-500/40 rounded-2xl p-6 transition-all shadow-md flex flex-col md:flex-row md:items-center justify-between gap-6"
          >
            <div className="space-y-2 flex-1">
              <div className="flex items-center gap-3">
                <span className="text-xs font-mono font-bold text-cyan-400 bg-cyan-950/60 px-2.5 py-1 rounded-md border border-cyan-800/40">
                  {order.id}
                </span>
                <span className={`text-xs px-2.5 py-1 rounded-full border font-semibold ${getStatusBadge(order.status)}`}>
                  {order.status}
                </span>
                <span className="text-xs text-slate-400 flex items-center gap-1 ml-auto md:ml-0">
                  <Clock className="w-3.5 h-3.5 text-slate-500" /> {order.orderDate}
                </span>
              </div>

              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <FlaskConical className="w-5 h-5 text-cyan-400" /> {order.testName}
              </h3>

              <div className="flex flex-wrap items-center gap-4 text-xs text-slate-300">
                <span className="flex items-center gap-1 text-slate-300">
                  <User className="w-3.5 h-3.5 text-slate-400" /> Patient: <strong className="text-white">{order.patientName}</strong> ({order.patientId})
                </span>
                <span>•</span>
                <span className="flex items-center gap-1 text-slate-300">
                  <Stethoscope className="w-3.5 h-3.5 text-blue-400" /> Doctor: <strong className="text-white">{order.doctorName}</strong>
                </span>
              </div>

              {order.result && (
                <div className="bg-slate-950 p-3 rounded-xl border border-slate-800/80 text-xs space-y-1 mt-2">
                  <div className="text-cyan-300 font-semibold flex items-center gap-1">
                    <FileCheck2 className="w-4 h-4 text-cyan-400" /> Test Result:
                  </div>
                  <div className="font-mono text-slate-200">{order.result}</div>
                  {order.referenceRange && (
                    <div className="text-slate-400 text-[11px]">Ref Range: {order.referenceRange}</div>
                  )}
                </div>
              )}
            </div>

            {/* Lifecycle Action Buttons */}
            <div className="flex items-center gap-2">
              {order.status === 'Requested' && (
                <button
                  onClick={() => updateLabOrderStatus(order.id, 'Sample Collected')}
                  className="bg-purple-500/20 hover:bg-purple-500/30 text-purple-300 border border-purple-500/30 text-xs font-semibold px-4 py-2 rounded-xl transition-all flex items-center gap-1.5"
                >
                  <FlaskConical className="w-4 h-4" /> Collect Specimen
                </button>
              )}
              {order.status === 'Sample Collected' && (
                <button
                  onClick={() => updateLabOrderStatus(order.id, 'Processing')}
                  className="bg-blue-500/20 hover:bg-blue-500/30 text-blue-300 border border-blue-500/30 text-xs font-semibold px-4 py-2 rounded-xl transition-all flex items-center gap-1.5"
                >
                  <Clock className="w-4 h-4" /> Begin Processing
                </button>
              )}
              {order.status === 'Processing' && (
                <button
                  onClick={() => {
                    setSelectedOrderForResult(order.id);
                    setResultText(order.result || '');
                  }}
                  className="bg-cyan-500/20 hover:bg-cyan-500/30 text-cyan-300 border border-cyan-500/30 text-xs font-semibold px-4 py-2 rounded-xl transition-all flex items-center gap-1.5"
                >
                  <FileSpreadsheet className="w-4 h-4" /> Enter Results
                </button>
              )}
              {order.status === 'Result Entered' && (
                <button
                  onClick={() => updateLabOrderStatus(order.id, 'Approved')}
                  className="bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-300 border border-emerald-500/30 text-xs font-semibold px-4 py-2 rounded-xl transition-all flex items-center gap-1.5"
                >
                  <CheckCircle2 className="w-4 h-4" /> Approve & Sign Off
                </button>
              )}
              {order.status === 'Approved' && (
                <span className="text-xs bg-emerald-950/60 border border-emerald-800/40 text-emerald-400 font-semibold px-3 py-1.5 rounded-lg flex items-center gap-1">
                  <CheckCircle2 className="w-4 h-4" /> Verified Report
                </span>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* New Order Modal */}
      {isOrderModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-700 rounded-2xl p-6 w-full max-w-lg shadow-2xl space-y-6">
            <div className="flex items-center justify-between border-b border-slate-800 pb-4">
              <h3 className="text-xl font-bold text-white flex items-center gap-2">
                <FlaskConical className="w-6 h-6 text-cyan-400" /> Order Diagnostic Test
              </h3>
              <button onClick={() => setOrderModalOpen(false)} className="text-slate-400 hover:text-white p-1">
                <XCircle className="w-6 h-6" />
              </button>
            </div>

            <form onSubmit={handleCreateOrder} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Patient</label>
                <select
                  value={patientId}
                  onChange={(e) => setPatientId(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-slate-200 text-sm focus:ring-2 focus:ring-cyan-500"
                >
                  {patients.map((p) => (
                    <option key={p.id} value={p.id}>
                      {p.name} ({p.uhid})
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Ordering Doctor</label>
                <select
                  value={doctorId}
                  onChange={(e) => setDoctorId(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-slate-200 text-sm focus:ring-2 focus:ring-cyan-500"
                >
                  {doctors.map((d) => (
                    <option key={d.id} value={d.id}>
                      {d.name} ({d.department})
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Diagnostic Test Name</label>
                <select
                  value={testName}
                  onChange={(e) => setTestName(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-slate-200 text-sm focus:ring-2 focus:ring-cyan-500"
                >
                  <option value="Complete Blood Count (CBC)">Complete Blood Count (CBC)</option>
                  <option value="Lipid Profile & Serum Cholesterol">Lipid Profile & Serum Cholesterol</option>
                  <option value="Liver Function Test (LFT)">Liver Function Test (LFT)</option>
                  <option value="Renal Function Test (KFT/RFT)">Renal Function Test (KFT/RFT)</option>
                  <option value="Thyroid Profile (T3, T4, TSH)">Thyroid Profile (T3, T4, TSH)</option>
                  <option value="12-Lead Electrocardiogram (ECG)">12-Lead Electrocardiogram (ECG)</option>
                  <option value="Chest X-Ray PA View">Chest X-Ray PA View</option>
                </select>
              </div>

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setOrderModalOpen(false)}
                  className="px-4 py-2 text-slate-400 hover:text-slate-200 text-sm font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold px-5 py-2 rounded-lg text-sm transition-all"
                >
                  Submit Order
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Result Entry Modal */}
      {selectedOrderForResult && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-700 rounded-2xl p-6 w-full max-w-md shadow-2xl space-y-6">
            <div className="flex items-center justify-between border-b border-slate-800 pb-4">
              <h3 className="text-xl font-bold text-white flex items-center gap-2">
                <FileSpreadsheet className="w-6 h-6 text-cyan-400" /> Enter Lab Findings
              </h3>
              <button
                onClick={() => setSelectedOrderForResult(null)}
                className="text-slate-400 hover:text-white p-1"
              >
                <XCircle className="w-6 h-6" />
              </button>
            </div>

            <form onSubmit={handleSaveResult} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Quantitative Result Data</label>
                <textarea
                  value={resultText}
                  onChange={(e) => setResultText(e.target.value)}
                  rows={3}
                  required
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-slate-200 text-sm focus:ring-2 focus:ring-cyan-500"
                  placeholder="e.g. Total Cholesterol: 210 mg/dL, HDL: 45 mg/dL..."
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Pathologist Remarks / Notes</label>
                <input
                  type="text"
                  value={resultNotes}
                  onChange={(e) => setResultNotes(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-slate-200 text-sm focus:ring-2 focus:ring-cyan-500"
                  placeholder="e.g. Normal physiological limits."
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setSelectedOrderForResult(null)}
                  className="px-4 py-2 text-slate-400 hover:text-slate-200 text-sm font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold px-5 py-2 rounded-lg text-sm transition-all"
                >
                  Save Results
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
