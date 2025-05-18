export const getMockMermaidDiagram = (): Promise<string> => {
  // Return the mock data immediately without delay
  return Promise.resolve(`
graph TD
    subgraph VPC["VPC (Virtual Private Cloud)"]
      subgraph PublicSubnet["Public Subnet"]
        LB[Load Balancer]
        NAT[NAT Gateway]
        Bastion[Bastion Host]
      end
      
      subgraph PrivateSubnet["Private Subnet"]
        EC2_1[Web Server 1]
        EC2_2[Web Server 2]
        RDS[(Database)]
        Cache[(Cache)]
      end
      
      subgraph SecurityGroup["Security Groups"]
        SG_Web[Web Tier]
        SG_DB[Database Tier]
      end
    end

    subgraph Storage["Storage Services"]
      S3[S3 Bucket]
      CloudFront[CloudFront]
    end
    
    subgraph SecurityServices["Security Services"]
      WAF[Web Application Firewall]
      IAM[Identity & Access Management]
      KMS[Key Management Service]
    end
    
    Internet(((Internet))) --> WAF
    WAF --> CloudFront
    CloudFront --> LB
    LB --> EC2_1
    LB --> EC2_2
    EC2_1 --> RDS
    EC2_2 --> RDS
    EC2_1 --> Cache
    EC2_2 --> Cache
    EC2_1 --> S3
    EC2_2 --> S3
    Bastion --> EC2_1
    Bastion --> EC2_2
    Internet --> Bastion

    classDef vpc fill:#e4f0f8,stroke:#82b1c0,stroke-width:2px;
    classDef subnet fill:#f9f9f9,stroke:#bbb,stroke-width:1px;
    classDef secgroup fill:#ffe6cc,stroke:#d79b00,stroke-width:1px;
    classDef instance fill:#d5e8d4,stroke:#82b366,stroke-width:1px;
    classDef storage fill:#fff2cc,stroke:#d6b656,stroke-width:1px;
    classDef security fill:#f8cecc,stroke:#b85450,stroke-width:1px;
    classDef edge fill:#f5f5f5,stroke:#666,stroke-width:1px;

    class VPC vpc;
    class PublicSubnet,PrivateSubnet subnet;
    class SecurityGroup secgroup;
    class EC2_1,EC2_2,Bastion instance;
    class LB,NAT instance;
    class S3,CloudFront,RDS,Cache storage;
    class WAF,IAM,KMS security;
    class Internet edge;
  `);
};