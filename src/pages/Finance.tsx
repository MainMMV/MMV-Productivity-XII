import { useState, useEffect } from "react";
import { base44 } from "@/api/base44Client";
import { motion } from "framer-motion";
import { TrendingUp, TrendingDown, Plus, Eye, EyeOff, Wallet, RefreshCw, ArrowUpRight, ArrowDownRight, CreditCard } from "lucide-react";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import ExpenseList from "@/components/finance/ExpenseList";
import IncomeList from "@/components/finance/IncomeList";
import SubscriptionList from "@/components/finance/SubscriptionList";
import AddTransactionDialog from "@/components/finance/AddTransactionDialog";
import FinanceSummary from "@/components/finance/FinanceSummary";
import DateRangePicker from "@/components/ui/DateRangePicker";
import PullToRefresh from "@/components/common/PullToRefresh";
import { useSettings } from "@/lib/useSettings";
import { formatCurrency } from "@/lib/utils";

export default function Finance() {
  const [expenses, setExpenses] = useState<any[]>([]);
  const [income, setIncome] = useState<any[]>([]);
  const [subscriptions, setSubscriptions] = useState<any[]>([]);
  const [showAdd, setShowAdd] = useState(false);
  const [addType, setAddType] = useState("expense");
  const [dateRange, setDateRange] = useState<any>(null);
  const [activeTab, setActiveTab] = useState("overview");
  const [hideAmounts, setHideAmounts] = useState(false);
  const { settings } = useSettings();

  useEffect(() => { loadAll(); }, []);

  async function loadAll() {
    const [e, i, s] = await Promise.all([
      base44.entities.Expense.list("-date", 200),
      base44.entities.Income.list("-date", 200),
      base44.entities.Subscription.list(),
    ]);
    setExpenses(e || []);
    setIncome(i || []);
    setSubscriptions(s || []);
  }

  const cur = settings.currency_primary;
  const rate = settings.uzs_rate;

  const filterByDate = (items: any[]) => {
    if (!dateRange?.from) return items;
    return items.filter(item => {
      const d = new Date(item.date);
      if (dateRange.to) {
        const toD = new Date(dateRange.to);
        return d >= dateRange.from && d <= toD;
      }
      const fromStr = dateRange.from.toISOString().split("T")[0];
      return item.date?.startsWith(fromStr);
    });
  };

  const filteredExpenses = filterByDate(expenses);
  const filteredIncome = filterByDate(income);

  const getAmountInPrimary = (item: any) => {
    let amt = item.amount || 0;
    if (item.currency === 'USD' && settings.currency_primary === 'UZS') amt *= settings.uzs_rate;
    if (item.currency === 'UZS' && settings.currency_primary === 'USD') amt /= settings.uzs_rate;
    return amt;
  };

  const totalExpenses = filteredExpenses.reduce((s, e) => s + getAmountInPrimary(e), 0);
  const totalIncome = filteredIncome.reduce((s, i) => s + getAmountInPrimary(i), 0);
  const balance = totalIncome - totalExpenses;
  const monthlySubscriptions = subscriptions.filter(s => s.is_active && s.billing_cycle === "monthly").reduce((sum, s) => sum + getAmountInPrimary(s), 0);

  function openAdd(type: string) {
    setAddType(type);
    setShowAdd(true);
  }

  const mask = (val: string) => hideAmounts ? "••••••" : val;

  return (
    <PullToRefresh onRefresh={loadAll}>
    <div className="px-4 pt-6 pb-6 max-w-5xl mx-auto space-y-5">
      {/* Header */}
      <motion.div initial={{ opacity: 0, y: -12 }} animate={{ opacity: 1, y: 0 }} transition={{ type: "spring", stiffness: 280 }} className="flex items-center justify-between">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-black tracking-tight text-foreground">Finance</h1>
            <span className="text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-full bg-primary/10 text-primary border border-primary/20">
              {cur}
            </span>
          </div>
          <p className="text-xs text-muted-foreground font-medium">Track cashflow, expenses & monthly subscriptions</p>
        </div>
        
        <div className="flex items-center gap-2">
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={() => setHideAmounts(!hideAmounts)} 
            className="rounded-xl h-9 w-9 text-muted-foreground hover:text-foreground"
            title={hideAmounts ? "Show Amounts" : "Hide Amounts"}
          >
            {hideAmounts ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
          </Button>
          <DateRangePicker variant="icon" value={dateRange} onChange={setDateRange} />
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button size="icon" className="rounded-xl h-9 w-9 shadow-md bg-primary hover:bg-primary/90">
                <Plus className="w-5 h-5" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="rounded-2xl p-1.5 min-w-[170px]">
              <DropdownMenuItem onClick={() => openAdd("expense")} className="gap-2.5 rounded-xl cursor-pointer py-2 font-semibold">
                <div className="w-6 h-6 rounded-lg bg-rose-500/10 text-rose-500 flex items-center justify-center">
                  <ArrowDownRight className="w-3.5 h-3.5" />
                </div>
                <span>Add Expense</span>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => openAdd("income")} className="gap-2.5 rounded-xl cursor-pointer py-2 font-semibold">
                <div className="w-6 h-6 rounded-lg bg-emerald-500/10 text-emerald-500 flex items-center justify-center">
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </div>
                <span>Add Income</span>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => openAdd("subscription")} className="gap-2.5 rounded-xl cursor-pointer py-2 font-semibold">
                <div className="w-6 h-6 rounded-lg bg-indigo-500/10 text-indigo-500 flex items-center justify-center">
                  <CreditCard className="w-3.5 h-3.5" />
                </div>
                <span>Add Subscription</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </motion.div>

      {/* Wealth Balance Card */}
      <motion.div 
        initial={{ opacity: 0, y: 12 }} 
        animate={{ opacity: 1, y: 0 }}
        className="relative rounded-3xl p-6 bg-card text-card-foreground border border-border/80 shadow-sm overflow-hidden transition-colors"
      >
        {/* Subtle theme ambient accent blur */}
        <div className="absolute -top-12 -right-12 w-48 h-48 bg-primary/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-12 -left-12 w-48 h-48 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 space-y-5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
                <Wallet className="w-4 h-4" />
              </div>
              <span className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Net Wealth Balance</span>
            </div>
            
            <span className={`text-[11px] font-bold px-2.5 py-1 rounded-full border ${
              balance >= 0 
                ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20" 
                : "bg-rose-500/10 text-rose-600 dark:text-rose-400 border-rose-500/20"
            }`}>
              {balance >= 0 ? "+ Positive Flow" : "- Spending Exceeds"}
            </span>
          </div>

          <div>
            <p className="text-3xl sm:text-4xl font-black font-mono tracking-tight leading-none text-foreground">
              {mask(formatCurrency(Math.abs(balance), cur, rate))}
            </p>
          </div>

          {/* Quick Action Pills inside Card */}
          <div className="flex flex-wrap items-center gap-2 pt-1">
            <button 
              onClick={() => openAdd("expense")} 
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-rose-500/10 hover:bg-rose-500/20 text-rose-600 dark:text-rose-400 text-xs font-bold transition-all border border-rose-500/20"
            >
              <ArrowDownRight className="w-3.5 h-3.5" /> + Expense
            </button>
            <button 
              onClick={() => openAdd("income")} 
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 text-xs font-bold transition-all border border-emerald-500/20"
            >
              <ArrowUpRight className="w-3.5 h-3.5" /> + Income
            </button>
            <button 
              onClick={() => openAdd("subscription")} 
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-primary/10 hover:bg-primary/20 text-primary text-xs font-bold transition-all border border-primary/20"
            >
              <CreditCard className="w-3.5 h-3.5" /> + Sub
            </button>
          </div>

          {/* Stat Pillars */}
          <div className="grid grid-cols-3 gap-2 pt-4 border-t border-border/80">
            <div>
              <p className="text-[10px] text-muted-foreground uppercase font-bold tracking-wider">Total Income</p>
              <p className="text-sm font-extrabold font-mono text-emerald-600 dark:text-emerald-400 mt-0.5">
                {mask(formatCurrency(totalIncome, cur, rate))}
              </p>
            </div>
            <div>
              <p className="text-[10px] text-muted-foreground uppercase font-bold tracking-wider">Total Spending</p>
              <p className="text-sm font-extrabold font-mono text-rose-600 dark:text-rose-400 mt-0.5">
                {mask(formatCurrency(totalExpenses, cur, rate))}
              </p>
            </div>
            <div>
              <p className="text-[10px] text-muted-foreground uppercase font-bold tracking-wider">Monthly Subs</p>
              <p className="text-sm font-extrabold font-mono text-primary mt-0.5">
                {mask(formatCurrency(monthlySubscriptions, cur, rate))}
              </p>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Navigation Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="w-full rounded-2xl bg-muted/60 h-11 p-1 grid grid-cols-4 border border-border/50">
          <TabsTrigger value="overview" className="rounded-xl text-xs font-bold h-full">Overview</TabsTrigger>
          <TabsTrigger value="expenses" className="rounded-xl text-xs font-bold h-full">Expenses</TabsTrigger>
          <TabsTrigger value="income" className="rounded-xl text-xs font-bold h-full">Income</TabsTrigger>
          <TabsTrigger value="subscriptions" className="rounded-xl text-xs font-bold h-full">Subs</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="mt-4">
          <FinanceSummary 
            expenses={filteredExpenses} 
            income={filteredIncome} 
            settings={settings} 
            onOpenAdd={openAdd}
            onRefresh={loadAll}
          />
        </TabsContent>

        <TabsContent value="expenses" className="mt-4">
          <ExpenseList expenses={filteredExpenses} onRefresh={loadAll} settings={settings} dateRange={dateRange} />
        </TabsContent>

        <TabsContent value="income" className="mt-4">
          <IncomeList income={filteredIncome} onRefresh={loadAll} settings={settings} dateRange={dateRange} />
        </TabsContent>

        <TabsContent value="subscriptions" className="mt-4">
          <SubscriptionList subscriptions={subscriptions} onRefresh={loadAll} settings={settings} />
        </TabsContent>
      </Tabs>

      <AddTransactionDialog
        open={showAdd}
        onClose={() => setShowAdd(false)}
        type={addType}
        onSaved={loadAll}
        settings={settings}
      />
    </div>
    </PullToRefresh>
  );
}

