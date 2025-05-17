import React from 'react';
import { 
  Shield, 
  AlertTriangle, 
  Layers, 
  RefreshCw, 
  Clock, 
  GitBranch, 
  Tag,
  Server,
  Database,
  Network,
  Globe,
  Key,
  Lock
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';

interface ResourcePanelProps {
  resource: any;
  onVulnerabilitySelect: (vulnerability: any) => void;
}

// Helper function to get the icon based on resource type
const getResourceIcon = (type: string) => {
  switch(type) {
    case 'virtualMachine':
      return <Server className="h-6 w-6" />;
    case 'database':
      return <Database className="h-6 w-6" />;
    case 'network':
      return <Network className="h-6 w-6" />;
    case 'internet':
      return <Globe className="h-6 w-6" />;
    case 'role':
      return <Key className="h-6 w-6" />;
    case 'org':
      return <Lock className="h-6 w-6" />;
    default:
      return <Server className="h-6 w-6" />;
  }
};

// Helper function to get the severity badge
const getSeverityBadge = (severity: string) => {
  switch(severity) {
    case 'critical':
      return <Badge variant="destructive">Critical</Badge>;
    case 'high':
      return <Badge className="bg-orange-500">High</Badge>;
    case 'medium':
      return <Badge className="bg-yellow-500 text-black">Medium</Badge>;
    case 'low':
      return <Badge className="bg-blue-500">Low</Badge>;
    default:
      return <Badge variant="outline">Unknown</Badge>;
  }
};

export function ResourcePanel({ resource, onVulnerabilitySelect }: ResourcePanelProps) {
  const icon = getResourceIcon(resource.type);
  
  // Check if resource has vulnerabilities
  const hasVulnerabilities = 
    resource.vulnerabilities && 
    resource.vulnerabilities.length > 0;
  
  return (
    <div className="flex flex-col h-full">
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center space-x-3 mb-4">
          <div className="p-2 bg-gray-100 rounded-md">
            {icon}
          </div>
          <div>
            <h2 className="text-xl font-semibold">{resource.name}</h2>
            <p className="text-sm text-gray-500">{resource.type} · {resource.id}</p>
          </div>
        </div>
        
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div className="text-sm">
            <span className="block text-gray-500">Region</span>
            <span>{resource.region || 'us-east-1'}</span>
          </div>
          <div className="text-sm">
            <span className="block text-gray-500">Created</span>
            <span>{resource.createdAt || '2025-04-29'}</span>
          </div>
          <div className="text-sm">
            <span className="block text-gray-500">Last Updated</span>
            <span>{resource.updatedAt || '2025-05-10'}</span>
          </div>
          <div className="text-sm">
            <span className="block text-gray-500">Cloud Provider</span>
            <span>{resource.provider || 'AWS'}</span>
          </div>
        </div>
        
        <div className="flex space-x-2 mb-4">
          <Badge variant="outline" className="flex items-center gap-1">
            <RefreshCw className="h-3 w-3" />
            Last scanned: 10 mins ago
          </Badge>
          <Badge variant="outline" className="flex items-center gap-1">
            <Clock className="h-3 w-3" />
            Uptime: 99.9%
          </Badge>
        </div>
      </div>
      
      {hasVulnerabilities ? (
        <ScrollArea className="flex-1 p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-medium flex items-center">
              <AlertTriangle className="h-4 w-4 mr-2 text-amber-500" />
              Vulnerabilities ({resource.vulnerabilities.length})
            </h3>
            <Button variant="outline" size="sm">
              <RefreshCw className="h-3 w-3 mr-1" />
              Scan Now
            </Button>
          </div>
          
          <div className="space-y-4">
            {resource.vulnerabilities.map((vulnerability: any) => (
              <div 
                key={vulnerability.id} 
                className="p-4 border border-gray-200 rounded-md hover:border-gray-300 hover:bg-gray-50 cursor-pointer"
                onClick={() => onVulnerabilitySelect(vulnerability)}
              >
                <div className="flex justify-between items-start mb-2">
                  <h4 className="font-medium text-sm">{vulnerability.title}</h4>
                  {getSeverityBadge(vulnerability.severity)}
                </div>
                <p className="text-sm text-gray-500 mb-3">{vulnerability.description}</p>
                <div className="flex items-center justify-between text-xs">
                  <div className="flex items-center text-gray-500">
                    <Clock className="h-3 w-3 mr-1" />
                    Discovered {vulnerability.discoveredAt}
                  </div>
                  <div className="flex items-center">
                    <div className="flex items-center text-blue-600 hover:text-blue-800">
                      View Details →
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>
      ) : (
        <div className="flex-1 flex items-center justify-center p-6">
          <div className="text-center">
            <div className="inline-flex items-center justify-center p-3 bg-green-100 rounded-full mb-3">
              <Shield className="h-6 w-6 text-green-600" />
            </div>
            <h3 className="text-lg font-medium mb-2">No vulnerabilities detected</h3>
            <p className="text-gray-500 text-sm">
              This resource has passed all security checks
            </p>
          </div>
        </div>
      )}
      
      <div className="border-t border-gray-200 p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Button variant="outline" size="sm">
              <Layers className="h-4 w-4 mr-2" />
              Related Resources
            </Button>
            <Button variant="outline" size="sm">
              <GitBranch className="h-4 w-4 mr-2" />
              Access Paths
            </Button>
          </div>
          <Button variant="outline" size="sm">
            <Tag className="h-4 w-4 mr-2" />
            Tags
          </Button>
        </div>
      </div>
    </div>
  );
}