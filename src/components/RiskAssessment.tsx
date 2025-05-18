import React from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { useDataContext } from '@/context/DataContext';
import { ShieldAlert, AlertTriangle, AlertCircle, Info } from 'lucide-react';

interface RiskAssessmentProps {
  vulnerabilities: any[];
  onVulnerabilitySelect?: (vulnerability: any) => void;
}

export function RiskAssessment({ vulnerabilities, onVulnerabilitySelect }: RiskAssessmentProps) {
  // Sort vulnerabilities by severity (critical, high, medium, low)
    const { responses } = useDataContext();
      const latest = responses[responses.length - 1];

  const sortedVulnerabilities = [...vulnerabilities].sort((a, b) => {
    const severityOrder = { critical: 0, high: 1, medium: 2, low: 3 };
    return severityOrder[a.severity as keyof typeof severityOrder] - severityOrder[b.severity as keyof typeof severityOrder];
  });

  // Get severity icon
  const getSeverityIcon = (severity: string) => {
    switch (severity) {
      case 'critical':
        return <ShieldAlert className="h-4 w-4 text-red-600" />;
      case 'high':
        return <AlertTriangle className="h-4 w-4 text-orange-500" />;
      case 'medium':
        return <AlertCircle className="h-4 w-4 text-yellow-500" />;
      case 'low':
        return <Info className="h-4 w-4 text-blue-500" />;
      default:
        return null;
    }
  };

  // Get severity badge color
  const getSeverityBadgeColor = (severity: string) => {
    switch (severity) {
      case 'critical':
        return 'bg-red-100 text-red-800 hover:bg-red-200';
      case 'high':
        return 'bg-orange-100 text-orange-800 hover:bg-orange-200';
      case 'medium':
        return 'bg-yellow-100 text-yellow-800 hover:bg-yellow-200';
      case 'low':
        return 'bg-blue-100 text-blue-800 hover:bg-blue-200';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Severity</TableHead>
            <TableHead>Vulnerability</TableHead>
            <TableHead>Resource</TableHead>
            <TableHead className="w-[150px]">Type</TableHead>
            <TableHead className="w-[120px]">Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {sortedVulnerabilities.map((vulnerability, index) => (
            <TableRow 
              key={index}
              className={`cursor-pointer hover:bg-gray-50 ${vulnerability.status === 'fixed' ? 'opacity-60' : ''}`}
              onClick={() => onVulnerabilitySelect && onVulnerabilitySelect(vulnerability)}
            >
              <TableCell>
                <div className="flex items-center">
                  {getSeverityIcon(vulnerability.severity)}
                  <span className={`ml-1 capitalize`}>{vulnerability.severity}</span>
                </div>
              </TableCell>
              <TableCell>
                <div className="font-medium">{vulnerability.title}</div>
                <div className="text-sm text-gray-500">{vulnerability.description.substring(0, 60)}...</div>
              </TableCell>
              <TableCell>{vulnerability.resourceName}</TableCell>
              <TableCell>{vulnerability.resourceType}</TableCell>
              <TableCell>
                <Badge 
                  variant="outline" 
                  className={`${
                    vulnerability.status === 'active' 
                      ? 'bg-red-100 text-red-800' 
                      : vulnerability.status === 'fixed' 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-yellow-100 text-yellow-800'
                  }`}
                >
                  {vulnerability.status === 'active' ? 'Active' : 
                   vulnerability.status === 'fixed' ? 'Fixed' : 'In Progress'}
                </Badge>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}