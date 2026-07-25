import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { base44 } from "@/api/base44Client";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, Bell, Clock, CheckCircle, TrendingDown, Flame, Check, Play } from "lucide-react";
import { formatCurrency, formatDate } from "@/lib/utils";
import { useSettings } from "@/lib/useSettings";
import { Button } from "@/components/ui/button";
import PullToRefresh from "@/components/common/PullToRefresh";
import { toast } from "react-hot-toast";

export default function Notifications() {
  const { settings } = useSettings();
  const [tasks, setTasks] = useState<any[]>([]);
  const [habits, setHabits] = useState<any[]>([]);
  const [subscriptions, setSubscriptions] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [permission, setPermission] = useState<string>("default");
  
  // Track read state via clear time to keep it simple, or dismissed IDs
  const [dismissedIds, setDismissedIds] = useState<string[]>([]);

  useEffect(() => {
    const saved = localStorage.getItem("dismissed_notifications");
    if (saved) setDismissedIds(JSON.parse(saved));
    loadData();

    if (typeof window !== "undefined" && "Notification" in window) {
      setPermission(Notification.permission);
    }
  }, []);

  const triggerChromeNotification = async () => {
    if (typeof window !== "undefined" && "Notification" in window) {
      let currentPerm = Notification.permission;
      if (currentPerm === "default") {
        currentPerm = await Notification.requestPermission();
        setPermission(currentPerm);
      }
      
      if (currentPerm === "granted") {
        // Trigger Chrome Native OS Notification
        new Notification("Subscription Payment Due (Chrome)", {
          body: "Your Spotify Pro subscription ($9.99) payment is due today.",
          tag: "subscription-payment-reminder",
          requireInteraction: true
        });

        // Add corresponding item into the database so it goes to Notification section
        const todayStr = new Date().toISOString().split("T")[0];
        await base44.entities.Subscription.create({
          title: "Spotify Pro (Chrome Auto-Trigger)",
          amount: 9.99,
          currency: "USD",
          billing_cycle: "monthly",
          next_billing: todayStr,
          is_active: true
        });

        toast.success("Pregenerated notification sent & loaded in app!");
        loadData();
      } else {
        toast.error("Enable browser notifications to run the native simulator.");
      }
    } else {
      toast.error("This browser doesn't support system notifications.");
    }
  };

  const loadData = async () => {
    setLoading(true);
    const [t, h, s] = await Promise.all([
      base44.entities.Task.filter({ status: "todo" }),
      base44.entities.Habit.list(),
      base44.entities.Subscription.list(),
    ]);
    if (t) setTasks(t);
    if (h) setHabits(h);
    if (s) setSubscriptions(s);
    setLoading(false);
  };

  const today = new Date().toISOString().split("T")[0];

  const overdueTasks = tasks.filter(t => t.due_date && t.due_date < today && t.status !== 'done');
  
  const isHabitDueOnDate = (habit: any, date: Date) => {
    if (habit.frequency === "daily") return true;
    if (habit.frequency === "custom" && habit.custom_days?.includes(date.getDay())) return true;
    return false;
  };

  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);
  const yesterdayStr = yesterday.toISOString().split("T")[0];
  const missedHabits = habits.filter(h => h.is_active && isHabitDueOnDate(h, yesterday) && !h.completions?.includes(yesterdayStr));

  const upcomingSubs = subscriptions.filter(s => s.is_active && (s.next_billing === today || s.next_billing === new Date(new Date().setDate(new Date().getDate() + 1)).toISOString().split("T")[0]));

  const allNotifications = [
    ...overdueTasks.map(t => ({
      id: `task-${t.id}`,
      type: 'critical',
      title: 'Overdue Task',
      message: `"${t.title}" was due on ${formatDate(t.due_date)}`,
      icon: Clock,
      color: 'text-rose-500',
      bgColor: 'bg-rose-500/10'
    })),
    ...missedHabits.map(h => ({
      id: `habit-${h.id}`,
      type: 'warning',
      title: 'Missed Habit',
      message: `You missed "${h.title}" yesterday. Maintain your streak!`,
      icon: Flame,
      color: 'text-orange-500',
      bgColor: 'bg-orange-500/10'
    })),
    ...upcomingSubs.map(s => ({
      id: `sub-${s.id}`,
      type: 'info',
      title: 'Payment Reminder',
      message: `${s.title} subscription (${formatCurrency(s.amount, settings.currency_primary, settings.uzs_rate)}) is due ${s.next_billing === today ? 'today' : 'tomorrow'}.`,
      icon: TrendingDown,
      color: 'text-blue-500',
      bgColor: 'bg-blue-500/10'
    }))
  ];

  const notifications = allNotifications.filter(n => !dismissedIds.includes(n.id));

  const dismiss = (id: string) => {
    const updated = [...dismissedIds, id];
    setDismissedIds(updated);
    localStorage.setItem("dismissed_notifications", JSON.stringify(updated));
  };

  const markAllRead = () => {
    const updated = [...dismissedIds, ...notifications.map(n => n.id)];
    setDismissedIds(updated);
    localStorage.setItem("dismissed_notifications", JSON.stringify(updated));
  };

  return (
    <PullToRefresh onRefresh={loadData}>
      <div className="px-4 pt-4 pb-0 h-full flex flex-col">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <Link to="/" className="w-10 h-10 bg-card border border-border flex items-center justify-center rounded-2xl shadow-sm hover:bg-primary/10 transition-colors">
              <ArrowLeft className="w-5 h-5 text-muted-foreground" />
            </Link>
            <h1 className="text-2xl font-bold">Notifications</h1>
          </div>
          {notifications.length > 0 && (
            <Button variant="ghost" size="sm" onClick={markAllRead} className="text-xs text-primary">
              <Check className="w-4 h-4 mr-1" /> Mark all read
            </Button>
          )}
        </div>

        {/* Chrome Native Notification Trigger Center */}
        <motion.div 
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6 p-4 rounded-3xl border border-blue-500/10 bg-blue-500/5 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
        >
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-2xl bg-blue-500/10 flex items-center justify-center flex-shrink-0 text-blue-500">
              <Bell className="w-5 h-5 animate-bounce" />
            </div>
            <div>
              <p className="text-sm font-bold text-foreground">Chrome Notification Center Integrator</p>
              <p className="text-xs text-muted-foreground mt-0.5 max-w-[450px]">
                Triggers a native Chrome OS/browser alert for subscription reminders, and auto-records the item directly in your list below!
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2 flex-shrink-0">
            <Button 
              onClick={triggerChromeNotification}
              className="rounded-xl bg-blue-500 hover:bg-blue-600 text-white font-bold text-xs h-10 shadow-md gap-1.5"
            >
              <Play className="w-4 h-4 fill-current" /> Trigger Notification
            </Button>
          </div>
        </motion.div>

        <div className="space-y-3 flex-1 pb-10">
          {loading ? (
             <div className="flex justify-center p-8"><div className="w-6 h-6 border-2 border-primary border-t-transparent rounded-full animate-spin"></div></div>
          ) : notifications.length > 0 ? (
            <AnimatePresence mode="popLayout">
              {notifications.map((notif, idx) => {
                const Icon = notif.icon;
                return (
                  <motion.div
                    key={notif.id}
                    layout
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, x: -50 }}
                    className={`flex items-start gap-4 p-4 rounded-2xl border border-border ${notif.bgColor}`}
                  >
                    <div className="w-10 h-10 rounded-xl bg-white dark:bg-black/20 flex items-center justify-center shadow-sm flex-shrink-0">
                      <Icon className={`w-5 h-5 ${notif.color}`} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className={`text-sm font-bold ${notif.color}`}>{notif.title}</p>
                      <p className="text-xs text-muted-foreground mt-1 font-medium leading-relaxed">{notif.message}</p>
                    </div>
                    <Button variant="ghost" size="icon" onClick={() => dismiss(notif.id)} className="rounded-xl flex-shrink-0 opacity-50 hover:opacity-100">
                      <Check className="w-4 h-4" />
                    </Button>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          ) : (
            <div className="flex flex-col items-center justify-center py-12 text-center h-full">
              <div className="w-20 h-20 bg-muted/20 rounded-full flex items-center justify-center mb-4">
                <CheckCircle className="w-8 h-8 text-muted-foreground/30" />
              </div>
              <h3 className="text-lg font-bold text-foreground">You're All Caught Up</h3>
              <p className="text-xs text-muted-foreground mt-2 max-w-[200px]">No missed items or upcoming reminders at the moment.</p>
            </div>
          )}
        </div>
      </div>
    </PullToRefresh>
  );
}
