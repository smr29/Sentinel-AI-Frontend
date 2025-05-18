// src/context/DataContext.tsx
import { connected } from 'process';
import React, { createContext, useContext, useEffect, useState } from 'react';

interface ApiResponse {
  timestamp: number;
  original_graph: string,
  changed_graph: string,
  report: Report,
  changed_terraform: string,
  original_terraform: string,
};

interface Report {
  severity: string;
  name: string;
  impact: string;
}

interface DataContextType {
  responses: ApiResponse[];
}

const DataContext = createContext<DataContextType | undefined>(undefined);

export const DataProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [responses, setResponses] = useState<ApiResponse[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const terraform_code='sdafsd'
        // const string = 'string'
        const res = await fetch('https://6fd3-2409-40f2-1023-9d6a-3045-6e2-f1ee-4ee1.ngrok-free.app/process_terraform/', {
          method: "POST"
        });
        console.log("rrrrrrrr")
        const { original_graph, changed_graph, report, changed_terraform, original_terraform} = await res.json();
      

        console.log( original_graph, changed_graph, report, changed_terraform, original_terraform)

        // const responseObject: ApiResponse = {
        //   timestamp: Date.now(),
        //   original_graph: data.original_graph,
        //   changed_graph: data.changed_graph,
        //   report: data.report,
        //   changed_terraform: data.changed_terraform,
        //   original_terraform: data.original_terraform,
        // };

        // setResponses((prev) => [...prev, responseObject]);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData(); // Fetch once on mount

    const interval = setInterval(fetchData, 3000000); // Repeat every 40s

    return () => clearInterval(interval); // Cleanup on unmount
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
