import { ApiResponse } from "./types";

// API service for fetching data
export async function fetchSecurityData(): Promise<ApiResponse> {
  try {
    // Replace with your actual API endpoint
    const response = await fetch('https://your-api-endpoint.com/security-data', {
        method: "POST"
    });
    
    if (!response.ok) {
      throw new Error(`API request failed with status: ${response.status}`);
    }
    
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching security data:', error);
    throw error;
  }
}
