'use client';

import React from 'react';
import Link from 'next/link';
import { Activity, BookOpen, FileText, Layers } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="w-full border-t border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-950 py-8 px-6 text-xs text-gray-600 dark:text-gray-400 transition-colors">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-600 flex items-center justify-center text-white shadow-md">
            <Activity className="w-4 h-4" />
          </div>
          <div>
            <h4 className="font-bold text-gray-900 dark:text-white text-sm">
              Smart Hospital Management System (SHMS)
            </h4>
            <p className="text-gray-500 dark:text-gray-400">
              An Integrated Object-Oriented Model for Smart Hospital Operations
            </p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-6">
          <Link href="/overview" className="hover:text-blue-600 dark:hover:text-blue-400 transition flex items-center gap-1.5 font-medium">
            <Layers className="w-3.5 h-3.5" />
            <span>Overview</span>
          </Link>
          <Link href="/requirements" className="hover:text-blue-600 dark:hover:text-blue-400 transition flex items-center gap-1.5 font-medium">
            <FileText className="w-3.5 h-3.5" />
            <span>Requirements</span>
          </Link>
          <Link href="/traceability" className="hover:text-blue-600 dark:hover:text-blue-400 transition flex items-center gap-1.5 font-medium">
            <BookOpen className="w-3.5 h-3.5" />
            <span>Traceability</span>
          </Link>
          <Link href="/documentation" className="hover:text-blue-600 dark:hover:text-blue-400 transition flex items-center gap-1.5 font-medium">
            <BookOpen className="w-3.5 h-3.5" />
            <span>Documentation</span>
          </Link>
        </div>

        <div className="text-right border-t md:border-t-0 pt-4 md:pt-0 border-gray-200 dark:border-gray-800 w-full md:w-auto">
          <p className="font-semibold text-gray-900 dark:text-gray-200">
            B.Tech OOAD / UML Laboratory Evaluation
          </p>
          <p className="text-[11px] text-gray-500 dark:text-gray-400">
            Department of Computer Science & Engineering | AY 2026-2027
          </p>
        </div>
      </div>
    </footer>
  );
};
