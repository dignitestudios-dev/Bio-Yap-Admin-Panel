"use client"

import * as React from "react"
import { format } from "date-fns"
import { Calendar as CalendarIcon } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

interface DatePickerProps {
  date?: Date
  onSelect?: (date: Date | undefined) => void
  className?: string
  disabled?: (date: Date) => boolean
}

export function DatePicker({ date, onSelect, className, disabled }: DatePickerProps) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={"outline"}
          className={cn(
            "justify-between font-normal bg-white border border-[#2121211C]",
            !date && "text-muted-foreground",
            className
          )}
        >
          {date ? format(date, "MMM dd, yyyy") : <span>Pick a date</span>}
          <CalendarIcon className="ml-2 h-4 w-4 text-[#C0F765]" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0 me-5 bg-white border border-[#2121211C]" align="start">
        <Calendar
          mode="single"
          selected={date}
          onSelect={onSelect}
          initialFocus
          disabled={disabled}
        />
      </PopoverContent>
    </Popover>
  )
}