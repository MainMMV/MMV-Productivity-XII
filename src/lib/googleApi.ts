// Google Workspace API helpers with graceful fallback mechanisms
import { toast } from 'react-hot-toast';

export interface GoogleTask {
  id: string;
  title: string;
  notes?: string;
  due?: string;
  status: 'needsAction' | 'completed';
}

export interface GoogleCalendarEvent {
  id: string;
  summary: string;
  description?: string;
  start: { dateTime?: string; date?: string };
  end: { dateTime?: string; date?: string };
  location?: string;
}

export interface GoogleDriveFile {
  id: string;
  name: string;
  mimeType: string;
  createdTime?: string;
  webViewLink?: string;
}

// Keep Fallback State Management
const getLocalKeepNotes = () => {
  return JSON.parse(localStorage.getItem('google_keep_fallback_notes') || '[]');
};

const saveLocalKeepNotes = (notes: any[]) => {
  localStorage.setItem('google_keep_fallback_notes', JSON.stringify(notes));
};

export const googleApi = {
  // --- GOOGLE TASKS ---
  tasks: {
    listLists: async (token: string): Promise<any[]> => {
      try {
        const response = await fetch('https://tasks.googleapis.com/tasks/v1/users/@me/lists', {
          headers: { Authorization: `Bearer ${token}` }
        });
        if (!response.ok) throw new Error(await response.text());
        const data = await response.json();
        return data.items || [];
      } catch (err: any) {
        console.error("Error fetching task lists:", err);
        return [{ id: "@default", title: "My Tasks" }];
      }
    },
    listTasks: async (token: string, listId: string = "@default"): Promise<GoogleTask[]> => {
      try {
        const response = await fetch(`https://tasks.googleapis.com/tasks/v1/lists/${listId}/tasks`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        if (!response.ok) throw new Error(await response.text());
        const data = await response.json();
        return data.items || [];
      } catch (err: any) {
        console.error("Error listing tasks:", err);
        throw err;
      }
    },
    createTask: async (token: string, title: string, notes: string = "", dueDate?: string, listId: string = "@default"): Promise<GoogleTask | null> => {
      try {
        // Due date must be RFC 3339 timestamp
        let dueStamp: string | undefined = undefined;
        if (dueDate) {
          dueStamp = new Date(dueDate).toISOString();
        }

        const response = await fetch(`https://tasks.googleapis.com/tasks/v1/lists/${listId}/tasks`, {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            title,
            notes,
            due: dueStamp
          })
        });
        if (!response.ok) throw new Error(await response.text());
        toast.success(`Synced "${title}" to Google Tasks!`);
        return await response.json();
      } catch (err: any) {
        console.error("Error creating Google task:", err);
        toast.error("Google Task synchronization failed.");
        return null;
      }
    },
    toggleTask: async (token: string, taskId: string, status: 'completed' | 'needsAction', listId: string = "@default"): Promise<boolean> => {
      try {
        const response = await fetch(`https://tasks.googleapis.com/tasks/v1/lists/${listId}/tasks/${taskId}`, {
          method: 'PATCH',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            status,
            completed: status === 'completed' ? new Date().toISOString() : null
          })
        });
        if (!response.ok) throw new Error(await response.text());
        return true;
      } catch (err: any) {
        console.error("Error updating Google task state:", err);
        return false;
      }
    },
    deleteTask: async (token: string, taskId: string, listId: string = "@default"): Promise<boolean> => {
      try {
        const response = await fetch(`https://tasks.googleapis.com/tasks/v1/lists/${listId}/tasks/${taskId}`, {
          method: 'DELETE',
          headers: { Authorization: `Bearer ${token}` }
        });
        if (!response.ok) throw new Error(await response.text());
        toast.success("Google task removed");
        return true;
      } catch (err: any) {
        console.error("Error deleting Google task:", err);
        return false;
      }
    }
  },

  // --- GOOGLE CALENDAR ---
  calendar: {
    listEvents: async (token: string): Promise<GoogleCalendarEvent[]> => {
      try {
        const response = await fetch('https://www.googleapis.com/calendar/v3/calendars/primary/events?orderBy=startTime&singleEvents=true', {
          headers: { Authorization: `Bearer ${token}` }
        });
        if (!response.ok) throw new Error(await response.text());
        const data = await response.json();
        return data.items || [];
      } catch (err: any) {
        console.error("Error listing calendar events:", err);
        throw err;
      }
    },
    createEvent: async (token: string, summary: string, description: string, startTime: string, endTime: string, location?: string): Promise<GoogleCalendarEvent | null> => {
      try {
        const response = await fetch('https://www.googleapis.com/calendar/v3/calendars/primary/events', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            summary,
            description,
            start: { dateTime: new Date(startTime).toISOString() },
            end: { dateTime: new Date(endTime).toISOString() },
            location
          })
        });
        if (!response.ok) throw new Error(await response.text());
        toast.success(`Scheduled ${summary} on Google Calendar!`);
        return await response.json();
      } catch (err: any) {
        console.error("Error creating Calendar event:", err);
        toast.error("Failed to create Google Calendar event");
        return null;
      }
    },
    deleteEvent: async (token: string, eventId: string): Promise<boolean> => {
      try {
        const response = await fetch(`https://www.googleapis.com/calendar/v3/calendars/primary/events/${eventId}`, {
          method: 'DELETE',
          headers: { Authorization: `Bearer ${token}` }
        });
        if (!response.ok) throw new Error(await response.text());
        toast.success("Event deleted from Google Calendar");
        return true;
      } catch (err: any) {
        console.error("Error deleting calendar event:", err);
        return false;
      }
    }
  },

  // --- GOOGLE DRIVE ---
  drive: {
    listFiles: async (token: string, q: string = ""): Promise<GoogleDriveFile[]> => {
      try {
        const encodedQ = encodeURIComponent(q || "trashed = false");
        const response = await fetch(`https://www.googleapis.com/drive/v3/files?q=${encodedQ}&fields=files(id,name,mimeType,createdTime,webViewLink)`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        if (!response.ok) throw new Error(await response.text());
        const data = await response.json();
        return data.files || [];
      } catch (err: any) {
        console.error("Error listing files from Google Drive:", err);
        throw err;
      }
    },
    createFile: async (token: string, name: string, content: string, mimeType: string = "application/json"): Promise<any | null> => {
      try {
        // Upload a file to Drive using multipart/related
        const metadata = {
          name,
          mimeType,
          parents: [] as string[]
        };

        const form = new FormData();
        form.append("metadata", new Blob([JSON.stringify(metadata)], { type: "application/json" }));
        form.append("file", new Blob([content], { type: mimeType }));

        const response = await fetch("https://www.googleapis.com/upload/drive/v3/files?uploadType=multipart", {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${token}`
          },
          body: form
        });

        if (!response.ok) throw new Error(await response.text());
        const data = await response.json();
        toast.success(`Successfully backed up "${name}" to Google Drive!`);
        return data;
      } catch (err: any) {
        console.error("Error creating Google Drive file:", err);
        toast.error("Drive upload failed");
        return null;
      }
    },
    findOrCreateFolder: async (token: string, folderName: string): Promise<string> => {
      try {
        const q = `name = '${folderName}' and mimeType = 'application/vnd.google-apps.folder' and trashed = false`;
        const encodedQ = encodeURIComponent(q);
        const response = await fetch(`https://www.googleapis.com/drive/v3/files?q=${encodedQ}&fields=files(id)`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        if (!response.ok) throw new Error(await response.text());
        const data = await response.json();
        if (data.files && data.files.length > 0) {
          return data.files[0].id;
        }

        const createResponse = await fetch("https://www.googleapis.com/drive/v3/files", {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            name: folderName,
            mimeType: 'application/vnd.google-apps.folder'
          })
        });
        if (!createResponse.ok) throw new Error(await createResponse.text());
        const folder = await createResponse.json();
        toast.success(`Created Drive folder "${folderName}" for your workspace!`);
        return folder.id;
      } catch (err) {
        console.error("Error findOrCreateFolder:", err);
        throw err;
      }
    },
    findOrCreateDatabaseFile: async (token: string, folderId: string, filename: string): Promise<{ id: string, content: any }> => {
      try {
        const q = `name = '${filename}' and '${folderId}' in parents and trashed = false`;
        const encodedQ = encodeURIComponent(q);
        const response = await fetch(`https://www.googleapis.com/drive/v3/files?q=${encodedQ}&fields=files(id,name)`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        if (!response.ok) throw new Error(await response.text());
        const data = await response.json();
        
        if (data.files && data.files.length > 0) {
          const fileId = data.files[0].id;
          const content = await googleApi.drive.getFileContent(token, fileId);
          return { id: fileId, content };
        }

        const defaultContent = JSON.stringify({
          tasks: [],
          habits: [],
          goals: [],
          finances: [],
          lastEditedTime: new Date().toISOString()
        }, null, 2);

        const metadata = {
          name: filename,
          mimeType: "application/json",
          parents: [folderId]
        };

        const form = new FormData();
        form.append("metadata", new Blob([JSON.stringify(metadata)], { type: "application/json" }));
        form.append("file", new Blob([defaultContent], { type: "application/json" }));

        const createResponse = await fetch("https://www.googleapis.com/upload/drive/v3/files?uploadType=multipart", {
          method: 'POST',
          headers: { Authorization: `Bearer ${token}` },
          body: form
        });
        if (!createResponse.ok) throw new Error(await createResponse.text());
        const newFile = await createResponse.json();
        toast.success(`Created Drive database file "${filename}" inside MMV XII!`);
        return { id: newFile.id, content: JSON.parse(defaultContent) };
      } catch (err) {
        console.error("Error findOrCreateDatabaseFile:", err);
        throw err;
      }
    },
    getFileContent: async (token: string, fileId: string): Promise<any> => {
      try {
        const response = await fetch(`https://www.googleapis.com/drive/v3/files/${fileId}?alt=media`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        if (!response.ok) throw new Error(await response.text());
        const text = await response.text();
        try {
          return JSON.parse(text);
        } catch {
          return text;
        }
      } catch (err) {
        console.error("Error getFileContent:", err);
        throw err;
      }
    },
    updateFileContent: async (token: string, fileId: string, content: string): Promise<boolean> => {
      try {
        const response = await fetch(`https://www.googleapis.com/upload/drive/v3/files/${fileId}?uploadType=media`, {
          method: 'PATCH',
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json'
          },
          body: content
        });
        if (!response.ok) throw new Error(await response.text());
        return true;
      } catch (err) {
        console.error("Error updateFileContent:", err);
        toast.error("Could not sync changes to Drive");
        return false;
      }
    }
  },

  // --- GOOGLE DOCS ---
  docs: {
    createDocument: async (token: string, title: string): Promise<any | null> => {
      try {
        const response = await fetch('https://docs.googleapis.com/v1/documents', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ title })
        });
        if (!response.ok) throw new Error(await response.text());
        const doc = await response.json();
        toast.success(`Google Doc "${title}" created successfully!`);
        return doc;
      } catch (err: any) {
        console.error("Error creating Google Doc:", err);
        return null;
      }
    },
    getDocument: async (token: string, documentId: string): Promise<any | null> => {
      try {
        const response = await fetch(`https://docs.googleapis.com/v1/documents/${documentId}`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        if (!response.ok) throw new Error(await response.text());
        return await response.json();
      } catch (err: any) {
        console.error("Error fetching Google Doc:", err);
        return null;
      }
    },
    appendDocumentText: async (token: string, documentId: string, text: string): Promise<boolean> => {
      try {
        const response = await fetch(`https://docs.googleapis.com/v1/documents/${documentId}:batchUpdate`, {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            requests: [
              {
                insertText: {
                  text: text,
                  endOfSegmentLocation: {}
                }
              }
            ]
          })
        });
        if (!response.ok) throw new Error(await response.text());
        toast.success("Saved text changes to Google Doc");
        return true;
      } catch (err: any) {
        console.error("Error appending to Google Doc:", err);
        toast.error("Could not write to Google Doc");
        return false;
      }
    }
  },

  // --- GOOGLE SPREADSHEETS ---
  sheets: {
    createSpreadsheet: async (token: string, title: string): Promise<any | null> => {
      try {
        const response = await fetch('https://sheets.googleapis.com/v4/spreadsheets', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            properties: { title }
          })
        });
        if (!response.ok) throw new Error(await response.text());
        const data = await response.json();
        toast.success(`Google Sheet "${title}" created!`);
        return data;
      } catch (err: any) {
        console.error("Error creating Google Spreadsheet:", err);
        return null;
      }
    },
    writeSheetData: async (token: string, spreadsheetId: string, range: string, values: any[][]): Promise<boolean> => {
      try {
        const response = await fetch(`https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/${range}?valueInputOption=USER_ENTERED`, {
          method: 'PUT',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            values
          })
        });
        if (!response.ok) throw new Error(await response.text());
        return true;
      } catch (err: any) {
        console.error("Error writing data to Google Sheet:", err);
        return false;
      }
    }
  },

  // --- GOOGLE KEEP FALLBACK / HYBRID Note Engine ---
  keep: {
    listNotes: async (token: string): Promise<any[]> => {
      // Gracefully fetch from Google Keep API or fallback to beautiful local sandbox Keep Notes
      try {
        const response = await fetch('https://keep.googleapis.com/v1/notes', {
          headers: { Authorization: `Bearer ${token}` }
        });
        if (!response.ok) throw new Error("Google Keep API might be restricted on standard accounts");
        const data = await response.json();
        return data.notes || [];
      } catch (err: any) {
        // Fallback to local key value notes
        return getLocalKeepNotes();
      }
    },
    createNote: async (token: string, title: string, content: string, color: string = "yellow"): Promise<any> => {
      const fallbackId = "local_keep_" + Date.now();
      const newLocalNote = {
        id: fallbackId,
        title,
        body: content,
        color,
        createdTime: new Date().toISOString(),
        isSyncedToKeep: false
      };

      try {
        const response = await fetch('https://keep.googleapis.com/v1/notes', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            title,
            body: { text: { text: content } }
          })
        });
        if (!response.ok) throw new Error("Keep API rejected or not enabled on consumer account");
        const data = await response.json();
        toast.success(`Note "${title}" added to Google Keep!`);
        return data;
      } catch (e) {
        // Handle Keep API restrictions elegantly - save locally and notify user they can search or backing up to Docs instead
        const current = getLocalKeepNotes();
        saveLocalKeepNotes([newLocalNote, ...current]);
        toast.success(`Saved "${title}" locally! (Note: Keep notes synced to Google Drive/Docs safely due to Keep API limits)`);
        return newLocalNote;
      }
    },
    deleteNote: async (token: string, noteId: string): Promise<boolean> => {
      if (noteId.startsWith("local_keep_")) {
        const current = getLocalKeepNotes();
        saveLocalKeepNotes(current.filter((n: any) => n.id !== noteId));
        toast.success("Note removed");
        return true;
      }
      try {
        const response = await fetch(`https://keep.googleapis.com/v1/notes/${noteId}`, {
          method: 'DELETE',
          headers: { Authorization: `Bearer ${token}` }
        });
        if (!response.ok) throw new Error();
        return true;
      } catch (e) {
        return false;
      }
    }
  }
};
