"use client"
import { Check, Circle } from "lucide-react"

import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

const statuses = [
  {
    value: "online",
    label: "Online",
    color: "bg-green-500",
  },
  {
    value: "idle",
    label: "Idle",
    color: "bg-yellow-500",
  },
  {
    value: "dnd",
    label: "Do Not Disturb",
    color: "bg-red-500",
  },
  {
    value: "offline",
    label: "Offline",
    color: "bg-gray-500",
  },
] as const

interface StatusPickerProps {
  status: string
  onStatusChange: (status: string) => void
}

export function StatusPicker({ status, onStatusChange }: StatusPickerProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="mt-4 w-full rounded-md border border-border/50 p-2 text-sm text-muted-foreground hover:bg-accent">
          Set status
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {statuses.map((s) => (
          <DropdownMenuItem key={s.value} onClick={() => onStatusChange(s.value)} className="flex items-center gap-2">
            <Circle className={`h-2 w-2 fill-current ${s.color}`} />
            <span>{s.label}</span>
            {status === s.value && <Check className="ml-auto h-4 w-4" />}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

