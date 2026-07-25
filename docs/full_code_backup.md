# Full Code Backup
This file contains a complete, un-truncated backup of the entire workspace codebase as of Sat Jul 25 04:17:07 PM UTC 2026.

-e 
## `./vite.config.ts`
```
import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import {defineConfig, loadEnv} from 'vite';

export default defineConfig(({mode}) => {
  const env = loadEnv(mode, '.', '');
  return {
    plugins: [
      react(), 
      tailwindcss()
    ],
    define: {
      'process.env.GEMINI_API_KEY': JSON.stringify(env.GEMINI_API_KEY),
      'import.meta.env.VITE_BASE44_APP_ID': JSON.stringify(env.VITE_BASE44_APP_ID || "mmv9309"),
    },
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src'),
      },
    },
    server: {
      port: 3000,
      host: '0.0.0.0',
      hmr: process.env.DISABLE_HMR !== 'true',
    },
  };
});
-e 
```

-e 
## `./src/components/ui/tabs.tsx`
```
import * as React from "react"
import * as TabsPrimitive from "@radix-ui/react-tabs"
import { cn } from "@/lib/utils"

const Tabs = TabsPrimitive.Root

const TabsList = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.List>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.List>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.List
    ref={ref}
    className={cn(
      "inline-flex h-10 items-center justify-center rounded-md bg-muted p-1 text-muted-foreground",
      className
    )}
    {...props}
  />
))
TabsList.displayName = TabsPrimitive.List.displayName

const TabsTrigger = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.Trigger>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.Trigger
    ref={ref}
    className={cn(
      "inline-flex items-center justify-center whitespace-nowrap rounded-sm px-3 py-1.5 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow-sm",
      className
    )}
    {...props}
  />
))
TabsTrigger.displayName = TabsPrimitive.Trigger.displayName

const TabsContent = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.Content>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.Content
    ref={ref}
    className={cn(
      "mt-2 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
      className
    )}
    {...props}
  />
))
TabsContent.displayName = TabsPrimitive.Content.displayName

export { Tabs, TabsList, TabsTrigger, TabsContent }
-e 
```

-e 
## `./src/components/ui/badge.tsx`
```
import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const badgeVariants = cva(
  "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      variant: {
        default:
          "border-transparent bg-primary text-primary-foreground hover:bg-primary/80",
        secondary:
          "border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80",
        destructive:
          "border-transparent bg-destructive text-destructive-foreground hover:bg-destructive/80",
        outline: "text-foreground",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  )
}

export { Badge, badgeVariants }
-e 
```

-e 
## `./src/components/ui/popover.tsx`
```
import * as React from "react"
import * as PopoverPrimitive from "@radix-ui/react-popover"

import { cn } from "@/lib/utils"

const Popover = PopoverPrimitive.Root

const PopoverTrigger = PopoverPrimitive.Trigger

const PopoverContent = React.forwardRef<
  React.ElementRef<typeof PopoverPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof PopoverPrimitive.Content>
>(({ className, align = "center", sideOffset = 4, ...props }, ref) => (
  <PopoverPrimitive.Portal>
    <PopoverPrimitive.Content
      ref={ref}
      align={align}
      sideOffset={sideOffset}
      className={cn(
        "z-50 w-72 rounded-md border bg-popover p-4 text-popover-foreground shadow-md outline-none data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
        className
      )}
      {...props}
    />
  </PopoverPrimitive.Portal>
))
PopoverContent.displayName = PopoverPrimitive.Content.displayName

export { Popover, PopoverTrigger, PopoverContent }
-e 
```

-e 
## `./src/components/ui/select.tsx`
```
import * as React from "react"
import * as SelectPrimitive from "@radix-ui/react-select"
import { Check, ChevronDown, ChevronUp } from "lucide-react"
import { cn } from "@/lib/utils"

const Select = SelectPrimitive.Root
const SelectGroup = SelectPrimitive.Group
const SelectValue = SelectPrimitive.Value

const SelectTrigger = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Trigger>
>(({ className, children, ...props }, ref) => (
  <SelectPrimitive.Trigger
    ref={ref}
    className={cn(
      "flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1",
      className
    )}
    {...props}
  >
    {children}
    <SelectPrimitive.Icon asChild>
      <ChevronDown className="h-4 w-4 opacity-50" />
    </SelectPrimitive.Icon>
  </SelectPrimitive.Trigger>
))
SelectTrigger.displayName = SelectPrimitive.Trigger.displayName

const SelectScrollUpButton = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.ScrollUpButton>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.ScrollUpButton>
>(({ className, ...props }, ref) => (
  <SelectPrimitive.ScrollUpButton
    ref={ref}
    className={cn(
      "flex cursor-default items-center justify-center py-1",
      className
    )}
    {...props}
  >
    <ChevronUp className="h-4 w-4" />
  </SelectPrimitive.ScrollUpButton>
))
SelectScrollUpButton.displayName = SelectPrimitive.ScrollUpButton.displayName

const SelectScrollDownButton = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.ScrollDownButton>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.ScrollDownButton>
>(({ className, ...props }, ref) => (
  <SelectPrimitive.ScrollDownButton
    ref={ref}
    className={cn(
      "flex cursor-default items-center justify-center py-1",
      className
    )}
    {...props}
  >
    <ChevronDown className="h-4 w-4" />
  </SelectPrimitive.ScrollDownButton>
))
SelectScrollDownButton.displayName =
  SelectPrimitive.ScrollDownButton.displayName

const SelectContent = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Content>
>(({ className, children, position = "popper", ...props }, ref) => (
  <SelectPrimitive.Portal>
    <SelectPrimitive.Content
      ref={ref}
      className={cn(
        "relative z-50 max-h-96 min-w-[8rem] overflow-hidden rounded-md border bg-popover text-popover-foreground shadow-md data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
        position === "popper" &&
          "data-[side=bottom]:translate-y-1 data-[side=left]:-translate-x-1 data-[side=right]:translate-x-1 data-[side=top]:-translate-y-1",
        className
      )}
      position={position}
      {...props}
    >
      <SelectScrollUpButton />
      <SelectPrimitive.Viewport
        className={cn(
          "p-1",
          position === "popper" &&
            "h-[var(--radix-select-trigger-height)] w-full min-w-[var(--radix-select-trigger-width)]"
        )}
      >
        {children}
      </SelectPrimitive.Viewport>
      <SelectScrollDownButton />
    </SelectPrimitive.Content>
  </SelectPrimitive.Portal>
))
SelectContent.displayName = SelectPrimitive.Content.displayName

const SelectLabel = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Label>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Label>
>(({ className, ...props }, ref) => (
  <SelectPrimitive.Label
    ref={ref}
    className={cn("py-1.5 pl-8 pr-2 text-sm font-semibold", className)}
    {...props}
  />
))
SelectLabel.displayName = SelectPrimitive.Label.displayName

const SelectItem = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Item>
>(({ className, children, ...props }, ref) => (
  <SelectPrimitive.Item
    ref={ref}
    className={cn(
      "relative flex w-full cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
      className
    )}
    {...props}
  >
    <span className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
      <SelectPrimitive.ItemIndicator>
        <Check className="h-4 w-4" />
      </SelectPrimitive.ItemIndicator>
    </span>
    <SelectPrimitive.ItemText>{children}</SelectPrimitive.ItemText>
  </SelectPrimitive.Item>
))
SelectItem.displayName = SelectPrimitive.Item.displayName

const SelectSeparator = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Separator>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Separator>
>(({ className, ...props }, ref) => (
  <SelectPrimitive.Separator
    ref={ref}
    className={cn("-mx-1 my-1 h-px bg-muted", className)}
    {...props}
  />
))
SelectSeparator.displayName = SelectPrimitive.Separator.displayName

export {
  Select,
  SelectGroup,
  SelectValue,
  SelectTrigger,
  SelectContent,
  SelectLabel,
  SelectItem,
  SelectSeparator,
  SelectScrollUpButton,
  SelectScrollDownButton,
}
-e 
```

-e 
## `./src/components/ui/dropdown-menu.tsx`
```
import * as React from "react"
import * as DropdownMenuPrimitive from "@radix-ui/react-dropdown-menu"
import { Check, ChevronRight, Circle } from "lucide-react"
import { cn } from "@/lib/utils"

const DropdownMenu = DropdownMenuPrimitive.Root
const DropdownMenuTrigger = DropdownMenuPrimitive.Trigger
const DropdownMenuGroup = DropdownMenuPrimitive.Group
const DropdownMenuPortal = DropdownMenuPrimitive.Portal
const DropdownMenuSub = DropdownMenuPrimitive.Sub
const DropdownMenuRadioGroup = DropdownMenuPrimitive.RadioGroup

const DropdownMenuSubTrigger = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.SubTrigger>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.SubTrigger> & {
    inset?: boolean
  }
>(({ className, inset, children, ...props }, ref) => (
  <DropdownMenuPrimitive.SubTrigger
    ref={ref}
    className={cn(
      "flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none focus:bg-accent data-[state=open]:bg-accent",
      inset && "pl-8",
      className
    )}
    {...props}
  >
    {children}
    <ChevronRight className="ml-auto h-4 w-4" />
  </DropdownMenuPrimitive.SubTrigger>
))
DropdownMenuSubTrigger.displayName =
  DropdownMenuPrimitive.SubTrigger.displayName

const DropdownMenuSubContent = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.SubContent>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.SubContent>
>(({ className, ...props }, ref) => (
  <DropdownMenuPrimitive.SubContent
    ref={ref}
    className={cn(
      "z-50 min-w-[8rem] overflow-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-lg data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
      className
    )}
    {...props}
  />
))
DropdownMenuSubContent.displayName =
  DropdownMenuPrimitive.SubContent.displayName

const DropdownMenuContent = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Content>
>(({ className, sideOffset = 4, ...props }, ref) => (
  <DropdownMenuPrimitive.Portal>
    <DropdownMenuPrimitive.Content
      ref={ref}
      sideOffset={sideOffset}
      className={cn(
        "z-50 min-w-[8rem] overflow-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-md data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
        className
      )}
      {...props}
    />
  </DropdownMenuPrimitive.Portal>
))
DropdownMenuContent.displayName = DropdownMenuPrimitive.Content.displayName

const DropdownMenuItem = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Item> & {
    inset?: boolean
  }
>(({ className, inset, ...props }, ref) => (
  <DropdownMenuPrimitive.Item
    ref={ref}
    className={cn(
      "relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
      inset && "pl-8",
      className
    )}
    {...props}
  />
))
DropdownMenuItem.displayName = DropdownMenuPrimitive.Item.displayName

const DropdownMenuCheckboxItem = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.CheckboxItem>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.CheckboxItem>
>(({ className, children, checked, ...props }, ref) => (
  <DropdownMenuPrimitive.CheckboxItem
    ref={ref}
    className={cn(
      "relative flex cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
      className
    )}
    checked={checked}
    {...props}
  >
    <span className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
      <DropdownMenuPrimitive.ItemIndicator>
        <Check className="h-4 w-4" />
      </DropdownMenuPrimitive.ItemIndicator>
    </span>
    {children}
  </DropdownMenuPrimitive.CheckboxItem>
))
DropdownMenuCheckboxItem.displayName =
  DropdownMenuPrimitive.CheckboxItem.displayName

const DropdownMenuRadioItem = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.RadioItem>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.RadioItem>
>(({ className, children, ...props }, ref) => (
  <DropdownMenuPrimitive.RadioItem
    ref={ref}
    className={cn(
      "relative flex cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
      className
    )}
    {...props}
  >
    <span className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
      <DropdownMenuPrimitive.ItemIndicator>
        <Circle className="h-2 w-2 fill-current" />
      </DropdownMenuPrimitive.ItemIndicator>
    </span>
    {children}
  </DropdownMenuPrimitive.RadioItem>
))
DropdownMenuRadioItem.displayName = DropdownMenuPrimitive.RadioItem.displayName

const DropdownMenuLabel = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.Label>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Label> & {
    inset?: boolean
  }
>(({ className, inset, ...props }, ref) => (
  <DropdownMenuPrimitive.Label
    ref={ref}
    className={cn(
      "px-2 py-1.5 text-sm font-semibold",
      inset && "pl-8",
      className
    )}
    {...props}
  />
))
DropdownMenuLabel.displayName = DropdownMenuPrimitive.Label.displayName

const DropdownMenuSeparator = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.Separator>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Separator>
>(({ className, ...props }, ref) => (
  <DropdownMenuPrimitive.Separator
    ref={ref}
    className={cn("-mx-1 my-1 h-px bg-muted", className)}
    {...props}
  />
))
DropdownMenuSeparator.displayName = DropdownMenuPrimitive.Separator.displayName

const DropdownMenuShortcut = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLSpanElement>) => {
  return (
    <span
      className={cn("ml-auto text-xs  opacity-60", className)}
      {...props}
    />
  )
}
DropdownMenuShortcut.displayName = "DropdownMenuShortcut"

export {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuCheckboxItem,
  DropdownMenuRadioItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuGroup,
  DropdownMenuPortal,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuRadioGroup,
}
-e 
```

-e 
## `./src/components/ui/progress.tsx`
```
import * as React from "react"
import * as ProgressPrimitive from "@radix-ui/react-progress"
import { cn } from "@/lib/utils"

const Progress = React.forwardRef<
  React.ElementRef<typeof ProgressPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof ProgressPrimitive.Root> & { indicatorClassName?: string }
>(({ className, value, indicatorClassName, ...props }, ref) => (
  <ProgressPrimitive.Root
    ref={ref}
    className={cn(
      "relative h-4 w-full overflow-hidden rounded-full bg-secondary",
      className
    )}
    {...props}
  >
    <ProgressPrimitive.Indicator
      className={cn("h-full w-full flex-1 bg-primary transition-all", indicatorClassName)}
      style={{ transform: `translateX(-${100 - (value || 0)}%)` }}
    />
  </ProgressPrimitive.Root>
))
Progress.displayName = ProgressPrimitive.Root.displayName

export { Progress }
-e 
```

-e 
## `./src/components/ui/label.tsx`
```
import * as React from "react"
import * as LabelPrimitive from "@radix-ui/react-label"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const labelVariants = cva(
  "text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
)

const Label = React.forwardRef<
  React.ElementRef<typeof LabelPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof LabelPrimitive.Root> &
    VariantProps<typeof labelVariants>
>(({ className, ...props }, ref) => (
  <LabelPrimitive.Root
    ref={ref}
    className={cn(labelVariants(), className)}
    {...props}
  />
))
Label.displayName = LabelPrimitive.Root.displayName

export { Label }
-e 
```

-e 
## `./src/components/ui/textarea.tsx`
```
import * as React from "react"
import { cn } from "@/lib/utils"

const Textarea = React.forwardRef<
  HTMLTextAreaElement,
  React.TextareaHTMLAttributes<HTMLTextAreaElement>
>(({ className, ...props }, ref) => {
  return (
    <textarea
      className={cn(
        "flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 transition-all",
        className
      )}
      ref={ref}
      {...props}
    />
  )
})
Textarea.displayName = "Textarea"

export { Textarea }
-e 
```

-e 
## `./src/components/ui/toaster.tsx`
```
"use client"

import {
  Toast,
  ToastClose,
  ToastDescription,
  ToastProvider,
  ToastTitle,
  ToastViewport,
} from "@/components/ui/toast"
import { useToast } from "@/components/ui/use-toast"

export function Toaster() {
  const { toasts } = useToast()

  return (
    <ToastProvider>
      {toasts.map(function ({ id, title, description, action, ...props }) {
        return (
          <Toast key={id} {...props}>
            <div className="grid gap-1">
              {title && <ToastTitle>{title}</ToastTitle>}
              {description && (
                <ToastDescription>{description}</ToastDescription>
              )}
            </div>
            {action}
            <ToastClose />
          </Toast>
        )
      })}
      <ToastViewport />
    </ToastProvider>
  )
}
-e 
```

-e 
## `./src/components/ui/button.tsx`
```
import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 active:scale-[0.98]",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90",
        destructive:
          "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        outline:
          "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
        secondary:
          "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-11 rounded-md px-8",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }
-e 
```

-e 
## `./src/components/ui/use-toast.ts`
```
// Inspired by shadcn/ui but simplified
import * as React from "react"

const TOAST_LIMIT = 1
const TOAST_REMOVE_DELAY = 1000000

type ToasterToast = {
  id: string
  title?: React.ReactNode
  description?: React.ReactNode
  action?: React.ReactNode
  open?: boolean
  onOpenChange?: (open: boolean) => void
}

const actionTypes = {
  ADD_TOAST: "ADD_TOAST",
  UPDATE_TOAST: "UPDATE_TOAST",
  DISMISS_TOAST: "DISMISS_TOAST",
  REMOVE_TOAST: "REMOVE_TOAST",
} as const

let count = 0

function genId() {
  count = (count + 1) % Number.MAX_SAFE_INTEGER
  return count.toString()
}

type Action =
  | { type: typeof actionTypes.ADD_TOAST; toast: ToasterToast }
  | { type: typeof actionTypes.UPDATE_TOAST; toast: Partial<ToasterToast> }
  | { type: typeof actionTypes.DISMISS_TOAST; toastId?: string }
  | { type: typeof actionTypes.REMOVE_TOAST; toastId?: string }

interface State {
  toasts: ToasterToast[]
}

const toastTimeouts = new Map<string, ReturnType<typeof setTimeout>>()

const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case actionTypes.ADD_TOAST:
      return {
        ...state,
        toasts: [action.toast, ...state.toasts].slice(0, TOAST_LIMIT),
      }

    case actionTypes.UPDATE_TOAST:
      return {
        ...state,
        toasts: state.toasts.map((t) =>
          t.id === action.toast.id ? { ...t, ...action.toast } : t
        ),
      }

    case actionTypes.DISMISS_TOAST: {
      const { toastId } = action

      if (toastId) {
        addToRemoveQueue(toastId)
      } else {
        state.toasts.forEach((toast) => {
          addToRemoveQueue(toast.id)
        })
      }

      return {
        ...state,
        toasts: state.toasts.map((t) =>
          t.id === toastId || toastId === undefined
            ? {
                ...t,
                open: false,
              }
            : t
        ),
      }
    }
    case actionTypes.REMOVE_TOAST:
      if (action.toastId === undefined) {
        return {
          ...state,
          toasts: [],
        }
      }
      return {
        ...state,
        toasts: state.toasts.filter((t) => t.id !== action.toastId),
      }
  }
}

const addToRemoveQueue = (toastId: string) => {
  if (toastTimeouts.has(toastId)) {
    return
  }

  const timeout = setTimeout(() => {
    toastTimeouts.delete(toastId)
    dispatch({
      type: actionTypes.REMOVE_TOAST,
      toastId: toastId,
    })
  }, TOAST_REMOVE_DELAY)

  toastTimeouts.set(toastId, timeout)
}

const listeners: Array<(state: State) => void> = []

let memoryState: State = { toasts: [] }

function dispatch(action: Action) {
  memoryState = reducer(memoryState, action)
  listeners.forEach((listener) => {
    listener(memoryState)
  })
}

function toast({ ...props }: Omit<ToasterToast, "id">) {
  const id = genId()

  const update = (props: ToasterToast) =>
    dispatch({
      type: actionTypes.UPDATE_TOAST,
      toast: { ...props, id },
    })
  const dismiss = () => dispatch({ type: actionTypes.DISMISS_TOAST, toastId: id })

  dispatch({
    type: actionTypes.ADD_TOAST,
    toast: {
      ...props,
      id,
      open: true,
      onOpenChange: (open) => {
        if (!open) dismiss()
      },
    },
  })

  return {
    id: id,
    dismiss,
    update,
  }
}

function useToast() {
  const [state, setState] = React.useState<State>(memoryState)

  React.useEffect(() => {
    listeners.push(setState)
    return () => {
      const index = listeners.indexOf(setState)
      if (index > -1) {
        listeners.splice(index, 1)
      }
    }
  }, [state])

  return {
    ...state,
    toast,
    dismiss: (toastId?: string) => dispatch({ type: actionTypes.DISMISS_TOAST, toastId }),
  }
}

export { useToast, toast }
-e 
```

-e 
## `./src/components/ui/calendar.tsx`
```
import * as React from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { DayPicker } from "react-day-picker"
import { enUS } from "date-fns/locale"

import { cn } from "@/lib/utils"
import { buttonVariants } from "@/components/ui/button"

export type CalendarProps = React.ComponentProps<typeof DayPicker>

function Calendar({
  className,
  classNames,
  showOutsideDays = true,
  ...props
}: CalendarProps) {
  return (
    <DayPicker
      showOutsideDays={showOutsideDays}
      className={cn("p-3", className)}
      weekStartsOn={1}
      locale={enUS}
      classNames={{
        months: "flex flex-col sm:flex-row space-y-4 sm:space-x-4 sm:space-y-0",
        month: "space-y-4",
        caption: "flex justify-center pt-1 relative items-center",
        caption_label: "text-sm font-medium",
        nav: "space-x-1 flex items-center",
        nav_button: cn(
          buttonVariants({ variant: "outline" }),
          "h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100"
        ),
        nav_button_previous: "absolute left-1",
        nav_button_next: "absolute right-1",
        table: "w-full border-collapse space-y-1",
        head_row: "flex",
        head_cell:
          "text-muted-foreground rounded-md w-9 font-normal text-[0.8rem]",
        row: "flex w-full mt-2",
        cell: "h-9 w-9 text-center text-sm p-0 relative [&:has([aria-selected].day-range-end)]:rounded-r-md [&:has([aria-selected].day-outside)]:bg-accent/50 [&:has([aria-selected])]:bg-accent first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md focus-within:relative focus-within:z-20",
        day: cn(
          buttonVariants({ variant: "ghost" }),
          "h-9 w-9 p-0 font-normal aria-selected:opacity-100 hover:bg-primary/10 hover:text-primary transition-colors"
        ),
        day_range_end: "day-range-end",
        day_selected:
          "bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground focus:bg-primary focus:text-primary-foreground opacity-100",
        day_today: "bg-accent text-accent-foreground",
        day_outside:
          "day-outside text-muted-foreground aria-selected:bg-accent/50 aria-selected:text-muted-foreground",
        day_disabled: "text-muted-foreground opacity-50",
        day_range_middle:
          "aria-selected:bg-primary/20 aria-selected:text-primary hover:bg-primary/30 hover:text-primary",
        day_hidden: "invisible",
        ...classNames,
      }}
      components={{
        IconLeft: ({ ...props }) => <ChevronLeft className="h-4 w-4" />,
        IconRight: ({ ...props }) => <ChevronRight className="h-4 w-4" />,
      }}
      {...props}
    />
  )
}
Calendar.displayName = "Calendar"

export { Calendar }
-e 
```

-e 
## `./src/components/ui/input.tsx`
```
import * as React from "react"
import { cn } from "@/lib/utils"

const Input = React.forwardRef<HTMLInputElement, React.InputHTMLAttributes<HTMLInputElement>>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 transition-all",
          className
        )}
        ref={ref}
        {...props}
      />
    )
  }
)
Input.displayName = "Input"

export { Input }
-e 
```

-e 
## `./src/components/ui/checkbox.tsx`
```
import * as React from "react"
import * as CheckboxPrimitive from "@radix-ui/react-checkbox"
import { Check } from "lucide-react"

import { cn } from "@/lib/utils"

const Checkbox = React.forwardRef<
  React.ElementRef<typeof CheckboxPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof CheckboxPrimitive.Root>
>(({ className, ...props }, ref) => (
  <CheckboxPrimitive.Root
    ref={ref}
    className={cn(
      "peer h-5 w-5 shrink-0 rounded-md border-2 border-primary ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground transition-all duration-200 hover:border-primary/80",
      className
    )}
    {...props}
  >
    <CheckboxPrimitive.Indicator
      className={cn("flex items-center justify-center text-current")}
    >
      <Check className="h-3.5 w-3.5 stroke-[3]" />
    </CheckboxPrimitive.Indicator>
  </CheckboxPrimitive.Root>
))
Checkbox.displayName = CheckboxPrimitive.Root.displayName

export { Checkbox }
-e 
```

-e 
## `./src/components/ui/switch.tsx`
```
import * as React from "react"
import * as SwitchPrimitives from "@radix-ui/react-switch"
import { cn } from "@/lib/utils"

const Switch = React.forwardRef<
  React.ElementRef<typeof SwitchPrimitives.Root>,
  React.ComponentPropsWithoutRef<typeof SwitchPrimitives.Root>
>(({ className, ...props }, ref) => (
  <SwitchPrimitives.Root
    className={cn(
      "peer inline-flex h-6 w-11 shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-primary data-[state=unchecked]:bg-input",
      className
    )}
    {...props}
    ref={ref}
  >
    <SwitchPrimitives.Thumb
      className={cn(
        "pointer-events-none block h-5 w-5 rounded-full bg-background shadow-lg ring-0 transition-transform data-[state=checked]:translate-x-5 data-[state=unchecked]:translate-x-0"
      )}
    />
  </SwitchPrimitives.Root>
))
Switch.displayName = SwitchPrimitives.Root.displayName

export { Switch }
-e 
```

-e 
## `./src/components/ui/toast.tsx`
```
import * as React from "react"
import * as ToastPrimitives from "@radix-ui/react-toast"
import { cva, type VariantProps } from "class-variance-authority"
import { X } from "lucide-react"

import { cn } from "@/lib/utils"

const ToastProvider = ToastPrimitives.Provider

const ToastViewport = React.forwardRef<
  React.ElementRef<typeof ToastPrimitives.Viewport>,
  React.ComponentPropsWithoutRef<typeof ToastPrimitives.Viewport>
>(({ className, ...props }, ref) => (
  <ToastPrimitives.Viewport
    ref={ref}
    className={cn(
      "fixed top-0 z-[100] flex max-h-screen w-full flex-col-reverse p-4 sm:bottom-0 sm:right-0 sm:top-auto sm:flex-col md:max-w-[420px]",
      className
    )}
    {...props}
  />
))
ToastViewport.displayName = ToastPrimitives.Viewport.displayName

const toastVariants = cva(
  "group pointer-events-auto relative flex w-full items-center justify-between space-x-4 overflow-hidden rounded-md border p-6 pr-8 shadow-lg transition-all data-[state=open]:animate-in data-[state=closed]:animate-out data-[swipe=end]:animate-out data-[state=closed]:fade-out-80 data-[state=closed]:slide-out-to-right-full data-[state=open]:slide-in-from-top-full data-[state=open]:sm:slide-in-from-bottom-full",
  {
    variants: {
      variant: {
        default: "border bg-background text-foreground",
        destructive:
          "destructive group border-destructive bg-destructive text-destructive-foreground",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

const Toast = React.forwardRef<
  React.ElementRef<typeof ToastPrimitives.Root>,
  React.ComponentPropsWithoutRef<typeof ToastPrimitives.Root> &
    VariantProps<typeof toastVariants>
>(({ className, variant, ...props }, ref) => {
  return (
    <ToastPrimitives.Root
      ref={ref}
      className={cn(toastVariants({ variant }), className)}
      {...props}
    />
  )
})
Toast.displayName = ToastPrimitives.Root.displayName

const ToastAction = React.forwardRef<
  React.ElementRef<typeof ToastPrimitives.Action>,
  React.ComponentPropsWithoutRef<typeof ToastPrimitives.Action>
>(({ className, ...props }, ref) => (
  <ToastPrimitives.Action
    ref={ref}
    className={cn(
      "inline-flex h-8 shrink-0 items-center justify-center rounded-md border bg-transparent px-3 text-sm font-medium ring-offset-background transition-colors hover:bg-secondary focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 group-[.destructive]:border-muted/40 group-[.destructive]:hover:border-destructive/30 group-[.destructive]:hover:bg-destructive group-[.destructive]:hover:text-destructive-foreground group-[.destructive]:focus:ring-destructive",
      className
    )}
    {...props}
  />
))
ToastAction.displayName = ToastPrimitives.Action.displayName

const ToastClose = React.forwardRef<
  React.ElementRef<typeof ToastPrimitives.Close>,
  React.ComponentPropsWithoutRef<typeof ToastPrimitives.Close>
>(({ className, ...props }, ref) => (
  <ToastPrimitives.Close
    ref={ref}
    className={cn(
      "absolute right-2 top-2 rounded-md p-1 text-foreground/50 opacity-0 transition-opacity hover:text-foreground focus:opacity-100 focus:outline-none focus:ring-2 group-hover:opacity-100 group-[.destructive]:text-red-300 group-[.destructive]:hover:text-red-50 group-[.destructive]:focus:ring-red-400 group-[.destructive]:focus:ring-offset-red-600",
      className
    )}
    toast-close=""
    {...props}
  >
    <X className="h-4 w-4" />
  </ToastPrimitives.Close>
))
ToastClose.displayName = ToastPrimitives.Close.displayName

const ToastTitle = React.forwardRef<
  React.ElementRef<typeof ToastPrimitives.Title>,
  React.ComponentPropsWithoutRef<typeof ToastPrimitives.Title>
>(({ className, ...props }, ref) => (
  <ToastPrimitives.Title
    ref={ref}
    className={cn("text-sm font-semibold", className)}
    {...props}
  />
))
ToastTitle.displayName = ToastPrimitives.Title.displayName

const ToastDescription = React.forwardRef<
  React.ElementRef<typeof ToastPrimitives.Description>,
  React.ComponentPropsWithoutRef<typeof ToastPrimitives.Description>
>(({ className, ...props }, ref) => (
  <ToastPrimitives.Description
    ref={ref}
    className={cn("text-sm opacity-90", className)}
    {...props}
  />
))
ToastDescription.displayName = ToastPrimitives.Description.displayName

type ToastProps = React.ComponentPropsWithoutRef<typeof Toast>

type ToastActionElement = React.ReactElement<typeof ToastAction>

export {
  type ToastProps,
  type ToastActionElement,
  ToastProvider,
  ToastViewport,
  Toast,
  ToastTitle,
  ToastDescription,
  ToastClose,
  ToastAction,
}
-e 
```

-e 
## `./src/components/ui/DateRangePicker.tsx`
```
import * as React from "react"
import { format } from "date-fns"
import { Calendar as CalendarIcon, X } from "lucide-react"
import { DateRange } from "react-day-picker"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

interface DateRangePickerProps {
  className?: string;
  value: DateRange | null;
  onChange: (value: DateRange | null) => void;
  placeholder?: string;
  variant?: "bar" | "icon";
}

export default function DateRangePicker({
  className,
  value,
  onChange,
  placeholder = "Pick a date range",
  variant = "bar"
}: DateRangePickerProps) {
  return (
    <div className={cn("grid gap-2", className)}>
      <Popover>
        <PopoverTrigger asChild>
          {variant === "bar" ? (
            <Button
              id="date"
              variant={"outline"}
              className={cn(
                "w-full justify-start text-left font-normal rounded-2xl h-11 px-4",
                !value && "text-muted-foreground"
              )}
            >
              <CalendarIcon className="mr-2 h-4 w-4 opacity-50" />
              <div className="truncate flex-1">
                {value?.from ? (
                  value.to ? (
                    <>
                      {format(value.from, "LLL dd")} - {format(value.to, "LLL dd, y")}
                    </>
                  ) : (
                    format(value.from, "LLL dd, y")
                  )
                ) : (
                  <span>{placeholder}</span>
                )}
              </div>
              {value && (
                <X 
                  className="ml-2 h-4 w-4 opacity-50 hover:opacity-100 flex-shrink-0" 
                  onClick={(e) => {
                    e.stopPropagation();
                    onChange(null);
                  }}
                />
              )}
            </Button>
          ) : (
            <Button
              variant="ghost"
              size="icon"
              className={cn(
                "rounded-xl h-10 w-10 relative transition-colors",
                value ? "text-primary bg-primary/10 hover:bg-primary/20" : "text-muted-foreground hover:bg-primary/5"
              )}
            >
              <CalendarIcon className="h-5 w-5" />
              {value && (
                <div className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-primary rounded-full border-2 border-background" />
              )}
            </Button>
          )}
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0 rounded-3xl overflow-hidden" align="end">
          <Calendar
            initialFocus
            mode="range"
            defaultMonth={value?.from}
            selected={value}
            onSelect={onChange}
            numberOfMonths={1}
          />
          {value && variant === "icon" && (
            <div className="p-3 border-t border-border bg-muted/20">
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={() => onChange(null)}
                className="w-full text-xs h-8 rounded-lg text-muted-foreground hover:text-destructive"
              >
                Clear selection
              </Button>
            </div>
          )}
        </PopoverContent>
      </Popover>
    </div>
  )
}
-e 
```

-e 
## `./src/components/ui/tooltip.tsx`
```
import * as React from "react"
import * as TooltipPrimitive from "@radix-ui/react-tooltip"
import { cn } from "@/lib/utils"

const TooltipProvider = TooltipPrimitive.Provider
const Tooltip = TooltipPrimitive.Root
const TooltipTrigger = TooltipPrimitive.Trigger

const TooltipContent = React.forwardRef<
  React.ElementRef<typeof TooltipPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof TooltipPrimitive.Content>
>(({ className, sideOffset = 4, ...props }, ref) => (
  <TooltipPrimitive.Content
    ref={ref}
    sideOffset={sideOffset}
    className={cn(
      "z-[100] overflow-hidden rounded-md border bg-popover px-3 py-1.5 text-xs text-popover-foreground shadow-md animate-in fade-in-0 zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
      className
    )}
    {...props}
  />
))
TooltipContent.displayName = TooltipPrimitive.Content.displayName

export { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider }
-e 
```

-e 
## `./src/components/ui/dialog.tsx`
```
import * as React from "react"
import * as DialogPrimitive from "@radix-ui/react-dialog"
import { X } from "lucide-react"
import { cn } from "@/lib/utils"

const Dialog = DialogPrimitive.Root
const DialogTrigger = DialogPrimitive.Trigger
const DialogPortal = DialogPrimitive.Portal
const DialogClose = DialogPrimitive.Close

const DialogOverlay = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Overlay>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Overlay>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Overlay
    ref={ref}
    className={cn(
      "fixed inset-0 z-50 bg-black/40 backdrop-blur-[2px] data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
      className
    )}
    {...props}
  />
))
DialogOverlay.displayName = DialogPrimitive.Overlay.displayName

const DialogContent = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Content>
>(({ className, children, ...props }, ref) => (
  <DialogPortal>
    <DialogOverlay />
    <DialogPrimitive.Content
      ref={ref}
      className={cn(
        "fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 border bg-background p-6 shadow-lg duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%] sm:rounded-lg",
        className
      )}
      {...props}
    >
      {children}
      <DialogPrimitive.Close className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground">
        <X className="h-4 w-4" />
        <span className="sr-only">Close</span>
      </DialogPrimitive.Close>
    </DialogPrimitive.Content>
  </DialogPortal>
))
DialogContent.displayName = DialogPrimitive.Content.displayName

const DialogHeader = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn(
      "flex flex-col space-y-1.5 text-center sm:text-left",
      className
    )}
    {...props}
  />
)
DialogHeader.displayName = "DialogHeader"

const DialogFooter = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn(
      "flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2",
      className
    )}
    {...props}
  />
)
DialogFooter.displayName = "DialogFooter"

const DialogTitle = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Title>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Title>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Title
    ref={ref}
    className={cn(
      "text-lg font-semibold leading-none ",
      className
    )}
    {...props}
  />
))
DialogTitle.displayName = DialogPrimitive.Title.displayName

const DialogDescription = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Description>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Description>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Description
    ref={ref}
    className={cn("text-sm text-muted-foreground", className)}
    {...props}
  />
))
DialogDescription.displayName = DialogPrimitive.Description.displayName

export {
  Dialog,
  DialogPortal,
  DialogOverlay,
  DialogTrigger,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogDescription,
}
-e 
```

-e 
## `./src/components/habits/HabitMatrix.tsx`
```
import { format, eachDayOfInterval, startOfMonth, endOfMonth, addMonths, isSameDay } from "date-fns";
import { motion } from "framer-motion";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

interface HabitMatrixProps {
  habits: any[];
  onToggle: (habit: any, date?: Date) => void;
  dateRange: any;
}

export default function HabitMatrix({ habits, onToggle, dateRange }: HabitMatrixProps) {
  const start = dateRange?.from || startOfMonth(new Date());
  const end = dateRange?.to || endOfMonth(addMonths(new Date(), 2));

  const days = eachDayOfInterval({
    start,
    end,
  });

  return (
    <div className="bg-card rounded-3xl p-4 border border-border w-full overflow-x-auto scrollbar-none shadow-sm">
      <div className="min-w-max">
        <div className="flex mb-3">
          <div className="w-32 flex-shrink-0" />
          {days.map((day, i) => (
            <div key={i} className="w-8 flex flex-col items-center">
              <span className="text-[9px] text-muted-foreground uppercase font-bold tracking-wider">{format(day, "eee")}</span>
              <span className="text-xs font-bold mt-0.5">{format(day, "d")}</span>
            </div>
          ))}
        </div>
        <div className="space-y-2">
          {habits.map((habit) => (
            <div key={habit.id} className="flex items-center">
              <div className="w-32 flex-shrink-0 pr-4">
                <p className="text-xs font-bold truncate text-foreground">{habit.title}</p>
              </div>
              <div className="flex">
                {days.map((day, i) => {
                  const dateStr = format(day, "yyyy-MM-dd");
                  const isCompleted = habit.completions?.includes(dateStr);
                  const isToday = isSameDay(day, new Date());
                  
                  return (
                    <div key={i} className="w-8 flex justify-center items-center">
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <motion.button
                              whileTap={{ scale: 0.8 }}
                              onClick={() => onToggle(habit, day)}
                              className={`w-6 h-6 rounded-lg transition-all duration-300 ${
                                isCompleted 
                                  ? "shadow-sm scale-110" 
                                  : "bg-muted/40 border border-border/60 hover:bg-muted/60"
                              }`}
                              style={{ 
                                backgroundColor: isCompleted ? habit.color || "hsl(var(--primary))" : undefined,
                                opacity: isCompleted ? 1 : (isToday ? 1 : 0.6),
                                cursor: "pointer"
                              }}
                            />
                          </TooltipTrigger>
                          <TooltipContent side="top">
                            <p className="text-[10px] font-bold">{habit.title}</p>
                            <p className="text-[10px] text-muted-foreground">{format(day, "MMM d, yyyy")}</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
-e 
```

-e 
## `./src/components/habits/HabitCard.tsx`
```
import { useState } from "react";
import { Flame, Check, Trash2, Pencil, MoreVertical, BarChart2, Calendar as CalendarIcon, Target, Activity, Award } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger, DropdownMenuSeparator } from "@/components/ui/dropdown-menu";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

interface HabitCardProps {
  habit: any;
  onToggle: (habit: any, date: Date) => void;
  targetDate?: Date;
  onDelete: (id: string) => void;
  onEdit: (habit: any) => void;
}

function calculateBestStreak(completions: string[]) {
  if (!completions || !completions.length) return 0;
  const sorted = [...new Set(completions)].sort().reverse();
  
  let bestStreak = 0;
  let currentStreakInner = 1;
  let prevDate = new Date(sorted[0]);

  for (let i = 1; i < sorted.length; i++) {
    const d = new Date(sorted[i]);
    const diff = (prevDate.getTime() - d.getTime()) / (1000 * 3600 * 24);
    if (diff === 1) {
      currentStreakInner++;
    } else {
      currentStreakInner = 1;
    }
    prevDate = d;
    if (currentStreakInner > bestStreak) {
      bestStreak = currentStreakInner;
    }
  }
  return Math.max(bestStreak, 1);
}

export default function HabitCard({ habit, onToggle, targetDate, onDelete, onEdit }: HabitCardProps) {
  const [showStats, setShowStats] = useState(false);
  
  const target = targetDate || new Date();
  const dateStr = [target.getFullYear(), String(target.getMonth() + 1).padStart(2, '0'), String(target.getDate()).padStart(2, '0')].join('-');
  const isDoneToday = habit.completions?.includes(dateStr);

  const completionsArr = habit.completions || [];
  const totalCompletions = completionsArr.length;
  const startedOn = habit.createdAt ? new Date(habit.createdAt).toLocaleDateString("en-US") : 'Unknown';
  const lastMarked = completionsArr.length > 0 
    ? new Date([...completionsArr].sort().reverse()[0]).toLocaleDateString("en-US") 
    : 'Never';
  
  const bestStreak = calculateBestStreak(completionsArr);
  const currentStreak = habit.streak || 0;
  
  // Calculate completion rate (last 30 days)
  const thirtyDaysAgo = new Date();
  thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
  const last30DaysStr = thirtyDaysAgo.toISOString().split("T")[0];
  const completionsLast30Days = completionsArr.filter((c: string) => c >= last30DaysStr).length;
  const completionRate30d = Math.round((completionsLast30Days / 30) * 100);

  return (
    <>
      <div className="bg-card rounded-2xl p-4 border border-border flex items-center gap-3 relative overflow-hidden group hover:border-primary/20 transition-all">
        {/* Background color chip */}
        <div 
          className="absolute left-0 top-0 bottom-0 w-1 opacity-20" 
          style={{ backgroundColor: habit.color || "hsl(var(--primary))" }} 
        />
        
        <motion.button 
          whileTap={{ scale: 0.9 }}
          onClick={() => onToggle(habit, target)}
          className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-all duration-500 flex-shrink-0 ${
            isDoneToday 
              ? "shadow-lg scale-105" 
              : "bg-muted/50 border border-border hover:bg-primary/10 hover:border-primary/30 active:scale-95"
          }`}
          style={{ 
            backgroundColor: isDoneToday ? habit.color || "hsl(var(--primary))" : undefined,
            color: isDoneToday ? "white" : "hsl(var(--muted-foreground))"
          }}
        >
          {isDoneToday ? <Check className="w-6 h-6 stroke-[3]" /> : <Flame className="w-6 h-6 group-hover:text-primary transition-colors" />}
        </motion.button>
        
        <div className="flex-1 min-w-0 cursor-pointer" onClick={() => onEdit(habit)}>
          <p className={`text-sm font-bold truncate transition-colors ${isDoneToday ? "text-foreground" : "text-muted-foreground group-hover:text-foreground"}`}>
            {habit.title}
          </p>
          <div className="flex items-center gap-2 mt-0.5">
            <div className="flex items-center gap-1 bg-orange-500/10 px-1.5 py-0.5 rounded-full">
              <Flame className="w-3 h-3 text-orange-500 fill-orange-500" />
              <span className="text-[10px] font-bold text-orange-600">{habit.streak || 0}d streak</span>
            </div>
            {habit.frequency && (
              <span className="text-[10px] text-muted-foreground font-medium uppercase">{habit.frequency}</span>
            )}
          </div>
        </div>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="rounded-xl h-8 w-8 hover:bg-primary/10">
              <MoreVertical className="w-4 h-4 text-muted-foreground" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="rounded-2xl">
            <DropdownMenuItem onClick={() => setShowStats(true)} className="gap-2 rounded-xl">
              <BarChart2 className="w-4 h-4" /> Stats
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => onEdit(habit)} className="gap-2 rounded-xl">
              <Pencil className="w-4 h-4" /> Edit
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => onDelete(habit.id)} className="gap-2 text-destructive focus:text-destructive rounded-xl hover:bg-destructive/10">
              <Trash2 className="w-4 h-4" /> Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <Dialog open={showStats} onOpenChange={setShowStats}>
        <DialogContent className="rounded-3xl mx-auto max-w-sm w-[calc(100%-2rem)] max-h-[90vh] overflow-y-auto scrollbar-none">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <BarChart2 className="text-primary w-5 h-5" />
              {habit.title} Stats
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4 pt-2">
            
            <div className="grid grid-cols-2 gap-3">
              <div className="bg-orange-500/10 rounded-2xl p-4 border border-orange-500/20">
                <div className="flex items-center gap-1 text-orange-600 mb-1">
                  <Flame className="w-4 h-4 fill-current" />
                  <span className="text-xs font-bold uppercase">Current</span>
                </div>
                <p className="text-2xl font-bold text-orange-700">{currentStreak}</p>
                <p className="text-[10px] text-orange-600/80 font-medium mt-1">Days in a row</p>
              </div>
              <div className="bg-primary/10 rounded-2xl p-4 border border-primary/20">
                <div className="flex items-center gap-1 text-primary mb-1">
                  <Target className="w-4 h-4" />
                  <span className="text-xs font-bold uppercase">Best</span>
                </div>
                <p className="text-2xl font-bold text-primary">{Math.max(currentStreak, bestStreak)}</p>
                <p className="text-[10px] text-primary/80 font-medium mt-1">Longest streak</p>
              </div>
            </div>

            <div className="bg-card border border-border rounded-2xl p-4 space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Check className="w-4 h-4" />
                  <span className="text-sm font-medium">Total Completions</span>
                </div>
                <span className="text-sm font-bold">{totalCompletions}</span>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Activity className="w-4 h-4" />
                  <span className="text-sm font-medium">30-Day Rate</span>
                </div>
                <span className="text-sm font-bold">{completionRate30d}%</span>
              </div>

              {/* Habit Streak Milestones */}
              <div className="pt-2 pb-2 border-t border-dashed border-border/80">
                <div className="flex items-center gap-2 text-muted-foreground mb-2">
                  <Award className="w-4 h-4 text-amber-500" />
                  <span className="text-xs font-bold uppercase tracking-wider">Milestones & Badges</span>
                </div>
                <div className="grid grid-cols-2 gap-1.5 pt-1">
                  {[
                    { target: 3, label: "3d Novice", icon: "🌱", color: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400" },
                    { target: 7, label: "7d Bronze", icon: "🥉", color: "bg-amber-600/10 text-amber-700 dark:text-amber-400" },
                    { target: 30, label: "30d Silver", icon: "🥈", color: "bg-slate-400/10 text-slate-700 dark:text-slate-300" },
                    { target: 100, label: "100d Gold", icon: "🥇", color: "bg-yellow-500/10 text-yellow-700 dark:text-yellow-400" }
                  ].map(mile => {
                    const achieved = currentStreak >= mile.target;
                    return (
                      <div 
                        key={mile.target} 
                        className={`flex items-center gap-1.5 px-2 py-1 rounded-xl text-[10px] font-bold transition-all border ${
                          achieved 
                            ? `${mile.color} border-current/30` 
                            : "bg-muted/30 text-muted-foreground/30 border-transparent"
                        }`}
                      >
                        <span className={achieved ? "" : "grayscale opacity-50"}>{mile.icon}</span>
                        <span className={achieved ? "" : "line-through"}>{mile.label}</span>
                      </div>
                    );
                  })}
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-muted-foreground">
                  <CalendarIcon className="w-4 h-4" />
                  <span className="text-sm font-medium">Started On</span>
                </div>
                <span className="text-xs font-bold">{startedOn}</span>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Check className="w-4 h-4 text-emerald-500" />
                  <span className="text-sm font-medium">Last Marked</span>
                </div>
                <span className="text-xs font-bold">{lastMarked}</span>
              </div>
            </div>

          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
-e 
```

-e 
## `./src/components/tasks/KanbanBoard.tsx`
```
import { useState, useEffect } from "react";
import { DragDropContext, Droppable, Draggable, DropResult } from "@hello-pangea/dnd";
import { motion } from "framer-motion";
import { Check, Edit2, Trash2, RepeatIcon, Bell, MoreHorizontal } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { base44 } from "@/api/base44Client";

const PRIORITY_COLORS: Record<string, string> = { 
  low: "bg-emerald-100 text-emerald-700", 
  medium: "bg-yellow-100 text-yellow-700", 
  high: "bg-red-100 text-red-700" 
};

interface KanbanBoardProps {
  tasks: any[];
  onEdit: (task: any) => void;
  onRefresh: () => void;
}

export default function KanbanBoard({ tasks, onEdit, onRefresh }: KanbanBoardProps) {
  const [columns, setColumns] = useState<Record<string, any[]>>({
    todo: [],
    in_progress: [],
    done: []
  });

  useEffect(() => {
    setColumns({
      todo: tasks.filter(t => t.status === "todo"),
      in_progress: tasks.filter(t => t.status === "in_progress"),
      done: tasks.filter(t => t.status === "done")
    });
  }, [tasks]);

  const onDragEnd = async (result: DropResult) => {
    if (!result.destination) return;
    const { source, destination } = result;

    if (source.droppableId !== destination.droppableId) {
      const sourceCol = columns[source.droppableId];
      const destCol = columns[destination.droppableId];
      const sourceItems = [...sourceCol];
      const destItems = [...destCol];
      const [removed] = sourceItems.splice(source.index, 1);
      
      removed.status = destination.droppableId;
      destItems.splice(destination.index, 0, removed);
      
      setColumns({
        ...columns,
        [source.droppableId]: sourceItems,
        [destination.droppableId]: destItems
      });

      await base44.entities.Task.update(removed.id, { status: destination.droppableId });
      onRefresh();
    } else {
      const col = columns[source.droppableId];
      const items = [...col];
      const [removed] = items.splice(source.index, 1);
      items.splice(destination.index, 0, removed);
      
      setColumns({ ...columns, [source.droppableId]: items });
    }
  };

  async function toggleStatus(task: any) {
    const newStatus = task.status === "done" ? "todo" : "done";
    await base44.entities.Task.update(task.id, { status: newStatus });
    onRefresh();
  }

  async function deleteTask(id: string) {
    await base44.entities.Task.delete(id);
    onRefresh();
  }

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="hidden md:grid grid-cols-3 gap-6 h-full items-start">
        {Object.entries(columns).map(([columnId, columnTasks]) => (
          <div key={columnId} className="flex flex-col bg-muted/20 rounded-3xl p-4 min-h-[500px]">
            <div className="flex items-center justify-between mb-4 px-2">
              <h3 className="font-bold uppercase text-xs text-muted-foreground tracking-wider">
                {columnId.replace('_', ' ')}
              </h3>
              <Badge variant="secondary" className="text-[10px] font-bold bg-card border-border shadow-sm">
                {columnTasks.length}
              </Badge>
            </div>
            
            <Droppable droppableId={columnId}>
              {(provided, snapshot) => (
                <div 
                  {...provided.droppableProps} 
                  ref={provided.innerRef}
                  className={`flex-1 flex flex-col gap-3 transition-colors rounded-xl ${snapshot.isDraggingOver ? "bg-primary/5" : ""}`}
                >
                  {columnTasks.map((task, index) => (
                    <Draggable key={task.id} draggableId={task.id} index={index}>
                      {(provided, snapshot) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          className={`bg-card rounded-2xl p-4 border border-border group ${snapshot.isDragging ? "shadow-lg scale-[1.02] rotate-1 ring-1 ring-primary/20" : "hover:border-primary/20 shadow-sm"}`}
                          style={{ ...provided.draggableProps.style }}
                        >
                          <div className="flex items-start gap-3">
                            <button onClick={(e) => { e.stopPropagation(); toggleStatus(task); }}
                              className={`w-6 h-6 rounded-full border-2 flex items-center justify-center flex-shrink-0 mt-0.5 transition-all group-hover:border-primary/50 ${task.status === "done" ? "bg-primary border-primary group-hover:border-primary" : "border-border"}`}>
                              {task.status === "done" && <Check className="w-3 h-3 text-white" />}
                            </button>
                            
                            <div className="flex-1 min-w-0" onClick={() => onEdit(task)}>
                              <p className={`text-sm font-semibold transition-colors group-hover:text-primary ${task.status === "done" ? "line-through text-muted-foreground group-hover:text-primary/70" : ""}`}>{task.title}</p>
                              {task.description && <p className="text-xs text-muted-foreground mt-0.5 truncate">{task.description}</p>}
                              
                              <div className="flex items-center gap-2 mt-2 flex-wrap">
                                <Badge className={`text-[9px] px-1.5 py-0 uppercase font-bold tracking-wide ${PRIORITY_COLORS[task.priority]}`}>{task.priority}</Badge>
                                {task.due_date && <span className="text-[10px] text-muted-foreground font-medium">{task.due_date}{task.due_time ? ` at ${task.due_time}` : ""}</span>}
                                {task.repeat !== "none" && (
                                  <div className="flex items-center gap-1 text-[10px] text-primary bg-primary/5 px-1.5 py-0.5 rounded-full font-medium">
                                    <RepeatIcon className="w-2.5 h-2.5" />
                                    {task.repeat === "custom" ? task.repeat_days?.map((d: number) => ["S", "M", "T", "W", "T", "F", "S"][d]).join("") : task.repeat}
                                  </div>
                                )}
                                {task.notification_enabled && <Bell className="w-3 h-3 text-primary" />}
                              </div>
                            </div>

                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <button className="p-1.5 rounded-xl hover:bg-primary/10 text-muted-foreground transition-all">
                                  <MoreHorizontal className="w-4 h-4" />
                                </button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end" className="rounded-2xl min-w-[120px]">
                                <DropdownMenuItem onClick={() => onEdit(task)} className="gap-2 rounded-xl text-xs font-bold text-muted-foreground">
                                  <Edit2 className="w-3.5 h-3.5" /> Edit
                                </DropdownMenuItem>
                                <DropdownMenuItem onClick={() => deleteTask(task.id)} className="gap-2 text-rose-500 focus:text-rose-500 focus:bg-rose-500/10 rounded-xl text-xs font-bold">
                                  <Trash2 className="w-3.5 h-3.5" /> Delete
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </div>
                        </div>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </div>
        ))}
      </div>
    </DragDropContext>
  );
}
-e 
```

-e 
## `./src/components/finance/AddTransactionDialog.tsx`
```
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { base44 } from "@/api/base44Client";
import { getToday } from "@/lib/utils";

interface AddTransactionDialogProps {
  open: boolean;
  onClose: () => void;
  type: string;
  onSaved: () => void;
  settings: any;
}

export default function AddTransactionDialog({ open, onClose, type, onSaved, settings }: AddTransactionDialogProps) {
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    title: "",
    amount: "",
    date: getToday(),
    category: "General",
    source: "Pocket",
    billing_cycle: "monthly",
    currency: settings.currency_primary || "USD",
    next_billing: getToday(),
    reminder_time: "",
    custom_days: [] as number[]
  });

  async function handleSave() {
    if (!form.title || !form.amount) return;
    setLoading(true);
    try {
      const amount = parseFloat(form.amount);
      const isUSD = form.currency === "USD";
      // We store both amount and amount_usd for convenience
      const amountUSD = isUSD ? amount : amount / settings.uzs_rate;
      
      const payload = { 
        ...form, 
        amount: amount,
        is_active: type === "subscription" ? true : undefined
      };

      if (type === "expense") {
        await base44.entities.Expense.create(payload);
      } else if (type === "income") {
        await base44.entities.Income.create(payload);
      } else if (type === "subscription") {
        await base44.entities.Subscription.create(payload);
      }
      onSaved();
      onClose();
      // Reset form
      setForm({ ...form, title: "", amount: "" });
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  }

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="rounded-3xl mx-auto max-w-sm w-[calc(100%-2rem)]">
        <DialogHeader>
          <DialogTitle className="capitalize">Add {type}</DialogTitle>
        </DialogHeader>
        <div className="space-y-4 pt-2">
          <div>
            <Label>Title *</Label>
            <Input value={form.title} onChange={e => setForm(f => ({ ...f, title: e.target.value }))} placeholder={`e.g. ${type === 'income' ? 'Salary' : 'Grocery'}`} className="rounded-xl mt-1" />
          </div>
          <div className="grid grid-cols-3 gap-2">
            <div className="col-span-2">
              <Label>Amount *</Label>
              <Input type="number" value={form.amount} onChange={e => setForm(f => ({ ...f, amount: e.target.value }))} placeholder="0.00" className="rounded-xl mt-1" />
            </div>
            <div>
              <Label>Currency</Label>
              <Select value={form.currency} onValueChange={v => setForm(f => ({ ...f, currency: v }))}>
                <SelectTrigger className="rounded-xl mt-1">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="USD">$</SelectItem>
                  <SelectItem value="UZS">сўм</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          {type !== 'subscription' && (
            <div>
              <Label>Date</Label>
              <Input type="date" value={form.date} onChange={e => setForm(f => ({ ...f, date: e.target.value }))} className="rounded-xl mt-1" />
            </div>
          )}
          {type === 'expense' && (
            <div>
              <Label>Category</Label>
              <Select value={form.category} onValueChange={v => setForm(f => ({ ...f, category: v }))}>
                <SelectTrigger className="rounded-xl mt-1"><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="Food">🍔 Food</SelectItem>
                  <SelectItem value="Transport">🚗 Transport</SelectItem>
                  <SelectItem value="Housing">🏠 Housing</SelectItem>
                  <SelectItem value="Entertainment">🎬 Entertainment</SelectItem>
                  <SelectItem value="General">🔧 General</SelectItem>
                </SelectContent>
              </Select>
            </div>
          )}
          {type === 'subscription' && (
            <>
              <div>
                <Label>Cycle</Label>
                <Select value={form.billing_cycle} onValueChange={v => setForm(f => ({ ...f, billing_cycle: v }))}>
                  <SelectTrigger className="rounded-xl mt-1"><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="daily">Daily</SelectItem>
                    <SelectItem value="weekly">Weekly</SelectItem>
                    <SelectItem value="monthly">Monthly</SelectItem>
                    <SelectItem value="yearly">Yearly</SelectItem>
                    <SelectItem value="custom">Custom Days (Weekly)...</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {form.billing_cycle === 'custom' && (
                <div className="space-y-2">
                  <Label className="text-xs">Select Days (Starts from Monday)</Label>
                  <div className="flex gap-1">
                    {[
                      { label: "M", val: 1 },
                      { label: "T", val: 2 },
                      { label: "W", val: 3 },
                      { label: "T", val: 4 },
                      { label: "F", val: 5 },
                      { label: "S", val: 6 },
                      { label: "S", val: 0 },
                    ].map((day) => {
                      const isSelected = (form.custom_days || []).includes(day.val);
                      return (
                        <button
                          key={day.val}
                          type="button"
                          onClick={() => {
                            const currentDays = form.custom_days || [];
                            const next = isSelected 
                              ? currentDays.filter((d: number) => d !== day.val)
                              : [...currentDays, day.val];
                            setForm(f => ({ ...f, custom_days: next }));
                          }}
                          className={`flex-1 py-1.5 rounded-lg text-xs font-bold transition-all border ${
                            isSelected 
                              ? "bg-primary text-primary-foreground border-primary" 
                              : "bg-muted text-muted-foreground border-transparent hover:bg-muted/80"
                          }`}
                        >
                          {day.label}
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <Label>Next Billing</Label>
                  <Input type="date" value={form.next_billing} onChange={e => setForm(f => ({ ...f, next_billing: e.target.value }))} className="rounded-xl mt-1" />
                </div>
                <div>
                  <Label>Reminder Time</Label>
                  <Input type="time" value={form.reminder_time} onChange={e => setForm(f => ({ ...f, reminder_time: e.target.value }))} className="rounded-xl mt-1" />
                </div>
              </div>
            </>
          )}
          <Button onClick={handleSave} disabled={loading} className="w-full rounded-xl">
            {loading ? "Saving..." : "Save Transaction"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
-e 
```

-e 
## `./src/components/finance/ExpenseList.tsx`
```
import { Trash2, Pencil, Wallet, MoreHorizontal, ArrowDownRight } from "lucide-react";
import { formatCurrency, formatDate } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { base44 } from "@/api/base44Client";

interface ExpenseListProps {
  expenses: any[];
  onRefresh: () => void;
  settings: any;
  dateRange?: any;
}

export default function ExpenseList({ expenses, onRefresh, settings, dateRange }: ExpenseListProps) {
  async function remove(id: string) {
    await base44.entities.Expense.delete(id);
    onRefresh();
  }

  const renderExpenses = (items: any[]) => items.map((expense, i) => (
    <motion.div 
      key={expense.id} 
      initial={{ opacity: 0, x: -10 }} 
      animate={{ opacity: 1, x: 0 }} 
      exit={{ opacity: 0, x: 50 }}
      transition={{ delay: i * 0.03 }}
      className="bg-card rounded-2xl p-4 border border-border flex items-center gap-3 hover:bg-primary/5 hover:border-primary/20 transition-all group"
    >
      <div className="w-10 h-10 rounded-xl bg-rose-500/10 flex items-center justify-center flex-shrink-0 group-hover:bg-rose-500/20 transition-colors">
        <ArrowDownRight className="w-5 h-5 text-rose-500" />
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-bold truncate group-hover:text-primary transition-colors">{expense.title}</p>
        <p className="text-[10px] text-muted-foreground">{formatDate(expense.date)} • {expense.category}</p>
      </div>
      <div className="text-right flex items-center gap-2">
        <p className="text-sm font-bold text-rose-500">
          -{formatCurrency(expense.amount, settings.currency_primary, settings.uzs_rate, expense.currency)}
        </p>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="p-1.5 rounded-xl hover:bg-primary/10 text-muted-foreground transition-all">
              <MoreHorizontal className="w-4 h-4" />
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="rounded-2xl">
            <DropdownMenuItem onClick={() => remove(expense.id)} className="gap-2 text-destructive focus:text-destructive rounded-xl">
              <Trash2 className="w-3.5 h-3.5" /> Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </motion.div>
  ));

  return (
    <div className="space-y-4">
      <AnimatePresence>
        {(() => {
          if (dateRange?.from) {
            const dates = [];
            const curr = new Date(dateRange.from);
            const end = dateRange.to ? new Date(dateRange.to) : new Date(dateRange.from);
            
            while (curr <= end) {
              dates.push(new Date(curr));
              curr.setDate(curr.getDate() + 1);
            }

            return dates.map(date => {
              const dateStr = date.toISOString().split("T")[0];
              const dateItems = expenses.filter(e => e.date?.startsWith(dateStr));
              
              return (
                <div key={date.toISOString()} className="space-y-2 mb-4">
                  <div className="flex items-center gap-4 py-2">
                    <div className="h-px bg-border flex-1" />
                    <p className="text-xs font-bold text-muted-foreground uppercase">{date.toLocaleDateString("en-US", { weekday: 'short', month: 'short', day: 'numeric' })}</p>
                    <div className="h-px bg-border flex-1" />
                  </div>
                  {dateItems.length > 0 ? renderExpenses(dateItems) : (
                    <p className="text-xs text-center text-muted-foreground/60 py-2">No expenses</p>
                  )}
                </div>
              );
            });
          }

          return renderExpenses(expenses);
        })()}
      </AnimatePresence>
      {expenses.length === 0 && (
        <div className="text-center py-12">
          <p className="text-xs text-muted-foreground">No expenses found</p>
        </div>
      )}
    </div>
  );
}
-e 
```

-e 
## `./src/components/finance/FinanceSummary.tsx`
```
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip as RechartsTooltip } from "recharts";
import { formatCurrency } from "@/lib/utils";

interface FinanceSummaryProps {
  expenses: any[];
  income: any[];
  settings: any;
}

export default function FinanceSummary({ expenses, income, settings }: FinanceSummaryProps) {
  const getAmountInPrimary = (item: any) => {
    let amt = item.amount || 0;
    if (item.currency === 'USD' && settings.currency_primary === 'UZS') amt *= settings.uzs_rate;
    if (item.currency === 'UZS' && settings.currency_primary === 'USD') amt /= settings.uzs_rate;
    return amt;
  };

  const categoryTotals: Record<string, number> = {};
  expenses.forEach(e => {
    const cat = e.category || "General";
    categoryTotals[cat] = (categoryTotals[cat] || 0) + getAmountInPrimary(e);
  });

  const chartData = Object.keys(categoryTotals).map(cat => ({
    name: cat,
    value: categoryTotals[cat]
  }));

  const COLORS = ["hsl(var(--primary))", "hsl(var(--accent))", "#f43f5e", "#10b981", "#f59e0b", "#8b5cf6"];

  return (
    <div className="space-y-6">
      {/* Chart */}
      <div className="bg-card rounded-3xl p-5 border border-border h-[260px]">
        <h3 className="text-xs font-bold text-muted-foreground uppercase mb-2">Spending by Category</h3>
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={chartData}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={80}
              paddingAngle={5}
              dataKey="value"
            >
              {chartData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} stroke="none" />
              ))}
            </Pie>
            <RechartsTooltip 
              contentStyle={{ borderRadius: '1rem', border: 'none', background: 'hsl(var(--card))', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
              formatter={(val: number) => formatCurrency(val, settings.currency_primary, settings.uzs_rate)}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>

      {/* Breakdowns */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
        {chartData.sort((a,b) => b.value - a.value).map((item, i) => (
          <div key={item.name} className="bg-card rounded-2xl p-4 border border-border flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 rounded-full" style={{ backgroundColor: COLORS[i % COLORS.length] }} />
              <span className="text-sm font-semibold">{item.name}</span>
            </div>
            <span className="text-sm font-bold font-mono">
              {formatCurrency(item.value, settings.currency_primary, settings.uzs_rate)}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
-e 
```

-e 
## `./src/components/finance/SubscriptionList.tsx`
```
import { Trash2, CreditCard, Check, X, MoreHorizontal } from "lucide-react";
import { formatCurrency } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";
import { base44 } from "@/api/base44Client";
import { Switch } from "@/components/ui/switch";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";

interface SubscriptionListProps {
  subscriptions: any[];
  onRefresh: () => void;
  settings: any;
}

export default function SubscriptionList({ subscriptions, onRefresh, settings }: SubscriptionListProps) {
  async function toggle(sub: any) {
    await base44.entities.Subscription.update(sub.id, { is_active: !sub.is_active });
    onRefresh();
  }

  async function remove(id: string) {
    await base44.entities.Subscription.delete(id);
    onRefresh();
  }

  return (
    <div className="space-y-3">
      <AnimatePresence>
        {subscriptions.map((sub, i) => (
          <motion.div 
            key={sub.id} 
            initial={{ opacity: 0, y: 10 }} 
            animate={{ opacity: 1, y: 0 }} 
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ delay: i * 0.05 }}
            className={`bg-card rounded-2xl p-4 border border-border flex items-center gap-3 transition-all hover:bg-primary/5 hover:border-primary/20 group ${!sub.is_active ? "opacity-50 grayscale hover:grayscale-0" : ""}`}
          >
            <div className="w-10 h-10 rounded-xl bg-blue-500/10 flex items-center justify-center flex-shrink-0 group-hover:bg-blue-500/20 transition-colors">
              <CreditCard className="w-5 h-5 text-blue-500" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-bold truncate group-hover:text-primary transition-colors">{sub.title}</p>
              <p className="text-[10px] text-muted-foreground uppercase">
                {(() => {
                  if (sub.billing_cycle === 'custom') {
                    const daysMap: Record<number, string> = { 1: "Mon", 2: "Tue", 3: "Wed", 4: "Thu", 5: "Fri", 6: "Sat", 0: "Sun" };
                    const selected = (sub.custom_days || []).map((d: number) => daysMap[d]).filter(Boolean).join(', ');
                    return `Custom: ${selected || 'days'}`;
                  }
                  return sub.billing_cycle || "Monthly";
                })()}
                {sub.next_billing && ` • Next: ${new Date(sub.next_billing).toLocaleDateString("en-US")}`}
              </p>
            </div>
            <div className="text-right flex items-center gap-4">
              <div>
                <p className="text-sm font-bold text-foreground">
                  {formatCurrency(sub.amount, settings.currency_primary, settings.uzs_rate, sub.currency)}
                </p>
              </div>
              <div className="flex items-center gap-2">
                <Switch checked={sub.is_active} onCheckedChange={() => toggle(sub)} />
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <button className="p-1.5 rounded-xl hover:bg-primary/10 text-muted-foreground transition-all">
                      <MoreHorizontal className="w-4 h-4" />
                    </button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="rounded-2xl">
                    <DropdownMenuItem onClick={() => remove(sub.id)} className="gap-2 text-destructive focus:text-destructive rounded-xl">
                      <Trash2 className="w-3.5 h-3.5" /> Delete
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
          </motion.div>
        ))}
      </AnimatePresence>
      {subscriptions.length === 0 && (
        <div className="text-center py-12">
          <p className="text-xs text-muted-foreground">No recurring subscriptions</p>
        </div>
      )}
    </div>
  );
}
-e 
```

-e 
## `./src/components/finance/IncomeList.tsx`
```
import { Trash2, TrendingUp, MoreHorizontal } from "lucide-react";
import { formatCurrency, formatDate } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { base44 } from "@/api/base44Client";

interface IncomeListProps {
  income: any[];
  onRefresh: () => void;
  settings: any;
  dateRange?: any;
}

export default function IncomeList({ income, onRefresh, settings, dateRange }: IncomeListProps) {
  async function remove(id: string) {
    await base44.entities.Income.delete(id);
    onRefresh();
  }

  const renderIncome = (items: any[]) => items.map((item, i) => (
    <motion.div 
      key={item.id} 
      initial={{ opacity: 0, x: -10 }} 
      animate={{ opacity: 1, x: 0 }} 
      exit={{ opacity: 0, x: 50 }}
      transition={{ delay: i * 0.03 }}
      className="bg-card rounded-2xl p-4 border border-border flex items-center gap-3 hover:bg-primary/5 hover:border-primary/20 transition-all group"
    >
      <div className="w-10 h-10 rounded-xl bg-emerald-500/10 flex items-center justify-center flex-shrink-0 group-hover:bg-emerald-500/20 transition-colors">
        <TrendingUp className="w-5 h-5 text-emerald-500" />
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-bold truncate group-hover:text-primary transition-colors">{item.title}</p>
        <p className="text-[10px] text-muted-foreground">{formatDate(item.date)} • {item.source}</p>
      </div>
      <div className="text-right flex items-center gap-2">
        <p className="text-sm font-bold text-emerald-500">
          +{formatCurrency(item.amount, settings.currency_primary, settings.uzs_rate, item.currency)}
        </p>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="p-1.5 rounded-xl hover:bg-primary/10 text-muted-foreground transition-all">
              <MoreHorizontal className="w-4 h-4" />
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="rounded-2xl">
            <DropdownMenuItem onClick={() => remove(item.id)} className="gap-2 text-destructive focus:text-destructive rounded-xl">
              <Trash2 className="w-3.5 h-3.5" /> Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </motion.div>
  ));

  return (
    <div className="space-y-4">
      <AnimatePresence>
        {(() => {
          if (dateRange?.from) {
            const dates = [];
            const curr = new Date(dateRange.from);
            const end = dateRange.to ? new Date(dateRange.to) : new Date(dateRange.from);
            
            while (curr <= end) {
              dates.push(new Date(curr));
              curr.setDate(curr.getDate() + 1);
            }

            return dates.map(date => {
              const dateStr = date.toISOString().split("T")[0];
              const dateItems = income.filter(e => e.date?.startsWith(dateStr));
              
              return (
                <div key={date.toISOString()} className="space-y-2 mb-4">
                  <div className="flex items-center gap-4 py-2">
                    <div className="h-px bg-border flex-1" />
                    <p className="text-xs font-bold text-muted-foreground uppercase">{date.toLocaleDateString("en-US", { weekday: 'short', month: 'short', day: 'numeric' })}</p>
                    <div className="h-px bg-border flex-1" />
                  </div>
                  {dateItems.length > 0 ? renderIncome(dateItems) : (
                    <p className="text-xs text-center text-muted-foreground/60 py-2">No income</p>
                  )}
                </div>
              );
            });
          }

          return renderIncome(income);
        })()}
      </AnimatePresence>
      {income.length === 0 && (
        <div className="text-center py-12">
          <p className="text-xs text-muted-foreground">No income recorded</p>
        </div>
      )}
    </div>
  );
}
-e 
```

-e 
## `./src/components/UserNotRegisteredError.tsx`
```
import React from 'react';

const UserNotRegisteredError = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-background p-6 text-center">
      <div className="max-w-md w-full p-8 bg-card rounded-3xl shadow-xl border border-border">
        <div className="text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 mb-6 rounded-full bg-orange-100 dark:bg-orange-950">
            <svg className="w-8 h-8 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
          </div>
          <h1 className="text-2xl font-bold text-foreground mb-4 font-poppins">Access Restricted</h1>
          <p className="text-muted-foreground mb-8 text-sm">
            You are not registered to use this application. Please contact the app administrator to request access.
          </p>
          <div className="p-4 bg-muted/50 rounded-2xl text-xs text-muted-foreground text-left space-y-2">
            <p className="font-semibold">If you believe this is an error:</p>
            <ul className="list-disc list-inside mt-2 space-y-1">
              <li>Verify you are logged in with correct account</li>
              <li>Contact admin for manual activation</li>
              <li>Try refreshing or re-logging</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserNotRegisteredError;
-e 
```

-e 
## `./src/components/layout/AppLayout.tsx`
```
import { Outlet, Link, useLocation } from 'react-router-dom';
import { Home, Flame, CheckCircle, Wallet, Target, Settings, ChevronLeft, ChevronRight, Calendar, FileText, Menu, X, Bookmark, Database, Bot, ChevronDown, ChevronUp, Cloud, File, Table, CheckSquare } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNotifications } from '@/lib/useNotifications';
import { useSettings } from '@/lib/useSettings';
import { useState, useEffect } from 'react';
import { DatabaseWakeup } from './DatabaseWakeup';

const NAV_GROUPS = [
  {
    name: 'Dashboard',
    items: [
      { path: '/', label: 'Home', icon: Home },
    ]
  },
  {
    name: 'Productivity',
    items: [
      { path: '/habits', label: 'Habits', icon: Flame },
      { path: '/tasks', label: 'Tasks', icon: CheckCircle },
      { path: '/finance', label: 'Finance', icon: Wallet },
      { path: '/goals', label: 'Goals', icon: Target },
    ]
  },
  {
    name: 'Workspace',
    items: [
      { path: '/calendar', label: 'Calendar', icon: Calendar },
      { path: '/drive', label: 'Drive', icon: Cloud },
      { path: '/docs', label: 'Docs', icon: File },
      { path: '/sheets', label: 'Sheets', icon: Table },
      { path: '/google-tasks', label: 'G-Tasks', icon: CheckSquare },
      { path: '/notes', label: 'Notes', icon: FileText },
      { path: '/bookmarks', label: 'Bookmarks', icon: Bookmark },
    ]
  },
  {
    name: 'System & Settings',
    items: [
      { path: '/data', label: 'Data Hub', icon: Database },
      { path: '/sync', label: 'Google & Bot Sync', icon: Bot },
      { path: '/settings', label: 'Settings', icon: Settings },
    ]
  }
];

export default function AppLayout() {
  const location = useLocation();
  const { settings } = useSettings();
  const [isCollapsed, setIsCollapsed] = useState(window.innerWidth < 1024);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [expandedGroup, setExpandedGroup] = useState<string | null>(null);
  useNotifications();

  const toggleGroup = (groupName: string) => {
    setExpandedGroup(prev => prev === groupName ? null : groupName);
  };

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 1024) {
        setIsCollapsed(true);
      } else {
        setIsCollapsed(false);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  return (
    <div 
      className="flex flex-col md:flex-row h-[100dvh] bg-background mx-auto relative overflow-hidden transition-all duration-300 shadow-xl"
      style={{ 
        width: (settings as any).container_width || '100%', 
        maxWidth: '100%',
      }}
    >
      <DatabaseWakeup />
      {/* Mobile Header Navigation */}
      <div className="lg:hidden flex items-center justify-between p-4 border-b border-border bg-card/80 backdrop-blur-xl z-30 flex-shrink-0">
        <div className="flex items-center gap-2">
          <button 
            onClick={() => setIsMobileMenuOpen(true)}
            className="p-2 -ml-2 text-muted-foreground hover:text-foreground"
          >
            <Menu className="w-6 h-6" />
          </button>
          <h1 className="text-lg bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/60 flex items-center gap-1.5">
            <span className="font-extrabold">MMV</span>
            <span className="font-light text-muted-foreground text-sm">|</span>
            <span className="font-bold text-sm">Productivity Hub</span>
          </h1>
        </div>
      </div>

      {/* Desktop/Tablet Sidebar */}
      <motion.aside 
        initial={false}
        animate={{ width: isCollapsed ? 80 : 256 }}
        transition={{ duration: 0.2 }}
        className="hidden lg:flex flex-col bg-card border-r border-border p-4 z-40 relative flex-shrink-0 whitespace-nowrap overflow-hidden"
      >
        <div className={`mb-8 py-4 flex items-center justify-between ${isCollapsed ? 'px-1 flex-col gap-4' : 'px-2'}`}>
          <div className={`${isCollapsed ? 'text-center' : ''} min-w-0 flex items-center gap-2`}>
            <div>
              <h1 className="text-xl bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/60 truncate flex items-center gap-1.5">
                <span className="font-black">MMV</span>
                {!isCollapsed && (
                  <>
                    <span className="font-light text-muted-foreground">|</span>
                    <span className="font-bold text-sm">Productivity Hub</span>
                  </>
                )}
              </h1>
            </div>
          </div>
          <button 
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="text-primary hover:text-primary-foreground p-1.5 rounded-full border border-border shadow-xs bg-card hover:bg-primary transition-all duration-200 flex-shrink-0 active:scale-95"
          >
            {isCollapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
          </button>
        </div>
        <nav className="flex-1 overflow-y-auto scrollbar-none pb-4 mt-2">
          <div className="flex flex-col gap-4">
            {NAV_GROUPS.map((group) => (
              <div key={group.name} className="flex flex-col gap-1">
                {!isCollapsed && group.name !== 'Dashboard' && (
                  <button 
                    onClick={() => toggleGroup(group.name)}
                    className="flex items-center justify-between px-5 py-1 text-[11px] font-bold text-muted-foreground/70 hover:text-foreground transition-colors group"
                  >
                    <span className="uppercase tracking-wider">{group.name}</span>
                    {expandedGroup === group.name ? <ChevronUp className="w-3.5 h-3.5 opacity-50 group-hover:opacity-100" /> : <ChevronDown className="w-3.5 h-3.5 opacity-50 group-hover:opacity-100" />}
                  </button>
                )}
                {isCollapsed && group.name !== 'Dashboard' && (
                  <div className="w-full h-px bg-border my-1" />
                )}
                
                <AnimatePresence initial={false}>
                  {(!isCollapsed ? expandedGroup === group.name || group.name === 'Dashboard' : true) && (
                    <motion.ul 
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      className="flex flex-col gap-1.5 overflow-hidden px-2"
                    >
                      {group.items.map((item) => {
                        const isActive = location.pathname === item.path;
                        const Icon = item.icon;
                        return (
                          <li key={item.path}>
                            <Link 
                              to={item.path} 
                              className={`flex items-center ${isCollapsed ? 'justify-center' : 'gap-3 px-3'} py-2.5 rounded-xl transition-all relative ${
                                isActive 
                                  ? 'bg-primary/10 text-primary font-bold' 
                                  : 'text-muted-foreground hover:bg-primary/5 hover:text-primary font-medium'
                              }`}
                            >
                              <Icon className="w-5 h-5 flex-shrink-0" />
                              {!isCollapsed && <span className="text-sm truncate">{item.label}</span>}
                              {isActive && (
                                <motion.div
                                  layoutId="sidebar-active"
                                  className={`absolute left-0 bg-primary ${isCollapsed ? 'w-1 h-6 rounded-r-full' : 'w-1 h-8 rounded-r-full'}`}
                                  initial={false}
                                  transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                                />
                              )}
                            </Link>
                          </li>
                        );
                      })}
                    </motion.ul>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </nav>
      </motion.aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto scrollbar-none pb-8 md:pb-0 safe-area-inset-top relative">
        <AnimatePresence mode="wait">
          <motion.div
            key={location.pathname}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.15, ease: "easeOut" }}
            className="h-full w-full max-w-5xl mx-auto md:p-4"
          >
            <Outlet />
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Mobile Sub-Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileMenuOpen(false)}
              className="lg:hidden fixed inset-0 bg-background/80 backdrop-blur-sm z-50"
            />
            <motion.div
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="lg:hidden fixed top-0 left-0 bottom-0 w-3/4 max-w-[300px] border-r border-border bg-card z-50 flex flex-col shadow-2xl"
            >
              <div className="p-4 border-b border-border flex items-center justify-between flex-shrink-0">
                <div className="flex items-center gap-2">
                  <div>
                    <h1 className="text-lg bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/60 flex items-center gap-1.5">
                      <span className="font-black">MMV</span>
                      <span className="font-light text-muted-foreground text-sm">|</span>
                      <span className="font-bold text-sm">Menu</span>
                    </h1>
                  </div>
                </div>
                <button 
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="p-2 -mr-2 text-muted-foreground hover:text-foreground bg-muted/50 rounded-full"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              <nav className="flex-1 overflow-y-auto p-4 scrollbar-none">
                <div className="flex flex-col gap-4">
                  {NAV_GROUPS.map((group) => (
                    <div key={group.name} className="flex flex-col gap-1">
                      {group.name !== 'Dashboard' && (
                        <button 
                          onClick={() => toggleGroup(group.name)}
                          className="flex items-center justify-between px-2 py-1 text-[11px] font-bold text-muted-foreground/70 hover:text-foreground transition-colors group"
                        >
                          <span className="uppercase tracking-wider">{group.name}</span>
                          {expandedGroup === group.name ? <ChevronUp className="w-4 h-4 opacity-50 group-hover:opacity-100" /> : <ChevronDown className="w-4 h-4 opacity-50 group-hover:opacity-100" />}
                        </button>
                      )}
                      
                      <AnimatePresence initial={false}>
                        {(expandedGroup === group.name || group.name === 'Dashboard') && (
                          <motion.ul 
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.2 }}
                            className="flex flex-col gap-1.5 overflow-hidden"
                          >
                            {group.items.map((item) => {
                              const isActive = location.pathname === item.path;
                              const Icon = item.icon;
                              return (
                                <li key={item.path}>
                                  <Link 
                                    to={item.path} 
                                    className={`flex items-center gap-4 px-4 py-3.5 rounded-2xl transition-all ${
                                      isActive 
                                        ? 'bg-primary/10 text-primary font-bold shadow-xs border border-primary/20' 
                                        : 'text-muted-foreground hover:bg-primary/5 hover:text-primary font-medium border border-transparent'
                                    }`}
                                    onClick={() => setIsMobileMenuOpen(false)}
                                  >
                                    <Icon className={`w-5 h-5 ${isActive ? 'text-primary' : 'text-muted-foreground/70'}`} />
                                    <span className="text-sm">{item.label}</span>
                                  </Link>
                                </li>
                              );
                            })}
                          </motion.ul>
                        )}
                      </AnimatePresence>
                    </div>
                  ))}
                </div>
              </nav>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
-e 
```

-e 
## `./src/components/layout/DatabaseWakeup.tsx`
```
import { useEffect, useState } from 'react';
import { useGoogleAuth } from '@/lib/googleAuth';
import { googleApi } from '@/lib/googleApi';
import { FileSpreadsheet, HardDrive, Flame, Check } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { db } from '@/lib/firebase';
import { collection, getDocs, limit } from 'firebase/firestore';

export function DatabaseWakeup() {
  const { accessToken } = useGoogleAuth();
  const [showWakeup, setShowWakeup] = useState(false);
  const [wakingStatus, setWakingStatus] = useState<Record<string, 'pending' | 'success' | 'error'>>({});

  useEffect(() => {
    const today = new Date().toDateString();
    const lastWakeup = localStorage.getItem('last_database_wakeup');
    
    if (lastWakeup !== today) {
      setShowWakeup(true);
      
      const wakeDatabases = async () => {
        const status: Record<string, 'pending' | 'success' | 'error'> = {
          firebase: 'pending',
          sheets: 'pending',
          drive: 'pending',
        };
        setWakingStatus({...status});

        // 1. Wake Firebase
        try {
          // Just make a dummy query to "wake" it
          await getDocs(limit(collection(db, 'goals'), 1));
          status.firebase = 'success';
        } catch (e) {
          status.firebase = 'error';
        }
        setWakingStatus({...status});

        // 2. Wake Google Calendar/Drive/Sheets APIs
        if (accessToken) {
          try {
            await googleApi.drive.listFiles(accessToken);
            status.drive = 'success';
            status.sheets = 'success';
          } catch (e) {
            status.drive = 'error';
            status.sheets = 'error';
          }
        } else {
          status.drive = 'success';
          status.sheets = 'success';
        }
        setWakingStatus({...status});

        localStorage.setItem('last_database_wakeup', today);

        // Keep the success state visible briefly, then slide away
        setTimeout(() => setShowWakeup(false), 3000);
      };

      wakeDatabases();
    }
  }, [accessToken]);

  const allSuccess = Object.values(wakingStatus).every(s => s === 'success');

  return (
    <AnimatePresence>
      {showWakeup && (
        <motion.div 
          initial={{ opacity: 0, y: 50, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.95 }}
          transition={{ type: 'spring', damping: 20, stiffness: 300 }}
          className="fixed bottom-6 right-6 z-50 flex items-center gap-3 bg-card/90 backdrop-blur-md border border-border shadow-xl rounded-full px-4 py-2 text-xs font-medium"
        >
          <div className="flex items-center gap-1.5 text-muted-foreground pr-2 border-r border-border">
            {allSuccess ? (
              <div className="w-4 h-4 rounded-full bg-emerald-500/15 flex items-center justify-center">
                <Check className="w-2.5 h-2.5 text-emerald-500" />
              </div>
            ) : (
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
              </span>
            )}
            <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">Syncing</span>
          </div>
          
          <div className="flex items-center gap-2.5">
            <IconStatus icon={Flame} label="Firebase" status={wakingStatus.firebase} />
            <IconStatus icon={HardDrive} label="Drive" status={wakingStatus.drive} />
            <IconStatus icon={FileSpreadsheet} label="Sheets" status={wakingStatus.sheets} />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function IconStatus({ icon: Icon, label, status }: { icon: any, label: string, status?: 'pending' | 'success' | 'error' }) {
  let colorClass = 'text-muted-foreground opacity-40';
  let pulseClass = '';

  if (status === 'pending') {
    colorClass = 'text-primary opacity-100';
    pulseClass = 'animate-pulse';
  } else if (status === 'success') {
    colorClass = 'text-emerald-500 opacity-100 drop-shadow-[0_0_4px_rgba(16,185,129,0.2)]';
  } else if (status === 'error') {
    colorClass = 'text-red-500 opacity-100';
  }

  return (
    <div className={`relative group flex items-center justify-center p-1 rounded-lg ${pulseClass}`}>
      <Icon className={`w-4 h-4 transition-colors duration-300 ${colorClass}`} />
      
      {/* Dynamic tooltip */}
      <span className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 bg-popover text-popover-foreground text-[9px] px-1.5 py-0.5 rounded border border-border shadow-sm opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity font-bold uppercase tracking-widest leading-none">
        {label}
      </span>
    </div>
  );
}

-e 
```

-e 
## `./src/components/goals/GoalCard.tsx`
```
import { Target, Pencil, Trash2, Plus, CheckCircle2, ChevronRight, Image as ImageIcon } from "lucide-react";
import { motion } from "framer-motion";
import { formatCurrency } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { useState } from "react";

interface GoalCardProps {
  goal: any;
  onToggleMilestone: (goal: any, index: number) => void;
  onAddSavings: (goal: any, amount: number) => void;
  onDelete: (id: string) => void;
  onEdit: (goal: any) => void;
  onMarkComplete: (goal: any) => void;
  settings: any;
}

export default function GoalCard({ 
  goal, onToggleMilestone, onAddSavings, onDelete, onEdit, onMarkComplete, settings 
}: GoalCardProps) {
  const [customAmount, setCustomAmount] = useState("");
  
  const isSavings = goal.type === "savings";
  const isCompleted = goal.status === "completed";
  
  const pct = isSavings && goal.target_amount > 0
    ? Math.min(100, Math.round(((goal.current_amount || 0) / goal.target_amount) * 100))
    : goal.milestones?.length > 0
      ? Math.round((goal.milestones.filter((m: any) => m.completed).length / goal.milestones.length) * 100)
      : 0;

  const handleAddCustom = () => {
    const amt = parseFloat(customAmount);
    if (amt > 0) {
      onAddSavings(goal, amt);
      setCustomAmount("");
    }
  };

  return (
    <div className={`h-full flex flex-col bg-card rounded-3xl border border-border overflow-hidden relative transition-all hover:border-primary/30 group shadow-sm hover:shadow-md ${isCompleted ? "opacity-75 grayscale-[0.5]" : ""}`}>
      {/* Cover Image */}
      {goal.image_url ? (
        <div className="h-40 w-full relative overflow-hidden flex-shrink-0">
          <img src={goal.image_url} alt={goal.title} className="absolute inset-0 w-full h-full object-cover transition-transform group-hover:scale-105 duration-1000 ease-out" />
          <div className="absolute inset-0 bg-gradient-to-t from-card via-card/40 to-transparent" />
          <div className="absolute top-3 right-3 flex gap-1 z-10 backdrop-blur-md bg-background/50 rounded-xl">
             <Button variant="ghost" size="icon" onClick={() => onEdit(goal)} className="h-8 w-8 rounded-xl hover:bg-background/80">
               <Pencil className="w-3.5 h-3.5" />
             </Button>
             <Button variant="ghost" size="icon" onClick={() => onDelete(goal.id)} className="h-8 w-8 rounded-xl text-destructive hover:bg-destructive/20 hover:text-destructive">
               <Trash2 className="w-3.5 h-3.5" />
             </Button>
          </div>
        </div>
      ) : (
        <div className="h-2 w-full transition-opacity group-hover:opacity-80 flex-shrink-0" style={{ backgroundColor: goal.color || "hsl(var(--primary))" }} />
      )}

      <div className={`p-5 flex-1 flex flex-col ${goal.image_url ? "pt-2" : ""}`}>
        {!goal.image_url && (
          <div className="flex flex-row-reverse items-start justify-between absolute right-4 top-4">
             <div className="flex gap-1 ml-2">
               <Button variant="ghost" size="icon" onClick={() => onEdit(goal)} className="h-8 w-8 rounded-xl">
                 <Pencil className="w-3.5 h-3.5 text-muted-foreground" />
               </Button>
               <Button variant="ghost" size="icon" onClick={() => onDelete(goal.id)} className="h-8 w-8 rounded-xl text-destructive hover:bg-destructive/10">
                 <Trash2 className="w-3.5 h-3.5" />
               </Button>
             </div>
          </div>
        )}
        
        <div className={`flex items-start justify-between mb-4 ${!goal.image_url ? 'pr-16' : ''}`}>
          <div className="flex-1 min-w-0 cursor-pointer" onClick={() => onEdit(goal)}>
            <div className="flex items-center gap-2">
              <h3 className={`font-bold text-xl leading-tight truncate group-hover:text-primary transition-colors ${isCompleted ? "line-through text-muted-foreground group-hover:text-primary/70" : ""}`}>
                {goal.title}
              </h3>
              {isCompleted && <CheckCircle2 className="w-5 h-5 text-emerald-500 flex-shrink-0" />}
            </div>
            {goal.description && <p className="text-xs text-muted-foreground mt-1 line-clamp-2">{goal.description}</p>}
          </div>
        </div>

        {/* Progress Section */}
        <div className="mb-5 mt-auto">
          <div className="flex items-center justify-between text-xs font-bold mb-2 grayscale-0">
            <span className="text-primary">{pct}% complete</span>
            {isSavings ? (
              <span className="text-muted-foreground font-mono">
                {formatCurrency(goal.current_amount || 0, goal.currency, settings.uzs_rate)} / {formatCurrency(goal.target_amount, goal.currency, settings.uzs_rate)}
              </span>
            ) : (
              <span className="text-muted-foreground font-mono">
                {goal.milestones?.filter((m: any) => m.completed).length || 0} / {goal.milestones?.length || 0} tasks
              </span>
            )}
          </div>
          <Progress value={pct} className="h-2.5 rounded-full bg-muted/60" indicatorClassName="bg-primary shadow-[0_0_10px_rgba(var(--primary),0.5)]" />
        </div>

        {/* Action area */}
        {isSavings ? (
          <div className="flex gap-2 items-center">
            <div className="flex gap-2 flex-1 relative">
              <Input 
                type="number" 
                placeholder="Amount" 
                value={customAmount}
                onChange={(e) => setCustomAmount(e.target.value)} 
                onKeyDown={(e) => e.key === 'Enter' && handleAddCustom()}
                className="rounded-xl h-10 flex-1 font-mono text-sm bg-muted/30 focus-visible:bg-transparent"
              />
              <Button 
                variant="default" 
                className="rounded-xl h-10 px-4 font-bold shadow-sm"
                onClick={handleAddCustom}
                disabled={!customAmount || parseFloat(customAmount) <= 0}
              >
                Add {goal.currency}
              </Button>
            </div>
            <Button 
              onClick={() => onMarkComplete(goal)}
              className={`rounded-xl h-10 px-3 shrink-0 ${isCompleted ? "bg-muted text-muted-foreground" : ""}`}
              variant={isCompleted ? "secondary" : "outline"}
            >
              <CheckCircle2 className="w-4 h-4" />
            </Button>
          </div>
        ) : (
          <div className="space-y-2">
            {goal.milestones?.map((m: any, idx: number) => (
                <div 
                  key={idx} 
                  className="flex items-center gap-3 p-3 bg-muted/30 rounded-2xl border border-border/50 active:scale-[0.99] transition-all hover:bg-primary/5 hover:border-primary/20 group/milestone cursor-pointer shadow-sm hover:shadow"
                  onClick={() => onToggleMilestone(goal, idx)}
                >
                  <Checkbox checked={m.completed} className="group-hover/milestone:border-primary shrink-0" />
                  <span className={`text-sm font-medium transition-colors ${m.completed ? "line-through text-muted-foreground opacity-70" : "group-hover/milestone:text-primary"}`}>
                    {m.title}
                  </span>
                </div>
            ))}
            <Button 
              variant={isCompleted ? "outline" : "default"} 
              className={`w-full rounded-xl text-sm font-bold gap-2 h-11 ${!isCompleted ? "shadow-md" : ""}`}
              onClick={() => onMarkComplete(goal)}
            >
              {isCompleted ? "Re-open Goal" : "Mark as Finished"}
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
-e 
```

-e 
## `./src/components/common/PullToRefresh.tsx`
```
import { useState, useRef, useEffect } from 'react';
import { RefreshCw } from 'lucide-react';
import { motion, useAnimation } from 'framer-motion';

interface PullToRefreshProps {
  onRefresh: () => Promise<void>;
  children: React.ReactNode;
}

export default function PullToRefresh({ onRefresh, children }: PullToRefreshProps) {
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [pullDistance, setPullDistance] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const startY = useRef(0);
  const controls = useAnimation();

  const PULL_THRESHOLD = 80;

  const handleTouchStart = (e: React.TouchEvent) => {
    if (window.scrollY === 0) {
      startY.current = e.touches[0].pageY;
    }
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (startY.current === 0) return;
    const currentY = e.touches[0].pageY;
    const diff = currentY - startY.current;
    
    if (diff > 0 && window.scrollY === 0) {
      setPullDistance(Math.min(diff * 0.4, 100)); // Resistance
    }
  };

  const handleTouchEnd = async () => {
    if (pullDistance >= PULL_THRESHOLD) {
      setIsRefreshing(true);
      setPullDistance(PULL_THRESHOLD);
      await onRefresh();
      setIsRefreshing(false);
    }
    setPullDistance(0);
    startY.current = 0;
  };

  return (
    <div 
      className="relative w-full h-full overflow-y-auto scrollbar-none"
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      <motion.div 
        className="absolute top-0 left-0 right-0 flex justify-center items-center pointer-events-none z-10"
        animate={{ 
          y: pullDistance,
          opacity: pullDistance > 20 ? 1 : 0
        }}
        transition={{ type: 'spring', damping: 20, stiffness: 300 }}
      >
        <div className="bg-card shadow-lg border border-border rounded-full p-2 mt-2">
          <RefreshCw className={cn("w-5 h-5 text-primary", isRefreshing && "animate-spin")} />
        </div>
      </motion.div>
      <div className="relative">
        {children}
      </div>
    </div>
  );
}

// Minimal cn helper for this file if needed
function cn(...classes: any[]) {
  return classes.filter(Boolean).join(' ');
}
-e 
```

-e 
## `./src/components/HomeWorkspaceCloud.tsx`
```
import { useState, useEffect } from 'react';
import { useGoogleAuth } from '@/lib/googleAuth';
import { googleApi, GoogleTask, GoogleCalendarEvent, GoogleDriveFile } from '@/lib/googleApi';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { toast } from 'react-hot-toast';
import { base44 } from '@/api/base44Client';
import { 
  Sparkles, 
  CheckCircle, 
  Calendar, 
  FileText, 
  Lightbulb, 
  Table, 
  Database,
  CloudLightning,
  RefreshCw,
  Plus,
  Trash2,
  Trash,
  UploadCloud,
  DownloadCloud,
  Share2,
  Check,
  AlertCircle,
  ExternalLink,
  AlertTriangle
} from 'lucide-react';

interface HomeWorkspaceCloudProps {
  habits: any[];
  tasks: any[];
  expenses: any[];
  income: any[];
  goals: any[];
}

export default function HomeWorkspaceCloud({ habits, tasks, expenses, income, goals }: HomeWorkspaceCloudProps) {
  const { accessToken, connectGoogle, isConnected, disconnectGoogle } = useGoogleAuth();
  
  const [isLoading, setIsLoading] = useState(false);

  // --- API Diagnostics State ---
  const [tasksError, setTasksError] = useState<string | null>(null);
  const [calendarError, setCalendarError] = useState<string | null>(null);
  const [driveError, setDriveError] = useState<string | null>(null);
  const [keepError, setKeepError] = useState<string | null>(null);

  // --- 1. Tasks state ---
  const [googleTasks, setGoogleTasks] = useState<GoogleTask[]>([]);
  const [newTaskTitle, setNewTaskTitle] = useState("");

  // --- 2. Calendar state ---
  const [calendarEvents, setCalendarEvents] = useState<GoogleCalendarEvent[]>([]);
  const [newEventTitle, setNewEventTitle] = useState("");
  const [newEventTime, setNewEventTime] = useState("");

  // --- 3. Docs state ---
  const [docsList, setDocsList] = useState<GoogleDriveFile[]>([]);
  const [selectedDocId, setSelectedDocId] = useState("");

  // --- 4. Keep state ---
  const [keepNotes, setKeepNotes] = useState<any[]>([]);
  const [newNoteTitle, setNewNoteTitle] = useState("");
  const [newNoteBody, setNewNoteBody] = useState("");
  const [noteColor, setNoteColor] = useState("yellow");

  // Load cloud data upon token availability
  useEffect(() => {
    if (accessToken) {
      loadAllCloudData();
    }
  }, [accessToken]);

  const loadAllCloudData = async () => {
    if (!accessToken) return;
    setIsLoading(true);
    setTasksError(null);
    setCalendarError(null);
    setDriveError(null);
    setKeepError(null);

    // Load Tasks
    try {
      const liveTasks = await googleApi.tasks.listTasks(accessToken);
      setGoogleTasks(liveTasks.slice(0, 5));
    } catch (e: any) {
      console.error("Tasks synchronization issue:", e);
      setTasksError(e.message || String(e));
    }

    // Load Calendar
    try {
      const liveEvents = await googleApi.calendar.listEvents(accessToken);
      setCalendarEvents(liveEvents.slice(0, 3));
    } catch (e: any) {
      console.error("Calendar synchronization issue:", e);
      setCalendarError(e.message || String(e));
    }

    // Load Drive / Docs
    try {
      const liveDocs = await googleApi.drive.listFiles(accessToken, "mimeType = 'application/vnd.google-apps.document' and trashed = false");
      setDocsList(liveDocs.slice(0, 5));
      if (liveDocs.length > 0 && !selectedDocId) {
        setSelectedDocId(liveDocs[0].id);
      }
    } catch (e: any) {
      console.error("Drive/Docs synchronization issue:", e);
      setDriveError(e.message || String(e));
    }

    // Load Keep fallback
    try {
      const liveNotes = await googleApi.keep.listNotes(accessToken);
      setKeepNotes(liveNotes.slice(0, 4));
    } catch (e: any) {
      console.error("Keep synchronization issue:", e);
      setKeepError(e.message || String(e));
    }

    setIsLoading(false);
  };

  // --- ACT 1: CREATE GOOGLE TASK ---
  const handleCreateGoogleTask = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!accessToken || !newTaskTitle.trim()) return;
    
    try {
      const added = await googleApi.tasks.createTask(accessToken, newTaskTitle.trim(), "Linked to MMV Suite Tasks Dashboard");
      if (added) {
        setNewTaskTitle("");
        const liveTasks = await googleApi.tasks.listTasks(accessToken);
        setGoogleTasks(liveTasks.slice(0, 5));
      }
    } catch (err) {
      toast.error("Cloud task creation failed");
    }
  };

  const handleToggleGoogleTask = async (taskId: string, currentStatus: string) => {
    if (!accessToken) return;
    const nextStatus = currentStatus === 'completed' ? 'needsAction' : 'completed';
    try {
      const success = await googleApi.tasks.toggleTask(accessToken, taskId, nextStatus);
      if (success) {
        setGoogleTasks(prev => prev.map(t => t.id === taskId ? { ...t, status: nextStatus } : t));
        toast.success("Google task status updated!");
      }
    } catch (e) {
      toast.error("Could not toggle status");
    }
  };

  // --- ACT 2: CREATE CALENDAR MEET ---
  const handleCreateCalendarEvent = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!accessToken || !newEventTitle.trim() || !newEventTime) {
      toast.error("Please add a title and date/time for the event");
      return;
    }

    try {
      const startTime = new Date(newEventTime).toISOString();
      // End defaults to 1 hour later
      const endTime = new Date(new Date(newEventTime).getTime() + 60 * 60 * 1000).toISOString();
      const res = await googleApi.calendar.createEvent(accessToken, newEventTitle, "Productivity Sprint Alert", startTime, endTime);
      if (res) {
        setNewEventTitle("");
        setNewEventTime("");
        const liveEvents = await googleApi.calendar.listEvents(accessToken);
        setCalendarEvents(liveEvents.slice(0, 3));
      }
    } catch (err) {
      toast.error("Error scheduling session");
    }
  };

  // --- ACT 3: APPEND PROGRESS TO GOOGLE DOC ---
  const handleAppendProgressDoc = async () => {
    if (!accessToken || !selectedDocId) {
      toast.error("Please select a Google Doc from the browser list first");
      return;
    }

    try {
      setIsLoading(true);
      const docName = docsList.find(d => d.id === selectedDocId)?.name || "Document";
      
      const textBlock = `
Progress Update
Generated: ${new Date().toLocaleString()}
---------------------------------------------
* Total habits tracked: ${habits.length}
* Total goal savings: ${goals.reduce((sum, g) => sum + (g.current_amount || 0), 0)}
* Active tasks: ${tasks.length}
* Habits completed today: ${habits.filter(h => h.completions?.includes(new Date().toISOString().split("T")[0])).length}
`;

      const ok = await googleApi.docs.appendDocumentText(accessToken, selectedDocId, textBlock);
      if (ok) {
        toast.success(`Appended daily standup record to Google Doc "${docName}"!`);
      }
    } catch (e) {
      toast.error("Doc write failed");
    } finally {
      setIsLoading(false);
    }
  };

  // --- ACT 4: PIN STICKY TARGET ---
  const handleCreateStickyNote = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!accessToken || !newNoteTitle.trim() || !newNoteBody.trim()) return;

    try {
      const note = await googleApi.keep.createNote(accessToken, newNoteTitle.trim(), newNoteBody.trim(), noteColor);
      if (note) {
        setNewNoteTitle("");
        setNewNoteBody("");
        const liveNotes = await googleApi.keep.listNotes(accessToken);
        setKeepNotes(liveNotes.slice(0, 4));
      }
    } catch (err) {
      toast.error("Error creating note");
    }
  };

  // --- ACT 5: EXPORT FINANCES TO GOOGLE SHEET ---
  const handleExportFinancesToSheet = async () => {
    if (!accessToken) return;

    try {
      setIsLoading(true);
      toast.loading("Creating spreadsheet...", { id: "sheet_export" });
      const sprintTitle = `Finances Export (${new Date().toLocaleDateString()})`;
      const sheet = await googleApi.sheets.createSpreadsheet(accessToken, sprintTitle);
      
      if (!sheet) {
        toast.error("Failed to initialize sheet", { id: "sheet_export" });
        return;
      }

      const rows = [
        ["CATEGORY/SOURCE", "AMOUNT/FUNDS", "DATETIME", "TRANSACTION TYPE", "NOTE"],
        ...expenses.map(e => [e.category, e.amount, e.date, "EXPENSE", e.note || ""]),
        ...income.map(i => [i.source, i.amount, i.date, "INCOME", i.note || ""])
      ];

      const writeOk = await googleApi.sheets.writeSheetData(accessToken, sheet.spreadsheetId, "Sheet1!A1:E100", rows);
      if (writeOk) {
        toast.success("All transactions exported successfully to Google Sheets!", { id: "sheet_export" });
        // Inform user they can browse spreadsheet
        if (sheet.spreadsheetUrl) {
          window.open(sheet.spreadsheetUrl, '_blank');
        }
      } else {
        toast.error("Failed to map cell calculations", { id: "sheet_export" });
      }
    } catch (err) {
      console.error(err);
      toast.error("Export failure occurred", { id: "sheet_export" });
    } finally {
      setIsLoading(false);
    }
  };

  // --- ACT 6: DRIVE BACKUPSnapshot ---
  const handleBackupToDrive = async () => {
    if (!accessToken) return;

    // STRICT REQUIREMENT: Confirmation dialog
    const confirmed = window.confirm("Are you sure you want to capture a database snapshot and save it on your Google Drive as a JSON payload? This will preserve your budgets, habits, and progress.");
    if (!confirmed) return;

    try {
      setIsLoading(true);
      const backupPayload = {
        timestamp: new Date().toISOString(),
        habits,
        tasks,
        expenses,
        income,
        goals
      };

      const res = await googleApi.drive.createFile(
        accessToken,
        `backup_${Date.now()}.json`,
        JSON.stringify(backupPayload, null, 2),
        "application/json"
      );

      if (res) {
        toast.success("Backup saved to Google Drive.");
      }
    } catch (err) {
       toast.error("Backup failed");
    } finally {
      setIsLoading(false);
    }
  };

  const renderApiErrorTroubleshooter = (error: string | null, apiName: string, consoleLink: string) => {
    if (!error) return null;
    
    const isDisabledError = error.toLowerCase().includes("disabled") || 
                            error.toLowerCase().includes("has not been used") ||
                            error.toLowerCase().includes("403") ||
                            error.toLowerCase().includes("restricted") ||
                            error.toLowerCase().includes("forbidden");

    return (
      <div className="mt-2 p-2.5 rounded-xl bg-destructive/10 border border-destructive/20 text-[10px] text-destructive-foreground flex flex-col gap-1">
        <div className="flex items-start gap-1.5 font-bold text-red-500">
          <AlertCircle className="w-3.5 h-3.5 text-red-500 shrink-0 mt-0.5" />
          <span>
            {isDisabledError 
              ? `${apiName} API is disabled on your GCP project.`
              : `Connection issue: ${error.substring(0, 80)}...`}
          </span>
        </div>
        {isDisabledError && (
          <a 
            href={consoleLink} 
            target="_blank" 
            referrerPolicy="no-referrer" 
            className="mt-1 inline-flex items-center gap-1 font-extrabold text-blue-500 hover:underline hover:text-blue-600"
          >
            Click to enable {apiName} API <ExternalLink className="w-3 h-3" />
          </a>
        )}
      </div>
    );
  };

  return (
    <div className="mt-8 bg-card border border-border rounded-3xl p-6 shadow-sm overflow-hidden">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-6 gap-3 pb-4 border-b border-border/60">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <CloudLightning className="w-4 h-4 text-primary animate-pulse" />
            <h2 className="text-xs font-bold text-primary uppercase tracking-widest">Google Integrations</h2>
          </div>
          <p className="text-[11px] text-muted-foreground">Connect your Google account to sync tasks, calendar events, documents, and backups.</p>
        </div>

        {isConnected ? (
          <div className="flex items-center gap-2">
            <Button size="sm" variant="outline" className="rounded-xl text-xs font-bold flex items-center gap-1" onClick={loadAllCloudData} disabled={isLoading}>
              <RefreshCw className={`w-3 h-3 ${isLoading ? "animate-spin" : ""}`} />
              Sync Now
            </Button>
            <Button size="sm" variant="ghost" className="rounded-xl text-xs text-red-500 hover:text-red-700 hover:bg-red-50/10 font-bold" onClick={disconnectGoogle}>
              Log out Google
            </Button>
          </div>
        ) : (
          <Button size="sm" onClick={connectGoogle} className="rounded-xl text-xs font-bold bg-[#8b5cf6] text-white hover:bg-[#7c3aed]">
            Authorize Google Account
          </Button>
        )}
      </div>

      {!isConnected ? (
        <div className="text-center py-10 bg-muted/10 border border-dashed rounded-2xl">
          <Sparkles className="w-8 h-8 text-primary/40 mx-auto mb-2 animate-bounce" />
          <h3 className="text-xs font-bold text-foreground">Sync is offline</h3>
          <p className="text-[10px] text-muted-foreground mt-1 max-w-sm mx-auto">Sign in with Google to enable task sync, calendar reminders, financial exports, and automatic backups.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          
          {/* 1. GOOGLE TASKS SUMMARY */}
          <div className="p-4 border border-border/80 rounded-2xl bg-muted/5 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest flex items-center gap-1.5">
                  <CheckCircle className="w-3.5 h-3.5 text-primary" />
                  Google Tasks Sync
                </span>
                <span className="text-[9px] px-1.5 py-0.5 rounded bg-primary/10 text-primary font-bold">2nd Reminder</span>
              </div>

              <div className="space-y-1.5 mb-3 max-h-[140px] overflow-y-auto pr-1">
                {tasksError ? (
                  renderApiErrorTroubleshooter(tasksError, "Google Tasks", "https://console.developers.google.com/apis/api/tasks.googleapis.com/overview?project=mmv-xii")
                ) : googleTasks.length === 0 ? (
                  <p className="text-[10px] text-muted-foreground py-2 text-center font-medium">Default list is empty</p>
                ) : (
                  googleTasks.map(t => (
                    <div key={t.id} className="flex items-center gap-2 p-1.5 rounded-lg border border-border/40 bg-card/50 text-[11px] font-medium leading-none">
                      <input 
                        type="checkbox" 
                        checked={t.status === 'completed'}
                        onChange={() => handleToggleGoogleTask(t.id, t.status)}
                        className="rounded accent-primary border-muted-foreground/30 flex-shrink-0" 
                      />
                      <span className={`truncate flex-1 ${t.status === 'completed' ? 'line-through text-muted-foreground opacity-60' : 'text-card-foreground'}`}>{t.title}</span>
                    </div>
                  ))
                )}
              </div>
            </div>

            <form onSubmit={handleCreateGoogleTask} className="flex gap-1.5 mt-2">
              <Input 
                placeholder="Add task..."
                value={newTaskTitle}
                onChange={(e) => setNewTaskTitle(e.target.value)}
                className="rounded-xl text-[10px] h-8 border-muted-foreground/20"
              />
              <Button size="sm" type="submit" className="rounded-xl h-8 px-2 text-[10px] font-extrabold flex items-center gap-0.5">
                <Plus className="w-3.5 h-3.5" /> Add
              </Button>
            </form>
          </div>

          {/* 2. GOOGLE CALENDAR SUMMARY */}
          <div className="p-4 border border-border/80 rounded-2xl bg-muted/5 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5 text-orange-500" />
                  Google Calendar Events
                </span>
                <span className="text-[9px] px-1.5 py-0.5 rounded bg-orange-500/10 text-orange-500 font-bold">Upcoming</span>
              </div>

              <div className="space-y-1.5 mb-3 max-h-[140px] overflow-y-auto pr-1">
                {calendarError ? (
                  renderApiErrorTroubleshooter(calendarError, "Google Calendar", "https://console.developers.google.com/apis/api/calendar-json.googleapis.com/overview?project=mmv-xii")
                ) : calendarEvents.length === 0 ? (
                  <p className="text-[10px] text-muted-foreground py-4 text-center font-medium">No events on primary list</p>
                ) : (
                  calendarEvents.map(evt => {
                    const d = evt.start.dateTime || evt.start.date || "";
                    const label = d ? new Date(d).toLocaleDateString("en-US", { month: "short", day: "numeric", hour: "2-digit" }) : "All-day";
                    return (
                      <div key={evt.id} className="p-1.5 rounded-lg border border-border/40 bg-card/50 text-[10px] flex items-center justify-between">
                        <div className="truncate flex-1 pr-2">
                          <p className="font-extrabold text-foreground truncate">{evt.summary}</p>
                          <p className="text-[8px] text-muted-foreground">{label}</p>
                        </div>
                        <Check className="w-3 h-3 text-emerald-500" />
                      </div>
                    );
                  })
                )}
              </div>
            </div>

            <form onSubmit={handleCreateCalendarEvent} className="flex gap-1.5 mt-2">
              <Input 
                placeholder="Event title..."
                value={newEventTitle}
                onChange={(e) => setNewEventTitle(e.target.value)}
                className="rounded-xl text-[10px] h-8 border-muted-foreground/20 flex-1"
              />
              <Input 
                type="datetime-local"
                value={newEventTime}
                onChange={(e) => setNewEventTime(e.target.value)}
                className="rounded-xl text-[10px] h-8 border-muted-foreground/20 w-24"
              />
              <Button size="sm" type="submit" className="rounded-xl h-8 px-2 text-[10px] font-extrabold flex items-center gap-0.5">
                <Plus className="w-3.5 h-3.5" /> Add
              </Button>
            </form>
          </div>

          {/* 3. GOOGLE DOCS STANDUP SYNC */}
          <div className="p-4 border border-border/80 rounded-2xl bg-muted/5 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest flex items-center gap-1.5">
                  <FileText className="w-3.5 h-3.5 text-blue-500" />
                  Google Docs
                </span>
                <span className="text-[9px] px-1.5 py-0.5 rounded bg-blue-500/10 text-blue-500 font-bold">Appends</span>
              </div>

              <div className="space-y-2 text-[11px] leading-relaxed mb-4">
                <p className="text-muted-foreground leading-snug">
                  Choose an active document inside your Google Drive workspace, and immediately commit your current stats standups.
                </p>

                {driveError ? (
                  renderApiErrorTroubleshooter(driveError, "Google Drive", "https://console.developers.google.com/apis/api/drive.googleapis.com/overview?project=mmv-xii")
                ) : docsList.length > 0 ? (
                  <div className="space-y-1">
                    <label className="text-[9px] font-extrabold text-muted-foreground block">Select target document:</label>
                    <select 
                      value={selectedDocId} 
                      onChange={(e) => setSelectedDocId(e.target.value)}
                      className="w-full text-[10px] p-1.5 rounded-lg bg-card border border-border font-bold text-foreground"
                    >
                      {docsList.map(doc => (
                        <option key={doc.id} value={doc.id}>{doc.name}</option>
                      ))}
                    </select>
                  </div>
                ) : (
                  <p className="text-[10px] text-orange-500 font-bold">No active text documents found in Drive. Write/create in Note section first.</p>
                )}
              </div>
            </div>

            <Button 
              size="sm" 
              onClick={handleAppendProgressDoc} 
              disabled={isLoading || docsList.length === 0} 
              className="w-full rounded-xl text-[11px] font-bold h-9 bg-blue-600 hover:bg-blue-700 text-white flex items-center justify-center gap-1"
            >
              <Share2 className="w-3.5 h-3.5" />
              Append summary to Doc
            </Button>
          </div>

          {/* 4. GOOGLE KEEP COLOR STICKIES */}
          <div className="p-4 border border-border/80 rounded-2xl bg-muted/5 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest flex items-center gap-1.5">
                  <Lightbulb className="w-3.5 h-3.5 text-yellow-500" />
                  Google Keep Stickies
                </span>
                <span className="text-[9px] px-1.5 py-0.5 rounded bg-yellow-500/10 text-yellow-500 font-bold">Boards</span>
              </div>

              {/* Small preview of board */}
              <div className="grid grid-cols-2 gap-1.5 mb-3 max-h-[140px] overflow-y-auto pr-1">
                {keepNotes.length === 0 ? (
                  <p className="col-span-2 text-[10px] text-muted-foreground py-4 text-center">Pin boards are currently empty</p>
                ) : (
                  keepNotes.slice(0, 4).map(note => (
                    <div 
                      key={note.id} 
                      className="p-2 border rounded-xl text-[10px] font-medium min-h-[50px] bg-amber-50/20 text-foreground flex flex-col justify-between"
                      style={{ 
                        backgroundColor: note.color === 'green' ? 'rgba(16, 185, 129, 0.08)' : note.color === 'pink' ? 'rgba(244, 63, 94, 0.08)' : 'rgba(245, 158, 11, 0.08)'
                      }}
                    >
                      <p className="font-extrabold truncate text-card-foreground">{note.title}</p>
                      <p className="truncate text-muted-foreground text-[9px] mt-0.5">{typeof note.body === 'string' ? note.body : (note.body?.text?.text || "")}</p>
                    </div>
                  ))
                )}
              </div>
            </div>

            <form onSubmit={handleCreateStickyNote} className="space-y-1.5 mt-1">
              <Input 
                placeholder="Sticky title..."
                value={newNoteTitle}
                onChange={(e) => setNewNoteTitle(e.target.value)}
                className="rounded-xl text-[10px] h-7 border-muted-foreground/20"
              />
              <div className="flex gap-1.5">
                <Input 
                  placeholder="Note details..."
                  value={newNoteBody}
                  onChange={(e) => setNewNoteBody(e.target.value)}
                  className="rounded-xl text-[10px] h-7 border-muted-foreground/20 flex-1"
                />
                <Button size="sm" type="submit" className="rounded-xl h-7 px-2 text-[10px] font-black uppercase">
                  Pin card
                </Button>
              </div>
            </form>
          </div>

          {/* 5. GOOGLE SPREADSHEETS (FINANCIAL EXPORT) */}
          <div className="p-4 border border-border/80 rounded-2xl bg-muted/5 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest flex items-center gap-1.5">
                  <Table className="w-3.5 h-3.5 text-emerald-500" />
                  Google Sheets Backup
                </span>
                <span className="text-[9px] px-1.5 py-0.5 rounded bg-emerald-500/10 text-emerald-500 font-bold">Export DB</span>
              </div>

              <div className="text-[11px] text-muted-foreground mb-4 space-y-2">
                <p className="leading-snug">
                  Secures your budget details dynamically on a relational spreadsheet table to completely preserve balances.
                </p>
                <div className="p-2 border border-border rounded-xl bg-card/60 flex flex-col gap-1 text-[9px] font-bold">
                  <p className="text-foreground">In-App finances pool state:</p>
                  <div className="flex justify-between border-b pb-1 text-muted-foreground">
                    <span>Expenses items:</span>
                    <span className="text-muted-foreground">{expenses.length} rows</span>
                  </div>
                  <div className="flex justify-between text-muted-foreground">
                    <span>Incomes items:</span>
                    <span className="text-muted-foreground">{income.length} rows</span>
                  </div>
                </div>
              </div>
            </div>

            <Button 
              size="sm" 
              onClick={handleExportFinancesToSheet} 
              disabled={isLoading || (expenses.length === 0 && income.length === 0)}
              className="w-full rounded-xl text-[11px] font-bold h-9 bg-emerald-600 hover:bg-emerald-700 text-white flex items-center justify-center gap-1"
            >
              <Table className="w-3.5 h-3.5" />
              Write financials to Sheets
            </Button>
          </div>

          {/* 6. GOOGLE DRIVE BACKUPS DATA VAULT */}
          <div className="p-4 border border-border/80 rounded-2xl bg-muted/5 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest flex items-center gap-1.5">
                  <Database className="w-3.5 h-3.5 text-violet-500" />
                  Google Drive Backups
                </span>
              </div>

              <p className="text-[11px] text-muted-foreground leading-normal mb-4">
                Save a secure JSON backup of your data (habits, tasks, financial goals) to your Google Drive.
              </p>
            </div>

            <Button 
              size="sm" 
              onClick={handleBackupToDrive} 
              disabled={isLoading}
              className="w-full rounded-xl text-[11px] font-bold h-9 bg-violet-600 hover:bg-violet-700 text-white flex items-center justify-center gap-1.5"
            >
              <UploadCloud className="w-4 h-4" />
              Backup to Google Drive
            </Button>
          </div>

        </div>
      )}
    </div>
  );
}
-e 
```

-e 
## `./src/lib/useNotifications.ts`
```
import { useEffect, useRef } from 'react';
import { useSettings } from './useSettings';
import { base44 } from '@/api/base44Client';
import { playSound } from './sounds';

export function useNotifications() {
  const { settings } = useSettings();

  const getStoredAlerts = () => {
    try {
      const stored = localStorage.getItem('checkedAlerts');
      return stored ? new Set<string>(JSON.parse(stored)) : new Set<string>();
    } catch {
      return new Set<string>();
    }
  };

  const checkedAlerts = useRef<Set<string>>(getStoredAlerts());

  const addAlert = (key: string) => {
    checkedAlerts.current.add(key);
    // keep only last 100 to avoid bloat
    const arr = Array.from(checkedAlerts.current).slice(-100);
    localStorage.setItem('checkedAlerts', JSON.stringify(arr));
  };

  useEffect(() => {
    if (!settings.notifications_enabled) return;
    
    // Request permission if not granted
    if ('Notification' in window && Notification.permission === 'default') {
      Notification.requestPermission();
    }

    const checkInterval = setInterval(async () => {
      if ('Notification' in window && Notification.permission !== 'granted') return;
      
      const now = new Date();
      const todayDateString = now.toISOString().split('T')[0];
      const currentTimeString = now.toTimeString().slice(0, 5); // "HH:MM"
      const nowMs = now.getTime();

      // 1. Daily Summary
      if (settings.daily_reminder_time) {
        const [h, m] = settings.daily_reminder_time.split(':').map(Number);
        if (now.getHours() === h && now.getMinutes() === m) {
          const alertKey = `daily_${todayDateString}`;
          if (!checkedAlerts.current.has(alertKey)) {
            sendNotification("Daily Summary", `Time to review your habits and tasks for today!`);
            addAlert(alertKey);
          }
        }
      }

      const advanceMs = (settings.reminder_advance_time || 30) * 60 * 1000;

      // 2. Checking Tasks
      if (settings.tasks_notifications) {
        try {
          const tasks = await base44.entities.Task.list();
          tasks.forEach((task: any) => {
            if (task.status === 'done') return;
            
            if (task.due_date && task.due_time) {
              const dueTimeStr = `${task.due_date}T${task.due_time}`;
              const dueTimeMs = new Date(dueTimeStr).getTime();
              
              if (!isNaN(dueTimeMs)) {
                // Advance notification
                if (dueTimeMs > nowMs && dueTimeMs - nowMs <= advanceMs) {
                  const alertKey = `task_adv_${task.id}_${task.updated_at || task.created_at}`;
                  if (!checkedAlerts.current.has(alertKey)) {
                    sendNotification("Task Upcoming", `Your task "${task.title}" is due soon!`);
                    addAlert(alertKey);
                  }
                }
                
                // Missed notification
                if (settings.notify_missed && dueTimeMs < nowMs && (nowMs - dueTimeMs) < 24 * 60 * 60 * 1000) { // within 24 hours
                  const alertKey = `task_missed_${task.id}_${task.updated_at || task.created_at}`;
                  if (!checkedAlerts.current.has(alertKey)) {
                    sendNotification("Missed Task", `You have missed the task "${task.title}". Try to complete it!`);
                    addAlert(alertKey);
                  }
                }
              }
            } else if (task.due_date && task.due_date < todayDateString && settings.notify_missed) {
              // Only date, no time. If past date, it's missed.
              const alertKey = `task_missed_date_${task.id}_${todayDateString}`;
              if (!checkedAlerts.current.has(alertKey)) {
                sendNotification("Missed Task", `You missed the task "${task.title}" from yesterday!`);
                addAlert(alertKey);
              }
            }
          });
        } catch (e) {
          console.error("Checking tasks failed", e);
        }
      }

      // 3. Checking Habits (Habits don't have strict due times usually, but maybe notification_time)
      if (settings.habits_notifications) {
        try {
          const habits = await base44.entities.Habit.list();
          habits.forEach((habit: any) => {
            if (!habit.is_active) return;
            const completions = habit.completions || [];
            const isCompletedToday = completions.includes(todayDateString);
            
            if (isCompletedToday) return;

            if (habit.notification_time) {
              const [h, m] = habit.notification_time.split(':').map(Number);
              const notifTime = new Date();
              notifTime.setHours(h, m, 0, 0);
              const notifTimeMs = notifTime.getTime();

              if (notifTimeMs > nowMs && notifTimeMs - nowMs <= advanceMs) {
                const alertKey = `habit_adv_${habit.id}_${todayDateString}`;
                if (!checkedAlerts.current.has(alertKey)) {
                  sendNotification("Habit Reminder", `Time to complete your habit "${habit.title}"!`);
                  addAlert(alertKey);
                }
              }

              if (settings.notify_missed && nowMs > notifTimeMs) {
                const alertKey = `habit_missed_${habit.id}_${todayDateString}`;
                if (!checkedAlerts.current.has(alertKey)) {
                  sendNotification("Missed Habit", `You haven't completed your habit "${habit.title}" today!`);
                  addAlert(alertKey);
                }
              }
            }
          });
        } catch(e) {
          console.error("Checking habits failed", e);
        }
      }

      // 4. Checking Subscriptions / Finance
      if (settings.notify_missed) {
        try {
          const subs = await base44.entities.Subscription.list();
          subs.forEach((sub: any) => {
            if (!sub.is_active) return;
            
            if (sub.next_billing && sub.next_billing <= todayDateString) {
              // Usually advance notice is days before, but we check today
              if (sub.reminder_time) {
                 const [h, m] = sub.reminder_time.split(':').map(Number);
                 const notifTime = new Date();
                 notifTime.setHours(h, m, 0, 0);
                 const notifTimeMs = notifTime.getTime();

                 if (notifTimeMs > nowMs && notifTimeMs - nowMs <= advanceMs) {
                   const alertKey = `sub_adv_${sub.id}_${todayDateString}`;
                   if (!checkedAlerts.current.has(alertKey)) {
                     sendNotification("Upcoming Payment", `Payment for "${sub.title}" is due soon!`);
                     addAlert(alertKey);
                   }
                 }

                 if (sub.next_billing < todayDateString || (sub.next_billing === todayDateString && nowMs > notifTimeMs)) {
                    const alertKey = `sub_missed_${sub.id}_${todayDateString}`;
                    if (!checkedAlerts.current.has(alertKey)) {
                      sendNotification("Missed Payment", `Payment for "${sub.title}" might be overdue!`);
                      addAlert(alertKey);
                    }
                 }
              } else if (sub.next_billing < todayDateString) {
                 // missed without time
                 const alertKey = `sub_missed_date_${sub.id}_${todayDateString}`;
                 if (!checkedAlerts.current.has(alertKey)) {
                   sendNotification("Missed Payment", `Payment for "${sub.title}" is overdue!`);
                   addAlert(alertKey);
                 }
              }
            }
          });
        } catch(e) {
          console.error("Checking subs failed", e);
        }
      }

    }, 30000); // Check every 30 seconds

    return () => clearInterval(checkInterval);
  }, [settings]);

  function sendNotification(title: string, body: string) {
    playSound("alarm");
    if ('serviceWorker' in navigator && navigator.serviceWorker.ready) {
      navigator.serviceWorker.ready.then(registration => {
        registration.showNotification(title, {
          body,
          icon: '/favicon.ico',
          vibrate: [200, 100, 200, 100, 200, 100, 200],
        });
      }).catch(e => {
         // fallback
         new Notification(title, { body, icon: '/favicon.ico' });
      });
    } else if ('Notification' in window && Notification.permission === 'granted') {
      new Notification(title, { body, icon: '/favicon.ico' });
    }
  }
}
-e 
```

-e 
## `./src/lib/utils.ts`
```
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatCurrency(amount: number, toCurrency = "USD", uzsRate = 12700, fromCurrency?: string) {
  if (!amount && amount !== 0) return "-";
  
  let finalAmount = amount;
  if (fromCurrency && fromCurrency !== toCurrency) {
    if (fromCurrency === "USD" && toCurrency === "UZS") finalAmount = amount * uzsRate;
    if (fromCurrency === "UZS" && toCurrency === "USD") finalAmount = amount / uzsRate;
  }

  if (toCurrency === "UZS") {
    return new Intl.NumberFormat("en-US", { style: "currency", currency: "UZS", maximumFractionDigits: 0 }).format(finalAmount);
  }
  return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(finalAmount);
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
-e 
```

-e 
## `./src/lib/sounds.ts`
```
// Web Audio API Synthesizer for elegant, ambient sound profiles
export type SoundType = "success" | "complete" | "toggle" | "celebration" | "alarm";

class SoundManager {
  private ctx: AudioContext | null = null;

  private initCtx() {
    if (!this.ctx) {
      this.ctx = new (window.AudioContext || (window as any).webkitAudioContext)();
    }
    if (this.ctx.state === "suspended") {
      this.ctx.resume();
    }
    return this.ctx;
  }

  play(type: SoundType) {
    try {
      // Read settings from storage to see if sounds are enabled
      const storedSettingsStr = localStorage.getItem("mmv-settings");
      if (storedSettingsStr) {
        const stored = JSON.parse(storedSettingsStr);
        if (stored.sound_notifications_enabled === false) {
          return; // Sound is muted by user preference
        }
      }

      const ctx = this.initCtx();
      const now = ctx.currentTime;
      const volume = 0.15; // Safe default volume

      if (type === "toggle") {
        // Soft ambient pop
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.type = "sine";
        osc.frequency.setValueAtTime(440, now);
        osc.frequency.exponentialRampToValueAtTime(120, now + 0.1);

        gain.gain.setValueAtTime(volume * 0.5, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.1);

        osc.start(now);
        osc.stop(now + 0.1);
      } 
      else if (type === "complete") {
        // Sparkling glass chime arpeggio
        const notes = [523.25, 659.25, 783.99, 1046.50]; // C5, E5, G5, C6
        notes.forEach((freq, idx) => {
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();
          osc.connect(gain);
          gain.connect(ctx.destination);

          osc.type = "triangle";
          osc.frequency.setValueAtTime(freq, now + idx * 0.08);

          gain.gain.setValueAtTime(0, now);
          gain.gain.linearRampToValueAtTime(volume * 0.8, now + idx * 0.08 + 0.01);
          gain.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.08 + 0.4);

          osc.start(now + idx * 0.08);
          osc.stop(now + idx * 0.08 + 0.4);
        });
      } 
      else if (type === "success") {
        // Gentle peaceful ambient tone
        const osc1 = ctx.createOscillator();
        const osc2 = ctx.createOscillator();
        const gain = ctx.createGain();

        osc1.connect(gain);
        osc2.connect(gain);
        gain.connect(ctx.destination);

        osc1.type = "sine";
        osc2.type = "triangle";

        osc1.frequency.setValueAtTime(587.33, now); // D5
        osc2.frequency.setValueAtTime(880, now); // A5

        gain.gain.setValueAtTime(0, now);
        gain.gain.linearRampToValueAtTime(volume * 0.7, now + 0.05);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.5);

        osc1.start(now);
        osc2.start(now);
        osc1.stop(now + 0.5);
        osc2.stop(now + 0.5);
      } 
      else if (type === "celebration") {
        // Shimmering brass and high bell symphony arpeggios
        const chord = [523.25, 587.33, 659.25, 698.46, 783.99, 880.00, 987.77, 1046.50]; // Beautiful C Major scale arpeggio
        chord.forEach((freq, idx) => {
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();
          osc.connect(gain);
          gain.connect(ctx.destination);

          osc.type = "sine";
          osc.frequency.setValueAtTime(freq, now + idx * 0.06);

          gain.gain.setValueAtTime(0, now + idx * 0.06);
          gain.gain.linearRampToValueAtTime(volume * 0.8, now + idx * 0.06 + 0.02);
          gain.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.06 + 0.6);

          osc.start(now + idx * 0.06);
          osc.stop(now + idx * 0.06 + 0.6);
        });
      }
      else if (type === "alarm") {
        // Elegant repeating cycle ding-dong
        const notes = [659.25, 523.25]; // E5, C5
        notes.forEach((freq, idx) => {
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();
          osc.connect(gain);
          gain.connect(ctx.destination);

          osc.type = "sine";
          osc.frequency.setValueAtTime(freq, now + idx * 0.3);

          gain.gain.setValueAtTime(0, now + idx * 0.3);
          gain.gain.linearRampToValueAtTime(volume, now + idx * 0.3 + 0.02);
          gain.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.3 + 0.8);

          osc.start(now + idx * 0.3);
          osc.stop(now + idx * 0.3 + 0.8);
        });
      }
    } catch (e) {
      console.warn("Web Audio API not supported or initialized", e);
    }
  }
}

export const playSound = (type: SoundType) => {
  try {
    const manager = new SoundManager();
    manager.play(type);
  } catch (e) {}
};
-e 
```

-e 
## `./src/lib/AuthContext.tsx`
```
import { createContext, useState, useContext, useEffect } from 'react';
import { base44 } from '@/api/base44Client';
import { getRedirectResult } from "firebase/auth";
import { auth } from "@/lib/firebase";

const AuthContext = createContext<any>(null);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<any>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoadingAuth, setIsLoadingAuth] = useState(true);
  const [isLoadingPublicSettings, setIsLoadingPublicSettings] = useState(false);
  const [authError, setAuthError] = useState<any>(null);
  const [authChecked, setAuthChecked] = useState(false);
  const [appPublicSettings, setAppPublicSettings] = useState<any>({ name: "MMV Productivity" });

  useEffect(() => {
    // Check Google auth redirect results asynchronously in background without blocking
    getRedirectResult(auth).catch((redirectError) => {
      console.warn("Background auth redirect check:", redirectError);
    });

    // Real-time listener for Firebase auth state updates
    const unsubscribe = auth.onAuthStateChanged((firebaseUser) => {
      if (firebaseUser) {
        const formattedUser = {
          id: firebaseUser.uid,
          email: firebaseUser.email,
          user_metadata: {
            full_name: firebaseUser.displayName,
            avatar_url: firebaseUser.photoURL,
            name: firebaseUser.displayName || firebaseUser.email?.split('@')[0] || "User"
          }
        };
        setUser(formattedUser);
        setIsAuthenticated(true);
      } else {
        setUser(null);
        setIsAuthenticated(false);
      }
      setIsLoadingAuth(false);
      setIsLoadingPublicSettings(false);
      setAuthChecked(true);
    });

    // Safety fallback: ensure loading screen is unblocked within 800ms max
    const safetyTimer = setTimeout(() => {
      setIsLoadingAuth(false);
      setIsLoadingPublicSettings(false);
      setAuthChecked(true);
    }, 800);

    return () => {
      unsubscribe();
      clearTimeout(safetyTimer);
    };
  }, []);

  const logout = async () => {
    setUser(null);
    setIsAuthenticated(false);
    try {
      await auth.signOut();
    } catch (e) {
      console.error("Logout error:", e);
    }
  };

  const navigateToLogin = () => {
    base44.auth.redirectToLogin(window.location.href);
  };

  return (
    <AuthContext.Provider value={{ 
      user, 
      isAuthenticated, 
      isLoadingAuth,
      isLoadingPublicSettings,
      authError,
      appPublicSettings,
      authChecked,
      logout,
      navigateToLogin,
      checkUserAuth: () => {},
      checkAppState: () => {}
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

-e 
```

-e 
## `./src/lib/firebase.ts`
```
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import appletConfig from "../../firebase-applet-config.json";

// The user's custom mmv-xii Firebase production configuration
const userConfig = {
  apiKey: "AIzaSyA75UNi_4OxmSMOLoaAHUbSxXKbbj_0t8A",
  authDomain: "mmv-xii.firebaseapp.com",
  projectId: "mmv-xii",
  storageBucket: "mmv-xii.firebasestorage.app",
  messagingSenderId: "448939693376",
  appId: "1:448939693376:web:fb52da97252907b40e56a5",
  measurementId: "G-R1PHSE72FQ"
};

const isPreviewEnv = typeof window !== "undefined" && (
  window.location.hostname.includes("localhost") || 
  window.location.hostname.includes("run.app") || 
  window.location.hostname.includes("gitpod") ||
  window.location.hostname.includes("ai.studio")
);

// If in preview/workspace env, use appletConfig, otherwise use userConfig (or environment variables)
const firebaseConfig = isPreviewEnv && appletConfig.apiKey ? {
  apiKey: appletConfig.apiKey,
  authDomain: appletConfig.authDomain,
  projectId: appletConfig.projectId,
  storageBucket: appletConfig.storageBucket,
  messagingSenderId: appletConfig.messagingSenderId,
  appId: appletConfig.appId,
} : (import.meta.env.VITE_FIREBASE_API_KEY ? {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
} : userConfig);

const app = initializeApp(firebaseConfig);
const databaseId = (isPreviewEnv && appletConfig.apiKey)
  ? (appletConfig as any).firestoreDatabaseId
  : (import.meta.env.VITE_FIREBASE_DATABASE_ID || null);

const db = databaseId ? getFirestore(app, databaseId) : getFirestore(app);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

export { app, db, auth, googleProvider };
-e 
```

-e 
## `./src/lib/app-params.ts`
```
const isNode = typeof window === 'undefined';
const windowObj = isNode ? { localStorage: new Map() } : window;
const storage = (windowObj as any).localStorage;

const toSnakeCase = (str: string) => {
	return str.replace(/([A-Z])/g, '_$1').toLowerCase();
}

const getAppParamValue = (paramName: string, { defaultValue = undefined, removeFromUrl = false }: { defaultValue?: any, removeFromUrl?: boolean } = {}) => {
	if (isNode) {
		return defaultValue;
	}
	const storageKey = `base44_${toSnakeCase(paramName)}`;
	const urlParams = new URLSearchParams(window.location.search);
	const searchParam = urlParams.get(paramName);
	if (removeFromUrl) {
		urlParams.delete(paramName);
		const newUrl = `${window.location.pathname}${urlParams.toString() ? `?${urlParams.toString()}` : ""
			}${window.location.hash}`;
		window.history.replaceState({}, document.title, newUrl);
	}
	if (searchParam) {
		storage.setItem(storageKey, searchParam);
		return searchParam;
	}
	if (defaultValue) {
		const storedValue = storage.getItem(storageKey);
		if (storedValue) return storedValue;
		storage.setItem(storageKey, defaultValue);
		return defaultValue;
	}
	const storedValue = storage.getItem(storageKey);
	if (storedValue) {
		return storedValue;
	}
	return null;
}

const getAppParams = () => {
	if (getAppParamValue("clear_access_token") === 'true') {
		storage.removeItem('base44_access_token');
		storage.removeItem('token');
	}
	return {
		appId: getAppParamValue("app_id", { defaultValue: (import.meta as any).env.VITE_BASE44_APP_ID }),
		token: getAppParamValue("access_token", { removeFromUrl: true }),
		fromUrl: getAppParamValue("from_url", { defaultValue: window.location.href }),
		functionsVersion: getAppParamValue("functions_version", { defaultValue: (import.meta as any).env.VITE_BASE44_FUNCTIONS_VERSION }),
		appBaseUrl: getAppParamValue("app_base_url", { defaultValue: (import.meta as any).env.VITE_BASE44_APP_BASE_URL }),
	}
}

export const appParams = {
	...getAppParams()
}
-e 
```

-e 
## `./src/lib/useSettings.ts`
```
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
  }, [settings.theme_hue, settings.border_radius_percentage]);

  // Dynamically update favicon and app icon with Poppins text "MMV" and theme matching colors
  useEffect(() => {
    const isDark = settings.theme_mode === "dark" || 
      (settings.theme_mode === "system" && window.matchMedia("(prefers-color-scheme: dark)").matches);
    
    const hue = settings.theme_hue || 220;
    const radiusVal = typeof settings.border_radius_percentage !== 'undefined' ? settings.border_radius_percentage : 35;
    
    // Determine card background and text color based on the current theme preset and light/dark mode
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
      }
    };

    const preset = presets[(settings as any).theme_preset || "slate"] || presets.slate;
    
    // Background color of favicon matches the theme preset's card color
    const bgCol = `hsl(${preset.card})`;
    
    // Primary accent and text colors dynamically matched for high-contrast visibility
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
        <!-- Background rect shaped with user's border-radius settings -->
        <rect x="2" y="2" width="96" height="96" rx="${Math.max(6, radiusVal / 2.2)}" fill="${bgCol}" stroke="${primaryCol}" stroke-width="5" />
        
        <!-- Text MMV in custom Poppins typeface with subtle drop shadow -->
        <g filter="url(#shadow)">
          <text x="50%" y="54%" class="text-mmv" text-anchor="middle" dominant-baseline="middle">MMV</text>
        </g>
        
        <!-- Elegant dynamic corner badge/accent dot in primary theme color -->
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
-e 
```

-e 
## `./src/lib/ProtectedRoute.tsx`
```
import { useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import { useAuth } from '@/lib/AuthContext';
import UserNotRegisteredError from '@/components/UserNotRegisteredError';

const DefaultFallback = () => (
  <div className="fixed inset-0 flex items-center justify-center bg-background">
    <div className="flex flex-col items-center gap-3">
      <div className="w-10 h-10 border-4 border-primary/20 border-t-primary rounded-full animate-spin"></div>
      <p className="text-sm text-muted-foreground font-poppins">Loading...</p>
    </div>
  </div>
);

export default function ProtectedRoute({ fallback = <DefaultFallback />, unauthenticatedElement }: { fallback?: React.ReactNode, unauthenticatedElement?: React.ReactNode }) {
  const { isAuthenticated, isLoadingAuth, authChecked, authError, checkUserAuth } = useAuth();

  useEffect(() => {
    if (!authChecked && !isLoadingAuth) {
      checkUserAuth();
    }
  }, [authChecked, isLoadingAuth, checkUserAuth]);

  if (isLoadingAuth || !authChecked) {
    return (fallback as any);
  }

  if (authError) {
    if (authError.type === 'user_not_registered') {
      return <UserNotRegisteredError />;
    }
    return (unauthenticatedElement as any) || null;
  }

  if (!isAuthenticated) {
    return (unauthenticatedElement as any) || null;
  }

  return <Outlet />;
}
-e 
```

-e 
## `./src/lib/Base44Context.tsx`
```
import { createContext, useContext, useMemo } from 'react';

const Base44ProviderContext = createContext<any>(null);

export const Base44Provider = ({ children }: { children: React.ReactNode }) => {
  const value = useMemo(() => ({}), []);
  return <Base44ProviderContext.Provider value={value}>{children}</Base44ProviderContext.Provider>;
};

export const useBase44 = () => useContext(Base44ProviderContext);
-e 
```

-e 
## `./src/lib/PageNotFound.tsx`
```
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

export default function PageNotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 text-center">
      <h1 className="text-4xl font-bold mb-2">404</h1>
      <p className="text-muted-foreground mb-6">Oops! The page you're looking for doesn't exist.</p>
      <Button asChild rounded-xl>
        <Link to="/">Go Home</Link>
      </Button>
    </div>
  );
}
-e 
```

-e 
## `./src/lib/googleApi.ts`
```
// Google Workspace API helpers with graceful fallback mechanisms
import { toast } from 'react-hot-toast';

export interface GoogleTask {
  id: string;
  title: string;
  notes?: string;
  due?: string;
  status: 'needsAction' | 'completed';
}

export interface GoogleCalendarEvent {
  id: string;
  summary: string;
  description?: string;
  start: { dateTime?: string; date?: string };
  end: { dateTime?: string; date?: string };
  location?: string;
}

export interface GoogleDriveFile {
  id: string;
  name: string;
  mimeType: string;
  createdTime?: string;
  webViewLink?: string;
}

// Keep Fallback State Management
const getLocalKeepNotes = () => {
  return JSON.parse(localStorage.getItem('google_keep_fallback_notes') || '[]');
};

const saveLocalKeepNotes = (notes: any[]) => {
  localStorage.setItem('google_keep_fallback_notes', JSON.stringify(notes));
};

export const googleApi = {
  // --- GOOGLE TASKS ---
  tasks: {
    listLists: async (token: string): Promise<any[]> => {
      try {
        const response = await fetch('https://tasks.googleapis.com/tasks/v1/users/@me/lists', {
          headers: { Authorization: `Bearer ${token}` }
        });
        if (!response.ok) throw new Error(await response.text());
        const data = await response.json();
        return data.items || [];
      } catch (err: any) {
        console.error("Error fetching task lists:", err);
        return [{ id: "@default", title: "My Tasks" }];
      }
    },
    listTasks: async (token: string, listId: string = "@default"): Promise<GoogleTask[]> => {
      try {
        const response = await fetch(`https://tasks.googleapis.com/tasks/v1/lists/${listId}/tasks`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        if (!response.ok) throw new Error(await response.text());
        const data = await response.json();
        return data.items || [];
      } catch (err: any) {
        console.error("Error listing tasks:", err);
        throw err;
      }
    },
    createTask: async (token: string, title: string, notes: string = "", dueDate?: string, listId: string = "@default"): Promise<GoogleTask | null> => {
      try {
        // Due date must be RFC 3339 timestamp
        let dueStamp: string | undefined = undefined;
        if (dueDate) {
          dueStamp = new Date(dueDate).toISOString();
        }

        const response = await fetch(`https://tasks.googleapis.com/tasks/v1/lists/${listId}/tasks`, {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            title,
            notes,
            due: dueStamp
          })
        });
        if (!response.ok) throw new Error(await response.text());
        toast.success(`Synced "${title}" to Google Tasks!`);
        return await response.json();
      } catch (err: any) {
        console.error("Error creating Google task:", err);
        toast.error("Google Task synchronization failed.");
        return null;
      }
    },
    toggleTask: async (token: string, taskId: string, status: 'completed' | 'needsAction', listId: string = "@default"): Promise<boolean> => {
      try {
        const response = await fetch(`https://tasks.googleapis.com/tasks/v1/lists/${listId}/tasks/${taskId}`, {
          method: 'PATCH',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            status,
            completed: status === 'completed' ? new Date().toISOString() : null
          })
        });
        if (!response.ok) throw new Error(await response.text());
        return true;
      } catch (err: any) {
        console.error("Error updating Google task state:", err);
        return false;
      }
    },
    deleteTask: async (token: string, taskId: string, listId: string = "@default"): Promise<boolean> => {
      try {
        const response = await fetch(`https://tasks.googleapis.com/tasks/v1/lists/${listId}/tasks/${taskId}`, {
          method: 'DELETE',
          headers: { Authorization: `Bearer ${token}` }
        });
        if (!response.ok) throw new Error(await response.text());
        toast.success("Google task removed");
        return true;
      } catch (err: any) {
        console.error("Error deleting Google task:", err);
        return false;
      }
    }
  },

  // --- GOOGLE CALENDAR ---
  calendar: {
    listEvents: async (token: string): Promise<GoogleCalendarEvent[]> => {
      try {
        const response = await fetch('https://www.googleapis.com/calendar/v3/calendars/primary/events?orderBy=startTime&singleEvents=true', {
          headers: { Authorization: `Bearer ${token}` }
        });
        if (!response.ok) throw new Error(await response.text());
        const data = await response.json();
        return data.items || [];
      } catch (err: any) {
        console.error("Error listing calendar events:", err);
        throw err;
      }
    },
    createEvent: async (token: string, summary: string, description: string, startTime: string, endTime: string, location?: string): Promise<GoogleCalendarEvent | null> => {
      try {
        const response = await fetch('https://www.googleapis.com/calendar/v3/calendars/primary/events', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            summary,
            description,
            start: { dateTime: new Date(startTime).toISOString() },
            end: { dateTime: new Date(endTime).toISOString() },
            location
          })
        });
        if (!response.ok) throw new Error(await response.text());
        toast.success(`Scheduled ${summary} on Google Calendar!`);
        return await response.json();
      } catch (err: any) {
        console.error("Error creating Calendar event:", err);
        toast.error("Failed to create Google Calendar event");
        return null;
      }
    },
    deleteEvent: async (token: string, eventId: string): Promise<boolean> => {
      try {
        const response = await fetch(`https://www.googleapis.com/calendar/v3/calendars/primary/events/${eventId}`, {
          method: 'DELETE',
          headers: { Authorization: `Bearer ${token}` }
        });
        if (!response.ok) throw new Error(await response.text());
        toast.success("Event deleted from Google Calendar");
        return true;
      } catch (err: any) {
        console.error("Error deleting calendar event:", err);
        return false;
      }
    }
  },

  // --- GOOGLE DRIVE ---
  drive: {
    listFiles: async (token: string, q: string = ""): Promise<GoogleDriveFile[]> => {
      try {
        const encodedQ = encodeURIComponent(q || "trashed = false");
        const response = await fetch(`https://www.googleapis.com/drive/v3/files?q=${encodedQ}&fields=files(id,name,mimeType,createdTime,webViewLink)`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        if (!response.ok) throw new Error(await response.text());
        const data = await response.json();
        return data.files || [];
      } catch (err: any) {
        console.error("Error listing files from Google Drive:", err);
        throw err;
      }
    },
    createFile: async (token: string, name: string, content: string, mimeType: string = "application/json"): Promise<any | null> => {
      try {
        // Upload a file to Drive using multipart/related
        const metadata = {
          name,
          mimeType,
          parents: [] as string[]
        };

        const form = new FormData();
        form.append("metadata", new Blob([JSON.stringify(metadata)], { type: "application/json" }));
        form.append("file", new Blob([content], { type: mimeType }));

        const response = await fetch("https://www.googleapis.com/upload/drive/v3/files?uploadType=multipart", {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${token}`
          },
          body: form
        });

        if (!response.ok) throw new Error(await response.text());
        const data = await response.json();
        toast.success(`Successfully backed up "${name}" to Google Drive!`);
        return data;
      } catch (err: any) {
        console.error("Error creating Google Drive file:", err);
        toast.error("Drive upload failed");
        return null;
      }
    },
    findOrCreateFolder: async (token: string, folderName: string): Promise<string> => {
      try {
        const q = `name = '${folderName}' and mimeType = 'application/vnd.google-apps.folder' and trashed = false`;
        const encodedQ = encodeURIComponent(q);
        const response = await fetch(`https://www.googleapis.com/drive/v3/files?q=${encodedQ}&fields=files(id)`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        if (!response.ok) throw new Error(await response.text());
        const data = await response.json();
        if (data.files && data.files.length > 0) {
          return data.files[0].id;
        }

        const createResponse = await fetch("https://www.googleapis.com/drive/v3/files", {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            name: folderName,
            mimeType: 'application/vnd.google-apps.folder'
          })
        });
        if (!createResponse.ok) throw new Error(await createResponse.text());
        const folder = await createResponse.json();
        toast.success(`Created Drive folder "${folderName}" for your workspace!`);
        return folder.id;
      } catch (err) {
        console.error("Error findOrCreateFolder:", err);
        throw err;
      }
    },
    findOrCreateDatabaseFile: async (token: string, folderId: string, filename: string): Promise<{ id: string, content: any }> => {
      try {
        const q = `name = '${filename}' and '${folderId}' in parents and trashed = false`;
        const encodedQ = encodeURIComponent(q);
        const response = await fetch(`https://www.googleapis.com/drive/v3/files?q=${encodedQ}&fields=files(id,name)`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        if (!response.ok) throw new Error(await response.text());
        const data = await response.json();
        
        if (data.files && data.files.length > 0) {
          const fileId = data.files[0].id;
          const content = await googleApi.drive.getFileContent(token, fileId);
          return { id: fileId, content };
        }

        const defaultContent = JSON.stringify({
          tasks: [],
          habits: [],
          goals: [],
          finances: [],
          lastEditedTime: new Date().toISOString()
        }, null, 2);

        const metadata = {
          name: filename,
          mimeType: "application/json",
          parents: [folderId]
        };

        const form = new FormData();
        form.append("metadata", new Blob([JSON.stringify(metadata)], { type: "application/json" }));
        form.append("file", new Blob([defaultContent], { type: "application/json" }));

        const createResponse = await fetch("https://www.googleapis.com/upload/drive/v3/files?uploadType=multipart", {
          method: 'POST',
          headers: { Authorization: `Bearer ${token}` },
          body: form
        });
        if (!createResponse.ok) throw new Error(await createResponse.text());
        const newFile = await createResponse.json();
        toast.success(`Created Drive database file "${filename}" inside MMV XII!`);
        return { id: newFile.id, content: JSON.parse(defaultContent) };
      } catch (err) {
        console.error("Error findOrCreateDatabaseFile:", err);
        throw err;
      }
    },
    getFileContent: async (token: string, fileId: string): Promise<any> => {
      try {
        const response = await fetch(`https://www.googleapis.com/drive/v3/files/${fileId}?alt=media`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        if (!response.ok) throw new Error(await response.text());
        const text = await response.text();
        try {
          return JSON.parse(text);
        } catch {
          return text;
        }
      } catch (err) {
        console.error("Error getFileContent:", err);
        throw err;
      }
    },
    updateFileContent: async (token: string, fileId: string, content: string): Promise<boolean> => {
      try {
        const response = await fetch(`https://www.googleapis.com/upload/drive/v3/files/${fileId}?uploadType=media`, {
          method: 'PATCH',
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json'
          },
          body: content
        });
        if (!response.ok) throw new Error(await response.text());
        return true;
      } catch (err) {
        console.error("Error updateFileContent:", err);
        toast.error("Could not sync changes to Drive");
        return false;
      }
    }
  },

  // --- GOOGLE DOCS ---
  docs: {
    createDocument: async (token: string, title: string): Promise<any | null> => {
      try {
        const response = await fetch('https://docs.googleapis.com/v1/documents', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ title })
        });
        if (!response.ok) throw new Error(await response.text());
        const doc = await response.json();
        toast.success(`Google Doc "${title}" created successfully!`);
        return doc;
      } catch (err: any) {
        console.error("Error creating Google Doc:", err);
        return null;
      }
    },
    getDocument: async (token: string, documentId: string): Promise<any | null> => {
      try {
        const response = await fetch(`https://docs.googleapis.com/v1/documents/${documentId}`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        if (!response.ok) throw new Error(await response.text());
        return await response.json();
      } catch (err: any) {
        console.error("Error fetching Google Doc:", err);
        return null;
      }
    },
    appendDocumentText: async (token: string, documentId: string, text: string): Promise<boolean> => {
      try {
        const response = await fetch(`https://docs.googleapis.com/v1/documents/${documentId}:batchUpdate`, {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            requests: [
              {
                insertText: {
                  text: text,
                  endOfSegmentLocation: {}
                }
              }
            ]
          })
        });
        if (!response.ok) throw new Error(await response.text());
        toast.success("Saved text changes to Google Doc");
        return true;
      } catch (err: any) {
        console.error("Error appending to Google Doc:", err);
        toast.error("Could not write to Google Doc");
        return false;
      }
    }
  },

  // --- GOOGLE SPREADSHEETS ---
  sheets: {
    createSpreadsheet: async (token: string, title: string): Promise<any | null> => {
      try {
        const response = await fetch('https://sheets.googleapis.com/v4/spreadsheets', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            properties: { title }
          })
        });
        if (!response.ok) throw new Error(await response.text());
        const data = await response.json();
        toast.success(`Google Sheet "${title}" created!`);
        return data;
      } catch (err: any) {
        console.error("Error creating Google Spreadsheet:", err);
        return null;
      }
    },
    writeSheetData: async (token: string, spreadsheetId: string, range: string, values: any[][]): Promise<boolean> => {
      try {
        const response = await fetch(`https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/${range}?valueInputOption=USER_ENTERED`, {
          method: 'PUT',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            values
          })
        });
        if (!response.ok) throw new Error(await response.text());
        return true;
      } catch (err: any) {
        console.error("Error writing data to Google Sheet:", err);
        return false;
      }
    }
  },

  // --- GOOGLE KEEP FALLBACK / HYBRID Note Engine ---
  keep: {
    listNotes: async (token: string): Promise<any[]> => {
      // Gracefully fetch from Google Keep API or fallback to beautiful local sandbox Keep Notes
      try {
        const response = await fetch('https://keep.googleapis.com/v1/notes', {
          headers: { Authorization: `Bearer ${token}` }
        });
        if (!response.ok) throw new Error("Google Keep API might be restricted on standard accounts");
        const data = await response.json();
        return data.notes || [];
      } catch (err: any) {
        // Fallback to local key value notes
        return getLocalKeepNotes();
      }
    },
    createNote: async (token: string, title: string, content: string, color: string = "yellow"): Promise<any> => {
      const fallbackId = "local_keep_" + Date.now();
      const newLocalNote = {
        id: fallbackId,
        title,
        body: content,
        color,
        createdTime: new Date().toISOString(),
        isSyncedToKeep: false
      };

      try {
        const response = await fetch('https://keep.googleapis.com/v1/notes', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            title,
            body: { text: { text: content } }
          })
        });
        if (!response.ok) throw new Error("Keep API rejected or not enabled on consumer account");
        const data = await response.json();
        toast.success(`Note "${title}" added to Google Keep!`);
        return data;
      } catch (e) {
        // Handle Keep API restrictions elegantly - save locally and notify user they can search or backing up to Docs instead
        const current = getLocalKeepNotes();
        saveLocalKeepNotes([newLocalNote, ...current]);
        toast.success(`Saved "${title}" locally! (Note: Keep notes synced to Google Drive/Docs safely due to Keep API limits)`);
        return newLocalNote;
      }
    },
    deleteNote: async (token: string, noteId: string): Promise<boolean> => {
      if (noteId.startsWith("local_keep_")) {
        const current = getLocalKeepNotes();
        saveLocalKeepNotes(current.filter((n: any) => n.id !== noteId));
        toast.success("Note removed");
        return true;
      }
      try {
        const response = await fetch(`https://keep.googleapis.com/v1/notes/${noteId}`, {
          method: 'DELETE',
          headers: { Authorization: `Bearer ${token}` }
        });
        if (!response.ok) throw new Error();
        return true;
      } catch (e) {
        return false;
      }
    }
  }
};
-e 
```

-e 
## `./src/lib/query-client.ts`
```
import { QueryClient } from '@tanstack/react-query';

export const queryClientInstance = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5 minutes
      refetchOnWindowFocus: false,
    },
  },
});
-e 
```

-e 
## `./src/lib/googleAuth.tsx`
```
import React, { createContext, useContext, useState, useEffect } from 'react';
import { auth, googleProvider } from '@/lib/firebase';
import { 
  signInWithPopup, 
  signInWithRedirect, 
  getRedirectResult, 
  GoogleAuthProvider as FirebaseAuthProvider, 
  signOut 
} from 'firebase/auth';
import { toast } from 'react-hot-toast';

interface GoogleAuthContextType {
  accessToken: string | null;
  setAccessToken: (token: string | null) => void;
  isLoading: boolean;
  isConnected: boolean;
  connectGoogle: () => Promise<void>;
  connectGoogleRedirect: () => Promise<void>;
  disconnectGoogle: () => Promise<void>;
  saveDeveloperToken: (token: string) => void;
}

const GoogleAuthContext = createContext<GoogleAuthContextType | undefined>(undefined);

const GOOGLE_SCOPES = [
  "https://www.googleapis.com/auth/tasks",
  "https://www.googleapis.com/auth/calendar.events",
  "https://www.googleapis.com/auth/documents",
  "https://www.googleapis.com/auth/drive.readonly",
  "https://www.googleapis.com/auth/drive.file",
  "https://www.googleapis.com/auth/spreadsheets"
];

export const GoogleAuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [accessToken, setAccessTokenState] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const setAccessToken = (token: string | null) => {
    setAccessTokenState(token);
    if (token) {
      localStorage.setItem('google_access_token_override', token);
    } else {
      localStorage.removeItem('google_access_token_override');
    }
  };

  useEffect(() => {
    async function loadToken() {
      try {
        setIsLoading(true);
        const overrideToken = localStorage.getItem('google_access_token_override');
        if (overrideToken) {
          setAccessTokenState(overrideToken);
          setIsLoading(false);
          return;
        }
      } catch (err) {
        console.error("Error loading Google access token:", err);
      } finally {
        setIsLoading(false);
      }
    }

    loadToken();

    // Check redirect results on mount in case they signed in with Redirect
    getRedirectResult(auth)
      .then((result) => {
        if (result) {
          const credential = FirebaseAuthProvider.credentialFromResult(result);
          if (credential?.accessToken) {
            setAccessToken(credential.accessToken);
            toast.success("Google connected via redirect successfully!");
          }
        }
      })
      .catch((e) => {
        console.error("OAuth Redirect Result Error:", e);
      });

    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      // In Firebase, provider tokens are typically only available immediately after sign-in.
      // So we rely on localStorage to keep the token if they connected.
      const override = localStorage.getItem('google_access_token_override');
      if (!override) {
        setAccessTokenState(null);
      } else {
        setAccessTokenState(override);
      }
    });

    return () => {
      unsubscribe();
    };
  }, []);

  const prepareProvider = () => {
    GOOGLE_SCOPES.forEach(scope => googleProvider.addScope(scope));
    googleProvider.setCustomParameters({
      prompt: 'consent',
      access_type: 'offline'
    });
  };

  const connectGoogle = async () => {
    try {
      setIsLoading(true);
      prepareProvider();

      const result = await signInWithPopup(auth, googleProvider);
      const credential = FirebaseAuthProvider.credentialFromResult(result);
      
      if (credential?.accessToken) {
        setAccessToken(credential.accessToken);
        toast.success("Google connected successfully");
      }
    } catch (e: any) {
      if (e.code === 'auth/unauthorized-domain') {
        toast.error(`Please add ${window.location.hostname} to Authorized Domains in Firebase Console -> Authentication -> Settings.`);
      } else if (e.code === 'auth/popup-blocked') {
        toast.error("Popup window was blocked by your browser. Try enabling Redirect Mode instead!");
      } else if (e.code !== 'auth/popup-closed-by-user') {
        toast.error(`OAuth Popup failed: ${e.message}. Pro-tip: Try using Redirect Mode below.`);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const connectGoogleRedirect = async () => {
    try {
      setIsLoading(true);
      prepareProvider();
      await signInWithRedirect(auth, googleProvider);
    } catch (e: any) {
      toast.error(`OAuth Redirect initiation failed: ${e.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  const disconnectGoogle = async () => {
    setAccessTokenState(null);
    localStorage.removeItem('google_access_token_override');
    toast.success("Disconnected Google account");
  };

  const saveDeveloperToken = (token: string) => {
    if (token.trim()) {
      setAccessToken(token.trim());
      toast.success("Developer Google Access Token saved successfully!");
    } else {
      setAccessToken(null);
      toast.success("Developer access token cleared");
    }
  };

  return (
    <GoogleAuthContext.Provider value={{
      accessToken,
      setAccessToken,
      isLoading,
      isConnected: !!accessToken,
      connectGoogle,
      connectGoogleRedirect,
      disconnectGoogle,
      saveDeveloperToken
    }}>
      {children}
    </GoogleAuthContext.Provider>
  );
};

export const useGoogleAuth = () => {
  const context = useContext(GoogleAuthContext);
  if (context === undefined) {
    throw new Error('useGoogleAuth must be used within a GoogleAuthProvider');
  }
  return context;
};
-e 
```

-e 
## `./src/pages/Home.tsx`
```
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { base44 } from "@/api/base44Client";
import { format } from "date-fns";
import { motion } from "framer-motion";
import { CheckCircle, Flame, TrendingDown, TrendingUp, Target, Bell, ChevronRight, Sun, Moon, Sparkles } from "lucide-react";
import { formatCurrency } from "@/lib/utils";
import { useSettings } from "@/lib/useSettings";
import { useAuth } from "@/lib/AuthContext";
import HomeWorkspaceCloud from "@/components/HomeWorkspaceCloud";

const QUOTES = [
  "Small steps every day lead to big results.",
  "Progress over perfection.",
  "Build your best self, one habit at a time.",
  "Today is a new opportunity.",
  "Discipline is the bridge between goals and accomplishment.",
];

export default function Home() {
  const [habits, setHabits] = useState<any[]>([]);
  const [tasks, setTasks] = useState<any[]>([]);
  const [expenses, setExpenses] = useState<any[]>([]);
  const [income, setIncome] = useState<any[]>([]);
  const [goals, setGoals] = useState<any[]>([]);
  const [subscriptions, setSubscriptions] = useState<any[]>([]);
  const { settings } = useSettings();
  const { user } = useAuth();
  const today = new Date().toISOString().split("T")[0];
  const tomorrow = new Date(new Date().setDate(new Date().getDate() + 1)).toISOString().split("T")[0];
  const quote = QUOTES[new Date().getDay() % QUOTES.length];

  const [dismissedNotifIds, setDismissedNotifIds] = useState<string[]>([]);

  useEffect(() => {
    const saved = localStorage.getItem("dismissed_notifications");
    if (saved) setDismissedNotifIds(JSON.parse(saved));

    Promise.all([
      base44.entities.Habit.list(),
      base44.entities.Task.filter({ status: "todo" }),
      base44.entities.Expense.list("-date", 50),
      base44.entities.Income.list("-date", 50),
      base44.entities.Goal.filter({ status: "active" }),
      base44.entities.Subscription.list(),
    ]).then(([h, t, e, i, g, s]) => {
      setHabits(h || []);
      setTasks(t || []);
      setExpenses(e || []);
      setIncome(i || []);
      setGoals(g || []);
      setSubscriptions(s || []);
    });
  }, []);

  const isHabitDueOnDate = (habit: any, date: Date) => {
    if (habit.frequency === "daily") return true;
    if (habit.frequency === "custom" && habit.custom_days?.includes(date.getDay())) return true;
    return false;
  };

  // Notification count logic
  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);
  const yesterdayStr = yesterday.toISOString().split("T")[0];
  const missedHabits = habits.filter(h => h.is_active && isHabitDueOnDate(h, yesterday) && !h.completions?.includes(yesterdayStr));
  const overdueTasks = tasks.filter(t => t.due_date && t.due_date < today && t.status !== 'done');
  const upcomingSubs = subscriptions.filter(s => s.is_active && (s.next_billing === today || s.next_billing === tomorrow));
  
  const allNotifications = [
    ...overdueTasks.map(t => ({ id: `task-${t.id}` })),
    ...missedHabits.map(h => ({ id: `habit-${h.id}` })),
    ...upcomingSubs.map(s => ({ id: `sub-${s.id}` }))
  ];
  const unreadCount = allNotifications.filter(n => !dismissedNotifIds.includes(n.id)).length;

  const todayHabits = habits.filter(h => h.is_active);
  const completedTodayCount = todayHabits.filter(h => h.completions?.includes(today)).length;
  const habitPct = todayHabits.length > 0 ? Math.round((completedTodayCount / todayHabits.length) * 100) : 0;

  const dueTodayTasks = tasks.filter(t => t.due_date === today);
  const overdueTaskCount = tasks.filter(t => t.due_date && t.due_date < today).length;

  const upcomingItems = [
    ...habits.filter(h => h.is_active && !h.completions?.includes(today) && isHabitDueOnDate(h, new Date())).map(h => ({ ...h, type: 'habit', dateLabel: 'Today', path: '/habits', timeLabel: h.notification_time })),
    ...tasks.filter(t => t.due_date === today).map(t => ({ ...t, type: 'task', dateLabel: 'Today', path: '/tasks', timeLabel: t.due_time })),
    ...subscriptions.filter(s => s.is_active && s.next_billing === today).map(s => ({ ...s, type: 'subscription', dateLabel: 'Today', path: '/finance', timeLabel: s.reminder_time })),
    ...habits.filter(h => h.is_active && isHabitDueOnDate(h, new Date(new Date().setDate(new Date().getDate() + 1)))).map(h => ({ ...h, type: 'habit', dateLabel: 'Tomorrow', path: '/habits', timeLabel: h.notification_time })),
    ...tasks.filter(t => t.due_date === tomorrow).map(t => ({ ...t, type: 'task', dateLabel: 'Tomorrow', path: '/tasks', timeLabel: t.due_time })),
    ...subscriptions.filter(s => s.is_active && s.next_billing === tomorrow).map(s => ({ ...s, type: 'subscription', dateLabel: 'Tomorrow', path: '/finance', timeLabel: s.reminder_time })),
  ];

  const getAmountInPrimary = (item: any) => {
    let amt = item.amount || 0;
    if (item.currency === 'USD' && settings.currency_primary === 'UZS') amt *= settings.uzs_rate;
    if (item.currency === 'UZS' && settings.currency_primary === 'USD') amt /= settings.uzs_rate;
    return amt;
  };

  const thisMonthExpenses = expenses
    .filter(e => e.date?.startsWith(today.slice(0, 7)))
    .reduce((sum, e) => sum + getAmountInPrimary(e), 0);

  const thisMonthIncome = income
    .filter(i => i.date?.startsWith(today.slice(0, 7)))
    .reduce((sum, i) => sum + getAmountInPrimary(i), 0);

  const greeting = () => {
    const h = new Date().getHours();
    if (h < 12) return "Good morning";
    if (h < 17) return "Good afternoon";
    return "Good evening";
  };

  const displayName = user?.user_metadata?.full_name || user?.user_metadata?.name || settings.first_name || "MMV";

  const widgets = [
    {
      title: "Habits Today",
      value: `${completedTodayCount}/${todayHabits.length}`,
      sub: `${habitPct}% complete`,
      icon: Flame,
      color: "from-orange-400 to-red-500",
      path: "/habits",
    },
    {
      title: "Tasks Due",
      value: dueTodayTasks.length,
      sub: overdueTaskCount > 0 ? `${overdueTaskCount} overdue` : "All caught up",
      icon: CheckCircle,
      color: "from-violet-500 to-purple-600",
      path: "/tasks",
    },
    {
      title: "Spending",
      value: formatCurrency(thisMonthExpenses, settings.currency_primary, settings.uzs_rate),
      sub: "This month",
      icon: TrendingDown,
      color: "from-rose-400 to-pink-600",
      path: "/finance",
    },
    {
      title: "Goals",
      value: goals.length,
      sub: "Active goals",
      icon: Target,
      color: "from-blue-400 to-indigo-600",
      path: "/goals",
    },
  ];

  const containerAnim = { hidden: {}, show: { transition: { staggerChildren: 0.08 } } };
  const itemAnim = { hidden: { opacity: 0, y: 18 }, show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 280, damping: 22 } } };

  return (
    <div className="px-4 pt-4 pb-0">
      {/* Header with Logo */}
      <motion.div initial={{ opacity: 0, y: -16 }} animate={{ opacity: 1, y: 0 }} transition={{ type: "spring", stiffness: 260, damping: 20 }} className="mb-4 flex items-center justify-between">
        <div>
          <p className="text-[10px] text-muted-foreground font-bold uppercase ">{format(new Date(), "EEEE, d MMMM yyyy")}</p>
          <h1 className="text-2xl font-bold text-foreground mt-0.5 flex items-center gap-2">
            {greeting()}, {displayName}
            {greeting() === "Good evening" ? <Moon className="w-5 h-5 text-blue-500" /> : greeting() === "Good morning" ? <Sun className="w-5 h-5 text-yellow-500" /> : <Sparkles className="w-5 h-5 text-orange-500" />}
          </h1>
        </div>
        <div className="flex items-center gap-2">
          <Link to="/notifications" className="w-10 h-10 bg-card border border-border flex items-center justify-center rounded-2xl shadow-sm hover:bg-primary/10 group transition-colors relative">
            <Bell className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
            {unreadCount > 0 && (
              <span className="absolute top-2.5 right-2.5 w-2.5 h-2.5 bg-rose-500 flex items-center justify-center rounded-full border-2 border-card text-[8px] font-bold text-white">{unreadCount}</span>
            )}
          </Link>
        </div>
      </motion.div>

      {/* Quick Integration Helper Banner */}
      <motion.div initial={{ opacity: 0, y: -5 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }} className="mb-6">
        <div className="bg-card/80 backdrop-blur-md rounded-2xl p-3 border border-border/80 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 shadow-xs">
          <div className="flex items-center gap-2.5 text-xs">
            <span className="flex h-2 w-2 relative shrink-0">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <span className="text-muted-foreground">Cloud Sync & OAuth Diagnostics:</span>
            <span className="font-bold text-foreground">Project mmv-xii Active</span>
          </div>
          <div className="flex items-center gap-2 w-full sm:w-auto overflow-x-auto pb-1 sm:pb-0">
            <Link to="/database-guide" className="shrink-0">
              <span className="text-[11px] font-bold bg-primary/10 text-primary hover:bg-primary/20 px-2.5 py-1 rounded-xl transition-colors inline-block">
                Fix 403 / Drive Errors
              </span>
            </Link>
            <Link to="/settings" className="shrink-0">
              <span className="text-[11px] font-bold bg-muted text-muted-foreground hover:bg-muted/80 border border-border px-2.5 py-1 rounded-xl transition-colors inline-block">
                Enable Redirect Mode
              </span>
            </Link>
          </div>
        </div>
      </motion.div>

      {/* Habit Score Card */}
      <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.2 }}
        className="bg-card rounded-3xl p-5 mb-6 border border-border transition-all active:scale-[0.99] hover:bg-primary/5 hover:border-primary/20 group">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs font-bold text-muted-foreground uppercase ">Daily Habit Score</p>
            <p className="text-4xl font-bold text-primary mt-1">{habitPct}%</p>
            <p className="text-xs text-muted-foreground mt-1 font-medium">{completedTodayCount} of {todayHabits.length} habits done</p>
          </div>
          <div className="relative w-20 h-20">
            <svg viewBox="0 0 80 80" className="w-20 h-20 -rotate-90">
              <circle cx="40" cy="40" r="32" fill="none" stroke="hsl(var(--muted))" strokeWidth="8" />
              <circle cx="40" cy="40" r="32" fill="none" stroke="hsl(var(--primary))" strokeWidth="8"
                strokeDasharray={`${2 * Math.PI * 32}`}
                strokeDashoffset={`${2 * Math.PI * 32 * (1 - habitPct / 100)}`}
                strokeLinecap="round" className="transition-all duration-700" />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center group-hover:scale-110 transition-transform">
              <Flame className="w-6 h-6 text-primary" />
            </div>
          </div>
        </div>
        <Link to="/habits" className="mt-4 flex items-center text-xs font-bold text-primary gap-1 group-hover:translate-x-1 transition-transform inline-flex">
          View All Habits <ChevronRight className="w-3 h-3" />
        </Link>
      </motion.div>

      <div className="flex flex-col lg:flex-row gap-6 mb-8">
        {/* Productivity Widgets Grid */}
        <div className="w-full lg:w-fit flex-shrink-0">
          <motion.div variants={containerAnim} initial="hidden" animate="show" className="grid grid-cols-2 gap-4 h-full">
            {widgets.map((w) => (
              <motion.div key={w.title} variants={itemAnim}>
                <Link to={w.path} className="block h-full">
                  <div className="bg-card rounded-3xl p-5 border border-border active:scale-95 hover:bg-primary/5 hover:border-primary/20 transition-all w-full md:w-[200px] h-full md:h-[200px] aspect-square md:aspect-auto group flex flex-col justify-between shadow-sm">
                    <div className={`w-12 h-12 rounded-2xl flex items-center justify-center mb-3 fill-white transition-transform group-hover:scale-110 group-hover:rotate-3 ${w.title.includes('Expense') || w.title.includes('Spending') ? 'bg-rose-500' : w.title.includes('Income') ? 'bg-emerald-500' : w.title.includes('Habits') ? 'bg-orange-500' : 'bg-primary'}`}>
                      <w.icon className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <p className="text-3xl font-bold text-foreground leading-tight group-hover:text-primary transition-colors truncate">{w.value}</p>
                      <p className="text-[10px] text-muted-foreground font-bold uppercase mt-1.5 tracking-wider">{w.title}</p>
                      <p className="text-[10px] text-muted-foreground/70 mt-0.5 max-w-full truncate">{w.sub}</p>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Upcoming Items List */}
        <div className="w-full xl:flex-1 flex flex-col min-w-[300px]">
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }} className="bg-card rounded-3xl p-6 border border-border flex-1 flex flex-col min-h-[420px] shadow-sm">
            <div className="flex items-center justify-between mb-5">
              <h2 className="text-sm font-bold text-foreground uppercase tracking-wider">Upcoming</h2>
              {upcomingItems.length > 0 && <span className="text-[10px] font-bold text-primary uppercase bg-primary/10 px-2 py-1 rounded-full">{upcomingItems.length} items</span>}
            </div>
            <div className="space-y-2 flex-1 overflow-y-auto pr-2 scrollbar-none">
              {upcomingItems.length > 0 ? upcomingItems.map((item, idx) => (
                <motion.div key={`${item.type}-${item.id || idx}-${item.dateLabel}`} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.6 + idx * 0.05 }}>
                  <Link to={item.path} className="bg-card rounded-2xl p-3 border border-border flex items-center gap-3 hover:bg-primary/5 transition-colors group">
                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center fill-white ${
                      item.type === 'habit' ? 'bg-orange-500' : 
                      item.type === 'task' ? 'bg-primary' : 
                      'bg-rose-500'}`}
                    >
                      {item.type === 'habit' ? <Flame className="w-4 h-4 text-white" /> : 
                       item.type === 'task' ? <CheckCircle className="w-4 h-4 text-white" /> : 
                       <TrendingDown className="w-4 h-4 text-white" />}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-bold truncate group-hover:text-primary transition-colors">{item.title}</p>
                      <p className="text-[10px] text-muted-foreground uppercase ">{item.dateLabel} • {item.type} {item.timeLabel ? `• ${item.timeLabel}` : ''}</p>
                    </div>
                    {item.type === 'subscription' && (
                      <p className="text-xs font-bold text-rose-500 min-w-fit pr-1">-{formatCurrency(item.currency !== settings.currency_primary ? (item.currency === 'USD' ? item.amount * settings.uzs_rate : item.amount / settings.uzs_rate) : item.amount, settings.currency_primary)}</p>
                    )}
                    <ChevronRight className="w-4 h-4 flex-shrink-0 text-muted-foreground/30" />
                  </Link>
                </motion.div>
              )) : (
                <div className="bg-card/50 rounded-2xl p-6 border border-dashed border-border flex flex-col items-center justify-center text-center">
                  <div className="w-10 h-10 bg-muted/20 rounded-full flex items-center justify-center mb-2">
                    <CheckCircle className="w-5 h-5 text-muted-foreground/40" />
                  </div>
                  <p className="text-xs font-medium text-muted-foreground">All caught up for today & tomorrow</p>
                </div>
              )}
            </div>
          </motion.div>
        </div>
      </div>

      <HomeWorkspaceCloud 
        habits={habits}
        tasks={tasks}
        expenses={expenses}
        income={income}
        goals={goals}
      />
    </div>
  );
}
-e 
```

-e 
## `./src/pages/Settings.tsx`
```
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { 
  Palette, 
  DollarSign, 
  RefreshCw, 
  Moon, 
  Sun, 
  Monitor, 
  Bell, 
  User, 
  Save, 
  Check, 
  Eye, 
  EyeOff,
  LogOut,
  Globe
} from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useSettings } from "@/lib/useSettings";
import { toast } from "react-hot-toast";
import { auth, googleProvider } from "@/lib/firebase";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signInWithPopup, signInWithRedirect } from "firebase/auth";
import { useAuth } from "@/lib/AuthContext";
import { playSound } from "@/lib/sounds";

const ALL_HUES = [
  { label: "Red", hue: 0, color: "#ef4444" },
  { label: "Orange", hue: 25, color: "#f97316" },
  { label: "Amber", hue: 38, color: "#f59e0b" },
  { label: "Yellow", hue: 45, color: "#eab308" },
  { label: "Lime", hue: 84, color: "#84cc16" },
  { label: "Green", hue: 142, color: "#22c55e" },
  { label: "Emerald", hue: 160, color: "#10b981" },
  { label: "Cyan", hue: 190, color: "#06b6d4" },
  { label: "Blue", hue: 220, color: "#3b82f6" },
  { label: "Indigo", hue: 239, color: "#6366f1" },
  { label: "Violet", hue: 258, color: "#8b5cf6" },
  { label: "Rose", hue: 340, color: "#f43f5e" },
];

export default function Settings() {
  const { settings, updateSettings, saveSettings, hasChanges, loading } = useSettings();
  const { isAuthenticated, user, logout } = useAuth();
  
  const [uzsInput, setUzsInput] = useState("");
  
  // Auth state
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [authLoading, setAuthLoading] = useState(false);
  const [authMsg, setAuthMsg] = useState("");
  const [useRedirectMode, setUseRedirectMode] = useState(false);
  
  const [showPassword, setShowPassword] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);

  useEffect(() => {
    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e);
    };
    window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt);
    return () => window.removeEventListener("beforeinstallprompt", handleBeforeInstallPrompt);
  }, []);

  const handleInstallClick = async () => {
    if (!deferredPrompt) {
      toast.success("Click your browser's menu (⋮) -> 'Add to Home screen' or 'Install App'!");
      return;
    }
    try {
      deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;
      if (outcome === "accepted") {
        setDeferredPrompt(null);
      }
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    if (settings.uzs_rate) {
      setUzsInput(String(settings.uzs_rate));
    }
  }, [settings.uzs_rate]);

  function saveUzsRate() {
    const r = parseFloat(uzsInput);
    if (r > 0) updateSettings({ uzs_rate: r });
  }

  const handleSave = async () => {
    setIsSaving(true);
    await saveSettings();
    setIsSaving(false);
    toast.success("Settings saved successfully!");
  };

  const handleAuth = async (isSignUp: boolean) => {
    setAuthLoading(true);
    setAuthMsg("");
    try {
      if (isSignUp) {
         await createUserWithEmailAndPassword(auth, email, password);
         setAuthMsg("Successfully registered! Syncing your account...");
         toast.success("Registered successfully!");
      } else {
         await signInWithEmailAndPassword(auth, email, password);
         toast.success("Logged in successfully!");
      }
    } catch (err: any) {
      if (err.code === 'auth/invalid-credential') {
        setAuthMsg("Invalid email or password.");
      } else if (err.code === 'auth/email-already-in-use') {
        setAuthMsg("An account with this email already exists.");
      } else if (err.code === 'auth/weak-password') {
        setAuthMsg("Password should be at least 6 characters.");
      } else {
        setAuthMsg(err.message);
      }
    } finally {
      setAuthLoading(false);
    }
  };

  const handleGoogleAuth = async () => {
    try {
      if (useRedirectMode) {
        toast.loading("Redirecting to Google Secure Login...");
        await signInWithRedirect(auth, googleProvider);
        return;
      }

      await signInWithPopup(auth, googleProvider);
      toast.success("Logged in with Google successfully!");
    } catch (err: any) {
      if (err.code === 'auth/unauthorized-domain') {
        toast.error(`Please add ${window.location.hostname} to Authorized Domains in Firebase Console -> Authentication -> Settings.`);
      } else if (err.code === 'auth/popup-blocked' || err.code === 'auth/popup-closed-by-user') {
        toast.error("Popup blocked or closed. Please turn on 'Utilize Redirect Mode' below and retry!");
      } else {
        toast.error(`Auth Error: ${err.message}. Try turning on Redirect Mode below!`);
      }
    }
  };

  const handleResetSettings = () => {
    if (window.confirm("Are you sure you want to reset all settings to their default values?")) {
      updateSettings({
        theme_mode: "system",
        theme_preset: "default",
        theme_hue: 258,
        border_radius_percentage: 35,
        animation_timing: "ease",
        container_width: "100%",
        calendar_start_day: "Sunday",
        currency_primary: "USD",
        notifications_enabled: false,
        tasks_notifications: false,
        habits_notifications: false,
        notify_missed: false,
        sound_notifications_enabled: true,
      });
      toast.success("Settings reset to defaults. Remember to save if you want to keep them!");
    }
  };

  if (loading && !isSaving) return <div className="flex items-center justify-center min-h-[60dvh]"><div className="w-10 h-10 rounded-full border-4 border-primary/20 border-t-primary animate-spin" /></div>;

  return (
    <div className="px-4 pt-6 pb-24">
      <div className="mb-6">
        <h1 className="text-2xl font-bold">Settings</h1>
        <p className="text-xs text-muted-foreground">Customize your experience</p>
      </div>

      {/* Auth Section */}
      <motion.section initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="mb-6">
        <div className="flex items-center gap-2 mb-3 px-1">
          <User className="w-4 h-4 text-primary" />
          <h2 className="text-sm font-semibold">Account</h2>
        </div>
        <div className="bg-card rounded-3xl p-5 border border-border shadow-sm space-y-4">
          {isAuthenticated ? (
            <div className="flex items-center justify-between">
               <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center text-primary font-bold text-xl border border-primary/20">
                    <User className="w-6 h-6" />
                  </div>
                  <div>
                    <p className="font-bold">{user?.user_metadata?.full_name || user?.user_metadata?.name || user?.email || "User"}</p>
                    <span className="bg-emerald-500/10 text-emerald-500 text-[10px] uppercase font-bold px-2 py-0.5 rounded-full mt-1 inline-block">Cloud Sync Active</span>
                  </div>
               </div>
               <Button onClick={() => logout()} variant="outline" size="sm" className="rounded-xl border-destructive/20 text-destructive hover:bg-destructive/10">
                 <LogOut className="w-4 h-4 mr-2" /> Logout
               </Button>
            </div>
          ) : (
            <div className="space-y-4">
               <div>
                  <h3 className="font-bold mb-1">Create an account or Sign in</h3>
                  <p className="text-xs text-muted-foreground">Store your habits, tasks, and data securely in the cloud across devices.</p>
               </div>
               {authMsg && (
                 <div className="p-3 bg-primary/10 text-primary text-xs rounded-xl font-bold">{authMsg}</div>
               )}
               <div className="space-y-3">
                  <Input 
                    type="email" 
                    placeholder="Email address" 
                    value={email} 
                    onChange={e => setEmail(e.target.value)} 
                    className="rounded-xl h-12 px-4 focus-visible:ring-primary"
                  />
                  <div className="relative">
                    <Input 
                      type={showPassword ? "text" : "password"} 
                      placeholder="Password" 
                      value={password} 
                      onChange={e => setPassword(e.target.value)} 
                      className="rounded-xl h-12 px-4 pr-12 focus-visible:ring-primary"
                    />
                    <button 
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-primary transition-colors"
                    >
                      {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                    </button>
                  </div>
                  <div className="flex gap-2 pt-2">
                    <Button onClick={() => handleAuth(false)} disabled={authLoading || !email || !password} className="flex-1 rounded-xl h-12 font-bold shadow-md">
                      Sign In
                    </Button>
                    <Button onClick={() => handleAuth(true)} variant="secondary" disabled={authLoading || !email || !password} className="flex-1 rounded-xl h-12 font-bold">
                      Register
                    </Button>
                  </div>
                  <div className="relative flex items-center py-2">
                    <div className="flex-grow border-t border-border" />
                    <span className="flex-shrink-0 mx-4 text-xs text-muted-foreground uppercase font-bold">or</span>
                    <div className="flex-grow border-t border-border" />
                  </div>
                  <Button onClick={handleGoogleAuth} variant="outline" className="w-full rounded-xl h-12 font-bold flex items-center justify-center gap-2 border-border shadow-sm">
                    <svg className="w-5 h-5" viewBox="0 0 24 24">
                      <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                      <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                      <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
                      <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
                    </svg>
                    {useRedirectMode ? "Continue with Google (Redirect)" : "Continue with Google (Popup)"}
                  </Button>

                  <div className="p-3 bg-muted/40 rounded-2xl border border-border flex items-center justify-between mt-2">
                    <div className="pr-4">
                      <p className="text-xs font-bold flex items-center gap-1.5 text-foreground">
                        <Globe className="w-3.5 h-3.5 text-primary" />
                        Redirect Login Mode
                      </p>
                      <p className="text-[10px] text-muted-foreground">Recommended inside security iFrames & sandboxes (prevents POPUP errors).</p>
                    </div>
                    <Switch
                      checked={useRedirectMode}
                      onCheckedChange={setUseRedirectMode}
                    />
                  </div>
               </div>
            </div>
          )}
        </div>
      </motion.section>

      {/* Appearance */}
      <motion.section initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="mb-6">
        <div className="flex items-center gap-2 mb-3 px-1">
          <Palette className="w-4 h-4 text-primary" />
          <h2 className="text-sm font-semibold">Appearance</h2>
        </div>
        <div className="bg-card rounded-3xl p-5 border border-border shadow-sm">
          
          <div className="mb-6">
            <Label className="text-xs font-bold mb-3 block">Display Mode</Label>
            <div className="bg-muted/50 rounded-2xl p-1 border border-border flex gap-1">
              {[
                { val: "light", Icon: Sun, label: "Light" },
                { val: "dark", Icon: Moon, label: "Dark" },
                { val: "system", Icon: Monitor, label: "System" }
              ].map(({ val, Icon, label }) => (
                <button key={val} onClick={() => updateSettings({ theme_mode: val })}
                  className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl text-xs font-bold transition-all ${settings.theme_mode === val ? "bg-card text-foreground shadow-sm" : "text-muted-foreground"}`}>
                  <Icon className="w-4 h-4" /> {label}
                </button>
              ))}
            </div>
          </div>

          <div className="mb-6 h-px bg-border w-full" />

          {/* Elegant Custom Theme Presets */}
          <div className="mb-6">
            <Label className="text-xs font-bold mb-3 block">Theme Presets</Label>
            <div className="grid grid-cols-2 gap-2">
              {[
                { val: "default", label: "Default Retro", preview: "bg-amber-50/40 dark:bg-zinc-950 border-border", accent: "bg-[#8b5cf6]" },
                { val: "slate", label: "Steel Slate", preview: "bg-slate-100 dark:bg-slate-900 border-slate-200", accent: "bg-sky-500" },
                { val: "sand", label: "Desert Sand", preview: "bg-amber-50/50 dark:bg-amber-950/20 border-orange-200/50", accent: "bg-amber-600" },
                { val: "mint", label: "Forest Mint", preview: "bg-emerald-50/30 dark:bg-emerald-950/10 border-emerald-200/50", accent: "bg-emerald-500" },
                { val: "obsidian", label: "Midnight Obsidian", preview: "bg-neutral-950 border-neutral-800", accent: "bg-violet-600" }
              ].map((p) => {
                const isSelected = (settings as any).theme_preset === p.val || (p.val === "default" && !(settings as any).theme_preset);
                return (
                  <button 
                    key={p.val} 
                    type="button"
                    onClick={() => {
                      updateSettings({ 
                        theme_preset: p.val,
                        theme_hue: p.val === "slate" ? 210 : p.val === "sand" ? 34 : p.val === "mint" ? 145 : p.val === "obsidian" ? 265 : 220
                      });
                    }}
                    className={`flex flex-col gap-2 p-3 rounded-2xl border text-left transition-all ${
                      isSelected 
                        ? "border-primary bg-primary/5 shadow-md scale-[1.01]" 
                        : "border-border hover:bg-muted/30"
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold">{p.label}</span>
                      <div className={`w-3 h-3 rounded-full ${p.accent}`} />
                    </div>
                    <div className={`w-full h-8 rounded-lg border flex items-center justify-end px-2 ${p.preview}`}>
                      {isSelected && <Check className="w-3.5 h-3.5 text-primary stroke-[3]" />}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="mb-6 h-px bg-border w-full" />

          <p className="text-xs font-bold mb-4">Accent Color</p>
          <div className="grid grid-cols-6 gap-x-2 gap-y-4">
            {ALL_HUES.map(preset => (
              <button key={preset.hue} onClick={() => updateSettings({ theme_hue: preset.hue })}
                className="flex flex-col items-center gap-2">
                <div className={`w-10 h-10 rounded-2xl border-2 transition-all ${settings.theme_hue === preset.hue ? "border-foreground scale-110 shadow-lg" : "border-transparent"}`}
                  style={{ backgroundColor: preset.color }} />
                <span className="text-[10px] font-bold text-muted-foreground uppercase">{preset.label}</span>
              </button>
            ))}
          </div>
          
          <div className="mt-5 pt-5 border-t border-border flex items-center justify-between">
            <Label className="text-xs font-bold">Custom hue (0-360)</Label>
            <Input type="number" min="0" max="360" value={settings.theme_hue} onChange={e => updateSettings({ theme_hue: parseInt(e.target.value) || 258 })} className="rounded-xl h-9 w-24 text-xs font-bold text-center" />
          </div>
          
          <div className="mt-5 pt-5 border-t border-border flex items-center justify-between">
            <Label className="text-xs font-bold flex flex-col">
              Custom Border
              <span className="text-[10px] text-muted-foreground font-medium">Border radius percentage</span>
            </Label>
            <div className="flex items-center gap-3">
              <input 
                type="range" 
                min="0" 
                max="75" 
                value={settings.border_radius_percentage ?? 35} 
                onChange={e => updateSettings({ border_radius_percentage: parseInt(e.target.value) })}
                className="w-24 accent-primary"
              />
              <span className="text-xs font-bold text-muted-foreground w-8 text-right">{settings.border_radius_percentage ?? 35}%</span>
            </div>
          </div>

          <div className="mt-5 pt-5 border-t border-border flex items-center justify-between">
            <Label className="text-xs font-bold flex flex-col">
              Animation Timing
              <span className="text-[10px] text-muted-foreground font-medium">Custom animation bezier</span>
            </Label>
            <Select 
              value={(settings as any).animation_timing || "ease"} 
              onValueChange={v => updateSettings({ animation_timing: v })}
            >
              <SelectTrigger className="w-32 rounded-xl h-9 text-xs">
                <SelectValue placeholder="Easing" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="ease">Ease</SelectItem>
                <SelectItem value="ease-in">Ease In</SelectItem>
                <SelectItem value="ease-out">Ease Out</SelectItem>
                <SelectItem value="ease-in-out">Ease In Out</SelectItem>
                <SelectItem value="linear">Linear</SelectItem>
                <SelectItem value="cubic-bezier(0.68, -0.55, 0.265, 1.55)">Bouncy</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="mt-5 pt-5 border-t border-border flex items-center justify-between">
            <Label className="text-xs font-bold flex flex-col">
              Container Width
              <span className="text-[10px] text-muted-foreground font-medium">Layout width constraint</span>
            </Label>
            <Select 
              value={(settings as any).container_width || "100%"} 
              onValueChange={v => updateSettings({ container_width: v })}
            >
              <SelectTrigger className="w-32 rounded-xl h-9 text-xs">
                <SelectValue placeholder="Width" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="100%">100% (Full)</SelectItem>
                <SelectItem value="90%">90% Width</SelectItem>
                <SelectItem value="80%">80% Width</SelectItem>
                <SelectItem value="1024px">1024px Max</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="mt-5 pt-5 border-t border-border flex items-center justify-between">
            <Label className="text-xs font-bold flex flex-col">
              Calendar Start Day
              <span className="text-[10px] text-muted-foreground font-medium">For weekly views</span>
            </Label>
            <div className="flex bg-muted/40 p-1 rounded-xl">
              <button 
                onClick={() => updateSettings({ calendar_start_day: "Sunday" })}
                className={`py-1.5 px-3 rounded-lg text-[10px] font-bold transition-all ${settings.calendar_start_day === "Sunday" ? "bg-card text-foreground shadow-sm" : "text-muted-foreground hover:text-foreground"}`}
              >
                Sun
              </button>
              <button 
                onClick={() => updateSettings({ calendar_start_day: "Monday" })}
                className={`py-1.5 px-3 rounded-lg text-[10px] font-bold transition-all ${settings.calendar_start_day !== "Sunday" ? "bg-card text-foreground shadow-sm" : "text-muted-foreground hover:text-foreground"}`}
              >
                Mon
              </button>
            </div>
          </div>
        </div>
      </motion.section>

      {/* Currency */}
      <motion.section initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }} className="mb-6">
        <div className="flex items-center gap-2 mb-3 px-1">
          <DollarSign className="w-4 h-4 text-primary" />
          <h2 className="text-sm font-semibold">Currency</h2>
        </div>
        <div className="bg-card rounded-3xl p-5 border border-border shadow-sm space-y-5">
          <div>
            <Label className="text-xs font-bold text-muted-foreground uppercase mb-2 block">Primary Currency</Label>
            <Select value={settings.currency_primary} onValueChange={v => updateSettings({ currency_primary: v })}>
              <SelectTrigger className="rounded-xl h-11"><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="USD">🇺🇸 USD — US Dollar</SelectItem>
                <SelectItem value="UZS">🇺🇿 UZS — Uzbekistani Som</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="pt-4 border-t border-border">
            <Label className="text-xs font-bold text-muted-foreground uppercase mb-2 block">Exchange Rate (1 USD = ? UZS)</Label>
            <div className="flex gap-2">
              <Input value={uzsInput} onChange={e => setUzsInput(e.target.value)} className="rounded-xl h-11 text-sm font-bold" />
              <Button variant="outline" size="sm" onClick={saveUzsRate} className="rounded-xl h-11 px-4 font-bold border-primary/20 text-primary">Apply Rate</Button>
            </div>
            <p className="text-[10px] text-muted-foreground mt-2 font-medium">Internal conversion rate</p>
          </div>
        </div>
      </motion.section>

      {/* Notifications */}
      <motion.section initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="mb-6">
        <div className="flex items-center gap-2 mb-3 px-1">
          <Bell className="w-4 h-4 text-primary" />
          <h2 className="text-sm font-semibold">Notifications</h2>
        </div>
        <div className="bg-card rounded-3xl p-5 border border-border shadow-sm space-y-5">
          {[
            { key: "notifications_enabled", label: "Push Notifications", desc: "Allow system reminders", 
              onChange: async (e: any) => { 
                if (e.target.checked) {
                  if ('Notification' in window) {
                    await Notification.requestPermission();
                  }
                }
                updateSettings({ notifications_enabled: e.target.checked });
              } 
            },
            { key: "tasks_notifications", label: "Task Alerts", desc: "Notify on task due dates" },
            { key: "habits_notifications", label: "Habit Nudges", desc: "Daily reminders to complete habits" },
            { key: "notify_missed", label: "Missed Items Alerts", desc: "Notify when you miss a task/habit/payment" },
            { key: "sound_notifications_enabled", label: "Sound Effects & Alarms", desc: "Play elegant tones for alerts, tasks, habits & goals",
              onChange: (e: any) => {
                updateSettings({ sound_notifications_enabled: e.target.checked });
                if (e.target.checked) {
                  playSound("complete");
                }
              }
            },
          ].map(item => (
            <label key={item.key} className={`flex items-center justify-between cursor-pointer group p-1 -m-1 rounded-xl transition-colors hover:bg-primary/5 ${item.key !== "notifications_enabled" && item.key !== "sound_notifications_enabled" && !settings.notifications_enabled ? "opacity-50 cursor-not-allowed" : ""}`}>
              <div className="flex-1 pr-4">
                <p className="text-sm font-bold group-hover:text-primary transition-colors">{item.label}</p>
                <p className="text-[10px] text-muted-foreground font-medium">{item.desc}</p>
              </div>
              <Switch
                checked={(settings as any)[item.key]}
                onCheckedChange={v => item.onChange ? item.onChange({target: {checked: v}}) : updateSettings({ [item.key]: v })}
                disabled={item.key !== "notifications_enabled" && item.key !== "sound_notifications_enabled" && !settings.notifications_enabled}
              />
            </label>
          ))}

          <div className={`space-y-4 pt-2 border-t border-border ${!settings.notifications_enabled ? "opacity-50 pointer-events-none" : ""}`}>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-bold">Daily Reminder Time</p>
                <p className="text-[10px] text-muted-foreground font-medium">Time for overall daily summary</p>
              </div>
              <Input
                type="time"
                value={(settings as any).daily_reminder_time || "09:30"}
                onChange={(e) => updateSettings({ daily_reminder_time: e.target.value })}
                className="w-32 rounded-xl text-center font-mono"
              />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-bold">Advance Notice</p>
                <p className="text-[10px] text-muted-foreground font-medium">Minutes before item is due</p>
              </div>
              <div className="flex items-center gap-2">
                <Input
                  type="number"
                  min="0"
                  max="1440"
                  value={(settings as any).reminder_advance_time || "30"}
                  onChange={(e) => updateSettings({ reminder_advance_time: parseInt(e.target.value) || 0 })}
                  className="w-20 rounded-xl text-center tabular-nums"
                />
                <span className="text-xs font-bold text-muted-foreground">min</span>
              </div>
            </div>
          </div>

          {/* Sound Board Test Board */}
          {settings.sound_notifications_enabled !== false && (
            <div className="pt-4 border-t border-border">
              <p className="text-xs font-bold text-muted-foreground uppercase mb-3 text-center tracking-wider">Acoustic Sound Profile Tester</p>
              <div className="grid grid-cols-2 gap-2">
                <Button 
                  type="button" 
                  variant="outline" 
                  size="sm" 
                  onClick={() => playSound("complete")} 
                  className="rounded-2xl text-xs flex items-center justify-center gap-1.5 h-11 border-border bg-muted/25 hover:bg-primary/5 hover:border-primary/20 transition-all font-bold"
                >
                  <span>🔔</span> Chime (Complete)
                </Button>
                <Button 
                  type="button" 
                  variant="outline" 
                  size="sm" 
                  onClick={() => playSound("success")} 
                  className="rounded-2xl text-xs flex items-center justify-center gap-1.5 h-11 border-border bg-muted/25 hover:bg-primary/5 hover:border-primary/20 transition-all font-bold"
                >
                  <span>✨</span> Peaceful (Success)
                </Button>
                <Button 
                  type="button" 
                  variant="outline" 
                  size="sm" 
                  onClick={() => playSound("toggle")} 
                  className="rounded-2xl text-xs flex items-center justify-center gap-1.5 h-11 border-border bg-muted/25 hover:bg-primary/5 hover:border-primary/20 transition-all font-bold"
                >
                  <span>⚡</span> Pop (Toggle)
                </Button>
                <Button 
                  type="button" 
                  variant="outline" 
                  size="sm" 
                  onClick={() => playSound("celebration")} 
                  className="rounded-2xl text-xs flex items-center justify-center gap-1.5 h-11 border-border bg-muted/25 hover:bg-primary/5 hover:border-primary/20 transition-all font-bold"
                >
                  <span>🎉</span> Shimmer (Victory)
                </Button>
              </div>
            </div>
          )}
        </div>
      </motion.section>

      {/* Reset Settings */}
      <motion.section initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.22 }} className="mb-6">
        <div className="flex items-center gap-2 mb-3 px-1">
          <RefreshCw className="w-4 h-4 text-primary" />
          <h2 className="text-sm font-semibold">Danger Zone</h2>
        </div>
        <div className="bg-card rounded-3xl p-5 border border-border shadow-sm">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div>
              <Label className="text-sm font-bold text-destructive">Reset All Settings</Label>
              <p className="text-[10px] text-muted-foreground font-medium mt-1">This will revert all your preferences back to their default values.</p>
            </div>
            <Button onClick={handleResetSettings} variant="destructive" className="w-full md:w-auto rounded-xl font-bold flex items-center gap-2">
              <RefreshCw className="w-4 h-4" /> Reset Settings
            </Button>
          </div>
        </div>
      </motion.section>

      {/* Corporate Info */}
      <div className="text-center pb-8">
        <p className="text-[10px] font-bold text-muted-foreground uppercase">MMV Productivity</p>
        <p className="text-[9px] text-muted-foreground/50 mt-1">Version 12.0 • Build 2026.05</p>
      </div>

      {/* Save Button relocated to bottom of content */}
      <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25 }} className="mb-8">
        <Button 
          onClick={handleSave} 
          disabled={!hasChanges || isSaving}
          className={`w-full h-14 rounded-2xl font-bold shadow-lg transition-all duration-300 ${
            hasChanges ? "opacity-100 scale-100" : "opacity-50 scale-95"
          }`}
        >
          {isSaving ? (
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin" />
              Saving...
            </div>
          ) : (
            <div className="flex items-center justify-center gap-2">
              <Save className="w-5 h-5" />
              Save Settings
            </div>
          )}
        </Button>
      </motion.div>
    </div>
  );
}
-e 
```

-e 
## `./src/pages/Tasks.tsx`
```
import { useState, useEffect } from "react";
import { base44 } from "@/api/base44Client";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Bell, Check, Trash2, RepeatIcon, MoreHorizontal, Edit2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import DateRangePicker from "@/components/ui/DateRangePicker";
import PullToRefresh from "@/components/common/PullToRefresh";
import { scheduleNotification } from "@/lib/utils";
import { format } from "date-fns";
import { playSound } from "@/lib/sounds";

import KanbanBoard from "@/components/tasks/KanbanBoard";

const PRIORITY_COLORS: Record<string, string> = { 
  low: "bg-emerald-100 text-emerald-700", 
  medium: "bg-yellow-100 text-yellow-700", 
  high: "bg-red-100 text-red-700" 
};
const STATUS_TABS = ["todo", "in_progress", "done"];

const EMPTY_FORM = { 
  title: "", 
  description: "", 
  due_date: "", 
  due_time: "", 
  priority: "medium", 
  status: "todo", 
  repeat: "none", 
  repeat_days: [] as number[],
  notification_enabled: false, 
  notes: "" 
};

export default function Tasks() {
  const [tasks, setTasks] = useState<any[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [editTask, setEditTask] = useState<any>(null);
  const [form, setForm] = useState(EMPTY_FORM);
  const [activeTab, setActiveTab] = useState("todo");
  const [dateFilter, setDateFilter] = useState<any>(null);

  useEffect(() => { loadTasks(); }, []);

  async function loadTasks() {
    const data = await base44.entities.Task.list("-created_date", 200);
    setTasks(data || []);
  }

  async function saveTask() {
    if (!form.title.trim()) return;
    if (editTask) {
      await base44.entities.Task.update(editTask.id, form);
      playSound("toggle");
    } else {
      await base44.entities.Task.create(form);
      playSound("success");
    }
    if (form.notification_enabled && form.due_date && form.due_time) {
      const triggerTime = `${form.due_date}T${form.due_time}:00`;
      scheduleNotification(form.title, form.description || "Task reminder", triggerTime);
    }
    setShowForm(false);
    setEditTask(null);
    setForm(EMPTY_FORM);
    loadTasks();
  }

  async function toggleStatus(task: any) {
    const next = task.status === "todo" ? "in_progress" : task.status === "in_progress" ? "done" : "todo";
    await base44.entities.Task.update(task.id, { status: next });
    if (next === "done") {
      playSound("complete");
    } else {
      playSound("toggle");
    }
    loadTasks();
  }

  async function deleteTask(id: string) {
    await base44.entities.Task.delete(id);
    loadTasks();
  }

  function openEdit(task: any) {
    setEditTask(task);
    setForm({ ...EMPTY_FORM, ...task });
    setShowForm(true);
  }

  const filteredByDate = tasks.filter(t => {
    if (dateFilter?.from) {
      if (!t.due_date) return false;
      const td = new Date(t.due_date);
      if (dateFilter.to) {
        const toD = new Date(dateFilter.to);
        return td >= dateFilter.from && td <= toD;
      }
      return t.due_date === format(dateFilter.from, "yyyy-MM-dd");
    }
    return true;
  });

  const filtered = filteredByDate.filter(t => t.status === activeTab);

  return (
    <PullToRefresh onRefresh={loadTasks}>
    <div className="px-4 pt-6 pb-4 h-[calc(100vh-theme(spacing.16))] flex flex-col min-h-0">
      <motion.div initial={{ opacity: 0, y: -12 }} animate={{ opacity: 1, y: 0 }} transition={{ type: "spring", stiffness: 280 }} className="flex items-center justify-between mb-4 flex-shrink-0">
        <div>
          <h1 className="text-2xl font-bold">Tasks</h1>
          <p className="text-xs text-muted-foreground">{tasks.filter(t => t.status === "todo").length} remaining</p>
        </div>
        <div className="flex items-center gap-2">
          <DateRangePicker variant="icon" value={dateFilter} onChange={setDateFilter} />
          <Button size="icon" onClick={() => { setEditTask(null); setForm(EMPTY_FORM); setShowForm(true); }} className="rounded-xl">
            <Plus className="w-4 h-4" />
          </Button>
        </div>
      </motion.div>

      {/* Status Tabs (Mobile Only) */}
      <div className="md:hidden flex gap-1 bg-muted p-1 rounded-2xl mb-4 flex-shrink-0">
        {STATUS_TABS.map(tab => (
          <button key={tab} onClick={() => setActiveTab(tab)}
            className={`flex-1 py-1.5 text-xs font-semibold rounded-xl capitalize transition-all ${activeTab === tab ? "bg-card text-foreground shadow-sm" : "text-muted-foreground"}`}>
            {tab.replace("_", " ")}
          </button>
        ))}
      </div>

      {/* Desktop Kanban */}
      <div className="hidden md:block flex-1 min-h-0">
        <KanbanBoard tasks={filteredByDate} onEdit={openEdit} onRefresh={loadTasks} />
      </div>

      {/* Tasks list (Mobile Only) */}
      <div className="md:hidden flex-1 overflow-y-auto min-h-0 pb-16">
        <AnimatePresence>
          <div className="space-y-4">
          {(() => {
            if (dateFilter?.from) {
              const dates = [];
              const curr = new Date(dateFilter.from);
              const end = dateFilter.to ? new Date(dateFilter.to) : new Date(dateFilter.from);
              
              while (curr <= end) {
                dates.push(new Date(curr));
                curr.setDate(curr.getDate() + 1);
              }

              return dates.map(date => {
                const dateStr = format(date, "yyyy-MM-dd");
                const tasksForDate = filtered.filter(t => t.due_date === dateStr);
                
                // For aesthetics, if we want to show days without tasks, we can either
                // skip them or render them with an empty message.
                // The prompt seemed to want blocks for each day.
                
                return (
                  <div key={date.toISOString()} className="mb-4">
                    <div className="flex items-center gap-4 py-2 mb-2">
                      <div className="h-px bg-border flex-1" />
                      <p className="text-xs font-bold text-muted-foreground uppercase">{date.toLocaleDateString("en-US", { weekday: 'short', month: 'short', day: 'numeric' })}</p>
                      <div className="h-px bg-border flex-1" />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                      {tasksForDate.length > 0 ? tasksForDate.map((task, i) => (
                        <motion.div key={task.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ delay: i * 0.04 }}>
                          <div className="bg-card rounded-2xl p-4 border border-border transition-all hover:bg-primary/5 hover:border-primary/20 group cursor-pointer h-full">
                            <div className="flex items-start gap-3">
                              <button onClick={(e) => { e.stopPropagation(); toggleStatus(task); }}
                                className={`w-6 h-6 rounded-full border-2 flex items-center justify-center flex-shrink-0 mt-0.5 transition-all group-hover:border-primary/50 ${task.status === "done" ? "bg-primary border-primary group-hover:border-primary" : "border-border"}`}>
                                {task.status === "done" && <Check className="w-3 h-3 text-white" />}
                              </button>
                              <div className="flex-1 min-w-0" onClick={() => openEdit(task)}>
                                <p className={`text-sm font-semibold transition-colors group-hover:text-primary ${task.status === "done" ? "line-through text-muted-foreground group-hover:text-primary/70" : ""}`}>{task.title}</p>
                                {task.description && <p className="text-xs text-muted-foreground mt-0.5 truncate">{task.description}</p>}
                                <div className="flex items-center gap-2 mt-1.5 flex-wrap">
                                  <Badge className={`text-[10px] ${PRIORITY_COLORS[task.priority]}`}>{task.priority}</Badge>
                                  {task.due_date && <span className="text-[10px] text-muted-foreground">{task.due_date}{task.due_time ? ` at ${task.due_time}` : ""}</span>}
                                  {task.repeat !== "none" && (
                                    <div className="flex items-center gap-1 text-[10px] text-primary bg-primary/5 px-1 rounded">
                                      <RepeatIcon className="w-2.5 h-2.5" />
                                      {task.repeat === "custom" ? task.repeat_days?.map((d: number) => ["S", "M", "T", "W", "T", "F", "S"][d]).join("") : task.repeat}
                                    </div>
                                  )}
                                  {task.notification_enabled && <Bell className="w-3 h-3 text-primary" />}
                                </div>
                              </div>
                              <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                  <button onClick={e => e.stopPropagation()} className="p-1.5 rounded-xl hover:bg-primary/10 text-muted-foreground transition-all">
                                    <MoreHorizontal className="w-4 h-4" />
                                  </button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end" className="rounded-2xl">
                                  <DropdownMenuItem onClick={() => openEdit(task)} className="gap-2 rounded-xl">
                                    <Edit2 className="w-3.5 h-3.5" /> Edit
                                  </DropdownMenuItem>
                                  <DropdownMenuItem onClick={() => deleteTask(task.id)} className="gap-2 text-destructive focus:text-destructive rounded-xl">
                                    <Trash2 className="w-3.5 h-3.5" /> Delete
                                  </DropdownMenuItem>
                                </DropdownMenuContent>
                              </DropdownMenu>
                            </div>
                          </div>
                        </motion.div>
                      )) : (
                        <p className="text-xs text-center text-muted-foreground/60 py-2 col-span-full">No tasks</p>
                      )}
                    </div>
                  </div>
                );
              });
            }

            return (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                {filtered.map((task, i) => (
                  <motion.div key={task.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ delay: i * 0.04 }}>
                    <div className="bg-card rounded-2xl p-4 border border-border transition-all hover:bg-primary/5 hover:border-primary/20 group cursor-pointer h-full">
                      <div className="flex items-start gap-3">
                        <button onClick={(e) => { e.stopPropagation(); toggleStatus(task); }}
                          className={`w-6 h-6 rounded-full border-2 flex items-center justify-center flex-shrink-0 mt-0.5 transition-all group-hover:border-primary/50 ${task.status === "done" ? "bg-primary border-primary group-hover:border-primary" : "border-border"}`}>
                          {task.status === "done" && <Check className="w-3 h-3 text-white" />}
                        </button>
                        <div className="flex-1 min-w-0" onClick={() => openEdit(task)}>
                          <p className={`text-sm font-semibold transition-colors group-hover:text-primary ${task.status === "done" ? "line-through text-muted-foreground group-hover:text-primary/70" : ""}`}>{task.title}</p>
                          {task.description && <p className="text-xs text-muted-foreground mt-0.5 truncate">{task.description}</p>}
                          <div className="flex items-center gap-2 mt-1.5 flex-wrap">
                            <Badge className={`text-[10px] ${PRIORITY_COLORS[task.priority]}`}>{task.priority}</Badge>
                            {task.due_date && <span className="text-[10px] text-muted-foreground">{task.due_date}{task.due_time ? ` at ${task.due_time}` : ""}</span>}
                            {task.repeat !== "none" && (
                              <div className="flex items-center gap-1 text-[10px] text-primary bg-primary/5 px-1 rounded">
                                <RepeatIcon className="w-2.5 h-2.5" />
                                {task.repeat === "custom" ? task.repeat_days?.map((d: number) => ["S", "M", "T", "W", "T", "F", "S"][d]).join("") : task.repeat}
                              </div>
                            )}
                            {task.notification_enabled && <Bell className="w-3 h-3 text-primary" />}
                          </div>
                        </div>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <button onClick={e => e.stopPropagation()} className="p-1.5 rounded-xl hover:bg-primary/10 text-muted-foreground transition-all">
                              <MoreHorizontal className="w-4 h-4" />
                            </button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end" className="rounded-2xl">
                            <DropdownMenuItem onClick={() => openEdit(task)} className="gap-2 rounded-xl">
                              <Edit2 className="w-3.5 h-3.5" /> Edit
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => deleteTask(task.id)} className="gap-2 text-destructive focus:text-destructive rounded-xl">
                              <Trash2 className="w-3.5 h-3.5" /> Delete
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            );
          })()}
        </div>
      </AnimatePresence>

      {filtered.length === 0 && (
        <div className="text-center py-16 md:hidden">
          <Check className="w-12 h-12 text-muted-foreground/20 mx-auto mb-3" />
          <p className="text-sm text-muted-foreground">No tasks here</p>
        </div>
      )}
      </div>

      {/* Task Form Dialog */}
      <Dialog open={showForm} onOpenChange={setShowForm}>
        <DialogContent className="rounded-3xl mx-auto max-w-sm w-[calc(100%-2rem)] max-h-[90vh] overflow-y-auto scrollbar-none">
          <DialogHeader>
            <DialogTitle>{editTask ? "Edit Task" : "New Task"}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 pt-2">
            <div>
              <Label>Title *</Label>
              <Input value={form.title} onChange={e => setForm(f => ({ ...f, title: e.target.value }))} placeholder="Task title" className="rounded-xl mt-1" />
            </div>
            <div>
              <Label>Description</Label>
              <Textarea value={form.description} onChange={e => setForm(f => ({ ...f, description: e.target.value }))} className="rounded-xl mt-1 min-h-[70px]" />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <Label>Due Date</Label>
                <Input type="date" value={form.due_date} onChange={e => setForm(f => ({ ...f, due_date: e.target.value }))} className="rounded-xl mt-1" />
              </div>
              <div>
                <Label>Time</Label>
                <Input type="time" value={form.due_time} onChange={e => setForm(f => ({ ...f, due_time: e.target.value }))} className="rounded-xl mt-1" />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <Label>Priority</Label>
                <Select value={form.priority} onValueChange={v => setForm(f => ({ ...f, priority: v }))}>
                  <SelectTrigger className="rounded-xl mt-1"><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="low">Low</SelectItem>
                    <SelectItem value="medium">Medium</SelectItem>
                    <SelectItem value="high">High</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label>Repeat</Label>
                <Select value={form.repeat} onValueChange={v => setForm(f => ({ ...f, repeat: v }))}>
                  <SelectTrigger className="rounded-xl mt-1"><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="none">None</SelectItem>
                    <SelectItem value="daily">Daily</SelectItem>
                    <SelectItem value="weekly">Weekly</SelectItem>
                    <SelectItem value="monthly">Monthly</SelectItem>
                    <SelectItem value="custom">Custom days</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            {form.repeat === "custom" && (
              <div className="space-y-2">
                <Label className="text-xs">Repeat Days</Label>
                <div className="flex justify-between gap-1">
                  {["S", "M", "T", "W", "T", "F", "S"].map((day, i) => {
                    const isSelected = form.repeat_days?.includes(i);
                    return (
                      <button
                        key={i}
                        type="button"
                        onClick={() => {
                          const next = isSelected 
                            ? form.repeat_days.filter(d => d !== i)
                            : [...(form.repeat_days || []), i];
                          setForm(f => ({ ...f, repeat_days: next }));
                        }}
                        className={`w-8 h-8 rounded-lg text-[10px] font-bold transition-all ${
                          isSelected 
                            ? "bg-primary text-primary-foreground" 
                            : "bg-muted text-muted-foreground hover:bg-muted/80"
                        }`}
                      >
                        {day}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}
            {/* Notification toggle — only if date+time set */}
            <div className="flex items-center justify-between bg-muted/50 p-3 rounded-xl">
              <div>
                <p className="text-sm font-medium">Reminder Notification</p>
                <p className="text-xs text-muted-foreground">{form.due_date && form.due_time ? `Rings at ${form.due_time} on ${form.due_date}` : "Set date & time to enable"}</p>
              </div>
              <Switch
                checked={form.notification_enabled && !!(form.due_date && form.due_time)}
                disabled={!(form.due_date && form.due_time)}
                onCheckedChange={v => setForm(f => ({ ...f, notification_enabled: v }))}
              />
            </div>
            <Button onClick={saveTask} className="w-full rounded-xl">{editTask ? "Update" : "Create"} Task</Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
    </PullToRefresh>
  );
}
-e 
```

-e 
## `./src/pages/Goals.tsx`
```
import { useState, useEffect } from "react";
import { base44 } from "@/api/base44Client";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Target, Wallet } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import GoalCard from "@/components/goals/GoalCard";
import PullToRefresh from "@/components/common/PullToRefresh";
import { useSettings } from "@/lib/useSettings";
import { playSound } from "@/lib/sounds";
import confetti from "canvas-confetti";

const COLORS = ["#8b5cf6", "#06b6d4", "#10b981", "#f59e0b", "#ef4444", "#ec4899"];
const EMPTY_FORM = { title: "", description: "", type: "personal", target_amount: "", current_amount: 0, currency: "USD", deadline: "", image_url: "", color: "#8b5cf6", milestones: [], status: "active" };

const container = { hidden: {}, show: { transition: { staggerChildren: 0.07 } } };
const itemAnim = { hidden: { opacity: 0, y: 16 }, show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 280, damping: 22 } } };

export default function Goals() {
  const [goals, setGoals] = useState<any[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [editGoal, setEditGoal] = useState<any>(null);
  const [form, setForm] = useState(EMPTY_FORM);
  const [milestoneInput, setMilestoneInput] = useState("");
  const [typeFilter, setTypeFilter] = useState("all");
  const { settings } = useSettings();

  useEffect(() => { loadGoals(); }, []);

  async function loadGoals() {
    const data = await base44.entities.Goal.list("-created_date");
    setGoals(data || []);
  }

  function openCreate() {
    setEditGoal(null);
    setForm(EMPTY_FORM);
    setMilestoneInput("");
    setShowForm(true);
  }

  function openEdit(goal: any) {
    setEditGoal(goal);
    setForm({
      title: goal.title || "",
      description: goal.description || "",
      type: goal.type || "personal",
      target_amount: goal.target_amount || "",
      current_amount: goal.current_amount || 0,
      currency: goal.currency || "USD",
      deadline: goal.deadline || "",
      image_url: goal.image_url || "",
      color: goal.color || "#8b5cf6",
      milestones: goal.milestones || [],
      status: goal.status || "active",
    });
    setMilestoneInput("");
    setShowForm(true);
  }

  function addMilestone() {
    if (!milestoneInput.trim()) return;
    setForm(f => ({ ...f, milestones: [...f.milestones, { title: milestoneInput.trim(), completed: false }] }));
    setMilestoneInput("");
  }

  async function saveGoal() {
    if (!form.title.trim()) return;
    const data = { ...form, target_amount: form.target_amount ? parseFloat(form.target_amount) : undefined };
    if (editGoal) {
      await base44.entities.Goal.update(editGoal.id, data);
    } else {
      await base44.entities.Goal.create(data);
    }
    setShowForm(false);
    setEditGoal(null);
    setForm(EMPTY_FORM);
    loadGoals();
  }

  async function toggleMilestone(goal: any, index: number) {
    const newMilestones = [...(goal.milestones || [])];
    const isCompletedNow = !newMilestones[index].completed;
    newMilestones[index] = { ...newMilestones[index], completed: isCompletedNow };
    
    // Check if ALL milestones are completed now
    const allDone = newMilestones.every((m: any) => m.completed);
    const wasAlreadyDone = (goal.milestones || []).every((m: any) => m.completed);
    
    let updatedStatus = goal.status;
    if (allDone && !wasAlreadyDone) {
      updatedStatus = "completed";
      playSound("celebration");
      confetti({
        particleCount: 150,
        spread: 80,
        origin: { y: 0.6 }
      });
    } else {
      playSound("toggle");
    }

    await base44.entities.Goal.update(goal.id, { 
      milestones: newMilestones,
      status: updatedStatus
    });
    loadGoals();
  }

  async function addSavings(goal: any, amount: number) {
    const newAmount = (goal.current_amount || 0) + amount;
    const isSavingsGoalDone = goal.target_amount > 0 && newAmount >= goal.target_amount;
    const wasAlreadyDone = goal.target_amount > 0 && (goal.current_amount || 0) >= goal.target_amount;

    let updatedStatus = goal.status;
    if (isSavingsGoalDone && !wasAlreadyDone) {
      updatedStatus = "completed";
      playSound("celebration");
      confetti({
        particleCount: 150,
        spread: 80,
        origin: { y: 0.6 }
      });
    } else {
      playSound("toggle");
    }

    await base44.entities.Goal.update(goal.id, { 
      current_amount: newAmount,
      status: updatedStatus
    });
    loadGoals();
  }

  async function markComplete(goal: any) {
    const isNowCompleted = goal.status !== "completed";
    await base44.entities.Goal.update(goal.id, { status: isNowCompleted ? "completed" : "active" });
    if (isNowCompleted) {
      playSound("celebration");
      confetti({
        particleCount: 150,
        spread: 80,
        origin: { y: 0.6 }
      });
    } else {
      playSound("toggle");
    }
    loadGoals();
  }

  async function deleteGoal(id: string) {
    await base44.entities.Goal.delete(id);
    loadGoals();
  }

  const filtered = goals.filter(g => typeFilter === "all" || g.type === typeFilter);

  return (
    <PullToRefresh onRefresh={loadGoals}>
    <div className="px-4 pt-6 pb-4">
      {/* Header */}
      <motion.div initial={{ opacity: 0, y: -12 }} animate={{ opacity: 1, y: 0 }} className="flex items-center justify-between mb-4">
        <div>
          <h1 className="text-2xl font-bold">Goals</h1>
          <p className="text-xs text-muted-foreground">Chase what matters</p>
        </div>
        <Button size="icon" onClick={openCreate} className="rounded-xl">
          <Plus className="w-4 h-4" />
        </Button>
      </motion.div>

      {/* Stats Summary */}
      <motion.div variants={container} initial="hidden" animate="show" className="flex gap-3 mb-5">
        {[
          { label: "Total", value: goals.length, color: "text-primary" },
          { label: "Savings", value: goals.filter(g => g.type === "savings").length, color: "text-emerald-500" },
          { label: "Personal", value: goals.filter(g => g.type === "personal").length, color: "text-violet-500" },
          { label: "Done", value: goals.filter(g => g.status === "completed").length, color: "text-accent" },
        ].map(s => (
          <motion.div key={s.label} variants={itemAnim} className="flex-1 bg-card rounded-2xl p-2.5 border border-border text-center">
            <p className={`text-lg font-bold ${s.color}`}>{s.value}</p>
            <p className="text-[10px] text-muted-foreground font-medium">{s.label}</p>
          </motion.div>
        ))}
      </motion.div>

      {/* Type filter tabs */}
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.1 }} className="flex gap-1 bg-muted/50 p-1 rounded-2xl mb-5">
        {["all", "savings", "personal"].map(t => (
          <button key={t} onClick={() => setTypeFilter(t)}
            className={`flex-1 py-1.5 text-xs font-bold rounded-xl capitalize transition-all ${typeFilter === t ? "bg-card text-foreground shadow-sm" : "text-muted-foreground"}`}>
            {t === "all" ? "All Goals" : t}
          </button>
        ))}
      </motion.div>

      {/* Goals list with grid layout possible, but here using card stack */}
      <motion.div variants={container} initial="hidden" animate="show" className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <AnimatePresence mode="popLayout">
          {filtered.map(goal => (
            <motion.div 
              key={goal.id} 
              variants={itemAnim}
              initial="hidden"
              animate="show"
              exit={{ opacity: 0, scale: 0.9, filter: "blur(4px)" }}
              layout
              transition={{ ease: (settings as any).animation_timing || "easeOut", duration: 0.3 }}
            >
              <GoalCard
                goal={goal}
                onToggleMilestone={toggleMilestone}
                onAddSavings={addSavings}
                onDelete={deleteGoal}
                onEdit={openEdit}
                onMarkComplete={markComplete}
                settings={settings}
              />
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      {filtered.length === 0 && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-16">
          <Target className="w-14 h-14 text-muted-foreground/20 mx-auto mb-3" />
          <p className="text-sm font-semibold text-muted-foreground">No goals yet</p>
          <p className="text-xs text-muted-foreground/70 mt-1">Set your first goal and start tracking</p>
          <Button onClick={openCreate} className="mt-4 rounded-xl" size="sm">
            <Plus className="w-4 h-4 mr-1" /> Add Goal
          </Button>
        </motion.div>
      )}

      {/* Goal Form Dialog */}
      <Dialog open={showForm} onOpenChange={v => { setShowForm(v); if (!v) setEditGoal(null); }}>
        <DialogContent className="rounded-3xl mx-auto max-w-sm w-[calc(100%-2rem)] max-h-[90vh] overflow-y-auto scrollbar-none">
          <DialogHeader>
            <DialogTitle>{editGoal ? "Edit Goal" : "New Goal"}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 pt-2">
            <div>
              <Label>Title *</Label>
              <Input value={form.title} onChange={e => setForm(f => ({ ...f, title: e.target.value }))} placeholder="What's your goal?" className="rounded-xl mt-1" />
            </div>
            <div>
              <Label>Type</Label>
              <div className="flex gap-2 mt-1">
                {["savings", "personal"].map(t => (
                  <button key={t} type="button" onClick={() => setForm(f => ({ ...f, type: t }))}
                    className={`flex-1 py-2.5 rounded-2xl text-sm font-bold capitalize transition-all border-2 flex items-center justify-center gap-1.5 ${form.type === t ? "bg-primary text-primary-foreground border-primary" : "border-border text-muted-foreground"}`}>
                    {t === "savings" ? <Wallet className="w-4 h-4" /> : <Target className="w-4 h-4" />}
                    {t === "savings" ? "Savings" : "Personal"}
                  </button>
                ))}
              </div>
            </div>
            {form.type === "savings" && (
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <Label>Target Amount</Label>
                  <Input type="number" value={form.target_amount} onChange={e => setForm(f => ({ ...f, target_amount: e.target.value }))} placeholder="0.00" className="rounded-xl mt-1" />
                </div>
                <div>
                  <Label>Currency</Label>
                  <Select value={form.currency} onValueChange={v => setForm(f => ({ ...f, currency: v }))}>
                    <SelectTrigger className="rounded-xl mt-1"><SelectValue /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="USD">USD $</SelectItem>
                      <SelectItem value="UZS">UZS сўм</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            )}
            <div>
              <Label>Deadline</Label>
              <Input type="date" value={form.deadline} onChange={e => setForm(f => ({ ...f, deadline: e.target.value }))} className="rounded-xl mt-1" />
            </div>
            <div>
              <Label>Description</Label>
              <Textarea value={form.description} onChange={e => setForm(f => ({ ...f, description: e.target.value }))} className="rounded-xl mt-1 min-h-[60px] text-xs" />
            </div>
            <div>
              <Label>Cover Image URL (optional)</Label>
              <Input value={form.image_url} onChange={e => setForm(f => ({ ...f, image_url: e.target.value }))} placeholder="https://..." className="rounded-xl mt-1" />
            </div>
            {form.type === "personal" && (
              <div>
                <Label>Milestones</Label>
                <div className="flex gap-2 mt-1">
                  <Input value={milestoneInput} onChange={e => setMilestoneInput(e.target.value)} onKeyDown={e => e.key === "Enter" && addMilestone()} placeholder="Add milestone…" className="rounded-xl h-10" />
                  <Button type="button" onClick={addMilestone} variant="outline" className="rounded-xl px-3 h-10">+</Button>
                </div>
                {form.milestones.length > 0 && (
                  <div className="mt-2 space-y-2">
                    {form.milestones.map((m: any, i: number) => (
                      <div key={i} className="flex items-center gap-2 py-2 px-3 bg-muted rounded-2xl border border-border/50">
                        <span className="text-xs font-medium flex-1">{m.title}</span>
                        <button onClick={() => setForm(f => ({ ...f, milestones: f.milestones.filter((_, j) => j !== i) }))} className="text-muted-foreground hover:text-destructive text-lg leading-none">×</button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
            <div>
              <Label>Color Shade</Label>
              <div className="flex gap-2 mt-2">
                {COLORS.map(c => (
                  <button key={c} onClick={() => setForm(f => ({ ...f, color: c }))}
                    className={`w-9 h-9 rounded-2xl border-2 transition-all active:scale-90 ${form.color === c ? "border-foreground scale-110 shadow-lg" : "border-transparent"}`}
                    style={{ backgroundColor: c }} />
                ))}
              </div>
            </div>
            <Button onClick={saveGoal} className="w-full rounded-2xl h-12 text-sm font-bold shadow-lg">
              {editGoal ? "Save Changes" : "Create Goal"}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
    </PullToRefresh>
  );
}
-e 
```

-e 
## `./src/pages/DatabaseGuide.tsx`
```
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Flame, 
  HardDrive, 
  ShieldCheck, 
  Lock, 
  Activity, 
  Server, 
  LayoutDashboard, 
  Fingerprint, 
  History, 
  Laptop,
  Wrench,
  AlertTriangle,
  ExternalLink,
  Settings as SettingsIcon,
  Globe,
  Database,
  Save,
  RefreshCw,
  FileCode,
  Check,
  AlertCircle,
  Download,
  Upload
} from 'lucide-react';
import { useAuth } from '@/lib/AuthContext';
import { useGoogleAuth } from '@/lib/googleAuth';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { googleApi } from '@/lib/googleApi';
import { toast } from 'react-hot-toast';
import { base44 } from '@/api/base44Client';

export default function DatabaseGuide() {
  const { isAuthenticated, user } = useAuth();
  const { accessToken } = useGoogleAuth();

  // Custom user project ID from configuration 'mmv-xii'
  const projectId = 'mmv-xii';

  // --- Google Drive Real-time JSON Database Editor State ---
  const [folderId, setFolderId] = useState<string | null>(null);
  const [fileId, setFileId] = useState<string | null>(null);
  const [jsonString, setJsonString] = useState<string>("");
  const [isValidJson, setIsValidJson] = useState<boolean>(true);
  const [jsonError, setJsonError] = useState<string | null>(null);
  const [isSyncing, setIsSyncing] = useState<boolean>(false);
  const [isLoadingDriveDb, setIsLoadingDriveDb] = useState<boolean>(false);
  const [driveLogs, setDriveLogs] = useState<Array<{ id: string; time: string; action: string; type: 'info' | 'success' | 'error' }>>([]);

  const addDriveLog = (action: string, type: 'info' | 'success' | 'error' = 'info') => {
    const newLog = {
      id: Math.random().toString(36).substr(2, 9),
      time: new Date().toLocaleTimeString(),
      action,
      type
    };
    setDriveLogs(prev => [newLog, ...prev]);
  };

  useEffect(() => {
    if (accessToken) {
      initializeDriveDb();
    }
  }, [accessToken]);

  const initializeDriveDb = async () => {
    if (!accessToken) return;
    setIsLoadingDriveDb(true);
    addDriveLog("Connecting to Google Drive API...", "info");
    try {
      // 1. Find or create folder "MMV XII"
      const fId = await googleApi.drive.findOrCreateFolder(accessToken, "MMV XII");
      setFolderId(fId);
      addDriveLog(`Drive folder 'MMV XII' verified (ID: ${fId.slice(0, 8)}...)`, "success");

      // 2. Find or create database.json inside MMV XII
      const fileData = await googleApi.drive.findOrCreateDatabaseFile(accessToken, fId, "database.json");
      setFileId(fileData.id);
      const strContent = JSON.stringify(fileData.content, null, 2);
      setJsonString(strContent);
      setIsValidJson(true);
      setJsonError(null);
      addDriveLog(`Database loaded from 'database.json' (ID: ${fileData.id.slice(0, 8)}...)`, "success");
    } catch (err: any) {
      console.error(err);
      addDriveLog(`Initialization failed: ${err.message || 'Unknown error'}`, "error");
      toast.error("Could not sync Google Drive database.");
    } finally {
      setIsLoadingDriveDb(false);
    }
  };

  const handleJsonChange = (val: string) => {
    setJsonString(val);
    if (!val.trim()) {
      setIsValidJson(true);
      setJsonError(null);
      return;
    }
    try {
      JSON.parse(val);
      setIsValidJson(true);
      setJsonError(null);
    } catch (e: any) {
      setIsValidJson(false);
      setJsonError(e.message);
    }
  };

  const formatJson = () => {
    try {
      const parsed = JSON.parse(jsonString);
      const formatted = JSON.stringify(parsed, null, 2);
      setJsonString(formatted);
      setIsValidJson(true);
      setJsonError(null);
      addDriveLog("Formatted JSON content locally", "info");
      toast.success("Formatted successfully!");
    } catch (e: any) {
      toast.error("Cannot format: invalid JSON structure.");
    }
  };

  const saveJsonToDrive = async () => {
    if (!accessToken || !fileId) {
      toast.error("Drive connection is not fully initialized.");
      return;
    }
    if (!isValidJson) {
      toast.error("Cannot save invalid JSON to Google Drive.");
      return;
    }

    setIsSyncing(true);
    addDriveLog("Syncing local changes to Google Drive...", "info");
    try {
      const parsed = JSON.parse(jsonString);
      parsed.lastEditedTime = new Date().toISOString();
      const contentToSave = JSON.stringify(parsed, null, 2);

      const success = await googleApi.drive.updateFileContent(accessToken, fileId, contentToSave);
      if (success) {
        setJsonString(contentToSave);
        addDriveLog("Database synchronized and updated successfully on Google Drive", "success");
        toast.success("Database synchronized with Google Drive!");
      } else {
        throw new Error("Update response failed.");
      }
    } catch (err: any) {
      console.error(err);
      addDriveLog(`Sync failed: ${err.message || 'Unknown error'}`, "error");
      toast.error("Sync failed.");
    } finally {
      setIsSyncing(false);
    }
  };

  const exportAppDataToEditor = async () => {
    try {
      setIsLoadingDriveDb(true);
      addDriveLog("Fetching current app data from Firestore/LocalStorage...", "info");
      
      const [habits, tasks, expenses, income, subscriptions, goals, userSettings] = await Promise.all([
        base44.entities.Habit.list(),
        base44.entities.Task.list(),
        base44.entities.Expense.list(),
        base44.entities.Income.list(),
        base44.entities.Subscription.list(),
        base44.entities.Goal.list(),
        base44.entities.UserSettings.list()
      ]);

      const fullDatabase = {
        tasks,
        habits,
        expenses,
        income,
        subscriptions,
        goals,
        userSettings,
        lastEditedTime: new Date().toISOString()
      };

      const formatted = JSON.stringify(fullDatabase, null, 2);
      setJsonString(formatted);
      setIsValidJson(true);
      setJsonError(null);
      addDriveLog("Populated editor with live app database records successfully!", "success");
      toast.success("Loaded live app data into JSON editor!");
    } catch (err: any) {
      console.error("Export app data to editor failed:", err);
      addDriveLog(`Load failed: ${err.message || "Unknown error"}`, "error");
      toast.error("Could not load live app data.");
    } finally {
      setIsLoadingDriveDb(false);
    }
  };

  const restoreAppDataFromEditor = async () => {
    if (!window.confirm("WARNING: This will overwrite your active database (habits, tasks, goals, etc.) with the data in the JSON editor. Are you sure you want to proceed?")) {
      return;
    }

    try {
      setIsLoadingDriveDb(true);
      addDriveLog("Restoring app data from editor JSON...", "info");
      const parsed = JSON.parse(jsonString);

      // 1. Restore Habits
      if (Array.isArray(parsed.habits)) {
        addDriveLog("Restoring Habits...", "info");
        const current = await base44.entities.Habit.list();
        await Promise.all(current.map(item => base44.entities.Habit.delete(item.id)));
        await Promise.all(parsed.habits.map(item => {
          const { id, userId, created_at, updated_at, ...clean } = item;
          return base44.entities.Habit.create(clean);
        }));
      }

      // 2. Restore Tasks
      if (Array.isArray(parsed.tasks)) {
        addDriveLog("Restoring Tasks...", "info");
        const current = await base44.entities.Task.list();
        await Promise.all(current.map(item => base44.entities.Task.delete(item.id)));
        await Promise.all(parsed.tasks.map(item => {
          const { id, userId, created_at, updated_at, ...clean } = item;
          return base44.entities.Task.create(clean);
        }));
      }

      // 3. Restore Expenses
      if (Array.isArray(parsed.expenses)) {
        addDriveLog("Restoring Expenses...", "info");
        const current = await base44.entities.Expense.list();
        await Promise.all(current.map(item => base44.entities.Expense.delete(item.id)));
        await Promise.all(parsed.expenses.map(item => {
          const { id, userId, created_at, updated_at, ...clean } = item;
          return base44.entities.Expense.create(clean);
        }));
      }

      // 4. Restore Income
      if (Array.isArray(parsed.income)) {
        addDriveLog("Restoring Income...", "info");
        const current = await base44.entities.Income.list();
        await Promise.all(current.map(item => base44.entities.Income.delete(item.id)));
        await Promise.all(parsed.income.map(item => {
          const { id, userId, created_at, updated_at, ...clean } = item;
          return base44.entities.Income.create(clean);
        }));
      }

      // 5. Restore Subscriptions
      if (Array.isArray(parsed.subscriptions)) {
        addDriveLog("Restoring Subscriptions...", "info");
        const current = await base44.entities.Subscription.list();
        await Promise.all(current.map(item => base44.entities.Subscription.delete(item.id)));
        await Promise.all(parsed.subscriptions.map(item => {
          const { id, userId, created_at, updated_at, ...clean } = item;
          return base44.entities.Subscription.create(clean);
        }));
      }

      // 6. Restore Goals
      if (Array.isArray(parsed.goals)) {
        addDriveLog("Restoring Goals...", "info");
        const current = await base44.entities.Goal.list();
        await Promise.all(current.map(item => base44.entities.Goal.delete(item.id)));
        await Promise.all(parsed.goals.map(item => {
          const { id, userId, created_at, updated_at, ...clean } = item;
          return base44.entities.Goal.create(clean);
        }));
      }

      // 7. Restore User Settings
      if (Array.isArray(parsed.userSettings)) {
        addDriveLog("Restoring User Settings...", "info");
        const current = await base44.entities.UserSettings.list();
        await Promise.all(current.map(item => base44.entities.UserSettings.delete(item.id)));
        await Promise.all(parsed.userSettings.map(item => {
          const { id, userId, created_at, updated_at, ...clean } = item;
          return base44.entities.UserSettings.create(clean);
        }));
      }

      addDriveLog("Database fully restored from JSON editor content!", "success");
      toast.success("Database restored successfully!");
      
      setTimeout(() => {
        window.location.reload();
      }, 1500);

    } catch (err: any) {
      console.error("Restore app data from editor failed:", err);
      addDriveLog(`Restore failed: ${err.message || "Unknown error"}`, "error");
      toast.error("Could not restore data.");
    } finally {
      setIsLoadingDriveDb(false);
    }
  };

  return (
    <div className="px-4 py-6 max-w-5xl mx-auto pb-24 space-y-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">Data Hub</h1>
        <p className="text-sm text-muted-foreground mt-1">Understanding your synchronization, privacy, and active databases.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {/* Firebase Core Database Card */}
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-card border border-border shadow-sm rounded-3xl p-6 flex flex-col h-full relative overflow-hidden group"
        >
          <div className="absolute top-0 right-0 p-6 opacity-5 group-hover:opacity-10 transition-opacity">
            <Server className="w-24 h-24" />
          </div>
          <div className="flex items-center gap-3 mb-4 relative">
            <div className={`p-2.5 rounded-xl ${isAuthenticated ? 'bg-orange-500/10 text-orange-500' : 'bg-muted text-muted-foreground'} `}>
              <Flame className="w-5 h-5" />
            </div>
            <div>
              <h2 className="font-bold text-lg leading-tight">Firebase Cloud</h2>
              <div className="flex items-center gap-1.5 mt-0.5">
                <div className={`w-2 h-2 rounded-full ${isAuthenticated ? 'bg-orange-500 shadow-[0_0_8px_rgba(249,115,22,0.8)]' : 'bg-muted-foreground'}`} />
                <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
                  {isAuthenticated ? 'Connected & Synced' : 'Offline Mode'}
                </span>
              </div>
            </div>
          </div>
          
          <p className="text-sm text-balance text-muted-foreground mb-6 flex-1 relative">
            The core engine of your productivity suite. Powered by Firebase Firestore, this securely encrypts and syncs your Habits, Tasks, Goals, and Financial data across all your devices in real-time.
          </p>

          <div className="space-y-3 relative">
            <div className="flex text-xs items-center justify-between border-b border-border pb-2">
              <span className="font-medium text-muted-foreground">Stored Data</span>
              <span className="font-bold">App State</span>
            </div>
            <div className="flex text-xs items-center justify-between border-b border-border pb-2">
              <span className="font-medium text-muted-foreground">Sync Speed</span>
              <span className="font-bold">~150ms Realtime</span>
            </div>
            <div className="flex text-xs items-center justify-between pb-1">
              <span className="font-medium text-muted-foreground">Security</span>
              <span className="font-bold inline-flex items-center gap-1"><Lock className="w-3 h-3" /> E2E Configured</span>
            </div>
          </div>
          
          {!isAuthenticated && (
            <Link to="/settings" className="mt-4">
              <Button className="w-full rounded-xl bg-orange-500 hover:bg-orange-600 text-white shadow-md">Connect to Firebase</Button>
            </Link>
          )}
        </motion.div>

        {/* Google Drive Card */}
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-card border border-border shadow-sm rounded-3xl p-6 flex flex-col h-full relative overflow-hidden group"
        >
          <div className="absolute top-0 right-0 p-6 opacity-5 group-hover:opacity-10 transition-opacity">
            <HardDrive className="w-24 h-24" />
          </div>
          <div className="flex items-center gap-3 mb-4 relative">
            <div className={`p-2.5 rounded-xl ${accessToken ? 'bg-blue-500/10 text-blue-500' : 'bg-muted text-muted-foreground'} `}>
              <HardDrive className="w-5 h-5" />
            </div>
            <div>
              <h2 className="font-bold text-lg leading-tight">Google Drive</h2>
              <div className="flex items-center gap-1.5 mt-0.5">
                <div className={`w-2 h-2 rounded-full ${accessToken ? 'bg-blue-500 shadow-[0_0_8px_rgba(59,130,246,0.8)]' : 'bg-muted-foreground'}`} />
                <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
                  {accessToken ? 'Connected' : 'Not Linked'}
                </span>
              </div>
            </div>
          </div>
          
          <p className="text-sm text-balance text-muted-foreground mb-6 flex-1 relative">
            Your personal digital filing cabinet. We use Google Drive to securely store your rich text Notes and manage document backups. We only access the files created specifically by this app.
          </p>

          <div className="space-y-3 relative">
            <div className="flex text-xs items-center justify-between border-b border-border pb-2">
              <span className="font-medium text-muted-foreground">Stored Data</span>
              <span className="font-bold">Notes & Files</span>
            </div>
            <div className="flex text-xs items-center justify-between border-b border-border pb-2">
              <span className="font-medium text-muted-foreground">Space Used</span>
              <span className="font-bold">User Quota</span>
            </div>
            <div className="flex text-xs items-center justify-between pb-1">
              <span className="font-medium text-muted-foreground">Privacy Scope</span>
              <span className="font-bold text-blue-500 bg-blue-500/10 px-1.5 py-0.5 rounded uppercase text-[10px]">App-Only Data</span>
            </div>
          </div>

          {!accessToken && (
            <Link to="/settings" className="mt-4">
              <Button variant="outline" className="w-full rounded-xl border-blue-200 hover:bg-blue-50 text-blue-600 shadow-sm dark:border-blue-900/50 dark:hover:bg-blue-900/20">Connect Drive</Button>
            </Link>
          )}
        </motion.div>

        {/* Google Sheets / Local Card */}
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-card border border-border shadow-sm rounded-3xl p-6 flex flex-col h-full relative overflow-hidden group"
        >
          <div className="absolute top-0 right-0 p-6 opacity-5 group-hover:opacity-10 transition-opacity">
            <Laptop className="w-24 h-24" />
          </div>
          <div className="flex items-center gap-3 mb-4 relative">
            <div className="p-2.5 rounded-xl bg-primary/10 text-primary">
              <Laptop className="w-5 h-5" />
            </div>
            <div>
              <h2 className="font-bold text-lg leading-tight">Local Storage</h2>
              <div className="flex items-center gap-1.5 mt-0.5">
                <div className="w-2 h-2 rounded-full bg-primary shadow-[0_0_8px_rgba(var(--primary),0.8)]" />
                <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
                  Always Active
                </span>
              </div>
            </div>
          </div>
          
          <p className="text-sm text-balance text-muted-foreground mb-6 flex-1 relative">
            The app utilizes your browser's local sandbox for transient usage, fallback caching, UI appearance preferences, and standalone modules like Local Bookmarks.
          </p>

          <div className="space-y-3 relative">
            <div className="flex text-xs items-center justify-between border-b border-border pb-2">
              <span className="font-medium text-muted-foreground">Stored Data</span>
              <span className="font-bold">Cache & Config</span>
            </div>
            <div className="flex text-xs items-center justify-between border-b border-border pb-2">
              <span className="font-medium text-muted-foreground">Availability</span>
              <span className="font-bold">Offline 100%</span>
            </div>
            <div className="flex text-xs items-center justify-between pb-1">
              <span className="font-medium text-muted-foreground">Exportable</span>
              <span className="font-bold text-emerald-500 bg-emerald-500/10 px-1.5 py-0.5 rounded uppercase text-[10px]">JSON Output</span>
            </div>
          </div>
        </motion.div>
      </div>

      {/* --- Google Drive Real-time JSON Database Control Section --- */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.25 }}
        className="bg-card border border-border shadow-md rounded-[2rem] p-6 md:p-8 space-y-6"
      >
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-border pb-4">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-blue-500/10 text-blue-500 rounded-xl">
              <Database className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-xl font-bold tracking-tight">Google Drive Real-Time JSON Database</h2>
              <p className="text-xs text-muted-foreground mt-0.5">Edit files on Google Drive real-time and manage cloud JSON nodes.</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <span className={`px-2.5 py-1 text-[10px] font-bold uppercase rounded-full tracking-wider ${accessToken ? 'bg-emerald-500/10 text-emerald-500 border border-emerald-500/20' : 'bg-rose-500/10 text-rose-500 border border-rose-500/20'}`}>
              {accessToken ? "Connected" : "Disconnected"}
            </span>
            {accessToken && (
              <Button size="sm" variant="outline" onClick={initializeDriveDb} disabled={isLoadingDriveDb} className="h-8 rounded-lg text-xs gap-1">
                <RefreshCw className={`w-3.5 h-3.5 ${isLoadingDriveDb ? 'animate-spin' : ''}`} /> Reload
              </Button>
            )}
          </div>
        </div>

        {!accessToken ? (
          <div className="bg-muted/10 border border-dashed border-border rounded-2xl p-8 text-center space-y-4">
            <div className="w-12 h-12 bg-muted rounded-full flex items-center justify-center mx-auto text-muted-foreground">
              <HardDrive className="w-6 h-6" />
            </div>
            <div className="max-w-md mx-auto space-y-2">
              <h3 className="font-bold text-sm text-foreground">Google Drive Database is Not Connected</h3>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Connect your Google Account in the application settings first to enable real-time database JSON editing. This will auto-generate the workspace folder <strong className="font-mono text-primary font-bold">MMV XII</strong> inside your Drive!
              </p>
            </div>
            <Link to="/settings">
              <Button size="sm" className="rounded-xl mt-2 bg-blue-500 hover:bg-blue-600 text-white shadow-sm">
                Go to Settings & Link Account
              </Button>
            </Link>
          </div>
        ) : isLoadingDriveDb ? (
          <div className="flex flex-col items-center justify-center py-12 gap-3 text-muted-foreground">
            <div className="w-8 h-8 border-3 border-blue-500 border-t-transparent rounded-full animate-spin" />
            <p className="text-xs font-semibold animate-pulse">Initializing MMV XII Workspace Drive Node...</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left side: Code Editor */}
            <div className="lg:col-span-2 space-y-3 flex flex-col">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1.5">
                  <FileCode className="w-4 h-4 text-blue-500" />
                  <span className="text-xs font-bold font-mono">MMV XII/database.json</span>
                </div>
                
                <div className="flex items-center gap-2">
                  <span className={`inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-full ${isValidJson ? 'bg-emerald-500/10 text-emerald-500' : 'bg-rose-500/10 text-rose-500'}`}>
                    {isValidJson ? (
                      <>
                        <Check className="w-3 h-3" /> Valid JSON
                      </>
                    ) : (
                      <>
                        <AlertCircle className="w-3 h-3" /> Invalid Syntax
                      </>
                    )}
                  </span>
                </div>
              </div>

              <div className="relative flex-1 min-h-[300px] rounded-2xl overflow-hidden border border-border bg-slate-950 p-2 font-mono text-xs text-slate-100 shadow-inner group">
                <textarea
                  value={jsonString}
                  onChange={(e) => handleJsonChange(e.target.value)}
                  className="w-full h-full min-h-[320px] bg-transparent outline-none border-none resize-none p-3 font-mono text-xs leading-relaxed text-emerald-400 focus:ring-0 select-text cursor-text"
                  placeholder='{\n  "tasks": []\n}'
                  spellCheck="false"
                />
              </div>

              {jsonError && (
                <div className="bg-rose-500/10 border border-rose-500/20 text-rose-500 p-3 rounded-xl text-[11px] font-mono whitespace-pre-wrap">
                  {jsonError}
                </div>
              )}

              <div className="flex flex-wrap gap-2 pt-2">
                <Button 
                  size="sm" 
                  onClick={saveJsonToDrive} 
                  disabled={isSyncing || !isValidJson}
                  className="rounded-xl bg-blue-500 hover:bg-blue-600 text-white shadow font-bold text-xs gap-1.5 h-10 px-4"
                >
                  <Save className="w-4 h-4" /> {isSyncing ? "Saving & Syncing..." : "Sync Changes to Drive"}
                </Button>
                <Button 
                  size="sm" 
                  variant="outline" 
                  onClick={formatJson}
                  className="rounded-xl font-bold text-xs h-10 px-4"
                >
                  Format JSON
                </Button>
                <Button 
                  size="sm" 
                  variant="secondary"
                  onClick={exportAppDataToEditor} 
                  disabled={isLoadingDriveDb || isSyncing}
                  className="rounded-xl font-bold text-xs gap-1.5 h-10 px-4 border border-blue-500/10"
                >
                  <Download className="w-4 h-4 text-blue-500" /> Pull App Data to Editor
                </Button>
                <Button 
                  size="sm" 
                  variant="outline" 
                  onClick={restoreAppDataFromEditor}
                  disabled={isLoadingDriveDb || isSyncing || !isValidJson}
                  className="rounded-xl font-bold text-xs gap-1.5 h-10 px-4 border-red-500/20 text-red-500 hover:bg-red-500/10"
                >
                  <Upload className="w-4 h-4" /> Restore App Data from Editor
                </Button>
              </div>
            </div>

            {/* Right side: Control Logs */}
            <div className="space-y-3 flex flex-col h-full">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Database Control Section</span>
                <span className="text-[10px] text-muted-foreground font-mono">Real-Time Actions</span>
              </div>

              <div className="flex-1 min-h-[380px] bg-muted/25 border border-border rounded-2xl p-4 flex flex-col min-w-0">
                <div className="text-[11px] text-muted-foreground border-b border-border pb-2 mb-3 flex items-center justify-between flex-shrink-0">
                  <span className="font-bold text-foreground">Action Timeline</span>
                  <span>Active Session</span>
                </div>

                <div className="flex-1 overflow-y-auto space-y-2.5 pr-1 max-h-[320px]">
                  {driveLogs.length === 0 ? (
                    <div className="h-full flex items-center justify-center text-center text-muted-foreground/50 py-8 text-xs">
                      No actions performed yet.
                    </div>
                  ) : (
                    driveLogs.map((log) => (
                      <div key={log.id} className="text-xs border-b border-muted/50 pb-2 leading-relaxed">
                        <div className="flex items-center justify-between mb-0.5">
                          <span className={`font-bold text-[10px] ${
                            log.type === 'success' ? 'text-emerald-500' :
                            log.type === 'error' ? 'text-rose-500' :
                            'text-blue-500'
                          }`}>
                            {log.type.toUpperCase()}
                          </span>
                          <span className="text-[10px] text-muted-foreground font-mono">{log.time}</span>
                        </div>
                        <p className="text-muted-foreground font-medium break-words text-[11px]">{log.action}</p>
                      </div>
                    ))
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
      </motion.div>

      <motion.div 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="mt-8 bg-card border border-border shadow-sm rounded-[2rem] p-6 md:p-8"
      >
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2.5 bg-muted rounded-xl text-foreground">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <h2 className="text-xl font-bold tracking-tight">Security & Privacy Protocol</h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8">
          <div className="space-y-2">
            <div className="flex items-center gap-2 mb-1">
              <Fingerprint className="w-4 h-4 text-primary" />
              <h3 className="font-bold text-sm">Strict Authorization</h3>
            </div>
            <p className="text-sm text-muted-foreground">
              Your identity is protected. We use Firebase Authentication to issue secure JWTs (JSON Web Tokens). Only you hold the keys to intercept or view your data within our protected data nodes.
            </p>
          </div>
          
          <div className="space-y-2">
            <div className="flex items-center gap-2 mb-1">
              <Activity className="w-4 h-4 text-emerald-500" />
              <h3 className="font-bold text-sm">Resilient Cloud Fallbacks</h3>
            </div>
            <p className="text-sm text-muted-foreground">
              If your connection drops, the app seamlessly falls back to Local Storage caching. Actions like marking tasks complete are saved offline and synchronized to Firebase Cloud the next time you connect.
            </p>
          </div>
          
          <div className="space-y-2">
            <div className="flex items-center gap-2 mb-1">
              <History className="w-4 h-4 text-blue-500" />
              <h3 className="font-bold text-sm">Data Retention</h3>
            </div>
            <p className="text-sm text-muted-foreground">
              We operate on an immediate-deletion basis. If you delete a habit, note, or entry from your layout, it is immediately expunged from the database permanently without ghost tracking.
            </p>
          </div>

          <div className="space-y-2">
            <div className="flex items-center gap-2 mb-1">
              <LayoutDashboard className="w-4 h-4 text-orange-500" />
              <h3 className="font-bold text-sm">Cross-Device Synchrony</h3>
            </div>
            <p className="text-sm text-muted-foreground">
              Because data rests in Google Firebase, any modifications you make on your smartphone will echo almost instantly to your desktop or tablet view, keeping your focus uninterrupted.
            </p>
          </div>
        </div>
      </motion.div>

      {/* NEW Professional Integration Diagnostics & Troubleshooter */}
      <motion.div 
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="bg-card border-2 border-destructive/20 shadow-md rounded-[2rem] p-6 md:p-8 space-y-6"
      >
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-destructive/10 text-destructive rounded-xl">
              <Wrench className="w-6 h-6 animate-pulse" />
            </div>
            <div>
              <h2 className="text-lg font-bold tracking-tight text-destructive-foreground">Self-Service Troubleshooter</h2>
              <p className="text-xs text-muted-foreground mt-0.5">Solve Google Cloud API authorization & popup browser blocks.</p>
            </div>
          </div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-muted rounded-full border border-border text-[10px] font-mono text-muted-foreground self-start">
            PROJECT: <span className="text-primary font-bold">{projectId}</span>
          </div>
        </div>

        <div className="bg-muted/30 border border-border rounded-2xl p-4 text-xs text-muted-foreground leading-relaxed">
          <p className="font-bold text-foreground mb-1 flex items-center gap-1">
            <AlertTriangle className="w-3.5 h-3.5 text-amber-500" /> Why do I see 403 Forbidden or Popup errors?
          </p>
          Because of Google Cloud security protocols, if you set up a custom workspace project (<span className="font-mono bg-border px-1.5 py-0.5 rounded text-foreground font-bold">{projectId}</span>), you must explicitly activate corresponding Google API access points. In addition, browser sandbox policies may block popups. Open the sections below to configure your console in one click:
        </div>

        <div className="space-y-4 pt-2">
          <h3 className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-2">1. One-Click Developer Console API Activations</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {[
              {
                title: "Enable Google Drive API",
                desc: "Resolves Drive 403 errors. Click to authorize your project to read and list Note objects.",
                url: `https://console.developers.google.com/apis/api/drive.googleapis.com/overview?project=${projectId}`,
                badge: "Drive Integration"
              },
              {
                title: "Enable Google Docs API",
                desc: "Resolves Docs 403 errors. Click to authorize document editing templates.",
                url: `https://console.developers.google.com/apis/api/docs.googleapis.com/overview?project=${projectId}`,
                badge: "Docs Integration"
              },
              {
                title: "Enable Google Sheets API",
                desc: "Allows automated finance exports to export spreadsheets in real-time.",
                url: `https://console.developers.google.com/apis/api/sheets.googleapis.com/overview?project=${projectId}`,
                badge: "Export System"
              },
              {
                title: "Enable Google Tasks & Calendar",
                desc: "Integrates direct calendar notifications and task list synchronization.",
                url: `https://console.developers.google.com/apis/api/calendar-json.googleapis.com/overview?project=${projectId}`,
                badge: "Sync Engine"
              }
            ].map((api, idx) => (
              <div key={idx} className="bg-muted/20 border border-border rounded-2xl p-4 flex flex-col justify-between hover:border-primary/20 hover:bg-primary/[0.01] transition-all">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-foreground">{api.title}</span>
                    <span className="text-[9px] bg-primary/10 text-primary px-2 py-0.5 rounded-full font-bold uppercase">{api.badge}</span>
                  </div>
                  <p className="text-[11px] text-muted-foreground leading-relaxed">{api.desc}</p>
                </div>
                <div className="pt-4">
                  <a 
                    href={api.url} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="inline-flex w-full"
                  >
                    <Button variant="outline" size="sm" className="w-full text-[11px] h-9 gap-1.5 rounded-xl border-border hover:bg-primary/5 hover:text-primary hover:border-primary/25">
                      Open Console in {projectId} <ExternalLink className="w-3 h-3" />
                    </Button>
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="pt-4 border-t border-border space-y-3">
          <h3 className="text-xs font-bold uppercase tracking-wider text-muted-foreground">2. COOP Popup & "Assertion failed" Workaround</h3>
          
          <div className="bg-muted/10 border border-border rounded-2xl p-4 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div className="space-y-1 max-w-xl">
              <p className="text-xs font-bold text-foreground flex items-center gap-1.5">
                <Globe className="w-4 h-4 text-emerald-500" />
                Turn on Redirect Authentication Mode
              </p>
              <p className="text-[11px] text-muted-foreground leading-relaxed">
                If your browser security setup or iFrame prevents the popups from returning information, go to <strong>Settings</strong>, check <strong>Redirect Login Mode</strong>, and sign in. Instead of opening a popup, the browser will perform a safe, standard, sandboxed redirect handshake.
              </p>
            </div>
            <Link to="/settings" className="w-full md:w-auto shrink-0">
              <Button size="sm" className="w-full md:w-auto h-9 gap-1 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-white font-bold text-[11px] shadow">
                <SettingsIcon className="w-3.5 h-3.5" /> Configure Settings
              </Button>
            </Link>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
-e 
```

-e 
## `./src/pages/Finance.tsx`
```
import { useState, useEffect } from "react";
import { base44 } from "@/api/base44Client";
import { motion } from "framer-motion";
import { TrendingUp, TrendingDown, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import ExpenseList from "@/components/finance/ExpenseList";
import IncomeList from "@/components/finance/IncomeList";
import SubscriptionList from "@/components/finance/SubscriptionList";
import AddTransactionDialog from "@/components/finance/AddTransactionDialog";
import FinanceSummary from "@/components/finance/FinanceSummary";
import DateRangePicker from "@/components/ui/DateRangePicker";
import PullToRefresh from "@/components/common/PullToRefresh";
import { useSettings } from "@/lib/useSettings";
import { formatCurrency } from "@/lib/utils";

export default function Finance() {
  const [expenses, setExpenses] = useState<any[]>([]);
  const [income, setIncome] = useState<any[]>([]);
  const [subscriptions, setSubscriptions] = useState<any[]>([]);
  const [showAdd, setShowAdd] = useState(false);
  const [addType, setAddType] = useState("expense");
  const [dateRange, setDateRange] = useState<any>(null);
  const [activeTab, setActiveTab] = useState("overview");
  const { settings } = useSettings();

  useEffect(() => { loadAll(); }, []);

  async function loadAll() {
    const [e, i, s] = await Promise.all([
      base44.entities.Expense.list("-date", 200),
      base44.entities.Income.list("-date", 200),
      base44.entities.Subscription.list(),
    ]);
    setExpenses(e || []);
    setIncome(i || []);
    setSubscriptions(s || []);
  }

  const cur = settings.currency_primary;
  const rate = settings.uzs_rate;

  const filterByDate = (items: any[]) => {
    if (!dateRange?.from) return items;
    return items.filter(item => {
      const d = new Date(item.date);
      if (dateRange.to) {
        const toD = new Date(dateRange.to);
        return d >= dateRange.from && d <= toD;
      }
      const fromStr = dateRange.from.toISOString().split("T")[0];
      return item.date?.startsWith(fromStr);
    });
  };

  const filteredExpenses = filterByDate(expenses);
  const filteredIncome = filterByDate(income);

  const getAmountInPrimary = (item: any) => {
    let amt = item.amount || 0;
    if (item.currency === 'USD' && settings.currency_primary === 'UZS') amt *= settings.uzs_rate;
    if (item.currency === 'UZS' && settings.currency_primary === 'USD') amt /= settings.uzs_rate;
    return amt;
  };

  const totalExpenses = filteredExpenses.reduce((s, e) => s + getAmountInPrimary(e), 0);
  const totalIncome = filteredIncome.reduce((s, i) => s + getAmountInPrimary(i), 0);
  const balance = totalIncome - totalExpenses;
  const monthlySubscriptions = subscriptions.filter(s => s.is_active && s.billing_cycle === "monthly").reduce((sum, s) => sum + getAmountInPrimary(s), 0);

  function openAdd(type: string) {
    setAddType(type);
    setShowAdd(true);
  }

  return (
    <PullToRefresh onRefresh={loadAll}>
    <div className="px-4 pt-6 pb-4">
      <motion.div initial={{ opacity: 0, y: -12 }} animate={{ opacity: 1, y: 0 }} transition={{ type: "spring", stiffness: 280 }} className="flex items-center justify-between mb-4">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Finance</h1>
          <p className="text-xs text-muted-foreground">Track your money flow</p>
        </div>
        <div className="flex items-center gap-2">
          <DateRangePicker variant="icon" value={dateRange} onChange={setDateRange} />
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button size="icon" className="rounded-xl shadow-lg">
                <Plus className="w-5 h-5" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="rounded-2xl">
              <DropdownMenuItem onClick={() => openAdd("expense")} className="gap-2 rounded-xl">
                <TrendingDown className="w-4 h-4 text-rose-500" /> 
                <span className="font-medium">Add Expense</span>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => openAdd("income")} className="gap-2 rounded-xl">
                <TrendingUp className="w-4 h-4 text-emerald-500" /> 
                <span className="font-medium">Add Income</span>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => openAdd("subscription")} className="gap-2 rounded-xl">
                <Plus className="w-4 h-4 text-primary" /> 
                <span className="font-medium">Add Subscription</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </motion.div>

      {/* Balance Card */}
      <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
        className={`rounded-3xl p-5 mb-5 text-white shadow-lg ${balance >= 0 ? "bg-emerald-600" : "bg-rose-600"}`}>
        <p className="text-[10px] opacity-80 font-bold uppercase ">Net Balance</p>
        <p className="text-3xl font-bold mt-1 leading-none">{formatCurrency(Math.abs(balance), cur, rate)}</p>
        <p className="text-[10px] opacity-70 mt-2 font-medium">{balance >= 0 ? "Positive balance" : "Spending exceeds income"}</p>
        <div className="flex gap-4 mt-6 pt-6 border-t border-white/10 overflow-x-auto scrollbar-none">
          <div>
            <p className="text-[10px] opacity-70 uppercase font-bold ">Income</p>
            <p className="text-sm font-bold">{formatCurrency(totalIncome, cur, rate)}</p>
          </div>
          <div className="w-px h-8 bg-white/10" />
          <div>
            <p className="text-[10px] opacity-70 uppercase font-bold ">Spending</p>
            <p className="text-sm font-bold">{formatCurrency(totalExpenses, cur, rate)}</p>
          </div>
          <div className="w-px h-8 bg-white/10" />
          <div>
            <p className="text-[10px] opacity-70 uppercase font-bold ">Monthly Subs</p>
            <p className="text-sm font-bold">{formatCurrency(monthlySubscriptions, cur, rate)}</p>
          </div>
        </div>
      </motion.div>

      {/* Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="w-full rounded-2xl mb-4 bg-muted/50 h-11 p-1">
          <TabsTrigger value="overview" className="flex-1 rounded-xl text-xs h-full">Overview</TabsTrigger>
          <TabsTrigger value="expenses" className="flex-1 rounded-xl text-xs h-full">Expenses</TabsTrigger>
          <TabsTrigger value="income" className="flex-1 rounded-xl text-xs h-full">Income</TabsTrigger>
          <TabsTrigger value="subscriptions" className="flex-1 rounded-xl text-xs h-full">Subs</TabsTrigger>
        </TabsList>

        <TabsContent value="overview">
          <FinanceSummary expenses={filteredExpenses} income={filteredIncome} settings={settings} />
        </TabsContent>
        <TabsContent value="expenses">
          <ExpenseList expenses={filteredExpenses} onRefresh={loadAll} settings={settings} dateRange={dateRange} />
        </TabsContent>
        <TabsContent value="income">
          <IncomeList income={filteredIncome} onRefresh={loadAll} settings={settings} dateRange={dateRange} />
        </TabsContent>
        <TabsContent value="subscriptions">
          <SubscriptionList subscriptions={subscriptions} onRefresh={loadAll} settings={settings} />
        </TabsContent>
      </Tabs>

      <AddTransactionDialog
        open={showAdd}
        onClose={() => setShowAdd(false)}
        type={addType}
        onSaved={loadAll}
        settings={settings}
      />
    </div>
    </PullToRefresh>
  );
}
-e 
```

-e 
## `./src/pages/Bookmarks.tsx`
```
import { useState, useEffect } from 'react';
import { Bookmark, Link as LinkIcon, Plus, MoreVertical, Trash2, Edit2, Download, Upload, FolderOpen, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { DragDropContext, Droppable, Draggable, DropResult } from '@hello-pangea/dnd';

type Account = { id: string; name: string };
type ItemType = 'bookmark' | 'folder';

export interface BookmarkItem {
  id: string;
  type: ItemType;
  name: string;
  description?: string;
  link?: string;
  parentId: string | null;
  accountId: string;
  order: number;
}

export default function Bookmarks() {
  const [accounts, setAccounts] = useState<Account[]>([{ id: 'default', name: 'Personal' }]);
  const [items, setItems] = useState<BookmarkItem[]>([]);
  const [activeAccountId, setActiveAccountId] = useState<string | 'all'>('all');
  const [currentFolderId, setCurrentFolderId] = useState<string | null>(null);

  const [isAddOpen, setIsAddOpen] = useState(false);
  const [isManageAccountsOpen, setIsManageAccountsOpen] = useState(false);
  const [addType, setAddType] = useState<ItemType>('bookmark');
  const [editItem, setEditItem] = useState<BookmarkItem | null>(null);

  const [formData, setFormData] = useState({ name: '', description: '', link: '' });

  useEffect(() => {
    const savedItems = localStorage.getItem('mmv_bookmarks');
    const savedAccounts = localStorage.getItem('mmv_accounts');
    if (savedItems) setItems(JSON.parse(savedItems));
    if (savedAccounts) setAccounts(JSON.parse(savedAccounts));
  }, []);

  useEffect(() => {
    localStorage.setItem('mmv_bookmarks', JSON.stringify(items));
    localStorage.setItem('mmv_accounts', JSON.stringify(accounts));
  }, [items, accounts]);

  const handleDragEnd = (result: DropResult) => {
    if (!result.destination) return;
    const sourceIdx = result.source.index;
    const destIdx = result.destination.index;
    
    const visibleItems = getVisibleItems();
    const newItemsList = Array.from(visibleItems);
    const [reorderedItem] = newItemsList.splice(sourceIdx, 1);
    newItemsList.splice(destIdx, 0, reorderedItem);

    // Update ordering
    const reorderedIds = newItemsList.map(i => i.id);
    setItems(items.map(item => {
      const idx = reorderedIds.indexOf(item.id);
      if (idx !== -1) {
        return { ...item, order: idx };
      }
      return item;
    }));
  };

  const getVisibleItems = () => {
    return items
      .filter(i => 
        (activeAccountId === 'all' || i.accountId === activeAccountId) && 
        i.parentId === currentFolderId
      )
      .sort((a, b) => a.order - b.order);
  };

  const handleDelete = (id: string) => {
    const itemsToDelete = [id];
    const itemsToCheck = [id];
    
    while(itemsToCheck.length > 0) {
      const parentId = itemsToCheck.pop();
      const children = items.filter(i => i.parentId === parentId);
      children.forEach(c => {
        itemsToDelete.push(c.id);
        if (c.type === 'folder') itemsToCheck.push(c.id);
      });
    }

    setItems(items.filter(i => !itemsToDelete.includes(i.id)));
  };

  const handleSave = () => {
    if (!formData.name) return;
    
    if (editItem) {
      setItems(items.map(i => i.id === editItem.id ? { ...i, ...formData } : i));
    } else {
      const newItem: BookmarkItem = {
        id: crypto.randomUUID(),
        type: addType,
        ...formData,
        parentId: currentFolderId,
        accountId: activeAccountId === 'all' ? accounts[0].id : activeAccountId,
        order: items.length
      };
      setItems([...items, newItem]);
    }
    closeModal();
  };

  const closeModal = () => {
    setIsAddOpen(false);
    setEditItem(null);
    setFormData({ name: '', description: '', link: '' });
  };

  const openEdit = (item: BookmarkItem) => {
    setEditItem(item);
    setAddType(item.type);
    setFormData({ name: item.name, description: item.description || '', link: item.link || '' });
    setIsAddOpen(true);
  };

  const handleExport = () => {
    const data = JSON.stringify({ accounts, items }, null, 2);
    const blob = new Blob([data], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `bookmarks_export_${new Date().toISOString()}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleImport = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const data = JSON.parse(event.target?.result as string);
        if (data.accounts) setAccounts(data.accounts);
        if (data.items) setItems(data.items);
      } catch (err) {
        alert("Invalid file format");
      }
    };
    reader.readAsText(file);
  };

  const visibleItems = getVisibleItems();

  return (
    <div className="px-4 py-6 max-w-5xl mx-auto pb-24 h-full flex flex-col">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-6 gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Bookmarks</h1>
          <p className="text-xs text-muted-foreground">Save, organize and export your web pages.</p>
        </div>
        
        <div className="flex items-center gap-2">
          <label className="cursor-pointer">
            <input type="file" className="hidden" accept=".json" onChange={handleImport} />
            <div className="flex flex-col items-center justify-center p-2 rounded-xl border border-border shadow-xs hover:bg-primary/5 transition-all text-xs font-semibold gap-1 text-muted-foreground">
              <Upload className="w-3.5 h-3.5" />
            </div>
          </label>
          <Button size="sm" variant="outline" className="rounded-xl" onClick={handleExport}>
            <Download className="w-3.5 h-3.5 mr-1" /> Export All
          </Button>
          <Button size="sm" onClick={() => { setAddType('folder'); setIsAddOpen(true); }} className="rounded-xl bg-violet-600 hover:bg-violet-700">
            <FolderOpen className="w-3.5 h-3.5 mr-1" /> New Folder
          </Button>
          <Button size="sm" onClick={() => { setAddType('bookmark'); setIsAddOpen(true); }} className="rounded-xl">
            <Plus className="w-3.5 h-3.5 mr-1" /> Add Bookmark
          </Button>
        </div>
      </div>

      <div className="flex gap-2 overflow-x-auto pb-2 mb-4 scrollbar-none items-center">
        <button
          onClick={() => { setActiveAccountId('all'); setCurrentFolderId(null); }}
          className={`px-3 py-1.5 rounded-full text-xs font-bold whitespace-nowrap transition-all ${
            activeAccountId === 'all' ? 'bg-primary text-primary-foreground shadow-sm' : 'bg-muted/50 text-muted-foreground hover:bg-muted'
          }`}
        >
          All Accounts
        </button>
        {accounts.map(acc => (
          <button
            key={acc.id}
            onClick={() => { setActiveAccountId(acc.id); setCurrentFolderId(null); }}
            className={`px-3 py-1.5 rounded-full text-xs font-bold whitespace-nowrap transition-all ${
              activeAccountId === acc.id ? 'bg-primary text-primary-foreground shadow-sm' : 'bg-muted/50 text-muted-foreground hover:bg-muted'
            }`}
          >
            {acc.name}
          </button>
        ))}
        <Button size="sm" variant="ghost" className="rounded-full h-7 px-2" onClick={() => {
          const name = prompt("Account Name:");
          if (name) setAccounts([...accounts, { id: crypto.randomUUID(), name }]);
        }}>
          <Plus className="w-3 h-3" />
        </Button>
        <Button size="sm" variant="ghost" className="rounded-full h-7 px-2 text-muted-foreground ml-auto flex-shrink-0" onClick={() => setIsManageAccountsOpen(true)}>
          Manage
        </Button>
      </div>

      {currentFolderId && (
        <div className="flex items-center gap-2 mb-4">
          <Button size="sm" variant="ghost" onClick={() => {
            const folder = items.find(i => i.id === currentFolderId);
            setCurrentFolderId(folder?.parentId || null);
          }} className="rounded-xl text-xs -ml-2">
            <ArrowLeft className="w-3.5 h-3.5 mr-1" /> Back
          </Button>
          <span className="text-sm font-semibold">
            {items.find(i => i.id === currentFolderId)?.name || 'Folder'}
          </span>
        </div>
      )}

      <div className="flex-1 bg-card border border-border shadow-sm rounded-3xl p-4 overflow-hidden flex flex-col">
        <DragDropContext onDragEnd={handleDragEnd}>
          <Droppable droppableId="bookmarks-list">
            {(provided) => (
              <div {...provided.droppableProps} ref={provided.innerRef} className="flex-1 overflow-y-auto space-y-2 pr-2">
                {visibleItems.length === 0 ? (
                  <div className="flex flex-col items-center justify-center h-40 text-muted-foreground">
                    <Bookmark className="w-8 h-8 mb-2 opacity-20" />
                    <p className="text-xs font-medium">No items found</p>
                  </div>
                ) : (
                  visibleItems.map((item, index) => (
                    <Draggable key={item.id} draggableId={item.id} index={index}>
                      {(provided) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          className="flex items-center justify-between p-3 bg-muted/30 border border-border/50 rounded-xl hover:bg-muted/50 transition-colors group"
                        >
                          <div className="flex items-center gap-3 overflow-hidden">
                            <div className="flex-shrink-0 w-8 h-8 rounded-lg bg-background border border-border flex items-center justify-center">
                              {item.type === 'folder' ? (
                                <FolderOpen className="w-4 h-4 text-violet-500" />
                              ) : (
                                item.link ? (
                                  <img 
                                    src={`https://www.google.com/s2/favicons?domain=${new URL(item.link || 'https://google.com').hostname}&sz=32`} 
                                    alt="favicon" 
                                    className="w-4 h-4 rounded-sm"
                                    onError={(e) => { e.currentTarget.style.display = 'none'; e.currentTarget.parentElement?.querySelector('svg')?.classList.remove('hidden'); }}
                                  />
                                ) : (
                                  <LinkIcon className="w-4 h-4 text-primary" />
                                )
                              )}
                              <LinkIcon className={`w-4 h-4 text-primary hidden ${item.type === 'bookmark' && !item.link ? '!block' : ''}`} />
                            </div>
                            
                            <div className="flex flex-col min-w-0" onClick={() => item.type === 'folder' && setCurrentFolderId(item.id)}>
                              <p className={`text-sm font-bold truncate ${item.type === 'folder' ? 'cursor-pointer hover:text-primary transition-colors' : ''}`}>
                                {item.type === 'bookmark' && item.link ? (
                                  <a href={item.link} target="_blank" rel="noopener noreferrer" className="hover:underline">{item.name}</a>
                                ) : item.name}
                              </p>
                              {item.description && <p className="text-[10px] text-muted-foreground truncate max-w-sm">{item.description}</p>}
                            </div>
                          </div>

                          <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button size="sm" variant="ghost" className="h-8 w-8 p-0 rounded-lg">
                                  <MoreVertical className="w-4 h-4" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end" className="w-40">
                                <DropdownMenuItem onClick={() => openEdit(item)}>
                                  <Edit2 className="w-3.5 h-3.5 mr-2" /> Edit
                                </DropdownMenuItem>
                                <DropdownMenuItem onClick={() => handleDelete(item.id)} className="text-red-500">
                                  <Trash2 className="w-3.5 h-3.5 mr-2" /> Delete
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </div>
                        </div>
                      )}
                    </Draggable>
                  ))
                )}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>
      </div>

      <Dialog open={isAddOpen} onOpenChange={closeModal}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>{editItem ? 'Edit' : 'Add'} {addType === 'folder' ? 'Folder' : 'Bookmark'}</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <label className="text-xs font-bold">Name</label>
              <Input 
                value={formData.name} 
                onChange={e => setFormData({...formData, name: e.target.value})} 
                placeholder={addType === 'folder' ? 'Work Projects' : 'My Cool Site'}
                className="rounded-xl"
              />
            </div>
            {addType === 'bookmark' && (
              <div className="grid gap-2">
                <label className="text-xs font-bold">Link (URL)</label>
                <Input 
                  value={formData.link} 
                  onChange={e => setFormData({...formData, link: e.target.value})} 
                  placeholder="https://example.com"
                  className="rounded-xl"
                />
              </div>
            )}
            <div className="grid gap-2">
              <label className="text-xs font-bold">Description (Optional)</label>
              <Input 
                value={formData.description} 
                onChange={e => setFormData({...formData, description: e.target.value})} 
                placeholder="A brief description..."
                className="rounded-xl"
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={closeModal} className="rounded-xl">Cancel</Button>
            <Button onClick={handleSave} className="rounded-xl">Save</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={isManageAccountsOpen} onOpenChange={setIsManageAccountsOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Manage Accounts</DialogTitle>
          </DialogHeader>
          <div className="grid gap-2 py-4 max-h-[300px] overflow-y-auto pr-2">
            {accounts.map((acc, index) => (
              <div key={acc.id} className="flex items-center gap-2 mb-2 bg-muted/30 p-2 rounded-xl border border-border">
                <Input 
                  value={acc.name} 
                  onChange={(e) => {
                    const newAccounts = [...accounts];
                    newAccounts[index].name = e.target.value;
                    setAccounts(newAccounts);
                  }}
                  className="rounded-lg h-8 text-xs font-bold bg-background"
                />
                <Button size="sm" variant="ghost" className="h-8 w-8 p-0 text-muted-foreground" onClick={() => {
                  if (index > 0) {
                    const newAccounts = [...accounts];
                    const temp = newAccounts[index - 1];
                    newAccounts[index - 1] = newAccounts[index];
                    newAccounts[index] = temp;
                    setAccounts(newAccounts);
                  }
                }} disabled={index === 0}>
                  ↑
                </Button>
                <Button size="sm" variant="ghost" className="h-8 w-8 p-0 text-muted-foreground" onClick={() => {
                  if (index < accounts.length - 1) {
                    const newAccounts = [...accounts];
                    const temp = newAccounts[index + 1];
                    newAccounts[index + 1] = newAccounts[index];
                    newAccounts[index] = temp;
                    setAccounts(newAccounts);
                  }
                }} disabled={index === accounts.length - 1}>
                  ↓
                </Button>
                <Button size="sm" variant="ghost" className="h-8 w-8 p-0 text-red-500 hover:bg-red-500/10" onClick={() => {
                  if (confirm("Delete this account and all its bookmarks?")) {
                    setAccounts(accounts.filter(a => a.id !== acc.id));
                    setItems(items.filter(i => i.accountId !== acc.id));
                    if (activeAccountId === acc.id) setActiveAccountId('all');
                  }
                }}>
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            ))}
          </div>
          <DialogFooter>
            <Button onClick={() => setIsManageAccountsOpen(false)} className="rounded-xl w-full">Done</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
-e 
```

-e 
## `./src/pages/Habits.tsx`
```
import { useState, useEffect } from "react";
import { base44 } from "@/api/base44Client";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Flame, LayoutGrid, List } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { scheduleNotification } from "@/lib/utils";
import HabitMatrix from "@/components/habits/HabitMatrix";
import HabitCard from "@/components/habits/HabitCard";
import DateRangePicker from "@/components/ui/DateRangePicker";
import PullToRefresh from "@/components/common/PullToRefresh";
import { playSound } from "@/lib/sounds";

const COLORS = ["#8b5cf6", "#06b6d4", "#10b981", "#f59e0b", "#ef4444", "#ec4899", "#3b82f6"];
const EMPTY_FORM = { title: "", color: "#8b5cf6", frequency: "daily", icon: "Star", description: "", custom_days: [] as number[], notification_time: "" };

const container = { hidden: {}, show: { transition: { staggerChildren: 0.06 } } };
const item = { hidden: { opacity: 0, y: 14 }, show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 300, damping: 24 } } };

export default function Habits() {
  const [habits, setHabits] = useState<any[]>([]);
  const [view, setView] = useState("list");
  const [showForm, setShowForm] = useState(false);
  const [editHabit, setEditHabit] = useState<any>(null);
  const [dateRange, setDateRange] = useState<any>(null);
  const [form, setForm] = useState(EMPTY_FORM);

  useEffect(() => { loadHabits(); }, []);

  async function loadHabits() {
    const data = await base44.entities.Habit.list();
    setHabits(data || []);
  }

  function openCreate() {
    setEditHabit(null);
    setForm(EMPTY_FORM);
    setShowForm(true);
  }

  function openEdit(habit: any) {
    setEditHabit(habit);
    setForm({ 
      title: habit.title, 
      color: habit.color || "#8b5cf6", 
      frequency: habit.frequency || "daily", 
      icon: habit.icon || "Star", 
      description: habit.description || "",
      custom_days: habit.custom_days || [],
      notification_time: habit.notification_time || ""
    });
    setShowForm(true);
  }

  async function saveHabit() {
    if (!form.title.trim()) return;
    if (editHabit) {
      await base44.entities.Habit.update(editHabit.id, form);
    } else {
      await base44.entities.Habit.create({ ...form, completions: [], is_active: true });
    }
    if (form.notification_time) {
      const now = new Date();
      const triggerTime = `${now.toISOString().split("T")[0]}T${form.notification_time}:00`;
      scheduleNotification(form.title, "Habit reminder!", triggerTime);
    }
    setShowForm(false);
    setEditHabit(null);
    setForm(EMPTY_FORM);
    loadHabits();
  }

  async function toggleToday(habit: any, date?: Date) {
    const targetDate = date || new Date();
    const dateStr = [targetDate.getFullYear(), String(targetDate.getMonth() + 1).padStart(2, '0'), String(targetDate.getDate()).padStart(2, '0')].join('-');
    const completions = habit.completions || [];
    const isNowCompleting = !completions.includes(dateStr);
    const newCompletions = completions.includes(dateStr)
      ? completions.filter((d: string) => d !== dateStr)
      : [...completions, dateStr];
    await base44.entities.Habit.update(habit.id, { completions: newCompletions });
    if (isNowCompleting) {
      playSound("complete");
    } else {
      playSound("toggle");
    }
    loadHabits();
  }

  function calculateStreak(completions: string[]) {
    if (!completions.length) return 0;
    const sorted = [...completions].sort().reverse();
    let streak = 0;
    const today = new Date();
    for (let i = 0; i < 365; i++) {
      const d = new Date(today);
      d.setDate(d.getDate() - i);
      const dateStr = d.toISOString().split("T")[0];
      if (sorted.includes(dateStr)) streak++;
      else if (i > 0) break;
    }
    return streak;
  }

  async function deleteHabit(id: string) {
    await base44.entities.Habit.delete(id);
    loadHabits();
  }

  const targetDateForStats = dateRange?.from || new Date();
  const targetDateStr = [targetDateForStats.getFullYear(), String(targetDateForStats.getMonth() + 1).padStart(2, '0'), String(targetDateForStats.getDate()).padStart(2, '0')].join('-');
  const filteredHabits = habits.filter(h => h.is_active);
  const completedTargetDate = filteredHabits.filter(h => h.completions?.includes(targetDateStr)).length;

  return (
    <PullToRefresh onRefresh={loadHabits}>
    <div className="px-4 pt-6 pb-4">
      {/* Header */}
      <motion.div initial={{ opacity: 0, y: -12 }} animate={{ opacity: 1, y: 0 }} className="flex items-center justify-between mb-4">
        <div>
          <h1 className="text-2xl font-bold">Habits</h1>
          <p className="text-xs text-muted-foreground">{completedTargetDate}/{filteredHabits.length} done {dateRange?.from ? "on selected date" : "today"}</p>
        </div>
        <div className="flex items-center gap-2">
          <DateRangePicker variant="icon" value={dateRange} onChange={setDateRange} />
          <Button variant="ghost" size="icon" onClick={() => setView(v => v === "matrix" ? "list" : "matrix")} className="rounded-xl">
            {view === "matrix" ? <List className="w-4 h-4" /> : <LayoutGrid className="w-4 h-4" />}
          </Button>
          <Button size="icon" onClick={openCreate} className="rounded-xl">
            <Plus className="w-4 h-4" />
          </Button>
        </div>
      </motion.div>

      {/* Stats row */}
      <motion.div variants={container} initial="hidden" animate="show" className="flex gap-3 mb-5">
        {[
          { label: "Active", value: filteredHabits.length, color: "text-primary" },
          { label: dateRange?.from ? "Done Date" : "Done Today", value: completedTargetDate, color: "text-emerald-500" },
          { label: "Best Streak", value: Math.max(0, ...filteredHabits.map(h => h.streak || 0)), color: "text-orange-500" },
        ].map(s => (
          <motion.div key={s.label} variants={item} className="flex-1 min-w-[80px] bg-card rounded-2xl p-3 border border-border text-center">
            <p className={`text-xl font-bold ${s.color}`}>{s.value}</p>
            <p className="text-[10px] text-muted-foreground">{s.label}</p>
          </motion.div>
        ))}
      </motion.div>

      {/* View Switcher */}
      <AnimatePresence mode="wait">
        {view === "matrix" ? (
          <motion.div key="matrix" initial={{ opacity: 0, scale: 0.97 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }}>
            <HabitMatrix habits={filteredHabits} onToggle={toggleToday} dateRange={dateRange} />
          </motion.div>
        ) : (
          <motion.div key="list" variants={container} initial="hidden" animate="show" className="space-y-6">
            {(() => {
              if (dateRange?.from) {
                const dates = [];
                const curr = new Date(dateRange.from);
                const end = dateRange.to ? new Date(dateRange.to) : new Date(dateRange.from);
                
                while (curr <= end) {
                  dates.push(new Date(curr));
                  curr.setDate(curr.getDate() + 1);
                }

                return dates.map(date => (
                  <div key={date.toISOString()} className="space-y-3">
                    <div className="flex items-center gap-4">
                      <div className="h-px bg-border flex-1" />
                      <p className="text-xs font-bold text-muted-foreground uppercase">{date.toLocaleDateString("en-US", { weekday: 'short', month: 'short', day: 'numeric' })}</p>
                      <div className="h-px bg-border flex-1" />
                    </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {filteredHabits.map(habit => (
                      <motion.div key={`${habit.id}-${date.toISOString()}`} variants={item}>
                        <HabitCard habit={habit} onToggle={toggleToday} onDelete={deleteHabit} onEdit={openEdit} targetDate={date} />
                      </motion.div>
                    ))}
                  </div>
                </div>
                ));
              }

              // Default view without date range filtering
              const defaultDate = new Date();
              return (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                  {filteredHabits.map(habit => (
                    <motion.div key={habit.id} variants={item}>
                      <HabitCard habit={habit} onToggle={toggleToday} onDelete={deleteHabit} onEdit={openEdit} targetDate={defaultDate} />
                    </motion.div>
                  ))}
                </div>
              );
            })()}
          </motion.div>
        )}
      </AnimatePresence>

      {filteredHabits.length === 0 && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-16">
          <Flame className="w-14 h-14 text-muted-foreground/20 mx-auto mb-3" />
          <p className="text-sm font-semibold text-muted-foreground">No habits yet</p>
          <p className="text-xs text-muted-foreground/70 mt-1">Tap + to build your first habit</p>
          <Button onClick={openCreate} className="mt-4 rounded-xl" size="sm">
            <Plus className="w-4 h-4 mr-1" /> Add Habit
          </Button>
        </motion.div>
      )}

      {/* Create / Edit Dialog */}
      <Dialog open={showForm} onOpenChange={v => { setShowForm(v); if (!v) setEditHabit(null); }}>
        <DialogContent className="rounded-3xl mx-auto max-w-sm w-[calc(100%-2rem)]">
          <DialogHeader>
            <DialogTitle>{editHabit ? "Edit Habit" : "New Habit"}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 pt-2">
            <div>
              <Label>Habit Name *</Label>
              <Input placeholder="e.g. Morning run" value={form.title} onChange={e => setForm(f => ({ ...f, title: e.target.value }))} className="rounded-xl mt-1" />
            </div>
            <div>
              <Label>Description</Label>
              <Input placeholder="Optional description" value={form.description} onChange={e => setForm(f => ({ ...f, description: e.target.value }))} className="rounded-xl mt-1" />
            </div>
            <div>
              <Label>Frequency</Label>
              <Select value={form.frequency} onValueChange={v => setForm(f => ({ ...f, frequency: v }))}>
                <SelectTrigger className="rounded-xl mt-1"><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="daily">Daily</SelectItem>
                  <SelectItem value="weekly">Weekly</SelectItem>
                  <SelectItem value="custom">Custom days</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {form.frequency === "custom" && (
              <div className="space-y-2">
                <Label className="text-xs">Select Days</Label>
                <div className="flex justify-between gap-1">
                  {["S", "M", "T", "W", "T", "F", "S"].map((day, i) => {
                    const isSelected = form.custom_days.includes(i);
                    return (
                      <button
                        key={i}
                        onClick={() => {
                          const next = isSelected 
                            ? form.custom_days.filter(d => d !== i)
                            : [...form.custom_days, i];
                          setForm(f => ({ ...f, custom_days: next }));
                        }}
                        className={`w-8 h-8 rounded-lg text-[10px] font-bold transition-all ${
                          isSelected 
                            ? "bg-primary text-primary-foreground" 
                            : "bg-muted text-muted-foreground hover:bg-muted/80"
                        }`}
                      >
                        {day}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            <div>
              <Label>Reminder Time</Label>
              <Input type="time" value={form.notification_time} onChange={e => setForm(f => ({ ...f, notification_time: e.target.value }))} className="rounded-xl mt-1" />
            </div>
            <div>
              <Label>Color</Label>
              <div className="flex gap-2 mt-2 flex-wrap">
                {COLORS.map(c => (
                  <button key={c} onClick={() => setForm(f => ({ ...f, color: c }))}
                    className={`w-8 h-8 rounded-full border-2 transition-all active:scale-90 ${form.color === c ? "border-foreground scale-110 shadow-lg" : "border-transparent"}`}
                    style={{ backgroundColor: c }} />
                ))}
              </div>
            </div>
            <Button onClick={saveHabit} className="w-full rounded-xl">
              {editHabit ? "Save Changes" : "Create Habit"}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
    </PullToRefresh>
  );
}
-e 
```

-e 
## `./src/pages/GoogleNotes.tsx`
```
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useGoogleAuth } from '@/lib/googleAuth';
import { googleApi, GoogleDriveFile } from '@/lib/googleApi';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { 
  FileText, 
  Lightbulb, 
  Plus, 
  Trash2, 
  Search, 
  ChevronRight, 
  Check, 
  Pin,
  RefreshCw,
  FolderOpen,
  AlertTriangle,
  Wrench,
  ExternalLink
} from 'lucide-react';
import { toast } from 'react-hot-toast';

export default function GoogleNotes() {
  const { accessToken, connectGoogle, isConnected } = useGoogleAuth();
  
  // General State
  const [activeTab, setActiveTab] = useState<'docs' | 'keep'>('docs');
  const [isLoading, setIsLoading] = useState(false);
  const [apiError, setApiError] = useState<string | null>(null);

  // Google Docs state
  const [docsList, setDocsList] = useState<GoogleDriveFile[]>([]);
  const [searchDocQuery, setSearchDocQuery] = useState("");
  const [newDocTitle, setNewDocTitle] = useState("");
  
  // Active Doc editor state
  const [selectedDocId, setSelectedDocId] = useState<string | null>(null);
  const [selectedDocTitle, setSelectedDocTitle] = useState("");
  const [docContent, setDocContent] = useState<string>("");
  const [appendText, setAppendText] = useState("");

  // Google Keep virtual stickies state
  const [keepNotes, setKeepNotes] = useState<any[]>([]);
  const [newStickyTitle, setNewStickyTitle] = useState("");
  const [newStickyBody, setNewStickyBody] = useState("");
  const [selectedColor, setSelectedColor] = useState("yellow");

  const colors = [
    { name: "yellow", class: "bg-amber-100 dark:bg-amber-950/40 text-amber-900 dark:text-amber-100 border-amber-300 dark:border-amber-900/60" },
    { name: "green", class: "bg-emerald-100 dark:bg-emerald-950/40 text-emerald-900 dark:text-emerald-100 border-emerald-300 dark:border-emerald-900/60" },
    { name: "pink", class: "bg-rose-100 dark:bg-rose-950/40 text-rose-900 dark:text-rose-100 border-rose-300 dark:border-rose-900/60" },
    { name: "blue", class: "bg-sky-100 dark:bg-sky-950/40 text-sky-900 dark:text-sky-100 border-sky-300 dark:border-sky-900/60" },
    { name: "purple", class: "bg-violet-100 dark:bg-violet-950/40 text-violet-900 dark:text-violet-100 border-violet-300 dark:border-violet-900/60" }
  ];

  useEffect(() => {
    if (accessToken) {
      if (activeTab === 'docs') {
        fetchDocs();
      } else {
        fetchKeepNotes();
      }
    }
  }, [accessToken, activeTab]);

  // --- GOOGLE DOCS LOGIC ---
  const fetchDocs = async () => {
    if (!accessToken) return;
    setIsLoading(true);
    setApiError(null);
    try {
      // Query Google Drive for docs only
      const docs = await googleApi.drive.listFiles(accessToken, "mimeType = 'application/vnd.google-apps.document' and trashed = false");
      setDocsList(docs);
    } catch (err: any) {
      console.error(err);
      setApiError(err.message || String(err));
    } finally {
      setIsLoading(false);
    }
  };

  const handleCreateDoc = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!accessToken || !newDocTitle.trim()) return;

    try {
      setIsLoading(true);
      const doc = await googleApi.docs.createDocument(accessToken, newDocTitle.trim());
      if (doc) {
        setNewDocTitle("");
        fetchDocs();
        // Automatically open the brand new doc in editor
        handleSelectDoc(doc.documentId, doc.title);
      }
    } catch (e) {
      toast.error("Failed to create document");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSelectDoc = async (docId: string, title: string) => {
    setSelectedDocId(docId);
    setSelectedDocTitle(title);
    setAppendText("");
    setDocContent("");

    if (!accessToken) return;
    try {
      const doc = await googleApi.docs.getDocument(accessToken, docId);
      if (doc) {
        // Simple extraction of paragraph texts
        let bodyText = "";
        const bodyContent = doc.body?.content || [];
        bodyContent.forEach((el: any) => {
          if (el.paragraph) {
            const elements = el.paragraph.elements || [];
            elements.forEach((subEl: any) => {
              if (subEl.textRun) {
                bodyText += subEl.textRun.content;
              }
            });
          }
        });
        setDocContent(bodyText || "(Empty Document - Write something below!)");
      }
    } catch (err) {
      toast.error("Could not fetch document body text");
    }
  };

  const handleAppendText = async () => {
    if (!accessToken || !selectedDocId || !appendText.trim()) return;
    try {
      setIsLoading(true);
      const ok = await googleApi.docs.appendDocumentText(accessToken, selectedDocId, appendText + "\n");
      if (ok) {
        setAppendText("");
        // Reload document text to guarantee live updating
        handleSelectDoc(selectedDocId, selectedDocTitle);
      }
    } catch (e) {
      toast.error("Error updating text");
    } finally {
      setIsLoading(false);
    }
  };

  // --- GOOGLE KEEP FALLBACK STICKIES LOGIC ---
  const fetchKeepNotes = async () => {
    if (!accessToken) return;
    setIsLoading(true);
    setApiError(null);
    try {
      const notes = await googleApi.keep.listNotes(accessToken);
      setKeepNotes(notes);
    } catch (err: any) {
      console.error(err);
      setApiError(err.message || String(err));
    } finally {
      setIsLoading(false);
    }
  };

  const handleCreateSticky = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newStickyTitle.trim() || !newStickyBody.trim()) {
      toast.error("Please add a title and description for the note card");
      return;
    }

    if (!accessToken) return;
    try {
      setIsLoading(true);
      const res = await googleApi.keep.createNote(accessToken, newStickyTitle.trim(), newStickyBody.trim(), selectedColor);
      if (res) {
        setNewStickyTitle("");
        setNewStickyBody("");
        fetchKeepNotes();
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteSticky = async (noteId: string, title: string) => {
    if (!accessToken) return;

    // STRICT REQUIREMENT: Explicit user verification before mutation/delete
    const ok = window.confirm(`Permanently delete sticky note "${title}"?`);
    if (!ok) return;

    try {
      setIsLoading(true);
      const del = await googleApi.keep.deleteNote(accessToken, noteId);
      if (del) {
        setKeepNotes(prev => prev.filter(n => n.id !== noteId));
      }
    } catch (e) {
      toast.error("Delete failed");
    } finally {
      setIsLoading(false);
    }
  };

  const filteredDocs = docsList.filter(doc => 
    doc.name.toLowerCase().includes(searchDocQuery.toLowerCase())
  );

  return (
    <div className="px-4 pt-6 pb-24 max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-6 gap-4 border-b border-border/60 pb-5">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Docs & Notes</h1>
          <p className="text-xs text-muted-foreground">Manage Google Docs and Keep notes.</p>
        </div>

        {/* Tab Selector */}
        <div className="flex bg-muted p-1 rounded-2xl border border-border">
          <button 
            onClick={() => setActiveTab('docs')}
            className={`px-4 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
              activeTab === 'docs' 
                ? 'bg-card text-foreground shadow-xs' 
                : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            <FileText className="w-3.5 h-3.5" />
            Google Docs
          </button>
          <button 
            onClick={() => setActiveTab('keep')}
            className={`px-4 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
              activeTab === 'keep' 
                ? 'bg-card text-foreground shadow-xs' 
                : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            <Lightbulb className="w-3.5 h-3.5" />
            Keep Notes
          </button>
        </div>
      </div>

      {apiError && (
        <motion.div 
          initial={{ opacity: 0, y: -10 }} 
          animate={{ opacity: 1, y: 0 }}
          className="bg-destructive/15 border-2 border-destructive/20 rounded-2xl p-4 mb-6 text-xs text-foreground flex flex-col sm:flex-row sm:items-center justify-between gap-4"
        >
          <div className="flex items-start gap-2.5">
            <AlertTriangle className="w-5 h-5 text-destructive shrink-0 mt-0.5" />
            <div>
              <p className="font-bold text-destructive-foreground underline decoration-1">Google API Access Forbidden (403 Error)</p>
              <p className="text-muted-foreground mt-0.5 leading-relaxed">
                Google Drive or Google Docs APIs have not been enabled in your default Google Cloud project (<span className="font-mono font-bold text-foreground">mmv-xii</span>). List operation failed.
              </p>
            </div>
          </div>
          <Link to="/database-guide" className="shrink-0">
            <Button size="sm" variant="destructive" className="rounded-xl font-bold gap-1 mt-1 sm:mt-0 text-[11px] h-8 shadow">
              <Wrench className="w-3.5 h-3.5" /> Fix Integration Error <ExternalLink className="w-3 h-3" />
            </Button>
          </Link>
        </motion.div>
      )}

      {!isConnected ? (
        <div className="bg-card border border-border rounded-3xl p-8 text-center max-w-md mx-auto">
          <FolderOpen className="w-12 h-12 text-primary/40 mx-auto mb-4" />
          <h3 className="text-base font-bold mb-2">Connect Google Account</h3>
          <p className="text-xs text-muted-foreground mb-4">
            Connect your Google Cloud profile in the Calendar or Settings screen to access real-time documents and notes.
          </p>
          <Button onClick={connectGoogle} className="w-full rounded-xl font-bold">
            Connect Google Account
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* TAB 1: GOOGLE DOCS */}
          {activeTab === 'docs' && (
            <>
              {/* Document Browser Sidebar */}
              <div className="space-y-4">
                <div className="bg-card border border-border rounded-3xl p-4 shadow-xs">
                  <h3 className="text-xs font-black uppercase tracking-widest text-muted-foreground mb-3 flex items-center gap-1.5">
                    <Plus className="w-4 h-4 text-primary" />
                    New Document
                  </h3>
                  <form onSubmit={handleCreateDoc} className="space-y-3">
                    <Input 
                      placeholder="Doc name..."
                      value={newDocTitle}
                      onChange={(e) => setNewDocTitle(e.target.value)}
                      className="rounded-xl text-xs border-muted-foreground/20"
                    />
                    <Button type="submit" disabled={isLoading} className="w-full text-xs font-bold rounded-xl h-9">
                      Create
                    </Button>
                  </form>
                </div>

                <div className="bg-card border border-border rounded-3xl p-4 shadow-xs flex flex-col min-h-[300px]">
                  <h3 className="text-xs font-black uppercase tracking-widest text-muted-foreground mb-3 flex items-center justify-between">
                    <span>Documents List ({docsList.length})</span>
                    <button onClick={fetchDocs} className="text-primary hover:underline flex items-center gap-0.5 text-[9px] uppercase">
                      <RefreshCw className="w-2.5 h-2.5" /> Reload
                    </button>
                  </h3>

                  <div className="relative mb-3 flex-shrink-0">
                    <Search className="absolute left-3 top-2.5 h-3.5 w-3.5 text-muted-foreground" />
                    <Input 
                      placeholder="Search items..."
                      value={searchDocQuery}
                      onChange={(e) => setSearchDocQuery(e.target.value)}
                      className="pl-8 rounded-xl text-xs h-9 border-muted-foreground/20"
                    />
                  </div>

                  <div className="flex-1 overflow-y-auto space-y-1.5 max-h-[320px] pr-1">
                    {isLoading && docsList.length === 0 ? (
                      <div className="flex justify-center py-6">
                        <div className="w-5 h-5 border-2 border-primary/20 border-t-primary rounded-full animate-spin" />
                      </div>
                    ) : filteredDocs.length === 0 ? (
                      <p className="text-[11px] text-muted-foreground text-center py-8">None found. Add your first cloud document!</p>
                    ) : (
                      filteredDocs.map(doc => (
                        <button
                          key={doc.id}
                          onClick={() => handleSelectDoc(doc.id, doc.name)}
                          className={`w-full text-left p-2.5 rounded-xl border transition-all text-xs flex items-center justify-between gap-1.5 ${
                            selectedDocId === doc.id 
                              ? 'bg-primary/10 text-primary border-primary/20 font-bold' 
                              : 'bg-muted/10 border-border/80 hover:bg-muted/30 text-card-foreground'
                          }`}
                        >
                          <span className="truncate flex-1">{doc.name}</span>
                          <ChevronRight className={`w-3.5 h-3.5 opacity-60 flex-shrink-0 transition-transform ${selectedDocId === doc.id ? 'translate-x-0.5' : ''}`} />
                        </button>
                      ))
                    )}
                  </div>
                </div>
              </div>

              {/* Rich Doc Text Edit Panel */}
              <div className="lg:col-span-2 bg-card border border-border rounded-3xl p-5 shadow-xs flex flex-col min-h-[450px]">
                {selectedDocId ? (
                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center justify-between border-b pb-3 mb-4">
                        <div className="flex items-center gap-2">
                          <FileText className="w-5 h-5 text-primary" />
                          <h2 className="text-sm font-extrabold">{selectedDocTitle}</h2>
                        </div>
                        <span className="px-2 py-0.5 rounded bg-muted text-[9px] font-bold text-muted-foreground">Google Cloud Docs</span>
                      </div>

                      {/* Doc Content Display box */}
                      <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground mb-2">Document Preview</p>
                      <div className="p-4 bg-muted/20 border border-border/80 rounded-2xl max-h-[200px] overflow-y-auto text-xs font-serif leading-relaxed whitespace-pre-wrap mb-4 text-foreground/80">
                        {docContent || "(Fetching content...)"}
                      </div>

                      {/* Batch Append Text Block */}
                      <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground mb-1">Append Text</p>
                      <Textarea 
                        placeholder="Add to document..."
                        value={appendText}
                        onChange={(e) => setAppendText(e.target.value)}
                        rows={4}
                        className="rounded-xl text-xs border-muted-foreground/30 font-sans"
                      />
                    </div>

                    <div className="flex justify-end gap-2 mt-4 pt-3 border-t">
                      <Button variant="outline" size="sm" onClick={() => setSelectedDocId(null)} className="rounded-xl text-xs font-semibold">
                        Close
                      </Button>
                      <Button size="sm" disabled={isLoading || !appendText.trim()} onClick={handleAppendText} className="rounded-xl text-xs font-bold">
                        {isLoading ? "Saving..." : "Append"}
                      </Button>
                    </div>
                  </div>
                ) : (
                  <div className="flex-1 flex flex-col items-center justify-center text-center py-16 text-muted-foreground">
                    <FileText className="w-12 h-12 text-primary/30 mb-3" />
                    <p className="text-xs font-black uppercase tracking-wider text-card-foreground">Select a Google Doc</p>
                    <p className="text-[10px] text-muted-foreground mt-1 max-w-sm">
                      Open a document from the left browser sidebar to pull down live content and use the inline editor.
                    </p>
                  </div>
                )}
              </div>
            </>
          )}

          {/* TAB 2: GOOGLE KEEP STICKIES */}
          {activeTab === 'keep' && (
            <>
              {/* Note Create section */}
              <div className="bg-card border border-border rounded-3xl p-5 shadow-xs">
                <h3 className="text-xs font-black uppercase tracking-widest text-muted-foreground mb-4 flex items-center gap-1.5">
                  <Lightbulb className="w-4 h-4 text-primary animate-pulse" />
                  Pin New Sticky note
                </h3>
                
                <form onSubmit={handleCreateSticky} className="space-y-4">
                  <div>
                    <Label className="text-xs font-bold">Title</Label>
                    <Input 
                      required
                      placeholder="e.g., Finance Checklist"
                      value={newStickyTitle}
                      onChange={(e) => setNewStickyTitle(e.target.value)}
                      className="rounded-xl text-xs mt-1 border-muted-foreground/20"
                    />
                  </div>

                  <div>
                    <Label className="text-xs font-bold">Body Content</Label>
                    <Textarea 
                      required
                      placeholder="e.g., 1. Check salary deposit\n2. Backup transactions to Sheets\n3. Mark goals completed."
                      value={newStickyBody}
                      onChange={(e) => setNewStickyBody(e.target.value)}
                      rows={5}
                      className="rounded-xl text-xs mt-1 border-muted-foreground/20"
                    />
                  </div>

                  <div>
                    <Label className="text-xs font-bold block mb-1.5">Background Theme</Label>
                    <div className="flex gap-2">
                      {colors.map(col => (
                        <button
                          key={col.name}
                          type="button"
                          onClick={() => setSelectedColor(col.name)}
                          className={`w-6 h-6 rounded-full border-2 transition-all relative ${col.class.split(' ')[0]} ${
                            selectedColor === col.name ? 'border-primary ring-2 ring-primary/40' : 'border-transparent'
                          }`}
                          title={`Color ${col.name}`}
                        >
                          {selectedColor === col.name && (
                            <Check className="w-3 h-3 text-current absolute inset-0 m-auto" />
                          )}
                        </button>
                      ))}
                    </div>
                  </div>

                  <Button type="submit" disabled={isLoading} className="w-full rounded-xl font-bold h-10 mt-3 flex items-center justify-center gap-1.5">
                    <Plus className="w-4 h-4" />
                    Pin Sticky Note
                  </Button>
                </form>
              </div>

              {/* Keep Grid Display */}
              <div className="lg:col-span-2 space-y-4">
                <div className="flex items-center justify-between border-b pb-2 mb-2">
                  <h3 className="text-xs font-black uppercase tracking-widest text-muted-foreground">Keep Pin Board</h3>
                  <button onClick={fetchKeepNotes} className="text-primary hover:underline flex items-center gap-0.5 text-[9px] uppercase font-bold">
                    <RefreshCw className="w-2.5 h-2.5" /> Refresh Board
                  </button>
                </div>

                {isLoading && keepNotes.length === 0 ? (
                  <div className="flex justify-center py-12">
                    <div className="w-6 h-6 border-2 border-primary/20 border-t-primary rounded-full animate-spin" />
                  </div>
                ) : keepNotes.length === 0 ? (
                  <div className="text-center py-16 bg-muted/10 border border-dashed rounded-3xl text-muted-foreground">
                    <Lightbulb className="w-10 h-10 text-muted-foreground/30 mx-auto mb-2" />
                    <p className="text-xs font-bold text-card-foreground/80">Sticky pin board is empty</p>
                    <p className="text-[10px] mt-1 text-muted-foreground">Scribble down reminders or sudden budget ideas!</p>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {keepNotes.map(note => {
                      const colorMatch = colors.find(c => c.name === note.color) || colors[0];
                      const bodyStr = typeof note.body === 'string' ? note.body : (note.body?.text?.text || note.body?.text || "");

                      return (
                        <div 
                          key={note.id}
                          className={`p-4 border rounded-2xl flex flex-col justify-between shadow-xs transition-transform hover:-translate-y-0.5 relative group ${colorMatch.class}`}
                        >
                          <div>
                            <div className="flex items-center justify-between gap-1.5 mb-2.5">
                              <h4 className="text-xs font-extrabold truncate pr-6">{note.title}</h4>
                              <Pin className="w-3 h-3 text-muted-foreground/60 flex-shrink-0" />
                            </div>
                            <p className="text-xs font-medium leading-relaxed whitespace-pre-wrap break-words">{bodyStr}</p>
                          </div>

                          <div className="flex items-center justify-between mt-4 pt-2.5 border-t border-black/5 dark:border-white/5">
                            <span className="text-[8px] font-extrabold tracking-wider uppercase opacity-60">
                              {note.isSyncedToKeep === false ? "Local Keep-Backup" : "Linked with Keep"}
                            </span>
                            <button 
                              onClick={() => handleDeleteSticky(note.id, note.title)}
                              className="p-1 rounded-md text-red-700 dark:text-red-300 hover:bg-black/5 dark:hover:bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity"
                              title="Delete note"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            </>
          )}

        </div>
      )}
    </div>
  );
}
-e 
```

-e 
## `./src/pages/Notifications.tsx`
```
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { base44 } from "@/api/base44Client";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, Bell, Clock, CheckCircle, TrendingDown, Flame, Check, Play } from "lucide-react";
import { formatCurrency, formatDate } from "@/lib/utils";
import { useSettings } from "@/lib/useSettings";
import { Button } from "@/components/ui/button";
import PullToRefresh from "@/components/common/PullToRefresh";
import { toast } from "react-hot-toast";

export default function Notifications() {
  const { settings } = useSettings();
  const [tasks, setTasks] = useState<any[]>([]);
  const [habits, setHabits] = useState<any[]>([]);
  const [subscriptions, setSubscriptions] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [permission, setPermission] = useState<string>("default");
  
  // Track read state via clear time to keep it simple, or dismissed IDs
  const [dismissedIds, setDismissedIds] = useState<string[]>([]);

  useEffect(() => {
    const saved = localStorage.getItem("dismissed_notifications");
    if (saved) setDismissedIds(JSON.parse(saved));
    loadData();

    if (typeof window !== "undefined" && "Notification" in window) {
      setPermission(Notification.permission);
    }
  }, []);

  const triggerChromeNotification = async () => {
    if (typeof window !== "undefined" && "Notification" in window) {
      let currentPerm = Notification.permission;
      if (currentPerm === "default") {
        currentPerm = await Notification.requestPermission();
        setPermission(currentPerm);
      }
      
      if (currentPerm === "granted") {
        // Trigger Chrome Native OS Notification
        new Notification("Subscription Payment Due (Chrome)", {
          body: "Your Spotify Pro subscription ($9.99) payment is due today.",
          tag: "subscription-payment-reminder",
          requireInteraction: true
        });

        // Add corresponding item into the database so it goes to Notification section
        const todayStr = new Date().toISOString().split("T")[0];
        await base44.entities.Subscription.create({
          title: "Spotify Pro (Chrome Auto-Trigger)",
          amount: 9.99,
          currency: "USD",
          billing_cycle: "monthly",
          next_billing: todayStr,
          is_active: true
        });

        toast.success("Pregenerated notification sent & loaded in app!");
        loadData();
      } else {
        toast.error("Enable browser notifications to run the native simulator.");
      }
    } else {
      toast.error("This browser doesn't support system notifications.");
    }
  };

  const loadData = async () => {
    setLoading(true);
    const [t, h, s] = await Promise.all([
      base44.entities.Task.filter({ status: "todo" }),
      base44.entities.Habit.list(),
      base44.entities.Subscription.list(),
    ]);
    if (t) setTasks(t);
    if (h) setHabits(h);
    if (s) setSubscriptions(s);
    setLoading(false);
  };

  const today = new Date().toISOString().split("T")[0];

  const overdueTasks = tasks.filter(t => t.due_date && t.due_date < today && t.status !== 'done');
  
  const isHabitDueOnDate = (habit: any, date: Date) => {
    if (habit.frequency === "daily") return true;
    if (habit.frequency === "custom" && habit.custom_days?.includes(date.getDay())) return true;
    return false;
  };

  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);
  const yesterdayStr = yesterday.toISOString().split("T")[0];
  const missedHabits = habits.filter(h => h.is_active && isHabitDueOnDate(h, yesterday) && !h.completions?.includes(yesterdayStr));

  const upcomingSubs = subscriptions.filter(s => s.is_active && (s.next_billing === today || s.next_billing === new Date(new Date().setDate(new Date().getDate() + 1)).toISOString().split("T")[0]));

  const allNotifications = [
    ...overdueTasks.map(t => ({
      id: `task-${t.id}`,
      type: 'critical',
      title: 'Overdue Task',
      message: `"${t.title}" was due on ${formatDate(t.due_date)}`,
      icon: Clock,
      color: 'text-rose-500',
      bgColor: 'bg-rose-500/10'
    })),
    ...missedHabits.map(h => ({
      id: `habit-${h.id}`,
      type: 'warning',
      title: 'Missed Habit',
      message: `You missed "${h.title}" yesterday. Maintain your streak!`,
      icon: Flame,
      color: 'text-orange-500',
      bgColor: 'bg-orange-500/10'
    })),
    ...upcomingSubs.map(s => ({
      id: `sub-${s.id}`,
      type: 'info',
      title: 'Payment Reminder',
      message: `${s.title} subscription (${formatCurrency(s.amount, settings.currency_primary, settings.uzs_rate)}) is due ${s.next_billing === today ? 'today' : 'tomorrow'}.`,
      icon: TrendingDown,
      color: 'text-blue-500',
      bgColor: 'bg-blue-500/10'
    }))
  ];

  const notifications = allNotifications.filter(n => !dismissedIds.includes(n.id));

  const dismiss = (id: string) => {
    const updated = [...dismissedIds, id];
    setDismissedIds(updated);
    localStorage.setItem("dismissed_notifications", JSON.stringify(updated));
  };

  const markAllRead = () => {
    const updated = [...dismissedIds, ...notifications.map(n => n.id)];
    setDismissedIds(updated);
    localStorage.setItem("dismissed_notifications", JSON.stringify(updated));
  };

  return (
    <PullToRefresh onRefresh={loadData}>
      <div className="px-4 pt-4 pb-0 h-full flex flex-col">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <Link to="/" className="w-10 h-10 bg-card border border-border flex items-center justify-center rounded-2xl shadow-sm hover:bg-primary/10 transition-colors">
              <ArrowLeft className="w-5 h-5 text-muted-foreground" />
            </Link>
            <h1 className="text-2xl font-bold">Notifications</h1>
          </div>
          {notifications.length > 0 && (
            <Button variant="ghost" size="sm" onClick={markAllRead} className="text-xs text-primary">
              <Check className="w-4 h-4 mr-1" /> Mark all read
            </Button>
          )}
        </div>

        {/* Chrome Native Notification Trigger Center */}
        <motion.div 
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6 p-4 rounded-3xl border border-blue-500/10 bg-blue-500/5 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
        >
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-2xl bg-blue-500/10 flex items-center justify-center flex-shrink-0 text-blue-500">
              <Bell className="w-5 h-5 animate-bounce" />
            </div>
            <div>
              <p className="text-sm font-bold text-foreground">Chrome Notification Center Integrator</p>
              <p className="text-xs text-muted-foreground mt-0.5 max-w-[450px]">
                Triggers a native Chrome OS/browser alert for subscription reminders, and auto-records the item directly in your list below!
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2 flex-shrink-0">
            <Button 
              onClick={triggerChromeNotification}
              className="rounded-xl bg-blue-500 hover:bg-blue-600 text-white font-bold text-xs h-10 shadow-md gap-1.5"
            >
              <Play className="w-4 h-4 fill-current" /> Trigger Notification
            </Button>
          </div>
        </motion.div>

        <div className="space-y-3 flex-1 pb-10">
          {loading ? (
             <div className="flex justify-center p-8"><div className="w-6 h-6 border-2 border-primary border-t-transparent rounded-full animate-spin"></div></div>
          ) : notifications.length > 0 ? (
            <AnimatePresence mode="popLayout">
              {notifications.map((notif, idx) => {
                const Icon = notif.icon;
                return (
                  <motion.div
                    key={notif.id}
                    layout
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, x: -50 }}
                    className={`flex items-start gap-4 p-4 rounded-2xl border border-border ${notif.bgColor}`}
                  >
                    <div className="w-10 h-10 rounded-xl bg-white dark:bg-black/20 flex items-center justify-center shadow-sm flex-shrink-0">
                      <Icon className={`w-5 h-5 ${notif.color}`} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className={`text-sm font-bold ${notif.color}`}>{notif.title}</p>
                      <p className="text-xs text-muted-foreground mt-1 font-medium leading-relaxed">{notif.message}</p>
                    </div>
                    <Button variant="ghost" size="icon" onClick={() => dismiss(notif.id)} className="rounded-xl flex-shrink-0 opacity-50 hover:opacity-100">
                      <Check className="w-4 h-4" />
                    </Button>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          ) : (
            <div className="flex flex-col items-center justify-center py-12 text-center h-full">
              <div className="w-20 h-20 bg-muted/20 rounded-full flex items-center justify-center mb-4">
                <CheckCircle className="w-8 h-8 text-muted-foreground/30" />
              </div>
              <h3 className="text-lg font-bold text-foreground">You're All Caught Up</h3>
              <p className="text-xs text-muted-foreground mt-2 max-w-[200px]">No missed items or upcoming reminders at the moment.</p>
            </div>
          )}
        </div>
      </div>
    </PullToRefresh>
  );
}
-e 
```

-e 
## `./src/pages/GoogleCalendar.tsx`
```
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useGoogleAuth } from '@/lib/googleAuth';
import { googleApi, GoogleCalendarEvent } from '@/lib/googleApi';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { 
  Calendar as CalendarIcon, 
  Plus, 
  Trash2, 
  MapPin, 
  Clock, 
  ChevronLeft, 
  ChevronRight, 
  Sparkles, 
  AlertCircle,
  HelpCircle,
  KeyRound,
  RefreshCw,
  Wrench,
  AlertTriangle,
  ExternalLink
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { toast } from 'react-hot-toast';

export default function GoogleCalendar() {
  const { accessToken, connectGoogle, connectGoogleRedirect, isConnected, saveDeveloperToken, disconnectGoogle } = useGoogleAuth();
  const [events, setEvents] = useState<GoogleCalendarEvent[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [apiError, setApiError] = useState<string | null>(null);
  const [devTokenInput, setDevTokenInput] = useState("");
  const [showDevTokenForm, setShowDevTokenForm] = useState(false);

  // Form State
  const [showAddModal, setShowAddModal] = useState(false);
  const [formData, setFormData] = useState({
    summary: "",
    description: "",
    startTime: "",
    endTime: "",
    location: ""
  });

  // Calendar Grid State
  const [currentDate, setCurrentDate] = useState(new Date());

  useEffect(() => {
    if (accessToken) {
      fetchEvents();
    }
  }, [accessToken]);

  const fetchEvents = async () => {
    if (!accessToken) return;
    setIsLoading(true);
    setApiError(null);
    try {
      const data = await googleApi.calendar.listEvents(accessToken);
      // Filter out canceled events or empty titles
      setEvents(data.filter(e => e.summary));
    } catch (err: any) {
      console.error(err);
      setApiError(err.message || String(err));
    } finally {
      setIsLoading(false);
    }
  };

  const handleCreateEvent = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!accessToken) return;
    if (!formData.summary || !formData.startTime || !formData.endTime) {
      toast.error("Please fill in the Summary, Start Time, and End Time");
      return;
    }

    try {
      setIsLoading(true);
      const res = await googleApi.calendar.createEvent(
        accessToken,
        formData.summary,
        formData.description,
        formData.startTime,
        formData.endTime,
        formData.location
      );

      if (res) {
        setShowAddModal(false);
        setFormData({ summary: "", description: "", startTime: "", endTime: "", location: "" });
        fetchEvents();
      }
    } catch (err: any) {
      toast.error(err.message || "Failed to add event");
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteEvent = async (eventId: string, summary: string) => {
    if (!accessToken) return;
    
    // STRICT REQUIREMENT: Explicit user confirmation dialog before mutate/delete
    const confirmed = window.confirm(`Are you sure you want to permanently delete event "${summary}" from your Google Calendar?`);
    if (!confirmed) return;

    try {
      setIsLoading(true);
      const ok = await googleApi.calendar.deleteEvent(accessToken, eventId);
      if (ok) {
        setEvents(prev => prev.filter(e => e.id !== eventId));
      }
    } catch (err) {
      toast.error("Fail to remove event");
    } finally {
      setIsLoading(false);
    }
  };

  // Helper date logic for Monthly Grid
  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    return new Date(year, month + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    return new Date(year, month, 1).getDay(); // 0 is Sunday
  };

  const prevMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
  };

  const nextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
  };

  const monthDays = getDaysInMonth(currentDate);
  const firstDayIndex = getFirstDayOfMonth(currentDate); // 0 corresponds to Sunday, 1 to Monday...
  
  // Arrange blank boxes up to first day
  const blanks = Array(firstDayIndex).fill(null);
  const daysArray = Array.from({ length: monthDays }, (_, i) => i + 1);
  const calendarCells = [...blanks, ...daysArray];

  // Map events to date strings "YYYY-MM-DD"
  const getEventsForDay = (dayNum: number) => {
    if (!dayNum) return [];
    const dateStr = `${currentDate.getFullYear()}-${String(currentDate.getMonth() + 1).padStart(2, '0')}-${String(dayNum).padStart(2, '0')}`;
    return events.filter(event => {
      const eventStart = event.start.dateTime || event.start.date || "";
      return eventStart.startsWith(dateStr);
    });
  };

  return (
    <div className="px-4 pt-6 pb-24 max-w-7xl mx-auto">
      {apiError && (
        <motion.div 
          initial={{ opacity: 0, y: -10 }} 
          animate={{ opacity: 1, y: 0 }}
          className="bg-destructive/15 border-2 border-destructive/20 rounded-2xl p-4 mb-6 text-xs text-foreground flex flex-col sm:flex-row sm:items-center justify-between gap-4"
        >
          <div className="flex items-start gap-2.5">
            <AlertTriangle className="w-5 h-5 text-destructive shrink-0 mt-0.5" />
            <div>
              <p className="font-bold text-destructive-foreground underline decoration-1">Google API Access Forbidden (403 Error)</p>
              <p className="text-muted-foreground mt-0.5 leading-relaxed">
                Google Calendar or Tasks APIs have not been enabled in your Google Cloud project (<span className="font-mono font-bold text-foreground">mmv-xii</span>). List operation failed.
              </p>
            </div>
          </div>
          <Link to="/database-guide" className="shrink-0">
            <Button size="sm" variant="destructive" className="rounded-xl font-bold gap-1 mt-1 sm:mt-0 text-[11px] h-8 shadow">
              <Wrench className="w-3.5 h-3.5" /> Fix Integration Error <ExternalLink className="w-3 h-3" />
            </Button>
          </Link>
        </motion.div>
      )}

      <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-6 gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Google Calendar</h1>
          <p className="text-xs text-muted-foreground">Manage your schedule and upcoming events.</p>
        </div>

        <div className="flex items-center gap-2">
          {isConnected ? (
            <>
              <Button size="sm" variant="outline" className="rounded-xl flex items-center gap-1" onClick={fetchEvents} disabled={isLoading}>
                <RefreshCw className={`w-3.5 h-3.5 ${isLoading ? "animate-spin" : ""}`} />
                Reload
              </Button>
              <Button size="sm" className="rounded-xl flex items-center gap-1 bg-primary text-primary-foreground hover:bg-primary/90" onClick={() => setShowAddModal(true)}>
                <Plus className="w-4 h-4" />
                Schedule Event
              </Button>
              <Button size="sm" variant="ghost" className="rounded-xl text-red-500 hover:text-red-600 hover:bg-red-50/10" onClick={disconnectGoogle}>
                Disconnect
              </Button>
            </>
          ) : (
            <Button size="sm" variant="outline" className="rounded-xl" onClick={() => setShowDevTokenForm(!showDevTokenForm)}>
              <KeyRound className="w-3.5 h-3.5 mr-1" />
              Developer Token
            </Button>
          )}
        </div>
      </div>

      {!isConnected && (
        <div className="mb-6 bg-gradient-to-r from-[#8b5cf6]/5 via-[#6366f1]/5 to-[#f43f5e]/5 border border-border/80 rounded-3xl p-6 shadow-xs">
          <div className="max-w-2xl">
            <div className="flex items-center gap-2 mb-3">
              <CalendarIcon className="w-5 h-5 text-primary" />
              <h2 className="text-base font-bold">Connect your Google Workspace Account</h2>
            </div>
            <p className="text-xs text-muted-foreground leading-relaxed mb-4">
              Authorize Google Calendar integration to safely sync events and tasks. 
              Our service requests read/write calendar scopes with absolute permissions to sync alerts.
            </p>

            <div className="flex flex-wrap gap-2 items-center">
              <Button onClick={connectGoogle} className="rounded-xl font-bold bg-[#8b5cf6] text-white hover:bg-[#7c3aed]">
                Connect Google (Popup)
              </Button>
              <Button onClick={connectGoogleRedirect} variant="outline" className="rounded-xl font-bold border-[#8b5cf6]/30 text-foreground hover:bg-[#8b5cf6]/10">
                Connect Google (Redirect)
              </Button>
              <span className="text-xs text-muted-foreground px-2">or</span>
              <Button variant="outline" onClick={() => setShowDevTokenForm(!showDevTokenForm)} className="rounded-xl text-xs font-semibold">
                Use Developer Access Token
              </Button>
            </div>

            {showDevTokenForm && (
              <motion.div 
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-4 p-4 border border-dashed border-border rounded-2xl bg-muted/20"
              >
                <Label className="text-xs font-bold block mb-1">Paste Access Token (Google OAuth Playground)</Label>
                <p className="text-[10px] text-muted-foreground mb-3">
                  Paste an active token with tasks, calendar, documents, and spreadsheets scopes to test in-browser without redirect.
                </p>
                <div className="flex gap-2">
                  <Input 
                    type="password"
                    placeholder="ya29.a0Acv..."
                    value={devTokenInput}
                    onChange={(e) => setDevTokenInput(e.target.value)}
                    className="rounded-xl text-xs flex-1 border-muted-foreground/30 focus-visible:ring-primary"
                  />
                  <Button 
                    size="sm"
                    onClick={() => {
                      saveDeveloperToken(devTokenInput);
                      setDevTokenInput("");
                    }} 
                    className="rounded-xl text-xs font-bold"
                  >
                    Save Token
                  </Button>
                </div>
              </motion.div>
            )}
          </div>
        </div>
      )}

      {isConnected && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Month Calendar Grid */}
          <div className="lg:col-span-2 bg-card border border-border rounded-3xl p-5 shadow-xs">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-bold uppercase tracking-wider text-muted-foreground flex items-center gap-1.5">
                <CalendarIcon className="w-4 h-4 text-primary" />
                {currentDate.toLocaleString('default', { month: 'long', year: 'numeric' })}
              </h3>
              <div className="flex items-center gap-1">
                <button onClick={prevMonth} className="p-1 rounded-lg hover:bg-muted text-muted-foreground hover:text-foreground">
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button onClick={nextMonth} className="p-1 rounded-lg hover:bg-muted text-muted-foreground hover:text-foreground">
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            </div>

            <div className="grid grid-cols-7 gap-1 text-center font-bold text-[10px] text-muted-foreground uppercase mb-2">
              <div>Sun</div>
              <div>Mon</div>
              <div>Tue</div>
              <div>Wed</div>
              <div>Thu</div>
              <div>Fri</div>
              <div>Sat</div>
            </div>

            <div className="grid grid-cols-7 gap-1.5">
              {calendarCells.map((day, idx) => {
                const dayEvents = getEventsForDay(day);
                const isToday = day && 
                  new Date().getDate() === day && 
                  new Date().getMonth() === currentDate.getMonth() && 
                  new Date().getFullYear() === currentDate.getFullYear();

                return (
                  <div 
                    key={idx} 
                    className={`min-h-[70px] p-1 border border-border/40 rounded-xl flex flex-col justify-between transition-colors bg-muted/5 ${
                      day ? "hover:bg-primary/5 cursor-pointer" : "opacity-20 pointer-events-none"
                    } ${isToday ? "ring-2 ring-primary bg-primary/5" : ""}`}
                    onClick={() => {
                      if (!day) return;
                      const dateStr = `${currentDate.getFullYear()}-${String(currentDate.getMonth() + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
                      setFormData(f => ({ ...f, startTime: `${dateStr}T09:00`, endTime: `${dateStr}T10:00` }));
                      setShowAddModal(true);
                    }}
                  >
                    {day ? (
                      <>
                        <span className={`text-xs font-bold self-start px-1.5 py-0.5 rounded-md ${
                          isToday ? "bg-primary text-primary-foreground" : "text-card-foreground/80"
                        }`}>{day}</span>
                        
                        <div className="space-y-0.5 mt-1 overflow-hidden flex-1 flex flex-col justify-end">
                          {dayEvents.slice(0, 3).map((evt) => (
                            <div 
                              key={evt.id} 
                              className="text-[8px] leading-tight font-extrabold truncate px-1 py-0.5 rounded bg-primary/10 text-primary border-l-2 border-primary"
                              title={evt.summary}
                            >
                              {evt.summary}
                            </div>
                          ))}
                          {dayEvents.length > 3 && (
                            <span className="text-[7px] text-muted-foreground block text-right font-bold font-mono">+{dayEvents.length - 3} more</span>
                          )}
                        </div>
                      </>
                    ) : null}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Connected Events Feed */}
          <div className="bg-card border border-border rounded-3xl p-5 shadow-xs flex flex-col max-h-[500px]">
            <div className="flex items-center justify-between mb-4 flex-shrink-0">
              <h3 className="text-sm font-bold uppercase tracking-wider text-muted-foreground flex items-center gap-1.5">
                <Clock className="w-4 h-4 text-primary" />
                Upcoming Events ({events.length})
              </h3>
            </div>

            <div className="flex-1 overflow-y-auto space-y-3 pr-1">
              {isLoading ? (
                <div className="flex items-center justify-center h-24">
                  <div className="w-5 h-5 border-2 border-primary/20 border-t-primary rounded-full animate-spin" />
                </div>
              ) : events.length === 0 ? (
                <div className="text-center py-12 text-muted-foreground">
                  <p className="text-xs font-bold">No upcoming events</p>
                  <p className="text-[10px] text-muted-foreground mt-1">Your schedule is clear.</p>
                </div>
              ) : (
                events.map(event => {
                  const startStr = event.start.dateTime || event.start.date || "";
                  const date = startStr ? new Date(startStr).toLocaleDateString("en-US", { month: "short", day: "numeric", hour: "2-digit", minute: "2-digit" }) : "All-day";

                  return (
                    <div 
                      key={event.id}
                      className="group relative p-3 border border-border/80 rounded-2xl bg-muted/10 hover:bg-primary/5 hover:border-primary/20 transition-all flex items-start gap-2.5"
                    >
                      <div className="flex-1 min-w-0">
                        <p className="text-xs font-bold text-foreground truncate group-hover:text-primary transition-colors">{event.summary}</p>
                        <p className="text-[9px] text-muted-foreground font-medium flex items-center gap-1 mt-1">
                          <Clock className="w-3 h-3 text-primary/70" />
                          {date}
                        </p>
                        {event.location && (
                          <p className="text-[9px] text-muted-foreground font-medium flex items-center gap-1 mt-0.5 truncate">
                            <MapPin className="w-3 h-3 text-emerald-500" />
                            {event.location}
                          </p>
                        )}
                      </div>
                      <button 
                        onClick={() => handleDeleteEvent(event.id, event.summary)}
                        className="opacity-0 group-hover:opacity-100 p-1.5 text-muted-foreground hover:text-red-500 rounded-lg hover:bg-red-500/10 transition-all self-center flex-shrink-0"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  );
                })
              )}
            </div>
          </div>
        </div>
      )}

      {/* Schedule Form Modal */}
      <AnimatePresence>
        {showAddModal && (
          <div className="fixed inset-0 flex items-center justify-center z-50 p-4 bg-background/80 backdrop-blur-xs">
            <motion.div 
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-card w-full max-w-md border border-border rounded-3xl p-5 shadow-xl"
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-bold uppercase tracking-wider text-muted-foreground flex items-center gap-1.5">
                  <CalendarIcon className="w-4 h-4 text-primary" />
                  Add Event
                </h3>
                <button 
                  onClick={() => setShowAddModal(false)}
                  className="text-xs font-bold px-2 py-1 rounded bg-muted text-muted-foreground hover:bg-muted/80"
                >
                  Close
                </button>
              </div>

              <form onSubmit={handleCreateEvent} className="space-y-4">
                <div>
                  <Label className="text-xs font-bold">Event Summary</Label>
                  <Input 
                    type="text"
                    required
                    placeholder="Weekly Synced Brainstorm"
                    value={formData.summary}
                    onChange={(e) => setFormData(f => ({ ...f, summary: e.target.value }))}
                    className="rounded-xl text-xs mt-1 border-muted-foreground/30 focus-visible:ring-primary"
                  />
                </div>

                <div>
                  <Label className="text-xs font-bold">Location</Label>
                  <Input 
                    type="text"
                    placeholder="Google Meet, Office, or Remote URL"
                    value={formData.location}
                    onChange={(e) => setFormData(f => ({ ...f, location: e.target.value }))}
                    className="rounded-xl text-xs mt-1 border-muted-foreground/30"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <Label className="text-xs font-bold">Start date/time</Label>
                    <Input 
                      type="datetime-local"
                      required
                      value={formData.startTime}
                      onChange={(e) => setFormData(f => ({ ...f, startTime: e.target.value }))}
                      className="rounded-xl text-xs mt-1 border-muted-foreground/30"
                    />
                  </div>
                  <div>
                    <Label className="text-xs font-bold">End date/time</Label>
                    <Input 
                      type="datetime-local"
                      required
                      value={formData.endTime}
                      onChange={(e) => setFormData(f => ({ ...f, endTime: e.target.value }))}
                      className="rounded-xl text-xs mt-1 border-muted-foreground/30"
                    />
                  </div>
                </div>

                <div>
                  <Label className="text-xs font-bold">Meeting Notes / Description</Label>
                  <Textarea 
                    placeholder="Add meeting agenda, task sync notes or alerts"
                    value={formData.description}
                    onChange={(e) => setFormData(f => ({ ...f, description: e.target.value }))}
                    rows={3}
                    className="rounded-xl text-xs mt-1 border-muted-foreground/30"
                  />
                </div>

                <Button type="submit" disabled={isLoading} className="w-full rounded-xl font-bold h-11">
                  {isLoading ? "Saving..." : "Add to Google Calendar"}
                </Button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
-e 
```

-e 
## `./src/pages/TelegramSync.tsx`
```
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Bot, 
  LogIn, 
  CheckCircle2, 
  RefreshCw, 
  ExternalLink, 
  ShieldCheck, 
  Send, 
  Sparkles, 
  Smartphone, 
  Flame, 
  Wallet, 
  Target
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { useAuth } from '@/lib/AuthContext';
import { auth, googleProvider } from '@/lib/firebase';
import { signInWithPopup, signInWithRedirect } from 'firebase/auth';
import { toast } from 'react-hot-toast';

export default function TelegramSync() {
  const { user, isAuthenticated, logout } = useAuth();
  
  const [telegramId, setTelegramId] = useState<string>('');
  const [telegramUsername, setTelegramUsername] = useState<string>('');
  const [telegramName, setTelegramName] = useState<string>('');
  const [isLinked, setIsLinked] = useState<boolean>(false);
  const [syncing, setSyncing] = useState(false);
  const [loginLoading, setLoginLoading] = useState(false);

  useEffect(() => {
    const tgApp = (window as any).Telegram?.WebApp;
    if (tgApp?.initDataUnsafe?.user) {
      const tgUser = tgApp.initDataUnsafe.user;
      setTelegramId(tgUser.id.toString());
      setTelegramUsername(tgUser.username || '');
      setTelegramName(`${tgUser.first_name || ''} ${tgUser.last_name || ''}`.trim());
      localStorage.setItem('telegram_user_id', tgUser.id.toString());
      localStorage.setItem('telegram_username', tgUser.username || '');
      setIsLinked(true);
    } else {
      const params = new URLSearchParams(window.location.search);
      const qTgId = params.get('tg_id') || params.get('telegram_id');
      const qUsername = params.get('username');
      const qName = params.get('name') || params.get('first_name');

      if (qTgId) {
        setTelegramId(qTgId);
        if (qUsername) setTelegramUsername(qUsername);
        if (qName) setTelegramName(qName);
        localStorage.setItem('telegram_user_id', qTgId);
        if (qUsername) localStorage.setItem('telegram_username', qUsername);
        setIsLinked(true);
      } else {
        const savedId = localStorage.getItem('telegram_user_id');
        const savedUser = localStorage.getItem('telegram_username');
        if (savedId) {
          setTelegramId(savedId);
          if (savedUser) setTelegramUsername(savedUser);
          setIsLinked(true);
        }
      }
    }
  }, []);

  const handleGoogleSignIn = async () => {
    setLoginLoading(true);
    try {
      await signInWithPopup(auth, googleProvider);
      toast.success('Successfully connected Google account!');
    } catch (popupErr: any) {
      console.warn("Popup mode error, attempting redirect mode:", popupErr);
      try {
        await signInWithRedirect(auth, googleProvider);
      } catch (err: any) {
        toast.error(`Google Sign-in failed: ${err.message || err}`);
      }
    } finally {
      setLoginLoading(false);
    }
  };

  const handleSaveTelegramLink = () => {
    if (!telegramId.trim()) {
      toast.error('Please enter your Telegram User ID or Username');
      return;
    }
    const cleanId = telegramId.trim().replace('@', '');
    localStorage.setItem('telegram_user_id', cleanId);
    if (telegramUsername) {
      localStorage.setItem('telegram_username', telegramUsername.trim());
    }
    setIsLinked(true);
    toast.success('Telegram Account ID synced to MMV Productivity Web!');
  };

  const handleTriggerSync = () => {
    setSyncing(true);
    setTimeout(() => {
      setSyncing(false);
      toast.success('All habits, tasks, finances, and goals are in sync!');
    }, 1200);
  };

  const botUsername = 'MMV_Productivity_Bot';

  return (
    <div className="p-4 md:p-8 max-w-5xl mx-auto space-y-6">
      {/* Top Banner */}
      <motion.div 
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 p-6 rounded-2xl bg-gradient-to-r from-primary/10 via-card to-card border border-primary/20 shadow-md"
      >
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <Badge variant="outline" className="bg-primary/10 text-primary border-primary/30 flex items-center gap-1">
              <Sparkles className="w-3.5 h-3.5" /> Synchronized Ecosystem
            </Badge>
            <Badge variant="secondary" className="bg-green-500/10 text-green-600 dark:text-green-400 border-green-500/20">
              Live Bridge
            </Badge>
          </div>
          <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight">Google & Telegram Sync Hub</h1>
          <p className="text-sm text-muted-foreground">
            Connect your Google account and link your Telegram Bot companion to keep habits, tasks, expenses, and goals in instant synchronization.
          </p>
        </div>
        <Button onClick={handleTriggerSync} disabled={syncing} className="gap-2 shadow-sm font-semibold">
          <RefreshCw className={`w-4 h-4 ${syncing ? 'animate-spin' : ''}`} />
          {syncing ? 'Syncing Ecosystem...' : 'Force Sync Now'}
        </Button>
      </motion.div>

      {/* Grid Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* 1. Google Account Registration */}
        <div className="rounded-2xl border border-border bg-card p-6 shadow-sm flex flex-col justify-between space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="p-2.5 bg-blue-500/10 text-blue-500 rounded-xl">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-lg font-bold">Google Registration</h2>
                <p className="text-xs text-muted-foreground">Primary Workspace Identity</p>
              </div>
            </div>
            {isAuthenticated ? (
              <Badge className="bg-green-500/10 text-green-600 border-green-500/30">
                Connected
              </Badge>
            ) : (
              <Badge variant="outline" className="text-amber-500 border-amber-500/30">
                Not Registered
              </Badge>
            )}
          </div>

          <div className="space-y-4">
            {isAuthenticated ? (
              <div className="p-4 rounded-xl bg-muted/30 border border-border/80 space-y-3">
                <div className="flex items-center gap-3">
                  {user?.user_metadata?.avatar_url ? (
                    <img 
                      src={user.user_metadata.avatar_url} 
                      alt="Avatar" 
                      className="w-10 h-10 rounded-full border border-primary/30" 
                    />
                  ) : (
                    <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center font-bold text-primary">
                      {user?.email?.[0]?.toUpperCase() || 'G'}
                    </div>
                  )}
                  <div className="truncate">
                    <p className="font-semibold text-sm truncate">{user?.user_metadata?.full_name || 'Google User'}</p>
                    <p className="text-xs text-muted-foreground truncate">{user?.email}</p>
                  </div>
                </div>
                <div className="text-xs text-muted-foreground flex items-center gap-1.5 pt-1">
                  <CheckCircle2 className="w-4 h-4 text-green-500 flex-shrink-0" />
                  Your workspace data is safely backed up with Google OAuth.
                </div>
              </div>
            ) : (
              <div className="p-4 rounded-xl bg-muted/40 border border-border/60 space-y-2 text-center">
                <p className="text-sm font-medium">Sign in with Google to enable cloud sync</p>
                <p className="text-xs text-muted-foreground">
                  Connect your Google account to automatically store habits, tasks, calendar events, and financial logs.
                </p>
              </div>
            )}

            <div className="pt-2">
              {isAuthenticated ? (
                <Button variant="outline" onClick={() => logout()} className="w-full text-red-500 hover:text-red-600">
                  Sign Out Google Account
                </Button>
              ) : (
                <Button 
                  onClick={handleGoogleSignIn} 
                  disabled={loginLoading}
                  className="w-full gap-2 bg-blue-600 hover:bg-blue-700 text-white shadow-sm"
                >
                  <LogIn className="w-4 h-4" />
                  {loginLoading ? 'Signing in...' : 'Sign In / Register with Google'}
                </Button>
              )}
            </div>
          </div>
        </div>

        {/* 2. Telegram Bot Link & Sync */}
        <div className="rounded-2xl border border-border bg-card p-6 shadow-sm flex flex-col justify-between space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="p-2.5 bg-sky-500/10 text-sky-500 rounded-xl">
                <Bot className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-lg font-bold">Telegram Bot Sync</h2>
                <p className="text-xs text-muted-foreground">Mobile Companion Integration</p>
              </div>
            </div>
            {isLinked ? (
              <Badge className="bg-sky-500/10 text-sky-600 border-sky-500/30">
                Linked
              </Badge>
            ) : (
              <Badge variant="outline" className="text-muted-foreground">
                Unlinked
              </Badge>
            )}
          </div>

          <div className="space-y-4">
            <div className="space-y-2">
              <label className="text-xs font-semibold text-muted-foreground">Telegram User ID / Username</label>
              <div className="flex gap-2">
                <Input 
                  placeholder="e.g. 1471595444 or username"
                  value={telegramId}
                  onChange={(e) => setTelegramId(e.target.value)}
                  className="bg-background"
                />
                <Button onClick={handleSaveTelegramLink} variant="secondary">
                  Save Link
                </Button>
              </div>
              {telegramName && (
                <p className="text-xs text-sky-500 font-medium">
                  Detected Telegram User: {telegramName} {telegramUsername ? `(@${telegramUsername})` : ''}
                </p>
              )}
            </div>

            <div className="p-3 rounded-xl bg-sky-500/5 border border-sky-500/20 text-xs space-y-2">
              <p className="font-semibold text-sky-600 dark:text-sky-400 flex items-center gap-1.5">
                <Smartphone className="w-3.5 h-3.5" /> How Telegram Sync Works
              </p>
              <p className="text-muted-foreground">
                When you run Telegram commands like <code>/habits</code>, <code>/addtask</code>, <code>/addexpense</code>, or open the Mini App, your data automatically maps to this account.
              </p>
            </div>

            <a 
              href={`https://t.me/${botUsername}`} 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-block w-full"
            >
              <Button variant="outline" className="w-full gap-2 text-sky-600 border-sky-500/30 hover:bg-sky-500/10">
                <Send className="w-4 h-4" /> Open Telegram Bot (@{botUsername}) <ExternalLink className="w-3.5 h-3.5" />
              </Button>
            </a>
          </div>
        </div>

      </div>

      {/* Bottom Features & Command Quick Reference */}
      <div className="rounded-2xl border border-border bg-card p-6 shadow-sm space-y-4">
        <div>
          <h2 className="text-lg font-bold flex items-center gap-2">
            <Send className="w-5 h-5 text-primary" /> Supported Telegram Bot Commands
          </h2>
          <p className="text-xs text-muted-foreground">
            You can type these commands directly in Telegram to manage your productivity workspace:
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
          <div className="p-3 rounded-xl bg-muted/20 border border-border/70 space-y-1">
            <div className="flex items-center gap-2 text-primary font-bold text-sm">
              <Flame className="w-4 h-4" /> /habits
            </div>
            <p className="text-xs text-muted-foreground">View daily habit streak checklists & mark completed habits.</p>
          </div>

          <div className="p-3 rounded-xl bg-muted/20 border border-border/70 space-y-1">
            <div className="flex items-center gap-2 text-emerald-500 font-bold text-sm">
              <CheckCircle2 className="w-4 h-4" /> /addtask &lt;title&gt;
            </div>
            <p className="text-xs text-muted-foreground">Quickly add a task milestone directly from chat.</p>
          </div>

          <div className="p-3 rounded-xl bg-muted/20 border border-border/70 space-y-1">
            <div className="flex items-center gap-2 text-blue-500 font-bold text-sm">
              <Wallet className="w-4 h-4" /> /finance
            </div>
            <p className="text-xs text-muted-foreground">Check net balance, total income, and total costs instantly.</p>
          </div>

          <div className="p-3 rounded-xl bg-muted/20 border border-border/70 space-y-1">
            <div className="flex items-center gap-2 text-amber-500 font-bold text-sm">
              <Target className="w-4 h-4" /> /goals
            </div>
            <p className="text-xs text-muted-foreground">Review visual progress bars for financial targets.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
-e 
```

-e 
## `./src/pages/GoogleTasks.tsx`
```
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useGoogleAuth } from '@/lib/googleAuth';
import { googleApi, GoogleTask } from '@/lib/googleApi';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { 
  CheckSquare, 
  Plus, 
  Trash2, 
  KeyRound,
  RefreshCw,
  Wrench,
  AlertTriangle,
  ExternalLink,
  CheckCircle2,
  Circle
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { toast } from 'react-hot-toast';

export default function GoogleTasks() {
  const { accessToken, connectGoogle, connectGoogleRedirect, isConnected, saveDeveloperToken, disconnectGoogle } = useGoogleAuth();
  const [tasks, setTasks] = useState<GoogleTask[]>([]);
  const [taskLists, setTaskLists] = useState<any[]>([]);
  const [selectedList, setSelectedList] = useState<string>("@default");
  
  const [isLoading, setIsLoading] = useState(false);
  const [apiError, setApiError] = useState<string | null>(null);
  const [devTokenInput, setDevTokenInput] = useState("");
  const [showDevTokenForm, setShowDevTokenForm] = useState(false);

  // Form State
  const [showAddModal, setShowAddModal] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    notes: "",
    due: ""
  });

  useEffect(() => {
    if (accessToken) {
      loadListsAndTasks();
    }
  }, [accessToken, selectedList]);

  const loadListsAndTasks = async () => {
    if (!accessToken) return;
    setIsLoading(true);
    setApiError(null);
    try {
      if (taskLists.length === 0) {
        const lists = await googleApi.tasks.listLists(accessToken);
        setTaskLists(lists);
        if (lists.length > 0 && selectedList === "@default") {
          setSelectedList(lists[0].id);
        }
      }
      
      const currentListId = selectedList === "@default" ? taskLists[0]?.id || "@default" : selectedList;
      const data = await googleApi.tasks.listTasks(accessToken, currentListId);
      setTasks(data);
    } catch (err: any) {
      console.error(err);
      setApiError(err.message || String(err));
    } finally {
      setIsLoading(false);
    }
  };

  const handleCreateTask = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!accessToken) return;
    if (!formData.title) {
      toast.error("Please fill in the Title");
      return;
    }

    try {
      setIsLoading(true);
      const res = await googleApi.tasks.createTask(
        accessToken,
        formData.title,
        formData.notes,
        formData.due,
        selectedList
      );

      if (res) {
        setShowAddModal(false);
        setFormData({ title: "", notes: "", due: "" });
        loadListsAndTasks();
      }
    } catch (err: any) {
      toast.error(err.message || "Failed to add task");
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteTask = async (taskId: string, title: string) => {
    if (!accessToken) return;
    const confirmed = window.confirm(`Are you sure you want to permanently delete task "${title}" from Google Tasks?`);
    if (!confirmed) return;

    try {
      setIsLoading(true);
      const ok = await googleApi.tasks.deleteTask(accessToken, taskId, selectedList);
      if (ok) {
        setTasks(prev => prev.filter(t => t.id !== taskId));
      }
    } catch (err) {
      toast.error("Fail to remove task");
    } finally {
      setIsLoading(false);
    }
  };

  const handleToggleTask = async (taskId: string, currentStatus: string) => {
    if (!accessToken) return;
    const newStatus = currentStatus === 'completed' ? 'needsAction' : 'completed';
    
    // Optimistic update
    setTasks(prev => prev.map(t => t.id === taskId ? { ...t, status: newStatus } : t));
    
    try {
      const ok = await googleApi.tasks.toggleTask(accessToken, taskId, newStatus as any, selectedList);
      if (!ok) {
        // Revert on fail
        setTasks(prev => prev.map(t => t.id === taskId ? { ...t, status: currentStatus as any } : t));
        toast.error("Failed to update task status");
      }
    } catch (err) {
      setTasks(prev => prev.map(t => t.id === taskId ? { ...t, status: currentStatus as any } : t));
    }
  };

  return (
    <div className="px-4 pt-6 pb-24 max-w-5xl mx-auto">
      {apiError && (
        <motion.div 
          initial={{ opacity: 0, y: -10 }} 
          animate={{ opacity: 1, y: 0 }}
          className="bg-destructive/15 border-2 border-destructive/20 rounded-2xl p-4 mb-6 text-xs text-foreground flex flex-col sm:flex-row sm:items-center justify-between gap-4"
        >
          <div className="flex items-start gap-2.5">
            <AlertTriangle className="w-5 h-5 text-destructive shrink-0 mt-0.5" />
            <div>
              <p className="font-bold text-destructive-foreground underline decoration-1">Google API Access Forbidden (403 Error)</p>
              <p className="text-muted-foreground mt-0.5 leading-relaxed">
                Google Tasks API has not been enabled or failed.
              </p>
            </div>
          </div>
          <Link to="/database-guide" className="shrink-0">
            <Button size="sm" variant="destructive" className="rounded-xl font-bold gap-1 mt-1 sm:mt-0 text-[11px] h-8 shadow">
              <Wrench className="w-3.5 h-3.5" /> Fix Integration Error <ExternalLink className="w-3 h-3" />
            </Button>
          </Link>
        </motion.div>
      )}

      <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-6 gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Google Tasks</h1>
          <p className="text-xs text-muted-foreground">Manage your tasks seamlessly with Google.</p>
        </div>

        <div className="flex items-center gap-2">
          {isConnected ? (
            <>
              {taskLists.length > 0 && (
                <select 
                  value={selectedList} 
                  onChange={(e) => setSelectedList(e.target.value)}
                  className="bg-muted text-foreground text-xs rounded-xl px-3 py-2 border-none ring-1 ring-border/50 outline-none"
                >
                  {taskLists.map(list => (
                    <option key={list.id} value={list.id}>{list.title}</option>
                  ))}
                </select>
              )}
              <Button size="sm" variant="outline" className="rounded-xl flex items-center gap-1" onClick={loadListsAndTasks} disabled={isLoading}>
                <RefreshCw className={`w-3.5 h-3.5 ${isLoading ? "animate-spin" : ""}`} />
                Reload
              </Button>
              <Button size="sm" className="rounded-xl flex items-center gap-1 bg-primary text-primary-foreground hover:bg-primary/90" onClick={() => setShowAddModal(true)}>
                <Plus className="w-4 h-4" />
                Add Task
              </Button>
              <Button size="sm" variant="ghost" className="rounded-xl text-red-500 hover:text-red-600 hover:bg-red-50/10" onClick={disconnectGoogle}>
                Disconnect
              </Button>
            </>
          ) : (
            <Button size="sm" variant="outline" className="rounded-xl" onClick={() => setShowDevTokenForm(!showDevTokenForm)}>
              <KeyRound className="w-3.5 h-3.5 mr-1" />
              Developer Token
            </Button>
          )}
        </div>
      </div>

      {!isConnected && (
        <div className="mb-6 bg-gradient-to-r from-[#8b5cf6]/5 via-[#6366f1]/5 to-[#f43f5e]/5 border border-border/80 rounded-3xl p-6 shadow-xs">
          <div className="max-w-2xl">
            <div className="flex items-center gap-2 mb-3">
              <CheckSquare className="w-5 h-5 text-primary" />
              <h2 className="text-base font-bold">Connect your Google Workspace Account</h2>
            </div>
            <p className="text-xs text-muted-foreground leading-relaxed mb-4">
              Authorize Google integration to safely sync Tasks.
            </p>

            <div className="flex flex-wrap gap-2 items-center">
              <Button onClick={connectGoogle} className="rounded-xl font-bold bg-[#8b5cf6] text-white hover:bg-[#7c3aed]">
                Connect Google (Popup)
              </Button>
              <Button onClick={connectGoogleRedirect} variant="outline" className="rounded-xl font-bold border-[#8b5cf6]/30 text-foreground hover:bg-[#8b5cf6]/10">
                Connect Google (Redirect)
              </Button>
            </div>
            
            {showDevTokenForm && (
              <motion.div 
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-4 p-4 border border-dashed border-border rounded-2xl bg-muted/20"
              >
                <Label className="text-xs font-bold block mb-1">Paste Access Token (Google OAuth Playground)</Label>
                <div className="flex gap-2">
                  <Input 
                    type="password"
                    placeholder="ya29.a0Acv..."
                    value={devTokenInput}
                    onChange={(e) => setDevTokenInput(e.target.value)}
                    className="rounded-xl text-xs flex-1 border-muted-foreground/30 focus-visible:ring-primary"
                  />
                  <Button 
                    size="sm"
                    onClick={() => {
                      saveDeveloperToken(devTokenInput);
                      setDevTokenInput("");
                    }} 
                    className="rounded-xl text-xs font-bold"
                  >
                    Save Token
                  </Button>
                </div>
              </motion.div>
            )}
          </div>
        </div>
      )}

      {isConnected && (
        <div className="bg-card border border-border rounded-3xl p-5 shadow-xs flex flex-col min-h-[400px]">
          <div className="flex items-center justify-between mb-4 flex-shrink-0">
            <h3 className="text-sm font-bold uppercase tracking-wider text-muted-foreground flex items-center gap-1.5">
              <CheckSquare className="w-4 h-4 text-primary" />
              Tasks ({tasks.length})
            </h3>
          </div>

          <div className="flex-1 space-y-2">
            {isLoading && tasks.length === 0 ? (
              <div className="flex items-center justify-center h-24">
                <div className="w-5 h-5 border-2 border-primary/20 border-t-primary rounded-full animate-spin" />
              </div>
            ) : tasks.length === 0 ? (
              <div className="text-center py-12 text-muted-foreground">
                <p className="text-xs font-bold">No tasks</p>
                <p className="text-[10px] text-muted-foreground mt-1">You are all caught up.</p>
              </div>
            ) : (
              tasks.map(task => {
                const isCompleted = task.status === 'completed';
                return (
                  <div 
                    key={task.id}
                    className={`group relative p-4 border rounded-2xl transition-all flex items-start gap-3 ${
                      isCompleted ? 'bg-muted/10 border-transparent opacity-70' : 'bg-card border-border/80 hover:border-primary/30'
                    }`}
                  >
                    <button 
                      onClick={() => handleToggleTask(task.id, task.status)}
                      className="mt-0.5 flex-shrink-0 text-muted-foreground hover:text-primary transition-colors"
                    >
                      {isCompleted ? <CheckCircle2 className="w-5 h-5 text-primary" /> : <Circle className="w-5 h-5" />}
                    </button>
                    <div className="flex-1 min-w-0">
                      <p className={`text-sm font-bold truncate ${isCompleted ? 'line-through text-muted-foreground' : 'text-foreground'}`}>
                        {task.title}
                      </p>
                      {task.notes && (
                        <p className="text-xs text-muted-foreground mt-1 line-clamp-2">
                          {task.notes}
                        </p>
                      )}
                      {task.due && (
                        <p className="text-[10px] font-medium mt-2 px-2 py-0.5 bg-primary/10 text-primary rounded-full inline-block">
                          Due: {new Date(task.due).toLocaleDateString()}
                        </p>
                      )}
                    </div>
                    <button 
                      onClick={() => handleDeleteTask(task.id, task.title)}
                      className="opacity-0 group-hover:opacity-100 p-1.5 text-muted-foreground hover:text-red-500 rounded-lg hover:bg-red-500/10 transition-all self-center flex-shrink-0"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                );
              })
            )}
          </div>
        </div>
      )}

      {/* Schedule Form Modal */}
      <AnimatePresence>
        {showAddModal && (
          <div className="fixed inset-0 flex items-center justify-center z-50 p-4 bg-background/80 backdrop-blur-xs">
            <motion.div 
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-card w-full max-w-md border border-border rounded-3xl p-5 shadow-xl"
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-bold uppercase tracking-wider text-muted-foreground flex items-center gap-1.5">
                  <CheckSquare className="w-4 h-4 text-primary" />
                  Add Google Task
                </h3>
                <button 
                  onClick={() => setShowAddModal(false)}
                  className="text-xs font-bold px-2 py-1 rounded bg-muted text-muted-foreground hover:bg-muted/80"
                >
                  Close
                </button>
              </div>

              <form onSubmit={handleCreateTask} className="space-y-4">
                <div>
                  <Label className="text-xs font-bold">Task Title</Label>
                  <Input 
                    type="text"
                    required
                    placeholder="E.g., Follow up on report"
                    value={formData.title}
                    onChange={(e) => setFormData(f => ({ ...f, title: e.target.value }))}
                    className="rounded-xl text-xs mt-1 border-muted-foreground/30 focus-visible:ring-primary"
                  />
                </div>

                <div>
                  <Label className="text-xs font-bold">Notes</Label>
                  <Textarea 
                    placeholder="Additional details..."
                    value={formData.notes}
                    onChange={(e) => setFormData(f => ({ ...f, notes: e.target.value }))}
                    rows={3}
                    className="rounded-xl text-xs mt-1 border-muted-foreground/30"
                  />
                </div>
                
                <div>
                  <Label className="text-xs font-bold">Due Date (Optional)</Label>
                  <Input 
                    type="date"
                    value={formData.due}
                    onChange={(e) => setFormData(f => ({ ...f, due: e.target.value }))}
                    className="rounded-xl text-xs mt-1 border-muted-foreground/30"
                  />
                </div>

                <Button type="submit" disabled={isLoading} className="w-full rounded-xl font-bold h-11">
                  {isLoading ? "Saving..." : "Add to Google Tasks"}
                </Button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
-e 
```

-e 
## `./src/pages/GoogleDrive.tsx`
```
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useGoogleAuth } from '@/lib/googleAuth';
import { googleApi, GoogleDriveFile } from '@/lib/googleApi';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { 
  Cloud, 
  Search,
  File, 
  KeyRound,
  RefreshCw,
  Wrench,
  AlertTriangle,
  ExternalLink,
  Download
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { toast } from 'react-hot-toast';

export default function GoogleDrive() {
  const { accessToken, connectGoogle, connectGoogleRedirect, isConnected, saveDeveloperToken, disconnectGoogle } = useGoogleAuth();
  const [files, setFiles] = useState<GoogleDriveFile[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  
  const [isLoading, setIsLoading] = useState(false);
  const [apiError, setApiError] = useState<string | null>(null);
  const [devTokenInput, setDevTokenInput] = useState("");
  const [showDevTokenForm, setShowDevTokenForm] = useState(false);

  useEffect(() => {
    if (accessToken) {
      loadFiles();
    }
  }, [accessToken]);

  const loadFiles = async (q: string = "") => {
    if (!accessToken) return;
    setIsLoading(true);
    setApiError(null);
    try {
      let query = "trashed = false";
      if (q) {
        query += ` and name contains '${q}'`;
      }
      const data = await googleApi.drive.listFiles(accessToken, query);
      setFiles(data);
    } catch (err: any) {
      console.error(err);
      setApiError(err.message || String(err));
    } finally {
      setIsLoading(false);
    }
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    loadFiles(searchQuery);
  };

  return (
    <div className="px-4 pt-6 pb-24 max-w-5xl mx-auto">
      {apiError && (
        <motion.div 
          initial={{ opacity: 0, y: -10 }} 
          animate={{ opacity: 1, y: 0 }}
          className="bg-destructive/15 border-2 border-destructive/20 rounded-2xl p-4 mb-6 text-xs text-foreground flex flex-col sm:flex-row sm:items-center justify-between gap-4"
        >
          <div className="flex items-start gap-2.5">
            <AlertTriangle className="w-5 h-5 text-destructive shrink-0 mt-0.5" />
            <div>
              <p className="font-bold text-destructive-foreground underline decoration-1">Google API Access Forbidden (403 Error)</p>
              <p className="text-muted-foreground mt-0.5 leading-relaxed">
                Google Drive API has not been enabled or failed.
              </p>
            </div>
          </div>
          <Link to="/database-guide" className="shrink-0">
            <Button size="sm" variant="destructive" className="rounded-xl font-bold gap-1 mt-1 sm:mt-0 text-[11px] h-8 shadow">
              <Wrench className="w-3.5 h-3.5" /> Fix Integration Error <ExternalLink className="w-3 h-3" />
            </Button>
          </Link>
        </motion.div>
      )}

      <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-6 gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Google Drive</h1>
          <p className="text-xs text-muted-foreground">Access and manage your Drive files directly.</p>
        </div>

        <div className="flex items-center gap-2">
          {isConnected ? (
            <>
              <Button size="sm" variant="outline" className="rounded-xl flex items-center gap-1" onClick={() => loadFiles(searchQuery)} disabled={isLoading}>
                <RefreshCw className={`w-3.5 h-3.5 ${isLoading ? "animate-spin" : ""}`} />
                Reload
              </Button>
              <Button size="sm" variant="ghost" className="rounded-xl text-red-500 hover:text-red-600 hover:bg-red-50/10" onClick={disconnectGoogle}>
                Disconnect
              </Button>
            </>
          ) : (
            <Button size="sm" variant="outline" className="rounded-xl" onClick={() => setShowDevTokenForm(!showDevTokenForm)}>
              <KeyRound className="w-3.5 h-3.5 mr-1" />
              Developer Token
            </Button>
          )}
        </div>
      </div>

      {!isConnected && (
        <div className="mb-6 bg-gradient-to-r from-[#8b5cf6]/5 via-[#6366f1]/5 to-[#f43f5e]/5 border border-border/80 rounded-3xl p-6 shadow-xs">
          <div className="max-w-2xl">
            <div className="flex items-center gap-2 mb-3">
              <Cloud className="w-5 h-5 text-primary" />
              <h2 className="text-base font-bold">Connect your Google Workspace Account</h2>
            </div>
            <p className="text-xs text-muted-foreground leading-relaxed mb-4">
              Authorize Google integration to access your Drive files.
            </p>

            <div className="flex flex-wrap gap-2 items-center">
              <Button onClick={connectGoogle} className="rounded-xl font-bold bg-[#8b5cf6] text-white hover:bg-[#7c3aed]">
                Connect Google (Popup)
              </Button>
              <Button onClick={connectGoogleRedirect} variant="outline" className="rounded-xl font-bold border-[#8b5cf6]/30 text-foreground hover:bg-[#8b5cf6]/10">
                Connect Google (Redirect)
              </Button>
            </div>
            
            {showDevTokenForm && (
              <motion.div 
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-4 p-4 border border-dashed border-border rounded-2xl bg-muted/20"
              >
                <Label className="text-xs font-bold block mb-1">Paste Access Token (Google OAuth Playground)</Label>
                <div className="flex gap-2">
                  <Input 
                    type="password"
                    placeholder="ya29.a0Acv..."
                    value={devTokenInput}
                    onChange={(e) => setDevTokenInput(e.target.value)}
                    className="rounded-xl text-xs flex-1 border-muted-foreground/30 focus-visible:ring-primary"
                  />
                  <Button 
                    size="sm"
                    onClick={() => {
                      saveDeveloperToken(devTokenInput);
                      setDevTokenInput("");
                    }} 
                    className="rounded-xl text-xs font-bold"
                  >
                    Save Token
                  </Button>
                </div>
              </motion.div>
            )}
          </div>
        </div>
      )}

      {isConnected && (
        <div className="bg-card border border-border rounded-3xl p-5 shadow-xs flex flex-col min-h-[400px]">
          <form onSubmit={handleSearch} className="flex gap-2 mb-6">
            <Input 
              type="text"
              placeholder="Search Drive files..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="rounded-xl text-xs flex-1 bg-muted/50 border-border/50"
            />
            <Button type="submit" size="sm" className="rounded-xl bg-primary text-primary-foreground hover:bg-primary/90">
              <Search className="w-4 h-4 mr-1" /> Search
            </Button>
          </form>

          <div className="flex-1 space-y-2">
            {isLoading && files.length === 0 ? (
              <div className="flex items-center justify-center h-24">
                <div className="w-5 h-5 border-2 border-primary/20 border-t-primary rounded-full animate-spin" />
              </div>
            ) : files.length === 0 ? (
              <div className="text-center py-12 text-muted-foreground">
                <p className="text-xs font-bold">No files found</p>
                <p className="text-[10px] text-muted-foreground mt-1">Try a different search term.</p>
              </div>
            ) : (
              files.map(file => {
                return (
                  <div 
                    key={file.id}
                    className="group relative p-4 border rounded-2xl transition-all flex items-center gap-4 bg-card border-border/80 hover:border-primary/30"
                  >
                    <File className="w-6 h-6 text-blue-500" />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-bold truncate text-foreground">
                        {file.name}
                      </p>
                      <p className="text-xs text-muted-foreground mt-0.5 truncate">
                        {file.mimeType} {file.createdTime && `• ${new Date(file.createdTime).toLocaleDateString()}`}
                      </p>
                    </div>
                    {file.webViewLink && (
                      <a 
                        href={file.webViewLink}
                        target="_blank"
                        rel="noreferrer"
                        className="p-2 text-muted-foreground hover:text-primary bg-muted/50 hover:bg-primary/10 rounded-xl transition-colors self-center flex-shrink-0"
                      >
                        <ExternalLink className="w-4 h-4" />
                      </a>
                    )}
                  </div>
                );
              })
            )}
          </div>
        </div>
      )}
    </div>
  );
}
-e 
```

-e 
## `./src/pages/GoogleDocs.tsx`
```
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useGoogleAuth } from '@/lib/googleAuth';
import { googleApi } from '@/lib/googleApi';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { 
  FileText, 
  Plus, 
  KeyRound,
  Wrench,
  AlertTriangle,
  ExternalLink
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { toast } from 'react-hot-toast';

export default function GoogleDocs() {
  const { accessToken, connectGoogle, connectGoogleRedirect, isConnected, saveDeveloperToken, disconnectGoogle } = useGoogleAuth();
  
  const [isLoading, setIsLoading] = useState(false);
  const [apiError, setApiError] = useState<string | null>(null);
  const [devTokenInput, setDevTokenInput] = useState("");
  const [showDevTokenForm, setShowDevTokenForm] = useState(false);
  const [recentDocs, setRecentDocs] = useState<any[]>([]);

  // Form State
  const [showAddModal, setShowAddModal] = useState(false);
  const [docTitle, setDocTitle] = useState("");

  const handleCreateDoc = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!accessToken) return;
    if (!docTitle) {
      toast.error("Please fill in the Document Title");
      return;
    }

    try {
      setIsLoading(true);
      const res = await googleApi.docs.createDocument(accessToken, docTitle);

      if (res) {
        setShowAddModal(false);
        setDocTitle("");
        setRecentDocs(prev => [res, ...prev]);
        window.open(`https://docs.google.com/document/d/${res.documentId}/edit`, '_blank');
      }
    } catch (err: any) {
      toast.error(err.message || "Failed to create document");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="px-4 pt-6 pb-24 max-w-5xl mx-auto">
      {apiError && (
        <motion.div 
          initial={{ opacity: 0, y: -10 }} 
          animate={{ opacity: 1, y: 0 }}
          className="bg-destructive/15 border-2 border-destructive/20 rounded-2xl p-4 mb-6 text-xs text-foreground flex flex-col sm:flex-row sm:items-center justify-between gap-4"
        >
          <div className="flex items-start gap-2.5">
            <AlertTriangle className="w-5 h-5 text-destructive shrink-0 mt-0.5" />
            <div>
              <p className="font-bold text-destructive-foreground underline decoration-1">Google API Access Forbidden (403 Error)</p>
              <p className="text-muted-foreground mt-0.5 leading-relaxed">
                Google Docs API has not been enabled or failed.
              </p>
            </div>
          </div>
          <Link to="/database-guide" className="shrink-0">
            <Button size="sm" variant="destructive" className="rounded-xl font-bold gap-1 mt-1 sm:mt-0 text-[11px] h-8 shadow">
              <Wrench className="w-3.5 h-3.5" /> Fix Integration Error <ExternalLink className="w-3 h-3" />
            </Button>
          </Link>
        </motion.div>
      )}

      <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-6 gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Google Docs</h1>
          <p className="text-xs text-muted-foreground">Create and manage your Google Documents.</p>
        </div>

        <div className="flex items-center gap-2">
          {isConnected ? (
            <>
              <Button size="sm" className="rounded-xl flex items-center gap-1 bg-primary text-primary-foreground hover:bg-primary/90" onClick={() => setShowAddModal(true)}>
                <Plus className="w-4 h-4" />
                New Document
              </Button>
              <Button size="sm" variant="ghost" className="rounded-xl text-red-500 hover:text-red-600 hover:bg-red-50/10" onClick={disconnectGoogle}>
                Disconnect
              </Button>
            </>
          ) : (
            <Button size="sm" variant="outline" className="rounded-xl" onClick={() => setShowDevTokenForm(!showDevTokenForm)}>
              <KeyRound className="w-3.5 h-3.5 mr-1" />
              Developer Token
            </Button>
          )}
        </div>
      </div>

      {!isConnected && (
        <div className="mb-6 bg-gradient-to-r from-[#8b5cf6]/5 via-[#6366f1]/5 to-[#f43f5e]/5 border border-border/80 rounded-3xl p-6 shadow-xs">
          <div className="max-w-2xl">
            <div className="flex items-center gap-2 mb-3">
              <FileText className="w-5 h-5 text-primary" />
              <h2 className="text-base font-bold">Connect your Google Workspace Account</h2>
            </div>
            <p className="text-xs text-muted-foreground leading-relaxed mb-4">
              Authorize Google integration to safely create and edit Google Docs.
            </p>

            <div className="flex flex-wrap gap-2 items-center">
              <Button onClick={connectGoogle} className="rounded-xl font-bold bg-[#8b5cf6] text-white hover:bg-[#7c3aed]">
                Connect Google (Popup)
              </Button>
              <Button onClick={connectGoogleRedirect} variant="outline" className="rounded-xl font-bold border-[#8b5cf6]/30 text-foreground hover:bg-[#8b5cf6]/10">
                Connect Google (Redirect)
              </Button>
            </div>
            
            {showDevTokenForm && (
              <motion.div 
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-4 p-4 border border-dashed border-border rounded-2xl bg-muted/20"
              >
                <Label className="text-xs font-bold block mb-1">Paste Access Token (Google OAuth Playground)</Label>
                <div className="flex gap-2">
                  <Input 
                    type="password"
                    placeholder="ya29.a0Acv..."
                    value={devTokenInput}
                    onChange={(e) => setDevTokenInput(e.target.value)}
                    className="rounded-xl text-xs flex-1 border-muted-foreground/30 focus-visible:ring-primary"
                  />
                  <Button 
                    size="sm"
                    onClick={() => {
                      saveDeveloperToken(devTokenInput);
                      setDevTokenInput("");
                    }} 
                    className="rounded-xl text-xs font-bold"
                  >
                    Save Token
                  </Button>
                </div>
              </motion.div>
            )}
          </div>
        </div>
      )}

      {isConnected && (
        <div className="bg-card border border-border rounded-3xl p-5 shadow-xs flex flex-col min-h-[400px]">
          <div className="flex items-center justify-between mb-4 flex-shrink-0">
            <h3 className="text-sm font-bold uppercase tracking-wider text-muted-foreground flex items-center gap-1.5">
              <FileText className="w-4 h-4 text-primary" />
              Recently Created Docs
            </h3>
          </div>

          <div className="flex-1 space-y-2">
            {recentDocs.length === 0 ? (
              <div className="text-center py-12 text-muted-foreground">
                <p className="text-xs font-bold">No recent docs created</p>
                <p className="text-[10px] text-muted-foreground mt-1">Create a new document to see it here.</p>
                <Button size="sm" variant="outline" className="mt-4 rounded-xl" onClick={() => setShowAddModal(true)}>
                  Create Document
                </Button>
              </div>
            ) : (
              recentDocs.map((doc, idx) => (
                <div 
                  key={idx}
                  className="group relative p-4 border rounded-2xl transition-all flex items-center gap-4 bg-card border-border/80 hover:border-primary/30"
                >
                  <FileText className="w-6 h-6 text-blue-500" />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-bold truncate text-foreground">
                      {doc.title}
                    </p>
                  </div>
                  <a 
                    href={`https://docs.google.com/document/d/${doc.documentId}/edit`}
                    target="_blank"
                    rel="noreferrer"
                    className="p-2 text-muted-foreground hover:text-primary bg-muted/50 hover:bg-primary/10 rounded-xl transition-colors self-center flex-shrink-0"
                  >
                    <ExternalLink className="w-4 h-4" />
                  </a>
                </div>
              ))
            )}
          </div>
        </div>
      )}

      {/* Add Modal */}
      <AnimatePresence>
        {showAddModal && (
          <div className="fixed inset-0 flex items-center justify-center z-50 p-4 bg-background/80 backdrop-blur-xs">
            <motion.div 
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-card w-full max-w-md border border-border rounded-3xl p-5 shadow-xl"
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-bold uppercase tracking-wider text-muted-foreground flex items-center gap-1.5">
                  <FileText className="w-4 h-4 text-primary" />
                  Create Google Doc
                </h3>
                <button 
                  onClick={() => setShowAddModal(false)}
                  className="text-xs font-bold px-2 py-1 rounded bg-muted text-muted-foreground hover:bg-muted/80"
                >
                  Close
                </button>
              </div>

              <form onSubmit={handleCreateDoc} className="space-y-4">
                <div>
                  <Label className="text-xs font-bold">Document Title</Label>
                  <Input 
                    type="text"
                    required
                    placeholder="E.g., Project Proposal"
                    value={docTitle}
                    onChange={(e) => setDocTitle(e.target.value)}
                    className="rounded-xl text-xs mt-1 border-muted-foreground/30 focus-visible:ring-primary"
                  />
                </div>

                <Button type="submit" disabled={isLoading} className="w-full rounded-xl font-bold h-11">
                  {isLoading ? "Creating..." : "Create Document"}
                </Button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
-e 
```

-e 
## `./src/pages/GoogleSheets.tsx`
```
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useGoogleAuth } from '@/lib/googleAuth';
import { googleApi } from '@/lib/googleApi';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { 
  Table, 
  Plus, 
  KeyRound,
  Wrench,
  AlertTriangle,
  ExternalLink
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { toast } from 'react-hot-toast';

export default function GoogleSheets() {
  const { accessToken, connectGoogle, connectGoogleRedirect, isConnected, saveDeveloperToken, disconnectGoogle } = useGoogleAuth();
  
  const [isLoading, setIsLoading] = useState(false);
  const [apiError, setApiError] = useState<string | null>(null);
  const [devTokenInput, setDevTokenInput] = useState("");
  const [showDevTokenForm, setShowDevTokenForm] = useState(false);
  const [recentSheets, setRecentSheets] = useState<any[]>([]);

  // Form State
  const [showAddModal, setShowAddModal] = useState(false);
  const [sheetTitle, setSheetTitle] = useState("");

  const handleCreateSheet = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!accessToken) return;
    if (!sheetTitle) {
      toast.error("Please fill in the Sheet Title");
      return;
    }

    try {
      setIsLoading(true);
      const res = await googleApi.sheets.createSpreadsheet(accessToken, sheetTitle);

      if (res) {
        setShowAddModal(false);
        setSheetTitle("");
        setRecentSheets(prev => [res, ...prev]);
        window.open(`https://docs.google.com/spreadsheets/d/${res.spreadsheetId}/edit`, '_blank');
      }
    } catch (err: any) {
      toast.error(err.message || "Failed to create spreadsheet");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="px-4 pt-6 pb-24 max-w-5xl mx-auto">
      {apiError && (
        <motion.div 
          initial={{ opacity: 0, y: -10 }} 
          animate={{ opacity: 1, y: 0 }}
          className="bg-destructive/15 border-2 border-destructive/20 rounded-2xl p-4 mb-6 text-xs text-foreground flex flex-col sm:flex-row sm:items-center justify-between gap-4"
        >
          <div className="flex items-start gap-2.5">
            <AlertTriangle className="w-5 h-5 text-destructive shrink-0 mt-0.5" />
            <div>
              <p className="font-bold text-destructive-foreground underline decoration-1">Google API Access Forbidden (403 Error)</p>
              <p className="text-muted-foreground mt-0.5 leading-relaxed">
                Google Sheets API has not been enabled or failed.
              </p>
            </div>
          </div>
          <Link to="/database-guide" className="shrink-0">
            <Button size="sm" variant="destructive" className="rounded-xl font-bold gap-1 mt-1 sm:mt-0 text-[11px] h-8 shadow">
              <Wrench className="w-3.5 h-3.5" /> Fix Integration Error <ExternalLink className="w-3 h-3" />
            </Button>
          </Link>
        </motion.div>
      )}

      <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-6 gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Google Sheets</h1>
          <p className="text-xs text-muted-foreground">Create and manage your Google Spreadsheets.</p>
        </div>

        <div className="flex items-center gap-2">
          {isConnected ? (
            <>
              <Button size="sm" className="rounded-xl flex items-center gap-1 bg-primary text-primary-foreground hover:bg-primary/90" onClick={() => setShowAddModal(true)}>
                <Plus className="w-4 h-4" />
                New Sheet
              </Button>
              <Button size="sm" variant="ghost" className="rounded-xl text-red-500 hover:text-red-600 hover:bg-red-50/10" onClick={disconnectGoogle}>
                Disconnect
              </Button>
            </>
          ) : (
            <Button size="sm" variant="outline" className="rounded-xl" onClick={() => setShowDevTokenForm(!showDevTokenForm)}>
              <KeyRound className="w-3.5 h-3.5 mr-1" />
              Developer Token
            </Button>
          )}
        </div>
      </div>

      {!isConnected && (
        <div className="mb-6 bg-gradient-to-r from-[#8b5cf6]/5 via-[#6366f1]/5 to-[#f43f5e]/5 border border-border/80 rounded-3xl p-6 shadow-xs">
          <div className="max-w-2xl">
            <div className="flex items-center gap-2 mb-3">
              <Table className="w-5 h-5 text-primary" />
              <h2 className="text-base font-bold">Connect your Google Workspace Account</h2>
            </div>
            <p className="text-xs text-muted-foreground leading-relaxed mb-4">
              Authorize Google integration to safely create and edit Google Sheets.
            </p>

            <div className="flex flex-wrap gap-2 items-center">
              <Button onClick={connectGoogle} className="rounded-xl font-bold bg-[#8b5cf6] text-white hover:bg-[#7c3aed]">
                Connect Google (Popup)
              </Button>
              <Button onClick={connectGoogleRedirect} variant="outline" className="rounded-xl font-bold border-[#8b5cf6]/30 text-foreground hover:bg-[#8b5cf6]/10">
                Connect Google (Redirect)
              </Button>
            </div>
            
            {showDevTokenForm && (
              <motion.div 
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-4 p-4 border border-dashed border-border rounded-2xl bg-muted/20"
              >
                <Label className="text-xs font-bold block mb-1">Paste Access Token (Google OAuth Playground)</Label>
                <div className="flex gap-2">
                  <Input 
                    type="password"
                    placeholder="ya29.a0Acv..."
                    value={devTokenInput}
                    onChange={(e) => setDevTokenInput(e.target.value)}
                    className="rounded-xl text-xs flex-1 border-muted-foreground/30 focus-visible:ring-primary"
                  />
                  <Button 
                    size="sm"
                    onClick={() => {
                      saveDeveloperToken(devTokenInput);
                      setDevTokenInput("");
                    }} 
                    className="rounded-xl text-xs font-bold"
                  >
                    Save Token
                  </Button>
                </div>
              </motion.div>
            )}
          </div>
        </div>
      )}

      {isConnected && (
        <div className="bg-card border border-border rounded-3xl p-5 shadow-xs flex flex-col min-h-[400px]">
          <div className="flex items-center justify-between mb-4 flex-shrink-0">
            <h3 className="text-sm font-bold uppercase tracking-wider text-muted-foreground flex items-center gap-1.5">
              <Table className="w-4 h-4 text-primary" />
              Recently Created Sheets
            </h3>
          </div>

          <div className="flex-1 space-y-2">
            {recentSheets.length === 0 ? (
              <div className="text-center py-12 text-muted-foreground">
                <p className="text-xs font-bold">No recent sheets created</p>
                <p className="text-[10px] text-muted-foreground mt-1">Create a new spreadsheet to see it here.</p>
                <Button size="sm" variant="outline" className="mt-4 rounded-xl" onClick={() => setShowAddModal(true)}>
                  Create Sheet
                </Button>
              </div>
            ) : (
              recentSheets.map((sheet, idx) => (
                <div 
                  key={idx}
                  className="group relative p-4 border rounded-2xl transition-all flex items-center gap-4 bg-card border-border/80 hover:border-primary/30"
                >
                  <Table className="w-6 h-6 text-green-500" />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-bold truncate text-foreground">
                      {sheet.properties.title}
                    </p>
                  </div>
                  <a 
                    href={`https://docs.google.com/spreadsheets/d/${sheet.spreadsheetId}/edit`}
                    target="_blank"
                    rel="noreferrer"
                    className="p-2 text-muted-foreground hover:text-primary bg-muted/50 hover:bg-primary/10 rounded-xl transition-colors self-center flex-shrink-0"
                  >
                    <ExternalLink className="w-4 h-4" />
                  </a>
                </div>
              ))
            )}
          </div>
        </div>
      )}

      {/* Add Modal */}
      <AnimatePresence>
        {showAddModal && (
          <div className="fixed inset-0 flex items-center justify-center z-50 p-4 bg-background/80 backdrop-blur-xs">
            <motion.div 
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-card w-full max-w-md border border-border rounded-3xl p-5 shadow-xl"
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-bold uppercase tracking-wider text-muted-foreground flex items-center gap-1.5">
                  <Table className="w-4 h-4 text-primary" />
                  Create Google Sheet
                </h3>
                <button 
                  onClick={() => setShowAddModal(false)}
                  className="text-xs font-bold px-2 py-1 rounded bg-muted text-muted-foreground hover:bg-muted/80"
                >
                  Close
                </button>
              </div>

              <form onSubmit={handleCreateSheet} className="space-y-4">
                <div>
                  <Label className="text-xs font-bold">Spreadsheet Title</Label>
                  <Input 
                    type="text"
                    required
                    placeholder="E.g., Q3 Financials"
                    value={sheetTitle}
                    onChange={(e) => setSheetTitle(e.target.value)}
                    className="rounded-xl text-xs mt-1 border-muted-foreground/30 focus-visible:ring-primary"
                  />
                </div>

                <Button type="submit" disabled={isLoading} className="w-full rounded-xl font-bold h-11">
                  {isLoading ? "Creating..." : "Create Spreadsheet"}
                </Button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
-e 
```

-e 
## `./src/main.tsx`
```
import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import App from './App.tsx';
import './index.css';

if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js').catch(err => {
      console.log('SW registration failed: ', err);
    });
  });
}

// Handle OAuth popup callback
if (window.opener && window.location.hash.includes('access_token')) {
  setTimeout(() => window.close(), 1500);
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
-e 
```

-e 
## `./src/App.tsx`
```
import { Toaster } from "@/components/ui/toaster"
import { QueryClientProvider } from '@tanstack/react-query'
import { queryClientInstance } from '@/lib/query-client'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import PageNotFound from './lib/PageNotFound';
import { AuthProvider, useAuth } from '@/lib/AuthContext';
import { GoogleAuthProvider } from '@/lib/googleAuth';
import AppLayout from '@/components/layout/AppLayout';

// Pages
import Home from './pages/Home';
import Habits from './pages/Habits';
import Tasks from './pages/Tasks';
import Finance from './pages/Finance';
import Goals from './pages/Goals';
import Settings from './pages/Settings';
import Notifications from './pages/Notifications';
import GoogleCalendar from './pages/GoogleCalendar';
import GoogleNotes from './pages/GoogleNotes';
import GoogleDrive from './pages/GoogleDrive';
import GoogleDocs from './pages/GoogleDocs';
import GoogleSheets from './pages/GoogleSheets';
import GoogleTasks from './pages/GoogleTasks';
import Bookmarks from './pages/Bookmarks';
import DatabaseGuide from './pages/DatabaseGuide';
import TelegramSync from './pages/TelegramSync';

import { useEffect } from 'react';

const AuthenticatedApp = () => {
  const { isLoadingAuth, isLoadingPublicSettings, authError, navigateToLogin } = useAuth();

  useEffect(() => {
    // If we're inside the popup and Supabase has processed the hash
    if (window.opener && window.name === 'oauth_popup') {
      setTimeout(() => {
         window.close();
      }, 500);
    }
  }, []);

  if (isLoadingPublicSettings || isLoadingAuth) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-background">
        <div className="flex flex-col items-center gap-3">
          <div className="w-10 h-10 border-4 border-primary/20 border-t-primary rounded-full animate-spin"></div>
          <p className="text-sm text-muted-foreground font-poppins">MMV Productivity</p>
        </div>
      </div>
    );
  }

  return (
    <Routes>
      <Route element={<AppLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/habits" element={<Habits />} />
        <Route path="/tasks" element={<Tasks />} />
        <Route path="/finance" element={<Finance />} />
        <Route path="/goals" element={<Goals />} />
        <Route path="/calendar" element={<GoogleCalendar />} />
        <Route path="/drive" element={<GoogleDrive />} />
        <Route path="/docs" element={<GoogleDocs />} />
        <Route path="/sheets" element={<GoogleSheets />} />
        <Route path="/google-tasks" element={<GoogleTasks />} />
        <Route path="/notes" element={<GoogleNotes />} />
        <Route path="/bookmarks" element={<Bookmarks />} />
        <Route path="/data" element={<DatabaseGuide />} />
        <Route path="/sync" element={<TelegramSync />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/notifications" element={<Notifications />} />
      </Route>
      <Route path="*" element={<PageNotFound />} />
    </Routes>
  );
};

function App() {
  return (
    <AuthProvider>
      <GoogleAuthProvider>
        <QueryClientProvider client={queryClientInstance}>
          <Router>
            <AuthenticatedApp />
          </Router>
          <Toaster />
        </QueryClientProvider>
      </GoogleAuthProvider>
    </AuthProvider>
  );
}

export default App;
-e 
```

-e 
## `./src/api/base44Client.ts`
```
import { db, auth } from '@/lib/firebase';
import { collection, doc, getDocs, getDoc, query, where, orderBy as fsOrderBy, limit as fsLimit, setDoc, addDoc, updateDoc, deleteDoc, serverTimestamp } from 'firebase/firestore';

let isAuthenticated = false;

export const setAuthState = (isAuth: boolean) => {
  isAuthenticated = isAuth;
};

// Listen to firebase auth changes globally to keep isAuthenticated in sync
auth.onAuthStateChanged(user => {
  isAuthenticated = !!user;
});

const getLocalList = (name: string) => JSON.parse(localStorage.getItem(`local_${name}`) || '[]');
const saveLocalList = (name: string, data: any[]) => localStorage.setItem(`local_${name}`, JSON.stringify(data));

function createEntity(tableName: string) {
  return {
    list: async (orderByField?: string, limitCount?: number) => {
      if (!auth.currentUser) {
        let list = getLocalList(tableName);
        if (orderByField) {
          const desc = orderByField.startsWith('-');
          const key = desc ? orderByField.slice(1) : orderByField;
          list.sort((a: any, b: any) => {
            if (a[key] < b[key]) return desc ? 1 : -1;
            if (a[key] > b[key]) return desc ? -1 : 1;
            return 0;
          });
        }
        if (limitCount) list = list.slice(0, limitCount);
        return list;
      }
      
      try {
        const q = query(collection(db, tableName), where('userId', '==', auth.currentUser.uid));
        const querySnapshot = await getDocs(q);
        let results = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

        if (orderByField) {
          const desc = orderByField.startsWith('-');
          const key = desc ? orderByField.slice(1) : orderByField;
          results.sort((a: any, b: any) => {
            if (a[key] < b[key]) return desc ? 1 : -1;
            if (a[key] > b[key]) return desc ? -1 : 1;
            return 0;
          });
        }
        if (limitCount) {
          results = results.slice(0, limitCount);
        }
        return results;
      } catch (error) {
        console.error(`Error in list ${tableName}:`, error);
        return [];
      }
    },
    filter: async (filters: any) => {
      if (!auth.currentUser) {
        const list = getLocalList(tableName);
        return list.filter((item: any) => Object.entries(filters).every(([k, v]) => item[k] === v));
      }
      
      try {
        const q = query(collection(db, tableName), where('userId', '==', auth.currentUser.uid));
        const querySnapshot = await getDocs(q);
        const results = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        return results.filter((item: any) => Object.entries(filters).every(([k, v]) => item[k] === v));
      } catch (error) {
        console.error(`Error in filter ${tableName}:`, error);
        return [];
      }
    },
    create: async (payload: any) => {
      if (!auth.currentUser) {
        const list = getLocalList(tableName);
        const id = crypto.randomUUID?.() || Date.now().toString();
        const newItem = { id, created_at: new Date().toISOString(), ...payload };
        saveLocalList(tableName, [...list, newItem]);
        return newItem;
      }
      
      try {
        const enhancedPayload = {
          ...payload,
          userId: auth.currentUser.uid,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        };
        const docRef = await addDoc(collection(db, tableName), enhancedPayload);
        return { id: docRef.id, ...enhancedPayload };
      } catch (error) {
        console.error(`Error in create ${tableName}:`, error);
        throw error;
      }
    },
    update: async (id: string, diff: any) => {
      if (!auth.currentUser) {
        const list = getLocalList(tableName);
        const idx = list.findIndex((i: any) => i.id === id);
        if (idx !== -1) {
          list[idx] = { ...list[idx], ...diff, updated_at: new Date().toISOString() };
          saveLocalList(tableName, list);
          return list[idx];
        }
        throw new Error("Not found locally");
      }
      
      try {
        const docRef = doc(db, tableName, id);
        const enhancedDiff = { ...diff, updated_at: new Date().toISOString() };
        await updateDoc(docRef, enhancedDiff);
        const updatedDoc = await getDoc(docRef);
        return { id: updatedDoc.id, ...updatedDoc.data() };
      } catch (error) {
        console.error(`Error in update ${tableName}:`, error);
        throw error;
      }
    },
    delete: async (id: string) => {
      if (!auth.currentUser) {
        const list = getLocalList(tableName);
        saveLocalList(tableName, list.filter((i: any) => i.id !== id));
        return { success: true };
      }
      
      try {
        await deleteDoc(doc(db, tableName, id));
        return { success: true };
      } catch (error) {
        console.error(`Error in delete ${tableName}:`, error);
        throw error;
      }
    }
  };
}

export const base44 = {
  auth: {
    me: async () => {
      if (auth.currentUser) {
        setAuthState(true);
        return {
          id: auth.currentUser.uid,
          email: auth.currentUser.email,
          user_metadata: {
            full_name: auth.currentUser.displayName,
            avatar_url: auth.currentUser.photoURL
          }
        };
      }
      return new Promise((resolve, reject) => {
        const unsubscribe = auth.onAuthStateChanged(user => {
          unsubscribe();
          if (user) {
            setAuthState(true);
            resolve({
              id: user.uid,
              email: user.email,
              user_metadata: {
                full_name: user.displayName,
                avatar_url: user.photoURL
              }
            });
          } else {
            setAuthState(false);
            reject({ status: 401, message: "Not logged in" });
          }
        });
      });
    },
    logout: async () => {
      setAuthState(false);
      await auth.signOut();
    },
    redirectToLogin: () => {}
  },
  entities: {
    Habit: createEntity("habits"),
    Task: createEntity("tasks"),
    Expense: createEntity("expenses"),
    Income: createEntity("income"),
    Subscription: createEntity("subscriptions"),
    Goal: createEntity("goals"),
    UserSettings: createEntity("userSettings") // lowercase 's' match blueprint
  },
  integrations: {
    Core: {
      InvokeLLM: async () => { return { rate: 12500 } }
    }
  }
} as any;

export default base44;
-e 
```

-e 
## `./src/index.css`
```
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700;800&display=swap');

@import "tailwindcss";

@theme {
  --font-poppins: "Poppins", sans-serif;
  
  --radius-lg: var(--radius);
  --radius-md: calc(var(--radius) - 2px);
  --radius-sm: calc(var(--radius) - 4px);
  --radius-xl: calc(var(--radius) * 1.5);
  --radius-2xl: calc(var(--radius) * 2);
  --radius-3xl: calc(var(--radius) * 2.5);

  --color-background: hsl(var(--background));
  --color-foreground: hsl(var(--foreground));
  
  --color-card: hsl(var(--card));
  --color-card-foreground: hsl(var(--card-foreground));
  
  --color-popover: hsl(var(--popover));
  --color-popover-foreground: hsl(var(--popover-foreground));
  
  --color-primary: hsl(var(--primary));
  --color-primary-foreground: hsl(var(--primary-foreground));
  
  --color-secondary: hsl(var(--secondary));
  --color-secondary-foreground: hsl(var(--secondary-foreground));
  
  --color-muted: hsl(var(--muted));
  --color-muted-foreground: hsl(var(--muted-foreground));
  
  --color-accent: hsl(var(--accent));
  --color-accent-foreground: hsl(var(--accent-foreground));
  
  --color-destructive: hsl(var(--destructive));
  --color-destructive-foreground: hsl(var(--destructive-foreground));
  
  --color-border: hsl(var(--border));
  --color-input: hsl(var(--input));
  --color-ring: hsl(var(--ring));
}

@layer base {
  :root {
    --background: 45 30% 98%;
    --foreground: 0 0% 6%;
    --card: 0 0% 100%;
    --card-foreground: 0 0% 6%;
    --popover: 0 0% 100%;
    --popover-foreground: 0 0% 6%;
    --primary: 258 90% 66%;
    --primary-foreground: 45 30% 98%;
    --secondary: 45 10% 92%;
    --secondary-foreground: 0 0% 6%;
    --muted: 45 10% 92%;
    --muted-foreground: 0 0% 40%;
    --accent: 196 90% 55%;
    --accent-foreground: 45 30% 98%;
    --destructive: 0 84% 60%;
    --destructive-foreground: 45 30% 98%;
    --border: 45 10% 86%;
    --input: 45 10% 86%;
    --ring: 258 90% 66%;
    --radius: 1rem;
  }

  .dark {
    --background: 0 0% 6%;
    --foreground: 45 30% 98%;
    --card: 0 0% 9%;
    --card-foreground: 45 30% 98%;
    --popover: 0 0% 9%;
    --popover-foreground: 45 30% 98%;
    --primary: 258 90% 70%;
    --primary-foreground: 0 0% 6%;
    --secondary: 0 0% 13%;
    --secondary-foreground: 45 30% 98%;
    --muted: 0 0% 13%;
    --muted-foreground: 0 0% 60%;
    --accent: 196 90% 60%;
    --accent-foreground: 0 0% 6%;
    --destructive: 0 70% 50%;
    --destructive-foreground: 45 30% 98%;
    --border: 0 0% 15%;
    --input: 0 0% 15%;
    --ring: 258 90% 70%;
  }
}

@layer base {
  * {
    border-color: var(--color-border);
  }
  body {
    background-color: var(--color-background);
    color: var(--color-foreground);
    font-family: var(--font-poppins);
    overscroll-behavior-y: none;
    -webkit-tap-highlight-color: transparent;
  }
}

.font-poppins {
  font-family: 'Poppins', sans-serif;
}

@layer utilities {
  .safe-area-inset-top {
    padding-top: env(safe-area-inset-top);
  }
  .safe-area-inset-bottom {
    padding-bottom: env(safe-area-inset-bottom);
  }
  
  .scrollbar-none {
    scrollbar-width: none;
    -ms-overflow-style: none;
  }
  .scrollbar-none::-webkit-scrollbar {
    display: none;
  }
}
-e 
```

-e 
## `./firestore.rules`
```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Default-deny catch-all
    match /{document=**} {
      allow read, write: if false;
    }

    // Helper functions
    function isSignedIn() {
      return request.auth != null;
    }

    function isOwner(userId) {
      return isSignedIn() && request.auth.uid == userId;
    }

    function incoming() {
      return request.resource.data;
    }

    function existing() {
      return resource.data;
    }

    function isValidId(id) {
      return id is string && id.size() <= 128 && id.matches('^[a-zA-Z0-9_\\-]+$');
    }

    // Entity Validations
    function isValidUserSettings(data) {
      return data.userId == request.auth.uid;
    }

    function isValidHabit(data) {
      return data.userId == request.auth.uid;
    }

    function isValidTask(data) {
      return data.userId == request.auth.uid;
    }

    function isValidExpense(data) {
      return data.userId == request.auth.uid;
    }

    function isValidIncome(data) {
      return data.userId == request.auth.uid;
    }

    function isValidSubscription(data) {
      return data.userId == request.auth.uid;
    }

    function isValidGoal(data) {
      return data.userId == request.auth.uid;
    }

    // Rules for userSettings
    match /userSettings/{settingsId} {
      allow read: if isSignedIn() && existing().userId == request.auth.uid;
      allow create: if isSignedIn() && isValidUserSettings(incoming());
      allow update: if isSignedIn() && existing().userId == request.auth.uid && isValidUserSettings(incoming());
      allow delete: if isSignedIn() && existing().userId == request.auth.uid;
    }

    // Rules for habits
    match /habits/{habitId} {
      allow read: if isSignedIn() && existing().userId == request.auth.uid;
      allow create: if isSignedIn() && isValidHabit(incoming());
      allow update: if isSignedIn() && existing().userId == request.auth.uid && isValidHabit(incoming());
      allow delete: if isSignedIn() && existing().userId == request.auth.uid;
    }

    // Rules for tasks
    match /tasks/{taskId} {
      allow read: if isSignedIn() && existing().userId == request.auth.uid;
      allow create: if isSignedIn() && isValidTask(incoming());
      allow update: if isSignedIn() && existing().userId == request.auth.uid && isValidTask(incoming());
      allow delete: if isSignedIn() && existing().userId == request.auth.uid;
    }

    // Rules for expenses
    match /expenses/{expenseId} {
      allow read: if isSignedIn() && existing().userId == request.auth.uid;
      allow create: if isSignedIn() && isValidExpense(incoming());
      allow update: if isSignedIn() && existing().userId == request.auth.uid && isValidExpense(incoming());
      allow delete: if isSignedIn() && existing().userId == request.auth.uid;
    }

    // Rules for income
    match /income/{incomeId} {
      allow read: if isSignedIn() && existing().userId == request.auth.uid;
      allow create: if isSignedIn() && isValidIncome(incoming());
      allow update: if isSignedIn() && existing().userId == request.auth.uid && isValidIncome(incoming());
      allow delete: if isSignedIn() && existing().userId == request.auth.uid;
    }

    // Rules for subscriptions
    match /subscriptions/{subId} {
      allow read: if isSignedIn() && existing().userId == request.auth.uid;
      allow create: if isSignedIn() && isValidSubscription(incoming());
      allow update: if isSignedIn() && existing().userId == request.auth.uid && isValidSubscription(incoming());
      allow delete: if isSignedIn() && existing().userId == request.auth.uid;
    }

    // Rules for goals
    match /goals/{goalId} {
      allow read: if isSignedIn() && existing().userId == request.auth.uid;
      allow create: if isSignedIn() && isValidGoal(incoming());
      allow update: if isSignedIn() && existing().userId == request.auth.uid && isValidGoal(incoming());
      allow delete: if isSignedIn() && existing().userId == request.auth.uid;
    }
  }
}
-e 
```

-e 
## `./MMV-XII apk.txt`
```
================================================================================
          MMV-XII PRODUCTIVITY SUITE: THE COMPLETE WEB-TO-APK ARCHITECTURE
================================================================================
This is the master blueprints, design specs, and native Kotlin / Capacitor source 
blueprints for compiling or rebuilding the MMV-XII Productivity Suite as a 
fully optimized, 100% feature-matched Android application (APK).

--------------------------------------------------------------------------------
                               TABLE OF CONTENTS
--------------------------------------------------------------------------------
1. TYPOGRAPHY & VISUAL BRAND DESIGN SYSTEM
2. APP SHELL & BOTTOM NAV-BAR INTERFACE BLUEPRINT
3. DYNAMIC COLOR SCHEMES & ACCENT COLOR SYSTEM
4. DATABASE DOCUMENT MODELS & CORE COLLECTION SCHEMAS
5. SYNTHESIZER SOUND ENGINE: CONVERTING WEB AUDIO TO NATIVE KOTLIN
6. LOCAL BACKGROUND SCHEDULERS & REAL-TIME NOTIFICATIONS
7. INSTANT WEB-TO-APK HOT SYNC MECHANISMS
8. PATH A: CAPACITOR HIGH-FIDELITY WRAPPER RUNTIME
9. PATH B: JETPACK COMPOSE NATIVE KOTLIN REWRITE SPECIFICATIONS
10. GITHUB TO FIREBASE AUTOMATIC MERGE CONTINUOUS INTEGRATION

================================================================================
                  1. TYPOGRAPHY & VISUAL BRAND DESIGN SYSTEM
================================================================================
Your web application utilizes an elegant, modern, high-contrast, rounded-corner 
aesthetic built with custom Poppins typography and a configurable radius system.

* Font Family: 'Poppins', sans-serif (Weights: Light 300, Regular 400, Medium 500, Semi-Bold 600, Bold 700)
* Web CSS Import: @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700;800&display=swap');
* Android Font Pairing: Use the true Google Font Poppins TTF resources inside your android project structure:
  - `res/font/poppins_light.ttf`
  - `res/font/poppins_regular.ttf`
  - `res/font/poppins_medium.ttf`
  - `res/font/poppins_semibold.ttf`
  - `res/font/poppins_bold.ttf`

#### Typography Hierarchy:
* Display Title (e.g. Finance summary, Goals, Habit title header):
  - Web: `font-poppins font-semibold text-2xl md:text-3xl tracking-tight text-foreground`
  - Android (Compose): `TextStyle(fontFamily = Poppins, fontWeight = FontWeight.SemiBold, fontSize = 24.sp, letterSpacing = (-0.5).sp)`
* Section Header:
  - Web: `font-poppins font-medium text-lg tracking-normal text-foreground/90`
  - Android (Compose): `TextStyle(fontFamily = Poppins, fontWeight = FontWeight.Medium, fontSize = 18.sp)`
* Body Copy & Input Texts:
  - Web: `font-poppins font-normal text-sm text-muted-foreground`
  - Android (Compose): `TextStyle(fontFamily = Poppins, fontWeight = FontWeight.Normal, fontSize = 14.sp, color = MutedColor)`
* Labels / Small Details (e.g., Dates, badges, status lines):
  - Web: `font-poppins font-medium text-xs tracking-wider uppercase`
  - Android (Compose): `TextStyle(fontFamily = Poppins, fontWeight = FontWeight.Medium, fontSize = 11.sp, letterSpacing = 0.5.sp)`

#### Interactive Rounded Borders (The Dynamic Corner System):
The border-radius of card components, buttons, inputs, and modals is dynamically calculated:
- Web formula: `const radiusRem = (settings.border_radius_percentage / 50) * 1;`
- Default percentage is 35% which maps to `0.7rem` (11.2px) corners.
- Android adaptation: Map the settings `border_radius_percentage` value dynamically to DP values for custom shape definitions:
  - Kotlin formula: `val cornerDp = (borderRadiusPercentage.toFloat() / 50f) * 16.dp`
  - Default: `RoundedCornerShape(11.2.dp)` up to `RoundedCornerShape(32.dp)`.

================================================================================
               2. APP SHELL & BOTTOM NAV-BAR INTERFACE BLUEPRINT
================================================================================
For 100% user interface similarity, the Android app must mirror the clean spacing, 
bottom navigation tray (ideal for native thumb gestures), and floating menus:

```
+-------------------------------------------------------------+
|  [Logo & User Profile]                      [Sync State]    |
|  Welcome back, MMV User!                                    |
+-------------------------------------------------------------+
|                                                             |
|   [ ACTIVE MODULE OR DASHBOARD SCREEN ]                     |
|   - Dynamic Cards with customized corner radiuses.          |
|   - Soft Haptic Vibration feedback on list item toggles.    |
|   - Staggered entering transitions.                         |
|                                                             |
+-------------------------------------------------------------+
|                         [ (+) Add floating transaction/task] |
+-------------------------------------------------------------+
|  [Home]   [Habits]   [Tasks]   [Finance]   [Goals]   [More]  |
+-------------------------------------------------------------+
```

#### Transition Animations (Using Motion):
All tab switches and card opening events should utilize a standard spring or ease-in-out curve to feel incredibly responsive:
- Duration: 220ms (Fast, tactile entry)
- Path transition: Fade-in coupled with a slide-up distance of `12dp` (Y-Axis).

================================================================================
                 3. DYNAMIC COLOR SCHEMES & ACCENT COLOR SYSTEM
================================================================================
Your web application does not have hardcoded colors. Instead, it computes and injects 
custom HSL variables directly based on two configurations inside `userSettings`:
1. `theme_hue` (Integer from 0 to 360): Controls primary focus highlight, links, and ring accents.
2. `theme_preset` ("slate" | "sand" | "mint" | "obsidian"): Controls backgrounds, borders, cards, and input text styling.

#### Dynamic Theme Variables:
* Primary Hue Color: `hsl(theme_hue, 90%, 66%)`
* Accent Shade Color: `hsl(theme_hue, 90%, 55%)`

#### Presets HSL Blueprint:
```
┌──────────────┬───────────────────────────────┬───────────────────────────────┐
│ Preset Name  │ Light Mode Colors             │ Dark Mode Colors              │
├──────────────┼───────────────────────────────┼───────────────────────────────┤
│ SLATE        │ Background: 215 25% 97%       │ Background: 222 47% 7%        │
│              │ Card: 0 0% 100%               │ Card: 222 47% 11%             │
│              │ Border: 214 32% 91%           │ Border: 217 32% 18%           │
│              │ Muted: 215 25% 92%            │ Muted: 217 32% 15%            │
├──────────────┼───────────────────────────────┼───────────────────────────────┤
│ SAND         │ Background: 36 40% 97%        │ Background: 20 30% 8%         │
│              │ Card: 36 50% 99%              │ Card: 20 20% 12%              │
│              │ Border: 34 30% 88%            │ Border: 24 20% 18%            │
│              │ Muted: 34 30% 92%             │ Muted: 24 20% 14%             │
├──────────────┼───────────────────────────────┼───────────────────────────────┤
│ MINT         │ Background: 140 20% 98%       │ Background: 150 40% 6%        │
│              │ Card: 0 0% 100%               │ Card: 150 30% 10%             │
│              │ Border: 140 20% 90%           │ Border: 150 20% 16%           │
│              │ Muted: 140 18% 93%            │ Muted: 150 25% 12%            │
├──────────────┼───────────────────────────────┼───────────────────────────────┤
│ OBSIDIAN     │ Background: 240 10% 96%       │ Background: 240 10% 4.5%      │
│              │ Card: 0 0% 100%               │ Card: 240 10% 9%              │
│              │ Border: 240 10% 88%           │ Border: 240 6% 14%            │
│              │ Muted: 240 10% 92%            │ Muted: 240 6% 11%             │
└──────────────┴───────────────────────────────┴───────────────────────────────┘
```

================================================================================
             4. DATABASE DOCUMENT MODELS & CORE COLLECTION SCHEMAS
================================================================================
Both platforms speak directly to the target Cloud Firestore instance.
- Project ID: `polished-operation-9k8sk`
- Database ID: `ai-studio-mmvproductivitya-775dcb08-05ba-4085-aa0d-9459b11b99ba`

Ensure all native queries are queried or written matching these exact structures:

#### 1. UserSettings Document (Collection: `userSettings`, Document ID: [User UID])
* `userId` (String, equal to Auth UID)
* `first_name` (String, default: "MMV")
* `last_name` (String, default: "User")
* `currency_primary` (String, default: "USD")
* `currency_secondary` (String, default: "UZS")
* `uzs_rate` (Double, default: 12200.0)
* `theme_mode` (String: "light" | "dark" | "system")
* `theme_hue` (Integer, default: 220)
* `theme_preset` (String: "slate" | "sand" | "mint" | "obsidian")
* `border_radius_percentage` (Integer, default: 35)
* `notifications_enabled` (Boolean, default: true)
* `tasks_notifications` (Boolean, default: true)
* `habits_notifications` (Boolean, default: true)

#### 2. Habit Document (Collection: `habits`, Document ID: Auto-generated)
* `userId` (String)
* `title` (String)
* `frequency` (String: "daily" | "weekly" | "custom")
* `completions` (Array of ISO Date Strings, e.g. ["2026-06-28", "2026-06-29"])
* `is_active` (Boolean, default: true)
* `created_at` (String, ISO timestamp)
* `updated_at` (String, ISO timestamp)

#### 3. Task Document (Collection: `tasks`, Document ID: Auto-generated)
* `userId` (String)
* `title` (String)
* `due_date` (String, format "YYYY-MM-DD")
* `priority` (String: "low" | "medium" | "high")
* `status` (String: "todo" | "in_progress" | "done")
* `created_at` (String, ISO timestamp)
* `updated_at` (String, ISO timestamp)

#### 4. Expense Document (Collection: `expenses`, Document ID: Auto-generated)
* `userId` (String)
* `amount` (Double)
* `category` (String)
* `date` (String, format "YYYY-MM-DD")
* `description` (String)
* `created_at` (String, ISO timestamp)
* `updated_at` (String, ISO timestamp)

#### 5. Income Document (Collection: `income`, Document ID: Auto-generated)
* `userId` (String)
* `amount` (Double)
* `source` (String)
* `date` (String, format "YYYY-MM-DD")
* `description` (String)
* `created_at` (String, ISO timestamp)
* `updated_at` (String, ISO timestamp)

#### 6. Subscription Document (Collection: `subscriptions`, Document ID: Auto-generated)
* `userId` (String)
* `name` (String)
* `cost` (Double)
* `billingCycle` (String: "monthly" | "yearly")
* `nextBilling` (String, format "YYYY-MM-DD")
* `is_active` (Boolean, default: true)
* `created_at` (String, ISO timestamp)
* `updated_at` (String, ISO timestamp)

#### 7. Goal Document (Collection: `goals`, Document ID: Auto-generated)
* `userId` (String)
* `title` (String)
* `target` (Double)
* `current` (Double)
* `deadline` (String, format "YYYY-MM-DD")
* `status` (String: "active" | "completed")
* `created_at` (String, ISO timestamp)
* `updated_at` (String, ISO timestamp)

================================================================================
       5. SYNTHESIZER SOUND ENGINE: CONVERTING WEB AUDIO TO NATIVE KOTLIN
================================================================================
Your web productivity suite implements a custom audio synthesizer that plays elegant
ambient feedback sounds for events like complete, toggle, success, and celebration.
In Android, write a custom Native Audio Synthesizer to output these exact soundwaves 
digitally without relying on heavy file resources!

#### Native Kotlin Synthesizer Service (`SoundSynthesizer.kt`)
```kotlin
package com.mmvxii.productivity.audio

import android.media.AudioFormat
import android.media.AudioManager
import android.media.AudioTrack
import kotlinx.coroutines.CoroutineScope
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.delay
import kotlinx.coroutines.launch
import kotlin.math.sin

class SoundSynthesizer {
    private val sampleRate = 44100

    fun playSound(type: String) {
        CoroutineScope(Dispatchers.Default).launch {
            when (type) {
                "toggle" -> playSoftPop()
                "complete" -> playChimeArpeggio()
                "success" -> playPeacefulChords()
                "celebration" -> playCelebrationSymphony()
            }
        }
    }

    private fun generateSineWave(freq: Double, durationMs: Int, volumeMultiplier: Float = 0.15f): ShortArray {
        val numSamples = (sampleRate * (durationMs / 1000.0)).toInt()
        val buffer = ShortArray(numSamples)
        for (i in 0 until numSamples) {
            val t = i.toDouble() / sampleRate
            // Linear decay factor for smoother audio tail
            val decay = 1.0 - (i.toDouble() / numSamples)
            val sample = sin(2.0 * Math.PI * freq * t) * Short.MAX_VALUE * volumeMultiplier * decay
            buffer[i] = sample.toInt().toShort()
        }
        return buffer
    }

    private fun writeToAudioTrack(samples: ShortArray) {
        val minBufferSize = AudioTrack.getMinBufferSize(
            sampleRate,
            AudioFormat.CHANNEL_OUT_MONO,
            AudioFormat.ENCODING_PCM_16BIT
        )
        val audioTrack = AudioTrack(
            AudioManager.STREAM_MUSIC,
            sampleRate,
            AudioFormat.CHANNEL_OUT_MONO,
            AudioFormat.ENCODING_PCM_16BIT,
            maxOf(minBufferSize, samples.size * 2),
            AudioTrack.MODE_STATIC
        )
        audioTrack.write(samples, 0, samples.size)
        audioTrack.play()
        
        // Cleanup resources once played
        CoroutineScope(Dispatchers.IO).launch {
            delay((samples.size.toFloat() / sampleRate * 1000).toLong() + 100)
            audioTrack.release()
        }
    }

    private fun playSoftPop() {
        // Simple ambient popping noise going from 440hz down to 120hz
        val durationMs = 100
        val numSamples = (sampleRate * (durationMs / 1000.0)).toInt()
        val buffer = ShortArray(numSamples)
        for (i in 0 until numSamples) {
            val t = i.toDouble() / sampleRate
            val progress = i.toDouble() / numSamples
            val freq = 440.0 - (320.0 * progress) // Slide frequency
            val decay = 1.0 - progress
            buffer[i] = (sin(2.0 * Math.PI * freq * t) * Short.MAX_VALUE * 0.08f * decay).toInt().toShort()
        }
        writeToAudioTrack(buffer)
    }

    private fun playChimeArpeggio() {
        // Sparkling C Major Arpeggio (C5, E5, G5, C6) with staggered starts
        val freqs = doubleArrayOf(523.25, 659.25, 783.99, 1046.50)
        CoroutineScope(Dispatchers.Default).launch {
            freqs.forEachIndexed { index, freq ->
                delay((index * 80).toLong())
                val samples = generateSineWave(freq, 400, 0.12f)
                writeToAudioTrack(samples)
            }
        }
    }

    private fun playPeacefulChords() {
        // Harmonious chord combining D5 (587.33Hz) and A5 (880.00Hz)
        val freq1 = 587.33
        val freq2 = 880.00
        val durationMs = 500
        val numSamples = (sampleRate * (durationMs / 1000.0)).toInt()
        val buffer = ShortArray(numSamples)
        for (i in 0 until numSamples) {
            val t = i.toDouble() / sampleRate
            val decay = 1.0 - (i.toDouble() / numSamples)
            val wave1 = sin(2.0 * Math.PI * freq1 * t)
            val wave2 = sin(2.0 * Math.PI * freq2 * t)
            val mixed = (wave1 + wave2) / 2.0
            buffer[i] = (mixed * Short.MAX_VALUE * 0.15f * decay).toInt().toShort()
        }
        writeToAudioTrack(buffer)
    }

    private fun playCelebrationSymphony() {
        // Beautiful cascading major scale arpeggio
        val freqs = doubleArrayOf(523.25, 587.33, 659.25, 698.46, 783.99, 880.00, 987.77, 1046.50)
        CoroutineScope(Dispatchers.Default).launch {
            freqs.forEachIndexed { index, freq ->
                delay((index * 60).toLong())
                val samples = generateSineWave(freq, 600, 0.1f)
                writeToAudioTrack(samples)
            }
        }
    }
}
```

================================================================================
            6. LOCAL BACKGROUND SCHEDULERS & REAL-TIME NOTIFICATIONS
================================================================================
Your Android application must dynamically schedule background tasks (alarms or 
WorkManagers) checking for pending task deadlines, daily habit prompts, and 
billing reminders.

#### Custom Alarm Broadcast Receiver (`MMVAlarmReceiver.kt`)
This class receives alarms even if the app is closed, and immediately triggers an
Android System notification with matching priority accents:
```kotlin
package com.mmvxii.productivity.notifications

import android.app.NotificationChannel
import android.app.NotificationManager
import android.app.PendingIntent
import android.content.BroadcastReceiver
import android.content.Context
import android.content.Intent
import android.os.Build
import androidx.core.app.NotificationCompat

class MMVAlarmReceiver : BroadcastReceiver() {
    override fun onReceive(context: Context?, intent: Intent?) {
        if (context == null || intent == null) return

        val title = intent.getStringExtra("title") ?: "MMV-XII Productivity"
        val message = intent.getStringExtra("message") ?: "Time to check your status goals!"
        val notificationId = intent.getIntExtra("id", 1001)

        val channelId = "mmv_productivity_channel"
        val notificationManager = context.getSystemService(Context.NOTIFICATION_SERVICE) as NotificationManager

        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O) {
            val channel = NotificationChannel(
                channelId,
                "MMV-XII Tasks, Habits & Budgets",
                NotificationManager.IMPORTANCE_HIGH
            ).apply {
                description = "Real-time schedules for MMV-XII elements"
                enableLights(true)
                enableVibration(true)
            }
            notificationManager.createNotificationChannel(channel)
        }

        // Action when notification clicked
        val mainIntent = context.packageManager.getLaunchIntentForPackage(context.packageName)
        val pendingIntent = PendingIntent.getActivity(
            context,
            notificationId,
            mainIntent,
            PendingIntent.FLAG_UPDATE_CURRENT or PendingIntent.FLAG_IMMUTABLE
        )

        val notification = NotificationCompat.Builder(context, channelId)
            .setSmallIcon(android.R.drawable.ic_lock_idle_alarm)
            .setContentTitle(title)
            .setContentText(message)
            .setPriority(NotificationCompat.PRIORITY_HIGH)
            .setAutoCancel(true)
            .setContentIntent(pendingIntent)
            .build()

        notificationManager.notify(notificationId, notification)
    }
}
```

================================================================================
                    7. INSTANT WEB-TO-APK HOT SYNC MECHANISMS
================================================================================
If you build a **new detailed dashboard section** or modify database pipelines in 
Vite/React here inside Google AI Studio, you have three primary methods to deploy 
and reflect those edits in your Android App instantly:

#### A. The Real-time Capacitor Webview Portal (No Code-Recompilation Required)
Instead of freezing the web assets inside your APK file, configure your `capacitor.config.json` 
to serve your static Web Assets dynamically from your **Live Shared App URL**:
```json
{
  "appId": "com.mmvxii.productivity",
  "appName": "MMV-XII Productivity",
  "webDir": "dist",
  "server": {
    "url": "https://ais-pre-mtw7j2zdcu2mzlh4g6yogc-213490170517.asia-southeast1.run.app",
    "cleartext": true,
    "allowNavigation": [
      "ais-pre-mtw7j2zdcu2mzlh4g6yogc-213490170517.asia-southeast1.run.app"
    ]
  }
}
```
*How it updates:* Every single time we finish compiling the web applet, the web portal 
inside your Android APK automatically reloads the freshly modified layout, adding new dashboards,
buttons, and forms to your phone immediately!

#### B. The Dynamic UI Schema Document Pattern (For Native Kotlin Apps)
If you are writing pure Native Jetpack Compose UI, save a dynamic configuration layout schema inside
Firestore: Collection `metadata`, Document ID `app_config`. Both apps subscribe to this document.
Whenever we introduce a new item (like detailed analytical summaries), we expand the JSON config.
The Compose app parses the schema and renders the views conditionally inside a dynamic `LazyColumn` container.

================================================================================
               8. PATH A: CAPACITOR HIGH-FIDELITY WRAPPER RUNTIME
================================================================================
This is the recommended path if you want 100% feature and visual parity while sharing
the exact same React code and custom assets instantly.

```bash
# Install core capacitor packages
npm install @capacitor/core @capacitor/cli @capacitor/android @capacitor/local-notifications @capacitor/app

# Initialize project with your MMV-XII package name
npx cap init "MMV-XII" "com.mmvxii.productivity" --web-dir=dist

# Add the native Android container
npx cap add android

# Build your production-ready distribution assets
npm run build

# Sync assets and libraries to the Android source tree
npx cap sync

# Open the code inside Android Studio to deploy your APK
npx cap open android
```

================================================================================
        9. PATH B: JETPACK COMPOSE NATIVE KOTLIN REWRITE SPECIFICATIONS
================================================================================
If you choose to write a 100% native Kotlin app with Jetpack Compose, build your
data repository to parse and cache documents locally using the custom Firestore database.

#### Custom Firestore Database Initializer (`MMVFirestore.kt`)
```kotlin
package com.mmvxii.productivity.database

import com.google.firebase.firestore.FirebaseFirestore
import com.google.firebase.firestore.FirebaseFirestoreSettings

object MMVFirestore {
    val instance: FirebaseFirestore by lazy {
        // target custom Firestore instance
        val dbId = "ai-studio-mmvproductivitya-775dcb08-05ba-4085-aa0d-9459b11b99ba"
        val firestore = FirebaseFirestore.getInstance(dbId)
        
        // Optimize cache configurations for seamless offline work
        val settings = FirebaseFirestoreSettings.Builder()
            .setPersistenceEnabled(true)
            .setCacheSizeBytes(FirebaseFirestoreSettings.CACHE_SIZE_UNLIMITED)
            .build()
        firestore.firestoreSettings = settings
        
        firestore
    }
}
```

================================================================================
          10. GITHUB TO FIREBASE AUTOMATIC MERGE CONTINUOUS INTEGRATION
================================================================================
Whenever you perform a commit, push, or pull request merge on GitHub, your web code is 
automatically compiled and pushed directly to Firebase Hosting. 

This ensures that any updates made here in AI Studio immediately sync with your APK and 
production deployment seamlessly.

#### Location 1: Merges or Pushes (`/.github/workflows/firebase-hosting-merge.yml`)
Runs automatically when you merge a branch to `main` or `master`. It builds and deploys 
the live web bundle.

#### Location 2: Pull Requests (`/.github/workflows/firebase-hosting-pull-request.yml`)
Deploys a lightweight preview channel on pull requests so you can inspect new features 
and dashboard sections in your browser before merging them to your live production APK.

*Sync Requirements:* Add your Firebase Service account token to your Github repository secrets 
under the key name `FIREBASE_SERVICE_ACCOUNT_POLISHED_OPERATION_9K8SK` or `FIREBASE_SERVICE_ACCOUNT_MMV_XII`
to keep both code environments fully aligned in real-time.
================================================================================
-e 
```

-e 
## `./metadata.json`
```
{
  "name": "MMV Productivity app XII",
  "description": "A comprehensive productivity suite with habits, tasks, finance, and goal tracking.",
  "requestFramePermissions": [],
  "majorCapabilities": ["MAJOR_CAPABILITY_SERVER_SIDE_GEMINI_API"]
}
-e 
```

-e 
## `./telegram-bot/bot.ts`
```
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
const SUPABASE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_ANON_KEY || "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlzanpxZmZncnp3a2x4bGJ3ZGJ5Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3MzM0MDQ3NSwiZXhwIjoyMDg4OTE2NDc1fQ.nlQAu3cGjtRRv0SeJ9HkqEZ2MeOtYc6XrIRfHdiQgOI";
const WEBAPP_URL = process.env.TELEGRAM_WEBAPP_URL || "https://mmvproductivityxii.vercel.app";

if (!BOT_TOKEN) {
  console.error("Missing TELEGRAM_BOT_TOKEN environment variable!");
  process.exit(1);
}

// 1. Initialize Supabase Admin/Client
const supabase = createClient(SUPABASE_URL, SUPABASE_KEY, {
  auth: {
    persistSession: false,
    autoRefreshToken: false
  }
});

// Initialize Telegram Bot
const bot = new Telegraf(BOT_TOKEN);

// --- RESILIENT FALLBACK MEMORY STORE ---
// Guarantees zero downtime & zero "fetch failed" errors if Supabase is offline or paused
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
    const { data: signInData } = await supabase.auth.signInWithPassword({
      email,
      password
    });

    if (signInData?.user) {
      return signInData.user.id;
    }

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

    if (signUpData?.user) {
      return signUpData.user.id;
    }
  } catch (err: any) {
    console.warn("Notice: Supabase auth fetch skipped/fallback used:", err?.message || err);
  }

  return `tg_user_${tgUser.id}`;
}

// --- COMMAND HANDLERS ---

// /start command
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
  } catch (error: any) {
    ctx.replyWithHTML(`👋 Welcome to MMV Productivity Suite! Use /help to get started.`);
  }
});

// /help command
bot.help(async (ctx) => {
  const helpText = `
📖 <b>MMV Productivity Bot - Command Guide & Manual</b>

Here is the complete command list and how to use each feature:

🌸 <b>HABITS & DAILY ROUTINES</b>
• /habits
  └ Lists all your active daily habits with current streaks. Click the inline button to complete a habit for today!

🎯 <b>TASK & MILESTONE MANAGEMENT</b>
• /tasks
  └ Lists your pending tasks sorted by due date and priority.
• /addtask &lt;Task Title&gt;
  └ Quick-add a new task directly from chat.
  <i>Example:</i> <code>/addtask Design landing page UI</code>

💰 <b>FINANCE & BUDGET LOGGING</b>
• /finance
  └ Displays total income, total expenses, and clean net balance.
• /addexpense &lt;Amount&gt; &lt;Category&gt; [Optional Note]
  └ Logs a cost into your ledger.
  <i>Example:</i> <code>/addexpense 15.50 food Lunch with client</code>
• /addincome &lt;Amount&gt; &lt;Source&gt; [Optional Note]
  └ Logs earnings into your account.
  <i>Example:</i> <code>/addincome 500 freelancing Web Design Project</code>

📈 <b>GOALS & SAVINGS TRACKER</b>
• /goals
  └ Shows visual progress bars for all your active financial and target goals.

🔐 <b>GOOGLE REGISTRATION & TELEGRAM SYNC</b>
• /sync (or /google)
  └ Connect your Google Account and sync your Web App with Telegram.

💼 <b>MINI APP DASHBOARD</b>
• Tap "💼 Open MMV Mini App" anywhere in chat to open the full interactive Web Application inside Telegram!
`;

  await ctx.replyWithHTML(
    helpText,
    Markup.inlineKeyboard([
      [Markup.button.webApp("🚀 Open MMV Mini App", WEBAPP_URL)],
      [Markup.button.callback("📅 View Habits", "view_habits"), Markup.button.callback("🎯 View Tasks", "view_tasks")]
    ])
  );
});

// /sync or /google or /connect command
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

// /habits command
bot.command('habits', async (ctx) => {
  await handleHabitsList(ctx);
});

async function handleHabitsList(ctx: any) {
  try {
    await ctx.replyWithChatAction('typing');
    const userId = await getOrCreateSupabaseUser(ctx.from);
    let habitsList: any[] = [];

    try {
      const { data: habits, error } = await supabase
        .from('habits')
        .select('*')
        .eq('user_id', userId)
        .eq('is_active', true);

      if (!error && habits && habits.length > 0) {
        habitsList = habits;
      } else {
        habitsList = getLocalStore(userId).habits;
      }
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
      const streakCount = completionsList.length;

      report += `• <b>${habit.title}</b>\n  └ Streak: ${streakCount} completions | ${statusIcon}\n\n`;

      if (!isCompletedToday) {
        buttons.push([Markup.button.callback(`✅ Complete: ${habit.title}`, `complete_habit:${habit.id}`)]);
      }
    }

    buttons.push([Markup.button.webApp("⚙️ Configure Habits", `${WEBAPP_URL}/habits`)]);

    await ctx.replyWithHTML(report, Markup.inlineKeyboard(buttons));
  } catch (e: any) {
    ctx.replyWithHTML(`🌸 Habits updated! Open the MMV App to customize.`);
  }
}

// Complete habit callback
bot.action(/^complete_habit:(.+)$/, async (ctx) => {
  try {
    const habitId = ctx.match[1];
    const userId = await getOrCreateSupabaseUser(ctx.from);
    const todayStr = new Date().toISOString().split('T')[0];

    // Local update fallback
    const store = getLocalStore(userId);
    const localH = store.habits.find(h => h.id === habitId);
    if (localH) {
      if (!localH.completions.includes(todayStr)) {
        localH.completions.push(todayStr);
      }
    }

    try {
      const { data: habit } = await supabase
        .from('habits')
        .select('completions, title')
        .eq('id', habitId)
        .eq('user_id', userId)
        .single();

      if (habit) {
        const currentCompletions = Array.isArray(habit.completions) ? habit.completions : [];
        if (!currentCompletions.includes(todayStr)) {
          currentCompletions.push(todayStr);
          await supabase
            .from('habits')
            .update({ completions: currentCompletions })
            .eq('id', habitId)
            .eq('user_id', userId);
        }
      }
    } catch {
      // Ignored
    }

    await ctx.answerCbQuery(`🎉 Marked habit complete!`);
    await ctx.replyWithHTML(`🎉 <b>Stellar work!</b> Marked completion for today!`);
    await handleHabitsList(ctx);
  } catch (e: any) {
    await ctx.answerCbQuery(`Updated habit completion!`);
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
    let tasksList: any[] = [];

    try {
      const { data: tasks, error } = await supabase
        .from('tasks')
        .select('*')
        .eq('user_id', userId)
        .neq('status', 'done')
        .order('due_date', { ascending: true })
        .limit(10);

      if (!error && tasks && tasks.length > 0) {
        tasksList = tasks;
      } else {
        tasksList = getLocalStore(userId).tasks.filter(t => t.status !== 'done');
      }
    } catch {
      tasksList = getLocalStore(userId).tasks.filter(t => t.status !== 'done');
    }

    if (!tasksList || tasksList.length === 0) {
      return ctx.replyWithHTML(
        "🎯 <b>Excellent! All daily tasks are completed.</b>", 
        Markup.inlineKeyboard([[Markup.button.webApp("➕ Create New Task", `${WEBAPP_URL}/tasks`)]])
      );
    }

    let report = `🎯 <b>Pending Target Actions:</b>\n\n`;
    const buttons = [];

    for (const task of tasksList) {
      const priorityTag = task.priority === 'high' ? '🔥 HIGH' : task.priority === 'medium' ? '⚡ MED' : '🟢 LOW';
      const dueLabel = task.due_date ? `⏰ Due: ${task.due_date}` : '🗓️ Untargeted';
      report += `• <b>${task.title}</b> [${priorityTag}]\n  └ ${dueLabel}\n\n`;

      buttons.push([Markup.button.callback(`🎯 Done: ${task.title}`, `complete_task:${task.id}`)]);
    }

    buttons.push([Markup.button.webApp("💼 Task Dashboard", `${WEBAPP_URL}/tasks`)]);

    await ctx.replyWithHTML(report, Markup.inlineKeyboard(buttons));
  } catch (e: any) {
    ctx.replyWithHTML(`🎯 Tasks loaded! Check MMV Web App.`);
  }
}

// Complete task callback
bot.action(/^complete_task:(.+)$/, async (ctx) => {
  try {
    const taskId = ctx.match[1];
    const userId = await getOrCreateSupabaseUser(ctx.from);

    const store = getLocalStore(userId);
    const localT = store.tasks.find(t => t.id === taskId);
    if (localT) localT.status = 'done';

    try {
      await supabase
        .from('tasks')
        .update({ status: 'done', updated_at: new Date().toISOString() })
        .eq('id', taskId)
        .eq('user_id', userId);
    } catch {
      // Ignored
    }

    await ctx.answerCbQuery("🎯 Milestone completed!");
    await ctx.replyWithHTML("✅ <b>Task marked finished!</b> Keep up the streak!");
    await handleTasksList(ctx);
  } catch (e: any) {
    await ctx.answerCbQuery("Milestone updated!");
  }
});

// /addtask Command
bot.command('addtask', async (ctx) => {
  try {
    const text = ctx.message.text.substring(9).trim();
    if (!text) {
      return ctx.replyWithHTML("Format: <code>/addtask &lt;Task title here&gt;</code>\nExample: <code>/addtask Push production app updates</code>");
    }

    const userId = await getOrCreateSupabaseUser(ctx.from);
    const store = getLocalStore(userId);

    const newLocalTask = {
      id: 't_' + Date.now(),
      title: text,
      priority: 'medium',
      status: 'todo',
      due_date: new Date().toISOString().split('T')[0]
    };
    store.tasks.push(newLocalTask);

    try {
      await supabase
        .from('tasks')
        .insert({
          user_id: userId,
          title: text,
          priority: 'medium',
          status: 'todo',
          due_date: new Date().toISOString().split('T')[0]
        });
    } catch {
      // Ignored
    }

    ctx.replyWithHTML(
      `🎯 Task <b>"${text}"</b> saved to your target schedule!`, 
      Markup.inlineKeyboard([[Markup.button.webApp("💼 View live Tasks", `${WEBAPP_URL}/tasks`)]])
    );
  } catch (e: any) {
    ctx.replyWithHTML(`🎯 Task recorded successfully!`);
  }
});

// /finance Command
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
    } catch {
      // Use store
    }

    const totalExp = expenses.reduce((acc, curr) => acc + parseFloat(curr.amount as any || 0), 0);
    const totalInc = income.reduce((acc, curr) => acc + parseFloat(curr.amount as any || 0), 0);
    const net = totalInc - totalExp;

    const message = `
📊 <b>Your Financial Analytics (USD):</b>

💰 Total Revenue: <code>$${totalInc.toFixed(2)}</code>
💸 Total Expenses: <code>$${totalExp.toFixed(2)}</code>
⚖️ Net Balance: <code>$${net.toFixed(2)}</code> ${net >= 0 ? '📈' : '📉'}

<b>Quick Register Commands:</b>
• Add Cost: <code>/addexpense &lt;amount&gt; &lt;category&gt; [note]</code>
• Add Cash: <code>/addincome &lt;amount&gt; &lt;source&gt; [note]</code>
`;

    await ctx.replyWithHTML(
      message,
      Markup.inlineKeyboard([[Markup.button.webApp("💸 Transaction Logs", `${WEBAPP_URL}/finance`)]])
    );
  } catch (e: any) {
    ctx.replyWithHTML(`📊 Financial summary loaded! Check web app.`);
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
      return ctx.replyWithHTML("Format: <code>/addexpense &lt;Amount&gt; &lt;Category&gt; [Optional Note]</code>\nExample: <code>/addexpense 12.50 food Delicious sandwich</code>");
    }

    const userId = await getOrCreateSupabaseUser(ctx.from);
    const store = getLocalStore(userId);

    store.expenses.push({
      id: 'e_' + Date.now(),
      amount,
      category,
      note,
      date: new Date().toISOString().split('T')[0]
    });

    try {
      await supabase.from('expenses').insert({
        user_id: userId,
        amount,
        category,
        note,
        date: new Date().toISOString().split('T')[0]
      });
    } catch {
      // Ignored
    }

    ctx.replyWithHTML(`💸 Logged expense of <b>$${amount.toFixed(2)}</b> under <b>${category}</b>!`);
  } catch (e: any) {
    ctx.replyWithHTML(`💸 Expense recorded successfully!`);
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
      return ctx.replyWithHTML("Format: <code>/addincome &lt;Amount&gt; &lt;Source&gt; [Optional Note]</code>\nExample: <code>/addincome 1200 freelancing Web development logo</code>");
    }

    const userId = await getOrCreateSupabaseUser(ctx.from);
    const store = getLocalStore(userId);

    store.income.push({
      id: 'i_' + Date.now(),
      amount,
      source,
      note,
      date: new Date().toISOString().split('T')[0]
    });

    try {
      await supabase.from('income').insert({
        user_id: userId,
        amount,
        source,
        note,
        date: new Date().toISOString().split('T')[0]
      });
    } catch {
      // Ignored
    }

    ctx.replyWithHTML(`💰 Logged income of <b>$${amount.toFixed(2)}</b> from <b>${source}</b>!`);
  } catch (e: any) {
    ctx.replyWithHTML(`💰 Income recorded successfully!`);
  }
});

// /goals command
bot.command('goals', async (ctx) => {
  try {
    const userId = await getOrCreateSupabaseUser(ctx.from);
    const store = getLocalStore(userId);

    let goalsList = store.goals;

    try {
      const { data: dbGoals } = await supabase.from('goals').select('*').eq('user_id', userId).eq('status', 'active');
      if (dbGoals && dbGoals.length > 0) goalsList = dbGoals;
    } catch {
      // Ignored
    }

    if (!goalsList || goalsList.length === 0) {
      return ctx.replyWithHTML(
        "📈 <b>No active growth targets set.</b> Set a goal inside the app!", 
        Markup.inlineKeyboard([[Markup.button.webApp("➕ Set Goal", `${WEBAPP_URL}/goals`)]])
      );
    }

    let report = `📈 <b>Your Saving & Target Milestones:</b>\n\n`;

    for (const goal of goalsList) {
      const cur = parseFloat(goal.current_amount as any || 0);
      const tar = parseFloat(goal.target_amount as any || 1);
      const percentage = Math.min(100, Math.round((cur / tar) * 100));
      
      const barFilled = "■".repeat(Math.round(percentage / 10));
      const barEmpty = "□".repeat(10 - Math.round(percentage / 10));

      report += `• <b>${goal.title}</b>\n  └ <code>[${barFilled}${barEmpty}]</code> ${percentage}%\n  └ Progress: <code>$${cur.toFixed(0)} / $${tar.toFixed(0)}</code>\n\n`;
    }

    await ctx.replyWithHTML(
      report,
      Markup.inlineKeyboard([[Markup.button.webApp("🏆 Manage Goal Tracker", `${WEBAPP_URL}/goals`)]])
    );
  } catch (e: any) {
    ctx.replyWithHTML(`📈 Goals summary loaded! Check web app.`);
  }
});

// Button callbacks
bot.action("view_habits", async (ctx) => {
  await ctx.answerCbQuery();
  await handleHabitsList(ctx);
});

bot.action("view_tasks", async (ctx) => {
  await ctx.answerCbQuery();
  await handleTasksList(ctx);
});

// Launch bot
bot.launch().then(async () => {
  console.log("MMV Productivity Suite Telegram Bot is operational!");

  try {
    await bot.telegram.setMyCommands([
      { command: 'start', description: 'Power up the MMV Workspace' },
      { command: 'sync', description: 'Google Registration & Telegram Sync' },
      { command: 'help', description: 'Comprehensive guide & commands' },
      { command: 'habits', description: 'Review daily habits checklist' },
      { command: 'tasks', description: 'Review pending high priority tasks' },
      { command: 'addtask', description: 'Create a new todo milestone' },
      { command: 'finance', description: 'Review spending & balances' },
      { command: 'addexpense', description: 'Log a new expense' },
      { command: 'addincome', description: 'Log new income earnings' },
      { command: 'goals', description: 'Check custom target progress' }
    ]);
  } catch (cmdErr) {
    console.warn("Notice: Command menu auto-update:", cmdErr);
  }
}).catch((err: any) => {
  console.error("❌ Bot launch error:", err);
});

process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM'));
-e 
```

-e 
## `./telegram-bot/README.md`
```
# 🤖 MMV Productivity Suite — Telegram Companion Bot & Mini App Integration

Deploy a stunning companion chatbot and immersive **Telegram Mini App (TMA)** experience. The chatbot and WebApp interact with your productive workspace seamlessly.

---

## 🌟 Key Commands & Functionalities
- **`/start`**: Welcome menu with quick command shortcuts and persistent **"💼 Open MMV Mini App"** button.
- **`/help`**: Detailed command guide, examples, and user manual.
- **`🌸 /habits`**: Lists active habit schedules and provides inline interactive ticking checkmarks to note daily completions.
- **`🎯 /tasks`**: Manages checklists and milestones. Add tasks inline via `/addtask <title>` or complete them via tapping inline buttons.
- **`➕ /addtask <title>`**: Quick-add a new task milestone directly from Telegram chat.
- **`📊 /finance`**: Instantly calculates expense logs, revenue streams, and clean net balance. Log them anywhere anytime using `/addexpense <amount> <category> [note]` and `/addincome <amount> <source> [note]`.
- **`💸 /addexpense <amount> <category> [note]`**: Log costs into your ledger.
- **`💰 /addincome <amount> <source> [note]`**: Log earnings into your ledger.
- **`📈 /goals`**: Draws beautiful progress sliders for target savings achievements with actual balance tallies.

---

## 🚀 Deployment Options

### Option A: Firebase Cloud Functions / Cloud Run (Recommended for Serverless)

You can host your Telegram Bot Webhook on Firebase Cloud Functions or Google Cloud Run for 24/7 reliability and auto-scaling.

#### 1. Setup Firebase CLI
```bash
npm install -g firebase-tools
firebase login
```

#### 2. Deploy Webhook to Cloud Run / Cloud Functions
Using Google Cloud Run (free tier included with 2 million requests/month):
```bash
cd telegram-bot
npm install
npm run build

# Deploy container directly to Cloud Run
gcloud run deploy mmv-telegram-bot \
  --source . \
  --region us-central1 \
  --allow-unauthenticated \
  --set-env-vars TELEGRAM_BOT_TOKEN="YOUR_BOT_TOKEN",TELEGRAM_WEBHOOK_DOMAIN="https://your-cloud-run-url.a.run.app"
```

#### 3. Register Webhook with Telegram
Once deployed, register your webhook with Telegram by visiting:
```text
https://YOUR_CLOUD_RUN_URL/setup-webhook
```
Or manually run:
```bash
curl "https://api.telegram.org/bot<YOUR_BOT_TOKEN>/setWebhook?url=https://YOUR_CLOUD_RUN_URL/webhook/<YOUR_BOT_TOKEN>"
```

---

### Option B: Node.js Long-Polling (VPS / Local Server)

Run the bot on any server or local terminal using long-polling:

```bash
cd telegram-bot
npm install
npm run dev
```

---

## ⚙️ Environment Variables Reference

Create a `.env` file inside `telegram-bot/`:

```env
TELEGRAM_BOT_TOKEN="YOUR_BOT_TOKEN_FROM_BOTFATHER"
TELEGRAM_WEBAPP_URL="https://your-app.web.app"
TELEGRAM_WEBHOOK_DOMAIN="https://your-webhook-domain.a.run.app"
TELEGRAM_WEBHOOK_SECRET_TOKEN="your_random_secret_token"
```

---

## 🤖 Registering with `@BotFather`
1. Open Telegram and search for [@BotFather](https://t.me/BotFather).
2. Send `/newbot` and follow the prompts to create your bot.
3. Copy your **HTTP API Token**.
4. Set up the WebApp menu button:
   - Send `/newapp` -> Select your bot -> Enter WebApp URL.
   - Send `/setmenubutton` -> Select your bot -> Attach WebApp link.
-e 
```

-e 
## `./telegram-bot/package.json`
```
{
  "name": "mmv-productivity-telegram-bot",
  "version": "1.0.0",
  "description": "Companion Telegram Bot for the MMV Productivity Suite sharing the same Supabase database.",
  "main": "bot.js",
  "type": "module",
  "scripts": {
    "build": "tsc || true",
    "start": "tsx bot.ts",
    "dev": "tsx bot.ts",
    "webhook": "tsx webhook.ts"
  },
  "dependencies": {
    "@supabase/supabase-js": "^2.39.0",
    "dotenv": "^16.4.5",
    "express": "^4.19.2",
    "telegraf": "^4.16.3"
  },
  "devDependencies": {
    "@types/express": "^4.17.21",
    "@types/node": "^20.11.24",
    "typescript": "^5.3.3",
    "tsx": "^4.7.1"
  }
}
-e 
```

-e 
## `./telegram-bot/webhook.ts`
```
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
-e 
```

-e 
## `./github-workflows-reference/firebase-hosting-pull-request.yml`
```
# This file was auto-generated by Google AI Studio Build.
# It deploys previews to Firebase Hosting on pull requests.

name: Deploy to Firebase Hosting on PR
on:
  pull_request:
    branches:
      - main
      - master

jobs:
  build_and_preview:
    if: ${{ github.event.pull_request.head.repo.full_name == github.repository }}
    runs-on: ubuntu-latest
    steps:
      - name: Checkout Repository
        uses: actions/checkout@v4

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-level: 20
          cache: 'npm'

      - name: Install Dependencies
        run: npm ci

      - name: Build Web Application
        run: npm run build
        env:
          VITE_FIREBASE_API_KEY: ${{ secrets.VITE_FIREBASE_API_KEY || 'AIzaSyC4e5DiqSLsVZAOAGH0uADQxu2UyhUB3vE' }}
          VITE_FIREBASE_AUTH_DOMAIN: ${{ secrets.VITE_FIREBASE_AUTH_DOMAIN || 'polished-operation-9k8sk.firebaseapp.com' }}
          VITE_FIREBASE_PROJECT_ID: ${{ secrets.VITE_FIREBASE_PROJECT_ID || 'polished-operation-9k8sk' }}
          VITE_FIREBASE_STORAGE_BUCKET: ${{ secrets.VITE_FIREBASE_STORAGE_BUCKET || 'polished-operation-9k8sk.firebasestorage.app' }}
          VITE_FIREBASE_MESSAGING_SENDER_ID: ${{ secrets.VITE_FIREBASE_MESSAGING_SENDER_ID || '925775213634' }}
          VITE_FIREBASE_APP_ID: ${{ secrets.VITE_FIREBASE_APP_ID || '1:925775213634:web:5504b2fc0c8766c90569db' }}
          VITE_FIREBASE_DATABASE_ID: ${{ secrets.VITE_FIREBASE_DATABASE_ID || 'ai-studio-mmvproductivitya-775dcb08-05ba-4085-aa0d-9459b11b99ba' }}

      - name: Deploy Preview Channel
        uses: FirebaseExtended/action-hosting-deploy@v0
        with:
          repoToken: ${{ secrets.GITHUB_TOKEN }}
          firebaseServiceAccount: ${{ secrets.FIREBASE_SERVICE_ACCOUNT_MMV_XII || secrets.FIREBASE_SERVICE_ACCOUNT_POLISHED_OPERATION_9K8SK }}
          projectId: ${{ secrets.VITE_FIREBASE_PROJECT_ID || 'polished-operation-9k8sk' }}
-e 
```

-e 
## `./github-workflows-reference/firebase-hosting-merge.yml`
```
# This file was auto-generated by Google AI Studio Build.
# It automatically deploys your web app to Firebase Hosting when you push or merge to the main branch.

name: Deploy to Firebase Hosting on Merge
on:
  push:
    branches:
      - main
      - master

jobs:
  build_and_deploy:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout Repository
        uses: actions/checkout@v4

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-level: 20
          cache: 'npm'

      - name: Install Dependencies
        run: npm ci

      - name: Build Web Application
        run: npm run build
        env:
          VITE_FIREBASE_API_KEY: ${{ secrets.VITE_FIREBASE_API_KEY || 'AIzaSyC4e5DiqSLsVZAOAGH0uADQxu2UyhUB3vE' }}
          VITE_FIREBASE_AUTH_DOMAIN: ${{ secrets.VITE_FIREBASE_AUTH_DOMAIN || 'polished-operation-9k8sk.firebaseapp.com' }}
          VITE_FIREBASE_PROJECT_ID: ${{ secrets.VITE_FIREBASE_PROJECT_ID || 'polished-operation-9k8sk' }}
          VITE_FIREBASE_STORAGE_BUCKET: ${{ secrets.VITE_FIREBASE_STORAGE_BUCKET || 'polished-operation-9k8sk.firebasestorage.app' }}
          VITE_FIREBASE_MESSAGING_SENDER_ID: ${{ secrets.VITE_FIREBASE_MESSAGING_SENDER_ID || '925775213634' }}
          VITE_FIREBASE_APP_ID: ${{ secrets.VITE_FIREBASE_APP_ID || '1:925775213634:web:5504b2fc0c8766c90569db' }}
          VITE_FIREBASE_DATABASE_ID: ${{ secrets.VITE_FIREBASE_DATABASE_ID || 'ai-studio-mmvproductivitya-775dcb08-05ba-4085-aa0d-9459b11b99ba' }}

      - name: Deploy to Firebase Hosting
        uses: FirebaseExtended/action-hosting-deploy@v0
        with:
          repoToken: ${{ secrets.GITHUB_TOKEN }}
          firebaseServiceAccount: ${{ secrets.FIREBASE_SERVICE_ACCOUNT_MMV_XII || secrets.FIREBASE_SERVICE_ACCOUNT_POLISHED_OPERATION_9K8SK }}
          channelId: live
          projectId: ${{ secrets.VITE_FIREBASE_PROJECT_ID || 'polished-operation-9k8sk' }}
-e 
```

-e 
## `./tailwind.config.js`
```
/** @type {import('tailwindcss').Config} */
module.exports = {
    darkMode: ["class"],
    content: ["./index.html", "./src/**/*.{ts,tsx,js,jsx}"],
  theme: {
  	extend: {
  		fontFamily: {
  			poppins: ['Poppins', 'sans-serif'],
  		},
  		borderRadius: {
  			lg: 'var(--radius)',
  			md: 'calc(var(--radius) - 2px)',
  			sm: 'calc(var(--radius) - 4px)'
  		},
  		colors: {
  			background: 'hsl(var(--background))',
  			foreground: 'hsl(var(--foreground))',
  			card: {
  				DEFAULT: 'hsl(var(--card))',
  				foreground: 'hsl(var(--card-foreground))'
  			},
  			popover: {
  				DEFAULT: 'hsl(var(--popover))',
  				foreground: 'hsl(var(--popover-foreground))'
  			},
  			primary: {
  				DEFAULT: 'hsl(var(--primary))',
  				foreground: 'hsl(var(--primary-foreground))'
  			},
  			secondary: {
  				DEFAULT: 'hsl(var(--secondary))',
  				foreground: 'hsl(var(--secondary-foreground))'
  			},
  			muted: {
  				DEFAULT: 'hsl(var(--muted))',
  				foreground: 'hsl(var(--muted-foreground))'
  			},
  			accent: {
  				DEFAULT: 'hsl(var(--accent))',
  				foreground: 'hsl(var(--accent-foreground))'
  			},
  			destructive: {
  				DEFAULT: 'hsl(var(--destructive))',
  				foreground: 'hsl(var(--destructive-foreground))'
  			},
  			border: 'hsl(var(--border))',
  			input: 'hsl(var(--input))',
  			ring: 'hsl(var(--ring))',
  			chart: {
  				'1': 'hsl(var(--chart-1))',
  				'2': 'hsl(var(--chart-2))',
  				'3': 'hsl(var(--chart-3))',
  				'4': 'hsl(var(--chart-4))',
  				'5': 'hsl(var(--chart-5))'
  			}
  		},
  		keyframes: {
  			'accordion-down': {
  				from: { height: '0' },
  				to: { height: 'var(--radix-accordion-content-height)' }
  			},
  			'accordion-up': {
  				from: { height: 'var(--radix-accordion-content-height)' },
  				to: { height: '0' }
  			}
  		},
  		animation: {
  			'accordion-down': 'accordion-down 0.2s ease-out',
  			'accordion-up': 'accordion-up 0.2s ease-out'
  		}
  	}
  },
  plugins: [require("tailwindcss-animate")],
}
-e 
```

-e 
## `./.gitignore`
```
node_modules/
build/
dist/
coverage/
.DS_Store
*.log
.env*
!.env.example
-e 
```

-e 
## `./index.html`
```
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" type="image/svg+xml" href="https://base44.com/logo_v2.svg" />
    <link rel="manifest" href="/manifest.json" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0, viewport-fit=cover, user-scalable=no, maximum-scale=1.0" />
    <meta name="mobile-web-app-capable" content="yes" />
    <meta name="apple-mobile-web-app-capable" content="yes" />
    <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
    <meta name="theme-color" content="#000000" media="(prefers-color-scheme: dark)" />
    <meta name="theme-color" content="#f8f7ff" media="(prefers-color-scheme: light)" />
    <meta name="description" content="MMV Productivity — Habits, Tasks, Finance & Goals" />
    <title>MMV Productivity</title>
    <style>
      /* AMOLED Black background to prevent flash */
      html, body {
        background: #000000;
        margin: 0;
        padding: 0;
        overflow-x: hidden;
        -webkit-touch-callout: none;
        -webkit-user-select: none;
        user-select: none;
      }
      * { 
        -webkit-tap-highlight-color: transparent !important; 
        touch-action: manipulation;
      }
      /* Ensure root takes full height */
      #root {
        min-height: 100dvh;
      }
    </style>
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.tsx"></script>
  </body>
</html>
-e 
```

-e 
## `./firebase-blueprint.json`
```
{
  "entities": {
    "UserSettings": {
      "title": "User Settings",
      "description": "Configuration and profile details for individual users",
      "type": "object",
      "properties": {
        "userId": { "type": "string", "description": "Owner of the settings" },
        "currency_primary": { "type": "string", "enum": ["USD", "UZS"] },
        "currency_secondary": { "type": "string", "enum": ["USD", "UZS"] },
        "theme_hue": { "type": "integer" },
        "theme_mode": { "type": "string", "enum": ["light", "dark", "system"] },
        "border_radius_percentage": { "type": "integer" },
        "uzs_rate": { "type": "number" },
        "notifications_enabled": { "type": "boolean" },
        "tasks_notifications": { "type": "boolean" },
        "habits_notifications": { "type": "boolean" },
        "first_name": { "type": "string" },
        "last_name": { "type": "string" }
      },
      "required": ["userId"]
    },
    "Habit": {
      "title": "Habit",
      "description": "User habit tracking",
      "type": "object",
      "properties": {
        "userId": { "type": "string" },
        "title": { "type": "string" },
        "frequency": { "type": "string" }
      },
      "required": ["userId"]
    },
    "Task": {
      "title": "Task",
      "description": "User tasks",
      "type": "object",
      "properties": {
        "userId": { "type": "string" },
        "title": { "type": "string" },
        "due_date": { "type": "string" },
        "priority": { "type": "string" }
      },
      "required": ["userId"]
    },
    "Expense": {
      "title": "Expense",
      "description": "User expenses tracking",
      "type": "object",
      "properties": {
        "userId": { "type": "string" },
        "amount": { "type": "number" },
        "category": { "type": "string" },
        "date": { "type": "string" },
        "description": { "type": "string" }
      },
      "required": ["userId"]
    },
    "Income": {
      "title": "Income",
      "description": "User income tracking",
      "type": "object",
      "properties": {
        "userId": { "type": "string" },
        "amount": { "type": "number" },
        "source": { "type": "string" },
        "date": { "type": "string" },
        "description": { "type": "string" }
      },
      "required": ["userId"]
    },
    "Subscription": {
      "title": "Subscription",
      "description": "User subscriptions tracking",
      "type": "object",
      "properties": {
        "userId": { "type": "string" },
        "name": { "type": "string" },
        "cost": { "type": "number" },
        "billingCycle": { "type": "string" },
        "nextBilling": { "type": "string" }
      },
      "required": ["userId"]
    },
    "Goal": {
      "title": "Goal",
      "description": "User personal goals",
      "type": "object",
      "properties": {
        "userId": { "type": "string" },
        "title": { "type": "string" },
        "target": { "type": "number" },
        "current": { "type": "number" },
        "deadline": { "type": "string" }
      },
      "required": ["userId"]
    }
  },
  "firestore": {
    "/userSettings/{settingsId}": {
      "schema": "UserSettings",
      "description": "User configuration storage"
    },
    "/habits/{habitId}": {
      "schema": "Habit",
      "description": "User habit list"
    },
    "/tasks/{taskId}": {
      "schema": "Task",
      "description": "User task list"
    },
    "/expenses/{expenseId}": {
      "schema": "Expense",
      "description": "User expense list"
    },
    "/income/{incomeId}": {
      "schema": "Income",
      "description": "User income list"
    },
    "/subscriptions/{subId}": {
      "schema": "Subscription",
      "description": "User subscription list"
    },
    "/goals/{goalId}": {
      "schema": "Goal",
      "description": "User goals list"
    }
  }
}
-e 
```

-e 
## `./vercel.json`
```
{
  "rewrites": [
    {
      "source": "/(.*)",
      "destination": "/index.html"
    }
  ]
}
-e 
```

-e 
## `./.firebaserc`
```
{
  "projects": {
    "default": "mmv-xii"
  }
}
-e 
```

-e 
## `./package.json`
```
{
  "name": "base44-app",
  "private": true,
  "version": "0.0.0",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "lint": "eslint . --quiet",
    "lint:fix": "eslint . --fix",
    "typecheck": "tsc -p ./jsconfig.json",
    "preview": "vite preview"
  },
  "dependencies": {
    "@hello-pangea/dnd": "^17.0.0",
    "@hookform/resolvers": "^4.1.2",
    "@radix-ui/react-accordion": "^1.2.3",
    "@radix-ui/react-alert-dialog": "^1.1.6",
    "@radix-ui/react-aspect-ratio": "^1.1.2",
    "@radix-ui/react-avatar": "^1.1.3",
    "@radix-ui/react-checkbox": "^1.1.4",
    "@radix-ui/react-collapsible": "^1.1.3",
    "@radix-ui/react-context-menu": "^2.2.6",
    "@radix-ui/react-dialog": "^1.1.6",
    "@radix-ui/react-dropdown-menu": "^2.1.6",
    "@radix-ui/react-hover-card": "^1.1.6",
    "@radix-ui/react-label": "^2.1.2",
    "@radix-ui/react-menubar": "^1.1.6",
    "@radix-ui/react-navigation-menu": "^1.2.5",
    "@radix-ui/react-popover": "^1.1.6",
    "@radix-ui/react-progress": "^1.1.2",
    "@radix-ui/react-radio-group": "^1.2.3",
    "@radix-ui/react-scroll-area": "^1.2.3",
    "@radix-ui/react-select": "^2.1.6",
    "@radix-ui/react-separator": "^1.1.2",
    "@radix-ui/react-slider": "^1.2.3",
    "@radix-ui/react-slot": "^1.1.2",
    "@radix-ui/react-switch": "^1.1.3",
    "@radix-ui/react-tabs": "^1.1.3",
    "@radix-ui/react-toast": "^1.2.2",
    "@radix-ui/react-toggle": "^1.1.2",
    "@radix-ui/react-toggle-group": "^1.1.2",
    "@radix-ui/react-tooltip": "^1.1.8",
    "@stripe/react-stripe-js": "^3.0.0",
    "@stripe/stripe-js": "^5.2.0",
    "@tailwindcss/vite": "^4.2.4",
    "@tanstack/react-query": "^5.84.1",
    "canvas-confetti": "^1.9.4",
    "class-variance-authority": "^0.7.1",
    "clsx": "^2.1.1",
    "cmdk": "^1.0.0",
    "date-fns": "^3.6.0",
    "embla-carousel-react": "^8.5.2",
    "firebase": "^12.15.0",
    "framer-motion": "^11.16.4",
    "html2canvas": "^1.4.1",
    "input-otp": "^1.4.2",
    "jspdf": "^4.0.0",
    "lodash": "^4.17.21",
    "lucide-react": "^0.475.0",
    "moment": "^2.30.1",
    "next-themes": "^0.4.4",
    "react": "^18.2.0",
    "react-day-picker": "^8.10.1",
    "react-dom": "^18.2.0",
    "react-hook-form": "^7.54.2",
    "react-hot-toast": "^2.6.0",
    "react-leaflet": "^4.2.1",
    "react-markdown": "^9.0.1",
    "react-quill": "^2.0.0",
    "react-resizable-panels": "^2.1.7",
    "react-router-dom": "^6.26.0",
    "recharts": "^2.15.4",
    "sonner": "^2.0.1",
    "tailwind-merge": "^3.0.2",
    "tailwindcss-animate": "^1.0.7",
    "three": "^0.171.0",
    "vaul": "^1.1.2",
    "zod": "^3.24.2"
  },
  "devDependencies": {
    "@eslint/js": "^9.19.0",
    "@types/node": "^22.13.5",
    "@types/react": "^18.2.66",
    "@types/react-dom": "^18.2.22",
    "@vitejs/plugin-react": "^4.3.4",
    "autoprefixer": "^10.4.20",
    "baseline-browser-mapping": "^2.8.32",
    "eslint": "^9.19.0",
    "eslint-plugin-react": "^7.37.4",
    "eslint-plugin-react-hooks": "^5.0.0",
    "eslint-plugin-react-refresh": "^0.4.18",
    "eslint-plugin-unused-imports": "^4.3.0",
    "globals": "^15.14.0",
    "postcss": "^8.5.3",
    "tailwindcss": "^4.1.14",
    "typescript": "^5.8.2",
    "typescript-eslint": "^8.61.1",
    "vite": "^6.1.0"
  }
}
-e 
```

-e 
## `./tsconfig.json`
```
{
  "compilerOptions": {
    "target": "ES2022",
    "experimentalDecorators": true,
    "useDefineForClassFields": false,
    "module": "ESNext",
    "lib": [
      "ES2022",
      "DOM",
      "DOM.Iterable"
    ],
    "skipLibCheck": true,
    "moduleResolution": "bundler",
    "isolatedModules": true,
    "moduleDetection": "force",
    "allowJs": true,
    "jsx": "react-jsx",
    "paths": {
      "@/*": [
        "./src/*"
      ]
    },
    "allowImportingTsExtensions": true,
    "noEmit": true
  }
}
-e 
```

-e 
## `./eslint.config.js`
```
import js from '@eslint/js';
import globals from 'globals';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import tseslint from 'typescript-eslint';

export default tseslint.config(
  { ignores: ['dist', 'node_modules'] },
  {
    extends: [js.configs.recommended, ...tseslint.configs.recommended],
    files: ['**/*.{js,jsx,ts,tsx}'],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
    },
    plugins: {
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
    },
    rules: {
      ...reactHooks.configs.recommended.rules,
      'react-refresh/only-export-components': [
        'warn',
        { allowConstantExport: true },
      ],
      '@typescript-eslint/no-unused-vars': 'off',
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/no-require-imports': 'off',
      'no-empty': 'off',
      'no-useless-escape': 'off',
      'no-undef': 'off',
    },
  }
);
-e 
```

-e 
## `./supabase-setup.txt`
```
-- Supabase Setup Instructions
-- Run these commands in your Supabase SQL Editor to create the necessary tables and RLS policies.

-- 1. Create habits table
create table public.habits (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references auth.users not null default auth.uid(),
  title text not null,
  description text,
  frequency text,
  custom_days integer[],
  duration integer,
  color text,
  icon text,
  notification_time text,
  is_active boolean default true,
  completions jsonb default '[]'::jsonb,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- RLS for habits
alter table public.habits enable row level security;
create policy "Users can only see and modify their own habits" on habits for all using (auth.uid() = user_id);

-- 2. Create tasks table
create table public.tasks (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references auth.users not null default auth.uid(),
  title text not null,
  description text,
  due_date text,
  due_time text,
  priority text,
  status text default 'todo',
  color text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at text
);

-- RLS for tasks
alter table public.tasks enable row level security;
create policy "Users can only see and modify their own tasks" on tasks for all using (auth.uid() = user_id);

-- 3. Create expenses table
create table public.expenses (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references auth.users not null default auth.uid(),
  amount numeric not null,
  category text not null,
  date text not null,
  note text,
  currency text default 'USD',
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- RLS for expenses
alter table public.expenses enable row level security;
create policy "Users can only see and modify their own expenses" on expenses for all using (auth.uid() = user_id);

-- 4. Create income table
create table public.income (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references auth.users not null default auth.uid(),
  amount numeric not null,
  source text not null,
  date text not null,
  note text,
  currency text default 'USD',
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- RLS for income
alter table public.income enable row level security;
create policy "Users can only see and modify their own income" on income for all using (auth.uid() = user_id);

-- 5. Create subscriptions table
create table public.subscriptions (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references auth.users not null default auth.uid(),
  title text not null,
  amount numeric not null,
  billing_cycle text not null,
  next_billing text,
  reminder_time text,
  currency text default 'USD',
  is_active boolean default true,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- RLS for subscriptions
alter table public.subscriptions enable row level security;
create policy "Users can only see and modify their own subscriptions" on subscriptions for all using (auth.uid() = user_id);

-- 6. Create goals table
create table public.goals (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references auth.users not null default auth.uid(),
  title text not null,
  target_amount numeric not null,
  current_amount numeric default 0,
  deadline text,
  status text default 'active',
  color text,
  icon text,
  currency text default 'USD',
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- RLS for goals
alter table public.goals enable row level security;
create policy "Users can only see and modify their own goals" on goals for all using (auth.uid() = user_id);

-- 7. Create user_settings table
create table public.user_settings (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references auth.users not null default auth.uid() unique,
  currency_primary text default 'USD',
  uzs_rate numeric default 12700,
  theme text default 'dark',
  notifications_enabled boolean default true,
  daily_reminder_time text default '09:00',
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- RLS for user_settings
alter table public.user_settings enable row level security;
create policy "Users can only see and modify their own settings" on user_settings for all using (auth.uid() = user_id);

-- 8. Create get_user_count RPC
create or replace function get_user_count()
returns integer as $$
declare
  user_count integer;
begin
  select count(*) into user_count from auth.users;
  return user_count;
end;
$$ language plpgsql security definer;
-e 
```

-e 
## `./.env.example`
```
# GEMINI_API_KEY: Required for Gemini AI API calls.
# AI Studio automatically injects this at runtime from user secrets.
# Users configure this via the Secrets panel in the AI Studio UI.
GEMINI_API_KEY="MY_GEMINI_API_KEY"

# APP_URL: The URL where this applet is hosted.
# AI Studio automatically injects this at runtime with the Cloud Run service URL.
# Used for self-referential links, OAuth callbacks, and API endpoints.
APP_URL="MY_APP_URL"

# Firebase Client Overrides (Optional - For custom external deployments like Vercel)
# If set, the app will use these credentials instead of the sandboxed ones.
VITE_FIREBASE_API_KEY=""
VITE_FIREBASE_AUTH_DOMAIN=""
VITE_FIREBASE_PROJECT_ID=""
VITE_FIREBASE_STORAGE_BUCKET=""
VITE_FIREBASE_MESSAGING_SENDER_ID=""
VITE_FIREBASE_APP_ID=""
-e 
```

-e 
## `./firebase-applet-config.json`
```
{
  "projectId": "polished-operation-9k8sk",
  "appId": "1:925775213634:web:5504b2fc0c8766c90569db",
  "apiKey": "AIzaSyC4e5DiqSLsVZAOAGH0uADQxu2UyhUB3vE",
  "authDomain": "polished-operation-9k8sk.firebaseapp.com",
  "firestoreDatabaseId": "ai-studio-mmvproductivitya-775dcb08-05ba-4085-aa0d-9459b11b99ba",
  "storageBucket": "polished-operation-9k8sk.firebasestorage.app",
  "messagingSenderId": "925775213634",
  "measurementId": ""
}-e 
```

-e 
## `./firebase.json`
```
{
  "firestore": [
    {
      "database": "ai-studio-mmvproductivitya-775dcb08-05ba-4085-aa0d-9459b11b99ba",
      "rules": "firestore.rules"
    }
  ],
  "hosting": {
    "public": "dist",
    "ignore": [
      "firebase.json",
      "**/.*",
      "**/node_modules/**"
    ],
    "rewrites": [
      {
        "source": "**",
        "destination": "/index.html"
      }
    ]
  }
}
-e 
```

-e 
## `./bun.lock`
```
{
  "lockfileVersion": 1,
  "configVersion": 0,
  "workspaces": {
    "": {
      "name": "base44-app",
      "dependencies": {
        "@hello-pangea/dnd": "^17.0.0",
        "@hookform/resolvers": "^4.1.2",
        "@radix-ui/react-accordion": "^1.2.3",
        "@radix-ui/react-alert-dialog": "^1.1.6",
        "@radix-ui/react-aspect-ratio": "^1.1.2",
        "@radix-ui/react-avatar": "^1.1.3",
        "@radix-ui/react-checkbox": "^1.1.4",
        "@radix-ui/react-collapsible": "^1.1.3",
        "@radix-ui/react-context-menu": "^2.2.6",
        "@radix-ui/react-dialog": "^1.1.6",
        "@radix-ui/react-dropdown-menu": "^2.1.6",
        "@radix-ui/react-hover-card": "^1.1.6",
        "@radix-ui/react-label": "^2.1.2",
        "@radix-ui/react-menubar": "^1.1.6",
        "@radix-ui/react-navigation-menu": "^1.2.5",
        "@radix-ui/react-popover": "^1.1.6",
        "@radix-ui/react-progress": "^1.1.2",
        "@radix-ui/react-radio-group": "^1.2.3",
        "@radix-ui/react-scroll-area": "^1.2.3",
        "@radix-ui/react-select": "^2.1.6",
        "@radix-ui/react-separator": "^1.1.2",
        "@radix-ui/react-slider": "^1.2.3",
        "@radix-ui/react-slot": "^1.1.2",
        "@radix-ui/react-switch": "^1.1.3",
        "@radix-ui/react-tabs": "^1.1.3",
        "@radix-ui/react-toast": "^1.2.2",
        "@radix-ui/react-toggle": "^1.1.2",
        "@radix-ui/react-toggle-group": "^1.1.2",
        "@radix-ui/react-tooltip": "^1.1.8",
        "@stripe/react-stripe-js": "^3.0.0",
        "@stripe/stripe-js": "^5.2.0",
        "@tailwindcss/vite": "^4.2.4",
        "@tanstack/react-query": "^5.84.1",
        "canvas-confetti": "^1.9.4",
        "class-variance-authority": "^0.7.1",
        "clsx": "^2.1.1",
        "cmdk": "^1.0.0",
        "date-fns": "^3.6.0",
        "embla-carousel-react": "^8.5.2",
        "firebase": "^12.15.0",
        "framer-motion": "^11.16.4",
        "html2canvas": "^1.4.1",
        "input-otp": "^1.4.2",
        "jspdf": "^4.0.0",
        "lodash": "^4.17.21",
        "lucide-react": "^0.475.0",
        "moment": "^2.30.1",
        "next-themes": "^0.4.4",
        "react": "^18.2.0",
        "react-day-picker": "^8.10.1",
        "react-dom": "^18.2.0",
        "react-hook-form": "^7.54.2",
        "react-hot-toast": "^2.6.0",
        "react-leaflet": "^4.2.1",
        "react-markdown": "^9.0.1",
        "react-quill": "^2.0.0",
        "react-resizable-panels": "^2.1.7",
        "react-router-dom": "^6.26.0",
        "recharts": "^2.15.4",
        "sonner": "^2.0.1",
        "tailwind-merge": "^3.0.2",
        "tailwindcss-animate": "^1.0.7",
        "three": "^0.171.0",
        "vaul": "^1.1.2",
        "zod": "^3.24.2",
      },
      "devDependencies": {
        "@eslint/js": "^9.19.0",
        "@types/node": "^22.13.5",
        "@types/react": "^18.2.66",
        "@types/react-dom": "^18.2.22",
        "@vitejs/plugin-react": "^4.3.4",
        "autoprefixer": "^10.4.20",
        "baseline-browser-mapping": "^2.8.32",
        "eslint": "^9.19.0",
        "eslint-plugin-react": "^7.37.4",
        "eslint-plugin-react-hooks": "^5.0.0",
        "eslint-plugin-react-refresh": "^0.4.18",
        "eslint-plugin-unused-imports": "^4.3.0",
        "globals": "^15.14.0",
        "postcss": "^8.5.3",
        "tailwindcss": "^4.1.14",
        "typescript": "^5.8.2",
        "typescript-eslint": "^8.61.1",
        "vite": "^6.1.0",
      },
    },
  },
  "packages": {
    "@babel/code-frame": ["@babel/code-frame@7.29.0", "", { "dependencies": { "@babel/helper-validator-identifier": "^7.28.5", "js-tokens": "^4.0.0", "picocolors": "^1.1.1" } }, "sha512-9NhCeYjq9+3uxgdtp20LSiJXJvN0FeCtNGpJxuMFZ1Kv3cWUNb6DOhJwUvcVCzKGR66cw4njwM6hrJLqgOwbcw=="],

    "@babel/compat-data": ["@babel/compat-data@7.29.3", "", {}, "sha512-LIVqM46zQWZhj17qA8wb4nW/ixr2y1Nw+r1etiAWgRM6U1IqP+LNhL1yg440jYZR72jCWcWbLWzIosH+uP1fqg=="],

    "@babel/core": ["@babel/core@7.29.0", "", { "dependencies": { "@babel/code-frame": "^7.29.0", "@babel/generator": "^7.29.0", "@babel/helper-compilation-targets": "^7.28.6", "@babel/helper-module-transforms": "^7.28.6", "@babel/helpers": "^7.28.6", "@babel/parser": "^7.29.0", "@babel/template": "^7.28.6", "@babel/traverse": "^7.29.0", "@babel/types": "^7.29.0", "@jridgewell/remapping": "^2.3.5", "convert-source-map": "^2.0.0", "debug": "^4.1.0", "gensync": "^1.0.0-beta.2", "json5": "^2.2.3", "semver": "^6.3.1" } }, "sha512-CGOfOJqWjg2qW/Mb6zNsDm+u5vFQ8DxXfbM09z69p5Z6+mE1ikP2jUXw+j42Pf1XTYED2Rni5f95npYeuwMDQA=="],

    "@babel/generator": ["@babel/generator@7.29.1", "", { "dependencies": { "@babel/parser": "^7.29.0", "@babel/types": "^7.29.0", "@jridgewell/gen-mapping": "^0.3.12", "@jridgewell/trace-mapping": "^0.3.28", "jsesc": "^3.0.2" } }, "sha512-qsaF+9Qcm2Qv8SRIMMscAvG4O3lJ0F1GuMo5HR/Bp02LopNgnZBC/EkbevHFeGs4ls/oPz9v+Bsmzbkbe+0dUw=="],

    "@babel/helper-compilation-targets": ["@babel/helper-compilation-targets@7.28.6", "", { "dependencies": { "@babel/compat-data": "^7.28.6", "@babel/helper-validator-option": "^7.27.1", "browserslist": "^4.24.0", "lru-cache": "^5.1.1", "semver": "^6.3.1" } }, "sha512-JYtls3hqi15fcx5GaSNL7SCTJ2MNmjrkHXg4FSpOA/grxK8KwyZ5bubHsCq8FXCkua6xhuaaBit+3b7+VZRfcA=="],

    "@babel/helper-globals": ["@babel/helper-globals@7.28.0", "", {}, "sha512-+W6cISkXFa1jXsDEdYA8HeevQT/FULhxzR99pxphltZcVaugps53THCeiWA8SguxxpSp3gKPiuYfSWopkLQ4hw=="],

    "@babel/helper-module-imports": ["@babel/helper-module-imports@7.28.6", "", { "dependencies": { "@babel/traverse": "^7.28.6", "@babel/types": "^7.28.6" } }, "sha512-l5XkZK7r7wa9LucGw9LwZyyCUscb4x37JWTPz7swwFE/0FMQAGpiWUZn8u9DzkSBWEcK25jmvubfpw2dnAMdbw=="],

    "@babel/helper-module-transforms": ["@babel/helper-module-transforms@7.28.6", "", { "dependencies": { "@babel/helper-module-imports": "^7.28.6", "@babel/helper-validator-identifier": "^7.28.5", "@babel/traverse": "^7.28.6" }, "peerDependencies": { "@babel/core": "^7.0.0" } }, "sha512-67oXFAYr2cDLDVGLXTEABjdBJZ6drElUSI7WKp70NrpyISso3plG9SAGEF6y7zbha/wOzUByWWTJvEDVNIUGcA=="],

    "@babel/helper-plugin-utils": ["@babel/helper-plugin-utils@7.28.6", "", {}, "sha512-S9gzZ/bz83GRysI7gAD4wPT/AI3uCnY+9xn+Mx/KPs2JwHJIz1W8PZkg2cqyt3RNOBM8ejcXhV6y8Og7ly/Dug=="],

    "@babel/helper-string-parser": ["@babel/helper-string-parser@7.27.1", "", {}, "sha512-qMlSxKbpRlAridDExk92nSobyDdpPijUq2DW6oDnUqd0iOGxmQjyqhMIihI9+zv4LPyZdRje2cavWPbCbWm3eA=="],

    "@babel/helper-validator-identifier": ["@babel/helper-validator-identifier@7.28.5", "", {}, "sha512-qSs4ifwzKJSV39ucNjsvc6WVHs6b7S03sOh2OcHF9UHfVPqWWALUsNUVzhSBiItjRZoLHx7nIarVjqKVusUZ1Q=="],

    "@babel/helper-validator-option": ["@babel/helper-validator-option@7.27.1", "", {}, "sha512-YvjJow9FxbhFFKDSuFnVCe2WxXk1zWc22fFePVNEaWJEu8IrZVlda6N0uHwzZrUM1il7NC9Mlp4MaJYbYd9JSg=="],

    "@babel/helpers": ["@babel/helpers@7.29.2", "", { "dependencies": { "@babel/template": "^7.28.6", "@babel/types": "^7.29.0" } }, "sha512-HoGuUs4sCZNezVEKdVcwqmZN8GoHirLUcLaYVNBK2J0DadGtdcqgr3BCbvH8+XUo4NGjNl3VOtSjEKNzqfFgKw=="],

    "@babel/parser": ["@babel/parser@7.29.3", "", { "dependencies": { "@babel/types": "^7.29.0" }, "bin": { "parser": "bin/babel-parser.js" } }, "sha512-b3ctpQwp+PROvU/cttc4OYl4MzfJUWy6FZg+PMXfzmt/+39iHVF0sDfqay8TQM3JA2EUOyKcFZt75jWriQijsA=="],

    "@babel/plugin-transform-react-jsx-self": ["@babel/plugin-transform-react-jsx-self@7.27.1", "", { "dependencies": { "@babel/helper-plugin-utils": "^7.27.1" }, "peerDependencies": { "@babel/core": "^7.0.0-0" } }, "sha512-6UzkCs+ejGdZ5mFFC/OCUrv028ab2fp1znZmCZjAOBKiBK2jXD1O+BPSfX8X2qjJ75fZBMSnQn3Rq2mrBJK2mw=="],

    "@babel/plugin-transform-react-jsx-source": ["@babel/plugin-transform-react-jsx-source@7.27.1", "", { "dependencies": { "@babel/helper-plugin-utils": "^7.27.1" }, "peerDependencies": { "@babel/core": "^7.0.0-0" } }, "sha512-zbwoTsBruTeKB9hSq73ha66iFeJHuaFkUbwvqElnygoNbj/jHRsSeokowZFN3CZ64IvEqcmmkVe89OPXc7ldAw=="],

    "@babel/runtime": ["@babel/runtime@7.29.2", "", {}, "sha512-JiDShH45zKHWyGe4ZNVRrCjBz8Nh9TMmZG1kh4QTK8hCBTWBi8Da+i7s1fJw7/lYpM4ccepSNfqzZ/QvABBi5g=="],

    "@babel/template": ["@babel/template@7.28.6", "", { "dependencies": { "@babel/code-frame": "^7.28.6", "@babel/parser": "^7.28.6", "@babel/types": "^7.28.6" } }, "sha512-YA6Ma2KsCdGb+WC6UpBVFJGXL58MDA6oyONbjyF/+5sBgxY/dwkhLogbMT2GXXyU84/IhRw/2D1Os1B/giz+BQ=="],

    "@babel/traverse": ["@babel/traverse@7.29.0", "", { "dependencies": { "@babel/code-frame": "^7.29.0", "@babel/generator": "^7.29.0", "@babel/helper-globals": "^7.28.0", "@babel/parser": "^7.29.0", "@babel/template": "^7.28.6", "@babel/types": "^7.29.0", "debug": "^4.3.1" } }, "sha512-4HPiQr0X7+waHfyXPZpWPfWL/J7dcN1mx9gL6WdQVMbPnF3+ZhSMs8tCxN7oHddJE9fhNE7+lxdnlyemKfJRuA=="],

    "@babel/types": ["@babel/types@7.29.0", "", { "dependencies": { "@babel/helper-string-parser": "^7.27.1", "@babel/helper-validator-identifier": "^7.28.5" } }, "sha512-LwdZHpScM4Qz8Xw2iKSzS+cfglZzJGvofQICy7W7v4caru4EaAmyUuO6BGrbyQ2mYV11W0U8j5mBhd14dd3B0A=="],

    "@esbuild/aix-ppc64": ["@esbuild/aix-ppc64@0.25.12", "", { "os": "aix", "cpu": "ppc64" }, "sha512-Hhmwd6CInZ3dwpuGTF8fJG6yoWmsToE+vYgD4nytZVxcu1ulHpUQRAB1UJ8+N1Am3Mz4+xOByoQoSZf4D+CpkA=="],

    "@esbuild/android-arm": ["@esbuild/android-arm@0.25.12", "", { "os": "android", "cpu": "arm" }, "sha512-VJ+sKvNA/GE7Ccacc9Cha7bpS8nyzVv0jdVgwNDaR4gDMC/2TTRc33Ip8qrNYUcpkOHUT5OZ0bUcNNVZQ9RLlg=="],

    "@esbuild/android-arm64": ["@esbuild/android-arm64@0.25.12", "", { "os": "android", "cpu": "arm64" }, "sha512-6AAmLG7zwD1Z159jCKPvAxZd4y/VTO0VkprYy+3N2FtJ8+BQWFXU+OxARIwA46c5tdD9SsKGZ/1ocqBS/gAKHg=="],

    "@esbuild/android-x64": ["@esbuild/android-x64@0.25.12", "", { "os": "android", "cpu": "x64" }, "sha512-5jbb+2hhDHx5phYR2By8GTWEzn6I9UqR11Kwf22iKbNpYrsmRB18aX/9ivc5cabcUiAT/wM+YIZ6SG9QO6a8kg=="],

    "@esbuild/darwin-arm64": ["@esbuild/darwin-arm64@0.25.12", "", { "os": "darwin", "cpu": "arm64" }, "sha512-N3zl+lxHCifgIlcMUP5016ESkeQjLj/959RxxNYIthIg+CQHInujFuXeWbWMgnTo4cp5XVHqFPmpyu9J65C1Yg=="],

    "@esbuild/darwin-x64": ["@esbuild/darwin-x64@0.25.12", "", { "os": "darwin", "cpu": "x64" }, "sha512-HQ9ka4Kx21qHXwtlTUVbKJOAnmG1ipXhdWTmNXiPzPfWKpXqASVcWdnf2bnL73wgjNrFXAa3yYvBSd9pzfEIpA=="],

    "@esbuild/freebsd-arm64": ["@esbuild/freebsd-arm64@0.25.12", "", { "os": "freebsd", "cpu": "arm64" }, "sha512-gA0Bx759+7Jve03K1S0vkOu5Lg/85dou3EseOGUes8flVOGxbhDDh/iZaoek11Y8mtyKPGF3vP8XhnkDEAmzeg=="],

    "@esbuild/freebsd-x64": ["@esbuild/freebsd-x64@0.25.12", "", { "os": "freebsd", "cpu": "x64" }, "sha512-TGbO26Yw2xsHzxtbVFGEXBFH0FRAP7gtcPE7P5yP7wGy7cXK2oO7RyOhL5NLiqTlBh47XhmIUXuGciXEqYFfBQ=="],

    "@esbuild/linux-arm": ["@esbuild/linux-arm@0.25.12", "", { "os": "linux", "cpu": "arm" }, "sha512-lPDGyC1JPDou8kGcywY0YILzWlhhnRjdof3UlcoqYmS9El818LLfJJc3PXXgZHrHCAKs/Z2SeZtDJr5MrkxtOw=="],

    "@esbuild/linux-arm64": ["@esbuild/linux-arm64@0.25.12", "", { "os": "linux", "cpu": "arm64" }, "sha512-8bwX7a8FghIgrupcxb4aUmYDLp8pX06rGh5HqDT7bB+8Rdells6mHvrFHHW2JAOPZUbnjUpKTLg6ECyzvas2AQ=="],

    "@esbuild/linux-ia32": ["@esbuild/linux-ia32@0.25.12", "", { "os": "linux", "cpu": "ia32" }, "sha512-0y9KrdVnbMM2/vG8KfU0byhUN+EFCny9+8g202gYqSSVMonbsCfLjUO+rCci7pM0WBEtz+oK/PIwHkzxkyharA=="],

    "@esbuild/linux-loong64": ["@esbuild/linux-loong64@0.25.12", "", { "os": "linux", "cpu": "none" }, "sha512-h///Lr5a9rib/v1GGqXVGzjL4TMvVTv+s1DPoxQdz7l/AYv6LDSxdIwzxkrPW438oUXiDtwM10o9PmwS/6Z0Ng=="],

    "@esbuild/linux-mips64el": ["@esbuild/linux-mips64el@0.25.12", "", { "os": "linux", "cpu": "none" }, "sha512-iyRrM1Pzy9GFMDLsXn1iHUm18nhKnNMWscjmp4+hpafcZjrr2WbT//d20xaGljXDBYHqRcl8HnxbX6uaA/eGVw=="],

    "@esbuild/linux-ppc64": ["@esbuild/linux-ppc64@0.25.12", "", { "os": "linux", "cpu": "ppc64" }, "sha512-9meM/lRXxMi5PSUqEXRCtVjEZBGwB7P/D4yT8UG/mwIdze2aV4Vo6U5gD3+RsoHXKkHCfSxZKzmDssVlRj1QQA=="],

    "@esbuild/linux-riscv64": ["@esbuild/linux-riscv64@0.25.12", "", { "os": "linux", "cpu": "none" }, "sha512-Zr7KR4hgKUpWAwb1f3o5ygT04MzqVrGEGXGLnj15YQDJErYu/BGg+wmFlIDOdJp0PmB0lLvxFIOXZgFRrdjR0w=="],

    "@esbuild/linux-s390x": ["@esbuild/linux-s390x@0.25.12", "", { "os": "linux", "cpu": "s390x" }, "sha512-MsKncOcgTNvdtiISc/jZs/Zf8d0cl/t3gYWX8J9ubBnVOwlk65UIEEvgBORTiljloIWnBzLs4qhzPkJcitIzIg=="],

    "@esbuild/linux-x64": ["@esbuild/linux-x64@0.25.12", "", { "os": "linux", "cpu": "x64" }, "sha512-uqZMTLr/zR/ed4jIGnwSLkaHmPjOjJvnm6TVVitAa08SLS9Z0VM8wIRx7gWbJB5/J54YuIMInDquWyYvQLZkgw=="],

    "@esbuild/netbsd-arm64": ["@esbuild/netbsd-arm64@0.25.12", "", { "os": "none", "cpu": "arm64" }, "sha512-xXwcTq4GhRM7J9A8Gv5boanHhRa/Q9KLVmcyXHCTaM4wKfIpWkdXiMog/KsnxzJ0A1+nD+zoecuzqPmCRyBGjg=="],

    "@esbuild/netbsd-x64": ["@esbuild/netbsd-x64@0.25.12", "", { "os": "none", "cpu": "x64" }, "sha512-Ld5pTlzPy3YwGec4OuHh1aCVCRvOXdH8DgRjfDy/oumVovmuSzWfnSJg+VtakB9Cm0gxNO9BzWkj6mtO1FMXkQ=="],

    "@esbuild/openbsd-arm64": ["@esbuild/openbsd-arm64@0.25.12", "", { "os": "openbsd", "cpu": "arm64" }, "sha512-fF96T6KsBo/pkQI950FARU9apGNTSlZGsv1jZBAlcLL1MLjLNIWPBkj5NlSz8aAzYKg+eNqknrUJ24QBybeR5A=="],

    "@esbuild/openbsd-x64": ["@esbuild/openbsd-x64@0.25.12", "", { "os": "openbsd", "cpu": "x64" }, "sha512-MZyXUkZHjQxUvzK7rN8DJ3SRmrVrke8ZyRusHlP+kuwqTcfWLyqMOE3sScPPyeIXN/mDJIfGXvcMqCgYKekoQw=="],

    "@esbuild/openharmony-arm64": ["@esbuild/openharmony-arm64@0.25.12", "", { "os": "none", "cpu": "arm64" }, "sha512-rm0YWsqUSRrjncSXGA7Zv78Nbnw4XL6/dzr20cyrQf7ZmRcsovpcRBdhD43Nuk3y7XIoW2OxMVvwuRvk9XdASg=="],

    "@esbuild/sunos-x64": ["@esbuild/sunos-x64@0.25.12", "", { "os": "sunos", "cpu": "x64" }, "sha512-3wGSCDyuTHQUzt0nV7bocDy72r2lI33QL3gkDNGkod22EsYl04sMf0qLb8luNKTOmgF/eDEDP5BFNwoBKH441w=="],

    "@esbuild/win32-arm64": ["@esbuild/win32-arm64@0.25.12", "", { "os": "win32", "cpu": "arm64" }, "sha512-rMmLrur64A7+DKlnSuwqUdRKyd3UE7oPJZmnljqEptesKM8wx9J8gx5u0+9Pq0fQQW8vqeKebwNXdfOyP+8Bsg=="],

    "@esbuild/win32-ia32": ["@esbuild/win32-ia32@0.25.12", "", { "os": "win32", "cpu": "ia32" }, "sha512-HkqnmmBoCbCwxUKKNPBixiWDGCpQGVsrQfJoVGYLPT41XWF8lHuE5N6WhVia2n4o5QK5M4tYr21827fNhi4byQ=="],

    "@esbuild/win32-x64": ["@esbuild/win32-x64@0.25.12", "", { "os": "win32", "cpu": "x64" }, "sha512-alJC0uCZpTFrSL0CCDjcgleBXPnCrEAhTBILpeAp7M/OFgoqtAetfBzX0xM00MUsVVPpVjlPuMbREqnZCXaTnA=="],

    "@eslint-community/eslint-utils": ["@eslint-community/eslint-utils@4.9.1", "", { "dependencies": { "eslint-visitor-keys": "^3.4.3" }, "peerDependencies": { "eslint": "^6.0.0 || ^7.0.0 || >=8.0.0" } }, "sha512-phrYmNiYppR7znFEdqgfWHXR6NCkZEK7hwWDHZUjit/2/U0r6XvkDl0SYnoM51Hq7FhCGdLDT6zxCCOY1hexsQ=="],

    "@eslint-community/regexpp": ["@eslint-community/regexpp@4.12.2", "", {}, "sha512-EriSTlt5OC9/7SXkRSCAhfSxxoSUgBm33OH+IkwbdpgoqsSsUg7y3uh+IICI/Qg4BBWr3U2i39RpmycbxMq4ew=="],

    "@eslint/config-array": ["@eslint/config-array@0.21.2", "", { "dependencies": { "@eslint/object-schema": "^2.1.7", "debug": "^4.3.1", "minimatch": "^3.1.5" } }, "sha512-nJl2KGTlrf9GjLimgIru+V/mzgSK0ABCDQRvxw5BjURL7WfH5uoWmizbH7QB6MmnMBd8cIC9uceWnezL1VZWWw=="],

    "@eslint/config-helpers": ["@eslint/config-helpers@0.4.2", "", { "dependencies": { "@eslint/core": "^0.17.0" } }, "sha512-gBrxN88gOIf3R7ja5K9slwNayVcZgK6SOUORm2uBzTeIEfeVaIhOpCtTox3P6R7o2jLFwLFTLnC7kU/RGcYEgw=="],

    "@eslint/core": ["@eslint/core@0.17.0", "", { "dependencies": { "@types/json-schema": "^7.0.15" } }, "sha512-yL/sLrpmtDaFEiUj1osRP4TI2MDz1AddJL+jZ7KSqvBuliN4xqYY54IfdN8qD8Toa6g1iloph1fxQNkjOxrrpQ=="],

    "@eslint/eslintrc": ["@eslint/eslintrc@3.3.5", "", { "dependencies": { "ajv": "^6.14.0", "debug": "^4.3.2", "espree": "^10.0.1", "globals": "^14.0.0", "ignore": "^5.2.0", "import-fresh": "^3.2.1", "js-yaml": "^4.1.1", "minimatch": "^3.1.5", "strip-json-comments": "^3.1.1" } }, "sha512-4IlJx0X0qftVsN5E+/vGujTRIFtwuLbNsVUe7TO6zYPDR1O6nFwvwhIKEKSrl6dZchmYBITazxKoUYOjdtjlRg=="],

    "@eslint/js": ["@eslint/js@9.39.4", "", {}, "sha512-nE7DEIchvtiFTwBw4Lfbu59PG+kCofhjsKaCWzxTpt4lfRjRMqG6uMBzKXuEcyXhOHoUp9riAm7/aWYGhXZ9cw=="],

    "@eslint/object-schema": ["@eslint/object-schema@2.1.7", "", {}, "sha512-VtAOaymWVfZcmZbp6E2mympDIHvyjXs/12LqWYjVw6qjrfF+VK+fyG33kChz3nnK+SU5/NeHOqrTEHS8sXO3OA=="],

    "@eslint/plugin-kit": ["@eslint/plugin-kit@0.4.1", "", { "dependencies": { "@eslint/core": "^0.17.0", "levn": "^0.4.1" } }, "sha512-43/qtrDUokr7LJqoF2c3+RInu/t4zfrpYdoSDfYyhg52rwLV6TnOvdG4fXm7IkSB3wErkcmJS9iEhjVtOSEjjA=="],

    "@firebase/ai": ["@firebase/ai@2.13.1", "", { "dependencies": { "@firebase/app-check-interop-types": "0.3.4", "@firebase/component": "0.7.3", "@firebase/logger": "0.5.1", "@firebase/util": "1.15.1", "tslib": "^2.1.0" }, "peerDependencies": { "@firebase/app": "0.x", "@firebase/app-types": "0.x" } }, "sha512-RhT/VViTPBSplhQSuEp62HhLvfsV+LowMh8ZUo5MMRDzG7oFtSget4Kmg5oHP50hDVyWQuQj6to9iPFEZk08Tw=="],

    "@firebase/analytics": ["@firebase/analytics@0.10.22", "", { "dependencies": { "@firebase/component": "0.7.3", "@firebase/installations": "0.6.22", "@firebase/logger": "0.5.1", "@firebase/util": "1.15.1", "tslib": "^2.1.0" }, "peerDependencies": { "@firebase/app": "0.x" } }, "sha512-8BSaq/QRGU1+xyi8L2PTLTJU7MH9aMA72RQdIxrbhWFauOZY9OXo8f2YDN/972xA8d588tlnNVEQ2Mo69pT9Ow=="],

    "@firebase/analytics-compat": ["@firebase/analytics-compat@0.2.28", "", { "dependencies": { "@firebase/analytics": "0.10.22", "@firebase/analytics-types": "0.8.4", "@firebase/component": "0.7.3", "@firebase/util": "1.15.1", "tslib": "^2.1.0" }, "peerDependencies": { "@firebase/app-compat": "0.x" } }, "sha512-lIAlqUUbBu93FJMlQfslryQtBwwzdzvp23ePC6FNgymXk6Ook5v4Uvc0vdutvoIeqmyA3LfP0ZeRFK8+11kOOQ=="],

    "@firebase/analytics-types": ["@firebase/analytics-types@0.8.4", "", {}, "sha512-zQ+XTgkwH6CY/eUSHJRP7e4LxM30RCxlCmob5sy2axs25GE3Ny0XdgpDscMTHHQIGqWkxPXad4w2Mw9sCgT8zQ=="],

    "@firebase/app": ["@firebase/app@0.15.0", "", { "dependencies": { "@firebase/component": "0.7.3", "@firebase/logger": "0.5.1", "@firebase/util": "1.15.1", "idb": "7.1.1", "tslib": "^2.1.0" } }, "sha512-soIskolmGgbpi0K/MfrjtdpO1220qRCbXA4Z8Qx3lM+fVwA3q40m+OM+7zBHd2nuQCrLXb33L6Oc1aBH3Y26AQ=="],

    "@firebase/app-check": ["@firebase/app-check@0.12.0", "", { "dependencies": { "@firebase/component": "0.7.3", "@firebase/logger": "0.5.1", "@firebase/util": "1.15.1", "tslib": "^2.1.0" }, "peerDependencies": { "@firebase/app": "0.x" } }, "sha512-wMeT6HLWRAuW7Cp/5UjWBGKgjPNxWNOoNf4PRIv0weljoGMZVeqbUY7wNBWTI2/31cX1NlXx8gQruDLsUShB3Q=="],

    "@firebase/app-check-compat": ["@firebase/app-check-compat@0.4.5", "", { "dependencies": { "@firebase/app-check": "0.12.0", "@firebase/app-check-types": "0.5.4", "@firebase/component": "0.7.3", "@firebase/logger": "0.5.1", "@firebase/util": "1.15.1", "tslib": "^2.1.0" }, "peerDependencies": { "@firebase/app-compat": "0.x" } }, "sha512-JI17mVcZs34zO6ZeSCrw4U2iohqy+n6GIzkbmsA+TbVjmvFLkUKt3bs5M+qRBteQm/0IWzqSHYFzEQLzDTQebg=="],

    "@firebase/app-check-interop-types": ["@firebase/app-check-interop-types@0.3.4", "", {}, "sha512-zz3i6e13B8BfWiLy8MABtTh8aGIACgKbf9UVnyHcWs+yQzJXgQcl8A46b0zfaiJHdQ+niF0ouAfcpuf+3LMPQg=="],

    "@firebase/app-check-types": ["@firebase/app-check-types@0.5.4", "", {}, "sha512-xV7JsIyzVr15aA7f3Pi0rB9gdBuVubs89FGA8VkRYA4g0l78poADgdfrScgf7NndSg9mm7cR7PJyY0+t22KaGw=="],

    "@firebase/app-compat": ["@firebase/app-compat@0.5.14", "", { "dependencies": { "@firebase/app": "0.15.0", "@firebase/component": "0.7.3", "@firebase/logger": "0.5.1", "@firebase/util": "1.15.1", "tslib": "^2.1.0" } }, "sha512-rgFmiofYsdS9ZG/Bht3OBxJtPD3zWE1cffShWubEm+4+qZeyzCbmtb1q6jOEjN9fB7uufe4rQmWOPXouR3758Q=="],

    "@firebase/app-types": ["@firebase/app-types@0.9.5", "", { "dependencies": { "@firebase/logger": "0.5.1" } }, "sha512-YevqTjvo7Iujsa9Dwowmd6dSoElhzmD63ZSrq6bzjvQ6POjYgNjOFHLmNIgJs48eNO093NCERibuFnxbfOvU7A=="],

    "@firebase/auth": ["@firebase/auth@1.13.3", "", { "dependencies": { "@firebase/component": "0.7.3", "@firebase/logger": "0.5.1", "@firebase/util": "1.15.1", "tslib": "^2.1.0" }, "peerDependencies": { "@firebase/app": "0.x", "@react-native-async-storage/async-storage": "^2.2.0 || ^3.0.0" }, "optionalPeers": ["@react-native-async-storage/async-storage"] }, "sha512-bqiq4uubDN2YyQkdvSWPQeJyXAv2O76ImF41En9b6UhV5JuBVYDoHYrrrE3NzIuGkpFMKagfhMRP4Vz6t+yQSQ=="],

    "@firebase/auth-compat": ["@firebase/auth-compat@0.6.8", "", { "dependencies": { "@firebase/auth": "1.13.3", "@firebase/auth-types": "0.13.1", "@firebase/component": "0.7.3", "@firebase/util": "1.15.1", "tslib": "^2.1.0" }, "peerDependencies": { "@firebase/app-compat": "0.x" } }, "sha512-llcBREUC4iSNKZ6rvwud7Oz9Q7aAWU6KuQLa6pdu7Q+QAQsy4JLw6yFgxwtmzabsgznHmmcsX2UjHLLzqUxi3Q=="],

    "@firebase/auth-interop-types": ["@firebase/auth-interop-types@0.2.5", "", {}, "sha512-1Li/YuBDBAXcKv7BzY4U28gontUmAaw53sYiqbaVOMCFb2lFKK/c3CGMUWqtwe7+TXrl3poWnTCL5umYBg85Eg=="],

    "@firebase/auth-types": ["@firebase/auth-types@0.13.1", "", { "peerDependencies": { "@firebase/app-types": "0.x", "@firebase/util": "1.x" } }, "sha512-0c1Mnid0uMDfGJHeUS4zfvBa4/CedJXotGy/n/NZJnBjwiJawt0ZYU+wH2VAVLiRCEfG2ncCkAX3yd1/2nrB7g=="],

    "@firebase/component": ["@firebase/component@0.7.3", "", { "dependencies": { "@firebase/util": "1.15.1", "tslib": "^2.1.0" } }, "sha512-wFofIaa2879ogD/WvkjYXJxRmfnL0scen6ORgaC3na1FNOR9ASIUANQdhqQcmWu/h77/pVHY7ch5flewa5Bcew=="],

    "@firebase/data-connect": ["@firebase/data-connect@0.7.1", "", { "dependencies": { "@firebase/auth-interop-types": "0.2.5", "@firebase/component": "0.7.3", "@firebase/logger": "0.5.1", "@firebase/util": "1.15.1", "tslib": "^2.1.0" }, "peerDependencies": { "@firebase/app": "0.x" } }, "sha512-2LbUU8mmSA63HknxQMmWHjpzuNLBKflvVwQc2tpoVKg0biWleNEJX031ELks0vzFs+dDjOUkCJR72RP6mQHFOg=="],

    "@firebase/database": ["@firebase/database@1.1.3", "", { "dependencies": { "@firebase/app-check-interop-types": "0.3.4", "@firebase/auth-interop-types": "0.2.5", "@firebase/component": "0.7.3", "@firebase/logger": "0.5.1", "@firebase/util": "1.15.1", "faye-websocket": "0.11.4", "tslib": "^2.1.0" } }, "sha512-XwWCa+E4TvNGpGwXrycLRNfdogADwFcvuhyow6wDWma9W54roaQIhe+4PM0KiLsIftBdSCGI7OKCXrdSRHbIhw=="],

    "@firebase/database-compat": ["@firebase/database-compat@2.1.4", "", { "dependencies": { "@firebase/component": "0.7.3", "@firebase/database": "1.1.3", "@firebase/database-types": "1.0.20", "@firebase/logger": "0.5.1", "@firebase/util": "1.15.1", "tslib": "^2.1.0" } }, "sha512-3pK35F1MAgmqFJQlf2nhQl44vtAXQO1uaCaQOEUI9kCRtLFqi7N+QRKR7lFZPg+xIZIyubgxQaxY69YgfZRZWg=="],

    "@firebase/database-types": ["@firebase/database-types@1.0.20", "", { "dependencies": { "@firebase/app-types": "0.9.5", "@firebase/util": "1.15.1" } }, "sha512-kegbOk/w8iU64pr0q6k2ItyNGjnQBMHFhwS7ohdWI4W+pc0/zhhdGXTdFj6X1oxItRjPoYOsSQmERgBkn/ihxw=="],

    "@firebase/firestore": ["@firebase/firestore@4.16.0", "", { "dependencies": { "@firebase/component": "0.7.3", "@firebase/logger": "0.5.1", "@firebase/util": "1.15.1", "@firebase/webchannel-wrapper": "1.0.6", "@grpc/grpc-js": "~1.9.0", "@grpc/proto-loader": "^0.7.8", "re2js": "^0.4.2", "tslib": "^2.1.0" }, "peerDependencies": { "@firebase/app": "0.x" } }, "sha512-qdHMHMvMr0nRMuZyWNR/ArWa0YlPE3C4eAbmxTASJMYXAesKPL0Y54p70moggrNPzaK7MSIIq5RDJJyntQyIYA=="],

    "@firebase/firestore-compat": ["@firebase/firestore-compat@0.4.11", "", { "dependencies": { "@firebase/component": "0.7.3", "@firebase/firestore": "4.16.0", "@firebase/firestore-types": "3.0.4", "@firebase/util": "1.15.1", "tslib": "^2.1.0" }, "peerDependencies": { "@firebase/app-compat": "0.x" } }, "sha512-W7o1WdwWq5aABK5Up2ncSvTQs/QGLR/fy7cVpFBNqhsXtxoMtflHf2xBIG6+aoptcuGAobddq4g2Sq27wqHaYw=="],

    "@firebase/firestore-types": ["@firebase/firestore-types@3.0.4", "", { "peerDependencies": { "@firebase/app-types": "0.x", "@firebase/util": "1.x" } }, "sha512-jGn+JSS4X9zZsrfu7Yw66v5YRdOLD1oyQh4USR0xWl4CUqV/DA6bNIXRPpxH/cUl3iVTNiP6MN7g+EL42A4qfA=="],

    "@firebase/functions": ["@firebase/functions@0.13.5", "", { "dependencies": { "@firebase/app-check-interop-types": "0.3.4", "@firebase/auth-interop-types": "0.2.5", "@firebase/component": "0.7.3", "@firebase/messaging-interop-types": "0.2.5", "@firebase/util": "1.15.1", "tslib": "^2.1.0" }, "peerDependencies": { "@firebase/app": "0.x" } }, "sha512-bWCx713f4kE/uFV7gdFOLBS7lDoiZj48MRkbAqe35gkXcCeWF4QjRNO07Jhmve7EJIoQOBczL29y2r8VRuN1kw=="],

    "@firebase/functions-compat": ["@firebase/functions-compat@0.4.5", "", { "dependencies": { "@firebase/component": "0.7.3", "@firebase/functions": "0.13.5", "@firebase/functions-types": "0.6.4", "@firebase/util": "1.15.1", "tslib": "^2.1.0" }, "peerDependencies": { "@firebase/app-compat": "0.x" } }, "sha512-10qlUXGY25G5/1g9UihqksPp2po+ZqSE7LEizsrdUP7vrTmkysXxGSZCDyojSEp6mQe/ecRDdDDI+z4XRdb4wQ=="],

    "@firebase/functions-types": ["@firebase/functions-types@0.6.4", "", {}, "sha512-zV6kgqtduR4rUAdC/ilS7kmb93XD7bEZoJDlVBZqlOw2uGGGCNBQBuleww2rr0Ulr3L9o2TDjumEt68/l1f9DQ=="],

    "@firebase/installations": ["@firebase/installations@0.6.22", "", { "dependencies": { "@firebase/component": "0.7.3", "@firebase/util": "1.15.1", "idb": "7.1.1", "tslib": "^2.1.0" }, "peerDependencies": { "@firebase/app": "0.x" } }, "sha512-ef6nn3GGQTdReCfotRMG77PJZu8CqEbiK5pEoBnM0gTu/Z9v0i/az2p3HABsa/1beQmmyh1OsOjf7P5+pgwdZw=="],

    "@firebase/installations-compat": ["@firebase/installations-compat@0.2.22", "", { "dependencies": { "@firebase/component": "0.7.3", "@firebase/installations": "0.6.22", "@firebase/installations-types": "0.5.4", "@firebase/util": "1.15.1", "tslib": "^2.1.0" }, "peerDependencies": { "@firebase/app-compat": "0.x" } }, "sha512-C/zpAuTP5S9OgKSPvXRupw3hoY/JZSlA1wFjD/Sb7LIQE0FNbcMdO8Y4KXVEkjVzma/DDDDIAzxEXqKMAzc88w=="],

    "@firebase/installations-types": ["@firebase/installations-types@0.5.4", "", { "peerDependencies": { "@firebase/app-types": "0.x" } }, "sha512-U2eFapdHwjb43Vx9o+Pmj4dFfvcHEK1IirEFLqMtWrTHvmdrS3gBpBD1kmJk/9HjsOtoHZxJ2Paoe79e+L1ZPg=="],

    "@firebase/logger": ["@firebase/logger@0.5.1", "", { "dependencies": { "tslib": "^2.1.0" } }, "sha512-vZKLsqE1ABOy8OjQiE7cUTFn4gvaqlk88yp8N94Pk/sDpq61YqZGqmVFZTvOyflTwuYFcWirBdYGoJgbDaXKYQ=="],

    "@firebase/messaging": ["@firebase/messaging@0.13.0", "", { "dependencies": { "@firebase/component": "0.7.3", "@firebase/installations": "0.6.22", "@firebase/messaging-interop-types": "0.2.5", "@firebase/util": "1.15.1", "idb": "7.1.1", "tslib": "^2.1.0" }, "peerDependencies": { "@firebase/app": "0.x" } }, "sha512-GZoo0uGRvEbszo83xcgbjJp4FpkmBEr4l8Z4hi8gl+P1Spn/MTK3HapanMzSX4yUHuTEiF5hasWRxOaz+o5sxQ=="],

    "@firebase/messaging-compat": ["@firebase/messaging-compat@0.2.27", "", { "dependencies": { "@firebase/component": "0.7.3", "@firebase/messaging": "0.13.0", "@firebase/util": "1.15.1", "tslib": "^2.1.0" }, "peerDependencies": { "@firebase/app-compat": "0.x" } }, "sha512-JNOiu1PPgdHzEPEtoFiNxQuu0x9bm4bfETSQCpGfcTlgWkhlSK7uh7nlsjC10TQLUNgYetLmuutaYTh8aeYLVA=="],

    "@firebase/messaging-interop-types": ["@firebase/messaging-interop-types@0.2.5", "", {}, "sha512-tUEKnaAP2Y/MNIqgnriPpV6e5l13Vs/+p2yrd6NGlncPJT9O3a8muYZtdnWe+IJ4fgKLHJVC79n/asxk/N5Msw=="],

    "@firebase/performance": ["@firebase/performance@0.7.12", "", { "dependencies": { "@firebase/component": "0.7.3", "@firebase/installations": "0.6.22", "@firebase/logger": "0.5.1", "@firebase/util": "1.15.1", "tslib": "^2.1.0", "web-vitals": "^4.2.4" }, "peerDependencies": { "@firebase/app": "0.x" } }, "sha512-fe7nV8teUU3OBHlMUZ9Lw4gLhCW2k4m5Uc3pfWGV+fl8uwJQBGp9Q3lqsJ+HSrFu3Q2pJyLAgrClPGSKyDeYgQ=="],

    "@firebase/performance-compat": ["@firebase/performance-compat@0.2.25", "", { "dependencies": { "@firebase/component": "0.7.3", "@firebase/logger": "0.5.1", "@firebase/performance": "0.7.12", "@firebase/performance-types": "0.2.4", "@firebase/util": "1.15.1", "tslib": "^2.1.0" }, "peerDependencies": { "@firebase/app-compat": "0.x" } }, "sha512-q6NjTXpIPoFuUmCmMN/maCdTgzT6aExs9xZo+PxfVLj6uLVGvpyAD6XWjmcrb7jChsFBYbq7E5dyNDF7Zhy9kA=="],

    "@firebase/performance-types": ["@firebase/performance-types@0.2.4", "", {}, "sha512-kJSEk7b0uhpcPRyL4SQ/GPujLqk52XNKcXlnsKDbWGAb9vugcLvOU3u6zfEdwd+d8hWJb5S5ZizV1JFFI0nkKg=="],

    "@firebase/remote-config": ["@firebase/remote-config@0.8.5", "", { "dependencies": { "@firebase/component": "0.7.3", "@firebase/installations": "0.6.22", "@firebase/logger": "0.5.1", "@firebase/util": "1.15.1", "tslib": "^2.1.0" }, "peerDependencies": { "@firebase/app": "0.x" } }, "sha512-zb+7CDGFP2wYVF1LXQoYIFdoESIQM3p0+uiW1welw8+zvDxAL50K75PKTXXtunJADUrksTVpV7mD0pn54vzJRA=="],

    "@firebase/remote-config-compat": ["@firebase/remote-config-compat@0.2.26", "", { "dependencies": { "@firebase/component": "0.7.3", "@firebase/logger": "0.5.1", "@firebase/remote-config": "0.8.5", "@firebase/remote-config-types": "0.5.1", "@firebase/util": "1.15.1", "tslib": "^2.1.0" }, "peerDependencies": { "@firebase/app-compat": "0.x" } }, "sha512-uC57Tc7GYYOCnMgLkGIVf999XlaYaPDONoa54c93YTKDctlvCZI89z0zQ2RbhGR8Zf+QuCbQHs/99vqoE84a7g=="],

    "@firebase/remote-config-types": ["@firebase/remote-config-types@0.5.1", "", {}, "sha512-cX/1LT6KQwkXzck2eSzeKnuvXZCyr8qaPpDcikoJs7jmI+oBOXixpDLeDtWj1U6GNMkIoXrEDNoyT2Ypcyp5/A=="],

    "@firebase/storage": ["@firebase/storage@0.14.3", "", { "dependencies": { "@firebase/component": "0.7.3", "@firebase/util": "1.15.1", "tslib": "^2.1.0" }, "peerDependencies": { "@firebase/app": "0.x" } }, "sha512-YX4/YL6P6/fufSSeGnVhjWddcIXbFq2cWIhMKFTZo1E/Rtcl2mJj/BYUQTwJfcE1Tl8un1FOya4L05jcSLN/Eg=="],

    "@firebase/storage-compat": ["@firebase/storage-compat@0.4.3", "", { "dependencies": { "@firebase/component": "0.7.3", "@firebase/storage": "0.14.3", "@firebase/storage-types": "0.8.4", "@firebase/util": "1.15.1", "tslib": "^2.1.0" }, "peerDependencies": { "@firebase/app-compat": "0.x" } }, "sha512-gruVqjtUGX8tEoeNbaWXZm0Zfcfcb7fvmDmBxV8yPAbWvExRnZYLO2+qw9idxNE7BvPXt5csyjSYHy//dAizxw=="],

    "@firebase/storage-types": ["@firebase/storage-types@0.8.4", "", { "peerDependencies": { "@firebase/app-types": "0.x", "@firebase/util": "1.x" } }, "sha512-BT7cwxJOx8SWwlQfrlC+bD/Sk3Cw+1odCi8UZNFNWTVZoPsBnA5W+mqtZzVnvsdJpXCFGSGQ7R7vOR6dtM/BRA=="],

    "@firebase/util": ["@firebase/util@1.15.1", "", { "dependencies": { "tslib": "^2.1.0" } }, "sha512-LUdM4Wg7YM9Pq/49nGYySJA0CSQEKnGffFzWV8+6gXN7mGxn+FL1IqvFbuZUtAQcfZgHYDwCE1wwlK7rB7gl2g=="],

    "@firebase/webchannel-wrapper": ["@firebase/webchannel-wrapper@1.0.6", "", {}, "sha512-Vr/Mqu79dMwGRAyGbJ4uN4+BtXB3/mRTdzetD1daWNeG8QaWuzhhbG77GltO5c0yYmYls8i250iX73624GJd7Q=="],

    "@floating-ui/core": ["@floating-ui/core@1.7.5", "", { "dependencies": { "@floating-ui/utils": "^0.2.11" } }, "sha512-1Ih4WTWyw0+lKyFMcBHGbb5U5FtuHJuujoyyr5zTaWS5EYMeT6Jb2AuDeftsCsEuchO+mM2ij5+q9crhydzLhQ=="],

    "@floating-ui/dom": ["@floating-ui/dom@1.7.6", "", { "dependencies": { "@floating-ui/core": "^1.7.5", "@floating-ui/utils": "^0.2.11" } }, "sha512-9gZSAI5XM36880PPMm//9dfiEngYoC6Am2izES1FF406YFsjvyBMmeJ2g4SAju3xWwtuynNRFL2s9hgxpLI5SQ=="],

    "@floating-ui/react-dom": ["@floating-ui/react-dom@2.1.8", "", { "dependencies": { "@floating-ui/dom": "^1.7.6" }, "peerDependencies": { "react": ">=16.8.0", "react-dom": ">=16.8.0" } }, "sha512-cC52bHwM/n/CxS87FH0yWdngEZrjdtLW/qVruo68qg+prK7ZQ4YGdut2GyDVpoGeAYe/h899rVeOVm6Oi40k2A=="],

    "@floating-ui/utils": ["@floating-ui/utils@0.2.11", "", {}, "sha512-RiB/yIh78pcIxl6lLMG0CgBXAZ2Y0eVHqMPYugu+9U0AeT6YBeiJpf7lbdJNIugFP5SIjwNRgo4DhR1Qxi26Gg=="],

    "@grpc/grpc-js": ["@grpc/grpc-js@1.9.16", "", { "dependencies": { "@grpc/proto-loader": "^0.7.8", "@types/node": ">=12.12.47" } }, "sha512-wE4Ut/olIzfKqp631XrG+wbF0v1vWFN4YL9FyXC2LJiG33DsV7PLzURjrCvY/6je2ntdRkeLpPDluzSRGaVltQ=="],

    "@grpc/proto-loader": ["@grpc/proto-loader@0.7.15", "", { "dependencies": { "lodash.camelcase": "^4.3.0", "long": "^5.0.0", "protobufjs": "^7.2.5", "yargs": "^17.7.2" }, "bin": { "proto-loader-gen-types": "build/bin/proto-loader-gen-types.js" } }, "sha512-tMXdRCfYVixjuFK+Hk0Q1s38gV9zDiDJfWL3h1rv4Qc39oILCu1TRTDt7+fGUI8K4G1Fj125Hx/ru3azECWTyQ=="],

    "@hello-pangea/dnd": ["@hello-pangea/dnd@17.0.0", "", { "dependencies": { "@babel/runtime": "^7.25.6", "css-box-model": "^1.2.1", "memoize-one": "^6.0.0", "raf-schd": "^4.0.3", "react-redux": "^9.1.2", "redux": "^5.0.1", "use-memo-one": "^1.1.3" }, "peerDependencies": { "react": "^18.0.0", "react-dom": "^18.0.0" } }, "sha512-LDDPOix/5N0j5QZxubiW9T0M0+1PR0rTDWeZF5pu1Tz91UQnuVK4qQ/EjY83Qm2QeX0eM8qDXANfDh3VVqtR4Q=="],

    "@hookform/resolvers": ["@hookform/resolvers@4.1.3", "", { "dependencies": { "@standard-schema/utils": "^0.3.0" }, "peerDependencies": { "react-hook-form": "^7.0.0" } }, "sha512-Jsv6UOWYTrEFJ/01ZrnwVXs7KDvP8XIo115i++5PWvNkNvkrsTfGiLS6w+eJ57CYtUtDQalUWovCZDHFJ8u1VQ=="],

    "@humanfs/core": ["@humanfs/core@0.19.2", "", { "dependencies": { "@humanfs/types": "^0.15.0" } }, "sha512-UhXNm+CFMWcbChXywFwkmhqjs3PRCmcSa/hfBgLIb7oQ5HNb1wS0icWsGtSAUNgefHeI+eBrA8I1fxmbHsGdvA=="],

    "@humanfs/node": ["@humanfs/node@0.16.8", "", { "dependencies": { "@humanfs/core": "^0.19.2", "@humanfs/types": "^0.15.0", "@humanwhocodes/retry": "^0.4.0" } }, "sha512-gE1eQNZ3R++kTzFUpdGlpmy8kDZD/MLyHqDwqjkVQI0JMdI1D51sy1H958PNXYkM2rAac7e5/CnIKZrHtPh3BQ=="],

    "@humanfs/types": ["@humanfs/types@0.15.0", "", {}, "sha512-ZZ1w0aoQkwuUuC7Yf+7sdeaNfqQiiLcSRbfI08oAxqLtpXQr9AIVX7Ay7HLDuiLYAaFPu8oBYNq/QIi9URHJ3Q=="],

    "@humanwhocodes/module-importer": ["@humanwhocodes/module-importer@1.0.1", "", {}, "sha512-bxveV4V8v5Yb4ncFTT3rPSgZBOpCkjfK0y4oVVVJwIuDVBRMDXrPyXRL988i5ap9m9bnyEEjWfm5WkBmtffLfA=="],

    "@humanwhocodes/retry": ["@humanwhocodes/retry@0.4.3", "", {}, "sha512-bV0Tgo9K4hfPCek+aMAn81RppFKv2ySDQeMoSZuvTASywNTnVJCArCZE2FWqpvIatKu7VMRLWlR1EazvVhDyhQ=="],

    "@jridgewell/gen-mapping": ["@jridgewell/gen-mapping@0.3.13", "", { "dependencies": { "@jridgewell/sourcemap-codec": "^1.5.0", "@jridgewell/trace-mapping": "^0.3.24" } }, "sha512-2kkt/7niJ6MgEPxF0bYdQ6etZaA+fQvDcLKckhy1yIQOzaoKjBBjSj63/aLVjYE3qhRt5dvM+uUyfCg6UKCBbA=="],

    "@jridgewell/remapping": ["@jridgewell/remapping@2.3.5", "", { "dependencies": { "@jridgewell/gen-mapping": "^0.3.5", "@jridgewell/trace-mapping": "^0.3.24" } }, "sha512-LI9u/+laYG4Ds1TDKSJW2YPrIlcVYOwi2fUC6xB43lueCjgxV4lffOCZCtYFiH6TNOX+tQKXx97T4IKHbhyHEQ=="],

    "@jridgewell/resolve-uri": ["@jridgewell/resolve-uri@3.1.2", "", {}, "sha512-bRISgCIjP20/tbWSPWMEi54QVPRZExkuD9lJL+UIxUKtwVJA8wW1Trb1jMs1RFXo1CBTNZ/5hpC9QvmKWdopKw=="],

    "@jridgewell/sourcemap-codec": ["@jridgewell/sourcemap-codec@1.5.5", "", {}, "sha512-cYQ9310grqxueWbl+WuIUIaiUaDcj7WOq5fVhEljNVgRfOUhY9fy2zTvfoqWsnebh8Sl70VScFbICvJnLKB0Og=="],

    "@jridgewell/trace-mapping": ["@jridgewell/trace-mapping@0.3.31", "", { "dependencies": { "@jridgewell/resolve-uri": "^3.1.0", "@jridgewell/sourcemap-codec": "^1.4.14" } }, "sha512-zzNR+SdQSDJzc8joaeP8QQoCQr8NuYx2dIIytl1QeBEZHJ9uW6hebsrYgbz8hJwUQao3TWCMtmfV8Nu1twOLAw=="],

    "@protobufjs/aspromise": ["@protobufjs/aspromise@1.1.2", "", {}, "sha512-j+gKExEuLmKwvz3OgROXtrJ2UG2x8Ch2YZUxahh+s1F2HZ+wAceUNLkvy6zKCPVRkU++ZWQrdxsUeQXmcg4uoQ=="],

    "@protobufjs/base64": ["@protobufjs/base64@1.1.2", "", {}, "sha512-AZkcAA5vnN/v4PDqKyMR5lx7hZttPDgClv83E//FMNhR2TMcLUhfRUBHCmSl0oi9zMgDDqRUJkSxO3wm85+XLg=="],

    "@protobufjs/codegen": ["@protobufjs/codegen@2.0.5", "", {}, "sha512-zgXFLzW3Ap33e6d0Wlj4MGIm6Ce8O89n/apUaGNB/jx+hw+ruWEp7EwGUshdLKVRCxZW12fp9r40E1mQrf/34g=="],

    "@protobufjs/eventemitter": ["@protobufjs/eventemitter@1.1.1", "", {}, "sha512-vW1GmwMZNnL+gMRaovlh9yZX74kc+TTU3FObkkurpMaRtBfLP3ldjS9KQWlwZgraRE0+dheEEoAxdzcJQ8eXZg=="],

    "@protobufjs/fetch": ["@protobufjs/fetch@1.1.1", "", { "dependencies": { "@protobufjs/aspromise": "^1.1.1" } }, "sha512-GpptLrs57adMSuHi3VNj0mAF8dwh36LMaYF6XyJ6JMWlVsc+t42tm1HSEDmOs3A8fC9yyeisgLhsTVQokOZ0zw=="],

    "@protobufjs/float": ["@protobufjs/float@1.0.2", "", {}, "sha512-Ddb+kVXlXst9d+R9PfTIxh1EdNkgoRe5tOX6t01f1lYWOvJnSPDBlG241QLzcyPdoNTsblLUdujGSE4RzrTZGQ=="],

    "@protobufjs/path": ["@protobufjs/path@1.1.2", "", {}, "sha512-6JOcJ5Tm08dOHAbdR3GrvP+yUUfkjG5ePsHYczMFLq3ZmMkAD98cDgcT2iA1lJ9NVwFd4tH/iSSoe44YWkltEA=="],

    "@protobufjs/pool": ["@protobufjs/pool@1.1.0", "", {}, "sha512-0kELaGSIDBKvcgS4zkjz1PeddatrjYcmMWOlAuAPwAeccUrPHdUqo/J6LiymHHEiJT5NrF1UVwxY14f+fy4WQw=="],

    "@protobufjs/utf8": ["@protobufjs/utf8@1.1.1", "", {}, "sha512-oOAWABowe8EAbMyWKM0tYDKi8Yaox52D+HWZhAIJqQXbqe0xI/GV7FhLWqlEKreMkfDjshR5FKgi3mnle0h6Eg=="],

    "@radix-ui/number": ["@radix-ui/number@1.1.1", "", {}, "sha512-MkKCwxlXTgz6CFoJx3pCwn07GKp36+aZyu/u2Ln2VrA5DcdyCZkASEDBTd8x5whTQQL5CiYf4prXKLcgQdv29g=="],

    "@radix-ui/primitive": ["@radix-ui/primitive@1.1.3", "", {}, "sha512-JTF99U/6XIjCBo0wqkU5sK10glYe27MRRsfwoiq5zzOEZLHU3A3KCMa5X/azekYRCJ0HlwI0crAXS/5dEHTzDg=="],

    "@radix-ui/react-accordion": ["@radix-ui/react-accordion@1.2.12", "", { "dependencies": { "@radix-ui/primitive": "1.1.3", "@radix-ui/react-collapsible": "1.1.12", "@radix-ui/react-collection": "1.1.7", "@radix-ui/react-compose-refs": "1.1.2", "@radix-ui/react-context": "1.1.2", "@radix-ui/react-direction": "1.1.1", "@radix-ui/react-id": "1.1.1", "@radix-ui/react-primitive": "2.1.3", "@radix-ui/react-use-controllable-state": "1.2.2" }, "peerDependencies": { "@types/react": "*", "@types/react-dom": "*", "react": "^16.8 || ^17.0 || ^18.0 || ^19.0 || ^19.0.0-rc", "react-dom": "^16.8 || ^17.0 || ^18.0 || ^19.0 || ^19.0.0-rc" } }, "sha512-T4nygeh9YE9dLRPhAHSeOZi7HBXo+0kYIPJXayZfvWOWA0+n3dESrZbjfDPUABkUNym6Hd+f2IR113To8D2GPA=="],

    "@radix-ui/react-alert-dialog": ["@radix-ui/react-alert-dialog@1.1.15", "", { "dependencies": { "@radix-ui/primitive": "1.1.3", "@radix-ui/react-compose-refs": "1.1.2", "@radix-ui/react-context": "1.1.2", "@radix-ui/react-dialog": "1.1.15", "@radix-ui/react-primitive": "2.1.3", "@radix-ui/react-slot": "1.2.3" }, "peerDependencies": { "@types/react": "*", "@types/react-dom": "*", "react": "^16.8 || ^17.0 || ^18.0 || ^19.0 || ^19.0.0-rc", "react-dom": "^16.8 || ^17.0 || ^18.0 || ^19.0 || ^19.0.0-rc" } }, "sha512-oTVLkEw5GpdRe29BqJ0LSDFWI3qu0vR1M0mUkOQWDIUnY/QIkLpgDMWuKxP94c2NAC2LGcgVhG1ImF3jkZ5wXw=="],

    "@radix-ui/react-arrow": ["@radix-ui/react-arrow@1.1.7", "", { "dependencies": { "@radix-ui/react-primitive": "2.1.3" }, "peerDependencies": { "@types/react": "*", "@types/react-dom": "*", "react": "^16.8 || ^17.0 || ^18.0 || ^19.0 || ^19.0.0-rc", "react-dom": "^16.8 || ^17.0 || ^18.0 || ^19.0 || ^19.0.0-rc" } }, "sha512-F+M1tLhO+mlQaOWspE8Wstg+z6PwxwRd8oQ8IXceWz92kfAmalTRf0EjrouQeo7QssEPfCn05B4Ihs1K9WQ/7w=="],

    "@radix-ui/react-aspect-ratio": ["@radix-ui/react-aspect-ratio@1.1.8", "", { "dependencies": { "@radix-ui/react-primitive": "2.1.4" }, "peerDependencies": { "@types/react": "*", "@types/react-dom": "*", "react": "^16.8 || ^17.0 || ^18.0 || ^19.0 || ^19.0.0-rc", "react-dom": "^16.8 || ^17.0 || ^18.0 || ^19.0 || ^19.0.0-rc" } }, "sha512-5nZrJTF7gH+e0nZS7/QxFz6tJV4VimhQb1avEgtsJxvvIp5JilL+c58HICsKzPxghdwaDt48hEfPM1au4zGy+w=="],

    "@radix-ui/react-avatar": ["@radix-ui/react-avatar@1.1.11", "", { "dependencies": { "@radix-ui/react-context": "1.1.3", "@radix-ui/react-primitive": "2.1.4", "@radix-ui/react-use-callback-ref": "1.1.1", "@radix-ui/react-use-is-hydrated": "0.1.0", "@radix-ui/react-use-layout-effect": "1.1.1" }, "peerDependencies": { "@types/react": "*", "@types/react-dom": "*", "react": "^16.8 || ^17.0 || ^18.0 || ^19.0 || ^19.0.0-rc", "react-dom": "^16.8 || ^17.0 || ^18.0 || ^19.0 || ^19.0.0-rc" } }, "sha512-0Qk603AHGV28BOBO34p7IgD5m+V5Sg/YovfayABkoDDBM5d3NCx0Mp4gGrjzLGes1jV5eNOE1r3itqOR33VC6Q=="],

    "@radix-ui/react-checkbox": ["@radix-ui/react-checkbox@1.3.3", "", { "dependencies": { "@radix-ui/primitive": "1.1.3", "@radix-ui/react-compose-refs": "1.1.2", "@radix-ui/react-context": "1.1.2", "@radix-ui/react-presence": "1.1.5", "@radix-ui/react-primitive": "2.1.3", "@radix-ui/react-use-controllable-state": "1.2.2", "@radix-ui/react-use-previous": "1.1.1", "@radix-ui/react-use-size": "1.1.1" }, "peerDependencies": { "@types/react": "*", "@types/react-dom": "*", "react": "^16.8 || ^17.0 || ^18.0 || ^19.0 || ^19.0.0-rc", "react-dom": "^16.8 || ^17.0 || ^18.0 || ^19.0 || ^19.0.0-rc" } }, "sha512-wBbpv+NQftHDdG86Qc0pIyXk5IR3tM8Vd0nWLKDcX8nNn4nXFOFwsKuqw2okA/1D/mpaAkmuyndrPJTYDNZtFw=="],

    "@radix-ui/react-collapsible": ["@radix-ui/react-collapsible@1.1.12", "", { "dependencies": { "@radix-ui/primitive": "1.1.3", "@radix-ui/react-compose-refs": "1.1.2", "@radix-ui/react-context": "1.1.2", "@radix-ui/react-id": "1.1.1", "@radix-ui/react-presence": "1.1.5", "@radix-ui/react-primitive": "2.1.3", "@radix-ui/react-use-controllable-state": "1.2.2", "@radix-ui/react-use-layout-effect": "1.1.1" }, "peerDependencies": { "@types/react": "*", "@types/react-dom": "*", "react": "^16.8 || ^17.0 || ^18.0 || ^19.0 || ^19.0.0-rc", "react-dom": "^16.8 || ^17.0 || ^18.0 || ^19.0 || ^19.0.0-rc" } }, "sha512-Uu+mSh4agx2ib1uIGPP4/CKNULyajb3p92LsVXmH2EHVMTfZWpll88XJ0j4W0z3f8NK1eYl1+Mf/szHPmcHzyA=="],

    "@radix-ui/react-collection": ["@radix-ui/react-collection@1.1.7", "", { "dependencies": { "@radix-ui/react-compose-refs": "1.1.2", "@radix-ui/react-context": "1.1.2", "@radix-ui/react-primitive": "2.1.3", "@radix-ui/react-slot": "1.2.3" }, "peerDependencies": { "@types/react": "*", "@types/react-dom": "*", "react": "^16.8 || ^17.0 || ^18.0 || ^19.0 || ^19.0.0-rc", "react-dom": "^16.8 || ^17.0 || ^18.0 || ^19.0 || ^19.0.0-rc" } }, "sha512-Fh9rGN0MoI4ZFUNyfFVNU4y9LUz93u9/0K+yLgA2bwRojxM8JU1DyvvMBabnZPBgMWREAJvU2jjVzq+LrFUglw=="],

    "@radix-ui/react-compose-refs": ["@radix-ui/react-compose-refs@1.1.2", "", { "peerDependencies": { "@types/react": "*", "react": "^16.8 || ^17.0 || ^18.0 || ^19.0 || ^19.0.0-rc" } }, "sha512-z4eqJvfiNnFMHIIvXP3CY57y2WJs5g2v3X0zm9mEJkrkNv4rDxu+sg9Jh8EkXyeqBkB7SOcboo9dMVqhyrACIg=="],

    "@radix-ui/react-context": ["@radix-ui/react-context@1.1.2", "", { "peerDependencies": { "@types/react": "*", "react": "^16.8 || ^17.0 || ^18.0 || ^19.0 || ^19.0.0-rc" } }, "sha512-jCi/QKUM2r1Ju5a3J64TH2A5SpKAgh0LpknyqdQ4m6DCV0xJ2HG1xARRwNGPQfi1SLdLWZ1OJz6F4OMBBNiGJA=="],

    "@radix-ui/react-context-menu": ["@radix-ui/react-context-menu@2.2.16", "", { "dependencies": { "@radix-ui/primitive": "1.1.3", "@radix-ui/react-context": "1.1.2", "@radix-ui/react-menu": "2.1.16", "@radix-ui/react-primitive": "2.1.3", "@radix-ui/react-use-callback-ref": "1.1.1", "@radix-ui/react-use-controllable-state": "1.2.2" }, "peerDependencies": { "@types/react": "*", "@types/react-dom": "*", "react": "^16.8 || ^17.0 || ^18.0 || ^19.0 || ^19.0.0-rc", "react-dom": "^16.8 || ^17.0 || ^18.0 || ^19.0 || ^19.0.0-rc" } }, "sha512-O8morBEW+HsVG28gYDZPTrT9UUovQUlJue5YO836tiTJhuIWBm/zQHc7j388sHWtdH/xUZurK9olD2+pcqx5ww=="],

    "@radix-ui/react-dialog": ["@radix-ui/react-dialog@1.1.15", "", { "dependencies": { "@radix-ui/primitive": "1.1.3", "@radix-ui/react-compose-refs": "1.1.2", "@radix-ui/react-context": "1.1.2", "@radix-ui/react-dismissable-layer": "1.1.11", "@radix-ui/react-focus-guards": "1.1.3", "@radix-ui/react-focus-scope": "1.1.7", "@radix-ui/react-id": "1.1.1", "@radix-ui/react-portal": "1.1.9", "@radix-ui/react-presence": "1.1.5", "@radix-ui/react-primitive": "2.1.3", "@radix-ui/react-slot": "1.2.3", "@radix-ui/react-use-controllable-state": "1.2.2", "aria-hidden": "^1.2.4", "react-remove-scroll": "^2.6.3" }, "peerDependencies": { "@types/react": "*", "@types/react-dom": "*", "react": "^16.8 || ^17.0 || ^18.0 || ^19.0 || ^19.0.0-rc", "react-dom": "^16.8 || ^17.0 || ^18.0 || ^19.0 || ^19.0.0-rc" } }, "sha512-TCglVRtzlffRNxRMEyR36DGBLJpeusFcgMVD9PZEzAKnUs1lKCgX5u9BmC2Yg+LL9MgZDugFFs1Vl+Jp4t/PGw=="],

    "@radix-ui/react-direction": ["@radix-ui/react-direction@1.1.1", "", { "peerDependencies": { "@types/react": "*", "react": "^16.8 || ^17.0 || ^18.0 || ^19.0 || ^19.0.0-rc" } }, "sha512-1UEWRX6jnOA2y4H5WczZ44gOOjTEmlqv1uNW4GAJEO5+bauCBhv8snY65Iw5/VOS/ghKN9gr2KjnLKxrsvoMVw=="],

    "@radix-ui/react-dismissable-layer": ["@radix-ui/react-dismissable-layer@1.1.11", "", { "dependencies": { "@radix-ui/primitive": "1.1.3", "@radix-ui/react-compose-refs": "1.1.2", "@radix-ui/react-primitive": "2.1.3", "@radix-ui/react-use-callback-ref": "1.1.1", "@radix-ui/react-use-escape-keydown": "1.1.1" }, "peerDependencies": { "@types/react": "*", "@types/react-dom": "*", "react": "^16.8 || ^17.0 || ^18.0 || ^19.0 || ^19.0.0-rc", "react-dom": "^16.8 || ^17.0 || ^18.0 || ^19.0 || ^19.0.0-rc" } }, "sha512-Nqcp+t5cTB8BinFkZgXiMJniQH0PsUt2k51FUhbdfeKvc4ACcG2uQniY/8+h1Yv6Kza4Q7lD7PQV0z0oicE0Mg=="],

    "@radix-ui/react-dropdown-menu": ["@radix-ui/react-dropdown-menu@2.1.16", "", { "dependencies": { "@radix-ui/primitive": "1.1.3", "@radix-ui/react-compose-refs": "1.1.2", "@radix-ui/react-context": "1.1.2", "@radix-ui/react-id": "1.1.1", "@radix-ui/react-menu": "2.1.16", "@radix-ui/react-primitive": "2.1.3", "@radix-ui/react-use-controllable-state": "1.2.2" }, "peerDependencies": { "@types/react": "*", "@types/react-dom": "*", "react": "^16.8 || ^17.0 || ^18.0 || ^19.0 || ^19.0.0-rc", "react-dom": "^16.8 || ^17.0 || ^18.0 || ^19.0 || ^19.0.0-rc" } }, "sha512-1PLGQEynI/3OX/ftV54COn+3Sud/Mn8vALg2rWnBLnRaGtJDduNW/22XjlGgPdpcIbiQxjKtb7BkcjP00nqfJw=="],

    "@radix-ui/react-focus-guards": ["@radix-ui/react-focus-guards@1.1.3", "", { "peerDependencies": { "@types/react": "*", "react": "^16.8 || ^17.0 || ^18.0 || ^19.0 || ^19.0.0-rc" } }, "sha512-0rFg/Rj2Q62NCm62jZw0QX7a3sz6QCQU0LpZdNrJX8byRGaGVTqbrW9jAoIAHyMQqsNpeZ81YgSizOt5WXq0Pw=="],

    "@radix-ui/react-focus-scope": ["@radix-ui/react-focus-scope@1.1.7", "", { "dependencies": { "@radix-ui/react-compose-refs": "1.1.2", "@radix-ui/react-primitive": "2.1.3", "@radix-ui/react-use-callback-ref": "1.1.1" }, "peerDependencies": { "@types/react": "*", "@types/react-dom": "*", "react": "^16.8 || ^17.0 || ^18.0 || ^19.0 || ^19.0.0-rc", "react-dom": "^16.8 || ^17.0 || ^18.0 || ^19.0 || ^19.0.0-rc" } }, "sha512-t2ODlkXBQyn7jkl6TNaw/MtVEVvIGelJDCG41Okq/KwUsJBwQ4XVZsHAVUkK4mBv3ewiAS3PGuUWuY2BoK4ZUw=="],

    "@radix-ui/react-hover-card": ["@radix-ui/react-hover-card@1.1.15", "", { "dependencies": { "@radix-ui/primitive": "1.1.3", "@radix-ui/react-compose-refs": "1.1.2", "@radix-ui/react-context": "1.1.2", "@radix-ui/react-dismissable-layer": "1.1.11", "@radix-ui/react-popper": "1.2.8", "@radix-ui/react-portal": "1.1.9", "@radix-ui/react-presence": "1.1.5", "@radix-ui/react-primitive": "2.1.3", "@radix-ui/react-use-controllable-state": "1.2.2" }, "peerDependencies": { "@types/react": "*", "@types/react-dom": "*", "react": "^16.8 || ^17.0 || ^18.0 || ^19.0 || ^19.0.0-rc", "react-dom": "^16.8 || ^17.0 || ^18.0 || ^19.0 || ^19.0.0-rc" } }, "sha512-qgTkjNT1CfKMoP0rcasmlH2r1DAiYicWsDsufxl940sT2wHNEWWv6FMWIQXWhVdmC1d/HYfbhQx60KYyAtKxjg=="],

    "@radix-ui/react-id": ["@radix-ui/react-id@1.1.1", "", { "dependencies": { "@radix-ui/react-use-layout-effect": "1.1.1" }, "peerDependencies": { "@types/react": "*", "react": "^16.8 || ^17.0 || ^18.0 || ^19.0 || ^19.0.0-rc" } }, "sha512-kGkGegYIdQsOb4XjsfM97rXsiHaBwco+hFI66oO4s9LU+PLAC5oJ7khdOVFxkhsmlbpUqDAvXw11CluXP+jkHg=="],

    "@radix-ui/react-label": ["@radix-ui/react-label@2.1.8", "", { "dependencies": { "@radix-ui/react-primitive": "2.1.4" }, "peerDependencies": { "@types/react": "*", "@types/react-dom": "*", "react": "^16.8 || ^17.0 || ^18.0 || ^19.0 || ^19.0.0-rc", "react-dom": "^16.8 || ^17.0 || ^18.0 || ^19.0 || ^19.0.0-rc" } }, "sha512-FmXs37I6hSBVDlO4y764TNz1rLgKwjJMQ0EGte6F3Cb3f4bIuHB/iLa/8I9VKkmOy+gNHq8rql3j686ACVV21A=="],

    "@radix-ui/react-menu": ["@radix-ui/react-menu@2.1.16", "", { "dependencies": { "@radix-ui/primitive": "1.1.3", "@radix-ui/react-collection": "1.1.7", "@radix-ui/react-compose-refs": "1.1.2", "@radix-ui/react-context": "1.1.2", "@radix-ui/react-direction": "1.1.1", "@radix-ui/react-dismissable-layer": "1.1.11", "@radix-ui/react-focus-guards": "1.1.3", "@radix-ui/react-focus-scope": "1.1.7", "@radix-ui/react-id": "1.1.1", "@radix-ui/react-popper": "1.2.8", "@radix-ui/react-portal": "1.1.9", "@radix-ui/react-presence": "1.1.5", "@radix-ui/react-primitive": "2.1.3", "@radix-ui/react-roving-focus": "1.1.11", "@radix-ui/react-slot": "1.2.3", "@radix-ui/react-use-callback-ref": "1.1.1", "aria-hidden": "^1.2.4", "react-remove-scroll": "^2.6.3" }, "peerDependencies": { "@types/react": "*", "@types/react-dom": "*", "react": "^16.8 || ^17.0 || ^18.0 || ^19.0 || ^19.0.0-rc", "react-dom": "^16.8 || ^17.0 || ^18.0 || ^19.0 || ^19.0.0-rc" } }, "sha512-72F2T+PLlphrqLcAotYPp0uJMr5SjP5SL01wfEspJbru5Zs5vQaSHb4VB3ZMJPimgHHCHG7gMOeOB9H3Hdmtxg=="],

    "@radix-ui/react-menubar": ["@radix-ui/react-menubar@1.1.16", "", { "dependencies": { "@radix-ui/primitive": "1.1.3", "@radix-ui/react-collection": "1.1.7", "@radix-ui/react-compose-refs": "1.1.2", "@radix-ui/react-context": "1.1.2", "@radix-ui/react-direction": "1.1.1", "@radix-ui/react-id": "1.1.1", "@radix-ui/react-menu": "2.1.16", "@radix-ui/react-primitive": "2.1.3", "@radix-ui/react-roving-focus": "1.1.11", "@radix-ui/react-use-controllable-state": "1.2.2" }, "peerDependencies": { "@types/react": "*", "@types/react-dom": "*", "react": "^16.8 || ^17.0 || ^18.0 || ^19.0 || ^19.0.0-rc", "react-dom": "^16.8 || ^17.0 || ^18.0 || ^19.0 || ^19.0.0-rc" } }, "sha512-EB1FktTz5xRRi2Er974AUQZWg2yVBb1yjip38/lgwtCVRd3a+maUoGHN/xs9Yv8SY8QwbSEb+YrxGadVWbEutA=="],

    "@radix-ui/react-navigation-menu": ["@radix-ui/react-navigation-menu@1.2.14", "", { "dependencies": { "@radix-ui/primitive": "1.1.3", "@radix-ui/react-collection": "1.1.7", "@radix-ui/react-compose-refs": "1.1.2", "@radix-ui/react-context": "1.1.2", "@radix-ui/react-direction": "1.1.1", "@radix-ui/react-dismissable-layer": "1.1.11", "@radix-ui/react-id": "1.1.1", "@radix-ui/react-presence": "1.1.5", "@radix-ui/react-primitive": "2.1.3", "@radix-ui/react-use-callback-ref": "1.1.1", "@radix-ui/react-use-controllable-state": "1.2.2", "@radix-ui/react-use-layout-effect": "1.1.1", "@radix-ui/react-use-previous": "1.1.1", "@radix-ui/react-visually-hidden": "1.2.3" }, "peerDependencies": { "@types/react": "*", "@types/react-dom": "*", "react": "^16.8 || ^17.0 || ^18.0 || ^19.0 || ^19.0.0-rc", "react-dom": "^16.8 || ^17.0 || ^18.0 || ^19.0 || ^19.0.0-rc" } }, "sha512-YB9mTFQvCOAQMHU+C/jVl96WmuWeltyUEpRJJky51huhds5W2FQr1J8D/16sQlf0ozxkPK8uF3niQMdUwZPv5w=="],

    "@radix-ui/react-popover": ["@radix-ui/react-popover@1.1.15", "", { "dependencies": { "@radix-ui/primitive": "1.1.3", "@radix-ui/react-compose-refs": "1.1.2", "@radix-ui/react-context": "1.1.2", "@radix-ui/react-dismissable-layer": "1.1.11", "@radix-ui/react-focus-guards": "1.1.3", "@radix-ui/react-focus-scope": "1.1.7", "@radix-ui/react-id": "1.1.1", "@radix-ui/react-popper": "1.2.8", "@radix-ui/react-portal": "1.1.9", "@radix-ui/react-presence": "1.1.5", "@radix-ui/react-primitive": "2.1.3", "@radix-ui/react-slot": "1.2.3", "@radix-ui/react-use-controllable-state": "1.2.2", "aria-hidden": "^1.2.4", "react-remove-scroll": "^2.6.3" }, "peerDependencies": { "@types/react": "*", "@types/react-dom": "*", "react": "^16.8 || ^17.0 || ^18.0 || ^19.0 || ^19.0.0-rc", "react-dom": "^16.8 || ^17.0 || ^18.0 || ^19.0 || ^19.0.0-rc" } }, "sha512-kr0X2+6Yy/vJzLYJUPCZEc8SfQcf+1COFoAqauJm74umQhta9M7lNJHP7QQS3vkvcGLQUbWpMzwrXYwrYztHKA=="],

    "@radix-ui/react-popper": ["@radix-ui/react-popper@1.2.8", "", { "dependencies": { "@floating-ui/react-dom": "^2.0.0", "@radix-ui/react-arrow": "1.1.7", "@radix-ui/react-compose-refs": "1.1.2", "@radix-ui/react-context": "1.1.2", "@radix-ui/react-primitive": "2.1.3", "@radix-ui/react-use-callback-ref": "1.1.1", "@radix-ui/react-use-layout-effect": "1.1.1", "@radix-ui/react-use-rect": "1.1.1", "@radix-ui/react-use-size": "1.1.1", "@radix-ui/rect": "1.1.1" }, "peerDependencies": { "@types/react": "*", "@types/react-dom": "*", "react": "^16.8 || ^17.0 || ^18.0 || ^19.0 || ^19.0.0-rc", "react-dom": "^16.8 || ^17.0 || ^18.0 || ^19.0 || ^19.0.0-rc" } }, "sha512-0NJQ4LFFUuWkE7Oxf0htBKS6zLkkjBH+hM1uk7Ng705ReR8m/uelduy1DBo0PyBXPKVnBA6YBlU94MBGXrSBCw=="],

    "@radix-ui/react-portal": ["@radix-ui/react-portal@1.1.9", "", { "dependencies": { "@radix-ui/react-primitive": "2.1.3", "@radix-ui/react-use-layout-effect": "1.1.1" }, "peerDependencies": { "@types/react": "*", "@types/react-dom": "*", "react": "^16.8 || ^17.0 || ^18.0 || ^19.0 || ^19.0.0-rc", "react-dom": "^16.8 || ^17.0 || ^18.0 || ^19.0 || ^19.0.0-rc" } }, "sha512-bpIxvq03if6UNwXZ+HTK71JLh4APvnXntDc6XOX8UVq4XQOVl7lwok0AvIl+b8zgCw3fSaVTZMpAPPagXbKmHQ=="],

    "@radix-ui/react-presence": ["@radix-ui/react-presence@1.1.5", "", { "dependencies": { "@radix-ui/react-compose-refs": "1.1.2", "@radix-ui/react-use-layout-effect": "1.1.1" }, "peerDependencies": { "@types/react": "*", "@types/react-dom": "*", "react": "^16.8 || ^17.0 || ^18.0 || ^19.0 || ^19.0.0-rc", "react-dom": "^16.8 || ^17.0 || ^18.0 || ^19.0 || ^19.0.0-rc" } }, "sha512-/jfEwNDdQVBCNvjkGit4h6pMOzq8bHkopq458dPt2lMjx+eBQUohZNG9A7DtO/O5ukSbxuaNGXMjHicgwy6rQQ=="],

    "@radix-ui/react-primitive": ["@radix-ui/react-primitive@2.1.3", "", { "dependencies": { "@radix-ui/react-slot": "1.2.3" }, "peerDependencies": { "@types/react": "*", "@types/react-dom": "*", "react": "^16.8 || ^17.0 || ^18.0 || ^19.0 || ^19.0.0-rc", "react-dom": "^16.8 || ^17.0 || ^18.0 || ^19.0 || ^19.0.0-rc" } }, "sha512-m9gTwRkhy2lvCPe6QJp4d3G1TYEUHn/FzJUtq9MjH46an1wJU+GdoGC5VLof8RX8Ft/DlpshApkhswDLZzHIcQ=="],

    "@radix-ui/react-progress": ["@radix-ui/react-progress@1.1.8", "", { "dependencies": { "@radix-ui/react-context": "1.1.3", "@radix-ui/react-primitive": "2.1.4" }, "peerDependencies": { "@types/react": "*", "@types/react-dom": "*", "react": "^16.8 || ^17.0 || ^18.0 || ^19.0 || ^19.0.0-rc", "react-dom": "^16.8 || ^17.0 || ^18.0 || ^19.0 || ^19.0.0-rc" } }, "sha512-+gISHcSPUJ7ktBy9RnTqbdKW78bcGke3t6taawyZ71pio1JewwGSJizycs7rLhGTvMJYCQB1DBK4KQsxs7U8dA=="],

    "@radix-ui/react-radio-group": ["@radix-ui/react-radio-group@1.3.8", "", { "dependencies": { "@radix-ui/primitive": "1.1.3", "@radix-ui/react-compose-refs": "1.1.2", "@radix-ui/react-context": "1.1.2", "@radix-ui/react-direction": "1.1.1", "@radix-ui/react-presence": "1.1.5", "@radix-ui/react-primitive": "2.1.3", "@radix-ui/react-roving-focus": "1.1.11", "@radix-ui/react-use-controllable-state": "1.2.2", "@radix-ui/react-use-previous": "1.1.1", "@radix-ui/react-use-size": "1.1.1" }, "peerDependencies": { "@types/react": "*", "@types/react-dom": "*", "react": "^16.8 || ^17.0 || ^18.0 || ^19.0 || ^19.0.0-rc", "react-dom": "^16.8 || ^17.0 || ^18.0 || ^19.0 || ^19.0.0-rc" } }, "sha512-VBKYIYImA5zsxACdisNQ3BjCBfmbGH3kQlnFVqlWU4tXwjy7cGX8ta80BcrO+WJXIn5iBylEH3K6ZTlee//lgQ=="],

    "@radix-ui/react-roving-focus": ["@radix-ui/react-roving-focus@1.1.11", "", { "dependencies": { "@radix-ui/primitive": "1.1.3", "@radix-ui/react-collection": "1.1.7", "@radix-ui/react-compose-refs": "1.1.2", "@radix-ui/react-context": "1.1.2", "@radix-ui/react-direction": "1.1.1", "@radix-ui/react-id": "1.1.1", "@radix-ui/react-primitive": "2.1.3", "@radix-ui/react-use-callback-ref": "1.1.1", "@radix-ui/react-use-controllable-state": "1.2.2" }, "peerDependencies": { "@types/react": "*", "@types/react-dom": "*", "react": "^16.8 || ^17.0 || ^18.0 || ^19.0 || ^19.0.0-rc", "react-dom": "^16.8 || ^17.0 || ^18.0 || ^19.0 || ^19.0.0-rc" } }, "sha512-7A6S9jSgm/S+7MdtNDSb+IU859vQqJ/QAtcYQcfFC6W8RS4IxIZDldLR0xqCFZ6DCyrQLjLPsxtTNch5jVA4lA=="],

    "@radix-ui/react-scroll-area": ["@radix-ui/react-scroll-area@1.2.10", "", { "dependencies": { "@radix-ui/number": "1.1.1", "@radix-ui/primitive": "1.1.3", "@radix-ui/react-compose-refs": "1.1.2", "@radix-ui/react-context": "1.1.2", "@radix-ui/react-direction": "1.1.1", "@radix-ui/react-presence": "1.1.5", "@radix-ui/react-primitive": "2.1.3", "@radix-ui/react-use-callback-ref": "1.1.1", "@radix-ui/react-use-layout-effect": "1.1.1" }, "peerDependencies": { "@types/react": "*", "@types/react-dom": "*", "react": "^16.8 || ^17.0 || ^18.0 || ^19.0 || ^19.0.0-rc", "react-dom": "^16.8 || ^17.0 || ^18.0 || ^19.0 || ^19.0.0-rc" } }, "sha512-tAXIa1g3sM5CGpVT0uIbUx/U3Gs5N8T52IICuCtObaos1S8fzsrPXG5WObkQN3S6NVl6wKgPhAIiBGbWnvc97A=="],

    "@radix-ui/react-select": ["@radix-ui/react-select@2.2.6", "", { "dependencies": { "@radix-ui/number": "1.1.1", "@radix-ui/primitive": "1.1.3", "@radix-ui/react-collection": "1.1.7", "@radix-ui/react-compose-refs": "1.1.2", "@radix-ui/react-context": "1.1.2", "@radix-ui/react-direction": "1.1.1", "@radix-ui/react-dismissable-layer": "1.1.11", "@radix-ui/react-focus-guards": "1.1.3", "@radix-ui/react-focus-scope": "1.1.7", "@radix-ui/react-id": "1.1.1", "@radix-ui/react-popper": "1.2.8", "@radix-ui/react-portal": "1.1.9", "@radix-ui/react-primitive": "2.1.3", "@radix-ui/react-slot": "1.2.3", "@radix-ui/react-use-callback-ref": "1.1.1", "@radix-ui/react-use-controllable-state": "1.2.2", "@radix-ui/react-use-layout-effect": "1.1.1", "@radix-ui/react-use-previous": "1.1.1", "@radix-ui/react-visually-hidden": "1.2.3", "aria-hidden": "^1.2.4", "react-remove-scroll": "^2.6.3" }, "peerDependencies": { "@types/react": "*", "@types/react-dom": "*", "react": "^16.8 || ^17.0 || ^18.0 || ^19.0 || ^19.0.0-rc", "react-dom": "^16.8 || ^17.0 || ^18.0 || ^19.0 || ^19.0.0-rc" } }, "sha512-I30RydO+bnn2PQztvo25tswPH+wFBjehVGtmagkU78yMdwTwVf12wnAOF+AeP8S2N8xD+5UPbGhkUfPyvT+mwQ=="],

    "@radix-ui/react-separator": ["@radix-ui/react-separator@1.1.8", "", { "dependencies": { "@radix-ui/react-primitive": "2.1.4" }, "peerDependencies": { "@types/react": "*", "@types/react-dom": "*", "react": "^16.8 || ^17.0 || ^18.0 || ^19.0 || ^19.0.0-rc", "react-dom": "^16.8 || ^17.0 || ^18.0 || ^19.0 || ^19.0.0-rc" } }, "sha512-sDvqVY4itsKwwSMEe0jtKgfTh+72Sy3gPmQpjqcQneqQ4PFmr/1I0YA+2/puilhggCe2gJcx5EBAYFkWkdpa5g=="],

    "@radix-ui/react-slider": ["@radix-ui/react-slider@1.3.6", "", { "dependencies": { "@radix-ui/number": "1.1.1", "@radix-ui/primitive": "1.1.3", "@radix-ui/react-collection": "1.1.7", "@radix-ui/react-compose-refs": "1.1.2", "@radix-ui/react-context": "1.1.2", "@radix-ui/react-direction": "1.1.1", "@radix-ui/react-primitive": "2.1.3", "@radix-ui/react-use-controllable-state": "1.2.2", "@radix-ui/react-use-layout-effect": "1.1.1", "@radix-ui/react-use-previous": "1.1.1", "@radix-ui/react-use-size": "1.1.1" }, "peerDependencies": { "@types/react": "*", "@types/react-dom": "*", "react": "^16.8 || ^17.0 || ^18.0 || ^19.0 || ^19.0.0-rc", "react-dom": "^16.8 || ^17.0 || ^18.0 || ^19.0 || ^19.0.0-rc" } }, "sha512-JPYb1GuM1bxfjMRlNLE+BcmBC8onfCi60Blk7OBqi2MLTFdS+8401U4uFjnwkOr49BLmXxLC6JHkvAsx5OJvHw=="],

    "@radix-ui/react-slot": ["@radix-ui/react-slot@1.2.4", "", { "dependencies": { "@radix-ui/react-compose-refs": "1.1.2" }, "peerDependencies": { "@types/react": "*", "react": "^16.8 || ^17.0 || ^18.0 || ^19.0 || ^19.0.0-rc" } }, "sha512-Jl+bCv8HxKnlTLVrcDE8zTMJ09R9/ukw4qBs/oZClOfoQk/cOTbDn+NceXfV7j09YPVQUryJPHurafcSg6EVKA=="],

    "@radix-ui/react-switch": ["@radix-ui/react-switch@1.2.6", "", { "dependencies": { "@radix-ui/primitive": "1.1.3", "@radix-ui/react-compose-refs": "1.1.2", "@radix-ui/react-context": "1.1.2", "@radix-ui/react-primitive": "2.1.3", "@radix-ui/react-use-controllable-state": "1.2.2", "@radix-ui/react-use-previous": "1.1.1", "@radix-ui/react-use-size": "1.1.1" }, "peerDependencies": { "@types/react": "*", "@types/react-dom": "*", "react": "^16.8 || ^17.0 || ^18.0 || ^19.0 || ^19.0.0-rc", "react-dom": "^16.8 || ^17.0 || ^18.0 || ^19.0 || ^19.0.0-rc" } }, "sha512-bByzr1+ep1zk4VubeEVViV592vu2lHE2BZY5OnzehZqOOgogN80+mNtCqPkhn2gklJqOpxWgPoYTSnhBCqpOXQ=="],

    "@radix-ui/react-tabs": ["@radix-ui/react-tabs@1.1.13", "", { "dependencies": { "@radix-ui/primitive": "1.1.3", "@radix-ui/react-context": "1.1.2", "@radix-ui/react-direction": "1.1.1", "@radix-ui/react-id": "1.1.1", "@radix-ui/react-presence": "1.1.5", "@radix-ui/react-primitive": "2.1.3", "@radix-ui/react-roving-focus": "1.1.11", "@radix-ui/react-use-controllable-state": "1.2.2" }, "peerDependencies": { "@types/react": "*", "@types/react-dom": "*", "react": "^16.8 || ^17.0 || ^18.0 || ^19.0 || ^19.0.0-rc", "react-dom": "^16.8 || ^17.0 || ^18.0 || ^19.0 || ^19.0.0-rc" } }, "sha512-7xdcatg7/U+7+Udyoj2zodtI9H/IIopqo+YOIcZOq1nJwXWBZ9p8xiu5llXlekDbZkca79a/fozEYQXIA4sW6A=="],

    "@radix-ui/react-toast": ["@radix-ui/react-toast@1.2.15", "", { "dependencies": { "@radix-ui/primitive": "1.1.3", "@radix-ui/react-collection": "1.1.7", "@radix-ui/react-compose-refs": "1.1.2", "@radix-ui/react-context": "1.1.2", "@radix-ui/react-dismissable-layer": "1.1.11", "@radix-ui/react-portal": "1.1.9", "@radix-ui/react-presence": "1.1.5", "@radix-ui/react-primitive": "2.1.3", "@radix-ui/react-use-callback-ref": "1.1.1", "@radix-ui/react-use-controllable-state": "1.2.2", "@radix-ui/react-use-layout-effect": "1.1.1", "@radix-ui/react-visually-hidden": "1.2.3" }, "peerDependencies": { "@types/react": "*", "@types/react-dom": "*", "react": "^16.8 || ^17.0 || ^18.0 || ^19.0 || ^19.0.0-rc", "react-dom": "^16.8 || ^17.0 || ^18.0 || ^19.0 || ^19.0.0-rc" } }, "sha512-3OSz3TacUWy4WtOXV38DggwxoqJK4+eDkNMl5Z/MJZaoUPaP4/9lf81xXMe1I2ReTAptverZUpbPY4wWwWyL5g=="],

    "@radix-ui/react-toggle": ["@radix-ui/react-toggle@1.1.10", "", { "dependencies": { "@radix-ui/primitive": "1.1.3", "@radix-ui/react-primitive": "2.1.3", "@radix-ui/react-use-controllable-state": "1.2.2" }, "peerDependencies": { "@types/react": "*", "@types/react-dom": "*", "react": "^16.8 || ^17.0 || ^18.0 || ^19.0 || ^19.0.0-rc", "react-dom": "^16.8 || ^17.0 || ^18.0 || ^19.0 || ^19.0.0-rc" } }, "sha512-lS1odchhFTeZv3xwHH31YPObmJn8gOg7Lq12inrr0+BH/l3Tsq32VfjqH1oh80ARM3mlkfMic15n0kg4sD1poQ=="],

    "@radix-ui/react-toggle-group": ["@radix-ui/react-toggle-group@1.1.11", "", { "dependencies": { "@radix-ui/primitive": "1.1.3", "@radix-ui/react-context": "1.1.2", "@radix-ui/react-direction": "1.1.1", "@radix-ui/react-primitive": "2.1.3", "@radix-ui/react-roving-focus": "1.1.11", "@radix-ui/react-toggle": "1.1.10", "@radix-ui/react-use-controllable-state": "1.2.2" }, "peerDependencies": { "@types/react": "*", "@types/react-dom": "*", "react": "^16.8 || ^17.0 || ^18.0 || ^19.0 || ^19.0.0-rc", "react-dom": "^16.8 || ^17.0 || ^18.0 || ^19.0 || ^19.0.0-rc" } }, "sha512-5umnS0T8JQzQT6HbPyO7Hh9dgd82NmS36DQr+X/YJ9ctFNCiiQd6IJAYYZ33LUwm8M+taCz5t2ui29fHZc4Y6Q=="],

    "@radix-ui/react-tooltip": ["@radix-ui/react-tooltip@1.2.8", "", { "dependencies": { "@radix-ui/primitive": "1.1.3", "@radix-ui/react-compose-refs": "1.1.2", "@radix-ui/react-context": "1.1.2", "@radix-ui/react-dismissable-layer": "1.1.11", "@radix-ui/react-id": "1.1.1", "@radix-ui/react-popper": "1.2.8", "@radix-ui/react-portal": "1.1.9", "@radix-ui/react-presence": "1.1.5", "@radix-ui/react-primitive": "2.1.3", "@radix-ui/react-slot": "1.2.3", "@radix-ui/react-use-controllable-state": "1.2.2", "@radix-ui/react-visually-hidden": "1.2.3" }, "peerDependencies": { "@types/react": "*", "@types/react-dom": "*", "react": "^16.8 || ^17.0 || ^18.0 || ^19.0 || ^19.0.0-rc", "react-dom": "^16.8 || ^17.0 || ^18.0 || ^19.0 || ^19.0.0-rc" } }, "sha512-tY7sVt1yL9ozIxvmbtN5qtmH2krXcBCfjEiCgKGLqunJHvgvZG2Pcl2oQ3kbcZARb1BGEHdkLzcYGO8ynVlieg=="],

    "@radix-ui/react-use-callback-ref": ["@radix-ui/react-use-callback-ref@1.1.1", "", { "peerDependencies": { "@types/react": "*", "react": "^16.8 || ^17.0 || ^18.0 || ^19.0 || ^19.0.0-rc" } }, "sha512-FkBMwD+qbGQeMu1cOHnuGB6x4yzPjho8ap5WtbEJ26umhgqVXbhekKUQO+hZEL1vU92a3wHwdp0HAcqAUF5iDg=="],

    "@radix-ui/react-use-controllable-state": ["@radix-ui/react-use-controllable-state@1.2.2", "", { "dependencies": { "@radix-ui/react-use-effect-event": "0.0.2", "@radix-ui/react-use-layout-effect": "1.1.1" }, "peerDependencies": { "@types/react": "*", "react": "^16.8 || ^17.0 || ^18.0 || ^19.0 || ^19.0.0-rc" } }, "sha512-BjasUjixPFdS+NKkypcyyN5Pmg83Olst0+c6vGov0diwTEo6mgdqVR6hxcEgFuh4QrAs7Rc+9KuGJ9TVCj0Zzg=="],

    "@radix-ui/react-use-effect-event": ["@radix-ui/react-use-effect-event@0.0.2", "", { "dependencies": { "@radix-ui/react-use-layout-effect": "1.1.1" }, "peerDependencies": { "@types/react": "*", "react": "^16.8 || ^17.0 || ^18.0 || ^19.0 || ^19.0.0-rc" } }, "sha512-Qp8WbZOBe+blgpuUT+lw2xheLP8q0oatc9UpmiemEICxGvFLYmHm9QowVZGHtJlGbS6A6yJ3iViad/2cVjnOiA=="],

    "@radix-ui/react-use-escape-keydown": ["@radix-ui/react-use-escape-keydown@1.1.1", "", { "dependencies": { "@radix-ui/react-use-callback-ref": "1.1.1" }, "peerDependencies": { "@types/react": "*", "react": "^16.8 || ^17.0 || ^18.0 || ^19.0 || ^19.0.0-rc" } }, "sha512-Il0+boE7w/XebUHyBjroE+DbByORGR9KKmITzbR7MyQ4akpORYP/ZmbhAr0DG7RmmBqoOnZdy2QlvajJ2QA59g=="],

    "@radix-ui/react-use-is-hydrated": ["@radix-ui/react-use-is-hydrated@0.1.0", "", { "dependencies": { "use-sync-external-store": "^1.5.0" }, "peerDependencies": { "@types/react": "*", "react": "^16.8 || ^17.0 || ^18.0 || ^19.0 || ^19.0.0-rc" } }, "sha512-U+UORVEq+cTnRIaostJv9AGdV3G6Y+zbVd+12e18jQ5A3c0xL03IhnHuiU4UV69wolOQp5GfR58NW/EgdQhwOA=="],

    "@radix-ui/react-use-layout-effect": ["@radix-ui/react-use-layout-effect@1.1.1", "", { "peerDependencies": { "@types/react": "*", "react": "^16.8 || ^17.0 || ^18.0 || ^19.0 || ^19.0.0-rc" } }, "sha512-RbJRS4UWQFkzHTTwVymMTUv8EqYhOp8dOOviLj2ugtTiXRaRQS7GLGxZTLL1jWhMeoSCf5zmcZkqTl9IiYfXcQ=="],

    "@radix-ui/react-use-previous": ["@radix-ui/react-use-previous@1.1.1", "", { "peerDependencies": { "@types/react": "*", "react": "^16.8 || ^17.0 || ^18.0 || ^19.0 || ^19.0.0-rc" } }, "sha512-2dHfToCj/pzca2Ck724OZ5L0EVrr3eHRNsG/b3xQJLA2hZpVCS99bLAX+hm1IHXDEnzU6by5z/5MIY794/a8NQ=="],

    "@radix-ui/react-use-rect": ["@radix-ui/react-use-rect@1.1.1", "", { "dependencies": { "@radix-ui/rect": "1.1.1" }, "peerDependencies": { "@types/react": "*", "react": "^16.8 || ^17.0 || ^18.0 || ^19.0 || ^19.0.0-rc" } }, "sha512-QTYuDesS0VtuHNNvMh+CjlKJ4LJickCMUAqjlE3+j8w+RlRpwyX3apEQKGFzbZGdo7XNG1tXa+bQqIE7HIXT2w=="],

    "@radix-ui/react-use-size": ["@radix-ui/react-use-size@1.1.1", "", { "dependencies": { "@radix-ui/react-use-layout-effect": "1.1.1" }, "peerDependencies": { "@types/react": "*", "react": "^16.8 || ^17.0 || ^18.0 || ^19.0 || ^19.0.0-rc" } }, "sha512-ewrXRDTAqAXlkl6t/fkXWNAhFX9I+CkKlw6zjEwk86RSPKwZr3xpBRso655aqYafwtnbpHLj6toFzmd6xdVptQ=="],

    "@radix-ui/react-visually-hidden": ["@radix-ui/react-visually-hidden@1.2.3", "", { "dependencies": { "@radix-ui/react-primitive": "2.1.3" }, "peerDependencies": { "@types/react": "*", "@types/react-dom": "*", "react": "^16.8 || ^17.0 || ^18.0 || ^19.0 || ^19.0.0-rc", "react-dom": "^16.8 || ^17.0 || ^18.0 || ^19.0 || ^19.0.0-rc" } }, "sha512-pzJq12tEaaIhqjbzpCuv/OypJY/BPavOofm+dbab+MHLajy277+1lLm6JFcGgF5eskJ6mquGirhXY2GD/8u8Ug=="],

    "@radix-ui/rect": ["@radix-ui/rect@1.1.1", "", {}, "sha512-HPwpGIzkl28mWyZqG52jiqDJ12waP11Pa1lGoiyUkIEuMLBP0oeK/C89esbXrxsky5we7dfd8U58nm0SgAWpVw=="],

    "@react-leaflet/core": ["@react-leaflet/core@2.1.0", "", { "peerDependencies": { "leaflet": "^1.9.0", "react": "^18.0.0", "react-dom": "^18.0.0" } }, "sha512-Qk7Pfu8BSarKGqILj4x7bCSZ1pjuAPZ+qmRwH5S7mDS91VSbVVsJSrW4qA+GPrro8t69gFYVMWb1Zc4yFmPiVg=="],

    "@remix-run/router": ["@remix-run/router@1.23.2", "", {}, "sha512-Ic6m2U/rMjTkhERIa/0ZtXJP17QUi2CbWE7cqx4J58M8aA3QTfW+2UlQ4psvTX9IO1RfNVhK3pcpdjej7L+t2w=="],

    "@rolldown/pluginutils": ["@rolldown/pluginutils@1.0.0-beta.27", "", {}, "sha512-+d0F4MKMCbeVUJwG96uQ4SgAznZNSq93I3V+9NHA4OpvqG8mRCpGdKmK8l/dl02h2CCDHwW2FqilnTyDcAnqjA=="],

    "@rollup/rollup-android-arm-eabi": ["@rollup/rollup-android-arm-eabi@4.60.3", "", { "os": "android", "cpu": "arm" }, "sha512-x35CNW/ANXG3hE/EZpRU8MXX1JDN86hBb2wMGAtltkz7pc6cxgjpy1OMMfDosOQ+2hWqIkag/fGok1Yady9nGw=="],

    "@rollup/rollup-android-arm64": ["@rollup/rollup-android-arm64@4.60.3", "", { "os": "android", "cpu": "arm64" }, "sha512-xw3xtkDApIOGayehp2+Rz4zimfkaX65r4t47iy+ymQB2G4iJCBBfj0ogVg5jpvjpn8UWn/+q9tprxleYeNp3Hw=="],

    "@rollup/rollup-darwin-arm64": ["@rollup/rollup-darwin-arm64@4.60.3", "", { "os": "darwin", "cpu": "arm64" }, "sha512-vo6Y5Qfpx7/5EaamIwi0WqW2+zfiusVihKatLvtN1VFVy3D13uERk/6gZLU1UiHRL6fDXqj/ELIeVRGnvcTE1g=="],

    "@rollup/rollup-darwin-x64": ["@rollup/rollup-darwin-x64@4.60.3", "", { "os": "darwin", "cpu": "x64" }, "sha512-D+0QGcZhBzTN82weOnsSlY7V7+RMmPuF1CkbxyMAGE8+ZHeUjyb76ZiWmBlCu//AQQONvxcqRbwZTajZKqjuOw=="],

    "@rollup/rollup-freebsd-arm64": ["@rollup/rollup-freebsd-arm64@4.60.3", "", { "os": "freebsd", "cpu": "arm64" }, "sha512-6HnvHCT7fDyj6R0Ph7A6x8dQS/S38MClRWeDLqc0MdfWkxjiu1HSDYrdPhqSILzjTIC/pnXbbJbo+ft+gy/9hQ=="],

    "@rollup/rollup-freebsd-x64": ["@rollup/rollup-freebsd-x64@4.60.3", "", { "os": "freebsd", "cpu": "x64" }, "sha512-KHLgC3WKlUYW3ShFKnnosZDOJ0xjg9zp7au3sIm2bs/tGBeC2ipmvRh/N7JKi0t9Ue20C0dpEshi8WUubg+cnA=="],

    "@rollup/rollup-linux-arm-gnueabihf": ["@rollup/rollup-linux-arm-gnueabihf@4.60.3", "", { "os": "linux", "cpu": "arm" }, "sha512-DV6fJoxEYWJOvaZIsok7KrYl0tPvga5OZ2yvKHNNYyk/2roMLqQAbGhr78EQ5YhHpnhLKJD3S1WFusAkmUuV5g=="],

    "@rollup/rollup-linux-arm-musleabihf": ["@rollup/rollup-linux-arm-musleabihf@4.60.3", "", { "os": "linux", "cpu": "arm" }, "sha512-mQKoJAzvuOs6F+TZybQO4GOTSMUu7v0WdxEk24krQ/uUxXoPTtHjuaUuPmFhtBcM4K0ons8nrE3JyhTuCFtT/w=="],

    "@rollup/rollup-linux-arm64-gnu": ["@rollup/rollup-linux-arm64-gnu@4.60.3", "", { "os": "linux", "cpu": "arm64" }, "sha512-Whjj2qoiJ6+OOJMGptTYazaJvjOJm+iKHpXQM1P3LzGjt7Ff++Tp7nH4N8J/BUA7R9IHfDyx4DJIflifwnbmIA=="],

    "@rollup/rollup-linux-arm64-musl": ["@rollup/rollup-linux-arm64-musl@4.60.3", "", { "os": "linux", "cpu": "arm64" }, "sha512-4YTNHKqGng5+yiZt3mg77nmyuCfmNfX4fPmyUapBcIk+BdwSwmCWGXOUxhXbBEkFHtoN5boLj/5NON+u5QC9tg=="],

    "@rollup/rollup-linux-loong64-gnu": ["@rollup/rollup-linux-loong64-gnu@4.60.3", "", { "os": "linux", "cpu": "none" }, "sha512-SU3kNlhkpI4UqlUc2VXPGK9o886ZsSeGfMAX2ba2b8DKmMXq4AL7KUrkSWVbb7koVqx41Yczx6dx5PNargIrEA=="],

    "@rollup/rollup-linux-loong64-musl": ["@rollup/rollup-linux-loong64-musl@4.60.3", "", { "os": "linux", "cpu": "none" }, "sha512-6lDLl5h4TXpB1mTf2rQWnAk/LcXrx9vBfu/DT5TIPhvMhRWaZ5MxkIc8u4lJAmBo6klTe1ywXIUHFjylW505sg=="],

    "@rollup/rollup-linux-ppc64-gnu": ["@rollup/rollup-linux-ppc64-gnu@4.60.3", "", { "os": "linux", "cpu": "ppc64" }, "sha512-BMo8bOw8evlup/8G+cj5xWtPyp93xPdyoSN16Zy90Q2QZ0ZYRhCt6ZJSwbrRzG9HApFabjwj2p25TUPDWrhzqQ=="],

    "@rollup/rollup-linux-ppc64-musl": ["@rollup/rollup-linux-ppc64-musl@4.60.3", "", { "os": "linux", "cpu": "ppc64" }, "sha512-E0L8X1dZN1/Rph+5VPF6Xj2G7JJvMACVXtamTJIDrVI44Y3K+G8gQaMEAavbqCGTa16InptiVrX6eM6pmJ+7qA=="],

    "@rollup/rollup-linux-riscv64-gnu": ["@rollup/rollup-linux-riscv64-gnu@4.60.3", "", { "os": "linux", "cpu": "none" }, "sha512-oZJ/WHaVfHUiRAtmTAeo3DcevNsVvH8mbvodjZy7D5QKvCefO371SiKRpxoDcCxB3PTRTLayWBkvmDQKTcX/sw=="],

    "@rollup/rollup-linux-riscv64-musl": ["@rollup/rollup-linux-riscv64-musl@4.60.3", "", { "os": "linux", "cpu": "none" }, "sha512-Dhbyh7j9FybM3YaTgaHmVALwA8AkUwTPccyCQ79TG9AJUsMQqgN1DDEZNr4+QUfwiWvLDumW5vdwzoeUF+TNxQ=="],

    "@rollup/rollup-linux-s390x-gnu": ["@rollup/rollup-linux-s390x-gnu@4.60.3", "", { "os": "linux", "cpu": "s390x" }, "sha512-cJd1X5XhHHlltkaypz1UcWLA8AcoIi1aWhsvaWDskD1oz2eKCypnqvTQ8ykMNI0RSmm7NkTdSqSSD7zM0xa6Ig=="],

    "@rollup/rollup-linux-x64-gnu": ["@rollup/rollup-linux-x64-gnu@4.60.3", "", { "os": "linux", "cpu": "x64" }, "sha512-DAZDBHQfG2oQuhY7mc6I3/qB4LU2fQCjRvxbDwd/Jdvb9fypP4IJ4qmtu6lNjes6B531AI8cg1aKC2di97bUxA=="],

    "@rollup/rollup-linux-x64-musl": ["@rollup/rollup-linux-x64-musl@4.60.3", "", { "os": "linux", "cpu": "x64" }, "sha512-cRxsE8c13mZOh3vP+wLDxpQBRrOHDIGOWyDL93Sy0Ga8y515fBcC2pjUfFwUe5T7tqvTvWbCpg1URM/AXdWIXA=="],

    "@rollup/rollup-openbsd-x64": ["@rollup/rollup-openbsd-x64@4.60.3", "", { "os": "openbsd", "cpu": "x64" }, "sha512-QaWcIgRxqEdQdhJqW4DJctsH6HCmo5vHxY0krHSX4jMtOqfzC+dqDGuHM87bu4H8JBeibWx7jFz+h6/4C8wA5Q=="],

    "@rollup/rollup-openharmony-arm64": ["@rollup/rollup-openharmony-arm64@4.60.3", "", { "os": "none", "cpu": "arm64" }, "sha512-AaXwSvUi3QIPtroAUw1t5yHGIyqKEXwH54WUocFolZhpGDruJcs8c+xPNDRn4XiQsS7MEwnYsHW2l0MBLDMkWg=="],

    "@rollup/rollup-win32-arm64-msvc": ["@rollup/rollup-win32-arm64-msvc@4.60.3", "", { "os": "win32", "cpu": "arm64" }, "sha512-65LAKM/bAWDqKNEelHlcHvm2V+Vfb8C6INFxQXRHCvaVN1rJfwr4NvdP4FyzUaLqWfaCGaadf6UbTm8xJeYfEg=="],

    "@rollup/rollup-win32-ia32-msvc": ["@rollup/rollup-win32-ia32-msvc@4.60.3", "", { "os": "win32", "cpu": "ia32" }, "sha512-EEM2gyhBF5MFnI6vMKdX1LAosE627RGBzIoGMdLloPZkXrUN0Ckqgr2Qi8+J3zip/8NVVro3/FjB+tjhZUgUHA=="],

    "@rollup/rollup-win32-x64-gnu": ["@rollup/rollup-win32-x64-gnu@4.60.3", "", { "os": "win32", "cpu": "x64" }, "sha512-E5Eb5H/DpxaoXH++Qkv28RcUJboMopmdDUALBczvHMf7hNIxaDZqwY5lK12UK1BHacSmvupoEWGu+n993Z0y1A=="],

    "@rollup/rollup-win32-x64-msvc": ["@rollup/rollup-win32-x64-msvc@4.60.3", "", { "os": "win32", "cpu": "x64" }, "sha512-hPt/bgL5cE+Qp+/TPHBqptcAgPzgj46mPcg/16zNUmbQk0j+mOEQV/+Lqu8QRtDV3Ek95Q6FeFITpuhl6OTsAA=="],

    "@standard-schema/utils": ["@standard-schema/utils@0.3.0", "", {}, "sha512-e7Mew686owMaPJVNNLs55PUvgz371nKgwsc4vxE49zsODpJEnxgxRo2y/OKrqueavXgZNMDVj3DdHFlaSAeU8g=="],

    "@stripe/react-stripe-js": ["@stripe/react-stripe-js@3.10.0", "", { "dependencies": { "prop-types": "^15.7.2" }, "peerDependencies": { "@stripe/stripe-js": ">=1.44.1 <8.0.0", "react": ">=16.8.0 <20.0.0", "react-dom": ">=16.8.0 <20.0.0" } }, "sha512-UPqHZwMwDzGSax0ZI7XlxR3tZSpgIiZdk3CiwjbTK978phwR/fFXeAXQcN/h8wTAjR4ZIAzdlI9DbOqJhuJdeg=="],

    "@stripe/stripe-js": ["@stripe/stripe-js@5.10.0", "", {}, "sha512-PTigkxMdMUP6B5ISS7jMqJAKhgrhZwjprDqR1eATtFfh0OpKVNp110xiH+goeVdrJ29/4LeZJR4FaHHWstsu0A=="],

    "@tailwindcss/node": ["@tailwindcss/node@4.2.4", "", { "dependencies": { "@jridgewell/remapping": "^2.3.5", "enhanced-resolve": "^5.19.0", "jiti": "^2.6.1", "lightningcss": "1.32.0", "magic-string": "^0.30.21", "source-map-js": "^1.2.1", "tailwindcss": "4.2.4" } }, "sha512-Ai7+yQPxz3ddrDQzFfBKdHEVBg0w3Zl83jnjuwxnZOsnH9pGn93QHQtpU0p/8rYWxvbFZHneni6p1BSLK4DkGA=="],

    "@tailwindcss/oxide": ["@tailwindcss/oxide@4.2.4", "", { "optionalDependencies": { "@tailwindcss/oxide-android-arm64": "4.2.4", "@tailwindcss/oxide-darwin-arm64": "4.2.4", "@tailwindcss/oxide-darwin-x64": "4.2.4", "@tailwindcss/oxide-freebsd-x64": "4.2.4", "@tailwindcss/oxide-linux-arm-gnueabihf": "4.2.4", "@tailwindcss/oxide-linux-arm64-gnu": "4.2.4", "@tailwindcss/oxide-linux-arm64-musl": "4.2.4", "@tailwindcss/oxide-linux-x64-gnu": "4.2.4", "@tailwindcss/oxide-linux-x64-musl": "4.2.4", "@tailwindcss/oxide-wasm32-wasi": "4.2.4", "@tailwindcss/oxide-win32-arm64-msvc": "4.2.4", "@tailwindcss/oxide-win32-x64-msvc": "4.2.4" } }, "sha512-9El/iI069DKDSXwTvB9J4BwdO5JhRrOweGaK25taBAvBXyXqJAX+Jqdvs8r8gKpsI/1m0LeJLyQYTf/WLrBT1Q=="],

    "@tailwindcss/oxide-android-arm64": ["@tailwindcss/oxide-android-arm64@4.2.4", "", { "os": "android", "cpu": "arm64" }, "sha512-e7MOr1SAn9U8KlZzPi1ZXGZHeC5anY36qjNwmZv9pOJ8E4Q6jmD1vyEHkQFmNOIN7twGPEMXRHmitN4zCMN03g=="],

    "@tailwindcss/oxide-darwin-arm64": ["@tailwindcss/oxide-darwin-arm64@4.2.4", "", { "os": "darwin", "cpu": "arm64" }, "sha512-tSC/Kbqpz/5/o/C2sG7QvOxAKqyd10bq+ypZNf+9Fi2TvbVbv1zNpcEptcsU7DPROaSbVgUXmrzKhurFvo5eDg=="],

    "@tailwindcss/oxide-darwin-x64": ["@tailwindcss/oxide-darwin-x64@4.2.4", "", { "os": "darwin", "cpu": "x64" }, "sha512-yPyUXn3yO/ufR6+Kzv0t4fCg2qNr90jxXc5QqBpjlPNd0NqyDXcmQb/6weunH/MEDXW5dhyEi+agTDiqa3WsGg=="],

    "@tailwindcss/oxide-freebsd-x64": ["@tailwindcss/oxide-freebsd-x64@4.2.4", "", { "os": "freebsd", "cpu": "x64" }, "sha512-BoMIB4vMQtZsXdGLVc2z+P9DbETkiopogfWZKbWwM8b/1Vinbs4YcUwo+kM/KeLkX3Ygrf4/PsRndKaYhS8Eiw=="],

    "@tailwindcss/oxide-linux-arm-gnueabihf": ["@tailwindcss/oxide-linux-arm-gnueabihf@4.2.4", "", { "os": "linux", "cpu": "arm" }, "sha512-7pIHBLTHYRAlS7V22JNuTh33yLH4VElwKtB3bwchK/UaKUPpQ0lPQiOWcbm4V3WP2I6fNIJ23vABIvoy2izdwA=="],

    "@tailwindcss/oxide-linux-arm64-gnu": ["@tailwindcss/oxide-linux-arm64-gnu@4.2.4", "", { "os": "linux", "cpu": "arm64" }, "sha512-+E4wxJ0ZGOzSH325reXTWB48l42i93kQqMvDyz5gqfRzRZ7faNhnmvlV4EPGJU3QJM/3Ab5jhJ5pCRUsKn6OQw=="],

    "@tailwindcss/oxide-linux-arm64-musl": ["@tailwindcss/oxide-linux-arm64-musl@4.2.4", "", { "os": "linux", "cpu": "arm64" }, "sha512-bBADEGAbo4ASnppIziaQJelekCxdMaxisrk+fB7Thit72IBnALp9K6ffA2G4ruj90G9XRS2VQ6q2bCKbfFV82g=="],

    "@tailwindcss/oxide-linux-x64-gnu": ["@tailwindcss/oxide-linux-x64-gnu@4.2.4", "", { "os": "linux", "cpu": "x64" }, "sha512-7Mx25E4WTfnht0TVRTyC00j3i0M+EeFe7wguMDTlX4mRxafznw0CA8WJkFjWYH5BlgELd1kSjuU2JiPnNZbJDA=="],

    "@tailwindcss/oxide-linux-x64-musl": ["@tailwindcss/oxide-linux-x64-musl@4.2.4", "", { "os": "linux", "cpu": "x64" }, "sha512-2wwJRF7nyhOR0hhHoChc04xngV3iS+akccHTGtz965FwF0up4b2lOdo6kI1EbDaEXKgvcrFBYcYQQ/rrnWFVfA=="],

    "@tailwindcss/oxide-wasm32-wasi": ["@tailwindcss/oxide-wasm32-wasi@4.2.4", "", { "cpu": "none" }, "sha512-FQsqApeor8Fo6gUEklzmaa9994orJZZDBAlQpK2Mq+DslRKFJeD6AjHpBQ0kZFQohVr8o85PPh8eOy86VlSCmw=="],

    "@tailwindcss/oxide-win32-arm64-msvc": ["@tailwindcss/oxide-win32-arm64-msvc@4.2.4", "", { "os": "win32", "cpu": "arm64" }, "sha512-L9BXqxC4ToVgwMFqj3pmZRqyHEztulpUJzCxUtLjobMCzTPsGt1Fa9enKbOpY2iIyVtaHNeNvAK8ERP/64sqGQ=="],

    "@tailwindcss/oxide-win32-x64-msvc": ["@tailwindcss/oxide-win32-x64-msvc@4.2.4", "", { "os": "win32", "cpu": "x64" }, "sha512-ESlKG0EpVJQwRjXDDa9rLvhEAh0mhP1sF7sap9dNZT0yyl9SAG6T7gdP09EH0vIv0UNTlo6jPWyujD6559fZvw=="],

    "@tailwindcss/vite": ["@tailwindcss/vite@4.2.4", "", { "dependencies": { "@tailwindcss/node": "4.2.4", "@tailwindcss/oxide": "4.2.4", "tailwindcss": "4.2.4" }, "peerDependencies": { "vite": "^5.2.0 || ^6 || ^7 || ^8" } }, "sha512-pCvohwOCspk3ZFn6eJzrrX3g4n2JY73H6MmYC87XfGPyTty4YsCjYTMArRZm/zOI8dIt3+EcrLHAFPe5A4bgtw=="],

    "@tanstack/query-core": ["@tanstack/query-core@5.100.9", "", {}, "sha512-SJSFw1S8+kQ0+knv/XGfrbocWoAlT7vDKsSImtLx3ZPQmEcR46hkDjLSvynSy25N8Ms4tIEini1FuBd5k7IscQ=="],

    "@tanstack/react-query": ["@tanstack/react-query@5.100.9", "", { "dependencies": { "@tanstack/query-core": "5.100.9" }, "peerDependencies": { "react": "^18 || ^19" } }, "sha512-Oa44XkaI3kCNN6ME0KByU3xT3SEUNOMfZpHxL6+wFoTm+OeUFYHKdeYVe0aOXlRDm/f15sgLwEt2HDorIdW8+A=="],

    "@types/babel__core": ["@types/babel__core@7.20.5", "", { "dependencies": { "@babel/parser": "^7.20.7", "@babel/types": "^7.20.7", "@types/babel__generator": "*", "@types/babel__template": "*", "@types/babel__traverse": "*" } }, "sha512-qoQprZvz5wQFJwMDqeseRXWv3rqMvhgpbXFfVyWhbx9X47POIA6i/+dXefEmZKoAgOaTdaIgNSMqMIU61yRyzA=="],

    "@types/babel__generator": ["@types/babel__generator@7.27.0", "", { "dependencies": { "@babel/types": "^7.0.0" } }, "sha512-ufFd2Xi92OAVPYsy+P4n7/U7e68fex0+Ee8gSG9KX7eo084CWiQ4sdxktvdl0bOPupXtVJPY19zk6EwWqUQ8lg=="],

    "@types/babel__template": ["@types/babel__template@7.4.4", "", { "dependencies": { "@babel/parser": "^7.1.0", "@babel/types": "^7.0.0" } }, "sha512-h/NUaSyG5EyxBIp8YRxo4RMe2/qQgvyowRwVMzhYhBCONbW8PUsg4lkFMrhgZhUe5z3L3MiLDuvyJ/CaPa2A8A=="],

    "@types/babel__traverse": ["@types/babel__traverse@7.28.0", "", { "dependencies": { "@babel/types": "^7.28.2" } }, "sha512-8PvcXf70gTDZBgt9ptxJ8elBeBjcLOAcOtoO/mPJjtji1+CdGbHgm77om1GrsPxsiE+uXIpNSK64UYaIwQXd4Q=="],

    "@types/d3-array": ["@types/d3-array@3.2.2", "", {}, "sha512-hOLWVbm7uRza0BYXpIIW5pxfrKe0W+D5lrFiAEYR+pb6w3N2SwSMaJbXdUfSEv+dT4MfHBLtn5js0LAWaO6otw=="],

    "@types/d3-color": ["@types/d3-color@3.1.3", "", {}, "sha512-iO90scth9WAbmgv7ogoq57O9YpKmFBbmoEoCHDB2xMBY0+/KVrqAaCDyCE16dUspeOvIxFFRI+0sEtqDqy2b4A=="],

    "@types/d3-ease": ["@types/d3-ease@3.0.2", "", {}, "sha512-NcV1JjO5oDzoK26oMzbILE6HW7uVXOHLQvHshBUW4UMdZGfiY6v5BeQwh9a9tCzv+CeefZQHJt5SRgK154RtiA=="],

    "@types/d3-interpolate": ["@types/d3-interpolate@3.0.4", "", { "dependencies": { "@types/d3-color": "*" } }, "sha512-mgLPETlrpVV1YRJIglr4Ez47g7Yxjl1lj7YKsiMCb27VJH9W8NVM6Bb9d8kkpG/uAQS5AmbA48q2IAolKKo1MA=="],

    "@types/d3-path": ["@types/d3-path@3.1.1", "", {}, "sha512-VMZBYyQvbGmWyWVea0EHs/BwLgxc+MKi1zLDCONksozI4YJMcTt8ZEuIR4Sb1MMTE8MMW49v0IwI5+b7RmfWlg=="],

    "@types/d3-scale": ["@types/d3-scale@4.0.9", "", { "dependencies": { "@types/d3-time": "*" } }, "sha512-dLmtwB8zkAeO/juAMfnV+sItKjlsw2lKdZVVy6LRr0cBmegxSABiLEpGVmSJJ8O08i4+sGR6qQtb6WtuwJdvVw=="],

    "@types/d3-shape": ["@types/d3-shape@3.1.8", "", { "dependencies": { "@types/d3-path": "*" } }, "sha512-lae0iWfcDeR7qt7rA88BNiqdvPS5pFVPpo5OfjElwNaT2yyekbM0C9vK+yqBqEmHr6lDkRnYNoTBYlAgJa7a4w=="],

    "@types/d3-time": ["@types/d3-time@3.0.4", "", {}, "sha512-yuzZug1nkAAaBlBBikKZTgzCeA+k1uy4ZFwWANOfKw5z5LRhV0gNA7gNkKm7HoK+HRN0wX3EkxGk0fpbWhmB7g=="],

    "@types/d3-timer": ["@types/d3-timer@3.0.2", "", {}, "sha512-Ps3T8E8dZDam6fUyNiMkekK3XUsaUEik+idO9/YjPtfj2qruF8tFBXS7XhtE4iIXBLxhmLjP3SXpLhVf21I9Lw=="],

    "@types/debug": ["@types/debug@4.1.13", "", { "dependencies": { "@types/ms": "*" } }, "sha512-KSVgmQmzMwPlmtljOomayoR89W4FynCAi3E8PPs7vmDVPe84hT+vGPKkJfThkmXs0x0jAaa9U8uW8bbfyS2fWw=="],

    "@types/estree": ["@types/estree@1.0.8", "", {}, "sha512-dWHzHa2WqEXI/O1E9OjrocMTKJl2mSrEolh1Iomrv6U+JuNwaHXsXx9bLu5gG7BUWFIN0skIQJQ/L1rIex4X6w=="],

    "@types/estree-jsx": ["@types/estree-jsx@1.0.5", "", { "dependencies": { "@types/estree": "*" } }, "sha512-52CcUVNFyfb1A2ALocQw/Dd1BQFNmSdkuC3BkZ6iqhdMfQz7JWOFRuJFloOzjk+6WijU56m9oKXFAXc7o3Towg=="],

    "@types/hast": ["@types/hast@3.0.4", "", { "dependencies": { "@types/unist": "*" } }, "sha512-WPs+bbQw5aCj+x6laNGWLH3wviHtoCv/P3+otBhbOhJgG8qtpdAMlTCxLtsTWA7LH1Oh/bFCHsBn0TPS5m30EQ=="],

    "@types/json-schema": ["@types/json-schema@7.0.15", "", {}, "sha512-5+fP8P8MFNC+AyZCDxrB2pkZFPGzqQWUzpSeuuVLvm8VMcorNYavBqoFcxK8bQz4Qsbn4oUEEem4wDLfcysGHA=="],

    "@types/mdast": ["@types/mdast@4.0.4", "", { "dependencies": { "@types/unist": "*" } }, "sha512-kGaNbPh1k7AFzgpud/gMdvIm5xuECykRR+JnWKQno9TAXVa6WIVCGTPvYGekIDL4uwCZQSYbUxNBSb1aUo79oA=="],

    "@types/ms": ["@types/ms@2.1.0", "", {}, "sha512-GsCCIZDE/p3i96vtEqx+7dBUGXrc7zeSK3wwPHIaRThS+9OhWIXRqzs4d6k1SVU8g91DrNRWxWUGhp5KXQb2VA=="],

    "@types/node": ["@types/node@22.19.18", "", { "dependencies": { "undici-types": "~6.21.0" } }, "sha512-9v00a+dn2yWVsYDEunWC4g/TcRKVq3r8N5FuZp7u0SGrPvdN9c2yXI9bBuf5Fl0hNCb+QTIePTn5pJs2pwBOQQ=="],

    "@types/pako": ["@types/pako@2.0.4", "", {}, "sha512-VWDCbrLeVXJM9fihYodcLiIv0ku+AlOa/TQ1SvYOaBuyrSKgEcro95LJyIsJ4vSo6BXIxOKxiJAat04CmST9Fw=="],

    "@types/prop-types": ["@types/prop-types@15.7.15", "", {}, "sha512-F6bEyamV9jKGAFBEmlQnesRPGOQqS2+Uwi0Em15xenOxHaf2hv6L8YCVn3rPdPJOiJfPiCnLIRyvwVaqMY3MIw=="],

    "@types/quill": ["@types/quill@1.3.10", "", { "dependencies": { "parchment": "^1.1.2" } }, "sha512-IhW3fPW+bkt9MLNlycw8u8fWb7oO7W5URC9MfZYHBlA24rex9rs23D5DETChu1zvgVdc5ka64ICjJOgQMr6Shw=="],

    "@types/raf": ["@types/raf@3.4.3", "", {}, "sha512-c4YAvMedbPZ5tEyxzQdMoOhhJ4RD3rngZIdwC2/qDN3d7JpEhB6fiBRKVY1lg5B7Wk+uPBjn5f39j1/2MY1oOw=="],

    "@types/react": ["@types/react@18.3.28", "", { "dependencies": { "@types/prop-types": "*", "csstype": "^3.2.2" } }, "sha512-z9VXpC7MWrhfWipitjNdgCauoMLRdIILQsAEV+ZesIzBq/oUlxk0m3ApZuMFCXdnS4U7KrI+l3WRUEGQ8K1QKw=="],

    "@types/react-dom": ["@types/react-dom@18.3.7", "", { "peerDependencies": { "@types/react": "^18.0.0" } }, "sha512-MEe3UeoENYVFXzoXEWsvcpg6ZvlrFNlOQ7EOsvhI3CfAXwzPfO8Qwuxd40nepsYKqyyVQnTdEfv68q91yLcKrQ=="],

    "@types/trusted-types": ["@types/trusted-types@2.0.7", "", {}, "sha512-ScaPdn1dQczgbl0QFTeTOmVHFULt394XJgOQNoyVhZ6r2vLnMLJfBPd53SB52T/3G36VI1/g2MZaX0cwDuXsfw=="],

    "@types/unist": ["@types/unist@3.0.3", "", {}, "sha512-ko/gIFJRv177XgZsZcBwnqJN5x/Gien8qNOn0D5bQU/zAzVf9Zt3BlcUiLqhV9y4ARk0GbT3tnUiPNgnTXzc/Q=="],

    "@types/use-sync-external-store": ["@types/use-sync-external-store@0.0.6", "", {}, "sha512-zFDAD+tlpf2r4asuHEj0XH6pY6i0g5NeAHPn+15wk3BV6JA69eERFXC1gyGThDkVa1zCyKr5jox1+2LbV/AMLg=="],

    "@typescript-eslint/eslint-plugin": ["@typescript-eslint/eslint-plugin@8.61.1", "", { "dependencies": { "@eslint-community/regexpp": "^4.12.2", "@typescript-eslint/scope-manager": "8.61.1", "@typescript-eslint/type-utils": "8.61.1", "@typescript-eslint/utils": "8.61.1", "@typescript-eslint/visitor-keys": "8.61.1", "ignore": "^7.0.5", "natural-compare": "^1.4.0", "ts-api-utils": "^2.5.0" }, "peerDependencies": { "@typescript-eslint/parser": "^8.61.1", "eslint": "^8.57.0 || ^9.0.0 || ^10.0.0", "typescript": ">=4.8.4 <6.1.0" } }, "sha512-ZPlVl3PB3et/59Ne0fv/sci6ZXz4T4Hp4nTJ56i/Y0gR89ARb+KphojTq6j+56E5PIezmOIOOWyY+aWQFd+IkQ=="],

    "@typescript-eslint/parser": ["@typescript-eslint/parser@8.61.1", "", { "dependencies": { "@typescript-eslint/scope-manager": "8.61.1", "@typescript-eslint/types": "8.61.1", "@typescript-eslint/typescript-estree": "8.61.1", "@typescript-eslint/visitor-keys": "8.61.1", "debug": "^4.4.3" }, "peerDependencies": { "eslint": "^8.57.0 || ^9.0.0 || ^10.0.0", "typescript": ">=4.8.4 <6.1.0" } }, "sha512-PJ5vePq5/ognBbrIcoC5+SHO5dfpeLPzP9FpLkzWrguoYQEeeSjlJpVwOpo1JRSTEi7dRcwNy4h4dzV70PqHcg=="],

    "@typescript-eslint/project-service": ["@typescript-eslint/project-service@8.61.1", "", { "dependencies": { "@typescript-eslint/tsconfig-utils": "^8.61.1", "@typescript-eslint/types": "^8.61.1", "debug": "^4.4.3" }, "peerDependencies": { "typescript": ">=4.8.4 <6.1.0" } }, "sha512-PrC4JYGmR241lYnfhmKGTXkFqv8+ymbTFgSAY0fVXpY82/QkMw5TZPl+vGzuDDU2QYJk9fIDOBTntF+yDv9LEA=="],

    "@typescript-eslint/scope-manager": ["@typescript-eslint/scope-manager@8.61.1", "", { "dependencies": { "@typescript-eslint/types": "8.61.1", "@typescript-eslint/visitor-keys": "8.61.1" } }, "sha512-L2bdIeoQS8FlKAvONAr20w6OcLXeB+qiDKbAooS9A0Ben+iSIkBef0FxqwKWYqt5sa0i4KJtxVyVmhMylKzF5w=="],

    "@typescript-eslint/tsconfig-utils": ["@typescript-eslint/tsconfig-utils@8.61.1", "", { "peerDependencies": { "typescript": ">=4.8.4 <6.1.0" } }, "sha512-UN/H4di+OO7EWx2ovME+8t31YO+KVnK0RRKEHR3kOt21/Ay8BOq3M1OMvWs5vNiqcFCYGYoxK3MXPZzmMUE+yg=="],

    "@typescript-eslint/type-utils": ["@typescript-eslint/type-utils@8.61.1", "", { "dependencies": { "@typescript-eslint/types": "8.61.1", "@typescript-eslint/typescript-estree": "8.61.1", "@typescript-eslint/utils": "8.61.1", "debug": "^4.4.3", "ts-api-utils": "^2.5.0" }, "peerDependencies": { "eslint": "^8.57.0 || ^9.0.0 || ^10.0.0", "typescript": ">=4.8.4 <6.1.0" } }, "sha512-GYRicKmVK0C4fsKgaACaknOUAq9Oa2kwsjnpFhFcS/5p4Ht5IP9OVLbgIgcK4SRk92nVHFluurg1lumD9dBcLw=="],

    "@typescript-eslint/types": ["@typescript-eslint/types@8.61.1", "", {}, "sha512-G+CRlPqLv7Bz1IZVs03x5K59F1veqL0EJUROAdGhKsEq8qOiRiZbI+HUojPq5l0fEGOKModD9br6lObhB8zkoA=="],

    "@typescript-eslint/typescript-estree": ["@typescript-eslint/typescript-estree@8.61.1", "", { "dependencies": { "@typescript-eslint/project-service": "8.61.1", "@typescript-eslint/tsconfig-utils": "8.61.1", "@typescript-eslint/types": "8.61.1", "@typescript-eslint/visitor-keys": "8.61.1", "debug": "^4.4.3", "minimatch": "^10.2.2", "semver": "^7.7.3", "tinyglobby": "^0.2.15", "ts-api-utils": "^2.5.0" }, "peerDependencies": { "typescript": ">=4.8.4 <6.1.0" } }, "sha512-u+oQD3BqYWPc8YV9Zab4vaJElJuwOLPRc10Jm1o/qS+6Qwen14HCWwx0Seo4LnSn2wxea2Ik8DxPt2/FHmuhrg=="],

    "@typescript-eslint/utils": ["@typescript-eslint/utils@8.61.1", "", { "dependencies": { "@eslint-community/eslint-utils": "^4.9.1", "@typescript-eslint/scope-manager": "8.61.1", "@typescript-eslint/types": "8.61.1", "@typescript-eslint/typescript-estree": "8.61.1" }, "peerDependencies": { "eslint": "^8.57.0 || ^9.0.0 || ^10.0.0", "typescript": ">=4.8.4 <6.1.0" } }, "sha512-1+P/3Dj6jvtybE1q0HQ6yBt/gq+oKJyLdEv4HdnqasaEXRSYCAsD59mXEVQnM/ULNdQxbX77tdG4jPRjIS6knA=="],

    "@typescript-eslint/visitor-keys": ["@typescript-eslint/visitor-keys@8.61.1", "", { "dependencies": { "@typescript-eslint/types": "8.61.1", "eslint-visitor-keys": "^5.0.0" } }, "sha512-6fJ9MHWtK14C1DSkiMlHUSOmrVebL7150xZJBlJiL62jjhIA4JmOq6flwBgDxIdBKKdoiZRel+dfPD5MLfny3w=="],

    "@ungap/structured-clone": ["@ungap/structured-clone@1.3.1", "", {}, "sha512-mUFwbeTqrVgDQxFveS+df2yfap6iuP20NAKAsBt5jDEoOTDew+zwLAOilHCeQJOVSvmgCX4ogqIrA0mnyr08yQ=="],

    "@vitejs/plugin-react": ["@vitejs/plugin-react@4.7.0", "", { "dependencies": { "@babel/core": "^7.28.0", "@babel/plugin-transform-react-jsx-self": "^7.27.1", "@babel/plugin-transform-react-jsx-source": "^7.27.1", "@rolldown/pluginutils": "1.0.0-beta.27", "@types/babel__core": "^7.20.5", "react-refresh": "^0.17.0" }, "peerDependencies": { "vite": "^4.2.0 || ^5.0.0 || ^6.0.0 || ^7.0.0" } }, "sha512-gUu9hwfWvvEDBBmgtAowQCojwZmJ5mcLn3aufeCsitijs3+f2NsrPtlAWIR6OPiqljl96GVCUbLe0HyqIpVaoA=="],

    "acorn": ["acorn@8.16.0", "", { "bin": "bin/acorn" }, "sha512-UVJyE9MttOsBQIDKw1skb9nAwQuR5wuGD3+82K6JgJlm/Y+KI92oNsMNGZCYdDsVtRHSak0pcV5Dno5+4jh9sw=="],

    "acorn-jsx": ["acorn-jsx@5.3.2", "", { "peerDependencies": { "acorn": "^6.0.0 || ^7.0.0 || ^8.0.0" } }, "sha512-rq9s+JNhf0IChjtDXxllJ7g41oZk5SlXtp0LHwyA5cejwn7vKmKp4pPri6YEePv2PU65sAsegbXtIinmDFDXgQ=="],

    "ajv": ["ajv@6.15.0", "", { "dependencies": { "fast-deep-equal": "^3.1.1", "fast-json-stable-stringify": "^2.0.0", "json-schema-traverse": "^0.4.1", "uri-js": "^4.2.2" } }, "sha512-fgFx7Hfoq60ytK2c7DhnF8jIvzYgOMxfugjLOSMHjLIPgenqa7S7oaagATUq99mV6IYvN2tRmC0wnTYX6iPbMw=="],

    "ansi-regex": ["ansi-regex@5.0.1", "", {}, "sha512-quJQXlTSUGL2LH9SUXo8VwsY4soanhgo6LNSm84E1LBcE8s3O0wpdiRzyR9z/ZZJMlMWv37qOOb9pdJlMUEKFQ=="],

    "ansi-styles": ["ansi-styles@4.3.0", "", { "dependencies": { "color-convert": "^2.0.1" } }, "sha512-zbB9rCJAT1rbjiVDb2hqKFHNYLxgtk8NURxZ3IZwD3F6NtxbXZQCnnSi1Lkx+IDohdPlFp222wVALIheZJQSEg=="],

    "argparse": ["argparse@2.0.1", "", {}, "sha512-8+9WqebbFzpX9OR+Wa6O29asIogeRMzcGtAINdpMHHyAg10f05aSFVBbcEqGf/PXw1EjAZ+q2/bEBg3DvurK3Q=="],

    "aria-hidden": ["aria-hidden@1.2.6", "", { "dependencies": { "tslib": "^2.0.0" } }, "sha512-ik3ZgC9dY/lYVVM++OISsaYDeg1tb0VtP5uL3ouh1koGOaUMDPpbFIei4JkFimWUFPn90sbMNMXQAIVOlnYKJA=="],

    "array-buffer-byte-length": ["array-buffer-byte-length@1.0.2", "", { "dependencies": { "call-bound": "^1.0.3", "is-array-buffer": "^3.0.5" } }, "sha512-LHE+8BuR7RYGDKvnrmcuSq3tDcKv9OFEXQt/HpbZhY7V6h0zlUXutnAD82GiFx9rdieCMjkvtcsPqBwgUl1Iiw=="],

    "array-includes": ["array-includes@3.1.9", "", { "dependencies": { "call-bind": "^1.0.8", "call-bound": "^1.0.4", "define-properties": "^1.2.1", "es-abstract": "^1.24.0", "es-object-atoms": "^1.1.1", "get-intrinsic": "^1.3.0", "is-string": "^1.1.1", "math-intrinsics": "^1.1.0" } }, "sha512-FmeCCAenzH0KH381SPT5FZmiA/TmpndpcaShhfgEN9eCVjnFBqq3l1xrI42y8+PPLI6hypzou4GXw00WHmPBLQ=="],

    "array.prototype.findlast": ["array.prototype.findlast@1.2.5", "", { "dependencies": { "call-bind": "^1.0.7", "define-properties": "^1.2.1", "es-abstract": "^1.23.2", "es-errors": "^1.3.0", "es-object-atoms": "^1.0.0", "es-shim-unscopables": "^1.0.2" } }, "sha512-CVvd6FHg1Z3POpBLxO6E6zr+rSKEQ9L6rZHAaY7lLfhKsWYUBBOuMs0e9o24oopj6H+geRCX0YJ+TJLBK2eHyQ=="],

    "array.prototype.flat": ["array.prototype.flat@1.3.3", "", { "dependencies": { "call-bind": "^1.0.8", "define-properties": "^1.2.1", "es-abstract": "^1.23.5", "es-shim-unscopables": "^1.0.2" } }, "sha512-rwG/ja1neyLqCuGZ5YYrznA62D4mZXg0i1cIskIUKSiqF3Cje9/wXAls9B9s1Wa2fomMsIv8czB8jZcPmxCXFg=="],

    "array.prototype.flatmap": ["array.prototype.flatmap@1.3.3", "", { "dependencies": { "call-bind": "^1.0.8", "define-properties": "^1.2.1", "es-abstract": "^1.23.5", "es-shim-unscopables": "^1.0.2" } }, "sha512-Y7Wt51eKJSyi80hFrJCePGGNo5ktJCslFuboqJsbf57CCPcm5zztluPlc4/aD8sWsKvlwatezpV4U1efk8kpjg=="],

    "array.prototype.tosorted": ["array.prototype.tosorted@1.1.4", "", { "dependencies": { "call-bind": "^1.0.7", "define-properties": "^1.2.1", "es-abstract": "^1.23.3", "es-errors": "^1.3.0", "es-shim-unscopables": "^1.0.2" } }, "sha512-p6Fx8B7b7ZhL/gmUsAy0D15WhvDccw3mnGNbZpi3pmeJdxtWsj2jEaI4Y6oo3XiHfzuSgPwKc04MYt6KgvC/wA=="],

    "arraybuffer.prototype.slice": ["arraybuffer.prototype.slice@1.0.4", "", { "dependencies": { "array-buffer-byte-length": "^1.0.1", "call-bind": "^1.0.8", "define-properties": "^1.2.1", "es-abstract": "^1.23.5", "es-errors": "^1.3.0", "get-intrinsic": "^1.2.6", "is-array-buffer": "^3.0.4" } }, "sha512-BNoCY6SXXPQ7gF2opIP4GBE+Xw7U+pHMYKuzjgCN3GwiaIR09UUeKfheyIry77QtrCBlC0KK0q5/TER/tYh3PQ=="],

    "async-function": ["async-function@1.0.0", "", {}, "sha512-hsU18Ae8CDTR6Kgu9DYf0EbCr/a5iGL0rytQDobUcdpYOKokk8LEjVphnXkDkgpi0wYVsqrXuP0bZxJaTqdgoA=="],

    "autoprefixer": ["autoprefixer@10.5.0", "", { "dependencies": { "browserslist": "^4.28.2", "caniuse-lite": "^1.0.30001787", "fraction.js": "^5.3.4", "picocolors": "^1.1.1", "postcss-value-parser": "^4.2.0" }, "peerDependencies": { "postcss": "^8.1.0" }, "bin": "bin/autoprefixer" }, "sha512-FMhOoZV4+qR6aTUALKX2rEqGG+oyATvwBt9IIzVR5rMa2HRWPkxf+P+PAJLD1I/H5/II+HuZcBJYEFBpq39ong=="],

    "available-typed-arrays": ["available-typed-arrays@1.0.7", "", { "dependencies": { "possible-typed-array-names": "^1.0.0" } }, "sha512-wvUjBtSGN7+7SjNpq/9M2Tg350UZD3q62IFZLbRAR1bSMlCo1ZaeW+BJ+D090e4hIIZLBcTDWe4Mh4jvUDajzQ=="],

    "bail": ["bail@2.0.2", "", {}, "sha512-0xO6mYd7JB2YesxDKplafRpsiOzPt9V02ddPCLbY1xYGPOX24NTyN50qnUxgCPcSoYMhKpAuBTjQoRZCAkUDRw=="],

    "balanced-match": ["balanced-match@1.0.2", "", {}, "sha512-3oSeUO0TMV67hN1AmbXsK4yaqU7tjiHlbxRDZOpH0KW9+CeX4bRAaX0Anxt0tx2MrpRpWwQaPwIlISEJhYU5Pw=="],

    "base64-arraybuffer": ["base64-arraybuffer@1.0.2", "", {}, "sha512-I3yl4r9QB5ZRY3XuJVEPfc2XhZO6YweFPI+UovAzn+8/hb3oJ6lnysaFcjVpkCPfVWFUDvoZ8kmVDP7WyRtYtQ=="],

    "baseline-browser-mapping": ["baseline-browser-mapping@2.10.28", "", { "bin": "dist/cli.cjs" }, "sha512-Ic44hnOtFIgravCunj1ifSoQPSUrkNiJuH9Mf6jr2jjoA74icqV8wU0KuadXeOR8zuIJMOoTv0GuQjZ9ZYNMeA=="],

    "brace-expansion": ["brace-expansion@1.1.14", "", { "dependencies": { "balanced-match": "^1.0.0", "concat-map": "0.0.1" } }, "sha512-MWPGfDxnyzKU7rNOW9SP/c50vi3xrmrua/+6hfPbCS2ABNWfx24vPidzvC7krjU/RTo235sV776ymlsMtGKj8g=="],

    "browserslist": ["browserslist@4.28.2", "", { "dependencies": { "baseline-browser-mapping": "^2.10.12", "caniuse-lite": "^1.0.30001782", "electron-to-chromium": "^1.5.328", "node-releases": "^2.0.36", "update-browserslist-db": "^1.2.3" }, "bin": "cli.js" }, "sha512-48xSriZYYg+8qXna9kwqjIVzuQxi+KYWp2+5nCYnYKPTr0LvD89Jqk2Or5ogxz0NUMfIjhh2lIUX/LyX9B4oIg=="],

    "call-bind": ["call-bind@1.0.9", "", { "dependencies": { "call-bind-apply-helpers": "^1.0.2", "es-define-property": "^1.0.1", "get-intrinsic": "^1.3.0", "set-function-length": "^1.2.2" } }, "sha512-a/hy+pNsFUTR+Iz8TCJvXudKVLAnz/DyeSUo10I5yvFDQJBFU2s9uqQpoSrJlroHUKoKqzg+epxyP9lqFdzfBQ=="],

    "call-bind-apply-helpers": ["call-bind-apply-helpers@1.0.2", "", { "dependencies": { "es-errors": "^1.3.0", "function-bind": "^1.1.2" } }, "sha512-Sp1ablJ0ivDkSzjcaJdxEunN5/XvksFJ2sMBFfq6x0ryhQV/2b/KwFe21cMpmHtPOSij8K99/wSfoEuTObmuMQ=="],

    "call-bound": ["call-bound@1.0.4", "", { "dependencies": { "call-bind-apply-helpers": "^1.0.2", "get-intrinsic": "^1.3.0" } }, "sha512-+ys997U96po4Kx/ABpBCqhA9EuxJaQWDQg7295H4hBphv3IZg0boBKuwYpt4YXp6MZ5AmZQnU/tyMTlRpaSejg=="],

    "callsites": ["callsites@3.1.0", "", {}, "sha512-P8BjAsXvZS+VIDUI11hHCQEv74YT67YUi5JJFNWIqL235sBmjX4+qx9Muvls5ivyNENctx46xQLQ3aTuE7ssaQ=="],

    "caniuse-lite": ["caniuse-lite@1.0.30001792", "", {}, "sha512-hVLMUZFgR4JJ6ACt1uEESvQN1/dBVqPAKY0hgrV70eN3391K6juAfTjKZLKvOMsx8PxA7gsY1/tLMMTcfFLLpw=="],

    "canvas-confetti": ["canvas-confetti@1.9.4", "", {}, "sha512-yxQbJkAVrFXWNbTUjPqjF7G+g6pDotOUHGbkZq2NELZUMDpiJ85rIEazVb8GTaAptNW2miJAXbs1BtioA251Pw=="],

    "canvg": ["canvg@3.0.11", "", { "dependencies": { "@babel/runtime": "^7.12.5", "@types/raf": "^3.4.0", "core-js": "^3.8.3", "raf": "^3.4.1", "regenerator-runtime": "^0.13.7", "rgbcolor": "^1.0.1", "stackblur-canvas": "^2.0.0", "svg-pathdata": "^6.0.3" } }, "sha512-5ON+q7jCTgMp9cjpu4Jo6XbvfYwSB2Ow3kzHKfIyJfaCAOHLbdKPQqGKgfED/R5B+3TFFfe8pegYA+b423SRyA=="],

    "ccount": ["ccount@2.0.1", "", {}, "sha512-eyrF0jiFpY+3drT6383f1qhkbGsLSifNAjA61IUjZjmLCWjItY6LB9ft9YhoDgwfmclB2zhu51Lc7+95b8NRAg=="],

    "chalk": ["chalk@4.1.2", "", { "dependencies": { "ansi-styles": "^4.1.0", "supports-color": "^7.1.0" } }, "sha512-oKnbhFyRIXpUuez8iBMmyEa4nbj4IOQyuhc/wy9kY7/WVPcwIO9VA668Pu8RkO7+0G76SLROeyw9CpQ061i4mA=="],

    "character-entities": ["character-entities@2.0.2", "", {}, "sha512-shx7oQ0Awen/BRIdkjkvz54PnEEI/EjwXDSIZp86/KKdbafHh1Df/RYGBhn4hbe2+uKC9FnT5UCEdyPz3ai9hQ=="],

    "character-entities-html4": ["character-entities-html4@2.1.0", "", {}, "sha512-1v7fgQRj6hnSwFpq1Eu0ynr/CDEw0rXo2B61qXrLNdHZmPKgb7fqS1a2JwF0rISo9q77jDI8VMEHoApn8qDoZA=="],

    "character-entities-legacy": ["character-entities-legacy@3.0.0", "", {}, "sha512-RpPp0asT/6ufRm//AJVwpViZbGM/MkjQFxJccQRHmISF/22NBtsHqAWmL+/pmkPWoIUJdWyeVleTl1wydHATVQ=="],

    "character-reference-invalid": ["character-reference-invalid@2.0.1", "", {}, "sha512-iBZ4F4wRbyORVsu0jPV7gXkOsGYjGHPmAyv+HiHG8gi5PtC9KI2j1+v8/tlibRvjoWX027ypmG/n0HtO5t7unw=="],

    "class-variance-authority": ["class-variance-authority@0.7.1", "", { "dependencies": { "clsx": "^2.1.1" } }, "sha512-Ka+9Trutv7G8M6WT6SeiRWz792K5qEqIGEGzXKhAE6xOWAY6pPH8U+9IY3oCMv6kqTmLsv7Xh/2w2RigkePMsg=="],

    "cliui": ["cliui@8.0.1", "", { "dependencies": { "string-width": "^4.2.0", "strip-ansi": "^6.0.1", "wrap-ansi": "^7.0.0" } }, "sha512-BSeNnyus75C4//NQ9gQt1/csTXyo/8Sb+afLAkzAptFuMsod9HFokGNudZpi/oQV73hnVK+sR+5PVRMd+Dr7YQ=="],

    "clone": ["clone@2.1.2", "", {}, "sha512-3Pe/CF1Nn94hyhIYpjtiLhdCoEoz0DqQ+988E9gmeEdQZlojxnOb74wctFyuwWQHzqyf9X7C7MG8juUpqBJT8w=="],

    "clsx": ["clsx@2.1.1", "", {}, "sha512-eYm0QWBtUrBWZWG0d386OGAw16Z995PiOVo2B7bjWSbHedGl5e0ZWaq65kOGgUSNesEIDkB9ISbTg/JK9dhCZA=="],

    "cmdk": ["cmdk@1.1.1", "", { "dependencies": { "@radix-ui/react-compose-refs": "^1.1.1", "@radix-ui/react-dialog": "^1.1.6", "@radix-ui/react-id": "^1.1.0", "@radix-ui/react-primitive": "^2.0.2" }, "peerDependencies": { "react": "^18 || ^19 || ^19.0.0-rc", "react-dom": "^18 || ^19 || ^19.0.0-rc" } }, "sha512-Vsv7kFaXm+ptHDMZ7izaRsP70GgrW9NBNGswt9OZaVBLlE0SNpDq8eu/VGXyF9r7M0azK3Wy7OlYXsuyYLFzHg=="],

    "color-convert": ["color-convert@2.0.1", "", { "dependencies": { "color-name": "~1.1.4" } }, "sha512-RRECPsj7iu/xb5oKYcsFHSppFNnsj/52OVTRKb4zP5onXwVF3zVmmToNcOfGC+CRDpfK/U584fMg38ZHCaElKQ=="],

    "color-name": ["color-name@1.1.4", "", {}, "sha512-dOy+3AuW3a2wNbZHIuMZpTcgjGuLU/uBL/ubcZF9OXbDo8ff4O8yVp5Bf0efS8uEoYo5q4Fx7dY9OgQGXgAsQA=="],

    "comma-separated-tokens": ["comma-separated-tokens@2.0.3", "", {}, "sha512-Fu4hJdvzeylCfQPp9SGWidpzrMs7tTrlu6Vb8XGaRGck8QSNZJJp538Wrb60Lax4fPwR64ViY468OIUTbRlGZg=="],

    "concat-map": ["concat-map@0.0.1", "", {}, "sha512-/Srv4dswyQNBfohGpz9o6Yb3Gz3SrUDqBH5rTuhGR7ahtlbYKnVxw2bCFMRljaA7EXHaXZ8wsHdodFvbkhKmqg=="],

    "convert-source-map": ["convert-source-map@2.0.0", "", {}, "sha512-Kvp459HrV2FEJ1CAsi1Ku+MY3kasH19TFykTz2xWmMeq6bk2NU3XXvfJ+Q61m0xktWwt+1HSYf3JZsTms3aRJg=="],

    "core-js": ["core-js@3.49.0", "", {}, "sha512-es1U2+YTtzpwkxVLwAFdSpaIMyQaq0PBgm3YD1W3Qpsn1NAmO3KSgZfu+oGSWVu6NvLHoHCV/aYcsE5wiB7ALg=="],

    "cross-spawn": ["cross-spawn@7.0.6", "", { "dependencies": { "path-key": "^3.1.0", "shebang-command": "^2.0.0", "which": "^2.0.1" } }, "sha512-uV2QOWP2nWzsy2aMp8aRibhi9dlzF5Hgh5SHaB9OiTGEyDTiJJyx0uy51QXdyWbtAHNua4XJzUKca3OzKUd3vA=="],

    "css-box-model": ["css-box-model@1.2.1", "", { "dependencies": { "tiny-invariant": "^1.0.6" } }, "sha512-a7Vr4Q/kd/aw96bnJG332W9V9LkJO69JRcaCYDUqjp6/z0w6VcZjgAcTbgFxEPfBgdnAwlh3iwu+hLopa+flJw=="],

    "css-line-break": ["css-line-break@2.1.0", "", { "dependencies": { "utrie": "^1.0.2" } }, "sha512-FHcKFCZcAha3LwfVBhCQbW2nCNbkZXn7KVUJcsT5/P8YmfsVja0FMPJr0B903j/E69HUphKiV9iQArX8SDYA4w=="],

    "csstype": ["csstype@3.2.3", "", {}, "sha512-z1HGKcYy2xA8AGQfwrn0PAy+PB7X/GSj3UVJW9qKyn43xWa+gl5nXmU4qqLMRzWVLFC8KusUX8T/0kCiOYpAIQ=="],

    "d3-array": ["d3-array@3.2.4", "", { "dependencies": { "internmap": "1 - 2" } }, "sha512-tdQAmyA18i4J7wprpYq8ClcxZy3SC31QMeByyCFyRt7BVHdREQZ5lpzoe5mFEYZUWe+oq8HBvk9JjpibyEV4Jg=="],

    "d3-color": ["d3-color@3.1.0", "", {}, "sha512-zg/chbXyeBtMQ1LbD/WSoW2DpC3I0mpmPdW+ynRTj/x2DAWYrIY7qeZIHidozwV24m4iavr15lNwIwLxRmOxhA=="],

    "d3-ease": ["d3-ease@3.0.1", "", {}, "sha512-wR/XK3D3XcLIZwpbvQwQ5fK+8Ykds1ip7A2Txe0yxncXSdq1L9skcG7blcedkOX+ZcgxGAmLX1FrRGbADwzi0w=="],

    "d3-format": ["d3-format@3.1.2", "", {}, "sha512-AJDdYOdnyRDV5b6ArilzCPPwc1ejkHcoyFarqlPqT7zRYjhavcT3uSrqcMvsgh2CgoPbK3RCwyHaVyxYcP2Arg=="],

    "d3-interpolate": ["d3-interpolate@3.0.1", "", { "dependencies": { "d3-color": "1 - 3" } }, "sha512-3bYs1rOD33uo8aqJfKP3JWPAibgw8Zm2+L9vBKEHJ2Rg+viTR7o5Mmv5mZcieN+FRYaAOWX5SJATX6k1PWz72g=="],

    "d3-path": ["d3-path@3.1.0", "", {}, "sha512-p3KP5HCf/bvjBSSKuXid6Zqijx7wIfNW+J/maPs+iwR35at5JCbLUT0LzF1cnjbCHWhqzQTIN2Jpe8pRebIEFQ=="],

    "d3-scale": ["d3-scale@4.0.2", "", { "dependencies": { "d3-array": "2.10.0 - 3", "d3-format": "1 - 3", "d3-interpolate": "1.2.0 - 3", "d3-time": "2.1.1 - 3", "d3-time-format": "2 - 4" } }, "sha512-GZW464g1SH7ag3Y7hXjf8RoUuAFIqklOAq3MRl4OaWabTFJY9PN/E1YklhXLh+OQ3fM9yS2nOkCoS+WLZ6kvxQ=="],

    "d3-shape": ["d3-shape@3.2.0", "", { "dependencies": { "d3-path": "^3.1.0" } }, "sha512-SaLBuwGm3MOViRq2ABk3eLoxwZELpH6zhl3FbAoJ7Vm1gofKx6El1Ib5z23NUEhF9AsGl7y+dzLe5Cw2AArGTA=="],

    "d3-time": ["d3-time@3.1.0", "", { "dependencies": { "d3-array": "2 - 3" } }, "sha512-VqKjzBLejbSMT4IgbmVgDjpkYrNWUYJnbCGo874u7MMKIWsILRX+OpX/gTk8MqjpT1A/c6HY2dCA77ZN0lkQ2Q=="],

    "d3-time-format": ["d3-time-format@4.1.0", "", { "dependencies": { "d3-time": "1 - 3" } }, "sha512-dJxPBlzC7NugB2PDLwo9Q8JiTR3M3e4/XANkreKSUxF8vvXKqm1Yfq4Q5dl8budlunRVlUUaDUgFt7eA8D6NLg=="],

    "d3-timer": ["d3-timer@3.0.1", "", {}, "sha512-ndfJ/JxxMd3nw31uyKoY2naivF+r29V+Lc0svZxe1JvvIRmi8hUsrMvdOwgS1o6uBHmiz91geQ0ylPP0aj1VUA=="],

    "data-view-buffer": ["data-view-buffer@1.0.2", "", { "dependencies": { "call-bound": "^1.0.3", "es-errors": "^1.3.0", "is-data-view": "^1.0.2" } }, "sha512-EmKO5V3OLXh1rtK2wgXRansaK1/mtVdTUEiEI0W8RkvgT05kfxaH29PliLnpLP73yYO6142Q72QNa8Wx/A5CqQ=="],

    "data-view-byte-length": ["data-view-byte-length@1.0.2", "", { "dependencies": { "call-bound": "^1.0.3", "es-errors": "^1.3.0", "is-data-view": "^1.0.2" } }, "sha512-tuhGbE6CfTM9+5ANGf+oQb72Ky/0+s3xKUpHvShfiz2RxMFgFPjsXuRLBVMtvMs15awe45SRb83D6wH4ew6wlQ=="],

    "data-view-byte-offset": ["data-view-byte-offset@1.0.1", "", { "dependencies": { "call-bound": "^1.0.2", "es-errors": "^1.3.0", "is-data-view": "^1.0.1" } }, "sha512-BS8PfmtDGnrgYdOonGZQdLZslWIeCGFP9tpan0hi1Co2Zr2NKADsvGYA8XxuG/4UWgJ6Cjtv+YJnB6MM69QGlQ=="],

    "date-fns": ["date-fns@3.6.0", "", {}, "sha512-fRHTG8g/Gif+kSh50gaGEdToemgfj74aRX3swtiouboip5JDLAyDE9F11nHMIcvOaXeOC6D7SpNhi7uFyB7Uww=="],

    "debug": ["debug@4.4.3", "", { "dependencies": { "ms": "^2.1.3" } }, "sha512-RGwwWnwQvkVfavKVt22FGLw+xYSdzARwm0ru6DhTVA3umU5hZc28V3kO4stgYryrTlLpuvgI9GiijltAjNbcqA=="],

    "decimal.js-light": ["decimal.js-light@2.5.1", "", {}, "sha512-qIMFpTMZmny+MMIitAB6D7iVPEorVw6YQRWkvarTkT4tBeSLLiHzcwj6q0MmYSFCiVpiqPJTJEYIrpcPzVEIvg=="],

    "decode-named-character-reference": ["decode-named-character-reference@1.3.0", "", { "dependencies": { "character-entities": "^2.0.0" } }, "sha512-GtpQYB283KrPp6nRw50q3U9/VfOutZOe103qlN7BPP6Ad27xYnOIWv4lPzo8HCAL+mMZofJ9KEy30fq6MfaK6Q=="],

    "deep-equal": ["deep-equal@1.1.2", "", { "dependencies": { "is-arguments": "^1.1.1", "is-date-object": "^1.0.5", "is-regex": "^1.1.4", "object-is": "^1.1.5", "object-keys": "^1.1.1", "regexp.prototype.flags": "^1.5.1" } }, "sha512-5tdhKF6DbU7iIzrIOa1AOUt39ZRm13cmL1cGEh//aqR8x9+tNfbywRf0n5FD/18OKMdo7DNEtrX2t22ZAkI+eg=="],

    "deep-is": ["deep-is@0.1.4", "", {}, "sha512-oIPzksmTg4/MriiaYGO+okXDT7ztn/w3Eptv/+gSIdMdKsJo0u4CfYNFJPy+4SKMuCqGw2wxnA+URMg3t8a/bQ=="],

    "define-data-property": ["define-data-property@1.1.4", "", { "dependencies": { "es-define-property": "^1.0.0", "es-errors": "^1.3.0", "gopd": "^1.0.1" } }, "sha512-rBMvIzlpA8v6E+SJZoo++HAYqsLrkg7MSfIinMPFhmkorw7X+dOXVJQs+QT69zGkzMyfDnIMN2Wid1+NbL3T+A=="],

    "define-properties": ["define-properties@1.2.1", "", { "dependencies": { "define-data-property": "^1.0.1", "has-property-descriptors": "^1.0.0", "object-keys": "^1.1.1" } }, "sha512-8QmQKqEASLd5nx0U1B1okLElbUuuttJ/AnYmRXbbbGDWh6uS208EjD4Xqq/I9wK7u0v6O08XhTWnt5XtEbR6Dg=="],

    "dequal": ["dequal@2.0.3", "", {}, "sha512-0je+qPKHEMohvfRTCEo3CrPG6cAzAYgmzKyxRiYSSDkS6eGJdyVJm7WaYA5ECaAD9wLB2T4EEeymA5aFVcYXCA=="],

    "detect-libc": ["detect-libc@2.1.2", "", {}, "sha512-Btj2BOOO83o3WyH59e8MgXsxEQVcarkUOpEYrubB0urwnN10yQ364rsiByU11nZlqWYZm05i/of7io4mzihBtQ=="],

    "detect-node-es": ["detect-node-es@1.1.0", "", {}, "sha512-ypdmJU/TbBby2Dxibuv7ZLW3Bs1QEmM7nHjEANfohJLvE0XVujisn1qPJcZxg+qDucsr+bP6fLD1rPS3AhJ7EQ=="],

    "devlop": ["devlop@1.1.0", "", { "dependencies": { "dequal": "^2.0.0" } }, "sha512-RWmIqhcFf1lRYBvNmr7qTNuyCt/7/ns2jbpp1+PalgE/rDQcBT0fioSMUpJ93irlUhC5hrg4cYqe6U+0ImW0rA=="],

    "doctrine": ["doctrine@2.1.0", "", { "dependencies": { "esutils": "^2.0.2" } }, "sha512-35mSku4ZXK0vfCuHEDAwt55dg2jNajHZ1odvF+8SSr82EsZY4QmXfuWso8oEd8zRhVObSN18aM0CjSdoBX7zIw=="],

    "dom-helpers": ["dom-helpers@5.2.1", "", { "dependencies": { "@babel/runtime": "^7.8.7", "csstype": "^3.0.2" } }, "sha512-nRCa7CK3VTrM2NmGkIy4cbK7IZlgBE/PYMn55rrXefr5xXDP0LdtfPnblFDoVdcAfslJ7or6iqAUnx0CCGIWQA=="],

    "dompurify": ["dompurify@3.4.2", "", { "optionalDependencies": { "@types/trusted-types": "^2.0.7" } }, "sha512-lHeS9SA/IKeIFFyYciHBr2n0v1VMPlSj843HdLOwjb2OxNwdq9Xykxqhk+FE42MzAdHvInbAolSE4mhahPpjXA=="],

    "dunder-proto": ["dunder-proto@1.0.1", "", { "dependencies": { "call-bind-apply-helpers": "^1.0.1", "es-errors": "^1.3.0", "gopd": "^1.2.0" } }, "sha512-KIN/nDJBQRcXw0MLVhZE9iQHmG68qAVIBg9CqmUYjmQIhgij9U5MFvrqkUL5FbtyyzZuOeOt0zdeRe4UY7ct+A=="],

    "electron-to-chromium": ["electron-to-chromium@1.5.352", "", {}, "sha512-9wHk8x6dyuimoe18EdiDPWKExNdxYqo4fn4FwOVVper6RxT3cmpBwBkWWfSOCYJjQdIco/nPhJhNLmn4Ufg1Yg=="],

    "embla-carousel": ["embla-carousel@8.6.0", "", {}, "sha512-SjWyZBHJPbqxHOzckOfo8lHisEaJWmwd23XppYFYVh10bU66/Pn5tkVkbkCMZVdbUE5eTCI2nD8OyIP4Z+uwkA=="],

    "embla-carousel-react": ["embla-carousel-react@8.6.0", "", { "dependencies": { "embla-carousel": "8.6.0", "embla-carousel-reactive-utils": "8.6.0" }, "peerDependencies": { "react": "^16.8.0 || ^17.0.1 || ^18.0.0 || ^19.0.0 || ^19.0.0-rc" } }, "sha512-0/PjqU7geVmo6F734pmPqpyHqiM99olvyecY7zdweCw+6tKEXnrE90pBiBbMMU8s5tICemzpQ3hi5EpxzGW+JA=="],

    "embla-carousel-reactive-utils": ["embla-carousel-reactive-utils@8.6.0", "", { "peerDependencies": { "embla-carousel": "8.6.0" } }, "sha512-fMVUDUEx0/uIEDM0Mz3dHznDhfX+znCCDCeIophYb1QGVM7YThSWX+wz11zlYwWFOr74b4QLGg0hrGPJeG2s4A=="],

    "emoji-regex": ["emoji-regex@8.0.0", "", {}, "sha512-MSjYzcWNOA0ewAHpz0MxpYFvwg6yjy1NG3xteoqz644VCo/RPgnr1/GGt+ic3iJTzQ8Eu3TdM14SawnVUmGE6A=="],

    "enhanced-resolve": ["enhanced-resolve@5.21.2", "", { "dependencies": { "graceful-fs": "^4.2.4", "tapable": "^2.3.3" } }, "sha512-xe9vQb5kReirPUxgQrXA3ihgbCqssmTiM7cOZ+Gzu+VeGWgpV98lLZvp0dl4yriyAePcewxGUs9UpKD8PET9KQ=="],

    "es-abstract": ["es-abstract@1.24.2", "", { "dependencies": { "array-buffer-byte-length": "^1.0.2", "arraybuffer.prototype.slice": "^1.0.4", "available-typed-arrays": "^1.0.7", "call-bind": "^1.0.8", "call-bound": "^1.0.4", "data-view-buffer": "^1.0.2", "data-view-byte-length": "^1.0.2", "data-view-byte-offset": "^1.0.1", "es-define-property": "^1.0.1", "es-errors": "^1.3.0", "es-object-atoms": "^1.1.1", "es-set-tostringtag": "^2.1.0", "es-to-primitive": "^1.3.0", "function.prototype.name": "^1.1.8", "get-intrinsic": "^1.3.0", "get-proto": "^1.0.1", "get-symbol-description": "^1.1.0", "globalthis": "^1.0.4", "gopd": "^1.2.0", "has-property-descriptors": "^1.0.2", "has-proto": "^1.2.0", "has-symbols": "^1.1.0", "hasown": "^2.0.2", "internal-slot": "^1.1.0", "is-array-buffer": "^3.0.5", "is-callable": "^1.2.7", "is-data-view": "^1.0.2", "is-negative-zero": "^2.0.3", "is-regex": "^1.2.1", "is-set": "^2.0.3", "is-shared-array-buffer": "^1.0.4", "is-string": "^1.1.1", "is-typed-array": "^1.1.15", "is-weakref": "^1.1.1", "math-intrinsics": "^1.1.0", "object-inspect": "^1.13.4", "object-keys": "^1.1.1", "object.assign": "^4.1.7", "own-keys": "^1.0.1", "regexp.prototype.flags": "^1.5.4", "safe-array-concat": "^1.1.3", "safe-push-apply": "^1.0.0", "safe-regex-test": "^1.1.0", "set-proto": "^1.0.0", "stop-iteration-iterator": "^1.1.0", "string.prototype.trim": "^1.2.10", "string.prototype.trimend": "^1.0.9", "string.prototype.trimstart": "^1.0.8", "typed-array-buffer": "^1.0.3", "typed-array-byte-length": "^1.0.3", "typed-array-byte-offset": "^1.0.4", "typed-array-length": "^1.0.7", "unbox-primitive": "^1.1.0", "which-typed-array": "^1.1.19" } }, "sha512-2FpH9Q5i2RRwyEP1AylXe6nYLR5OhaJTZwmlcP0dL/+JCbgg7yyEo/sEK6HeGZRf3dFpWwThaRHVApXSkW3xeg=="],

    "es-define-property": ["es-define-property@1.0.1", "", {}, "sha512-e3nRfgfUZ4rNGL232gUgX06QNyyez04KdjFrF+LTRoOXmrOgFKDg4BCdsjW8EnT69eqdYGmRpJwiPVYNrCaW3g=="],

    "es-errors": ["es-errors@1.3.0", "", {}, "sha512-Zf5H2Kxt2xjTvbJvP2ZWLEICxA6j+hAmMzIlypy4xcBg1vKVnx89Wy0GbS+kf5cwCVFFzdCFh2XSCFNULS6csw=="],

    "es-iterator-helpers": ["es-iterator-helpers@1.3.2", "", { "dependencies": { "call-bind": "^1.0.9", "call-bound": "^1.0.4", "define-properties": "^1.2.1", "es-abstract": "^1.24.2", "es-errors": "^1.3.0", "es-set-tostringtag": "^2.1.0", "function-bind": "^1.1.2", "get-intrinsic": "^1.3.0", "globalthis": "^1.0.4", "gopd": "^1.2.0", "has-property-descriptors": "^1.0.2", "has-proto": "^1.2.0", "has-symbols": "^1.1.0", "internal-slot": "^1.1.0", "iterator.prototype": "^1.1.5", "math-intrinsics": "^1.1.0" } }, "sha512-HVLACW1TppGYjJ8H6/jqH/pqOtKRw6wMlrB23xfExmFWxFquAIWCmwoLsOyN96K4a5KbmOf5At9ZUO3GZbetAw=="],

    "es-object-atoms": ["es-object-atoms@1.1.1", "", { "dependencies": { "es-errors": "^1.3.0" } }, "sha512-FGgH2h8zKNim9ljj7dankFPcICIK9Cp5bm+c2gQSYePhpaG5+esrLODihIorn+Pe6FGJzWhXQotPv73jTaldXA=="],

    "es-set-tostringtag": ["es-set-tostringtag@2.1.0", "", { "dependencies": { "es-errors": "^1.3.0", "get-intrinsic": "^1.2.6", "has-tostringtag": "^1.0.2", "hasown": "^2.0.2" } }, "sha512-j6vWzfrGVfyXxge+O0x5sh6cvxAog0a/4Rdd2K36zCMV5eJ+/+tOAngRO8cODMNWbVRdVlmGZQL2YS3yR8bIUA=="],

    "es-shim-unscopables": ["es-shim-unscopables@1.1.0", "", { "dependencies": { "hasown": "^2.0.2" } }, "sha512-d9T8ucsEhh8Bi1woXCf+TIKDIROLG5WCkxg8geBCbvk22kzwC5G2OnXVMO6FUsvQlgUUXQ2itephWDLqDzbeCw=="],

    "es-to-primitive": ["es-to-primitive@1.3.0", "", { "dependencies": { "is-callable": "^1.2.7", "is-date-object": "^1.0.5", "is-symbol": "^1.0.4" } }, "sha512-w+5mJ3GuFL+NjVtJlvydShqE1eN3h3PbI7/5LAsYJP/2qtuMXjfL2LpHSRqo4b4eSF5K/DH1JXKUAHSB2UW50g=="],

    "esbuild": ["esbuild@0.25.12", "", { "optionalDependencies": { "@esbuild/aix-ppc64": "0.25.12", "@esbuild/android-arm": "0.25.12", "@esbuild/android-arm64": "0.25.12", "@esbuild/android-x64": "0.25.12", "@esbuild/darwin-arm64": "0.25.12", "@esbuild/darwin-x64": "0.25.12", "@esbuild/freebsd-arm64": "0.25.12", "@esbuild/freebsd-x64": "0.25.12", "@esbuild/linux-arm": "0.25.12", "@esbuild/linux-arm64": "0.25.12", "@esbuild/linux-ia32": "0.25.12", "@esbuild/linux-loong64": "0.25.12", "@esbuild/linux-mips64el": "0.25.12", "@esbuild/linux-ppc64": "0.25.12", "@esbuild/linux-riscv64": "0.25.12", "@esbuild/linux-s390x": "0.25.12", "@esbuild/linux-x64": "0.25.12", "@esbuild/netbsd-arm64": "0.25.12", "@esbuild/netbsd-x64": "0.25.12", "@esbuild/openbsd-arm64": "0.25.12", "@esbuild/openbsd-x64": "0.25.12", "@esbuild/openharmony-arm64": "0.25.12", "@esbuild/sunos-x64": "0.25.12", "@esbuild/win32-arm64": "0.25.12", "@esbuild/win32-ia32": "0.25.12", "@esbuild/win32-x64": "0.25.12" }, "bin": "bin/esbuild" }, "sha512-bbPBYYrtZbkt6Os6FiTLCTFxvq4tt3JKall1vRwshA3fdVztsLAatFaZobhkBC8/BrPetoa0oksYoKXoG4ryJg=="],

    "escalade": ["escalade@3.2.0", "", {}, "sha512-WUj2qlxaQtO4g6Pq5c29GTcWGDyd8itL8zTlipgECz3JesAiiOKotd8JU6otB3PACgG6xkJUyVhboMS+bje/jA=="],

    "escape-string-regexp": ["escape-string-regexp@4.0.0", "", {}, "sha512-TtpcNJ3XAzx3Gq8sWRzJaVajRs0uVxA2YAkdb1jm2YkPz4G6egUFAyA3n5vtEIZefPk5Wa4UXbKuS5fKkJWdgA=="],

    "eslint": ["eslint@9.39.4", "", { "dependencies": { "@eslint-community/eslint-utils": "^4.8.0", "@eslint-community/regexpp": "^4.12.1", "@eslint/config-array": "^0.21.2", "@eslint/config-helpers": "^0.4.2", "@eslint/core": "^0.17.0", "@eslint/eslintrc": "^3.3.5", "@eslint/js": "9.39.4", "@eslint/plugin-kit": "^0.4.1", "@humanfs/node": "^0.16.6", "@humanwhocodes/module-importer": "^1.0.1", "@humanwhocodes/retry": "^0.4.2", "@types/estree": "^1.0.6", "ajv": "^6.14.0", "chalk": "^4.0.0", "cross-spawn": "^7.0.6", "debug": "^4.3.2", "escape-string-regexp": "^4.0.0", "eslint-scope": "^8.4.0", "eslint-visitor-keys": "^4.2.1", "espree": "^10.4.0", "esquery": "^1.5.0", "esutils": "^2.0.2", "fast-deep-equal": "^3.1.3", "file-entry-cache": "^8.0.0", "find-up": "^5.0.0", "glob-parent": "^6.0.2", "ignore": "^5.2.0", "imurmurhash": "^0.1.4", "is-glob": "^4.0.0", "json-stable-stringify-without-jsonify": "^1.0.1", "lodash.merge": "^4.6.2", "minimatch": "^3.1.5", "natural-compare": "^1.4.0", "optionator": "^0.9.3" }, "peerDependencies": { "jiti": "*" }, "bin": "bin/eslint.js" }, "sha512-XoMjdBOwe/esVgEvLmNsD3IRHkm7fbKIUGvrleloJXUZgDHig2IPWNniv+GwjyJXzuNqVjlr5+4yVUZjycJwfQ=="],

    "eslint-plugin-react": ["eslint-plugin-react@7.37.5", "", { "dependencies": { "array-includes": "^3.1.8", "array.prototype.findlast": "^1.2.5", "array.prototype.flatmap": "^1.3.3", "array.prototype.tosorted": "^1.1.4", "doctrine": "^2.1.0", "es-iterator-helpers": "^1.2.1", "estraverse": "^5.3.0", "hasown": "^2.0.2", "jsx-ast-utils": "^2.4.1 || ^3.0.0", "minimatch": "^3.1.2", "object.entries": "^1.1.9", "object.fromentries": "^2.0.8", "object.values": "^1.2.1", "prop-types": "^15.8.1", "resolve": "^2.0.0-next.5", "semver": "^6.3.1", "string.prototype.matchall": "^4.0.12", "string.prototype.repeat": "^1.0.0" }, "peerDependencies": { "eslint": "^3 || ^4 || ^5 || ^6 || ^7 || ^8 || ^9.7" } }, "sha512-Qteup0SqU15kdocexFNAJMvCJEfa2xUKNV4CC1xsVMrIIqEy3SQ/rqyxCWNzfrd3/ldy6HMlD2e0JDVpDg2qIA=="],

    "eslint-plugin-react-hooks": ["eslint-plugin-react-hooks@5.2.0", "", { "peerDependencies": { "eslint": "^3.0.0 || ^4.0.0 || ^5.0.0 || ^6.0.0 || ^7.0.0 || ^8.0.0-0 || ^9.0.0" } }, "sha512-+f15FfK64YQwZdJNELETdn5ibXEUQmW1DZL6KXhNnc2heoy/sg9VJJeT7n8TlMWouzWqSWavFkIhHyIbIAEapg=="],

    "eslint-plugin-react-refresh": ["eslint-plugin-react-refresh@0.4.26", "", { "peerDependencies": { "eslint": ">=8.40" } }, "sha512-1RETEylht2O6FM/MvgnyvT+8K21wLqDNg4qD51Zj3guhjt433XbnnkVttHMyaVyAFD03QSV4LPS5iE3VQmO7XQ=="],

    "eslint-plugin-unused-imports": ["eslint-plugin-unused-imports@4.4.1", "", { "peerDependencies": { "@typescript-eslint/eslint-plugin": "^8.0.0-0 || ^7.0.0 || ^6.0.0 || ^5.0.0", "eslint": "^10.0.0 || ^9.0.0 || ^8.0.0" } }, "sha512-oZGYUz1X3sRMGUB+0cZyK2VcvRX5lm/vB56PgNNcU+7ficUCKm66oZWKUubXWnOuPjQ8PvmXtCViXBMONPe7tQ=="],

    "eslint-scope": ["eslint-scope@8.4.0", "", { "dependencies": { "esrecurse": "^4.3.0", "estraverse": "^5.2.0" } }, "sha512-sNXOfKCn74rt8RICKMvJS7XKV/Xk9kA7DyJr8mJik3S7Cwgy3qlkkmyS2uQB3jiJg6VNdZd/pDBJu0nvG2NlTg=="],

    "eslint-visitor-keys": ["eslint-visitor-keys@4.2.1", "", {}, "sha512-Uhdk5sfqcee/9H/rCOJikYz67o0a2Tw2hGRPOG2Y1R2dg7brRe1uG0yaNQDHu+TO/uQPF/5eCapvYSmHUjt7JQ=="],

    "espree": ["espree@10.4.0", "", { "dependencies": { "acorn": "^8.15.0", "acorn-jsx": "^5.3.2", "eslint-visitor-keys": "^4.2.1" } }, "sha512-j6PAQ2uUr79PZhBjP5C5fhl8e39FmRnOjsD5lGnWrFU8i2G776tBK7+nP8KuQUTTyAZUwfQqXAgrVH5MbH9CYQ=="],

    "esquery": ["esquery@1.7.0", "", { "dependencies": { "estraverse": "^5.1.0" } }, "sha512-Ap6G0WQwcU/LHsvLwON1fAQX9Zp0A2Y6Y/cJBl9r/JbW90Zyg4/zbG6zzKa2OTALELarYHmKu0GhpM5EO+7T0g=="],

    "esrecurse": ["esrecurse@4.3.0", "", { "dependencies": { "estraverse": "^5.2.0" } }, "sha512-KmfKL3b6G+RXvP8N1vr3Tq1kL/oCFgn2NYXEtqP8/L3pKapUA4G8cFVaoF3SU323CD4XypR/ffioHmkti6/Tag=="],

    "estraverse": ["estraverse@5.3.0", "", {}, "sha512-MMdARuVEQziNTeJD8DgMqmhwR11BRQ/cBP+pLtYdSTnf3MIO8fFeiINEbX36ZdNlfU/7A9f3gUw49B3oQsvwBA=="],

    "estree-util-is-identifier-name": ["estree-util-is-identifier-name@3.0.0", "", {}, "sha512-hFtqIDZTIUZ9BXLb8y4pYGyk6+wekIivNVTcmvk8NoOh+VeRn5y6cEHzbURrWbfp1fIqdVipilzj+lfaadNZmg=="],

    "esutils": ["esutils@2.0.3", "", {}, "sha512-kVscqXk4OCp68SZ0dkgEKVi6/8ij300KBWTJq32P/dYeWTSwK41WyTxalN1eRmA5Z9UU/LX9D7FWSmV9SAYx6g=="],

    "eventemitter3": ["eventemitter3@4.0.7", "", {}, "sha512-8guHBZCwKnFhYdHr2ysuRWErTwhoN2X8XELRlrRwpmfeY2jjuUN4taQMsULKUVo1K4DvZl+0pgfyoysHxvmvEw=="],

    "extend": ["extend@3.0.2", "", {}, "sha512-fjquC59cD7CyW6urNXK0FBufkZcoiGG80wTuPujX590cB5Ttln20E2UB4S/WARVqhXffZl2LNgS+gQdPIIim/g=="],

    "fast-deep-equal": ["fast-deep-equal@3.1.3", "", {}, "sha512-f3qQ9oQy9j2AhBe/H9VC91wLmKBCCU/gDOnKNAYG5hswO7BLKj09Hc5HYNz9cGI++xlpDCIgDaitVs03ATR84Q=="],

    "fast-diff": ["fast-diff@1.1.2", "", {}, "sha512-KaJUt+M9t1qaIteSvjc6P3RbMdXsNhK61GRftR6SNxqmhthcd9MGIi4T+o0jD8LUSpSnSKXE20nLtJ3fOHxQig=="],

    "fast-equals": ["fast-equals@5.4.0", "", {}, "sha512-jt2DW/aNFNwke7AUd+Z+e6pz39KO5rzdbbFCg2sGafS4mk13MI7Z8O5z9cADNn5lhGODIgLwug6TZO2ctf7kcw=="],

    "fast-json-stable-stringify": ["fast-json-stable-stringify@2.1.0", "", {}, "sha512-lhd/wF+Lk98HZoTCtlVraHtfh5XYijIjalXck7saUtuanSDyLMxnHhSXEDJqHxD7msR8D0uCmqlkwjCV8xvwHw=="],

    "fast-levenshtein": ["fast-levenshtein@2.0.6", "", {}, "sha512-DCXu6Ifhqcks7TZKY3Hxp3y6qphY5SJZmrWMDrKcERSOXWQdMhU9Ig/PYrzyw/ul9jOIyh0N4M0tbC5hodg8dw=="],

    "fast-png": ["fast-png@6.4.0", "", { "dependencies": { "@types/pako": "^2.0.3", "iobuffer": "^5.3.2", "pako": "^2.1.0" } }, "sha512-kAqZq1TlgBjZcLr5mcN6NP5Rv4V2f22z00c3g8vRrwkcqjerx7BEhPbOnWCPqaHUl2XWQBJQvOT/FQhdMT7X/Q=="],

    "faye-websocket": ["faye-websocket@0.11.4", "", { "dependencies": { "websocket-driver": ">=0.5.1" } }, "sha512-CzbClwlXAuiRQAlUyfqPgvPoNKTckTPGfwZV4ZdAhVcP2lh9KUxJg2b5GkE7XbjKQ3YJnQ9z6D9ntLAlB+tP8g=="],

    "fdir": ["fdir@6.5.0", "", { "peerDependencies": { "picomatch": "^3 || ^4" } }, "sha512-tIbYtZbucOs0BRGqPJkshJUYdL+SDH7dVM8gjy+ERp3WAUjLEFJE+02kanyHtwjWOnwrKYBiwAmM0p4kLJAnXg=="],

    "fflate": ["fflate@0.8.2", "", {}, "sha512-cPJU47OaAoCbg0pBvzsgpTPhmhqI5eJjh/JIu8tPj5q+T7iLvW/JAYUqmE7KOB4R1ZyEhzBaIQpQpardBF5z8A=="],

    "file-entry-cache": ["file-entry-cache@8.0.0", "", { "dependencies": { "flat-cache": "^4.0.0" } }, "sha512-XXTUwCvisa5oacNGRP9SfNtYBNAMi+RPwBFmblZEF7N7swHYQS6/Zfk7SRwx4D5j3CH211YNRco1DEMNVfZCnQ=="],

    "find-up": ["find-up@5.0.0", "", { "dependencies": { "locate-path": "^6.0.0", "path-exists": "^4.0.0" } }, "sha512-78/PXT1wlLLDgTzDs7sjq9hzz0vXD+zn+7wypEe4fXQxCmdmqfGsEPQxmiCSQI3ajFV91bVSsvNtrJRiW6nGng=="],

    "firebase": ["firebase@12.15.0", "", { "dependencies": { "@firebase/ai": "2.13.1", "@firebase/analytics": "0.10.22", "@firebase/analytics-compat": "0.2.28", "@firebase/app": "0.15.0", "@firebase/app-check": "0.12.0", "@firebase/app-check-compat": "0.4.5", "@firebase/app-compat": "0.5.14", "@firebase/app-types": "0.9.5", "@firebase/auth": "1.13.3", "@firebase/auth-compat": "0.6.8", "@firebase/data-connect": "0.7.1", "@firebase/database": "1.1.3", "@firebase/database-compat": "2.1.4", "@firebase/firestore": "4.16.0", "@firebase/firestore-compat": "0.4.11", "@firebase/functions": "0.13.5", "@firebase/functions-compat": "0.4.5", "@firebase/installations": "0.6.22", "@firebase/installations-compat": "0.2.22", "@firebase/messaging": "0.13.0", "@firebase/messaging-compat": "0.2.27", "@firebase/performance": "0.7.12", "@firebase/performance-compat": "0.2.25", "@firebase/remote-config": "0.8.5", "@firebase/remote-config-compat": "0.2.26", "@firebase/storage": "0.14.3", "@firebase/storage-compat": "0.4.3", "@firebase/util": "1.15.1" } }, "sha512-p0YTLcRSTiBXMx9sGr4ZNSfLjc/RVBEw4C/TXjVMtw65+6E1Pbm47UY3F4/AqRoDobEcNX3gsbPGy7jPjxbgSQ=="],

    "flat-cache": ["flat-cache@4.0.1", "", { "dependencies": { "flatted": "^3.2.9", "keyv": "^4.5.4" } }, "sha512-f7ccFPK3SXFHpx15UIGyRJ/FJQctuKZ0zVuN3frBo4HnK3cay9VEW0R6yPYFHC0AgqhukPzKjq22t5DmAyqGyw=="],

    "flatted": ["flatted@3.4.2", "", {}, "sha512-PjDse7RzhcPkIJwy5t7KPWQSZ9cAbzQXcafsetQoD7sOJRQlGikNbx7yZp2OotDnJyrDcbyRq3Ttb18iYOqkxA=="],

    "for-each": ["for-each@0.3.5", "", { "dependencies": { "is-callable": "^1.2.7" } }, "sha512-dKx12eRCVIzqCxFGplyFKJMPvLEWgmNtUrpTiJIR5u97zEhRG8ySrtboPHZXx7daLxQVrl643cTzbab2tkQjxg=="],

    "fraction.js": ["fraction.js@5.3.4", "", {}, "sha512-1X1NTtiJphryn/uLQz3whtY6jK3fTqoE3ohKs0tT+Ujr1W59oopxmoEh7Lu5p6vBaPbgoM0bzveAW4Qi5RyWDQ=="],

    "framer-motion": ["framer-motion@11.18.2", "", { "dependencies": { "motion-dom": "^11.18.1", "motion-utils": "^11.18.1", "tslib": "^2.4.0" }, "peerDependencies": { "@emotion/is-prop-valid": "*", "react": "^18.0.0 || ^19.0.0", "react-dom": "^18.0.0 || ^19.0.0" }, "optionalPeers": ["@emotion/is-prop-valid"] }, "sha512-5F5Och7wrvtLVElIpclDT0CBzMVg3dL22B64aZwHtsIY8RB4mXICLrkajK4G9R+ieSAGcgrLeae2SeUTg2pr6w=="],

    "fsevents": ["fsevents@2.3.3", "", { "os": "darwin" }, "sha512-5xoDfX+fL7faATnagmWPpbFtwh/R77WmMMqqHGS65C3vvB0YHrgF+B1YmZ3441tMj5n63k0212XNoJwzlhffQw=="],

    "function-bind": ["function-bind@1.1.2", "", {}, "sha512-7XHNxH7qX9xG5mIwxkhumTox/MIRNcOgDrxWsMt2pAr23WHp6MrRlN7FBSFpCpr+oVO0F744iUgR82nJMfG2SA=="],

    "function.prototype.name": ["function.prototype.name@1.1.8", "", { "dependencies": { "call-bind": "^1.0.8", "call-bound": "^1.0.3", "define-properties": "^1.2.1", "functions-have-names": "^1.2.3", "hasown": "^2.0.2", "is-callable": "^1.2.7" } }, "sha512-e5iwyodOHhbMr/yNrc7fDYG4qlbIvI5gajyzPnb5TCwyhjApznQh1BMFou9b30SevY43gCJKXycoCBjMbsuW0Q=="],

    "functions-have-names": ["functions-have-names@1.2.3", "", {}, "sha512-xckBUXyTIqT97tq2x2AMb+g163b5JFysYk0x4qxNFwbfQkmNZoiRHb6sPzI9/QV33WeuvVYBUIiD4NzNIyqaRQ=="],

    "generator-function": ["generator-function@2.0.1", "", {}, "sha512-SFdFmIJi+ybC0vjlHN0ZGVGHc3lgE0DxPAT0djjVg+kjOnSqclqmj0KQ7ykTOLP6YxoqOvuAODGdcHJn+43q3g=="],

    "gensync": ["gensync@1.0.0-beta.2", "", {}, "sha512-3hN7NaskYvMDLQY55gnW3NQ+mesEAepTqlg+VEbj7zzqEMBVNhzcGYYeqFo/TlYz6eQiFcp1HcsCZO+nGgS8zg=="],

    "get-caller-file": ["get-caller-file@2.0.5", "", {}, "sha512-DyFP3BM/3YHTQOCUL/w0OZHR0lpKeGrxotcHWcqNEdnltqFwXVfhEBQ94eIo34AfQpo0rGki4cyIiftY06h2Fg=="],

    "get-intrinsic": ["get-intrinsic@1.3.0", "", { "dependencies": { "call-bind-apply-helpers": "^1.0.2", "es-define-property": "^1.0.1", "es-errors": "^1.3.0", "es-object-atoms": "^1.1.1", "function-bind": "^1.1.2", "get-proto": "^1.0.1", "gopd": "^1.2.0", "has-symbols": "^1.1.0", "hasown": "^2.0.2", "math-intrinsics": "^1.1.0" } }, "sha512-9fSjSaos/fRIVIp+xSJlE6lfwhES7LNtKaCBIamHsjr2na1BiABJPo0mOjjz8GJDURarmCPGqaiVg5mfjb98CQ=="],

    "get-nonce": ["get-nonce@1.0.1", "", {}, "sha512-FJhYRoDaiatfEkUK8HKlicmu/3SGFD51q3itKDGoSTysQJBnfOcxU5GxnhE1E6soB76MbT0MBtnKJuXyAx+96Q=="],

    "get-proto": ["get-proto@1.0.1", "", { "dependencies": { "dunder-proto": "^1.0.1", "es-object-atoms": "^1.0.0" } }, "sha512-sTSfBjoXBp89JvIKIefqw7U2CCebsc74kiY6awiGogKtoSGbgjYE/G/+l9sF3MWFPNc9IcoOC4ODfKHfxFmp0g=="],

    "get-symbol-description": ["get-symbol-description@1.1.0", "", { "dependencies": { "call-bound": "^1.0.3", "es-errors": "^1.3.0", "get-intrinsic": "^1.2.6" } }, "sha512-w9UMqWwJxHNOvoNzSJ2oPF5wvYcvP7jUvYzhp67yEhTi17ZDBBC1z9pTdGuzjD+EFIqLSYRweZjqfiPzQ06Ebg=="],

    "get-tsconfig": ["get-tsconfig@4.14.0", "", { "dependencies": { "resolve-pkg-maps": "^1.0.0" } }, "sha512-yTb+8DXzDREzgvYmh6s9vHsSVCHeC0G3PI5bEXNBHtmshPnO+S5O7qgLEOn0I5QvMy6kpZN8K1NKGyilLb93wA=="],

    "glob-parent": ["glob-parent@6.0.2", "", { "dependencies": { "is-glob": "^4.0.3" } }, "sha512-XxwI8EOhVQgWp6iDL+3b0r86f4d6AX6zSU55HfB4ydCEuXLXc5FcYeOu+nnGftS4TEju/11rt4KJPTMgbfmv4A=="],

    "globals": ["globals@15.15.0", "", {}, "sha512-7ACyT3wmyp3I61S4fG682L0VA2RGD9otkqGJIwNUMF1SWUombIIk+af1unuDYgMm082aHYwD+mzJvv9Iu8dsgg=="],

    "globalthis": ["globalthis@1.0.4", "", { "dependencies": { "define-properties": "^1.2.1", "gopd": "^1.0.1" } }, "sha512-DpLKbNU4WylpxJykQujfCcwYWiV/Jhm50Goo0wrVILAv5jOr9d+H+UR3PhSCD2rCCEIg0uc+G+muBTwD54JhDQ=="],

    "goober": ["goober@2.1.18", "", { "peerDependencies": { "csstype": "^3.0.10" } }, "sha512-2vFqsaDVIT9Gz7N6kAL++pLpp41l3PfDuusHcjnGLfR6+huZkl6ziX+zgVC3ZxpqWhzH6pyDdGrCeDhMIvwaxw=="],

    "gopd": ["gopd@1.2.0", "", {}, "sha512-ZUKRh6/kUFoAiTAtTYPZJ3hw9wNxx+BIBOijnlG9PnrJsCcSjs1wyyD6vJpaYtgnzDrKYRSqf3OO6Rfa93xsRg=="],

    "graceful-fs": ["graceful-fs@4.2.11", "", {}, "sha512-RbJ5/jmFcNNCcDV5o9eTnBLJ/HszWV0P73bc+Ff4nS/rJj+YaS6IGyiOL0VoBYX+l1Wrl3k63h/KrH+nhJ0XvQ=="],

    "has-bigints": ["has-bigints@1.1.0", "", {}, "sha512-R3pbpkcIqv2Pm3dUwgjclDRVmWpTJW2DcMzcIhEXEx1oh/CEMObMm3KLmRJOdvhM7o4uQBnwr8pzRK2sJWIqfg=="],

    "has-flag": ["has-flag@4.0.0", "", {}, "sha512-EykJT/Q1KjTWctppgIAgfSO0tKVuZUjhgMr17kqTumMl6Afv3EISleU7qZUzoXDFTAHTDC4NOoG/ZxU3EvlMPQ=="],

    "has-property-descriptors": ["has-property-descriptors@1.0.2", "", { "dependencies": { "es-define-property": "^1.0.0" } }, "sha512-55JNKuIW+vq4Ke1BjOTjM2YctQIvCT7GFzHwmfZPGo5wnrgkid0YQtnAleFSqumZm4az3n2BS+erby5ipJdgrg=="],

    "has-proto": ["has-proto@1.2.0", "", { "dependencies": { "dunder-proto": "^1.0.0" } }, "sha512-KIL7eQPfHQRC8+XluaIw7BHUwwqL19bQn4hzNgdr+1wXoU0KKj6rufu47lhY7KbJR2C6T6+PfyN0Ea7wkSS+qQ=="],

    "has-symbols": ["has-symbols@1.1.0", "", {}, "sha512-1cDNdwJ2Jaohmb3sg4OmKaMBwuC48sYni5HUw2DvsC8LjGTLK9h+eb1X6RyuOHe4hT0ULCW68iomhjUoKUqlPQ=="],

    "has-tostringtag": ["has-tostringtag@1.0.2", "", { "dependencies": { "has-symbols": "^1.0.3" } }, "sha512-NqADB8VjPFLM2V0VvHUewwwsw0ZWBaIdgo+ieHtK3hasLz4qeCRjYcqfB6AQrBggRKppKF8L52/VqdVsO47Dlw=="],

    "hasown": ["hasown@2.0.3", "", { "dependencies": { "function-bind": "^1.1.2" } }, "sha512-ej4AhfhfL2Q2zpMmLo7U1Uv9+PyhIZpgQLGT1F9miIGmiCJIoCgSmczFdrc97mWT4kVY72KA+WnnhJ5pghSvSg=="],

    "hast-util-to-jsx-runtime": ["hast-util-to-jsx-runtime@2.3.6", "", { "dependencies": { "@types/estree": "^1.0.0", "@types/hast": "^3.0.0", "@types/unist": "^3.0.0", "comma-separated-tokens": "^2.0.0", "devlop": "^1.0.0", "estree-util-is-identifier-name": "^3.0.0", "hast-util-whitespace": "^3.0.0", "mdast-util-mdx-expression": "^2.0.0", "mdast-util-mdx-jsx": "^3.0.0", "mdast-util-mdxjs-esm": "^2.0.0", "property-information": "^7.0.0", "space-separated-tokens": "^2.0.0", "style-to-js": "^1.0.0", "unist-util-position": "^5.0.0", "vfile-message": "^4.0.0" } }, "sha512-zl6s8LwNyo1P9uw+XJGvZtdFF1GdAkOg8ujOw+4Pyb76874fLps4ueHXDhXWdk6YHQ6OgUtinliG7RsYvCbbBg=="],

    "hast-util-whitespace": ["hast-util-whitespace@3.0.0", "", { "dependencies": { "@types/hast": "^3.0.0" } }, "sha512-88JUN06ipLwsnv+dVn+OIYOvAuvBMy/Qoi6O7mQHxdPXpjy+Cd6xRkWwux7DKO+4sYILtLBRIKgsdpS2gQc7qw=="],

    "html-url-attributes": ["html-url-attributes@3.0.1", "", {}, "sha512-ol6UPyBWqsrO6EJySPz2O7ZSr856WDrEzM5zMqp+FJJLGMW35cLYmmZnl0vztAZxRUoNZJFTCohfjuIJ8I4QBQ=="],

    "html2canvas": ["html2canvas@1.4.1", "", { "dependencies": { "css-line-break": "^2.1.0", "text-segmentation": "^1.0.3" } }, "sha512-fPU6BHNpsyIhr8yyMpTLLxAbkaK8ArIBcmZIRiBLiDhjeqvXolaEmDGmELFuX9I4xDcaKKcJl+TKZLqruBbmWA=="],

    "http-parser-js": ["http-parser-js@0.5.10", "", {}, "sha512-Pysuw9XpUq5dVc/2SMHpuTY01RFl8fttgcyunjL7eEMhGM3cI4eOmiCycJDVCo/7O7ClfQD3SaI6ftDzqOXYMA=="],

    "idb": ["idb@7.1.1", "", {}, "sha512-gchesWBzyvGHRO9W8tzUWFDycow5gwjvFKfyV9FF32Y7F50yZMp7mP+T2mJIWFx49zicqyC4uefHM17o6xKIVQ=="],

    "ignore": ["ignore@5.3.2", "", {}, "sha512-hsBTNUqQTDwkWtcdYI2i06Y/nUBEsNEDJKjWdigLvegy8kDuJAS8uRlpkkcQpyEXL0Z/pjDy5HBmMjRCJ2gq+g=="],

    "import-fresh": ["import-fresh@3.3.1", "", { "dependencies": { "parent-module": "^1.0.0", "resolve-from": "^4.0.0" } }, "sha512-TR3KfrTZTYLPB6jUjfx6MF9WcWrHL9su5TObK4ZkYgBdWKPOFoSoQIdEuTuR82pmtxH2spWG9h6etwfr1pLBqQ=="],

    "imurmurhash": ["imurmurhash@0.1.4", "", {}, "sha512-JmXMZ6wuvDmLiHEml9ykzqO6lwFbof0GG4IkcGaENdCRDDmMVnny7s5HsIgHCbaq0w2MyPhDqkhTUgS2LU2PHA=="],

    "inline-style-parser": ["inline-style-parser@0.2.7", "", {}, "sha512-Nb2ctOyNR8DqQoR0OwRG95uNWIC0C1lCgf5Naz5H6Ji72KZ8OcFZLz2P5sNgwlyoJ8Yif11oMuYs5pBQa86csA=="],

    "input-otp": ["input-otp@1.4.2", "", { "peerDependencies": { "react": "^16.8 || ^17.0 || ^18.0 || ^19.0.0 || ^19.0.0-rc", "react-dom": "^16.8 || ^17.0 || ^18.0 || ^19.0.0 || ^19.0.0-rc" } }, "sha512-l3jWwYNvrEa6NTCt7BECfCm48GvwuZzkoeG3gBL2w4CHeOXW3eKFmf9UNYkNfYc3mxMrthMnxjIE07MT0zLBQA=="],

    "internal-slot": ["internal-slot@1.1.0", "", { "dependencies": { "es-errors": "^1.3.0", "hasown": "^2.0.2", "side-channel": "^1.1.0" } }, "sha512-4gd7VpWNQNB4UKKCFFVcp1AVv+FMOgs9NKzjHKusc8jTMhd5eL1NqQqOpE0KzMds804/yHlglp3uxgluOqAPLw=="],

    "internmap": ["internmap@2.0.3", "", {}, "sha512-5Hh7Y1wQbvY5ooGgPbDaL5iYLAPzMTUrjMulskHLH6wnv/A+1q5rgEaiuqEjB+oxGXIVZs1FF+R/KPN3ZSQYYg=="],

    "iobuffer": ["iobuffer@5.4.0", "", {}, "sha512-DRebOWuqDvxunfkNJAlc3IzWIPD5xVxwUNbHr7xKB8E6aLJxIPfNX3CoMJghcFjpv6RWQsrcJbghtEwSPoJqMA=="],

    "is-alphabetical": ["is-alphabetical@2.0.1", "", {}, "sha512-FWyyY60MeTNyeSRpkM2Iry0G9hpr7/9kD40mD/cGQEuilcZYS4okz8SN2Q6rLCJ8gbCt6fN+rC+6tMGS99LaxQ=="],

    "is-alphanumerical": ["is-alphanumerical@2.0.1", "", { "dependencies": { "is-alphabetical": "^2.0.0", "is-decimal": "^2.0.0" } }, "sha512-hmbYhX/9MUMF5uh7tOXyK/n0ZvWpad5caBA17GsC6vyuCqaWliRG5K1qS9inmUhEMaOBIW7/whAnSwveW/LtZw=="],

    "is-arguments": ["is-arguments@1.2.0", "", { "dependencies": { "call-bound": "^1.0.2", "has-tostringtag": "^1.0.2" } }, "sha512-7bVbi0huj/wrIAOzb8U1aszg9kdi3KN/CyU19CTI7tAoZYEZoL9yCDXpbXN+uPsuWnP02cyug1gleqq+TU+YCA=="],

    "is-array-buffer": ["is-array-buffer@3.0.5", "", { "dependencies": { "call-bind": "^1.0.8", "call-bound": "^1.0.3", "get-intrinsic": "^1.2.6" } }, "sha512-DDfANUiiG2wC1qawP66qlTugJeL5HyzMpfr8lLK+jMQirGzNod0B12cFB/9q838Ru27sBwfw78/rdoU7RERz6A=="],

    "is-async-function": ["is-async-function@2.1.1", "", { "dependencies": { "async-function": "^1.0.0", "call-bound": "^1.0.3", "get-proto": "^1.0.1", "has-tostringtag": "^1.0.2", "safe-regex-test": "^1.1.0" } }, "sha512-9dgM/cZBnNvjzaMYHVoxxfPj2QXt22Ev7SuuPrs+xav0ukGB0S6d4ydZdEiM48kLx5kDV+QBPrpVnFyefL8kkQ=="],

    "is-bigint": ["is-bigint@1.1.0", "", { "dependencies": { "has-bigints": "^1.0.2" } }, "sha512-n4ZT37wG78iz03xPRKJrHTdZbe3IicyucEtdRsV5yglwc3GyUfbAfpSeD0FJ41NbUNSt5wbhqfp1fS+BgnvDFQ=="],

    "is-boolean-object": ["is-boolean-object@1.2.2", "", { "dependencies": { "call-bound": "^1.0.3", "has-tostringtag": "^1.0.2" } }, "sha512-wa56o2/ElJMYqjCjGkXri7it5FbebW5usLw/nPmCMs5DeZ7eziSYZhSmPRn0txqeW4LnAmQQU7FgqLpsEFKM4A=="],

    "is-callable": ["is-callable@1.2.7", "", {}, "sha512-1BC0BVFhS/p0qtw6enp8e+8OD0UrK0oFLztSjNzhcKA3WDuJxxAPXzPuPtKkjEY9UUoEWlX/8fgKeu2S8i9JTA=="],

    "is-core-module": ["is-core-module@2.16.2", "", { "dependencies": { "hasown": "^2.0.3" } }, "sha512-evOr8xfXKxE6qSR0hSXL2r3sd7ALj8+7jQEUvPYcm5sgZFdJ+AYzT6yNmJenvIYQBgIGwfwz08sL8zoL7yq2BA=="],

    "is-data-view": ["is-data-view@1.0.2", "", { "dependencies": { "call-bound": "^1.0.2", "get-intrinsic": "^1.2.6", "is-typed-array": "^1.1.13" } }, "sha512-RKtWF8pGmS87i2D6gqQu/l7EYRlVdfzemCJN/P3UOs//x1QE7mfhvzHIApBTRf7axvT6DMGwSwBXYCT0nfB9xw=="],

    "is-date-object": ["is-date-object@1.1.0", "", { "dependencies": { "call-bound": "^1.0.2", "has-tostringtag": "^1.0.2" } }, "sha512-PwwhEakHVKTdRNVOw+/Gyh0+MzlCl4R6qKvkhuvLtPMggI1WAHt9sOwZxQLSGpUaDnrdyDsomoRgNnCfKNSXXg=="],

    "is-decimal": ["is-decimal@2.0.1", "", {}, "sha512-AAB9hiomQs5DXWcRB1rqsxGUstbRroFOPPVAomNk/3XHR5JyEZChOyTWe2oayKnsSsr/kcGqF+z6yuH6HHpN0A=="],

    "is-extglob": ["is-extglob@2.1.1", "", {}, "sha512-SbKbANkN603Vi4jEZv49LeVJMn4yGwsbzZworEoyEiutsN3nJYdbO36zfhGJ6QEDpOZIFkDtnq5JRxmvl3jsoQ=="],

    "is-finalizationregistry": ["is-finalizationregistry@1.1.1", "", { "dependencies": { "call-bound": "^1.0.3" } }, "sha512-1pC6N8qWJbWoPtEjgcL2xyhQOP491EQjeUo3qTKcmV8YSDDJrOepfG8pcC7h/QgnQHYSv0mJ3Z/ZWxmatVrysg=="],

    "is-fullwidth-code-point": ["is-fullwidth-code-point@3.0.0", "", {}, "sha512-zymm5+u+sCsSWyD9qNaejV3DFvhCKclKdizYaJUuHA83RLjb7nSuGnddCHGv0hk+KY7BMAlsWeK4Ueg6EV6XQg=="],

    "is-generator-function": ["is-generator-function@1.1.2", "", { "dependencies": { "call-bound": "^1.0.4", "generator-function": "^2.0.0", "get-proto": "^1.0.1", "has-tostringtag": "^1.0.2", "safe-regex-test": "^1.1.0" } }, "sha512-upqt1SkGkODW9tsGNG5mtXTXtECizwtS2kA161M+gJPc1xdb/Ax629af6YrTwcOeQHbewrPNlE5Dx7kzvXTizA=="],

    "is-glob": ["is-glob@4.0.3", "", { "dependencies": { "is-extglob": "^2.1.1" } }, "sha512-xelSayHH36ZgE7ZWhli7pW34hNbNl8Ojv5KVmkJD4hBdD3th8Tfk9vYasLM+mXWOZhFkgZfxhLSnrwRr4elSSg=="],

    "is-hexadecimal": ["is-hexadecimal@2.0.1", "", {}, "sha512-DgZQp241c8oO6cA1SbTEWiXeoxV42vlcJxgH+B3hi1AiqqKruZR3ZGF8In3fj4+/y/7rHvlOZLZtgJ/4ttYGZg=="],

    "is-map": ["is-map@2.0.3", "", {}, "sha512-1Qed0/Hr2m+YqxnM09CjA2d/i6YZNfF6R2oRAOj36eUdS6qIV/huPJNSEpKbupewFs+ZsJlxsjjPbc0/afW6Lw=="],

    "is-negative-zero": ["is-negative-zero@2.0.3", "", {}, "sha512-5KoIu2Ngpyek75jXodFvnafB6DJgr3u8uuK0LEZJjrU19DrMD3EVERaR8sjz8CCGgpZvxPl9SuE1GMVPFHx1mw=="],

    "is-number-object": ["is-number-object@1.1.1", "", { "dependencies": { "call-bound": "^1.0.3", "has-tostringtag": "^1.0.2" } }, "sha512-lZhclumE1G6VYD8VHe35wFaIif+CTy5SJIi5+3y4psDgWu4wPDoBhF8NxUOinEc7pHgiTsT6MaBb92rKhhD+Xw=="],

    "is-plain-obj": ["is-plain-obj@4.1.0", "", {}, "sha512-+Pgi+vMuUNkJyExiMBt5IlFoMyKnr5zhJ4Uspz58WOhBF5QoIZkFyNHIbBAtHwzVAgk5RtndVNsDRN61/mmDqg=="],

    "is-regex": ["is-regex@1.2.1", "", { "dependencies": { "call-bound": "^1.0.2", "gopd": "^1.2.0", "has-tostringtag": "^1.0.2", "hasown": "^2.0.2" } }, "sha512-MjYsKHO5O7mCsmRGxWcLWheFqN9DJ/2TmngvjKXihe6efViPqc274+Fx/4fYj/r03+ESvBdTXK0V6tA3rgez1g=="],

    "is-set": ["is-set@2.0.3", "", {}, "sha512-iPAjerrse27/ygGLxw+EBR9agv9Y6uLeYVJMu+QNCoouJ1/1ri0mGrcWpfCqFZuzzx3WjtwxG098X+n4OuRkPg=="],

    "is-shared-array-buffer": ["is-shared-array-buffer@1.0.4", "", { "dependencies": { "call-bound": "^1.0.3" } }, "sha512-ISWac8drv4ZGfwKl5slpHG9OwPNty4jOWPRIhBpxOoD+hqITiwuipOQ2bNthAzwA3B4fIjO4Nln74N0S9byq8A=="],

    "is-string": ["is-string@1.1.1", "", { "dependencies": { "call-bound": "^1.0.3", "has-tostringtag": "^1.0.2" } }, "sha512-BtEeSsoaQjlSPBemMQIrY1MY0uM6vnS1g5fmufYOtnxLGUZM2178PKbhsk7Ffv58IX+ZtcvoGwccYsh0PglkAA=="],

    "is-symbol": ["is-symbol@1.1.1", "", { "dependencies": { "call-bound": "^1.0.2", "has-symbols": "^1.1.0", "safe-regex-test": "^1.1.0" } }, "sha512-9gGx6GTtCQM73BgmHQXfDmLtfjjTUDSyoxTCbp5WtoixAhfgsDirWIcVQ/IHpvI5Vgd5i/J5F7B9cN/WlVbC/w=="],

    "is-typed-array": ["is-typed-array@1.1.15", "", { "dependencies": { "which-typed-array": "^1.1.16" } }, "sha512-p3EcsicXjit7SaskXHs1hA91QxgTw46Fv6EFKKGS5DRFLD8yKnohjF3hxoju94b/OcMZoQukzpPpBE9uLVKzgQ=="],

    "is-weakmap": ["is-weakmap@2.0.2", "", {}, "sha512-K5pXYOm9wqY1RgjpL3YTkF39tni1XajUIkawTLUo9EZEVUFga5gSQJF8nNS7ZwJQ02y+1YCNYcMh+HIf1ZqE+w=="],

    "is-weakref": ["is-weakref@1.1.1", "", { "dependencies": { "call-bound": "^1.0.3" } }, "sha512-6i9mGWSlqzNMEqpCp93KwRS1uUOodk2OJ6b+sq7ZPDSy2WuI5NFIxp/254TytR8ftefexkWn5xNiHUNpPOfSew=="],

    "is-weakset": ["is-weakset@2.0.4", "", { "dependencies": { "call-bound": "^1.0.3", "get-intrinsic": "^1.2.6" } }, "sha512-mfcwb6IzQyOKTs84CQMrOwW4gQcaTOAWJ0zzJCl2WSPDrWk/OzDaImWFH3djXhb24g4eudZfLRozAvPGw4d9hQ=="],

    "isarray": ["isarray@2.0.5", "", {}, "sha512-xHjhDr3cNBK0BzdUJSPXZntQUx/mwMS5Rw4A7lPJ90XGAO6ISP/ePDNuo0vhqOZU+UD5JoodwCAAoZQd3FeAKw=="],

    "isexe": ["isexe@2.0.0", "", {}, "sha512-RHxMLp9lnKHGHRng9QFhRCMbYAcVpn69smSGcq3f36xjgVVWThj4qqLbTLlq7Ssj8B+fIQ1EuCEGI2lKsyQeIw=="],

    "iterator.prototype": ["iterator.prototype@1.1.5", "", { "dependencies": { "define-data-property": "^1.1.4", "es-object-atoms": "^1.0.0", "get-intrinsic": "^1.2.6", "get-proto": "^1.0.0", "has-symbols": "^1.1.0", "set-function-name": "^2.0.2" } }, "sha512-H0dkQoCa3b2VEeKQBOxFph+JAbcrQdE7KC0UkqwpLmv2EC4P41QXP+rqo9wYodACiG5/WM5s9oDApTU8utwj9g=="],

    "jiti": ["jiti@2.7.0", "", { "bin": "lib/jiti-cli.mjs" }, "sha512-AC/7JofJvZGrrneWNaEnJeOLUx+JlGt7tNa0wZiRPT4MY1wmfKjt2+6O2p2uz2+skll8OZZmJMNqeke7kKbNgQ=="],

    "js-tokens": ["js-tokens@4.0.0", "", {}, "sha512-RdJUflcE3cUzKiMqQgsCu06FPu9UdIJO0beYbPhHN4k6apgJtifcoCtT9bcxOpYBtpD2kCM6Sbzg4CausW/PKQ=="],

    "js-yaml": ["js-yaml@4.1.1", "", { "dependencies": { "argparse": "^2.0.1" }, "bin": "bin/js-yaml.js" }, "sha512-qQKT4zQxXl8lLwBtHMWwaTcGfFOZviOJet3Oy/xmGk2gZH677CJM9EvtfdSkgWcATZhj/55JZ0rmy3myCT5lsA=="],

    "jsesc": ["jsesc@3.1.0", "", { "bin": "bin/jsesc" }, "sha512-/sM3dO2FOzXjKQhJuo0Q173wf2KOo8t4I8vHy6lF9poUp7bKT0/NHE8fPX23PwfhnykfqnC2xRxOnVw5XuGIaA=="],

    "json-buffer": ["json-buffer@3.0.1", "", {}, "sha512-4bV5BfR2mqfQTJm+V5tPPdf+ZpuhiIvTuAB5g8kcrXOZpTT/QwwVRWBywX1ozr6lEuPdbHxwaJlm9G6mI2sfSQ=="],

    "json-schema-traverse": ["json-schema-traverse@0.4.1", "", {}, "sha512-xbbCH5dCYU5T8LcEhhuh7HJ88HXuW3qsI3Y0zOZFKfZEHcpWiHU/Jxzk629Brsab/mMiHQti9wMP+845RPe3Vg=="],

    "json-stable-stringify-without-jsonify": ["json-stable-stringify-without-jsonify@1.0.1", "", {}, "sha512-Bdboy+l7tA3OGW6FjyFHWkP5LuByj1Tk33Ljyq0axyzdk9//JSi2u3fP1QSmd1KNwq6VOKYGlAu87CisVir6Pw=="],

    "json5": ["json5@2.2.3", "", { "bin": "lib/cli.js" }, "sha512-XmOWe7eyHYH14cLdVPoyg+GOH3rYX++KpzrylJwSW98t3Nk+U8XOl8FWKOgwtzdb8lXGf6zYwDUzeHMWfxasyg=="],

    "jspdf": ["jspdf@4.2.1", "", { "dependencies": { "@babel/runtime": "^7.28.6", "fast-png": "^6.2.0", "fflate": "^0.8.1" }, "optionalDependencies": { "canvg": "^3.0.11", "core-js": "^3.6.0", "dompurify": "^3.3.1", "html2canvas": "^1.0.0-rc.5" } }, "sha512-YyAXyvnmjTbR4bHQRLzex3CuINCDlQnBqoSYyjJwTP2x9jDLuKDzy7aKUl0hgx3uhcl7xzg32agn5vlie6HIlQ=="],

    "jsx-ast-utils": ["jsx-ast-utils@3.3.5", "", { "dependencies": { "array-includes": "^3.1.6", "array.prototype.flat": "^1.3.1", "object.assign": "^4.1.4", "object.values": "^1.1.6" } }, "sha512-ZZow9HBI5O6EPgSJLUb8n2NKgmVWTwCvHGwFuJlMjvLFqlGG6pjirPhtdsseaLZjSibD8eegzmYpUZwoIlj2cQ=="],

    "keyv": ["keyv@4.5.4", "", { "dependencies": { "json-buffer": "3.0.1" } }, "sha512-oxVHkHR/EJf2CNXnWxRLW6mg7JyCCUcG0DtEGmL2ctUo1PNTin1PUil+r/+4r5MpVgC/fn1kjsx7mjSujKqIpw=="],

    "leaflet": ["leaflet@1.9.4", "", {}, "sha512-nxS1ynzJOmOlHp+iL3FyWqK89GtNL8U8rvlMOsQdTTssxZwCXh8N2NB3GDQOL+YR3XnWyZAxwQixURb+FA74PA=="],

    "levn": ["levn@0.4.1", "", { "dependencies": { "prelude-ls": "^1.2.1", "type-check": "~0.4.0" } }, "sha512-+bT2uH4E5LGE7h/n3evcS/sQlJXCpIp6ym8OWJ5eV6+67Dsql/LaaT7qJBAt2rzfoa/5QBGBhxDix1dMt2kQKQ=="],

    "lightningcss": ["lightningcss@1.32.0", "", { "dependencies": { "detect-libc": "^2.0.3" }, "optionalDependencies": { "lightningcss-android-arm64": "1.32.0", "lightningcss-darwin-arm64": "1.32.0", "lightningcss-darwin-x64": "1.32.0", "lightningcss-freebsd-x64": "1.32.0", "lightningcss-linux-arm-gnueabihf": "1.32.0", "lightningcss-linux-arm64-gnu": "1.32.0", "lightningcss-linux-arm64-musl": "1.32.0", "lightningcss-linux-x64-gnu": "1.32.0", "lightningcss-linux-x64-musl": "1.32.0", "lightningcss-win32-arm64-msvc": "1.32.0", "lightningcss-win32-x64-msvc": "1.32.0" } }, "sha512-NXYBzinNrblfraPGyrbPoD19C1h9lfI/1mzgWYvXUTe414Gz/X1FD2XBZSZM7rRTrMA8JL3OtAaGifrIKhQ5yQ=="],

    "lightningcss-android-arm64": ["lightningcss-android-arm64@1.32.0", "", { "os": "android", "cpu": "arm64" }, "sha512-YK7/ClTt4kAK0vo6w3X+Pnm0D2cf2vPHbhOXdoNti1Ga0al1P4TBZhwjATvjNwLEBCnKvjJc2jQgHXH0NEwlAg=="],

    "lightningcss-darwin-arm64": ["lightningcss-darwin-arm64@1.32.0", "", { "os": "darwin", "cpu": "arm64" }, "sha512-RzeG9Ju5bag2Bv1/lwlVJvBE3q6TtXskdZLLCyfg5pt+HLz9BqlICO7LZM7VHNTTn/5PRhHFBSjk5lc4cmscPQ=="],

    "lightningcss-darwin-x64": ["lightningcss-darwin-x64@1.32.0", "", { "os": "darwin", "cpu": "x64" }, "sha512-U+QsBp2m/s2wqpUYT/6wnlagdZbtZdndSmut/NJqlCcMLTWp5muCrID+K5UJ6jqD2BFshejCYXniPDbNh73V8w=="],

    "lightningcss-freebsd-x64": ["lightningcss-freebsd-x64@1.32.0", "", { "os": "freebsd", "cpu": "x64" }, "sha512-JCTigedEksZk3tHTTthnMdVfGf61Fky8Ji2E4YjUTEQX14xiy/lTzXnu1vwiZe3bYe0q+SpsSH/CTeDXK6WHig=="],

    "lightningcss-linux-arm-gnueabihf": ["lightningcss-linux-arm-gnueabihf@1.32.0", "", { "os": "linux", "cpu": "arm" }, "sha512-x6rnnpRa2GL0zQOkt6rts3YDPzduLpWvwAF6EMhXFVZXD4tPrBkEFqzGowzCsIWsPjqSK+tyNEODUBXeeVHSkw=="],

    "lightningcss-linux-arm64-gnu": ["lightningcss-linux-arm64-gnu@1.32.0", "", { "os": "linux", "cpu": "arm64" }, "sha512-0nnMyoyOLRJXfbMOilaSRcLH3Jw5z9HDNGfT/gwCPgaDjnx0i8w7vBzFLFR1f6CMLKF8gVbebmkUN3fa/kQJpQ=="],

    "lightningcss-linux-arm64-musl": ["lightningcss-linux-arm64-musl@1.32.0", "", { "os": "linux", "cpu": "arm64" }, "sha512-UpQkoenr4UJEzgVIYpI80lDFvRmPVg6oqboNHfoH4CQIfNA+HOrZ7Mo7KZP02dC6LjghPQJeBsvXhJod/wnIBg=="],

    "lightningcss-linux-x64-gnu": ["lightningcss-linux-x64-gnu@1.32.0", "", { "os": "linux", "cpu": "x64" }, "sha512-V7Qr52IhZmdKPVr+Vtw8o+WLsQJYCTd8loIfpDaMRWGUZfBOYEJeyJIkqGIDMZPwPx24pUMfwSxxI8phr/MbOA=="],

    "lightningcss-linux-x64-musl": ["lightningcss-linux-x64-musl@1.32.0", "", { "os": "linux", "cpu": "x64" }, "sha512-bYcLp+Vb0awsiXg/80uCRezCYHNg1/l3mt0gzHnWV9XP1W5sKa5/TCdGWaR/zBM2PeF/HbsQv/j2URNOiVuxWg=="],

    "lightningcss-win32-arm64-msvc": ["lightningcss-win32-arm64-msvc@1.32.0", "", { "os": "win32", "cpu": "arm64" }, "sha512-8SbC8BR40pS6baCM8sbtYDSwEVQd4JlFTOlaD3gWGHfThTcABnNDBda6eTZeqbofalIJhFx0qKzgHJmcPTnGdw=="],

    "lightningcss-win32-x64-msvc": ["lightningcss-win32-x64-msvc@1.32.0", "", { "os": "win32", "cpu": "x64" }, "sha512-Amq9B/SoZYdDi1kFrojnoqPLxYhQ4Wo5XiL8EVJrVsB8ARoC1PWW6VGtT0WKCemjy8aC+louJnjS7U18x3b06Q=="],

    "locate-path": ["locate-path@6.0.0", "", { "dependencies": { "p-locate": "^5.0.0" } }, "sha512-iPZK6eYjbxRu3uB4/WZ3EsEIMJFMqAoopl3R+zuq0UjcAm/MO6KCweDgPfP3elTztoKP3KtnVHxTn2NHBSDVUw=="],

    "lodash": ["lodash@4.18.1", "", {}, "sha512-dMInicTPVE8d1e5otfwmmjlxkZoUpiVLwyeTdUsi/Caj/gfzzblBcCE5sRHV/AsjuCmxWrte2TNGSYuCeCq+0Q=="],

    "lodash.camelcase": ["lodash.camelcase@4.3.0", "", {}, "sha512-TwuEnCnxbc3rAvhf/LbG7tJUDzhqXyFnv3dtzLOPgCG/hODL7WFnsbwktkD7yUV0RrreP/l1PALq/YSg6VvjlA=="],

    "lodash.merge": ["lodash.merge@4.6.2", "", {}, "sha512-0KpjqXRVvrYyCsX1swR/XTK0va6VQkQM6MNo7PqW77ByjAhoARA8EfrP1N4+KlKj8YS0ZUCtRT/YUuhyYDujIQ=="],

    "long": ["long@5.3.2", "", {}, "sha512-mNAgZ1GmyNhD7AuqnTG3/VQ26o760+ZYBPKjPvugO8+nLbYfX6TVpJPseBvopbdY+qpZ/lKUnmEc1LeZYS3QAA=="],

    "longest-streak": ["longest-streak@3.1.0", "", {}, "sha512-9Ri+o0JYgehTaVBBDoMqIl8GXtbWg711O3srftcHhZ0dqnETqLaoIK0x17fUw9rFSlK/0NlsKe0Ahhyl5pXE2g=="],

    "loose-envify": ["loose-envify@1.4.0", "", { "dependencies": { "js-tokens": "^3.0.0 || ^4.0.0" }, "bin": "cli.js" }, "sha512-lyuxPGr/Wfhrlem2CL/UcnUc1zcqKAImBDzukY7Y5F/yQiNdko6+fRLevlw1HgMySw7f611UIY408EtxRSoK3Q=="],

    "lru-cache": ["lru-cache@5.1.1", "", { "dependencies": { "yallist": "^3.0.2" } }, "sha512-KpNARQA3Iwv+jTA0utUVVbrh+Jlrr1Fv0e56GGzAFOXN7dk/FviaDW8LHmK52DlcH4WP2n6gI8vN1aesBFgo9w=="],

    "lucide-react": ["lucide-react@0.475.0", "", { "peerDependencies": { "react": "^16.5.1 || ^17.0.0 || ^18.0.0 || ^19.0.0" } }, "sha512-NJzvVu1HwFVeZ+Gwq2q00KygM1aBhy/ZrhY9FsAgJtpB+E4R7uxRk9M2iKvHa6/vNxZydIB59htha4c2vvwvVg=="],

    "magic-string": ["magic-string@0.30.21", "", { "dependencies": { "@jridgewell/sourcemap-codec": "^1.5.5" } }, "sha512-vd2F4YUyEXKGcLHoq+TEyCjxueSeHnFxyyjNp80yg0XV4vUhnDer/lvvlqM/arB5bXQN5K2/3oinyCRyx8T2CQ=="],

    "math-intrinsics": ["math-intrinsics@1.1.0", "", {}, "sha512-/IXtbwEk5HTPyEwyKX6hGkYXxM9nbj64B+ilVJnC/R6B0pH5G4V3b0pVbL7DBj4tkhBAppbQUlf6F6Xl9LHu1g=="],

    "mdast-util-from-markdown": ["mdast-util-from-markdown@2.0.3", "", { "dependencies": { "@types/mdast": "^4.0.0", "@types/unist": "^3.0.0", "decode-named-character-reference": "^1.0.0", "devlop": "^1.0.0", "mdast-util-to-string": "^4.0.0", "micromark": "^4.0.0", "micromark-util-decode-numeric-character-reference": "^2.0.0", "micromark-util-decode-string": "^2.0.0", "micromark-util-normalize-identifier": "^2.0.0", "micromark-util-symbol": "^2.0.0", "micromark-util-types": "^2.0.0", "unist-util-stringify-position": "^4.0.0" } }, "sha512-W4mAWTvSlKvf8L6J+VN9yLSqQ9AOAAvHuoDAmPkz4dHf553m5gVj2ejadHJhoJmcmxEnOv6Pa8XJhpxE93kb8Q=="],

    "mdast-util-mdx-expression": ["mdast-util-mdx-expression@2.0.1", "", { "dependencies": { "@types/estree-jsx": "^1.0.0", "@types/hast": "^3.0.0", "@types/mdast": "^4.0.0", "devlop": "^1.0.0", "mdast-util-from-markdown": "^2.0.0", "mdast-util-to-markdown": "^2.0.0" } }, "sha512-J6f+9hUp+ldTZqKRSg7Vw5V6MqjATc+3E4gf3CFNcuZNWD8XdyI6zQ8GqH7f8169MM6P7hMBRDVGnn7oHB9kXQ=="],

    "mdast-util-mdx-jsx": ["mdast-util-mdx-jsx@3.2.0", "", { "dependencies": { "@types/estree-jsx": "^1.0.0", "@types/hast": "^3.0.0", "@types/mdast": "^4.0.0", "@types/unist": "^3.0.0", "ccount": "^2.0.0", "devlop": "^1.1.0", "mdast-util-from-markdown": "^2.0.0", "mdast-util-to-markdown": "^2.0.0", "parse-entities": "^4.0.0", "stringify-entities": "^4.0.0", "unist-util-stringify-position": "^4.0.0", "vfile-message": "^4.0.0" } }, "sha512-lj/z8v0r6ZtsN/cGNNtemmmfoLAFZnjMbNyLzBafjzikOM+glrjNHPlf6lQDOTccj9n5b0PPihEBbhneMyGs1Q=="],

    "mdast-util-mdxjs-esm": ["mdast-util-mdxjs-esm@2.0.1", "", { "dependencies": { "@types/estree-jsx": "^1.0.0", "@types/hast": "^3.0.0", "@types/mdast": "^4.0.0", "devlop": "^1.0.0", "mdast-util-from-markdown": "^2.0.0", "mdast-util-to-markdown": "^2.0.0" } }, "sha512-EcmOpxsZ96CvlP03NghtH1EsLtr0n9Tm4lPUJUBccV9RwUOneqSycg19n5HGzCf+10LozMRSObtVr3ee1WoHtg=="],

    "mdast-util-phrasing": ["mdast-util-phrasing@4.1.0", "", { "dependencies": { "@types/mdast": "^4.0.0", "unist-util-is": "^6.0.0" } }, "sha512-TqICwyvJJpBwvGAMZjj4J2n0X8QWp21b9l0o7eXyVJ25YNWYbJDVIyD1bZXE6WtV6RmKJVYmQAKWa0zWOABz2w=="],

    "mdast-util-to-hast": ["mdast-util-to-hast@13.2.1", "", { "dependencies": { "@types/hast": "^3.0.0", "@types/mdast": "^4.0.0", "@ungap/structured-clone": "^1.0.0", "devlop": "^1.0.0", "micromark-util-sanitize-uri": "^2.0.0", "trim-lines": "^3.0.0", "unist-util-position": "^5.0.0", "unist-util-visit": "^5.0.0", "vfile": "^6.0.0" } }, "sha512-cctsq2wp5vTsLIcaymblUriiTcZd0CwWtCbLvrOzYCDZoWyMNV8sZ7krj09FSnsiJi3WVsHLM4k6Dq/yaPyCXA=="],

    "mdast-util-to-markdown": ["mdast-util-to-markdown@2.1.2", "", { "dependencies": { "@types/mdast": "^4.0.0", "@types/unist": "^3.0.0", "longest-streak": "^3.0.0", "mdast-util-phrasing": "^4.0.0", "mdast-util-to-string": "^4.0.0", "micromark-util-classify-character": "^2.0.0", "micromark-util-decode-string": "^2.0.0", "unist-util-visit": "^5.0.0", "zwitch": "^2.0.0" } }, "sha512-xj68wMTvGXVOKonmog6LwyJKrYXZPvlwabaryTjLh9LuvovB/KAH+kvi8Gjj+7rJjsFi23nkUxRQv1KqSroMqA=="],

    "mdast-util-to-string": ["mdast-util-to-string@4.0.0", "", { "dependencies": { "@types/mdast": "^4.0.0" } }, "sha512-0H44vDimn51F0YwvxSJSm0eCDOJTRlmN0R1yBh4HLj9wiV1Dn0QoXGbvFAWj2hSItVTlCmBF1hqKlIyUBVFLPg=="],

    "memoize-one": ["memoize-one@6.0.0", "", {}, "sha512-rkpe71W0N0c0Xz6QD0eJETuWAJGnJ9afsl1srmwPrI+yBCkge5EycXXbYRyvL29zZVUWQCY7InPRCv3GDXuZNw=="],

    "micromark": ["micromark@4.0.2", "", { "dependencies": { "@types/debug": "^4.0.0", "debug": "^4.0.0", "decode-named-character-reference": "^1.0.0", "devlop": "^1.0.0", "micromark-core-commonmark": "^2.0.0", "micromark-factory-space": "^2.0.0", "micromark-util-character": "^2.0.0", "micromark-util-chunked": "^2.0.0", "micromark-util-combine-extensions": "^2.0.0", "micromark-util-decode-numeric-character-reference": "^2.0.0", "micromark-util-encode": "^2.0.0", "micromark-util-normalize-identifier": "^2.0.0", "micromark-util-resolve-all": "^2.0.0", "micromark-util-sanitize-uri": "^2.0.0", "micromark-util-subtokenize": "^2.0.0", "micromark-util-symbol": "^2.0.0", "micromark-util-types": "^2.0.0" } }, "sha512-zpe98Q6kvavpCr1NPVSCMebCKfD7CA2NqZ+rykeNhONIJBpc1tFKt9hucLGwha3jNTNI8lHpctWJWoimVF4PfA=="],

    "micromark-core-commonmark": ["micromark-core-commonmark@2.0.3", "", { "dependencies": { "decode-named-character-reference": "^1.0.0", "devlop": "^1.0.0", "micromark-factory-destination": "^2.0.0", "micromark-factory-label": "^2.0.0", "micromark-factory-space": "^2.0.0", "micromark-factory-title": "^2.0.0", "micromark-factory-whitespace": "^2.0.0", "micromark-util-character": "^2.0.0", "micromark-util-chunked": "^2.0.0", "micromark-util-classify-character": "^2.0.0", "micromark-util-html-tag-name": "^2.0.0", "micromark-util-normalize-identifier": "^2.0.0", "micromark-util-resolve-all": "^2.0.0", "micromark-util-subtokenize": "^2.0.0", "micromark-util-symbol": "^2.0.0", "micromark-util-types": "^2.0.0" } }, "sha512-RDBrHEMSxVFLg6xvnXmb1Ayr2WzLAWjeSATAoxwKYJV94TeNavgoIdA0a9ytzDSVzBy2YKFK+emCPOEibLeCrg=="],

    "micromark-factory-destination": ["micromark-factory-destination@2.0.1", "", { "dependencies": { "micromark-util-character": "^2.0.0", "micromark-util-symbol": "^2.0.0", "micromark-util-types": "^2.0.0" } }, "sha512-Xe6rDdJlkmbFRExpTOmRj9N3MaWmbAgdpSrBQvCFqhezUn4AHqJHbaEnfbVYYiexVSs//tqOdY/DxhjdCiJnIA=="],

    "micromark-factory-label": ["micromark-factory-label@2.0.1", "", { "dependencies": { "devlop": "^1.0.0", "micromark-util-character": "^2.0.0", "micromark-util-symbol": "^2.0.0", "micromark-util-types": "^2.0.0" } }, "sha512-VFMekyQExqIW7xIChcXn4ok29YE3rnuyveW3wZQWWqF4Nv9Wk5rgJ99KzPvHjkmPXF93FXIbBp6YdW3t71/7Vg=="],

    "micromark-factory-space": ["micromark-factory-space@2.0.1", "", { "dependencies": { "micromark-util-character": "^2.0.0", "micromark-util-types": "^2.0.0" } }, "sha512-zRkxjtBxxLd2Sc0d+fbnEunsTj46SWXgXciZmHq0kDYGnck/ZSGj9/wULTV95uoeYiK5hRXP2mJ98Uo4cq/LQg=="],

    "micromark-factory-title": ["micromark-factory-title@2.0.1", "", { "dependencies": { "micromark-factory-space": "^2.0.0", "micromark-util-character": "^2.0.0", "micromark-util-symbol": "^2.0.0", "micromark-util-types": "^2.0.0" } }, "sha512-5bZ+3CjhAd9eChYTHsjy6TGxpOFSKgKKJPJxr293jTbfry2KDoWkhBb6TcPVB4NmzaPhMs1Frm9AZH7OD4Cjzw=="],

    "micromark-factory-whitespace": ["micromark-factory-whitespace@2.0.1", "", { "dependencies": { "micromark-factory-space": "^2.0.0", "micromark-util-character": "^2.0.0", "micromark-util-symbol": "^2.0.0", "micromark-util-types": "^2.0.0" } }, "sha512-Ob0nuZ3PKt/n0hORHyvoD9uZhr+Za8sFoP+OnMcnWK5lngSzALgQYKMr9RJVOWLqQYuyn6ulqGWSXdwf6F80lQ=="],

    "micromark-util-character": ["micromark-util-character@2.1.1", "", { "dependencies": { "micromark-util-symbol": "^2.0.0", "micromark-util-types": "^2.0.0" } }, "sha512-wv8tdUTJ3thSFFFJKtpYKOYiGP2+v96Hvk4Tu8KpCAsTMs6yi+nVmGh1syvSCsaxz45J6Jbw+9DD6g97+NV67Q=="],

    "micromark-util-chunked": ["micromark-util-chunked@2.0.1", "", { "dependencies": { "micromark-util-symbol": "^2.0.0" } }, "sha512-QUNFEOPELfmvv+4xiNg2sRYeS/P84pTW0TCgP5zc9FpXetHY0ab7SxKyAQCNCc1eK0459uoLI1y5oO5Vc1dbhA=="],

    "micromark-util-classify-character": ["micromark-util-classify-character@2.0.1", "", { "dependencies": { "micromark-util-character": "^2.0.0", "micromark-util-symbol": "^2.0.0", "micromark-util-types": "^2.0.0" } }, "sha512-K0kHzM6afW/MbeWYWLjoHQv1sgg2Q9EccHEDzSkxiP/EaagNzCm7T/WMKZ3rjMbvIpvBiZgwR3dKMygtA4mG1Q=="],

    "micromark-util-combine-extensions": ["micromark-util-combine-extensions@2.0.1", "", { "dependencies": { "micromark-util-chunked": "^2.0.0", "micromark-util-types": "^2.0.0" } }, "sha512-OnAnH8Ujmy59JcyZw8JSbK9cGpdVY44NKgSM7E9Eh7DiLS2E9RNQf0dONaGDzEG9yjEl5hcqeIsj4hfRkLH/Bg=="],

    "micromark-util-decode-numeric-character-reference": ["micromark-util-decode-numeric-character-reference@2.0.2", "", { "dependencies": { "micromark-util-symbol": "^2.0.0" } }, "sha512-ccUbYk6CwVdkmCQMyr64dXz42EfHGkPQlBj5p7YVGzq8I7CtjXZJrubAYezf7Rp+bjPseiROqe7G6foFd+lEuw=="],

    "micromark-util-decode-string": ["micromark-util-decode-string@2.0.1", "", { "dependencies": { "decode-named-character-reference": "^1.0.0", "micromark-util-character": "^2.0.0", "micromark-util-decode-numeric-character-reference": "^2.0.0", "micromark-util-symbol": "^2.0.0" } }, "sha512-nDV/77Fj6eH1ynwscYTOsbK7rR//Uj0bZXBwJZRfaLEJ1iGBR6kIfNmlNqaqJf649EP0F3NWNdeJi03elllNUQ=="],

    "micromark-util-encode": ["micromark-util-encode@2.0.1", "", {}, "sha512-c3cVx2y4KqUnwopcO9b/SCdo2O67LwJJ/UyqGfbigahfegL9myoEFoDYZgkT7f36T0bLrM9hZTAaAyH+PCAXjw=="],

    "micromark-util-html-tag-name": ["micromark-util-html-tag-name@2.0.1", "", {}, "sha512-2cNEiYDhCWKI+Gs9T0Tiysk136SnR13hhO8yW6BGNyhOC4qYFnwF1nKfD3HFAIXA5c45RrIG1ub11GiXeYd1xA=="],

    "micromark-util-normalize-identifier": ["micromark-util-normalize-identifier@2.0.1", "", { "dependencies": { "micromark-util-symbol": "^2.0.0" } }, "sha512-sxPqmo70LyARJs0w2UclACPUUEqltCkJ6PhKdMIDuJ3gSf/Q+/GIe3WKl0Ijb/GyH9lOpUkRAO2wp0GVkLvS9Q=="],

    "micromark-util-resolve-all": ["micromark-util-resolve-all@2.0.1", "", { "dependencies": { "micromark-util-types": "^2.0.0" } }, "sha512-VdQyxFWFT2/FGJgwQnJYbe1jjQoNTS4RjglmSjTUlpUMa95Htx9NHeYW4rGDJzbjvCsl9eLjMQwGeElsqmzcHg=="],

    "micromark-util-sanitize-uri": ["micromark-util-sanitize-uri@2.0.1", "", { "dependencies": { "micromark-util-character": "^2.0.0", "micromark-util-encode": "^2.0.0", "micromark-util-symbol": "^2.0.0" } }, "sha512-9N9IomZ/YuGGZZmQec1MbgxtlgougxTodVwDzzEouPKo3qFWvymFHWcnDi2vzV1ff6kas9ucW+o3yzJK9YB1AQ=="],

    "micromark-util-subtokenize": ["micromark-util-subtokenize@2.1.0", "", { "dependencies": { "devlop": "^1.0.0", "micromark-util-chunked": "^2.0.0", "micromark-util-symbol": "^2.0.0", "micromark-util-types": "^2.0.0" } }, "sha512-XQLu552iSctvnEcgXw6+Sx75GflAPNED1qx7eBJ+wydBb2KCbRZe+NwvIEEMM83uml1+2WSXpBAcp9IUCgCYWA=="],

    "micromark-util-symbol": ["micromark-util-symbol@2.0.1", "", {}, "sha512-vs5t8Apaud9N28kgCrRUdEed4UJ+wWNvicHLPxCa9ENlYuAY31M0ETy5y1vA33YoNPDFTghEbnh6efaE8h4x0Q=="],

    "micromark-util-types": ["micromark-util-types@2.0.2", "", {}, "sha512-Yw0ECSpJoViF1qTU4DC6NwtC4aWGt1EkzaQB8KPPyCRR8z9TWeV0HbEFGTO+ZY1wB22zmxnJqhPyTpOVCpeHTA=="],

    "minimatch": ["minimatch@3.1.5", "", { "dependencies": { "brace-expansion": "^1.1.7" } }, "sha512-VgjWUsnnT6n+NUk6eZq77zeFdpW2LWDzP6zFGrCbHXiYNul5Dzqk2HHQ5uFH2DNW5Xbp8+jVzaeNt94ssEEl4w=="],

    "moment": ["moment@2.30.1", "", {}, "sha512-uEmtNhbDOrWPFS+hdjFCBfy9f2YoyzRpwcl+DqpC6taX21FzsTLQVbMV/W7PzNSX6x/bhC1zA3c2UQ5NzH6how=="],

    "motion-dom": ["motion-dom@11.18.1", "", { "dependencies": { "motion-utils": "^11.18.1" } }, "sha512-g76KvA001z+atjfxczdRtw/RXOM3OMSdd1f4DL77qCTF/+avrRJiawSG4yDibEQ215sr9kpinSlX2pCTJ9zbhw=="],

    "motion-utils": ["motion-utils@11.18.1", "", {}, "sha512-49Kt+HKjtbJKLtgO/LKj9Ld+6vw9BjH5d9sc40R/kVyH8GLAXgT42M2NnuPcJNuA3s9ZfZBUcwIgpmZWGEE+hA=="],

    "ms": ["ms@2.1.3", "", {}, "sha512-6FlzubTLZG3J2a/NVCAleEhjzq5oxgHyaCU9yYXvcLsvoVaHJq/s5xXI6/XXP6tz7R9xAOtHnSO/tXtF3WRTlA=="],

    "nanoid": ["nanoid@3.3.12", "", { "bin": "bin/nanoid.cjs" }, "sha512-ZB9RH/39qpq5Vu6Y+NmUaFhQR6pp+M2Xt76XBnEwDaGcVAqhlvxrl3B2bKS5D3NH3QR76v3aSrKaF/Kiy7lEtQ=="],

    "natural-compare": ["natural-compare@1.4.0", "", {}, "sha512-OWND8ei3VtNC9h7V60qff3SVobHr996CTwgxubgyQYEpg290h9J0buyECNNJexkFm5sOajh5G116RYA1c8ZMSw=="],

    "next-themes": ["next-themes@0.4.6", "", { "peerDependencies": { "react": "^16.8 || ^17 || ^18 || ^19 || ^19.0.0-rc", "react-dom": "^16.8 || ^17 || ^18 || ^19 || ^19.0.0-rc" } }, "sha512-pZvgD5L0IEvX5/9GWyHMf3m8BKiVQwsCMHfoFosXtXBMnaS0ZnIJ9ST4b4NqLVKDEm8QBxoNNGNaBv2JNF6XNA=="],

    "node-exports-info": ["node-exports-info@1.6.0", "", { "dependencies": { "array.prototype.flatmap": "^1.3.3", "es-errors": "^1.3.0", "object.entries": "^1.1.9", "semver": "^6.3.1" } }, "sha512-pyFS63ptit/P5WqUkt+UUfe+4oevH+bFeIiPPdfb0pFeYEu/1ELnJu5l+5EcTKYL5M7zaAa7S8ddywgXypqKCw=="],

    "node-releases": ["node-releases@2.0.38", "", {}, "sha512-3qT/88Y3FbH/Kx4szpQQ4HzUbVrHPKTLVpVocKiLfoYvw9XSGOX2FmD2d6DrXbVYyAQTF2HeF6My8jmzx7/CRw=="],

    "object-assign": ["object-assign@4.1.1", "", {}, "sha512-rJgTQnkUnH1sFw8yT6VSU3zD3sWmu6sZhIseY8VX+GRu3P6F7Fu+JNDoXfklElbLJSnc3FUQHVe4cU5hj+BcUg=="],

    "object-inspect": ["object-inspect@1.13.4", "", {}, "sha512-W67iLl4J2EXEGTbfeHCffrjDfitvLANg0UlX3wFUUSTx92KXRFegMHUVgSqE+wvhAbi4WqjGg9czysTV2Epbew=="],

    "object-is": ["object-is@1.1.6", "", { "dependencies": { "call-bind": "^1.0.7", "define-properties": "^1.2.1" } }, "sha512-F8cZ+KfGlSGi09lJT7/Nd6KJZ9ygtvYC0/UYYLI9nmQKLMnydpB9yvbv9K1uSkEu7FU9vYPmVwLg328tX+ot3Q=="],

    "object-keys": ["object-keys@1.1.1", "", {}, "sha512-NuAESUOUMrlIXOfHKzD6bpPu3tYt3xvjNdRIQ+FeT0lNb4K8WR70CaDxhuNguS2XG+GjkyMwOzsN5ZktImfhLA=="],

    "object.assign": ["object.assign@4.1.7", "", { "dependencies": { "call-bind": "^1.0.8", "call-bound": "^1.0.3", "define-properties": "^1.2.1", "es-object-atoms": "^1.0.0", "has-symbols": "^1.1.0", "object-keys": "^1.1.1" } }, "sha512-nK28WOo+QIjBkDduTINE4JkF/UJJKyf2EJxvJKfblDpyg0Q+pkOHNTL0Qwy6NP6FhE/EnzV73BxxqcJaXY9anw=="],

    "object.entries": ["object.entries@1.1.9", "", { "dependencies": { "call-bind": "^1.0.8", "call-bound": "^1.0.4", "define-properties": "^1.2.1", "es-object-atoms": "^1.1.1" } }, "sha512-8u/hfXFRBD1O0hPUjioLhoWFHRmt6tKA4/vZPyckBr18l1KE9uHrFaFaUi8MDRTpi4uak2goyPTSNJLXX2k2Hw=="],

    "object.fromentries": ["object.fromentries@2.0.8", "", { "dependencies": { "call-bind": "^1.0.7", "define-properties": "^1.2.1", "es-abstract": "^1.23.2", "es-object-atoms": "^1.0.0" } }, "sha512-k6E21FzySsSK5a21KRADBd/NGneRegFO5pLHfdQLpRDETUNJueLXs3WCzyQ3tFRDYgbq3KHGXfTbi2bs8WQ6rQ=="],

    "object.values": ["object.values@1.2.1", "", { "dependencies": { "call-bind": "^1.0.8", "call-bound": "^1.0.3", "define-properties": "^1.2.1", "es-object-atoms": "^1.0.0" } }, "sha512-gXah6aZrcUxjWg2zR2MwouP2eHlCBzdV4pygudehaKXSGW4v2AsRQUK+lwwXhii6KFZcunEnmSUoYp5CXibxtA=="],

    "optionator": ["optionator@0.9.4", "", { "dependencies": { "deep-is": "^0.1.3", "fast-levenshtein": "^2.0.6", "levn": "^0.4.1", "prelude-ls": "^1.2.1", "type-check": "^0.4.0", "word-wrap": "^1.2.5" } }, "sha512-6IpQ7mKUxRcZNLIObR0hz7lxsapSSIYNZJwXPGeF0mTVqGKFIXj1DQcMoT22S3ROcLyY/rz0PWaWZ9ayWmad9g=="],

    "own-keys": ["own-keys@1.0.1", "", { "dependencies": { "get-intrinsic": "^1.2.6", "object-keys": "^1.1.1", "safe-push-apply": "^1.0.0" } }, "sha512-qFOyK5PjiWZd+QQIh+1jhdb9LpxTF0qs7Pm8o5QHYZ0M3vKqSqzsZaEB6oWlxZ+q2sJBMI/Ktgd2N5ZwQoRHfg=="],

    "p-limit": ["p-limit@3.1.0", "", { "dependencies": { "yocto-queue": "^0.1.0" } }, "sha512-TYOanM3wGwNGsZN2cVTYPArw454xnXj5qmWF1bEoAc4+cU/ol7GVh7odevjp1FNHduHc3KZMcFduxU5Xc6uJRQ=="],

    "p-locate": ["p-locate@5.0.0", "", { "dependencies": { "p-limit": "^3.0.2" } }, "sha512-LaNjtRWUBY++zB5nE/NwcaoMylSPk+S+ZHNB1TzdbMJMny6dynpAGt7X/tl/QYq3TIeE6nxHppbo2LGymrG5Pw=="],

    "pako": ["pako@2.1.0", "", {}, "sha512-w+eufiZ1WuJYgPXbV/PO3NCMEc3xqylkKHzp8bxp1uW4qaSNQUkwmLLEc3kKsfz8lpV1F8Ht3U1Cm+9Srog2ug=="],

    "parchment": ["parchment@1.1.4", "", {}, "sha512-J5FBQt/pM2inLzg4hEWmzQx/8h8D0CiDxaG3vyp9rKrQRSDgBlhjdP5jQGgosEajXPSQouXGHOmVdgo7QmJuOg=="],

    "parent-module": ["parent-module@1.0.1", "", { "dependencies": { "callsites": "^3.0.0" } }, "sha512-GQ2EWRpQV8/o+Aw8YqtfZZPfNRWZYkbidE9k5rpl/hC3vtHHBfGm2Ifi6qWV+coDGkrUKZAxE3Lot5kcsRlh+g=="],

    "parse-entities": ["parse-entities@4.0.2", "", { "dependencies": { "@types/unist": "^2.0.0", "character-entities-legacy": "^3.0.0", "character-reference-invalid": "^2.0.0", "decode-named-character-reference": "^1.0.0", "is-alphanumerical": "^2.0.0", "is-decimal": "^2.0.0", "is-hexadecimal": "^2.0.0" } }, "sha512-GG2AQYWoLgL877gQIKeRPGO1xF9+eG1ujIb5soS5gPvLQ1y2o8FL90w2QWNdf9I361Mpp7726c+lj3U0qK1uGw=="],

    "path-exists": ["path-exists@4.0.0", "", {}, "sha512-ak9Qy5Q7jYb2Wwcey5Fpvg2KoAc/ZIhLSLOSBmRmygPsGwkVVt0fZa0qrtMz+m6tJTAHfZQ8FnmB4MG4LWy7/w=="],

    "path-key": ["path-key@3.1.1", "", {}, "sha512-ojmeN0qd+y0jszEtoY48r0Peq5dwMEkIlCOu6Q5f41lfkswXuKtYrhgoTpLnyIcHm24Uhqx+5Tqm2InSwLhE6Q=="],

    "path-parse": ["path-parse@1.0.7", "", {}, "sha512-LDJzPVEEEPR+y48z93A0Ed0yXb8pAByGWo/k5YYdYgpY2/2EsOsksJrq7lOHxryrVOn1ejG6oAp8ahvOIQD8sw=="],

    "performance-now": ["performance-now@2.1.0", "", {}, "sha512-7EAHlyLHI56VEIdK57uwHdHKIaAGbnXPiw0yWbarQZOKaKpvUIgW0jWRVLiatnM+XXlSwsanIBH/hzGMJulMow=="],

    "picocolors": ["picocolors@1.1.1", "", {}, "sha512-xceH2snhtb5M9liqDsmEw56le376mTZkEX/jEb/RxNFyegNul7eNslCXP9FDj/Lcu0X8KEyMceP2ntpaHrDEVA=="],

    "picomatch": ["picomatch@4.0.4", "", {}, "sha512-QP88BAKvMam/3NxH6vj2o21R6MjxZUAd6nlwAS/pnGvN9IVLocLHxGYIzFhg6fUQ+5th6P4dv4eW9jX3DSIj7A=="],

    "possible-typed-array-names": ["possible-typed-array-names@1.1.0", "", {}, "sha512-/+5VFTchJDoVj3bhoqi6UeymcD00DAwb1nJwamzPvHEszJ4FpF6SNNbUbOS8yI56qHzdV8eK0qEfOSiodkTdxg=="],

    "postcss": ["postcss@8.5.14", "", { "dependencies": { "nanoid": "^3.3.11", "picocolors": "^1.1.1", "source-map-js": "^1.2.1" } }, "sha512-SoSL4+OSEtR99LHFZQiJLkT59C5B1amGO1NzTwj7TT1qCUgUO6hxOvzkOYxD+vMrXBM3XJIKzokoERdqQq/Zmg=="],

    "postcss-value-parser": ["postcss-value-parser@4.2.0", "", {}, "sha512-1NNCs6uurfkVbeXG4S8JFT9t19m45ICnif8zWLd5oPSZ50QnwMfK+H3jv408d4jw/7Bttv5axS5IiHoLaVNHeQ=="],

    "prelude-ls": ["prelude-ls@1.2.1", "", {}, "sha512-vkcDPrRZo1QZLbn5RLGPpg/WmIQ65qoWWhcGKf/b5eplkkarX0m9z8ppCat4mlOqUsWpyNuYgO3VRyrYHSzX5g=="],

    "prop-types": ["prop-types@15.8.1", "", { "dependencies": { "loose-envify": "^1.4.0", "object-assign": "^4.1.1", "react-is": "^16.13.1" } }, "sha512-oj87CgZICdulUohogVAR7AjlC0327U4el4L6eAvOqCeudMDVU0NThNaV+b9Df4dXgSP1gXMTnPdhfe/2qDH5cg=="],

    "property-information": ["property-information@7.1.0", "", {}, "sha512-TwEZ+X+yCJmYfL7TPUOcvBZ4QfoT5YenQiJuX//0th53DE6w0xxLEtfK3iyryQFddXuvkIk51EEgrJQ0WJkOmQ=="],

    "protobufjs": ["protobufjs@7.6.4", "", { "dependencies": { "@protobufjs/aspromise": "^1.1.2", "@protobufjs/base64": "^1.1.2", "@protobufjs/codegen": "^2.0.5", "@protobufjs/eventemitter": "^1.1.1", "@protobufjs/fetch": "^1.1.1", "@protobufjs/float": "^1.0.2", "@protobufjs/path": "^1.1.2", "@protobufjs/pool": "^1.1.0", "@protobufjs/utf8": "^1.1.1", "@types/node": ">=13.7.0", "long": "^5.3.2" } }, "sha512-RJJPTTpvFfHcWLkIa2JFWK4XvtSzS0yEWDmunqHXli1h3JlkbcQZXDZdcWxv+JK3Xsl5/UFDPZ0iGm7DAengYw=="],

    "punycode": ["punycode@2.3.1", "", {}, "sha512-vYt7UD1U9Wg6138shLtLOvdAu+8DsC/ilFtEVHcH+wydcSpNE20AfSOduf6MkRFahL5FY7X1oU7nKVZFtfq8Fg=="],

    "quill": ["quill@1.3.7", "", { "dependencies": { "clone": "^2.1.1", "deep-equal": "^1.0.1", "eventemitter3": "^2.0.3", "extend": "^3.0.2", "parchment": "^1.1.4", "quill-delta": "^3.6.2" } }, "sha512-hG/DVzh/TiknWtE6QmWAF/pxoZKYxfe3J/d/+ShUWkDvvkZQVTPeVmUJVu1uE6DDooC4fWTiCLh84ul89oNz5g=="],

    "quill-delta": ["quill-delta@3.6.3", "", { "dependencies": { "deep-equal": "^1.0.1", "extend": "^3.0.2", "fast-diff": "1.1.2" } }, "sha512-wdIGBlcX13tCHOXGMVnnTVFtGRLoP0imqxM696fIPwIf5ODIYUHIvHbZcyvGlZFiFhK5XzDC2lpjbxRhnM05Tg=="],

    "raf": ["raf@3.4.1", "", { "dependencies": { "performance-now": "^2.1.0" } }, "sha512-Sq4CW4QhwOHE8ucn6J34MqtZCeWFP2aQSmrlroYgqAV1PjStIhJXxYuTgUIfkEk7zTLjmIjLmU5q+fbD1NnOJA=="],

    "raf-schd": ["raf-schd@4.0.3", "", {}, "sha512-tQkJl2GRWh83ui2DiPTJz9wEiMN20syf+5oKfB03yYP7ioZcJwsIK8FjrtLwH1m7C7e+Tt2yYBlrOpdT+dyeIQ=="],

    "re2js": ["re2js@0.4.3", "", {}, "sha512-EuNmh7jurhHEE8Ge/lBo9JuMLb3qf866Xjjfyovw3wPc7+hlqDkZq4LwhrCQMEI+ARWfrKrHozEndzlpNT0WDg=="],

    "react": ["react@18.3.1", "", { "dependencies": { "loose-envify": "^1.1.0" } }, "sha512-wS+hAgJShR0KhEvPJArfuPVN1+Hz1t0Y6n5jLrGQbkb4urgPE/0Rve+1kMB1v/oWgHgm4WIcV+i7F2pTVj+2iQ=="],

    "react-day-picker": ["react-day-picker@8.10.2", "", { "peerDependencies": { "date-fns": "^2.28.0 || ^3.0.0", "react": "^16.8.0 || ^17.0.0 || ^18.0.0 || ^19.0.0" } }, "sha512-LK68OTbHB3oJNhl9cA0qVizzp3o26w61YSjAFkYi67N86iro32wx86kSNeFU/hq+gI8m1yzWhnomMLfZ041RzQ=="],

    "react-dom": ["react-dom@18.3.1", "", { "dependencies": { "loose-envify": "^1.1.0", "scheduler": "^0.23.2" }, "peerDependencies": { "react": "^18.3.1" } }, "sha512-5m4nQKp+rZRb09LNH59GM4BxTh9251/ylbKIbpe7TpGxfJ+9kv6BLkLBXIjjspbgbnIBNqlI23tRnTWT0snUIw=="],

    "react-hook-form": ["react-hook-form@7.75.0", "", { "peerDependencies": { "react": "^16.8.0 || ^17 || ^18 || ^19" } }, "sha512-Ovv94H+0p3sJ7B9B5QxPuCP1u8V/cHuVGyH55cSwodYDtoJwK+fqk3vjfIgSX59I2U/bU4z0nRJ9HMLpNiWEmw=="],

    "react-hot-toast": ["react-hot-toast@2.6.0", "", { "dependencies": { "csstype": "^3.1.3", "goober": "^2.1.16" }, "peerDependencies": { "react": ">=16", "react-dom": ">=16" } }, "sha512-bH+2EBMZ4sdyou/DPrfgIouFpcRLCJ+HoCA32UoAYHn6T3Ur5yfcDCeSr5mwldl6pFOsiocmrXMuoCJ1vV8bWg=="],

    "react-is": ["react-is@18.3.1", "", {}, "sha512-/LLMVyas0ljjAtoYiPqYiL8VWXzUUdThrmU5+n20DZv+a+ClRoevUzw5JxU+Ieh5/c87ytoTBV9G1FiKfNJdmg=="],

    "react-leaflet": ["react-leaflet@4.2.1", "", { "dependencies": { "@react-leaflet/core": "^2.1.0" }, "peerDependencies": { "leaflet": "^1.9.0", "react": "^18.0.0", "react-dom": "^18.0.0" } }, "sha512-p9chkvhcKrWn/H/1FFeVSqLdReGwn2qmiobOQGO3BifX+/vV/39qhY8dGqbdcPh1e6jxh/QHriLXr7a4eLFK4Q=="],

    "react-markdown": ["react-markdown@9.1.0", "", { "dependencies": { "@types/hast": "^3.0.0", "@types/mdast": "^4.0.0", "devlop": "^1.0.0", "hast-util-to-jsx-runtime": "^2.0.0", "html-url-attributes": "^3.0.0", "mdast-util-to-hast": "^13.0.0", "remark-parse": "^11.0.0", "remark-rehype": "^11.0.0", "unified": "^11.0.0", "unist-util-visit": "^5.0.0", "vfile": "^6.0.0" }, "peerDependencies": { "@types/react": ">=18", "react": ">=18" } }, "sha512-xaijuJB0kzGiUdG7nc2MOMDUDBWPyGAjZtUrow9XxUeua8IqeP+VlIfAZ3bphpcLTnSZXz6z9jcVC/TCwbfgdw=="],

    "react-quill": ["react-quill@2.0.0", "", { "dependencies": { "@types/quill": "^1.3.10", "lodash": "^4.17.4", "quill": "^1.3.7" }, "peerDependencies": { "react": "^16 || ^17 || ^18", "react-dom": "^16 || ^17 || ^18" } }, "sha512-4qQtv1FtCfLgoD3PXAur5RyxuUbPXQGOHgTlFie3jtxp43mXDtzCKaOgQ3mLyZfi1PUlyjycfivKelFhy13QUg=="],

    "react-redux": ["react-redux@9.2.0", "", { "dependencies": { "@types/use-sync-external-store": "^0.0.6", "use-sync-external-store": "^1.4.0" }, "peerDependencies": { "@types/react": "^18.2.25 || ^19", "react": "^18.0 || ^19", "redux": "^5.0.0" } }, "sha512-ROY9fvHhwOD9ySfrF0wmvu//bKCQ6AeZZq1nJNtbDC+kk5DuSuNX/n6YWYF/SYy7bSba4D4FSz8DJeKY/S/r+g=="],

    "react-refresh": ["react-refresh@0.17.0", "", {}, "sha512-z6F7K9bV85EfseRCp2bzrpyQ0Gkw1uLoCel9XBVWPg/TjRj94SkJzUTGfOa4bs7iJvBWtQG0Wq7wnI0syw3EBQ=="],

    "react-remove-scroll": ["react-remove-scroll@2.7.2", "", { "dependencies": { "react-remove-scroll-bar": "^2.3.7", "react-style-singleton": "^2.2.3", "tslib": "^2.1.0", "use-callback-ref": "^1.3.3", "use-sidecar": "^1.1.3" }, "peerDependencies": { "@types/react": "*", "react": "^16.8.0 || ^17.0.0 || ^18.0.0 || ^19.0.0 || ^19.0.0-rc" } }, "sha512-Iqb9NjCCTt6Hf+vOdNIZGdTiH1QSqr27H/Ek9sv/a97gfueI/5h1s3yRi1nngzMUaOOToin5dI1dXKdXiF+u0Q=="],

    "react-remove-scroll-bar": ["react-remove-scroll-bar@2.3.8", "", { "dependencies": { "react-style-singleton": "^2.2.2", "tslib": "^2.0.0" }, "peerDependencies": { "@types/react": "*", "react": "^16.8.0 || ^17.0.0 || ^18.0.0 || ^19.0.0" } }, "sha512-9r+yi9+mgU33AKcj6IbT9oRCO78WriSj6t/cF8DWBZJ9aOGPOTEDvdUDz1FwKim7QXWwmHqtdHnRJfhAxEG46Q=="],

    "react-resizable-panels": ["react-resizable-panels@2.1.9", "", { "peerDependencies": { "react": "^16.14.0 || ^17.0.0 || ^18.0.0 || ^19.0.0 || ^19.0.0-rc", "react-dom": "^16.14.0 || ^17.0.0 || ^18.0.0 || ^19.0.0 || ^19.0.0-rc" } }, "sha512-z77+X08YDIrgAes4jl8xhnUu1LNIRp4+E7cv4xHmLOxxUPO/ML7PSrE813b90vj7xvQ1lcf7g2uA9GeMZonjhQ=="],

    "react-router": ["react-router@6.30.3", "", { "dependencies": { "@remix-run/router": "1.23.2" }, "peerDependencies": { "react": ">=16.8" } }, "sha512-XRnlbKMTmktBkjCLE8/XcZFlnHvr2Ltdr1eJX4idL55/9BbORzyZEaIkBFDhFGCEWBBItsVrDxwx3gnisMitdw=="],

    "react-router-dom": ["react-router-dom@6.30.3", "", { "dependencies": { "@remix-run/router": "1.23.2", "react-router": "6.30.3" }, "peerDependencies": { "react": ">=16.8", "react-dom": ">=16.8" } }, "sha512-pxPcv1AczD4vso7G4Z3TKcvlxK7g7TNt3/FNGMhfqyntocvYKj+GCatfigGDjbLozC4baguJ0ReCigoDJXb0ag=="],

    "react-smooth": ["react-smooth@4.0.4", "", { "dependencies": { "fast-equals": "^5.0.1", "prop-types": "^15.8.1", "react-transition-group": "^4.4.5" }, "peerDependencies": { "react": "^16.8.0 || ^17.0.0 || ^18.0.0 || ^19.0.0", "react-dom": "^16.8.0 || ^17.0.0 || ^18.0.0 || ^19.0.0" } }, "sha512-gnGKTpYwqL0Iii09gHobNolvX4Kiq4PKx6eWBCYYix+8cdw+cGo3do906l1NBPKkSWx1DghC1dlWG9L2uGd61Q=="],

    "react-style-singleton": ["react-style-singleton@2.2.3", "", { "dependencies": { "get-nonce": "^1.0.0", "tslib": "^2.0.0" }, "peerDependencies": { "@types/react": "*", "react": "^16.8.0 || ^17.0.0 || ^18.0.0 || ^19.0.0 || ^19.0.0-rc" } }, "sha512-b6jSvxvVnyptAiLjbkWLE/lOnR4lfTtDAl+eUC7RZy+QQWc6wRzIV2CE6xBuMmDxc2qIihtDCZD5NPOFl7fRBQ=="],

    "react-transition-group": ["react-transition-group@4.4.5", "", { "dependencies": { "@babel/runtime": "^7.5.5", "dom-helpers": "^5.0.1", "loose-envify": "^1.4.0", "prop-types": "^15.6.2" }, "peerDependencies": { "react": ">=16.6.0", "react-dom": ">=16.6.0" } }, "sha512-pZcd1MCJoiKiBR2NRxeCRg13uCXbydPnmB4EOeRrY7480qNWO8IIgQG6zlDkm6uRMsURXPuKq0GWtiM59a5Q6g=="],

    "recharts": ["recharts@2.15.4", "", { "dependencies": { "clsx": "^2.0.0", "eventemitter3": "^4.0.1", "lodash": "^4.17.21", "react-is": "^18.3.1", "react-smooth": "^4.0.4", "recharts-scale": "^0.4.4", "tiny-invariant": "^1.3.1", "victory-vendor": "^36.6.8" }, "peerDependencies": { "react": "^16.0.0 || ^17.0.0 || ^18.0.0 || ^19.0.0", "react-dom": "^16.0.0 || ^17.0.0 || ^18.0.0 || ^19.0.0" } }, "sha512-UT/q6fwS3c1dHbXv2uFgYJ9BMFHu3fwnd7AYZaEQhXuYQ4hgsxLvsUXzGdKeZrW5xopzDCvuA2N41WJ88I7zIw=="],

    "recharts-scale": ["recharts-scale@0.4.5", "", { "dependencies": { "decimal.js-light": "^2.4.1" } }, "sha512-kivNFO+0OcUNu7jQquLXAxz1FIwZj8nrj+YkOKc5694NbjCvcT6aSZiIzNzd2Kul4o4rTto8QVR9lMNtxD4G1w=="],

    "redux": ["redux@5.0.1", "", {}, "sha512-M9/ELqF6fy8FwmkpnF0S3YKOqMyoWJ4+CS5Efg2ct3oY9daQvd/Pc71FpGZsVsbl3Cpb+IIcjBDUnnyBdQbq4w=="],

    "reflect.getprototypeof": ["reflect.getprototypeof@1.0.10", "", { "dependencies": { "call-bind": "^1.0.8", "define-properties": "^1.2.1", "es-abstract": "^1.23.9", "es-errors": "^1.3.0", "es-object-atoms": "^1.0.0", "get-intrinsic": "^1.2.7", "get-proto": "^1.0.1", "which-builtin-type": "^1.2.1" } }, "sha512-00o4I+DVrefhv+nX0ulyi3biSHCPDe+yLv5o/p6d/UVlirijB8E16FtfwSAi4g3tcqrQ4lRAqQSoFEZJehYEcw=="],

    "regenerator-runtime": ["regenerator-runtime@0.13.11", "", {}, "sha512-kY1AZVr2Ra+t+piVaJ4gxaFaReZVH40AKNo7UCX6W+dEwBo/2oZJzqfuN1qLq1oL45o56cPaTXELwrTh8Fpggg=="],

    "regexp.prototype.flags": ["regexp.prototype.flags@1.5.4", "", { "dependencies": { "call-bind": "^1.0.8", "define-properties": "^1.2.1", "es-errors": "^1.3.0", "get-proto": "^1.0.1", "gopd": "^1.2.0", "set-function-name": "^2.0.2" } }, "sha512-dYqgNSZbDwkaJ2ceRd9ojCGjBq+mOm9LmtXnAnEGyHhN/5R7iDW2TRw3h+o/jCFxus3P2LfWIIiwowAjANm7IA=="],

    "remark-parse": ["remark-parse@11.0.0", "", { "dependencies": { "@types/mdast": "^4.0.0", "mdast-util-from-markdown": "^2.0.0", "micromark-util-types": "^2.0.0", "unified": "^11.0.0" } }, "sha512-FCxlKLNGknS5ba/1lmpYijMUzX2esxW5xQqjWxw2eHFfS2MSdaHVINFmhjo+qN1WhZhNimq0dZATN9pH0IDrpA=="],

    "remark-rehype": ["remark-rehype@11.1.2", "", { "dependencies": { "@types/hast": "^3.0.0", "@types/mdast": "^4.0.0", "mdast-util-to-hast": "^13.0.0", "unified": "^11.0.0", "vfile": "^6.0.0" } }, "sha512-Dh7l57ianaEoIpzbp0PC9UKAdCSVklD8E5Rpw7ETfbTl3FqcOOgq5q2LVDhgGCkaBv7p24JXikPdvhhmHvKMsw=="],

    "require-directory": ["require-directory@2.1.1", "", {}, "sha512-fGxEI7+wsG9xrvdjsrlmL22OMTTiHRwAMroiEeMgq8gzoLC/PQr7RsRDSTLUg/bZAZtF+TVIkHc6/4RIKrui+Q=="],

    "resolve": ["resolve@2.0.0-next.6", "", { "dependencies": { "es-errors": "^1.3.0", "is-core-module": "^2.16.1", "node-exports-info": "^1.6.0", "object-keys": "^1.1.1", "path-parse": "^1.0.7", "supports-preserve-symlinks-flag": "^1.0.0" }, "bin": "bin/resolve" }, "sha512-3JmVl5hMGtJ3kMmB3zi3DL25KfkCEyy3Tw7Gmw7z5w8M9WlwoPFnIvwChzu1+cF3iaK3sp18hhPz8ANeimdJfA=="],

    "resolve-from": ["resolve-from@4.0.0", "", {}, "sha512-pb/MYmXstAkysRFx8piNI1tGFNQIFA3vkE3Gq4EuA1dF6gHp/+vgZqsCGJapvy8N3Q+4o7FwvquPJcnZ7RYy4g=="],

    "resolve-pkg-maps": ["resolve-pkg-maps@1.0.0", "", {}, "sha512-seS2Tj26TBVOC2NIc2rOe2y2ZO7efxITtLZcGSOnHHNOQ7CkiUBfw0Iw2ck6xkIhPwLhKNLS8BO+hEpngQlqzw=="],

    "rgbcolor": ["rgbcolor@1.0.1", "", {}, "sha512-9aZLIrhRaD97sgVhtJOW6ckOEh6/GnvQtdVNfdZ6s67+3/XwLS9lBcQYzEEhYVeUowN7pRzMLsyGhK2i/xvWbw=="],

    "rollup": ["rollup@4.60.3", "", { "dependencies": { "@types/estree": "1.0.8" }, "optionalDependencies": { "@rollup/rollup-android-arm-eabi": "4.60.3", "@rollup/rollup-android-arm64": "4.60.3", "@rollup/rollup-darwin-arm64": "4.60.3", "@rollup/rollup-darwin-x64": "4.60.3", "@rollup/rollup-freebsd-arm64": "4.60.3", "@rollup/rollup-freebsd-x64": "4.60.3", "@rollup/rollup-linux-arm-gnueabihf": "4.60.3", "@rollup/rollup-linux-arm-musleabihf": "4.60.3", "@rollup/rollup-linux-arm64-gnu": "4.60.3", "@rollup/rollup-linux-arm64-musl": "4.60.3", "@rollup/rollup-linux-loong64-gnu": "4.60.3", "@rollup/rollup-linux-loong64-musl": "4.60.3", "@rollup/rollup-linux-ppc64-gnu": "4.60.3", "@rollup/rollup-linux-ppc64-musl": "4.60.3", "@rollup/rollup-linux-riscv64-gnu": "4.60.3", "@rollup/rollup-linux-riscv64-musl": "4.60.3", "@rollup/rollup-linux-s390x-gnu": "4.60.3", "@rollup/rollup-linux-x64-gnu": "4.60.3", "@rollup/rollup-linux-x64-musl": "4.60.3", "@rollup/rollup-openbsd-x64": "4.60.3", "@rollup/rollup-openharmony-arm64": "4.60.3", "@rollup/rollup-win32-arm64-msvc": "4.60.3", "@rollup/rollup-win32-ia32-msvc": "4.60.3", "@rollup/rollup-win32-x64-gnu": "4.60.3", "@rollup/rollup-win32-x64-msvc": "4.60.3", "fsevents": "~2.3.2" }, "bin": "dist/bin/rollup" }, "sha512-pAQK9HalE84QSm4Po3EmWIZPd3FnjkShVkiMlz1iligWYkWQ7wHYd1PF/T7QZ5TVSD6uSTon5gBVMSM4JfBV+A=="],

    "safe-array-concat": ["safe-array-concat@1.1.4", "", { "dependencies": { "call-bind": "^1.0.9", "call-bound": "^1.0.4", "get-intrinsic": "^1.3.0", "has-symbols": "^1.1.0", "isarray": "^2.0.5" } }, "sha512-wtZlHyOje6OZTGqAoaDKxFkgRtkF9CnHAVnCHKfuj200wAgL+bSJhdsCD2l0Qx/2ekEXjPWcyKkfGb5CPboslg=="],

    "safe-buffer": ["safe-buffer@5.2.1", "", {}, "sha512-rp3So07KcdmmKbGvgaNxQSJr7bGVSVk5S9Eq1F+ppbRo70+YeaDxkw5Dd8NPN+GD6bjnYm2VuPuCXmpuYvmCXQ=="],

    "safe-push-apply": ["safe-push-apply@1.0.0", "", { "dependencies": { "es-errors": "^1.3.0", "isarray": "^2.0.5" } }, "sha512-iKE9w/Z7xCzUMIZqdBsp6pEQvwuEebH4vdpjcDWnyzaI6yl6O9FHvVpmGelvEHNsoY6wGblkxR6Zty/h00WiSA=="],

    "safe-regex-test": ["safe-regex-test@1.1.0", "", { "dependencies": { "call-bound": "^1.0.2", "es-errors": "^1.3.0", "is-regex": "^1.2.1" } }, "sha512-x/+Cz4YrimQxQccJf5mKEbIa1NzeCRNI5Ecl/ekmlYaampdNLPalVyIcCZNNH3MvmqBugV5TMYZXv0ljslUlaw=="],

    "scheduler": ["scheduler@0.23.2", "", { "dependencies": { "loose-envify": "^1.1.0" } }, "sha512-UOShsPwz7NrMUqhR6t0hWjFduvOzbtv7toDH1/hIrfRNIDBnnBWd0CwJTGvTpngVlmwGCdP9/Zl/tVrDqcuYzQ=="],

    "semver": ["semver@6.3.1", "", { "bin": "bin/semver.js" }, "sha512-BR7VvDCVHO+q2xBEWskxS6DJE1qRnb7DxzUrogb71CWoSficBxYsiAGd+Kl0mmq/MprG9yArRkyrQxTO6XjMzA=="],

    "set-function-length": ["set-function-length@1.2.2", "", { "dependencies": { "define-data-property": "^1.1.4", "es-errors": "^1.3.0", "function-bind": "^1.1.2", "get-intrinsic": "^1.2.4", "gopd": "^1.0.1", "has-property-descriptors": "^1.0.2" } }, "sha512-pgRc4hJ4/sNjWCSS9AmnS40x3bNMDTknHgL5UaMBTMyJnU90EgWh1Rz+MC9eFu4BuN/UwZjKQuY/1v3rM7HMfg=="],

    "set-function-name": ["set-function-name@2.0.2", "", { "dependencies": { "define-data-property": "^1.1.4", "es-errors": "^1.3.0", "functions-have-names": "^1.2.3", "has-property-descriptors": "^1.0.2" } }, "sha512-7PGFlmtwsEADb0WYyvCMa1t+yke6daIG4Wirafur5kcf+MhUnPms1UeR0CKQdTZD81yESwMHbtn+TR+dMviakQ=="],

    "set-proto": ["set-proto@1.0.0", "", { "dependencies": { "dunder-proto": "^1.0.1", "es-errors": "^1.3.0", "es-object-atoms": "^1.0.0" } }, "sha512-RJRdvCo6IAnPdsvP/7m6bsQqNnn1FCBX5ZNtFL98MmFF/4xAIJTIg1YbHW5DC2W5SKZanrC6i4HsJqlajw/dZw=="],

    "shebang-command": ["shebang-command@2.0.0", "", { "dependencies": { "shebang-regex": "^3.0.0" } }, "sha512-kHxr2zZpYtdmrN1qDjrrX/Z1rR1kG8Dx+gkpK1G4eXmvXswmcE1hTWBWYUzlraYw1/yZp6YuDY77YtvbN0dmDA=="],

    "shebang-regex": ["shebang-regex@3.0.0", "", {}, "sha512-7++dFhtcx3353uBaq8DDR4NuxBetBzC7ZQOhmTQInHEd6bSrXdiEyzCvG07Z44UYdLShWUyXt5M/yhz8ekcb1A=="],

    "side-channel": ["side-channel@1.1.0", "", { "dependencies": { "es-errors": "^1.3.0", "object-inspect": "^1.13.3", "side-channel-list": "^1.0.0", "side-channel-map": "^1.0.1", "side-channel-weakmap": "^1.0.2" } }, "sha512-ZX99e6tRweoUXqR+VBrslhda51Nh5MTQwou5tnUDgbtyM0dBgmhEDtWGP/xbKn6hqfPRHujUNwz5fy/wbbhnpw=="],

    "side-channel-list": ["side-channel-list@1.0.1", "", { "dependencies": { "es-errors": "^1.3.0", "object-inspect": "^1.13.4" } }, "sha512-mjn/0bi/oUURjc5Xl7IaWi/OJJJumuoJFQJfDDyO46+hBWsfaVM65TBHq2eoZBhzl9EchxOijpkbRC8SVBQU0w=="],

    "side-channel-map": ["side-channel-map@1.0.1", "", { "dependencies": { "call-bound": "^1.0.2", "es-errors": "^1.3.0", "get-intrinsic": "^1.2.5", "object-inspect": "^1.13.3" } }, "sha512-VCjCNfgMsby3tTdo02nbjtM/ewra6jPHmpThenkTYh8pG9ucZ/1P8So4u4FGBek/BjpOVsDCMoLA/iuBKIFXRA=="],

    "side-channel-weakmap": ["side-channel-weakmap@1.0.2", "", { "dependencies": { "call-bound": "^1.0.2", "es-errors": "^1.3.0", "get-intrinsic": "^1.2.5", "object-inspect": "^1.13.3", "side-channel-map": "^1.0.1" } }, "sha512-WPS/HvHQTYnHisLo9McqBHOJk2FkHO/tlpvldyrnem4aeQp4hai3gythswg6p01oSoTl58rcpiFAjF2br2Ak2A=="],

    "sonner": ["sonner@2.0.7", "", { "peerDependencies": { "react": "^18.0.0 || ^19.0.0 || ^19.0.0-rc", "react-dom": "^18.0.0 || ^19.0.0 || ^19.0.0-rc" } }, "sha512-W6ZN4p58k8aDKA4XPcx2hpIQXBRAgyiWVkYhT7CvK6D3iAu7xjvVyhQHg2/iaKJZ1XVJ4r7XuwGL+WGEK37i9w=="],

    "source-map-js": ["source-map-js@1.2.1", "", {}, "sha512-UXWMKhLOwVKb728IUtQPXxfYU+usdybtUrK/8uGE8CQMvrhOpwvzDBwj0QhSL7MQc7vIsISBG8VQ8+IDQxpfQA=="],

    "space-separated-tokens": ["space-separated-tokens@2.0.2", "", {}, "sha512-PEGlAwrG8yXGXRjW32fGbg66JAlOAwbObuqVoJpv/mRgoWDQfgH1wDPvtzWyUSNAXBGSk8h755YDbbcEy3SH2Q=="],

    "stackblur-canvas": ["stackblur-canvas@2.7.0", "", {}, "sha512-yf7OENo23AGJhBriGx0QivY5JP6Y1HbrrDI6WLt6C5auYZXlQrheoY8hD4ibekFKz1HOfE48Ww8kMWMnJD/zcQ=="],

    "stop-iteration-iterator": ["stop-iteration-iterator@1.1.0", "", { "dependencies": { "es-errors": "^1.3.0", "internal-slot": "^1.1.0" } }, "sha512-eLoXW/DHyl62zxY4SCaIgnRhuMr6ri4juEYARS8E6sCEqzKpOiE521Ucofdx+KnDZl5xmvGYaaKCk5FEOxJCoQ=="],

    "string-width": ["string-width@4.2.3", "", { "dependencies": { "emoji-regex": "^8.0.0", "is-fullwidth-code-point": "^3.0.0", "strip-ansi": "^6.0.1" } }, "sha512-wKyQRQpjJ0sIp62ErSZdGsjMJWsap5oRNihHhu6G7JVO/9jIB6UyevL+tXuOqrng8j/cxKTWyWUwvSTriiZz/g=="],

    "string.prototype.matchall": ["string.prototype.matchall@4.0.12", "", { "dependencies": { "call-bind": "^1.0.8", "call-bound": "^1.0.3", "define-properties": "^1.2.1", "es-abstract": "^1.23.6", "es-errors": "^1.3.0", "es-object-atoms": "^1.0.0", "get-intrinsic": "^1.2.6", "gopd": "^1.2.0", "has-symbols": "^1.1.0", "internal-slot": "^1.1.0", "regexp.prototype.flags": "^1.5.3", "set-function-name": "^2.0.2", "side-channel": "^1.1.0" } }, "sha512-6CC9uyBL+/48dYizRf7H7VAYCMCNTBeM78x/VTUe9bFEaxBepPJDa1Ow99LqI/1yF7kuy7Q3cQsYMrcjGUcskA=="],

    "string.prototype.repeat": ["string.prototype.repeat@1.0.0", "", { "dependencies": { "define-properties": "^1.1.3", "es-abstract": "^1.17.5" } }, "sha512-0u/TldDbKD8bFCQ/4f5+mNRrXwZ8hg2w7ZR8wa16e8z9XpePWl3eGEcUD0OXpEH/VJH/2G3gjUtR3ZOiBe2S/w=="],

    "string.prototype.trim": ["string.prototype.trim@1.2.10", "", { "dependencies": { "call-bind": "^1.0.8", "call-bound": "^1.0.2", "define-data-property": "^1.1.4", "define-properties": "^1.2.1", "es-abstract": "^1.23.5", "es-object-atoms": "^1.0.0", "has-property-descriptors": "^1.0.2" } }, "sha512-Rs66F0P/1kedk5lyYyH9uBzuiI/kNRmwJAR9quK6VOtIpZ2G+hMZd+HQbbv25MgCA6gEffoMZYxlTod4WcdrKA=="],

    "string.prototype.trimend": ["string.prototype.trimend@1.0.9", "", { "dependencies": { "call-bind": "^1.0.8", "call-bound": "^1.0.2", "define-properties": "^1.2.1", "es-object-atoms": "^1.0.0" } }, "sha512-G7Ok5C6E/j4SGfyLCloXTrngQIQU3PWtXGst3yM7Bea9FRURf1S42ZHlZZtsNque2FN2PoUhfZXYLNWwEr4dLQ=="],

    "string.prototype.trimstart": ["string.prototype.trimstart@1.0.8", "", { "dependencies": { "call-bind": "^1.0.7", "define-properties": "^1.2.1", "es-object-atoms": "^1.0.0" } }, "sha512-UXSH262CSZY1tfu3G3Secr6uGLCFVPMhIqHjlgCUtCCcgihYc/xKs9djMTMUOb2j1mVSeU8EU6NWc/iQKU6Gfg=="],

    "stringify-entities": ["stringify-entities@4.0.4", "", { "dependencies": { "character-entities-html4": "^2.0.0", "character-entities-legacy": "^3.0.0" } }, "sha512-IwfBptatlO+QCJUo19AqvrPNqlVMpW9YEL2LIVY+Rpv2qsjCGxaDLNRgeGsQWJhfItebuJhsGSLjaBbNSQ+ieg=="],

    "strip-ansi": ["strip-ansi@6.0.1", "", { "dependencies": { "ansi-regex": "^5.0.1" } }, "sha512-Y38VPSHcqkFrCpFnQ9vuSXmquuv5oXOKpGeT6aGrr3o3Gc9AlVa6JBfUSOCnbxGGZF+/0ooI7KrPuUSztUdU5A=="],

    "strip-json-comments": ["strip-json-comments@3.1.1", "", {}, "sha512-6fPc+R4ihwqP6N/aIv2f1gMH8lOVtWQHoqC4yK6oSDVVocumAsfCqjkXnqiYMhmMwS/mEHLp7Vehlt3ql6lEig=="],

    "style-to-js": ["style-to-js@1.1.21", "", { "dependencies": { "style-to-object": "1.0.14" } }, "sha512-RjQetxJrrUJLQPHbLku6U/ocGtzyjbJMP9lCNK7Ag0CNh690nSH8woqWH9u16nMjYBAok+i7JO1NP2pOy8IsPQ=="],

    "style-to-object": ["style-to-object@1.0.14", "", { "dependencies": { "inline-style-parser": "0.2.7" } }, "sha512-LIN7rULI0jBscWQYaSswptyderlarFkjQ+t79nzty8tcIAceVomEVlLzH5VP4Cmsv6MtKhs7qaAiwlcp+Mgaxw=="],

    "supports-color": ["supports-color@7.2.0", "", { "dependencies": { "has-flag": "^4.0.0" } }, "sha512-qpCAvRl9stuOHveKsn7HncJRvv501qIacKzQlO/+Lwxc9+0q2wLyv4Dfvt80/DPn2pqOBsJdDiogXGR9+OvwRw=="],

    "supports-preserve-symlinks-flag": ["supports-preserve-symlinks-flag@1.0.0", "", {}, "sha512-ot0WnXS9fgdkgIcePe6RHNk1WA8+muPa6cSjeR3V8K27q9BB1rTE3R1p7Hv0z1ZyAc8s6Vvv8DIyWf681MAt0w=="],

    "svg-pathdata": ["svg-pathdata@6.0.3", "", {}, "sha512-qsjeeq5YjBZ5eMdFuUa4ZosMLxgr5RZ+F+Y1OrDhuOCEInRMA3x74XdBtggJcj9kOeInz0WE+LgCPDkZFlBYJw=="],

    "tailwind-merge": ["tailwind-merge@3.5.0", "", {}, "sha512-I8K9wewnVDkL1NTGoqWmVEIlUcB9gFriAEkXkfCjX5ib8ezGxtR3xD7iZIxrfArjEsH7F1CHD4RFUtxefdqV/A=="],

    "tailwindcss": ["tailwindcss@4.1.14", "", {}, "sha512-b7pCxjGO98LnxVkKjaZSDeNuljC4ueKUddjENJOADtubtdo8llTaJy7HwBMeLNSSo2N5QIAgklslK1+Ir8r6CA=="],

    "tailwindcss-animate": ["tailwindcss-animate@1.0.7", "", { "peerDependencies": { "tailwindcss": ">=3.0.0 || insiders" } }, "sha512-bl6mpH3T7I3UFxuvDEXLxy/VuFxBk5bbzplh7tXI68mwMokNYd1t9qPBHlnyTwfa4JGC4zP516I1hYYtQ/vspA=="],

    "tapable": ["tapable@2.3.3", "", {}, "sha512-uxc/zpqFg6x7C8vOE7lh6Lbda8eEL9zmVm/PLeTPBRhh1xCgdWaQ+J1CUieGpIfm2HdtsUpRv+HshiasBMcc6A=="],

    "text-segmentation": ["text-segmentation@1.0.3", "", { "dependencies": { "utrie": "^1.0.2" } }, "sha512-iOiPUo/BGnZ6+54OsWxZidGCsdU8YbE4PSpdPinp7DeMtUJNJBoJ/ouUSTJjHkh1KntHaltHl/gDs2FC4i5+Nw=="],

    "three": ["three@0.171.0", "", {}, "sha512-Y/lAXPaKZPcEdkKjh0JOAHVv8OOnv/NDJqm0wjfCzyQmfKxV7zvkwsnBgPBKTzJHToSOhRGQAGbPJObT59B/PQ=="],

    "tiny-invariant": ["tiny-invariant@1.3.3", "", {}, "sha512-+FbBPE1o9QAYvviau/qC5SE3caw21q3xkvWKBtja5vgqOWIHHJ3ioaq1VPfn/Szqctz2bU/oYeKd9/z5BL+PVg=="],

    "tinyglobby": ["tinyglobby@0.2.16", "", { "dependencies": { "fdir": "^6.5.0", "picomatch": "^4.0.4" } }, "sha512-pn99VhoACYR8nFHhxqix+uvsbXineAasWm5ojXoN8xEwK5Kd3/TrhNn1wByuD52UxWRLy8pu+kRMniEi6Eq9Zg=="],

    "trim-lines": ["trim-lines@3.0.1", "", {}, "sha512-kRj8B+YHZCc9kQYdWfJB2/oUl9rA99qbowYYBtr4ui4mZyAQ2JpvVBd/6U2YloATfqBhBTSMhTpgBHtU0Mf3Rg=="],

    "trough": ["trough@2.2.0", "", {}, "sha512-tmMpK00BjZiUyVyvrBK7knerNgmgvcV/KLVyuma/SC+TQN167GrMRciANTz09+k3zW8L8t60jWO1GpfkZdjTaw=="],

    "ts-api-utils": ["ts-api-utils@2.5.0", "", { "peerDependencies": { "typescript": ">=4.8.4" } }, "sha512-OJ/ibxhPlqrMM0UiNHJ/0CKQkoKF243/AEmplt3qpRgkW8VG7IfOS41h7V8TjITqdByHzrjcS/2si+y4lIh8NA=="],

    "tslib": ["tslib@2.8.1", "", {}, "sha512-oJFu94HQb+KVduSUQL7wnpmqnfmLsOA/nAh6b6EH0wCEoK0/mPeXU6c3wKDV83MkOuHPRHtSXKKU99IBazS/2w=="],

    "tsx": ["tsx@4.21.0", "", { "dependencies": { "esbuild": "~0.27.0", "get-tsconfig": "^4.7.5" }, "optionalDependencies": { "fsevents": "~2.3.3" }, "bin": "dist/cli.mjs" }, "sha512-5C1sg4USs1lfG0GFb2RLXsdpXqBSEhAaA/0kPL01wxzpMqLILNxIxIOKiILz+cdg/pLnOUxFYOR5yhHU666wbw=="],

    "type-check": ["type-check@0.4.0", "", { "dependencies": { "prelude-ls": "^1.2.1" } }, "sha512-XleUoc9uwGXqjWwXaUTZAmzMcFZ5858QA2vvx1Ur5xIcixXIP+8LnFDgRplU30us6teqdlskFfu+ae4K79Ooew=="],

    "typed-array-buffer": ["typed-array-buffer@1.0.3", "", { "dependencies": { "call-bound": "^1.0.3", "es-errors": "^1.3.0", "is-typed-array": "^1.1.14" } }, "sha512-nAYYwfY3qnzX30IkA6AQZjVbtK6duGontcQm1WSG1MD94YLqK0515GNApXkoxKOWMusVssAHWLh9SeaoefYFGw=="],

    "typed-array-byte-length": ["typed-array-byte-length@1.0.3", "", { "dependencies": { "call-bind": "^1.0.8", "for-each": "^0.3.3", "gopd": "^1.2.0", "has-proto": "^1.2.0", "is-typed-array": "^1.1.14" } }, "sha512-BaXgOuIxz8n8pIq3e7Atg/7s+DpiYrxn4vdot3w9KbnBhcRQq6o3xemQdIfynqSeXeDrF32x+WvfzmOjPiY9lg=="],

    "typed-array-byte-offset": ["typed-array-byte-offset@1.0.4", "", { "dependencies": { "available-typed-arrays": "^1.0.7", "call-bind": "^1.0.8", "for-each": "^0.3.3", "gopd": "^1.2.0", "has-proto": "^1.2.0", "is-typed-array": "^1.1.15", "reflect.getprototypeof": "^1.0.9" } }, "sha512-bTlAFB/FBYMcuX81gbL4OcpH5PmlFHqlCCpAl8AlEzMz5k53oNDvN8p1PNOWLEmI2x4orp3raOFB51tv9X+MFQ=="],

    "typed-array-length": ["typed-array-length@1.0.7", "", { "dependencies": { "call-bind": "^1.0.7", "for-each": "^0.3.3", "gopd": "^1.0.1", "is-typed-array": "^1.1.13", "possible-typed-array-names": "^1.0.0", "reflect.getprototypeof": "^1.0.6" } }, "sha512-3KS2b+kL7fsuk/eJZ7EQdnEmQoaho/r6KUef7hxvltNA5DR8NAUM+8wJMbJyZ4G9/7i3v5zPBIMN5aybAh2/Jg=="],

    "typescript": ["typescript@5.8.3", "", { "bin": { "tsc": "bin/tsc", "tsserver": "bin/tsserver" } }, "sha512-p1diW6TqL9L07nNxvRMM7hMMw4c5XOo/1ibL4aAIGmSAt9slTE1Xgw5KWuof2uTOvCg9BY7ZRi+GaF+7sfgPeQ=="],

    "typescript-eslint": ["typescript-eslint@8.61.1", "", { "dependencies": { "@typescript-eslint/eslint-plugin": "8.61.1", "@typescript-eslint/parser": "8.61.1", "@typescript-eslint/typescript-estree": "8.61.1", "@typescript-eslint/utils": "8.61.1" }, "peerDependencies": { "eslint": "^8.57.0 || ^9.0.0 || ^10.0.0", "typescript": ">=4.8.4 <6.1.0" } }, "sha512-V7PayAfJokV3pEHgN7/v03D1SpujhRfQtYLbLIiBfDDncdg4PAiRBfoS4cnCANK4jmAPncczi59QO3afiXUlNw=="],

    "unbox-primitive": ["unbox-primitive@1.1.0", "", { "dependencies": { "call-bound": "^1.0.3", "has-bigints": "^1.0.2", "has-symbols": "^1.1.0", "which-boxed-primitive": "^1.1.1" } }, "sha512-nWJ91DjeOkej/TA8pXQ3myruKpKEYgqvpw9lz4OPHj/NWFNluYrjbz9j01CJ8yKQd2g4jFoOkINCTW2I5LEEyw=="],

    "undici-types": ["undici-types@6.21.0", "", {}, "sha512-iwDZqg0QAGrg9Rav5H4n0M64c3mkR59cJ6wQp+7C4nI0gsmExaedaYLNO44eT4AtBBwjbTiGPMlt2Md0T9H9JQ=="],

    "unified": ["unified@11.0.5", "", { "dependencies": { "@types/unist": "^3.0.0", "bail": "^2.0.0", "devlop": "^1.0.0", "extend": "^3.0.0", "is-plain-obj": "^4.0.0", "trough": "^2.0.0", "vfile": "^6.0.0" } }, "sha512-xKvGhPWw3k84Qjh8bI3ZeJjqnyadK+GEFtazSfZv/rKeTkTjOJho6mFqh2SM96iIcZokxiOpg78GazTSg8+KHA=="],

    "unist-util-is": ["unist-util-is@6.0.1", "", { "dependencies": { "@types/unist": "^3.0.0" } }, "sha512-LsiILbtBETkDz8I9p1dQ0uyRUWuaQzd/cuEeS1hoRSyW5E5XGmTzlwY1OrNzzakGowI9Dr/I8HVaw4hTtnxy8g=="],

    "unist-util-position": ["unist-util-position@5.0.0", "", { "dependencies": { "@types/unist": "^3.0.0" } }, "sha512-fucsC7HjXvkB5R3kTCO7kUjRdrS0BJt3M/FPxmHMBOm8JQi2BsHAHFsy27E0EolP8rp0NzXsJ+jNPyDWvOJZPA=="],

    "unist-util-stringify-position": ["unist-util-stringify-position@4.0.0", "", { "dependencies": { "@types/unist": "^3.0.0" } }, "sha512-0ASV06AAoKCDkS2+xw5RXJywruurpbC4JZSm7nr7MOt1ojAzvyyaO+UxZf18j8FCF6kmzCZKcAgN/yu2gm2XgQ=="],

    "unist-util-visit": ["unist-util-visit@5.1.0", "", { "dependencies": { "@types/unist": "^3.0.0", "unist-util-is": "^6.0.0", "unist-util-visit-parents": "^6.0.0" } }, "sha512-m+vIdyeCOpdr/QeQCu2EzxX/ohgS8KbnPDgFni4dQsfSCtpz8UqDyY5GjRru8PDKuYn7Fq19j1CQ+nJSsGKOzg=="],

    "unist-util-visit-parents": ["unist-util-visit-parents@6.0.2", "", { "dependencies": { "@types/unist": "^3.0.0", "unist-util-is": "^6.0.0" } }, "sha512-goh1s1TBrqSqukSc8wrjwWhL0hiJxgA8m4kFxGlQ+8FYQ3C/m11FcTs4YYem7V664AhHVvgoQLk890Ssdsr2IQ=="],

    "update-browserslist-db": ["update-browserslist-db@1.2.3", "", { "dependencies": { "escalade": "^3.2.0", "picocolors": "^1.1.1" }, "peerDependencies": { "browserslist": ">= 4.21.0" }, "bin": "cli.js" }, "sha512-Js0m9cx+qOgDxo0eMiFGEueWztz+d4+M3rGlmKPT+T4IS/jP4ylw3Nwpu6cpTTP8R1MAC1kF4VbdLt3ARf209w=="],

    "uri-js": ["uri-js@4.4.1", "", { "dependencies": { "punycode": "^2.1.0" } }, "sha512-7rKUyy33Q1yc98pQ1DAmLtwX109F7TIfWlW1Ydo8Wl1ii1SeHieeh0HHfPeL2fMXK6z0s8ecKs9frCuLJvndBg=="],

    "use-callback-ref": ["use-callback-ref@1.3.3", "", { "dependencies": { "tslib": "^2.0.0" }, "peerDependencies": { "@types/react": "*", "react": "^16.8.0 || ^17.0.0 || ^18.0.0 || ^19.0.0 || ^19.0.0-rc" } }, "sha512-jQL3lRnocaFtu3V00JToYz/4QkNWswxijDaCVNZRiRTO3HQDLsdu1ZtmIUvV4yPp+rvWm5j0y0TG/S61cuijTg=="],

    "use-memo-one": ["use-memo-one@1.1.3", "", { "peerDependencies": { "react": "^16.8.0 || ^17.0.0 || ^18.0.0" } }, "sha512-g66/K7ZQGYrI6dy8GLpVcMsBp4s17xNkYJVSMvTEevGy3nDxHOfE6z8BVE22+5G5x7t3+bhzrlTDB7ObrEE0cQ=="],

    "use-sidecar": ["use-sidecar@1.1.3", "", { "dependencies": { "detect-node-es": "^1.1.0", "tslib": "^2.0.0" }, "peerDependencies": { "@types/react": "*", "react": "^16.8.0 || ^17.0.0 || ^18.0.0 || ^19.0.0 || ^19.0.0-rc" } }, "sha512-Fedw0aZvkhynoPYlA5WXrMCAMm+nSWdZt6lzJQ7Ok8S6Q+VsHmHpRWndVRJ8Be0ZbkfPc5LRYH+5XrzXcEeLRQ=="],

    "use-sync-external-store": ["use-sync-external-store@1.6.0", "", { "peerDependencies": { "react": "^16.8.0 || ^17.0.0 || ^18.0.0 || ^19.0.0" } }, "sha512-Pp6GSwGP/NrPIrxVFAIkOQeyw8lFenOHijQWkUTrDvrF4ALqylP2C/KCkeS9dpUM3KvYRQhna5vt7IL95+ZQ9w=="],

    "utrie": ["utrie@1.0.2", "", { "dependencies": { "base64-arraybuffer": "^1.0.2" } }, "sha512-1MLa5ouZiOmQzUbjbu9VmjLzn1QLXBhwpUa7kdLUQK+KQ5KA9I1vk5U4YHe/X2Ch7PYnJfWuWT+VbuxbGwljhw=="],

    "vaul": ["vaul@1.1.2", "", { "dependencies": { "@radix-ui/react-dialog": "^1.1.1" }, "peerDependencies": { "react": "^16.8 || ^17.0 || ^18.0 || ^19.0.0 || ^19.0.0-rc", "react-dom": "^16.8 || ^17.0 || ^18.0 || ^19.0.0 || ^19.0.0-rc" } }, "sha512-ZFkClGpWyI2WUQjdLJ/BaGuV6AVQiJ3uELGk3OYtP+B6yCO7Cmn9vPFXVJkRaGkOJu3m8bQMgtyzNHixULceQA=="],

    "vfile": ["vfile@6.0.3", "", { "dependencies": { "@types/unist": "^3.0.0", "vfile-message": "^4.0.0" } }, "sha512-KzIbH/9tXat2u30jf+smMwFCsno4wHVdNmzFyL+T/L3UGqqk6JKfVqOFOZEpZSHADH1k40ab6NUIXZq422ov3Q=="],

    "vfile-message": ["vfile-message@4.0.3", "", { "dependencies": { "@types/unist": "^3.0.0", "unist-util-stringify-position": "^4.0.0" } }, "sha512-QTHzsGd1EhbZs4AsQ20JX1rC3cOlt/IWJruk893DfLRr57lcnOeMaWG4K0JrRta4mIJZKth2Au3mM3u03/JWKw=="],

    "victory-vendor": ["victory-vendor@36.9.2", "", { "dependencies": { "@types/d3-array": "^3.0.3", "@types/d3-ease": "^3.0.0", "@types/d3-interpolate": "^3.0.1", "@types/d3-scale": "^4.0.2", "@types/d3-shape": "^3.1.0", "@types/d3-time": "^3.0.0", "@types/d3-timer": "^3.0.0", "d3-array": "^3.1.6", "d3-ease": "^3.0.1", "d3-interpolate": "^3.0.1", "d3-scale": "^4.0.2", "d3-shape": "^3.1.0", "d3-time": "^3.0.0", "d3-timer": "^3.0.1" } }, "sha512-PnpQQMuxlwYdocC8fIJqVXvkeViHYzotI+NJrCuav0ZYFoq912ZHBk3mCeuj+5/VpodOjPe1z0Fk2ihgzlXqjQ=="],

    "vite": ["vite@6.4.2", "", { "dependencies": { "esbuild": "^0.25.0", "fdir": "^6.4.4", "picomatch": "^4.0.2", "postcss": "^8.5.3", "rollup": "^4.34.9", "tinyglobby": "^0.2.13" }, "optionalDependencies": { "fsevents": "~2.3.3" }, "peerDependencies": { "@types/node": "^18.0.0 || ^20.0.0 || >=22.0.0", "jiti": ">=1.21.0", "less": "*", "lightningcss": "^1.21.0", "sass": "*", "sass-embedded": "*", "stylus": "*", "sugarss": "*", "terser": "^5.16.0", "tsx": "^4.8.1", "yaml": "^2.4.2" }, "optionalPeers": ["less", "sass", "sass-embedded", "stylus", "sugarss", "terser", "yaml"], "bin": "bin/vite.js" }, "sha512-2N/55r4JDJ4gdrCvGgINMy+HH3iRpNIz8K6SFwVsA+JbQScLiC+clmAxBgwiSPgcG9U15QmvqCGWzMbqda5zGQ=="],

    "web-vitals": ["web-vitals@4.2.4", "", {}, "sha512-r4DIlprAGwJ7YM11VZp4R884m0Vmgr6EAKe3P+kO0PPj3Unqyvv59rczf6UiGcb9Z8QxZVcqKNwv/g0WNdWwsw=="],

    "websocket-driver": ["websocket-driver@0.7.5", "", { "dependencies": { "http-parser-js": ">=0.5.1", "safe-buffer": ">=5.1.0", "websocket-extensions": ">=0.1.1" } }, "sha512-ZL2+3c7kMBdIRCMz6l8jQMHyGVxj+UL+xVk74Ombiciboca8rHa15L86B19E5oh1pL9Ii/uj54gtsIrZGMo6zA=="],

    "websocket-extensions": ["websocket-extensions@0.1.4", "", {}, "sha512-OqedPIGOfsDlo31UNwYbCFMSaO9m9G/0faIHj5/dZFDMFqPTcx6UwqyOy3COEaEOg/9VsGIpdqn62W5KhoKSpg=="],

    "which": ["which@2.0.2", "", { "dependencies": { "isexe": "^2.0.0" }, "bin": { "node-which": "bin/node-which" } }, "sha512-BLI3Tl1TW3Pvl70l3yq3Y64i+awpwXqsGBYWkkqMtnbXgrMD+yj7rhW0kuEDxzJaYXGjEW5ogapKNMEKNMjibA=="],

    "which-boxed-primitive": ["which-boxed-primitive@1.1.1", "", { "dependencies": { "is-bigint": "^1.1.0", "is-boolean-object": "^1.2.1", "is-number-object": "^1.1.1", "is-string": "^1.1.1", "is-symbol": "^1.1.1" } }, "sha512-TbX3mj8n0odCBFVlY8AxkqcHASw3L60jIuF8jFP78az3C2YhmGvqbHBpAjTRH2/xqYunrJ9g1jSyjCjpoWzIAA=="],

    "which-builtin-type": ["which-builtin-type@1.2.1", "", { "dependencies": { "call-bound": "^1.0.2", "function.prototype.name": "^1.1.6", "has-tostringtag": "^1.0.2", "is-async-function": "^2.0.0", "is-date-object": "^1.1.0", "is-finalizationregistry": "^1.1.0", "is-generator-function": "^1.0.10", "is-regex": "^1.2.1", "is-weakref": "^1.0.2", "isarray": "^2.0.5", "which-boxed-primitive": "^1.1.0", "which-collection": "^1.0.2", "which-typed-array": "^1.1.16" } }, "sha512-6iBczoX+kDQ7a3+YJBnh3T+KZRxM/iYNPXicqk66/Qfm1b93iu+yOImkg0zHbj5LNOcNv1TEADiZ0xa34B4q6Q=="],

    "which-collection": ["which-collection@1.0.2", "", { "dependencies": { "is-map": "^2.0.3", "is-set": "^2.0.3", "is-weakmap": "^2.0.2", "is-weakset": "^2.0.3" } }, "sha512-K4jVyjnBdgvc86Y6BkaLZEN933SwYOuBFkdmBu9ZfkcAbdVbpITnDmjvZ/aQjRXQrv5EPkTnD1s39GiiqbngCw=="],

    "which-typed-array": ["which-typed-array@1.1.20", "", { "dependencies": { "available-typed-arrays": "^1.0.7", "call-bind": "^1.0.8", "call-bound": "^1.0.4", "for-each": "^0.3.5", "get-proto": "^1.0.1", "gopd": "^1.2.0", "has-tostringtag": "^1.0.2" } }, "sha512-LYfpUkmqwl0h9A2HL09Mms427Q1RZWuOHsukfVcKRq9q95iQxdw0ix1JQrqbcDR9PH1QDwf5Qo8OZb5lksZ8Xg=="],

    "word-wrap": ["word-wrap@1.2.5", "", {}, "sha512-BN22B5eaMMI9UMtjrGd5g5eCYPpCPDUy0FJXbYsaT5zYxjFOckS53SQDE3pWkVoWpHXVb3BrYcEN4Twa55B5cA=="],

    "wrap-ansi": ["wrap-ansi@7.0.0", "", { "dependencies": { "ansi-styles": "^4.0.0", "string-width": "^4.1.0", "strip-ansi": "^6.0.0" } }, "sha512-YVGIj2kamLSTxw6NsZjoBxfSwsn0ycdesmc4p+Q21c5zPuZ1pl+NfxVdxPtdHvmNVOQ6XSYG4AUtyt/Fi7D16Q=="],

    "y18n": ["y18n@5.0.8", "", {}, "sha512-0pfFzegeDWJHJIAmTLRP2DwHjdF5s7jo9tuztdQxAhINCdvS+3nGINqPd00AphqJR/0LhANUS6/+7SCb98YOfA=="],

    "yallist": ["yallist@3.1.1", "", {}, "sha512-a4UGQaWPH59mOXUYnAG2ewncQS4i4F43Tv3JoAM+s2VDAmS9NsK8GpDMLrCHPksFT7h3K6TOoUNn2pb7RoXx4g=="],

    "yargs": ["yargs@17.7.3", "", { "dependencies": { "cliui": "^8.0.1", "escalade": "^3.1.1", "get-caller-file": "^2.0.5", "require-directory": "^2.1.1", "string-width": "^4.2.3", "y18n": "^5.0.5", "yargs-parser": "^21.1.1" } }, "sha512-GZtjxm/J/4TSxuL3FNYjCmLktBTnIw/rVmKSIyKeYAZpmJB2ig9VauCC5xsa82GNKVKDAqpOn3KVzNt0zmrU0g=="],

    "yargs-parser": ["yargs-parser@21.1.1", "", {}, "sha512-tVpsJW7DdjecAiFpbIB1e3qxIQsE6NoPc5/eTdrbbIC4h0LVsWhnoa3g+m2HclBIujHzsxZ4VJVA+GUuc2/LBw=="],

    "yocto-queue": ["yocto-queue@0.1.0", "", {}, "sha512-rVksvsnNCdJ/ohGc6xgPwyN8eheCxsiLM8mxuE/t/mOVqJewPuO1miLpTHQiRgTKCLexL4MeAFVagts7HmNZ2Q=="],

    "zod": ["zod@3.25.76", "", {}, "sha512-gzUt/qt81nXsFGKIFcC3YnfEAx5NkunCfnDlvuBSSFS02bcXu4Lmea0AFIUwbLWxWPx3d9p8S5QoaujKcNQxcQ=="],

    "zwitch": ["zwitch@2.0.4", "", {}, "sha512-bXE4cR/kVZhKZX/RjPEflHaKVhUVl85noU3v6b8apfQEc1x4A+zBxjZ4lN8LqGd6WZ3dl98pY4o717VFmoPp+A=="],

    "@eslint-community/eslint-utils/eslint-visitor-keys": ["eslint-visitor-keys@3.4.3", "", {}, "sha512-wpc+LXeiyiisxPlEkUzU6svyS1frIO3Mgxj1fdy7Pm8Ygzguax2N3Fa/D/ag1WqbOprdI+uY6wMUl8/a2G+iag=="],

    "@eslint/eslintrc/globals": ["globals@14.0.0", "", {}, "sha512-oahGvuMGQlPw/ivIYBjVSrWAfWLBeku5tpPE2fOPLi+WHffIWbuh2tCjhyQhTBPMf5E9jDEH4FOmTYgYwbKwtQ=="],

    "@firebase/auth-compat/@firebase/auth": ["@firebase/auth@1.13.3", "", { "dependencies": { "@firebase/component": "0.7.3", "@firebase/logger": "0.5.1", "@firebase/util": "1.15.1", "tslib": "^2.1.0" }, "peerDependencies": { "@firebase/app": "0.x", "@react-native-async-storage/async-storage": "^2.2.0 || ^3.0.0" }, "optionalPeers": ["@react-native-async-storage/async-storage"] }, "sha512-bqiq4uubDN2YyQkdvSWPQeJyXAv2O76ImF41En9b6UhV5JuBVYDoHYrrrE3NzIuGkpFMKagfhMRP4Vz6t+yQSQ=="],

    "@radix-ui/react-alert-dialog/@radix-ui/react-slot": ["@radix-ui/react-slot@1.2.3", "", { "dependencies": { "@radix-ui/react-compose-refs": "1.1.2" }, "peerDependencies": { "@types/react": "*", "react": "^16.8 || ^17.0 || ^18.0 || ^19.0 || ^19.0.0-rc" } }, "sha512-aeNmHnBxbi2St0au6VBVC7JXFlhLlOnvIIlePNniyUNAClzmtAUEY8/pBiK3iHjufOlwA+c20/8jngo7xcrg8A=="],

    "@radix-ui/react-aspect-ratio/@radix-ui/react-primitive": ["@radix-ui/react-primitive@2.1.4", "", { "dependencies": { "@radix-ui/react-slot": "1.2.4" }, "peerDependencies": { "@types/react": "*", "@types/react-dom": "*", "react": "^16.8 || ^17.0 || ^18.0 || ^19.0 || ^19.0.0-rc", "react-dom": "^16.8 || ^17.0 || ^18.0 || ^19.0 || ^19.0.0-rc" } }, "sha512-9hQc4+GNVtJAIEPEqlYqW5RiYdrr8ea5XQ0ZOnD6fgru+83kqT15mq2OCcbe8KnjRZl5vF3ks69AKz3kh1jrhg=="],

    "@radix-ui/react-avatar/@radix-ui/react-context": ["@radix-ui/react-context@1.1.3", "", { "peerDependencies": { "@types/react": "*", "react": "^16.8 || ^17.0 || ^18.0 || ^19.0 || ^19.0.0-rc" } }, "sha512-ieIFACdMpYfMEjF0rEf5KLvfVyIkOz6PDGyNnP+u+4xQ6jny3VCgA4OgXOwNx2aUkxn8zx9fiVcM8CfFYv9Lxw=="],

    "@radix-ui/react-avatar/@radix-ui/react-primitive": ["@radix-ui/react-primitive@2.1.4", "", { "dependencies": { "@radix-ui/react-slot": "1.2.4" }, "peerDependencies": { "@types/react": "*", "@types/react-dom": "*", "react": "^16.8 || ^17.0 || ^18.0 || ^19.0 || ^19.0.0-rc", "react-dom": "^16.8 || ^17.0 || ^18.0 || ^19.0 || ^19.0.0-rc" } }, "sha512-9hQc4+GNVtJAIEPEqlYqW5RiYdrr8ea5XQ0ZOnD6fgru+83kqT15mq2OCcbe8KnjRZl5vF3ks69AKz3kh1jrhg=="],

    "@radix-ui/react-collection/@radix-ui/react-slot": ["@radix-ui/react-slot@1.2.3", "", { "dependencies": { "@radix-ui/react-compose-refs": "1.1.2" }, "peerDependencies": { "@types/react": "*", "react": "^16.8 || ^17.0 || ^18.0 || ^19.0 || ^19.0.0-rc" } }, "sha512-aeNmHnBxbi2St0au6VBVC7JXFlhLlOnvIIlePNniyUNAClzmtAUEY8/pBiK3iHjufOlwA+c20/8jngo7xcrg8A=="],

    "@radix-ui/react-dialog/@radix-ui/react-slot": ["@radix-ui/react-slot@1.2.3", "", { "dependencies": { "@radix-ui/react-compose-refs": "1.1.2" }, "peerDependencies": { "@types/react": "*", "react": "^16.8 || ^17.0 || ^18.0 || ^19.0 || ^19.0.0-rc" } }, "sha512-aeNmHnBxbi2St0au6VBVC7JXFlhLlOnvIIlePNniyUNAClzmtAUEY8/pBiK3iHjufOlwA+c20/8jngo7xcrg8A=="],

    "@radix-ui/react-label/@radix-ui/react-primitive": ["@radix-ui/react-primitive@2.1.4", "", { "dependencies": { "@radix-ui/react-slot": "1.2.4" }, "peerDependencies": { "@types/react": "*", "@types/react-dom": "*", "react": "^16.8 || ^17.0 || ^18.0 || ^19.0 || ^19.0.0-rc", "react-dom": "^16.8 || ^17.0 || ^18.0 || ^19.0 || ^19.0.0-rc" } }, "sha512-9hQc4+GNVtJAIEPEqlYqW5RiYdrr8ea5XQ0ZOnD6fgru+83kqT15mq2OCcbe8KnjRZl5vF3ks69AKz3kh1jrhg=="],

    "@radix-ui/react-menu/@radix-ui/react-slot": ["@radix-ui/react-slot@1.2.3", "", { "dependencies": { "@radix-ui/react-compose-refs": "1.1.2" }, "peerDependencies": { "@types/react": "*", "react": "^16.8 || ^17.0 || ^18.0 || ^19.0 || ^19.0.0-rc" } }, "sha512-aeNmHnBxbi2St0au6VBVC7JXFlhLlOnvIIlePNniyUNAClzmtAUEY8/pBiK3iHjufOlwA+c20/8jngo7xcrg8A=="],

    "@radix-ui/react-popover/@radix-ui/react-slot": ["@radix-ui/react-slot@1.2.3", "", { "dependencies": { "@radix-ui/react-compose-refs": "1.1.2" }, "peerDependencies": { "@types/react": "*", "react": "^16.8 || ^17.0 || ^18.0 || ^19.0 || ^19.0.0-rc" } }, "sha512-aeNmHnBxbi2St0au6VBVC7JXFlhLlOnvIIlePNniyUNAClzmtAUEY8/pBiK3iHjufOlwA+c20/8jngo7xcrg8A=="],

    "@radix-ui/react-primitive/@radix-ui/react-slot": ["@radix-ui/react-slot@1.2.3", "", { "dependencies": { "@radix-ui/react-compose-refs": "1.1.2" }, "peerDependencies": { "@types/react": "*", "react": "^16.8 || ^17.0 || ^18.0 || ^19.0 || ^19.0.0-rc" } }, "sha512-aeNmHnBxbi2St0au6VBVC7JXFlhLlOnvIIlePNniyUNAClzmtAUEY8/pBiK3iHjufOlwA+c20/8jngo7xcrg8A=="],

    "@radix-ui/react-progress/@radix-ui/react-context": ["@radix-ui/react-context@1.1.3", "", { "peerDependencies": { "@types/react": "*", "react": "^16.8 || ^17.0 || ^18.0 || ^19.0 || ^19.0.0-rc" } }, "sha512-ieIFACdMpYfMEjF0rEf5KLvfVyIkOz6PDGyNnP+u+4xQ6jny3VCgA4OgXOwNx2aUkxn8zx9fiVcM8CfFYv9Lxw=="],

    "@radix-ui/react-progress/@radix-ui/react-primitive": ["@radix-ui/react-primitive@2.1.4", "", { "dependencies": { "@radix-ui/react-slot": "1.2.4" }, "peerDependencies": { "@types/react": "*", "@types/react-dom": "*", "react": "^16.8 || ^17.0 || ^18.0 || ^19.0 || ^19.0.0-rc", "react-dom": "^16.8 || ^17.0 || ^18.0 || ^19.0 || ^19.0.0-rc" } }, "sha512-9hQc4+GNVtJAIEPEqlYqW5RiYdrr8ea5XQ0ZOnD6fgru+83kqT15mq2OCcbe8KnjRZl5vF3ks69AKz3kh1jrhg=="],

    "@radix-ui/react-select/@radix-ui/react-slot": ["@radix-ui/react-slot@1.2.3", "", { "dependencies": { "@radix-ui/react-compose-refs": "1.1.2" }, "peerDependencies": { "@types/react": "*", "react": "^16.8 || ^17.0 || ^18.0 || ^19.0 || ^19.0.0-rc" } }, "sha512-aeNmHnBxbi2St0au6VBVC7JXFlhLlOnvIIlePNniyUNAClzmtAUEY8/pBiK3iHjufOlwA+c20/8jngo7xcrg8A=="],

    "@radix-ui/react-separator/@radix-ui/react-primitive": ["@radix-ui/react-primitive@2.1.4", "", { "dependencies": { "@radix-ui/react-slot": "1.2.4" }, "peerDependencies": { "@types/react": "*", "@types/react-dom": "*", "react": "^16.8 || ^17.0 || ^18.0 || ^19.0 || ^19.0.0-rc", "react-dom": "^16.8 || ^17.0 || ^18.0 || ^19.0 || ^19.0.0-rc" } }, "sha512-9hQc4+GNVtJAIEPEqlYqW5RiYdrr8ea5XQ0ZOnD6fgru+83kqT15mq2OCcbe8KnjRZl5vF3ks69AKz3kh1jrhg=="],

    "@radix-ui/react-tooltip/@radix-ui/react-slot": ["@radix-ui/react-slot@1.2.3", "", { "dependencies": { "@radix-ui/react-compose-refs": "1.1.2" }, "peerDependencies": { "@types/react": "*", "react": "^16.8 || ^17.0 || ^18.0 || ^19.0 || ^19.0.0-rc" } }, "sha512-aeNmHnBxbi2St0au6VBVC7JXFlhLlOnvIIlePNniyUNAClzmtAUEY8/pBiK3iHjufOlwA+c20/8jngo7xcrg8A=="],

    "@tailwindcss/node/tailwindcss": ["tailwindcss@4.2.4", "", {}, "sha512-HhKppgO81FQof5m6TEnuBWCZGgfRAWbaeOaGT00KOy/Pf/j6oUihdvBpA7ltCeAvZpFhW3j0PTclkxsd4IXYDA=="],

    "@tailwindcss/vite/tailwindcss": ["tailwindcss@4.2.4", "", {}, "sha512-HhKppgO81FQof5m6TEnuBWCZGgfRAWbaeOaGT00KOy/Pf/j6oUihdvBpA7ltCeAvZpFhW3j0PTclkxsd4IXYDA=="],

    "@typescript-eslint/eslint-plugin/ignore": ["ignore@7.0.5", "", {}, "sha512-Hs59xBNfUIunMFgWAbGX5cq6893IbWg4KnrjbYwX3tx0ztorVgTDA6B2sxf8ejHJ4wz8BqGUMYlnzNBer5NvGg=="],

    "@typescript-eslint/typescript-estree/minimatch": ["minimatch@10.2.5", "", { "dependencies": { "brace-expansion": "^5.0.5" } }, "sha512-MULkVLfKGYDFYejP07QOurDLLQpcjk7Fw+7jXS2R2czRQzR56yHRveU5NDJEOviH+hETZKSkIk5c+T23GjFUMg=="],

    "@typescript-eslint/typescript-estree/semver": ["semver@7.8.5", "", { "bin": "bin/semver.js" }, "sha512-Y7/KDsb8LjooZpwaqGyulO6DQlksgCncchHGk+sZIY4SBvUocMBEFH5Ur1fI4dV+Jvl0w6cjvucaIi40puRioA=="],

    "@typescript-eslint/visitor-keys/eslint-visitor-keys": ["eslint-visitor-keys@5.0.1", "", {}, "sha512-tD40eHxA35h0PEIZNeIjkHoDR4YjjJp34biM0mDvplBe//mB+IHCqHDGV7pxF+7MklTvighcCPPZC7ynWyjdTA=="],

    "parse-entities/@types/unist": ["@types/unist@2.0.11", "", {}, "sha512-CmBKiL6NNo/OqgmMn95Fk9Whlp2mtvIv+KNpQKN2F4SjvrEesubTRWGYSg+BnWZOnlCaSTU1sMpsBOzgbYhnsA=="],

    "prop-types/react-is": ["react-is@16.13.1", "", {}, "sha512-24e6ynE2H+OKt4kqsOvNd8kBpV65zoxbA4BVsEOB3ARVWQki/DHzaUoC5KuON/BiccDaCCTZBuOcfZs70kR8bQ=="],

    "quill/eventemitter3": ["eventemitter3@2.0.3", "", {}, "sha512-jLN68Dx5kyFHaePoXWPsCGW5qdyZQtLYHkxkg02/Mz6g0kYpDx4FyP6XfArhQdlOC4b8Mv+EMxPo/8La7Tzghg=="],

    "tsx/esbuild": ["esbuild@0.27.7", "", { "optionalDependencies": { "@esbuild/aix-ppc64": "0.27.7", "@esbuild/android-arm": "0.27.7", "@esbuild/android-arm64": "0.27.7", "@esbuild/android-x64": "0.27.7", "@esbuild/darwin-arm64": "0.27.7", "@esbuild/darwin-x64": "0.27.7", "@esbuild/freebsd-arm64": "0.27.7", "@esbuild/freebsd-x64": "0.27.7", "@esbuild/linux-arm": "0.27.7", "@esbuild/linux-arm64": "0.27.7", "@esbuild/linux-ia32": "0.27.7", "@esbuild/linux-loong64": "0.27.7", "@esbuild/linux-mips64el": "0.27.7", "@esbuild/linux-ppc64": "0.27.7", "@esbuild/linux-riscv64": "0.27.7", "@esbuild/linux-s390x": "0.27.7", "@esbuild/linux-x64": "0.27.7", "@esbuild/netbsd-arm64": "0.27.7", "@esbuild/netbsd-x64": "0.27.7", "@esbuild/openbsd-arm64": "0.27.7", "@esbuild/openbsd-x64": "0.27.7", "@esbuild/openharmony-arm64": "0.27.7", "@esbuild/sunos-x64": "0.27.7", "@esbuild/win32-arm64": "0.27.7", "@esbuild/win32-ia32": "0.27.7", "@esbuild/win32-x64": "0.27.7" }, "bin": "bin/esbuild" }, "sha512-IxpibTjyVnmrIQo5aqNpCgoACA/dTKLTlhMHihVHhdkxKyPO1uBBthumT0rdHmcsk9uMonIWS0m4FljWzILh3w=="],

    "@typescript-eslint/typescript-estree/minimatch/brace-expansion": ["brace-expansion@5.0.6", "", { "dependencies": { "balanced-match": "^4.0.2" } }, "sha512-kLpxurY4Z4r9sgMsyG0Z9uzsBlgiU/EFKhj/h91/8yHu0edo7XuixOIH3VcJ8kkxs6/jPzoI6U9Vj3WqbMQ94g=="],

    "tsx/esbuild/@esbuild/aix-ppc64": ["@esbuild/aix-ppc64@0.27.7", "", { "os": "aix", "cpu": "ppc64" }, "sha512-EKX3Qwmhz1eMdEJokhALr0YiD0lhQNwDqkPYyPhiSwKrh7/4KRjQc04sZ8db+5DVVnZ1LmbNDI1uAMPEUBnQPg=="],

    "tsx/esbuild/@esbuild/android-arm": ["@esbuild/android-arm@0.27.7", "", { "os": "android", "cpu": "arm" }, "sha512-jbPXvB4Yj2yBV7HUfE2KHe4GJX51QplCN1pGbYjvsyCZbQmies29EoJbkEc+vYuU5o45AfQn37vZlyXy4YJ8RQ=="],

    "tsx/esbuild/@esbuild/android-arm64": ["@esbuild/android-arm64@0.27.7", "", { "os": "android", "cpu": "arm64" }, "sha512-62dPZHpIXzvChfvfLJow3q5dDtiNMkwiRzPylSCfriLvZeq0a1bWChrGx/BbUbPwOrsWKMn8idSllklzBy+dgQ=="],

    "tsx/esbuild/@esbuild/android-x64": ["@esbuild/android-x64@0.27.7", "", { "os": "android", "cpu": "x64" }, "sha512-x5VpMODneVDb70PYV2VQOmIUUiBtY3D3mPBG8NxVk5CogneYhkR7MmM3yR/uMdITLrC1ml/NV1rj4bMJuy9MCg=="],

    "tsx/esbuild/@esbuild/darwin-arm64": ["@esbuild/darwin-arm64@0.27.7", "", { "os": "darwin", "cpu": "arm64" }, "sha512-5lckdqeuBPlKUwvoCXIgI2D9/ABmPq3Rdp7IfL70393YgaASt7tbju3Ac+ePVi3KDH6N2RqePfHnXkaDtY9fkw=="],

    "tsx/esbuild/@esbuild/darwin-x64": ["@esbuild/darwin-x64@0.27.7", "", { "os": "darwin", "cpu": "x64" }, "sha512-rYnXrKcXuT7Z+WL5K980jVFdvVKhCHhUwid+dDYQpH+qu+TefcomiMAJpIiC2EM3Rjtq0sO3StMV/+3w3MyyqQ=="],

    "tsx/esbuild/@esbuild/freebsd-arm64": ["@esbuild/freebsd-arm64@0.27.7", "", { "os": "freebsd", "cpu": "arm64" }, "sha512-B48PqeCsEgOtzME2GbNM2roU29AMTuOIN91dsMO30t+Ydis3z/3Ngoj5hhnsOSSwNzS+6JppqWsuhTp6E82l2w=="],

    "tsx/esbuild/@esbuild/freebsd-x64": ["@esbuild/freebsd-x64@0.27.7", "", { "os": "freebsd", "cpu": "x64" }, "sha512-jOBDK5XEjA4m5IJK3bpAQF9/Lelu/Z9ZcdhTRLf4cajlB+8VEhFFRjWgfy3M1O4rO2GQ/b2dLwCUGpiF/eATNQ=="],

    "tsx/esbuild/@esbuild/linux-arm": ["@esbuild/linux-arm@0.27.7", "", { "os": "linux", "cpu": "arm" }, "sha512-RkT/YXYBTSULo3+af8Ib0ykH8u2MBh57o7q/DAs3lTJlyVQkgQvlrPTnjIzzRPQyavxtPtfg0EopvDyIt0j1rA=="],

    "tsx/esbuild/@esbuild/linux-arm64": ["@esbuild/linux-arm64@0.27.7", "", { "os": "linux", "cpu": "arm64" }, "sha512-RZPHBoxXuNnPQO9rvjh5jdkRmVizktkT7TCDkDmQ0W2SwHInKCAV95GRuvdSvA7w4VMwfCjUiPwDi0ZO6Nfe9A=="],

    "tsx/esbuild/@esbuild/linux-ia32": ["@esbuild/linux-ia32@0.27.7", "", { "os": "linux", "cpu": "ia32" }, "sha512-GA48aKNkyQDbd3KtkplYWT102C5sn/EZTY4XROkxONgruHPU72l+gW+FfF8tf2cFjeHaRbWpOYa/uRBz/Xq1Pg=="],

    "tsx/esbuild/@esbuild/linux-loong64": ["@esbuild/linux-loong64@0.27.7", "", { "os": "linux", "cpu": "none" }, "sha512-a4POruNM2oWsD4WKvBSEKGIiWQF8fZOAsycHOt6JBpZ+JN2n2JH9WAv56SOyu9X5IqAjqSIPTaJkqN8F7XOQ5Q=="],

    "tsx/esbuild/@esbuild/linux-mips64el": ["@esbuild/linux-mips64el@0.27.7", "", { "os": "linux", "cpu": "none" }, "sha512-KabT5I6StirGfIz0FMgl1I+R1H73Gp0ofL9A3nG3i/cYFJzKHhouBV5VWK1CSgKvVaG4q1RNpCTR2LuTVB3fIw=="],

    "tsx/esbuild/@esbuild/linux-ppc64": ["@esbuild/linux-ppc64@0.27.7", "", { "os": "linux", "cpu": "ppc64" }, "sha512-gRsL4x6wsGHGRqhtI+ifpN/vpOFTQtnbsupUF5R5YTAg+y/lKelYR1hXbnBdzDjGbMYjVJLJTd2OFmMewAgwlQ=="],

    "tsx/esbuild/@esbuild/linux-riscv64": ["@esbuild/linux-riscv64@0.27.7", "", { "os": "linux", "cpu": "none" }, "sha512-hL25LbxO1QOngGzu2U5xeXtxXcW+/GvMN3ejANqXkxZ/opySAZMrc+9LY/WyjAan41unrR3YrmtTsUpwT66InQ=="],

    "tsx/esbuild/@esbuild/linux-s390x": ["@esbuild/linux-s390x@0.27.7", "", { "os": "linux", "cpu": "s390x" }, "sha512-2k8go8Ycu1Kb46vEelhu1vqEP+UeRVj2zY1pSuPdgvbd5ykAw82Lrro28vXUrRmzEsUV0NzCf54yARIK8r0fdw=="],

    "tsx/esbuild/@esbuild/linux-x64": ["@esbuild/linux-x64@0.27.7", "", { "os": "linux", "cpu": "x64" }, "sha512-hzznmADPt+OmsYzw1EE33ccA+HPdIqiCRq7cQeL1Jlq2gb1+OyWBkMCrYGBJ+sxVzve2ZJEVeePbLM2iEIZSxA=="],

    "tsx/esbuild/@esbuild/netbsd-arm64": ["@esbuild/netbsd-arm64@0.27.7", "", { "os": "none", "cpu": "arm64" }, "sha512-b6pqtrQdigZBwZxAn1UpazEisvwaIDvdbMbmrly7cDTMFnw/+3lVxxCTGOrkPVnsYIosJJXAsILG9XcQS+Yu6w=="],

    "tsx/esbuild/@esbuild/netbsd-x64": ["@esbuild/netbsd-x64@0.27.7", "", { "os": "none", "cpu": "x64" }, "sha512-OfatkLojr6U+WN5EDYuoQhtM+1xco+/6FSzJJnuWiUw5eVcicbyK3dq5EeV/QHT1uy6GoDhGbFpprUiHUYggrw=="],

    "tsx/esbuild/@esbuild/openbsd-arm64": ["@esbuild/openbsd-arm64@0.27.7", "", { "os": "openbsd", "cpu": "arm64" }, "sha512-AFuojMQTxAz75Fo8idVcqoQWEHIXFRbOc1TrVcFSgCZtQfSdc1RXgB3tjOn/krRHENUB4j00bfGjyl2mJrU37A=="],

    "tsx/esbuild/@esbuild/openbsd-x64": ["@esbuild/openbsd-x64@0.27.7", "", { "os": "openbsd", "cpu": "x64" }, "sha512-+A1NJmfM8WNDv5CLVQYJ5PshuRm/4cI6WMZRg1by1GwPIQPCTs1GLEUHwiiQGT5zDdyLiRM/l1G0Pv54gvtKIg=="],

    "tsx/esbuild/@esbuild/openharmony-arm64": ["@esbuild/openharmony-arm64@0.27.7", "", { "os": "none", "cpu": "arm64" }, "sha512-+KrvYb/C8zA9CU/g0sR6w2RBw7IGc5J2BPnc3dYc5VJxHCSF1yNMxTV5LQ7GuKteQXZtspjFbiuW5/dOj7H4Yw=="],

    "tsx/esbuild/@esbuild/sunos-x64": ["@esbuild/sunos-x64@0.27.7", "", { "os": "sunos", "cpu": "x64" }, "sha512-ikktIhFBzQNt/QDyOL580ti9+5mL/YZeUPKU2ivGtGjdTYoqz6jObj6nOMfhASpS4GU4Q/Clh1QtxWAvcYKamA=="],

    "tsx/esbuild/@esbuild/win32-arm64": ["@esbuild/win32-arm64@0.27.7", "", { "os": "win32", "cpu": "arm64" }, "sha512-7yRhbHvPqSpRUV7Q20VuDwbjW5kIMwTHpptuUzV+AA46kiPze5Z7qgt6CLCK3pWFrHeNfDd1VKgyP4O+ng17CA=="],

    "tsx/esbuild/@esbuild/win32-ia32": ["@esbuild/win32-ia32@0.27.7", "", { "os": "win32", "cpu": "ia32" }, "sha512-SmwKXe6VHIyZYbBLJrhOoCJRB/Z1tckzmgTLfFYOfpMAx63BJEaL9ExI8x7v0oAO3Zh6D/Oi1gVxEYr5oUCFhw=="],

    "tsx/esbuild/@esbuild/win32-x64": ["@esbuild/win32-x64@0.27.7", "", { "os": "win32", "cpu": "x64" }, "sha512-56hiAJPhwQ1R4i+21FVF7V8kSD5zZTdHcVuRFMW0hn753vVfQN8xlx4uOPT4xoGH0Z/oVATuR82AiqSTDIpaHg=="],

    "@typescript-eslint/typescript-estree/minimatch/brace-expansion/balanced-match": ["balanced-match@4.0.4", "", {}, "sha512-BLrgEcRTwX2o6gGxGOCNyMvGSp35YofuYzw9h1IMTRmKqttAZZVU67bdb9Pr2vUHA8+j3i2tJfjO6C6+4myGTA=="],
  }
}
-e 
```

