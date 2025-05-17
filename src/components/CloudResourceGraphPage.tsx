import React, { useState, useEffect } from 'react';
import { CloudResourceGraph } from '@/components/CloudResourceGraph';
import { ResourcePanel } from '@/components/ResourcePanel';
import { VulnerabilityPanel } from '@/components/VulnerabilityPanel';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useToast } from '@/components/ui/use-toast';
import { mockCloudData } from '@/lib/mockData';
import { Shield } from 'lucide-react';

interface CloudDashboardProps {
  isLoading: boolean;
}

export function CloudDashboard({ isLoading }: CloudDashboardProps) {
  const { toast } = useToast();
  const [selectedResource, setSelectedResource] = useState<any>(null);
  const [selectedVulnerability, setSelectedVulnerability] = useState<any>(null);

  // Handle clicking on a resource node in the graph
  const handleResourceSelect = (resource: any) => {
    setSelectedResource(resource);
    setSelectedVulnerability(null); // Clear vulnerability when selecting a new resource
  };
  
  // Handle clicking on a vulnerability
  const handleVulnerabilitySelect = (vulnerability: any) => {
    setSelectedVulnerability(vulnerability);
  };
  
  // Handle applying a fix for a vulnerability
  const handleApplyFix = (vulnerability: any) => {
    toast({
      title: "Fix Applied",
      description: `The fix for ${vulnerability.title} has been applied successfully.`,
    });
    
    // Update the vulnerability status in our state
    if (selectedVulnerability) {
      setSelectedVulnerability({
        ...selectedVulnerability,
        status: 'fixed'
      });
    }
  };

  return (
    <div className="gap-6 min-h-screen">
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        <CloudResourceGraph 
          data={mockCloudData} 
          isLoading={isLoading} 
          onResourceSelect={handleResourceSelect} 
        />
      </div>
    </div>
  );
}
