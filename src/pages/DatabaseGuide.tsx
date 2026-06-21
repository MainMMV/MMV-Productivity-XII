import { motion } from 'framer-motion';
import { Flame, Cloud, FileSpreadsheet, HardDrive, ShieldCheck, Lock, Activity, Server, LayoutDashboard, Fingerprint, History, Laptop } from 'lucide-react';
import { useAuth } from '@/lib/AuthContext';
import { useGoogleAuth } from '@/lib/googleAuth';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

export default function DatabaseGuide() {
  const { isAuthenticated, user } = useAuth();
  const { accessToken } = useGoogleAuth();

  return (
    <div className="px-4 py-6 max-w-5xl mx-auto pb-24 space-y-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">Data Hub</h1>
        <p className="text-sm text-muted-foreground mt-1">Understanding your synchronization, privacy, and active databases.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {/* Firebase Core Database Card */}
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-card border border-border shadow-sm rounded-3xl p-6 flex flex-col h-full relative overflow-hidden group"
        >
          <div className="absolute top-0 right-0 p-6 opacity-5 group-hover:opacity-10 transition-opacity">
            <Server className="w-24 h-24" />
          </div>
          <div className="flex items-center gap-3 mb-4 relative">
            <div className={`p-2.5 rounded-xl ${isAuthenticated ? 'bg-orange-500/10 text-orange-500' : 'bg-muted text-muted-foreground'} `}>
              <Flame className="w-5 h-5" />
            </div>
            <div>
              <h2 className="font-bold text-lg leading-tight">Firebase Cloud</h2>
              <div className="flex items-center gap-1.5 mt-0.5">
                <div className={`w-2 h-2 rounded-full ${isAuthenticated ? 'bg-orange-500 shadow-[0_0_8px_rgba(249,115,22,0.8)]' : 'bg-muted-foreground'}`} />
                <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
                  {isAuthenticated ? 'Connected & Synced' : 'Offline Mode'}
                </span>
              </div>
            </div>
          </div>
          
          <p className="text-sm text-balance text-muted-foreground mb-6 flex-1 relative">
            The core engine of your productivity suite. Powered by Firebase Firestore, this securely encrypts and syncs your Habits, Tasks, Goals, and Financial data across all your devices in real-time.
          </p>

          <div className="space-y-3 relative">
            <div className="flex text-xs items-center justify-between border-b border-border pb-2">
              <span className="font-medium text-muted-foreground">Stored Data</span>
              <span className="font-bold">App State</span>
            </div>
            <div className="flex text-xs items-center justify-between border-b border-border pb-2">
              <span className="font-medium text-muted-foreground">Sync Speed</span>
              <span className="font-bold">~150ms Realtime</span>
            </div>
            <div className="flex text-xs items-center justify-between pb-1">
              <span className="font-medium text-muted-foreground">Security</span>
              <span className="font-bold inline-flex items-center gap-1"><Lock className="w-3 h-3" /> E2E Configured</span>
            </div>
          </div>
          
          {!isAuthenticated && (
            <Link to="/settings" className="mt-4">
              <Button className="w-full rounded-xl bg-orange-500 hover:bg-orange-600 text-white shadow-md">Connect to Firebase</Button>
            </Link>
          )}
        </motion.div>

        {/* Google Drive Card */}
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-card border border-border shadow-sm rounded-3xl p-6 flex flex-col h-full relative overflow-hidden group"
        >
          <div className="absolute top-0 right-0 p-6 opacity-5 group-hover:opacity-10 transition-opacity">
            <HardDrive className="w-24 h-24" />
          </div>
          <div className="flex items-center gap-3 mb-4 relative">
            <div className={`p-2.5 rounded-xl ${accessToken ? 'bg-blue-500/10 text-blue-500' : 'bg-muted text-muted-foreground'} `}>
              <HardDrive className="w-5 h-5" />
            </div>
            <div>
              <h2 className="font-bold text-lg leading-tight">Google Drive</h2>
              <div className="flex items-center gap-1.5 mt-0.5">
                <div className={`w-2 h-2 rounded-full ${accessToken ? 'bg-blue-500 shadow-[0_0_8px_rgba(59,130,246,0.8)]' : 'bg-muted-foreground'}`} />
                <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
                  {accessToken ? 'Connected' : 'Not Linked'}
                </span>
              </div>
            </div>
          </div>
          
          <p className="text-sm text-balance text-muted-foreground mb-6 flex-1 relative">
            Your personal digital filing cabinet. We use Google Drive to securely store your rich text Notes and manage document backups. We only access the files created specifically by this app.
          </p>

          <div className="space-y-3 relative">
            <div className="flex text-xs items-center justify-between border-b border-border pb-2">
              <span className="font-medium text-muted-foreground">Stored Data</span>
              <span className="font-bold">Notes & Files</span>
            </div>
            <div className="flex text-xs items-center justify-between border-b border-border pb-2">
              <span className="font-medium text-muted-foreground">Space Used</span>
              <span className="font-bold">User Quota</span>
            </div>
            <div className="flex text-xs items-center justify-between pb-1">
              <span className="font-medium text-muted-foreground">Privacy Scope</span>
              <span className="font-bold text-blue-500 bg-blue-500/10 px-1.5 py-0.5 rounded uppercase text-[10px]">App-Only Data</span>
            </div>
          </div>

          {!accessToken && (
            <Link to="/settings" className="mt-4">
              <Button variant="outline" className="w-full rounded-xl border-blue-200 hover:bg-blue-50 text-blue-600 shadow-sm dark:border-blue-900/50 dark:hover:bg-blue-900/20">Connect Drive</Button>
            </Link>
          )}
        </motion.div>

        {/* Google Sheets / Local Card */}
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-card border border-border shadow-sm rounded-3xl p-6 flex flex-col h-full relative overflow-hidden group"
        >
          <div className="absolute top-0 right-0 p-6 opacity-5 group-hover:opacity-10 transition-opacity">
            <Laptop className="w-24 h-24" />
          </div>
          <div className="flex items-center gap-3 mb-4 relative">
            <div className="p-2.5 rounded-xl bg-primary/10 text-primary">
              <Laptop className="w-5 h-5" />
            </div>
            <div>
              <h2 className="font-bold text-lg leading-tight">Local Storage</h2>
              <div className="flex items-center gap-1.5 mt-0.5">
                <div className="w-2 h-2 rounded-full bg-primary shadow-[0_0_8px_rgba(var(--primary),0.8)]" />
                <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
                  Always Active
                </span>
              </div>
            </div>
          </div>
          
          <p className="text-sm text-balance text-muted-foreground mb-6 flex-1 relative">
            The app utilizes your browser's local sandbox for transient usage, fallback caching, UI appearance preferences, and standalone modules like Local Bookmarks.
          </p>

          <div className="space-y-3 relative">
            <div className="flex text-xs items-center justify-between border-b border-border pb-2">
              <span className="font-medium text-muted-foreground">Stored Data</span>
              <span className="font-bold">Cache & Config</span>
            </div>
            <div className="flex text-xs items-center justify-between border-b border-border pb-2">
              <span className="font-medium text-muted-foreground">Availability</span>
              <span className="font-bold">Offline 100%</span>
            </div>
            <div className="flex text-xs items-center justify-between pb-1">
              <span className="font-medium text-muted-foreground">Exportable</span>
              <span className="font-bold text-emerald-500 bg-emerald-500/10 px-1.5 py-0.5 rounded uppercase text-[10px]">JSON Output</span>
            </div>
          </div>
        </motion.div>
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="mt-8 bg-card border border-border shadow-sm rounded-[2rem] p-6 md:p-8"
      >
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2.5 bg-muted rounded-xl text-foreground">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <h2 className="text-xl font-bold tracking-tight">Security & Privacy Protocol</h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8">
          <div className="space-y-2">
            <div className="flex items-center gap-2 mb-1">
              <Fingerprint className="w-4 h-4 text-primary" />
              <h3 className="font-bold text-sm">Strict Authorization</h3>
            </div>
            <p className="text-sm text-muted-foreground">
              Your identity is protected. We use Firebase Authentication to issue secure JWTs (JSON Web Tokens). Only you hold the keys to intercept or view your data within our protected data nodes.
            </p>
          </div>
          
          <div className="space-y-2">
            <div className="flex items-center gap-2 mb-1">
              <Activity className="w-4 h-4 text-emerald-500" />
              <h3 className="font-bold text-sm">Resilient Cloud Fallbacks</h3>
            </div>
            <p className="text-sm text-muted-foreground">
              If your connection drops, the app seamlessly falls back to Local Storage caching. Actions like marking tasks complete are saved offline and synchronized to Firebase Cloud the next time you connect.
            </p>
          </div>
          
          <div className="space-y-2">
            <div className="flex items-center gap-2 mb-1">
              <History className="w-4 h-4 text-blue-500" />
              <h3 className="font-bold text-sm">Data Retention</h3>
            </div>
            <p className="text-sm text-muted-foreground">
              We operate on an immediate-deletion basis. If you delete a habit, note, or entry from your layout, it is immediately expunged from the database permanently without ghost tracking.
            </p>
          </div>

          <div className="space-y-2">
            <div className="flex items-center gap-2 mb-1">
              <LayoutDashboard className="w-4 h-4 text-orange-500" />
              <h3 className="font-bold text-sm">Cross-Device Synchrony</h3>
            </div>
            <p className="text-sm text-muted-foreground">
              Because data rests in Google Firebase, any modifications you make on your smartphone will echo almost instantly to your desktop or tablet view, keeping your focus uninterrupted.
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
