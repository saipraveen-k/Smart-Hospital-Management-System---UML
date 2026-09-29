'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Table, Search, ArrowRight, CheckCircle2, FileText, Boxes, Sparkles, Network, ShieldCheck, Activity } from 'lucide-react';
import { TRACEABILITY_MATRIX } from '@/data/traceability';

export default function TraceabilityPage() {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredMatrix = TRACEABILITY_MATRIX.filter((item) => {
    const q = searchQuery.toLowerCase();
    return (
      item.reqId.toLowerCase().includes(q) ||
      item.title.toLowerCase().includes(q) ||
      item.useCases.some((uc) => uc.toLowerCase().includes(q)) ||
      item.domainClasses.some((dc) => dc.toLowerCase().includes(q))
    );
  });

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* Header */}
      <div className="space-y-2 border-b border-gray-200 dark:border-gray-800 pb-5">
        <div className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400 font-bold text-xs uppercase tracking-wider">
          <Table className="w-4 h-4" /> Requirement Verification & Traceability
        </div>
        <h1 className="text-3xl font-black text-gray-900 dark:text-white tracking-tight">
          Interactive Requirement Traceability Matrix (RTM)
        </h1>
        <p className="text-sm text-gray-600 dark:text-gray-400 max-w-3xl">
          Trace every Functional Requirement (FR-01 to FR-30) forward through Target Use Cases, Domain Entities, Sequence Diagrams, Design Classes, and Behavioral Activity/State Models.
        </p>
      </div>

      {/* Search Bar */}
      <div className="flex items-center justify-between gap-4 p-4 rounded-2xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 shadow-sm">
        <div className="relative flex-1 max-w-md">
          <Search className="w-3.5 h-3.5 absolute left-3 top-2.5 text-gray-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search matrix by FR ID, title, class or use case..."
            className="w-full pl-8 pr-3 py-1.5 rounded-xl bg-gray-50 dark:bg-gray-950 border border-gray-200 dark:border-gray-800 text-xs text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:border-emerald-500"
          />
        </div>
        <div className="text-xs font-mono text-gray-500 font-semibold">
          100% Verified Coverage (30 Requirements Mapped)
        </div>
      </div>

      {/* Interactive Table */}
      <div className="overflow-x-auto rounded-3xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 shadow-sm">
        <table className="w-full text-left border-collapse text-xs">
          <thead className="bg-gray-50 dark:bg-gray-950 text-gray-700 dark:text-gray-300 font-bold border-b border-gray-200 dark:border-gray-800 uppercase tracking-wider text-[10px]">
            <tr>
              <th className="p-3.5">Req ID</th>
              <th className="p-3.5">Functional Requirement</th>
              <th className="p-3.5">Target Use Case</th>
              <th className="p-3.5">Domain Class</th>
              <th className="p-3.5">Sequence Diagram</th>
              <th className="p-3.5">Design Class</th>
              <th className="p-3.5">Activity / State Model</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
            {filteredMatrix.map((item) => (
              <tr key={item.reqId} className="hover:bg-blue-50/40 dark:hover:bg-blue-950/20 transition">
                <td className="p-3.5 font-bold font-mono text-blue-600 dark:text-blue-400">
                  <Link href="/requirements" className="hover:underline">{item.reqId}</Link>
                </td>
                <td className="p-3.5 font-semibold text-gray-900 dark:text-white">{item.title}</td>
                <td className="p-3.5">
                  <div className="flex flex-wrap gap-1">
                    {item.useCases.map((uc) => (
                      <Link key={uc} href="/use-cases" className="px-2 py-0.5 rounded bg-indigo-100 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-300 font-mono text-[10px] font-bold hover:underline">
                        {uc}
                      </Link>
                    ))}
                  </div>
                </td>
                <td className="p-3.5">
                  <div className="flex flex-wrap gap-1">
                    {item.domainClasses.map((dc) => (
                      <Link key={dc} href="/domain-model" className="px-2 py-0.5 rounded bg-amber-100 dark:bg-amber-950 text-amber-800 dark:text-amber-300 font-semibold text-[10px] hover:underline">
                        {dc}
                      </Link>
                    ))}
                  </div>
                </td>
                <td className="p-3.5">
                  <div className="flex flex-wrap gap-1">
                    {item.ssds.map((ssd) => (
                      <Link key={ssd} href="/interactions" className="px-2 py-0.5 rounded bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 font-mono text-[10px] font-bold hover:underline">
                        {ssd}
                      </Link>
                    ))}
                  </div>
                </td>
                <td className="p-3.5">
                  <div className="flex flex-wrap gap-1">
                    {item.designClasses.map((dcd) => (
                      <Link key={dcd} href="/design" className="px-2 py-0.5 rounded bg-cyan-100 dark:bg-cyan-950 text-cyan-700 dark:text-cyan-300 font-semibold text-[10px] hover:underline">
                        {dcd}
                      </Link>
                    ))}
                  </div>
                </td>
                <td className="p-3.5">
                  <div className="flex flex-wrap gap-1">
                    {item.activityState.map((act) => (
                      <Link key={act} href="/behaviour" className="px-2 py-0.5 rounded bg-rose-100 dark:bg-rose-950 text-rose-700 dark:text-rose-300 font-mono text-[10px] font-bold hover:underline">
                        {act}
                      </Link>
                    ))}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
