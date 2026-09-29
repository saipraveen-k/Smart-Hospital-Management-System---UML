'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useDemoStore } from '@/store/demoStore';
import {
  Pill,
  Package,
  Plus,
  ArrowLeft,
  Search,
  Filter,
  CheckCircle2,
  AlertTriangle,
  Clock,
  ShieldCheck,
  XCircle,
  User,
  Stethoscope
} from 'lucide-react';

export default function PharmacyDemoPage() {
  const { prescriptions, medicines, dispensePrescription, updateMedicineStock, addMedicine } = useDemoStore();

  const [activeTab, setActiveTab] = useState<'prescriptions' | 'inventory'>('prescriptions');
  const [search, setSearch] = useState('');

  // Modal for new medicine stock
  const [isAddMedModalOpen, setAddMedModalOpen] = useState(false);
  const [medName, setMedName] = useState('');
  const [medCategory, setMedCategory] = useState('Analgesic');
  const [medStock, setMedStock] = useState(200);
  const [medUnitPrice, setMedUnitPrice] = useState(25);
  const [medReorderLevel, setMedReorderLevel] = useState(50);
  const [medExpiry, setMedExpiry] = useState('2028-12-31');

  const filteredPrescriptions = prescriptions.filter(
    (rx) =>
      rx.patientName.toLowerCase().includes(search.toLowerCase()) ||
      rx.id.toLowerCase().includes(search.toLowerCase()) ||
      rx.doctorName.toLowerCase().includes(search.toLowerCase())
  );

  const filteredMedicines = medicines.filter(
    (m) =>
      m.name.toLowerCase().includes(search.toLowerCase()) ||
      m.category.toLowerCase().includes(search.toLowerCase()) ||
      m.id.toLowerCase().includes(search.toLowerCase())
  );

  const handleAddMedicineSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!medName) return;

    addMedicine({
      name: medName,
      category: medCategory,
      stock: Number(medStock),
      unitPrice: Number(medUnitPrice),
      reorderLevel: Number(medReorderLevel),
      expiryDate: medExpiry,
      dosageForm: 'Tablet'
    });

    setAddMedModalOpen(false);
    setMedName('');
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
            <span className="text-slate-400">Pharmacy & Drug Inventory</span>
          </div>
          <h1 className="text-3xl font-bold tracking-tight text-white flex items-center gap-3">
            <Pill className="w-8 h-8 text-cyan-400" />
            Clinical Pharmacy & Inventory
          </h1>
          <p className="text-slate-400 text-sm mt-1">
            Prescription verification, automated inventory stock deduction, and reorder warnings (FR-11, FR-12).
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setActiveTab('prescriptions')}
            className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all ${
              activeTab === 'prescriptions'
                ? 'bg-cyan-500 text-slate-950 shadow-md'
                : 'bg-slate-900 border border-slate-800 text-slate-300 hover:text-white'
            }`}
          >
            Prescriptions ({prescriptions.length})
          </button>
          <button
            onClick={() => setActiveTab('inventory')}
            className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all ${
              activeTab === 'inventory'
                ? 'bg-cyan-500 text-slate-950 shadow-md'
                : 'bg-slate-900 border border-slate-800 text-slate-300 hover:text-white'
            }`}
          >
            Drug Inventory ({medicines.length})
          </button>
        </div>
      </div>

      {/* Control Bar */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="relative w-full md:w-96">
          <Search className="absolute left-3.5 top-3 w-5 h-5 text-slate-400" />
          <input
            type="text"
            placeholder={activeTab === 'prescriptions' ? 'Search RX ID or Patient...' : 'Search Medicine or Category...'}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-11 pr-4 py-2.5 bg-slate-900 border border-slate-800 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-cyan-500"
          />
        </div>

        {activeTab === 'inventory' && (
          <button
            onClick={() => setAddMedModalOpen(true)}
            className="flex items-center gap-2 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white px-5 py-2.5 rounded-xl font-semibold shadow-lg shadow-cyan-500/20 transition-all hover:scale-105"
          >
            <Plus className="w-5 h-5" /> Add New Medicine
          </button>
        )}
      </div>

      {/* Content Area */}
      {activeTab === 'prescriptions' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredPrescriptions.map((rx) => (
            <div
              key={rx.id}
              className="bg-slate-900/80 border border-slate-800 hover:border-cyan-500/40 rounded-2xl p-6 transition-all shadow-md space-y-4"
            >
              <div className="flex items-center justify-between border-b border-slate-800/80 pb-3">
                <span className="text-xs font-mono font-bold text-cyan-400 bg-cyan-950/60 px-2.5 py-1 rounded-md border border-cyan-800/40">
                  {rx.id}
                </span>
                <span
                  className={`text-xs px-2.5 py-1 rounded-full border font-semibold ${
                    rx.status === 'Dispensed'
                      ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30'
                      : 'bg-amber-500/20 text-amber-400 border-amber-500/30'
                  }`}
                >
                  {rx.status}
                </span>
              </div>

              <div>
                <h3 className="text-lg font-bold text-white flex items-center gap-2">
                  <User className="w-5 h-5 text-cyan-400" /> {rx.patientName}
                </h3>
                <p className="text-xs text-slate-400 flex items-center gap-1.5 mt-1">
                  <Stethoscope className="w-4 h-4 text-blue-400" /> Prescribed by <strong>{rx.doctorName}</strong> on {rx.date}
                </p>
              </div>

              {/* Medicine items */}
              <div className="space-y-2 bg-slate-950 p-4 rounded-xl border border-slate-800/80">
                <span className="text-xs font-semibold text-slate-400 block mb-2">Prescribed Medication:</span>
                {rx.medicines.map((med, idx) => (
                  <div key={idx} className="flex items-center justify-between text-xs text-slate-200 border-b border-slate-900 last:border-0 pb-1.5 last:pb-0">
                    <div>
                      <strong className="text-cyan-300">{med.medicineName}</strong>
                      <span className="text-slate-400 ml-2">({med.frequency})</span>
                    </div>
                    <div className="text-right">
                      <span className="font-mono text-slate-300 font-semibold">{med.qty} Units</span>
                    </div>
                  </div>
                ))}
              </div>

              {rx.instructions && (
                <p className="text-xs text-slate-400 italic">
                  Note: &ldquo;{rx.instructions}&rdquo;
                </p>
              )}

              {/* Action */}
              <div className="pt-2">
                {rx.status !== 'Dispensed' ? (
                  <button
                    onClick={() => dispensePrescription(rx.id)}
                    className="w-full bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-white font-bold py-2.5 px-4 rounded-xl text-sm transition-all shadow-lg flex items-center justify-center gap-2"
                  >
                    <CheckCircle2 className="w-4 h-4" /> Verify & Dispense Medicines
                  </button>
                ) : (
                  <div className="text-center text-xs text-emerald-400 font-semibold bg-emerald-950/40 border border-emerald-800/40 py-2 rounded-xl flex items-center justify-center gap-1.5">
                    <ShieldCheck className="w-4 h-4" /> Medicines Dispensed & Stock Deducted
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      ) : (
        /* Inventory Table */
        <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-xl">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm text-slate-300">
              <thead className="bg-slate-950 text-xs font-semibold text-slate-400 uppercase border-b border-slate-800">
                <tr>
                  <th className="px-6 py-4">Item Code</th>
                  <th className="px-6 py-4">Medicine Name</th>
                  <th className="px-6 py-4">Category</th>
                  <th className="px-6 py-4">Stock Level</th>
                  <th className="px-6 py-4">Unit Price</th>
                  <th className="px-6 py-4">Expiry Date</th>
                  <th className="px-6 py-4 text-right">Quick Restock</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/80">
                {filteredMedicines.map((m) => {
                  const isLowStock = m.stock <= m.reorderLevel;
                  return (
                    <tr key={m.id} className="hover:bg-slate-800/40 transition-colors">
                      <td className="px-6 py-4 font-mono text-xs text-cyan-400 font-bold">{m.id}</td>
                      <td className="px-6 py-4 font-semibold text-white flex items-center gap-2">
                        <Pill className="w-4 h-4 text-cyan-400" /> {m.name}
                      </td>
                      <td className="px-6 py-4 text-xs text-slate-400">{m.category}</td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <span className={`font-bold font-mono ${isLowStock ? 'text-red-400' : 'text-emerald-400'}`}>
                            {m.stock} Units
                          </span>
                          {isLowStock && (
                            <span className="text-[10px] bg-red-950/80 border border-red-800/60 text-red-400 font-bold px-2 py-0.5 rounded-md flex items-center gap-1">
                              <AlertTriangle className="w-3 h-3" /> Reorder
                            </span>
                          )}
                        </div>
                      </td>
                      <td className="px-6 py-4 font-mono">₹{m.unitPrice.toFixed(2)}</td>
                      <td className="px-6 py-4 text-xs text-slate-400">{m.expiryDate}</td>
                      <td className="px-6 py-4 text-right space-x-2">
                        <button
                          onClick={() => updateMedicineStock(m.id, m.stock + 50)}
                          className="bg-slate-800 hover:bg-slate-700 text-cyan-300 text-xs px-3 py-1.5 rounded-lg border border-slate-700 transition-all font-semibold"
                        >
                          +50 Units
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Modal Add Medicine */}
      {isAddMedModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-700 rounded-2xl p-6 w-full max-w-lg shadow-2xl space-y-6">
            <div className="flex items-center justify-between border-b border-slate-800 pb-4">
              <h3 className="text-xl font-bold text-white flex items-center gap-2">
                <Package className="w-6 h-6 text-cyan-400" /> Add New Medicine Stock
              </h3>
              <button onClick={() => setAddMedModalOpen(false)} className="text-slate-400 hover:text-white p-1">
                <XCircle className="w-6 h-6" />
              </button>
            </div>

            <form onSubmit={handleAddMedicineSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Medicine Name & Dosage</label>
                <input
                  type="text"
                  value={medName}
                  onChange={(e) => setMedName(e.target.value)}
                  required
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-slate-200 text-sm focus:ring-2 focus:ring-cyan-500"
                  placeholder="e.g. Ciprofloxacin 500mg"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Category</label>
                  <input
                    type="text"
                    value={medCategory}
                    onChange={(e) => setMedCategory(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-slate-200 text-sm focus:ring-2 focus:ring-cyan-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Stock Quantity</label>
                  <input
                    type="number"
                    value={medStock}
                    onChange={(e) => setMedStock(Number(e.target.value))}
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-slate-200 text-sm focus:ring-2 focus:ring-cyan-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Unit Price (₹)</label>
                  <input
                    type="number"
                    value={medUnitPrice}
                    onChange={(e) => setMedUnitPrice(Number(e.target.value))}
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-slate-200 text-sm focus:ring-2 focus:ring-cyan-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Reorder Level Threshold</label>
                  <input
                    type="number"
                    value={medReorderLevel}
                    onChange={(e) => setMedReorderLevel(Number(e.target.value))}
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-slate-200 text-sm focus:ring-2 focus:ring-cyan-500"
                  />
                </div>
              </div>

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setAddMedModalOpen(false)}
                  className="px-4 py-2 text-slate-400 hover:text-slate-200 text-sm font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold px-5 py-2 rounded-lg text-sm transition-all"
                >
                  Save Stock Item
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
