'use client';

import React from 'react';
import Link from 'next/link';
import { Layers, Boxes, Network, ArrowRight, CheckCircle2 } from 'lucide-react';
import { MermaidRenderer } from '@/components/diagrams/MermaidRenderer';
import { DIAGRAMS } from '@/data/diagrams';
import { DiagramViewer } from '@/components/diagrams/DiagramViewer';

export default function ArchitecturePage() {
  const bceDiagram = DIAGRAMS.find((d) => d.id === 'EXP6-BCE-01');

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* Header */}
      <div className="space-y-2 border-b border-gray-200 dark:border-gray-800 pb-5">
        <div className="flex items-center gap-2 text-indigo-600 dark:text-indigo-400 font-bold text-xs uppercase tracking-wider">
          <Layers className="w-4 h-4" /> System Architecture & Architectural Patterns
        </div>
        <h1 className="text-3xl font-black text-gray-900 dark:text-white tracking-tight">
          3-Layer BCE System Architecture Overview
        </h1>
        <p className="text-sm text-gray-600 dark:text-gray-400 max-w-3xl">
          Architectural breakdown of the Smart Hospital Management System across Boundary UI Layer, Control Business Logic Layer, and Entity Domain Persistence Layer.
        </p>
      </div>

      {/* Quick Sub-Navigation Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Link
          href="/architecture/components"
          className="p-6 rounded-3xl bg-gradient-to-br from-indigo-900 to-blue-900 text-white border border-indigo-700 hover:scale-[1.01] transition shadow-lg group flex items-center justify-between"
        >
          <div>
            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-white/20 uppercase font-mono">
              COMPONENT ARCHITECTURE
            </span>
            <h3 className="text-2xl font-black mt-2">15 Component Subsystems</h3>
            <p className="text-xs text-blue-200 mt-1">Provided interfaces, responsibilities & dependencies</p>
          </div>
          <ArrowRight className="w-6 h-6 text-blue-300 group-hover:translate-x-2 transition-transform" />
        </Link>

        <Link
          href="/architecture/deployment"
          className="p-6 rounded-3xl bg-gradient-to-br from-purple-900 to-indigo-900 text-white border border-purple-700 hover:scale-[1.01] transition shadow-lg group flex items-center justify-between"
        >
          <div>
            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-white/20 uppercase font-mono">
              DEPLOYMENT ARCHITECTURE
            </span>
            <h3 className="text-2xl font-black mt-2">15 Hardware & Server Nodes</h3>
            <p className="text-xs text-purple-200 mt-1">Client workstations, app clusters & network VLANs</p>
          </div>
          <ArrowRight className="w-6 h-6 text-purple-300 group-hover:translate-x-2 transition-transform" />
        </Link>
      </div>

      {/* BCE 3-Layer Diagram Section */}
      <section className="space-y-4">
        <h2 className="text-lg font-extrabold text-gray-900 dark:text-white">
          Boundary-Control-Entity (BCE) Architectural Pattern
        </h2>
        {bceDiagram && <DiagramViewer diagram={bceDiagram} />}
      </section>
    </div>
  );
}
