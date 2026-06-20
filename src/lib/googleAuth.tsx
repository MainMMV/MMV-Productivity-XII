import React, { createContext, useContext, useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { toast } from 'react-hot-toast';

interface GoogleAuthContextType {
  accessToken: string | null;
  setAccessToken: (token: string | null) => void;
  isLoading: boolean;
  isConnected: boolean;
  connectGoogle: () => Promise<void>;
  disconnectGoogle: () => Promise<void>;
  saveDeveloperToken: (token: string) => void;
}

const GoogleAuthContext = createContext<GoogleAuthContextType | undefined>(undefined);

const GOOGLE_SCOPES = [
  "https://www.googleapis.com/auth/tasks",
  "https://www.googleapis.com/auth/calendar.events",
  "https://www.googleapis.com/auth/documents",
  "https://www.googleapis.com/auth/drive.readonly",
  "https://www.googleapis.com/auth/drive.file",
  "https://www.googleapis.com/auth/spreadsheets"
].join(" ");

export const GoogleAuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [accessToken, setAccessTokenState] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const setAccessToken = (token: string | null) => {
    setAccessTokenState(token);
    if (token) {
      localStorage.setItem('google_access_token_override', token);
    } else {
      localStorage.removeItem('google_access_token_override');
    }
  };

  useEffect(() => {
    async function loadToken() {
      try {
        setIsLoading(true);
        // 1. Check for manual/developer token override first for easy developer testing and seamless preview stability
        const overrideToken = localStorage.getItem('google_access_token_override');
        if (overrideToken) {
          setAccessTokenState(overrideToken);
          setIsLoading(false);
          return;
        }

        // 2. Fetch active Supabase session
        const { data: { session } } = await supabase.auth.getSession();
        if (session?.provider_token) {
          setAccessTokenState(session.provider_token);
        }
      } catch (err) {
        console.error("Error loading Google access token:", err);
      } finally {
        setIsLoading(false);
      }
    }

    loadToken();

    // Listen for auth state changes in Supabase
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (session?.provider_token) {
        setAccessTokenState(session.provider_token);
      } else {
        const override = localStorage.getItem('google_access_token_override');
        if (!override) {
          setAccessTokenState(null);
        }
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const connectGoogle = async () => {
    try {
      setIsLoading(true);
      // Initiate Google OAuth login request through Supabase with precise scopes
      const { data, error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          skipBrowserRedirect: false,
          scopes: GOOGLE_SCOPES,
          redirectTo: window.location.origin,
          queryParams: {
            access_type: 'offline',
            prompt: 'consent'
          }
        }
      });

      if (error) throw error;
      if (data?.url) {
        // Open authorization link
        window.location.href = data.url;
      }
    } catch (e: any) {
      toast.error(`OAuth Initiation failed: ${e.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  const disconnectGoogle = async () => {
    setAccessTokenState(null);
    localStorage.removeItem('google_access_token_override');
    toast.success("Disconnected Google account");
  };

  const saveDeveloperToken = (token: string) => {
    if (token.trim()) {
      setAccessToken(token.trim());
      toast.success("Developer Google Access Token saved successfully!");
    } else {
      setAccessToken(null);
      toast.success("Developer access token cleared");
    }
  };

  return (
    <GoogleAuthContext.Provider value={{
      accessToken,
      setAccessToken,
      isLoading,
      isConnected: !!accessToken,
      connectGoogle,
      disconnectGoogle,
      saveDeveloperToken
    }}>
      {children}
    </GoogleAuthContext.Provider>
  );
};

export const useGoogleAuth = () => {
  const context = useContext(GoogleAuthContext);
  if (context === undefined) {
    throw new Error('useGoogleAuth must be used within a GoogleAuthProvider');
  }
  return context;
};
