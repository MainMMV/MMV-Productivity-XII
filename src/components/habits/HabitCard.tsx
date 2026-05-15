import { useState } from "react";
import { Flame, Check, Trash2, Pencil, MoreVertical, BarChart2, Calendar as CalendarIcon, Target, Activity } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger, DropdownMenuSeparator } from "@/components/ui/dropdown-menu";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

interface HabitCardProps {
  habit: any;
  onToggle: (habit: any, date: Date) => void;
  targetDate?: Date;
  onDelete: (id: string) => void;
  onEdit: (habit: any) => void;
}

function calculateBestStreak(completions: string[]) {
  if (!completions || !completions.length) return 0;
  const sorted = [...new Set(completions)].sort().reverse();
  
  let bestStreak = 0;
  let currentStreakInner = 1;
  let prevDate = new Date(sorted[0]);

  for (let i = 1; i < sorted.length; i++) {
    const d = new Date(sorted[i]);
    const diff = (prevDate.getTime() - d.getTime()) / (1000 * 3600 * 24);
    if (diff === 1) {
      currentStreakInner++;
    } else {
      currentStreakInner = 1;
    }
    prevDate = d;
    if (currentStreakInner > bestStreak) {
      bestStreak = currentStreakInner;
    }
  }
  return Math.max(bestStreak, 1);
}

export default function HabitCard({ habit, onToggle, targetDate, onDelete, onEdit }: HabitCardProps) {
  const [showStats, setShowStats] = useState(false);
  
  const target = targetDate || new Date();
  const dateStr = [target.getFullYear(), String(target.getMonth() + 1).padStart(2, '0'), String(target.getDate()).padStart(2, '0')].join('-');
  const isDoneToday = habit.completions?.includes(dateStr);

  const completionsArr = habit.completions || [];
  const totalCompletions = completionsArr.length;
  const startedOn = habit.createdAt ? new Date(habit.createdAt).toLocaleDateString("en-US") : 'Unknown';
  const lastMarked = completionsArr.length > 0 
    ? new Date([...completionsArr].sort().reverse()[0]).toLocaleDateString("en-US") 
    : 'Never';
  
  const bestStreak = calculateBestStreak(completionsArr);
  const currentStreak = habit.streak || 0;
  
  // Calculate completion rate (last 30 days)
  const thirtyDaysAgo = new Date();
  thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
  const last30DaysStr = thirtyDaysAgo.toISOString().split("T")[0];
  const completionsLast30Days = completionsArr.filter((c: string) => c >= last30DaysStr).length;
  const completionRate30d = Math.round((completionsLast30Days / 30) * 100);

  return (
    <>
      <div className="bg-card rounded-2xl p-4 border border-border flex items-center gap-3 relative overflow-hidden group hover:border-primary/20 transition-all">
        {/* Background color chip */}
        <div 
          className="absolute left-0 top-0 bottom-0 w-1 opacity-20" 
          style={{ backgroundColor: habit.color || "hsl(var(--primary))" }} 
        />
        
        <motion.button 
          whileTap={{ scale: 0.9 }}
          onClick={() => onToggle(habit, target)}
          className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-all duration-500 flex-shrink-0 ${
            isDoneToday 
              ? "shadow-lg scale-105" 
              : "bg-muted/50 border border-border hover:bg-primary/10 hover:border-primary/30 active:scale-95"
          }`}
          style={{ 
            backgroundColor: isDoneToday ? habit.color || "hsl(var(--primary))" : undefined,
            color: isDoneToday ? "white" : "hsl(var(--muted-foreground))"
          }}
        >
          {isDoneToday ? <Check className="w-6 h-6 stroke-[3]" /> : <Flame className="w-6 h-6 group-hover:text-primary transition-colors" />}
        </motion.button>
        
        <div className="flex-1 min-w-0 cursor-pointer" onClick={() => onEdit(habit)}>
          <p className={`text-sm font-bold truncate transition-colors ${isDoneToday ? "text-foreground" : "text-muted-foreground group-hover:text-foreground"}`}>
            {habit.title}
          </p>
          <div className="flex items-center gap-2 mt-0.5">
            <div className="flex items-center gap-1 bg-orange-500/10 px-1.5 py-0.5 rounded-full">
              <Flame className="w-3 h-3 text-orange-500 fill-orange-500" />
              <span className="text-[10px] font-bold text-orange-600">{habit.streak || 0}d streak</span>
            </div>
            {habit.frequency && (
              <span className="text-[10px] text-muted-foreground font-medium uppercase">{habit.frequency}</span>
            )}
          </div>
        </div>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="rounded-xl h-8 w-8 hover:bg-primary/10">
              <MoreVertical className="w-4 h-4 text-muted-foreground" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="rounded-2xl">
            <DropdownMenuItem onClick={() => setShowStats(true)} className="gap-2 rounded-xl">
              <BarChart2 className="w-4 h-4" /> Stats
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => onEdit(habit)} className="gap-2 rounded-xl">
              <Pencil className="w-4 h-4" /> Edit
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => onDelete(habit.id)} className="gap-2 text-destructive focus:text-destructive rounded-xl hover:bg-destructive/10">
              <Trash2 className="w-4 h-4" /> Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <Dialog open={showStats} onOpenChange={setShowStats}>
        <DialogContent className="rounded-3xl mx-auto max-w-sm w-[calc(100%-2rem)] max-h-[90vh] overflow-y-auto scrollbar-none">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <BarChart2 className="text-primary w-5 h-5" />
              {habit.title} Stats
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4 pt-2">
            
            <div className="grid grid-cols-2 gap-3">
              <div className="bg-orange-500/10 rounded-2xl p-4 border border-orange-500/20">
                <div className="flex items-center gap-1 text-orange-600 mb-1">
                  <Flame className="w-4 h-4 fill-current" />
                  <span className="text-xs font-bold uppercase">Current</span>
                </div>
                <p className="text-2xl font-bold text-orange-700">{currentStreak}</p>
                <p className="text-[10px] text-orange-600/80 font-medium mt-1">Days in a row</p>
              </div>
              <div className="bg-primary/10 rounded-2xl p-4 border border-primary/20">
                <div className="flex items-center gap-1 text-primary mb-1">
                  <Target className="w-4 h-4" />
                  <span className="text-xs font-bold uppercase">Best</span>
                </div>
                <p className="text-2xl font-bold text-primary">{Math.max(currentStreak, bestStreak)}</p>
                <p className="text-[10px] text-primary/80 font-medium mt-1">Longest streak</p>
              </div>
            </div>

            <div className="bg-card border border-border rounded-2xl p-4 space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Check className="w-4 h-4" />
                  <span className="text-sm font-medium">Total Completions</span>
                </div>
                <span className="text-sm font-bold">{totalCompletions}</span>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Activity className="w-4 h-4" />
                  <span className="text-sm font-medium">30-Day Rate</span>
                </div>
                <span className="text-sm font-bold">{completionRate30d}%</span>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-muted-foreground">
                  <CalendarIcon className="w-4 h-4" />
                  <span className="text-sm font-medium">Started On</span>
                </div>
                <span className="text-xs font-bold">{startedOn}</span>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Check className="w-4 h-4 text-emerald-500" />
                  <span className="text-sm font-medium">Last Marked</span>
                </div>
                <span className="text-xs font-bold">{lastMarked}</span>
              </div>
            </div>

          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
