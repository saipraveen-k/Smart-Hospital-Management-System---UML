'use client';

import React, { useState } from 'react';
import { HelpCircle, Search, Shuffle, ChevronLeft, ChevronRight, Eye, EyeOff, CheckCircle2, Sparkles } from 'lucide-react';
import { VIVA_QUESTIONS } from '@/data/viva';

export default function VivaPage() {
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [revealedIds, setRevealedIds] = useState<number[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('ALL');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const filteredQuestions = VIVA_QUESTIONS.filter((q) => {
    const matchesCategory = selectedCategory === 'ALL' || q.category === selectedCategory;
    const matchesSearch =
      q.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      q.answer.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const categories = Array.from(new Set(VIVA_QUESTIONS.map((q) => q.category)));
  const currentQ = filteredQuestions[currentIndex] || filteredQuestions[0];

  const isRevealed = (id: number) => revealedIds.includes(id);

  const toggleReveal = (id: number) => {
    if (isRevealed(id)) {
      setRevealedIds(revealedIds.filter((i) => i !== id));
    } else {
      setRevealedIds([...revealedIds, id]);
    }
  };

  const handleRandom = () => {
    if (filteredQuestions.length === 0) return;
    const randIdx = Math.floor(Math.random() * filteredQuestions.length);
    setCurrentIndex(randIdx);
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* Header */}
      <div className="space-y-2 border-b border-gray-200 dark:border-gray-800 pb-5">
        <div className="flex items-center gap-2 text-rose-600 dark:text-rose-400 font-bold text-xs uppercase tracking-wider">
          <HelpCircle className="w-4 h-4" /> Faculty Evaluation Preparation
        </div>
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-black text-gray-900 dark:text-white tracking-tight">
              Viva Voce Examination Module (50 Q&A)
            </h1>
            <p className="text-sm text-gray-600 dark:text-gray-400 max-w-3xl">
              Interactive preparation module containing 50 tailored viva questions and answers covering OOAD principles, UML diagram semantics, design patterns, and SHMS domain rules.
            </p>
          </div>

          {/* Progress Tracker */}
          <div className="px-4 py-2 rounded-2xl bg-rose-500/10 border border-rose-500/20 text-rose-600 dark:text-rose-400 text-xs font-bold flex items-center gap-2">
            <Sparkles className="w-4 h-4" />
            <span>Progress: {revealedIds.length} / {VIVA_QUESTIONS.length} Questions Reviewed</span>
          </div>
        </div>
      </div>

      {/* Filter & Controls Bar */}
      <div className="flex flex-wrap items-center justify-between gap-4 p-4 rounded-2xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 shadow-sm">
        <div className="flex flex-wrap items-center gap-3 flex-1">
          <div className="relative flex-1 min-w-[200px]">
            <Search className="w-3.5 h-3.5 absolute left-3 top-2.5 text-gray-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setCurrentIndex(0);
              }}
              placeholder="Search viva questions (Aggregation, BCE, State)..."
              className="w-full pl-8 pr-3 py-1.5 rounded-xl bg-gray-50 dark:bg-gray-950 border border-gray-200 dark:border-gray-800 text-xs text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:border-rose-500"
            />
          </div>

          <select
            value={selectedCategory}
            onChange={(e) => {
              setSelectedCategory(e.target.value);
              setCurrentIndex(0);
            }}
            className="px-3 py-1.5 rounded-xl bg-gray-50 dark:bg-gray-950 border border-gray-200 dark:border-gray-800 text-xs font-medium text-gray-700 dark:text-gray-300 focus:outline-none"
          >
            <option value="ALL">All Categories</option>
            {categories.map((c) => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
        </div>

        <button
          onClick={handleRandom}
          className="px-4 py-2 rounded-xl bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-800 dark:text-gray-200 text-xs font-bold flex items-center gap-1.5 transition"
        >
          <Shuffle className="w-4 h-4 text-rose-500" />
          <span>Random Question</span>
        </button>
      </div>

      {/* Primary Card Quiz Navigator */}
      {currentQ && (
        <div className="p-8 rounded-3xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 shadow-xl space-y-6">
          <div className="flex items-center justify-between">
            <span className="px-3 py-1 rounded-full text-xs font-mono font-bold bg-rose-100 text-rose-800 dark:bg-rose-950 dark:text-rose-300">
              QUESTION #{currentQ.id} • {currentQ.category}
            </span>
            <span className="text-xs font-mono text-gray-400">
              Question {currentIndex + 1} of {filteredQuestions.length}
            </span>
          </div>

          <h2 className="text-xl md:text-2xl font-black text-gray-900 dark:text-white leading-snug">
            {currentQ.question}
          </h2>

          {/* Reveal Answer Button */}
          <div>
            <button
              onClick={() => toggleReveal(currentQ.id)}
              className="px-5 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs shadow-md shadow-rose-600/20 transition flex items-center gap-2"
            >
              {isRevealed(currentQ.id) ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              <span>{isRevealed(currentQ.id) ? 'Hide Answer' : 'Show Answer'}</span>
            </button>
          </div>

          {/* Answer Box */}
          {isRevealed(currentQ.id) && (
            <div className="p-5 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-gray-900 dark:text-gray-100 text-sm leading-relaxed animate-in fade-in duration-200">
              <strong className="text-emerald-600 dark:text-emerald-400 font-bold block mb-1">Detailed Answer:</strong>
              {currentQ.answer}
            </div>
          )}

          {/* Next / Previous Controls */}
          <div className="pt-4 border-t border-gray-100 dark:border-gray-800 flex items-center justify-between">
            <button
              disabled={currentIndex === 0}
              onClick={() => setCurrentIndex((prev) => Math.max(0, prev - 1))}
              className="px-4 py-2 rounded-xl bg-gray-100 dark:bg-gray-800 disabled:opacity-30 disabled:pointer-events-none text-xs font-bold text-gray-700 dark:text-gray-300 flex items-center gap-1 transition"
            >
              <ChevronLeft className="w-4 h-4" /> Previous
            </button>

            <button
              disabled={currentIndex === filteredQuestions.length - 1}
              onClick={() => setCurrentIndex((prev) => Math.min(filteredQuestions.length - 1, prev + 1))}
              className="px-4 py-2 rounded-xl bg-rose-600 hover:bg-rose-700 disabled:opacity-30 disabled:pointer-events-none text-white text-xs font-bold flex items-center gap-1 shadow-md transition"
            >
              Next Question <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* Grid of All Questions for Quick Inspection */}
      <section className="space-y-4">
        <h3 className="font-extrabold text-gray-900 dark:text-white text-base">
          All Viva Voce Questions Index ({filteredQuestions.length})
        </h3>
        <div className="space-y-2">
          {filteredQuestions.map((q, idx) => (
            <div
              key={q.id}
              onClick={() => setCurrentIndex(idx)}
              className={`p-4 rounded-2xl border transition cursor-pointer flex items-center justify-between ${
                currentIndex === idx
                  ? 'bg-rose-50 dark:bg-rose-950/40 border-rose-500 font-bold'
                  : 'bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-800 hover:border-gray-400'
              }`}
            >
              <div className="flex items-center gap-3">
                <span className="w-7 h-7 rounded-lg bg-rose-100 text-rose-800 dark:bg-rose-950 dark:text-rose-300 font-mono text-xs font-bold flex items-center justify-center">
                  Q{q.id}
                </span>
                <span className="text-xs text-gray-900 dark:text-white font-medium">{q.question}</span>
              </div>
              <span className="text-[10px] font-semibold text-gray-400 px-2 py-0.5 rounded bg-gray-100 dark:bg-gray-800">
                {q.category}
              </span>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
