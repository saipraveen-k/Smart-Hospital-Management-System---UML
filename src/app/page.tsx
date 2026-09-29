'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  Activity,
  FlaskConical,
  FileText,
  Boxes,
  Sparkles,
  ShieldCheck,
  ImageIcon,
  Network,
  ArrowRight,
  Compass,
  Presentation,
  CheckCircle2,
  Stethoscope,
  ChevronRight,
  Users,
  Calendar,
  Pill,
  CreditCard,
  BarChart3,
  X
} from 'lucide-react';
import { useDemoStore } from '@/store/demoStore';
import { SYSTEM_MODULES } from '@/data/modules';

export default function DashboardPage() {
  const { setPresentationMode, setDemoTourActive } = useDemoStore();
  const [selectedWorkflowNode, setSelectedWorkflowNode] = useState<string | null>(null);

  const stats = [
    { label: 'Experiments', count: '8', href: '/experiments', icon: <FlaskConical className="w-5 h-5 text-amber-500" />, desc: 'Lab Experiments 1 to 8' },
    { label: 'Functional Reqs', count: '30', href: '/requirements', icon: <FileText className="w-5 h-5 text-blue-500" />, desc: 'FR-01 to FR-30 Specified' },
    { label: 'Non-Functional Reqs', count: '11', href: '/requirements', icon: <ShieldCheck className="w-5 h-5 text-indigo-500" />, desc: 'NFR Latency & Security' },
    { label: 'Use Cases', count: '35', href: '/use-cases', icon: <Boxes className="w-5 h-5 text-purple-500" />, desc: 'Actor Interaction Models' },
    { label: 'Domain Classes', count: '34', href: '/domain-model', icon: <Sparkles className="w-5 h-5 text-emerald-500" />, desc: 'Conceptual Entities' },
    { label: 'Design Classes', count: '42', href: '/design', icon: <ShieldCheck className="w-5 h-5 text-cyan-500" />, desc: 'Operation Signatures & Visibilities' },
    { label: 'UML Diagrams', count: '53+', href: '/diagrams', icon: <ImageIcon className="w-5 h-5 text-rose-500" />, desc: 'Mermaid & StarUML Views' },
    { label: 'Architecture Models', count: '2', href: '/architecture/components', icon: <Network className="w-5 h-5 text-orange-500" />, desc: 'Component & Deployment' }
  ];

  const workflowNodes = [
    { id: 'registration', name: 'Patient Registration', actor: 'Patient / Receptionist', reqs: ['FR-01', 'FR-02'], useCases: ['UC-01', 'UC-11'], color: 'from-blue-500 to-indigo-500' },
    { id: 'appointment', name: 'Appointment Booking', actor: 'Patient / Receptionist', reqs: ['FR-04', 'FR-05'], useCases: ['UC-03', 'UC-13'], color: 'from-indigo-500 to-purple-500' },
    { id: 'checkin', name: 'OP Check-In & Token', actor: 'Patient / Receptionist', reqs: ['FR-06', 'FR-07'], useCases: ['UC-05', 'UC-14'], color: 'from-purple-500 to-pink-500' },
    { id: 'consultation', name: 'Doctor Consultation', actor: 'Doctor', reqs: ['FR-08', 'FR-09', 'FR-10'], useCases: ['UC-20', 'UC-21', 'UC-22'], color: 'from-pink-500 to-rose-500' },
    { id: 'laboratory', name: 'Laboratory Diagnostic', actor: 'Lab Technician / Doctor', reqs: ['FR-11', 'FR-12', 'FR-13', 'FR-14'], useCases: ['UC-23', 'UC-29', 'UC-30', 'UC-31'], color: 'from-amber-500 to-orange-500' },
    { id: 'admission', name: 'Inpatient Admission', actor: 'Doctor / Receptionist', reqs: ['FR-15', 'FR-16', 'FR-17'], useCases: ['UC-16', 'UC-17', 'UC-25'], color: 'from-emerald-500 to-teal-500' },
    { id: 'pharmacy', name: 'Pharmacy Dispensing', actor: 'Pharmacist', reqs: ['FR-18', 'FR-19'], useCases: ['UC-32', 'UC-32a'], color: 'from-teal-500 to-cyan-500' },
    { id: 'billing', name: 'Billing & Settlement', actor: 'Cashier / Patient', reqs: ['FR-20', 'FR-21', 'FR-22'], useCases: ['UC-08', 'UC-33', 'UC-33b'], color: 'from-cyan-500 to-blue-500' },
    { id: 'discharge', name: 'Discharge & Follow-Up', actor: 'Doctor / Receptionist', reqs: ['FR-23', 'FR-24'], useCases: ['UC-18', 'UC-27'], color: 'from-blue-600 to-indigo-600' }
  ];

  const activeNodeDetails = workflowNodes.find((n) => n.id === selectedWorkflowNode);

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* Hero Header Section */}
      <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-gray-900 via-indigo-950 to-blue-950 border border-gray-800 p-8 md:p-12 shadow-2xl">
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-3xl space-y-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-500/20 text-blue-300 border border-blue-500/30 text-xs font-bold tracking-wide uppercase">
            <Sparkles className="w-4 h-4" /> B.Tech OOAD & UML Laboratory Project
          </div>

          <div className="space-y-2">
            <h1 className="text-4xl sm:text-5xl font-black text-white tracking-tight leading-none">
              SMART HOSPITAL <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-300 to-cyan-400">MANAGEMENT SYSTEM</span>
            </h1>
            <p className="text-lg text-blue-200/80 font-medium">
              "An Integrated Object-Oriented Model for Smart Hospital Operations"
            </p>
          </div>

          <p className="text-sm text-gray-300 leading-relaxed">
            A complete interactive web application demonstrating requirements elicitation, use case modeling, domain class analysis, sequence interactions, design class specifications, behavioral activity swimlanes, and component/deployment architecture.
          </p>

          <div className="flex flex-wrap items-center gap-3 pt-2">
            <Link
              href="/demo"
              className="px-5 py-3 rounded-2xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-lg shadow-blue-600/30 transition flex items-center gap-2"
            >
              <Stethoscope className="w-4 h-4" />
              <span>Explore Interactive Demo</span>
            </Link>

            <Link
              href="/diagrams"
              className="px-5 py-3 rounded-2xl bg-gray-800 hover:bg-gray-700 text-gray-200 font-bold text-xs border border-gray-700 transition flex items-center gap-2"
            >
              <ImageIcon className="w-4 h-4 text-emerald-400" />
              <span>View UML Models (53+)</span>
            </Link>

            <Link
              href="/architecture/components"
              className="px-5 py-3 rounded-2xl bg-gray-800 hover:bg-gray-700 text-gray-200 font-bold text-xs border border-gray-700 transition flex items-center gap-2"
            >
              <Network className="w-4 h-4 text-indigo-400" />
              <span>Architecture</span>
            </Link>

            <button
              onClick={() => setPresentationMode(true)}
              className="px-5 py-3 rounded-2xl bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-bold text-xs shadow-lg shadow-indigo-600/20 transition flex items-center gap-2"
            >
              <Presentation className="w-4 h-4" />
              <span>Presentation Mode</span>
            </button>
          </div>
        </div>
      </section>

      {/* Interactive Statistics Grid */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-extrabold text-gray-900 dark:text-white flex items-center gap-2">
            <Activity className="w-5 h-5 text-blue-500" />
            <span>Project Statistics & Metric Coverage</span>
          </h2>
          <span className="text-xs text-gray-500 font-medium">Click any card to explore section</span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((stat, idx) => (
            <Link
              key={idx}
              href={stat.href}
              className="group p-5 rounded-2xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 hover:border-blue-500/50 dark:hover:border-blue-500/50 shadow-sm hover:shadow-xl transition-all duration-200 flex flex-col justify-between"
            >
              <div className="flex items-center justify-between mb-3">
                <div className="p-2.5 rounded-xl bg-gray-100 dark:bg-gray-800 group-hover:scale-110 transition-transform">
                  {stat.icon}
                </div>
                <ArrowRight className="w-4 h-4 text-gray-400 group-hover:text-blue-500 group-hover:translate-x-1 transition-all" />
              </div>
              <div>
                <div className="text-3xl font-black text-gray-900 dark:text-white tracking-tight group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                  {stat.count}
                </div>
                <div className="text-xs font-bold text-gray-800 dark:text-gray-200 mt-1">{stat.label}</div>
                <div className="text-[11px] text-gray-500 dark:text-gray-400 mt-0.5">{stat.desc}</div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Interactive Hospital Workflow Section */}
      <section className="space-y-4 p-6 rounded-3xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 shadow-sm">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-extrabold text-gray-900 dark:text-white flex items-center gap-2">
              <Compass className="w-5 h-5 text-indigo-500" />
              <span>Interactive System Patient Workflow</span>
            </h2>
            <p className="text-xs text-gray-500 mt-0.5">Click any workflow node to inspect responsibilities, actors, requirements, and diagrams.</p>
          </div>
          <button
            onClick={() => setDemoTourActive(true)}
            className="px-3 py-1.5 rounded-xl bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 text-xs font-bold hover:bg-indigo-500/20 transition flex items-center gap-1"
          >
            <Compass className="w-4 h-4" /> Faculty Tour
          </button>
        </div>

        {/* Workflow Node Bar */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-9 gap-2 pt-2">
          {workflowNodes.map((node, index) => (
            <button
              key={node.id}
              onClick={() => setSelectedWorkflowNode(node.id)}
              className={`p-3 rounded-2xl text-left border transition-all flex flex-col justify-between min-h-[95px] ${
                selectedWorkflowNode === node.id
                  ? 'bg-gradient-to-br ' + node.color + ' text-white border-transparent shadow-lg scale-105 font-bold'
                  : 'bg-gray-50 dark:bg-gray-950 border-gray-200 dark:border-gray-800 text-gray-800 dark:text-gray-200 hover:border-blue-500/50'
              }`}
            >
              <span className="text-[10px] opacity-80 font-mono">Step 0{index + 1}</span>
              <span className="text-xs font-bold leading-tight mt-1">{node.name}</span>
              <span className="text-[9px] opacity-75 mt-1 block truncate">{node.actor}</span>
            </button>
          ))}
        </div>

        {/* Workflow Node Details Panel */}
        {activeNodeDetails && (
          <div className="mt-4 p-5 rounded-2xl bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-950/40 dark:to-indigo-950/40 border border-blue-200 dark:border-blue-800/60 animate-in fade-in duration-200 relative">
            <button
              onClick={() => setSelectedWorkflowNode(null)}
              className="absolute top-4 right-4 p-1 rounded-lg text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <span className="px-3 py-1 rounded-full text-xs font-bold bg-blue-600 text-white">
                  Workflow Node: {activeNodeDetails.name}
                </span>
                <span className="text-xs text-gray-600 dark:text-gray-300 font-semibold">
                  Primary Actor: {activeNodeDetails.actor}
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2 text-xs">
                <div className="p-3 rounded-xl bg-white dark:bg-gray-900 border border-blue-100 dark:border-gray-800">
                  <h5 className="font-bold text-gray-900 dark:text-white mb-1">Related Requirements</h5>
                  <div className="flex flex-wrap gap-1">
                    {activeNodeDetails.reqs.map((r) => (
                      <Link key={r} href="/requirements" className="px-2 py-0.5 rounded bg-blue-100 dark:bg-blue-900/60 text-blue-700 dark:text-blue-300 font-mono text-[10px] hover:underline">
                        {r}
                      </Link>
                    ))}
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-white dark:bg-gray-900 border border-blue-100 dark:border-gray-800">
                  <h5 className="font-bold text-gray-900 dark:text-white mb-1">Related Use Cases</h5>
                  <div className="flex flex-wrap gap-1">
                    {activeNodeDetails.useCases.map((uc) => (
                      <Link key={uc} href="/use-cases" className="px-2 py-0.5 rounded bg-indigo-100 dark:bg-indigo-900/60 text-indigo-700 dark:text-indigo-300 font-mono text-[10px] hover:underline">
                        {uc}
                      </Link>
                    ))}
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-white dark:bg-gray-900 border border-blue-100 dark:border-gray-800 flex items-center justify-between">
                  <div>
                    <h5 className="font-bold text-gray-900 dark:text-white">Run Live Demo Module</h5>
                    <p className="text-[11px] text-gray-500">Test live simulated data state</p>
                  </div>
                  <Link
                    href="/demo"
                    className="px-3 py-1.5 rounded-xl bg-blue-600 text-white font-bold text-xs hover:bg-blue-700 transition"
                  >
                    Open Demo
                  </Link>
                </div>
              </div>
            </div>
          </div>
        )}
      </section>

      {/* Subsystem Modules & Quick Actions */}
      <section className="space-y-4">
        <h2 className="text-lg font-extrabold text-gray-900 dark:text-white flex items-center gap-2">
          <Boxes className="w-5 h-5 text-emerald-500" />
          <span>Core Subsystem Modules</span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {SYSTEM_MODULES.slice(0, 8).map((mod) => (
            <Link
              key={mod.id}
              href="/overview"
              className="p-5 rounded-2xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 hover:border-emerald-500/50 shadow-sm hover:shadow-lg transition-all group flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300">
                    {mod.code}
                  </span>
                  <ChevronRight className="w-4 h-4 text-gray-400 group-hover:text-emerald-500 group-hover:translate-x-1 transition-all" />
                </div>
                <h4 className="font-bold text-gray-900 dark:text-white text-sm group-hover:text-emerald-500 transition-colors">
                  {mod.name}
                </h4>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1 line-clamp-2">{mod.description}</p>
              </div>

              <div className="mt-4 pt-3 border-t border-gray-100 dark:border-gray-800 flex items-center justify-between text-[11px] text-gray-400">
                <span>{mod.requirements.length} Reqs</span>
                <span>{mod.useCases.length} Use Cases</span>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
