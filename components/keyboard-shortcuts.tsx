"use client"

import { useState, useEffect } from "react"
import { Dialog, DialogContent } from "@/components/ui/dialog"
import { ScrollArea } from "@/components/ui/scroll-area"
import { cn } from "@/lib/utils"
import {
  Globe,
  NavigationIcon as NavIcon,
  Type,
  ListTodo,
  Inbox,
  FileText,
  LayoutGrid,
  Pen,
  X,
  Command,
} from "lucide-react"
import type React from "react" // Added import for React

interface ShortcutSection {
  id: string
  label: string
  icon: React.ReactNode
  content: {
    title: string
    description: string
    shortcuts: {
      label: string
      keys: string[]
      separator?: string
      additionalKeys?: string[]
    }[]
  }
}

const sections: ShortcutSection[] = [
  {
    id: "global",
    label: "Global",
    icon: <Globe className="h-4 w-4" />,
    content: {
      title: "Global",
      description: "Shortcuts that are available on any screen of ClickUp",
      shortcuts: [
        { label: "Create task", keys: ["T"] },
        { label: "Create Reminder", keys: ["R"] },
        { label: "Open Search/Command Center", keys: ["Ctrl", "K"] },
        { label: "Open ClickUp AI", keys: ["Alt", "K"] },
        { label: "Open Notepad", keys: ["N"], separator: "or", additionalKeys: ["P"] },
        { label: "Show/hide left sidebar", keys: ["Q"] },
        { label: "Scroll to current position in left sidebar", keys: ["Ctrl", "I"] },
      ],
    },
  },
  {
    id: "navigation",
    label: "Navigation",
    icon: <NavIcon className="h-4 w-4" />,
    content: {
      title: "Navigation",
      description: "Shortcuts for navigating through the application",
      shortcuts: [
        { label: "Go to Home", keys: ["G", "H"] },
        { label: "Go to Previous Page", keys: ["Alt", "ArrowLeft"] },
        { label: "Go to Next Page", keys: ["Alt", "ArrowRight"] },
        { label: "Go to Settings", keys: ["G", "S"] },
        { label: "Go to Notifications", keys: ["G", "N"] },
        { label: "Switch Workspace", keys: ["Ctrl", "W"] },
        { label: "Navigate Back", keys: ["Esc"] },
      ],
    },
  },
  {
    id: "text-editor",
    label: "Text editor",
    icon: <Type className="h-4 w-4" />,
    content: {
      title: "Text Editor",
      description: "Shortcuts for the text editor",
      shortcuts: [
        { label: "Bold", keys: ["Ctrl", "B"] },
        { label: "Italic", keys: ["Ctrl", "I"] },
        { label: "Underline", keys: ["Ctrl", "U"] },
        { label: "Create Link", keys: ["Ctrl", "K"] },
        { label: "Bullet List", keys: ["Ctrl", "Shift", "8"] },
        { label: "Numbered List", keys: ["Ctrl", "Shift", "7"] },
        { label: "Code Block", keys: ["Ctrl", "E"] },
      ],
    },
  },
  {
    id: "task-view",
    label: "Task View",
    icon: <ListTodo className="h-4 w-4" />,
    content: {
      title: "Task View",
      description: "Shortcuts for task management",
      shortcuts: [
        { label: "Edit Task", keys: ["E"] },
        { label: "Delete Task", keys: ["Del"] },
        { label: "Assign Task", keys: ["A"] },
        { label: "Set Due Date", keys: ["D"] },
        { label: "Add Tag", keys: ["L"] },
        { label: "Change Status", keys: ["S"] },
        { label: "Add Subtask", keys: ["Shift", "Enter"] },
      ],
    },
  },
  {
    id: "inbox",
    label: "Inbox",
    icon: <Inbox className="h-4 w-4" />,
    content: {
      title: "Inbox",
      description: "Shortcuts for inbox management",
      shortcuts: [
        { label: "Mark as Read", keys: ["M", "R"] },
        { label: "Archive", keys: ["M", "A"] },
        { label: "Delete Message", keys: ["M", "D"] },
        { label: "Next Message", keys: ["J"] },
        { label: "Previous Message", keys: ["K"] },
        { label: "Reply", keys: ["Shift", "R"] },
        { label: "Forward", keys: ["Shift", "F"] },
      ],
    },
  },
  {
    id: "docs",
    label: "Docs",
    icon: <FileText className="h-4 w-4" />,
    content: {
      title: "Docs",
      description: "Shortcuts for document management",
      shortcuts: [
        { label: "New Document", keys: ["Ctrl", "Alt", "N"] },
        { label: "Save Document", keys: ["Ctrl", "S"] },
        { label: "Print Document", keys: ["Ctrl", "P"] },
        { label: "Find in Document", keys: ["Ctrl", "F"] },
        { label: "Replace in Document", keys: ["Ctrl", "H"] },
        { label: "Share Document", keys: ["Ctrl", "Shift", "S"] },
        { label: "Export Document", keys: ["Ctrl", "Shift", "E"] },
      ],
    },
  },
  {
    id: "views",
    label: "Views",
    icon: <LayoutGrid className="h-4 w-4" />,
    content: {
      title: "Views",
      description: "Shortcuts for different views",
      shortcuts: [
        { label: "List View", keys: ["V", "L"] },
        { label: "Board View", keys: ["V", "B"] },
        { label: "Calendar View", keys: ["V", "C"] },
        { label: "Gallery View", keys: ["V", "G"] },
        { label: "Timeline View", keys: ["V", "T"] },
        { label: "Toggle Full Screen", keys: ["V", "F"] },
        { label: "Reset View", keys: ["V", "R"] },
      ],
    },
  },
  {
    id: "whiteboards",
    label: "Whiteboards",
    icon: <Pen className="h-4 w-4" />,
    content: {
      title: "Whiteboards",
      description: "Shortcuts for whiteboard features",
      shortcuts: [
        { label: "Select Tool", keys: ["V"] },
        { label: "Hand Tool", keys: ["H"] },
        { label: "Rectangle Tool", keys: ["R"] },
        { label: "Ellipse Tool", keys: ["O"] },
        { label: "Text Tool", keys: ["T"] },
        { label: "Line Tool", keys: ["L"] },
        { label: "Pen Tool", keys: ["P"] },
      ],
    },
  },
]

