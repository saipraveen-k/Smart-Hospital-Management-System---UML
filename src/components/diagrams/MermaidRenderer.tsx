'use client';

import React, { useEffect, useRef, useState } from 'react';
import mermaid from 'mermaid';
import { useDemoStore } from '@/store/demoStore';

interface MermaidRendererProps {
  chart: string;
  className?: string;
}

export const MermaidRenderer: React.FC<MermaidRendererProps> = ({ chart, className = '' }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [svg, setSvg] = useState<string>('');
  const [error, setError] = useState<string | null>(null);
  const theme = useDemoStore((state) => state.theme);

  useEffect(() => {
    let isMounted = true;
    const renderDiagram = async () => {
      try {
        setError(null);
        mermaid.initialize({
          startOnLoad: false,
          theme: theme === 'dark' ? 'dark' : 'default',
          securityLevel: 'loose',
          fontFamily: 'Inter, sans-serif',
          flowchart: { curve: 'basis', useMaxWidth: true }
        });

        const id = `mermaid-svg-${Math.random().toString(36).substring(2, 9)}`;
        const { svg: generatedSvg } = await mermaid.render(id, chart);
        if (isMounted) {
          setSvg(generatedSvg);
        }
      } catch (err: any) {
        console.error('Mermaid render error:', err);
        if (isMounted) {
          setError(err.message || 'Failed to render Mermaid diagram.');
        }
      }
    };

    renderDiagram();

    return () => {
      isMounted = false;
    };
  }, [chart, theme]);

  if (error) {
    return (
      <div className="p-4 rounded-xl border border-red-500/20 bg-red-500/10 text-red-400 text-sm font-mono overflow-x-auto">
        <p className="font-semibold text-red-500 mb-1">Diagram Rendering Error:</p>
        <p>{error}</p>
        <div className="mt-3">
          <p className="text-xs text-gray-400 font-sans mb-1">Raw Code:</p>
          <pre className="text-xs bg-black/40 p-2 rounded max-h-40 overflow-y-auto">{chart}</pre>
        </div>
      </div>
    );
  }

  return (
    <div
      ref={containerRef}
      className={`mermaid-container flex justify-center items-center overflow-auto w-full p-4 ${className}`}
      dangerouslySetInnerHTML={{ __html: svg }}
    />
  );
};
