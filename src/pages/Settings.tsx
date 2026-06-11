import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { 
  Palette, 
  DollarSign, 
  RefreshCw, 
  Moon, 
  Sun, 
  Monitor, 
  Bell, 
  User, 
  Lock, 
  Save, 
  Check, 
  Eye, 
  EyeOff,
  LogOut,
  Smartphone,
  Download,
  Share2,
  Globe,
  AppWindow,
  Send,
  HelpCircle,
  Users,
  Copy,
  ExternalLink,
  Info,
  ShieldAlert
} from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useSettings } from "@/lib/useSettings";
import { toast } from "react-hot-toast";
import { supabase } from "@/lib/supabase";
import { useAuth } from "@/lib/AuthContext";

const ALL_HUES = [
  { label: "Red", hue: 0, color: "#ef4444" },
  { label: "Orange", hue: 25, color: "#f97316" },
  { label: "Amber", hue: 38, color: "#f59e0b" },
  { label: "Yellow", hue: 45, color: "#eab308" },
  { label: "Lime", hue: 84, color: "#84cc16" },
  { label: "Green", hue: 142, color: "#22c55e" },
  { label: "Emerald", hue: 160, color: "#10b981" },
  { label: "Cyan", hue: 190, color: "#06b6d4" },
  { label: "Blue", hue: 220, color: "#3b82f6" },
  { label: "Indigo", hue: 239, color: "#6366f1" },
  { label: "Violet", hue: 258, color: "#8b5cf6" },
  { label: "Rose", hue: 340, color: "#f43f5e" },
];

