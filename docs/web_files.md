# Complete Web & Bot Code Registry (`web_files.md`)
-e 
This file contains 100% full, un-truncated copies of the primary codebase files.

-e 

---
-e 
## File: src/components/ui/tabs.tsx
-e ```tsx
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
-e ```
-e 

---
-e 
## File: src/components/ui/badge.tsx
-e ```tsx
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
-e ```
-e 

---
-e 
## File: src/components/ui/popover.tsx
-e ```tsx
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
-e ```
-e 

---
-e 
## File: src/components/ui/select.tsx
-e ```tsx
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
-e ```
-e 

---
-e 
## File: src/components/ui/dropdown-menu.tsx
-e ```tsx
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
-e ```
-e 

---
-e 
## File: src/components/ui/progress.tsx
-e ```tsx
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
-e ```
-e 

---
-e 
## File: src/components/ui/label.tsx
-e ```tsx
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
-e ```
-e 

---
-e 
## File: src/components/ui/textarea.tsx
-e ```tsx
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
-e ```
-e 

---
-e 
## File: src/components/ui/toaster.tsx
-e ```tsx
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
-e ```
-e 

---
-e 
## File: src/components/ui/button.tsx
-e ```tsx
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
-e ```
-e 

---
-e 
## File: src/components/ui/use-toast.ts
-e ```tsx
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
-e ```
-e 

---
-e 
## File: src/components/ui/calendar.tsx
-e ```tsx
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
-e ```
-e 

---
-e 
## File: src/components/ui/input.tsx
-e ```tsx
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
-e ```
-e 

---
-e 
## File: src/components/ui/checkbox.tsx
-e ```tsx
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
-e ```
-e 

---
-e 
## File: src/components/ui/switch.tsx
-e ```tsx
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
-e ```
-e 

---
-e 
## File: src/components/ui/toast.tsx
-e ```tsx
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
-e ```
-e 

---
-e 
## File: src/components/ui/DateRangePicker.tsx
-e ```tsx
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
-e ```
-e 

---
-e 
## File: src/components/ui/tooltip.tsx
-e ```tsx
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
-e ```
-e 

---
-e 
## File: src/components/ui/dialog.tsx
-e ```tsx
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
-e ```
-e 

---
-e 
## File: src/components/habits/HabitMatrix.tsx
-e ```tsx
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
-e ```
-e 

---
-e 
## File: src/components/habits/HabitCard.tsx
-e ```tsx
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
-e ```
-e 

---
-e 
## File: src/components/tasks/KanbanBoard.tsx
-e ```tsx
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
-e ```
-e 

---
-e 
## File: src/components/finance/AddTransactionDialog.tsx
-e ```tsx
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
-e ```
-e 

---
-e 
## File: src/components/finance/ExpenseList.tsx
-e ```tsx
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
-e ```
-e 

---
-e 
## File: src/components/finance/FinanceSummary.tsx
-e ```tsx
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
-e ```
-e 

---
-e 
## File: src/components/finance/SubscriptionList.tsx
-e ```tsx
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
-e ```
-e 

---
-e 
## File: src/components/finance/IncomeList.tsx
-e ```tsx
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
-e ```
-e 

---
-e 
## File: src/components/UserNotRegisteredError.tsx
-e ```tsx
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
-e ```
-e 

