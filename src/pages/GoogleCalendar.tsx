import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useGoogleAuth } from '@/lib/googleAuth';
import { googleApi, GoogleCalendarEvent } from '@/lib/googleApi';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useSettings } from '@/lib/useSettings';
import { formatCurrency } from '@/lib/utils';
import { 
  Calendar as CalendarIcon, 
  Plus, 
  Trash2, 
  MapPin, 
  Clock, 
  ChevronLeft, 
  ChevronRight, 
  Sparkles, 
  AlertCircle,
  HelpCircle,
  KeyRound,
  RefreshCw,
  Wrench,
  AlertTriangle,
  ExternalLink
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { toast } from 'react-hot-toast';

export default function GoogleCalendar() {
  const { accessToken, connectGoogle, connectGoogleRedirect, isConnected, saveDeveloperToken, disconnectGoogle } = useGoogleAuth();
  const { settings } = useSettings();
  const [events, setEvents] = useState<GoogleCalendarEvent[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [apiError, setApiError] = useState<string | null>(null);
  const [devTokenInput, setDevTokenInput] = useState("");
  const [showDevTokenForm, setShowDevTokenForm] = useState(false);

  // Form State
  const [showAddModal, setShowAddModal] = useState(false);
  const [formData, setFormData] = useState({
    summary: "",
    description: "",
    startTime: "",
    endTime: "",
    location: ""
  });

  // Calendar Grid State
  const [currentDate, setCurrentDate] = useState(new Date());

  useEffect(() => {
    if (accessToken) {
      fetchEvents();
    }
  }, [accessToken]);

  const fetchEvents = async () => {
    if (!accessToken) return;
    setIsLoading(true);
    setApiError(null);
    try {
      const data = await googleApi.calendar.listEvents(accessToken);
      // Filter out canceled events or empty titles
      setEvents(data.filter(e => e.summary));
    } catch (err: any) {
      console.error(err);
      setApiError(err.message || String(err));
    } finally {
      setIsLoading(false);
    }
  };

  const handleCreateEvent = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!accessToken) return;
    if (!formData.summary || !formData.startTime || !formData.endTime) {
      toast.error("Please fill in the Summary, Start Time, and End Time");
      return;
    }

    try {
      setIsLoading(true);
      const res = await googleApi.calendar.createEvent(
        accessToken,
        formData.summary,
        formData.description,
        formData.startTime,
        formData.endTime,
        formData.location
      );

      if (res) {
        setShowAddModal(false);
        setFormData({ summary: "", description: "", startTime: "", endTime: "", location: "" });
        fetchEvents();
      }
    } catch (err: any) {
      toast.error(err.message || "Failed to add event");
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteEvent = async (eventId: string, summary: string) => {
    if (!accessToken) return;
    
    // STRICT REQUIREMENT: Explicit user confirmation dialog before mutate/delete
    const confirmed = window.confirm(`Are you sure you want to permanently delete event "${summary}" from your Google Calendar?`);
    if (!confirmed) return;

    try {
      setIsLoading(true);
      const ok = await googleApi.calendar.deleteEvent(accessToken, eventId);
      if (ok) {
        setEvents(prev => prev.filter(e => e.id !== eventId));
      }
    } catch (err) {
      toast.error("Fail to remove event");
    } finally {
      setIsLoading(false);
    }
  };

  // Helper date logic for Monthly Grid
  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    return new Date(year, month + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    return new Date(year, month, 1).getDay(); // 0 is Sunday
  };

  const prevMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
  };

  const nextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
  };

  const monthDays = getDaysInMonth(currentDate);
  const firstDayIndex = getFirstDayOfMonth(currentDate); // 0 corresponds to Sunday, 1 to Monday...
  
  // Arrange blank boxes up to first day
  const blanks = Array(firstDayIndex).fill(null);
  const daysArray = Array.from({ length: monthDays }, (_, i) => i + 1);
  const calendarCells = [...blanks, ...daysArray];

  // Map events to date strings "YYYY-MM-DD"
  const getEventsForDay = (dayNum: number) => {
    if (!dayNum) return [];
    const dateStr = `${currentDate.getFullYear()}-${String(currentDate.getMonth() + 1).padStart(2, '0')}-${String(dayNum).padStart(2, '0')}`;
    return events.filter(event => {
      const eventStart = event.start.dateTime || event.start.date || "";
      return eventStart.startsWith(dateStr);
    });
  };

  return (
    <div className="px-4 pt-6 pb-24 max-w-7xl mx-auto">
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
                Google Calendar or Tasks APIs have not been enabled in your Google Cloud project (<span className="font-mono font-bold text-foreground">mmv-xii</span>). List operation failed.
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
          <h1 className="text-2xl font-bold tracking-tight">Google Calendar</h1>
          <p className="text-xs text-muted-foreground">Manage your schedule and upcoming events.</p>
        </div>

        <div className="flex items-center gap-2">
          {isConnected ? (
            <>
              <Button size="sm" variant="outline" className="rounded-xl flex items-center gap-1" onClick={fetchEvents} disabled={isLoading}>
                <RefreshCw className={`w-3.5 h-3.5 ${isLoading ? "animate-spin" : ""}`} />
                Reload
              </Button>
              <Button size="sm" className="rounded-xl flex items-center gap-1 bg-primary text-primary-foreground hover:bg-primary/90" onClick={() => setShowAddModal(true)}>
                <Plus className="w-4 h-4" />
                Schedule Event
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
              <CalendarIcon className="w-5 h-5 text-primary" />
              <h2 className="text-base font-bold">Connect your Google Workspace Account</h2>
            </div>
            <p className="text-xs text-muted-foreground leading-relaxed mb-4">
              Authorize Google Calendar integration to safely sync events and tasks. 
              Our service requests read/write calendar scopes with absolute permissions to sync alerts.
            </p>

            <div className="flex flex-wrap gap-2 items-center">
              <Button onClick={connectGoogle} className="rounded-xl font-bold bg-[#8b5cf6] text-white hover:bg-[#7c3aed]">
                Connect Google (Popup)
              </Button>
              <Button onClick={connectGoogleRedirect} variant="outline" className="rounded-xl font-bold border-[#8b5cf6]/30 text-foreground hover:bg-[#8b5cf6]/10">
                Connect Google (Redirect)
              </Button>
              <span className="text-xs text-muted-foreground px-2">or</span>
              <Button variant="outline" onClick={() => setShowDevTokenForm(!showDevTokenForm)} className="rounded-xl text-xs font-semibold">
                Use Developer Access Token
              </Button>
            </div>

            {showDevTokenForm && (
              <motion.div 
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-4 p-4 border border-dashed border-border rounded-2xl bg-muted/20"
              >
                <Label className="text-xs font-bold block mb-1">Paste Access Token (Google OAuth Playground)</Label>
                <p className="text-[10px] text-muted-foreground mb-3">
                  Paste an active token with tasks, calendar, documents, and spreadsheets scopes to test in-browser without redirect.
                </p>
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
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Month Calendar Grid */}
          <div className="lg:col-span-2 bg-card border border-border rounded-3xl p-5 shadow-xs">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-bold uppercase tracking-wider text-muted-foreground flex items-center gap-1.5">
                <CalendarIcon className="w-4 h-4 text-primary" />
                {currentDate.toLocaleString('default', { month: 'long', year: 'numeric' })}
              </h3>
              <div className="flex items-center gap-1">
                <button onClick={prevMonth} className="p-1 rounded-lg hover:bg-muted text-muted-foreground hover:text-foreground">
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button onClick={nextMonth} className="p-1 rounded-lg hover:bg-muted text-muted-foreground hover:text-foreground">
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            </div>

            <div className="grid grid-cols-7 gap-1 text-center font-bold text-[10px] text-muted-foreground uppercase mb-2">
              <div>Sun</div>
              <div>Mon</div>
              <div>Tue</div>
              <div>Wed</div>
              <div>Thu</div>
              <div>Fri</div>
              <div>Sat</div>
            </div>

            <div className="grid grid-cols-7 gap-1.5">
              {calendarCells.map((day, idx) => {
                const dayEvents = getEventsForDay(day);
                const isToday = day && 
                  new Date().getDate() === day && 
                  new Date().getMonth() === currentDate.getMonth() && 
                  new Date().getFullYear() === currentDate.getFullYear();

                return (
                  <div 
                    key={idx} 
                    className={`min-h-[70px] p-1 border border-border/40 rounded-xl flex flex-col justify-between transition-colors bg-muted/5 ${
                      day ? "hover:bg-primary/5 cursor-pointer" : "opacity-20 pointer-events-none"
                    } ${isToday ? "ring-2 ring-primary bg-primary/5" : ""}`}
                    onClick={() => {
                      if (!day) return;
                      const dateStr = `${currentDate.getFullYear()}-${String(currentDate.getMonth() + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
                      setFormData(f => ({ ...f, startTime: `${dateStr}T09:00`, endTime: `${dateStr}T10:00` }));
                      setShowAddModal(true);
                    }}
                  >
                    {day ? (
                      <>
                        <span className={`text-xs font-bold self-start px-1.5 py-0.5 rounded-md ${
                          isToday ? "bg-primary text-primary-foreground" : "text-card-foreground/80"
                        }`}>{day}</span>
                        
                        <div className="space-y-0.5 mt-1 overflow-hidden flex-1 flex flex-col justify-end">
                          {dayEvents.slice(0, 3).map((evt) => (
                            <div 
                              key={evt.id} 
                              className="text-[8px] leading-tight font-extrabold truncate px-1 py-0.5 rounded bg-primary/10 text-primary border-l-2 border-primary"
                              title={evt.summary}
                            >
                              {evt.summary}
                            </div>
                          ))}
                          {dayEvents.length > 3 && (
                            <span className="text-[7px] text-muted-foreground block text-right font-bold font-mono">+{dayEvents.length - 3} more</span>
                          )}
                        </div>
                      </>
                    ) : null}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Connected Events Feed */}
          <div className="bg-card border border-border rounded-3xl p-5 shadow-xs flex flex-col max-h-[500px]">
            <div className="flex items-center justify-between mb-4 flex-shrink-0">
              <h3 className="text-sm font-bold uppercase tracking-wider text-muted-foreground flex items-center gap-1.5">
                <Clock className="w-4 h-4 text-primary" />
                Upcoming Events ({events.length})
              </h3>
            </div>

            <div className="flex-1 overflow-y-auto space-y-3 pr-1">
              {isLoading ? (
                <div className="flex items-center justify-center h-24">
                  <div className="w-5 h-5 border-2 border-primary/20 border-t-primary rounded-full animate-spin" />
                </div>
              ) : events.length === 0 ? (
                <div className="text-center py-12 text-muted-foreground">
                  <p className="text-xs font-bold">No upcoming events</p>
                  <p className="text-[10px] text-muted-foreground mt-1">Your schedule is clear.</p>
                </div>
              ) : (
                events.map(event => {
                  const startStr = event.start.dateTime || event.start.date || "";
                  const date = startStr ? new Date(startStr).toLocaleDateString("en-US", { month: "short", day: "numeric", hour: "2-digit", minute: "2-digit" }) : "All-day";

                  return (
                    <div 
                      key={event.id}
                      className="group relative p-3 border border-border/80 rounded-2xl bg-muted/10 hover:bg-primary/5 hover:border-primary/20 transition-all flex items-start gap-2.5"
                    >
                      <div className="flex-1 min-w-0">
                        <p className="text-xs font-bold text-foreground truncate group-hover:text-primary transition-colors">{event.summary}</p>
                        <p className="text-[9px] text-muted-foreground font-medium flex items-center gap-1 mt-1">
                          <Clock className="w-3 h-3 text-primary/70" />
                          {date}
                        </p>
                        {event.location && (
                          <p className="text-[9px] text-muted-foreground font-medium flex items-center gap-1 mt-0.5 truncate">
                            <MapPin className="w-3 h-3 text-emerald-500" />
                            {event.location}
                          </p>
                        )}
                      </div>
                      <button 
                        onClick={() => handleDeleteEvent(event.id, event.summary)}
                        className="opacity-0 group-hover:opacity-100 p-1.5 text-muted-foreground hover:text-red-500 rounded-lg hover:bg-red-500/10 transition-all self-center flex-shrink-0"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  );
                })
              )}
            </div>
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
                  <CalendarIcon className="w-4 h-4 text-primary" />
                  Add Event
                </h3>
                <button 
                  onClick={() => setShowAddModal(false)}
                  className="text-xs font-bold px-2 py-1 rounded bg-muted text-muted-foreground hover:bg-muted/80"
                >
                  Close
                </button>
              </div>

              <form onSubmit={handleCreateEvent} className="space-y-4">
                <div>
                  <Label className="text-xs font-bold">Event Summary</Label>
                  <Input 
                    type="text"
                    required
                    placeholder="Weekly Synced Brainstorm"
                    value={formData.summary}
                    onChange={(e) => setFormData(f => ({ ...f, summary: e.target.value }))}
                    className="rounded-xl text-xs mt-1 border-muted-foreground/30 focus-visible:ring-primary"
                  />
                </div>

                <div>
                  <Label className="text-xs font-bold">Location</Label>
                  <Input 
                    type="text"
                    placeholder="Google Meet, Office, or Remote URL"
                    value={formData.location}
                    onChange={(e) => setFormData(f => ({ ...f, location: e.target.value }))}
                    className="rounded-xl text-xs mt-1 border-muted-foreground/30"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <Label className="text-xs font-bold">Start date/time</Label>
                    <Input 
                      type="datetime-local"
                      required
                      value={formData.startTime}
                      onChange={(e) => setFormData(f => ({ ...f, startTime: e.target.value }))}
                      className="rounded-xl text-xs mt-1 border-muted-foreground/30"
                    />
                  </div>
                  <div>
                    <Label className="text-xs font-bold">End date/time</Label>
                    <Input 
                      type="datetime-local"
                      required
                      value={formData.endTime}
                      onChange={(e) => setFormData(f => ({ ...f, endTime: e.target.value }))}
                      className="rounded-xl text-xs mt-1 border-muted-foreground/30"
                    />
                  </div>
                </div>

                <div>
                  <Label className="text-xs font-bold">Meeting Notes / Description</Label>
                  <Textarea 
                    placeholder="Add meeting agenda, task sync notes or alerts"
                    value={formData.description}
                    onChange={(e) => setFormData(f => ({ ...f, description: e.target.value }))}
                    rows={3}
                    className="rounded-xl text-xs mt-1 border-muted-foreground/30"
                  />
                </div>

                <Button type="submit" disabled={isLoading} className="w-full rounded-xl font-bold h-11">
                  {isLoading ? "Saving..." : "Add to Google Calendar"}
                </Button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
