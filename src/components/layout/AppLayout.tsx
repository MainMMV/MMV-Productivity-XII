import { Outlet, Link, useLocation } from 'react-router-dom';
import { Home, Flame, CheckCircle, Wallet, Target, Settings, ChevronLeft, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNotifications } from '@/lib/useNotifications';
import { useSettings } from '@/lib/useSettings';
import { useState } from 'react';

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
  const { settings } = useSettings();
  const [isCollapsed, setIsCollapsed] = useState(false);
  useNotifications();

  return (
    <div 
      className="flex flex-col md:flex-row h-[100dvh] bg-background mx-auto relative overflow-hidden transition-all duration-500 shadow-2xl"
      style={{ 
        width: (settings as any).container_width || '100%', 
        maxWidth: '100%',
        transitionTimingFunction: (settings as any).animation_timing || 'ease'
      }}
    >
      {/* Desktop/Tablet Sidebar */}
      <motion.aside 
        initial={false}
        animate={{ width: isCollapsed ? 80 : 256 }}
        className="hidden md:flex flex-col bg-card border-r border-border p-4 z-40 relative flex-shrink-0 whitespace-nowrap overflow-hidden"
      >
        <div className={`mb-8 py-4 flex items-center justify-between ${isCollapsed ? 'px-1 flex-col gap-4' : 'px-2'}`}>
          <div className={`${isCollapsed ? 'text-center' : ''} min-w-0`}>
            <h1 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/60 truncate">
              {isCollapsed ? 'MMV' : 'MMV Suite'}
            </h1>
            {!isCollapsed && <p className="text-xs text-muted-foreground font-medium mt-1 truncate">Productivity Hub</p>}
          </div>
          <button 
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="text-muted-foreground hover:text-foreground p-1.5 rounded-lg hover:bg-muted transition-colors flex-shrink-0"
          >
            {isCollapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
          </button>
        </div>
        <nav className="flex-1">
          <ul className="flex flex-col gap-2">
            {NAV_ITEMS.map((item) => {
              const isActive = location.pathname === item.path;
              const Icon = item.icon;
              return (
                <li key={item.path}>
                  <Link 
                    to={item.path} 
                    className={`flex items-center ${isCollapsed ? 'justify-center' : 'gap-3 px-4'} py-3 rounded-xl transition-all relative ${
                      isActive 
                        ? 'bg-primary/10 text-primary font-bold' 
                        : 'text-muted-foreground hover:bg-primary/5 hover:text-primary font-medium'
                    }`}
                  >
                    <Icon className="w-5 h-5 flex-shrink-0" />
                    {!isCollapsed && <span className="text-sm truncate">{item.label}</span>}
                    {isActive && (
                      <motion.div
                        layoutId="sidebar-active"
                        className={`absolute left-0 bg-primary ${isCollapsed ? 'w-1 h-6 rounded-r-full' : 'w-1 h-8 rounded-r-full'}`}
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
      </motion.aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto scrollbar-none pb-28 md:pb-0 safe-area-inset-top relative">
        <AnimatePresence mode="wait">
          <motion.div
            key={location.pathname}
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -10 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="h-full w-full max-w-5xl mx-auto"
          >
            <Outlet />
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Bottom Navigation (Mobile Only) */}
      <div className="md:hidden fixed bottom-4 left-0 right-0 max-w-md mx-auto z-50 px-4 safe-area-inset-bottom">
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
