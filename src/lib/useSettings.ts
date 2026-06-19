import { useState, useEffect } from "react";
import { base44 } from "@/api/base44Client";

const DEFAULT_SETTINGS = {
  currency_primary: "USD",
  currency_secondary: "UZS",
  theme_hue: 220,
  theme_mode: "light",
  border_radius_percentage: 35,
  animation_timing: "ease-in-out",
  container_width: "100%",
  uzs_rate: 12200,
  notifications_enabled: true,
  tasks_notifications: true,
  habits_notifications: true,
  daily_reminder_time: "09:30",
  reminder_advance_time: 30, // minutes
  notify_missed: true,
  first_name: "MMV",
  last_name: "User",
  calendar_start_day: "Monday" as "Monday" | "Sunday",
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

    // Dynamically update favicon and app icon
    const hue = settings.theme_hue || 220;
    const color = `hsl(${hue}, 90%, 66%)`;
    const darkColor = `hsl(${hue}, 90%, 55%)`;
    
    const svg = `
      <svg width="256" height="256" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <filter id="shadow" x="-10%" y="-10%" width="120%" height="120%">
            <feDropShadow dx="0" dy="2" stdDeviation="1.5" flood-opacity="0.2" flood-color="${darkColor}" />
          </filter>
        </defs>
        <rect width="100" height="100" rx="${radiusVal / 2.5}" fill="white" />
        <g transform="translate(15, 15) scale(0.7)" filter="url(#shadow)">
          <path d="M 75 25 A 35 35 0 1 0 85 50" fill="none" stroke="${color}" stroke-width="18" stroke-linecap="round" />
          <path d="M 30 55 L 45 70 L 75 40" fill="none" stroke="${color}" stroke-width="18" stroke-linecap="round" stroke-linejoin="round" />
        </g>
      </svg>
    `.trim().replace(/>\s+</g, '><');

    const dataUrl = `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`;

    let favLink = document.querySelector('link[rel="icon"]');
    if (!favLink) {
      favLink = document.createElement('link');
      favLink.setAttribute('rel', 'icon');
      document.head.appendChild(favLink);
    }
    favLink.setAttribute('href', dataUrl);

    let appleLink = document.querySelector('link[rel="apple-touch-icon"]');
    if (!appleLink) {
      appleLink = document.createElement('link');
      appleLink.setAttribute('rel', 'apple-touch-icon');
      document.head.appendChild(appleLink);
    }
    appleLink.setAttribute('href', dataUrl);

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
    let localSettings = DEFAULT_SETTINGS;
    try {
      const stored = localStorage.getItem("mmv-settings");
      if (stored) {
        localSettings = { ...DEFAULT_SETTINGS, ...JSON.parse(stored) };
        setSettings(localSettings);
      }
    } catch (e) {}

    try {
      const list = await base44.entities.UserSettings.list();
      if (list && list.length > 0) {
        const dbSettings = { ...DEFAULT_SETTINGS, ...list[0] };
        setSettings(dbSettings);
        setSettingsId(list[0].id);
        localStorage.setItem("mmv-settings", JSON.stringify(dbSettings));
      } else {
        // Logged in but no settings? Create them!
        const created = await base44.entities.UserSettings.create(localSettings);
        setSettingsId(created.id);
      }
    } catch (e) {
      console.log("No DB settings found (not logged in), using local/defaults");
    } finally {
      setLoading(false);
    }
  }

  function updateSettings(updates: any) {
    setSettings(prev => {
      const next = { ...prev, ...updates };
      localStorage.setItem("mmv-settings", JSON.stringify(next));
      return next;
    });
    setHasChanges(true);
  }

  async function saveSettings() {
    try {
      setLoading(true);
      
      const payload = { ...settings };
      // Remove id and user_id if they exist to prevent overriding
      delete payload.id;
      delete payload.user_id;

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
