'use client';

import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import {
  ChevronLeft,
  ChevronRight,
  X,
  Presentation,
  CheckCircle2,
  Sparkles,
  Maximize2,
  Layers,
  ArrowRight
} from 'lucide-react';
import { useDemoStore } from '@/store/demoStore';
import { MermaidRenderer } from '../diagrams/MermaidRenderer';
import { DIAGRAMS } from '@/data/diagrams';

interface Slide {
  id: number;
  title: string;
  subtitle: string;
  category: string;
  content: React.ReactNode;
  route: string;
}

export const PresentationModeModal: React.FC = () => {
  const router = useRouter();
  const {
    isPresentationMode,
    setPresentationMode,
    presentationSlideIndex,
    setPresentationSlideIndex
  } = useDemoStore();

  const slides: Slide[] = [
    {
      id: 1,
      title: 'SMART HOSPITAL MANAGEMENT SYSTEM (SHMS)',
      subtitle: 'An Integrated Object-Oriented Model for Smart Hospital Operations',
      category: 'PROJECT OVERVIEW',
      route: '/overview',
      content: (
        <div className="space-y-6 text-center max-w-3xl">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-500/20 text-blue-400 font-bold text-xs border border-blue-500/30">
            <Sparkles className="w-4 h-4" /> B.TECH OOAD / UML LABORATORY DEMONSTRATION
          </div>
          <h1 className="text-4xl md:text-5xl font-black text-white tracking-tight leading-tight">
            Object-Oriented Analysis & Design Model
          </h1>
          <p className="text-gray-300 text-lg leading-relaxed">
            A complete 9-phase software engineering portal covering requirements, use cases, domain entities, object interactions, design class diagrams, activity flows, state machines, component architecture, and deployment nodes.
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-6">
            <div className="p-4 rounded-2xl bg-gray-900/80 border border-gray-800 text-center">
              <div className="text-3xl font-extrabold text-blue-400">30</div>
              <div className="text-xs text-gray-400 font-medium">Functional Reqs</div>
            </div>
            <div className="p-4 rounded-2xl bg-gray-900/80 border border-gray-800 text-center">
              <div className="text-3xl font-extrabold text-indigo-400">35</div>
              <div className="text-xs text-gray-400 font-medium">Use Cases</div>
            </div>
            <div className="p-4 rounded-2xl bg-gray-900/80 border border-gray-800 text-center">
              <div className="text-3xl font-extrabold text-amber-400">34</div>
              <div className="text-xs text-gray-400 font-medium">Domain Classes</div>
            </div>
            <div className="p-4 rounded-2xl bg-gray-900/80 border border-gray-800 text-center">
              <div className="text-3xl font-extrabold text-emerald-400">53+</div>
              <div className="text-xs text-gray-400 font-medium">UML Diagrams</div>
            </div>
          </div>
        </div>
      )
    },
    {
      id: 2,
      title: '7 Key System Actors & 8 Operational Modules',
      subtitle: 'Actor Elicitation & Subsystem Package Boundaries',
      category: 'ACTORS & MODULES',
      route: '/overview',
      content: (
        <div className="space-y-6 w-full max-w-4xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-5 rounded-2xl bg-gray-900 border border-gray-800">
              <h4 className="text-sm font-bold text-blue-400 uppercase tracking-wider mb-3">Primary & Supporting Actors</h4>
              <ul className="space-y-2 text-xs text-gray-300">
                <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" /> <strong className="text-white">Patient:</strong> Self-registration, booking, lab reports, payments</li>
                <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" /> <strong className="text-white">Receptionist:</strong> Walk-in registration, check-in, queue tokens, bed allocation</li>
                <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" /> <strong className="text-white">Doctor:</strong> Consultations, diagnosis, electronic prescriptions, lab orders</li>
                <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" /> <strong className="text-white">Lab Technician:</strong> Specimen barcodes, analyzer result entry, report approval</li>
                <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" /> <strong className="text-white">Pharmacist:</strong> Prescription verification, drug dispensing, inventory sync</li>
                <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" /> <strong className="text-white">Cashier:</strong> Bill consolidation, payment gateway settlement, receipts</li>
              </ul>
            </div>

            <div className="p-5 rounded-2xl bg-gray-900 border border-gray-800">
              <h4 className="text-sm font-bold text-indigo-400 uppercase tracking-wider mb-3">8 Core System Subsystems</h4>
              <div className="grid grid-cols-2 gap-2 text-xs font-semibold text-gray-200">
                <div className="p-2.5 rounded-xl bg-gray-800/60 border border-gray-700">1. Patient Registration</div>
                <div className="p-2.5 rounded-xl bg-gray-800/60 border border-gray-700">2. Appointment & OP</div>
                <div className="p-2.5 rounded-xl bg-gray-800/60 border border-gray-700">3. Inpatient (IP) Care</div>
                <div className="p-2.5 rounded-xl bg-gray-800/60 border border-gray-700">4. Laboratory Diagnostics</div>
                <div className="p-2.5 rounded-xl bg-gray-800/60 border border-gray-700">5. Pharmacy & Stock</div>
                <div className="p-2.5 rounded-xl bg-gray-800/60 border border-gray-700">6. Billing & Payment</div>
                <div className="p-2.5 rounded-xl bg-gray-800/60 border border-gray-700">7. Executive Analytics</div>
                <div className="p-2.5 rounded-xl bg-gray-800/60 border border-gray-700">8. Security & RBAC</div>
              </div>
            </div>
          </div>
        </div>
      )
    },
    {
      id: 3,
      title: 'Requirements Specification (30 FRs & 11 NFRs)',
      subtitle: 'IEEE 830 Requirement Engineering & Business Rules',
      category: 'REQUIREMENTS',
      route: '/requirements',
      content: (
        <div className="space-y-4 max-w-4xl text-left">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <div className="p-4 rounded-xl bg-gray-900 border border-blue-500/30">
              <h5 className="font-bold text-blue-400 text-xs uppercase mb-1">Critical Functional Reqs</h5>
              <p className="text-xs text-gray-300">FR-01 Patient Registration, FR-04 Appointment Booking, FR-08 Doctor Consultation, FR-11 Lab Requisition, FR-18 Pharmacy Dispensing, FR-20 Billing.</p>
            </div>
            <div className="p-4 rounded-xl bg-gray-900 border border-indigo-500/30">
              <h5 className="font-bold text-indigo-400 text-xs uppercase mb-1">Non-Functional Metrics</h5>
              <p className="text-xs text-gray-300">NFR-01 &lt; 1.5s UI Latency, NFR-02 99.9% Uptime, NFR-03 AES-256 / TLS 1.3 HIPAA Security, NFR-06 ACID Integrity.</p>
            </div>
            <div className="p-4 rounded-xl bg-gray-900 border border-emerald-500/30">
              <h5 className="font-bold text-emerald-400 text-xs uppercase mb-1">Enforced Business Rules</h5>
              <p className="text-xs text-gray-300">BR-01 Unique UHID, BR-04 Pathologist Sign-Off, BR-05 Stock Alert Sync, BR-07 Zero Balance Discharge Clearance.</p>
            </div>
          </div>
        </div>
      )
    },
    {
      id: 4,
      title: 'Master Use Case Model (35 Use Cases)',
      subtitle: 'Actor Interaction Boundaries with Include & Extend Dependencies',
      category: 'USE CASES',
      route: '/use-cases',
      content: (
        <div className="w-full max-w-4xl bg-gray-900 p-4 rounded-2xl border border-gray-800">
          <MermaidRenderer chart={DIAGRAMS.find((d) => d.id === 'EXP3-UC-01')?.mermaidCode || ''} />
        </div>
      )
    },
    {
      id: 5,
      title: 'Formal Domain Class Model (34 Entities)',
      subtitle: 'Conceptual Domain Entities, Multiplicities & Constraints',
      category: 'DOMAIN MODEL',
      route: '/domain-model',
      content: (
        <div className="w-full max-w-4xl bg-gray-900 p-4 rounded-2xl border border-gray-800">
          <MermaidRenderer chart={DIAGRAMS.find((d) => d.id === 'EXP4-DM-02')?.mermaidCode || ''} />
        </div>
      )
    },
    {
      id: 6,
      title: 'System Sequence Diagrams (SSDs)',
      subtitle: 'Black-Box Temporal Interaction Modeling across Core Scenarios',
      category: 'SEQUENCE MODELS',
      route: '/interactions',
      content: (
        <div className="w-full max-w-4xl bg-gray-900 p-4 rounded-2xl border border-gray-800">
          <MermaidRenderer chart={DIAGRAMS.find((d) => d.id === 'EXP5-SSD-01')?.mermaidCode || ''} />
        </div>
      )
    },
    {
      id: 7,
      title: '3-Layer BCE Architecture',
      subtitle: 'Boundary-Control-Entity Layer Partitioning for Low Coupling',
      category: 'BCE ARCHITECTURE',
      route: '/architecture',
      content: (
        <div className="w-full max-w-4xl bg-gray-900 p-4 rounded-2xl border border-gray-800">
          <MermaidRenderer chart={DIAGRAMS.find((d) => d.id === 'EXP6-BCE-01')?.mermaidCode || ''} />
        </div>
      )
    },
    {
      id: 8,
      title: 'Master Design Class Diagram (42 Software Classes)',
      subtitle: 'Complete Operation Signatures, Data Types & Visibilities',
      category: 'DESIGN CLASSES',
      route: '/design',
      content: (
        <div className="w-full max-w-4xl bg-gray-900 p-4 rounded-2xl border border-gray-800">
          <MermaidRenderer chart={DIAGRAMS.find((d) => d.id === 'EXP7-DCD-01')?.mermaidCode || ''} />
        </div>
      )
    },
    {
      id: 9,
      title: 'Interfaces & Strategy Patterns (DIP Realization)',
      subtitle: 'Abstract PaymentProcessor & NotificationService Contracts',
      category: 'DESIGN PATTERNS',
      route: '/design',
      content: (
        <div className="w-full max-w-4xl bg-gray-900 p-4 rounded-2xl border border-gray-800">
          <MermaidRenderer chart={DIAGRAMS.find((d) => d.id === 'EXP7-INT-01')?.mermaidCode || ''} />
        </div>
      )
    },
    {
      id: 10,
      title: 'Master Hospital Workflow Activity Model',
      subtitle: 'Swimlane Procedural Flow from Intake to Discharge',
      category: 'BEHAVIOURAL MODELS',
      route: '/behaviour',
      content: (
        <div className="w-full max-w-4xl bg-gray-900 p-4 rounded-2xl border border-gray-800">
          <MermaidRenderer chart={DIAGRAMS.find((d) => d.id === 'EXP8-ACT-09')?.mermaidCode || ''} />
        </div>
      )
    },
    {
      id: 11,
      title: 'Finite State Machine Models',
      subtitle: 'State Transition Lifecycle for Appointments, Lab Tests, & Admissions',
      category: 'STATE MACHINES',
      route: '/behaviour',
      content: (
        <div className="w-full max-w-4xl bg-gray-900 p-4 rounded-2xl border border-gray-800">
          <MermaidRenderer chart={DIAGRAMS.find((d) => d.id === 'EXP8-STM-01')?.mermaidCode || ''} />
        </div>
      )
    },
    {
      id: 12,
      title: 'Component & Deployment Architecture',
      subtitle: 'Physical Hardware Nodes, Subsystems & Communication Protocols',
      category: 'ARCHITECTURE',
      route: '/architecture/components',
      content: (
        <div className="w-full max-w-4xl bg-gray-900 p-4 rounded-2xl border border-gray-800 text-center">
          <h4 className="text-sm font-bold text-blue-400 mb-2">15 Components & 15 Deployment Nodes</h4>
          <p className="text-xs text-gray-300">Client Devices, Workstations, Load Balancers, Application Server Cluster, Database Nodes, Payment Gateway & Telecom Adapters.</p>
        </div>
      )
    },
    {
      id: 13,
      title: 'Requirement Traceability Matrix (RTM)',
      subtitle: 'Zero Missing Requirements: FR -> Use Case -> Class -> Sequence -> State',
      category: 'TRACEABILITY',
      route: '/traceability',
      content: (
        <div className="space-y-4 max-w-3xl text-center">
          <div className="p-6 rounded-2xl bg-gray-900 border border-gray-800">
            <h4 className="text-lg font-bold text-emerald-400 mb-2">100% Traceability Verification</h4>
            <p className="text-sm text-gray-300">
              Every Functional Requirement (FR-01 to FR-30) maps forward through Use Cases, Domain Entities, Sequence Interactions, Design Classes, Activity Swimlanes, and State Machines.
            </p>
          </div>
          <button
            onClick={() => {
              setPresentationMode(false);
              router.push('/demo');
            }}
            className="px-6 py-3 rounded-2xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm shadow-xl transition inline-flex items-center gap-2"
          >
            <span>Launch Live Interactive Hospital Demo</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      )
    }
  ];

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isPresentationMode) return;
      if (e.key === 'ArrowRight' || e.key === 'Space') {
        e.preventDefault();
        setPresentationSlideIndex((prev) => Math.min(slides.length - 1, prev + 1));
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault();
        setPresentationSlideIndex((prev) => Math.max(0, prev - 1));
      } else if (e.key === 'Escape') {
        setPresentationMode(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isPresentationMode, slides.length, setPresentationMode, setPresentationSlideIndex]);

  if (!isPresentationMode) return null;

  const currentSlide = slides[presentationSlideIndex] || slides[0];

  return (
    <div className="fixed inset-0 z-50 bg-gray-950 text-white flex flex-col justify-between p-6 overflow-hidden animate-in fade-in duration-200">
      {/* Top Header */}
      <div className="flex items-center justify-between border-b border-gray-800/80 pb-4">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-xl bg-blue-500/10 text-blue-400 border border-blue-500/20">
            <Presentation className="w-5 h-5" />
          </div>
          <div>
            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-blue-500/20 text-blue-300 uppercase tracking-wider">
              {currentSlide.category}
            </span>
            <h2 className="font-extrabold text-white text-lg tracking-tight mt-0.5">{currentSlide.title}</h2>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <span className="text-xs font-mono text-gray-400 font-semibold">
            Slide {presentationSlideIndex + 1} / {slides.length}
          </span>
          <button
            onClick={() => setPresentationMode(false)}
            className="p-2 rounded-xl bg-gray-900 hover:bg-gray-800 text-gray-400 hover:text-white transition border border-gray-800"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Main Slide Content Area */}
      <div className="flex-1 flex flex-col items-center justify-center py-6 overflow-y-auto px-4">
        <div className="mb-4 text-center max-w-2xl">
          <p className="text-gray-400 text-sm font-medium">{currentSlide.subtitle}</p>
        </div>
        {currentSlide.content}
      </div>

      {/* Footer Navigation Bar */}
      <div className="border-t border-gray-800/80 pt-4 flex items-center justify-between">
        <div className="text-xs text-gray-500 font-mono hidden sm:block">
          Use ← → Arrow Keys or Space to Navigate | ESC to Exit
        </div>

        {/* Progress Bar */}
        <div className="flex items-center gap-1.5 flex-1 max-w-xs mx-4">
          {slides.map((s, idx) => (
            <div
              key={s.id}
              onClick={() => setPresentationSlideIndex(idx)}
              className={`h-1.5 rounded-full transition-all cursor-pointer ${
                idx === presentationSlideIndex
                  ? 'bg-blue-500 w-6'
                  : idx < presentationSlideIndex
                  ? 'bg-blue-900 w-2'
                  : 'bg-gray-800 w-2'
              }`}
            />
          ))}
        </div>

        {/* Slide Controls */}
        <div className="flex items-center gap-2">
          <button
            disabled={presentationSlideIndex === 0}
            onClick={() => setPresentationSlideIndex((prev) => Math.max(0, prev - 1))}
            className="px-4 py-2 rounded-xl bg-gray-900 hover:bg-gray-800 disabled:opacity-30 disabled:pointer-events-none text-xs font-semibold flex items-center gap-1 border border-gray-800 transition"
          >
            <ChevronLeft className="w-4 h-4" /> Previous
          </button>
          <button
            disabled={presentationSlideIndex === slides.length - 1}
            onClick={() => setPresentationSlideIndex((prev) => Math.min(slides.length - 1, prev + 1))}
            className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 disabled:opacity-30 disabled:pointer-events-none text-xs font-semibold flex items-center gap-1 shadow-lg shadow-blue-600/20 transition"
          >
            Next <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
