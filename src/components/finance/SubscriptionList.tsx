import { Trash2, CreditCard, Check, X } from "lucide-react";
import { formatCurrency } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";
import { base44 } from "@/api/base44Client";
import { Switch } from "@/components/ui/switch";

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
            className={`bg-card rounded-2xl p-4 border border-border flex items-center gap-3 ${!sub.is_active ? "opacity-50 grayscale" : ""}`}
          >
            <div className="w-10 h-10 rounded-xl bg-blue-500/10 flex items-center justify-center flex-shrink-0">
              <CreditCard className="w-5 h-5 text-blue-500" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-bold truncate">{sub.title}</p>
              <p className="text-[10px] text-muted-foreground uppercase">{sub.billing_cycle || "Monthly"}</p>
            </div>
            <div className="text-right flex items-center gap-4">
              <div>
                <p className="text-sm font-bold">
                  {formatCurrency(sub.amount, settings.currency_primary, settings.uzs_rate)}
                </p>
                <div className="flex justify-end gap-1 mt-1">
                  <button onClick={() => remove(sub.id)} className="p-0.5 text-muted-foreground hover:text-destructive">
                    <Trash2 className="w-3 h-3" />
                  </button>
                </div>
              </div>
              <Switch checked={sub.is_active} onCheckedChange={() => toggle(sub)} />
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
