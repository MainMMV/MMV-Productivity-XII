import express, { Request, Response } from 'express';
import { Telegraf, Markup } from 'telegraf';
import { createClient } from '@supabase/supabase-js';
import * as dotenv from 'dotenv';

// Load environment configurations
dotenv.config();

const PORT = process.env.PORT || 3001; // Can run alongside web app or independently
const rawBotToken = process.env.TELEGRAM_BOT_TOKEN;
const BOT_TOKEN = (rawBotToken && !rawBotToken.toUpperCase().includes("YOUR_BOT")) 
  ? rawBotToken 
  : "8430563840:AAGj9vAUe6Kx7inbWklfy8xUrFF7NeDfHRo";
const WEBHOOK_DOMAIN = process.env.TELEGRAM_WEBHOOK_DOMAIN || "https://mmvproductivityxii.vercel.app"; // e.g. "https://my-app.run.app"
const SUPABASE_URL = process.env.SUPABASE_URL || "https://ysjzqffgrzwklxlbwdby.supabase.co";
const SUPABASE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_ANON_KEY || "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlzanpxZmZncnp3a2x4bGJ3ZGJ5Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3MzM0MDQ3NSwiZXhwIjoyMDg4OTE2NDc1fQ.nlQAu3cGjtRRv0SeJ9HkqEZ2MeOtYc6XrIRfHdiQgOI";
const WEBAPP_URL = process.env.TELEGRAM_WEBAPP_URL || "https://mmvproductivityxii.vercel.app";

// Secret header token to verify authentic Telegram traffic
const WEBHOOK_SECRET_TOKEN = process.env.TELEGRAM_WEBHOOK_SECRET_TOKEN || "mmv_secure_webhook_token_xyz_123";

if (!BOT_TOKEN) {
  console.error("Missing TELEGRAM_BOT_TOKEN environment variable!");
  process.exit(1);
}

// 1. Initialize Supabase Admin/Client instances
const supabase = createClient(SUPABASE_URL, SUPABASE_KEY, {
  auth: {
    persistSession: false,
    autoRefreshToken: false
  }
});

// 2. Initialize Telegram Bot Instance in Webhook/Server Mode
const bot = new Telegraf(BOT_TOKEN);

// Beautiful UI Styling & Icons
const ICON_HABIT = "🌸";
const ICON_TASK = "🎯";
const ICON_SUCCESS = "✅";

/**
 * MMV Secure Seamless Authentication Mapper helper:
 * Syncs Telegram user metadata directly to Supabase base profiles
 */
