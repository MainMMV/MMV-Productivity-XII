import { Flame, Check, Trash2, Pencil, MoreVertical } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";

interface HabitCardProps {
  habit: any;
  onToggle: (habit: any) => void;
  onDelete: (id: string) => void;
  onEdit: (habit: any) => void;
}

export default function HabitCard({ habit, onToggle, onDelete, onEdit }: HabitCardProps) {
  const today = new Date().toISOString().split("T")[0];
  const isDoneToday = habit.completions?.includes(today);

  return (
    <div className="bg-card rounded-2xl p-4 border border-border flex items-center gap-3 relative overflow-hidden group">
      {/* Background color chip */}
      <div 
        className="absolute left-0 top-0 bottom-0 w-1 opacity-20" 
        style={{ backgroundColor: habit.color || "hsl(var(--primary))" }} 
      />
      
      <motion.button 
        whileTap={{ scale: 0.9 }}
        onClick={() => onToggle(habit)}
        className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-all duration-500 flex-shrink-0 ${
          isDoneToday 
            ? "shadow-lg scale-105" 
            : "bg-muted border border-border"
        }`}
        style={{ 
          backgroundColor: isDoneToday ? habit.color || "hsl(var(--primary))" : undefined,
          color: isDoneToday ? "white" : "hsl(var(--muted-foreground))"
        }}
      >
        {isDoneToday ? <Check className="w-6 h-6 stroke-[3]" /> : <Flame className="w-6 h-6" />}
      </motion.button>
      
      <div className="flex-1 min-w-0" onClick={() => onEdit(habit)}>
        <p className={`text-sm font-bold truncate ${isDoneToday ? "text-foreground" : "text-muted-foreground"}`}>
          {habit.title}
        </p>
        <div className="flex items-center gap-2 mt-0.5">
          <div className="flex items-center gap-1 bg-orange-500/10 px-1.5 py-0.5 rounded-full">
            <Flame className="w-3 h-3 text-orange-500 fill-orange-500" />
            <span className="text-[10px] font-bold text-orange-600">{habit.streak || 0}d streak</span>
          </div>
          {habit.frequency && (
            <span className="text-[10px] text-muted-foreground font-medium uppercase ">{habit.frequency}</span>
          )}
        </div>
      </div>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="icon" className="rounded-xl h-8 w-8">
            <MoreVertical className="w-4 h-4 text-muted-foreground" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="rounded-2xl">
          <DropdownMenuItem onClick={() => onEdit(habit)} className="gap-2 rounded-xl">
            <Pencil className="w-4 h-4" /> Edit
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => onDelete(habit.id)} className="gap-2 text-destructive focus:text-destructive rounded-xl">
            <Trash2 className="w-4 h-4" /> Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
