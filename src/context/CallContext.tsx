import React, { createContext, useContext, useState, useEffect } from 'react';

export type CallStatus = 'idle' | 'calling' | 'connected' | 'disconnected' | 'error';
export type SummaryStatus = 'idle' | 'summarizing' | 'ready' | 'viewing';

interface Client {
  name: string;
  number: string;
}

interface CallContextType {
  status: CallStatus;
  summaryStatus: SummaryStatus;
  client: Client | null;
  duration: number;
  isMuted: boolean;
  isSpeakerOn: boolean;
  startCall: (client: Client) => void;
  endCall: () => void;
  toggleMute: () => void;
  toggleSpeaker: () => void;
  retryCall: () => void;
  resetCall: () => void;
  generateSummary: () => void;
  viewSummary: () => void;
  closeSummary: () => void;
}

const CallContext = createContext<CallContextType | undefined>(undefined);

export const CallProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [status, setStatus] = useState<CallStatus>('idle');
  const [summaryStatus, setSummaryStatus] = useState<SummaryStatus>('idle');
  const [client, setClient] = useState<Client | null>(null);
  const [duration, setDuration] = useState(0);
  const [isMuted, setIsMuted] = useState(false);
  const [isSpeakerOn, setIsSpeakerOn] = useState(false);

  useEffect(() => {
    let interval: number | undefined;
    if (status === 'connected') {
      interval = setInterval(() => {
        setDuration((prev) => prev + 1);
      }, 1000);
    } else {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [status]);

  const startCall = (client: Client) => {
    setClient(client);
    setStatus('calling');
    setDuration(0);
    setSummaryStatus('idle'); // Reset summary state on new call
    
    // Simulate connection after 2 seconds
    setTimeout(() => {
      setStatus('connected');
    }, 2000);
  };

  const endCall = () => {
    setStatus('disconnected');
    // Keep it in disconnected for 2s before resetting or showing summary
  };

  const toggleMute = () => setIsMuted(!isMuted);
  const toggleSpeaker = () => setIsSpeakerOn(!isSpeakerOn);

  const retryCall = () => {
    if (client) startCall(client);
  };

  const resetCall = () => {
    setStatus('idle');
    setClient(null);
    setDuration(0);
    setIsMuted(false);
    setIsSpeakerOn(false);
    setSummaryStatus('idle');
  };

  const generateSummary = () => {
    setSummaryStatus('summarizing');
    // Simulate AI generation time
    setTimeout(() => {
      setSummaryStatus('ready');
    }, 3000);
  };

  const viewSummary = () => {
    setSummaryStatus('viewing');
  };

  const closeSummary = () => {
    setSummaryStatus('idle');
  };

  return (
    <CallContext.Provider
      value={{
        status,
        summaryStatus,
        client,
        duration,
        isMuted,
        isSpeakerOn,
        startCall,
        endCall,
        toggleMute,
        toggleSpeaker,
        retryCall,
        resetCall,
        generateSummary,
        viewSummary,
        closeSummary
      }}
    >
      {children}
    </CallContext.Provider>
  );
};

export const useCall = () => {
  const context = useContext(CallContext);
  if (context === undefined) {
    throw new Error('useCall must be used within a CallProvider');
  }
  return context;
};
