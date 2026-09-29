'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { Compass, X, ChevronRight, ChevronLeft, Check, Sparkles } from 'lucide-react';
import { useDemoStore } from '@/store/demoStore';

interface TourStep {
  step: number;
  title: string;
  description: string;
  route: string;
  highlights: string[];
}

export const DemoTourModal: React.FC = () => {
  const router = useRouter();
  const { isDemoTourActive, setDemoTourActive, demoTourStep, setDemoTourStep } = useDemoStore();

  const steps: TourStep[] = [
    {
      step: 1,
      title: 'Step 1: Project Overview & Objectives',
      description: 'Explore the main landing page, key system statistics, problem statement, and 9-phase OOAD workflow.',
      route: '/',
      highlights: ['Animated stats (8 Experiments, 30 FRs, 35 Use Cases, 53+ Diagrams)', 'System tagline & Academic credits']
    },
    {
      step: 2,
      title: 'Step 2: Actors & Subsystem Modules',
      description: 'Inspect 7 primary/supporting actors and 8 core operational subsystems.',
      route: '/overview',
      highlights: ['Interactive clickable Actor Cards', 'Subsystem responsibilities & diagram mapping']
    },
    {
      step: 3,
      title: 'Step 3: Requirements Engineering (SRS)',
      description: 'Review 30 Functional Requirements, 11 Non-Functional Requirements, and 8 Business Rules.',
      route: '/requirements',
      highlights: ['Search & Module filtering', 'Interactive requirement details drawer']
    },
    {
      step: 4,
      title: 'Step 4: Use Case Modeling & Package Diagrams',
      description: 'Explore 35 Use Case specifications with preconditions, postconditions, and main/alt flows.',
      route: '/use-cases',
      highlights: ['Master Use Case Diagram', 'Package Architecture Diagram']
    },
    {
      step: 5,
      title: 'Step 5: Conceptual Domain Model',
      description: 'Inspect 34 domain entities with semantic attributes, multiplicities, and constraints.',
      route: '/domain-model',
      highlights: ['Interactive Domain Class Explorer', 'Domain Concept Map']
    },
    {
      step: 6,
      title: 'Step 6: Object Interaction & Sequence Diagrams',
      description: 'View 9 System Sequence Diagrams (SSDs) and 5 High-Level Sequence Diagrams (HLSDs).',
      route: '/interactions',
      highlights: ['Interactive DiagramViewer with Zoom, Pan & Fullscreen', 'White-box sequence lifelines']
    },
    {
      step: 7,
      title: 'Step 7: Detailed Design Class Model',
      description: 'Inspect 42 Design Classes with operation signatures, visibilities (+, -, #), and DIP interfaces.',
      route: '/design',
      highlights: ['BCE Architecture mapping', 'Interfaces & Dependency Inversion realization']
    },
    {
      step: 8,
      title: 'Step 8: Behavioural Activity & State Models',
      description: 'Review 9 Activity Diagrams with swimlanes and 5 Finite State Machine diagrams.',
      route: '/behaviour',
      highlights: ['Overall Hospital Workflow Diagram', 'Appointment & Lab Test State Machines']
    },
    {
      step: 9,
      title: 'Step 9: Component Architecture',
      description: 'Examine 15 physical/logical software components and provided interfaces.',
      route: '/architecture/components',
      highlights: ['Clickable Component Cards', 'Dependency links']
    },
    {
      step: 10,
      title: 'Step 10: Deployment Architecture',
      description: 'Explore 15 deployment nodes, client workstations, application server clusters, and network VLANs.',
      route: '/architecture/deployment',
      highlights: ['Clickable Deployment Node Cards', 'TLS 1.3 & LAN security protocols']
    },
    {
      step: 11,
      title: 'Step 11: Interactive Hospital Demo Hub',
      description: 'Execute the step-by-step patient journey runner (Registration -> Appointment -> Check-in -> Consultation -> Lab -> Pharmacy -> Billing -> Discharge).',
      route: '/demo',
      highlights: ['State-persisted local demo store', 'Role switcher simulation']
    },
    {
      step: 12,
      title: 'Step 12: Requirement Traceability Matrix (RTM)',
      description: 'Verify 100% end-to-end traceability mapping from FR-01 to FR-30 through use cases, classes, and diagrams.',
      route: '/traceability',
      highlights: ['Interactive clickable matrix cells', 'Cross-navigation links']
    },
    {
      step: 13,
      title: 'Step 13: Viva Voce Examination Module',
      description: 'Review 50 comprehensive viva voce questions with expandable answers and random question generator.',
      route: '/viva',
      highlights: ['50 Q&A with category filters', 'Progress tracker']
    }
  ];

  if (!isDemoTourActive) return null;

  const currentStep = steps[demoTourStep] || steps[0];

  const handleNext = () => {
    if (demoTourStep < steps.length - 1) {
      const nextStepIndex = demoTourStep + 1;
      setDemoTourStep(nextStepIndex);
      router.push(steps[nextStepIndex].route);
    } else {
      setDemoTourActive(false);
    }
  };

  const handlePrev = () => {
    if (demoTourStep > 0) {
      const prevStepIndex = demoTourStep - 1;
      setDemoTourStep(prevStepIndex);
      router.push(steps[prevStepIndex].route);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 w-full max-w-md bg-white dark:bg-gray-900 border border-indigo-500/30 dark:border-indigo-500/40 rounded-2xl shadow-2xl overflow-hidden animate-in slide-in-from-bottom-5 duration-200">
      <div className="p-4 bg-gradient-to-r from-indigo-600 to-blue-600 text-white flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Compass className="w-5 h-5 animate-spin-slow" />
          <h4 className="font-bold text-sm">Faculty Evaluation Demo Tour</h4>
        </div>
        <button
          onClick={() => setDemoTourActive(false)}
          className="p-1 rounded-lg hover:bg-white/20 transition"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      <div className="p-5 space-y-3">
        <div className="flex items-center justify-between text-xs text-indigo-600 dark:text-indigo-400 font-bold">
          <span>STEP {currentStep.step} OF 13</span>
          <span className="px-2 py-0.5 rounded-full bg-indigo-100 dark:bg-indigo-950 font-mono">
            Route: {currentStep.route}
          </span>
        </div>

        <h3 className="font-extrabold text-gray-900 dark:text-white text-base">{currentStep.title}</h3>
        <p className="text-xs text-gray-600 dark:text-gray-300 leading-relaxed">{currentStep.description}</p>

        <div className="space-y-1.5 pt-2">
          <p className="text-[11px] font-bold text-gray-400 uppercase tracking-wider">Key Demonstration Points:</p>
          {currentStep.highlights.map((h, i) => (
            <div key={i} className="flex items-center gap-2 text-xs text-gray-700 dark:text-gray-200 font-medium">
              <Check className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
              <span>{h}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="px-5 py-3 bg-gray-50 dark:bg-gray-950 border-t border-gray-100 dark:border-gray-800 flex items-center justify-between">
        <button
          disabled={demoTourStep === 0}
          onClick={handlePrev}
          className="px-3 py-1.5 rounded-xl bg-gray-200 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-700 text-xs font-semibold disabled:opacity-30 disabled:pointer-events-none flex items-center gap-1 transition"
        >
          <ChevronLeft className="w-3.5 h-3.5" /> Prev
        </button>

        <div className="flex gap-1">
          {steps.map((s, idx) => (
            <div
              key={s.step}
              onClick={() => {
                setDemoTourStep(idx);
                router.push(s.route);
              }}
              className={`w-2 h-2 rounded-full cursor-pointer transition-all ${
                idx === demoTourStep ? 'bg-indigo-600 w-4' : 'bg-gray-300 dark:bg-gray-700'
              }`}
            />
          ))}
        </div>

        <button
          onClick={handleNext}
          className="px-4 py-1.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold flex items-center gap-1 shadow-md shadow-indigo-600/20 transition"
        >
          {demoTourStep === steps.length - 1 ? 'Finish Tour' : 'Next Step'}
          <ChevronRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
};
