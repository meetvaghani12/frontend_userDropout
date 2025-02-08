"use client"

import type React from "react"
import { useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  Users,
  ImportIcon as FileImport,
  AppWindow,
  Trash2,
  Settings,
  Bell,
  Cloud,
  Calendar,
  Share2,
  LogOut,
  ChevronLeft,
  Camera,
  X,
} from "lucide-react"
import { cn } from "@/lib/utils"

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
    icon: <AppWindow className="h-4 w-4" />,
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
    icon: <AppWindow className="h-4 w-4" />,
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

interface SettingsProps {
  onClose?: () => void
}

export  function SettingsPage({ onClose }: SettingsProps) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true)
  const [activeItem, setActiveItem] = useState("My Settings")
  const [profileImage, setProfileImage] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setProfileImage(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleRemovePhoto = () => {
    setProfileImage(null)
    if (fileInputRef.current) {
      fileInputRef.current.value = ""
    }
  }

  return (
    <div className="fixed inset-0 z-50 bg-background flex w-screen h-screen">
      {/* Sidebar */}
      <aside
        className={cn(
          "w-64 border-r transition-all duration-300 ease-in-out",
          isSidebarOpen ? "translate-x-0" : "-translate-x-full",
        )}
      >
        <div className="flex h-full flex-col bg-card px-3 py-4">
          <Button variant="ghost" className="mb-4 justify-start gap-2" onClick={onClose}>
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
      <main className="flex-1 overflow-y-auto p-4 md:p-6 lg:p-8">
        <Button
          variant="outline"
          size="icon"
          className="mb-4 md:hidden"
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        >
          {isSidebarOpen ? <ChevronLeft /> : <ChevronLeft className="rotate-180" />}
        </Button>

        <Card className="max-w-4xl mx-auto">
          <CardHeader>
            <CardTitle>My Settings</CardTitle>
            <CardDescription>Your personal information and account security settings.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-8">
            <div className="flex flex-col items-center space-y-4">
              <div className="relative group">
                <Avatar className="h-32 w-32">
                  <AvatarImage src={profileImage || ""} />
                  <AvatarFallback className="text-4xl">MV</AvatarFallback>
                </Avatar>
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <div className="absolute inset-0 bg-black/60 rounded-full" />
                  <div className="relative flex gap-2">
                    <Button
                      size="icon"
                      variant="ghost"
                      className="h-8 w-8 bg-black/60 hover:bg-black/80"
                      onClick={() => fileInputRef.current?.click()}
                    >
                      <Camera className="h-4 w-4" />
                    </Button>
                    {profileImage && (
                      <Button
                        size="icon"
                        variant="ghost"
                        className="h-8 w-8 bg-black/60 hover:bg-black/80"
                        onClick={handleRemovePhoto}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                </div>
                <input type="file" ref={fileInputRef} className="hidden" accept="image/*" onChange={handleFileUpload} />
              </div>
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
      </main>
    </div>
  )
}

