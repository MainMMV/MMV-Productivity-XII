import { useState, useEffect } from "react";
import { base44 } from "@/api/base44Client";

const DEFAULT_SETTINGS = {
  currency_primary: "USD",
  currency_secondary: "UZS",
  theme_hue: 220,
  theme_mode: "light",
  border_radius_percentage: 35,
  uzs_rate: 12200,
  notifications_enabled: true,
  tasks_notifications: true,
  habits_notifications: true,
  first_name: "MMV",
  last_name: "User",
};

export function useSettings() {
  const [settings, setSettings] = useState(DEFAULT_SETTINGS);
  const [loading, setLoading] = useState(true);
  const [settingsId, setSettingsId] = useState<string | null>(null);
  const [hasChanges, setHasChanges] = useState(false);

  useEffect(() => {
    loadSettings();
  }, []);

  // Apply dynamic theme color and border radius whenever they change
  useEffect(() => {
    document.documentElement.style.setProperty("--primary", `${settings.theme_hue} 90% 66%`);
    document.documentElement.style.setProperty("--ring", `${settings.theme_hue} 90% 66%`);
    document.documentElement.style.setProperty("--chart-1", `${settings.theme_hue} 90% 66%`);
    
    // Border radius: 50% = 1rem (base), 0% = 0rem, 100% = 2rem
    const radiusVal = typeof settings.border_radius_percentage !== 'undefined' ? settings.border_radius_percentage : 35;
    const radiusRem = (radiusVal / 50) * 1;
    document.documentElement.style.setProperty("--radius", `${radiusRem}rem`);
  }, [settings.theme_hue, settings.border_radius_percentage]);

  // Apply dark/light/system mode
  useEffect(() => {
    const root = document.documentElement;
    const applyDark = (dark: boolean) => {
      if (dark) root.classList.add("dark");
      else root.classList.remove("dark");
    };
    if (settings.theme_mode === "dark") {
      applyDark(true);
    } else if (settings.theme_mode === "light") {
      applyDark(false);
    } else {
      const mq = window.matchMedia("(prefers-color-scheme: dark)");
      applyDark(mq.matches);
      const handler = (e: MediaQueryListEvent) => applyDark(e.matches);
      mq.addEventListener("change", handler);
      return () => mq.removeEventListener("change", handler);
    }
  }, [settings.theme_mode]);

  async function loadSettings() {
    try {
      const me = await base44.auth.me();
      const list = await base44.entities.UserSettings.filter({ userId: me.id });
      if (list && list.length > 0) {
        setSettings({ ...DEFAULT_SETTINGS, ...list[0] });
        setSettingsId(list[0].id);
      }
    } catch (e) {
      console.log("No settings found, using defaults");
    } finally {
      setLoading(false);
    }
  }

  function updateSettings(updates: any) {
    setSettings(prev => ({ ...prev, ...updates }));
    setHasChanges(true);
  }

  async function saveSettings() {
    try {
      setLoading(true);
      const me = await base44.auth.me();
      const payload = { ...settings, userId: me.id };
      if (settingsId) {
        await base44.entities.UserSettings.update(settingsId, payload);
      } else {
        const created = await base44.entities.UserSettings.create(payload);
        setSettingsId(created.id);
      }
      setHasChanges(false);
    } catch (e) {
      console.error("Failed to save settings", e);
    } finally {
      setLoading(false);
    }
  }

  return { settings, updateSettings, saveSettings, hasChanges, loading };
}