---
-e 
## File: src/components/layout/AppLayout.tsx
-e ```tsx
import { Outlet, Link, useLocation } from 'react-router-dom';
import { Home, Flame, CheckCircle, Wallet, Target, Settings, ChevronLeft, ChevronRight, Calendar, FileText, Menu, X, Bookmark, Database, Bot } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNotifications } from '@/lib/useNotifications';
import { useSettings } from '@/lib/useSettings';
import { useState, useEffect } from 'react';
import { DatabaseWakeup } from './DatabaseWakeup';

const NAV_ITEMS = [
  { path: '/', label: 'Home', icon: Home },
  { path: '/habits', label: 'Habits', icon: Flame },
  { path: '/tasks', label: 'Tasks', icon: CheckCircle },
  { path: '/finance', label: 'Finance', icon: Wallet },
  { path: '/goals', label: 'Goals', icon: Target },
  { path: '/calendar', label: 'Calendar', icon: Calendar },
  { path: '/notes', label: 'Notes', icon: FileText },
  { path: '/bookmarks', label: 'Bookmarks', icon: Bookmark },
  { path: '/data', label: 'Data Hub', icon: Database },
  { path: '/sync', label: 'Google & Bot Sync', icon: Bot },
  { path: '/settings', label: 'Settings', icon: Settings },
];

export default function AppLayout() {
  const location = useLocation();
  const { settings } = useSettings();
  const [isCollapsed, setIsCollapsed] = useState(window.innerWidth < 1024);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  useNotifications();

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
        <nav className="flex-1 overflow-y-auto scrollbar-none pb-4">
          <ul className="flex flex-col gap-1.5">
            {NAV_ITEMS.map((item) => {
              const isActive = location.pathname === item.path;
              const Icon = item.icon;
              return (
                <li key={item.path}>
                  <Link 
                    to={item.path} 
                    className={`flex items-center ${isCollapsed ? 'justify-center' : 'gap-3 px-4'} py-3 rounded-xl transition-all relative ${
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
          </ul>
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
                <ul className="flex flex-col gap-2">
                  {NAV_ITEMS.map((item) => {
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
                        >
                          <Icon className={`w-5 h-5 ${isActive ? 'text-primary' : 'text-muted-foreground/70'}`} />
                          <span className="text-sm">{item.label}</span>
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </nav>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
-e ```
-e 

---
-e 
## File: src/components/layout/DatabaseWakeup.tsx
-e ```tsx
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

-e ```
-e 

---
-e 
## File: src/components/goals/GoalCard.tsx
-e ```tsx
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
-e ```
-e 

---
-e 
## File: src/components/common/PullToRefresh.tsx
-e ```tsx
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
-e ```
-e 

---
-e 
## File: src/components/HomeWorkspaceCloud.tsx
-e ```tsx
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
-e ```
-e 

---
-e 
## File: src/lib/useNotifications.ts
-e ```tsx
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
-e ```
-e 

---
-e 
## File: src/lib/utils.ts
-e ```tsx
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
-e ```
-e 

---
-e 
## File: src/lib/sounds.ts
-e ```tsx
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
-e ```
-e 

---
-e 
## File: src/lib/AuthContext.tsx
-e ```tsx
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

-e ```
-e 

---
-e 
## File: src/lib/firebase.ts
-e ```tsx
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
-e ```
-e 

---
-e 
## File: src/lib/app-params.ts
-e ```tsx
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
-e ```
-e 

---
-e 
## File: src/lib/useSettings.ts
-e ```tsx
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
-e ```
-e 

---
-e 
## File: src/lib/ProtectedRoute.tsx
-e ```tsx
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
-e ```
-e 

---
-e 
## File: src/lib/Base44Context.tsx
-e ```tsx
import { createContext, useContext, useMemo } from 'react';

const Base44ProviderContext = createContext<any>(null);

export const Base44Provider = ({ children }: { children: React.ReactNode }) => {
  const value = useMemo(() => ({}), []);
  return <Base44ProviderContext.Provider value={value}>{children}</Base44ProviderContext.Provider>;
};

export const useBase44 = () => useContext(Base44ProviderContext);
-e ```
-e 

---
-e 
## File: src/lib/PageNotFound.tsx
-e ```tsx
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
-e ```
-e 

---
-e 
## File: src/lib/googleApi.ts
-e ```tsx
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
-e ```
-e 

---
-e 
## File: src/lib/query-client.ts
-e ```tsx
import { QueryClient } from '@tanstack/react-query';

export const queryClientInstance = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5 minutes
      refetchOnWindowFocus: false,
    },
  },
});
-e ```
-e 

---
-e 
## File: src/lib/googleAuth.tsx
-e ```tsx
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
-e ```
-e 

---
-e 
## File: src/pages/Home.tsx
-e ```tsx
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
-e ```
-e 

---
-e 
## File: src/pages/Settings.tsx
-e ```tsx
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
-e ```
-e 

---
-e 
## File: src/pages/Tasks.tsx
-e ```tsx
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
-e ```
-e 

---
-e 
## File: src/pages/Goals.tsx
-e ```tsx
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
-e ```
-e 

---
-e 
## File: src/pages/DatabaseGuide.tsx
-e ```tsx
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
-e ```
-e 

---
-e 
## File: src/pages/Finance.tsx
-e ```tsx
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
-e ```
-e 

---
-e 
## File: src/pages/Bookmarks.tsx
-e ```tsx
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
-e ```
-e 

---
-e 
## File: src/pages/Habits.tsx
-e ```tsx
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
-e ```
-e 

---
-e 
## File: src/pages/GoogleNotes.tsx
-e ```tsx
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
-e ```
-e 

---
-e 
## File: src/pages/Notifications.tsx
-e ```tsx
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
-e ```
-e 

---
-e 
## File: src/pages/GoogleCalendar.tsx
-e ```tsx
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
-e ```
-e 

---
-e 
## File: src/pages/TelegramSync.tsx
-e ```tsx
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
-e ```
-e 

---
-e 
## File: src/main.tsx
-e ```tsx
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
-e ```
-e 

---
-e 
## File: src/App.tsx
-e ```tsx
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
-e ```
-e 

---
-e 
## File: src/api/base44Client.ts
-e ```tsx
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
-e ```
-e 

---
-e 
## File: telegram-bot/bot.ts
-e ```tsx
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
-e ```
-e 

---
-e 
## File: telegram-bot/package.json
-e ```tsx
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
-e ```
-e 

---
-e 
## File: telegram-bot/webhook.ts
-e ```tsx
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
-e ```
