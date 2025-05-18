// src/pages/Terraform.tsx
import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { DashboardHeader } from '@/components/DashboardHeader';
import { useDataContext } from '@/context/DataContext';

const Terraform = () => {
  const { version } = useParams();
  const navigate = useNavigate();
  const { responses } = useDataContext();

  
  const sortedResponses = [...responses].sort((a, b) => b.timestamp - a.timestamp);
  const index = version ? parseInt(version) - 1 : 0;
  const currentResponse = sortedResponses[index] || null;

  const oldTerraform = responses[0].original_terraform
    const newTerraform = responses[0].changed_terraform


  const handleBack = () => navigate('/');

  if (!oldTerraform || !newTerraform) {
    return (
      <>
        <DashboardHeader onRefresh={() => {}} isLoading={false} />
        <div className="flex items-center justify-center h-screen">
          <p className="text-gray-500">Terraform data not available</p>
        </div>
      </>
    );
  }

  return (
    <>
      <DashboardHeader onRefresh={() => {}} isLoading={false} />

      <div className="container mx-auto p-6">
        <div className="flex items-center mb-6">
          <Button variant="ghost" onClick={handleBack} className="mr-4">
            <ArrowLeft className="h-5 w-5 mr-2" />
          </Button>
          <h1 className="text-2xl font-bold">
            Terraform Diff 
          </h1>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Original Terraform</CardTitle>
            </CardHeader>
            <CardContent>
              <pre className="bg-gray-100 p-4 rounded-md overflow-auto h-[500px] text-sm whitespace-pre-wrap">
                {oldTerraform}
              </pre>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Changed Terraform</CardTitle>
            </CardHeader>
            <CardContent>
              <pre className="bg-gray-100 p-4 rounded-md overflow-auto h-[500px] text-sm whitespace-pre-wrap">
                {newTerraform}
              </pre>
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  );
};

export default Terraform;
