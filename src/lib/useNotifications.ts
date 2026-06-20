import { useEffect, useRef } from 'react';
import { useSettings } from './useSettings';
import { base44 } from '@/api/base44Client';
import { playSound } from './sounds';

export function useNotifications() {
  const { settings } = useSettings();

  const getStoredAlerts = () => {
    try {
      const stored = localStorage.getItem('checkedAlerts');
      return stored ? new Set<string>(JSON.parse(stored)) : new Set<string>();
    } catch {
      return new Set<string>();
    }
  };

  const checkedAlerts = useRef<Set<string>>(getStoredAlerts());

  const addAlert = (key: string) => {
    checkedAlerts.current.add(key);
    // keep only last 100 to avoid bloat
    const arr = Array.from(checkedAlerts.current).slice(-100);
    localStorage.setItem('checkedAlerts', JSON.stringify(arr));
  };

  useEffect(() => {
    if (!settings.notifications_enabled) return;
    
    // Request permission if not granted
    if ('Notification' in window && Notification.permission === 'default') {
      Notification.requestPermission();
    }

    const checkInterval = setInterval(async () => {
      if ('Notification' in window && Notification.permission !== 'granted') return;
      
      const now = new Date();
      const todayDateString = now.toISOString().split('T')[0];
      const currentTimeString = now.toTimeString().slice(0, 5); // "HH:MM"
      const nowMs = now.getTime();

      // 1. Daily Summary
      if (settings.daily_reminder_time) {
        const [h, m] = settings.daily_reminder_time.split(':').map(Number);
        if (now.getHours() === h && now.getMinutes() === m) {
          const alertKey = `daily_${todayDateString}`;
          if (!checkedAlerts.current.has(alertKey)) {
            sendNotification("Daily Summary", `Time to review your habits and tasks for today!`);
            addAlert(alertKey);
          }
        }
      }

      const advanceMs = (settings.reminder_advance_time || 30) * 60 * 1000;

      // 2. Checking Tasks
      if (settings.tasks_notifications) {
        try {
          const tasks = await base44.entities.Task.list();
          tasks.forEach((task: any) => {
            if (task.status === 'done') return;
            
            if (task.due_date && task.due_time) {
              const dueTimeStr = `${task.due_date}T${task.due_time}`;
              const dueTimeMs = new Date(dueTimeStr).getTime();
              
              if (!isNaN(dueTimeMs)) {
                // Advance notification
                if (dueTimeMs > nowMs && dueTimeMs - nowMs <= advanceMs) {
                  const alertKey = `task_adv_${task.id}_${task.updated_at || task.created_at}`;
                  if (!checkedAlerts.current.has(alertKey)) {
                    sendNotification("Task Upcoming", `Your task "${task.title}" is due soon!`);
                    addAlert(alertKey);
                  }
                }
                
                // Missed notification
                if (settings.notify_missed && dueTimeMs < nowMs && (nowMs - dueTimeMs) < 24 * 60 * 60 * 1000) { // within 24 hours
                  const alertKey = `task_missed_${task.id}_${task.updated_at || task.created_at}`;
                  if (!checkedAlerts.current.has(alertKey)) {
                    sendNotification("Missed Task", `You have missed the task "${task.title}". Try to complete it!`);
                    addAlert(alertKey);
                  }
                }
              }
            } else if (task.due_date && task.due_date < todayDateString && settings.notify_missed) {
              // Only date, no time. If past date, it's missed.
              const alertKey = `task_missed_date_${task.id}_${todayDateString}`;
              if (!checkedAlerts.current.has(alertKey)) {
                sendNotification("Missed Task", `You missed the task "${task.title}" from yesterday!`);
                addAlert(alertKey);
              }
            }
          });
        } catch (e) {
          console.error("Checking tasks failed", e);
        }
      }

      // 3. Checking Habits (Habits don't have strict due times usually, but maybe notification_time)
      if (settings.habits_notifications) {
        try {
          const habits = await base44.entities.Habit.list();
          habits.forEach((habit: any) => {
            if (!habit.is_active) return;
            const completions = habit.completions || [];
            const isCompletedToday = completions.includes(todayDateString);
            
            if (isCompletedToday) return;

            if (habit.notification_time) {
              const [h, m] = habit.notification_time.split(':').map(Number);
              const notifTime = new Date();
              notifTime.setHours(h, m, 0, 0);
              const notifTimeMs = notifTime.getTime();

              if (notifTimeMs > nowMs && notifTimeMs - nowMs <= advanceMs) {
                const alertKey = `habit_adv_${habit.id}_${todayDateString}`;
                if (!checkedAlerts.current.has(alertKey)) {
                  sendNotification("Habit Reminder", `Time to complete your habit "${habit.title}"!`);
                  addAlert(alertKey);
                }
              }

              if (settings.notify_missed && nowMs > notifTimeMs) {
                const alertKey = `habit_missed_${habit.id}_${todayDateString}`;
                if (!checkedAlerts.current.has(alertKey)) {
                  sendNotification("Missed Habit", `You haven't completed your habit "${habit.title}" today!`);
                  addAlert(alertKey);
                }
              }
            }
          });
        } catch(e) {
          console.error("Checking habits failed", e);
        }
      }

      // 4. Checking Subscriptions / Finance
      if (settings.notify_missed) {
        try {
          const subs = await base44.entities.Subscription.list();
          subs.forEach((sub: any) => {
            if (!sub.is_active) return;
            
            if (sub.next_billing && sub.next_billing <= todayDateString) {
              // Usually advance notice is days before, but we check today
              if (sub.reminder_time) {
                 const [h, m] = sub.reminder_time.split(':').map(Number);
                 const notifTime = new Date();
                 notifTime.setHours(h, m, 0, 0);
                 const notifTimeMs = notifTime.getTime();

                 if (notifTimeMs > nowMs && notifTimeMs - nowMs <= advanceMs) {
                   const alertKey = `sub_adv_${sub.id}_${todayDateString}`;
                   if (!checkedAlerts.current.has(alertKey)) {
                     sendNotification("Upcoming Payment", `Payment for "${sub.title}" is due soon!`);
                     addAlert(alertKey);
                   }
                 }

                 if (sub.next_billing < todayDateString || (sub.next_billing === todayDateString && nowMs > notifTimeMs)) {
                    const alertKey = `sub_missed_${sub.id}_${todayDateString}`;
                    if (!checkedAlerts.current.has(alertKey)) {
                      sendNotification("Missed Payment", `Payment for "${sub.title}" might be overdue!`);
                      addAlert(alertKey);
                    }
                 }
              } else if (sub.next_billing < todayDateString) {
                 // missed without time
                 const alertKey = `sub_missed_date_${sub.id}_${todayDateString}`;
                 if (!checkedAlerts.current.has(alertKey)) {
                   sendNotification("Missed Payment", `Payment for "${sub.title}" is overdue!`);
                   addAlert(alertKey);
                 }
              }
            }
          });
        } catch(e) {
          console.error("Checking subs failed", e);
        }
      }

    }, 30000); // Check every 30 seconds

    return () => clearInterval(checkInterval);
  }, [settings]);

  function sendNotification(title: string, body: string) {
    playSound("alarm");
    if ('serviceWorker' in navigator && navigator.serviceWorker.ready) {
      navigator.serviceWorker.ready.then(registration => {
        registration.showNotification(title, {
          body,
          icon: '/favicon.ico',
          vibrate: [200, 100, 200, 100, 200, 100, 200],
        });
      }).catch(e => {
         // fallback
         new Notification(title, { body, icon: '/favicon.ico' });
      });
    } else if ('Notification' in window && Notification.permission === 'granted') {
      new Notification(title, { body, icon: '/favicon.ico' });
    }
  }
}
