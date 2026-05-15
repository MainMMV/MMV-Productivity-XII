import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { base44 } from "@/api/base44Client";
import { getToday } from "@/lib/utils";

interface AddTransactionDialogProps {
  open: boolean;
  onClose: () => void;
  type: string;
  onSaved: () => void;
  settings: any;
}

export default function AddTransactionDialog({ open, onClose, type, onSaved, settings }: AddTransactionDialogProps) {
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    title: "",
    amount: "",
    date: getToday(),
    category: "General",
    source: "Pocket",
    billing_cycle: "monthly",
    currency: settings.currency_primary || "USD",
    next_billing: getToday(),
    reminder_time: ""
  });

  async function handleSave() {
    if (!form.title || !form.amount) return;
    setLoading(true);
    try {
      const amount = parseFloat(form.amount);
      const isUSD = form.currency === "USD";
      // We store both amount and amount_usd for convenience
      const amountUSD = isUSD ? amount : amount / settings.uzs_rate;
      
      const payload = { 
        ...form, 
        amount: amount,
        amount_usd: amountUSD,
        is_active: type === "subscription" ? true : undefined
      };

      if (type === "expense") {
        await base44.entities.Expense.create(payload);
      } else if (type === "income") {
        await base44.entities.Income.create(payload);
      } else if (type === "subscription") {
        await base44.entities.Subscription.create(payload);
      }
      onSaved();
      onClose();
      // Reset form
      setForm({ ...form, title: "", amount: "" });
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  }

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="rounded-3xl mx-auto max-w-sm w-[calc(100%-2rem)]">
        <DialogHeader>
          <DialogTitle className="capitalize">Add {type}</DialogTitle>
        </DialogHeader>
        <div className="space-y-4 pt-2">
          <div>
            <Label>Title *</Label>
            <Input value={form.title} onChange={e => setForm(f => ({ ...f, title: e.target.value }))} placeholder={`e.g. ${type === 'income' ? 'Salary' : 'Grocery'}`} className="rounded-xl mt-1" />
          </div>
          <div className="grid grid-cols-3 gap-2">
            <div className="col-span-2">
              <Label>Amount *</Label>
              <Input type="number" value={form.amount} onChange={e => setForm(f => ({ ...f, amount: e.target.value }))} placeholder="0.00" className="rounded-xl mt-1" />
            </div>
            <div>
              <Label>Currency</Label>
              <Select value={form.currency} onValueChange={v => setForm(f => ({ ...f, currency: v }))}>
                <SelectTrigger className="rounded-xl mt-1">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="USD">$</SelectItem>
                  <SelectItem value="UZS">сўм</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          {type !== 'subscription' && (
            <div>
              <Label>Date</Label>
              <Input type="date" value={form.date} onChange={e => setForm(f => ({ ...f, date: e.target.value }))} className="rounded-xl mt-1" />
            </div>
          )}
          {type === 'expense' && (
            <div>
              <Label>Category</Label>
              <Select value={form.category} onValueChange={v => setForm(f => ({ ...f, category: v }))}>
                <SelectTrigger className="rounded-xl mt-1"><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="Food">🍔 Food</SelectItem>
                  <SelectItem value="Transport">🚗 Transport</SelectItem>
                  <SelectItem value="Housing">🏠 Housing</SelectItem>
                  <SelectItem value="Entertainment">🎬 Entertainment</SelectItem>
                  <SelectItem value="General">🔧 General</SelectItem>
                </SelectContent>
              </Select>
            </div>
          )}
          {type === 'subscription' && (
            <>
              <div>
                <Label>Cycle</Label>
                <Select value={form.billing_cycle} onValueChange={v => setForm(f => ({ ...f, billing_cycle: v }))}>
                  <SelectTrigger className="rounded-xl mt-1"><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="monthly">Monthly</SelectItem>
                    <SelectItem value="yearly">Yearly</SelectItem>
                    <SelectItem value="weekly">Weekly</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <Label>Next Billing</Label>
                  <Input type="date" value={form.next_billing} onChange={e => setForm(f => ({ ...f, next_billing: e.target.value }))} className="rounded-xl mt-1" />
                </div>
                <div>
                  <Label>Reminder Time</Label>
                  <Input type="time" value={form.reminder_time} onChange={e => setForm(f => ({ ...f, reminder_time: e.target.value }))} className="rounded-xl mt-1" />
                </div>
              </div>
            </>
          )}
          <Button onClick={handleSave} disabled={loading} className="w-full rounded-xl">
            {loading ? "Saving..." : "Save Transaction"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
