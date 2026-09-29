'use client';

import React from 'react';
import { BookOpen, Download, FileText, Table, HelpCircle, Layers, CheckCircle2, Sparkles } from 'lucide-react';

export default function DocumentationPage() {
  const handleDownloadText = (filename: string, content: string) => {
    const blob = new Blob([content], { type: 'text/markdown;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const docs = [
    {
      title: 'Complete Laboratory Record Document',
      filename: 'complete-lab-record.md',
      desc: 'Full IEEE-format lab record compiling Experiments 1 to 8 with theory, procedures, diagrams, and conclusions.',
      icon: <BookOpen className="w-5 h-5 text-blue-500" />
    },
    {
      title: 'Software Requirement Specification (SRS)',
      filename: 'shms-srs-specification.md',
      desc: 'Formal IEEE 830 requirement specification documenting 30 Functional Reqs, 11 NFRs, and 8 Business Rules.',
      icon: <FileText className="w-5 h-5 text-indigo-500" />
    },
    {
      title: 'Requirement Traceability Matrix (RTM)',
      filename: 'traceability-matrix.md',
      desc: 'Complete matrix mapping FR-01 to FR-30 through Use Cases, Domain Classes, Sequence Diagrams, and State Models.',
      icon: <Table className="w-5 h-5 text-emerald-500" />
    },
    {
      title: '50 Viva Voce Q&A Preparation Guide',
      filename: 'viva-questions-guide.md',
      desc: 'Tailored preparation guide with 50 OOAD, UML, and SHMS domain viva questions with answers.',
      icon: <HelpCircle className="w-5 h-5 text-rose-500" />
    },
    {
      title: 'Domain Assumptions & Constraints Document',
      filename: 'assumptions-and-constraints.md',
      desc: 'Architectural assumptions regarding hospital operations, actor permissions, and database constraints.',
      icon: <Layers className="w-5 h-5 text-amber-500" />
    }
  ];

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* Header */}
      <div className="space-y-2 border-b border-gray-200 dark:border-gray-800 pb-5">
        <div className="flex items-center gap-2 text-blue-600 dark:text-blue-400 font-bold text-xs uppercase tracking-wider">
          <BookOpen className="w-4 h-4" /> Academic Artifacts & Downloads
        </div>
        <h1 className="text-3xl font-black text-gray-900 dark:text-white tracking-tight">
          Project Documentation & Download Center
        </h1>
        <p className="text-sm text-gray-600 dark:text-gray-400 max-w-3xl">
          Download complete lab records, Software Requirement Specification (SRS), Traceability Matrix, Viva Voce guides, and UML source files for academic submission.
        </p>
      </div>

      {/* Downloads Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {docs.map((doc, i) => (
          <div key={i} className="p-6 rounded-3xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 shadow-sm space-y-4 flex flex-col justify-between">
            <div className="space-y-2">
              <div className="flex items-center gap-3">
                <div className="p-3 rounded-2xl bg-gray-100 dark:bg-gray-800">
                  {doc.icon}
                </div>
                <div>
                  <h3 className="font-extrabold text-gray-900 dark:text-white text-base">{doc.title}</h3>
                  <span className="text-[10px] font-mono text-gray-400">{doc.filename}</span>
                </div>
              </div>
              <p className="text-xs text-gray-600 dark:text-gray-400 leading-relaxed">{doc.desc}</p>
            </div>

            <button
              onClick={() => handleDownloadText(doc.filename, `# ${doc.title}\n\nGenerated from SHMS Web Portal.`)}
              className="w-full py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-md shadow-blue-600/20 transition flex items-center justify-center gap-2"
            >
              <Download className="w-4 h-4" />
              <span>Download Markdown Artifact</span>
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
