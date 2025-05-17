import React, { useState } from 'react';
import { Shield, Lock, User, Server, Database, Key, AlertTriangle } from 'lucide-react';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

interface AccessControlProps {
  accessPaths: any[];
}

export function AccessControl({ accessPaths }: AccessControlProps) {
  const [selectedPath, setSelectedPath] = useState<any>(null);
  
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 h-full">
      <div className="flex flex-col">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold">Access Paths</h2>
          <Badge variant="outline" className="flex items-center gap-1">
            <Lock className="h-3 w-3" />
            {accessPaths.length} Paths Found
          </Badge>
        </div>
        
        <ScrollArea className="flex-1 pr-4">
          <div className="space-y-3">
            {accessPaths.map((path, index) => (
              <div
                key={index}
                className={`p-4 border rounded-md cursor-pointer transition-colors ${
                  selectedPath === path
                    ? 'border-blue-500 bg-blue-50'
                    : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                }`}
                onClick={() => setSelectedPath(path)}
              >
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-medium flex items-center">
                    <User className="h-4 w-4 mr-2" />
                    {path.source.name} → {path.target.name}
                  </h3>
                  {path.risk === 'high' && (
                    <Badge variant="destructive" className="flex items-center gap-1">
                      <AlertTriangle className="h-3 w-3" />
                      High Risk
                    </Badge>
                  )}
                </div>
                <p className="text-sm text-gray-500 mb-3">
                  Path through {path.nodes.length} resources
                </p>
                <div className="flex flex-wrap gap-2">
                  {path.nodes.map((node: any, i: number) => (
                    <React.Fragment key={i}>
                      <Badge variant="outline" className="bg-gray-50">
                        {node.name}
                      </Badge>
                      {i < path.nodes.length - 1 && (
                        <span className="text-gray-400">→</span>
                      )}
                    </React.Fragment>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>
      </div>
      
      {selectedPath ? (
        <div className="border border-gray-200 rounded-lg overflow-hidden bg-white">
          <div className="p-4 border-b border-gray-200 bg-gray-50">
            <h3 className="font-medium">Access Path Details</h3>
            <p className="text-sm text-gray-600">
              This shows how {selectedPath.source.name} can access {selectedPath.target.name}
            </p>
          </div>
          
          <ScrollArea className="h-[calc(100vh-18rem)]">
            <div className="p-4">
              <div className="mb-6">
                <h4 className="text-sm font-medium text-gray-500 mb-2">Path Overview</h4>
                <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                  <div className="flex flex-col space-y-4">
                    {selectedPath.nodes.map((node: any, index: number) => (
                      <div key={index} className="flex items-center">
                        <div className="flex-shrink-0 w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center mr-3">
                          {node.type === 'user' ? (
                            <User className="h-5 w-5 text-blue-600" />
                          ) : node.type === 'role' ? (
                            <Key className="h-5 w-5 text-blue-600" />
                          ) : node.type === 'database' ? (
                            <Database className="h-5 w-5 text-blue-600" />
                          ) : (
                            <Server className="h-5 w-5 text-blue-600" />
                          )}
                        </div>
                        <div className="flex-1">
                          <div className="font-medium">{node.name}</div>
                          <div className="text-xs text-gray-500">{node.type} • {node.id}</div>
                        </div>
                        {index < selectedPath.nodes.length - 1 && (
                          <div className="flex-shrink-0 h-6 border-l border-gray-300 mx-5"></div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              
              <div className="mb-6">
                <h4 className="text-sm font-medium text-gray-500 mb-2">Permissions</h4>
                <div className="border border-gray-200 rounded-lg overflow-hidden">
                  <div className="bg-gray-50 p-2 px-4 text-sm font-medium border-b border-gray-200">
                    Effective Permissions
                  </div>
                  <div className="p-4">
                    <ul className="space-y-2">
                      {selectedPath.permissions?.map((permission: string, i: number) => (
                        <li key={i} className="flex items-center">
                          <span className="w-2 h-2 rounded-full bg-blue-500 mr-2"></span>
                          <span>{permission}</span>
                        </li>
                      )) || (
                        <li className="text-gray-500">No specific permissions found</li>
                      )}
                    </ul>
                  </div>
                </div>
              </div>
              
              {selectedPath.risk === 'high' && (
                <div className="mb-6">
                  <h4 className="text-sm font-medium text-gray-500 mb-2">Risk Assessment</h4>
                  <div className="border border-red-200 rounded-lg bg-red-50 p-4 text-red-800">
                    <div className="flex items-start">
                      <AlertTriangle className="h-5 w-5 mr-2 flex-shrink-0 mt-0.5" />
                      <div>
                        <p className="font-medium mb-2">High Risk Access Path</p>
                        <p className="text-sm">
                          This access path grants excessive permissions that could lead to privilege escalation or data exposure.
                          Consider implementing least-privilege policies.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </ScrollArea>
          
          <div className="border-t border-gray-200 p-4 bg-gray-50">
            <Button variant="outline">Export Path Details</Button>
          </div>
        </div>
      ) : (
        <div className="border border-gray-200 rounded-lg flex items-center justify-center bg-white">
          <div className="text-center p-6">
            <div className="inline-flex items-center justify-center p-3 bg-gray-100 rounded-full mb-3">
              <Lock className="h-6 w-6 text-gray-400" />
            </div>
            <h3 className="text-lg font-medium mb-2">No access path selected</h3>
            <p className="text-gray-500 text-sm">
              Select an access path from the list to view details
            </p>
          </div>
        </div>
      )}
    </div>
  );
}