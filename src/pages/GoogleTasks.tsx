import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useGoogleAuth } from '@/lib/googleAuth';
import { googleApi, GoogleTask } from '@/lib/googleApi';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { 
  CheckSquare, 
  Plus, 
  Trash2, 
  KeyRound,
  RefreshCw,
  Wrench,
  AlertTriangle,
  ExternalLink,
  CheckCircle2,
  Circle
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { toast } from 'react-hot-toast';

export default function GoogleTasks() {
  const { accessToken, connectGoogle, connectGoogleRedirect, isConnected, saveDeveloperToken, disconnectGoogle } = useGoogleAuth();
  const [tasks, setTasks] = useState<GoogleTask[]>([]);
  const [taskLists, setTaskLists] = useState<any[]>([]);
  const [selectedList, setSelectedList] = useState<string>("@default");
  
  const [isLoading, setIsLoading] = useState(false);
  const [apiError, setApiError] = useState<string | null>(null);
  const [devTokenInput, setDevTokenInput] = useState("");
  const [showDevTokenForm, setShowDevTokenForm] = useState(false);

  // Form State
  const [showAddModal, setShowAddModal] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    notes: "",
    due: ""
  });

  useEffect(() => {
    if (accessToken) {
      loadListsAndTasks();
    }
  }, [accessToken, selectedList]);

  const loadListsAndTasks = async () => {
    if (!accessToken) return;
    setIsLoading(true);
    setApiError(null);
    try {
      if (taskLists.length === 0) {
        const lists = await googleApi.tasks.listLists(accessToken);
        setTaskLists(lists);
        if (lists.length > 0 && selectedList === "@default") {
          setSelectedList(lists[0].id);
        }
      }
      
      const currentListId = selectedList === "@default" ? taskLists[0]?.id || "@default" : selectedList;
      const data = await googleApi.tasks.listTasks(accessToken, currentListId);
      setTasks(data);
    } catch (err: any) {
      console.error(err);
      setApiError(err.message || String(err));
    } finally {
      setIsLoading(false);
    }
  };

  const handleCreateTask = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!accessToken) return;
    if (!formData.title) {
      toast.error("Please fill in the Title");
      return;
    }

    try {
      setIsLoading(true);
      const res = await googleApi.tasks.createTask(
        accessToken,
        formData.title,
        formData.notes,
        formData.due,
        selectedList
      );

      if (res) {
        setShowAddModal(false);
        setFormData({ title: "", notes: "", due: "" });
        loadListsAndTasks();
      }
    } catch (err: any) {
      toast.error(err.message || "Failed to add task");
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteTask = async (taskId: string, title: string) => {
    if (!accessToken) return;
    const confirmed = window.confirm(`Are you sure you want to permanently delete task "${title}" from Google Tasks?`);
    if (!confirmed) return;

    try {
      setIsLoading(true);
      const ok = await googleApi.tasks.deleteTask(accessToken, taskId, selectedList);
      if (ok) {
        setTasks(prev => prev.filter(t => t.id !== taskId));
      }
    } catch (err) {
      toast.error("Fail to remove task");
    } finally {
      setIsLoading(false);
    }
  };

  const handleToggleTask = async (taskId: string, currentStatus: string) => {
    if (!accessToken) return;
    const newStatus = currentStatus === 'completed' ? 'needsAction' : 'completed';
    
    // Optimistic update
    setTasks(prev => prev.map(t => t.id === taskId ? { ...t, status: newStatus } : t));
    
    try {
      const ok = await googleApi.tasks.toggleTask(accessToken, taskId, newStatus as any, selectedList);
      if (!ok) {
        // Revert on fail
        setTasks(prev => prev.map(t => t.id === taskId ? { ...t, status: currentStatus as any } : t));
        toast.error("Failed to update task status");
      }
    } catch (err) {
      setTasks(prev => prev.map(t => t.id === taskId ? { ...t, status: currentStatus as any } : t));
    }
  };

  return (
    <div className="px-4 pt-6 pb-24 max-w-5xl mx-auto">
      {apiError && (
        <motion.div 
          initial={{ opacity: 0, y: -10 }} 
          animate={{ opacity: 1, y: 0 }}
          className="bg-destructive/15 border-2 border-destructive/20 rounded-2xl p-4 mb-6 text-xs text-foreground flex flex-col sm:flex-row sm:items-center justify-between gap-4"
        >
          <div className="flex items-start gap-2.5">
            <AlertTriangle className="w-5 h-5 text-destructive shrink-0 mt-0.5" />
            <div>
              <p className="font-bold text-destructive-foreground underline decoration-1">Google API Access Forbidden (403 Error)</p>
              <p className="text-muted-foreground mt-0.5 leading-relaxed">
                Google Tasks API has not been enabled or failed.
              </p>
            </div>
          </div>
          <Link to="/database-guide" className="shrink-0">
            <Button size="sm" variant="destructive" className="rounded-xl font-bold gap-1 mt-1 sm:mt-0 text-[11px] h-8 shadow">
              <Wrench className="w-3.5 h-3.5" /> Fix Integration Error <ExternalLink className="w-3 h-3" />
            </Button>
          </Link>
        </motion.div>
      )}

      <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-6 gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Google Tasks</h1>
          <p className="text-xs text-muted-foreground">Manage your tasks seamlessly with Google.</p>
        </div>

        <div className="flex items-center gap-2">
          {isConnected ? (
            <>
              {taskLists.length > 0 && (
                <select 
                  value={selectedList} 
                  onChange={(e) => setSelectedList(e.target.value)}
                  className="bg-muted text-foreground text-xs rounded-xl px-3 py-2 border-none ring-1 ring-border/50 outline-none"
                >
                  {taskLists.map(list => (
                    <option key={list.id} value={list.id}>{list.title}</option>
                  ))}
                </select>
              )}
              <Button size="sm" variant="outline" className="rounded-xl flex items-center gap-1" onClick={loadListsAndTasks} disabled={isLoading}>
                <RefreshCw className={`w-3.5 h-3.5 ${isLoading ? "animate-spin" : ""}`} />
                Reload
              </Button>
              <Button size="sm" className="rounded-xl flex items-center gap-1 bg-primary text-primary-foreground hover:bg-primary/90" onClick={() => setShowAddModal(true)}>
                <Plus className="w-4 h-4" />
                Add Task
              </Button>
              <Button size="sm" variant="ghost" className="rounded-xl text-red-500 hover:text-red-600 hover:bg-red-50/10" onClick={disconnectGoogle}>
                Disconnect
              </Button>
            </>
          ) : (
            <Button size="sm" variant="outline" className="rounded-xl" onClick={() => setShowDevTokenForm(!showDevTokenForm)}>
              <KeyRound className="w-3.5 h-3.5 mr-1" />
              Developer Token
            </Button>
          )}
        </div>
      </div>

      {!isConnected && (
        <div className="mb-6 bg-gradient-to-r from-[#8b5cf6]/5 via-[#6366f1]/5 to-[#f43f5e]/5 border border-border/80 rounded-3xl p-6 shadow-xs">
          <div className="max-w-2xl">
            <div className="flex items-center gap-2 mb-3">
              <CheckSquare className="w-5 h-5 text-primary" />
              <h2 className="text-base font-bold">Connect your Google Workspace Account</h2>
            </div>
            <p className="text-xs text-muted-foreground leading-relaxed mb-4">
              Authorize Google integration to safely sync Tasks.
            </p>

            <div className="flex flex-wrap gap-2 items-center">
              <Button onClick={connectGoogle} className="rounded-xl font-bold bg-[#8b5cf6] text-white hover:bg-[#7c3aed]">
                Connect Google (Popup)
              </Button>
              <Button onClick={connectGoogleRedirect} variant="outline" className="rounded-xl font-bold border-[#8b5cf6]/30 text-foreground hover:bg-[#8b5cf6]/10">
                Connect Google (Redirect)
              </Button>
            </div>
            
            {showDevTokenForm && (
              <motion.div 
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-4 p-4 border border-dashed border-border rounded-2xl bg-muted/20"
              >
                <Label className="text-xs font-bold block mb-1">Paste Access Token (Google OAuth Playground)</Label>
                <div className="flex gap-2">
                  <Input 
                    type="password"
                    placeholder="ya29.a0Acv..."
                    value={devTokenInput}
                    onChange={(e) => setDevTokenInput(e.target.value)}
                    className="rounded-xl text-xs flex-1 border-muted-foreground/30 focus-visible:ring-primary"
                  />
                  <Button 
                    size="sm"
                    onClick={() => {
                      saveDeveloperToken(devTokenInput);
                      setDevTokenInput("");
                    }} 
                    className="rounded-xl text-xs font-bold"
                  >
                    Save Token
                  </Button>
                </div>
              </motion.div>
            )}
          </div>
        </div>
      )}

      {isConnected && (
        <div className="bg-card border border-border rounded-3xl p-5 shadow-xs flex flex-col min-h-[400px]">
          <div className="flex items-center justify-between mb-4 flex-shrink-0">
            <h3 className="text-sm font-bold uppercase tracking-wider text-muted-foreground flex items-center gap-1.5">
              <CheckSquare className="w-4 h-4 text-primary" />
              Tasks ({tasks.length})
            </h3>
          </div>

          <div className="flex-1 space-y-2">
            {isLoading && tasks.length === 0 ? (
              <div className="flex items-center justify-center h-24">
                <div className="w-5 h-5 border-2 border-primary/20 border-t-primary rounded-full animate-spin" />
              </div>
            ) : tasks.length === 0 ? (
              <div className="text-center py-12 text-muted-foreground">
                <p className="text-xs font-bold">No tasks</p>
                <p className="text-[10px] text-muted-foreground mt-1">You are all caught up.</p>
              </div>
            ) : (
              tasks.map(task => {
                const isCompleted = task.status === 'completed';
                return (
                  <div 
                    key={task.id}
                    className={`group relative p-4 border rounded-2xl transition-all flex items-start gap-3 ${
                      isCompleted ? 'bg-muted/10 border-transparent opacity-70' : 'bg-card border-border/80 hover:border-primary/30'
                    }`}
                  >
                    <button 
                      onClick={() => handleToggleTask(task.id, task.status)}
                      className="mt-0.5 flex-shrink-0 text-muted-foreground hover:text-primary transition-colors"
                    >
                      {isCompleted ? <CheckCircle2 className="w-5 h-5 text-primary" /> : <Circle className="w-5 h-5" />}
                    </button>
                    <div className="flex-1 min-w-0">
                      <p className={`text-sm font-bold truncate ${isCompleted ? 'line-through text-muted-foreground' : 'text-foreground'}`}>
                        {task.title}
                      </p>
                      {task.notes && (
                        <p className="text-xs text-muted-foreground mt-1 line-clamp-2">
                          {task.notes}
                        </p>
                      )}
                      {task.due && (
                        <p className="text-[10px] font-medium mt-2 px-2 py-0.5 bg-primary/10 text-primary rounded-full inline-block">
                          Due: {new Date(task.due).toLocaleDateString()}
                        </p>
                      )}
                    </div>
                    <button 
                      onClick={() => handleDeleteTask(task.id, task.title)}
                      className="opacity-0 group-hover:opacity-100 p-1.5 text-muted-foreground hover:text-red-500 rounded-lg hover:bg-red-500/10 transition-all self-center flex-shrink-0"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                );
              })
            )}
          </div>
        </div>
      )}

      {/* Schedule Form Modal */}
      <AnimatePresence>
        {showAddModal && (
          <div className="fixed inset-0 flex items-center justify-center z-50 p-4 bg-background/80 backdrop-blur-xs">
            <motion.div 
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-card w-full max-w-md border border-border rounded-3xl p-5 shadow-xl"
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-bold uppercase tracking-wider text-muted-foreground flex items-center gap-1.5">
                  <CheckSquare className="w-4 h-4 text-primary" />
                  Add Google Task
                </h3>
                <button 
                  onClick={() => setShowAddModal(false)}
                  className="text-xs font-bold px-2 py-1 rounded bg-muted text-muted-foreground hover:bg-muted/80"
                >
                  Close
                </button>
              </div>

              <form onSubmit={handleCreateTask} className="space-y-4">
                <div>
                  <Label className="text-xs font-bold">Task Title</Label>
                  <Input 
                    type="text"
                    required
                    placeholder="E.g., Follow up on report"
                    value={formData.title}
                    onChange={(e) => setFormData(f => ({ ...f, title: e.target.value }))}
                    className="rounded-xl text-xs mt-1 border-muted-foreground/30 focus-visible:ring-primary"
                  />
                </div>

                <div>
                  <Label className="text-xs font-bold">Notes</Label>
                  <Textarea 
                    placeholder="Additional details..."
                    value={formData.notes}
                    onChange={(e) => setFormData(f => ({ ...f, notes: e.target.value }))}
                    rows={3}
                    className="rounded-xl text-xs mt-1 border-muted-foreground/30"
                  />
                </div>
                
                <div>
                  <Label className="text-xs font-bold">Due Date (Optional)</Label>
                  <Input 
                    type="date"
                    value={formData.due}
                    onChange={(e) => setFormData(f => ({ ...f, due: e.target.value }))}
                    className="rounded-xl text-xs mt-1 border-muted-foreground/30"
                  />
                </div>

                <Button type="submit" disabled={isLoading} className="w-full rounded-xl font-bold h-11">
                  {isLoading ? "Saving..." : "Add to Google Tasks"}
                </Button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
