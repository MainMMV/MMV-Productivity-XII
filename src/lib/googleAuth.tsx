import React, { createContext, useContext, useState, useEffect } from 'react';
import { auth, googleProvider } from '@/lib/firebase';
import { signInWithPopup, GoogleAuthProvider as FirebaseAuthProvider, signOut } from 'firebase/auth';
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
];

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
        const overrideToken = localStorage.getItem('google_access_token_override');
        if (overrideToken) {
          setAccessTokenState(overrideToken);
          setIsLoading(false);
          return;
        }
      } catch (err) {
        console.error("Error loading Google access token:", err);
      } finally {
        setIsLoading(false);
      }
    }

    loadToken();

    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      // In Firebase, provider tokens are typically only available immediately after sign-in.
      // So we rely on localStorage to keep the token if they connected.
      const override = localStorage.getItem('google_access_token_override');
      if (!override) {
        setAccessTokenState(null);
      } else {
        setAccessTokenState(override);
      }
    });

    return () => {
      unsubscribe();
    };
  }, []);

  const connectGoogle = async () => {
    try {
      setIsLoading(true);
      
      GOOGLE_SCOPES.forEach(scope => googleProvider.addScope(scope));
      googleProvider.setCustomParameters({
        prompt: 'consent',
        access_type: 'offline'
      });

      const result = await signInWithPopup(auth, googleProvider);
      const credential = FirebaseAuthProvider.credentialFromResult(result);
      
      if (credential?.accessToken) {
        setAccessToken(credential.accessToken);
        toast.success("Google connected successfully");
      }
    } catch (e: any) {
      if (e.code === 'auth/unauthorized-domain') {
        toast.error(`Please add ${window.location.hostname} to Authorized Domains in Firebase Console -> Authentication -> Settings.`);
      } else if (e.code !== 'auth/popup-closed-by-user') {
        toast.error(`OAuth Initiation failed: ${e.message}`);
      }
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
