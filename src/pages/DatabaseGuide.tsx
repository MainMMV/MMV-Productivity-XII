import { useState, useEffect } from 'react';
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
  Globe,
  Database,
  Save,
  RefreshCw,
  FileCode,
  Check,
  AlertCircle
} from 'lucide-react';
import { useAuth } from '@/lib/AuthContext';
import { useGoogleAuth } from '@/lib/googleAuth';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { googleApi } from '@/lib/googleApi';
import { toast } from 'react-hot-toast';

export default function DatabaseGuide() {
  const { isAuthenticated, user } = useAuth();
  const { accessToken } = useGoogleAuth();

  // Custom user project ID from configuration 'mmv-xii'
  const projectId = 'mmv-xii';

  // --- Google Drive Real-time JSON Database Editor State ---
  const [folderId, setFolderId] = useState<string | null>(null);
  const [fileId, setFileId] = useState<string | null>(null);
  const [jsonString, setJsonString] = useState<string>("");
  const [isValidJson, setIsValidJson] = useState<boolean>(true);
  const [jsonError, setJsonError] = useState<string | null>(null);
  const [isSyncing, setIsSyncing] = useState<boolean>(false);
  const [isLoadingDriveDb, setIsLoadingDriveDb] = useState<boolean>(false);
  const [driveLogs, setDriveLogs] = useState<Array<{ id: string; time: string; action: string; type: 'info' | 'success' | 'error' }>>([]);

  const addDriveLog = (action: string, type: 'info' | 'success' | 'error' = 'info') => {
    const newLog = {
      id: Math.random().toString(36).substr(2, 9),
      time: new Date().toLocaleTimeString(),
      action,
      type
    };
    setDriveLogs(prev => [newLog, ...prev]);
  };

  useEffect(() => {
    if (accessToken) {
      initializeDriveDb();
    }
  }, [accessToken]);

  const initializeDriveDb = async () => {
    if (!accessToken) return;
    setIsLoadingDriveDb(true);
    addDriveLog("Connecting to Google Drive API...", "info");
    try {
      // 1. Find or create folder "MMV XII"
      const fId = await googleApi.drive.findOrCreateFolder(accessToken, "MMV XII");
      setFolderId(fId);
      addDriveLog(`Drive folder 'MMV XII' verified (ID: ${fId.slice(0, 8)}...)`, "success");

      // 2. Find or create database.json inside MMV XII
      const fileData = await googleApi.drive.findOrCreateDatabaseFile(accessToken, fId, "database.json");
      setFileId(fileData.id);
      const strContent = JSON.stringify(fileData.content, null, 2);
      setJsonString(strContent);
      setIsValidJson(true);
      setJsonError(null);
      addDriveLog(`Database loaded from 'database.json' (ID: ${fileData.id.slice(0, 8)}...)`, "success");
    } catch (err: any) {
      console.error(err);
      addDriveLog(`Initialization failed: ${err.message || 'Unknown error'}`, "error");
      toast.error("Could not sync Google Drive database.");
    } finally {
      setIsLoadingDriveDb(false);
    }
  };

  const handleJsonChange = (val: string) => {
    setJsonString(val);
    if (!val.trim()) {
      setIsValidJson(true);
      setJsonError(null);
      return;
    }
    try {
      JSON.parse(val);
      setIsValidJson(true);
      setJsonError(null);
    } catch (e: any) {
      setIsValidJson(false);
      setJsonError(e.message);
    }
  };

  const formatJson = () => {
    try {
      const parsed = JSON.parse(jsonString);
      const formatted = JSON.stringify(parsed, null, 2);
      setJsonString(formatted);
      setIsValidJson(true);
      setJsonError(null);
      addDriveLog("Formatted JSON content locally", "info");
      toast.success("Formatted successfully!");
    } catch (e: any) {
      toast.error("Cannot format: invalid JSON structure.");
    }
  };

  const saveJsonToDrive = async () => {
    if (!accessToken || !fileId) {
      toast.error("Drive connection is not fully initialized.");
      return;
    }
    if (!isValidJson) {
      toast.error("Cannot save invalid JSON to Google Drive.");
      return;
    }

    setIsSyncing(true);
    addDriveLog("Syncing local changes to Google Drive...", "info");
    try {
      const parsed = JSON.parse(jsonString);
      parsed.lastEditedTime = new Date().toISOString();
      const contentToSave = JSON.stringify(parsed, null, 2);

      const success = await googleApi.drive.updateFileContent(accessToken, fileId, contentToSave);
      if (success) {
        setJsonString(contentToSave);
        addDriveLog("Database synchronized and updated successfully on Google Drive", "success");
        toast.success("Database synchronized with Google Drive!");
      } else {
        throw new Error("Update response failed.");
      }
    } catch (err: any) {
      console.error(err);
      addDriveLog(`Sync failed: ${err.message || 'Unknown error'}`, "error");
      toast.error("Sync failed.");
    } finally {
      setIsSyncing(false);
    }
  };

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

      {/* --- Google Drive Real-time JSON Database Control Section --- */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.25 }}
        className="bg-card border border-border shadow-md rounded-[2rem] p-6 md:p-8 space-y-6"
      >
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-border pb-4">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-blue-500/10 text-blue-500 rounded-xl">
              <Database className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-xl font-bold tracking-tight">Google Drive Real-Time JSON Database</h2>
              <p className="text-xs text-muted-foreground mt-0.5">Edit files on Google Drive real-time and manage cloud JSON nodes.</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <span className={`px-2.5 py-1 text-[10px] font-bold uppercase rounded-full tracking-wider ${accessToken ? 'bg-emerald-500/10 text-emerald-500 border border-emerald-500/20' : 'bg-rose-500/10 text-rose-500 border border-rose-500/20'}`}>
              {accessToken ? "Connected" : "Disconnected"}
            </span>
            {accessToken && (
              <Button size="sm" variant="outline" onClick={initializeDriveDb} disabled={isLoadingDriveDb} className="h-8 rounded-lg text-xs gap-1">
                <RefreshCw className={`w-3.5 h-3.5 ${isLoadingDriveDb ? 'animate-spin' : ''}`} /> Reload
              </Button>
            )}
          </div>
        </div>

        {!accessToken ? (
          <div className="bg-muted/10 border border-dashed border-border rounded-2xl p-8 text-center space-y-4">
            <div className="w-12 h-12 bg-muted rounded-full flex items-center justify-center mx-auto text-muted-foreground">
              <HardDrive className="w-6 h-6" />
            </div>
            <div className="max-w-md mx-auto space-y-2">
              <h3 className="font-bold text-sm text-foreground">Google Drive Database is Not Connected</h3>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Connect your Google Account in the application settings first to enable real-time database JSON editing. This will auto-generate the workspace folder <strong className="font-mono text-primary font-bold">MMV XII</strong> inside your Drive!
              </p>
            </div>
            <Link to="/settings">
              <Button size="sm" className="rounded-xl mt-2 bg-blue-500 hover:bg-blue-600 text-white shadow-sm">
                Go to Settings & Link Account
              </Button>
            </Link>
          </div>
        ) : isLoadingDriveDb ? (
          <div className="flex flex-col items-center justify-center py-12 gap-3 text-muted-foreground">
            <div className="w-8 h-8 border-3 border-blue-500 border-t-transparent rounded-full animate-spin" />
            <p className="text-xs font-semibold animate-pulse">Initializing MMV XII Workspace Drive Node...</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left side: Code Editor */}
            <div className="lg:col-span-2 space-y-3 flex flex-col">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1.5">
                  <FileCode className="w-4 h-4 text-blue-500" />
                  <span className="text-xs font-bold font-mono">MMV XII/database.json</span>
                </div>
                
                <div className="flex items-center gap-2">
                  <span className={`inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-full ${isValidJson ? 'bg-emerald-500/10 text-emerald-500' : 'bg-rose-500/10 text-rose-500'}`}>
                    {isValidJson ? (
                      <>
                        <Check className="w-3 h-3" /> Valid JSON
                      </>
                    ) : (
                      <>
                        <AlertCircle className="w-3 h-3" /> Invalid Syntax
                      </>
                    )}
                  </span>
                </div>
              </div>

              <div className="relative flex-1 min-h-[300px] rounded-2xl overflow-hidden border border-border bg-slate-950 p-2 font-mono text-xs text-slate-100 shadow-inner group">
                <textarea
                  value={jsonString}
                  onChange={(e) => handleJsonChange(e.target.value)}
                  className="w-full h-full min-h-[320px] bg-transparent outline-none border-none resize-none p-3 font-mono text-xs leading-relaxed text-emerald-400 focus:ring-0 select-text cursor-text"
                  placeholder='{\n  "tasks": []\n}'
                  spellCheck="false"
                />
              </div>

              {jsonError && (
                <div className="bg-rose-500/10 border border-rose-500/20 text-rose-500 p-3 rounded-xl text-[11px] font-mono whitespace-pre-wrap">
                  {jsonError}
                </div>
              )}

              <div className="flex flex-wrap gap-2 pt-2">
                <Button 
                  size="sm" 
                  onClick={saveJsonToDrive} 
                  disabled={isSyncing || !isValidJson}
                  className="rounded-xl bg-blue-500 hover:bg-blue-600 text-white shadow font-bold text-xs gap-1.5 h-10 px-4"
                >
                  <Save className="w-4 h-4" /> {isSyncing ? "Saving & Syncing..." : "Sync Changes to Drive"}
                </Button>
                <Button 
                  size="sm" 
                  variant="outline" 
                  onClick={formatJson}
                  className="rounded-xl font-bold text-xs h-10 px-4"
                >
                  Format JSON
                </Button>
              </div>
            </div>

            {/* Right side: Control Logs */}
            <div className="space-y-3 flex flex-col h-full">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Database Control Section</span>
                <span className="text-[10px] text-muted-foreground font-mono">Real-Time Actions</span>
              </div>

              <div className="flex-1 min-h-[380px] bg-muted/25 border border-border rounded-2xl p-4 flex flex-col min-w-0">
                <div className="text-[11px] text-muted-foreground border-b border-border pb-2 mb-3 flex items-center justify-between flex-shrink-0">
                  <span className="font-bold text-foreground">Action Timeline</span>
                  <span>Active Session</span>
                </div>

                <div className="flex-1 overflow-y-auto space-y-2.5 pr-1 max-h-[320px]">
                  {driveLogs.length === 0 ? (
                    <div className="h-full flex items-center justify-center text-center text-muted-foreground/50 py-8 text-xs">
                      No actions performed yet.
                    </div>
                  ) : (
                    driveLogs.map((log) => (
                      <div key={log.id} className="text-xs border-b border-muted/50 pb-2 leading-relaxed">
                        <div className="flex items-center justify-between mb-0.5">
                          <span className={`font-bold text-[10px] ${
                            log.type === 'success' ? 'text-emerald-500' :
                            log.type === 'error' ? 'text-rose-500' :
                            'text-blue-500'
                          }`}>
                            {log.type.toUpperCase()}
                          </span>
                          <span className="text-[10px] text-muted-foreground font-mono">{log.time}</span>
                        </div>
                        <p className="text-muted-foreground font-medium break-words text-[11px]">{log.action}</p>
                      </div>
                    ))
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
      </motion.div>

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
