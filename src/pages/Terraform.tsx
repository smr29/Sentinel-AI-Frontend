import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { DashboardHeader } from '@/components/DashboardHeader';

interface TerraformData {
  id: number;
  version: string;
  date: string;
  oldCode: string;
  newCode: string;
}

const Terraform = () => {
  const { version } = useParams();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [allTerraformVersions, setAllTerraformVersions] = useState<TerraformData[]>([]);
  const [currentTerraform, setCurrentTerraform] = useState<TerraformData | null>(null);

  useEffect(() => {
    // Simulating API fetch for terraform files
    const fetchTerraformVersions = async () => {
      setIsLoading(true);
      
      // Mock data - in a real app, this would come from an API
      setTimeout(() => {
        const mockTerraform: TerraformData[] = [
          {
            id: 3,
            version: '3',
            date: new Date().toLocaleDateString(),
            oldCode: `resource "aws_s3_bucket" "example" {
  bucket = "my-tf-test-bucket"
  acl    = "private"
  
  tags = {
    Name        = "My bucket"
    Environment = "Dev"
  }
}`,
            newCode: `resource "aws_s3_bucket" "example" {
  bucket = "my-tf-test-bucket"
  
  tags = {
    Name        = "My bucket"
    Environment = "Production"
  }
}

resource "aws_s3_bucket_acl" "example" {
  bucket = aws_s3_bucket.example.id
  acl    = "private"
}`
          },
          {
            id: 2,
            version: '2',
            date: new Date(Date.now() - 86400000).toLocaleDateString(),
            oldCode: `resource "aws_s3_bucket" "example" {
  bucket = "my-tf-test-bucket"
  
  tags = {
    Name        = "My bucket"
    Environment = "Test"
  }
}`,
            newCode: `resource "aws_s3_bucket" "example" {
  bucket = "my-tf-test-bucket"
  acl    = "private"
  
  tags = {
    Name        = "My bucket"
    Environment = "Dev"
  }
}`
          },
          {
            id: 1,
            version: '1',
            date: new Date(Date.now() - 172800000).toLocaleDateString(),
            oldCode: `# Initial version`,
            newCode: `resource "aws_s3_bucket" "example" {
  bucket = "my-tf-test-bucket"
  
  tags = {
    Name        = "My bucket"
    Environment = "Test"
  }
}`
          }
        ];
        
        // Store terraform versions with most recent first
        setAllTerraformVersions(mockTerraform);
        
        // Find the requested terraform version
        const terraformVersion = version ? parseInt(version) : 3; // Default to latest (3)
        const foundTerraform = mockTerraform.find(t => t.id === terraformVersion) || mockTerraform[0];
        setCurrentTerraform(foundTerraform);
        
        setIsLoading(false);
      }, 500);
    };

    fetchTerraformVersions();
  }, [version]);

  const handleBack = () => {
    navigate('/');
  };

  if (isLoading) {
    return (
      <>
      <div className="flex items-center justify-center h-screen">
        <p className="text-gray-500">Loading Terraform files...</p>
      </div>
      </>
      
    );
  }

  if (!currentTerraform) {

    return (
      <>
      <DashboardHeader onRefresh={function (): void {
                throw new Error('Function not implemented.');
            } } isLoading={false}/>
      <div className="flex items-center justify-center h-screen">
        <p className="text-gray-500">Terraform files not found</p>
      </div>
      </>
      
    );
  }

  return (
    <>
    <DashboardHeader onRefresh={function (): void {
                throw new Error('Function not implemented.');
            } } isLoading={false}/>
    <div className="container mx-auto p-6">
      <div className="flex items-center mb-6">
        <Button variant="ghost" onClick={handleBack} className="mr-4">
          <ArrowLeft className="h-5 w-5 mr-2" />
        </Button>
        <h1 className="text-2xl font-bold">Terraform Files - Version {currentTerraform.version}</h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Previous Version</CardTitle>
          </CardHeader>
          <CardContent>
            <pre className="bg-gray-100 p-4 rounded-md overflow-auto h-[500px] text-sm">
              {currentTerraform.oldCode}
            </pre>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Current Version</CardTitle>
          </CardHeader>
          <CardContent>
            <pre className="bg-gray-100 p-4 rounded-md overflow-auto h-[500px] text-sm">
              {currentTerraform.newCode}
            </pre>
          </CardContent>
        </Card>
      </div>
    </div>
    </>
  );
};

export default Terraform;
