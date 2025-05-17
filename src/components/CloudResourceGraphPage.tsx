// import React, { useState, useEffect } from 'react';
// import { CloudResourceGraph } from '@/components/CloudResourceGraph';
// import { ResourcePanel } from '@/components/ResourcePanel';
// import { VulnerabilityPanel } from '@/components/VulnerabilityPanel';
// import { ScrollArea } from '@/components/ui/scroll-area';
// import { useToast } from '@/components/ui/use-toast';
// import { mockCloudData } from '@/lib/mockData';
// import { Shield } from 'lucide-react';

// interface CloudDashboardProps {
//   isLoading: boolean;
// }

// export function CloudDashboard({ isLoading }: CloudDashboardProps) {
//   const { toast } = useToast();
//   const [selectedResource, setSelectedResource] = useState<any>(null);
//   const [selectedVulnerability, setSelectedVulnerability] = useState<any>(null);

//   // Handle clicking on a resource node in the graph
//   const handleResourceSelect = (resource: any) => {
//     setSelectedResource(resource);
//     setSelectedVulnerability(null); // Clear vulnerability when selecting a new resource
//   };
  
//   // Handle clicking on a vulnerability
//   const handleVulnerabilitySelect = (vulnerability: any) => {
//     setSelectedVulnerability(vulnerability);
//   };
  
//   // Handle applying a fix for a vulnerability
//   const handleApplyFix = (vulnerability: any) => {
//     toast({
//       title: "Fix Applied",
//       description: `The fix for ${vulnerability.title} has been applied successfully.`,
//     });
    
//     // Update the vulnerability status in our state
//     if (selectedVulnerability) {
//       setSelectedVulnerability({
//         ...selectedVulnerability,
//         status: 'fixed'
//       });
//     }
//   };

//   return (
//     <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-[calc(100vh-10rem)]">
//       <div className="lg:col-span-2 bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
//         <CloudResourceGraph 
//           data={mockCloudData} 
//           isLoading={isLoading} 
//           onResourceSelect={handleResourceSelect} 
//         />
//       </div>
      
//       <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
//         <ScrollArea className="h-full">
//           {selectedResource && !selectedVulnerability ? (
//             <ResourcePanel 
//               resource={selectedResource} 
//               onVulnerabilitySelect={handleVulnerabilitySelect} 
//             />
//           ) : selectedVulnerability ? (
//             <VulnerabilityPanel 
//               vulnerability={selectedVulnerability} 
//               resource={selectedResource}
//               onBack={() => setSelectedVulnerability(null)}
//               onApplyFix={handleApplyFix}
//             />
//           ) : (
//             <div className="p-6 flex flex-col h-full items-center justify-center text-gray-500">
//               <div className="mb-4">
//                 <Shield className="h-12 w-12 mx-auto opacity-50" />
//               </div>
//               <p className="text-center mb-2">Select a resource or vulnerability</p>
//               <p className="text-center text-sm">Click on any node in the graph to view details</p>
//             </div>
//           )}
//         </ScrollArea>
//       </div>
//     </div>
//   );
// }
