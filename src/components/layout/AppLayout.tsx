import { Outlet, Link, useLocation } from 'react-router-dom';
import { Home, Flame, CheckCircle, Wallet, Target, Settings, ChevronLeft, ChevronRight, Calendar, FileText, Menu, X, Bookmark, Database, Bot, ChevronDown, ChevronUp, Cloud, File, Table, CheckSquare } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNotifications } from '@/lib/useNotifications';
import { useSettings } from '@/lib/useSettings';
import { useState, useEffect } from 'react';
import { DatabaseWakeup } from './DatabaseWakeup';

const NAV_GROUPS = [
  {
    name: 'Dashboard',
    items: [
      { path: '/', label: 'Home', icon: Home },
    ]
  },
  {
    name: 'Productivity',
    items: [
      { path: '/habits', label: 'Habits', icon: Flame },
      { path: '/tasks', label: 'Tasks', icon: CheckCircle },
      { path: '/finance', label: 'Finance', icon: Wallet },
      { path: '/goals', label: 'Goals', icon: Target },
    ]
  },
  {
    name: 'Workspace',
    items: [
      { path: '/calendar', label: 'Calendar', icon: Calendar },
      { path: '/drive', label: 'Drive', icon: Cloud },
      { path: '/docs', label: 'Docs', icon: File },
      { path: '/sheets', label: 'Sheets', icon: Table },
      { path: '/google-tasks', label: 'G-Tasks', icon: CheckSquare },
      { path: '/notes', label: 'Notes', icon: FileText },
      { path: '/bookmarks', label: 'Bookmarks', icon: Bookmark },
    ]
  },
  {
    name: 'System & Settings',
    items: [
      { path: '/data', label: 'Data Hub', icon: Database },
      { path: '/sync', label: 'Google & Bot Sync', icon: Bot },
      { path: '/settings', label: 'Settings', icon: Settings },
    ]
  }
];

