import { Outlet, Link, useLocation } from 'react-router-dom';
import { Home, Flame, CheckCircle, Wallet, Target, Settings, ChevronLeft, ChevronRight, Calendar, FileText, Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNotifications } from '@/lib/useNotifications';
import { useSettings } from '@/lib/useSettings';
import { useState, useEffect } from 'react';

const NAV_ITEMS = [
  { path: '/', label: 'Home', icon: Home },
  { path: '/habits', label: 'Habits', icon: Flame },
  { path: '/tasks', label: 'Tasks', icon: CheckCircle },
  { path: '/finance', label: 'Finance', icon: Wallet },
  { path: '/goals', label: 'Goals', icon: Target },
  { path: '/calendar', label: 'Calendar', icon: Calendar },
  { path: '/notes', label: 'Notes', icon: FileText },
  { path: '/settings', label: 'Settings', icon: Settings },
];

export default function AppLayout() {
  const location = useLocation();
  const { settings } = useSettings();
  const [isCollapsed, setIsCollapsed] = useState(window.innerWidth < 1024);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  useNotifications();

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 1024) {
        setIsCollapsed(true);
      } else {
        setIsCollapsed(false);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  return (
    <div 
      className="flex flex-col md:flex-row h-[100dvh] bg-background mx-auto relative overflow-hidden transition-all duration-500 shadow-2xl"
      style={{ 
        width: (settings as any).container_width || '100%', 
        maxWidth: '100%',
        transitionTimingFunction: (settings as any).animation_timing || 'ease'
      }}
    >
      {/* Mobile Header Navigation */}
      <div className="md:hidden flex items-center justify-between p-4 border-b border-border bg-card/80 backdrop-blur-xl z-30 flex-shrink-0">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-xl bg-primary/10 flex items-center justify-center">
            <Target className="w-4 h-4 text-primary" />
          </div>
          <h1 className="text-lg font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/60">
            MMV Suite
          </h1>
        </div>
        <button 
          onClick={() => setIsMobileMenuOpen(true)}
          className="p-2 -mr-2 text-muted-foreground hover:text-foreground"
        >
          <Menu className="w-6 h-6" />
        </button>
      </div>

      {/* Desktop/Tablet Sidebar */}
      <motion.aside 
        initial={false}
        animate={{ width: isCollapsed ? 80 : 256 }}
        className="hidden md:flex flex-col bg-card border-r border-border p-4 z-40 relative flex-shrink-0 whitespace-nowrap overflow-hidden"
      >
        <div className={`mb-8 py-4 flex items-center justify-between ${isCollapsed ? 'px-1 flex-col gap-4' : 'px-2'}`}>
          <div className={`${isCollapsed ? 'text-center' : ''} min-w-0 flex items-center gap-2`}>
            {!isCollapsed && (
              <div className="w-8 h-8 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                <Target className="w-4 h-4 text-primary" />
              </div>
            )}
            <div>
              <h1 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/60 truncate">
                {isCollapsed ? 'MMV' : 'MMV Suite'}
              </h1>
              {!isCollapsed && <p className="text-[10px] text-muted-foreground font-medium mt-0.5 truncate uppercase tracking-widest">Productivity Hub</p>}
            </div>
          </div>
          <button 
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="text-primary hover:text-primary-foreground p-1.5 rounded-full border border-border shadow-xs bg-card hover:bg-primary transition-all duration-300 flex-shrink-0 active:scale-95"
          >
            {isCollapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
          </button>
        </div>
        <nav className="flex-1 overflow-y-auto scrollbar-none pb-4">
          <ul className="flex flex-col gap-1.5">
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
      <main className="flex-1 overflow-y-auto scrollbar-none pb-8 md:pb-0 safe-area-inset-top relative">
        <AnimatePresence mode="wait">
          <motion.div
            key={location.pathname}
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -10 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="h-full w-full max-w-5xl mx-auto md:p-4"
          >
            <Outlet />
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Mobile Sub-Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileMenuOpen(false)}
              className="md:hidden fixed inset-0 bg-background/80 backdrop-blur-sm z-50"
            />
            <motion.div
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="md:hidden fixed top-0 left-0 bottom-0 w-3/4 max-w-[300px] border-r border-border bg-card z-50 flex flex-col shadow-2xl"
            >
              <div className="p-4 border-b border-border flex items-center justify-between flex-shrink-0">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-xl bg-primary/10 flex items-center justify-center">
                    <Target className="w-4 h-4 text-primary" />
                  </div>
                  <div>
                    <h2 className="font-bold text-lg leading-none bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/60">MMV Suite</h2>
                    <p className="text-[9px] font-bold uppercase tracking-widest text-muted-foreground mt-1">Menu</p>
                  </div>
                </div>
                <button 
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="p-2 -mr-2 text-muted-foreground hover:text-foreground bg-muted/50 rounded-full"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              <nav className="flex-1 overflow-y-auto p-4 scrollbar-none">
                <ul className="flex flex-col gap-2">
                  {NAV_ITEMS.map((item) => {
                    const isActive = location.pathname === item.path;
                    const Icon = item.icon;
                    return (
                      <li key={item.path}>
                        <Link 
                          to={item.path} 
                          className={`flex items-center gap-4 px-4 py-3.5 rounded-2xl transition-all ${
                            isActive 
                              ? 'bg-primary/10 text-primary font-bold shadow-xs border border-primary/20' 
                              : 'text-muted-foreground hover:bg-primary/5 hover:text-primary font-medium border border-transparent'
                          }`}
                        >
                          <Icon className={`w-5 h-5 ${isActive ? 'text-primary' : 'text-muted-foreground/70'}`} />
                          <span className="text-sm">{item.label}</span>
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </nav>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
