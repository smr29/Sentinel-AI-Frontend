import React, { useState } from 'react';
import { 
  Server, 
  Database, 
  Network, 
  Globe, 
  Key, 
  Lock,
  AlertTriangle, 
  AlertCircle, 
  Info, 
  ChevronDown,
  ChevronUp,
  X
} from 'lucide-react';

export function GraphLegend() {
  const [isOpen, setIsOpen] = useState(true);
  
  const resourceTypes = [
    { icon: <Server className="h-4 w-4" />, label: 'Virtual Machine', color: 'text-blue-500' },
    { icon: <Database className="h-4 w-4" />, label: 'Database', color: 'text-green-500' },
    { icon: <Network className="h-4 w-4" />, label: 'Network', color: 'text-purple-500' },
    { icon: <Globe className="h-4 w-4" />, label: 'Internet', color: 'text-gray-500' },
    { icon: <Key className="h-4 w-4" />, label: 'IAM Role', color: 'text-yellow-500' },
    { icon: <Lock className="h-4 w-4" />, label: 'Organization', color: 'text-indigo-500' },
  ];
  
  const riskLevels = [
    { icon: <AlertTriangle className="h-4 w-4" />, label: 'Critical Risk', color: 'text-red-500' },
    { icon: <AlertTriangle className="h-4 w-4" />, label: 'High Risk', color: 'text-orange-500' },
    { icon: <AlertCircle className="h-4 w-4" />, label: 'Medium Risk', color: 'text-yellow-500' },
    { icon: <Info className="h-4 w-4" />, label: 'Low Risk', color: 'text-blue-500' },
  ];
  
  if (!isOpen) {
    return (
      <button 
        className="absolute bottom-4 right-4 z-10 bg-white p-2 rounded-md shadow-md border border-gray-200 flex items-center text-sm"
        onClick={() => setIsOpen(true)}
      >
        <Info className="h-4 w-4 mr-1" />
        Show Legend
      </button>
    );
  }
  
  return (
    <div className="absolute bottom-4 right-4 z-10 bg-white rounded-md shadow-md border border-gray-200 max-w-xs">
      <div className="p-3 border-b border-gray-200 flex items-center justify-between">
        <h3 className="font-medium text-sm">Graph Legend</h3>
        <div className="flex space-x-1">
          <button 
            className="p-1 hover:bg-gray-100 rounded"
            onClick={() => setIsOpen(false)}
          >
            <ChevronDown className="h-4 w-4" />
          </button>
          <button 
            className="p-1 hover:bg-gray-100 rounded"
            onClick={() => setIsOpen(false)}
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      </div>
      
      <div className="p-3">
        <div className="mb-3">
          <h4 className="text-xs font-medium text-gray-500 mb-2">Resource Types</h4>
          <div className="grid grid-cols-2 gap-2">
            {resourceTypes.map((item, index) => (
              <div key={index} className="flex items-center text-xs">
                <div className={`w-5 h-5 rounded-full flex items-center justify-center bg-gray-100 mr-1.5 ${item.color}`}>
                  {item.icon}
                </div>
                <span>{item.label}</span>
              </div>
            ))}
          </div>
        </div>
        
        <div>
          <h4 className="text-xs font-medium text-gray-500 mb-2">Risk Levels</h4>
          <div className="grid grid-cols-2 gap-2">
            {riskLevels.map((item, index) => (
              <div key={index} className="flex items-center text-xs">
                <div className={`w-5 h-5 rounded-full flex items-center justify-center bg-gray-100 mr-1.5 ${item.color}`}>
                  {item.icon}
                </div>
                <span>{item.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