export default function AppLayout() {
  const location = useLocation();
  const { settings } = useSettings();
  const [isCollapsed, setIsCollapsed] = useState(window.innerWidth < 1024);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [expandedGroup, setExpandedGroup] = useState<string | null>(null);
  useNotifications();

  const toggleGroup = (groupName: string) => {
    setExpandedGroup(prev => prev === groupName ? null : groupName);
  };

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
        animate={{ width: isCollapsed ? 80 : 260 }}
        transition={{ duration: 0.2 }}
        className="hidden lg:flex flex-col bg-card/95 backdrop-blur-md border-r border-border/70 p-3.5 z-40 relative flex-shrink-0 whitespace-nowrap overflow-hidden shadow-xs"
      >
        {/* Navigation Header with Floating Circular Toggle */}
        <div className={`mb-6 pt-2 pb-3 flex items-center justify-between border-b border-border/50 ${isCollapsed ? 'px-1 flex-col gap-3' : 'px-2'}`}>
          <div className={`${isCollapsed ? 'text-center' : ''} min-w-0 flex items-center gap-2.5`}>
            <div className="w-8 h-8 rounded-xl bg-primary flex items-center justify-center text-primary-foreground font-black text-sm shadow-xs">
              M
            </div>
            {!isCollapsed && (
              <div className="flex flex-col">
                <h1 className="text-sm font-bold tracking-tight text-foreground flex items-center gap-1">
                  <span>MMV XII</span>
                </h1>
                <p className="text-[10px] text-muted-foreground font-medium">Workspace & Finance Suite</p>
              </div>
            )}
          </div>

          {/* Round Floating Action Toggle Button like Reference UI */}
          <button 
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="w-7 h-7 rounded-full bg-primary text-primary-foreground shadow-sm hover:shadow-md hover:scale-105 active:scale-95 transition-all flex items-center justify-center flex-shrink-0"
            title={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
          >
            {isCollapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
          </button>
        </div>

        <nav className="flex-1 overflow-y-auto scrollbar-none pb-4 space-y-4">
          <div className="flex flex-col gap-3">
            {NAV_GROUPS.map((group) => (
              <div key={group.name} className="flex flex-col gap-1">
                {!isCollapsed && group.name !== 'Dashboard' && (
                  <button 
                    onClick={() => toggleGroup(group.name)}
                    className="flex items-center justify-between px-3 py-1.5 text-[11px] font-semibold text-muted-foreground/80 hover:text-foreground transition-colors group rounded-lg hover:bg-muted/40"
                  >
                    <span className="tracking-wide uppercase text-[10px] font-bold">{group.name}</span>
                    {expandedGroup === group.name ? (
                      <ChevronUp className="w-3.5 h-3.5 opacity-60 group-hover:opacity-100 transition-opacity" />
                    ) : (
                      <ChevronDown className="w-3.5 h-3.5 opacity-60 group-hover:opacity-100 transition-opacity" />
                    )}
                  </button>
                )}
                {isCollapsed && group.name !== 'Dashboard' && (
                  <div className="w-full h-px bg-border/60 my-1.5" />
                )}
                
                <AnimatePresence initial={false}>
                  {(!isCollapsed ? expandedGroup === group.name || group.name === 'Dashboard' : true) && (
                    <motion.ul 
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.18 }}
                      className="flex flex-col gap-1 overflow-hidden"
                    >
                      {group.items.map((item) => {
                        const isActive = location.pathname === item.path;
                        const Icon = item.icon;
                        return (
                          <li key={item.path}>
                            <Link 
                              to={item.path} 
                              className={`flex items-center ${isCollapsed ? 'justify-center p-2.5' : 'justify-between px-3 py-2'} rounded-xl transition-all relative ${
                                isActive 
                                  ? 'bg-primary/10 text-primary font-bold shadow-xs' 
                                  : 'text-muted-foreground hover:bg-muted/60 hover:text-foreground font-medium'
                              }`}
                            >
                              <div className="flex items-center gap-3 min-w-0">
                                <div className={`p-1.5 rounded-lg flex items-center justify-center flex-shrink-0 transition-colors ${
                                  isActive ? 'bg-primary/15 text-primary' : 'text-muted-foreground group-hover:text-foreground'
                                }`}>
                                  <Icon className="w-4 h-4" />
                                </div>
                                {!isCollapsed && (
                                  <span className="text-xs truncate tracking-tight">{item.label}</span>
                                )}
                              </div>

                              {!isCollapsed && item.path === '/tasks' && (
                                <span className="text-[10px] font-bold px-1.5 py-0.5 rounded-md bg-primary text-primary-foreground shadow-2xs">
                                  7
                                </span>
                              )}
                            </Link>
                          </li>
                        );
                      })}
                    </motion.ul>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
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
                    <h1 className="text-lg bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/60 flex items-center gap-1.5 font-black">
                      <span>MMV XII</span>
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
                <div className="flex flex-col gap-4">
                  {NAV_GROUPS.map((group) => (
                    <div key={group.name} className="flex flex-col gap-1">
                      {group.name !== 'Dashboard' && (
                        <button 
                          onClick={() => toggleGroup(group.name)}
                          className="flex items-center justify-between px-2 py-1 text-[11px] font-bold text-muted-foreground/70 hover:text-foreground transition-colors group"
                        >
                          <span className="uppercase tracking-wider">{group.name}</span>
                          {expandedGroup === group.name ? <ChevronUp className="w-4 h-4 opacity-50 group-hover:opacity-100" /> : <ChevronDown className="w-4 h-4 opacity-50 group-hover:opacity-100" />}
                        </button>
                      )}
                      
                      <AnimatePresence initial={false}>
                        {(expandedGroup === group.name || group.name === 'Dashboard') && (
                          <motion.ul 
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.2 }}
                            className="flex flex-col gap-1.5 overflow-hidden"
                          >
                            {group.items.map((item) => {
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
                                    onClick={() => setIsMobileMenuOpen(false)}
                                  >
                                    <Icon className={`w-5 h-5 ${isActive ? 'text-primary' : 'text-muted-foreground/70'}`} />
                                    <span className="text-sm">{item.label}</span>
                                  </Link>
                                </li>
                              );
                            })}
                          </motion.ul>
                        )}
                      </AnimatePresence>
                    </div>
                  ))}
                </div>
              </nav>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
