'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  Compass,
  UserCheck,
  CheckCircle2,
  Boxes,
  Network,
  X,
  ArrowRight,
  FileText,
  Sparkles
} from 'lucide-react';
import { ACTORS } from '@/data/actors';
import { SYSTEM_MODULES } from '@/data/modules';
import { Actor } from '@/types';

export default function OverviewPage() {
  const [selectedActor, setSelectedActor] = useState<Actor | null>(null);

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* Header */}
      <div className="space-y-2 border-b border-gray-200 dark:border-gray-800 pb-5">
        <div className="flex items-center gap-2 text-blue-600 dark:text-blue-400 font-bold text-xs uppercase tracking-wider">
          <Compass className="w-4 h-4" /> System Overview & Operational Context
        </div>
        <h1 className="text-3xl font-black text-gray-900 dark:text-white tracking-tight">
          System Overview, Problem Statement & Actor Model
        </h1>
        <p className="text-sm text-gray-600 dark:text-gray-400 max-w-3xl">
          Detailed Object-Oriented Analysis and Design (OOAD) model for the Smart Hospital Management System (SHMS), detailing problem domain, objectives, actors, modules, and architectural scope.
        </p>
      </div>

      {/* Problem Statement & Objectives Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="p-6 rounded-2xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 shadow-sm space-y-3">
          <h3 className="font-extrabold text-gray-900 dark:text-white text-base flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-rose-500" />
            Problem Statement
          </h3>
          <p className="text-xs text-gray-600 dark:text-gray-300 leading-relaxed">
            Legacy hospital operations suffer from fragmented paper records, manual outpatient queue bottlenecks, delayed laboratory test turnarounds, billing inaccuracies, and inventory stockouts. The lack of an integrated object-oriented model leads to communication breakdowns between receptionists, consulting physicians, pathology technicians, pharmacists, and cashiers.
          </p>
          <div className="pt-2 text-[11px] font-medium text-rose-600 dark:text-rose-400 bg-rose-50 dark:bg-rose-950/40 p-3 rounded-xl border border-rose-200 dark:border-rose-900/40">
            Goal: Establish a single source of truth across outpatient, inpatient, diagnostic lab, pharmacy, and billing services.
          </div>
        </div>

        <div className="p-6 rounded-2xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 shadow-sm space-y-3">
          <h3 className="font-extrabold text-gray-900 dark:text-white text-base flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-emerald-500" />
            System Objectives
          </h3>
          <ul className="space-y-2 text-xs text-gray-600 dark:text-gray-300">
            <li className="flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
              <span>Automate Master Patient Index (MPI) with unique UHIDs and online check-in.</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
              <span>Streamline clinical consultations, ICD-10 diagnoses, and electronic prescriptions.</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
              <span>Integrate lab specimen tracking, analyzer parameter entry, and pathologist approvals.</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
              <span>Consolidate multi-departmental charges into itemized invoices with multi-channel payment adapters.</span>
            </li>
          </ul>
        </div>
      </div>

      {/* Interactive Clickable Actor Cards Section */}
      <section className="space-y-4">
        <div>
          <h2 className="text-xl font-extrabold text-gray-900 dark:text-white flex items-center gap-2">
            <UserCheck className="w-5 h-5 text-blue-500" />
            <span>System Actors (Click any actor card for details)</span>
          </h2>
          <p className="text-xs text-gray-500">
            Click an actor card to inspect primary responsibilities, associated use cases, requirements, and sequence diagrams.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {ACTORS.map((actor) => (
            <button
              key={actor.id}
              onClick={() => setSelectedActor(actor)}
              className="p-5 rounded-2xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 hover:border-blue-500/50 text-left transition-all hover:shadow-lg group flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-300 font-mono">
                    {actor.id}
                  </span>
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                    actor.type === 'PRIMARY' ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300' : 'bg-purple-100 text-purple-800 dark:bg-purple-950 dark:text-purple-300'
                  }`}>
                    {actor.type}
                  </span>
                </div>
                <h4 className="font-extrabold text-gray-900 dark:text-white text-base group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                  {actor.name}
                </h4>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1 line-clamp-3 leading-relaxed">
                  {actor.description}
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-gray-100 dark:border-gray-800 flex items-center justify-between text-[11px] font-semibold text-blue-600 dark:text-blue-400 group-hover:translate-x-1 transition-transform">
                <span>View Actor Details ({actor.useCases.length} Use Cases)</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </div>
            </button>
          ))}
        </div>
      </section>

      {/* Actor Detail Modal / Drawer */}
      {selectedActor && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-200">
          <div className="w-full max-w-2xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[85vh]">
            <div className="p-6 bg-gradient-to-r from-blue-600 to-indigo-600 text-white flex items-center justify-between">
              <div>
                <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-white/20 uppercase tracking-wider font-mono">
                  {selectedActor.id} • {selectedActor.type} ACTOR
                </span>
                <h3 className="text-2xl font-black mt-1">{selectedActor.name}</h3>
              </div>
              <button
                onClick={() => setSelectedActor(null)}
                className="p-1.5 rounded-xl bg-white/10 hover:bg-white/20 transition"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 overflow-y-auto space-y-5 text-xs text-gray-700 dark:text-gray-300">
              <div>
                <h4 className="font-bold text-gray-900 dark:text-white uppercase tracking-wider text-[11px] mb-1">Description</h4>
                <p className="leading-relaxed text-gray-600 dark:text-gray-300">{selectedActor.description}</p>
              </div>

              <div>
                <h4 className="font-bold text-gray-900 dark:text-white uppercase tracking-wider text-[11px] mb-2">Key Responsibilities</h4>
                <ul className="space-y-1.5 pl-2">
                  {selectedActor.responsibilities.map((r, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                      <span>{r}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="grid grid-cols-2 gap-4 pt-2 border-t border-gray-100 dark:border-gray-800">
                <div>
                  <h4 className="font-bold text-gray-900 dark:text-white uppercase tracking-wider text-[11px] mb-1">Associated Use Cases</h4>
                  <div className="flex flex-wrap gap-1">
                    {selectedActor.useCases.map((uc) => (
                      <span key={uc} className="px-2 py-0.5 rounded bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-300 font-mono text-[10px]">
                        {uc}
                      </span>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="font-bold text-gray-900 dark:text-white uppercase tracking-wider text-[11px] mb-1">Mapped Requirements</h4>
                  <div className="flex flex-wrap gap-1">
                    {selectedActor.requirements.map((req) => (
                      <span key={req} className="px-2 py-0.5 rounded bg-indigo-100 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-300 font-mono text-[10px]">
                        {req}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="p-4 bg-gray-50 dark:bg-gray-950 border-t border-gray-100 dark:border-gray-800 flex justify-end">
              <button
                onClick={() => setSelectedActor(null)}
                className="px-5 py-2 rounded-xl bg-gray-200 dark:bg-gray-800 hover:bg-gray-300 dark:hover:bg-gray-700 text-gray-800 dark:text-gray-200 font-bold text-xs transition"
              >
                Close Actor Details
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modules Overview */}
      <section className="space-y-4">
        <h2 className="text-xl font-extrabold text-gray-900 dark:text-white flex items-center gap-2">
          <Boxes className="w-5 h-5 text-indigo-500" />
          <span>System Subsystem Modules</span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {SYSTEM_MODULES.map((mod) => (
            <div key={mod.id} className="p-5 rounded-2xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 space-y-2">
              <div className="flex items-center justify-between">
                <h4 className="font-extrabold text-gray-900 dark:text-white text-base">{mod.name}</h4>
                <span className="px-2.5 py-0.5 rounded-full text-xs font-mono font-bold bg-indigo-100 text-indigo-800 dark:bg-indigo-950 dark:text-indigo-300">
                  {mod.code}
                </span>
              </div>
              <p className="text-xs text-gray-600 dark:text-gray-400 leading-relaxed">{mod.description}</p>
              <div className="pt-2 flex items-center gap-4 text-xs font-semibold text-blue-600 dark:text-blue-400">
                <span>Requirements: {mod.requirements.join(', ')}</span>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
