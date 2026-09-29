'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Boxes, Search, CheckCircle2, X, ArrowRight, Layers, Sparkles } from 'lucide-react';
import { COMPONENT_ITEMS, COMPONENT_MERMAID_CODE } from '@/data/architecture';
import { ComponentItem } from '@/types';
import { MermaidRenderer } from '@/components/diagrams/MermaidRenderer';

export default function ComponentArchitecturePage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedComponent, setSelectedComponent] = useState<ComponentItem | null>(null);

  const filteredComponents = COMPONENT_ITEMS.filter((c) => {
    const q = searchQuery.toLowerCase();
    return c.name.toLowerCase().includes(q) || c.purpose.toLowerCase().includes(q) || c.type.toLowerCase().includes(q);
  });

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* Header */}
      <div className="space-y-2 border-b border-gray-200 dark:border-gray-800 pb-5">
        <div className="flex items-center gap-2 text-indigo-600 dark:text-indigo-400 font-bold text-xs uppercase tracking-wider">
          <Boxes className="w-4 h-4" /> Component Architecture & Subsystems
        </div>
        <h1 className="text-3xl font-black text-gray-900 dark:text-white tracking-tight">
          Component Architecture Diagram & Component Catalog
        </h1>
        <p className="text-sm text-gray-600 dark:text-gray-400 max-w-3xl">
          Complete component model depicting 15 physical/logical software components, provided interfaces, and structural subsystem dependencies.
        </p>
      </div>

      {/* Component Diagram Canvas */}
      <section className="p-5 rounded-3xl bg-gray-900 border border-gray-800 space-y-3">
        <div className="flex items-center justify-between px-2">
          <h3 className="font-extrabold text-white text-base">UML Component Diagram</h3>
          <span className="text-xs text-gray-400 font-mono">Component Architecture</span>
        </div>
        <MermaidRenderer chart={COMPONENT_MERMAID_CODE} />
      </section>

      {/* Search Bar */}
      <div className="flex items-center justify-between gap-4 p-4 rounded-2xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 shadow-sm">
        <div className="relative flex-1 max-w-md">
          <Search className="w-3.5 h-3.5 absolute left-3 top-2.5 text-gray-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search components (Patient Portal, Lab, Billing, Auth)..."
            className="w-full pl-8 pr-3 py-1.5 rounded-xl bg-gray-50 dark:bg-gray-950 border border-gray-200 dark:border-gray-800 text-xs text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:border-indigo-500"
          />
        </div>
        <div className="text-xs font-mono text-gray-500 font-semibold">
          Showing {filteredComponents.length} Components
        </div>
      </div>

      {/* Grid of Clickable Component Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredComponents.map((comp) => (
          <div
            key={comp.id}
            onClick={() => setSelectedComponent(comp)}
            className="p-5 rounded-2xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 hover:border-indigo-500/50 shadow-sm hover:shadow-xl transition-all cursor-pointer group flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="px-2.5 py-0.5 rounded-full text-xs font-mono font-bold bg-indigo-100 text-indigo-800 dark:bg-indigo-950 dark:text-indigo-300">
                  {comp.id}
                </span>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300">
                  {comp.type}
                </span>
              </div>
              <h4 className="font-extrabold text-gray-900 dark:text-white text-base group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                {comp.name}
              </h4>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1 line-clamp-2 leading-relaxed">
                {comp.purpose}
              </p>
            </div>

            <div className="mt-4 pt-3 border-t border-gray-100 dark:border-gray-800 flex items-center justify-between text-[11px] font-semibold text-indigo-600 dark:text-indigo-400">
              <span>View Interfaces & Dependencies</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>
        ))}
      </div>

      {/* Component Detail Modal */}
      {selectedComponent && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-200">
          <div className="w-full max-w-3xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
            <div className="p-6 bg-gradient-to-r from-indigo-600 to-blue-600 text-white flex items-center justify-between">
              <div>
                <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-white/20 font-mono uppercase">
                  {selectedComponent.id} • {selectedComponent.type}
                </span>
                <h3 className="text-2xl font-black mt-1">{selectedComponent.name}</h3>
              </div>
              <button onClick={() => setSelectedComponent(null)} className="p-1.5 rounded-xl bg-white/10 hover:bg-white/20 transition">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 overflow-y-auto space-y-5 text-xs text-gray-700 dark:text-gray-300">
              <div>
                <h4 className="font-bold text-gray-900 dark:text-white uppercase tracking-wider text-[11px] mb-1">Component Purpose</h4>
                <p className="leading-relaxed text-gray-600 dark:text-gray-300">{selectedComponent.purpose}</p>
              </div>

              <div>
                <h4 className="font-bold text-gray-900 dark:text-white uppercase tracking-wider text-[11px] mb-2">Key Responsibilities</h4>
                <ul className="space-y-1">
                  {selectedComponent.responsibilities.map((r, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                      <span>{r}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2 border-t border-gray-100 dark:border-gray-800">
                <div className="p-3.5 rounded-xl bg-gray-50 dark:bg-gray-950 border border-gray-100 dark:border-gray-850">
                  <h4 className="font-bold text-gray-900 dark:text-white uppercase tracking-wider text-[11px] mb-1">Provided Interfaces</h4>
                  <div className="flex flex-wrap gap-1">
                    {selectedComponent.providedInterfaces.map((iface) => (
                      <span key={iface} className="px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300 font-mono text-[10px] font-bold">
                        {iface}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="p-3.5 rounded-xl bg-gray-50 dark:bg-gray-950 border border-gray-100 dark:border-gray-850">
                  <h4 className="font-bold text-gray-900 dark:text-white uppercase tracking-wider text-[11px] mb-1">Dependencies</h4>
                  <div className="flex flex-wrap gap-1">
                    {selectedComponent.dependencies.map((dep) => (
                      <span key={dep} className="px-2 py-0.5 rounded bg-indigo-100 text-indigo-800 dark:bg-indigo-950 dark:text-indigo-300 font-mono text-[10px] font-bold">
                        {dep}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="space-y-2 pt-2 border-t border-gray-100 dark:border-gray-800">
                <div>
                  <h4 className="font-bold text-gray-900 dark:text-white uppercase tracking-wider text-[11px] mb-1">Mapped Requirements</h4>
                  <div className="flex flex-wrap gap-1">
                    {selectedComponent.relatedRequirements.map((r) => (
                      <Link key={r} href="/requirements" onClick={() => setSelectedComponent(null)} className="px-2 py-0.5 rounded bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-300 font-mono font-bold">
                        {r}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="p-4 bg-gray-50 dark:bg-gray-950 border-t border-gray-100 dark:border-gray-800 flex justify-end">
              <button
                onClick={() => setSelectedComponent(null)}
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
