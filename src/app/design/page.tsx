'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  ShieldCheck,
  Search,
  Filter,
  CheckCircle2,
  X,
  Boxes,
  FileText,
  Sparkles,
  ChevronRight,
  Layers
} from 'lucide-react';
import { DESIGN_CLASSES } from '@/data/designClasses';
import { DesignClass } from '@/types';
import { DIAGRAMS } from '@/data/diagrams';
import { DiagramViewer } from '@/components/diagrams/DiagramViewer';

export default function DesignClassPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [layerFilter, setLayerFilter] = useState<string>('ALL');
  const [selectedClass, setSelectedClass] = useState<DesignClass | null>(null);
  const [showDiagram, setShowDiagram] = useState<boolean>(false);

  const designDiagram = DIAGRAMS.find((d) => d.id === 'EXP7-DCD-01');

  const filteredClasses = DESIGN_CLASSES.filter((c) => {
    const q = searchQuery.toLowerCase();
    const matchesSearch = c.name.toLowerCase().includes(q) || c.purpose.toLowerCase().includes(q) || c.package.toLowerCase().includes(q);
    const matchesLayer = layerFilter === 'ALL' || c.layer === layerFilter;
    return matchesSearch && matchesLayer;
  });

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* Header */}
      <div className="space-y-2 border-b border-gray-200 dark:border-gray-800 pb-5">
        <div className="flex items-center gap-2 text-cyan-600 dark:text-cyan-400 font-bold text-xs uppercase tracking-wider">
          <ShieldCheck className="w-4 h-4" /> Detailed Object Design & Software Classes
        </div>
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-black text-gray-900 dark:text-white tracking-tight">
              Design Class Model (42 Software Classes)
            </h1>
            <p className="text-sm text-gray-600 dark:text-gray-400 max-w-3xl">
              Implementation-ready software design classes complete with data types, operation visibilities (+, -, #), method parameters, return types, interfaces, and dependencies.
            </p>
          </div>
          <button
            onClick={() => setShowDiagram(!showDiagram)}
            className="px-4 py-2 rounded-xl bg-cyan-600 hover:bg-cyan-700 text-white font-bold text-xs shadow-md transition flex items-center gap-2"
          >
            <ShieldCheck className="w-4 h-4" />
            <span>{showDiagram ? 'Hide Design Diagram' : 'View Master Design Class Diagram'}</span>
          </button>
        </div>
      </div>

      {/* Master Design Class Diagram Collapsible Panel */}
      {showDiagram && designDiagram && (
        <div className="space-y-3 p-4 rounded-3xl bg-gray-900 border border-gray-800">
          <div className="flex items-center justify-between px-2">
            <h3 className="font-extrabold text-white text-base">Master Design Class Diagram</h3>
            <span className="text-xs text-gray-400 font-mono">EXP7-DCD-01</span>
          </div>
          <DiagramViewer diagram={designDiagram} />
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
              placeholder="Search design class (Controller, UI, PaymentProcessor)..."
              className="w-full pl-8 pr-3 py-1.5 rounded-xl bg-gray-50 dark:bg-gray-950 border border-gray-200 dark:border-gray-800 text-xs text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:border-cyan-500"
            />
          </div>

          <select
            value={layerFilter}
            onChange={(e) => setLayerFilter(e.target.value)}
            className="px-3 py-1.5 rounded-xl bg-gray-50 dark:bg-gray-950 border border-gray-200 dark:border-gray-800 text-xs font-medium text-gray-700 dark:text-gray-300 focus:outline-none"
          >
            <option value="ALL">All Layers</option>
            <option value="Boundary">Boundary Layer (UI)</option>
            <option value="Control">Control Layer (Business Logic)</option>
            <option value="Entity">Entity Layer (Domain Models)</option>
            <option value="Interface">Interface Layer (Gateways)</option>
          </select>
        </div>

        <div className="text-xs font-mono text-gray-500 font-semibold">
          Showing {filteredClasses.length} Design Classes
        </div>
      </div>

      {/* Grid of Design Classes */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredClasses.map((cls) => (
          <div
            key={cls.name}
            onClick={() => setSelectedClass(cls)}
            className="p-5 rounded-2xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 hover:border-cyan-500/50 shadow-sm hover:shadow-xl transition-all cursor-pointer group flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-2">
                <h4 className="font-extrabold text-gray-900 dark:text-white text-base group-hover:text-cyan-500 transition-colors">
                  {cls.name}
                </h4>
                <span
                  className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                    cls.layer === 'Boundary'
                      ? 'bg-blue-100 text-blue-800 dark:bg-blue-950 dark:text-blue-300'
                      : cls.layer === 'Control'
                      ? 'bg-indigo-100 text-indigo-800 dark:bg-indigo-950 dark:text-indigo-300'
                      : cls.layer === 'Interface'
                      ? 'bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300'
                      : 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300'
                  }`}
                >
                  {cls.layer}
                </span>
              </div>
              <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed line-clamp-2">
                {cls.purpose}
              </p>
              <div className="mt-3 text-[11px] font-mono text-gray-400">
                Methods: {cls.methods.map((m) => m.name).slice(0, 2).join(', ')}...
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-gray-100 dark:border-gray-800 flex items-center justify-between text-[11px] font-semibold text-cyan-600 dark:text-cyan-400">
              <span>View Full Operations & Visibility Contract</span>
              <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>
        ))}
      </div>

      {/* Design Class Detail Modal */}
      {selectedClass && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-200">
          <div className="w-full max-w-3xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
            <div className="p-6 bg-gradient-to-r from-cyan-600 to-blue-600 text-white flex items-center justify-between">
              <div>
                <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-white/20 uppercase font-mono">
                  {selectedClass.layer} LAYER • {selectedClass.package}
                </span>
                <h3 className="text-2xl font-black mt-1">{selectedClass.name}</h3>
              </div>
              <button onClick={() => setSelectedClass(null)} className="p-1.5 rounded-xl bg-white/10 hover:bg-white/20 transition">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 overflow-y-auto space-y-6 text-xs text-gray-700 dark:text-gray-300">
              <div>
                <h4 className="font-bold text-gray-900 dark:text-white uppercase tracking-wider text-[11px] mb-1">Software Class Purpose</h4>
                <p className="leading-relaxed text-gray-600 dark:text-gray-300">{selectedClass.purpose}</p>
              </div>

              {/* Operations Table */}
              <div>
                <h4 className="font-bold text-gray-900 dark:text-white uppercase tracking-wider text-[11px] mb-2">Class Operations & Methods</h4>
                <div className="overflow-x-auto rounded-xl border border-gray-200 dark:border-gray-800">
                  <table className="w-full text-left border-collapse text-xs">
                    <thead className="bg-gray-50 dark:bg-gray-950 text-gray-500 font-bold border-b border-gray-200 dark:border-gray-800">
                      <tr>
                        <th className="p-2.5">Access</th>
                        <th className="p-2.5">Method Signature</th>
                        <th className="p-2.5">Return Type</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100 dark:divide-gray-800 font-mono text-[11px]">
                      {selectedClass.methods.map((method, i) => (
                        <tr key={i} className="hover:bg-gray-50/50 dark:hover:bg-gray-850">
                          <td className="p-2.5 font-bold text-cyan-600 dark:text-cyan-400">{method.visibility}</td>
                          <td className="p-2.5 text-gray-900 dark:text-white font-bold">{method.name}({method.parameters})</td>
                          <td className="p-2.5 text-gray-500">{method.returnType}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Attributes Table */}
              {selectedClass.attributes.length > 0 && (
                <div>
                  <h4 className="font-bold text-gray-900 dark:text-white uppercase tracking-wider text-[11px] mb-2">Class Fields & Attributes</h4>
                  <div className="overflow-x-auto rounded-xl border border-gray-200 dark:border-gray-800">
                    <table className="w-full text-left border-collapse text-xs">
                      <thead className="bg-gray-50 dark:bg-gray-950 text-gray-500 font-bold border-b border-gray-200 dark:border-gray-800">
                        <tr>
                          <th className="p-2.5">Access</th>
                          <th className="p-2.5">Field Name</th>
                          <th className="p-2.5">Type</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-100 dark:divide-gray-800 font-mono text-[11px]">
                        {selectedClass.attributes.map((attr, i) => (
                          <tr key={i} className="hover:bg-gray-50/50 dark:hover:bg-gray-850">
                            <td className="p-2.5 font-bold text-cyan-600 dark:text-cyan-400">{attr.visibility}</td>
                            <td className="p-2.5 text-gray-900 dark:text-white">{attr.name}</td>
                            <td className="p-2.5 text-gray-500">{attr.type}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {/* Mapped Objects */}
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
