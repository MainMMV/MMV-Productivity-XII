import express, { Request, Response } from 'express';
import { Telegraf, Markup } from 'telegraf';
import { createClient } from '@supabase/supabase-js';
import * as dotenv from 'dotenv';

dotenv.config();

const PORT = process.env.PORT || 3001;
let rawBotToken = process.env.TELEGRAM_BOT_TOKEN;
if (rawBotToken) {
  rawBotToken = rawBotToken.trim().replace(/^["']|["']$/g, '');
}

const isTelegramToken = (token?: string) => Boolean(token && /^\d+:[A-Za-z0-9_-]{30,}$/.test(token) && !token.toUpperCase().includes("YOUR_"));

const BOT_TOKEN = isTelegramToken(rawBotToken) 
  ? rawBotToken! 
  : "8430563840:AAGj9vAUe6Kx7inbWklfy8xUrFF7NeDfHRo";
const WEBHOOK_DOMAIN = process.env.TELEGRAM_WEBHOOK_DOMAIN || "https://mmvproductivityxii.vercel.app";
const SUPABASE_URL = process.env.SUPABASE_URL || "https://ysjzqffgrzwklxlbwdby.supabase.co";
const SUPABASE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_ANON_KEY || "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlzanpxZmZncnp3a2x4bGJ3ZGJ5Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3MzM0MDQ3NSwiZXhwIjoyMDg4OTE2NDc1fQ.nlQAu3cGjtRRv0SeJ9HkqEZ2MeOtYc6XrIRfHdiQgOI";
const WEBAPP_URL = process.env.TELEGRAM_WEBAPP_URL || "https://mmvproductivityxii.vercel.app";
const WEBHOOK_SECRET_TOKEN = process.env.TELEGRAM_WEBHOOK_SECRET_TOKEN || "mmv_secure_webhook_token_xyz_123";

if (!BOT_TOKEN) {
  console.error("Missing TELEGRAM_BOT_TOKEN environment variable!");
  process.exit(1);
}

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY, {
  auth: {
    persistSession: false,
    autoRefreshToken: false
  }
});

const bot = new Telegraf(BOT_TOKEN);

// Local fallback store
const localDb: Record<string, {
  habits: Array<{ id: string, title: string, is_active: boolean, completions: string[] }>;
  tasks: Array<{ id: string, title: string, priority: string, status: string, due_date: string }>;
  expenses: Array<{ id: string, amount: number, category: string, note: string, date: string }>;
  income: Array<{ id: string, amount: number, source: string, note: string, date: string }>;
  goals: Array<{ id: string, title: string, current_amount: number, target_amount: number, status: string }>;
}> = {};

function getLocalStore(userId: string) {
  if (!localDb[userId]) {
    localDb[userId] = {
      habits: [
        { id: 'h1', title: 'Morning Hydration & Routine', is_active: true, completions: [] },
        { id: 'h2', title: 'Deep Focus Coding / Reading', is_active: true, completions: [] },
        { id: 'h3', title: 'Daily Workout & Fitness', is_active: true, completions: [] }
      ],
      tasks: [
        { id: 't1', title: 'Review MMV Productivity Workspace', priority: 'high', status: 'todo', due_date: new Date().toISOString().split('T')[0] },
        { id: 't2', title: 'Connect Google Registration & Telegram Sync', priority: 'medium', status: 'todo', due_date: new Date().toISOString().split('T')[0] }
      ],
      expenses: [
        { id: 'e1', amount: 15.5, category: 'Food', note: 'Healthy Lunch', date: new Date().toISOString().split('T')[0] }
      ],
      income: [
        { id: 'i1', amount: 1200, source: 'Projects', note: 'Client Milestone', date: new Date().toISOString().split('T')[0] }
      ],
      goals: [
        { id: 'g1', title: 'Emergency Financial Reserve', current_amount: 850, target_amount: 1000, status: 'active' },
        { id: 'g2', title: 'Productivity Hardware Upgrade', current_amount: 450, target_amount: 600, status: 'active' }
      ]
    };
  }
  return localDb[userId];
}

async function getOrCreateSupabaseUser(tgUser: { id: number, first_name: string, last_name?: string, username?: string }) {
  const email = `${tgUser.id}@telegram.mmv.internal`;
  const password = `TMA_SecurePas_#${tgUser.id}_${tgUser.id * 3}`;
  
  try {
    const { data: signInData } = await supabase.auth.signInWithPassword({ email, password });
    if (signInData?.user) return signInData.user.id;

    const { data: signUpData } = await supabase.auth.admin.createUser({
      email,
      password,
      email_confirm: true,
      user_metadata: {
        full_name: `${tgUser.first_name} ${tgUser.last_name || ''}`.trim(),
        name: tgUser.first_name,
        username: tgUser.username || `tg_${tgUser.id}`
      }
    });

    if (signUpData?.user) return signUpData.user.id;
  } catch (err: any) {
    console.warn("Notice: Supabase auth fetch skipped/fallback used:", err?.message || err);
  }

  return `tg_user_${tgUser.id}`;
}

// Bot handlers
bot.start(async (ctx) => {
  try {
    const tgUser = ctx.from;
    const first_name = tgUser.first_name || 'User';
    await ctx.replyWithChatAction('typing');
    await getOrCreateSupabaseUser(tgUser);

    const message = `
👋 <b>Welcome, ${first_name} to the MMV Productivity Suite!</b>

Experience absolute control over your day, habits, finances, and lifecycle milestones inside this workspace.

⚡ <b>Bot Commands Quick Index:</b>
📅 /habits - Manage habits & mark progress
🎯 /tasks - Review milestones & tasks
➕ /addtask &lt;title&gt; - Quick-add target tasks
📊 /finance - View budget metrics
💸 /addexpense &lt;amount&gt; &lt;category&gt; [note] - Log a cost
💰 /addincome &lt;amount&gt; &lt;source&gt; [note] - Log earnings
📈 /goals - Milestone checklists
🔐 /sync - Connect Google Account & Sync Web App
❓ /help - Detailed user manual & usage examples

⭐ <b>Launch Premium Mini App:</b>
Tap the button below to load the full visual dashboard!
`;

    await ctx.replyWithHTML(
      message,
      Markup.inlineKeyboard([
        [Markup.button.webApp("💼 Open MMV Mini App", WEBAPP_URL)],
        [Markup.button.webApp("🔐 Google Registration & Sync", `${WEBAPP_URL}/sync?tg_id=${tgUser.id}&username=${tgUser.username || ''}`)],
        [Markup.button.callback("📅 Habits Today", "view_habits"), Markup.button.callback("🎯 Interactive Tasks", "view_tasks")]
      ])
    );
  } catch (e) {
    ctx.replyWithHTML(`👋 Welcome! Use /help to get started.`);
  }
});

bot.help(async (ctx) => {
  const helpText = `
📖 <b>MMV Productivity Bot - Command Guide & Manual</b>

Here is the complete command list and how to use each feature:

🌸 <b>HABITS & DAILY ROUTINES</b>
• /habits - Lists all your active daily habits.

🎯 <b>TASK & MILESTONE MANAGEMENT</b>
• /tasks - Lists your pending tasks.
• /addtask &lt;title&gt; - Quick-add a task.

💰 <b>FINANCE & BUDGET LOGGING</b>
• /finance - Displays total income, total expenses, and balance.
• /addexpense &lt;Amount&gt; &lt;Category&gt; [Note] - Log a cost.
• /addincome &lt;Amount&gt; &lt;Source&gt; [Note] - Log earnings.

📈 <b>GOALS & SAVINGS TRACKER</b>
• /goals - Progress bars for target goals.

🔐 <b>GOOGLE REGISTRATION & TELEGRAM SYNC</b>
• /sync - Connect Google Account & Sync Web App.
`;

  await ctx.replyWithHTML(
    helpText,
    Markup.inlineKeyboard([
      [Markup.button.webApp("🚀 Open MMV Mini App", WEBAPP_URL)],
      [Markup.button.callback("📅 View Habits", "view_habits"), Markup.button.callback("🎯 View Tasks", "view_tasks")]
    ])
  );
});

bot.command(['sync', 'google', 'connect'], async (ctx) => {
  const tgUser = ctx.from;
  const name = tgUser.first_name || 'User';
  const text = `
<b>🔐 MMV Google Registration & Telegram Account Sync</b>

Connect your Google Account and sync your Telegram Bot with the MMV Productivity Web App!

• <b>Google OAuth Registration:</b> Secure cloud backup for habits, tasks & budget data.
• <b>Telegram Account:</b> Linked to <code>${tgUser.id}</code> ${tgUser.username ? `(@${tgUser.username})` : ''}.

Tap the button below to complete Google Sign-In & Sync:
`;

  await ctx.replyWithHTML(
    text,
    Markup.inlineKeyboard([
      [Markup.button.webApp("🔗 Google Sign-In & Sync Web", `${WEBAPP_URL}/sync?tg_id=${tgUser.id}&username=${tgUser.username || ''}&name=${encodeURIComponent(name)}`)],
      [Markup.button.url("💼 Open MMV Web Suite", WEBAPP_URL)]
    ])
  );
});

bot.command('habits', async (ctx) => {
  try {
    const userId = await getOrCreateSupabaseUser(ctx.from);
    let habitsList: any[] = [];
    try {
      const { data } = await supabase.from('habits').select('*').eq('user_id', userId).eq('is_active', true);
      if (data && data.length > 0) habitsList = data;
      else habitsList = getLocalStore(userId).habits;
    } catch {
      habitsList = getLocalStore(userId).habits;
    }

    let report = `🌸 <b>Your Dynamic Habits Today:</b>\n\n`;
    const todayStr = new Date().toISOString().split('T')[0];
    const buttons = [];

    for (const habit of habitsList) {
      const completionsList = Array.isArray(habit.completions) ? habit.completions : [];
      const isCompletedToday = completionsList.includes(todayStr);
      const statusIcon = isCompletedToday ? "❇️ [Done]" : "⬜ [Pending]";
      report += `• <b>${habit.title}</b>\n  └ Streak: ${completionsList.length} completions | ${statusIcon}\n\n`;
      if (!isCompletedToday) {
        buttons.push([Markup.button.callback(`✅ Complete: ${habit.title}`, `complete_habit:${habit.id}`)]);
      }
    }
    buttons.push([Markup.button.webApp("⚙️ Configure Habits", `${WEBAPP_URL}/habits`)]);
    await ctx.replyWithHTML(report, Markup.inlineKeyboard(buttons));
  } catch {
    ctx.replyWithHTML(`🌸 Habits updated! Check MMV Web App.`);
  }
});

bot.command('tasks', async (ctx) => {
  try {
    const userId = await getOrCreateSupabaseUser(ctx.from);
    let tasksList: any[] = [];
    try {
      const { data } = await supabase.from('tasks').select('*').eq('user_id', userId).neq('status', 'done').limit(10);
      if (data && data.length > 0) tasksList = data;
      else tasksList = getLocalStore(userId).tasks.filter(t => t.status !== 'done');
    } catch {
      tasksList = getLocalStore(userId).tasks.filter(t => t.status !== 'done');
    }

    let report = `🎯 <b>Pending Target Actions:</b>\n\n`;
    const buttons = [];
    for (const task of tasksList) {
      const priorityTag = task.priority === 'high' ? '🔥 HIGH' : task.priority === 'medium' ? '⚡ MED' : '🟢 LOW';
      report += `• <b>${task.title}</b> [${priorityTag}]\n  └ Due: ${task.due_date || 'Today'}\n\n`;
      buttons.push([Markup.button.callback(`🎯 Done: ${task.title}`, `complete_task:${task.id}`)]);
    }
    buttons.push([Markup.button.webApp("💼 Task Dashboard", `${WEBAPP_URL}/tasks`)]);
    await ctx.replyWithHTML(report, Markup.inlineKeyboard(buttons));
  } catch {
    ctx.replyWithHTML(`🎯 Tasks updated! Check MMV Web App.`);
  }
});

bot.command('addtask', async (ctx) => {
  try {
    const text = ctx.message.text.substring(9).trim();
    if (!text) return ctx.replyWithHTML("Format: <code>/addtask &lt;Task title&gt;</code>");

    const userId = await getOrCreateSupabaseUser(ctx.from);
    getLocalStore(userId).tasks.push({
      id: 't_' + Date.now(),
      title: text,
      priority: 'medium',
      status: 'todo',
      due_date: new Date().toISOString().split('T')[0]
    });

    try {
      await supabase.from('tasks').insert({
        user_id: userId,
        title: text,
        priority: 'medium',
        status: 'todo',
        due_date: new Date().toISOString().split('T')[0]
      });
    } catch {}

    ctx.replyWithHTML(`🎯 Task <b>"${text}"</b> saved to schedule!`, Markup.inlineKeyboard([[Markup.button.webApp("💼 View Tasks", `${WEBAPP_URL}/tasks`)]]));
  } catch {
    ctx.replyWithHTML(`🎯 Task created!`);
  }
});

bot.command('finance', async (ctx) => {
  try {
    const userId = await getOrCreateSupabaseUser(ctx.from);
    const store = getLocalStore(userId);
    let expenses = store.expenses;
    let income = store.income;

    try {
      const { data: dbExp } = await supabase.from('expenses').select('amount').eq('user_id', userId);
      const { data: dbInc } = await supabase.from('income').select('amount').eq('user_id', userId);
      if (dbExp && dbExp.length > 0) expenses = dbExp as any;
      if (dbInc && dbInc.length > 0) income = dbInc as any;
    } catch {}

    const totalExp = expenses.reduce((acc, curr) => acc + parseFloat(curr.amount as any || 0), 0);
    const totalInc = income.reduce((acc, curr) => acc + parseFloat(curr.amount as any || 0), 0);
    const net = totalInc - totalExp;

    const message = `
📊 <b>Your Financial Analytics (USD):</b>

💰 Total Revenue: <code>$${totalInc.toFixed(2)}</code>
💸 Total Expenses: <code>$${totalExp.toFixed(2)}</code>
⚖️ Net Balance: <code>$${net.toFixed(2)}</code> ${net >= 0 ? '📈' : '📉'}
`;
    await ctx.replyWithHTML(message, Markup.inlineKeyboard([[Markup.button.webApp("💸 Transaction Logs", `${WEBAPP_URL}/finance`)]]));
  } catch {
    ctx.replyWithHTML(`📊 Financial analytics loaded.`);
  }
});

bot.command('addexpense', async (ctx) => {
  try {
    const parts = ctx.message.text.substring(12).trim().split(' ');
    const amount = parseFloat(parts[0]);
    const category = parts[1];
    const note = parts.slice(2).join(' ') || "";

    if (isNaN(amount) || !category) {
      return ctx.replyWithHTML("Format: <code>/addexpense &lt;Amount&gt; &lt;Category&gt; [Note]</code>");
    }

    const userId = await getOrCreateSupabaseUser(ctx.from);
    getLocalStore(userId).expenses.push({ id: 'e_' + Date.now(), amount, category, note, date: new Date().toISOString().split('T')[0] });

    try {
      await supabase.from('expenses').insert({ user_id: userId, amount, category, note, date: new Date().toISOString().split('T')[0] });
    } catch {}

    ctx.replyWithHTML(`💸 Logged expense of <b>$${amount.toFixed(2)}</b> under <b>${category}</b>!`);
  } catch {
    ctx.replyWithHTML(`💸 Expense logged!`);
  }
});

bot.command('addincome', async (ctx) => {
  try {
    const parts = ctx.message.text.substring(11).trim().split(' ');
    const amount = parseFloat(parts[0]);
    const source = parts[1];
    const note = parts.slice(2).join(' ') || "";

    if (isNaN(amount) || !source) {
      return ctx.replyWithHTML("Format: <code>/addincome &lt;Amount&gt; &lt;Source&gt; [Note]</code>");
    }

    const userId = await getOrCreateSupabaseUser(ctx.from);
    getLocalStore(userId).income.push({ id: 'i_' + Date.now(), amount, source, note, date: new Date().toISOString().split('T')[0] });

    try {
      await supabase.from('income').insert({ user_id: userId, amount, source, note, date: new Date().toISOString().split('T')[0] });
    } catch {}

    ctx.replyWithHTML(`💰 Logged income of <b>$${amount.toFixed(2)}</b> from <b>${source}</b>!`);
  } catch {
    ctx.replyWithHTML(`💰 Income logged!`);
  }
});

bot.command('goals', async (ctx) => {
  try {
    const userId = await getOrCreateSupabaseUser(ctx.from);
    const store = getLocalStore(userId);
    let goalsList = store.goals;

    try {
      const { data } = await supabase.from('goals').select('*').eq('user_id', userId).eq('status', 'active');
      if (data && data.length > 0) goalsList = data;
    } catch {}

    let report = `📈 <b>Your Saving & Target Milestones:</b>\n\n`;
    for (const goal of goalsList) {
      const cur = parseFloat(goal.current_amount as any || 0);
      const tar = parseFloat(goal.target_amount as any || 1);
      const percentage = Math.min(100, Math.round((cur / tar) * 100));
      report += `• <b>${goal.title}</b> (${percentage}%)\n  └ Progress: <code>$${cur.toFixed(0)} / $${tar.toFixed(0)}</code>\n\n`;
    }

    await ctx.replyWithHTML(report, Markup.inlineKeyboard([[Markup.button.webApp("🏆 Manage Goals", `${WEBAPP_URL}/goals`)]]));
  } catch {
    ctx.replyWithHTML(`📈 Goals tracking loaded.`);
  }
});

// Express App
const app = express();
app.use(express.json());

app.get('/health', (req: Request, res: Response) => {
  res.json({ status: 'active', timestamp: new Date().toISOString() });
});

app.post('/telegram-webhook', (req: Request, res: Response) => {
  bot.handleUpdate(req.body, res);
});

app.listen(PORT, () => {
  console.log(`Telegram Webhook Server is running on port ${PORT}`);
});
