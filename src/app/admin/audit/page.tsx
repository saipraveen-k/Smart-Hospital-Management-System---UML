'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useDemoStore } from '@/store/demoStore';
import { Shield, Clock, Search, Filter, ArrowLeft, RefreshCw } from 'lucide-react';

export default function AuditLogsPage() {
  const { auditLogs, resetDemoState } = useDemoStore();
  const [search, setSearch] = useState('');
  const [roleFilter, setRoleFilter] = useState('All');

  const filteredLogs = auditLogs.filter((log) => {
    const matchesSearch =
      log.userName.toLowerCase().includes(search.toLowerCase()) ||
      log.action.toLowerCase().includes(search.toLowerCase()) ||
      log.details.toLowerCase().includes(search.toLowerCase()) ||
      log.entity.toLowerCase().includes(search.toLowerCase());
    const matchesRole = roleFilter === 'All' || log.userRole === roleFilter;
    return matchesSearch && matchesRole;
  });

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
            <span className="text-slate-400">Security & Governance</span>
          </div>
          <h1 className="text-3xl font-bold tracking-tight text-white flex items-center gap-3">
            <Shield className="w-8 h-8 text-cyan-400" />
            System Audit Trails & Transaction Logs
          </h1>
          <p className="text-slate-400 text-sm mt-1">
            HIPAA-compliant immutable audit log recording all user role interactions, data mutations, and state transitions (NFR-04, NFR-05).
          </p>
        </div>

        <button
          onClick={() => resetDemoState()}
          className="flex items-center gap-2 bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 px-4 py-2 rounded-xl text-xs font-semibold transition-all"
        >
          <RefreshCw className="w-4 h-4 text-cyan-400" /> Reset Demo State
        </button>
      </div>

      {/* Filter bar */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
        <div className="md:col-span-8 relative">
          <Search className="absolute left-3.5 top-3 w-5 h-5 text-slate-400" />
          <input
            type="text"
            placeholder="Search audit details, action names, or entity IDs..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-11 pr-4 py-2.5 bg-slate-900 border border-slate-800 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-cyan-500"
          />
        </div>

        <div className="md:col-span-4 relative flex items-center gap-2">
          <Filter className="w-5 h-5 text-slate-400" />
          <select
            value={roleFilter}
            onChange={(e) => setRoleFilter(e.target.value)}
            className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-2.5 text-slate-200 focus:outline-none focus:ring-2 focus:ring-cyan-500"
          >
            <option value="All">All User Roles</option>
            <option value="Admin">Admin</option>
            <option value="Doctor">Doctor</option>
            <option value="Receptionist">Receptionist</option>
            <option value="Pharmacist">Pharmacist</option>
            <option value="Lab Technician">Lab Technician</option>
            <option value="Cashier">Cashier</option>
            <option value="Patient">Patient</option>
          </select>
        </div>
      </div>

      {/* Audit Logs Table */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-slate-300">
            <thead className="bg-slate-950 text-xs font-semibold text-slate-400 uppercase border-b border-slate-800">
              <tr>
                <th className="px-6 py-4">Log ID</th>
                <th className="px-6 py-4">Timestamp</th>
                <th className="px-6 py-4">Actor Role</th>
                <th className="px-6 py-4">Action</th>
                <th className="px-6 py-4">Target Entity</th>
                <th className="px-6 py-4">Log Details</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/80">
              {filteredLogs.map((log) => (
                <tr key={log.id} className="hover:bg-slate-800/40 transition-colors">
                  <td className="px-6 py-4 font-mono text-xs text-cyan-400 font-bold">{log.id}</td>
                  <td className="px-6 py-4 text-xs text-slate-400 flex items-center gap-1.5 whitespace-nowrap">
                    <Clock className="w-3.5 h-3.5 text-slate-500" /> {log.timestamp}
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-xs bg-slate-950 border border-slate-800 text-slate-300 font-semibold px-2.5 py-1 rounded-md">
                      {log.userRole} ({log.userName})
                    </span>
                  </td>
                  <td className="px-6 py-4 font-mono text-xs font-bold text-amber-300">{log.action}</td>
                  <td className="px-6 py-4 text-xs font-semibold text-cyan-300">
                    {log.entity} <span className="font-mono text-slate-400">({log.entityId})</span>
                  </td>
                  <td className="px-6 py-4 text-xs text-slate-300">{log.details}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
