import React, { useState } from 'react';
import { CloudDashboard } from '@/components/CloudResourceGraphPage';
import { DashboardHeader } from '@/components/DashboardHeader';
import { toast } from '@/components/ui/use-toast';

const Index = () => {
  const [isLoading, setIsLoading] = useState(false);
  
  const handleRefresh = () => {
    setIsLoading(true);
    // Simulate data refresh
    setTimeout(() => {
      setIsLoading(false);
      toast({
        title: "Dashboard Updated",
        description: "Cloud resources and vulnerabilities have been refreshed",
      });
    }, 1000);
  };

  return (
    <div className="flex flex-col min-h-screen bg-cloud-background">
      <DashboardHeader onRefresh={handleRefresh} isLoading={isLoading} />
      <main className="flex-1 container mx-auto px-4 py-6">
        <CloudDashboard isLoading={isLoading} />
      </main>
    </div>
  );
};

export default Index;