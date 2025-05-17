import React, { useState } from 'react';
import { DashboardHeader } from '@/components/DashboardHeader';
import { toast } from '@/components/ui/use-toast';
import { AccessControl as AccessControlComponent } from '@/components/AccessControl';

const AccessControlPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  
  // Generate mock access paths
  const accessPaths = [
    {
      source: { name: 'User Admin', type: 'user', id: 'user-001' },
      target: { name: 'Customer Database', type: 'database', id: 'db-003' },
      nodes: [
        { name: 'User Admin', type: 'user', id: 'user-001' },
        { name: 'Admin Role', type: 'role', id: 'role-001' },
        { name: 'API Server', type: 'server', id: 'vm-002' },
        { name: 'Customer Database', type: 'database', id: 'db-003' }
      ],
      permissions: ['Read', 'Write', 'Delete', 'Admin'],
      risk: 'high'
    },
    {
      source: { name: 'Developer', type: 'user', id: 'user-002' },
      target: { name: 'Product API', type: 'server', id: 'api-001' },
      nodes: [
        { name: 'Developer', type: 'user', id: 'user-002' },
        { name: 'Developer Role', type: 'role', id: 'role-002' },
        { name: 'Product API', type: 'server', id: 'api-001' }
      ],
      permissions: ['Read', 'Execute'],
      risk: 'low'
    },
    {
      source: { name: 'Analytics Service', type: 'server', id: 'svc-001' },
      target: { name: 'Data Warehouse', type: 'database', id: 'db-002' },
      nodes: [
        { name: 'Analytics Service', type: 'server', id: 'svc-001' },
        { name: 'Analyst Role', type: 'role', id: 'role-003' },
        { name: 'Data Warehouse', type: 'database', id: 'db-002' }
      ],
      permissions: ['Read'],
      risk: 'low'
    },
    {
      source: { name: 'External Partner', type: 'user', id: 'partner-001' },
      target: { name: 'Order System', type: 'server', id: 'sys-001' },
      nodes: [
        { name: 'External Partner', type: 'user', id: 'partner-001' },
        { name: 'Partner API', type: 'server', id: 'api-002' },
        { name: 'Partner Role', type: 'role', id: 'role-004' },
        { name: 'Order System', type: 'server', id: 'sys-001' }
      ],
      permissions: ['Limited Read', 'Create Orders'],
      risk: 'medium'
    }
  ];
  
  const handleRefresh = () => {
    setIsLoading(true);
    // Simulate data refresh
    setTimeout(() => {
      setIsLoading(false);
      toast({
        title: "Access Paths Updated",
        description: "Access control paths have been refreshed",
      });
    }, 1000);
  };

  return (
    <div className="flex flex-col min-h-screen bg-cloud-background">
      <DashboardHeader onRefresh={handleRefresh} isLoading={isLoading} />
      <main className="flex-1 container mx-auto px-4 py-6">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden p-4">
          <h2 className="text-xl font-bold mb-4">Access Control Paths</h2>
          <AccessControlComponent accessPaths={accessPaths} />
        </div>
      </main>
    </div>
  );
};

export default AccessControlPage;