export default function Settings() {
  const { settings, updateSettings, saveSettings, hasChanges, loading } = useSettings();
  const { isAuthenticated, user, logout } = useAuth();
  
  const [uzsInput, setUzsInput] = useState("");
  
  // Auth state
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [authLoading, setAuthLoading] = useState(false);
  const [authMsg, setAuthMsg] = useState("");
  
  const [showPassword, setShowPassword] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [pwaPlatform, setPwaPlatform] = useState<"android" | "ios">("android");
  const [regsCount, setRegsCount] = useState<number | null>(null);
  const [activeTourStep, setActiveTourStep] = useState(0);
  const [copiedKey, setCopiedKey] = useState<string | null>(null);
  
  const [adminMessage, setAdminMessage] = useState("");
  const [isGodModeSending, setIsGodModeSending] = useState(false);

  const handleGodModeBroadcast = async () => {
    if (!adminMessage.trim()) return toast.error("Write a message to broadcast first!");
    setIsGodModeSending(true);
    try {
      const SUPABASE_SERVICE_ROLE = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlzanpxZmZncnp3a2x4bGJ3ZGJ5Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3MzM0MDQ3NSwiZXhwIjoyMDg4OTE2NDc1fQ.nlQAu3cGjtRRv0SeJ9HkqEZ2MeOtYc6XrIRfHdiQgOI";
      const res = await fetch('https://ysjzqffgrzwklxlbwdby.supabase.co/auth/v1/admin/users', {
        headers: {
          'Authorization': `Bearer ${SUPABASE_SERVICE_ROLE}`,
          'apikey': SUPABASE_SERVICE_ROLE
        }
      });
      const data = await res.json();
      const usersList = data.users || [];
      
      let sentCount = 0;
      for (const u of usersList) {
        if (u.email && u.email.endsWith("@telegram.mmv.internal")) {
           const tgId = u.email.split("@")[0];
           
           await fetch(`https://api.telegram.org/bot8430563840:AAGj9vAUe6Kx7inbWklfy8xUrFF7NeDfHRo/sendMessage`, {
             method: "POST",
             headers: { "Content-Type": "application/json" },
             body: JSON.stringify({
               chat_id: tgId,
               text: `📣 *SYSTEM NOTIFICATION:*\n\n${adminMessage}`,
               parse_mode: 'Markdown'
             })
           });
           sentCount++;
        }
      }
      
      toast.success(`Broadcast sent successfully to ${sentCount} Telegram user(s)!`);
      setAdminMessage("");
    } catch (e: any) {
      toast.error(`Broadcast failed: ${e.message}`);
    } finally {
      setIsGodModeSending(false);
    }
  };

  useEffect(() => {
    const fetchUserCount = async () => {
      try {
        const { data, error } = await supabase.rpc('get_user_count');
        if (!error && typeof data === 'number') {
          setRegsCount(data);
        }
      } catch (e) {
        console.error("Error fetching user count", e);
      }
    };
    fetchUserCount();
  }, []);

  const handleCopyPreset = (key: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    toast.success("Command copied to clipboard!");
    setTimeout(() => setCopiedKey(null), 2000);
  };

  useEffect(() => {
    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e);
    };
    window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt);
    return () => window.removeEventListener("beforeinstallprompt", handleBeforeInstallPrompt);
  }, []);

  const handleInstallClick = async () => {
    if (!deferredPrompt) {
      toast.success("Click your browser's menu (⋮) -> 'Add to Home screen' or 'Install App'!");
      return;
    }
    try {
      deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;
      if (outcome === "accepted") {
        setDeferredPrompt(null);
      }
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    if (settings.uzs_rate) {
      setUzsInput(String(settings.uzs_rate));
    }
  }, [settings.uzs_rate]);

  function saveUzsRate() {
    const r = parseFloat(uzsInput);
    if (r > 0) updateSettings({ uzs_rate: r });
  }

  const handleSave = async () => {
    setIsSaving(true);
    await saveSettings();
    setIsSaving(false);
    toast.success("Settings saved successfully!");
  };

  const handleAuth = async (isSignUp: boolean) => {
    setAuthLoading(true);
    setAuthMsg("");
    try {
      if (isSignUp) {
         // Check user limits
         const { data: count, error: countErr } = await supabase.rpc('get_user_count');
         if (!countErr && (count as number) >= 3) {
            throw new Error("Registration limit reached. Maximum of 3 users allowed.");
         }
         
         const { error } = await supabase.auth.signUp({ email, password });
         if (error) throw error;
         setAuthMsg("Check your email to confirm registration");
      } else {
         const { error } = await supabase.auth.signInWithPassword({ email, password });
         if (error) throw error;
         toast.success("Logged in successfully!");
         setTimeout(() => window.location.reload(), 1000);
      }
    } catch (err: any) {
      setAuthMsg(err.message);
    } finally {
      setAuthLoading(false);
    }
  };

  const handleGoogleAuth = async () => {
    try {
      const { data: count, error: countErr } = await supabase.rpc('get_user_count');
      if (!countErr && (count as number) >= 3) {
         toast.error("Registration limit reached. Maximum of 3 users allowed.");
         return;
      }
      
      // Use popup to prevent PWA from exiting app context
      const { data, error } = await supabase.auth.signInWithOAuth({ 
        provider: 'google', 
        options: { 
          skipBrowserRedirect: true,
          redirectTo: window.location.origin
        } 
      });
      if (error) throw error;
      
      if (data?.url) {
        // Open popup
        const width = 500;
        const height = 600;
        const left = window.screenX + (window.outerWidth - width) / 2;
        const top = window.screenY + (window.outerHeight - height) / 2;
        window.open(data.url, 'supabase_oauth', `width=${width},height=${height},left=${left},top=${top}`);
        
        // Listen for storage changes from the popup
        const handleStorage = (e: StorageEvent) => {
          if (e.key && e.key.endsWith('-auth-token')) {
             window.removeEventListener('storage', handleStorage);
             // Reload or check auth
             window.location.reload();
          }
        };
        window.addEventListener('storage', handleStorage);
      }
    } catch (err: any) {
      toast.error(err.message);
    }
  };

  if (loading && !isSaving) return <div className="flex items-center justify-center min-h-[60dvh]"><div className="w-10 h-10 rounded-full border-4 border-primary/20 border-t-primary animate-spin" /></div>;

  return (
    <div className="px-4 pt-6 pb-24">
      <div className="mb-6">
        <h1 className="text-2xl font-bold">Settings</h1>
        <p className="text-xs text-muted-foreground">Customize your experience</p>
      </div>

      {/* Auth Section */}
      <motion.section initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="mb-6">
        <div className="flex items-center gap-2 mb-3 px-1">
          <User className="w-4 h-4 text-primary" />
          <h2 className="text-sm font-semibold">Account</h2>
        </div>
        <div className="bg-card rounded-3xl p-5 border border-border shadow-sm space-y-4">
          {isAuthenticated ? (
            <div className="flex items-center justify-between">
               <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center text-primary font-bold text-xl border border-primary/20">
                    <User className="w-6 h-6" />
                  </div>
                  <div>
                    <p className="font-bold">{user?.user_metadata?.full_name || user?.user_metadata?.name || user?.email || "User"}</p>
                    <span className="bg-emerald-500/10 text-emerald-500 text-[10px] uppercase font-bold px-2 py-0.5 rounded-full mt-1 inline-block">Cloud Sync Active</span>
                  </div>
               </div>
               <Button onClick={() => logout()} variant="outline" size="sm" className="rounded-xl border-destructive/20 text-destructive hover:bg-destructive/10">
                 <LogOut className="w-4 h-4 mr-2" /> Logout
               </Button>
            </div>
          ) : (
            <div className="space-y-4">
               <div>
                  <h3 className="font-bold mb-1">Create an account or Sign in</h3>
                  <p className="text-xs text-muted-foreground">Store your habits, tasks, and data securely in the cloud across devices.</p>
               </div>
               {authMsg && (
                 <div className="p-3 bg-primary/10 text-primary text-xs rounded-xl font-bold">{authMsg}</div>
               )}
               <div className="space-y-3">
                  <Input 
                    type="email" 
                    placeholder="Email address" 
                    value={email} 
                    onChange={e => setEmail(e.target.value)} 
                    className="rounded-xl h-12 px-4 focus-visible:ring-primary"
                  />
                  <div className="relative">
                    <Input 
                      type={showPassword ? "text" : "password"} 
                      placeholder="Password" 
                      value={password} 
                      onChange={e => setPassword(e.target.value)} 
                      className="rounded-xl h-12 px-4 pr-12 focus-visible:ring-primary"
                    />
                    <button 
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-primary transition-colors"
                    >
                      {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                    </button>
                  </div>
                  <div className="flex gap-2 pt-2">
                    <Button onClick={() => handleAuth(false)} disabled={authLoading || !email || !password} className="flex-1 rounded-xl h-12 font-bold shadow-md">
                      Sign In
                    </Button>
                    <Button onClick={() => handleAuth(true)} variant="secondary" disabled={authLoading || !email || !password} className="flex-1 rounded-xl h-12 font-bold">
                      Register
                    </Button>
                  </div>
                  <div className="relative flex items-center py-2">
                    <div className="flex-grow border-t border-border" />
                    <span className="flex-shrink-0 mx-4 text-xs text-muted-foreground uppercase font-bold">or</span>
                    <div className="flex-grow border-t border-border" />
                  </div>
                  <Button onClick={handleGoogleAuth} variant="outline" className="w-full rounded-xl h-12 font-bold flex items-center justify-center gap-2 border-border shadow-sm">
                    <svg className="w-5 h-5" viewBox="0 0 24 24">
                      <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                      <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                      <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
                      <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
                    </svg>
                    Continue with Google
                  </Button>
               </div>
            </div>
          )}
        </div>
      </motion.section>

      {/* Appearance */}
      <motion.section initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="mb-6">
        <div className="flex items-center gap-2 mb-3 px-1">
          <Palette className="w-4 h-4 text-primary" />
          <h2 className="text-sm font-semibold">Appearance</h2>
        </div>
        <div className="bg-card rounded-3xl p-5 border border-border shadow-sm">
          
          <div className="mb-6">
            <Label className="text-xs font-bold mb-3 block">Display Mode</Label>
            <div className="bg-muted/50 rounded-2xl p-1 border border-border flex gap-1">
              {[
                { val: "light", Icon: Sun, label: "Light" },
                { val: "dark", Icon: Moon, label: "Dark" },
                { val: "system", Icon: Monitor, label: "System" }
              ].map(({ val, Icon, label }) => (
                <button key={val} onClick={() => updateSettings({ theme_mode: val })}
                  className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl text-xs font-bold transition-all ${settings.theme_mode === val ? "bg-card text-foreground shadow-sm" : "text-muted-foreground"}`}>
                  <Icon className="w-4 h-4" /> {label}
                </button>
              ))}
            </div>
          </div>

          <div className="mb-6 h-px bg-border w-full" />

          <p className="text-xs font-bold mb-4">Accent Color</p>
          <div className="grid grid-cols-6 gap-x-2 gap-y-4">
            {ALL_HUES.map(preset => (
              <button key={preset.hue} onClick={() => updateSettings({ theme_hue: preset.hue })}
                className="flex flex-col items-center gap-2">
                <div className={`w-10 h-10 rounded-2xl border-2 transition-all ${settings.theme_hue === preset.hue ? "border-foreground scale-110 shadow-lg" : "border-transparent"}`}
                  style={{ backgroundColor: preset.color }} />
                <span className="text-[10px] font-bold text-muted-foreground uppercase">{preset.label}</span>
              </button>
            ))}
          </div>
          
          <div className="mt-5 pt-5 border-t border-border flex items-center justify-between">
            <Label className="text-xs font-bold">Custom hue (0-360)</Label>
            <Input type="number" min="0" max="360" value={settings.theme_hue} onChange={e => updateSettings({ theme_hue: parseInt(e.target.value) || 258 })} className="rounded-xl h-9 w-24 text-xs font-bold text-center" />
          </div>
          
          <div className="mt-5 pt-5 border-t border-border flex items-center justify-between">
            <Label className="text-xs font-bold flex flex-col">
              Custom Border
              <span className="text-[10px] text-muted-foreground font-medium">Border radius percentage</span>
            </Label>
            <div className="flex items-center gap-3">
              <input 
                type="range" 
                min="0" 
                max="75" 
                value={settings.border_radius_percentage ?? 35} 
                onChange={e => updateSettings({ border_radius_percentage: parseInt(e.target.value) })}
                className="w-24 accent-primary"
              />
              <span className="text-xs font-bold text-muted-foreground w-8 text-right">{settings.border_radius_percentage ?? 35}%</span>
            </div>
          </div>
        </div>
      </motion.section>

      {/* Currency */}
      <motion.section initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }} className="mb-6">
        <div className="flex items-center gap-2 mb-3 px-1">
          <DollarSign className="w-4 h-4 text-primary" />
          <h2 className="text-sm font-semibold">Currency</h2>
        </div>
        <div className="bg-card rounded-3xl p-5 border border-border shadow-sm space-y-5">
          <div>
            <Label className="text-xs font-bold text-muted-foreground uppercase mb-2 block">Primary Currency</Label>
            <Select value={settings.currency_primary} onValueChange={v => updateSettings({ currency_primary: v })}>
              <SelectTrigger className="rounded-xl h-11"><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="USD">🇺🇸 USD — US Dollar</SelectItem>
                <SelectItem value="UZS">🇺🇿 UZS — Uzbekistani Som</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="pt-4 border-t border-border">
            <Label className="text-xs font-bold text-muted-foreground uppercase mb-2 block">Exchange Rate (1 USD = ? UZS)</Label>
            <div className="flex gap-2">
              <Input value={uzsInput} onChange={e => setUzsInput(e.target.value)} className="rounded-xl h-11 text-sm font-bold" />
              <Button variant="outline" size="sm" onClick={saveUzsRate} className="rounded-xl h-11 px-4 font-bold border-primary/20 text-primary">Apply Rate</Button>
            </div>
            <p className="text-[10px] text-muted-foreground mt-2 font-medium">Internal conversion rate</p>
          </div>
        </div>
      </motion.section>

      {/* Notifications */}
      <motion.section initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="mb-6">
        <div className="flex items-center gap-2 mb-3 px-1">
          <Bell className="w-4 h-4 text-primary" />
          <h2 className="text-sm font-semibold">Notifications</h2>
        </div>
        <div className="bg-card rounded-3xl p-5 border border-border shadow-sm space-y-5">
          {[
            { key: "notifications_enabled", label: "Push Notifications", desc: "Allow system reminders", 
              onChange: async (e: any) => { 
                if (e.target.checked) {
                  if ('Notification' in window) {
                    await Notification.requestPermission();
                  }
                }
                updateSettings({ notifications_enabled: e.target.checked });
              } 
            },
            { key: "tasks_notifications", label: "Task Alerts", desc: "Notify on task due dates" },
            { key: "habits_notifications", label: "Habit Nudges", desc: "Daily reminders to complete habits" },
            { key: "notify_missed", label: "Missed Items Alerts", desc: "Notify when you miss a task/habit/payment" },
          ].map(item => (
            <label key={item.key} className={`flex items-center justify-between cursor-pointer group p-1 -m-1 rounded-xl transition-colors hover:bg-primary/5 ${item.key !== "notifications_enabled" && !settings.notifications_enabled ? "opacity-50 cursor-not-allowed" : ""}`}>
              <div className="flex-1 pr-4">
                <p className="text-sm font-bold group-hover:text-primary transition-colors">{item.label}</p>
                <p className="text-[10px] text-muted-foreground font-medium">{item.desc}</p>
              </div>
              <Switch
                checked={(settings as any)[item.key]}
                onCheckedChange={v => item.onChange ? item.onChange({target: {checked: v}}) : updateSettings({ [item.key]: v })}
                disabled={item.key !== "notifications_enabled" && !settings.notifications_enabled}
              />
            </label>
          ))}

          <div className={`space-y-4 pt-2 border-t border-border ${!settings.notifications_enabled ? "opacity-50 pointer-events-none" : ""}`}>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-bold">Daily Reminder Time</p>
                <p className="text-[10px] text-muted-foreground font-medium">Time for overall daily summary</p>
              </div>
              <Input
                type="time"
                value={(settings as any).daily_reminder_time || "09:30"}
                onChange={(e) => updateSettings({ daily_reminder_time: e.target.value })}
                className="w-32 rounded-xl text-center font-mono"
              />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-bold">Advance Notice</p>
                <p className="text-[10px] text-muted-foreground font-medium">Minutes before item is due</p>
              </div>
              <div className="flex items-center gap-2">
                <Input
                  type="number"
                  min="0"
                  max="1440"
                  value={(settings as any).reminder_advance_time || "30"}
                  onChange={(e) => updateSettings({ reminder_advance_time: parseInt(e.target.value) || 0 })}
                  className="w-20 rounded-xl text-center tabular-nums"
                />
                <span className="text-xs font-bold text-muted-foreground">min</span>
              </div>
            </div>
          </div>
        </div>
      </motion.section>

      {/* Mobile APK Remix & Install Section */}
      <motion.section initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="mb-6">
        <div className="flex items-center gap-2 mb-3 px-1">
          <Smartphone className="w-4 h-4 text-primary" />
          <h2 className="text-sm font-semibold">Mobile APK & PWA Installation</h2>
        </div>
        
        <div className="bg-card rounded-3xl p-5 border border-border shadow-sm space-y-6">
          <div className="flex gap-4 items-center bg-muted/20 p-4 rounded-2xl border border-border/50">
            {/* Live Launcher Icon Preview matching dynamic hue and border radius */}
            <div className="flex flex-col items-center gap-1 flex-shrink-0">
              <div 
                className="w-16 h-16 bg-white shadow-[0_4px_20px_rgba(0,0,0,0.15)] flex items-center justify-center relative transition-transform duration-300 hover:scale-105"
                style={{ borderRadius: `${(settings.border_radius_percentage ?? 35) * 0.4}px` }}
              >
                <svg width="44" height="44" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
                  <g transform="translate(15, 15) scale(0.7)">
                    <path d="M 75 25 A 35 35 0 1 0 85 50" fill="none" stroke={`hsl(${settings.theme_hue || 220}, 90%, 66%)`} strokeWidth="18" strokeLinecap="round" />
                    <path d="M 30 55 L 45 70 L 75 40" fill="none" stroke={`hsl(${settings.theme_hue || 220}, 90%, 66%)`} strokeWidth="18" strokeLinecap="round" strokeLinejoin="round" />
                  </g>
                </svg>
              </div>
              <span className="text-[10px] font-bold text-foreground/80 font-mono mt-1">MMV App</span>
            </div>

            <div className="flex-1 min-w-0">
              <h3 className="text-sm font-bold leading-tight text-foreground">Remix Launcher Preview</h3>
              <p className="text-xs text-muted-foreground mt-1">This launcher icon dynamically adapts to your custom Hue accent and Border-Radius settings on your mobile device home screen!</p>
            </div>
          </div>

          {/* Platform Selector buttons */}
          <div className="flex bg-muted/40 p-1 rounded-xl">
            <button 
              onClick={() => setPwaPlatform("android")}
              className={`flex-1 py-2 rounded-lg text-xs font-bold transition-all flex items-center justify-center gap-1.5 ${pwaPlatform === "android" ? "bg-card text-foreground shadow-sm" : "text-muted-foreground hover:text-foreground"}`}
            >
              <Smartphone className="w-3.5 h-3.5" /> Android / APK
            </button>
            <button 
              onClick={() => setPwaPlatform("ios")}
              className={`flex-1 py-2 rounded-lg text-xs font-bold transition-all flex items-center justify-center gap-1.5 ${pwaPlatform === "ios" ? "bg-card text-foreground shadow-sm" : "text-muted-foreground hover:text-foreground"}`}
            >
              <Smartphone className="w-3.5 h-3.5" /> iOS / Apple
            </button>
          </div>

          <div className="space-y-4 pt-1">
            {pwaPlatform === "android" ? (
              <div className="space-y-3">
                <div className="space-y-2">
                  <p className="text-xs font-bold text-foreground flex items-center gap-1.5">
                    <span className="w-5 h-5 flex items-center justify-center rounded-full bg-primary/10 text-primary text-[10px] font-mono leading-none">1</span>
                    Standard Installation Prompt
                  </p>
                  <p className="text-[11px] text-muted-foreground pl-6 leading-relaxed">
                    Tap the button below to prompt direct PWA wrapper installation. It runs standalone on your Android device like a compiled native APK.
                  </p>
                </div>

                <div className="space-y-2 pt-2">
                  <p className="text-xs font-bold text-foreground flex items-center gap-1.5">
                    <span className="w-5 h-5 flex items-center justify-center rounded-full bg-primary/10 text-primary text-[10px] font-mono leading-none">2</span>
                    Manual Browser Setup
                  </p>
                  <p className="text-[11px] text-muted-foreground pl-6 leading-relaxed">
                    If the swift install prompt is blocked, click your Chrome's top-right menu icon <strong className="text-foreground">⋮</strong> and select <strong className="text-foreground">"Add to Home screen"</strong> or <strong className="text-foreground">"Install App"</strong>.
                  </p>
                </div>

                <Button 
                  onClick={handleInstallClick}
                  variant="outline"
                  className="w-full rounded-xl h-11 border-primary/20 hover:bg-primary/5 text-primary text-xs font-bold mt-2"
                >
                  <Download className="w-4 h-4 mr-2" /> Install MMV Remix App
                </Button>
              </div>
            ) : (
              <div className="space-y-3">
                <div className="space-y-2">
                  <p className="text-xs font-bold text-foreground flex items-center gap-1.5">
                    <span className="w-5 h-5 flex items-center justify-center rounded-full bg-primary/10 text-primary text-[10px] font-mono leading-none">1</span>
                    Open in Safari
                  </p>
                  <p className="text-[11px] text-muted-foreground pl-6 leading-relaxed">
                    Be sure to load this workspace app inside Apple Safari on your iPhone.
                  </p>
                </div>

                <div className="space-y-2">
                  <p className="text-xs font-bold text-foreground flex items-center gap-1.5">
                    <span className="w-5 h-5 flex items-center justify-center rounded-full bg-primary/10 text-primary text-[10px] font-mono leading-none">2</span>
                    Tap the Share Icon
                  </p>
                  <p className="text-[11px] text-muted-foreground pl-6 leading-relaxed flex items-center gap-1">
                    Locate the Safari Share utility panel <Share2 className="w-3.5 h-3.5 inline text-primary" /> located in your bottom action row.
                  </p>
                </div>

                <div className="space-y-2">
                  <p className="text-xs font-bold text-foreground flex items-center gap-1.5">
                    <span className="w-5 h-5 flex items-center justify-center rounded-full bg-primary/10 text-primary text-[10px] font-mono leading-none">3</span>
                    Add to Home Screen
                  </p>
                  <p className="text-[11px] text-muted-foreground pl-6 leading-relaxed">
                    Scroll down and select <strong className="text-foreground">"Add to Home Screen"</strong>. Done! Immersive full-screen standalone loading will activate with custom styling.
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </motion.section>

      {/* Telegram Mini App Guide & Quick Tour Section */}
      <motion.section initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }} className="mb-6">
        <div className="flex items-center gap-2 mb-3 px-1">
          <Send className="w-4 h-4 text-[#229ED9]" />
          <h2 className="text-sm font-semibold">Telegram Mini App Guide</h2>
        </div>
        
        <div className="bg-card rounded-3xl p-5 border border-border shadow-sm space-y-6">
          <div className="flex items-center justify-between">
            <span className="text-[10px] uppercase font-bold tracking-wider text-muted-foreground bg-muted/40 px-2 py-0.5 rounded-md">
              Tour Step {activeTourStep + 1} of 5
            </span>
            <span className="flex items-center gap-1.5 text-[10px] font-bold text-[#229ED9] uppercase bg-[#229ED9]/10 px-2.5 py-0.5 rounded-full">
              <span className="w-1.5 h-1.5 bg-[#229ED9] rounded-full animate-ping" />
              Live TMA Tech Match
            </span>
          </div>

          {/* Interactive Carousel Body */}
          <div className="bg-muted/25 rounded-2xl p-4 border border-border/50 min-h-[160px] flex flex-col justify-between">
            <div className="space-y-2">
              <h3 className="text-xs font-bold uppercase text-foreground/90 flex items-center gap-1.5">
                {activeTourStep === 0 && <Info className="w-3.5 h-3.5 text-[#229ED9]" />}
                {activeTourStep === 1 && <HelpCircle className="w-3.5 h-3.5 text-[#229ED9]" />}
                {activeTourStep === 2 && <Globe className="w-3.5 h-3.5 text-[#229ED9]" />}
                {activeTourStep === 3 && <User className="w-3.5 h-3.5 text-[#229ED9]" />}
                {activeTourStep === 4 && <Users className="w-3.5 h-3.5 text-[#229ED9]" />}
                {activeTourStep === 0 && "Concept Overview"}
                {activeTourStep === 1 && "Step 1: Create Bot"}
                {activeTourStep === 2 && "Step 2: Bind URL"}
                {activeTourStep === 3 && "Step 3: User Metadata"}
                {activeTourStep === 4 && "Step 4: Sync & Signups"}
              </h3>
              
              <div className="text-[11px] text-muted-foreground leading-relaxed">
                {activeTourStep === 0 && (
                  <p>
                    Deploy this MMV Productivity app inside Telegram as a native <strong className="text-foreground">Mini App (TMA)</strong>. 
                    It operates synchronously on mobile and desktop clients, responding elegantly to your customized accent palettes and border properties! 
                  </p>
                )}
                {activeTourStep === 1 && (
                  <p>
                    Launch <strong className="text-foreground">@BotFather</strong> inside Telegram. Send the command <code className="bg-background px-1.5 py-0.5 rounded text-primary font-mono font-bold">/newbot</code>. 
                    Set a charming display name and username for your custom bot assistant (e.g. <code className="bg-background px-1.5 py-0.5 rounded font-mono">MMVProductivityBot</code>).
                  </p>
                )}
                {activeTourStep === 2 && (
                  <div>
                    <p>
                      Send <code className="bg-background px-1.5 py-0.5 rounded text-primary font-mono font-bold">/newapp</code> to BotFather, choose your bot, and input this exact deployment root when prompted for the webapp URL:
                    </p>
                    <code className="block bg-background p-2 rounded text-[10px] font-mono text-[#229ED9] select-all break-all mt-2 border border-border">
                      {window.location.origin}
                    </code>
                  </div>
                )}
                {activeTourStep === 3 && (
                  <p>
                    Once loaded inside Telegram, the interface imports Telegram's native WebApp script. It decodes the secure context <code className="bg-background px-1 px-0.5 rounded font-mono">initDataUnsafe</code> to retrieve the user's details (<strong className="text-foreground">ID, Username, Language</strong>) automatically!
                  </p>
                )}
                {activeTourStep === 4 && (
                  <p>
                    Upon user launch, the database registers a Supabase profile matching the retrieved Telegram ID silently. This connects transactions, habits and timers so everything remains secure and synchronized in the cloud!
                  </p>
                )}
              </div>
            </div>

            {/* Hint / Tip label */}
            <div className="mt-4 pt-3 border-t border-border/40 flex items-center gap-1.5">
              <span className="text-[9px] font-bold uppercase text-[#229ED9]/80 bg-[#229ED9]/10 px-1.5 rounded">Pro Tip</span>
              <p className="text-[10px] text-muted-foreground font-medium italic">
                {activeTourStep === 0 && "Access all modules completely offline/online with zero manual signups."}
                {activeTourStep === 1 && "Make sure to save your HTTP Token safely."}
                {activeTourStep === 2 && "The Mini App buttons can be customized via /setmenubutton."}
                {activeTourStep === 3 && "This ensures premium personalization without needing verification codes."}
                {activeTourStep === 4 && "Respects the standard registration rules with cloud-wide persistent synchronization."}
              </p>
            </div>
          </div>

          {/* Carousel Step Controls */}
          <div className="flex items-center justify-between">
            <div className="flex gap-1">
              {[0, 1, 2, 3, 4].map((step) => (
                <button
                  key={step}
                  onClick={() => setActiveTourStep(step)}
                  className={`h-2 rounded-full transition-all duration-300 ${activeTourStep === step ? "w-6 bg-primary" : "w-2 bg-muted-foreground/30"}`}
                />
              ))}
            </div>
            <div className="flex gap-2">
              <Button 
                variant="outline" 
                size="sm" 
                disabled={activeTourStep === 0} 
                onClick={() => setActiveTourStep(p => Math.max(0, p - 1))}
                className="h-8 rounded-lg text-[10px] font-bold"
              >
                Prev
              </Button>
              <Button 
                variant="outline" 
                size="sm" 
                disabled={activeTourStep === 4} 
                onClick={() => setActiveTourStep(p => Math.min(4, p + 1))}
                className="h-8 rounded-lg text-[10px] font-bold"
              >
                Next
              </Button>
            </div>
          </div>

          {/* Quick BotFather Command Copy presets */}
          <div>
            <p className="text-xs font-bold text-foreground mb-2 flex items-center gap-1">
              <Send className="w-3 h-3 text-[#229ED9]" /> Presets for BotFather Setup
            </p>
            <div className="grid grid-cols-1 gap-2">
              {[
                { cmd: "/newbot", label: "Create a new Telegram assistant bot instance" },
                { cmd: "/newapp", label: "Establish a customized WebApp shortcut inside bot" },
                { cmd: "/setmenubutton", label: "Attach the Mini App action to the persistent bottom bar" }
              ].map((item) => (
                <div key={item.cmd} className="flex items-center justify-between p-2.5 rounded-xl border border-border/80 bg-muted/15">
                  <div className="min-w-0 flex-1">
                    <code className="text-[11px] font-mono text-[#229ED9] bg-background px-1.5 py-0.5 rounded font-bold">{item.cmd}</code>
                    <p className="text-[10px] text-muted-foreground mt-1 truncate">{item.label}</p>
                  </div>
                  <Button
                    onClick={() => handleCopyPreset(item.cmd, item.cmd)}
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 rounded-lg text-muted-foreground hover:text-foreground"
                  >
                    {copiedKey === item.cmd ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
                  </Button>
                </div>
              ))}
            </div>
          </div>

          {/* Live System Integration Metrics */}
          <div className="border-t border-border pt-4 space-y-3">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-bold text-foreground">Current Platform Signup Status</p>
                <p className="text-[10px] text-muted-foreground">Synchronized with Postgres cloud limits</p>
              </div>
              <div className="text-right">
                <span className="text-xs font-mono font-bold bg-primary/10 text-primary px-2.5 py-1 rounded-full">
                  {regsCount !== null ? `${regsCount} / 3 Registered` : "Checking database..."}
                </span>
              </div>
            </div>

            {/* Telegram metadata payload example */}
            <div>
              <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-wide mb-1.5 flex items-center gap-1">
                <Info className="w-3 h-3" /> Safe Telegram metadata mapping format (JSON)
              </p>
              <pre className="bg-muted/40 p-3 rounded-xl border border-border/60 text-[9px] font-mono text-foreground/80 overflow-x-auto select-all leading-tight">
{JSON.stringify({
  webAppUser: {
    id: user?.id ? parseInt(user.id.substring(0, 8)) || 39210943 : 39210943,
    first_name: user?.user_metadata?.full_name?.split(" ")[0] || "MMV",
    last_name: user?.user_metadata?.full_name?.split(" ")[1] || "User",
    username: "customer_bot_user",
    language_code: "en",
    allows_write_to_pm: true
  },
  auth_sync: "Automatic validation and linked via Supabase uuid mapping"
}, null, 2)}
              </pre>
            </div>
          </div>
        </div>
      </motion.section>

      {/* Admin God Mode Section */}
      <motion.section initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="mb-6">
        <div className="flex items-center gap-2 mb-3 px-1">
          <ShieldAlert className="w-4 h-4 text-rose-500" />
          <h2 className="text-sm font-semibold text-rose-500">God Mode Administration</h2>
        </div>
        
        <div className="bg-rose-500/5 rounded-3xl p-5 border border-rose-500/20 shadow-sm space-y-4 relative overflow-hidden">
          <div className="absolute top-0 right-0 p-4 opacity-10">
             <ShieldAlert className="w-24 h-24 text-rose-500" />
          </div>
          <div className="relative z-10">
            <h3 className="text-sm font-bold text-rose-500 mb-1">Live Notifications Broadcast</h3>
            <p className="text-xs text-muted-foreground mb-4">Send a direct Telegram message to all registered bot users.</p>
            
            <textarea
              className="w-full h-24 bg-background border border-rose-500/30 rounded-xl p-3 text-sm focus:outline-none focus:ring-1 focus:ring-rose-500/50 resize-none mb-3"
              placeholder="Enter broadcast message here... (Markdown supported)"
              value={adminMessage}
              onChange={(e) => setAdminMessage(e.target.value)}
            />
            
            <Button 
              onClick={handleGodModeBroadcast}
              disabled={isGodModeSending || !adminMessage.trim()}
              className="w-full bg-rose-500 hover:bg-rose-600 text-white font-bold rounded-xl h-12 shadow-lg shadow-rose-500/20"
            >
              {isGodModeSending ? "Broadcasting..." : "Send Global Broadcast"}
            </Button>
          </div>
        </div>
      </motion.section>

      {/* Corporate Info */}
      <div className="text-center pb-8">
        <p className="text-[10px] font-bold text-muted-foreground uppercase">MMV Productivity</p>
        <p className="text-[9px] text-muted-foreground/50 mt-1">Version 12.0 • Build 2026.05</p>
      </div>

      {/* Save Button relocated to bottom of content */}
      <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25 }} className="mb-8">
        <Button 
          onClick={handleSave} 
          disabled={!hasChanges || isSaving}
          className={`w-full h-14 rounded-2xl font-bold shadow-lg transition-all duration-300 ${
            hasChanges ? "opacity-100 scale-100" : "opacity-50 scale-95"
          }`}
        >
          {isSaving ? (
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin" />
              Saving...
            </div>
          ) : (
            <div className="flex items-center justify-center gap-2">
              <Save className="w-5 h-5" />
              Save Settings
            </div>
          )}
        </Button>
      </motion.div>
    </div>
  );
}
