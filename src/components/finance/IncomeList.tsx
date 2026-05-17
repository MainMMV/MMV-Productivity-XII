import { Trash2, TrendingUp, MoreHorizontal } from "lucide-react";
import { formatCurrency, formatDate } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { base44 } from "@/api/base44Client";

interface IncomeListProps {
  income: any[];
  onRefresh: () => void;
  settings: any;
  dateRange?: any;
}

export default function IncomeList({ income, onRefresh, settings, dateRange }: IncomeListProps) {
  async function remove(id: string) {
    await base44.entities.Income.delete(id);
    onRefresh();
  }

  const renderIncome = (items: any[]) => items.map((item, i) => (
    <motion.div 
      key={item.id} 
      initial={{ opacity: 0, x: -10 }} 
      animate={{ opacity: 1, x: 0 }} 
      exit={{ opacity: 0, x: 50 }}
      transition={{ delay: i * 0.03 }}
      className="bg-card rounded-2xl p-4 border border-border flex items-center gap-3 hover:bg-primary/5 hover:border-primary/20 transition-all group"
    >
      <div className="w-10 h-10 rounded-xl bg-emerald-500/10 flex items-center justify-center flex-shrink-0 group-hover:bg-emerald-500/20 transition-colors">
        <TrendingUp className="w-5 h-5 text-emerald-500" />
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-bold truncate group-hover:text-primary transition-colors">{item.title}</p>
        <p className="text-[10px] text-muted-foreground">{formatDate(item.date)} • {item.source}</p>
      </div>
      <div className="text-right flex items-center gap-2">
        <p className="text-sm font-bold text-emerald-500">
          +{formatCurrency(item.amount, settings.currency_primary, settings.uzs_rate, item.currency)}
        </p>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="p-1.5 rounded-xl hover:bg-primary/10 text-muted-foreground transition-all">
              <MoreHorizontal className="w-4 h-4" />
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="rounded-2xl">
            <DropdownMenuItem onClick={() => remove(item.id)} className="gap-2 text-destructive focus:text-destructive rounded-xl">
              <Trash2 className="w-3.5 h-3.5" /> Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </motion.div>
  ));

  return (
    <div className="space-y-4">
      <AnimatePresence>
        {(() => {
          if (dateRange?.from) {
            const dates = [];
            let curr = new Date(dateRange.from);
            const end = dateRange.to ? new Date(dateRange.to) : new Date(dateRange.from);
            
            while (curr <= end) {
              dates.push(new Date(curr));
              curr.setDate(curr.getDate() + 1);
            }

            return dates.map(date => {
              const dateStr = date.toISOString().split("T")[0];
              const dateItems = income.filter(e => e.date?.startsWith(dateStr));
              
              return (
                <div key={date.toISOString()} className="space-y-2 mb-4">
                  <div className="flex items-center gap-4 py-2">
                    <div className="h-px bg-border flex-1" />
                    <p className="text-xs font-bold text-muted-foreground uppercase">{date.toLocaleDateString("en-US", { weekday: 'short', month: 'short', day: 'numeric' })}</p>
                    <div className="h-px bg-border flex-1" />
                  </div>
                  {dateItems.length > 0 ? renderIncome(dateItems) : (
                    <p className="text-xs text-center text-muted-foreground/60 py-2">No income</p>
                  )}
                </div>
              );
            });
          }

          return renderIncome(income);
        })()}
      </AnimatePresence>
      {income.length === 0 && (
        <div className="text-center py-12">
          <p className="text-xs text-muted-foreground">No income recorded</p>
        </div>
      )}
    </div>
  );
}
