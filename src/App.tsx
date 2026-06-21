import { Toaster } from "@/components/ui/toaster"
import { QueryClientProvider } from '@tanstack/react-query'
import { queryClientInstance } from '@/lib/query-client'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import PageNotFound from './lib/PageNotFound';
import { AuthProvider, useAuth } from '@/lib/AuthContext';
import { GoogleAuthProvider } from '@/lib/googleAuth';
import AppLayout from '@/components/layout/AppLayout';

// Pages
import Home from './pages/Home';
import Habits from './pages/Habits';
import Tasks from './pages/Tasks';
import Finance from './pages/Finance';
import Goals from './pages/Goals';
import Settings from './pages/Settings';
import Notifications from './pages/Notifications';
import GoogleCalendar from './pages/GoogleCalendar';
import GoogleNotes from './pages/GoogleNotes';
import Bookmarks from './pages/Bookmarks';

import { useEffect } from 'react';

const AuthenticatedApp = () => {
  const { isLoadingAuth, isLoadingPublicSettings, authError, navigateToLogin } = useAuth();

  useEffect(() => {
    // If we're inside the popup and Supabase has processed the hash
    if (window.opener && window.name === 'supabase_oauth') {
      setTimeout(() => {
         window.close();
      }, 500);
    }
  }, []);

  if (isLoadingPublicSettings || isLoadingAuth) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-background">
        <div className="flex flex-col items-center gap-3">
          <div className="w-10 h-10 border-4 border-primary/20 border-t-primary rounded-full animate-spin"></div>
          <p className="text-sm text-muted-foreground font-poppins">MMV Productivity</p>
        </div>
      </div>
    );
  }

  return (
    <Routes>
      <Route element={<AppLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/habits" element={<Habits />} />
        <Route path="/tasks" element={<Tasks />} />
        <Route path="/finance" element={<Finance />} />
        <Route path="/goals" element={<Goals />} />
        <Route path="/calendar" element={<GoogleCalendar />} />
        <Route path="/notes" element={<GoogleNotes />} />
        <Route path="/bookmarks" element={<Bookmarks />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/notifications" element={<Notifications />} />
      </Route>
      <Route path="*" element={<PageNotFound />} />
    </Routes>
  );
};

function App() {
  return (
    <AuthProvider>
      <GoogleAuthProvider>
        <QueryClientProvider client={queryClientInstance}>
          <Router>
            <AuthenticatedApp />
          </Router>
          <Toaster />
        </QueryClientProvider>
      </GoogleAuthProvider>
    </AuthProvider>
  );
}

export default App;
