import { useState, useEffect } from "react";
import { DragDropContext, Droppable, Draggable, DropResult } from "@hello-pangea/dnd";
import { motion } from "framer-motion";
import { Check, Edit2, Trash2, RepeatIcon, Bell, MoreHorizontal } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { base44 } from "@/api/base44Client";

const PRIORITY_COLORS: Record<string, string> = { 
  low: "bg-emerald-100 text-emerald-700", 
  medium: "bg-yellow-100 text-yellow-700", 
  high: "bg-red-100 text-red-700" 
};

interface KanbanBoardProps {
  tasks: any[];
  onEdit: (task: any) => void;
  onRefresh: () => void;
}

export default function KanbanBoard({ tasks, onEdit, onRefresh }: KanbanBoardProps) {
  const [columns, setColumns] = useState<Record<string, any[]>>({
    todo: [],
    in_progress: [],
    done: []
  });

  useEffect(() => {
    setColumns({
      todo: tasks.filter(t => t.status === "todo"),
      in_progress: tasks.filter(t => t.status === "in_progress"),
      done: tasks.filter(t => t.status === "done")
    });
  }, [tasks]);

  const onDragEnd = async (result: DropResult) => {
    if (!result.destination) return;
    const { source, destination } = result;

    if (source.droppableId !== destination.droppableId) {
      const sourceCol = columns[source.droppableId];
      const destCol = columns[destination.droppableId];
      const sourceItems = [...sourceCol];
      const destItems = [...destCol];
      const [removed] = sourceItems.splice(source.index, 1);
      
      removed.status = destination.droppableId;
      destItems.splice(destination.index, 0, removed);
      
      setColumns({
        ...columns,
        [source.droppableId]: sourceItems,
        [destination.droppableId]: destItems
      });

      await base44.entities.Task.update(removed.id, { status: destination.droppableId });
      onRefresh();
    } else {
      const col = columns[source.droppableId];
      const items = [...col];
      const [removed] = items.splice(source.index, 1);
      items.splice(destination.index, 0, removed);
      
      setColumns({ ...columns, [source.droppableId]: items });
    }
  };

  async function toggleStatus(task: any) {
    const newStatus = task.status === "done" ? "todo" : "done";
    await base44.entities.Task.update(task.id, { status: newStatus });
    onRefresh();
  }

  async function deleteTask(id: string) {
    await base44.entities.Task.delete(id);
    onRefresh();
  }

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="hidden md:grid grid-cols-3 gap-6 h-full items-start">
        {Object.entries(columns).map(([columnId, columnTasks]) => (
          <div key={columnId} className="flex flex-col bg-muted/20 rounded-3xl p-4 min-h-[500px]">
            <div className="flex items-center justify-between mb-4 px-2">
              <h3 className="font-bold uppercase text-xs text-muted-foreground tracking-wider">
                {columnId.replace('_', ' ')}
              </h3>
              <Badge variant="secondary" className="text-[10px] font-bold bg-card border-border shadow-sm">
                {columnTasks.length}
              </Badge>
            </div>
            
            <Droppable droppableId={columnId}>
              {(provided, snapshot) => (
                <div 
                  {...provided.droppableProps} 
                  ref={provided.innerRef}
                  className={`flex-1 flex flex-col gap-3 transition-colors rounded-xl ${snapshot.isDraggingOver ? "bg-primary/5" : ""}`}
                >
                  {columnTasks.map((task, index) => (
                    <Draggable key={task.id} draggableId={task.id} index={index}>
                      {(provided, snapshot) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          className={`bg-card rounded-2xl p-4 border border-border group ${snapshot.isDragging ? "shadow-lg scale-[1.02] rotate-1 ring-1 ring-primary/20" : "hover:border-primary/20 shadow-sm"}`}
                          style={{ ...provided.draggableProps.style }}
                        >
                          <div className="flex items-start gap-3">
                            <button onClick={(e) => { e.stopPropagation(); toggleStatus(task); }}
                              className={`w-6 h-6 rounded-full border-2 flex items-center justify-center flex-shrink-0 mt-0.5 transition-all group-hover:border-primary/50 ${task.status === "done" ? "bg-primary border-primary group-hover:border-primary" : "border-border"}`}>
                              {task.status === "done" && <Check className="w-3 h-3 text-white" />}
                            </button>
                            
                            <div className="flex-1 min-w-0" onClick={() => onEdit(task)}>
                              <p className={`text-sm font-semibold transition-colors group-hover:text-primary ${task.status === "done" ? "line-through text-muted-foreground group-hover:text-primary/70" : ""}`}>{task.title}</p>
                              {task.description && <p className="text-xs text-muted-foreground mt-0.5 truncate">{task.description}</p>}
                              
                              <div className="flex items-center gap-2 mt-2 flex-wrap">
                                <Badge className={`text-[9px] px-1.5 py-0 uppercase font-bold tracking-wide ${PRIORITY_COLORS[task.priority]}`}>{task.priority}</Badge>
                                {task.due_date && <span className="text-[10px] text-muted-foreground font-medium">{task.due_date}{task.due_time ? ` at ${task.due_time}` : ""}</span>}
                                {task.repeat !== "none" && (
                                  <div className="flex items-center gap-1 text-[10px] text-primary bg-primary/5 px-1.5 py-0.5 rounded-full font-medium">
                                    <RepeatIcon className="w-2.5 h-2.5" />
                                    {task.repeat === "custom" ? task.repeat_days?.map((d: number) => ["S", "M", "T", "W", "T", "F", "S"][d]).join("") : task.repeat}
                                  </div>
                                )}
                                {task.notification_enabled && <Bell className="w-3 h-3 text-primary" />}
                              </div>
                            </div>

                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <button className="p-1.5 rounded-xl hover:bg-primary/10 text-muted-foreground transition-all">
                                  <MoreHorizontal className="w-4 h-4" />
                                </button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end" className="rounded-2xl min-w-[120px]">
                                <DropdownMenuItem onClick={() => onEdit(task)} className="gap-2 rounded-xl text-xs font-bold text-muted-foreground">
                                  <Edit2 className="w-3.5 h-3.5" /> Edit
                                </DropdownMenuItem>
                                <DropdownMenuItem onClick={() => deleteTask(task.id)} className="gap-2 text-rose-500 focus:text-rose-500 focus:bg-rose-500/10 rounded-xl text-xs font-bold">
                                  <Trash2 className="w-3.5 h-3.5" /> Delete
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </div>
                        </div>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </div>
        ))}
      </div>
    </DragDropContext>
  );
}
