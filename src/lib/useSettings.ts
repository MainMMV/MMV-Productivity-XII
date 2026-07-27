import { useState, useEffect } from "react";
import { base44 } from "@/api/base44Client";
import { auth } from "@/lib/firebase";

const DEFAULT_SETTINGS = {
  currency_primary: "USD",
  currency_secondary: "UZS",
  theme_hue: 220,
  theme_mode: "light",
  theme_preset: "default",
  border_radius_percentage: 35,
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

  // Subscribe to auth state changes so settings are automatically loaded for the authenticated user
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (currentUser) => {
      setLoading(true);
      await loadSettingsForUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  // Apply dynamic theme color and border radius whenever they change
  useEffect(() => {
    let primaryVal = `${settings.theme_hue} 90% 66%`;
    
    if ((settings as any).theme_preset === "mindora") {
      primaryVal = "163 19% 46%"; // #5E8B7E
    }

    const root = document.documentElement;
    root.style.setProperty("--primary", primaryVal);
    root.style.setProperty("--ring", primaryVal);
    root.style.setProperty("--chart-1", primaryVal);
    
    // Border radius calculation: 35% -> 0.7rem, 50% -> 1rem, 0% -> 0rem, 100% -> 2rem
    const radiusVal = typeof settings.border_radius_percentage !== 'undefined' ? settings.border_radius_percentage : 35;
    const radiusRem = (radiusVal / 50) * 1;
    
    root.style.setProperty("--radius", `${radiusRem}rem`);
    root.style.setProperty("--radius-sm", `${Math.max(0, radiusRem - 0.25)}rem`);
    root.style.setProperty("--radius-md", `${Math.max(0, radiusRem - 0.125)}rem`);
    root.style.setProperty("--radius-lg", `${radiusRem}rem`);
    root.style.setProperty("--radius-xl", `${radiusRem * 1.25}rem`);
    root.style.setProperty("--radius-2xl", `${radiusRem * 1.5}rem`);
    root.style.setProperty("--radius-3xl", `${radiusRem * 2}rem`);
  }, [settings.theme_hue, settings.border_radius_percentage, (settings as any).theme_preset]);

  // Dynamically update favicon and app icon
  useEffect(() => {
    const isDark = settings.theme_mode === "dark" || 
      (settings.theme_mode === "system" && window.matchMedia("(prefers-color-scheme: dark)").matches);
    
    const hue = settings.theme_hue || 220;
    const radiusVal = typeof settings.border_radius_percentage !== 'undefined' ? settings.border_radius_percentage : 35;
    
    const presets: Record<string, { card: string; background: string; foreground: string }> = {
      slate: {
        card: isDark ? "222 47% 11%" : "0 0% 100%",
        background: isDark ? "222 47% 7%" : "215 25% 97%",
        foreground: isDark ? "210 40% 98%" : "222 47% 11%"
      },
      sand: {
        card: isDark ? "20 20% 12%" : "36 50% 99%",
        background: isDark ? "20 30% 8%" : "36 40% 97%",
        foreground: isDark ? "36 30% 94%" : "24 60% 15%"
      },
      mint: {
        card: isDark ? "150 30% 10%" : "0 0% 100%",
        background: isDark ? "150 40% 6%" : "140 20% 98%",
        foreground: isDark ? "140 30% 96%" : "152 60% 12%"
      },
      obsidian: {
        card: isDark ? "240 10% 9%" : "0 0% 100%",
        background: isDark ? "240 10% 4.5%" : "240 10% 96%",
        foreground: isDark ? "0 0% 98%" : "240 10% 4%"
      },
      mindora: {
        card: isDark ? "201 20% 18%" : "0 0% 100%",
        background: isDark ? "201 20% 23%" : "165 17% 95%",
        foreground: isDark ? "165 17% 95%" : "201 20% 23%"
      }
    };

    const preset = presets[(settings as any).theme_preset || "slate"] || presets.slate;
    const bgCol = `hsl(${preset.card})`;
    const primaryCol = `hsl(${hue}, 90%, 60%)`;
    const textCol = isDark ? `hsl(${hue}, 95%, 72%)` : `hsl(${hue}, 90%, 48%)`;
    
    const svg = `
      <svg width="256" height="256" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <style>
            @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@800&amp;display=swap');
            .text-mmv {
              font-family: 'Poppins', sans-serif;
              font-weight: 800;
              font-size: 32px;
              fill: ${textCol};
              letter-spacing: -1px;
            }
          </style>
          <filter id="shadow" x="-10%" y="-10%" width="120%" height="120%">
            <feDropShadow dx="0" dy="1.5" stdDeviation="1" flood-opacity="0.15" flood-color="${primaryCol}" />
          </filter>
        </defs>
        <rect x="2" y="2" width="96" height="96" rx="${Math.max(6, radiusVal / 2.2)}" fill="${bgCol}" stroke="${primaryCol}" stroke-width="5" />
        <g filter="url(#shadow)">
          <text x="50%" y="54%" class="text-mmv" text-anchor="middle" dominant-baseline="middle">MMV</text>
        </g>
        <circle cx="82" cy="34" r="4.5" fill="${primaryCol}" />
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
  }, [
    settings.theme_hue, 
    settings.border_radius_percentage, 
    settings.theme_mode, 
    (settings as any).theme_preset
  ]);

  // Apply preset theme custom css variables
  useEffect(() => {
    const root = document.documentElement;
    const isDark = settings.theme_mode === "dark" || 
      (settings.theme_mode === "system" && window.matchMedia("(prefers-color-scheme: dark)").matches);

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
      },
      mindora: {
        background: isDark ? "201 20% 23%" : "165 17% 95%",
        foreground: isDark ? "165 17% 95%" : "201 20% 23%",
        card: isDark ? "201 20% 18%" : "0 0% 100%",
        border: isDark ? "201 15% 30%" : "165 10% 88%",
        muted: isDark ? "201 15% 30%" : "165 10% 92%",
        secondary: isDark ? "201 20% 28%" : "210 57% 78%"
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
      
      if ((settings as any).theme_preset === "mindora") {
        root.style.setProperty("--font-primary", '"DM Sans", sans-serif');
        root.style.setProperty("--font-heading", '"Inter", sans-serif');
        root.style.setProperty("--primary-foreground", "0 0% 100%");
      } else {
        root.style.setProperty("--font-primary", '"Poppins", sans-serif');
        root.style.setProperty("--font-heading", '"Poppins", sans-serif');
        root.style.removeProperty("--primary-foreground");
      }
    } else {
      root.style.removeProperty("--background");
      root.style.removeProperty("--foreground");
      root.style.removeProperty("--card");
      root.style.removeProperty("--card-foreground");
      root.style.removeProperty("--border");
      root.style.removeProperty("--input");
      root.style.removeProperty("--muted");
      root.style.removeProperty("--secondary");
      root.style.setProperty("--font-primary", '"Poppins", sans-serif');
      root.style.setProperty("--font-heading", '"Poppins", sans-serif');
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

  async function loadSettingsForUser(user: any) {
    const userStorageKey = user ? `mmv-settings-${user.uid}` : "mmv-settings";
    let localSettings = DEFAULT_SETTINGS;
    
    try {
      const stored = localStorage.getItem(userStorageKey) || localStorage.getItem("mmv-settings");
      if (stored) {
        localSettings = { ...DEFAULT_SETTINGS, ...JSON.parse(stored) };
        setSettings(localSettings);
      }
    } catch (e) {}

    if (!user) {
      setSettingsId(null);
      setLoading(false);
      return;
    }

    try {
      const list = await base44.entities.UserSettings.list();
      if (list && list.length > 0) {
        const dbSettings = { ...DEFAULT_SETTINGS, ...list[0] };
        setSettings(dbSettings);
        setSettingsId(list[0].id);
        localStorage.setItem(userStorageKey, JSON.stringify(dbSettings));
      } else {
        // First sign-in for this user: initialize Firestore userSettings doc
        const created = await base44.entities.UserSettings.create({
          ...localSettings,
          userId: user.uid
        });
        setSettingsId(created.id);
      }
    } catch (e) {
      console.error("Firestore settings load failed, using local cache:", e);
    } finally {
      setLoading(false);
    }
  }

  function updateSettings(updates: any) {
    setSettings(prev => {
      const next = { ...prev, ...updates };
      const storageKey = auth.currentUser ? `mmv-settings-${auth.currentUser.uid}` : "mmv-settings";
      localStorage.setItem(storageKey, JSON.stringify(next));
      return next;
    });
    setHasChanges(true);
  }

  async function saveSettings() {
    try {
      setLoading(true);
      
      const payload = { ...settings };
      delete payload.id;
      delete (payload as any).user_id;

      if (auth.currentUser) {
        (payload as any).userId = auth.currentUser.uid;
      }

      if (settingsId) {
        await base44.entities.UserSettings.update(settingsId, payload);
      } else {
        const created = await base44.entities.UserSettings.create(payload);
        setSettingsId(created.id);
      }
      
      const storageKey = auth.currentUser ? `mmv-settings-${auth.currentUser.uid}` : "mmv-settings";
      localStorage.setItem(storageKey, JSON.stringify(payload));
      setHasChanges(false);
    } catch (e) {
      console.error("Failed to save settings to Firestore", e);
      throw e;
    } finally {
      setLoading(false);
    }
  }

  return { settings, updateSettings, saveSettings, hasChanges, loading };
}

