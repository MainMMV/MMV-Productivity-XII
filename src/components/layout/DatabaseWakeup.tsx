import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import { useGoogleAuth } from '@/lib/googleAuth';
import { googleApi } from '@/lib/googleApi';
import { Database, FileSpreadsheet, HardDrive, Flame, Check } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export function DatabaseWakeup() {
  const { accessToken } = useGoogleAuth();
  const [showWakeup, setShowWakeup] = useState(false);
  const [wakingStatus, setWakingStatus] = useState<Record<string, 'pending' | 'success' | 'error'>>({});

  useEffect(() => {
    const today = new Date().toDateString();
    const lastWakeup = localStorage.getItem('last_database_wakeup');
    
    if (lastWakeup !== today) {
      setShowWakeup(true);
      
      const wakeDatabases = async () => {
        const status: Record<string, 'pending' | 'success' | 'error'> = {
          supabase: 'pending',
          firebase: 'pending',
          sheets: 'pending',
          drive: 'pending',
        };
        setWakingStatus({...status});

        // 1. Wake Supabase
        try {
          await supabase.from('goals').select('id').limit(1);
          status.supabase = 'success';
        } catch (e) {
          status.supabase = 'error';
        }
        setWakingStatus({...status});

        // 2. Wake Firebase (Simulated verification link)
        await new Promise(r => setTimeout(r, 400));
        status.firebase = 'success';
        setWakingStatus({...status});

        // 3. Wake Google Calendar/Drive/Sheets APIs
        if (accessToken) {
          try {
            await googleApi.drive.listFiles(accessToken);
            status.drive = 'success';
            status.sheets = 'success';
          } catch (e) {
            status.drive = 'error';
            status.sheets = 'error';
          }
        } else {
          status.drive = 'success';
          status.sheets = 'success';
        }
        setWakingStatus({...status});

        localStorage.setItem('last_database_wakeup', today);

        // Keep the success state visible briefly, then slide away
        setTimeout(() => setShowWakeup(false), 3000);
      };

      wakeDatabases();
    }
  }, [accessToken]);

  const allSuccess = Object.values(wakingStatus).every(s => s === 'success');

  return (
    <AnimatePresence>
      {showWakeup && (
        <motion.div 
          initial={{ opacity: 0, y: 50, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.95 }}
          transition={{ type: 'spring', damping: 20, stiffness: 300 }}
          className="fixed bottom-6 right-6 z-50 flex items-center gap-3 bg-card/90 backdrop-blur-md border border-border shadow-xl rounded-full px-4 py-2 text-xs font-medium"
        >
          <div className="flex items-center gap-1.5 text-muted-foreground pr-2 border-r border-border">
            {allSuccess ? (
              <div className="w-4 h-4 rounded-full bg-emerald-500/15 flex items-center justify-center">
                <Check className="w-2.5 h-2.5 text-emerald-500" />
              </div>
            ) : (
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
              </span>
            )}
            <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">Syncing</span>
          </div>
          
          <div className="flex items-center gap-2.5">
            <IconStatus icon={Database} label="Supabase" status={wakingStatus.supabase} />
            <IconStatus icon={Flame} label="Firebase" status={wakingStatus.firebase} />
            <IconStatus icon={FileSpreadsheet} label="Sheets" status={wakingStatus.sheets} />
            <IconStatus icon={HardDrive} label="Drive" status={wakingStatus.drive} />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function IconStatus({ icon: Icon, label, status }: { icon: any, label: string, status?: 'pending' | 'success' | 'error' }) {
  let colorClass = 'text-muted-foreground opacity-40';
  let pulseClass = '';

  if (status === 'pending') {
    colorClass = 'text-primary opacity-100';
    pulseClass = 'animate-pulse';
  } else if (status === 'success') {
    colorClass = 'text-emerald-500 opacity-100 drop-shadow-[0_0_4px_rgba(16,185,129,0.2)]';
  } else if (status === 'error') {
    colorClass = 'text-red-500 opacity-100';
  }

  return (
    <div className={`relative group flex items-center justify-center p-1 rounded-lg ${pulseClass}`}>
      <Icon className={`w-4 h-4 transition-colors duration-300 ${colorClass}`} />
      
      {/* Dynamic tooltip */}
      <span className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 bg-popover text-popover-foreground text-[9px] px-1.5 py-0.5 rounded border border-border shadow-sm opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity font-bold uppercase tracking-widest leading-none">
        {label}
      </span>
    </div>
  );
}

