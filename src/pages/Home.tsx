import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { base44 } from "@/api/base44Client";
import { format } from "date-fns";
import { motion } from "framer-motion";
import { CheckCircle, Flame, TrendingDown, TrendingUp, Target, Bell, ChevronRight } from "lucide-react";
import { formatCurrency } from "@/lib/utils";
import { useSettings } from "@/lib/useSettings";
import { useAuth } from "@/lib/AuthContext";

const QUOTES = [
  "Small steps every day lead to big results.",
  "Progress over perfection.",
  "Build your best self, one habit at a time.",
  "Today is a new opportunity.",
  "Discipline is the bridge between goals and accomplishment.",
];

export default function Home() {
  const [habits, setHabits] = useState<any[]>([]);
  const [tasks, setTasks] = useState<any[]>([]);
  const [expenses, setExpenses] = useState<any[]>([]);
  const [income, setIncome] = useState<any[]>([]);
  const [goals, setGoals] = useState<any[]>([]);
  const [subscriptions, setSubscriptions] = useState<any[]>([]);
  const { settings } = useSettings();
  const { user } = useAuth();
  const today = new Date().toISOString().split("T")[0];
  const tomorrow = new Date(new Date().setDate(new Date().getDate() + 1)).toISOString().split("T")[0];
  const quote = QUOTES[new Date().getDay() % QUOTES.length];

  const [dismissedNotifIds, setDismissedNotifIds] = useState<string[]>([]);

  useEffect(() => {
    const saved = localStorage.getItem("dismissed_notifications");
    if (saved) setDismissedNotifIds(JSON.parse(saved));

    Promise.all([
      base44.entities.Habit.list(),
      base44.entities.Task.filter({ status: "todo" }),
      base44.entities.Expense.list("-date", 50),
      base44.entities.Income.list("-date", 50),
      base44.entities.Goal.filter({ status: "active" }),
      base44.entities.Subscription.list(),
    ]).then(([h, t, e, i, g, s]) => {
      setHabits(h || []);
      setTasks(t || []);
      setExpenses(e || []);
      setIncome(i || []);
      setGoals(g || []);
      setSubscriptions(s || []);
    });
  }, []);

  const isHabitDueOnDate = (habit: any, date: Date) => {
    if (habit.frequency === "daily") return true;
    if (habit.frequency === "custom" && habit.custom_days?.includes(date.getDay())) return true;
    return false;
  };

  // Notification count logic
  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);
  const yesterdayStr = yesterday.toISOString().split("T")[0];
  const missedHabits = habits.filter(h => h.is_active && isHabitDueOnDate(h, yesterday) && !h.completions?.includes(yesterdayStr));
  const overdueTasks = tasks.filter(t => t.due_date && t.due_date < today && t.status !== 'done');
  const upcomingSubs = subscriptions.filter(s => s.is_active && (s.next_billing === today || s.next_billing === tomorrow));
  
  const allNotifications = [
    ...overdueTasks.map(t => ({ id: `task-${t.id}` })),
    ...missedHabits.map(h => ({ id: `habit-${h.id}` })),
    ...upcomingSubs.map(s => ({ id: `sub-${s.id}` }))
  ];
  const unreadCount = allNotifications.filter(n => !dismissedNotifIds.includes(n.id)).length;

  const todayHabits = habits.filter(h => h.is_active);
  const completedTodayCount = todayHabits.filter(h => h.completions?.includes(today)).length;
  const habitPct = todayHabits.length > 0 ? Math.round((completedTodayCount / todayHabits.length) * 100) : 0;

  const dueTodayTasks = tasks.filter(t => t.due_date === today);
  const overdueTaskCount = tasks.filter(t => t.due_date && t.due_date < today).length;

  const upcomingItems = [
    ...habits.filter(h => h.is_active && !h.completions?.includes(today) && isHabitDueOnDate(h, new Date())).map(h => ({ ...h, type: 'habit', dateLabel: 'Today', path: '/habits', timeLabel: h.notification_time })),
    ...tasks.filter(t => t.due_date === today).map(t => ({ ...t, type: 'task', dateLabel: 'Today', path: '/tasks', timeLabel: t.due_time })),
    ...subscriptions.filter(s => s.is_active && s.next_billing === today).map(s => ({ ...s, type: 'subscription', dateLabel: 'Today', path: '/finance', timeLabel: s.reminder_time })),
    ...habits.filter(h => h.is_active && isHabitDueOnDate(h, new Date(new Date().setDate(new Date().getDate() + 1)))).map(h => ({ ...h, type: 'habit', dateLabel: 'Tomorrow', path: '/habits', timeLabel: h.notification_time })),
    ...tasks.filter(t => t.due_date === tomorrow).map(t => ({ ...t, type: 'task', dateLabel: 'Tomorrow', path: '/tasks', timeLabel: t.due_time })),
    ...subscriptions.filter(s => s.is_active && s.next_billing === tomorrow).map(s => ({ ...s, type: 'subscription', dateLabel: 'Tomorrow', path: '/finance', timeLabel: s.reminder_time })),
  ];

  const getAmountInPrimary = (item: any) => {
    let amt = item.amount || 0;
    if (item.currency === 'USD' && settings.currency_primary === 'UZS') amt *= settings.uzs_rate;
    if (item.currency === 'UZS' && settings.currency_primary === 'USD') amt /= settings.uzs_rate;
    return amt;
  };

  const thisMonthExpenses = expenses
    .filter(e => e.date?.startsWith(today.slice(0, 7)))
    .reduce((sum, e) => sum + getAmountInPrimary(e), 0);

  const thisMonthIncome = income
    .filter(i => i.date?.startsWith(today.slice(0, 7)))
    .reduce((sum, i) => sum + getAmountInPrimary(i), 0);

  const greeting = () => {
    const h = new Date().getHours();
    if (h < 12) return "Good morning";
    if (h < 17) return "Good afternoon";
    return "Good evening";
  };

  const displayName = user?.user_metadata?.full_name || user?.user_metadata?.name || settings.first_name || "MMV";

  const widgets = [
    {
      title: "Habits Today",
      value: `${completedTodayCount}/${todayHabits.length}`,
      sub: `${habitPct}% complete`,
      icon: Flame,
      color: "from-orange-400 to-red-500",
      path: "/habits",
    },
    {
      title: "Tasks Due",
      value: dueTodayTasks.length,
      sub: overdueTaskCount > 0 ? `${overdueTaskCount} overdue` : "All caught up",
      icon: CheckCircle,
      color: "from-violet-500 to-purple-600",
      path: "/tasks",
    },
    {
      title: "Spending",
      value: formatCurrency(thisMonthExpenses, settings.currency_primary, settings.uzs_rate),
      sub: "This month",
      icon: TrendingDown,
      color: "from-rose-400 to-pink-600",
      path: "/finance",
    },
    {
      title: "Goals",
      value: goals.length,
      sub: "Active goals",
      icon: Target,
      color: "from-blue-400 to-indigo-600",
      path: "/goals",
    },
  ];

  const containerAnim = { hidden: {}, show: { transition: { staggerChildren: 0.08 } } };
  const itemAnim = { hidden: { opacity: 0, y: 18 }, show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 280, damping: 22 } } };

  return (
    <div className="px-4 pt-4 pb-0">
      {/* Header with Logo */}
      <motion.div initial={{ opacity: 0, y: -16 }} animate={{ opacity: 1, y: 0 }} transition={{ type: "spring", stiffness: 260, damping: 20 }} className="mb-4 flex items-center justify-between">
        <div>
          <p className="text-[10px] text-muted-foreground font-bold uppercase ">{format(new Date(), "EEEE, d MMMM yyyy")}</p>
          <h1 className="text-2xl font-bold text-foreground mt-0.5">{greeting()}, {displayName} 👋</h1>
        </div>
        <div className="flex items-center gap-2">
          <Link to="/notifications" className="w-10 h-10 bg-card border border-border flex items-center justify-center rounded-2xl shadow-sm hover:bg-primary/10 group transition-colors relative">
            <Bell className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
            {unreadCount > 0 && (
              <span className="absolute top-2.5 right-2.5 w-2.5 h-2.5 bg-rose-500 flex items-center justify-center rounded-full border-2 border-card text-[8px] font-bold text-white">{unreadCount}</span>
            )}
          </Link>
        </div>
      </motion.div>

      {/* Habit Score Card */}
      <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.1 }}
        className="bg-card rounded-3xl p-5 mb-4 border border-border transition-all active:scale-[0.99] hover:bg-primary/5 hover:border-primary/20 group">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs font-bold text-muted-foreground uppercase ">Daily Habit Score</p>
            <p className="text-4xl font-bold text-primary mt-1">{habitPct}%</p>
            <p className="text-xs text-muted-foreground mt-1 font-medium">{completedTodayCount} of {todayHabits.length} habits done</p>
          </div>
          <div className="relative w-20 h-20">
            <svg viewBox="0 0 80 80" className="w-20 h-20 -rotate-90">
              <circle cx="40" cy="40" r="32" fill="none" stroke="hsl(var(--muted))" strokeWidth="8" />
              <circle cx="40" cy="40" r="32" fill="none" stroke="hsl(var(--primary))" strokeWidth="8"
                strokeDasharray={`${2 * Math.PI * 32}`}
                strokeDashoffset={`${2 * Math.PI * 32 * (1 - habitPct / 100)}`}
                strokeLinecap="round" className="transition-all duration-700" />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center group-hover:scale-110 transition-transform">
              <Flame className="w-6 h-6 text-primary" />
            </div>
          </div>
        </div>
        <Link to="/habits" className="mt-4 flex items-center text-xs font-bold text-primary gap-1 group-hover:translate-x-1 transition-transform inline-flex">
          View All Habits <ChevronRight className="w-3 h-3" />
        </Link>
      </motion.div>

      {/* Widgets Grid */}
      <motion.div variants={containerAnim} initial="hidden" animate="show" className="grid grid-cols-2 gap-3 mb-6">
        {widgets.map((w) => (
          <motion.div key={w.title} variants={itemAnim}>
            <Link to={w.path}>
              <div className="bg-card rounded-2xl p-4 border border-border active:scale-95 hover:bg-primary/5 hover:border-primary/20 transition-all h-full group">
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center mb-3 fill-white transition-transform group-hover:scale-110 group-hover:rotate-3 ${w.title.includes('Expense') || w.title.includes('Spending') ? 'bg-rose-500' : w.title.includes('Income') ? 'bg-emerald-500' : w.title.includes('Habits') ? 'bg-orange-500' : 'bg-primary'}`}>
                  <w.icon className="w-5 h-5 text-white" />
                </div>
                <p className="text-lg font-bold text-foreground leading-tight group-hover:text-primary transition-colors">{w.value}</p>
                <p className="text-[10px] text-muted-foreground font-bold uppercase mt-1 ">{w.title}</p>
                <p className="text-[10px] text-muted-foreground/70 mt-0.5">{w.sub}</p>
              </div>
            </Link>
          </motion.div>
        ))}
      </motion.div>

      {/* Upcoming Items List */}
      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }} className="mb-8">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-sm font-semibold text-foreground">Upcoming</h2>
          {upcomingItems.length > 0 && <span className="text-[10px] font-bold text-primary uppercase">{upcomingItems.length} items</span>}
        </div>
        <div className="space-y-2">
          {upcomingItems.length > 0 ? upcomingItems.map((item, idx) => (
            <motion.div key={`${item.type}-${item.id || idx}-${item.dateLabel}`} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.6 + idx * 0.05 }}>
              <Link to={item.path} className="bg-card rounded-2xl p-3 border border-border flex items-center gap-3 hover:bg-primary/5 transition-colors group">
                <div className={`w-8 h-8 rounded-lg flex items-center justify-center fill-white ${
                  item.type === 'habit' ? 'bg-orange-500' : 
                  item.type === 'task' ? 'bg-primary' : 
                  'bg-rose-500'}`}
                >
                  {item.type === 'habit' ? <Flame className="w-4 h-4 text-white" /> : 
                   item.type === 'task' ? <CheckCircle className="w-4 h-4 text-white" /> : 
                   <TrendingDown className="w-4 h-4 text-white" />}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-bold truncate group-hover:text-primary transition-colors">{item.title}</p>
                  <p className="text-[10px] text-muted-foreground uppercase ">{item.dateLabel} • {item.type} {item.timeLabel ? `• ${item.timeLabel}` : ''}</p>
                </div>
                {item.type === 'subscription' && (
                  <p className="text-xs font-bold text-rose-500 min-w-fit pr-1">-{formatCurrency(item.currency !== settings.currency_primary ? (item.currency === 'USD' ? item.amount * settings.uzs_rate : item.amount / settings.uzs_rate) : item.amount, settings.currency_primary)}</p>
                )}
                <ChevronRight className="w-4 h-4 flex-shrink-0 text-muted-foreground/30" />
              </Link>
            </motion.div>
          )) : (
            <div className="bg-card/50 rounded-2xl p-6 border border-dashed border-border flex flex-col items-center justify-center text-center">
              <div className="w-10 h-10 bg-muted/20 rounded-full flex items-center justify-center mb-2">
                <CheckCircle className="w-5 h-5 text-muted-foreground/40" />
              </div>
              <p className="text-xs font-medium text-muted-foreground">All caught up for today & tomorrow</p>
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
}