async function getOrCreateSupabaseUser(tgUser: { id: number, first_name: string, last_name?: string, username?: string }) {
  const email = `${tgUser.id}@telegram.mmv.internal`;
  const password = `TMA_SecurePas_#${tgUser.id}_${tgUser.id * 3}`;
  
  const { data: signInData } = await supabase.auth.signInWithPassword({
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

  throw new Error("Unable to link account: " + (signUpError?.message || "Auth error"));
}

// Setup commands schema for Bot menu button preview
bot.telegram.setMyCommands([
  { command: 'start', description: 'Power up the MMV Productivity Workspace' },
  { command: 'help', description: 'Comprehensive guide & command usage examples' },
  { command: 'habits', description: 'Review your daily habits and tracking checklists' },
  { command: 'tasks', description: 'Review pending high priority tasks' },
  { command: 'addtask', description: 'Create a new todo milestone immediately' },
  { command: 'finance', description: 'Review revenue, spending buffers, and balances' },
  { command: 'addexpense', description: 'Log a new expense' },
  { command: 'addincome', description: 'Log new income earnings' },
  { command: 'goals', description: 'Check custom saving targets progress' }
]).catch((err) => console.warn("Notice: Could not set Telegram commands schema:", err.message || err));

// --- REGISTER DYNAMIC BOT COMMANDS ---

bot.start(async (ctx) => {
  try {
    const tgUser = ctx.from;
    const first_name = tgUser.first_name;
    
    await ctx.replyWithChatAction('typing');
    await getOrCreateSupabaseUser(tgUser);

    const message = `
👋 *Welcome, ${first_name} to the MMV Productivity Webhook Companion!*

Running via native highly-performant Node.js webhook controller.

⚡ *Instant Controller Quick Index:*
📅 /habits - Manage habits & mark progress
🎯 /tasks - Review milestones & tasks
➕ /addtask \`<title>\` - Quick-add target tasks
📊 /finance - View budget metrics
💸 /addexpense \`<amount> <category> [note]\` - Log a cost
💰 /addincome \`<amount> <source> [note]\` - Log earnings
📈 /goals - Milestone checklists
❓ /help - Comprehensive guide & command usage examples

⭐ *Launch Premium Mini App:*
Click the persistent action menu below to deploy the full-screen visual suite!
`;

    ctx.replyWithMarkdownV2(
      message.replace(/_/g, '\\_').replace(/\*/g, '\\*').replace(/\[/g, '\\[').replace(/\]/g, '\\]').replace(/\(/g, '\\(').replace(/\)/g, '\\)').replace(/~/g, '\\~').replace(/`/g, '\\`').replace(/\!/g, '\\!').replace(/\./g, '\\.').replace(/-/g, '\\-').replace(/\+/g, '\\+').replace(/\=/g, '\\='),
      Markup.inlineKeyboard([
        [Markup.button.webApp("💼 Open MMV Mini App", WEBAPP_URL)],
        [Markup.button.callback("📅 Habits Today", "view_habits"), Markup.button.callback("🎯 Interactive Tasks", "view_tasks")]
      ])
    );
  } catch (error: any) {
    ctx.reply(`⚠️ Webhook login sync issue: ${error.message}`);
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
  _Example:_ \`/addtask Finish client proposal\`

💰 *FINANCE & BUDGET LOGGING*
• /finance
  └ Displays total income, total expenses, and clean net balance.
• /addexpense \`<Amount> <Category> [Optional Note]\`
  └ Logs a cost into your ledger.
  _Example:_ \`/addexpense 12.00 transport Taxi fare\`
• /addincome \`<Amount> <Source> [Optional Note]\`
  └ Logs earnings into your account.
  _Example:_ \`/addincome 800 salary Monthly payment\`

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

// /habits list command
const handleHabitsCallback = async (ctx: any) => {
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
      return ctx.reply("🌸 No active habits configured! Set them up inside the visual MMV dashboard first.", 
        Markup.inlineKeyboard([[Markup.button.webApp("➕ Create Habit", WEBAPP_URL)]])
      );
    }

    let report = `🌸 *Active Webhook Sync Habits:*\n\n`;
    const todayStr = new Date().toISOString().split('T')[0];
    const buttons = [];

    for (const habit of habits) {
      const completionsList = Array.isArray(habit.completions) ? habit.completions : [];
      const isCompletedToday = completionsList.includes(todayStr);
      
      const statusIcon = isCompletedToday ? "❇️ [Done]" : "⬜ [Pending]";
      const streakCount = completionsList.length;

      report += `• *${habit.title}*\n  └ Streak: ${streakCount} | ${statusIcon}\n\n`;

      if (!isCompletedToday) {
        buttons.push([Markup.button.callback(`✅ Mark Done: ${habit.title}`, `complete_habit:${habit.id}`)]);
      }
    }

    buttons.push([Markup.button.webApp("⚙️ Settings Panel", `${WEBAPP_URL}/habits`)]);

    await ctx.replyWithMarkdownV2(
      report.replace(/_/g, '\\_').replace(/\*/g, '\\*').replace(/\[/g, '\\[').replace(/\]/g, '\\]').replace(/\./g, '\\.').replace(/-/g, '\\-'),
      Markup.inlineKeyboard(buttons)
    );
  } catch (e: any) {
    ctx.reply(`⚠️ Unable to retrieve habits: ${e.message}`);
  }
};

bot.command('habits', handleHabitsCallback);
bot.action('view_habits', async (ctx) => {
  await ctx.answerCbQuery();
  await handleHabitsCallback(ctx);
});

// Complete habit webhook callback action
bot.action(/^complete_habit:(.+)$/, async (ctx) => {
  try {
    const habitId = ctx.match[1];
    const userId = await getOrCreateSupabaseUser(ctx.from);
    const todayStr = new Date().toISOString().split('T')[0];

    const { data: habit, error: getErr } = await supabase
      .from('habits')
      .select('completions, title')
      .eq('id', habitId)
      .eq('user_id', userId)
      .single();

    if (getErr || !habit) throw new Error("Habit reference not accessible");

    const currentCompletions = Array.isArray(habit.completions) ? habit.completions : [];
    if (!currentCompletions.includes(todayStr)) {
      currentCompletions.push(todayStr);
      
      const { error: updErr } = await supabase
        .from('habits')
        .update({ completions: currentCompletions })
        .eq('id', habitId)
        .eq('user_id', userId);

      if (updErr) throw updErr;
      
      await ctx.answerCbQuery(`🎉 Perfect task! Marked "${habit.title}" complete.`);
      await ctx.editMessageText(`🎉 Outstanding achievement! Completed: "${habit.title}" today!`);
    } else {
      await ctx.answerCbQuery("Habit was already ticked finished!");
    }
  } catch (e: any) {
    await ctx.answerCbQuery(`Error: ${e.message}`);
  }
});

// /tasks command handling
const handleTasksCallback = async (ctx: any) => {
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
      return ctx.reply("🎯 All scheduled milestones completed! Perfect work rate today.", 
        Markup.inlineKeyboard([[Markup.button.webApp("➕ Create Target", WEBAPP_URL)]])
      );
    }

    let report = `🎯 *Pending Webhook Sync Milestones:* \n\n`;
    const buttons = [];

    for (const task of tasks) {
      const priorityTag = task.priority === 'high' ? '🔥 HIGH' : task.priority === 'medium' ? '⚡ MED' : '🟢 LOW';
      const dueLabel = task.due_date ? `⏰ Due: ${task.due_date}` : '🗓️ Flexible';
      report += `• *${task.title}* [${priorityTag}]\n  └ ${dueLabel}\n\n`;

      buttons.push([Markup.button.callback(`🎯 Done: ${task.title}`, `complete_task:${task.id}`)]);
    }

    buttons.push([Markup.button.webApp("💼 Tasks Dashboard", `${WEBAPP_URL}/tasks`)]);

    await ctx.replyWithMarkdownV2(
      report.replace(/_/g, '\\_').replace(/\*/g, '\\*').replace(/\[/g, '\\[').replace(/\]/g, '\\]').replace(/\./g, '\\.').replace(/-/g, '\\-'),
      Markup.inlineKeyboard(buttons)
    );
  } catch (e: any) {
    ctx.reply(`⚠️ Unable to retrieve tasks: ${e.message}`);
  }
};

bot.command('tasks', handleTasksCallback);
bot.action('view_tasks', async (ctx) => {
  await ctx.answerCbQuery();
  await handleTasksCallback(ctx);
});

// Complete task webhook execution action
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

    await ctx.answerCbQuery("🎯 Task marked completed!");
    await ctx.reply("✅ Spectacular velocity! Action ticked done on database profiles.");
  } catch (e: any) {
    await ctx.answerCbQuery(`Error: ${e.message}`);
  }
});

// /addtask Command
bot.command('addtask', async (ctx) => {
  try {
    const text = ctx.message.text.substring(9).trim();
    if (!text) {
      return ctx.reply("Format: /addtask <Task title here>\nExample: /addtask Deploy webhook handler setup");
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
    ctx.reply(`⚠️ Error saving task: ${e.message}`);
  }
});

// /finance Command
bot.command('finance', async (ctx) => {
  try {
    const userId = await getOrCreateSupabaseUser(ctx.from);

    const { data: expenses } = await supabase
      .from('expenses')
      .select('amount')
      .eq('user_id', userId);

    const { data: income } = await supabase
      .from('income')
      .select('amount')
      .eq('user_id', userId);

    const totalExp = (expenses || []).reduce((acc, curr) => acc + parseFloat(curr.amount), 0);
    const totalInc = (income || []).reduce((acc, curr) => acc + parseFloat(curr.amount), 0);
    const net = totalInc - totalExp;

    const message = `
📊 *Financial Analytics Summary:*

💰 Total Inflow: \`$${totalInc.toFixed(2)}\`
💸 Total Outflow: \`$${totalExp.toFixed(2)}\`
⚖️ Clean Net Balance: \`$${net.toFixed(2)}\` ${net >= 0 ? '📈' : '📉'}

*Quick Register:*
• Add Cost: \`/addexpense <amount> <category> [note]\`
• Add Cash: \`/addincome <amount> <source> [note]\`
`;

    ctx.replyWithMarkdownV2(
      message.replace(/_/g, '\\_').replace(/\*/g, '\\*').replace(/\[/g, '\\[').replace(/\]/g, '\\]').replace(/\./g, '\\.').replace(/-/g, '\\-'),
      Markup.inlineKeyboard([
        [Markup.button.webApp("💸 Accounts Ledger", `${WEBAPP_URL}/finance`)]
      ])
    );
  } catch (e: any) {
    ctx.reply(`⚠️ Finance stats fetch failure: ${e.message}`);
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
      return ctx.reply("Format: /addexpense <Amount> <Category> [Optional Note]\nExample: /addexpense 8.50 coffee Midday boost");
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
    ctx.reply(`⚠️ Expense logging failed: ${e.message}`);
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
      return ctx.reply("Format: /addincome <Amount> <Source> [Optional Note]\nExample: /addincome 150 contract UI Consulting work");
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
    ctx.reply(`⚠️ Income record failed: ${e.message}`);
  }
});

// /goals Command
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
      return ctx.reply("📈 No active goal matrices set right now. Initialize target milestones inside the app!", 
        Markup.inlineKeyboard([[Markup.button.webApp("🏆 Set Goal", `${WEBAPP_URL}/goals`)]])
      );
    }

    let report = `📈 *Savings Achievements Status:*\n\n`;

    for (const goal of goals) {
      const cur = parseFloat(goal.current_amount || 0);
      const tar = parseFloat(goal.target_amount || 1);
      const percentage = Math.min(100, Math.round((cur / tar) * 100));
      
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
    ctx.reply(`⚠️ Goals metric breakdown error: ${e.message}`);
  }
});

