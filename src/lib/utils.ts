import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatCurrency(amount: number, currency = "USD", uzsRate = 12700) {
  if (!amount && amount !== 0) return "-";
  if (currency === "UZS") {
    return new Intl.NumberFormat("en-US", { style: "currency", currency: "UZS", maximumFractionDigits: 0 }).format(amount);
  }
  return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(amount);
}

export function convertCurrency(amount: number, fromCurrency: string, toCurrency: string, uzsRate = 12700) {
  if (fromCurrency === toCurrency) return amount;
  if (fromCurrency === "USD" && toCurrency === "UZS") return amount * uzsRate;
  if (fromCurrency === "UZS" && toCurrency === "USD") return amount / uzsRate;
  return amount;
}

export function getToday() {
  return new Date().toISOString().split("T")[0];
}

export function formatDate(dateStr: string) {
  if (!dateStr) return "";
  const d = new Date(dateStr);
  return d.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
}

export function getDayOfYear(date: Date) {
  const start = new Date(date.getFullYear(), 0, 0);
  const diff = (date as any) - (start as any);
  const oneDay = 1000 * 60 * 60 * 24;
  return Math.floor(diff / oneDay);
}

export function getLast12Months() {
  const months = [];
  for (let i = 11; i >= 0; i--) {
    const d = new Date();
    d.setMonth(d.getMonth() - i);
    months.push({ month: d.getMonth(), year: d.getFullYear(), label: d.toLocaleDateString("en-US", { month: "short" }) });
  }
  return months;
}

export function scheduleNotification(title: string, body: string, triggerTime: string) {
  if (!("Notification" in window)) return;
  const delay = new Date(triggerTime).getTime() - Date.now();
  if (delay <= 0) return;
  setTimeout(async () => {
    const permission = await Notification.requestPermission();
    if (permission === "granted") {
      new Notification(title, { body, icon: "/favicon.ico" });
    }
  }, delay);
}
