import { format, eachDayOfInterval, subDays, isSameDay } from "date-fns";
import { motion } from "framer-motion";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

interface HabitMatrixProps {
  habits: any[];
  onToggle: (habit: any, date?: Date) => void;
  dateRange: any;
}

export default function HabitMatrix({ habits, onToggle, dateRange }: HabitMatrixProps) {
  const days = eachDayOfInterval({
    start: dateRange?.from || subDays(new Date(), 13),
    end: dateRange?.to || new Date(),
  });

  return (
    <div className="bg-card rounded-3xl p-4 border border-border overflow-x-auto scrollbar-none">
      <div className="min-w-max">
        <div className="flex mb-3">
          <div className="w-24 flex-shrink-0" />
          {days.map((day, i) => (
            <div key={i} className="w-8 flex flex-col items-center">
              <span className="text-[8px] text-muted-foreground uppercase font-bold">{format(day, "eee")}</span>
              <span className="text-[10px] font-bold">{format(day, "d")}</span>
            </div>
          ))}
        </div>
        <div className="space-y-2">
          {habits.map((habit) => (
            <div key={habit.id} className="flex items-center">
              <div className="w-24 flex-shrink-0 pr-2">
                <p className="text-xs font-semibold truncate">{habit.title}</p>
              </div>
              <div className="flex">
                {days.map((day, i) => {
                  const dateStr = format(day, "yyyy-MM-dd");
                  const isCompleted = habit.completions?.includes(dateStr);
                  const isToday = isSameDay(day, new Date());
                  
                  return (
                    <div key={i} className="w-8 flex justify-center">
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <motion.button
                              whileTap={{ scale: 0.8 }}
                              onClick={() => onToggle(habit, day)}
                              className={`w-5 h-5 rounded-md transition-all duration-300 ${
                                isCompleted 
                                  ? "shadow-sm" 
                                  : "bg-muted/50 border border-border/50"
                              }`}
                              style={{ 
                                backgroundColor: isCompleted ? habit.color || "hsl(var(--primary))" : undefined,
                                opacity: isToday ? 1 : 0.6,
                                cursor: "pointer"
                              }}
                            />
                          </TooltipTrigger>
                          <TooltipContent>
                            <p className="text-[10px]">{habit.title}: {format(day, "MMM d")}</p>
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
