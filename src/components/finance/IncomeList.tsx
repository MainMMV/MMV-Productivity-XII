import { Trash2, TrendingUp } from "lucide-react";
import { formatCurrency, formatDate } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";
import { base44 } from "@/api/base44Client";

interface IncomeListProps {
  income: any[];
  onRefresh: () => void;
  settings: any;
}

export default function IncomeList({ income, onRefresh, settings }: IncomeListProps) {
  async function remove(id: string) {
    await base44.entities.Income.delete(id);
    onRefresh();
  }

  return (
    <div className="space-y-3">
      <AnimatePresence>
        {income.map((item, i) => (
          <motion.div 
            key={item.id} 
            initial={{ opacity: 0, x: -10 }} 
            animate={{ opacity: 1, x: 0 }} 
            exit={{ opacity: 0, x: 50 }}
            transition={{ delay: i * 0.03 }}
            className="bg-card rounded-2xl p-4 border border-border flex items-center gap-3"
          >
            <div className="w-10 h-10 rounded-xl bg-emerald-500/10 flex items-center justify-center flex-shrink-0">
              <TrendingUp className="w-5 h-5 text-emerald-500" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-bold truncate">{item.title}</p>
              <p className="text-[10px] text-muted-foreground">{formatDate(item.date)} • {item.source}</p>
            </div>
            <div className="text-right">
              <p className="text-sm font-bold text-emerald-500">
                +{formatCurrency(item.amount_usd || item.amount, settings.currency_primary, settings.uzs_rate)}
              </p>
              <button 
                onClick={() => remove(item.id)} 
                className="p-1 text-muted-foreground hover:text-destructive mt-1"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            </div>
          </motion.div>
        ))}
      </AnimatePresence>
      {income.length === 0 && (
        <div className="text-center py-12">
          <p className="text-xs text-muted-foreground">No income recorded</p>
        </div>
      )}
    </div>
  );
}
