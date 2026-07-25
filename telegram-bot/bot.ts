import { Telegraf, Markup } from 'telegraf';
import { createClient } from '@supabase/supabase-js';
import * as dotenv from 'dotenv';

// Load environment variables
dotenv.config();

let rawBotToken = process.env.TELEGRAM_BOT_TOKEN;
if (rawBotToken) {
  rawBotToken = rawBotToken.trim().replace(/^["']|["']$/g, '');
}

const isTelegramToken = (token?: string) => Boolean(token && /^\d+:[A-Za-z0-9_-]{30,}$/.test(token) && !token.toUpperCase().includes("YOUR_"));

const BOT_TOKEN = isTelegramToken(rawBotToken) 
  ? rawBotToken! 
  : "8430563840:AAGj9vAUe6Kx7inbWklfy8xUrFF7NeDfHRo";
const SUPABASE_URL = process.env.SUPABASE_URL || "https://ysjzqffgrzwklxlbwdby.supabase.co";
// Client-side key or service role key which allows bypassing RLS for bot actions
const SUPABASE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_ANON_KEY || "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlzanpxZmZncnp3a2x4bGJ3ZGJ5Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3MzM0MDQ3NSwiZXhwIjoyMDg4OTE2NDc1fQ.nlQAu3cGjtRRv0SeJ9HkqEZ2MeOtYc6XrIRfHdiQgOI";
const WEBAPP_URL = process.env.TELEGRAM_WEBAPP_URL || "https://mmvproductivityxii.vercel.app";

if (!BOT_TOKEN) {
  console.error("Missing TELEGRAM_BOT_TOKEN environment variable!");
  process.exit(1);
}

// 1. Initialize Supabase Admin/Client instances
// Using the service role key is highly recommended for backend telegram bots to safely manage all users' records.
const supabase = createClient(SUPABASE_URL, SUPABASE_KEY, {
  auth: {
    persistSession: false,
    autoRefreshToken: false
  }
});

// Initialize Telegram Bot
const bot = new Telegraf(BOT_TOKEN);

// Beautiful UI Styling & Constant helpers matching MMV styling
const THEME_ACCENT_CIRCLE = "🔘";
const ICON_HABIT = "🌸";
const ICON_TASK = "🎯";
const ICON_EXPENSE = "TrendingDown";
const ICON_INCOME = "TrendingUp";
const ICON_SUCCESS = "✅";

/**
 * MMV Secure Seamless Authentication Mapper helper:
 * Since local and cloud syncing runs on Supabase's auth.users framework, the Telegram bot 
 * translates each native Telegram user ID into a virtual matching Supabase Account (secured via telegram internal email prefix).
 * This allows the bot commands and the webapp to share identical user_id records.
 */
async function getOrCreateSupabaseUser(tgUser: { id: number, first_name: string, last_name?: string, username?: string }) {
  const email = `${tgUser.id}@telegram.mmv.internal`;
  const password = `TMA_SecurePas_#${tgUser.id}_${tgUser.id * 3}`;
  
  // Try logging in first
  const { data: signInData, error: signInError } = await supabase.auth.signInWithPassword({
    email,
    password
  });

  if (signInData?.user) {
    return signInData.user.id;
  }

  // Create accounts silently inline if not yet signed up
  const { data: signUpData, error: signUpError } = await supabase.auth.admin.createUser({
    email,
    password,
    email_confirm: true,
    user_metadata: {
      full_name: `${tgUser.first_name} ${tgUser.last_name || ''}`.trim(),
      name: tgUser.first_name,
      username: tgUser.username || `tg_${tgUser.id}`
    }
  });

  if (signUpData?.user) {
    // Scaffold default user settings row for this user
    try {
      await supabase.from('user_settings').insert({
        user_id: signUpData.user.id,
        currency_primary: 'USD',
        theme: 'dark'
      });
    } catch (e) {
      console.log("Setting scaffold ignored:", e);
    }
    return signUpData.user.id;
  }

  console.error("Auth creation failed:", signUpError?.message || signInError?.message);
  throw new Error("Unable to link account: " + (signUpError?.message || signInError?.message));
}

// --- COMMAND HANDLERS ---

// /start command
bot.start(async (ctx) => {
  try {
    const tgUser = ctx.from;
    const first_name = tgUser.first_name;
    
    await ctx.replyWithChatAction('typing');
    await getOrCreateSupabaseUser(tgUser);

    const message = `
👋 *Welcome, ${first_name} to the MMV Productivity Suite!*

Experience absolute control over your day, habits, finances, and lifecycle milestones inside this workspace.

⚡ *Bot Commands Quick Index:*
📅 /habits - Manage habits & mark progress
🎯 /tasks - Review milestones & tasks
➕ /addtask \`<title>\` - Quick-add target tasks
📊 /finance - View budget metrics
💸 /addexpense \`<amount> <category> [note]\` - Log a cost
💰 /addincome \`<amount> <source> [note]\` - Log earnings
📈 /goals - Milestone checklists
❓ /help - Detailed user manual & usage examples

⭐ *Launch Premium Mini App:*
Tap the button below to load the full visual dashboard!
`;

    ctx.replyWithMarkdownV2(
      message.replace(/_/g, '\\_').replace(/\*/g, '\\*').replace(/\[/g, '\\[').replace(/\]/g, '\\]').replace(/\(/g, '\\(').replace(/\)/g, '\\)').replace(/~/g, '\\~').replace(/`/g, '\\`').replace(/\!/g, '\\!').replace(/\./g, '\\.').replace(/-/g, '\\-').replace(/\+/g, '\\+').replace(/\=/g, '\\='),
      Markup.inlineKeyboard([
        [Markup.button.webApp("💼 Open MMV Mini App", WEBAPP_URL)],
        [Markup.button.callback("📅 Habits Today", "view_habits"), Markup.button.callback("🎯 Interactive Tasks", "view_tasks")]
      ])
    );
  } catch (error: any) {
    ctx.reply(`⚠️ Authentication synchronization failed: ${error.message}. Please try again later.`);
  }
});

// /help command
bot.help(async (ctx) => {
  const helpText = `
📖 *MMV Productivity Bot - Command Guide & Manual*

Here is the complete command list and how to use each feature:

🌸 *HABITS & DAILY ROUTINES*
• /habits
  └ Lists all your active daily habits with current streaks. Click the inline button to complete a habit for today!

🎯 *TASK & MILESTONE MANAGEMENT*
• /tasks
  └ Lists your pending tasks sorted by due date and priority.
• /addtask \`<Task Title>\`
  └ Quick-add a new task directly from chat.
  _Example:_ \`/addtask Design landing page UI\`

💰 *FINANCE & BUDGET LOGGING*
• /finance
  └ Displays total income, total expenses, and clean net balance.
• /addexpense \`<Amount> <Category> [Optional Note]\`
  └ Logs a cost into your ledger.
  _Example:_ \`/addexpense 15.50 food Lunch with client\`
• /addincome \`<Amount> <Source> [Optional Note]\`
  └ Logs earnings into your account.
  _Example:_ \`/addincome 500 freelancing Web Design Project\`

📈 *GOALS & SAVINGS TRACKER*
• /goals
  └ Shows visual progress bars for all your active financial and target goals.

💼 *MINI APP DASHBOARD*
• Tap "💼 Open MMV Mini App" anywhere in chat to open the full interactive Web Application inside Telegram!
`;

  await ctx.replyWithMarkdownV2(
    helpText.replace(/_/g, '\\_').replace(/\*/g, '\\*').replace(/\[/g, '\\[').replace(/\]/g, '\\]').replace(/\(/g, '\\(').replace(/\)/g, '\\)').replace(/~/g, '\\~').replace(/`/g, '\\`').replace(/\!/g, '\\!').replace(/\./g, '\\.').replace(/-/g, '\\-').replace(/\+/g, '\\+').replace(/\=/g, '\\='),
    Markup.inlineKeyboard([
      [Markup.button.webApp("🚀 Open MMV Mini App", WEBAPP_URL)],
      [Markup.button.callback("📅 View Habits", "view_habits"), Markup.button.callback("🎯 View Tasks", "view_tasks")]
    ])
  );
});

// /habits command
bot.command('habits', async (ctx) => {
  await handleHabitsList(ctx);
});

async function handleHabitsList(ctx: any) {
  try {
    await ctx.replyWithChatAction('typing');
    const userId = await getOrCreateSupabaseUser(ctx.from);
    
    const { data: habits, error } = await supabase
      .from('habits')
      .select('*')
      .eq('user_id', userId)
      .eq('is_active', true);

    if (error) throw error;

    if (!habits || habits.length === 0) {
      return ctx.reply("🌸 No active habits configured! Add them in the MMV app first.", 
        Markup.inlineKeyboard([[Markup.button.webApp("➕ Create Habit", WEBAPP_URL)]])
      );
    }

    let report = `🌸 *Your Dynamic Habits Today:*\n\n`;
    const todayStr = new Date().toISOString().split('T')[0];
    const buttons = [];

    for (const habit of habits) {
      // Check if finished today
      const completionsList = Array.isArray(habit.completions) ? habit.completions : [];
      const isCompletedToday = completionsList.includes(todayStr);
      
      const statusIcon = isCompletedToday ? "❇️ [Done]" : "⬜ [Pending]";
      const streakCount = completionsList.length;

      report += `• *${habit.title}*\n  └ Streak: ${streakCount} completions | ${statusIcon}\n\n`;

      if (!isCompletedToday) {
        buttons.push([Markup.button.callback(`✅ Done: ${habit.title}`, `complete_habit:${habit.id}`)]);
      }
    }

    buttons.push([Markup.button.webApp("⚙️ Configure Habits", `${WEBAPP_URL}/habits`)]);

    await ctx.replyWithMarkdownV2(
      report.replace(/_/g, '\\_').replace(/\*/g, '\\*').replace(/\[/g, '\\[').replace(/\]/g, '\\]').replace(/\./g, '\\.').replace(/-/g, '\\-'),
      Markup.inlineKeyboard(buttons)
    );
  } catch (e: any) {
    ctx.reply(`⚠️ Unable to retrieve habits: ${e.message}`);
  }
}

// Complete habit action callback
bot.action(/^complete_habit:(.+)$/, async (ctx) => {
  try {
    const habitId = ctx.match[1];
    const userId = await getOrCreateSupabaseUser(ctx.from);
    const todayStr = new Date().toISOString().split('T')[0];

    // Read current completions
    const { data: habit, error: getErr } = await supabase
      .from('habits')
      .select('completions, title')
      .eq('id', habitId)
      .eq('user_id', userId)
      .single();

    if (getErr || !habit) throw new Error("Habit not found");

    const currentCompletions = Array.isArray(habit.completions) ? habit.completions : [];
    if (!currentCompletions.includes(todayStr)) {
      currentCompletions.push(todayStr);
      
      const { error: updErr } = await supabase
        .from('habits')
        .update({ completions: currentCompletions })
        .eq('id', habitId)
        .eq('user_id', userId);

      if (updErr) throw updErr;
      
      await ctx.answerCbQuery(`🎉 Marked "${habit.title}" as complete!`);
      await ctx.editMessageText(`🎉 Stellar work! You tracked completion for "${habit.title}" today!`);
    } else {
      await ctx.answerCbQuery("You've already verified this habit today!");
    }
    
    // Refresh list
    await handleHabitsList(ctx);
  } catch (e: any) {
    await ctx.answerCbQuery(`Error: ${e.message}`);
  }
});

// /tasks command
bot.command('tasks', async (ctx) => {
  await handleTasksList(ctx);
});

async function handleTasksList(ctx: any) {
  try {
    await ctx.replyWithChatAction('typing');
    const userId = await getOrCreateSupabaseUser(ctx.from);

    const { data: tasks, error } = await supabase
      .from('tasks')
      .select('*')
      .eq('user_id', userId)
      .neq('status', 'done')
      .order('due_date', { ascending: true })
      .limit(10);

    if (error) throw error;

    if (!tasks || tasks.length === 0) {
      return ctx.reply("🎯 Excellent! Your daily tasks are all complete. Keep up the high output!", 
        Markup.inlineKeyboard([
          [Markup.button.webApp("➕ Create New Milestones", WEBAPP_URL)]
        ])
      );
    }

    let report = `🎯 *Pending Target Actions:* \n\n`;
    const buttons = [];

    for (const task of tasks) {
      const priorityTag = task.priority === 'high' ? '🔥 HIGH' : task.priority === 'medium' ? '⚡ MED' : '🟢 LOW';
      const dueLabel = task.due_date ? `⏰ Due: ${task.due_date}` : '🗓️ Untargeted';
      report += `• *${task.title}* [${priorityTag}]\n  └ ${dueLabel}\n\n`;

      buttons.push([Markup.button.callback(`🎯 Done: ${task.title}`, `complete_task:${task.id}`)]);
    }

    buttons.push([Markup.button.webApp("💼 Task Dashboard", `${WEBAPP_URL}/tasks`)]);

    await ctx.replyWithMarkdownV2(
      report.replace(/_/g, '\\_').replace(/\*/g, '\\*').replace(/\[/g, '\\[').replace(/\]/g, '\\]').replace(/\./g, '\\.').replace(/-/g, '\\-'),
      Markup.inlineKeyboard(buttons)
    );
  } catch (e: any) {
    ctx.reply(`⚠️ Unable to retrieve tasks: ${e.message}`);
  }
}

// Complete task action callback
bot.action(/^complete_task:(.+)$/, async (ctx) => {
  try {
    const taskId = ctx.match[1];
    const userId = await getOrCreateSupabaseUser(ctx.from);

    const { error } = await supabase
      .from('tasks')
      .update({ status: 'done', updated_at: new Date().toISOString() })
      .eq('id', taskId)
      .eq('user_id', userId);

    if (error) throw error;

    await ctx.answerCbQuery("🎯 Milestone completed successfully!");
    await ctx.reply("✅ Task marked finished! Keep maintaining this amazing streak!");
    await handleTasksList(ctx);
  } catch (e: any) {
    await ctx.answerCbQuery(`Error: ${e.message}`);
  }
});

// /addtask Command
bot.command('addtask', async (ctx) => {
  try {
    const text = ctx.message.text.substring(9).trim();
    if (!text) {
      return ctx.reply("Format: /addtask <Task title here>\nExample: /addtask Push production app settings updates");
    }

    const userId = await getOrCreateSupabaseUser(ctx.from);
    
    const { data: newT, error } = await supabase
      .from('tasks')
      .insert({
        user_id: userId,
        title: text,
        priority: 'medium',
        status: 'todo',
        due_date: new Date().toISOString().split('T')[0]
      })
      .select()
      .single();

    if (error) throw error;

    ctx.reply(`🎯 Task *"${newT.title}"* saved to your schedule checklist!`, Markup.inlineKeyboard([
      [Markup.button.webApp("💼 View live Tasks", `${WEBAPP_URL}/tasks`)]
    ]));
  } catch (e: any) {
    ctx.reply(`⚠️ Error writing task: ${e.message}`);
  }
});

// /finance Command
bot.command('finance', async (ctx) => {
  try {
    const userId = await getOrCreateSupabaseUser(ctx.from);

    // Get expenses
    const { data: expenses } = await supabase
      .from('expenses')
      .select('amount')
      .eq('user_id', userId);

    // Get income
    const { data: income } = await supabase
      .from('income')
      .select('amount')
      .eq('user_id', userId);

    const totalExp = (expenses || []).reduce((acc, curr) => acc + parseFloat(curr.amount), 0);
    const totalInc = (income || []).reduce((acc, curr) => acc + parseFloat(curr.amount), 0);
    const net = totalInc - totalExp;

    const message = `
📊 *Your Financial Analytics (USD):*

💰 Total Revenue: \`$${totalInc.toFixed(2)}\`
💸 Total Expenses: \`$${totalExp.toFixed(2)}\`
⚖️ Net Balance: \`$${net.toFixed(2)}\` ${net >= 0 ? '📈' : '📉'}

*Quick Register:*
• Add Cost: \`/addexpense <amount> <category> [note]\`
• Add Cash: \`/addincome <amount> <source> [note]\`
`;

    ctx.replyWithMarkdownV2(
      message.replace(/_/g, '\\_').replace(/\*/g, '\\*').replace(/\[/g, '\\[').replace(/\]/g, '\\]').replace(/\./g, '\\.').replace(/-/g, '\\-'),
      Markup.inlineKeyboard([
        [Markup.button.webApp("💸 Transaction logs", `${WEBAPP_URL}/finance`)]
      ])
    );
  } catch (e: any) {
    ctx.reply(`⚠️ Finance error: ${e.message}`);
  }
});

// /addexpense command
bot.command('addexpense', async (ctx) => {
  try {
    const parts = ctx.message.text.substring(12).trim().split(' ');
    const amount = parseFloat(parts[0]);
    const category = parts[1];
    const note = parts.slice(2).join(' ') || "";

    if (isNaN(amount) || !category) {
      return ctx.reply("Format: /addexpense <Amount> <Category> [Optional Note]\nExample: /addexpense 12.50 food Delicious sandwich");
    }

    const userId = await getOrCreateSupabaseUser(ctx.from);

    const { error } = await supabase
      .from('expenses')
      .insert({
        user_id: userId,
        amount,
        category,
        note,
        date: new Date().toISOString().split('T')[0]
      });

    if (error) throw error;

    ctx.reply(`💸 Logged expense of *$${amount.toFixed(2)}* under *${category}*!`);
  } catch (e: any) {
    ctx.reply(`⚠️ Error adding expense: ${e.message}`);
  }
});

// /addincome command
bot.command('addincome', async (ctx) => {
  try {
    const parts = ctx.message.text.substring(11).trim().split(' ');
    const amount = parseFloat(parts[0]);
    const source = parts[1];
    const note = parts.slice(2).join(' ') || "";

    if (isNaN(amount) || !source) {
      return ctx.reply("Format: /addincome <Amount> <Source> [Optional Note]\nExample: /addincome 1200 freelancing Web development logo");
    }

    const userId = await getOrCreateSupabaseUser(ctx.from);

    const { error } = await supabase
      .from('income')
      .insert({
        user_id: userId,
        amount,
        source,
        note,
        date: new Date().toISOString().split('T')[0]
      });

    if (error) throw error;

    ctx.reply(`💰 Logged income of *$${amount.toFixed(2)}* from *${source}*!`);
  } catch (e: any) {
    ctx.reply(`⚠️ Error writing income: ${e.message}`);
  }
});

// /goals command
bot.command('goals', async (ctx) => {
  try {
    const userId = await getOrCreateSupabaseUser(ctx.from);

    const { data: goals, error } = await supabase
      .from('goals')
      .select('*')
      .eq('user_id', userId)
      .eq('status', 'active');

    if (error) throw error;

    if (!goals || goals.length === 0) {
      return ctx.reply("📈 No active growth targets set right now. Link a new target inside the app dashboard!", 
        Markup.inlineKeyboard([[Markup.button.webApp("➕ Set Goal", `${WEBAPP_URL}/goals`)]])
      );
    }

    let report = `📈 *Your Saving & Target Milestones:*\n\n`;

    for (const goal of goals) {
      const cur = parseFloat(goal.current_amount || 0);
      const tar = parseFloat(goal.target_amount || 1);
      const percentage = Math.min(100, Math.round((cur / tar) * 100));
      
      // Dynamic inline progress bar character mapping
      const barFilled = "■".repeat(Math.round(percentage / 10));
      const barEmpty = "□".repeat(10 - Math.round(percentage / 10));

      report += `• *${goal.title}*\n  └ \`[${barFilled}${barEmpty}]\` ${percentage}%\n  └ Progress: \`$${cur.toFixed(0)} / $${tar.toFixed(0)}\`\n\n`;
    }

    await ctx.replyWithMarkdownV2(
      report.replace(/_/g, '\\_').replace(/\*/g, '\\*').replace(/\[/g, '\\[').replace(/\]/g, '\\]').replace(/\./g, '\\.').replace(/-/g, '\\-'),
      Markup.inlineKeyboard([
        [Markup.button.webApp("🏆 Manage Goal Tracker", `${WEBAPP_URL}/goals`)]
      ])
    );
  } catch (e: any) {
    ctx.reply(`⚠️ Goals fetch error: ${e.message}`);
  }
});

// Button callback redirects linking
bot.action("view_habits", async (ctx) => {
  await ctx.answerCbQuery();
  await handleHabitsList(ctx);
});

bot.action("view_tasks", async (ctx) => {
  await ctx.answerCbQuery();
  await handleTasksList(ctx);
});

// Start listening
bot.launch().then(async () => {
  console.log("MMV Productivity Suite Telegram Bot is fully operational!");

  try {
    await bot.telegram.setMyCommands([
      { command: 'start', description: 'Power up the MMV Productivity Workspace' },
      { command: 'help', description: 'Comprehensive guide & command usage examples' },
      { command: 'habits', description: 'Review your daily habits and tracking checklists' },
      { command: 'tasks', description: 'Review pending high priority tasks' },
      { command: 'addtask', description: 'Create a new todo milestone immediately' },
      { command: 'finance', description: 'Review revenue, spending buffers, and balances' },
      { command: 'addexpense', description: 'Log a new expense' },
      { command: 'addincome', description: 'Log new income earnings' },
      { command: 'goals', description: 'Check custom saving targets progress' }
    ]);
  } catch (cmdErr) {
    console.warn("Notice: Could not set bot commands menu automatically:", cmdErr);
  }
  
  // WAKE UP SCRIPT: Keep Supabase active
  // Free Supabase databases pause due to inactivity. We prevent this by doing a simple keep-alive ping.
  setInterval(async () => {
    try {
      console.log("Wake-up Ping: Pinging Supabase to prevent inactivity pause...");
      const { data, error } = await supabase.from('user_settings').select('count', { count: 'exact', head: true }).limit(1);
      if (error) console.error("Wake-up Ping error:", error.message);
      else console.log("Wake-up Ping success: database is active.");
    } catch (e) {
      console.error("Keep-alive exception:", e);
    }
  }, 12 * 60 * 60 * 1000); // Trigger once every 12 hours
}).catch((err: any) => {
  console.error("❌ Failed to start Telegram Bot!");
  if (err?.response?.error_code === 404 || err?.message?.includes("404")) {
    console.error("⛔ CAUSE: The TELEGRAM_BOT_TOKEN provided is invalid, deleted, or contains typos!");
    console.error("💡 SOLUTION:");
    console.error("  1. Open Telegram and search for @BotFather");
    console.error("  2. Send /token or /newbot to get your official bot HTTP API Token.");
    console.error("  3. Set TELEGRAM_BOT_TOKEN=<your_real_token> in telegram-bot/.env file (without quotes or spaces).");
  } else {
    console.error("Error details:", err);
  }
});

// Enable graceful stop
process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM'));
