import { useState, useEffect } from "react";
import { base44 } from "@/api/base44Client";
import { motion } from "framer-motion";
import { TrendingUp, TrendingDown, Plus } from "lucide-react";
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

  const totalExpenses = filteredExpenses.reduce((s, e) => s + (e.amount_usd || e.amount || 0), 0);
  const totalIncome = filteredIncome.reduce((s, i) => s + (i.amount_usd || i.amount || 0), 0);
  const balance = totalIncome - totalExpenses;
  const monthlySubscriptions = subscriptions.filter(s => s.is_active && s.billing_cycle === "monthly").reduce((sum, s) => sum + (s.amount || 0), 0);

  function openAdd(type: string) {
    setAddType(type);
    setShowAdd(true);
  }

  return (
    <PullToRefresh onRefresh={loadAll}>
    <div className="px-4 pt-6 pb-4">
      <motion.div initial={{ opacity: 0, y: -12 }} animate={{ opacity: 1, y: 0 }} transition={{ type: "spring", stiffness: 280 }} className="flex items-center justify-between mb-4">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Finance</h1>
          <p className="text-xs text-muted-foreground">Track your money flow</p>
        </div>
        <div className="flex items-center gap-2">
          <DateRangePicker variant="icon" value={dateRange} onChange={setDateRange} />
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button size="icon" className="rounded-xl shadow-lg">
                <Plus className="w-5 h-5" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="rounded-2xl">
              <DropdownMenuItem onClick={() => openAdd("expense")} className="gap-2 rounded-xl">
                <TrendingDown className="w-4 h-4 text-rose-500" /> 
                <span className="font-medium">Add Expense</span>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => openAdd("income")} className="gap-2 rounded-xl">
                <TrendingUp className="w-4 h-4 text-emerald-500" /> 
                <span className="font-medium">Add Income</span>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => openAdd("subscription")} className="gap-2 rounded-xl">
                <Plus className="w-4 h-4 text-primary" /> 
                <span className="font-medium">Add Subscription</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </motion.div>

      {/* Balance Card */}
      <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
        className={`rounded-3xl p-5 mb-5 text-white shadow-lg ${balance >= 0 ? "bg-emerald-600" : "bg-rose-600"}`}>
        <p className="text-[10px] opacity-80 font-bold uppercase ">Net Balance</p>
        <p className="text-3xl font-bold mt-1 leading-none">{formatCurrency(Math.abs(balance), cur, rate)}</p>
        <p className="text-[10px] opacity-70 mt-2 font-medium">{balance >= 0 ? "Positive balance" : "Spending exceeds income"}</p>
        <div className="flex gap-4 mt-6 pt-6 border-t border-white/10 overflow-x-auto scrollbar-none">
          <div>
            <p className="text-[10px] opacity-70 uppercase font-bold ">Income</p>
            <p className="text-sm font-bold">{formatCurrency(totalIncome, cur, rate)}</p>
          </div>
          <div className="w-px h-8 bg-white/10" />
          <div>
            <p className="text-[10px] opacity-70 uppercase font-bold ">Spending</p>
            <p className="text-sm font-bold">{formatCurrency(totalExpenses, cur, rate)}</p>
          </div>
          <div className="w-px h-8 bg-white/10" />
          <div>
            <p className="text-[10px] opacity-70 uppercase font-bold ">Monthly Subs</p>
            <p className="text-sm font-bold">{formatCurrency(monthlySubscriptions, cur, rate)}</p>
          </div>
        </div>
      </motion.div>

      {/* Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="w-full rounded-2xl mb-4 bg-muted/50 h-11 p-1">
          <TabsTrigger value="overview" className="flex-1 rounded-xl text-xs h-full">Overview</TabsTrigger>
          <TabsTrigger value="expenses" className="flex-1 rounded-xl text-xs h-full">Expenses</TabsTrigger>
          <TabsTrigger value="income" className="flex-1 rounded-xl text-xs h-full">Income</TabsTrigger>
          <TabsTrigger value="subscriptions" className="flex-1 rounded-xl text-xs h-full">Subs</TabsTrigger>
        </TabsList>

        <TabsContent value="overview">
          <FinanceSummary expenses={filteredExpenses} income={filteredIncome} settings={settings} />
        </TabsContent>
        <TabsContent value="expenses">
          <ExpenseList expenses={filteredExpenses} onRefresh={loadAll} settings={settings} dateRange={dateRange} />
        </TabsContent>
        <TabsContent value="income">
          <IncomeList income={filteredIncome} onRefresh={loadAll} settings={settings} dateRange={dateRange} />
        </TabsContent>
        <TabsContent value="subscriptions">
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
