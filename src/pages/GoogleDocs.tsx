import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useGoogleAuth } from '@/lib/googleAuth';
import { googleApi } from '@/lib/googleApi';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { 
  FileText, 
  Plus, 
  KeyRound,
  Wrench,
  AlertTriangle,
  ExternalLink
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { toast } from 'react-hot-toast';

export default function GoogleDocs() {
  const { accessToken, connectGoogle, connectGoogleRedirect, isConnected, saveDeveloperToken, disconnectGoogle } = useGoogleAuth();
  
  const [isLoading, setIsLoading] = useState(false);
  const [apiError, setApiError] = useState<string | null>(null);
  const [devTokenInput, setDevTokenInput] = useState("");
  const [showDevTokenForm, setShowDevTokenForm] = useState(false);
  const [recentDocs, setRecentDocs] = useState<any[]>([]);

  // Form State
  const [showAddModal, setShowAddModal] = useState(false);
  const [docTitle, setDocTitle] = useState("");

  const handleCreateDoc = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!accessToken) return;
    if (!docTitle) {
      toast.error("Please fill in the Document Title");
      return;
    }

    try {
      setIsLoading(true);
      const res = await googleApi.docs.createDocument(accessToken, docTitle);

      if (res) {
        setShowAddModal(false);
        setDocTitle("");
        setRecentDocs(prev => [res, ...prev]);
        window.open(`https://docs.google.com/document/d/${res.documentId}/edit`, '_blank');
      }
    } catch (err: any) {
      toast.error(err.message || "Failed to create document");
    } finally {
      setIsLoading(false);
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
                Google Docs API has not been enabled or failed.
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
          <h1 className="text-2xl font-bold tracking-tight">Google Docs</h1>
          <p className="text-xs text-muted-foreground">Create and manage your Google Documents.</p>
        </div>

        <div className="flex items-center gap-2">
          {isConnected ? (
            <>
              <Button size="sm" className="rounded-xl flex items-center gap-1 bg-primary text-primary-foreground hover:bg-primary/90" onClick={() => setShowAddModal(true)}>
                <Plus className="w-4 h-4" />
                New Document
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
              <FileText className="w-5 h-5 text-primary" />
              <h2 className="text-base font-bold">Connect your Google Workspace Account</h2>
            </div>
            <p className="text-xs text-muted-foreground leading-relaxed mb-4">
              Authorize Google integration to safely create and edit Google Docs.
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
              <FileText className="w-4 h-4 text-primary" />
              Recently Created Docs
            </h3>
          </div>

          <div className="flex-1 space-y-2">
            {recentDocs.length === 0 ? (
              <div className="text-center py-12 text-muted-foreground">
                <p className="text-xs font-bold">No recent docs created</p>
                <p className="text-[10px] text-muted-foreground mt-1">Create a new document to see it here.</p>
                <Button size="sm" variant="outline" className="mt-4 rounded-xl" onClick={() => setShowAddModal(true)}>
                  Create Document
                </Button>
              </div>
            ) : (
              recentDocs.map((doc, idx) => (
                <div 
                  key={idx}
                  className="group relative p-4 border rounded-2xl transition-all flex items-center gap-4 bg-card border-border/80 hover:border-primary/30"
                >
                  <FileText className="w-6 h-6 text-blue-500" />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-bold truncate text-foreground">
                      {doc.title}
                    </p>
                  </div>
                  <a 
                    href={`https://docs.google.com/document/d/${doc.documentId}/edit`}
                    target="_blank"
                    rel="noreferrer"
                    className="p-2 text-muted-foreground hover:text-primary bg-muted/50 hover:bg-primary/10 rounded-xl transition-colors self-center flex-shrink-0"
                  >
                    <ExternalLink className="w-4 h-4" />
                  </a>
                </div>
              ))
            )}
          </div>
        </div>
      )}

      {/* Add Modal */}
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
                  <FileText className="w-4 h-4 text-primary" />
                  Create Google Doc
                </h3>
                <button 
                  onClick={() => setShowAddModal(false)}
                  className="text-xs font-bold px-2 py-1 rounded bg-muted text-muted-foreground hover:bg-muted/80"
                >
                  Close
                </button>
              </div>

              <form onSubmit={handleCreateDoc} className="space-y-4">
                <div>
                  <Label className="text-xs font-bold">Document Title</Label>
                  <Input 
                    type="text"
                    required
                    placeholder="E.g., Project Proposal"
                    value={docTitle}
                    onChange={(e) => setDocTitle(e.target.value)}
                    className="rounded-xl text-xs mt-1 border-muted-foreground/30 focus-visible:ring-primary"
                  />
                </div>

                <Button type="submit" disabled={isLoading} className="w-full rounded-xl font-bold h-11">
                  {isLoading ? "Creating..." : "Create Document"}
                </Button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
