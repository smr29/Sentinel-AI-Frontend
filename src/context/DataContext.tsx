// src/context/DataContext.tsx
import React, { createContext, useContext, useEffect, useState } from 'react';

interface Report {
  severity: string;
  vulnerability: string;
  recommendations: string;
  resource_name: string;
  resource_type: string;
  potential_impact: string;
}

interface ApiResponse {
  timestamp: number;
  original_graph: string;
  changed_graph: string;
  report: Report[];
  changed_terraform: string;
  original_terraform: string;
  path: string;
}

interface DataContextType {
  responses: ApiResponse[];
}

const DataContext = createContext<DataContextType | undefined>(undefined);

export const DataProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [responses, setResponses] = useState<ApiResponse[]>([]);

  useEffect(() => {
    console.log(responses)
    const fetchData = async () => {
      try {
        const res = await fetch('https://6fd3-2409-40f2-1023-9d6a-3045-6e2-f1ee-4ee1.ngrok-free.app/process_terraform/', {
          method: 'POST',
        });

        if (!res.ok) {
          throw new Error(`HTTP error! Status: ${res.status}`);
        }

        const { original_graph, changed_graph, report, changed_terraform, original_terraform, path } = await res.json();
        console.log(original_graph, changed_graph, report, changed_terraform, original_terraform, path)
        const responseObject: ApiResponse = {
          timestamp: Date.now(),
          original_graph,
          changed_graph,
          report,
          changed_terraform,
          original_terraform,
          path,
        };

        setResponses((prev) => [...prev, responseObject]);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    // fetchData(); // Fetch once on mount

    const interval = setInterval(fetchData, 3000000); // Every 40 seconds

    return () => clearInterval(interval); // Cleanup
  }, []);

  return (
    <DataContext.Provider value={{ responses }}>
      {children}
    </DataContext.Provider>
  );
};

export const useDataContext = () => {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error('useDataContext must be used within a DataProvider');
  }
  return context;
};
