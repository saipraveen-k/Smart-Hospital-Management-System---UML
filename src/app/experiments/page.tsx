'use client';

import React from 'react';
import Link from 'next/link';
import { FlaskConical, ArrowRight, CheckCircle2, Sparkles } from 'lucide-react';
import { EXPERIMENTS } from '@/data/experiments';

export default function ExperimentsHubPage() {
  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* Header */}
      <div className="space-y-2 border-b border-gray-200 dark:border-gray-800 pb-5">
        <div className="flex items-center gap-2 text-amber-500 font-bold text-xs uppercase tracking-wider">
          <FlaskConical className="w-4 h-4" /> Laboratory Evaluation Catalog
        </div>
        <h1 className="text-3xl font-black text-gray-900 dark:text-white tracking-tight">
          OOAD Laboratory Experiments (Exp 1 to Exp 8)
        </h1>
        <p className="text-sm text-gray-600 dark:text-gray-400 max-w-3xl">
          Comprehensive documentation of all 8 laboratory experiments performed for the Smart Hospital Management System (SHMS), including theory, procedural steps, Mermaid diagrams, results, and conclusions.
        </p>
      </div>

      {/* Grid of 8 Experiments */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {EXPERIMENTS.map((exp) => (
          <Link
            key={exp.id}
            href={`/experiments/${exp.id}`}
            className="group p-6 rounded-3xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 hover:border-amber-500/50 shadow-sm hover:shadow-xl transition-all duration-200 flex flex-col justify-between"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="px-3 py-1 rounded-full text-xs font-mono font-bold bg-amber-100 text-amber-900 dark:bg-amber-950 dark:text-amber-300 border border-amber-500/20">
                  EXPERIMENT 0{exp.number}
                </span>
                <ArrowRight className="w-4 h-4 text-gray-400 group-hover:text-amber-500 group-hover:translate-x-1 transition-all" />
              </div>

              <div>
                <h3 className="font-black text-gray-900 dark:text-white text-lg group-hover:text-amber-500 transition-colors">
                  {exp.title}
                </h3>
                <p className="text-xs font-medium text-amber-600 dark:text-amber-400 mt-0.5">{exp.subtitle}</p>
              </div>

              <p className="text-xs text-gray-600 dark:text-gray-400 line-clamp-2 leading-relaxed">
                {exp.aim}
              </p>

              <div className="space-y-1 pt-2">
                <h5 className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Objectives:</h5>
                <ul className="space-y-1 text-[11px] text-gray-500 dark:text-gray-300">
                  {exp.objectives.slice(0, 2).map((obj, i) => (
                    <li key={i} className="flex items-start gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-amber-500 shrink-0 mt-0.5" />
                      <span className="line-clamp-1">{obj}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="mt-5 pt-3 border-t border-gray-100 dark:border-gray-800 flex items-center justify-between text-xs font-bold text-amber-600 dark:text-amber-400">
              <span>View Full Laboratory Report & Diagrams ({exp.diagramIds.length} Models)</span>
              <ArrowRight className="w-4 h-4" />
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
