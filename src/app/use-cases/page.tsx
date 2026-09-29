'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  Boxes,
  Search,
  Filter,
  User,
  CheckCircle2,
  X,
  FileText,
  Sparkles,
  Network,
  ChevronRight,
  ArrowRight
} from 'lucide-react';
import { USE_CASES } from '@/data/useCases';
import { UseCase } from '@/types';
import { DIAGRAMS } from '@/data/diagrams';
import { DiagramViewer } from '@/components/diagrams/DiagramViewer';

export default function UseCasesPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [actorFilter, setActorFilter] = useState('ALL');
  const [packageFilter, setPackageFilter] = useState('ALL');
  const [selectedUseCase, setSelectedUseCase] = useState<UseCase | null>(null);
  const [showMasterDiagram, setShowMasterDiagram] = useState<boolean>(false);

  const masterDiagram = DIAGRAMS.find((d) => d.id === 'EXP3-UC-01');

  const filteredUseCases = USE_CASES.filter((uc) => {
    const q = searchQuery.toLowerCase();
    const matchesSearch = uc.id.toLowerCase().includes(q) || uc.name.toLowerCase().includes(q) || uc.goal.toLowerCase().includes(q);
    const matchesActor = actorFilter === 'ALL' || uc.primaryActor.toLowerCase().includes(actorFilter.toLowerCase());
    const matchesPackage = packageFilter === 'ALL' || uc.package === packageFilter;
    return matchesSearch && matchesActor && matchesPackage;
  });

  const packages = Array.from(new Set(USE_CASES.map((uc) => uc.package)));

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* Header */}
      <div className="space-y-2 border-b border-gray-200 dark:border-gray-800 pb-5">
        <div className="flex items-center gap-2 text-purple-600 dark:text-purple-400 font-bold text-xs uppercase tracking-wider">
          <Boxes className="w-4 h-4" /> Behavioral Model & Specifications
        </div>
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-black text-gray-900 dark:text-white tracking-tight">
              Use Case Specifications (35 Use Cases)
            </h1>
            <p className="text-sm text-gray-600 dark:text-gray-400 max-w-3xl">
              Complete behavioral specification for all 35 system use cases across 8 subsystem packages with preconditions, main action flows, alternative flows, and diagram mappings.
            </p>
          </div>
          <button
            onClick={() => setShowMasterDiagram(!showMasterDiagram)}
            className="px-4 py-2 rounded-xl bg-purple-600 hover:bg-purple-700 text-white font-bold text-xs shadow-md transition flex items-center gap-2"
          >
            <Boxes className="w-4 h-4" />
            <span>{showMasterDiagram ? 'Hide Master Diagram' : 'View Master Use Case Diagram'}</span>
          </button>
        </div>
      </div>

      {/* Master Diagram Collapsible Panel */}
      {showMasterDiagram && masterDiagram && (
        <div className="space-y-3 p-4 rounded-3xl bg-gray-900 border border-gray-800">
          <div className="flex items-center justify-between px-2">
            <h3 className="font-extrabold text-white text-base">UML Master Use Case Model</h3>
            <span className="text-xs text-gray-400 font-mono">EXP3-UC-01</span>
          </div>
          <DiagramViewer diagram={masterDiagram} />
        </div>
      )}

      {/* Search & Filter Bar */}
      <div className="flex flex-wrap items-center justify-between gap-4 p-4 rounded-2xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 shadow-sm">
        <div className="flex flex-wrap items-center gap-3 flex-1">
          <div className="relative flex-1 min-w-[200px]">
            <Search className="w-3.5 h-3.5 absolute left-3 top-2.5 text-gray-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search use cases (UC-03, Appointment, Consultation)..."
              className="w-full pl-8 pr-3 py-1.5 rounded-xl bg-gray-50 dark:bg-gray-950 border border-gray-200 dark:border-gray-800 text-xs text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:border-purple-500"
            />
          </div>

          <select
            value={actorFilter}
            onChange={(e) => setActorFilter(e.target.value)}
            className="px-3 py-1.5 rounded-xl bg-gray-50 dark:bg-gray-950 border border-gray-200 dark:border-gray-800 text-xs font-medium text-gray-700 dark:text-gray-300 focus:outline-none"
          >
            <option value="ALL">All Actors</option>
            <option value="Patient">Patient</option>
            <option value="Receptionist">Receptionist</option>
            <option value="Doctor">Doctor</option>
            <option value="Pharmacist">Pharmacist</option>
            <option value="Lab Technician">Lab Technician</option>
            <option value="Cashier">Cashier</option>
            <option value="Admin">Admin</option>
          </select>

          <select
            value={packageFilter}
            onChange={(e) => setPackageFilter(e.target.value)}
            className="px-3 py-1.5 rounded-xl bg-gray-50 dark:bg-gray-950 border border-gray-200 dark:border-gray-800 text-xs font-medium text-gray-700 dark:text-gray-300 focus:outline-none"
          >
            <option value="ALL">All Packages</option>
            {packages.map((p) => (
              <option key={p} value={p}>{p}</option>
            ))}
          </select>
        </div>

        <div className="text-xs font-mono text-gray-500 font-semibold">
          Showing {filteredUseCases.length} of 35 Use Cases
        </div>
      </div>

      {/* Grid of Use Cases */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredUseCases.map((uc) => (
          <div
            key={uc.id}
            onClick={() => setSelectedUseCase(uc)}
            className="p-5 rounded-2xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 hover:border-purple-500/50 shadow-sm hover:shadow-xl transition-all cursor-pointer group flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="px-2.5 py-0.5 rounded-full text-xs font-mono font-bold bg-purple-100 text-purple-800 dark:bg-purple-950 dark:text-purple-300">
                  {uc.id}
                </span>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300">
                  {uc.primaryActor}
                </span>
              </div>

              <h4 className="font-extrabold text-gray-900 dark:text-white text-base group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors">
                {uc.name}
              </h4>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1 line-clamp-2 leading-relaxed">
                {uc.goal}
              </p>
            </div>

            <div className="mt-4 pt-3 border-t border-gray-100 dark:border-gray-800 flex items-center justify-between text-[11px] font-semibold text-purple-600 dark:text-purple-400">
              <span>View Full Specification</span>
              <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>
        ))}
      </div>

      {/* Complete Specification Modal */}
      {selectedUseCase && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-200">
          <div className="w-full max-w-3xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
            <div className="p-6 bg-gradient-to-r from-purple-600 to-indigo-600 text-white flex items-center justify-between">
              <div>
                <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-white/20 font-mono uppercase">
                  {selectedUseCase.id} • {selectedUseCase.package}
                </span>
                <h3 className="text-2xl font-black mt-1">{selectedUseCase.name}</h3>
              </div>
              <button onClick={() => setSelectedUseCase(null)} className="p-1.5 rounded-xl bg-white/10 hover:bg-white/20 transition">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 overflow-y-auto space-y-6 text-xs text-gray-700 dark:text-gray-300">
              {/* Goal & Actors */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 rounded-2xl bg-gray-50 dark:bg-gray-950 border border-gray-100 dark:border-gray-800">
                  <h4 className="font-bold text-gray-900 dark:text-white uppercase tracking-wider text-[11px] mb-1">Primary Actor</h4>
                  <p className="font-semibold text-purple-600 dark:text-purple-400 text-sm">{selectedUseCase.primaryActor}</p>
                  {selectedUseCase.supportingActors.length > 0 && (
                    <p className="text-[11px] text-gray-500 mt-1">Supporting: {selectedUseCase.supportingActors.join(', ')}</p>
                  )}
                </div>

                <div className="p-4 rounded-2xl bg-gray-50 dark:bg-gray-950 border border-gray-100 dark:border-gray-800">
                  <h4 className="font-bold text-gray-900 dark:text-white uppercase tracking-wider text-[11px] mb-1">Use Case Goal</h4>
                  <p className="leading-relaxed text-gray-600 dark:text-gray-300">{selectedUseCase.goal}</p>
                </div>
              </div>

              {/* Preconditions & Postconditions */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h4 className="font-bold text-gray-900 dark:text-white uppercase tracking-wider text-[11px] mb-2">Preconditions</h4>
                  <ul className="space-y-1">
                    {selectedUseCase.preconditions.map((p, i) => (
                      <li key={i} className="flex items-start gap-1.5">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0 mt-0.5" />
                        <span>{p}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h4 className="font-bold text-gray-900 dark:text-white uppercase tracking-wider text-[11px] mb-2">Postconditions</h4>
                  <ul className="space-y-1">
                    {selectedUseCase.postconditions.map((p, i) => (
                      <li key={i} className="flex items-start gap-1.5">
                        <CheckCircle2 className="w-3.5 h-3.5 text-blue-500 shrink-0 mt-0.5" />
                        <span>{p}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Main Action Flow */}
              <div>
                <h4 className="font-bold text-gray-900 dark:text-white uppercase tracking-wider text-[11px] mb-2">Main Action Flow</h4>
                <div className="space-y-2">
                  {selectedUseCase.mainFlow.map((step) => (
                    <div key={step.step} className="flex items-start gap-3 p-3 rounded-xl bg-gray-50 dark:bg-gray-950 border border-gray-100 dark:border-gray-850">
                      <span className="px-2 py-0.5 rounded bg-purple-600 text-white font-mono font-bold text-[10px]">
                        Step {step.step}
                      </span>
                      <span className="text-gray-800 dark:text-gray-200 font-medium">{step.action}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Alternative Flows */}
              {selectedUseCase.alternativeFlows.length > 0 && (
                <div>
                  <h4 className="font-bold text-gray-900 dark:text-white uppercase tracking-wider text-[11px] mb-2">Alternative Flows</h4>
                  {selectedUseCase.alternativeFlows.map((alt, i) => (
                    <div key={i} className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-900 dark:text-amber-200 space-y-1">
                      <div className="font-bold text-xs">{alt.name} (Condition: {alt.condition})</div>
                      <p className="text-[11px]">{alt.action}</p>
                    </div>
                  ))}
                </div>
              )}

              {/* Clickable Mapped Objects */}
              <div className="space-y-3 pt-3 border-t border-gray-100 dark:border-gray-800">
                <div>
                  <h4 className="font-bold text-gray-900 dark:text-white uppercase tracking-wider text-[11px] mb-2">Mapped Requirements</h4>
                  <div className="flex flex-wrap gap-1.5">
                    {selectedUseCase.relatedRequirements.map((r) => (
                      <Link key={r} href="/requirements" onClick={() => setSelectedUseCase(null)} className="px-2.5 py-1 rounded bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-300 font-mono font-bold">
                        {r}
                      </Link>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="font-bold text-gray-900 dark:text-white uppercase tracking-wider text-[11px] mb-2">Linked Design & Domain Classes</h4>
                  <div className="flex flex-wrap gap-1.5">
                    {selectedUseCase.relatedClasses.map((cls) => (
                      <Link key={cls} href="/domain-model" onClick={() => setSelectedUseCase(null)} className="px-2.5 py-1 rounded bg-amber-100 dark:bg-amber-950 text-amber-700 dark:text-amber-300 font-semibold">
                        {cls}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="p-4 bg-gray-50 dark:bg-gray-950 border-t border-gray-100 dark:border-gray-800 flex justify-end">
              <button
                onClick={() => setSelectedUseCase(null)}
                className="px-5 py-2 rounded-xl bg-gray-200 dark:bg-gray-800 hover:bg-gray-300 dark:hover:bg-gray-700 text-gray-800 dark:text-gray-200 font-bold text-xs transition"
              >
                Close Specification
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
