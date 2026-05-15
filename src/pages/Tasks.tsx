import { useState, useEffect } from "react";
import { base44 } from "@/api/base44Client";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Bell, Check, Trash2, RepeatIcon, MoreHorizontal, Edit2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import DateRangePicker from "@/components/ui/DateRangePicker";
import PullToRefresh from "@/components/common/PullToRefresh";
import { scheduleNotification } from "@/lib/utils";
import { format } from "date-fns";

const PRIORITY_COLORS: Record<string, string> = { 
  low: "bg-emerald-100 text-emerald-700", 
  medium: "bg-yellow-100 text-yellow-700", 
  high: "bg-red-100 text-red-700" 
};
const STATUS_TABS = ["todo", "in_progress", "done"];

const EMPTY_FORM = { 
  title: "", 
  description: "", 
  due_date: "", 
  due_time: "", 
  priority: "medium", 
  status: "todo", 
  repeat: "none", 
  repeat_days: [] as number[],
  notification_enabled: false, 
  notes: "" 
};

export default function Tasks() {
  const [tasks, setTasks] = useState<any[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [editTask, setEditTask] = useState<any>(null);
  const [form, setForm] = useState(EMPTY_FORM);
  const [activeTab, setActiveTab] = useState("todo");
  const [dateFilter, setDateFilter] = useState<any>(null);

  useEffect(() => { loadTasks(); }, []);

  async function loadTasks() {
    const data = await base44.entities.Task.list("-created_date", 200);
    setTasks(data || []);
  }

  async function saveTask() {
    if (!form.title.trim()) return;
    if (editTask) {
      await base44.entities.Task.update(editTask.id, form);
    } else {
      await base44.entities.Task.create(form);
    }
    if (form.notification_enabled && form.due_date && form.due_time) {
      const triggerTime = `${form.due_date}T${form.due_time}:00`;
      scheduleNotification(form.title, form.description || "Task reminder", triggerTime);
    }
    setShowForm(false);
    setEditTask(null);
    setForm(EMPTY_FORM);
    loadTasks();
  }

  async function toggleStatus(task: any) {
    const next = task.status === "todo" ? "in_progress" : task.status === "in_progress" ? "done" : "todo";
    await base44.entities.Task.update(task.id, { status: next });
    loadTasks();
  }

  async function deleteTask(id: string) {
    await base44.entities.Task.delete(id);
    loadTasks();
  }

  function openEdit(task: any) {
    setEditTask(task);
    setForm({ ...EMPTY_FORM, ...task });
    setShowForm(true);
  }

  const filtered = tasks.filter(t => {
    if (t.status !== activeTab) return false;
    if (dateFilter?.from) {
      if (!t.due_date) return false;
      const td = new Date(t.due_date);
      if (dateFilter.to) {
        const toD = new Date(dateFilter.to);
        return td >= dateFilter.from && td <= toD;
      }
      return t.due_date === format(dateFilter.from, "yyyy-MM-dd");
    }
    return true;
  });

  return (
    <PullToRefresh onRefresh={loadTasks}>
    <div className="px-4 pt-6 pb-4">
      <motion.div initial={{ opacity: 0, y: -12 }} animate={{ opacity: 1, y: 0 }} transition={{ type: "spring", stiffness: 280 }} className="flex items-center justify-between mb-4">
        <div>
          <h1 className="text-2xl font-bold">Tasks</h1>
          <p className="text-xs text-muted-foreground">{tasks.filter(t => t.status === "todo").length} remaining</p>
        </div>
        <div className="flex items-center gap-2">
          <DateRangePicker variant="icon" value={dateFilter} onChange={setDateFilter} />
          <Button size="icon" onClick={() => { setEditTask(null); setForm(EMPTY_FORM); setShowForm(true); }} className="rounded-xl">
            <Plus className="w-4 h-4" />
          </Button>
        </div>
      </motion.div>

      {/* Status Tabs */}
      <div className="flex gap-1 bg-muted p-1 rounded-2xl mb-4">
        {STATUS_TABS.map(tab => (
          <button key={tab} onClick={() => setActiveTab(tab)}
            className={`flex-1 py-1.5 text-xs font-semibold rounded-xl capitalize transition-all ${activeTab === tab ? "bg-card text-foreground shadow-sm" : "text-muted-foreground"}`}>
            {tab.replace("_", " ")}
          </button>
        ))}
      </div>

      {/* Tasks list */}
      <AnimatePresence>
        <div className="space-y-4">
          {(() => {
            if (dateFilter?.from) {
              const dates = [];
              let curr = new Date(dateFilter.from);
              const end = dateFilter.to ? new Date(dateFilter.to) : new Date(dateFilter.from);
              
              while (curr <= end) {
                dates.push(new Date(curr));
                curr.setDate(curr.getDate() + 1);
              }

              return dates.map(date => {
                const dateStr = format(date, "yyyy-MM-dd");
                const tasksForDate = filtered.filter(t => t.due_date === dateStr);
                
                // For aesthetics, if we want to show days without tasks, we can either
                // skip them or render them with an empty message.
                // The prompt seemed to want blocks for each day.
                
                return (
                  <div key={date.toISOString()} className="space-y-2">
                    <div className="flex items-center gap-4 py-2">
                      <div className="h-px bg-border flex-1" />
                      <p className="text-xs font-bold text-muted-foreground uppercase">{date.toLocaleDateString("en-US", { weekday: 'short', month: 'short', day: 'numeric' })}</p>
                      <div className="h-px bg-border flex-1" />
                    </div>
                    {tasksForDate.length > 0 ? tasksForDate.map((task, i) => (
                      <motion.div key={task.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ delay: i * 0.04 }}>
                        <div className="bg-card rounded-2xl p-4 border border-border transition-all hover:bg-primary/5 hover:border-primary/20 group cursor-pointer">
                          <div className="flex items-start gap-3">
                            <button onClick={(e) => { e.stopPropagation(); toggleStatus(task); }}
                              className={`w-6 h-6 rounded-full border-2 flex items-center justify-center flex-shrink-0 mt-0.5 transition-all group-hover:border-primary/50 ${task.status === "done" ? "bg-primary border-primary group-hover:border-primary" : "border-border"}`}>
                              {task.status === "done" && <Check className="w-3 h-3 text-white" />}
                            </button>
                            <div className="flex-1 min-w-0" onClick={() => openEdit(task)}>
                              <p className={`text-sm font-semibold transition-colors group-hover:text-primary ${task.status === "done" ? "line-through text-muted-foreground group-hover:text-primary/70" : ""}`}>{task.title}</p>
                              {task.description && <p className="text-xs text-muted-foreground mt-0.5 truncate">{task.description}</p>}
                              <div className="flex items-center gap-2 mt-1.5 flex-wrap">
                                <Badge className={`text-[10px] ${PRIORITY_COLORS[task.priority]}`}>{task.priority}</Badge>
                                {task.due_date && <span className="text-[10px] text-muted-foreground">{task.due_date}{task.due_time ? ` at ${task.due_time}` : ""}</span>}
                                {task.repeat !== "none" && (
                                  <div className="flex items-center gap-1 text-[10px] text-primary bg-primary/5 px-1 rounded">
                                    <RepeatIcon className="w-2.5 h-2.5" />
                                    {task.repeat === "custom" ? task.repeat_days?.map((d: number) => ["S", "M", "T", "W", "T", "F", "S"][d]).join("") : task.repeat}
                                  </div>
                                )}
                                {task.notification_enabled && <Bell className="w-3 h-3 text-primary" />}
                              </div>
                            </div>
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <button onClick={e => e.stopPropagation()} className="p-1.5 rounded-xl hover:bg-primary/10 text-muted-foreground transition-all">
                                  <MoreHorizontal className="w-4 h-4" />
                                </button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end" className="rounded-2xl">
                                <DropdownMenuItem onClick={() => openEdit(task)} className="gap-2 rounded-xl">
                                  <Edit2 className="w-3.5 h-3.5" /> Edit
                                </DropdownMenuItem>
                                <DropdownMenuItem onClick={() => deleteTask(task.id)} className="gap-2 text-destructive focus:text-destructive rounded-xl">
                                  <Trash2 className="w-3.5 h-3.5" /> Delete
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </div>
                        </div>
                      </motion.div>
                    )) : (
                      <p className="text-xs text-center text-muted-foreground/60 py-2">No tasks</p>
                    )}
                  </div>
                );
              });
            }

            return filtered.map((task, i) => (
              <motion.div key={task.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ delay: i * 0.04 }}>
                <div className="bg-card rounded-2xl p-4 border border-border transition-all hover:bg-primary/5 hover:border-primary/20 group cursor-pointer">
                  <div className="flex items-start gap-3">
                    <button onClick={(e) => { e.stopPropagation(); toggleStatus(task); }}
                      className={`w-6 h-6 rounded-full border-2 flex items-center justify-center flex-shrink-0 mt-0.5 transition-all group-hover:border-primary/50 ${task.status === "done" ? "bg-primary border-primary group-hover:border-primary" : "border-border"}`}>
                      {task.status === "done" && <Check className="w-3 h-3 text-white" />}
                    </button>
                    <div className="flex-1 min-w-0" onClick={() => openEdit(task)}>
                      <p className={`text-sm font-semibold transition-colors group-hover:text-primary ${task.status === "done" ? "line-through text-muted-foreground group-hover:text-primary/70" : ""}`}>{task.title}</p>
                      {task.description && <p className="text-xs text-muted-foreground mt-0.5 truncate">{task.description}</p>}
                      <div className="flex items-center gap-2 mt-1.5 flex-wrap">
                        <Badge className={`text-[10px] ${PRIORITY_COLORS[task.priority]}`}>{task.priority}</Badge>
                        {task.due_date && <span className="text-[10px] text-muted-foreground">{task.due_date}{task.due_time ? ` at ${task.due_time}` : ""}</span>}
                        {task.repeat !== "none" && (
                          <div className="flex items-center gap-1 text-[10px] text-primary bg-primary/5 px-1 rounded">
                            <RepeatIcon className="w-2.5 h-2.5" />
                            {task.repeat === "custom" ? task.repeat_days?.map((d: number) => ["S", "M", "T", "W", "T", "F", "S"][d]).join("") : task.repeat}
                          </div>
                        )}
                        {task.notification_enabled && <Bell className="w-3 h-3 text-primary" />}
                      </div>
                    </div>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <button onClick={e => e.stopPropagation()} className="p-1.5 rounded-xl hover:bg-primary/10 text-muted-foreground transition-all">
                          <MoreHorizontal className="w-4 h-4" />
                        </button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="rounded-2xl">
                        <DropdownMenuItem onClick={() => openEdit(task)} className="gap-2 rounded-xl">
                          <Edit2 className="w-3.5 h-3.5" /> Edit
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => deleteTask(task.id)} className="gap-2 text-destructive focus:text-destructive rounded-xl">
                          <Trash2 className="w-3.5 h-3.5" /> Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </div>
              </motion.div>
            ));
          })()}
        </div>
      </AnimatePresence>

      {filtered.length === 0 && (
        <div className="text-center py-16">
          <Check className="w-12 h-12 text-muted-foreground/20 mx-auto mb-3" />
          <p className="text-sm text-muted-foreground">No tasks here</p>
        </div>
      )}

      {/* Task Form Dialog */}
      <Dialog open={showForm} onOpenChange={setShowForm}>
        <DialogContent className="rounded-3xl mx-auto max-w-sm w-[calc(100%-2rem)] max-h-[90vh] overflow-y-auto scrollbar-none">
          <DialogHeader>
            <DialogTitle>{editTask ? "Edit Task" : "New Task"}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 pt-2">
            <div>
              <Label>Title *</Label>
              <Input value={form.title} onChange={e => setForm(f => ({ ...f, title: e.target.value }))} placeholder="Task title" className="rounded-xl mt-1" />
            </div>
            <div>
              <Label>Description</Label>
              <Textarea value={form.description} onChange={e => setForm(f => ({ ...f, description: e.target.value }))} className="rounded-xl mt-1 min-h-[70px]" />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <Label>Due Date</Label>
                <Input type="date" value={form.due_date} onChange={e => setForm(f => ({ ...f, due_date: e.target.value }))} className="rounded-xl mt-1" />
              </div>
              <div>
                <Label>Time</Label>
                <Input type="time" value={form.due_time} onChange={e => setForm(f => ({ ...f, due_time: e.target.value }))} className="rounded-xl mt-1" />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <Label>Priority</Label>
                <Select value={form.priority} onValueChange={v => setForm(f => ({ ...f, priority: v }))}>
                  <SelectTrigger className="rounded-xl mt-1"><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="low">Low</SelectItem>
                    <SelectItem value="medium">Medium</SelectItem>
                    <SelectItem value="high">High</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label>Repeat</Label>
                <Select value={form.repeat} onValueChange={v => setForm(f => ({ ...f, repeat: v }))}>
                  <SelectTrigger className="rounded-xl mt-1"><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="none">None</SelectItem>
                    <SelectItem value="daily">Daily</SelectItem>
                    <SelectItem value="weekly">Weekly</SelectItem>
                    <SelectItem value="monthly">Monthly</SelectItem>
                    <SelectItem value="custom">Custom days</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            {form.repeat === "custom" && (
              <div className="space-y-2">
                <Label className="text-xs">Repeat Days</Label>
                <div className="flex justify-between gap-1">
                  {["S", "M", "T", "W", "T", "F", "S"].map((day, i) => {
                    const isSelected = form.repeat_days?.includes(i);
                    return (
                      <button
                        key={i}
                        type="button"
                        onClick={() => {
                          const next = isSelected 
                            ? form.repeat_days.filter(d => d !== i)
                            : [...(form.repeat_days || []), i];
                          setForm(f => ({ ...f, repeat_days: next }));
                        }}
                        className={`w-8 h-8 rounded-lg text-[10px] font-bold transition-all ${
                          isSelected 
                            ? "bg-primary text-primary-foreground" 
                            : "bg-muted text-muted-foreground hover:bg-muted/80"
                        }`}
                      >
                        {day}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}
            {/* Notification toggle — only if date+time set */}
            <div className="flex items-center justify-between bg-muted/50 p-3 rounded-xl">
              <div>
                <p className="text-sm font-medium">Reminder Notification</p>
                <p className="text-xs text-muted-foreground">{form.due_date && form.due_time ? `Rings at ${form.due_time} on ${form.due_date}` : "Set date & time to enable"}</p>
              </div>
              <Switch
                checked={form.notification_enabled && !!(form.due_date && form.due_time)}
                disabled={!(form.due_date && form.due_time)}
                onCheckedChange={v => setForm(f => ({ ...f, notification_enabled: v }))}
              />
            </div>
            <Button onClick={saveTask} className="w-full rounded-xl">{editTask ? "Update" : "Create"} Task</Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
    </PullToRefresh>
  );
}
