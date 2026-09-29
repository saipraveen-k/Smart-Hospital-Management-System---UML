'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  Sparkles,
  Search,
  CheckCircle2,
  X,
  Boxes,
  FileText,
  Network,
  ChevronRight,
  Layers
} from 'lucide-react';
import { DOMAIN_CLASSES } from '@/data/domainClasses';
import { DomainClass } from '@/types';
import { DIAGRAMS } from '@/data/diagrams';
import { DiagramViewer } from '@/components/diagrams/DiagramViewer';

export default function DomainModelPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedClass, setSelectedClass] = useState<DomainClass | null>(null);
  const [showDiagram, setShowDiagram] = useState<boolean>(false);

  const domainDiagram = DIAGRAMS.find((d) => d.id === 'EXP4-DM-02');

  const filteredClasses = DOMAIN_CLASSES.filter((c) => {
    const q = searchQuery.toLowerCase();
    return c.name.toLowerCase().includes(q) || c.purpose.toLowerCase().includes(q);
  });

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* Header */}
      <div className="space-y-2 border-b border-gray-200 dark:border-gray-800 pb-5">
        <div className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400 font-bold text-xs uppercase tracking-wider">
          <Sparkles className="w-4 h-4" /> Domain Analysis & Concept Modeling
        </div>
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-black text-gray-900 dark:text-white tracking-tight">
              Interactive Domain Class Explorer (34 Domain Classes)
            </h1>
            <p className="text-sm text-gray-600 dark:text-gray-400 max-w-3xl">
              Conceptual domain entities representing real-world hospital objects, attributes, structural associations, multiplicities, and business constraints.
            </p>
          </div>
          <button
            onClick={() => setShowDiagram(!showDiagram)}
            className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-md transition flex items-center gap-2"
          >
            <Sparkles className="w-4 h-4" />
            <span>{showDiagram ? 'Hide Domain Class Diagram' : 'View Domain Class Diagram'}</span>
          </button>
        </div>
      </div>

      {/* Domain Class Diagram Collapsible Panel */}
      {showDiagram && domainDiagram && (
        <div className="space-y-3 p-4 rounded-3xl bg-gray-900 border border-gray-800">
          <div className="flex items-center justify-between px-2">
            <h3 className="font-extrabold text-white text-base">Formal Domain Class Diagram</h3>
            <span className="text-xs text-gray-400 font-mono">EXP4-DM-02</span>
          </div>
          <DiagramViewer diagram={domainDiagram} />
        </div>
      )}

      {/* Search Bar */}
      <div className="flex items-center justify-between gap-4 p-4 rounded-2xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 shadow-sm">
        <div className="relative flex-1 max-w-md">
          <Search className="w-3.5 h-3.5 absolute left-3 top-2.5 text-gray-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search domain class (Patient, Doctor, Appointment, Bill)..."
            className="w-full pl-8 pr-3 py-1.5 rounded-xl bg-gray-50 dark:bg-gray-950 border border-gray-200 dark:border-gray-800 text-xs text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:border-emerald-500"
          />
        </div>
        <div className="text-xs font-mono text-gray-500 font-semibold">
          Showing {filteredClasses.length} Domain Entities
        </div>
      </div>

      {/* Grid of Domain Classes */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredClasses.map((cls) => (
          <div
            key={cls.name}
            onClick={() => setSelectedClass(cls)}
            className="p-5 rounded-2xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 hover:border-emerald-500/50 shadow-sm hover:shadow-xl transition-all cursor-pointer group flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-2">
                <h4 className="font-extrabold text-gray-900 dark:text-white text-lg group-hover:text-emerald-500 transition-colors">
                  {cls.name}
                </h4>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-mono font-bold bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300">
                  {cls.multiplicity}
                </span>
              </div>
              <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed line-clamp-3">
                {cls.purpose}
              </p>
              <div className="mt-3 text-[11px] text-gray-400">
                Attributes: {cls.attributes.map((a) => a.name).slice(0, 3).join(', ')}...
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-gray-100 dark:border-gray-800 flex items-center justify-between text-[11px] font-semibold text-emerald-600 dark:text-emerald-400">
              <span>Inspect Class Attributes & Associations</span>
              <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>
        ))}
      </div>

      {/* Domain Class Detail Modal */}
      {selectedClass && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-200">
          <div className="w-full max-w-3xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
            <div className="p-6 bg-gradient-to-r from-emerald-600 to-teal-600 text-white flex items-center justify-between">
              <div>
                <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-white/20 font-mono">
                  MULTIPLICITY: {selectedClass.multiplicity}
                </span>
                <h3 className="text-2xl font-black mt-1">{selectedClass.name} Entity</h3>
              </div>
              <button onClick={() => setSelectedClass(null)} className="p-1.5 rounded-xl bg-white/10 hover:bg-white/20 transition">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 overflow-y-auto space-y-6 text-xs text-gray-700 dark:text-gray-300">
              <div>
                <h4 className="font-bold text-gray-900 dark:text-white uppercase tracking-wider text-[11px] mb-1">Entity Purpose</h4>
                <p className="leading-relaxed text-gray-600 dark:text-gray-300">{selectedClass.purpose}</p>
              </div>

              {/* Attributes Table */}
              <div>
                <h4 className="font-bold text-gray-900 dark:text-white uppercase tracking-wider text-[11px] mb-2">Class Attributes</h4>
                <div className="overflow-x-auto rounded-xl border border-gray-200 dark:border-gray-800">
                  <table className="w-full text-left border-collapse text-xs">
                    <thead className="bg-gray-50 dark:bg-gray-950 text-gray-500 font-bold border-b border-gray-200 dark:border-gray-800">
                      <tr>
                        <th className="p-2.5">Attribute Name</th>
                        <th className="p-2.5">Data Type</th>
                        <th className="p-2.5">Description</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100 dark:divide-gray-800 font-mono text-[11px]">
                      {selectedClass.attributes.map((attr, i) => (
                        <tr key={i} className="hover:bg-gray-50/50 dark:hover:bg-gray-850">
                          <td className="p-2.5 font-bold text-emerald-600 dark:text-emerald-400">{attr.name}</td>
                          <td className="p-2.5 text-gray-500">{attr.type}</td>
                          <td className="p-2.5 font-sans text-gray-600 dark:text-gray-300">{attr.description}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Structural Relationships */}
              <div>
                <h4 className="font-bold text-gray-900 dark:text-white uppercase tracking-wider text-[11px] mb-2">Structural Relationships</h4>
                <div className="space-y-1.5">
                  {selectedClass.relationships.map((rel, i) => (
                    <div key={i} className="p-3 rounded-xl bg-gray-50 dark:bg-gray-950 border border-gray-100 dark:border-gray-850 flex items-center justify-between text-xs">
                      <div>
                        <span className="font-bold text-gray-900 dark:text-white">{rel.type}: </span>
                        <span className="font-bold text-emerald-600 dark:text-emerald-400">{rel.target} </span>
                        <span className="text-gray-500">({rel.multiplicity})</span>
                      </div>
                      <span className="text-gray-500 text-[11px]">{rel.description}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Constraints */}
              {selectedClass.constraints.length > 0 && (
                <div>
                  <h4 className="font-bold text-gray-900 dark:text-white uppercase tracking-wider text-[11px] mb-1">Integrity Constraints</h4>
                  <ul className="space-y-1">
                    {selectedClass.constraints.map((c, i) => (
                      <li key={i} className="flex items-start gap-1.5">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0 mt-0.5" />
                        <span>{c}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Clickable Mapped Objects */}
              <div className="space-y-3 pt-3 border-t border-gray-100 dark:border-gray-800">
                <div>
                  <h4 className="font-bold text-gray-900 dark:text-white uppercase tracking-wider text-[11px] mb-2">Mapped Requirements</h4>
                  <div className="flex flex-wrap gap-1.5">
                    {selectedClass.relatedRequirements.map((r) => (
                      <Link key={r} href="/requirements" onClick={() => setSelectedClass(null)} className="px-2.5 py-1 rounded bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-300 font-mono font-bold">
                        {r}
                      </Link>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="font-bold text-gray-900 dark:text-white uppercase tracking-wider text-[11px] mb-2">Mapped Use Cases</h4>
                  <div className="flex flex-wrap gap-1.5">
                    {selectedClass.relatedUseCases.map((uc) => (
                      <Link key={uc} href="/use-cases" onClick={() => setSelectedClass(null)} className="px-2.5 py-1 rounded bg-indigo-100 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-300 font-mono font-bold">
                        {uc}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="p-4 bg-gray-50 dark:bg-gray-950 border-t border-gray-100 dark:border-gray-800 flex justify-end">
              <button
                onClick={() => setSelectedClass(null)}
                className="px-5 py-2 rounded-xl bg-gray-200 dark:bg-gray-800 hover:bg-gray-300 dark:hover:bg-gray-700 text-gray-800 dark:text-gray-200 font-bold text-xs transition"
              >
                Close Class Details
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