export function KeyboardShortcutsDialog({
  open,
  onOpenChange,
}: {
  open: boolean
  onOpenChange: (open: boolean) => void
}) {
  const [activeSection, setActiveSection] = useState("global")

  // Handle keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (open) {
        if (e.key === "Escape") {
          onOpenChange(false)
        }
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [open, onOpenChange])

  const activeContent = sections.find((section) => section.id === activeSection)?.content

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
    <DialogContent className="!max-w-none !w-screen !h-screen p-0 gap-0 bg-background">




        <div className="flex h-[600px]">
          {/* Sidebar */}
          <div className="w-64 border-r">
            <div className="p-4 border-b flex items-center gap-2">
              <Command className="h-5 w-5" />
              <h2 className="font-semibold">Keyboard Shortcuts</h2>
            </div>
            <ScrollArea className="h-[calc(600px-65px)]">
              <div className="p-2">
                {sections.map((section) => (
                  <button
                    key={section.id}
                    onClick={() => setActiveSection(section.id)}
                    className={cn(
                      "w-full flex items-center gap-3 px-3 py-2 rounded-md text-sm",
                      activeSection === section.id ? "bg-primary/10 text-primary" : "hover:bg-muted",
                    )}
                  >
                    {section.icon}
                    {section.label}
                  </button>
                ))}
              </div>
            </ScrollArea>
          </div>

          {/* Content */}
          <div className="flex-1">
            <div className="flex justify-between items-center p-4 border-b">
              <div className="flex items-center gap-2">
                {sections.find((section) => section.id === activeSection)?.icon}
                <h2 className="font-semibold">{activeContent?.title}</h2>
              </div>
              <button
                onClick={() => onOpenChange(false)}
                className="rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
              >
                <X className="h-4 w-4" />
                <span className="sr-only">Close</span>
              </button>
            </div>
            <ScrollArea className="h-[calc(600px-65px)]">
              <div className="p-6">
                <p className="text-sm text-muted-foreground mb-6">{activeContent?.description}</p>
                <div className="space-y-4">
                  {activeContent?.shortcuts.map((shortcut, index) => (
                    <div key={index} className="flex items-center justify-between text-sm">
                      <span>{shortcut.label}</span>
                      <div className="flex items-center gap-2">
                        {shortcut.keys.map((key, keyIndex) => (
                          <>
                            <kbd
                              key={keyIndex}
                              className="pointer-events-none inline-flex h-7 select-none items-center gap-1 rounded border bg-muted px-2 font-mono text-sm font-medium opacity-100"
                            >
                              {key}
                            </kbd>
                            {keyIndex < shortcut.keys.length - 1 && <span className="text-muted-foreground">+</span>}
                          </>
                        ))}
                        {shortcut.separator && (
                          <>
                            <span className="text-muted-foreground mx-2">{shortcut.separator}</span>
                            {shortcut.additionalKeys &&
                              shortcut.additionalKeys.map((additionalKey, addKeyIndex) => (
                                <>
                                  <kbd
                                    key={`additional-${addKeyIndex}`}
                                    className="pointer-events-none inline-flex h-7 select-none items-center gap-1 rounded border bg-muted px-2 font-mono text-sm font-medium opacity-100"
                                  >
                                    {additionalKey}
                                  </kbd>
                                </>
                              ))}
                          </>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </ScrollArea>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

