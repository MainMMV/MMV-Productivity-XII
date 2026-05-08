import { Target, Pencil, Trash2, Plus, CheckCircle2, ChevronRight, Image as ImageIcon } from "lucide-react";
import { motion } from "framer-motion";
import { formatCurrency } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Checkbox } from "@/components/ui/checkbox";

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
  
  const isSavings = goal.type === "savings";
  const isCompleted = goal.status === "completed";
  
  const pct = isSavings && goal.target_amount > 0
    ? Math.min(100, Math.round(((goal.current_amount || 0) / goal.target_amount) * 100))
    : goal.milestones?.length > 0
      ? Math.round((goal.milestones.filter((m: any) => m.completed).length / goal.milestones.length) * 100)
      : 0;

  return (
    <div className={`bg-card rounded-3xl border border-border overflow-hidden relative ${isCompleted ? "opacity-75 grayscale-[0.5]" : ""}`}>
      {/* Cover Image */}
      {goal.image_url ? (
        <div className="h-24 w-full relative">
          <img src={goal.image_url} alt={goal.title} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-card to-transparent" />
        </div>
      ) : (
        <div className="h-2 w-full" style={{ backgroundColor: goal.color || "hsl(var(--primary))" }} />
      )}

      <div className="p-5">
        <div className="flex items-start justify-between mb-3">
          <div className="flex-1 min-w-0" onClick={() => onEdit(goal)}>
            <div className="flex items-center gap-2">
              <h3 className={`font-bold text-lg leading-tight truncate ${isCompleted ? "line-through text-muted-foreground" : ""}`}>
                {goal.title}
              </h3>
              {isCompleted && <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0" />}
            </div>
            {goal.description && <p className="text-xs text-muted-foreground mt-1 line-clamp-2">{goal.description}</p>}
          </div>
          <div className="flex gap-1 ml-2">
            <Button variant="ghost" size="icon" onClick={() => onEdit(goal)} className="h-8 w-8 rounded-xl">
              <Pencil className="w-3.5 h-3.5 text-muted-foreground" />
            </Button>
            <Button variant="ghost" size="icon" onClick={() => onDelete(goal.id)} className="h-8 w-8 rounded-xl text-destructive hover:bg-destructive/10">
              <Trash2 className="w-3.5 h-3.5" />
            </Button>
          </div>
        </div>

        {/* Progress Section */}
        <div className="mb-4">
          <div className="flex items-center justify-between text-xs font-bold mb-1.5 grayscale-0">
            <span className="text-primary">{pct}% complete</span>
            {isSavings ? (
              <span className="text-muted-foreground">
                {formatCurrency(goal.current_amount || 0, goal.currency, settings.uzs_rate)} / {formatCurrency(goal.target_amount, goal.currency, settings.uzs_rate)}
              </span>
            ) : (
              <span className="text-muted-foreground">
                {goal.milestones?.filter((m: any) => m.completed).length || 0} / {goal.milestones?.length || 0} tasks
              </span>
            )}
          </div>
          <Progress value={pct} className="h-2 rounded-full" />
        </div>

        {/* Action area */}
        {isSavings ? (
          <div className="flex gap-2">
            <Button 
              variant="outline" 
              className="flex-1 rounded-xl h-10 border-primary/20 text-primary" 
              onClick={() => onAddSavings(goal, 10)}
            >
              +10 {goal.currency}
            </Button>
            <Button 
              variant="outline" 
              className="flex-1 rounded-xl h-10 border-primary/20 text-primary" 
              onClick={() => onAddSavings(goal, 50)}
            >
              +50 {goal.currency}
            </Button>
            <Button 
              onClick={() => onMarkComplete(goal)}
              className={`rounded-xl h-10 px-3 ${isCompleted ? "bg-muted text-muted-foreground" : ""}`}
            >
              <CheckCircle2 className="w-4 h-4" />
            </Button>
          </div>
        ) : (
          <div className="space-y-2">
            {goal.milestones?.map((m: any, idx: number) => (
              <div 
                key={idx} 
                className="flex items-center gap-3 p-3 bg-muted/30 rounded-2xl border border-border/50 active:scale-[0.99] transition-transform"
                onClick={() => onToggleMilestone(goal, idx)}
              >
                <Checkbox checked={m.completed} />
                <span className={`text-xs font-medium ${m.completed ? "line-through text-muted-foreground" : ""}`}>
                  {m.title}
                </span>
              </div>
            ))}
            <Button 
              variant="secondary" 
              className="w-full rounded-xl text-xs font-bold gap-2"
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
