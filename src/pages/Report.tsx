import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { DashboardHeader } from '@/components/DashboardHeader';
import { useDataContext } from '@/context/DataContext'; //Import context

interface Finding {
  id: number;
  severity: 'High' | 'Medium' | 'Low';
  description: string;
  impact: string;
}

const Report = () => {
  const { version } = useParams();
  const navigate = useNavigate();
  const { responses } = useDataContext(); // ✅ Use context

  //Determine which response to show based on version param
  const index = version ? parseInt(version) - 1 : responses.length - 1;
  const selectedResponse = responses[index];

  const handleBack = () => {
    navigate('/');
  };

  if (!selectedResponse) {
    return (
      <>
        <DashboardHeader
          onRefresh={() => {}}
          isLoading={false}
        />
        <div className="flex items-center justify-center h-screen">
          <p className="text-gray-500">Report not found</p>
        </div>
      </>
    );
  }

  // ✅ Map backend structure to local format for rendering
  const findings: Finding[] = selectedResponse.report.map((item, idx) => ({
    id: idx + 1,
    severity:
      item.severity === 'high'
        ? 'High'
        : item.severity === 'medium'
        ? 'Medium'
        : 'Low',
    description: `${item.vulnerability} in ${item.resource_type} (${item.resource_name})`,
    impact: item.potential_impact,
  }));

  const reportDate = new Date(selectedResponse.timestamp).toLocaleDateString();

  return (
    <>
      <DashboardHeader onRefresh={() => {}} isLoading={false} />
      <div className="p-6">
        <div className="flex items-center mb-6">
          <Button variant="ghost" onClick={handleBack} className="mr-4">
            <ArrowLeft className="h-5 w-5 mr-2" />
          </Button>
          <h1 className="text-2xl font-bold">
            Infrastructure Report - Version {index + 1}
          </h1>
        </div>

        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Summary</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="mb-2">Report Date: {reportDate}</p>
            <p className="mb-2">Total Findings: {findings.length}</p>
            <p>
              This report provides an analysis of the cloud infrastructure shown
              in the diagram.
            </p>
          </CardContent>
        </Card>

        <h2 className="text-xl font-semibold mb-4">Findings</h2>
        {findings.map((finding) => (
          <Card key={finding.id} className="mb-4">
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle className="text-lg">Finding #{finding.id}</CardTitle>
                <span
                  className={`px-3 py-1 rounded-full text-sm ${
                    finding.severity === 'High'
                      ? 'bg-red-100 text-red-800'
                      : finding.severity === 'Medium'
                      ? 'bg-yellow-100 text-yellow-800'
                      : 'bg-blue-100 text-blue-800'
                  }`}
                >
                  {finding.severity}
                </span>
              </div>
            </CardHeader>
            <CardContent>
              <p className="font-medium mb-2">{finding.description}</p>
              <p className="text-gray-600">
                <strong>Impact:</strong> {finding.impact}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>
    </>
  );
};

export default Report;
