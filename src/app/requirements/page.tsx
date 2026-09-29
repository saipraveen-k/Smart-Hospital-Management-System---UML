'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  FileText,
  Search,
  Filter,
  ShieldCheck,
  CheckCircle2,
  X,
  Boxes,
  Sparkles,
  Network,
  ArrowRight,
  ChevronRight
} from 'lucide-react';
import { FUNCTIONAL_REQUIREMENTS, NON_FUNCTIONAL_REQUIREMENTS, BUSINESS_RULES } from '@/data/requirements';
import { Requirement } from '@/types';

export default function RequirementsPage() {
  const [activeTab, setActiveTab] = useState<'FR' | 'NFR' | 'BR'>('FR');
  const [searchQuery, setSearchQuery] = useState('');
  const [moduleFilter, setModuleFilter] = useState('ALL');
  const [priorityFilter, setPriorityFilter] = useState('ALL');
  const [selectedReq, setSelectedReq] = useState<Requirement | null>(null);

  const filteredFR = FUNCTIONAL_REQUIREMENTS.filter((r) => {
    const q = searchQuery.toLowerCase();
    const matchesSearch = r.id.toLowerCase().includes(q) || r.title.toLowerCase().includes(q) || r.description.toLowerCase().includes(q);
    const matchesModule = moduleFilter === 'ALL' || r.module === moduleFilter;
    const matchesPriority = priorityFilter === 'ALL' || r.priority === priorityFilter;
    return matchesSearch && matchesModule && matchesPriority;
  });

  const filteredNFR = NON_FUNCTIONAL_REQUIREMENTS.filter((r) => {
    const q = searchQuery.toLowerCase();
    return r.id.toLowerCase().includes(q) || r.title.toLowerCase().includes(q) || r.description.toLowerCase().includes(q);
  });

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* Header */}
      <div className="space-y-2 border-b border-gray-200 dark:border-gray-800 pb-5">
        <div className="flex items-center gap-2 text-blue-600 dark:text-blue-400 font-bold text-xs uppercase tracking-wider">
          <FileText className="w-4 h-4" /> Requirement Engineering & SRS
        </div>
        <h1 className="text-3xl font-black text-gray-900 dark:text-white tracking-tight">
          System Requirements Specification (SRS)
        </h1>
        <p className="text-sm text-gray-600 dark:text-gray-400 max-w-3xl">
          Complete formal requirements catalog detailing 30 Functional Requirements, 11 Non-Functional Quality Attributes, and 8 Business Rules for the Smart Hospital Management System.
        </p>
      </div>

      {/* Tabs */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-gray-200 dark:border-gray-800 pb-2">
        <div className="flex gap-2">
          <button
            onClick={() => setActiveTab('FR')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition ${
              activeTab === 'FR'
                ? 'bg-blue-600 text-white shadow-md'
                : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
            }`}
          >
            Functional Reqs (30)
          </button>
          <button
            onClick={() => setActiveTab('NFR')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition ${
              activeTab === 'NFR'
                ? 'bg-blue-600 text-white shadow-md'
                : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
            }`}
          >
            Non-Functional Reqs (11)
          </button>
          <button
            onClick={() => setActiveTab('BR')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition ${
              activeTab === 'BR'
                ? 'bg-blue-600 text-white shadow-md'
                : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
            }`}
          >
            Business Rules (8)
          </button>
        </div>

        {/* Search & Filters */}
        {activeTab === 'FR' && (
          <div className="flex flex-wrap items-center gap-2">
            <div className="relative">
              <Search className="w-3.5 h-3.5 absolute left-3 top-2.5 text-gray-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search FR-01, Patient, Check-In..."
                className="pl-8 pr-3 py-1.5 rounded-xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 text-xs text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:border-blue-500 w-48 sm:w-64"
              />
            </div>

            <select
              value={priorityFilter}
              onChange={(e) => setPriorityFilter(e.target.value)}
              className="px-3 py-1.5 rounded-xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 text-xs font-medium text-gray-700 dark:text-gray-300 focus:outline-none"
            >
              <option value="ALL">All Priorities</option>
              <option value="CRITICAL">Critical Priority</option>
              <option value="HIGH">High Priority</option>
              <option value="MEDIUM">Medium Priority</option>
            </select>
          </div>
        )}
      </div>

      {/* FR Tab Content */}
      {activeTab === 'FR' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredFR.map((req) => (
            <div
              key={req.id}
              onClick={() => setSelectedReq(req)}
              className="p-5 rounded-2xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 hover:border-blue-500/50 shadow-sm hover:shadow-xl transition-all cursor-pointer group flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="px-2.5 py-0.5 rounded-full text-xs font-mono font-bold bg-blue-100 text-blue-800 dark:bg-blue-950 dark:text-blue-300">
                    {req.id}
                  </span>
                  <span
                    className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                      req.priority === 'CRITICAL'
                        ? 'bg-rose-100 text-rose-800 dark:bg-rose-950 dark:text-rose-300'
                        : req.priority === 'HIGH'
                        ? 'bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300'
                        : 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300'
                    }`}
                  >
                    {req.priority}
                  </span>
                </div>

                <h4 className="font-extrabold text-gray-900 dark:text-white text-base group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                  {req.title}
                </h4>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1 line-clamp-3 leading-relaxed">
                  {req.description}
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-gray-100 dark:border-gray-800 flex items-center justify-between text-[11px] font-semibold text-blue-600 dark:text-blue-400">
                <span>View Details & Links</span>
                <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          ))}
        </div>
      )}

      {/* NFR Tab Content */}
      {activeTab === 'NFR' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredNFR.map((nfr) => (
            <div key={nfr.id} className="p-5 rounded-2xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 space-y-2">
              <div className="flex items-center justify-between">
                <span className="px-2.5 py-0.5 rounded-full text-xs font-mono font-bold bg-indigo-100 text-indigo-800 dark:bg-indigo-950 dark:text-indigo-300">
                  {nfr.id}
                </span>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300">
                  {nfr.category}
                </span>
              </div>
              <h4 className="font-extrabold text-gray-900 dark:text-white text-base">{nfr.title}</h4>
              <p className="text-xs text-gray-600 dark:text-gray-300 leading-relaxed">{nfr.description}</p>
            </div>
          ))}
        </div>
      )}

      {/* BR Tab Content */}
      {activeTab === 'BR' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {BUSINESS_RULES.map((br) => (
            <div key={br.id} className="p-5 rounded-2xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 space-y-2">
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-0.5 rounded-full text-xs font-mono font-bold bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300">
                  {br.id}
                </span>
                <h4 className="font-extrabold text-gray-900 dark:text-white text-base">{br.rule}</h4>
              </div>
              <p className="text-xs text-gray-600 dark:text-gray-300 leading-relaxed">{br.description}</p>
            </div>
          ))}
        </div>
      )}

      {/* Requirement Details Modal */}
      {selectedReq && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-200">
          <div className="w-full max-w-2xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[85vh]">
            <div className="p-6 bg-gradient-to-r from-blue-600 to-indigo-600 text-white flex items-center justify-between">
              <div>
                <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-white/20 font-mono uppercase">
                  {selectedReq.id} • {selectedReq.priority} PRIORITY
                </span>
                <h3 className="text-2xl font-black mt-1">{selectedReq.title}</h3>
              </div>
              <button onClick={() => setSelectedReq(null)} className="p-1.5 rounded-xl bg-white/10 hover:bg-white/20 transition">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 overflow-y-auto space-y-5 text-xs text-gray-700 dark:text-gray-300">
              <div>
                <h4 className="font-bold text-gray-900 dark:text-white uppercase tracking-wider text-[11px] mb-1">Requirement Specification</h4>
                <p className="leading-relaxed text-gray-600 dark:text-gray-300">{selectedReq.description}</p>
              </div>

              {/* Clickable Related Objects */}
              <div className="space-y-3 pt-3 border-t border-gray-100 dark:border-gray-800">
                <div>
                  <h4 className="font-bold text-gray-900 dark:text-white uppercase tracking-wider text-[11px] mb-2 flex items-center gap-1.5">
                    <Boxes className="w-3.5 h-3.5 text-indigo-500" />
                    Mapped Use Cases
                  </h4>
                  <div className="flex flex-wrap gap-1.5">
                    {selectedReq.relatedUseCases.map((uc) => (
                      <Link
                        key={uc}
                        href="/use-cases"
                        onClick={() => setSelectedReq(null)}
                        className="px-2.5 py-1 rounded-lg bg-indigo-50 dark:bg-indigo-950/80 text-indigo-600 dark:text-indigo-400 font-mono font-bold hover:bg-indigo-100 transition"
                      >
                        {uc}
                      </Link>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="font-bold text-gray-900 dark:text-white uppercase tracking-wider text-[11px] mb-2 flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                    Related Design & Domain Classes
                  </h4>
                  <div className="flex flex-wrap gap-1.5">
                    {selectedReq.relatedClasses.map((cls) => (
                      <Link
                        key={cls}
                        href="/domain-model"
                        onClick={() => setSelectedReq(null)}
                        className="px-2.5 py-1 rounded-lg bg-amber-50 dark:bg-amber-950/80 text-amber-600 dark:text-amber-400 font-semibold hover:bg-amber-100 transition"
                      >
                        {cls}
                      </Link>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="font-bold text-gray-900 dark:text-white uppercase tracking-wider text-[11px] mb-2 flex items-center gap-1.5">
                    <Network className="w-3.5 h-3.5 text-emerald-500" />
                    Linked Diagrams
                  </h4>
                  <div className="flex flex-wrap gap-1.5">
                    {selectedReq.relatedDiagrams.map((diag) => (
                      <Link
                        key={diag}
                        href="/diagrams"
                        onClick={() => setSelectedReq(null)}
                        className="px-2.5 py-1 rounded-lg bg-emerald-50 dark:bg-emerald-950/80 text-emerald-600 dark:text-emerald-400 font-mono font-bold hover:bg-emerald-100 transition"
                      >
                        {diag}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="p-4 bg-gray-50 dark:bg-gray-950 border-t border-gray-100 dark:border-gray-800 flex justify-end">
              <button
                onClick={() => setSelectedReq(null)}
                className="px-5 py-2 rounded-xl bg-gray-200 dark:bg-gray-800 hover:bg-gray-300 dark:hover:bg-gray-700 text-gray-800 dark:text-gray-200 font-bold text-xs transition"
              >
                Close Details
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
