'use client';

import React from 'react';
import Link from 'next/link';
import { useParams, notFound } from 'next/navigation';
import {
  FlaskConical,
  ArrowLeft,
  CheckCircle2,
  ListOrdered,
  BookOpen,
  Sparkles,
  FileCheck,
  Award
} from 'lucide-react';
import { EXPERIMENTS } from '@/data/experiments';
import { DIAGRAMS } from '@/data/diagrams';
import { DiagramViewer } from '@/components/diagrams/DiagramViewer';

export default function ExperimentDetailPage() {
  const params = useParams();
  const id = params.id as string;

  const experiment = EXPERIMENTS.find((e) => e.id === id);

  if (!experiment) {
    return (
      <div className="text-center py-16 space-y-4">
        <FlaskConical className="w-12 h-12 text-amber-500 mx-auto" />
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Experiment Not Found</h2>
        <p className="text-xs text-gray-500">Valid experiment IDs range from 1 to 8.</p>
        <Link href="/experiments" className="inline-flex items-center gap-2 text-xs font-bold text-blue-600 hover:underline">
          <ArrowLeft className="w-4 h-4" /> Back to Experiments Hub
        </Link>
      </div>
    );
  }

  // Find diagrams for this experiment
  const expDiagrams = DIAGRAMS.filter((d) => experiment.diagramIds.includes(d.id));

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* Top Back Navigation */}
      <Link
        href="/experiments"
        className="inline-flex items-center gap-2 text-xs font-bold text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition"
      >
        <ArrowLeft className="w-4 h-4" /> Back to All Experiments
      </Link>

      {/* Header Banner */}
      <div className="p-8 rounded-3xl bg-gradient-to-r from-amber-500/10 via-orange-500/10 to-amber-600/10 border border-amber-500/20 space-y-4">
        <div className="flex items-center gap-2">
          <span className="px-3 py-1 rounded-full text-xs font-mono font-extrabold bg-amber-500 text-white uppercase tracking-wider">
            EXPERIMENT 0{experiment.number}
          </span>
          <span className="text-xs font-semibold text-amber-600 dark:text-amber-400">
            SHMS OOAD Lab Manual
          </span>
        </div>

        <h1 className="text-3xl font-black text-gray-900 dark:text-white tracking-tight">
          {experiment.title}
        </h1>
        <p className="text-sm font-semibold text-gray-600 dark:text-gray-300">
          {experiment.subtitle}
        </p>

        <div className="p-4 rounded-2xl bg-white/80 dark:bg-gray-900/80 border border-amber-200 dark:border-amber-900/40 text-xs text-gray-700 dark:text-gray-200">
          <strong className="text-amber-600 dark:text-amber-400 font-extrabold block mb-1">Aim:</strong>
          {experiment.aim}
        </div>
      </div>

      {/* Objectives & Activities Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="p-6 rounded-2xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 space-y-3">
          <h3 className="font-extrabold text-gray-900 dark:text-white text-base flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5 text-emerald-500" />
            Objectives
          </h3>
          <ul className="space-y-2 text-xs text-gray-600 dark:text-gray-300">
            {experiment.objectives.map((obj, i) => (
              <li key={i} className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-1.5 shrink-0" />
                <span>{obj}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="p-6 rounded-2xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 space-y-3">
          <h3 className="font-extrabold text-gray-900 dark:text-white text-base flex items-center gap-2">
            <ListOrdered className="w-5 h-5 text-indigo-500" />
            Key Activities & Activities
          </h3>
          <ul className="space-y-2 text-xs text-gray-600 dark:text-gray-300">
            {experiment.activities.map((act, i) => (
              <li key={i} className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 mt-1.5 shrink-0" />
                <span>{act}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Theory Section */}
      <section className="p-6 rounded-3xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 space-y-3">
        <h3 className="font-extrabold text-gray-900 dark:text-white text-base flex items-center gap-2">
          <BookOpen className="w-5 h-5 text-blue-500" />
          Background Theory
        </h3>
        <p className="text-xs text-gray-600 dark:text-gray-300 leading-relaxed whitespace-pre-line">
          {experiment.theory}
        </p>
      </section>

      {/* Procedure Steps */}
      <section className="p-6 rounded-3xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 space-y-3">
        <h3 className="font-extrabold text-gray-900 dark:text-white text-base flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-amber-500" />
          Step-by-Step Procedure
        </h3>
        <div className="space-y-2">
          {experiment.procedure.map((step, idx) => (
            <div key={idx} className="flex items-start gap-3 p-3 rounded-xl bg-gray-50 dark:bg-gray-950 border border-gray-100 dark:border-gray-850 text-xs">
              <span className="px-2 py-0.5 rounded bg-amber-500 text-white font-mono font-bold text-[10px]">
                Step {idx + 1}
              </span>
              <span className="text-gray-700 dark:text-gray-300 font-medium">{step}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Diagram Gallery */}
      <section className="space-y-6">
        <div className="flex items-center justify-between">
          <h3 className="font-extrabold text-gray-900 dark:text-white text-lg flex items-center gap-2">
            <FileCheck className="w-5 h-5 text-emerald-500" />
            Experiment Diagrams ({expDiagrams.length} Models)
          </h3>
          <span className="text-xs text-gray-500">Interactive DiagramViewer enabled</span>
        </div>

        {expDiagrams.length === 0 ? (
          <div className="p-8 rounded-2xl bg-gray-900 border border-gray-800 text-center text-xs text-gray-400">
            No specific diagrams linked directly for this experiment. Explore all diagrams in the catalog.
          </div>
        ) : (
          <div className="space-y-8">
            {expDiagrams.map((diagram) => (
              <DiagramViewer key={diagram.id} diagram={diagram} />
            ))}
          </div>
        )}
      </section>

      {/* Result & Conclusion Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
        <div className="p-6 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-900 dark:text-emerald-200 space-y-2">
          <h4 className="font-extrabold text-sm flex items-center gap-2">
            <Award className="w-4 h-4 text-emerald-500" /> Experiment Result
          </h4>
          <p className="text-xs leading-relaxed">{experiment.result}</p>
        </div>

        <div className="p-6 rounded-2xl bg-blue-500/10 border border-blue-500/20 text-blue-900 dark:text-blue-200 space-y-2">
          <h4 className="font-extrabold text-sm flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-blue-500" /> Academic Conclusion
          </h4>
          <p className="text-xs leading-relaxed">{experiment.conclusion}</p>
        </div>
      </div>
    </div>
  );
}
