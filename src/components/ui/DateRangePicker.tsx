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
