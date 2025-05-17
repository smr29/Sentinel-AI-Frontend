import React, { useState, useEffect } from 'react';
import { MermaidRenderer } from '@/components/MermaidRenderer';
import { getMockMermaidDiagram } from '@/lib/mockMermaidData';

interface CloudResourceGraphProps {
  data?: any;
  isLoading?: boolean;
  onResourceSelect?: (resource: any) => void;
}

export function CloudResourceGraph({ isLoading: externalLoading }: CloudResourceGraphProps) {
  const [mermaidDiagram, setMermaidDiagram] = useState<string>('');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchMermaidDiagram = async () => {
      try {
        setIsLoading(true);
        // Get mock data directly without artificial delay
        const diagram = await getMockMermaidDiagram();
        setMermaidDiagram(diagram);
      } catch (err) {
        console.error('Error fetching diagram:', err);
        setError('Failed to load infrastructure diagram');
      } finally {
        setIsLoading(false);
      }
    };

    fetchMermaidDiagram();
      setMermaidDiagram(`graph LR
      A --- B
      B-->C[fa:fa-ban forbidden]
      B-->D(fa:fa-spinner);
  `)
  console.log(mermaidDiagram)
  }, []);

  if (externalLoading || isLoading) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="flex flex-col items-center">
          <p className="text-gray-500">Loading cloud infrastructure diagram...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="flex flex-col items-center text-center">
          <p className="text-red-500 text-lg font-medium">{error}</p>
          <p className="text-gray-500 mt-2">
            There was a problem loading the infrastructure diagram. Please try again later.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="h-full relative bg-white rounded-lg p-4 shadow">
      <div className="overflow-auto h-full p-4">
        <MermaidRenderer chart={mermaidDiagram} className="h-full" />
      </div>
    </div>
  );

  
}

