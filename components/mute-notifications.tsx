"use client"

import * as React from "react"
import { addHours, addMinutes, addWeeks, endOfTomorrow } from "date-fns"
import { Bell } from "lucide-react"

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { SidebarMenuButton } from "@/components/ui/sidebar"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Calendar } from "@/components/ui/calendar"
import { TimePickerDemo } from "./time-picker"

interface MuteNotificationsProps {
  isMuted: boolean
  onMuteChange: (until: Date | null) => void
}

export function MuteNotifications({ isMuted, onMuteChange }: MuteNotificationsProps) {
  const [date, setDate] = React.useState<Date>()

  const muteOptions = [
    {
      label: "For 30 minutes",
      getDate: () => addMinutes(new Date(), 30),
    },
    {
      label: "For 1 hour",
      getDate: () => addHours(new Date(), 1),
    },
    {
      label: "For 4 hours",
      getDate: () => addHours(new Date(), 4),
    },
    {
      label: "Until tomorrow",
      getDate: () => endOfTomorrow(),
    },
    {
      label: "Until next week",
      getDate: () => addWeeks(new Date(), 1),
    },
  ]

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <SidebarMenuButton>
          <Bell className="h-4 w-4" />
          <span>Mute notifications</span>
          {isMuted && <span className="ml-auto text-xs text-muted-foreground">On</span>}
        </SidebarMenuButton>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        <DropdownMenuLabel>Mute notifications</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {muteOptions.map((option) => (
          <DropdownMenuItem key={option.label} onClick={() => onMuteChange(option.getDate())}>
            {option.label}
          </DropdownMenuItem>
        ))}
        <Dialog>
          <DialogTrigger asChild>
            <DropdownMenuItem>Custom date and time</DropdownMenuItem>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Choose date and time</DialogTitle>
            </DialogHeader>
            <div className="flex flex-col gap-4">
              <Calendar mode="single" selected={date} onSelect={setDate} initialFocus />
              <TimePickerDemo />
            </div>
          </DialogContent>
        </Dialog>
        {isMuted && (
          <>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => onMuteChange(null)}>Turn off</DropdownMenuItem>
          </>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

