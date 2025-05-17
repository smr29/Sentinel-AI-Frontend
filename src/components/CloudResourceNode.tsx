import React, { memo } from 'react';
import { Handle, Position } from '@xyflow/react';
import { 
  Cloud, 
  Database, 
  Server, 
  Globe, 
  Shield, 
  Network, 
  Lock, 
  Key
} from 'lucide-react';

const getResourceIcon = (type: string) => {
  switch(type) {
    case 'virtualMachine':
      return <Server className="h-5 w-5" />;
    case 'database':
      return <Database className="h-5 w-5" />;
    case 'network':
      return <Network className="h-5 w-5" />;
    case 'internet':
      return <Globe className="h-5 w-5" />;
    case 'storage':
      return <Database className="h-5 w-5" />;
    case 'security':
      return <Shield className="h-5 w-5" />;
    case 'role':
      return <Key className="h-5 w-5" />;
    case 'org':
      return <Lock className="h-5 w-5" />;
    default:
      return <Cloud className="h-5 w-5" />;
  }
};

const getBgColor = (type: string) => {
  switch(type) {
    case 'virtualMachine':
      return 'bg-blue-100 border-blue-300';
    case 'database':
      return 'bg-green-100 border-green-300';
    case 'network':
      return 'bg-orange-100 border-orange-300';
    case 'internet':
      return 'bg-purple-100 border-purple-300';
    case 'storage':
      return 'bg-yellow-100 border-yellow-300';
    case 'security':
      return 'bg-red-100 border-red-300';
    case 'role':
      return 'bg-indigo-100 border-indigo-300';
    case 'org':
      return 'bg-gray-100 border-gray-300';
    default:
      return 'bg-gray-100 border-gray-300';
  }
};

function CloudResourceNode({ data }: { data: any }) {
  const Icon = getResourceIcon(data.type);
  const bgColorClass = getBgColor(data.type);
  
  const hasVulnerabilities = data.vulnerabilities && data.vulnerabilities.length > 0;
  const hasCriticalVulnerabilities = hasVulnerabilities && 
    data.vulnerabilities.some((v: any) => v.severity === 'critical');
  
  return (
    <div 
      className={`px-4 py-3 rounded-md shadow-sm border ${bgColorClass} relative`}
      onClick={data.onClick}
    >
      <Handle type="target" position={Position.Top} />
      
      <div className="flex items-center space-x-2">
        <div className={`p-2 rounded-full bg-white ${hasCriticalVulnerabilities ? 'ring-2 ring-red-500' : ''}`}>
          {Icon}
        </div>
        <div>
          <div className="font-medium text-sm">{data.name}</div>
          <div className="text-xs text-gray-500">{data.id}</div>
        </div>
      </div>
      
      {hasVulnerabilities && (
        <div className="absolute -top-2 -right-2 flex">
          <div 
            className={`h-5 w-5 rounded-full flex items-center justify-center text-xs font-bold text-white
              ${hasCriticalVulnerabilities 
                ? 'bg-red-500 animate-pulse-warning' 
                : 'bg-amber-500'}`}
          >
            {data.vulnerabilities.length}
          </div>
        </div>
      )}
      
      <Handle type="source" position={Position.Bottom} />
    </div>
  );
}

export default memo(CloudResourceNode);

export { CloudResourceNode };
