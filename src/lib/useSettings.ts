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

  // Apply preset theme custom css variables
  useEffect(() => {
    const root = document.documentElement;
    const isDark = settings.theme_mode === "dark" || 
      (settings.theme_mode === "system" && window.matchMedia("(prefers-color-scheme: dark)").matches);

    // List of custom design systems
    const presets: Record<string, {
      background: string;
      foreground: string;
      card: string;
      border: string;
      muted: string;
      secondary: string;
    }> = {
      slate: {
        background: isDark ? "222 47% 7%" : "215 25% 97%",
        foreground: isDark ? "210 40% 98%" : "222 47% 11%",
        card: isDark ? "222 47% 11%" : "0 0% 100%",
        border: isDark ? "217 32% 18%" : "214 32% 91%",
        muted: isDark ? "217 32% 15%" : "215 25% 92%",
        secondary: isDark ? "217 32% 15%" : "215 25% 92%"
      },
      sand: {
        background: isDark ? "20 30% 8%" : "36 40% 97%",
        foreground: isDark ? "36 30% 94%" : "24 60% 15%",
        card: isDark ? "20 20% 12%" : "36 50% 99%",
        border: isDark ? "24 20% 18%" : "34 30% 88%",
        muted: isDark ? "24 20% 14%" : "34 30% 92%",
        secondary: isDark ? "24 20% 14%" : "34 30% 92%"
      },
      mint: {
        background: isDark ? "150 40% 6%" : "140 20% 98%",
        foreground: isDark ? "140 30% 96%" : "152 60% 12%",
        card: isDark ? "150 30% 10%" : "0 0% 100%",
        border: isDark ? "150 20% 16%" : "140 20% 90%",
        muted: isDark ? "150 25% 12%" : "140 18% 93%",
        secondary: isDark ? "150 25% 12%" : "140 18% 93%"
      },
      obsidian: {
        background: isDark ? "240 10% 4.5%" : "240 10% 96%",
        foreground: isDark ? "0 0% 98%" : "240 10% 4%",
        card: isDark ? "240 10% 9%" : "0 0% 100%",
        border: isDark ? "240 6% 14%" : "240 10% 88%",
        muted: isDark ? "240 6% 11%" : "240 10% 92%",
        secondary: isDark ? "240 6% 11%" : "240 10% 92%"
      }
    };

    const preset = presets[(settings as any).theme_preset];
    if (preset) {
      root.style.setProperty("--background", preset.background);
      root.style.setProperty("--foreground", preset.foreground);
      root.style.setProperty("--card", preset.card);
      root.style.setProperty("--card-foreground", preset.foreground);
      root.style.setProperty("--border", preset.border);
      root.style.setProperty("--input", preset.border);
      root.style.setProperty("--muted", preset.muted);
      root.style.setProperty("--secondary", preset.secondary);
    } else {
      root.style.removeProperty("--background");
      root.style.removeProperty("--foreground");
      root.style.removeProperty("--card");
      root.style.removeProperty("--card-foreground");
      root.style.removeProperty("--border");
      root.style.removeProperty("--input");
      root.style.removeProperty("--muted");
      root.style.removeProperty("--secondary");
    }
  }, [settings.theme_mode, (settings as any).theme_preset]);

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

    // Race database operations against a 4-second timeout to prevent infinite hanging
    const dbLoadPromise = (async () => {
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
    })();

    const timeoutPromise = new Promise((_, reject) =>
      setTimeout(() => reject(new Error("Database load timed out")), 4000)
    );

    try {
      await Promise.race([dbLoadPromise, timeoutPromise]);
    } catch (e) {
      console.log("Database settings load timed out or failed, utilizing local settings fallback:", e);
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