// --- EXPRESS APPLICATION WEBHOOK BRIDGE SETUP ---

const app = express();
app.use(express.json());

// Main health monitor check
app.get('/health', async (req: Request, res: Response) => {
  try {
    // Ping Supabase to verify connection health
    const { data, error } = await supabase.from('user_settings').select('count', { count: 'exact', head: true }).limit(1);
    if (error) throw error;

    res.json({
      status: "healthy",
      service: "MMV-Telegram-Webhook-Controller",
      database_connected: true,
      bot_token_valid: !!BOT_TOKEN,
      timestamp: new Date().toISOString()
    });
  } catch (e: any) {
    res.status(502).json({
      status: "degraded",
      service: "MMV-Telegram-Webhook-Controller",
      database_connected: false,
      error: e.message,
      timestamp: new Date().toISOString()
    });
  }
});

// Webhook endpoint path utilizing Bot Token hash path structure for absolute safety
const webhookPath = `/webhook/${BOT_TOKEN}`;

// Dynamic setup webhook mapping endpoint to quickly configure Telegram server redirections
app.get('/setup-webhook', async (req: Request, res: Response) => {
  if (!WEBHOOK_DOMAIN) {
    return res.status(400).json({
      success: false,
      error: "Missing TELEGRAM_WEBHOOK_DOMAIN / TELEGRAM_WEBAPP_URL env to build public webhook redirection!"
    });
  }

  const fullWebhookUrl = `${WEBHOOK_DOMAIN.replace(/\/$/, '')}${webhookPath}`;

  try {
    await bot.telegram.setWebhook(fullWebhookUrl, {
      secret_token: WEBHOOK_SECRET_TOKEN
    });
    
    res.json({
      success: true,
      message: "Webhook URL successfully registered on Telegram Bot API!",
      registered_webhook_url: fullWebhookUrl,
      verified_with_secret_header: true
    });
  } catch (e: any) {
    res.status(500).json({
      success: false,
      error: "Failed to configure webhook metadata inside Telegraf: " + e.message
    });
  }
});

