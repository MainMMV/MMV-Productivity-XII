import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useGoogleAuth } from '@/lib/googleAuth';
import { googleApi, GoogleDriveFile } from '@/lib/googleApi';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { 
  Cloud, 
  Search,
  File, 
  KeyRound,
  RefreshCw,
  Wrench,
  AlertTriangle,
  ExternalLink,
  Download
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { toast } from 'react-hot-toast';

export default function GoogleDrive() {
  const { accessToken, connectGoogle, connectGoogleRedirect, isConnected, saveDeveloperToken, disconnectGoogle } = useGoogleAuth();
  const [files, setFiles] = useState<GoogleDriveFile[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  
  const [isLoading, setIsLoading] = useState(false);
  const [apiError, setApiError] = useState<string | null>(null);
  const [devTokenInput, setDevTokenInput] = useState("");
  const [showDevTokenForm, setShowDevTokenForm] = useState(false);

  useEffect(() => {
    if (accessToken) {
      loadFiles();
    }
  }, [accessToken]);

  const loadFiles = async (q: string = "") => {
    if (!accessToken) return;
    setIsLoading(true);
    setApiError(null);
    try {
      let query = "trashed = false";
      if (q) {
        query += ` and name contains '${q}'`;
      }
      const data = await googleApi.drive.listFiles(accessToken, query);
      setFiles(data);
    } catch (err: any) {
      console.error(err);
      setApiError(err.message || String(err));
    } finally {
      setIsLoading(false);
    }
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    loadFiles(searchQuery);
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
                Google Drive API has not been enabled or failed.
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
          <h1 className="text-2xl font-bold tracking-tight">Google Drive</h1>
          <p className="text-xs text-muted-foreground">Access and manage your Drive files directly.</p>
        </div>

        <div className="flex items-center gap-2">
          {isConnected ? (
            <>
              <Button size="sm" variant="outline" className="rounded-xl flex items-center gap-1" onClick={() => loadFiles(searchQuery)} disabled={isLoading}>
                <RefreshCw className={`w-3.5 h-3.5 ${isLoading ? "animate-spin" : ""}`} />
                Reload
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
              <Cloud className="w-5 h-5 text-primary" />
              <h2 className="text-base font-bold">Connect your Google Workspace Account</h2>
            </div>
            <p className="text-xs text-muted-foreground leading-relaxed mb-4">
              Authorize Google integration to access your Drive files.
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
          <form onSubmit={handleSearch} className="flex gap-2 mb-6">
            <Input 
              type="text"
              placeholder="Search Drive files..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="rounded-xl text-xs flex-1 bg-muted/50 border-border/50"
            />
            <Button type="submit" size="sm" className="rounded-xl bg-primary text-primary-foreground hover:bg-primary/90">
              <Search className="w-4 h-4 mr-1" /> Search
            </Button>
          </form>

          <div className="flex-1 space-y-2">
            {isLoading && files.length === 0 ? (
              <div className="flex items-center justify-center h-24">
                <div className="w-5 h-5 border-2 border-primary/20 border-t-primary rounded-full animate-spin" />
              </div>
            ) : files.length === 0 ? (
              <div className="text-center py-12 text-muted-foreground">
                <p className="text-xs font-bold">No files found</p>
                <p className="text-[10px] text-muted-foreground mt-1">Try a different search term.</p>
              </div>
            ) : (
              files.map(file => {
                return (
                  <div 
                    key={file.id}
                    className="group relative p-4 border rounded-2xl transition-all flex items-center gap-4 bg-card border-border/80 hover:border-primary/30"
                  >
                    <File className="w-6 h-6 text-blue-500" />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-bold truncate text-foreground">
                        {file.name}
                      </p>
                      <p className="text-xs text-muted-foreground mt-0.5 truncate">
                        {file.mimeType} {file.createdTime && `• ${new Date(file.createdTime).toLocaleDateString()}`}
                      </p>
                    </div>
                    {file.webViewLink && (
                      <a 
                        href={file.webViewLink}
                        target="_blank"
                        rel="noreferrer"
                        className="p-2 text-muted-foreground hover:text-primary bg-muted/50 hover:bg-primary/10 rounded-xl transition-colors self-center flex-shrink-0"
                      >
                        <ExternalLink className="w-4 h-4" />
                      </a>
                    )}
                  </div>
                );
              })
            )}
          </div>
        </div>
      )}
    </div>
  );
}
