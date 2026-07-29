# 📋 MMV Productivity XII - Feature Specifications

This document outlines the detailed functional requirements for every module in the MMV Productivity application, broken down by the precise navigation structure.

## 🧭 Navigation Structure & Breakdown

The application uses grouped navigation. Below is the detailed breakdown of every item and its expected internal functionality.

---

### Group 1: Dashboard
**1. Home (`/`)**
- **Clock & Date Display**: Prominent display of the current day, date, and live time.
- **Welcome Widget**: Personal greeting with the user's Level/XP status.
- **Urgent Task List**: Displays top 3-5 tasks due in the next 24 hours.
- **Monthly Burn Summary**: Aggregate of all active financial subscriptions.
- **Habit Completion Rings**: Visual rings for top daily habits progress.
- **Top Goal Progress**: Card displaying progress percentage for the #1 pinned goal.
- **Daily Mood Pulse**: Snapshot card showing today's mood logged from the Reflect module.
- **7-Day Mood Heatmap**: Mini row showing emotional trends for the current week.
- **Global Search Bar**: iOS-style search bar to find records across all modules.

---

### Group 2: Productivity

**1. Habits (`/habits`)**
- **Flexible Scheduling**: Track habits daily, weekly, or on specific days.
- **Visual Streaks**: Consecutive day counters.
- **Gamification**: XP and leveling system tied to habit consistency.
- **Achievements**: Unlockable badges based on performance.
- **Quantity Tracking**: Measure habits by units (e.g., glasses of water) instead of Yes/No.

**2. Tasks (`/tasks`) - Google Tasks Style**
- **Checkboxes & Due Dates**: Quick toggles and calendar date pickers.
- **Categorization**: Group by "Work," "Home," "Personal" with distinct colors.
- **Drag-and-Drop**: Reorder tasks manually.
- **Progress Bar**: Visual completion indicator at the top of the list.
- **Recurring Tasks**: Daily, weekly, monthly repetition.

**3. Finance (`/finance`)**
- **Wealth Command Hero Card**: A theme-adaptive hero card (using `bg-card` and theme variables) showing Net Wealth, Total Income, and Total Spending. Includes a privacy eye toggle.
- **Cash Flow Progress Bar**: Visual indicator showing savings rate (Healthy vs Needs Attention).
- **Category Breakdown**: Spending grouped by category (Food, Transport, Housing) with progress bars and emojis.
- **Monthly/Yearly Toggle**: Switch views to calculate costs by period.
- **Debt Snowball**: Tracks liabilities and calculates pay-off logic.

**4. Goals (`/goals`)**
- **Milestone Tracking**: Break large goals into sequential checkpoints.
- **Target Dates**: Countdown displays for deadlines.
- **Progress Percentage**: iOS-style visual fill bars.
- **Category Colors**: Financial, Professional, Personal using Apple system colors.

---

### Group 3: Workspace

**1. Calendar (`/calendar`)**
- **Month/Week Views**: Standard grid views prioritizing the Monthly layout.
- **Start Day**: Weeks must strictly start on MONDAY.
- **Integrated Habits & Reflect**: Calendar cells display mood colors ("Day in Pixels") and mini habit completion rings.
- **Interactive Habit Toggles**: Mark habits as "Done" directly within the calendar cell.

**2. Drive (`/drive`) & Docs (`/docs`) & Sheets (`/sheets`)**
- **Workspace Integration**: Centralized view for embedded document tracking and external file storage links (Google Workspace style functionality).

**3. G-Tasks (`/google-tasks`)**
- Specific integration view mirroring Google Tasks API endpoints or specialized local task sets separate from local Tasks.

**4. Notes (`/notes`)**
- **Rich Text Editor**: Support for Bold, Italic, Underline, H1-H6, Bullet/Numbered lists, and Horizontal Rules.
- **Real-time Count**: Word & character tracking at the bottom right.
- **3-Dot Menu Logic**:
  - Edit Item, Move to Trash (30-day retention), Duplicate, Pin to Top, Lock (Read-Only).
  - **Color Tagging**: Apply specific iOS-style hex colors (#254F22, #FF5B5B, etc.) to the note's border.

**5. Bookmarks (`/bookmarks`)**
- **Folders & Subfolders**: Categorize saved links.
- **Favicon Display**: Automatically fetches and displays website logos.
- **Search Bar**: Quick filtering for saved URLs.
- **Drag-and-Drop**: Reorder links or move between folders.

---

### Group 4: System & Settings

**1. Data Hub (`/data`)**
- Aggregate view for exporting and managing JSON exports of the database.
- Includes Backup & Restore logic.

**2. Google & Bot Sync (`/sync`)**
- Integration hub for connecting third-party APIs or Telegram bots.
- Automated profile retrieval for users logged in via Google.

**3. Settings (`/settings`)**
- **General**: Language (EN, RU, UZ), Date/Time formats (12h/24h), User Profile.
- **Appearance**: Light/Dark mode toggles, Font Size adjustments, Compact View toggle, and UI Reset. Advanced Themes (Nordic, Oceanic, Sepia).
- **Data**: Export All Data (JSON), Import Data, Cache Clear.
- **Trash**: Master list of deleted items. Shows the "30 Days until permanent deletion" countdown. Supports manual Restore and "Delete Forever". Filter by type (Notes, Tasks, Finance).
- **Admin**: User management, Maintenance mode toggle, Global App Lock, and system error logs. Usage analytics and module toggles.
