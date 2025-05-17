import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { DashboardHeader } from '@/components/DashboardHeader';

interface Finding {
  id: number;
  severity: 'High' | 'Medium' | 'Low';
  description: string;
  impact: string;
}

interface ReportData {
  id: number;
  version: string;
  date: string;
  findings: Finding[];
}

const Report = () => {
  const { version } = useParams();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [allReports, setAllReports] = useState<ReportData[]>([]);
  const [currentReport, setCurrentReport] = useState<ReportData | null>(null);

  useEffect(() => {
    // Simulating API fetch for the reports
    const fetchReports = async () => {
      setIsLoading(true);
      
      // Mock data - in a real app, this would come from an API
      setTimeout(() => {
        const mockReports: ReportData[] = [
          {
            id: 3,
            version: '3',
            date: new Date().toLocaleDateString(),
            findings: [
              { id: 1, severity: 'High', description: 'S3 bucket with public access', impact: 'Data exposure' },
              { id: 2, severity: 'Medium', description: 'Security group with open ports', impact: 'Potential unauthorized access' },
              { id: 3, severity: 'Low', description: 'IAM role with excessive permissions', impact: 'Privilege escalation risk' },
            ]
          },
          {
            id: 2,
            version: '2',
            date: new Date(Date.now() - 86400000).toLocaleDateString(),
            findings: [
              { id: 1, severity: 'High', description: 'S3 bucket with public access', impact: 'Data exposure' },
              { id: 2, severity: 'Medium', description: 'Security group with open ports', impact: 'Potential unauthorized access' },
            ]
          },
          {
            id: 1,
            version: '1',
            date: new Date(Date.now() - 172800000).toLocaleDateString(),
            findings: [
              { id: 1, severity: 'High', description: 'S3 bucket with public access', impact: 'Data exposure' },
            ]
          }
        ];
        
        // Store reports with most recent first
        setAllReports(mockReports);
        
        // Find the requested report version
        const reportVersion = version ? parseInt(version) : 3; // Default to latest (3)
        const foundReport = mockReports.find(r => r.id === reportVersion) || mockReports[0];
        setCurrentReport(foundReport);
        
        setIsLoading(false);
      }, 500);
    };

    fetchReports();
  }, [version]);

  const handleBack = () => {
    navigate('/');
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-gray-500">Loading report...</p>
      </div>
    );
  }

  if (!currentReport) {
    return (
    <>
    <DashboardHeader onRefresh={function (): void {
                throw new Error('Function not implemented.');
            } } isLoading={false}/>
    <div className="flex items-center justify-center h-screen">
        <p className="text-gray-500">Report not found</p>
      </div>
    </>
      
    );
  }

  return (
    <>
    <DashboardHeader onRefresh={function (): void {
                throw new Error('Function not implemented.');
            } } isLoading={false}/>
    <div className="p-6">
      <div className="flex items-center mb-6">
        <Button variant="ghost" onClick={handleBack} className="mr-4">
          <ArrowLeft className="h-5 w-5 mr-2" />
        </Button>
        <h1 className="text-2xl font-bold">Infrastructure Report - Version {currentReport.version}</h1>
      </div>

      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Summary</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="mb-2">Report Date: {currentReport.date}</p>
          <p className="mb-2">Total Findings: {currentReport.findings.length}</p>
          <p>This report provides an analysis of the cloud infrastructure shown in the diagram.</p>
        </CardContent>
      </Card>

      <h2 className="text-xl font-semibold mb-4">Findings</h2>
      {currentReport.findings.map((finding: Finding) => (
        <Card key={finding.id} className="mb-4">
          <CardHeader>
            <div className="flex justify-between items-center">
              <CardTitle className="text-lg">Finding #{finding.id}</CardTitle>
              <span className={`px-3 py-1 rounded-full text-sm ${
                finding.severity === 'High' ? 'bg-red-100 text-red-800' :
                finding.severity === 'Medium' ? 'bg-yellow-100 text-yellow-800' :
                'bg-blue-100 text-blue-800'
              }`}>
                {finding.severity}
              </span>
            </div>
          </CardHeader>
          <CardContent>
            <p className="font-medium mb-2">{finding.description}</p>
            <p className="text-gray-600"><strong>Impact:</strong> {finding.impact}</p>
          </CardContent>
        </Card>
      ))}
    </div>
    </>
  );
};

export default Report;