"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import {
  Settings,
  Users,
  ImportIcon as FileImport,
  AppWindowIcon as Apps,
  Trash2,
  Bell,
  Cloud,
  Calendar,
  Share2,
  LogOut,
  ChevronLeft,
} from "lucide-react"
import { cn } from "@/lib/utils"
import type React from "react"

interface NavItem {
  title: string
  icon: React.ReactNode
  section?: string
  href?: string
}

const navigation: NavItem[] = [
  {
    section: "WORKSPACE",
    title: "Spaces",
    icon: <Users className="h-4 w-4" />,
    href: "#spaces",
  },
  {
    title: "Imports / Exports",
    icon: <FileImport className="h-4 w-4" />,
    href: "#imports",
  },
  {
    title: "App Center",
    icon: <Apps className="h-4 w-4" />,
    href: "#app-center",
  },
  {
    title: "Trash",
    icon: <Trash2 className="h-4 w-4" />,
    href: "#trash",
  },
  {
    section: "MEET VAGHANI",
    title: "My Settings",
    icon: <Settings className="h-4 w-4" />,
    href: "#settings",
  },
  {
    title: "Workspaces",
    icon: <Users className="h-4 w-4" />,
    href: "#workspaces",
  },
  {
    title: "Notifications",
    icon: <Bell className="h-4 w-4" />,
    href: "#notifications",
  },
  {
    title: "Apps",
    icon: <Apps className="h-4 w-4" />,
    href: "#apps",
  },
  {
    title: "Cloud Storage",
    icon: <Cloud className="h-4 w-4" />,
    href: "#cloud",
  },
  {
    title: "Calendar",
    icon: <Calendar className="h-4 w-4" />,
    href: "#calendar",
  },
  {
    title: "Referrals",
    icon: <Share2 className="h-4 w-4" />,
    href: "#referrals",
  },
]

export function SettingsPage() {
  const [isOpen, setIsOpen] = useState(true)
  const [activeItem, setActiveItem] = useState("My Settings")

  return (
    <div className="min-h-screen bg-background flex">
      {/* Sidebar */}
      <aside
        className={cn(
          "fixed left-0 top-0 z-40 h-screen w-64 border-r transition-transform bg-card",
          !isOpen && "-translate-x-full",
        )}
      >
        <div className="flex h-full flex-col px-3 py-4">
          <Button variant="ghost" className="mb-4 justify-start gap-2" onClick={() => setIsOpen(false)}>
            <ChevronLeft className="h-4 w-4" />
            Back to Workspace
          </Button>

          <nav className="space-y-6 flex-1">
            {navigation.map((item, index) => (
              <div key={index}>
                {item.section && (
                  <div className="mb-2 px-4 text-xs font-semibold text-muted-foreground">{item.section}</div>
                )}
                {item.href && (
                  <Button
                    variant={activeItem === item.title ? "secondary" : "ghost"}
                    className="w-full justify-start gap-2"
                    onClick={() => setActiveItem(item.title)}
                  >
                    {item.icon}
                    {item.title}
                  </Button>
                )}
              </div>
            ))}
          </nav>

          <Button
            variant="ghost"
            className="justify-start gap-2 mt-auto text-red-500 hover:text-red-600 hover:bg-red-100/10"
          >
            <LogOut className="h-4 w-4" />
            Log out
          </Button>
        </div>
      </aside>

      {/* Main Content */}
      <main className={cn("flex-1 transition-all duration-200 ease-in-out", isOpen ? "pl-64" : "pl-0")}>
        <div className="container mx-auto p-8">
          <Card className="max-w-4xl mx-auto">
            <CardHeader>
              <CardTitle>My Settings</CardTitle>
              <CardDescription>Your personal information and account security settings.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-8">
              <div className="flex flex-col items-center space-y-4">
                <Avatar className="h-32 w-32">
                  <AvatarFallback className="text-4xl">MV</AvatarFallback>
                </Avatar>
                <h2 className="text-2xl font-bold">Meet Vaghani</h2>
              </div>

              <div className="space-y-4">
                <div className="space-y-2">
                  <label htmlFor="fullName" className="text-sm font-medium">
                    Full Name
                  </label>
                  <Input id="fullName" placeholder="Enter your full name" defaultValue="Meet Vaghani" />
                </div>

                <div className="space-y-2">
                  <label htmlFor="email" className="text-sm font-medium">
                    Email
                  </label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="Enter your email"
                    defaultValue="meetvaghani1239@gmail.com"
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="password" className="text-sm font-medium">
                    Password
                  </label>
                  <Input id="password" type="password" placeholder="Enter new password" />
                </div>
              </div>

              <div className="flex justify-end">
                <Button size="lg">Save changes</Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}