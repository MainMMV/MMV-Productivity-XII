import { useState, useEffect } from "react";
import { base44 } from "@/api/base44Client";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Target, Wallet } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import GoalCard from "@/components/goals/GoalCard";
import PullToRefresh from "@/components/common/PullToRefresh";
import { useSettings } from "@/lib/useSettings";
import { playSound } from "@/lib/sounds";
import confetti from "canvas-confetti";

const COLORS = ["#8b5cf6", "#06b6d4", "#10b981", "#f59e0b", "#ef4444", "#ec4899"];
const EMPTY_FORM = { title: "", description: "", type: "personal", target_amount: "", current_amount: 0, currency: "USD", deadline: "", image_url: "", color: "#8b5cf6", milestones: [], status: "active" };

const container = { hidden: {}, show: { transition: { staggerChildren: 0.07 } } };
const itemAnim = { hidden: { opacity: 0, y: 16 }, show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 280, damping: 22 } } };

export default function Goals() {
  const [goals, setGoals] = useState<any[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [editGoal, setEditGoal] = useState<any>(null);
  const [form, setForm] = useState(EMPTY_FORM);
  const [milestoneInput, setMilestoneInput] = useState("");
  const [typeFilter, setTypeFilter] = useState("all");
  const { settings } = useSettings();

  useEffect(() => { loadGoals(); }, []);

  async function loadGoals() {
    const data = await base44.entities.Goal.list("-created_date");
    setGoals(data || []);
  }

  function openCreate() {
    setEditGoal(null);
    setForm(EMPTY_FORM);
    setMilestoneInput("");
    setShowForm(true);
  }

  function openEdit(goal: any) {
    setEditGoal(goal);
    setForm({
      title: goal.title || "",
      description: goal.description || "",
      type: goal.type || "personal",
      target_amount: goal.target_amount || "",
      current_amount: goal.current_amount || 0,
      currency: goal.currency || "USD",
      deadline: goal.deadline || "",
      image_url: goal.image_url || "",
      color: goal.color || "#8b5cf6",
      milestones: goal.milestones || [],
      status: goal.status || "active",
    });
    setMilestoneInput("");
    setShowForm(true);
  }

  function addMilestone() {
    if (!milestoneInput.trim()) return;
    setForm(f => ({ ...f, milestones: [...f.milestones, { title: milestoneInput.trim(), completed: false }] }));
    setMilestoneInput("");
  }

  async function saveGoal() {
    if (!form.title.trim()) return;
    const data = { ...form, target_amount: form.target_amount ? parseFloat(form.target_amount) : undefined };
    if (editGoal) {
      await base44.entities.Goal.update(editGoal.id, data);
    } else {
      await base44.entities.Goal.create(data);
    }
    setShowForm(false);
    setEditGoal(null);
    setForm(EMPTY_FORM);
    loadGoals();
  }

  async function toggleMilestone(goal: any, index: number) {
    const newMilestones = [...(goal.milestones || [])];
    const isCompletedNow = !newMilestones[index].completed;
    newMilestones[index] = { ...newMilestones[index], completed: isCompletedNow };
    
    // Check if ALL milestones are completed now
    const allDone = newMilestones.every((m: any) => m.completed);
    const wasAlreadyDone = (goal.milestones || []).every((m: any) => m.completed);
    
    let updatedStatus = goal.status;
    if (allDone && !wasAlreadyDone) {
      updatedStatus = "completed";
      playSound("celebration");
      confetti({
        particleCount: 150,
        spread: 80,
        origin: { y: 0.6 }
      });
    } else {
      playSound("toggle");
    }

    await base44.entities.Goal.update(goal.id, { 
      milestones: newMilestones,
      status: updatedStatus
    });
    loadGoals();
  }

  async function addSavings(goal: any, amount: number) {
    const newAmount = (goal.current_amount || 0) + amount;
    const isSavingsGoalDone = goal.target_amount > 0 && newAmount >= goal.target_amount;
    const wasAlreadyDone = goal.target_amount > 0 && (goal.current_amount || 0) >= goal.target_amount;

    let updatedStatus = goal.status;
    if (isSavingsGoalDone && !wasAlreadyDone) {
      updatedStatus = "completed";
      playSound("celebration");
      confetti({
        particleCount: 150,
        spread: 80,
        origin: { y: 0.6 }
      });
    } else {
      playSound("toggle");
    }

    await base44.entities.Goal.update(goal.id, { 
      current_amount: newAmount,
      status: updatedStatus
    });
    loadGoals();
  }

  async function markComplete(goal: any) {
    const isNowCompleted = goal.status !== "completed";
    await base44.entities.Goal.update(goal.id, { status: isNowCompleted ? "completed" : "active" });
    if (isNowCompleted) {
      playSound("celebration");
      confetti({
        particleCount: 150,
        spread: 80,
        origin: { y: 0.6 }
      });
    } else {
      playSound("toggle");
    }
    loadGoals();
  }

  async function deleteGoal(id: string) {
    await base44.entities.Goal.delete(id);
    loadGoals();
  }

  const filtered = goals.filter(g => typeFilter === "all" || g.type === typeFilter);

  return (
    <PullToRefresh onRefresh={loadGoals}>
    <div className="px-4 pt-6 pb-4">
      {/* Header */}
      <motion.div initial={{ opacity: 0, y: -12 }} animate={{ opacity: 1, y: 0 }} className="flex items-center justify-between mb-4">
        <div>
          <h1 className="text-2xl font-bold">Goals</h1>
          <p className="text-xs text-muted-foreground">Chase what matters</p>
        </div>
        <Button size="icon" onClick={openCreate} className="rounded-xl">
          <Plus className="w-4 h-4" />
        </Button>
      </motion.div>

      {/* Stats Summary */}
      <motion.div variants={container} initial="hidden" animate="show" className="flex gap-3 mb-5">
        {[
          { label: "Total", value: goals.length, color: "text-primary" },
          { label: "Savings", value: goals.filter(g => g.type === "savings").length, color: "text-emerald-500" },
          { label: "Personal", value: goals.filter(g => g.type === "personal").length, color: "text-violet-500" },
          { label: "Done", value: goals.filter(g => g.status === "completed").length, color: "text-accent" },
        ].map(s => (
          <motion.div key={s.label} variants={itemAnim} className="flex-1 bg-card rounded-2xl p-2.5 border border-border text-center">
            <p className={`text-lg font-bold ${s.color}`}>{s.value}</p>
            <p className="text-[10px] text-muted-foreground font-medium">{s.label}</p>
          </motion.div>
        ))}
      </motion.div>

      {/* Type filter tabs */}
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.1 }} className="flex gap-1 bg-muted/50 p-1 rounded-2xl mb-5">
        {["all", "savings", "personal"].map(t => (
          <button key={t} onClick={() => setTypeFilter(t)}
            className={`flex-1 py-1.5 text-xs font-bold rounded-xl capitalize transition-all ${typeFilter === t ? "bg-card text-foreground shadow-sm" : "text-muted-foreground"}`}>
            {t === "all" ? "All Goals" : t}
          </button>
        ))}
      </motion.div>

      {/* Goals list with grid layout possible, but here using card stack */}
      <motion.div variants={container} initial="hidden" animate="show" className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <AnimatePresence mode="popLayout">
          {filtered.map(goal => (
            <motion.div 
              key={goal.id} 
              variants={itemAnim}
              initial="hidden"
              animate="show"
              exit={{ opacity: 0, scale: 0.9, filter: "blur(4px)" }}
              layout
              transition={{ ease: (settings as any).animation_timing || "easeOut", duration: 0.3 }}
            >
              <GoalCard
                goal={goal}
                onToggleMilestone={toggleMilestone}
                onAddSavings={addSavings}
                onDelete={deleteGoal}
                onEdit={openEdit}
                onMarkComplete={markComplete}
                settings={settings}
              />
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      {filtered.length === 0 && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-16">
          <Target className="w-14 h-14 text-muted-foreground/20 mx-auto mb-3" />
          <p className="text-sm font-semibold text-muted-foreground">No goals yet</p>
          <p className="text-xs text-muted-foreground/70 mt-1">Set your first goal and start tracking</p>
          <Button onClick={openCreate} className="mt-4 rounded-xl" size="sm">
            <Plus className="w-4 h-4 mr-1" /> Add Goal
          </Button>
        </motion.div>
      )}

      {/* Goal Form Dialog */}
      <Dialog open={showForm} onOpenChange={v => { setShowForm(v); if (!v) setEditGoal(null); }}>
        <DialogContent className="rounded-3xl mx-auto max-w-sm w-[calc(100%-2rem)] max-h-[90vh] overflow-y-auto scrollbar-none">
          <DialogHeader>
            <DialogTitle>{editGoal ? "Edit Goal" : "New Goal"}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 pt-2">
            <div>
              <Label>Title *</Label>
              <Input value={form.title} onChange={e => setForm(f => ({ ...f, title: e.target.value }))} placeholder="What's your goal?" className="rounded-xl mt-1" />
            </div>
            <div>
              <Label>Type</Label>
              <div className="flex gap-2 mt-1">
                {["savings", "personal"].map(t => (
                  <button key={t} type="button" onClick={() => setForm(f => ({ ...f, type: t }))}
                    className={`flex-1 py-2.5 rounded-2xl text-sm font-bold capitalize transition-all border-2 flex items-center justify-center gap-1.5 ${form.type === t ? "bg-primary text-primary-foreground border-primary" : "border-border text-muted-foreground"}`}>
                    {t === "savings" ? <Wallet className="w-4 h-4" /> : <Target className="w-4 h-4" />}
                    {t === "savings" ? "Savings" : "Personal"}
                  </button>
                ))}
              </div>
            </div>
            {form.type === "savings" && (
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <Label>Target Amount</Label>
                  <Input type="number" value={form.target_amount} onChange={e => setForm(f => ({ ...f, target_amount: e.target.value }))} placeholder="0.00" className="rounded-xl mt-1" />
                </div>
                <div>
                  <Label>Currency</Label>
                  <Select value={form.currency} onValueChange={v => setForm(f => ({ ...f, currency: v }))}>
                    <SelectTrigger className="rounded-xl mt-1"><SelectValue /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="USD">USD $</SelectItem>
                      <SelectItem value="UZS">UZS сўм</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            )}
            <div>
              <Label>Deadline</Label>
              <Input type="date" value={form.deadline} onChange={e => setForm(f => ({ ...f, deadline: e.target.value }))} className="rounded-xl mt-1" />
            </div>
            <div>
              <Label>Description</Label>
              <Textarea value={form.description} onChange={e => setForm(f => ({ ...f, description: e.target.value }))} className="rounded-xl mt-1 min-h-[60px] text-xs" />
            </div>
            <div>
              <Label>Cover Image URL (optional)</Label>
              <Input value={form.image_url} onChange={e => setForm(f => ({ ...f, image_url: e.target.value }))} placeholder="https://..." className="rounded-xl mt-1" />
            </div>
            {form.type === "personal" && (
              <div>
                <Label>Milestones</Label>
                <div className="flex gap-2 mt-1">
                  <Input value={milestoneInput} onChange={e => setMilestoneInput(e.target.value)} onKeyDown={e => e.key === "Enter" && addMilestone()} placeholder="Add milestone…" className="rounded-xl h-10" />
                  <Button type="button" onClick={addMilestone} variant="outline" className="rounded-xl px-3 h-10">+</Button>
                </div>
                {form.milestones.length > 0 && (
                  <div className="mt-2 space-y-2">
                    {form.milestones.map((m: any, i: number) => (
                      <div key={i} className="flex items-center gap-2 py-2 px-3 bg-muted rounded-2xl border border-border/50">
                        <span className="text-xs font-medium flex-1">{m.title}</span>
                        <button onClick={() => setForm(f => ({ ...f, milestones: f.milestones.filter((_, j) => j !== i) }))} className="text-muted-foreground hover:text-destructive text-lg leading-none">×</button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
            <div>
              <Label>Color Shade</Label>
              <div className="flex gap-2 mt-2">
                {COLORS.map(c => (
                  <button key={c} onClick={() => setForm(f => ({ ...f, color: c }))}
                    className={`w-9 h-9 rounded-2xl border-2 transition-all active:scale-90 ${form.color === c ? "border-foreground scale-110 shadow-lg" : "border-transparent"}`}
                    style={{ backgroundColor: c }} />
                ))}
              </div>
            </div>
            <Button onClick={saveGoal} className="w-full rounded-2xl h-12 text-sm font-bold shadow-lg">
              {editGoal ? "Save Changes" : "Create Goal"}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
    </PullToRefresh>
  );
}
