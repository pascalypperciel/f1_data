import React, { createContext, useContext, useEffect, useState } from 'react';
import './packet_struct';

interface WebSocketContextType {
  sessionData: SessionData | null;
  lapData: LapData | null;
  carSetupData: CarSetupData | null;
  carTelemetryData: CarTelemetryData | null;
  carStatusData: CarStatusData | null;
}

const WebSocketContext = createContext<WebSocketContextType | undefined>(undefined);
export const useSessionData = () => {
  const context = useContext(WebSocketContext);
  if (!context) {
    throw new Error('useSessionData must be used within a WebSocketProvider');
  }
  return context.sessionData;
};

export const useLapData = () => {
  const context = useContext(WebSocketContext);
  if (!context) {
    throw new Error('useLapData must be used within a WebSocketProvider');
  }
  return context.lapData;
};

export const useCarSetupData = () => {
  const context = useContext(WebSocketContext);
  if (!context) {
    throw new Error('useCarSetupData must be used within a WebSocketProvider');
  }
  return context.carSetupData;
};

export const useCarTelemetryData = () => {
  const context = useContext(WebSocketContext);
  if (!context) {
    throw new Error('useCarTelemetryData must be used within a WebSocketProvider');
  }
  return context.carTelemetryData;
};

export const useCarStatusData = () => {
  const context = useContext(WebSocketContext);
  if (!context) {
    throw new Error('useCarStatusData must be used within a WebSocketProvider');
  }
  return context.carStatusData;
};

export const WebSocketProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [sessionData, setSessionData] = useState<SessionData | null>(null);
  const [lapData, setLapData] = useState<LapData | null>(null);
  const [carSetupData, setCarSetupData] = useState<CarSetupData | null>(null);
  const [carTelemetryData, setCarTelemetryData] = useState<CarTelemetryData | null>(null);
  const [carStatusData, setCarStatusData] = useState<CarStatusData | null>(null);

  useEffect(() => {
    const ws = new WebSocket('ws://localhost:6789');

    ws.onmessage = (event) => {
      try {
        const receivedData: ParsedData = JSON.parse(event.data);

        // Filter and update state based on the packet type
        switch(receivedData.type) {
          case "session":
            setSessionData(receivedData.content as SessionData);
            break;
          case "lap":
            setLapData(receivedData.content as LapData);
            break;
          case "carSetups":
            setCarSetupData(receivedData.content as CarSetupData);
            break;
          case "carTelemetry":
            setCarTelemetryData(receivedData.content as CarTelemetryData);
            break;
          case "carStatus":
            setCarStatusData(receivedData.content as CarStatusData);
            break;
          default:
            // Handle or ignore unknown packet types
            break;
        }
      } catch (error) {
        console.error("Error parsing WebSocket data:", error);
      }
    };

    ws.onopen = () => console.log('WebSocket connected');
    ws.onerror = (error) => console.error('WebSocket error:', error);

  }, []);

  const value = { sessionData, lapData, carSetupData, carTelemetryData, carStatusData };

  return (
    <WebSocketContext.Provider value={value}>
      {children}
    </WebSocketContext.Provider>
  );
};
