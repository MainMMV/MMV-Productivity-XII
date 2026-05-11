import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Palette, DollarSign, RefreshCw, Moon, Sun, Monitor, Bell } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useSettings } from "@/lib/useSettings";
import { base44 } from "@/api/base44Client";

const ALL_HUES = [
  { label: "Red", hue: 0, color: "#ef4444" },
  { label: "Orange", hue: 25, color: "#f97316" },
  { label: "Amber", hue: 38, color: "#f59e0b" },
  { label: "Yellow", hue: 45, color: "#eab308" },
  { label: "Lime", hue: 84, color: "#84cc16" },
  { label: "Green", hue: 142, color: "#22c55e" },
  { label: "Emerald", hue: 160, color: "#10b981" },
  { label: "Cyan", hue: 190, color: "#06b6d4" },
  { label: "Blue", hue: 220, color: "#3b82f6" },
  { label: "Indigo", hue: 239, color: "#6366f1" },
  { label: "Violet", hue: 258, color: "#8b5cf6" },
  { label: "Rose", hue: 340, color: "#f43f5e" },
];

export default function Settings() {
  const { settings, updateSettings, loading } = useSettings();
  const [uzsInput, setUzsInput] = useState("");
  const [fetchingRate, setFetchingRate] = useState(false);
  const [localLoading, setLoading] = useState(false);

  useEffect(() => {
    if (settings.uzs_rate) {
      setUzsInput(String(settings.uzs_rate));
    }
  }, [settings.uzs_rate]);

  async function fetchLiveRate() {
    // AI feature disabled as per rule: "Don't use any ai features"
    return;
  }

  function saveUzsRate() {
    const r = parseFloat(uzsInput);
    if (r > 0) updateSettings({ uzs_rate: r });
  }

  if (loading || localLoading) return <div className="flex items-center justify-center min-h-[60dvh]"><div className="w-10 h-10 rounded-full border-4 border-primary/20 border-t-primary animate-spin" /></div>;

  return (
    <div className="px-4 pt-6 pb-28">
      <div className="mb-6">
        <h1 className="text-2xl font-bold">Settings</h1>
        <p className="text-xs text-muted-foreground">Customize your experience</p>
      </div>

      {/* Profile */}
      <motion.section initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="mb-6">
        <div className="flex items-center gap-2 mb-3 px-1">
          <div className="w-4 h-4 flex items-center justify-center rounded-full bg-primary text-white text-[10px] font-bold">M</div>
          <h2 className="text-sm font-semibold">Profile</h2>
        </div>
        <div className="bg-card rounded-3xl p-5 border border-border shadow-sm flex items-center gap-4">
           <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center text-white font-bold text-lg">M</div>
           <div>
              <p className="font-bold">MMV User</p>
              <p className="text-xs text-muted-foreground">mfozilbek9309@gmail.com</p>
           </div>
        </div>
      </motion.section>

      {/* Appearance */}
      <motion.section initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="mb-6">
        <div className="flex items-center gap-2 mb-3 px-1">
          <Palette className="w-4 h-4 text-primary" />
          <h2 className="text-sm font-semibold">Appearance</h2>
        </div>
        <div className="bg-card rounded-3xl p-5 border border-border shadow-sm">
          
          {/* Display Mode inside Appearance */}
          <div className="mb-6">
            <Label className="text-xs font-bold mb-3 block">Display Mode</Label>
            <div className="bg-muted/50 rounded-2xl p-1 border border-border flex gap-1">
              {[
                { val: "light", Icon: Sun, label: "Light" },
                { val: "dark", Icon: Moon, label: "Dark" },
                { val: "system", Icon: Monitor, label: "System" }
              ].map(({ val, Icon, label }) => (
                <button key={val} onClick={() => updateSettings({ theme_mode: val })}
                  className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl text-xs font-bold transition-all ${settings.theme_mode === val ? "bg-card text-foreground shadow-sm" : "text-muted-foreground"}`}>
                  <Icon className="w-4 h-4" /> {label}
                </button>
              ))}
            </div>
          </div>

          <div className="mb-6 h-px bg-border w-full" />

          {/* Theme Color Grid */}
          <p className="text-xs font-bold mb-4">Accent Color</p>
          <div className="grid grid-cols-6 gap-x-2 gap-y-4">
            {ALL_HUES.map(preset => (
              <button key={preset.hue} onClick={() => updateSettings({ theme_hue: preset.hue })}
                className="flex flex-col items-center gap-2">
                <div className={`w-10 h-10 rounded-2xl border-2 transition-all ${settings.theme_hue === preset.hue ? "border-foreground scale-110 shadow-lg" : "border-transparent"}`}
                  style={{ backgroundColor: preset.color }} />
                <span className="text-[10px] font-bold text-muted-foreground uppercase">{preset.label}</span>
              </button>
            ))}
          </div>
          
          <div className="mt-5 pt-5 border-t border-border flex items-center justify-between">
            <Label className="text-xs font-bold">Custom hue (0-360)</Label>
            <Input type="number" min="0" max="360" value={settings.theme_hue} onChange={e => updateSettings({ theme_hue: parseInt(e.target.value) || 258 })} className="rounded-xl h-9 w-24 text-xs font-bold text-center" />
          </div>
          
          <div className="mt-5 pt-5 border-t border-border flex items-center justify-between">
            <Label className="text-xs font-bold flex flex-col">
              Custom Border
              <span className="text-[10px] text-muted-foreground font-medium">Border radius percentage</span>
            </Label>
            <div className="flex items-center gap-3">
              <input 
                type="range" 
                min="0" 
                max="75" 
                value={settings.border_radius_percentage ?? 35} 
                onChange={e => updateSettings({ border_radius_percentage: parseInt(e.target.value) })}
                className="w-24 accent-primary"
              />
              <span className="text-xs font-bold text-muted-foreground w-8 text-right">{settings.border_radius_percentage ?? 35}%</span>
            </div>
          </div>

          <div className="mt-6 pt-5 border-t border-border">
            <Button className="w-full rounded-xl h-11 font-bold" onClick={() => {/* Settings apply instantly anyway */}}>
              Apply Changes
            </Button>
          </div>
        </div>
      </motion.section>

      {/* Currency */}
      <motion.section initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="mb-6">
        <div className="flex items-center gap-2 mb-3 px-1">
          <DollarSign className="w-4 h-4 text-primary" />
          <h2 className="text-sm font-semibold">Currency</h2>
        </div>
        <div className="bg-card rounded-3xl p-5 border border-border shadow-sm space-y-5">
          <div>
            <Label className="text-xs font-bold text-muted-foreground uppercase mb-2 block">Primary Currency</Label>
            <Select value={settings.currency_primary} onValueChange={v => updateSettings({ currency_primary: v })}>
              <SelectTrigger className="rounded-xl h-11"><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="USD">🇺🇸 USD — US Dollar</SelectItem>
                <SelectItem value="UZS">🇺🇿 UZS — Uzbekistani Som</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="pt-4 border-t border-border">
            <Label className="text-xs font-bold text-muted-foreground uppercase mb-2 block">Exchange Rate (1 USD = ? UZS)</Label>
            <div className="flex gap-2">
              <Input value={uzsInput} onChange={e => setUzsInput(e.target.value)} className="rounded-xl h-11 text-sm font-bold" />
              <Button variant="outline" size="sm" onClick={saveUzsRate} className="rounded-xl h-11 px-4 font-bold border-primary/20 text-primary">Save Rate</Button>
            </div>
            <p className="text-[10px] text-muted-foreground mt-2 font-medium">Update exchange rate manually</p>
          </div>
        </div>
      </motion.section>

      {/* Notifications */}
      <motion.section initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }} className="mb-6">
        <div className="flex items-center gap-2 mb-3 px-1">
          <Bell className="w-4 h-4 text-primary" />
          <h2 className="text-sm font-semibold">Notifications</h2>
        </div>
        <div className="bg-card rounded-3xl p-5 border border-border shadow-sm space-y-5">
          {[
            { key: "notifications_enabled", label: "Push Notifications", desc: "Allow system reminders" },
            { key: "tasks_notifications", label: "Task Alerts", desc: "Notify on task due dates" },
            { key: "habits_notifications", label: "Habit Nudges", desc: "Daily reminders to complete habits" },
          ].map(item => (
            <div key={item.key} className="flex items-center justify-between">
              <div className="flex-1 pr-4">
                <p className="text-sm font-bold">{item.label}</p>
                <p className="text-[10px] text-muted-foreground font-medium">{item.desc}</p>
              </div>
              <Switch
                checked={(settings as any)[item.key]}
                onCheckedChange={v => updateSettings({ [item.key]: v })}
                disabled={item.key !== "notifications_enabled" && !settings.notifications_enabled}
              />
            </div>
          ))}
          <div className="pt-2">
            <Button 
              variant="secondary"
              onClick={() => Notification.requestPermission()}
              className="w-full text-xs font-bold rounded-2xl h-10">
              Grant Permission
            </Button>
          </div>
        </div>
      </motion.section>

      {/* Corporate Info */}
      <div className="text-center pb-8">
        <p className="text-[10px] font-bold text-muted-foreground uppercase">MMV Productivity</p>
        <p className="text-[9px] text-muted-foreground/50 mt-1">Version 12.0 • Build 2026.05</p>
      </div>
    </div>
  );
}
