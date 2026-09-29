'use client';

import React from 'react';
import Link from 'next/link';
import {
  Search,
  Bell,
  Sun,
  Moon,
  Shield,
  User,
  Activity,
  ChevronDown,
  Sparkles,
  Presentation,
  Compass
} from 'lucide-react';
import { useDemoStore } from '@/store/demoStore';
import { UserRole } from '@/types';

export const Header: React.FC = () => {
  const {
    demoRole,
    setDemoRole,
    theme,
    toggleTheme,
    notifications,
    setCommandPaletteOpen,
    setNotificationDrawerOpen,
    setPresentationMode,
    setDemoTourActive
  } = useDemoStore();

  const unreadCount = notifications.filter((n) => !n.read).length;

  const roles: UserRole[] = [
    'Patient',
    'Receptionist',
    'Doctor',
    'Pharmacist',
    'Lab Technician',
    'Cashier',
    'Admin'
  ];

  return (
    <header className="sticky top-0 z-30 w-full h-16 bg-white/80 dark:bg-gray-950/80 backdrop-blur-md border-b border-gray-200 dark:border-gray-800 transition-colors">
      <div className="h-full px-4 md:px-6 flex items-center justify-between gap-4">
        {/* Left branding / title */}
        <div className="flex items-center gap-3">
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-600 via-indigo-600 to-cyan-500 flex items-center justify-center text-white shadow-lg shadow-blue-500/25 group-hover:scale-105 transition-transform">
              <Activity className="w-5 h-5 animate-pulse" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-extrabold text-gray-900 dark:text-white tracking-tight text-base group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                  SHMS
                </span>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-blue-500/10 text-blue-600 dark:text-blue-400 border border-blue-500/20">
                  UML OOAD
                </span>
              </div>
              <p className="text-[11px] text-gray-500 dark:text-gray-400 font-medium hidden sm:block">
                Smart Hospital Management System
              </p>
            </div>
          </Link>
        </div>

        {/* Center Global Search Trigger */}
        <div className="flex-1 max-w-md hidden md:block">
          <button
            onClick={() => setCommandPaletteOpen(true)}
            className="w-full flex items-center justify-between px-3.5 py-2 rounded-xl bg-gray-100 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 text-gray-400 dark:text-gray-500 hover:bg-gray-100/80 dark:hover:bg-gray-800/80 hover:border-gray-300 dark:hover:border-gray-700 transition text-xs font-medium group"
          >
            <div className="flex items-center gap-2">
              <Search className="w-4 h-4 text-gray-400 group-hover:text-blue-500 transition-colors" />
              <span>Search requirements, use cases, classes, diagrams...</span>
            </div>
            <kbd className="px-2 py-0.5 text-[10px] font-mono rounded bg-gray-200 dark:bg-gray-800 text-gray-600 dark:text-gray-400 border border-gray-300 dark:border-gray-700">
              Ctrl K
            </kbd>
          </button>
        </div>

        {/* Right controls: Demo Mode Badge, Role Selector, Notifications, Theme */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* DEMO MODE Indicator */}
          <div className="hidden lg:flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400 text-xs font-medium shadow-sm">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
            <span className="font-semibold">DEMO MODE</span>
            <span className="text-[11px] opacity-75 hidden xl:inline">| Data Locally Simulated</span>
          </div>

          {/* Demo Tour Button */}
          <button
            onClick={() => setDemoTourActive(true)}
            className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border border-indigo-500/20 hover:bg-indigo-500/20 transition text-xs font-semibold"
          >
            <Compass className="w-4 h-4" />
            <span>Demo Tour</span>
          </button>

          {/* Presentation Mode Button */}
          <button
            onClick={() => setPresentationMode(true)}
            className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-blue-600 text-white hover:bg-blue-700 shadow-md shadow-blue-600/20 transition text-xs font-semibold"
          >
            <Presentation className="w-4 h-4" />
            <span>Presentation Mode</span>
          </button>

          {/* Role Switcher */}
          <div className="relative group">
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-gray-100 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 text-xs font-semibold text-gray-800 dark:text-gray-200 cursor-pointer hover:bg-gray-200/50 dark:hover:bg-gray-800 transition">
              <User className="w-3.5 h-3.5 text-blue-500" />
              <span>{demoRole}</span>
              <ChevronDown className="w-3.5 h-3.5 text-gray-400" />
            </div>
            <div className="absolute right-0 mt-1 w-48 py-1.5 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl shadow-xl opacity-0 scale-95 group-hover:opacity-100 group-hover:scale-100 pointer-events-none group-hover:pointer-events-auto transition-all z-50">
              <div className="px-3 py-1 text-[10px] font-bold tracking-wider text-gray-400 uppercase">
                Simulate Demo Role
              </div>
              {roles.map((role) => (
                <button
                  key={role}
                  onClick={() => setDemoRole(role)}
                  className={`w-full text-left px-3 py-1.5 text-xs font-medium transition flex items-center justify-between ${
                    demoRole === role
                      ? 'bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 font-bold'
                      : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
                  }`}
                >
                  <span>{role}</span>
                  {demoRole === role && <span className="w-1.5 h-1.5 rounded-full bg-blue-500" />}
                </button>
              ))}
            </div>
          </div>

          {/* Notifications Bell */}
          <button
            onClick={() => setNotificationDrawerOpen(true)}
            className="relative p-2 rounded-xl text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-900 transition"
            title="Notifications"
          >
            <Bell className="w-5 h-5" />
            {unreadCount > 0 && (
              <span className="absolute top-1 right-1 w-4 h-4 rounded-full bg-rose-500 text-white text-[10px] font-extrabold flex items-center justify-center animate-bounce">
                {unreadCount}
              </span>
            )}
          </button>

          {/* Theme Toggle */}
          <button
            onClick={toggleTheme}
            className="p-2 rounded-xl text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-900 transition"
            title="Toggle Light / Dark Mode"
          >
            {theme === 'dark' ? <Sun className="w-5 h-5 text-amber-400" /> : <Moon className="w-5 h-5 text-indigo-600" />}
          </button>
        </div>
      </div>
    </header>
  );
};
