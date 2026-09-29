'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard,
  Compass,
  FlaskConical,
  FileText,
  Boxes,
  Network,
  Layers,
  Sparkles,
  ShieldCheck,
  Table,
  Image as ImageIcon,
  BookOpen,
  HelpCircle,
  Stethoscope,
  Users,
  Calendar,
  Pill,
  CreditCard,
  BarChart3,
  History,
  ChevronRight,
  ChevronDown,
  Presentation,
  Moon,
  Sun,
  Activity
} from 'lucide-react';
import { useDemoStore } from '@/store/demoStore';

interface NavGroupProps {
  title: string;
  icon: React.ReactNode;
  isOpenDefault?: boolean;
  children: React.ReactNode;
}

const NavGroup: React.FC<NavGroupProps> = ({ title, icon, isOpenDefault = true, children }) => {
  const [isOpen, setIsOpen] = useState(isOpenDefault);

  return (
    <div className="mb-3">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between px-3 py-2 text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition"
      >
        <div className="flex items-center gap-2">
          {icon}
          <span>{title}</span>
        </div>
        {isOpen ? <ChevronDown className="w-3.5 h-3.5" /> : <ChevronRight className="w-3.5 h-3.5" />}
      </button>
      {isOpen && <div className="mt-1 space-y-0.5 pl-2">{children}</div>}
    </div>
  );
};

