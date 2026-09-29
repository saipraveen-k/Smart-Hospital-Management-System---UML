'use client';

import React, { useState } from 'react';
import { Network, Search, CheckCircle2, X, Shield, ArrowRight, Server, HardDrive, Laptop } from 'lucide-react';
import { DEPLOYMENT_NODES, DEPLOYMENT_MERMAID_CODE } from '@/data/architecture';
import { DeploymentNode } from '@/types';
import { MermaidRenderer } from '@/components/diagrams/MermaidRenderer';

export default function DeploymentArchitecturePage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedNode, setSelectedNode] = useState<DeploymentNode | null>(null);

  const filteredNodes = DEPLOYMENT_NODES.filter((n) => {
    const q = searchQuery.toLowerCase();
    return n.name.toLowerCase().includes(q) || n.purpose.toLowerCase().includes(q) || n.nodeType.toLowerCase().includes(q);
  });

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* Header */}
      <div className="space-y-2 border-b border-gray-200 dark:border-gray-800 pb-5">
        <div className="flex items-center gap-2 text-purple-600 dark:text-purple-400 font-bold text-xs uppercase tracking-wider">
          <Network className="w-4 h-4" /> Physical Hardware & Deployment Nodes
        </div>
        <h1 className="text-3xl font-black text-gray-900 dark:text-white tracking-tight">
          Deployment Architecture Diagram & Node Catalog
        </h1>
        <p className="text-sm text-gray-600 dark:text-gray-400 max-w-3xl">
          Physical deployment topology detailing 15 hardware workstations, reverse proxies, application server clusters, database servers, and network security protocols.
        </p>
      </div>

      {/* Deployment Diagram Canvas */}
      <section className="p-5 rounded-3xl bg-gray-900 border border-gray-800 space-y-3">
        <div className="flex items-center justify-between px-2">
          <div className="flex items-center gap-2">
            <h3 className="font-extrabold text-white text-base">UML Deployment Diagram</h3>
            <span className="px-2 py-0.5 rounded bg-gray-800 text-[10px] text-gray-400 font-mono">
              Mermaid representation of UML Deployment Diagram
            </span>
          </div>
          <span className="text-xs text-gray-400 font-mono">Deployment Topology</span>
        </div>
        <MermaidRenderer chart={DEPLOYMENT_MERMAID_CODE} />
      </section>

      {/* Search Bar */}
      <div className="flex items-center justify-between gap-4 p-4 rounded-2xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 shadow-sm">
        <div className="relative flex-1 max-w-md">
          <Search className="w-3.5 h-3.5 absolute left-3 top-2.5 text-gray-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search deployment nodes (Server, Workstation, LAN)..."
            className="w-full pl-8 pr-3 py-1.5 rounded-xl bg-gray-50 dark:bg-gray-950 border border-gray-200 dark:border-gray-800 text-xs text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:border-purple-500"
          />
        </div>
        <div className="text-xs font-mono text-gray-500 font-semibold">
          Showing {filteredNodes.length} Deployment Nodes
        </div>
      </div>

      {/* Grid of Clickable Deployment Node Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredNodes.map((node) => (
          <div
            key={node.id}
            onClick={() => setSelectedNode(node)}
            className="p-5 rounded-2xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 hover:border-purple-500/50 shadow-sm hover:shadow-xl transition-all cursor-pointer group flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="px-2.5 py-0.5 rounded-full text-xs font-mono font-bold bg-purple-100 text-purple-800 dark:bg-purple-950 dark:text-purple-300">
                  {node.id}
                </span>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300">
                  {node.nodeType}
                </span>
              </div>
              <h4 className="font-extrabold text-gray-900 dark:text-white text-base group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors">
                {node.name}
              </h4>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1 line-clamp-2 leading-relaxed">
                {node.purpose}
              </p>
            </div>

            <div className="mt-4 pt-3 border-t border-gray-100 dark:border-gray-800 flex items-center justify-between text-[11px] font-semibold text-purple-600 dark:text-purple-400">
              <span>View Security & Communication</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>
        ))}
      </div>

      {/* Deployment Node Detail Modal */}
      {selectedNode && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-200">
          <div className="w-full max-w-3xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
            <div className="p-6 bg-gradient-to-r from-purple-600 to-indigo-600 text-white flex items-center justify-between">
              <div>
                <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-white/20 font-mono uppercase">
                  {selectedNode.id} • {selectedNode.nodeType}
                </span>
                <h3 className="text-2xl font-black mt-1">{selectedNode.name}</h3>
              </div>
              <button onClick={() => setSelectedNode(null)} className="p-1.5 rounded-xl bg-white/10 hover:bg-white/20 transition">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 overflow-y-auto space-y-5 text-xs text-gray-700 dark:text-gray-300">
              <div>
                <h4 className="font-bold text-gray-900 dark:text-white uppercase tracking-wider text-[11px] mb-1">Node Purpose</h4>
                <p className="leading-relaxed text-gray-600 dark:text-gray-300">{selectedNode.purpose}</p>
              </div>

              <div>
                <h4 className="font-bold text-gray-900 dark:text-white uppercase tracking-wider text-[11px] mb-2">Hosted Components & Services</h4>
                <div className="flex flex-wrap gap-1.5">
                  {selectedNode.hostedComponents.map((c) => (
                    <span key={c} className="px-2.5 py-1 rounded-lg bg-purple-50 dark:bg-purple-950/80 text-purple-600 dark:text-purple-300 font-semibold">
                      {c}
                    </span>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2 border-t border-gray-100 dark:border-gray-800">
                <div className="p-3.5 rounded-xl bg-gray-50 dark:bg-gray-950 border border-gray-100 dark:border-gray-850">
                  <h4 className="font-bold text-gray-900 dark:text-white uppercase tracking-wider text-[11px] mb-1">Communication Protocol</h4>
                  <p className="font-mono text-purple-600 dark:text-purple-400 font-bold">{selectedNode.communication}</p>
                </div>

                <div className="p-3.5 rounded-xl bg-gray-50 dark:bg-gray-950 border border-gray-100 dark:border-gray-850">
                  <h4 className="font-bold text-gray-900 dark:text-white uppercase tracking-wider text-[11px] mb-1">Security Considerations</h4>
                  <ul className="space-y-1">
                    {selectedNode.security.map((sec, i) => (
                      <li key={i} className="flex items-center gap-1.5 text-emerald-600 dark:text-emerald-400 font-medium">
                        <CheckCircle2 className="w-3.5 h-3.5 shrink-0" />
                        <span>{sec}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            <div className="p-4 bg-gray-50 dark:bg-gray-950 border-t border-gray-100 dark:border-gray-800 flex justify-end">
              <button
                onClick={() => setSelectedNode(null)}
                className="px-5 py-2 rounded-xl bg-gray-200 dark:bg-gray-800 hover:bg-gray-300 dark:hover:bg-gray-700 text-gray-800 dark:text-gray-200 font-bold text-xs transition"
              >
                Close Node Details
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
