# 🏗️ MMV Productivity XII - Application Blueprint

This document provides a comprehensive technical blueprint of the application architecture, styling constraints, and technology stack, allowing developers to reconstruct, port, or maintain this application effectively, particularly when targeting mobile/Android via Capacitor.

## 1. Core Architecture & Tech Stack
- **Frontend Framework**: React 18
- **Build Tool**: Vite (Lightning fast HMR, optimized production builds)
- **Routing**: `react-router-dom` (v6+)
- **Styling**: Tailwind CSS (Utility-first styling, custom theme configurations)
- **Animation**: Framer Motion (`framer-motion`) - exclusively used for fluid page transitions, expanding/collapsing sidebars, and micro-interactions.
- **Icons**: `lucide-react` (Clean, consistent SVG icon set)
- **Backend / Database**: Firebase (Firestore for real-time document sync, Firebase Auth)
- **Mobile Container**: Capacitor (For packaging the React web build into a native Android `.apk`)

## 2. Global Styling & UI Conventions (Apple UI & iOS System Design)
The UI heavily draws inspiration from the Apple HIG (Human Interface Guidelines), emphasizing clarity, tight spacing, and distinct interactive states.

### 2.1 Typography & Fonts
- **Primary Font**: `Poppins` (Regular 500 weight preferred).
- **Constraints**: 
  - Strictly limit the use of `bold` or `italics` primarily to rich-text environments (like the Notes editor).
  - Use `font-medium` (500) and `font-bold` sparingly for active states or critical UI labels.
- **Logo Treatment**: The "M" logo and "MMV Hub" text are styled cleanly using standard Poppins and Tailwind utility gradients for modern branding.

### 2.2 Color Palette & Theme Engine
- **Apple UI Colors**: Relies on specific, high-contrast, yet soft hex values (e.g., specific shades for Success/Emerald, Danger/Rose, Info/Blue).
- **No Gradients Policy**: Stick to solid colors and slight opacity shifts (`bg-primary/10`) rather than CSS gradients for component backgrounds, except where explicitly used for ambient glows (like the Wealth Card).
- **Light/Dark Mode**: Fully adaptive utilizing Tailwind's `dark:` classes and CSS variables defined in `index.css`.
  - `bg-background`, `text-foreground`, `bg-card`, `border-border` are used universally to allow instant theme switching.

### 2.3 Layout & Spacing Rules
- **Compact Spacing**: Employ tight margins and padding (e.g., `p-2`, `gap-3`). Avoid excessive whitespace; the design should feel dense but scannable.
- **Border Treatments**:
  - Use soft borders (`border-border/50` or `border-border/80`) to encapsulate cards, notes, and task items.
  - Border radius leans towards rounded aesthetic (`rounded-xl`, `rounded-2xl`).
- **Scrollbars**: Hidden globally using a custom `scrollbar-none` utility class. Scrollable areas should not display visual scrollbars to maintain a clean native-app feel.
- **Mobile Optimization (Safe Areas)**: Uses `pb-safe` and `pt-safe` utility classes to avoid overlaps with the physical device notches and Android navigation bars.

## 3. Navigation System (Sidebar & Drawer)
The navigation system is highly modular, designed to emulate professional native sidebar navigation (similar to modern SaaS dashboards).

### 3.1 Desktop / Tablet (Sidebar)
- **Collapsible Architecture**: 
  - Expanded width: `260px`
  - Collapsed width: `80px`
- **Floating Action Toggle**: A prominent circular button (`w-7 h-7 bg-primary text-primary-foreground rounded-full`) sits at the top right of the sidebar, allowing quick toggling between expanded and collapsed states.
- **Grouped Accordions**: Navigation links are grouped into logical sections (e.g., Productivity, Workspace). Each group has a header that expands/collapses the child links via `AnimatePresence` and `framer-motion`.
- **Active State Highlights**: 
  - Active links feature a solid, soft background highlight (`bg-primary/10 text-primary font-bold shadow-xs`).
  - An icon container (`p-1.5 rounded-lg bg-primary/15`) encapsulates the Lucide icon on the left.
  - Optional badge indicators (e.g., a "7" pill for Tasks) sit on the right side.

### 3.2 Mobile (Bottom/Side Drawer)
- Uses a burger menu (`Menu` icon) that triggers a slide-out drawer.
- The drawer (`w-3/4 max-w-[300px]`) mimics the accordion layout of the desktop sidebar but utilizes larger touch targets (`px-4 py-3.5`).

## 4. State & Database Sync Logic
- **Firestore Integration**: All primary CRUD operations (Notes, Tasks, Finance records) sync directly to Firestore.
- **Trash Retention Logic**: Deleted items are not immediately purged. They are moved to a specific `Trash` collection/status and held for 30 days before permanent deletion.
- **Offline / Local First**: Although synced to Firebase, the app uses local React state (and potentially `localStorage` / IndexedDB caching mechanisms depending on the specific module) to ensure immediate UI responsiveness.
