'use client';

import React, { useState } from 'react';
import { Activity, Search, Sparkles } from 'lucide-react';
import { DIAGRAMS } from '@/data/diagrams';
import { DiagramViewer } from '@/components/diagrams/DiagramViewer';

export default function BehaviourPage() {
  const [activeTab, setActiveTab] = useState<'ACT' | 'STM'>('ACT');
  const [searchQuery, setSearchQuery] = useState('');

  const behaviourDiagrams = DIAGRAMS.filter((d) => {
    if (activeTab === 'ACT') return d.type === 'Activity';
    if (activeTab === 'STM') return d.type === 'State Machine';
    return false;
  }).filter((d) => {
    const q = searchQuery.toLowerCase();
    return d.id.toLowerCase().includes(q) || d.title.toLowerCase().includes(q) || d.purpose.toLowerCase().includes(q);
  });

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* Header */}
      <div className="space-y-2 border-b border-gray-200 dark:border-gray-800 pb-5">
        <div className="flex items-center gap-2 text-rose-600 dark:text-rose-400 font-bold text-xs uppercase tracking-wider">
          <Activity className="w-4 h-4" /> Behavioral & Lifecycle Modeling
        </div>
        <h1 className="text-3xl font-black text-gray-900 dark:text-white tracking-tight">
          Activity Swimlanes & State Machine Diagrams
        </h1>
        <p className="text-sm text-gray-600 dark:text-gray-400 max-w-3xl">
          Procedural workflow activity swimlanes and entity finite state machine lifecycle transitions (Appointment, Lab Test Order, Admission, Payment, Prescription).
        </p>
      </div>

      {/* Tabs & Search Bar */}
      <div className="flex flex-wrap items-center justify-between gap-4 p-4 rounded-2xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 shadow-sm">
        <div className="flex gap-2">
          <button
            onClick={() => setActiveTab('ACT')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition ${
              activeTab === 'ACT'
                ? 'bg-rose-600 text-white shadow-md'
                : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
            }`}
          >
            Activity Diagrams (Swimlanes & Workflows)
          </button>
          <button
            onClick={() => setActiveTab('STM')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition ${
              activeTab === 'STM'
                ? 'bg-rose-600 text-white shadow-md'
                : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
            }`}
          >
            State Machine Lifecycles (5 State Machines)
          </button>
        </div>

        <div className="relative">
          <Search className="w-3.5 h-3.5 absolute left-3 top-2.5 text-gray-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search behavioral diagrams..."
            className="pl-8 pr-3 py-1.5 rounded-xl bg-gray-50 dark:bg-gray-950 border border-gray-200 dark:border-gray-800 text-xs text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:border-rose-500 w-56"
          />
        </div>
      </div>

      {/* Diagrams Stack */}
      <div className="space-y-8">
        {behaviourDiagrams.length === 0 ? (
          <div className="p-12 text-center text-gray-400 bg-white dark:bg-gray-900 rounded-3xl border border-gray-200 dark:border-gray-800">
            <Activity className="w-8 h-8 mx-auto mb-2 opacity-30" />
            <p>No behavioral diagrams found matching criteria.</p>
          </div>
        ) : (
          behaviourDiagrams.map((diagram) => (
            <DiagramViewer key={diagram.id} diagram={diagram} />
          ))
        )}
      </div>
    </div>
  );
}
