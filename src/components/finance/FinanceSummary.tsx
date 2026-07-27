import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip as RechartsTooltip } from "recharts";
import { formatCurrency, formatDate } from "@/lib/utils";
import { Wallet, ArrowDownRight, ArrowUpRight, Plus, Sparkles, TrendingUp, CreditCard, PieChart as PieIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { base44 } from "@/api/base44Client";

interface FinanceSummaryProps {
  expenses: any[];
  income: any[];
  settings: any;
  onOpenAdd?: (type: string) => void;
  onRefresh?: () => void;
}

const CATEGORY_ICONS: Record<string, string> = {
  Food: "🍔",
  Transport: "🚗",
  Housing: "🏠",
  Entertainment: "🎬",
  Shopping: "🛍️",
  Utilities: "💡",
  Tech: "💻",
  Health: "🏥",
  Education: "🎓",
  General: "🔧"
};

const CATEGORY_COLORS: Record<string, string> = {
  Food: "#f59e0b",
  Transport: "#3b82f6",
  Housing: "#8b5cf6",
  Entertainment: "#ec4899",
  Shopping: "#10b981",
  Utilities: "#06b6d4",
  Tech: "#6366f1",
  Health: "#ef4444",
  Education: "#14b8a6",
  General: "#64748b"
};

export default function FinanceSummary({ expenses, income, settings, onOpenAdd, onRefresh }: FinanceSummaryProps) {
  const getAmountInPrimary = (item: any) => {
    let amt = item.amount || 0;
    if (item.currency === 'USD' && settings.currency_primary === 'UZS') amt *= settings.uzs_rate;
    if (item.currency === 'UZS' && settings.currency_primary === 'USD') amt /= settings.uzs_rate;
    return amt;
  };

  const totalSpent = expenses.reduce((s, e) => s + getAmountInPrimary(e), 0);
  const totalEarned = income.reduce((s, i) => s + getAmountInPrimary(i), 0);
  const savingsRate = totalEarned > 0 ? Math.max(0, Math.round(((totalEarned - totalSpent) / totalEarned) * 100)) : 0;

  const categoryTotals: Record<string, number> = {};
  expenses.forEach(e => {
    const cat = e.category || "General";
    categoryTotals[cat] = (categoryTotals[cat] || 0) + getAmountInPrimary(e);
  });

  const chartData = Object.keys(categoryTotals).map(cat => ({
    name: cat,
    value: categoryTotals[cat],
    percentage: totalSpent > 0 ? Math.round((categoryTotals[cat] / totalSpent) * 100) : 0
  })).sort((a, b) => b.value - a.value);

  // Combine latest transactions for preview
  const recentTransactions = [
    ...expenses.map(e => ({ ...e, txnType: "expense" })),
    ...income.map(i => ({ ...i, txnType: "income" }))
  ].sort((a, b) => new Date(b.date || 0).getTime() - new Date(a.date || 0).getTime()).slice(0, 5);

  async function handleLoadSampleData() {
    const today = new Date().toISOString().split("T")[0];
    try {
      await Promise.all([
        base44.entities.Income.create({ title: "Monthly Salary", amount: 3200, currency: "USD", date: today, category: "Salary" }),
        base44.entities.Expense.create({ title: "Supermarket Groceries", amount: 145, currency: "USD", date: today, category: "Food" }),
        base44.entities.Expense.create({ title: "Electric & Power Bill", amount: 82, currency: "USD", date: today, category: "Utilities" }),
        base44.entities.Expense.create({ title: "Co-working Space", amount: 210, currency: "USD", date: today, category: "Housing" }),
        base44.entities.Expense.create({ title: "Uber Rides", amount: 34, currency: "USD", date: today, category: "Transport" })
      ]);
      if (onRefresh) onRefresh();
    } catch (err) {
      console.error("Failed to load sample transactions", err);
    }
  }

  return (
    <div className="space-y-5">
      {/* Cash Flow Balance Meter */}
      <div className="bg-card rounded-3xl p-5 border border-border/80 shadow-sm relative overflow-hidden">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
              <TrendingUp className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Cash Flow & Savings</h3>
              <p className="text-sm font-extrabold text-foreground">
                {savingsRate}% Savings Rate
              </p>
            </div>
          </div>
          <span className={`text-xs font-bold px-2.5 py-1 rounded-full ${savingsRate >= 20 ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400" : "bg-amber-500/10 text-amber-600 dark:text-amber-400"}`}>
            {savingsRate >= 20 ? "Healthy" : "Needs Attention"}
          </span>
        </div>

        {/* Cash flow progress bar */}
        <div className="space-y-1.5">
          <div className="h-3 w-full bg-muted rounded-full overflow-hidden flex p-0.5">
            <div 
              className="bg-emerald-500 rounded-full h-full transition-all duration-500" 
              style={{ width: `${totalEarned > 0 ? Math.min(100, Math.max(5, (totalSpent / totalEarned) * 100)) : 0}%` }}
            />
          </div>
          <div className="flex justify-between text-[11px] font-bold text-muted-foreground">
            <span>Spent: {formatCurrency(totalSpent, settings.currency_primary, settings.uzs_rate)}</span>
            <span>Income: {formatCurrency(totalEarned, settings.currency_primary, settings.uzs_rate)}</span>
          </div>
        </div>
      </div>

      {/* Spending By Category Chart & Cards */}
      <div className="bg-card rounded-3xl p-5 border border-border/80 shadow-sm">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <PieIcon className="w-4 h-4 text-primary" />
            <h3 className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Spending by Category</h3>
          </div>
          {expenses.length > 0 && (
            <span className="text-xs font-bold text-muted-foreground">
              {chartData.length} Categories
            </span>
          )}
        </div>

        {expenses.length === 0 ? (
          <div className="text-center py-8 px-4 border border-dashed border-border/80 rounded-2xl bg-muted/20">
            <div className="w-12 h-12 rounded-2xl bg-primary/10 text-primary flex items-center justify-center mx-auto mb-3">
              <Sparkles className="w-6 h-6" />
            </div>
            <h4 className="text-sm font-bold text-foreground">No Spending Recorded Yet</h4>
            <p className="text-xs text-muted-foreground mt-1 max-w-xs mx-auto">
              Add your daily expenses to automatically unlock visual category breakdown charts and insights.
            </p>
            <div className="flex items-center justify-center gap-2 mt-4">
              {onOpenAdd && (
                <Button size="sm" onClick={() => onOpenAdd("expense")} className="rounded-xl gap-1.5 font-bold">
                  <Plus className="w-4 h-4" /> Add Expense
                </Button>
              )}
              <Button size="sm" variant="outline" onClick={handleLoadSampleData} className="rounded-xl gap-1.5 text-xs font-bold">
                <Sparkles className="w-3.5 h-3.5 text-amber-500" /> Demo Data
              </Button>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
            {/* Donut Chart with Center Text */}
            <div className="md:col-span-5 h-[220px] relative flex items-center justify-center">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={chartData}
                    cx="50%"
                    cy="50%"
                    innerRadius={65}
                    outerRadius={85}
                    paddingAngle={4}
                    dataKey="value"
                  >
                    {chartData.map((entry) => (
                      <Cell 
                        key={`cell-${entry.name}`} 
                        fill={CATEGORY_COLORS[entry.name] || "#64748b"} 
                        stroke="none" 
                      />
                    ))}
                  </Pie>
                  <RechartsTooltip 
                    contentStyle={{ borderRadius: '1rem', border: 'none', background: 'hsl(var(--card))', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                    formatter={(val: number) => formatCurrency(val, settings.currency_primary, settings.uzs_rate)}
                  />
                </PieChart>
              </ResponsiveContainer>
              <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                <span className="text-[10px] uppercase font-bold text-muted-foreground">Total Spent</span>
                <span className="text-base font-extrabold text-foreground font-mono">
                  {formatCurrency(totalSpent, settings.currency_primary, settings.uzs_rate)}
                </span>
              </div>
            </div>

            {/* Category Breakdown Progress List */}
            <div className="md:col-span-7 space-y-3">
              {chartData.map((item) => {
                const icon = CATEGORY_ICONS[item.name] || "🏷️";
                const color = CATEGORY_COLORS[item.name] || "#64748b";
                return (
                  <div key={item.name} className="space-y-1">
                    <div className="flex items-center justify-between text-xs">
                      <div className="flex items-center gap-2">
                        <span className="text-base">{icon}</span>
                        <span className="font-bold text-foreground">{item.name}</span>
                        <span className="text-[10px] font-bold text-muted-foreground px-1.5 py-0.5 rounded-md bg-muted">
                          {item.percentage}%
                        </span>
                      </div>
                      <span className="font-bold font-mono text-foreground">
                        {formatCurrency(item.value, settings.currency_primary, settings.uzs_rate)}
                      </span>
                    </div>
                    <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
                      <div 
                        className="h-full rounded-full transition-all duration-500" 
                        style={{ width: `${item.percentage}%`, backgroundColor: color }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>

      {/* Recent Transactions Stream */}
      {recentTransactions.length > 0 && (
        <div className="bg-card rounded-3xl p-5 border border-border/80 shadow-sm">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Recent Money Stream</h3>
            <span className="text-xs text-muted-foreground font-medium">Latest {recentTransactions.length}</span>
          </div>

          <div className="space-y-2">
            {recentTransactions.map((txn, i) => (
              <motion.div 
                key={txn.id || i}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.04 }}
                className="flex items-center justify-between p-3 rounded-2xl bg-muted/30 border border-border/40 hover:bg-muted/60 transition-all"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <div className={`w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 ${txn.txnType === 'income' ? 'bg-emerald-500/10 text-emerald-500' : 'bg-rose-500/10 text-rose-500'}`}>
                    {txn.txnType === 'income' ? <ArrowUpRight className="w-4 h-4" /> : <ArrowDownRight className="w-4 h-4" />}
                  </div>
                  <div className="min-w-0">
                    <p className="text-xs font-bold text-foreground truncate">{txn.title}</p>
                    <p className="text-[10px] text-muted-foreground">
                      {formatDate(txn.date)} {txn.category ? `• ${txn.category}` : ''}
                    </p>
                  </div>
                </div>

                <div className="text-right">
                  <p className={`text-xs font-extrabold font-mono ${txn.txnType === 'income' ? 'text-emerald-500' : 'text-rose-500'}`}>
                    {txn.txnType === 'income' ? '+' : '-'}{formatCurrency(txn.amount, settings.currency_primary, settings.uzs_rate, txn.currency)}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

