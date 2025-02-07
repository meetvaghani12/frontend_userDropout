"use client";

import { format } from "date-fns";
import { MessageSquare, Plus, Search } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { DialogContent, DialogHeader } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { UserAvatar } from "./user-avatar";

export function ProfileView() {
  const currentTime = format(new Date(), "h:mm a");

  return (
    <DialogContent className="sm:max-w-[600px]">
      <DialogHeader>
        <div className="flex items-start gap-4">
          <UserAvatar name="Meet Vaghani" className="h-16 w-16" />
          <div className="flex-1">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold">Meet Vaghani</h2>
              <Badge variant="outline" className="bg-emerald-500/15 text-emerald-500">
                Online
              </Badge>
            </div>

            <div className="mt-4 grid grid-cols-2 gap-4">
              <div>
                <h3 className="text-sm font-medium">Title</h3>
                <p className="text-sm text-muted-foreground">Add description...</p>
              </div>
              <div>
                <h3 className="text-sm font-medium">Manager</h3>
                <p className="text-sm text-muted-foreground">None</p>
              </div>
              <div>
                <h3 className="text-sm font-medium">Email</h3>
                <p className="text-sm text-muted-foreground">meetvaghani1239@...</p>
              </div>
              <div>
                <h3 className="text-sm font-medium">Local time</h3>
                <p className="text-sm text-muted-foreground">{currentTime}</p>
              </div>
            </div>

            <div className="mt-4 flex gap-2">
              <Button className="flex-1">
                <MessageSquare className="mr-2 h-4 w-4" />
                Chat
              </Button>
              <Button className="flex-1" variant="secondary">
                Write StandUp
              </Button>
            </div>
          </div>
        </div>
      </DialogHeader>

      <Tabs defaultValue="activity" className="mt-4">
        <TabsList className="w-full justify-start">
          <TabsTrigger value="activity">Activity</TabsTrigger>
          <TabsTrigger value="my-work">My Work (0)</TabsTrigger>
          <TabsTrigger value="assigned">Assigned (0)</TabsTrigger>
          <TabsTrigger value="calendar">Calendar</TabsTrigger>
        </TabsList>

        <TabsContent value="activity" className="mt-4 space-y-4">
          <div className="rounded-lg border p-4">
            <h3 className="font-semibold">LineUp™</h3>
            <Button variant="ghost" className="mt-2 w-full justify-start text-muted-foreground">
              <Plus className="mr-2 h-4 w-4" />
              Add your most important tasks here.
            </Button>
          </div>

          <div>
            <h3 className="mb-2 font-semibold">Activity</h3>
            <div className="flex gap-2">
              <div className="relative flex-1">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input placeholder="Search tasks.." className="pl-8" />
              </div>
              <Button variant="outline">Hide</Button>
              <Button variant="outline">Activities</Button>
            </div>
            <div className="mt-8 text-center text-muted-foreground">Nothing to see here</div>
          </div>
        </TabsContent>
      </Tabs>
    </DialogContent>
  );
}
