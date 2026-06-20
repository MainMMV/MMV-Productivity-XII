import { useState, useEffect } from 'react';
import { useGoogleAuth } from '@/lib/googleAuth';
import { googleApi, GoogleTask, GoogleCalendarEvent, GoogleDriveFile } from '@/lib/googleApi';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { toast } from 'react-hot-toast';
import { base44 } from '@/api/base44Client';
import { 
  Sparkles, 
  CheckCircle, 
  Calendar, 
  FileText, 
  Lightbulb, 
  Table, 
  Database,
  CloudLightning,
  RefreshCw,
  Plus,
  Trash2,
  Trash,
  UploadCloud,
  DownloadCloud,
  Share2,
  Check,
  AlertCircle
} from 'lucide-react';

interface HomeWorkspaceCloudProps {
  habits: any[];
  tasks: any[];
  expenses: any[];
  income: any[];
  goals: any[];
}

export default function HomeWorkspaceCloud({ habits, tasks, expenses, income, goals }: HomeWorkspaceCloudProps) {
  const { accessToken, connectGoogle, isConnected, disconnectGoogle } = useGoogleAuth();
  
  const [isLoading, setIsLoading] = useState(false);

  // --- 1. Tasks state ---
  const [googleTasks, setGoogleTasks] = useState<GoogleTask[]>([]);
  const [newTaskTitle, setNewTaskTitle] = useState("");

  // --- 2. Calendar state ---
  const [calendarEvents, setCalendarEvents] = useState<GoogleCalendarEvent[]>([]);
  const [newEventTitle, setNewEventTitle] = useState("");
  const [newEventTime, setNewEventTime] = useState("");

  // --- 3. Docs state ---
  const [docsList, setDocsList] = useState<GoogleDriveFile[]>([]);
  const [selectedDocId, setSelectedDocId] = useState("");

  // --- 4. Keep state ---
  const [keepNotes, setKeepNotes] = useState<any[]>([]);
  const [newNoteTitle, setNewNoteTitle] = useState("");
  const [newNoteBody, setNewNoteBody] = useState("");
  const [noteColor, setNoteColor] = useState("yellow");

  // Load cloud data upon token availability
  useEffect(() => {
    if (accessToken) {
      loadAllCloudData();
    }
  }, [accessToken]);

  const loadAllCloudData = async () => {
    if (!accessToken) return;
    setIsLoading(true);
    try {
      const liveTasks = await googleApi.tasks.listTasks(accessToken);
      setGoogleTasks(liveTasks.slice(0, 5));

      const liveEvents = await googleApi.calendar.listEvents(accessToken);
      setCalendarEvents(liveEvents.slice(0, 3));

      const liveDocs = await googleApi.drive.listFiles(accessToken, "mimeType = 'application/vnd.google-apps.document' and trashed = false");
      setDocsList(liveDocs.slice(0, 5));
      if (liveDocs.length > 0 && !selectedDocId) {
        setSelectedDocId(liveDocs[0].id);
      }

      const liveNotes = await googleApi.keep.listNotes(accessToken);
      setKeepNotes(liveNotes.slice(0, 4));
    } catch (e) {
      console.error("Cloud synchronization issues:", e);
    } finally {
      setIsLoading(false);
    }
  };

  // --- ACT 1: CREATE GOOGLE TASK ---
  const handleCreateGoogleTask = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!accessToken || !newTaskTitle.trim()) return;
    
    try {
      const added = await googleApi.tasks.createTask(accessToken, newTaskTitle.trim(), "Linked to MMV Suite Tasks Dashboard");
      if (added) {
        setNewTaskTitle("");
        const liveTasks = await googleApi.tasks.listTasks(accessToken);
        setGoogleTasks(liveTasks.slice(0, 5));
      }
    } catch (err) {
      toast.error("Cloud task creation failed");
    }
  };

  const handleToggleGoogleTask = async (taskId: string, currentStatus: string) => {
    if (!accessToken) return;
    const nextStatus = currentStatus === 'completed' ? 'needsAction' : 'completed';
    try {
      const success = await googleApi.tasks.toggleTask(accessToken, taskId, nextStatus);
      if (success) {
        setGoogleTasks(prev => prev.map(t => t.id === taskId ? { ...t, status: nextStatus } : t));
        toast.success("Google task status updated!");
      }
    } catch (e) {
      toast.error("Could not toggle status");
    }
  };

  // --- ACT 2: CREATE CALENDAR MEET ---
  const handleCreateCalendarEvent = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!accessToken || !newEventTitle.trim() || !newEventTime) {
      toast.error("Please add a title and date/time for the event");
      return;
    }

    try {
      const startTime = new Date(newEventTime).toISOString();
      // End defaults to 1 hour later
      const endTime = new Date(new Date(newEventTime).getTime() + 60 * 60 * 1000).toISOString();
      const res = await googleApi.calendar.createEvent(accessToken, newEventTitle, "Productivity Sprint Alert", startTime, endTime);
      if (res) {
        setNewEventTitle("");
        setNewEventTime("");
        const liveEvents = await googleApi.calendar.listEvents(accessToken);
        setCalendarEvents(liveEvents.slice(0, 3));
      }
    } catch (err) {
      toast.error("Error scheduling session");
    }
  };

  // --- ACT 3: APPEND PROGRESS TO GOOGLE DOC ---
  const handleAppendProgressDoc = async () => {
    if (!accessToken || !selectedDocId) {
      toast.error("Please select a Google Doc from the browser list first");
      return;
    }

    try {
      setIsLoading(true);
      const docName = docsList.find(d => d.id === selectedDocId)?.name || "Document";
      
      const textBlock = `
Progress Update
Generated: ${new Date().toLocaleString()}
---------------------------------------------
* Total habits tracked: ${habits.length}
* Total goal savings: ${goals.reduce((sum, g) => sum + (g.current_amount || 0), 0)}
* Active tasks: ${tasks.length}
* Habits completed today: ${habits.filter(h => h.completions?.includes(new Date().toISOString().split("T")[0])).length}
`;

      const ok = await googleApi.docs.appendDocumentText(accessToken, selectedDocId, textBlock);
      if (ok) {
        toast.success(`Appended daily standup record to Google Doc "${docName}"!`);
      }
    } catch (e) {
      toast.error("Doc write failed");
    } finally {
      setIsLoading(false);
    }
  };

  // --- ACT 4: PIN STICKY TARGET ---
  const handleCreateStickyNote = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!accessToken || !newNoteTitle.trim() || !newNoteBody.trim()) return;

    try {
      const note = await googleApi.keep.createNote(accessToken, newNoteTitle.trim(), newNoteBody.trim(), noteColor);
      if (note) {
        setNewNoteTitle("");
        setNewNoteBody("");
        const liveNotes = await googleApi.keep.listNotes(accessToken);
        setKeepNotes(liveNotes.slice(0, 4));
      }
    } catch (err) {
      toast.error("Error creating note");
    }
  };

  // --- ACT 5: EXPORT FINANCES TO GOOGLE SHEET ---
  const handleExportFinancesToSheet = async () => {
    if (!accessToken) return;

    try {
      setIsLoading(true);
      toast.loading("Creating spreadsheet...", { id: "sheet_export" });
      const sprintTitle = `Finances Export (${new Date().toLocaleDateString()})`;
      const sheet = await googleApi.sheets.createSpreadsheet(accessToken, sprintTitle);
      
      if (!sheet) {
        toast.error("Failed to initialize sheet", { id: "sheet_export" });
        return;
      }

      const rows = [
        ["CATEGORY/SOURCE", "AMOUNT/FUNDS", "DATETIME", "TRANSACTION TYPE", "NOTE"],
        ...expenses.map(e => [e.category, e.amount, e.date, "EXPENSE", e.note || ""]),
        ...income.map(i => [i.source, i.amount, i.date, "INCOME", i.note || ""])
      ];

      const writeOk = await googleApi.sheets.writeSheetData(accessToken, sheet.spreadsheetId, "Sheet1!A1:E100", rows);
      if (writeOk) {
        toast.success("All transactions exported successfully to Google Sheets!", { id: "sheet_export" });
        // Inform user they can browse spreadsheet
        if (sheet.spreadsheetUrl) {
          window.open(sheet.spreadsheetUrl, '_blank');
        }
      } else {
        toast.error("Failed to map cell calculations", { id: "sheet_export" });
      }
    } catch (err) {
      console.error(err);
      toast.error("Export failure occurred", { id: "sheet_export" });
    } finally {
      setIsLoading(false);
    }
  };

  // --- ACT 6: DRIVE BACKUPSnapshot ---
  const handleBackupToDrive = async () => {
    if (!accessToken) return;

    // STRICT REQUIREMENT: Confirmation dialog
    const confirmed = window.confirm("Are you sure you want to capture a database snapshot and save it on your Google Drive as a JSON payload? This will preserve your budgets, habits, and progress.");
    if (!confirmed) return;

    try {
      setIsLoading(true);
      const backupPayload = {
        timestamp: new Date().toISOString(),
        habits,
        tasks,
        expenses,
        income,
        goals
      };

      const res = await googleApi.drive.createFile(
        accessToken,
        `backup_${Date.now()}.json`,
        JSON.stringify(backupPayload, null, 2),
        "application/json"
      );

      if (res) {
        toast.success("Backup saved to Google Drive.");
      }
    } catch (err) {
       toast.error("Backup failed");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="mt-8 bg-card border border-border rounded-3xl p-6 shadow-sm overflow-hidden">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-6 gap-3 pb-4 border-b border-border/60">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <CloudLightning className="w-4 h-4 text-primary animate-pulse" />
            <h2 className="text-xs font-bold text-primary uppercase tracking-widest">Google Integrations</h2>
          </div>
          <p className="text-[11px] text-muted-foreground">Connect your Google account to sync tasks, calendar events, documents, and backups.</p>
        </div>

        {isConnected ? (
          <div className="flex items-center gap-2">
            <Button size="sm" variant="outline" className="rounded-xl text-xs font-bold flex items-center gap-1" onClick={loadAllCloudData} disabled={isLoading}>
              <RefreshCw className={`w-3 h-3 ${isLoading ? "animate-spin" : ""}`} />
              Sync Now
            </Button>
            <Button size="sm" variant="ghost" className="rounded-xl text-xs text-red-500 hover:text-red-700 hover:bg-red-50/10 font-bold" onClick={disconnectGoogle}>
              Log out Google
            </Button>
          </div>
        ) : (
          <Button size="sm" onClick={connectGoogle} className="rounded-xl text-xs font-bold bg-[#8b5cf6] text-white hover:bg-[#7c3aed]">
            Authorize Google Account
          </Button>
        )}
      </div>

      {!isConnected ? (
        <div className="text-center py-10 bg-muted/10 border border-dashed rounded-2xl">
          <Sparkles className="w-8 h-8 text-primary/40 mx-auto mb-2 animate-bounce" />
          <h3 className="text-xs font-bold text-foreground">Sync is offline</h3>
          <p className="text-[10px] text-muted-foreground mt-1 max-w-sm mx-auto">Sign in with Google to enable task sync, calendar reminders, financial exports, and automatic backups.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          
          {/* 1. GOOGLE TASKS SUMMARY */}
          <div className="p-4 border border-border/80 rounded-2xl bg-muted/5 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest flex items-center gap-1.5">
                  <CheckCircle className="w-3.5 h-3.5 text-primary" />
                  Google Tasks Sync
                </span>
                <span className="text-[9px] px-1.5 py-0.5 rounded bg-primary/10 text-primary font-bold">2nd Reminder</span>
              </div>

              <div className="space-y-1.5 mb-3 max-h-[140px] overflow-y-auto pr-1">
                {googleTasks.length === 0 ? (
                  <p className="text-[10px] text-muted-foreground py-2 text-center font-medium">Default list is empty</p>
                ) : (
                  googleTasks.map(t => (
                    <div key={t.id} className="flex items-center gap-2 p-1.5 rounded-lg border border-border/40 bg-card/50 text-[11px] font-medium leading-none">
                      <input 
                        type="checkbox" 
                        checked={t.status === 'completed'}
                        onChange={() => handleToggleGoogleTask(t.id, t.status)}
                        className="rounded accent-primary border-muted-foreground/30 flex-shrink-0" 
                      />
                      <span className={`truncate flex-1 ${t.status === 'completed' ? 'line-through text-muted-foreground opacity-60' : 'text-card-foreground'}`}>{t.title}</span>
                    </div>
                  ))
                )}
              </div>
            </div>

            <form onSubmit={handleCreateGoogleTask} className="flex gap-1.5 mt-2">
              <Input 
                placeholder="Add task..."
                value={newTaskTitle}
                onChange={(e) => setNewTaskTitle(e.target.value)}
                className="rounded-xl text-[10px] h-8 border-muted-foreground/20"
              />
              <Button size="sm" type="submit" className="rounded-xl h-8 px-2 text-[10px] font-extrabold flex items-center gap-0.5">
                <Plus className="w-3.5 h-3.5" /> Add
              </Button>
            </form>
          </div>

          {/* 2. GOOGLE CALENDAR SUMMARY */}
          <div className="p-4 border border-border/80 rounded-2xl bg-muted/5 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5 text-orange-500" />
                  Google Calendar Events
                </span>
                <span className="text-[9px] px-1.5 py-0.5 rounded bg-orange-500/10 text-orange-500 font-bold">Upcoming</span>
              </div>

              <div className="space-y-1.5 mb-3 max-h-[140px] overflow-y-auto pr-1">
                {calendarEvents.length === 0 ? (
                  <p className="text-[10px] text-muted-foreground py-4 text-center font-medium">No events on primary list</p>
                ) : (
                  calendarEvents.map(evt => {
                    const d = evt.start.dateTime || evt.start.date || "";
                    const label = d ? new Date(d).toLocaleDateString("en-US", { month: "short", day: "numeric", hour: "2-digit" }) : "All-day";
                    return (
                      <div key={evt.id} className="p-1.5 rounded-lg border border-border/40 bg-card/50 text-[10px] flex items-center justify-between">
                        <div className="truncate flex-1 pr-2">
                          <p className="font-extrabold text-foreground truncate">{evt.summary}</p>
                          <p className="text-[8px] text-muted-foreground">{label}</p>
                        </div>
                        <Check className="w-3 h-3 text-emerald-500" />
                      </div>
                    );
                  })
                )}
              </div>
            </div>

            <form onSubmit={handleCreateCalendarEvent} className="flex gap-1.5 mt-2">
              <Input 
                placeholder="Event title..."
                value={newEventTitle}
                onChange={(e) => setNewEventTitle(e.target.value)}
                className="rounded-xl text-[10px] h-8 border-muted-foreground/20 flex-1"
              />
              <Input 
                type="datetime-local"
                value={newEventTime}
                onChange={(e) => setNewEventTime(e.target.value)}
                className="rounded-xl text-[10px] h-8 border-muted-foreground/20 w-24"
              />
              <Button size="sm" type="submit" className="rounded-xl h-8 px-2 text-[10px] font-extrabold flex items-center gap-0.5">
                <Plus className="w-3.5 h-3.5" /> Add
              </Button>
            </form>
          </div>

          {/* 3. GOOGLE DOCS STANDUP SYNC */}
          <div className="p-4 border border-border/80 rounded-2xl bg-muted/5 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest flex items-center gap-1.5">
                  <FileText className="w-3.5 h-3.5 text-blue-500" />
                  Google Docs
                </span>
                <span className="text-[9px] px-1.5 py-0.5 rounded bg-blue-500/10 text-blue-500 font-bold">Appends</span>
              </div>

              <div className="space-y-2 text-[11px] leading-relaxed mb-4">
                <p className="text-muted-foreground leading-snug">
                  Choose an active document inside your Google Drive workspace, and immediately commit your current stats standups.
                </p>

                {docsList.length > 0 ? (
                  <div className="space-y-1">
                    <label className="text-[9px] font-extrabold text-muted-foreground block">Select target document:</label>
                    <select 
                      value={selectedDocId} 
                      onChange={(e) => setSelectedDocId(e.target.value)}
                      className="w-full text-[10px] p-1.5 rounded-lg bg-card border border-border font-bold text-foreground"
                    >
                      {docsList.map(doc => (
                        <option key={doc.id} value={doc.id}>{doc.name}</option>
                      ))}
                    </select>
                  </div>
                ) : (
                  <p className="text-[10px] text-orange-500 font-bold">No active text documents found in Drive. Write/create in Note section first.</p>
                )}
              </div>
            </div>

            <Button 
              size="sm" 
              onClick={handleAppendProgressDoc} 
              disabled={isLoading || docsList.length === 0} 
              className="w-full rounded-xl text-[11px] font-bold h-9 bg-blue-600 hover:bg-blue-700 text-white flex items-center justify-center gap-1"
            >
              <Share2 className="w-3.5 h-3.5" />
              Append summary to Doc
            </Button>
          </div>

          {/* 4. GOOGLE KEEP COLOR STICKIES */}
          <div className="p-4 border border-border/80 rounded-2xl bg-muted/5 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest flex items-center gap-1.5">
                  <Lightbulb className="w-3.5 h-3.5 text-yellow-500" />
                  Google Keep Stickies
                </span>
                <span className="text-[9px] px-1.5 py-0.5 rounded bg-yellow-500/10 text-yellow-500 font-bold">Boards</span>
              </div>

              {/* Small preview of board */}
              <div className="grid grid-cols-2 gap-1.5 mb-3 max-h-[140px] overflow-y-auto pr-1">
                {keepNotes.length === 0 ? (
                  <p className="col-span-2 text-[10px] text-muted-foreground py-4 text-center">Pin boards are currently empty</p>
                ) : (
                  keepNotes.slice(0, 4).map(note => (
                    <div 
                      key={note.id} 
                      className="p-2 border rounded-xl text-[10px] font-medium min-h-[50px] bg-amber-50/20 text-foreground flex flex-col justify-between"
                      style={{ 
                        backgroundColor: note.color === 'green' ? 'rgba(16, 185, 129, 0.08)' : note.color === 'pink' ? 'rgba(244, 63, 94, 0.08)' : 'rgba(245, 158, 11, 0.08)'
                      }}
                    >
                      <p className="font-extrabold truncate text-card-foreground">{note.title}</p>
                      <p className="truncate text-muted-foreground text-[9px] mt-0.5">{typeof note.body === 'string' ? note.body : (note.body?.text?.text || "")}</p>
                    </div>
                  ))
                )}
              </div>
            </div>

            <form onSubmit={handleCreateStickyNote} className="space-y-1.5 mt-1">
              <Input 
                placeholder="Sticky title..."
                value={newNoteTitle}
                onChange={(e) => setNewNoteTitle(e.target.value)}
                className="rounded-xl text-[10px] h-7 border-muted-foreground/20"
              />
              <div className="flex gap-1.5">
                <Input 
                  placeholder="Note details..."
                  value={newNoteBody}
                  onChange={(e) => setNewNoteBody(e.target.value)}
                  className="rounded-xl text-[10px] h-7 border-muted-foreground/20 flex-1"
                />
                <Button size="sm" type="submit" className="rounded-xl h-7 px-2 text-[10px] font-black uppercase">
                  Pin card
                </Button>
              </div>
            </form>
          </div>

          {/* 5. GOOGLE SPREADSHEETS (FINANCIAL EXPORT) */}
          <div className="p-4 border border-border/80 rounded-2xl bg-muted/5 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest flex items-center gap-1.5">
                  <Table className="w-3.5 h-3.5 text-emerald-500" />
                  Google Sheets Backup
                </span>
                <span className="text-[9px] px-1.5 py-0.5 rounded bg-emerald-500/10 text-emerald-500 font-bold">Export DB</span>
              </div>

              <div className="text-[11px] text-muted-foreground mb-4 space-y-2">
                <p className="leading-snug">
                  Secures your budget details dynamically on a relational spreadsheet table to completely preserve balances.
                </p>
                <div className="p-2 border border-border rounded-xl bg-card/60 flex flex-col gap-1 text-[9px] font-bold">
                  <p className="text-foreground">In-App finances pool state:</p>
                  <div className="flex justify-between border-b pb-1 text-muted-foreground">
                    <span>Expenses items:</span>
                    <span className="text-muted-foreground">{expenses.length} rows</span>
                  </div>
                  <div className="flex justify-between text-muted-foreground">
                    <span>Incomes items:</span>
                    <span className="text-muted-foreground">{income.length} rows</span>
                  </div>
                </div>
              </div>
            </div>

            <Button 
              size="sm" 
              onClick={handleExportFinancesToSheet} 
              disabled={isLoading || (expenses.length === 0 && income.length === 0)}
              className="w-full rounded-xl text-[11px] font-bold h-9 bg-emerald-600 hover:bg-emerald-700 text-white flex items-center justify-center gap-1"
            >
              <Table className="w-3.5 h-3.5" />
              Write financials to Sheets
            </Button>
          </div>

          {/* 6. GOOGLE DRIVE BACKUPS DATA VAULT */}
          <div className="p-4 border border-border/80 rounded-2xl bg-muted/5 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest flex items-center gap-1.5">
                  <Database className="w-3.5 h-3.5 text-violet-500" />
                  Google Drive Backups
                </span>
              </div>

              <p className="text-[11px] text-muted-foreground leading-normal mb-4">
                Save a secure JSON backup of your data (habits, tasks, financial goals) to your Google Drive.
              </p>
            </div>

            <Button 
              size="sm" 
              onClick={handleBackupToDrive} 
              disabled={isLoading}
              className="w-full rounded-xl text-[11px] font-bold h-9 bg-violet-600 hover:bg-violet-700 text-white flex items-center justify-center gap-1.5"
            >
              <UploadCloud className="w-4 h-4" />
              Backup to Google Drive
            </Button>
          </div>

        </div>
      )}
    </div>
  );
}