export const Sidebar: React.FC = () => {
  const pathname = usePathname();
  const { theme, toggleTheme, setPresentationMode, setDemoTourActive } = useDemoStore();

  const isActive = (path: string) => pathname === path;

  const linkClasses = (path: string) =>
    `flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-semibold transition-all ${
      isActive(path)
        ? 'bg-blue-600 text-white shadow-md shadow-blue-600/25 font-bold'
        : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800/80 hover:text-gray-900 dark:hover:text-white'
    }`;

  return (
    <aside className="w-64 h-[calc(100vh-4rem)] sticky top-16 bg-white dark:bg-gray-950 border-r border-gray-200 dark:border-gray-800 flex flex-col justify-between overflow-y-auto p-4 select-none shrink-0 transition-colors">
      <div className="space-y-4">
        {/* Core Navigation */}
        <div className="space-y-1">
          <Link href="/" className={linkClasses('/')}>
            <LayoutDashboard className="w-4 h-4" />
            <span>Dashboard</span>
          </Link>
          <Link href="/overview" className={linkClasses('/overview')}>
            <Compass className="w-4 h-4" />
            <span>System Overview</span>
          </Link>
        </div>

        {/* Models Group */}
        <NavGroup title="UML Models" icon={<Layers className="w-4 h-4 text-blue-500" />}>
          <Link href="/requirements" className={linkClasses('/requirements')}>
            <FileText className="w-4 h-4" />
            <span>Requirements (FR/NFR)</span>
          </Link>
          <Link href="/use-cases" className={linkClasses('/use-cases')}>
            <Boxes className="w-4 h-4" />
            <span>Use Case Models (35)</span>
          </Link>
          <Link href="/domain-model" className={linkClasses('/domain-model')}>
            <Sparkles className="w-4 h-4" />
            <span>Domain Classes (34)</span>
          </Link>
          <Link href="/interactions" className={linkClasses('/interactions')}>
            <Network className="w-4 h-4" />
            <span>Sequence & Interactions</span>
          </Link>
          <Link href="/design" className={linkClasses('/design')}>
            <ShieldCheck className="w-4 h-4" />
            <span>Design Classes (42)</span>
          </Link>
          <Link href="/behaviour" className={linkClasses('/behaviour')}>
            <Activity className="w-4 h-4" />
            <span>Activity & State Models</span>
          </Link>
        </NavGroup>

        {/* Architecture Group */}
        <NavGroup title="Architecture" icon={<Network className="w-4 h-4 text-indigo-500" />}>
          <Link href="/architecture" className={linkClasses('/architecture')}>
            <Layers className="w-4 h-4" />
            <span>3-Layer Architecture</span>
          </Link>
          <Link href="/architecture/components" className={linkClasses('/architecture/components')}>
            <Boxes className="w-4 h-4" />
            <span>Component Architecture</span>
          </Link>
          <Link href="/architecture/deployment" className={linkClasses('/architecture/deployment')}>
            <Network className="w-4 h-4" />
            <span>Deployment Architecture</span>
          </Link>
        </NavGroup>

        {/* Experiments Group */}
        <NavGroup title="Experiments (1-8)" icon={<FlaskConical className="w-4 h-4 text-amber-500" />}>
          <Link href="/experiments" className={linkClasses('/experiments')}>
            <FlaskConical className="w-4 h-4" />
            <span>All Experiments Hub</span>
          </Link>
          {[1, 2, 3, 4, 5, 6, 7, 8].map((expNum) => (
            <Link
              key={expNum}
              href={`/experiments/${expNum}`}
              className={linkClasses(`/experiments/${expNum}`)}
            >
              <span className="w-4 h-4 rounded-full bg-gray-200 dark:bg-gray-800 text-[10px] font-mono font-bold flex items-center justify-center">
                {expNum}
              </span>
              <span>Experiment {expNum}</span>
            </Link>
          ))}
        </NavGroup>

        {/* Project Group */}
        <NavGroup title="Project Catalog" icon={<BookOpen className="w-4 h-4 text-emerald-500" />}>
          <Link href="/traceability" className={linkClasses('/traceability')}>
            <Table className="w-4 h-4" />
            <span>Traceability Matrix</span>
          </Link>
          <Link href="/diagrams" className={linkClasses('/diagrams')}>
            <ImageIcon className="w-4 h-4" />
            <span>Diagram Catalog (53+)</span>
          </Link>
          <Link href="/documentation" className={linkClasses('/documentation')}>
            <BookOpen className="w-4 h-4" />
            <span>Lab Docs & Downloads</span>
          </Link>
          <Link href="/viva" className={linkClasses('/viva')}>
            <HelpCircle className="w-4 h-4" />
            <span>Viva Voce (50 Q&A)</span>
          </Link>
        </NavGroup>

        {/* Interactive Demo Hub */}
        <NavGroup title="Interactive Hospital Demo" icon={<Stethoscope className="w-4 h-4 text-rose-500" />}>
          <Link href="/demo" className={linkClasses('/demo')}>
            <Stethoscope className="w-4 h-4" />
            <span>Hospital Demo Hub</span>
          </Link>
          <Link href="/demo/patients" className={linkClasses('/demo/patients')}>
            <Users className="w-4 h-4" />
            <span>Patient Management</span>
          </Link>
          <Link href="/demo/appointments" className={linkClasses('/demo/appointments')}>
            <Calendar className="w-4 h-4" />
            <span>Appointment & OP</span>
          </Link>
          <Link href="/demo/laboratory" className={linkClasses('/demo/laboratory')}>
            <FlaskConical className="w-4 h-4" />
            <span>Laboratory Module</span>
          </Link>
          <Link href="/demo/pharmacy" className={linkClasses('/demo/pharmacy')}>
            <Pill className="w-4 h-4" />
            <span>Pharmacy & Stock</span>
          </Link>
          <Link href="/demo/billing" className={linkClasses('/demo/billing')}>
            <CreditCard className="w-4 h-4" />
            <span>Billing & Payments</span>
          </Link>
          <Link href="/demo/reports" className={linkClasses('/demo/reports')}>
            <BarChart3 className="w-4 h-4" />
            <span>Reports & Analytics</span>
          </Link>
          <Link href="/admin/audit" className={linkClasses('/admin/audit')}>
            <History className="w-4 h-4" />
            <span>Audit Trail Log</span>
          </Link>
        </NavGroup>
      </div>

      {/* Bottom Controls */}
      <div className="pt-4 border-t border-gray-200 dark:border-gray-800 space-y-2 mt-4">
        <button
          onClick={() => setPresentationMode(true)}
          className="w-full flex items-center justify-center gap-2 px-3 py-2 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold text-xs shadow-md transition"
        >
          <Presentation className="w-4 h-4" />
          <span>Presentation Mode</span>
        </button>

        <button
          onClick={() => setDemoTourActive(true)}
          className="w-full flex items-center justify-center gap-2 px-3 py-2 rounded-xl bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 hover:bg-indigo-500/20 font-bold text-xs border border-indigo-500/20 transition"
        >
          <Compass className="w-4 h-4" />
          <span>Faculty Demo Tour</span>
        </button>

        <button
          onClick={toggleTheme}
          className="w-full flex items-center justify-between px-3 py-2 rounded-xl bg-gray-100 dark:bg-gray-900 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-800 text-xs font-semibold transition"
        >
          <span className="flex items-center gap-2">
            {theme === 'dark' ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-indigo-600" />}
            <span>{theme === 'dark' ? 'Light Theme' : 'Dark Theme'}</span>
          </span>
          <span className="text-[10px] font-mono opacity-60 uppercase">{theme}</span>
        </button>
      </div>
    </aside>
  );
};
