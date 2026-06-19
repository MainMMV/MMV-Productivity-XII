import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip as RechartsTooltip } from "recharts";
import { formatCurrency } from "@/lib/utils";

interface FinanceSummaryProps {
  expenses: any[];
  income: any[];
  settings: any;
}

export default function FinanceSummary({ expenses, income, settings }: FinanceSummaryProps) {
  const getAmountInPrimary = (item: any) => {
    let amt = item.amount || 0;
    if (item.currency === 'USD' && settings.currency_primary === 'UZS') amt *= settings.uzs_rate;
    if (item.currency === 'UZS' && settings.currency_primary === 'USD') amt /= settings.uzs_rate;
    return amt;
  };

  const categoryTotals: Record<string, number> = {};
  expenses.forEach(e => {
    const cat = e.category || "General";
    categoryTotals[cat] = (categoryTotals[cat] || 0) + getAmountInPrimary(e);
  });

  const chartData = Object.keys(categoryTotals).map(cat => ({
    name: cat,
    value: categoryTotals[cat]
  }));

  const COLORS = ["hsl(var(--primary))", "hsl(var(--accent))", "#f43f5e", "#10b981", "#f59e0b", "#8b5cf6"];

  return (
    <div className="space-y-6">
      {/* Chart */}
      <div className="bg-card rounded-3xl p-5 border border-border h-[260px]">
        <h3 className="text-xs font-bold text-muted-foreground uppercase mb-2">Spending by Category</h3>
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={chartData}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={80}
              paddingAngle={5}
              dataKey="value"
            >
              {chartData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} stroke="none" />
              ))}
            </Pie>
            <RechartsTooltip 
              contentStyle={{ borderRadius: '1rem', border: 'none', background: 'hsl(var(--card))', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
              formatter={(val: number) => formatCurrency(val, settings.currency_primary, settings.uzs_rate)}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>

      {/* Breakdowns */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
        {chartData.sort((a,b) => b.value - a.value).map((item, i) => (
          <div key={item.name} className="bg-card rounded-2xl p-4 border border-border flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 rounded-full" style={{ backgroundColor: COLORS[i % COLORS.length] }} />
              <span className="text-sm font-semibold">{item.name}</span>
            </div>
            <span className="text-sm font-bold font-mono">
              {formatCurrency(item.value, settings.currency_primary, settings.uzs_rate)}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
