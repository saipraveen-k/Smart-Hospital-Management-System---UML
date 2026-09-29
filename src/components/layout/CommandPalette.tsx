'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Search, X, FileText, Boxes, Sparkles, Network, BookOpen, HelpCircle, ArrowRight } from 'lucide-react';
import { useDemoStore } from '@/store/demoStore';
import { FUNCTIONAL_REQUIREMENTS, NON_FUNCTIONAL_REQUIREMENTS } from '@/data/requirements';
import { USE_CASES } from '@/data/useCases';
import { DOMAIN_CLASSES } from '@/data/domainClasses';
import { DESIGN_CLASSES } from '@/data/designClasses';
import { DIAGRAMS } from '@/data/diagrams';
import { VIVA_QUESTIONS } from '@/data/viva';
import { SYSTEM_MODULES } from '@/data/modules';

export const CommandPalette: React.FC = () => {
  const router = useRouter();
  const { isCommandPaletteOpen, setCommandPaletteOpen } = useDemoStore();
  const [query, setQuery] = useState('');

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setCommandPaletteOpen(!isCommandPaletteOpen);
      }
      if (e.key === 'Escape' && isCommandPaletteOpen) {
        setCommandPaletteOpen(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isCommandPaletteOpen, setCommandPaletteOpen]);

  if (!isCommandPaletteOpen) return null;

  const q = query.toLowerCase().trim();

  // Search matches
  const reqMatches = [...FUNCTIONAL_REQUIREMENTS, ...NON_FUNCTIONAL_REQUIREMENTS]
    .filter((r) => r.id.toLowerCase().includes(q) || r.title.toLowerCase().includes(q) || r.description.toLowerCase().includes(q))
    .slice(0, 4);

  const useCaseMatches = USE_CASES.filter((uc) => uc.id.toLowerCase().includes(q) || uc.name.toLowerCase().includes(q) || uc.goal.toLowerCase().includes(q)).slice(0, 4);

  const classMatches = [...DOMAIN_CLASSES, ...DESIGN_CLASSES]
    .filter((c) => c.name.toLowerCase().includes(q) || c.purpose.toLowerCase().includes(q))
    .slice(0, 4);

  const diagramMatches = DIAGRAMS.filter((d) => d.id.toLowerCase().includes(q) || d.title.toLowerCase().includes(q) || d.type.toLowerCase().includes(q)).slice(0, 4);

  const vivaMatches = VIVA_QUESTIONS.filter((v) => v.question.toLowerCase().includes(q) || v.answer.toLowerCase().includes(q)).slice(0, 3);

  const handleSelect = (url: string) => {
    setCommandPaletteOpen(false);
    setQuery('');
    router.push(url);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-start justify-center pt-20 px-4 animate-in fade-in duration-150">
      <div className="w-full max-w-2xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[80vh]">
        {/* Input Bar */}
        <div className="flex items-center px-4 py-3 border-b border-gray-100 dark:border-gray-800 bg-gray-50/50 dark:bg-gray-900/50">
          <Search className="w-5 h-5 text-gray-400 mr-3 shrink-0" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search requirements, use cases, classes, diagrams, viva..."
            className="w-full bg-transparent text-gray-900 dark:text-white placeholder-gray-400 text-sm focus:outline-none"
            autoFocus
          />
          <button
            onClick={() => setCommandPaletteOpen(false)}
            className="p-1 rounded-lg text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Results Body */}
        <div className="overflow-y-auto p-4 space-y-4 text-xs divide-y divide-gray-100 dark:divide-gray-800">
          {q === '' && (
            <div className="py-6 text-center text-gray-400">
              <Search className="w-8 h-8 mx-auto mb-2 opacity-40" />
              <p className="font-semibold text-gray-700 dark:text-gray-300">Global SHMS Explorer</p>
              <p className="text-[11px] mt-1">Type "appointment", "FR-01", "Doctor", "Patient", or "SSD" to search...</p>
            </div>
          )}

          {/* Requirements */}
          {reqMatches.length > 0 && (
            <div className="pt-2">
              <h5 className="font-bold text-gray-400 uppercase tracking-wider text-[10px] mb-2 flex items-center gap-1.5">
                <FileText className="w-3.5 h-3.5 text-blue-500" />
                Requirements ({reqMatches.length})
              </h5>
              <div className="space-y-1">
                {reqMatches.map((r) => (
                  <div
                    key={r.id}
                    onClick={() => handleSelect('/requirements')}
                    className="flex items-center justify-between p-2 rounded-xl hover:bg-blue-50 dark:hover:bg-blue-950/40 cursor-pointer group transition"
                  >
                    <div>
                      <div className="font-bold text-gray-900 dark:text-white flex items-center gap-2">
                        <span className="font-mono text-blue-600 dark:text-blue-400">{r.id}</span>
                        <span>{r.title}</span>
                      </div>
                      <p className="text-[11px] text-gray-500 line-clamp-1">{r.description}</p>
                    </div>
                    <ArrowRight className="w-4 h-4 text-gray-400 group-hover:text-blue-500 opacity-0 group-hover:opacity-100 transition" />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Use Cases */}
          {useCaseMatches.length > 0 && (
            <div className="pt-2">
              <h5 className="font-bold text-gray-400 uppercase tracking-wider text-[10px] mb-2 flex items-center gap-1.5">
                <Boxes className="w-3.5 h-3.5 text-indigo-500" />
                Use Cases ({useCaseMatches.length})
              </h5>
              <div className="space-y-1">
                {useCaseMatches.map((uc) => (
                  <div
                    key={uc.id}
                    onClick={() => handleSelect('/use-cases')}
                    className="flex items-center justify-between p-2 rounded-xl hover:bg-indigo-50 dark:hover:bg-indigo-950/40 cursor-pointer group transition"
                  >
                    <div>
                      <div className="font-bold text-gray-900 dark:text-white flex items-center gap-2">
                        <span className="font-mono text-indigo-600 dark:text-indigo-400">{uc.id}</span>
                        <span>{uc.name}</span>
                      </div>
                      <p className="text-[11px] text-gray-500 line-clamp-1">{uc.goal}</p>
                    </div>
                    <ArrowRight className="w-4 h-4 text-gray-400 group-hover:text-indigo-500 opacity-0 group-hover:opacity-100 transition" />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Classes */}
          {classMatches.length > 0 && (
            <div className="pt-2">
              <h5 className="font-bold text-gray-400 uppercase tracking-wider text-[10px] mb-2 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                Domain & Design Classes ({classMatches.length})
              </h5>
              <div className="space-y-1">
                {classMatches.map((c) => (
                  <div
                    key={c.name}
                    onClick={() => handleSelect('/domain-model')}
                    className="flex items-center justify-between p-2 rounded-xl hover:bg-amber-50 dark:hover:bg-amber-950/40 cursor-pointer group transition"
                  >
                    <div>
                      <div className="font-bold text-gray-900 dark:text-white">{c.name}</div>
                      <p className="text-[11px] text-gray-500 line-clamp-1">{c.purpose}</p>
                    </div>
                    <ArrowRight className="w-4 h-4 text-gray-400 group-hover:text-amber-500 opacity-0 group-hover:opacity-100 transition" />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Diagrams */}
          {diagramMatches.length > 0 && (
            <div className="pt-2">
              <h5 className="font-bold text-gray-400 uppercase tracking-wider text-[10px] mb-2 flex items-center gap-1.5">
                <Network className="w-3.5 h-3.5 text-emerald-500" />
                UML Diagrams ({diagramMatches.length})
              </h5>
              <div className="space-y-1">
                {diagramMatches.map((d) => (
                  <div
                    key={d.id}
                    onClick={() => handleSelect('/diagrams')}
                    className="flex items-center justify-between p-2 rounded-xl hover:bg-emerald-50 dark:hover:bg-emerald-950/40 cursor-pointer group transition"
                  >
                    <div>
                      <div className="font-bold text-gray-900 dark:text-white flex items-center gap-2">
                        <span className="font-mono text-emerald-600 dark:text-emerald-400">{d.id}</span>
                        <span>{d.title}</span>
                        <span className="px-1.5 py-0.2 rounded bg-gray-200 dark:bg-gray-800 text-[9px] font-mono">
                          {d.type}
                        </span>
                      </div>
                      <p className="text-[11px] text-gray-500 line-clamp-1">{d.purpose}</p>
                    </div>
                    <ArrowRight className="w-4 h-4 text-gray-400 group-hover:text-emerald-500 opacity-0 group-hover:opacity-100 transition" />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Viva Questions */}
          {vivaMatches.length > 0 && (
            <div className="pt-2">
              <h5 className="font-bold text-gray-400 uppercase tracking-wider text-[10px] mb-2 flex items-center gap-1.5">
                <HelpCircle className="w-3.5 h-3.5 text-rose-500" />
                Viva Voce ({vivaMatches.length})
              </h5>
              <div className="space-y-1">
                {vivaMatches.map((v) => (
                  <div
                    key={v.id}
                    onClick={() => handleSelect('/viva')}
                    className="flex items-center justify-between p-2 rounded-xl hover:bg-rose-50 dark:hover:bg-rose-950/40 cursor-pointer group transition"
                  >
                    <div>
                      <div className="font-bold text-gray-900 dark:text-white flex items-center gap-2">
                        <span className="font-mono text-rose-600 dark:text-rose-400">Q{v.id}</span>
                        <span className="line-clamp-1">{v.question}</span>
                      </div>
                    </div>
                    <ArrowRight className="w-4 h-4 text-gray-400 group-hover:text-rose-500 opacity-0 group-hover:opacity-100 transition" />
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Footer info */}
        <div className="px-4 py-2 bg-gray-100 dark:bg-gray-950 border-t border-gray-100 dark:border-gray-800 text-[11px] text-gray-500 flex justify-between">
          <span>Use ESC or click outside to close</span>
          <span>SHMS Global Command Palette</span>
        </div>
      </div>
    </div>
  );
};
