import React, { memo } from 'react';
import { 
  AlertTriangle, 
  AlertCircle, 
  Info, 
  Key, 
  Bug
} from 'lucide-react';

function RiskNode({ data }: { data: any }) {
  // Choose icon based on risk type
  const getIcon = () => {
    switch(data.type) {
      case 'criticalVulnerability':
        return <AlertTriangle className="h-5 w-5 text-white" />;
      case 'exposedSecret':
        return <Key className="h-5 w-5 text-white" />;
      case 'malware':
        return <Bug className="h-5 w-5 text-white" />;
      case 'excessiveAccess':
        return <AlertCircle className="h-5 w-5 text-white" />;
      default:
        return <Info className="h-5 w-5 text-white" />;
    }
  };
  
  // Get background color based on severity
  const getBgColor = () => {
    switch(data.severity) {
      case 'critical':
        return 'bg-red-500';
      case 'high':
        return 'bg-orange-500';
      case 'medium':
        return 'bg-yellow-500';
      case 'low':
        return 'bg-blue-500';
      default:
        return 'bg-gray-500';
    }
  };
  
  return (
    <div 
      className={`p-2 rounded-full shadow-md cursor-pointer ${getBgColor()}`}
      onClick={data.onClick}
      title={data.title}
    >
      {getIcon()}
    </div>
  );
}

export default memo(RiskNode);

export { RiskNode };