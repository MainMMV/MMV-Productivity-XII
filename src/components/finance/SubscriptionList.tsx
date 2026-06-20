import { Trash2, CreditCard, Check, X, MoreHorizontal } from "lucide-react";
import { formatCurrency } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";
import { base44 } from "@/api/base44Client";
import { Switch } from "@/components/ui/switch";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";

interface SubscriptionListProps {
  subscriptions: any[];
  onRefresh: () => void;
  settings: any;
}

export default function SubscriptionList({ subscriptions, onRefresh, settings }: SubscriptionListProps) {
  async function toggle(sub: any) {
    await base44.entities.Subscription.update(sub.id, { is_active: !sub.is_active });
    onRefresh();
  }

  async function remove(id: string) {
    await base44.entities.Subscription.delete(id);
    onRefresh();
  }

  return (
    <div className="space-y-3">
      <AnimatePresence>
        {subscriptions.map((sub, i) => (
          <motion.div 
            key={sub.id} 
            initial={{ opacity: 0, y: 10 }} 
            animate={{ opacity: 1, y: 0 }} 
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ delay: i * 0.05 }}
            className={`bg-card rounded-2xl p-4 border border-border flex items-center gap-3 transition-all hover:bg-primary/5 hover:border-primary/20 group ${!sub.is_active ? "opacity-50 grayscale hover:grayscale-0" : ""}`}
          >
            <div className="w-10 h-10 rounded-xl bg-blue-500/10 flex items-center justify-center flex-shrink-0 group-hover:bg-blue-500/20 transition-colors">
              <CreditCard className="w-5 h-5 text-blue-500" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-bold truncate group-hover:text-primary transition-colors">{sub.title}</p>
              <p className="text-[10px] text-muted-foreground uppercase">
                {(() => {
                  if (sub.billing_cycle === 'custom') {
                    const daysMap: Record<number, string> = { 1: "Mon", 2: "Tue", 3: "Wed", 4: "Thu", 5: "Fri", 6: "Sat", 0: "Sun" };
                    const selected = (sub.custom_days || []).map((d: number) => daysMap[d]).filter(Boolean).join(', ');
                    return `Custom: ${selected || 'days'}`;
                  }
                  return sub.billing_cycle || "Monthly";
                })()}
                {sub.next_billing && ` • Next: ${new Date(sub.next_billing).toLocaleDateString("en-US")}`}
              </p>
            </div>
            <div className="text-right flex items-center gap-4">
              <div>
                <p className="text-sm font-bold text-foreground">
                  {formatCurrency(sub.amount, settings.currency_primary, settings.uzs_rate, sub.currency)}
                </p>
              </div>
              <div className="flex items-center gap-2">
                <Switch checked={sub.is_active} onCheckedChange={() => toggle(sub)} />
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <button className="p-1.5 rounded-xl hover:bg-primary/10 text-muted-foreground transition-all">
                      <MoreHorizontal className="w-4 h-4" />
                    </button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="rounded-2xl">
                    <DropdownMenuItem onClick={() => remove(sub.id)} className="gap-2 text-destructive focus:text-destructive rounded-xl">
                      <Trash2 className="w-3.5 h-3.5" /> Delete
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
          </motion.div>
        ))}
      </AnimatePresence>
      {subscriptions.length === 0 && (
        <div className="text-center py-12">
          <p className="text-xs text-muted-foreground">No recurring subscriptions</p>
        </div>
      )}
    </div>
  );
}
