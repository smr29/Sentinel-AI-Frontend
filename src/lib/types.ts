export interface ResourceGraph {
  code: string;
}

export interface Vulnerability {
  id: string;
  title: string;
  severity: string;
  description: string;
  riskScore: number;
  // Add other vulnerability fields as needed
}

export interface Report {
  summary: {
    totalResources: number;
    totalVulnerabilities: number;
    criticalCount: number;
    highCount: number;
    mediumCount: number;
    lowCount: number;
  };
  // Add other report fields as needed
}

export interface TerraformFile {
  name: string;
  content: string;
}

export interface ApiResponse {
  id: string;
  timestamp: string;
  resourceGraph: ResourceGraph;
  vulnerabilities: Vulnerability[];
  report: Report;
  terraformFiles: TerraformFile[];
}
