'use client';

import React from 'react';
import Link from 'next/link';
import { useDemoStore } from '@/store/demoStore';
import {
  BarChart3,
  TrendingUp,
  Users,
  DollarSign,
  Activity,
  Bed,
  FlaskConical,
  Pill,
  ArrowLeft,
  CalendarCheck
} from 'lucide-react';

export default function ReportsDemoPage() {
  const { patients, appointments, labOrders, medicines, bills, payments } = useDemoStore();

  const totalRevenue = payments.reduce((acc, curr) => acc + curr.amount, 0);
  const pendingRevenue = bills.filter(b => b.status !== 'Paid').reduce((acc, curr) => acc + (curr.netAmount - curr.paidAmount), 0);
  const completedAppointments = appointments.filter((a) => a.status === 'Completed').length;
  const activePatients = patients.length;
  const totalLabTests = labOrders.length;
  const lowStockMeds = medicines.filter((m) => m.stock <= m.reorderLevel).length;

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 p-6 md:p-10 space-y-8">
      {/* Header Breadcrumb */}
      <div className="border-b border-slate-800 pb-6">
        <div className="flex items-center gap-2 text-sm text-cyan-400 mb-2">
          <Link href="/demo" className="hover:underline flex items-center gap-1">
            <ArrowLeft className="w-4 h-4" /> Demo Hub
          </Link>
          <span>/</span>
          <span className="text-slate-400">Executive Analytics</span>
        </div>
        <h1 className="text-3xl font-bold tracking-tight text-white flex items-center gap-3">
          <BarChart3 className="w-8 h-8 text-cyan-400" />
          Hospital Performance & Revenue Analytics
        </h1>
        <p className="text-slate-400 text-sm mt-1">
          Real-time aggregated metrics across OPD, IPD, Pathology, Pharmacy, and Financial Billing.
        </p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 shadow-lg space-y-2">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-xs font-semibold">Total Revenue Collected</span>
            <DollarSign className="w-5 h-5 text-emerald-400" />
          </div>
          <div className="text-2xl font-bold font-mono text-emerald-400">₹{totalRevenue.toLocaleString()}</div>
          <div className="text-xs text-slate-500">Pending Dues: ₹{pendingRevenue.toLocaleString()}</div>
        </div>

        <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 shadow-lg space-y-2">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-xs font-semibold">Registered Patients</span>
            <Users className="w-5 h-5 text-cyan-400" />
          </div>
          <div className="text-2xl font-bold text-white font-mono">{activePatients}</div>
          <div className="text-xs text-cyan-400">UHID Master Database</div>
        </div>

        <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 shadow-lg space-y-2">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-xs font-semibold">Completed Consultations</span>
            <CalendarCheck className="w-5 h-5 text-blue-400" />
          </div>
          <div className="text-2xl font-bold text-white font-mono">{completedAppointments} / {appointments.length}</div>
          <div className="text-xs text-blue-400">OPD Queue Throughput</div>
        </div>

        <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 shadow-lg space-y-2">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-xs font-semibold">Inventory Alert Status</span>
            <Pill className="w-5 h-5 text-amber-400" />
          </div>
          <div className="text-2xl font-bold text-amber-400 font-mono">{lowStockMeds} Items</div>
          <div className="text-xs text-slate-500">Below Reorder Threshold</div>
        </div>
      </div>

      {/* Analytics Breakdown Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Department Throughput */}
        <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 shadow-lg space-y-4">
          <h3 className="text-lg font-bold text-white flex items-center gap-2 border-b border-slate-800 pb-3">
            <Activity className="w-5 h-5 text-cyan-400" /> Department-Wise Consultation Load
          </h3>
          <div className="space-y-3">
            {[
              { dept: 'General Medicine', count: 4, pct: '80%' },
              { dept: 'Cardiology', count: 3, pct: '60%' },
              { dept: 'Orthopedics', count: 2, pct: '40%' },
              { dept: 'Neurology', count: 2, pct: '40%' },
              { dept: 'Gynaecology', count: 1, pct: '20%' }
            ].map((d, i) => (
              <div key={i} className="space-y-1">
                <div className="flex justify-between text-xs text-slate-300 font-semibold">
                  <span>{d.dept}</span>
                  <span className="font-mono text-cyan-400">{d.count} Visits</span>
                </div>
                <div className="w-full bg-slate-950 h-2 rounded-full overflow-hidden">
                  <div className="bg-gradient-to-r from-cyan-500 to-blue-500 h-full rounded-full" style={{ width: d.pct }} />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Diagnostic Activity */}
        <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 shadow-lg space-y-4">
          <h3 className="text-lg font-bold text-white flex items-center gap-2 border-b border-slate-800 pb-3">
            <FlaskConical className="w-5 h-5 text-purple-400" /> Pathology & Lab Test Distribution
          </h3>
          <div className="space-y-3">
            {[
              { test: 'Complete Blood Count (CBC)', status: 'High Demand', pct: '90%' },
              { test: 'Lipid Profile & Cholesterol', status: 'Moderate', pct: '65%' },
              { test: 'Right Knee Digital X-Ray', status: 'Active', pct: '45%' },
              { test: '12-Lead ECG Tracing', status: 'Approved', pct: '80%' }
            ].map((t, i) => (
              <div key={i} className="space-y-1">
                <div className="flex justify-between text-xs text-slate-300 font-semibold">
                  <span>{t.test}</span>
                  <span className="font-mono text-purple-400 text-[11px]">{t.status}</span>
                </div>
                <div className="w-full bg-slate-950 h-2 rounded-full overflow-hidden">
                  <div className="bg-gradient-to-r from-purple-500 to-indigo-500 h-full rounded-full" style={{ width: t.pct }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
