'use client';

import React, { useState } from 'react';
import { Network, Search, Filter } from 'lucide-react';
import { DIAGRAMS } from '@/data/diagrams';
import { DiagramViewer } from '@/components/diagrams/DiagramViewer';

export default function InteractionsPage() {
  const [activeTab, setActiveTab] = useState<'SSD' | 'HLSD' | 'DSD' | 'COM'>('SSD');
  const [searchQuery, setSearchQuery] = useState('');

  const interactionDiagrams = DIAGRAMS.filter((d) => {
    if (activeTab === 'SSD') return d.id.includes('SSD');
    if (activeTab === 'HLSD') return d.id.includes('HLSD');
    if (activeTab === 'DSD') return d.id.includes('DSD');
    if (activeTab === 'COM') return d.id.includes('COM');
    return false;
  }).filter((d) => {
    const q = searchQuery.toLowerCase();
    return d.id.toLowerCase().includes(q) || d.title.toLowerCase().includes(q) || d.purpose.toLowerCase().includes(q);
  });

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* Header */}
      <div className="space-y-2 border-b border-gray-200 dark:border-gray-800 pb-5">
        <div className="flex items-center gap-2 text-indigo-600 dark:text-indigo-400 font-bold text-xs uppercase tracking-wider">
          <Network className="w-4 h-4" /> Object Interaction & Sequence Models
        </div>
        <h1 className="text-3xl font-black text-gray-900 dark:text-white tracking-tight">
          Sequence & Communication Interaction Diagrams
        </h1>
        <p className="text-sm text-gray-600 dark:text-gray-400 max-w-3xl">
          Black-box System Sequence Diagrams (SSDs), High-Level Controller Sequences (HLSDs), Detailed BCE Sequence Diagrams (DSDs), and Numbered Communication Diagrams.
        </p>
      </div>

      {/* Tabs & Search Bar */}
      <div className="flex flex-wrap items-center justify-between gap-4 p-4 rounded-2xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 shadow-sm">
        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={() => setActiveTab('SSD')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition ${
              activeTab === 'SSD'
                ? 'bg-indigo-600 text-white shadow-md'
                : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
            }`}
          >
            System Sequence (SSDs)
          </button>
          <button
            onClick={() => setActiveTab('HLSD')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition ${
              activeTab === 'HLSD'
                ? 'bg-indigo-600 text-white shadow-md'
                : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
            }`}
          >
            High-Level Sequence (HLSDs)
          </button>
          <button
            onClick={() => setActiveTab('DSD')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition ${
              activeTab === 'DSD'
                ? 'bg-indigo-600 text-white shadow-md'
                : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
            }`}
          >
            Detailed BCE Sequences (DSDs)
          </button>
          <button
            onClick={() => setActiveTab('COM')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition ${
              activeTab === 'COM'
                ? 'bg-indigo-600 text-white shadow-md'
                : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
            }`}
          >
            Communication Diagrams
          </button>
        </div>

        <div className="relative">
          <Search className="w-3.5 h-3.5 absolute left-3 top-2.5 text-gray-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search interaction diagrams..."
            className="pl-8 pr-3 py-1.5 rounded-xl bg-gray-50 dark:bg-gray-950 border border-gray-200 dark:border-gray-800 text-xs text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:border-indigo-500 w-56"
          />
        </div>
      </div>

      {/* Diagrams Stack */}
      <div className="space-y-8">
        {interactionDiagrams.length === 0 ? (
          <div className="p-12 text-center text-gray-400 bg-white dark:bg-gray-900 rounded-3xl border border-gray-200 dark:border-gray-800">
            <Network className="w-8 h-8 mx-auto mb-2 opacity-30" />
            <p>No interaction diagrams found matching criteria.</p>
          </div>
        ) : (
          interactionDiagrams.map((diagram) => (
            <DiagramViewer key={diagram.id} diagram={diagram} />
          ))
        )}
      </div>
    </div>
  );
}
