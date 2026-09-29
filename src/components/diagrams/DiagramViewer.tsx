'use client';

import React, { useState, useRef } from 'react';
import {
  ZoomIn,
  ZoomOut,
  RotateCcw,
  Maximize2,
  Minimize2,
  Download,
  Copy,
  Check,
  FileCode,
  FileImage,
  Info,
  Layers,
  Sparkles
} from 'lucide-react';
import { Diagram } from '@/types';
import { MermaidRenderer } from './MermaidRenderer';

interface DiagramViewerProps {
  diagram: Diagram;
}

export const DiagramViewer: React.FC<DiagramViewerProps> = ({ diagram }) => {
  const [activeTab, setActiveTab] = useState<'mermaid' | 'staruml' | 'source'>('mermaid');
  const [zoom, setZoom] = useState<number>(1);
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);
  const [copied, setCopied] = useState<boolean>(false);
  const [showMetadata, setShowMetadata] = useState<boolean>(true);
  const viewerRef = useRef<HTMLDivElement>(null);

  const handleZoomIn = () => setZoom((prev) => Math.min(2.5, prev + 0.15));
  const handleZoomOut = () => setZoom((prev) => Math.max(0.5, prev - 0.15));
  const handleResetZoom = () => setZoom(1);

  const toggleFullscreen = () => {
    if (!isFullscreen) {
      if (viewerRef.current?.requestFullscreen) {
        viewerRef.current.requestFullscreen();
      }
      setIsFullscreen(true);
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      }
      setIsFullscreen(false);
    }
  };

  const handleCopySource = () => {
    navigator.clipboard.writeText(diagram.mermaidCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownloadSVG = () => {
    const svgElement = viewerRef.current?.querySelector('svg');
    if (!svgElement) return;
    const svgData = new XMLSerializer().serializeToString(svgElement);
    const svgBlob = new Blob([svgData], { type: 'image/svg+xml;charset=utf-8' });
    const svgUrl = URL.createObjectURL(svgBlob);
    const downloadLink = document.createElement('a');
    downloadLink.href = svgUrl;
    downloadLink.download = `${diagram.id}-${diagram.title.replace(/\s+/g, '_')}.svg`;
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
  };

  return (
    <div
      ref={viewerRef}
      className={`rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900/90 shadow-xl overflow-hidden transition-all ${
        isFullscreen ? 'fixed inset-0 z-50 rounded-none border-none p-6 flex flex-col' : ''
      }`}
    >
      {/* Header Toolbar */}
      <div className="flex flex-wrap items-center justify-between gap-3 px-5 py-4 border-b border-gray-100 dark:border-gray-800 bg-gray-50/50 dark:bg-gray-900/50">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-blue-500/10 text-blue-600 dark:text-blue-400">
            <Sparkles className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="font-bold text-gray-900 dark:text-white text-base">{diagram.title}</h3>
              <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-blue-100 text-blue-800 dark:bg-blue-900/40 dark:text-blue-300">
                {diagram.type}
              </span>
              <span className="px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300">
                Exp {diagram.experimentId}
              </span>
            </div>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5 line-clamp-1">{diagram.purpose}</p>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2">
          {/* Tab Selection */}
          <div className="flex items-center bg-gray-200/60 dark:bg-gray-800/80 p-1 rounded-xl text-xs font-medium">
            <button
              onClick={() => setActiveTab('mermaid')}
              className={`px-3 py-1.5 rounded-lg transition-all ${
                activeTab === 'mermaid'
                  ? 'bg-white dark:bg-gray-700 text-gray-900 dark:text-white shadow-sm'
                  : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
              }`}
            >
              Mermaid Visual
            </button>
            <button
              onClick={() => setActiveTab('staruml')}
              className={`px-3 py-1.5 rounded-lg transition-all ${
                activeTab === 'staruml'
                  ? 'bg-white dark:bg-gray-700 text-gray-900 dark:text-white shadow-sm'
                  : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
              }`}
            >
              StarUML Export
            </button>
            <button
              onClick={() => setActiveTab('source')}
              className={`px-3 py-1.5 rounded-lg transition-all ${
                activeTab === 'source'
                  ? 'bg-white dark:bg-gray-700 text-gray-900 dark:text-white shadow-sm'
                  : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
              }`}
            >
              UML Source
            </button>
          </div>

          <div className="h-6 w-px bg-gray-200 dark:bg-gray-800 mx-1" />

          {/* Zoom controls */}
          {activeTab === 'mermaid' && (
            <div className="flex items-center gap-1 bg-gray-100 dark:bg-gray-800 p-1 rounded-xl">
              <button
                onClick={handleZoomOut}
                title="Zoom Out"
                className="p-1.5 rounded-lg text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700 transition"
              >
                <ZoomOut className="w-4 h-4" />
              </button>
              <span className="text-xs font-mono px-1.5 text-gray-600 dark:text-gray-400 font-medium min-w-[40px] text-center">
                {Math.round(zoom * 100)}%
              </span>
              <button
                onClick={handleZoomIn}
                title="Zoom In"
                className="p-1.5 rounded-lg text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700 transition"
              >
                <ZoomIn className="w-4 h-4" />
              </button>
              <button
                onClick={handleResetZoom}
                title="Reset Zoom"
                className="p-1.5 rounded-lg text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700 transition"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
            </div>
          )}

          {/* Download & Copy */}
          <button
            onClick={handleCopySource}
            title="Copy Source"
            className="p-2 rounded-xl bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 transition text-xs font-medium flex items-center gap-1.5"
          >
            {copied ? <Check className="w-4 h-4 text-emerald-500" /> : <Copy className="w-4 h-4" />}
            <span className="hidden sm:inline">{copied ? 'Copied!' : 'Copy Source'}</span>
          </button>

          <button
            onClick={handleDownloadSVG}
            title="Download SVG"
            className="p-2 rounded-xl bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 transition text-xs font-medium flex items-center gap-1.5"
          >
            <Download className="w-4 h-4" />
            <span className="hidden sm:inline">SVG</span>
          </button>

          <button
            onClick={toggleFullscreen}
            title="Fullscreen"
            className="p-2 rounded-xl bg-blue-500/10 hover:bg-blue-500/20 text-blue-600 dark:text-blue-400 transition"
          >
            {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Main Canvas / Display Area */}
      <div className={`relative bg-gray-950/5 dark:bg-black/60 flex-1 overflow-auto min-h-[420px] flex items-center justify-center p-6 ${isFullscreen ? 'h-full' : ''}`}>
        {activeTab === 'mermaid' && (
          <div
            className="transition-transform duration-200 ease-out origin-center w-full flex justify-center"
            style={{ transform: `scale(${zoom})` }}
          >
            <MermaidRenderer chart={diagram.mermaidCode} />
          </div>
        )}

        {activeTab === 'staruml' && (
          <div className="max-w-md text-center p-8 rounded-2xl bg-white/80 dark:bg-gray-800/80 border border-gray-200 dark:border-gray-700 shadow-lg backdrop-blur-sm">
            <div className="w-12 h-12 rounded-full bg-amber-500/10 text-amber-500 mx-auto flex items-center justify-center mb-3">
              <FileImage className="w-6 h-6" />
            </div>
            <h4 className="font-semibold text-gray-900 dark:text-white text-base mb-1">StarUML Export Status</h4>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
              StarUML export binary pending for <span className="font-semibold">{diagram.id}</span>. Interactive Mermaid visual representation is rendered as primary academic model.
            </p>
            <button
              onClick={() => setActiveTab('mermaid')}
              className="px-4 py-2 rounded-xl bg-blue-600 text-white hover:bg-blue-700 text-xs font-semibold transition"
            >
              Switch to Interactive Mermaid View
            </button>
          </div>
        )}

        {activeTab === 'source' && (
          <div className="w-full max-w-4xl bg-gray-900 rounded-xl border border-gray-800 p-4 font-mono text-sm text-blue-300 overflow-x-auto shadow-inner">
            <div className="flex justify-between items-center pb-2 border-b border-gray-800 mb-3 text-xs text-gray-400 font-sans">
              <span>{diagram.filePath}</span>
              <span className="text-emerald-400 font-semibold">Mermaid v10+ Validated</span>
            </div>
            <pre className="whitespace-pre text-xs leading-relaxed">{diagram.mermaidCode}</pre>
          </div>
        )}
      </div>

      {/* Metadata Drawer / Footer */}
      {showMetadata && (
        <div className="px-5 py-3 border-t border-gray-100 dark:border-gray-800 bg-gray-50/50 dark:bg-gray-900/50 text-xs flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-4 text-gray-600 dark:text-gray-400">
            {diagram.relatedRequirements.length > 0 && (
              <div className="flex items-center gap-1.5">
                <span className="font-semibold text-gray-900 dark:text-gray-200">Requirements:</span>
                <div className="flex gap-1">
                  {diagram.relatedRequirements.map((req) => (
                    <span key={req} className="px-1.5 py-0.5 rounded bg-gray-200 dark:bg-gray-800 text-gray-700 dark:text-gray-300 font-mono text-[10px]">
                      {req}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {diagram.relatedUseCases.length > 0 && (
              <div className="flex items-center gap-1.5">
                <span className="font-semibold text-gray-900 dark:text-gray-200">Use Cases:</span>
                <div className="flex gap-1">
                  {diagram.relatedUseCases.map((uc) => (
                    <span key={uc} className="px-1.5 py-0.5 rounded bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-300 font-mono text-[10px]">
                      {uc}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>

          <div className="text-gray-400 dark:text-gray-500 font-mono text-[11px]">
            File: {diagram.filePath}
          </div>
        </div>
      )}
    </div>
  );
};
