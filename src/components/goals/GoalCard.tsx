import { Target, Pencil, Trash2, Plus, CheckCircle2, ChevronRight, Image as ImageIcon } from "lucide-react";
import { motion } from "framer-motion";
import { formatCurrency } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { useState } from "react";

interface GoalCardProps {
  goal: any;
  onToggleMilestone: (goal: any, index: number) => void;
  onAddSavings: (goal: any, amount: number) => void;
  onDelete: (id: string) => void;
  onEdit: (goal: any) => void;
  onMarkComplete: (goal: any) => void;
  settings: any;
}

export default function GoalCard({ 
  goal, onToggleMilestone, onAddSavings, onDelete, onEdit, onMarkComplete, settings 
}: GoalCardProps) {
  const [customAmount, setCustomAmount] = useState("");
  
  const isSavings = goal.type === "savings";
  const isCompleted = goal.status === "completed";
  
  const pct = isSavings && goal.target_amount > 0
    ? Math.min(100, Math.round(((goal.current_amount || 0) / goal.target_amount) * 100))
    : goal.milestones?.length > 0
      ? Math.round((goal.milestones.filter((m: any) => m.completed).length / goal.milestones.length) * 100)
      : 0;

  const handleAddCustom = () => {
    const amt = parseFloat(customAmount);
    if (amt > 0) {
      onAddSavings(goal, amt);
      setCustomAmount("");
    }
  };

  return (
    <div className={`bg-card rounded-3xl border border-border overflow-hidden relative transition-all hover:border-primary/30 group shadow-sm hover:shadow-md ${isCompleted ? "opacity-75 grayscale-[0.5]" : ""}`}>
      {/* Cover Image */}
      {goal.image_url ? (
        <div className="h-40 w-full relative overflow-hidden">
          <img src={goal.image_url} alt={goal.title} className="absolute inset-0 w-full h-full object-cover transition-transform group-hover:scale-105 duration-1000 ease-out" />
          <div className="absolute inset-0 bg-gradient-to-t from-card via-card/40 to-transparent" />
          <div className="absolute top-3 right-3 flex gap-1 z-10 backdrop-blur-md bg-background/50 rounded-xl">
             <Button variant="ghost" size="icon" onClick={() => onEdit(goal)} className="h-8 w-8 rounded-xl hover:bg-background/80">
               <Pencil className="w-3.5 h-3.5" />
             </Button>
             <Button variant="ghost" size="icon" onClick={() => onDelete(goal.id)} className="h-8 w-8 rounded-xl text-destructive hover:bg-destructive/20 hover:text-destructive">
               <Trash2 className="w-3.5 h-3.5" />
             </Button>
          </div>
        </div>
      ) : (
        <div className="h-2 w-full transition-opacity group-hover:opacity-80" style={{ backgroundColor: goal.color || "hsl(var(--primary))" }} />
      )}

      <div className={`p-5 ${goal.image_url ? "pt-2" : ""}`}>
        {!goal.image_url && (
          <div className="flex flex-row-reverse items-start justify-between absolute right-4 top-4">
             <div className="flex gap-1 ml-2">
               <Button variant="ghost" size="icon" onClick={() => onEdit(goal)} className="h-8 w-8 rounded-xl">
                 <Pencil className="w-3.5 h-3.5 text-muted-foreground" />
               </Button>
               <Button variant="ghost" size="icon" onClick={() => onDelete(goal.id)} className="h-8 w-8 rounded-xl text-destructive hover:bg-destructive/10">
                 <Trash2 className="w-3.5 h-3.5" />
               </Button>
             </div>
          </div>
        )}
        
        <div className={`flex items-start justify-between mb-4 ${!goal.image_url ? 'pr-16' : ''}`}>
          <div className="flex-1 min-w-0 cursor-pointer" onClick={() => onEdit(goal)}>
            <div className="flex items-center gap-2">
              <h3 className={`font-bold text-xl leading-tight truncate group-hover:text-primary transition-colors ${isCompleted ? "line-through text-muted-foreground group-hover:text-primary/70" : ""}`}>
                {goal.title}
              </h3>
              {isCompleted && <CheckCircle2 className="w-5 h-5 text-emerald-500 flex-shrink-0" />}
            </div>
            {goal.description && <p className="text-xs text-muted-foreground mt-1 line-clamp-2">{goal.description}</p>}
          </div>
        </div>

        {/* Progress Section */}
        <div className="mb-5">
          <div className="flex items-center justify-between text-xs font-bold mb-2 grayscale-0">
            <span className="text-primary">{pct}% complete</span>
            {isSavings ? (
              <span className="text-muted-foreground font-mono">
                {formatCurrency(goal.current_amount || 0, goal.currency, settings.uzs_rate)} / {formatCurrency(goal.target_amount, goal.currency, settings.uzs_rate)}
              </span>
            ) : (
              <span className="text-muted-foreground font-mono">
                {goal.milestones?.filter((m: any) => m.completed).length || 0} / {goal.milestones?.length || 0} tasks
              </span>
            )}
          </div>
          <Progress value={pct} className="h-2.5 rounded-full bg-muted/60" indicatorClassName="bg-primary shadow-[0_0_10px_rgba(var(--primary),0.5)]" />
        </div>

        {/* Action area */}
        {isSavings ? (
          <div className="flex gap-2 items-center">
            <div className="flex gap-2 flex-1 relative">
              <Input 
                type="number" 
                placeholder="Amount" 
                value={customAmount}
                onChange={(e) => setCustomAmount(e.target.value)} 
                onKeyDown={(e) => e.key === 'Enter' && handleAddCustom()}
                className="rounded-xl h-10 flex-1 font-mono text-sm bg-muted/30 focus-visible:bg-transparent"
              />
              <Button 
                variant="default" 
                className="rounded-xl h-10 px-4 font-bold shadow-sm"
                onClick={handleAddCustom}
                disabled={!customAmount || parseFloat(customAmount) <= 0}
              >
                Add {goal.currency}
              </Button>
            </div>
            <Button 
              onClick={() => onMarkComplete(goal)}
              className={`rounded-xl h-10 px-3 shrink-0 ${isCompleted ? "bg-muted text-muted-foreground" : ""}`}
              variant={isCompleted ? "secondary" : "outline"}
            >
              <CheckCircle2 className="w-4 h-4" />
            </Button>
          </div>
        ) : (
          <div className="space-y-2">
            {goal.milestones?.map((m: any, idx: number) => (
                <div 
                  key={idx} 
                  className="flex items-center gap-3 p-3 bg-muted/30 rounded-2xl border border-border/50 active:scale-[0.99] transition-all hover:bg-primary/5 hover:border-primary/20 group/milestone cursor-pointer shadow-sm hover:shadow"
                  onClick={() => onToggleMilestone(goal, idx)}
                >
                  <Checkbox checked={m.completed} className="group-hover/milestone:border-primary shrink-0" />
                  <span className={`text-sm font-medium transition-colors ${m.completed ? "line-through text-muted-foreground opacity-70" : "group-hover/milestone:text-primary"}`}>
                    {m.title}
                  </span>
                </div>
            ))}
            <Button 
              variant={isCompleted ? "outline" : "default"} 
              className={`w-full rounded-xl text-sm font-bold gap-2 h-11 ${!isCompleted ? "shadow-md" : ""}`}
              onClick={() => onMarkComplete(goal)}
            >
              {isCompleted ? "Re-open Goal" : "Mark as Finished"}
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
