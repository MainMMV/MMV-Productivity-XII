import { Outlet, Link, useLocation } from 'react-router-dom';
import { Home, Flame, CheckCircle, Wallet, Target, Settings } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNotifications } from '@/lib/useNotifications';

const NAV_ITEMS = [
  { path: '/', label: 'Home', icon: Home },
  { path: '/habits', label: 'Habits', icon: Flame },
  { path: '/tasks', label: 'Tasks', icon: CheckCircle },
  { path: '/finance', label: 'Finance', icon: Wallet },
  { path: '/goals', label: 'Goals', icon: Target },
  { path: '/settings', label: 'Settings', icon: Settings },
];

export default function AppLayout() {
  const location = useLocation();
  useNotifications();

  return (
    <div className="flex flex-col h-[100dvh] bg-background max-w-md mx-auto relative shadow-2xl overflow-hidden">
      {/* Main Content */}
      <main className="flex-1 overflow-y-auto scrollbar-none pb-28 safe-area-inset-top">
        <AnimatePresence mode="wait">
          <motion.div
            key={location.pathname}
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -10 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
          >
            <Outlet />
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Bottom Navigation */}
      <div className="fixed bottom-4 left-0 right-0 max-w-md mx-auto z-50 px-4 safe-area-inset-bottom">
        <nav 
          className="bg-card/80 backdrop-blur-xl border border-border px-4 py-2 shadow-lg"
          style={{ borderRadius: "calc(var(--radius) + 12px)" }}
        >
          <ul className="flex items-center justify-between">
          {NAV_ITEMS.map((item) => {
            const isActive = location.pathname === item.path;
            const Icon = item.icon;
            return (
              <li key={item.path}>
                <Link to={item.path} className="flex flex-col items-center gap-1 p-2 relative group rounded-xl hover:bg-primary/5 transition-all">
                  <motion.div
                    animate={{ 
                      scale: isActive ? 1.1 : 1,
                      color: isActive ? 'hsl(var(--primary))' : 'hsl(var(--muted-foreground))'
                    }}
                    transition={{ type: 'spring', stiffness: 400, damping: 17 }}
                    className="group-hover:text-primary transition-colors"
                  >
                    <Icon className="w-5 h-5" />
                  </motion.div>
                  <span className={`text-[10px] font-medium transition-colors group-hover:text-primary ${isActive ? 'text-primary' : 'text-muted-foreground'}`}>
                    {item.label}
                  </span>
                  {isActive && (
                    <motion.div
                      layoutId="nav-glow"
                      className="absolute -inset-1 bg-primary/10 rounded-xl -z-10 blur-sm"
                      initial={false}
                      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                    />
                  )}
                </Link>
              </li>
            );
          })}
        </ul>
        </nav>
      </div>
    </div>
  );
}
