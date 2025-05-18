export const mockCloudData = {
  resources: [
    {
      id: 'internet-1',
      name: 'Internet',
      type: 'internet',
      position: { x: 100, y: 150 },
      vulnerabilities: []
    },
    {
      id: 'gateway-1',
      name: 'Internet Gateway',
      type: 'network',
      position: { x: 100, y: 250 },
      vulnerabilities: []
    },
    {
      id: 'network-1',
      name: 'Virtual Network',
      type: 'network',
      position: { x: 100, y: 350 },
      vulnerabilities: [
        {
          id: 'vuln-1',
          title: 'Misconfigured Network ACLs',
          description: 'Network access control lists allow unrestricted access from the internet',
          impact: 'This misconfiguration could allow unauthorized access to resources within the virtual network, potentially leading to data breaches or unauthorized system access.',
          severity: 'high',
          type: 'misconfig',
          discoveredAt: '2 days ago',
          cve: 'CVE-2025-3456',
          prNumber: '3421',
          author: 'security-bot',
          cvssScore: '7.8',
          suggestedFix: `// Original configuration
const networkAcl = {
  Ingress: [
    {
      Protocol: '-1',
      RuleAction: 'allow',
      CidrBlock: '0.0.0.0/0',
    }
  ]
};

// Fixed configuration
const networkAcl = {
  Ingress: [
    {
      Protocol: 'tcp',
      FromPort: 443,
      ToPort: 443,
      RuleAction: 'allow',
      CidrBlock: '10.0.0.0/16',
    }
  ]
};`
        }
      ]
    },
    {
      id: 'subnet-1',
      name: 'Subnet',
      type: 'network',
      position: { x: 250, y: 350 },
      vulnerabilities: []
    },
    {
      id: 'interface-1',
      name: 'Network Interface',
      type: 'network',
      position: { x: 400, y: 350 },
      vulnerabilities: []
    },
    {
      id: 'vm-1',
      name: 'Virtual Machine',
      type: 'virtualMachine',
      position: { x: 550, y: 350 },
      vulnerabilities: [
        {
          id: 'vuln-2',
          title: 'Critical OS Vulnerability',
          description: 'Unpatched operating system with known remote code execution vulnerability',
          impact: 'Attackers can exploit this vulnerability to execute arbitrary code on the system, potentially gaining full control of the virtual machine and any data it processes.',
          severity: 'critical',
          type: 'criticalVulnerability',
          discoveredAt: '5 hours ago',
          cve: 'CVE-2025-9876',
          prNumber: '3422',
          author: 'security-bot',
          cvssScore: '9.8',
          suggestedFix: `# Update system packages to patch the vulnerability
FROM ubuntu:20.04

# The original Dockerfile didn't include security updates
# RUN apt-get update

# Fixed version includes security updates
RUN apt-get update && apt-get upgrade -y && apt-get install -y \
    security-patch-3456 \
    && apt-get clean \
    && rm -rf /var/lib/apt/lists/*`
        },
        {
          id: 'vuln-3',
          title: 'Exposed API Keys in Environment Variables',
          description: 'API keys are stored as plaintext environment variables',
          impact: 'If the system is compromised, attackers could extract these API keys and use them to access other services with the privileges associated with these keys.',
          severity: 'high',
          type: 'exposedSecret',
          discoveredAt: '1 day ago',
          cve: null,
          prNumber: '3425',
          author: 'security-bot',
          cvssScore: '8.2',
          suggestedFix: `// Original deployment configuration
{
  "env": {
    "AWS_ACCESS_KEY": "AKIAIOSFODNN7EXAMPLE",
    "AWS_SECRET_KEY": "wJalrXUtnFEMI/K7MDENG/bPxRfiCYEXAMPLEKEY"
  }
}

// Fixed deployment configuration using secret management
{
  "env": {
    "AWS_ACCESS_KEY": {"$ref": "secrets:aws-credentials:accessKey"},
    "AWS_SECRET_KEY": {"$ref": "secrets:aws-credentials:secretKey"}
  }
}`
        }
      ]
    },
    {
      id: 'role-1',
      name: 'IAM Role',
      type: 'role',
      position: { x: 550, y: 450 },
      vulnerabilities: [
        {
          id: 'vuln-4',
          title: 'Excessive IAM Permissions',
          description: 'IAM role has unnecessary admin privileges',
          impact: 'The principle of least privilege is violated, allowing potential credential misuse to have widespread impact across multiple services and resources.',
          severity: 'medium',
          type: 'excessiveAccess',
          discoveredAt: '3 days ago',
          cve: null,
          prNumber: '3429',
          author: 'security-bot',
          cvssScore: '6.5',
          suggestedFix: `// Original IAM policy with excessive permissions
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Action": "*",
      "Resource": "*"
    }
  ]
}

// Fixed IAM policy with least privilege
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Action": [
        "s3:GetObject",
        "s3:ListBucket"
      ],
      "Resource": [
        "arn:aws:s3:::example-bucket",
        "arn:aws:s3:::example-bucket/*"
      ]
    }
  ]
}`
        }
      ]
    },
    {
      id: 'db-1',
      name: 'Database',
      type: 'database',
      position: { x: 550, y: 550 },
      vulnerabilities: []
    },
    {
      id: 'pii-1',
      name: 'PII Data',
      type: 'storage',
      position: { x: 700, y: 550 },
      vulnerabilities: []
    },
    {
      id: 'org-1',
      name: 'Organization',
      type: 'org',
      position: { x: 700, y: 350 },
      vulnerabilities: []
    },
    {
      id: 'secgroup-1',
      name: 'Security Group',
      type: 'security',
      position: { x: 350, y: 450 },
      vulnerabilities: [
        {
          id: 'vuln-5',
          title: 'Overly Permissive Security Group',
          description: 'Security group allows inbound traffic from any IP on port 22 (SSH)',
          impact: 'This configuration exposes SSH access to the entire internet, potentially allowing brute force attacks against the SSH service.',
          severity: 'high',
          type: 'misconfig',
          discoveredAt: '6 hours ago',
          cve: null,
          prNumber: '3430',
          author: 'security-bot',
          cvssScore: '8.0',
          suggestedFix: `// Original security group rule
{
  "IpPermissions": [
    {
      "IpProtocol": "tcp",
      "FromPort": 22,
      "ToPort": 22,
      "IpRanges": [
        {
          "CidrIp": "0.0.0.0/0"
        }
      ]
    }
  ]
}

// Fixed security group rule
{
  "IpPermissions": [
    {
      "IpProtocol": "tcp",
      "FromPort": 22,
      "ToPort": 22,
      "IpRanges": [
        {
          "CidrIp": "10.0.0.0/16",
          "Description": "VPN IP range only"
        }
      ]
    }
  ]
}`
        }
      ]
    },
  ],
  
  risks: [
    {
      id: 'risk-1',
      type: 'criticalVulnerability',
      title: 'Critical Vulnerability',
      severity: 'critical',
      position: { x: 475, y: 290 },
      targetId: 'vm-1'
    },
    {
      id: 'risk-2',
      type: 'exposedSecret',
      title: 'Exposed Secret',
      severity: 'high',
      position: { x: 450, y: 290 },
      targetId: 'vm-1'
    },
    {
      id: 'risk-3',
      type: 'excessiveAccess',
      title: 'Excessive Access',
      severity: 'medium',
      position: { x: 600, y: 430 },
      targetId: 'role-1'
    }
  ],
  
  connections: [
    {
      id: 'edge-1',
      source: 'internet-1',
      target: 'gateway-1',
      animated: true
    },
    {
      id: 'edge-2',
      source: 'gateway-1',
      target: 'network-1'
    },
    {
      id: 'edge-3',
      source: 'network-1',
      target: 'subnet-1'
    },
    {
      id: 'edge-4',
      source: 'subnet-1',
      target: 'interface-1'
    },
    {
      id: 'edge-5',
      source: 'interface-1',
      target: 'vm-1'
    },
    {
      id: 'edge-6',
      source: 'vm-1',
      target: 'role-1'
    },
    {
      id: 'edge-7',
      source: 'role-1',
      target: 'db-1'
    },
    {
      id: 'edge-8',
      source: 'db-1',
      target: 'pii-1'
    },
    {
      id: 'edge-9',
      source: 'vm-1',
      target: 'org-1'
    },
    {
      id: 'edge-10',
      source: 'subnet-1',
      target: 'secgroup-1'
    }
  ]
};