import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useGoogleAuth } from '@/lib/googleAuth';
import { googleApi, GoogleDriveFile } from '@/lib/googleApi';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { 
  FileText, 
  Lightbulb, 
  Plus, 
  Trash2, 
  Sparkles, 
  Search, 
  ChevronRight, 
  Check, 
  Pin,
  RefreshCw,
  FolderOpen,
  ArrowRight,
  AlertTriangle,
  Wrench,
  ExternalLink
} from 'lucide-react';
import { toast } from 'react-hot-toast';

export default function GoogleNotes() {
  const { accessToken, connectGoogle, isConnected } = useGoogleAuth();
  
  // General State
  const [activeTab, setActiveTab] = useState<'docs' | 'keep'>('docs');
  const [isLoading, setIsLoading] = useState(false);
  const [apiError, setApiError] = useState<string | null>(null);

  // Google Docs state
  const [docsList, setDocsList] = useState<GoogleDriveFile[]>([]);
  const [searchDocQuery, setSearchDocQuery] = useState("");
  const [newDocTitle, setNewDocTitle] = useState("");
  
  // Active Doc editor state
  const [selectedDocId, setSelectedDocId] = useState<string | null>(null);
  const [selectedDocTitle, setSelectedDocTitle] = useState("");
  const [docContent, setDocContent] = useState<string>("");
  const [appendText, setAppendText] = useState("");

  // Google Keep virtual stickies state
  const [keepNotes, setKeepNotes] = useState<any[]>([]);
  const [newStickyTitle, setNewStickyTitle] = useState("");
  const [newStickyBody, setNewStickyBody] = useState("");
  const [selectedColor, setSelectedColor] = useState("yellow");

  const colors = [
    { name: "yellow", class: "bg-amber-100 dark:bg-amber-950/40 text-amber-900 dark:text-amber-100 border-amber-300 dark:border-amber-900/60" },
    { name: "green", class: "bg-emerald-100 dark:bg-emerald-950/40 text-emerald-900 dark:text-emerald-100 border-emerald-300 dark:border-emerald-900/60" },
    { name: "pink", class: "bg-rose-100 dark:bg-rose-950/40 text-rose-900 dark:text-rose-100 border-rose-300 dark:border-rose-900/60" },
    { name: "blue", class: "bg-sky-100 dark:bg-sky-950/40 text-sky-900 dark:text-sky-100 border-sky-300 dark:border-sky-900/60" },
    { name: "purple", class: "bg-violet-100 dark:bg-violet-950/40 text-violet-900 dark:text-violet-100 border-violet-300 dark:border-violet-900/60" }
  ];

  useEffect(() => {
    if (accessToken) {
      if (activeTab === 'docs') {
        fetchDocs();
      } else {
        fetchKeepNotes();
      }
    }
  }, [accessToken, activeTab]);

  // --- GOOGLE DOCS LOGIC ---
  const fetchDocs = async () => {
    if (!accessToken) return;
    setIsLoading(true);
    setApiError(null);
    try {
      // Query Google Drive for docs only
      const docs = await googleApi.drive.listFiles(accessToken, "mimeType = 'application/vnd.google-apps.document' and trashed = false");
      setDocsList(docs);
    } catch (err: any) {
      console.error(err);
      setApiError(err.message || String(err));
    } finally {
      setIsLoading(false);
    }
  };

  const handleCreateDoc = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!accessToken || !newDocTitle.trim()) return;

    try {
      setIsLoading(true);
      const doc = await googleApi.docs.createDocument(accessToken, newDocTitle.trim());
      if (doc) {
        setNewDocTitle("");
        fetchDocs();
        // Automatically open the brand new doc in editor
        handleSelectDoc(doc.documentId, doc.title);
      }
    } catch (e) {
      toast.error("Failed to create document");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSelectDoc = async (docId: string, title: string) => {
    setSelectedDocId(docId);
    setSelectedDocTitle(title);
    setAppendText("");
    setDocContent("");

    if (!accessToken) return;
    try {
      const doc = await googleApi.docs.getDocument(accessToken, docId);
      if (doc) {
        // Simple extraction of paragraph texts
        let bodyText = "";
        const bodyContent = doc.body?.content || [];
        bodyContent.forEach((el: any) => {
          if (el.paragraph) {
            const elements = el.paragraph.elements || [];
            elements.forEach((subEl: any) => {
              if (subEl.textRun) {
                bodyText += subEl.textRun.content;
              }
            });
          }
        });
        setDocContent(bodyText || "(Empty Document - Write something below!)");
      }
    } catch (err) {
      toast.error("Could not fetch document body text");
    }
  };

  const handleAppendText = async () => {
    if (!accessToken || !selectedDocId || !appendText.trim()) return;
    try {
      setIsLoading(true);
      const ok = await googleApi.docs.appendDocumentText(accessToken, selectedDocId, appendText + "\n");
      if (ok) {
        setAppendText("");
        // Reload document text to guarantee live updating
        handleSelectDoc(selectedDocId, selectedDocTitle);
      }
    } catch (e) {
      toast.error("Error updating text");
    } finally {
      setIsLoading(false);
    }
  };

  // --- GOOGLE KEEP FALLBACK STICKIES LOGIC ---
  const fetchKeepNotes = async () => {
    if (!accessToken) return;
    setIsLoading(true);
    setApiError(null);
    try {
      const notes = await googleApi.keep.listNotes(accessToken);
      setKeepNotes(notes);
    } catch (err: any) {
      console.error(err);
      setApiError(err.message || String(err));
    } finally {
      setIsLoading(false);
    }
  };

  const handleCreateSticky = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newStickyTitle.trim() || !newStickyBody.trim()) {
      toast.error("Please add a title and description for the note card");
      return;
    }

    if (!accessToken) return;
    try {
      setIsLoading(true);
      const res = await googleApi.keep.createNote(accessToken, newStickyTitle.trim(), newStickyBody.trim(), selectedColor);
      if (res) {
        setNewStickyTitle("");
        setNewStickyBody("");
        fetchKeepNotes();
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteSticky = async (noteId: string, title: string) => {
    if (!accessToken) return;

    // STRICT REQUIREMENT: Explicit user verification before mutation/delete
    const ok = window.confirm(`Permanently delete sticky note "${title}"?`);
    if (!ok) return;

    try {
      setIsLoading(true);
      const del = await googleApi.keep.deleteNote(accessToken, noteId);
      if (del) {
        setKeepNotes(prev => prev.filter(n => n.id !== noteId));
      }
    } catch (e) {
      toast.error("Delete failed");
    } finally {
      setIsLoading(false);
    }
  };

  const filteredDocs = docsList.filter(doc => 
    doc.name.toLowerCase().includes(searchDocQuery.toLowerCase())
  );

  return (
    <div className="px-4 pt-6 pb-24 max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-6 gap-4 border-b border-border/60 pb-5">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Docs & Notes</h1>
          <p className="text-xs text-muted-foreground">Manage Google Docs and Keep notes.</p>
        </div>

        {/* Tab Selector */}
        <div className="flex bg-muted p-1 rounded-2xl border border-border">
          <button 
            onClick={() => setActiveTab('docs')}
            className={`px-4 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
              activeTab === 'docs' 
                ? 'bg-card text-foreground shadow-xs' 
                : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            <FileText className="w-3.5 h-3.5" />
            Google Docs
          </button>
          <button 
            onClick={() => setActiveTab('keep')}
            className={`px-4 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
              activeTab === 'keep' 
                ? 'bg-card text-foreground shadow-xs' 
                : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            <Lightbulb className="w-3.5 h-3.5" />
            Keep Notes
          </button>
        </div>
      </div>

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
                Google Drive or Google Docs APIs have not been enabled in your default Google Cloud project (<span className="font-mono font-bold text-foreground">mmv-xii</span>). List operation failed.
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

      {!isConnected ? (
        <div className="bg-card border border-border rounded-3xl p-8 text-center max-w-md mx-auto">
          <FolderOpen className="w-12 h-12 text-primary/40 mx-auto mb-4" />
          <h3 className="text-base font-bold mb-2">Connect Google Account</h3>
          <p className="text-xs text-muted-foreground mb-4">
            Connect your Google Cloud profile in the Calendar or Settings screen to access real-time documents and notes.
          </p>
          <Button onClick={connectGoogle} className="w-full rounded-xl font-bold">
            Connect Google Account
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* TAB 1: GOOGLE DOCS */}
          {activeTab === 'docs' && (
            <>
              {/* Document Browser Sidebar */}
              <div className="space-y-4">
                <div className="bg-card border border-border rounded-3xl p-4 shadow-xs">
                  <h3 className="text-xs font-black uppercase tracking-widest text-muted-foreground mb-3 flex items-center gap-1.5">
                    <Plus className="w-4 h-4 text-primary" />
                    New Document
                  </h3>
                  <form onSubmit={handleCreateDoc} className="space-y-3">
                    <Input 
                      placeholder="Doc name..."
                      value={newDocTitle}
                      onChange={(e) => setNewDocTitle(e.target.value)}
                      className="rounded-xl text-xs border-muted-foreground/20"
                    />
                    <Button type="submit" disabled={isLoading} className="w-full text-xs font-bold rounded-xl h-9">
                      Create
                    </Button>
                  </form>
                </div>

                <div className="bg-card border border-border rounded-3xl p-4 shadow-xs flex flex-col min-h-[300px]">
                  <h3 className="text-xs font-black uppercase tracking-widest text-muted-foreground mb-3 flex items-center justify-between">
                    <span>Documents List ({docsList.length})</span>
                    <button onClick={fetchDocs} className="text-primary hover:underline flex items-center gap-0.5 text-[9px] uppercase">
                      <RefreshCw className="w-2.5 h-2.5" /> Reload
                    </button>
                  </h3>

                  <div className="relative mb-3 flex-shrink-0">
                    <Search className="absolute left-3 top-2.5 h-3.5 w-3.5 text-muted-foreground" />
                    <Input 
                      placeholder="Search items..."
                      value={searchDocQuery}
                      onChange={(e) => setSearchDocQuery(e.target.value)}
                      className="pl-8 rounded-xl text-xs h-9 border-muted-foreground/20"
                    />
                  </div>

                  <div className="flex-1 overflow-y-auto space-y-1.5 max-h-[320px] pr-1">
                    {isLoading && docsList.length === 0 ? (
                      <div className="flex justify-center py-6">
                        <div className="w-5 h-5 border-2 border-primary/20 border-t-primary rounded-full animate-spin" />
                      </div>
                    ) : filteredDocs.length === 0 ? (
                      <p className="text-[11px] text-muted-foreground text-center py-8">None found. Add your first cloud document!</p>
                    ) : (
                      filteredDocs.map(doc => (
                        <button
                          key={doc.id}
                          onClick={() => handleSelectDoc(doc.id, doc.name)}
                          className={`w-full text-left p-2.5 rounded-xl border transition-all text-xs flex items-center justify-between gap-1.5 ${
                            selectedDocId === doc.id 
                              ? 'bg-primary/10 text-primary border-primary/20 font-bold' 
                              : 'bg-muted/10 border-border/80 hover:bg-muted/30 text-card-foreground'
                          }`}
                        >
                          <span className="truncate flex-1">{doc.name}</span>
                          <ChevronRight className={`w-3.5 h-3.5 opacity-60 flex-shrink-0 transition-transform ${selectedDocId === doc.id ? 'translate-x-0.5' : ''}`} />
                        </button>
                      ))
                    )}
                  </div>
                </div>
              </div>

              {/* Rich Doc Text Edit Panel */}
              <div className="lg:col-span-2 bg-card border border-border rounded-3xl p-5 shadow-xs flex flex-col min-h-[450px]">
                {selectedDocId ? (
                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center justify-between border-b pb-3 mb-4">
                        <div className="flex items-center gap-2">
                          <FileText className="w-5 h-5 text-primary" />
                          <h2 className="text-sm font-extrabold">{selectedDocTitle}</h2>
                        </div>
                        <span className="px-2 py-0.5 rounded bg-muted text-[9px] font-bold text-muted-foreground">Google Cloud Docs</span>
                      </div>

                      {/* Doc Content Display box */}
                      <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground mb-2">Document Preview</p>
                      <div className="p-4 bg-muted/20 border border-border/80 rounded-2xl max-h-[200px] overflow-y-auto text-xs font-serif leading-relaxed whitespace-pre-wrap mb-4 text-foreground/80">
                        {docContent || "(Fetching content...)"}
                      </div>

                      {/* Batch Append Text Block */}
                      <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground mb-1">Append Text</p>
                      <Textarea 
                        placeholder="Add to document..."
                        value={appendText}
                        onChange={(e) => setAppendText(e.target.value)}
                        rows={4}
                        className="rounded-xl text-xs border-muted-foreground/30 font-sans"
                      />
                    </div>

                    <div className="flex justify-end gap-2 mt-4 pt-3 border-t">
                      <Button variant="outline" size="sm" onClick={() => setSelectedDocId(null)} className="rounded-xl text-xs font-semibold">
                        Close
                      </Button>
                      <Button size="sm" disabled={isLoading || !appendText.trim()} onClick={handleAppendText} className="rounded-xl text-xs font-bold">
                        {isLoading ? "Saving..." : "Append"}
                      </Button>
                    </div>
                  </div>
                ) : (
                  <div className="flex-1 flex flex-col items-center justify-center text-center py-16 text-muted-foreground">
                    <FileText className="w-12 h-12 text-primary/30 mb-3" />
                    <p className="text-xs font-black uppercase tracking-wider text-card-foreground">Select a Google Doc</p>
                    <p className="text-[10px] text-muted-foreground mt-1 max-w-sm">
                      Open a document from the left browser sidebar to pull down live content and use the inline editor.
                    </p>
                  </div>
                )}
              </div>
            </>
          )}

          {/* TAB 2: GOOGLE KEEP STICKIES */}
          {activeTab === 'keep' && (
            <>
              {/* Note Create section */}
              <div className="bg-card border border-border rounded-3xl p-5 shadow-xs">
                <h3 className="text-xs font-black uppercase tracking-widest text-muted-foreground mb-4 flex items-center gap-1.5">
                  <Lightbulb className="w-4 h-4 text-primary animate-pulse" />
                  Pin New Sticky note
                </h3>
                
                <form onSubmit={handleCreateSticky} className="space-y-4">
                  <div>
                    <Label className="text-xs font-bold">Title</Label>
                    <Input 
                      required
                      placeholder="e.g., Finance Checklist"
                      value={newStickyTitle}
                      onChange={(e) => setNewStickyTitle(e.target.value)}
                      className="rounded-xl text-xs mt-1 border-muted-foreground/20"
                    />
                  </div>

                  <div>
                    <Label className="text-xs font-bold">Body Content</Label>
                    <Textarea 
                      required
                      placeholder="e.g., 1. Check salary deposit\n2. Backup transactions to Sheets\n3. Mark goals completed."
                      value={newStickyBody}
                      onChange={(e) => setNewStickyBody(e.target.value)}
                      rows={5}
                      className="rounded-xl text-xs mt-1 border-muted-foreground/20"
                    />
                  </div>

                  <div>
                    <Label className="text-xs font-bold block mb-1.5">Background Theme</Label>
                    <div className="flex gap-2">
                      {colors.map(col => (
                        <button
                          key={col.name}
                          type="button"
                          onClick={() => setSelectedColor(col.name)}
                          className={`w-6 h-6 rounded-full border-2 transition-all relative ${col.class.split(' ')[0]} ${
                            selectedColor === col.name ? 'border-primary ring-2 ring-primary/40' : 'border-transparent'
                          }`}
                          title={`Color ${col.name}`}
                        >
                          {selectedColor === col.name && (
                            <Check className="w-3 h-3 text-current absolute inset-0 m-auto" />
                          )}
                        </button>
                      ))}
                    </div>
                  </div>

                  <Button type="submit" disabled={isLoading} className="w-full rounded-xl font-bold h-10 mt-3 flex items-center justify-center gap-1.5">
                    <Plus className="w-4 h-4" />
                    Pin Sticky Note
                  </Button>
                </form>
              </div>

              {/* Keep Grid Display */}
              <div className="lg:col-span-2 space-y-4">
                <div className="flex items-center justify-between border-b pb-2 mb-2">
                  <h3 className="text-xs font-black uppercase tracking-widest text-muted-foreground">Keep Pin Board</h3>
                  <button onClick={fetchKeepNotes} className="text-primary hover:underline flex items-center gap-0.5 text-[9px] uppercase font-bold">
                    <RefreshCw className="w-2.5 h-2.5" /> Refresh Board
                  </button>
                </div>

                {isLoading && keepNotes.length === 0 ? (
                  <div className="flex justify-center py-12">
                    <div className="w-6 h-6 border-2 border-primary/20 border-t-primary rounded-full animate-spin" />
                  </div>
                ) : keepNotes.length === 0 ? (
                  <div className="text-center py-16 bg-muted/10 border border-dashed rounded-3xl text-muted-foreground">
                    <Lightbulb className="w-10 h-10 text-muted-foreground/30 mx-auto mb-2" />
                    <p className="text-xs font-bold text-card-foreground/80">Sticky pin board is empty</p>
                    <p className="text-[10px] mt-1 text-muted-foreground">Scribble down reminders or sudden budget ideas!</p>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {keepNotes.map(note => {
                      const colorMatch = colors.find(c => c.name === note.color) || colors[0];
                      const bodyStr = typeof note.body === 'string' ? note.body : (note.body?.text?.text || note.body?.text || "");

                      return (
                        <div 
                          key={note.id}
                          className={`p-4 border rounded-2xl flex flex-col justify-between shadow-xs transition-transform hover:-translate-y-0.5 relative group ${colorMatch.class}`}
                        >
                          <div>
                            <div className="flex items-center justify-between gap-1.5 mb-2.5">
                              <h4 className="text-xs font-extrabold truncate pr-6">{note.title}</h4>
                              <Pin className="w-3 h-3 text-muted-foreground/60 flex-shrink-0" />
                            </div>
                            <p className="text-xs font-medium leading-relaxed whitespace-pre-wrap break-words">{bodyStr}</p>
                          </div>

                          <div className="flex items-center justify-between mt-4 pt-2.5 border-t border-black/5 dark:border-white/5">
                            <span className="text-[8px] font-extrabold tracking-wider uppercase opacity-60">
                              {note.isSyncedToKeep === false ? "Local Keep-Backup" : "Linked with Keep"}
                            </span>
                            <button 
                              onClick={() => handleDeleteSticky(note.id, note.title)}
                              className="p-1 rounded-md text-red-700 dark:text-red-300 hover:bg-black/5 dark:hover:bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity"
                              title="Delete note"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            </>
          )}

        </div>
      )}
    </div>
  );
}
