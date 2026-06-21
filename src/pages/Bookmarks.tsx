import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Bookmark, Folder, Link as LinkIcon, Plus, MoreVertical, Trash2, Edit2, Download, Upload, FolderOpen, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { DragDropContext, Droppable, Draggable, DropResult } from '@hello-pangea/dnd';

type Account = { id: string; name: string };
type ItemType = 'bookmark' | 'folder';

export interface BookmarkItem {
  id: string;
  type: ItemType;
  name: string;
  description?: string;
  link?: string;
  parentId: string | null;
  accountId: string;
  order: number;
}

export default function Bookmarks() {
  const [accounts, setAccounts] = useState<Account[]>([{ id: 'default', name: 'Personal' }]);
  const [items, setItems] = useState<BookmarkItem[]>([]);
  const [activeAccountId, setActiveAccountId] = useState<string | 'all'>('all');
  const [currentFolderId, setCurrentFolderId] = useState<string | null>(null);

  const [isAddOpen, setIsAddOpen] = useState(false);
  const [isManageAccountsOpen, setIsManageAccountsOpen] = useState(false);
  const [addType, setAddType] = useState<ItemType>('bookmark');
  const [editItem, setEditItem] = useState<BookmarkItem | null>(null);

  const [formData, setFormData] = useState({ name: '', description: '', link: '' });

  useEffect(() => {
    const savedItems = localStorage.getItem('mmv_bookmarks');
    const savedAccounts = localStorage.getItem('mmv_accounts');
    if (savedItems) setItems(JSON.parse(savedItems));
    if (savedAccounts) setAccounts(JSON.parse(savedAccounts));
  }, []);

  useEffect(() => {
    localStorage.setItem('mmv_bookmarks', JSON.stringify(items));
    localStorage.setItem('mmv_accounts', JSON.stringify(accounts));
  }, [items, accounts]);

  const handleDragEnd = (result: DropResult) => {
    if (!result.destination) return;
    const sourceIdx = result.source.index;
    const destIdx = result.destination.index;
    
    const visibleItems = getVisibleItems();
    const newItemsList = Array.from(visibleItems);
    const [reorderedItem] = newItemsList.splice(sourceIdx, 1);
    newItemsList.splice(destIdx, 0, reorderedItem);

    // Update ordering
    const reorderedIds = newItemsList.map(i => i.id);
    setItems(items.map(item => {
      const idx = reorderedIds.indexOf(item.id);
      if (idx !== -1) {
        return { ...item, order: idx };
      }
      return item;
    }));
  };

  const getVisibleItems = () => {
    return items
      .filter(i => 
        (activeAccountId === 'all' || i.accountId === activeAccountId) && 
        i.parentId === currentFolderId
      )
      .sort((a, b) => a.order - b.order);
  };

  const handleDelete = (id: string) => {
    const itemsToDelete = [id];
    const itemsToCheck = [id];
    
    while(itemsToCheck.length > 0) {
      const parentId = itemsToCheck.pop();
      const children = items.filter(i => i.parentId === parentId);
      children.forEach(c => {
        itemsToDelete.push(c.id);
        if (c.type === 'folder') itemsToCheck.push(c.id);
      });
    }

    setItems(items.filter(i => !itemsToDelete.includes(i.id)));
  };

  const handleSave = () => {
    if (!formData.name) return;
    
    if (editItem) {
      setItems(items.map(i => i.id === editItem.id ? { ...i, ...formData } : i));
    } else {
      const newItem: BookmarkItem = {
        id: crypto.randomUUID(),
        type: addType,
        ...formData,
        parentId: currentFolderId,
        accountId: activeAccountId === 'all' ? accounts[0].id : activeAccountId,
        order: items.length
      };
      setItems([...items, newItem]);
    }
    closeModal();
  };

  const closeModal = () => {
    setIsAddOpen(false);
    setEditItem(null);
    setFormData({ name: '', description: '', link: '' });
  };

  const openEdit = (item: BookmarkItem) => {
    setEditItem(item);
    setAddType(item.type);
    setFormData({ name: item.name, description: item.description || '', link: item.link || '' });
    setIsAddOpen(true);
  };

  const handleExport = () => {
    const data = JSON.stringify({ accounts, items }, null, 2);
    const blob = new Blob([data], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `bookmarks_export_${new Date().toISOString()}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleImport = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const data = JSON.parse(event.target?.result as string);
        if (data.accounts) setAccounts(data.accounts);
        if (data.items) setItems(data.items);
      } catch (err) {
        alert("Invalid file format");
      }
    };
    reader.readAsText(file);
  };

  const visibleItems = getVisibleItems();

  return (
    <div className="px-4 py-6 max-w-5xl mx-auto pb-24 h-full flex flex-col">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-6 gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Bookmarks</h1>
          <p className="text-xs text-muted-foreground">Save, organize and export your web pages.</p>
        </div>
        
        <div className="flex items-center gap-2">
          <label className="cursor-pointer">
            <input type="file" className="hidden" accept=".json" onChange={handleImport} />
            <div className="flex flex-col items-center justify-center p-2 rounded-xl border border-border shadow-xs hover:bg-primary/5 transition-all text-xs font-semibold gap-1 text-muted-foreground">
              <Upload className="w-3.5 h-3.5" />
            </div>
          </label>
          <Button size="sm" variant="outline" className="rounded-xl" onClick={handleExport}>
            <Download className="w-3.5 h-3.5 mr-1" /> Export All
          </Button>
          <Button size="sm" onClick={() => { setAddType('folder'); setIsAddOpen(true); }} className="rounded-xl bg-violet-600 hover:bg-violet-700">
            <FolderOpen className="w-3.5 h-3.5 mr-1" /> New Folder
          </Button>
          <Button size="sm" onClick={() => { setAddType('bookmark'); setIsAddOpen(true); }} className="rounded-xl">
            <Plus className="w-3.5 h-3.5 mr-1" /> Add Bookmark
          </Button>
        </div>
      </div>

      <div className="flex gap-2 overflow-x-auto pb-2 mb-4 scrollbar-none items-center">
        <button
          onClick={() => { setActiveAccountId('all'); setCurrentFolderId(null); }}
          className={`px-3 py-1.5 rounded-full text-xs font-bold whitespace-nowrap transition-all ${
            activeAccountId === 'all' ? 'bg-primary text-primary-foreground shadow-sm' : 'bg-muted/50 text-muted-foreground hover:bg-muted'
          }`}
        >
          All Accounts
        </button>
        {accounts.map(acc => (
          <button
            key={acc.id}
            onClick={() => { setActiveAccountId(acc.id); setCurrentFolderId(null); }}
            className={`px-3 py-1.5 rounded-full text-xs font-bold whitespace-nowrap transition-all ${
              activeAccountId === acc.id ? 'bg-primary text-primary-foreground shadow-sm' : 'bg-muted/50 text-muted-foreground hover:bg-muted'
            }`}
          >
            {acc.name}
          </button>
        ))}
        <Button size="sm" variant="ghost" className="rounded-full h-7 px-2" onClick={() => {
          const name = prompt("Account Name:");
          if (name) setAccounts([...accounts, { id: crypto.randomUUID(), name }]);
        }}>
          <Plus className="w-3 h-3" />
        </Button>
        <Button size="sm" variant="ghost" className="rounded-full h-7 px-2 text-muted-foreground ml-auto flex-shrink-0" onClick={() => setIsManageAccountsOpen(true)}>
          Manage
        </Button>
      </div>

      {currentFolderId && (
        <div className="flex items-center gap-2 mb-4">
          <Button size="sm" variant="ghost" onClick={() => {
            const folder = items.find(i => i.id === currentFolderId);
            setCurrentFolderId(folder?.parentId || null);
          }} className="rounded-xl text-xs -ml-2">
            <ArrowLeft className="w-3.5 h-3.5 mr-1" /> Back
          </Button>
          <span className="text-sm font-semibold">
            {items.find(i => i.id === currentFolderId)?.name || 'Folder'}
          </span>
        </div>
      )}

      <div className="flex-1 bg-card border border-border shadow-sm rounded-3xl p-4 overflow-hidden flex flex-col">
        <DragDropContext onDragEnd={handleDragEnd}>
          <Droppable droppableId="bookmarks-list">
            {(provided) => (
              <div {...provided.droppableProps} ref={provided.innerRef} className="flex-1 overflow-y-auto space-y-2 pr-2">
                {visibleItems.length === 0 ? (
                  <div className="flex flex-col items-center justify-center h-40 text-muted-foreground">
                    <Bookmark className="w-8 h-8 mb-2 opacity-20" />
                    <p className="text-xs font-medium">No items found</p>
                  </div>
                ) : (
                  visibleItems.map((item, index) => (
                    <Draggable key={item.id} draggableId={item.id} index={index}>
                      {(provided) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          className="flex items-center justify-between p-3 bg-muted/30 border border-border/50 rounded-xl hover:bg-muted/50 transition-colors group"
                        >
                          <div className="flex items-center gap-3 overflow-hidden">
                            <div className="flex-shrink-0 w-8 h-8 rounded-lg bg-background border border-border flex items-center justify-center">
                              {item.type === 'folder' ? (
                                <FolderOpen className="w-4 h-4 text-violet-500" />
                              ) : (
                                item.link ? (
                                  <img 
                                    src={`https://www.google.com/s2/favicons?domain=${new URL(item.link || 'https://google.com').hostname}&sz=32`} 
                                    alt="favicon" 
                                    className="w-4 h-4 rounded-sm"
                                    onError={(e) => { e.currentTarget.style.display = 'none'; e.currentTarget.parentElement?.querySelector('svg')?.classList.remove('hidden'); }}
                                  />
                                ) : (
                                  <LinkIcon className="w-4 h-4 text-primary" />
                                )
                              )}
                              <LinkIcon className={`w-4 h-4 text-primary hidden ${item.type === 'bookmark' && !item.link ? '!block' : ''}`} />
                            </div>
                            
                            <div className="flex flex-col min-w-0" onClick={() => item.type === 'folder' && setCurrentFolderId(item.id)}>
                              <p className={`text-sm font-bold truncate ${item.type === 'folder' ? 'cursor-pointer hover:text-primary transition-colors' : ''}`}>
                                {item.type === 'bookmark' && item.link ? (
                                  <a href={item.link} target="_blank" rel="noopener noreferrer" className="hover:underline">{item.name}</a>
                                ) : item.name}
                              </p>
                              {item.description && <p className="text-[10px] text-muted-foreground truncate max-w-sm">{item.description}</p>}
                            </div>
                          </div>

                          <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button size="sm" variant="ghost" className="h-8 w-8 p-0 rounded-lg">
                                  <MoreVertical className="w-4 h-4" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end" className="w-40">
                                <DropdownMenuItem onClick={() => openEdit(item)}>
                                  <Edit2 className="w-3.5 h-3.5 mr-2" /> Edit
                                </DropdownMenuItem>
                                <DropdownMenuItem onClick={() => handleDelete(item.id)} className="text-red-500">
                                  <Trash2 className="w-3.5 h-3.5 mr-2" /> Delete
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </div>
                        </div>
                      )}
                    </Draggable>
                  ))
                )}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>
      </div>

      <Dialog open={isAddOpen} onOpenChange={closeModal}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>{editItem ? 'Edit' : 'Add'} {addType === 'folder' ? 'Folder' : 'Bookmark'}</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <label className="text-xs font-bold">Name</label>
              <Input 
                value={formData.name} 
                onChange={e => setFormData({...formData, name: e.target.value})} 
                placeholder={addType === 'folder' ? 'Work Projects' : 'My Cool Site'}
                className="rounded-xl"
              />
            </div>
            {addType === 'bookmark' && (
              <div className="grid gap-2">
                <label className="text-xs font-bold">Link (URL)</label>
                <Input 
                  value={formData.link} 
                  onChange={e => setFormData({...formData, link: e.target.value})} 
                  placeholder="https://example.com"
                  className="rounded-xl"
                />
              </div>
            )}
            <div className="grid gap-2">
              <label className="text-xs font-bold">Description (Optional)</label>
              <Input 
                value={formData.description} 
                onChange={e => setFormData({...formData, description: e.target.value})} 
                placeholder="A brief description..."
                className="rounded-xl"
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={closeModal} className="rounded-xl">Cancel</Button>
            <Button onClick={handleSave} className="rounded-xl">Save</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={isManageAccountsOpen} onOpenChange={setIsManageAccountsOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Manage Accounts</DialogTitle>
          </DialogHeader>
          <div className="grid gap-2 py-4 max-h-[300px] overflow-y-auto pr-2">
            {accounts.map((acc, index) => (
              <div key={acc.id} className="flex items-center gap-2 mb-2 bg-muted/30 p-2 rounded-xl border border-border">
                <Input 
                  value={acc.name} 
                  onChange={(e) => {
                    const newAccounts = [...accounts];
                    newAccounts[index].name = e.target.value;
                    setAccounts(newAccounts);
                  }}
                  className="rounded-lg h-8 text-xs font-bold bg-background"
                />
                <Button size="sm" variant="ghost" className="h-8 w-8 p-0 text-muted-foreground" onClick={() => {
                  if (index > 0) {
                    const newAccounts = [...accounts];
                    const temp = newAccounts[index - 1];
                    newAccounts[index - 1] = newAccounts[index];
                    newAccounts[index] = temp;
                    setAccounts(newAccounts);
                  }
                }} disabled={index === 0}>
                  ↑
                </Button>
                <Button size="sm" variant="ghost" className="h-8 w-8 p-0 text-muted-foreground" onClick={() => {
                  if (index < accounts.length - 1) {
                    const newAccounts = [...accounts];
                    const temp = newAccounts[index + 1];
                    newAccounts[index + 1] = newAccounts[index];
                    newAccounts[index] = temp;
                    setAccounts(newAccounts);
                  }
                }} disabled={index === accounts.length - 1}>
                  ↓
                </Button>
                <Button size="sm" variant="ghost" className="h-8 w-8 p-0 text-red-500 hover:bg-red-500/10" onClick={() => {
                  if (confirm("Delete this account and all its bookmarks?")) {
                    setAccounts(accounts.filter(a => a.id !== acc.id));
                    setItems(items.filter(i => i.accountId !== acc.id));
                    if (activeAccountId === acc.id) setActiveAccountId('all');
                  }
                }}>
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            ))}
          </div>
          <DialogFooter>
            <Button onClick={() => setIsManageAccountsOpen(false)} className="rounded-xl w-full">Done</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
