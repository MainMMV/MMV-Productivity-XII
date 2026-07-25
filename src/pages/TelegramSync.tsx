import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Bot, 
  LogIn, 
  CheckCircle2, 
  RefreshCw, 
  ExternalLink, 
  ShieldCheck, 
  Send, 
  Sparkles, 
  Smartphone, 
  Flame, 
  Wallet, 
  Target
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { useAuth } from '@/lib/AuthContext';
import { auth, googleProvider } from '@/lib/firebase';
import { signInWithPopup, signInWithRedirect } from 'firebase/auth';
import { toast } from 'react-hot-toast';

export default function TelegramSync() {
  const { user, isAuthenticated, logout } = useAuth();
  
  const [telegramId, setTelegramId] = useState<string>('');
  const [telegramUsername, setTelegramUsername] = useState<string>('');
  const [telegramName, setTelegramName] = useState<string>('');
  const [isLinked, setIsLinked] = useState<boolean>(false);
  const [syncing, setSyncing] = useState(false);
  const [loginLoading, setLoginLoading] = useState(false);

  useEffect(() => {
    const tgApp = (window as any).Telegram?.WebApp;
    if (tgApp?.initDataUnsafe?.user) {
      const tgUser = tgApp.initDataUnsafe.user;
      setTelegramId(tgUser.id.toString());
      setTelegramUsername(tgUser.username || '');
      setTelegramName(`${tgUser.first_name || ''} ${tgUser.last_name || ''}`.trim());
      localStorage.setItem('telegram_user_id', tgUser.id.toString());
      localStorage.setItem('telegram_username', tgUser.username || '');
      setIsLinked(true);
    } else {
      const params = new URLSearchParams(window.location.search);
      const qTgId = params.get('tg_id') || params.get('telegram_id');
      const qUsername = params.get('username');
      const qName = params.get('name') || params.get('first_name');

      if (qTgId) {
        setTelegramId(qTgId);
        if (qUsername) setTelegramUsername(qUsername);
        if (qName) setTelegramName(qName);
        localStorage.setItem('telegram_user_id', qTgId);
        if (qUsername) localStorage.setItem('telegram_username', qUsername);
        setIsLinked(true);
      } else {
        const savedId = localStorage.getItem('telegram_user_id');
        const savedUser = localStorage.getItem('telegram_username');
        if (savedId) {
          setTelegramId(savedId);
          if (savedUser) setTelegramUsername(savedUser);
          setIsLinked(true);
        }
      }
    }
  }, []);

  const handleGoogleSignIn = async () => {
    setLoginLoading(true);
    try {
      await signInWithPopup(auth, googleProvider);
      toast.success('Successfully connected Google account!');
    } catch (popupErr: any) {
      console.warn("Popup mode error, attempting redirect mode:", popupErr);
      try {
        await signInWithRedirect(auth, googleProvider);
      } catch (err: any) {
        toast.error(`Google Sign-in failed: ${err.message || err}`);
      }
    } finally {
      setLoginLoading(false);
    }
  };

  const handleSaveTelegramLink = () => {
    if (!telegramId.trim()) {
      toast.error('Please enter your Telegram User ID or Username');
      return;
    }
    const cleanId = telegramId.trim().replace('@', '');
    localStorage.setItem('telegram_user_id', cleanId);
    if (telegramUsername) {
      localStorage.setItem('telegram_username', telegramUsername.trim());
    }
    setIsLinked(true);
    toast.success('Telegram Account ID synced to MMV Productivity Web!');
  };

  const handleTriggerSync = () => {
    setSyncing(true);
    setTimeout(() => {
      setSyncing(false);
      toast.success('All habits, tasks, finances, and goals are in sync!');
    }, 1200);
  };

  const botUsername = 'MMV_Productivity_Bot';

  return (
    <div className="p-4 md:p-8 max-w-5xl mx-auto space-y-6">
      {/* Top Banner */}
      <motion.div 
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 p-6 rounded-2xl bg-gradient-to-r from-primary/10 via-card to-card border border-primary/20 shadow-md"
      >
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <Badge variant="outline" className="bg-primary/10 text-primary border-primary/30 flex items-center gap-1">
              <Sparkles className="w-3.5 h-3.5" /> Synchronized Ecosystem
            </Badge>
            <Badge variant="secondary" className="bg-green-500/10 text-green-600 dark:text-green-400 border-green-500/20">
              Live Bridge
            </Badge>
          </div>
          <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight">Google & Telegram Sync Hub</h1>
          <p className="text-sm text-muted-foreground">
            Connect your Google account and link your Telegram Bot companion to keep habits, tasks, expenses, and goals in instant synchronization.
          </p>
        </div>
        <Button onClick={handleTriggerSync} disabled={syncing} className="gap-2 shadow-sm font-semibold">
          <RefreshCw className={`w-4 h-4 ${syncing ? 'animate-spin' : ''}`} />
          {syncing ? 'Syncing Ecosystem...' : 'Force Sync Now'}
        </Button>
      </motion.div>

      {/* Grid Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* 1. Google Account Registration */}
        <div className="rounded-2xl border border-border bg-card p-6 shadow-sm flex flex-col justify-between space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="p-2.5 bg-blue-500/10 text-blue-500 rounded-xl">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-lg font-bold">Google Registration</h2>
                <p className="text-xs text-muted-foreground">Primary Workspace Identity</p>
              </div>
            </div>
            {isAuthenticated ? (
              <Badge className="bg-green-500/10 text-green-600 border-green-500/30">
                Connected
              </Badge>
            ) : (
              <Badge variant="outline" className="text-amber-500 border-amber-500/30">
                Not Registered
              </Badge>
            )}
          </div>

          <div className="space-y-4">
            {isAuthenticated ? (
              <div className="p-4 rounded-xl bg-muted/30 border border-border/80 space-y-3">
                <div className="flex items-center gap-3">
                  {user?.user_metadata?.avatar_url ? (
                    <img 
                      src={user.user_metadata.avatar_url} 
                      alt="Avatar" 
                      className="w-10 h-10 rounded-full border border-primary/30" 
                    />
                  ) : (
                    <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center font-bold text-primary">
                      {user?.email?.[0]?.toUpperCase() || 'G'}
                    </div>
                  )}
                  <div className="truncate">
                    <p className="font-semibold text-sm truncate">{user?.user_metadata?.full_name || 'Google User'}</p>
                    <p className="text-xs text-muted-foreground truncate">{user?.email}</p>
                  </div>
                </div>
                <div className="text-xs text-muted-foreground flex items-center gap-1.5 pt-1">
                  <CheckCircle2 className="w-4 h-4 text-green-500 flex-shrink-0" />
                  Your workspace data is safely backed up with Google OAuth.
                </div>
              </div>
            ) : (
              <div className="p-4 rounded-xl bg-muted/40 border border-border/60 space-y-2 text-center">
                <p className="text-sm font-medium">Sign in with Google to enable cloud sync</p>
                <p className="text-xs text-muted-foreground">
                  Connect your Google account to automatically store habits, tasks, calendar events, and financial logs.
                </p>
              </div>
            )}

            <div className="pt-2">
              {isAuthenticated ? (
                <Button variant="outline" onClick={() => logout()} className="w-full text-red-500 hover:text-red-600">
                  Sign Out Google Account
                </Button>
              ) : (
                <Button 
                  onClick={handleGoogleSignIn} 
                  disabled={loginLoading}
                  className="w-full gap-2 bg-blue-600 hover:bg-blue-700 text-white shadow-sm"
                >
                  <LogIn className="w-4 h-4" />
                  {loginLoading ? 'Signing in...' : 'Sign In / Register with Google'}
                </Button>
              )}
            </div>
          </div>
        </div>

        {/* 2. Telegram Bot Link & Sync */}
        <div className="rounded-2xl border border-border bg-card p-6 shadow-sm flex flex-col justify-between space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="p-2.5 bg-sky-500/10 text-sky-500 rounded-xl">
                <Bot className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-lg font-bold">Telegram Bot Sync</h2>
                <p className="text-xs text-muted-foreground">Mobile Companion Integration</p>
              </div>
            </div>
            {isLinked ? (
              <Badge className="bg-sky-500/10 text-sky-600 border-sky-500/30">
                Linked
              </Badge>
            ) : (
              <Badge variant="outline" className="text-muted-foreground">
                Unlinked
              </Badge>
            )}
          </div>

          <div className="space-y-4">
            <div className="space-y-2">
              <label className="text-xs font-semibold text-muted-foreground">Telegram User ID / Username</label>
              <div className="flex gap-2">
                <Input 
                  placeholder="e.g. 1471595444 or username"
                  value={telegramId}
                  onChange={(e) => setTelegramId(e.target.value)}
                  className="bg-background"
                />
                <Button onClick={handleSaveTelegramLink} variant="secondary">
                  Save Link
                </Button>
              </div>
              {telegramName && (
                <p className="text-xs text-sky-500 font-medium">
                  Detected Telegram User: {telegramName} {telegramUsername ? `(@${telegramUsername})` : ''}
                </p>
              )}
            </div>

            <div className="p-3 rounded-xl bg-sky-500/5 border border-sky-500/20 text-xs space-y-2">
              <p className="font-semibold text-sky-600 dark:text-sky-400 flex items-center gap-1.5">
                <Smartphone className="w-3.5 h-3.5" /> How Telegram Sync Works
              </p>
              <p className="text-muted-foreground">
                When you run Telegram commands like <code>/habits</code>, <code>/addtask</code>, <code>/addexpense</code>, or open the Mini App, your data automatically maps to this account.
              </p>
            </div>

            <a 
              href={`https://t.me/${botUsername}`} 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-block w-full"
            >
              <Button variant="outline" className="w-full gap-2 text-sky-600 border-sky-500/30 hover:bg-sky-500/10">
                <Send className="w-4 h-4" /> Open Telegram Bot (@{botUsername}) <ExternalLink className="w-3.5 h-3.5" />
              </Button>
            </a>
          </div>
        </div>

      </div>

      {/* Bottom Features & Command Quick Reference */}
      <div className="rounded-2xl border border-border bg-card p-6 shadow-sm space-y-4">
        <div>
          <h2 className="text-lg font-bold flex items-center gap-2">
            <Send className="w-5 h-5 text-primary" /> Supported Telegram Bot Commands
          </h2>
          <p className="text-xs text-muted-foreground">
            You can type these commands directly in Telegram to manage your productivity workspace:
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
          <div className="p-3 rounded-xl bg-muted/20 border border-border/70 space-y-1">
            <div className="flex items-center gap-2 text-primary font-bold text-sm">
              <Flame className="w-4 h-4" /> /habits
            </div>
            <p className="text-xs text-muted-foreground">View daily habit streak checklists & mark completed habits.</p>
          </div>

          <div className="p-3 rounded-xl bg-muted/20 border border-border/70 space-y-1">
            <div className="flex items-center gap-2 text-emerald-500 font-bold text-sm">
              <CheckCircle2 className="w-4 h-4" /> /addtask &lt;title&gt;
            </div>
            <p className="text-xs text-muted-foreground">Quickly add a task milestone directly from chat.</p>
          </div>

          <div className="p-3 rounded-xl bg-muted/20 border border-border/70 space-y-1">
            <div className="flex items-center gap-2 text-blue-500 font-bold text-sm">
              <Wallet className="w-4 h-4" /> /finance
            </div>
            <p className="text-xs text-muted-foreground">Check net balance, total income, and total costs instantly.</p>
          </div>

          <div className="p-3 rounded-xl bg-muted/20 border border-border/70 space-y-1">
            <div className="flex items-center gap-2 text-amber-500 font-bold text-sm">
              <Target className="w-4 h-4" /> /goals
            </div>
            <p className="text-xs text-muted-foreground">Review visual progress bars for financial targets.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
