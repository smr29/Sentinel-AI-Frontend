import React, { useState } from 'react';
import { DashboardHeader } from '@/components/DashboardHeader';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { PieChart, Pie, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Cell, LineChart, Line } from 'recharts';
import { toast } from '@/components/ui/use-toast';
import { AlertTriangle, CheckCircle, Calendar, ShieldAlert, AlertCircle } from 'lucide-react';
import { Progress } from '@/components/ui/progress';

const Dashboard = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [date, setDate] = useState('2025-05-14');
  
  const handleRefresh = () => {
    setIsLoading(true);
    // Simulate data refresh
    setTimeout(() => {
      setIsLoading(false);
      toast({
        title: "Dashboard Updated",
        description: "Security findings and metrics have been refreshed",
      });
    }, 1000);
  };

  // Mock data for findings by status
  const findingsStatusData = [
    { name: 'Pass', value: 147, percentage: 52, color: '#10B981' },
    { name: 'Fail', value: 137, percentage: 48, color: '#EF4444' },
  ];

  // Mock data for findings by severity
  const findingsSeverityData = [
    { name: 'Critical', value: 11, color: '#7F1D1D' },
    { name: 'High', value: 37, color: '#EF4444' },
    { name: 'Medium', value: 56, color: '#F59E0B' },
    { name: 'Low', value: 33, color: '#10B981' },
  ];

  // Mock data for findings over time
  const findingsTimeData = [
    { name: 'Feb 08', pass: 110, fail: 210, medium: 150, high: 60, critical: 10 },
    { name: 'Feb 09', pass: 115, fail: 215, medium: 155, high: 60, critical: 10 },
    { name: 'Feb 10', pass: 120, fail: 220, medium: 160, high: 60, critical: 10 },
    { name: 'Feb 11', pass: 125, fail: 225, medium: 165, high: 60, critical: 10 },
    { name: 'Feb 12', pass: 130, fail: 230, medium: 170, high: 60, critical: 10 },
    { name: 'Feb 13', pass: 135, fail: 235, medium: 175, high: 60, critical: 10 },
    { name: 'Feb 14', pass: 145, fail: 280, medium: 210, high: 70, critical: 11 },
  ];

  // New findings data
  const newFindings = [
    { id: 1, description: 'Ensure the default security group of every VPC restricts all traffic', severity: 'High' },
    { id: 2, description: 'Ensure no security groups allow ingress from 0.0.0.0/0 to SSH port 22', severity: 'High' },
    { id: 3, description: 'Check if EC2 instances are managed by Systems Manager', severity: 'Medium' },
    { id: 4, description: 'Ensure IAM instance roles are used for AWS resource access from instances', severity: 'Medium' },
    { id: 5, description: 'Check for EC2 Instances with Public IP', severity: 'Medium' },
    { id: 6, description: 'Ensure no Network ACLs allow ingress from 0.0.0.0/0 to any port', severity: 'Medium' },
    { id: 7, description: 'Ensure no Network ACLs allow ingress from 0.0.0.0/0 to SSH port 22', severity: 'Medium' },
    { id: 8, description: 'Ensure no Network ACLs allow ingress from 0.0.0.0/0 to Microsoft RDP port 3389', severity: 'Medium' },
    { id: 9, description: 'Security Groups created by EC2 Launch Wizard', severity: 'Medium' },
    { id: 10, description: 'Check if EBS snapshots exists', severity: 'Medium' },
    { id: 11, description: 'Ensure there are no EBS Volumes unencrypted', severity: 'Medium' },
    { id: 12, description: 'Check if EC2 instances have detailed monitoring enabled', severity: 'Low' },
  ];

  // Attack surface data
  const attackSurfaceData = [
    { name: 'Internet Exposed Resources', value: 5, icon: <AlertTriangle className="h-8 w-8 text-red-500" /> },
    { name: 'Exposed Secrets', value: 0, icon: <CheckCircle className="h-8 w-8 text-green-500" /> },
    { name: 'IAM Policies Leading to Privilege Escalation', value: 0, icon: <CheckCircle className="h-8 w-8 text-green-500" /> },
    { name: 'EC2 with Metadata Service V1 (IMDSv1) Enabled', value: 0, icon: <CheckCircle className="h-8 w-8 text-green-500" /> },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-cloud-background">
      <DashboardHeader onRefresh={handleRefresh} isLoading={isLoading} />
      <main className="flex-1 container mx-auto px-4 py-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-xl font-bold">Scan Overview</h1>
          <div className="flex items-center space-x-4">
            {/* <div className="flex items-center">
              <Calendar className="mr-2 h-4 w-4 text-gray-500" />
              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="border border-gray-300 rounded px-2 py-1"
              />
            </div> */}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          {attackSurfaceData.map((item, index) => (
            <Card key={index} className="overflow-hidden">
              <CardHeader className="p-4 pb-2">
                <CardTitle className="text-sm font-medium text-gray-700">{item.name}</CardTitle>
              </CardHeader>
              <CardContent className="p-4 pt-0">
                <div className="flex items-center">
                  {item.icon}
                  <span className="text-3xl font-bold ml-2">{item.value}</span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          <Card>
            <CardHeader>
              <CardTitle>Findings by Status and Severity</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h3 className="text-sm font-medium mb-2 text-center">Status</h3>
                  <div className="h-60">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={findingsStatusData}
                          cx="50%"
                          cy="50%"
                          innerRadius={60}
                          outerRadius={90}
                          paddingAngle={5}
                          dataKey="value"
                          label={({ name, percentage }) => `${name} ${percentage}%`}
                        >
                          {findingsStatusData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                        </Pie>
                        <Tooltip />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                  <div className="text-xs text-center text-gray-500 mt-2">
                    <div className="flex justify-center space-x-6">
                      <div className="flex items-center">
                        <span className="inline-block w-3 h-3 bg-green-500 rounded-full mr-1"></span>
                        <span>Pass: 147 (+42)</span>
                      </div>
                      <div className="flex items-center">
                        <span className="inline-block w-3 h-3 bg-red-500 rounded-full mr-1"></span>
                        <span>Fail: 137 (+12)</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div>
                  <h3 className="text-sm font-medium mb-2 text-center">Severity</h3>
                  <div className="h-60">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart
                        data={findingsSeverityData}
                        layout="vertical"
                        margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                      >
                        <CartesianGrid strokeDasharray="3 3" horizontal={false} />
                        <XAxis type="number" />
                        <YAxis type="category" dataKey="name" />
                        <Tooltip />
                        <Bar dataKey="value" radius={[0, 4, 4, 0]}>
                          {findingsSeverityData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                        </Bar>
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                  <div className="text-xs text-center text-gray-500 mt-2 grid grid-cols-4 gap-1">
                    {findingsSeverityData.map((item, index) => (
                      <div key={index} className="flex flex-col items-center">
                        <span className="inline-block w-3 h-3 rounded-full" style={{ backgroundColor: item.color }}></span>
                        <span>{item.name}: {item.value}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Findings Over Time</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={findingsTimeData} margin={{ top: 20, right: 30, left: 20, bottom: 10 }}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="pass" stroke="#10B981" strokeWidth={2} />
                    <Line type="monotone" dataKey="fail" stroke="#EF4444" strokeWidth={2} />
                    <Line type="monotone" dataKey="medium" stroke="#F59E0B" strokeWidth={1} />
                    <Line type="monotone" dataKey="high" stroke="#DC2626" strokeWidth={1} />
                    <Line type="monotone" dataKey="critical" stroke="#7F1D1D" strokeWidth={1} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>New Findings This Scan</CardTitle>
              <CardDescription>12 new findings</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="overflow-auto max-h-96">
                <table className="w-full">
                  <thead className="sticky top-0 bg-white">
                    <tr>
                      <th className="text-left font-medium text-sm text-gray-500 pb-2">Check</th>
                      <th className="text-right font-medium text-sm text-gray-500 pb-2 w-24">Severity</th>
                    </tr>
                  </thead>
                  <tbody>
                    {newFindings.map((finding) => (
                      <tr key={finding.id} className="border-t border-gray-100">
                        <td className="py-3 text-sm flex items-start">
                          <AlertCircle className="h-4 w-4 text-red-500 mr-2 mt-0.5 flex-shrink-0" />
                          {finding.description}
                        </td>
                        <td className="py-3 text-right">
                          <span className={`inline-block px-2 py-1 rounded text-xs font-medium ${
                            finding.severity === 'High' ? 'bg-red-100 text-red-800' : 
                            finding.severity === 'Medium' ? 'bg-orange-100 text-orange-800' : 
                            'bg-green-100 text-green-800'
                          }`}>
                            {finding.severity}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Security Score</CardTitle>
              <CardDescription>Based on resource compliance</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center mb-6">
                <span className="text-6xl font-bold text-yellow-500">74</span>
                <span className="text-lg text-gray-500 ml-2">/ 100</span>
              </div>
              
              <div className="space-y-6">
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="font-medium">IAM Security</span>
                    <span>85%</span>
                  </div>
                  <Progress value={85} className="h-2" />
                </div>
                
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="font-medium">EC2 Security</span>
                    <span>62%</span>
                  </div>
                  <Progress value={62} className="h-2" />
                </div>
                
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="font-medium">S3 Security</span>
                    <span>91%</span>
                  </div>
                  <Progress value={91} className="h-2" />
                </div>
                
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="font-medium">Network Security</span>
                    <span>58%</span>
                  </div>
                  <Progress value={58} className="h-2" />
                </div>
              </div>
              
              <div className="mt-6 text-sm text-gray-500">
                <p className="flex items-center">
                  <ShieldAlert className="h-4 w-4 mr-2 text-yellow-500" />
                  <span>Improve your network security to raise your score</span>
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;