// Main POST handler forwarded natively from Telegram servers
app.post(webhookPath, (req: Request, res: Response, next) => {
  // Validate request is genuinely originating from safe source (using the Secret Token option header)
  const tgSecretHeader = req.headers['x-telegram-bot-api-secret-token'];
  if (tgSecretHeader !== WEBHOOK_SECRET_TOKEN) {
    console.warn("Unauthorized webhook request intercepted! Secret tokens do not match.");
    return res.status(403).send("Unauthorized Webhook Source");
  }

  // Pass payload seamlessly into Telegraf middleware parser
  next();
}, bot.webhookCallback(webhookPath));

// Fallback error-handler middleware
app.use((err: any, req: Request, res: Response, next: any) => {
  console.error("Webhook processing error:", err);
  res.status(500).send("Webhook Controller Processing Error");
});

// Launch Webhook controller listener
app.listen(PORT, async () => {
  console.log(`🚀 MMV Webhook Controller is listening securely on port ${PORT}`);
  console.log(`🔗 Target endpoint path registered: http://localhost:${PORT}${webhookPath}`);
  
  if (WEBHOOK_DOMAIN) {
    const autoUrl = `${WEBHOOK_DOMAIN.replace(/\/$/, '')}${webhookPath}`;
    console.log(`📡 Auto-binding Telegram server routing to: ${autoUrl}`);
    try {
      await bot.telegram.setWebhook(autoUrl, {
        secret_token: WEBHOOK_SECRET_TOKEN
      });
      console.log("✅ Webhook URL successfully mapped on initialization!");
    } catch (e: any) {
      console.warn("⚠️ Failed automatic setWebhook registration on startup. Route to /setup-webhook manual setup: " + e.message);
    }
  } else {
    console.log("ℹ️ No TELEGRAM_WEBHOOK_DOMAIN specified. Start register manually after launch using GET /setup-webhook.");
  }

  // WAKE UP SCRIPT: Keep Supabase active
  setInterval(async () => {
    try {
      console.log("Wake-up Ping: Pinging Supabase to prevent inactivity pause...");
      const { data, error } = await supabase.from('user_settings').select('count', { count: 'exact', head: true }).limit(1);
      if (error) console.error("Wake-up Ping error:", error.message);
      else console.log("Wake-up Ping success: database is active.");
    } catch (e) {
      console.error("Keep-alive exception:", e);
    }
  }, 12 * 60 * 60 * 1000); // 12 hours
});
