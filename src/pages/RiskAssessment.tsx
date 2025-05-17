import React from 'react';
import { DashboardHeader } from '@/components/DashboardHeader';
import { useState } from 'react';
import { toast } from '@/components/ui/use-toast';
import { RiskAssessment as RiskAssessmentComponent } from '@/components/RiskAssessment';
import { VulnerabilityPanel } from '@/components/VulnerabilityPanel';
import { ScrollArea } from '@/components/ui/scroll-area';
import { mockCloudData } from '@/lib/mockData';

const RiskAssessmentPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [selectedVulnerability, setSelectedVulnerability] = useState<any>(null);
  const [selectedResource, setSelectedResource] = useState<any>(null);
  
  // Collect all vulnerabilities from all resources
  const allVulnerabilities: any[] = [];
  mockCloudData.resources.forEach(resource => {
    if (resource.vulnerabilities && resource.vulnerabilities.length) {
      resource.vulnerabilities.forEach((vuln: any) => {
        allVulnerabilities.push({
          ...vuln,
          resourceName: resource.name,
          resourceId: resource.id,
          resourceType: resource.type
        });
      });
    }
  });
  
  const handleRefresh = () => {
    setIsLoading(true);
    // Simulate data refresh
    setTimeout(() => {
      setIsLoading(false);
      toast({
        title: "Risks Updated",
        description: "Vulnerability data has been refreshed",
      });
    }, 1000);
  };
  
  const handleVulnerabilitySelect = (vulnerability: any) => {
    setSelectedVulnerability(vulnerability);
    const relatedResource = mockCloudData.resources.find(
      resource => resource.id === vulnerability.resourceId
    );
    setSelectedResource(relatedResource);
  };
  
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
    <div className="flex flex-col min-h-screen bg-cloud-background">
      <DashboardHeader onRefresh={handleRefresh} isLoading={isLoading} />
      <main className="flex-1 container mx-auto px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-[calc(100vh-10rem)]">
          <div className="lg:col-span-2 bg-white rounded-lg shadow-sm border border-gray-200 overflow-y-scroll p-4">
            <h2 className="text-xl font-bold mb-4">Risk Assessment</h2>
            <RiskAssessmentComponent 
              vulnerabilities={allVulnerabilities} 
              onVulnerabilitySelect={handleVulnerabilitySelect}
            />
          </div>
          
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
            <ScrollArea className="h-full">
              {selectedVulnerability ? (
                <VulnerabilityPanel 
                  vulnerability={selectedVulnerability} 
                  resource={selectedResource}
                  onBack={() => setSelectedVulnerability(null)}
                  onApplyFix={handleApplyFix}
                />
              ) : (
                <div className="p-6 flex flex-col h-full items-center justify-center text-gray-500">
                  <p className="text-center mb-2">Select a vulnerability to view details</p>
                  <p className="text-center text-sm">Click on any vulnerability in the list to view more information</p>
                </div>
              )}
            </ScrollArea>
          </div>
        </div>
      </main>
    </div>
  );
};

export default RiskAssessmentPage;