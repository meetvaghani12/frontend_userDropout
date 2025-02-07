"use client"

import * as React from "react"
import { Check, Moon, RotateCcw } from "lucide-react"
import { useTheme } from "next-themes"

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { SidebarMenuButton } from "@/components/ui/sidebar"

const themes = [
  { name: "purple", color: "#8E44AD", className: "theme-purple" },
  { name: "blue", color: "#3498DB", className: "theme-blue" },
  { name: "pink", color: "#FF6B81", className: "theme-pink" },
  { name: "violet", color: "#6A5ACD", className: "theme-violet" },
  { name: "indigo", color: "#4B0082", className: "theme-indigo" },
  { name: "orange", color: "#E67E22", className: "theme-orange" },
  { name: "teal", color: "#1ABC9C", className: "theme-teal" },
  { name: "bronze", color: "#CD7F32", className: "theme-bronze" },
  { name: "mint", color: "#2ECC71", className: "theme-mint" },
]

export function ThemeSwitcher() {
  const { theme, setTheme } = useTheme()
  const [accentColor, setAccentColor] = React.useState("teal") // Default: teal

  // Apply border color to document
  React.useEffect(() => {
    document.documentElement.classList.remove(...themes.map((t) => t.className))
    document.documentElement.classList.add(`theme-${accentColor}`)
  }, [accentColor])

  // Reset to default (teal theme)
  const resetTheme = () => {
    setAccentColor("teal")
    setTheme("light") // Reset to light mode (or change if needed)
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <SidebarMenuButton>
          <Moon className="h-4 w-4 border-2 rounded-full p-1" />
          <span>Themes</span>
        </SidebarMenuButton>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Themes</DialogTitle>
          <DialogDescription>
            Customize your Workspace by changing the border color of icons.
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-6">
          {/* Light, Dark, Auto Theme */}
          <div>
            <h4 className="mb-4 text-sm font-medium">Appearance</h4>
            <div className="grid grid-cols-3 gap-4">
              <Button
                variant="outline"
                className={`h-auto flex-col items-center justify-center gap-2 p-4 ${
                  theme === "light" ? "border-2 border-primary" : ""
                }`}
                onClick={() => setTheme("light")}
              >
                <div className="h-12 w-full rounded-sm border bg-white dark:border-neutral-800" />
                <span>Light</span>
              </Button>
              <Button
                variant="outline"
                className={`h-auto flex-col items-center justify-center gap-2 p-4 ${
                  theme === "dark" ? "border-2 border-primary" : ""
                }`}
                onClick={() => setTheme("dark")}
              >
                <div className="h-12 w-full rounded-sm border bg-black dark:border-neutral-800" />
                <span>Dark</span>
              </Button>
              <Button
                variant="outline"
                className={`h-auto flex-col items-center justify-center gap-2 p-4 ${
                  theme === "system" ? "border-2 border-primary" : ""
                }`}
                onClick={() => setTheme("system")}
              >
                <div className="h-12 w-full rounded-sm border bg-gradient-to-r from-white to-black dark:border-neutral-800" />
                <span>Auto</span>
              </Button>
            </div>
          </div>

          {/* Theme Colors */}
          <div>
            <h4 className="mb-4 text-sm font-medium">Theme color</h4>
            <div className="grid grid-cols-3 gap-2">
              {themes.map((t) => (
                <Button
                  key={t.name}
                  variant="outline"
                  className={`justify-start gap-2 ${
                    accentColor === t.name ? "border-2 border-primary" : ""
                  }`}
                  onClick={() => setAccentColor(t.name)}
                >
                  <span className="h-4 w-4 rounded-full" style={{ backgroundColor: t.color }} />
                  <span className="capitalize">{t.name}</span>
                  {accentColor === t.name && <Check className="h-4 w-4 ml-auto" />}
                </Button>
              ))}
            </div>
          </div>

          {/* Reset Button */}
          <div className="flex justify-center">
            <Button variant="destructive" className="w-full gap-2" onClick={resetTheme}>
              <RotateCcw className="h-4 w-4" />
              Reset to Default
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
