// import React, { useState, useEffect } from 'react';
// import { MermaidRenderer } from '@/components/MermaidRenderer';
// import { getMockMermaidDiagram } from '@/lib/mockMermaidData';

// interface CloudResourceGraphProps {
//   data?: any;
//   isLoading?: boolean;
//   onResourceSelect?: (resource: any) => void;
// }

// export function CloudResourceGraph({ isLoading: externalLoading }: CloudResourceGraphProps) {
//   const [mermaidDiagram, setMermaidDiagram] = useState<string>('');
//   const [isLoading, setIsLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);

//   useEffect(() => {
//     const fetchMermaidDiagram = async () => {
//       try {
//         setIsLoading(true);
//         // Get mock data directly without artificial delay
//         const diagram = await getMockMermaidDiagram();
//         setMermaidDiagram(diagram);
//       } catch (err) {
//         console.error('Error fetching diagram:', err);
//         setError('Failed to load infrastructure diagram');
//       } finally {
//         setIsLoading(false);
//       }
//     };

//     fetchMermaidDiagram();
//       setMermaidDiagram(`graph LR
//       A --- B
//       B-->C[fa:fa-ban forbidden]
//       B-->D(fa:fa-spinner);
//   `)
//   console.log(mermaidDiagram)
//   }, []);

//   if (externalLoading || isLoading) {
//     return (
//       <div className="flex items-center justify-center h-full">
//         <div className="flex flex-col items-center">
//           <p className="text-gray-500">Loading cloud infrastructure diagram...</p>
//         </div>
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div className="flex items-center justify-center h-full">
//         <div className="flex flex-col items-center text-center">
//           <p className="text-red-500 text-lg font-medium">{error}</p>
//           <p className="text-gray-500 mt-2">
//             There was a problem loading the infrastructure diagram. Please try again later.
//           </p>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="h-full relative bg-white rounded-lg p-4 shadow">
//       <div className="overflow-auto h-full p-4">
//         <MermaidRenderer chart={mermaidDiagram} className="h-full" />
//       </div>
//     </div>
//   );

  
// }

import React, { useState, useEffect } from 'react';
import { useDataContext } from '@/context/DataContext';

import { MermaidRenderer } from '@/components/MermaidRenderer';
import { getMockMermaidDiagram } from '@/lib/mockMermaidData';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, ArrowRight, FileText, Code } from 'lucide-react';
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination';

interface CloudResourceGraphProps {
  data?: any;
  isLoading?: boolean;
  onResourceSelect?: (resource: any) => void;
}

export function CloudResourceGraph({ isLoading: externalLoading }: CloudResourceGraphProps) {
  const navigate = useNavigate();
  
  const [mermaidDiagram, setMermaidDiagram] = useState<string>('');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentVersion, setCurrentVersion] = useState<number>(1);
  const [totalVersions, setTotalVersions] = useState<number>(3); // Mock total versions
  const { responses } = useDataContext();
  
  useEffect(() => {
    const fetchMermaidDiagram = async () => {
      try {
        
        const responseIndex = 0;

      //   if (respon) {
      //   setError('Invalid version selected');
      //   setIsLoading(false);
      //   return;
      // }
        const diagram = responses[responseIndex].changed_graph;
        setMermaidDiagram(diagram)
      } catch (err) {
        console.error('Error fetching diagram:', err);
        setError('Failed to load infrastructure diagram');
      } finally {
        setIsLoading(false);
      }
    };

    fetchMermaidDiagram();
  }, [currentVersion]); // Re-fetch when version changes

  const handlePrevious = () => {
    if (currentVersion > 1) {
      setCurrentVersion(currentVersion - 1);
    }
  };

  const handleNext = () => {
    if (currentVersion < totalVersions) {
      setCurrentVersion(currentVersion + 1);
    }
  };

  const navigateToReport = () => {
    navigate(`/report/${currentVersion}`);
  };

  const navigateToTerraform = () => {
    navigate(`/terraform/${currentVersion}`);
  };

  if (externalLoading || isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-gray-500">Loading cloud infrastructure diagram...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-screen">
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
    <div className="h-screen flex flex-col">
      <div className="bg-white p-4 flex justify-between items-center shadow-sm">
        <h2 className="text-lg font-semibold text-gray-700">Cloud Infrastructure Diagram (Version {currentVersion})</h2>
        <div className="flex gap-4">
          <Button 
            variant="outline" 
            onClick={navigateToReport}
            className="flex items-center gap-2"
          >
            <FileText size={18} />
            View Report
          </Button>
          <Button 
            variant="outline" 
            onClick={navigateToTerraform}
            className="flex items-center gap-2"
          >
            <Code size={18} />
            View Terraform Files
          </Button>
        </div>
      </div>
      
      <div className="flex-grow overflow-auto border border-gray-200 m-4">
        {mermaidDiagram ? (
          <MermaidRenderer chart={mermaidDiagram} className="h-full" />
        ) : (
          <p className="text-center text-gray-500">No diagram data available</p>
        )}
      </div>
      
      <div className="p-4 border-t border-gray-200">
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious 
                onClick={handlePrevious} 
                className={currentVersion <= 1 ? "opacity-50 cursor-not-allowed" : ""}
              />
            </PaginationItem>
            
            <PaginationItem>
              <PaginationLink isActive>{currentVersion}</PaginationLink>
            </PaginationItem>
            
            <PaginationItem>
              <PaginationNext 
                onClick={handleNext} 
                className={currentVersion >= totalVersions ? "opacity-50 cursor-not-allowed" : ""}
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
    </div>
  );
}