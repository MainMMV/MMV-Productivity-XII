import { motion } from 'framer-motion';
import { 
  Flame, 
  Cloud, 
  FileSpreadsheet, 
  HardDrive, 
  ShieldCheck, 
  Lock, 
  Activity, 
  Server, 
  LayoutDashboard, 
  Fingerprint, 
  History, 
  Laptop,
  Wrench,
  AlertTriangle,
  ExternalLink,
  CheckCircle2,
  Settings as SettingsIcon,
  Globe
} from 'lucide-react';
import { useAuth } from '@/lib/AuthContext';
import { useGoogleAuth } from '@/lib/googleAuth';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

export default function DatabaseGuide() {
  const { isAuthenticated, user } = useAuth();
  const { accessToken } = useGoogleAuth();

  // Custom user project ID from configuration 'mmv-xii'
  const projectId = 'mmv-xii';

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

      {/* NEW Professional Integration Diagnostics & Troubleshooter */}
      <motion.div 
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="bg-card border-2 border-destructive/20 shadow-md rounded-[2rem] p-6 md:p-8 space-y-6"
      >
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-destructive/10 text-destructive rounded-xl">
              <Wrench className="w-6 h-6 animate-pulse" />
            </div>
            <div>
              <h2 className="text-lg font-bold tracking-tight text-destructive-foreground">Self-Service Troubleshooter</h2>
              <p className="text-xs text-muted-foreground mt-0.5">Solve Google Cloud API authorization & popup browser blocks.</p>
            </div>
          </div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-muted rounded-full border border-border text-[10px] font-mono text-muted-foreground self-start">
            PROJECT: <span className="text-primary font-bold">{projectId}</span>
          </div>
        </div>

        <div className="bg-muted/30 border border-border rounded-2xl p-4 text-xs text-muted-foreground leading-relaxed">
          <p className="font-bold text-foreground mb-1 flex items-center gap-1">
            <AlertTriangle className="w-3.5 h-3.5 text-amber-500" /> Why do I see 403 Forbidden or Popup errors?
          </p>
          Because of Google Cloud security protocols, if you set up a custom workspace project (<span className="font-mono bg-border px-1.5 py-0.5 rounded text-foreground font-bold">{projectId}</span>), you must explicitly activate corresponding Google API access points. In addition, browser sandbox policies may block popups. Open the sections below to configure your console in one click:
        </div>

        <div className="space-y-4 pt-2">
          <h3 className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-2">1. One-Click Developer Console API Activations</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {[
              {
                title: "Enable Google Drive API",
                desc: "Resolves Drive 403 errors. Click to authorize your project to read and list Note objects.",
                url: `https://console.developers.google.com/apis/api/drive.googleapis.com/overview?project=${projectId}`,
                badge: "Drive Integration"
              },
              {
                title: "Enable Google Docs API",
                desc: "Resolves Docs 403 errors. Click to authorize document editing templates.",
                url: `https://console.developers.google.com/apis/api/docs.googleapis.com/overview?project=${projectId}`,
                badge: "Docs Integration"
              },
              {
                title: "Enable Google Sheets API",
                desc: "Allows automated finance exports to export spreadsheets in real-time.",
                url: `https://console.developers.google.com/apis/api/sheets.googleapis.com/overview?project=${projectId}`,
                badge: "Export System"
              },
              {
                title: "Enable Google Tasks & Calendar",
                desc: "Integrates direct calendar notifications and task list synchronization.",
                url: `https://console.developers.google.com/apis/api/calendar-json.googleapis.com/overview?project=${projectId}`,
                badge: "Sync Engine"
              }
            ].map((api, idx) => (
              <div key={idx} className="bg-muted/20 border border-border rounded-2xl p-4 flex flex-col justify-between hover:border-primary/20 hover:bg-primary/[0.01] transition-all">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-foreground">{api.title}</span>
                    <span className="text-[9px] bg-primary/10 text-primary px-2 py-0.5 rounded-full font-bold uppercase">{api.badge}</span>
                  </div>
                  <p className="text-[11px] text-muted-foreground leading-relaxed">{api.desc}</p>
                </div>
                <div className="pt-4">
                  <a 
                    href={api.url} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="inline-flex w-full"
                  >
                    <Button variant="outline" size="sm" className="w-full text-[11px] h-9 gap-1.5 rounded-xl border-border hover:bg-primary/5 hover:text-primary hover:border-primary/25">
                      Open Console in {projectId} <ExternalLink className="w-3 h-3" />
                    </Button>
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="pt-4 border-t border-border space-y-3">
          <h3 className="text-xs font-bold uppercase tracking-wider text-muted-foreground">2. COOP Popup & "Assertion failed" Workaround</h3>
          
          <div className="bg-muted/10 border border-border rounded-2xl p-4 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div className="space-y-1 max-w-xl">
              <p className="text-xs font-bold text-foreground flex items-center gap-1.5">
                <Globe className="w-4 h-4 text-emerald-500" />
                Turn on Redirect Authentication Mode
              </p>
              <p className="text-[11px] text-muted-foreground leading-relaxed">
                If your browser security setup or iFrame prevents the popups from returning information, go to <strong>Settings</strong>, check <strong>Redirect Login Mode</strong>, and sign in. Instead of opening a popup, the browser will perform a safe, standard, sandboxed redirect handshake.
              </p>
            </div>
            <Link to="/settings" className="w-full md:w-auto shrink-0">
              <Button size="sm" className="w-full md:w-auto h-9 gap-1 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-white font-bold text-[11px] shadow">
                <SettingsIcon className="w-3.5 h-3.5" /> Configure Settings
              </Button>
            </Link>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
