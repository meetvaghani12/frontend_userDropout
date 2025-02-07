"use client"

import * as React from "react"
import { Clock } from "lucide-react"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"

interface TimePickerProps {
  date?: Date
  setDate?: (date: Date) => void
}

export function TimePickerDemo({ date, setDate }: TimePickerProps) {
  const minuteRef = React.useRef<HTMLInputElement>(null)
  const hourRef = React.useRef<HTMLInputElement>(null)
  const [hour, setHour] = React.useState("12")
  const [minute, setMinute] = React.useState("00")
  const [meridiem, setMeridiem] = React.useState<"AM" | "PM">("AM")

  React.useEffect(() => {
    if (!date) return

    const hours = date.getHours()
    const minutes = date.getMinutes()
    const meridiem = hours >= 12 ? "PM" : "AM"
    const hour = hours % 12 || 12

    setHour(hour.toString().padStart(2, "0")) // Ensure two-digit format
    setMinute(minutes.toString().padStart(2, "0"))
    setMeridiem(meridiem)
  }, [date])

  // Function to update date in parent component
  const updateParentDate = (newHour: string, newMinute: string, newMeridiem: "AM" | "PM") => {
    if (!setDate) return

    let hours = parseInt(newHour, 10)
    if (newMeridiem === "PM" && hours !== 12) hours += 12
    if (newMeridiem === "AM" && hours === 12) hours = 0

    const updatedDate = new Date()
    updatedDate.setHours(hours, parseInt(newMinute, 10), 0, 0)
    setDate(updatedDate)
  }

  return (
    <div className="flex items-end gap-2">
      <div className="grid gap-1 text-center">
        <Label htmlFor="hours" className="text-xs">Hours</Label>
        <Input
          ref={hourRef}
          id="hours"
          className="w-16 text-center"
          value={hour}
          onChange={(e) => {
            let value = e.target.value
            if (value === "") return setHour(value) // Allow empty state

            const numeric = Number.parseInt(value)
            if (isNaN(numeric) || numeric < 1 || numeric > 12) return

            setHour(numeric.toString().padStart(2, "0"))
            updateParentDate(numeric.toString().padStart(2, "0"), minute, meridiem)

            if (value.length === 2) {
              minuteRef.current?.focus()
              minuteRef.current?.select()
            }
          }}
        />
      </div>

      <div className="grid gap-1 text-center">
        <Label htmlFor="minutes" className="text-xs">Minutes</Label>
        <Input
          ref={minuteRef}
          id="minutes"
          className="w-16 text-center"
          value={minute}
          onChange={(e) => {
            let value = e.target.value
            if (value === "") return setMinute(value) // Allow empty state

            const numeric = Number.parseInt(value)
            if (isNaN(numeric) || numeric < 0 || numeric > 59) return

            setMinute(numeric.toString().padStart(2, "0"))
            updateParentDate(hour, numeric.toString().padStart(2, "0"), meridiem)
          }}
        />
      </div>

      <div className="grid gap-1 text-center">
        <Label htmlFor="meridiem" className="text-xs">AM/PM</Label>
        <select
          id="meridiem"
          value={meridiem}
          onChange={(e) => {
            setMeridiem(e.target.value as "AM" | "PM")
            updateParentDate(hour, minute, e.target.value as "AM" | "PM")
          }}
          className="h-10 w-16 rounded-md border border-input px-3 py-2 text-sm focus-visible:ring-2 focus-visible:ring-ring"
        >
          <option value="AM">AM</option>
          <option value="PM">PM</option>
        </select>
      </div>

      <div className="flex h-10 items-center">
        <Clock className="ml-2 h-4 w-4" />
      </div>
    </div>
  )
}
