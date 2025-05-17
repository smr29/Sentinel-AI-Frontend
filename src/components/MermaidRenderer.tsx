import React, { useEffect, useState } from 'react';
import mermaid from 'mermaid';

interface MermaidRendererProps {
  chart: string;
  className?: string;
}

export function MermaidRenderer({ chart, className = '' }: MermaidRendererProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [svgUrl, setSvgUrl] = useState<string | null>(null);

  // Initialize Mermaid once
  useEffect(() => {
    mermaid.initialize({
      startOnLoad: false,
      securityLevel: 'loose', // Use 'strict' in production if no external links are needed
      theme: 'neutral',
      fontFamily: 'sans-serif',
      themeVariables: {
        fontSize: '14px',
      },
    });
  }, []);

  // Render chart to SVG, then encode as Data URL
  useEffect(() => {
    let isMounted = true;

    const renderChart = async () => {
      if (!chart) {
        setSvgUrl(null);
        setIsLoading(false);
        return;
      }

      try {
        setIsLoading(true);
        setError(null);

        mermaid.parse(chart); // optional validation

        const graphId = 'mermaid-graph-' + Date.now();
        const { svg } = await mermaid.render(graphId, chart);

        if (isMounted) {
          // Encode SVG as base64 for <img src="data:image/svg+xml;base64,...">
          const encoded = btoa(unescape(encodeURIComponent(svg)));
          const dataUrl = `data:image/svg+xml;base64,${encoded}`;
          setSvgUrl(dataUrl);
        }
      } catch (err) {
        console.error('Mermaid rendering error:', err);
        if (isMounted) {
          setError('Failed to render diagram. Check syntax.');
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    renderChart();
    return () => {
      isMounted = false;
    };
  }, [chart]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-full">
        <p className="text-gray-500">Rendering diagram...</p>
      </div>
    );
  }

  if (error || !svgUrl) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="flex flex-col items-center">
          <p className="text-red-500">{error || 'Unknown error occurred'}</p>
          <p className="text-gray-500">Please check the diagram syntax</p>
        </div>
      </div>
    );
  }

  return (
    <div className={`mermaid-svg-wrapper ${className}`}>
      <img src={svgUrl} alt="Mermaid diagram" className="max-w-full h-auto" />
    </div>
  );
}
