import { Trash2, Pencil, Wallet } from "lucide-react";
import { formatCurrency, formatDate } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { base44 } from "@/api/base44Client";

interface ExpenseListProps {
  expenses: any[];
  onRefresh: () => void;
  settings: any;
}

export default function ExpenseList({ expenses, onRefresh, settings }: ExpenseListProps) {
  async function remove(id: string) {
    await base44.entities.Expense.delete(id);
    onRefresh();
  }

  return (
    <div className="space-y-3">
      <AnimatePresence>
        {expenses.map((expense, i) => (
          <motion.div 
            key={expense.id} 
            initial={{ opacity: 0, x: -10 }} 
            animate={{ opacity: 1, x: 0 }} 
            exit={{ opacity: 0, x: 50 }}
            transition={{ delay: i * 0.03 }}
            className="bg-card rounded-2xl p-4 border border-border flex items-center gap-3"
          >
            <div className="w-10 h-10 rounded-xl bg-rose-500/10 flex items-center justify-center flex-shrink-0">
              <span className="text-lg">💸</span>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-bold truncate">{expense.title}</p>
              <p className="text-[10px] text-muted-foreground">{formatDate(expense.date)} • {expense.category}</p>
            </div>
            <div className="text-right">
              <p className="text-sm font-bold text-rose-500">
                -{formatCurrency(expense.amount_usd || expense.amount, settings.currency_primary, settings.uzs_rate)}
              </p>
              <button 
                onClick={() => remove(expense.id)} 
                className="p-1 text-muted-foreground hover:text-destructive mt-1"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            </div>
          </motion.div>
        ))}
      </AnimatePresence>
      {expenses.length === 0 && (
        <div className="text-center py-12">
          <p className="text-xs text-muted-foreground">No expenses found</p>
        </div>
      )}
    </div>
  );
}
