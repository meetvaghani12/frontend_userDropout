"use client";

import { useState, useMemo } from "react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import {
  CircleUserRound,
  Settings,
  Keyboard,
  LogOut,
  Circle,
  HelpCircle,
  User,
  Bell,
  Palette,
} from "lucide-react";
import { StatusPicker } from "./status-picker";
import { ThemeSwitcher } from "./theme-switcher";
import { MuteNotifications } from "./mute-notifications";
import { SettingsPage } from "./settings";
import { KeyboardShortcutsDialog } from "./keyboard-shortcuts";
import { ProfileView } from "./profile-view";

const statuses = [
  { value: "online", label: "Online", color: "bg-green-500" },
  { value: "idle", label: "Idle", color: "bg-yellow-500" },
  { value: "dnd", label: "Do Not Disturb", color: "bg-red-500" },
  { value: "offline", label: "Offline", color: "bg-gray-500" },
];

function Meet() {
  const [status, setStatus] = useState("online");
  const [mutedUntil, setMutedUntil] = useState<Date | null>(null);
  const [openProfile, setOpenProfile] = useState(false);
  const [openShortcuts, setOpenShortcuts] = useState(false);
  const [openSettings, setOpenSettings] = useState(false);

  const isMuted = useMemo(() => {
    if (!mutedUntil) return false;
    return new Date() < mutedUntil;
  }, [mutedUntil]);

  const currentStatus = statuses.find((s) => s.value === status);

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button size="icon" variant="outline" aria-label="Open account menu">
            <CircleUserRound size={16} strokeWidth={2} aria-hidden="true" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="max-w-64">
          <DropdownMenuLabel className="flex flex-col">
            <span>Signed in as</span>
            <span className="text-xs font-normal text-foreground">
              meetvaghani1239@gmail.com
            </span>
            <span className="text-xs font-semibold text-muted-foreground flex items-center gap-1 mt-1">
              <Circle className={`h-2 w-2 ${currentStatus?.color ?? ""}`} />
              {currentStatus?.label}
            </span>
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
              <StatusPicker status={status} onStatusChange={setStatus} />
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setOpenProfile(true)}>
              <User className="h-4 w-4 mr-2" />
              Profile
            </DropdownMenuItem>
            <DropdownMenuItem className="flex items-center gap-2" onSelect={(e) => e.preventDefault()}>
              <Bell className="h-4 w-4 mr-2" />
              <MuteNotifications isMuted={isMuted} onMuteChange={setMutedUntil} />
            </DropdownMenuItem>
            <DropdownMenuItem
              className="flex items-center gap-2"
              onSelect={(e) => e.preventDefault()}
            >
              <Palette className="h-4 w-4 mr-2" />
              <ThemeSwitcher />
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => setOpenSettings(true)}
              onSelect={(e) => e.preventDefault()}
            >
              <Settings className="h-4 w-4 mr-2" />
              Settings
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => setOpenShortcuts(true)}
              onSelect={(e) => e.preventDefault()}
            >
              <Keyboard className="h-4 w-4 mr-2" />
              Keyboard Shortcuts
            </DropdownMenuItem>
          </DropdownMenuGroup>
          <DropdownMenuSeparator />
          <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
            <HelpCircle className="h-4 w-4 mr-2" />
            Help
          </DropdownMenuItem>
          <DropdownMenuItem
            className="text-red-500 hover:text-red-600"
            onSelect={() => console.log("User logged out")}
          >
            <LogOut className="h-4 w-4 mr-2" />
            Logout
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      {/* Profile Modal */}
      <Dialog open={openProfile} onOpenChange={setOpenProfile}>
        <DialogContent className="w-screen h-screen max-w-none p-0">
          <ProfileView />
        </DialogContent>
      </Dialog>

      <Dialog open={openSettings} onOpenChange={setOpenSettings}>
        <DialogContent className="w-screen h-screen max-w-none p-0">
          <SettingsPage />
        </DialogContent>
      </Dialog>

      <Dialog open={openShortcuts} onOpenChange={setOpenShortcuts}>
        <DialogContent>
          <KeyboardShortcutsDialog
            open={openShortcuts}
            onOpenChange={setOpenShortcuts}
          />
        </DialogContent>
      </Dialog>
    </>
  );
}

export { Meet };
