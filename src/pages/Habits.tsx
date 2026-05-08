import { useState, useEffect } from "react";
import { base44 } from "@/api/base44Client";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Flame, LayoutGrid, List } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import HabitMatrix from "@/components/habits/HabitMatrix";
import HabitCard from "@/components/habits/HabitCard";
import DateRangePicker from "@/components/ui/DateRangePicker";
import PullToRefresh from "@/components/common/PullToRefresh";

const COLORS = ["#8b5cf6", "#06b6d4", "#10b981", "#f59e0b", "#ef4444", "#ec4899", "#3b82f6"];
const EMPTY_FORM = { title: "", color: "#8b5cf6", frequency: "daily", icon: "Star", description: "" };

const container = { hidden: {}, show: { transition: { staggerChildren: 0.06 } } };
const item = { hidden: { opacity: 0, y: 14 }, show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 300, damping: 24 } } };

export default function Habits() {
  const [habits, setHabits] = useState<any[]>([]);
  const [view, setView] = useState("list");
  const [showForm, setShowForm] = useState(false);
  const [editHabit, setEditHabit] = useState<any>(null);
  const [dateRange, setDateRange] = useState<any>(null);
  const [form, setForm] = useState(EMPTY_FORM);

  useEffect(() => { loadHabits(); }, []);

  async function loadHabits() {
    const data = await base44.entities.Habit.list();
    setHabits(data || []);
  }

  function openCreate() {
    setEditHabit(null);
    setForm(EMPTY_FORM);
    setShowForm(true);
  }

  function openEdit(habit: any) {
    setEditHabit(habit);
    setForm({ title: habit.title, color: habit.color || "#8b5cf6", frequency: habit.frequency || "daily", icon: habit.icon || "Star", description: habit.description || "" });
    setShowForm(true);
  }

  async function saveHabit() {
    if (!form.title.trim()) return;
    if (editHabit) {
      await base44.entities.Habit.update(editHabit.id, form);
    } else {
      await base44.entities.Habit.create({ ...form, completions: [], streak: 0, is_active: true });
    }
    setShowForm(false);
    setEditHabit(null);
    setForm(EMPTY_FORM);
    loadHabits();
  }

  async function toggleToday(habit: any) {
    const today = new Date().toISOString().split("T")[0];
    const completions = habit.completions || [];
    const newCompletions = completions.includes(today)
      ? completions.filter((d: string) => d !== today)
      : [...completions, today];
    const streak = calculateStreak(newCompletions);
    await base44.entities.Habit.update(habit.id, { completions: newCompletions, streak });
    loadHabits();
  }

  function calculateStreak(completions: string[]) {
    if (!completions.length) return 0;
    const sorted = [...completions].sort().reverse();
    let streak = 0;
    const today = new Date();
    for (let i = 0; i < 365; i++) {
      const d = new Date(today);
      d.setDate(d.getDate() - i);
      const dateStr = d.toISOString().split("T")[0];
      if (sorted.includes(dateStr)) streak++;
      else if (i > 0) break;
    }
    return streak;
  }

  async function deleteHabit(id: string) {
    await base44.entities.Habit.delete(id);
    loadHabits();
  }

  const todayStr = new Date().toISOString().split("T")[0];
  const filteredHabits = habits.filter(h => h.is_active);
  const completedToday = filteredHabits.filter(h => h.completions?.includes(todayStr)).length;

  return (
    <PullToRefresh onRefresh={loadHabits}>
    <div className="px-4 pt-6 pb-4">
      {/* Header */}
      <motion.div initial={{ opacity: 0, y: -12 }} animate={{ opacity: 1, y: 0 }} className="flex items-center justify-between mb-4">
        <div>
          <h1 className="text-2xl font-bold">Habits</h1>
          <p className="text-xs text-muted-foreground">{completedToday}/{filteredHabits.length} done today</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" onClick={() => setView(v => v === "matrix" ? "list" : "matrix")} className="rounded-xl">
            {view === "matrix" ? <List className="w-4 h-4" /> : <LayoutGrid className="w-4 h-4" />}
          </Button>
          <Button size="icon" onClick={openCreate} className="rounded-xl">
            <Plus className="w-4 h-4" />
          </Button>
        </div>
      </motion.div>

      {/* Date filter */}
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.08 }} className="mb-4">
        <DateRangePicker value={dateRange} onChange={setDateRange} placeholder="Filter by date range" />
      </motion.div>

      {/* Stats row */}
      <motion.div variants={container} initial="hidden" animate="show" className="flex gap-3 mb-5">
        {[
          { label: "Active", value: filteredHabits.length, color: "text-primary" },
          { label: "Done Today", value: completedToday, color: "text-emerald-500" },
          { label: "Best Streak", value: Math.max(0, ...filteredHabits.map(h => h.streak || 0)), color: "text-orange-500" },
        ].map(s => (
          <motion.div key={s.label} variants={item} className="flex-1 min-w-[80px] bg-card rounded-2xl p-3 border border-border text-center">
            <p className={`text-xl font-bold ${s.color}`}>{s.value}</p>
            <p className="text-[10px] text-muted-foreground">{s.label}</p>
          </motion.div>
        ))}
      </motion.div>

      {/* View Switcher */}
      <AnimatePresence mode="wait">
        {view === "matrix" ? (
          <motion.div key="matrix" initial={{ opacity: 0, scale: 0.97 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }}>
            <HabitMatrix habits={filteredHabits} onToggle={toggleToday} dateRange={dateRange} />
          </motion.div>
        ) : (
          <motion.div key="list" variants={container} initial="hidden" animate="show" className="space-y-3">
            {filteredHabits.map(habit => (
              <motion.div key={habit.id} variants={item}>
                <HabitCard habit={habit} onToggle={toggleToday} onDelete={deleteHabit} onEdit={openEdit} />
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {filteredHabits.length === 0 && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-16">
          <Flame className="w-14 h-14 text-muted-foreground/20 mx-auto mb-3" />
          <p className="text-sm font-semibold text-muted-foreground">No habits yet</p>
          <p className="text-xs text-muted-foreground/70 mt-1">Tap + to build your first habit</p>
          <Button onClick={openCreate} className="mt-4 rounded-xl" size="sm">
            <Plus className="w-4 h-4 mr-1" /> Add Habit
          </Button>
        </motion.div>
      )}

      {/* Create / Edit Dialog */}
      <Dialog open={showForm} onOpenChange={v => { setShowForm(v); if (!v) setEditHabit(null); }}>
        <DialogContent className="rounded-3xl mx-auto max-w-sm w-[calc(100%-2rem)]">
          <DialogHeader>
            <DialogTitle>{editHabit ? "Edit Habit" : "New Habit"}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 pt-2">
            <div>
              <Label>Habit Name *</Label>
              <Input placeholder="e.g. Morning run" value={form.title} onChange={e => setForm(f => ({ ...f, title: e.target.value }))} className="rounded-xl mt-1" />
            </div>
            <div>
              <Label>Description</Label>
              <Input placeholder="Optional description" value={form.description} onChange={e => setForm(f => ({ ...f, description: e.target.value }))} className="rounded-xl mt-1" />
            </div>
            <div>
              <Label>Frequency</Label>
              <Select value={form.frequency} onValueChange={v => setForm(f => ({ ...f, frequency: v }))}>
                <SelectTrigger className="rounded-xl mt-1"><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="daily">Daily</SelectItem>
                  <SelectItem value="weekly">Weekly</SelectItem>
                  <SelectItem value="custom">Custom</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label>Color</Label>
              <div className="flex gap-2 mt-2 flex-wrap">
                {COLORS.map(c => (
                  <button key={c} onClick={() => setForm(f => ({ ...f, color: c }))}
                    className={`w-8 h-8 rounded-full border-2 transition-all active:scale-90 ${form.color === c ? "border-foreground scale-110 shadow-lg" : "border-transparent"}`}
                    style={{ backgroundColor: c }} />
                ))}
              </div>
            </div>
            <Button onClick={saveHabit} className="w-full rounded-xl">
              {editHabit ? "Save Changes" : "Create Habit"}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
    </PullToRefresh>
  );
}
