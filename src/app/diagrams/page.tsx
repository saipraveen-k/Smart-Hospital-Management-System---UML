'use client';

import React, { useState } from 'react';
import { ImageIcon, Search, Filter } from 'lucide-react';
import { DIAGRAMS } from '@/data/diagrams';
import { DiagramViewer } from '@/components/diagrams/DiagramViewer';

export default function DiagramCatalogPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [typeFilter, setTypeFilter] = useState('ALL');
  const [expFilter, setExpFilter] = useState('ALL');

  const filteredDiagrams = DIAGRAMS.filter((d) => {
    const q = searchQuery.toLowerCase();
    const matchesSearch = d.id.toLowerCase().includes(q) || d.title.toLowerCase().includes(q) || d.purpose.toLowerCase().includes(q);
    const matchesType = typeFilter === 'ALL' || d.type === typeFilter;
    const matchesExp = expFilter === 'ALL' || d.experimentId === expFilter;
    return matchesSearch && matchesType && matchesExp;
  });

  const diagramTypes = Array.from(new Set(DIAGRAMS.map((d) => d.type)));

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* Header */}
      <div className="space-y-2 border-b border-gray-200 dark:border-gray-800 pb-5">
        <div className="flex items-center gap-2 text-rose-600 dark:text-rose-400 font-bold text-xs uppercase tracking-wider">
          <ImageIcon className="w-4 h-4" /> Comprehensive Visual Modeling Catalog
        </div>
        <h1 className="text-3xl font-black text-gray-900 dark:text-white tracking-tight">
          Master Diagram Catalog (53+ UML Models)
        </h1>
        <p className="text-sm text-gray-600 dark:text-gray-400 max-w-3xl">
          Central visual catalog indexing all class diagrams, use case models, sequence interactions, communication networks, activity swimlanes, state machines, component architecture, and deployment nodes.
        </p>
      </div>

      {/* Search & Filter Bar */}
      <div className="flex flex-wrap items-center justify-between gap-4 p-4 rounded-2xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 shadow-sm">
        <div className="flex flex-wrap items-center gap-3 flex-1">
          <div className="relative flex-1 min-w-[200px]">
            <Search className="w-3.5 h-3.5 absolute left-3 top-2.5 text-gray-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search diagram catalog by ID, title, or purpose..."
              className="w-full pl-8 pr-3 py-1.5 rounded-xl bg-gray-50 dark:bg-gray-950 border border-gray-200 dark:border-gray-800 text-xs text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:border-rose-500"
            />
          </div>

          <select
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value)}
            className="px-3 py-1.5 rounded-xl bg-gray-50 dark:bg-gray-950 border border-gray-200 dark:border-gray-800 text-xs font-medium text-gray-700 dark:text-gray-300 focus:outline-none"
          >
            <option value="ALL">All Diagram Types</option>
            {diagramTypes.map((t) => (
              <option key={t} value={t}>{t} Diagrams</option>
            ))}
          </select>

          <select
            value={expFilter}
            onChange={(e) => setExpFilter(e.target.value)}
            className="px-3 py-1.5 rounded-xl bg-gray-50 dark:bg-gray-950 border border-gray-200 dark:border-gray-800 text-xs font-medium text-gray-700 dark:text-gray-300 focus:outline-none"
          >
            <option value="ALL">All Experiments</option>
            {[1, 2, 3, 4, 5, 6, 7, 8].map((num) => (
              <option key={num} value={String(num)}>Experiment {num}</option>
            ))}
          </select>
        </div>

        <div className="text-xs font-mono text-gray-500 font-semibold">
          Showing {filteredDiagrams.length} Diagrams
        </div>
      </div>

      {/* Diagrams Stack */}
      <div className="space-y-8">
        {filteredDiagrams.length === 0 ? (
          <div className="p-12 text-center text-gray-400 bg-white dark:bg-gray-900 rounded-3xl border border-gray-200 dark:border-gray-800">
            <ImageIcon className="w-8 h-8 mx-auto mb-2 opacity-30" />
            <p>No diagrams found matching search criteria.</p>
          </div>
        ) : (
          filteredDiagrams.map((diagram) => (
            <DiagramViewer key={diagram.id} diagram={diagram} />
          ))
        )}
      </div>
    </div>
  );
}
