import { Outlet, Link, useLocation } from 'react-router-dom';
import { Home, Flame, CheckCircle, Wallet, Target, Settings, ChevronLeft, ChevronRight, Calendar, FileText, Menu, X, Bookmark, Database, Bot } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNotifications } from '@/lib/useNotifications';
import { useSettings } from '@/lib/useSettings';
import { useState, useEffect } from 'react';
import { DatabaseWakeup } from './DatabaseWakeup';

const NAV_ITEMS = [
  { path: '/', label: 'Home', icon: Home },
  { path: '/habits', label: 'Habits', icon: Flame },
  { path: '/tasks', label: 'Tasks', icon: CheckCircle },
  { path: '/finance', label: 'Finance', icon: Wallet },
  { path: '/goals', label: 'Goals', icon: Target },
  { path: '/calendar', label: 'Calendar', icon: Calendar },
  { path: '/notes', label: 'Notes', icon: FileText },
  { path: '/bookmarks', label: 'Bookmarks', icon: Bookmark },
  { path: '/data', label: 'Data Hub', icon: Database },
  { path: '/sync', label: 'Google & Bot Sync', icon: Bot },
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
      className="flex flex-col md:flex-row h-[100dvh] bg-background mx-auto relative overflow-hidden transition-all duration-300 shadow-xl"
      style={{ 
        width: (settings as any).container_width || '100%', 
        maxWidth: '100%',
      }}
    >
      <DatabaseWakeup />
      {/* Mobile Header Navigation */}
      <div className="lg:hidden flex items-center justify-between p-4 border-b border-border bg-card/80 backdrop-blur-xl z-30 flex-shrink-0">
        <div className="flex items-center gap-2">
          <button 
            onClick={() => setIsMobileMenuOpen(true)}
            className="p-2 -ml-2 text-muted-foreground hover:text-foreground"
          >
            <Menu className="w-6 h-6" />
          </button>
          <h1 className="text-lg bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/60 flex items-center gap-1.5">
            <span className="font-extrabold">MMV</span>
            <span className="font-light text-muted-foreground text-sm">|</span>
            <span className="font-bold text-sm">Productivity Hub</span>
          </h1>
        </div>
      </div>

      {/* Desktop/Tablet Sidebar */}
      <motion.aside 
        initial={false}
        animate={{ width: isCollapsed ? 80 : 256 }}
        transition={{ duration: 0.2 }}
        className="hidden lg:flex flex-col bg-card border-r border-border p-4 z-40 relative flex-shrink-0 whitespace-nowrap overflow-hidden"
      >
        <div className={`mb-8 py-4 flex items-center justify-between ${isCollapsed ? 'px-1 flex-col gap-4' : 'px-2'}`}>
          <div className={`${isCollapsed ? 'text-center' : ''} min-w-0 flex items-center gap-2`}>
            <div>
              <h1 className="text-xl bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/60 truncate flex items-center gap-1.5">
                <span className="font-black">MMV</span>
                {!isCollapsed && (
                  <>
                    <span className="font-light text-muted-foreground">|</span>
                    <span className="font-bold text-sm">Productivity Hub</span>
                  </>
                )}
              </h1>
            </div>
          </div>
          <button 
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="text-primary hover:text-primary-foreground p-1.5 rounded-full border border-border shadow-xs bg-card hover:bg-primary transition-all duration-200 flex-shrink-0 active:scale-95"
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
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.15, ease: "easeOut" }}
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
              className="lg:hidden fixed inset-0 bg-background/80 backdrop-blur-sm z-50"
            />
            <motion.div
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="lg:hidden fixed top-0 left-0 bottom-0 w-3/4 max-w-[300px] border-r border-border bg-card z-50 flex flex-col shadow-2xl"
            >
              <div className="p-4 border-b border-border flex items-center justify-between flex-shrink-0">
                <div className="flex items-center gap-2">
                  <div>
                    <h1 className="text-lg bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/60 flex items-center gap-1.5">
                      <span className="font-black">MMV</span>
                      <span className="font-light text-muted-foreground text-sm">|</span>
                      <span className="font-bold text-sm">Menu</span>
                    </h1>
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
