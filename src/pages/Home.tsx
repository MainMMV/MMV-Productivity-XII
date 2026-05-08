import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { base44 } from "@/api/base44Client";
import { format } from "date-fns";
import { motion } from "framer-motion";
import { CheckCircle, Flame, TrendingDown, TrendingUp, Target, Bell, ChevronRight } from "lucide-react";
import { formatCurrency } from "@/lib/utils";
import { useSettings } from "@/lib/useSettings";

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
  const { settings } = useSettings();
  const today = new Date().toISOString().split("T")[0];
  const quote = QUOTES[new Date().getDay() % QUOTES.length];

  useEffect(() => {
    Promise.all([
      base44.entities.Habit.list(),
      base44.entities.Task.filter({ status: "todo" }),
      base44.entities.Expense.list("-date", 50),
      base44.entities.Income.list("-date", 50),
      base44.entities.Goal.filter({ status: "active" }),
    ]).then(([h, t, e, i, g]) => {
      setHabits(h || []);
      setTasks(t || []);
      setExpenses(e || []);
      setIncome(i || []);
      setGoals(g || []);
    });
  }, []);

  const todayHabits = habits.filter(h => h.is_active);
  const completedTodayCount = todayHabits.filter(h => h.completions?.includes(today)).length;
  const habitPct = todayHabits.length > 0 ? Math.round((completedTodayCount / todayHabits.length) * 100) : 0;

  const dueTodayTasks = tasks.filter(t => t.due_date === today);
  const overdueTaskCount = tasks.filter(t => t.due_date && t.due_date < today).length;

  const thisMonthExpenses = expenses
    .filter(e => e.date?.startsWith(today.slice(0, 7)))
    .reduce((sum, e) => sum + (e.amount_usd || e.amount || 0), 0);

  const thisMonthIncome = income
    .filter(i => i.date?.startsWith(today.slice(0, 7)))
    .reduce((sum, i) => sum + (i.amount_usd || i.amount || 0), 0);

  const greeting = () => {
    const h = new Date().getHours();
    if (h < 12) return "Good morning";
    if (h < 17) return "Good afternoon";
    return "Good evening";
  };

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
      title: "Income",
      value: formatCurrency(thisMonthIncome, settings.currency_primary, settings.uzs_rate),
      sub: "This month",
      icon: TrendingUp,
      color: "from-emerald-400 to-teal-600",
      path: "/finance",
    },
  ];

  const containerAnim = { hidden: {}, show: { transition: { staggerChildren: 0.08 } } };
  const itemAnim = { hidden: { opacity: 0, y: 18 }, show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 280, damping: 22 } } };

  return (
    <div className="px-4 pt-4 pb-0">
      {/* Header with Logo */}
      <motion.div initial={{ opacity: 0, y: -16 }} animate={{ opacity: 1, y: 0 }} transition={{ type: "spring", stiffness: 260, damping: 20 }} className="mb-4 flex items-center justify-between">
        <div>
          <p className="text-[10px] text-muted-foreground font-bold uppercase ">{format(new Date(), "EEEE, MMMM d")}</p>
          <h1 className="text-2xl font-bold text-foreground mt-0.5">{greeting()} 👋</h1>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 bg-primary flex items-center justify-center rounded-2xl shadow-sm">
            <span className="text-white font-poppins font-medium text-xl">M</span>
          </div>
          <span className="font-poppins font-medium text-xs hidden sm:block">MMV Productivity</span>
        </div>
      </motion.div>

      {/* Habit Score Card */}
      <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.1 }}
        className="bg-card rounded-3xl p-5 mb-4 border border-border transition-all active:scale-[0.99]">
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
            <div className="absolute inset-0 flex items-center justify-center">
              <Flame className="w-6 h-6 text-primary" />
            </div>
          </div>
        </div>
        <Link to="/habits" className="mt-4 flex items-center text-xs font-bold text-primary gap-1">
          View All Habits <ChevronRight className="w-3 h-3" />
        </Link>
      </motion.div>

      {/* Widgets Grid */}
      <motion.div variants={containerAnim} initial="hidden" animate="show" className="grid grid-cols-2 gap-3 mb-6">
        {widgets.map((w) => (
          <motion.div key={w.title} variants={itemAnim}>
            <Link to={w.path}>
              <div className="bg-card rounded-2xl p-4 border border-border active:scale-95 transition-transform h-full">
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center mb-3 fill-white ${w.title.includes('Expense') || w.title.includes('Spending') ? 'bg-rose-500' : w.title.includes('Income') ? 'bg-emerald-500' : w.title.includes('Habits') ? 'bg-orange-500' : 'bg-primary'}`}>
                  <w.icon className="w-5 h-5 text-white" />
                </div>
                <p className="text-lg font-bold text-foreground leading-tight">{w.value}</p>
                <p className="text-[10px] text-muted-foreground font-bold uppercase mt-1 ">{w.title}</p>
                <p className="text-[10px] text-muted-foreground/70 mt-0.5">{w.sub}</p>
              </div>
            </Link>
          </motion.div>
        ))}
      </motion.div>

      {/* Active Goals Preview */}
      {goals.length > 0 && (
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-sm font-semibold text-foreground">Active Goals</h2>
            <Link to="/goals" className="text-xs text-primary font-medium">See all</Link>
          </div>
          <div className="space-y-2">
            {goals.slice(0, 2).map(goal => {
              const pct = goal.type === "savings" && goal.target_amount > 0
                ? Math.min(100, Math.round(((goal.current_amount || 0) / goal.target_amount) * 100))
                : goal.milestones?.length > 0
                  ? Math.round((goal.milestones.filter((m: any) => m.completed).length / goal.milestones.length) * 100)
                  : 0;
              return (
                <div key={goal.id} className="bg-card rounded-2xl p-4 border border-border">
                  <div className="flex items-center justify-between mb-2">
                    <p className="text-sm font-semibold truncate">{goal.title}</p>
                    <span className="text-xs text-primary font-semibold">{pct}%</span>
                  </div>
                  <div className="h-1.5 bg-muted rounded-full overflow-hidden">
                    <div className="h-full bg-primary rounded-full transition-all duration-500" style={{ width: `${pct}%` }} />
                  </div>
                </div>
              );
            })}
          </div>
        </motion.div>
      )}

      {/* Upcoming Today Tasks */}
      {dueTodayTasks.length > 0 && (
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }} className="mt-6">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-sm font-semibold text-foreground">Due Today</h2>
            <Link to="/tasks" className="text-xs text-primary font-medium">See all</Link>
          </div>
          <div className="space-y-2">
            {dueTodayTasks.slice(0, 3).map(task => (
              <div key={task.id} className="bg-card rounded-2xl px-4 py-3 border border-border flex items-center gap-3">
                <div className={`w-2 h-2 rounded-full flex-shrink-0 ${task.priority === "high" ? "bg-red-500" : task.priority === "medium" ? "bg-yellow-500" : "bg-green-500"}`} />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium truncate">{task.title}</p>
                  {task.due_time && <p className="text-xs text-muted-foreground">{task.due_time}</p>}
                </div>
                {task.notification_enabled && <Bell className="w-3 h-3 text-primary flex-shrink-0" />}
              </div>
            ))}
          </div>
        </motion.div>
      )}
    </div>
  );
}
