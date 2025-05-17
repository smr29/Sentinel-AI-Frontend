import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { RefreshCw, Search, Shield } from 'lucide-react';

interface DashboardHeaderProps {
  onRefresh: () => void;
  isLoading: boolean;
}

export function DashboardHeader({ onRefresh, isLoading }: DashboardHeaderProps) {
  return (
    <header className="bg-white border-b border-gray-200 py-4 px-6 shadow-sm">
      <div className="container mx-auto">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Shield className="h-8 w-8 text-cloud-blue" />
            <h1 className="text-2xl font-bold text-gray-800">Sentinel AI</h1>
          </div>
          
          <div className="flex items-center space-x-4">
            {/* <div className="relative w-64">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-400" />
              <Input 
                placeholder="Search resources..." 
                className="pl-8" 
              />
            </div>
            
            <Select defaultValue="aws">
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select Cloud Provider" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="aws">AWS</SelectItem>
                <SelectItem value="azure">Azure</SelectItem>
                <SelectItem value="gcp">Google Cloud</SelectItem>
              </SelectContent>
            </Select> */}
            
            <Button 
              variant="outline" 
              onClick={onRefresh} 
              disabled={isLoading}
            >
              <RefreshCw className={`h-4 w-4 mr-2 ${isLoading ? 'animate-spin' : ''}`} />
              Refresh
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}