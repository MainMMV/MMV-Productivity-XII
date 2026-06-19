import { format, eachDayOfInterval, startOfMonth, endOfMonth, addMonths, isSameDay } from "date-fns";
import { motion } from "framer-motion";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

interface HabitMatrixProps {
  habits: any[];
  onToggle: (habit: any, date?: Date) => void;
  dateRange: any;
}

export default function HabitMatrix({ habits, onToggle, dateRange }: HabitMatrixProps) {
  const start = dateRange?.from || startOfMonth(new Date());
  const end = dateRange?.to || endOfMonth(addMonths(new Date(), 2));

  const days = eachDayOfInterval({
    start,
    end,
  });

  return (
    <div className="bg-card rounded-3xl p-4 border border-border w-full overflow-x-auto scrollbar-none shadow-sm">
      <div className="min-w-max">
        <div className="flex mb-3">
          <div className="w-32 flex-shrink-0" />
          {days.map((day, i) => (
            <div key={i} className="w-8 flex flex-col items-center">
              <span className="text-[9px] text-muted-foreground uppercase font-bold tracking-wider">{format(day, "eee")}</span>
              <span className="text-xs font-bold mt-0.5">{format(day, "d")}</span>
            </div>
          ))}
        </div>
        <div className="space-y-2">
          {habits.map((habit) => (
            <div key={habit.id} className="flex items-center">
              <div className="w-32 flex-shrink-0 pr-4">
                <p className="text-xs font-bold truncate text-foreground">{habit.title}</p>
              </div>
              <div className="flex">
                {days.map((day, i) => {
                  const dateStr = format(day, "yyyy-MM-dd");
                  const isCompleted = habit.completions?.includes(dateStr);
                  const isToday = isSameDay(day, new Date());
                  
                  return (
                    <div key={i} className="w-8 flex justify-center items-center">
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <motion.button
                              whileTap={{ scale: 0.8 }}
                              onClick={() => onToggle(habit, day)}
                              className={`w-6 h-6 rounded-lg transition-all duration-300 ${
                                isCompleted 
                                  ? "shadow-sm scale-110" 
                                  : "bg-muted/40 border border-border/60 hover:bg-muted/60"
                              }`}
                              style={{ 
                                backgroundColor: isCompleted ? habit.color || "hsl(var(--primary))" : undefined,
                                opacity: isCompleted ? 1 : (isToday ? 1 : 0.6),
                                cursor: "pointer"
                              }}
                            />
                          </TooltipTrigger>
                          <TooltipContent side="top">
                            <p className="text-[10px] font-bold">{habit.title}</p>
                            <p className="text-[10px] text-muted-foreground">{format(day, "MMM d, yyyy")}</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
