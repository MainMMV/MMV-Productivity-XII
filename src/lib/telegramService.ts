// Telegram Integration Service for MMV XII Web App

const BOT_TOKEN = '8430563840:AAGj9vAUe6Kx7inbWklfy8xUrFF7NeDfHRo';
const LOCAL_WEBHOOK_URL = 'http://localhost:5000/notify';
const FIREBASE_HOSTING_WEBHOOK_URL = 'https://mmv-xii.web.app/api/notify';

export interface TelegramNotificationPayload {
  entity: 'Task' | 'Habit' | 'Expense' | 'Income' | 'Goal' | 'Note' | 'Subscription';
  action: 'Created' | 'Updated' | 'Deleted' | 'Completed';
  title: string;
  details?: string;
}

export async function sendTelegramNotification(payload: TelegramNotificationPayload) {
  try {
    const formattedText = `
🔔 <b>MMV XII Web App Notification</b>

📌 <b>[${payload.entity.toUpperCase()}] ${payload.action}</b>
• <b>Title:</b> ${payload.title}
${payload.details ? `• <b>Details:</b> ${payload.details}\n` : ''}• <b>Time:</b> ${new Date().toLocaleString()}
`.trim();

    // 1. Send to local Python Bot Server & Firebase Hosting endpoints
    const payloadBody = JSON.stringify({
      event: `${payload.entity.toLowerCase()}_${payload.action.toLowerCase()}`,
      entity: payload.entity,
      action: payload.action,
      title: payload.title,
      details: payload.details || '',
    });

    try {
      await fetch(LOCAL_WEBHOOK_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: payloadBody,
      });
    } catch {
      // Local webhook fallback
    }

    try {
      await fetch(FIREBASE_HOSTING_WEBHOOK_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: payloadBody,
      });
    } catch {
      // Firebase hosting webhook fallback
    }

    // 2. Direct Telegram API fallback if user chat_id is saved in localStorage
    const savedChatId = localStorage.getItem('telegram_chat_id');
    if (savedChatId) {
      await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          chat_id: savedChatId,
          text: formattedText,
          parse_mode: 'HTML',
        }),
      });
    }
  } catch (err) {
    console.warn('Telegram Notification Dispatch Notice:', err);
  }
}
