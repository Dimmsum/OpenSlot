"use client";

import { useState } from "react";
import { Bell, Calendar, Mail, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import { notifications as mockNotifications } from "@/lib/mock-data";
import type { Notification } from "@/types";

const ICON_MAP: Record<string, React.ComponentType<{ className?: string }>> = {
  meeting_created: Calendar,
  meeting_updated: RefreshCw,
  invited: Mail,
};

function formatTimeAgo(dateStr: string): string {
  const diff = Date.now() - new Date(dateStr).getTime();
  const hours = Math.floor(diff / 3600000);
  if (hours < 1) return "Just now";
  if (hours < 24) return `${hours}h ago`;
  const days = Math.floor(hours / 24);
  return `${days}d ago`;
}

function NotificationItem({ notification }: { notification: Notification }) {
  const Icon = ICON_MAP[notification.type] || Bell;
  const payload = notification.payload;

  let message = "";
  switch (notification.type) {
    case "meeting_created":
      message = `New meeting: ${payload.title}`;
      break;
    case "meeting_updated":
      message = `Meeting updated: ${payload.title}`;
      break;
    case "invited":
      message = `You were invited to ${payload.company_name}`;
      break;
  }

  return (
    <div
      className={cn(
        "flex items-start gap-3 rounded-lg px-3 py-2.5 transition-colors",
        !notification.read && "bg-primary/5"
      )}
    >
      <div
        className={cn(
          "mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full",
          !notification.read ? "bg-primary/10 text-primary" : "bg-muted text-muted-foreground"
        )}
      >
        <Icon className="h-4 w-4" />
      </div>
      <div className="flex-1 space-y-0.5">
        <p className="text-sm">{message}</p>
        <p className="text-xs text-muted-foreground">
          {formatTimeAgo(notification.created_at)}
        </p>
      </div>
      {!notification.read && (
        <div className="mt-2 h-2 w-2 shrink-0 rounded-full bg-primary" />
      )}
    </div>
  );
}

export function NotificationBell({ collapsed }: { collapsed: boolean }) {
  const [open, setOpen] = useState(false);
  const unreadCount = mockNotifications.filter((n) => !n.read).length;

  const trigger = (
    <PopoverTrigger asChild>
      <Button
        variant="ghost"
        size="icon"
        className="relative h-8 w-8 text-muted-foreground hover:text-foreground"
      >
        <Bell className="h-4 w-4" />
        {unreadCount > 0 && (
          <span className="absolute -right-0.5 -top-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-[10px] font-bold text-primary-foreground">
            {unreadCount}
          </span>
        )}
      </Button>
    </PopoverTrigger>
  );

  return (
    <Popover open={open} onOpenChange={setOpen}>
      {collapsed ? (
        <Tooltip delayDuration={0}>
          <TooltipTrigger asChild>{trigger}</TooltipTrigger>
          <TooltipContent side="right">Notifications</TooltipContent>
        </Tooltip>
      ) : (
        trigger
      )}
      <PopoverContent
        side={collapsed ? "right" : "top"}
        align="start"
        className="w-80 p-0"
      >
        <div className="flex items-center justify-between border-b px-4 py-3">
          <h4 className="text-sm font-semibold">Notifications</h4>
          {unreadCount > 0 && (
            <Button variant="ghost" size="sm" className="h-auto px-2 py-1 text-xs text-primary">
              Mark all read
            </Button>
          )}
        </div>
        <ScrollArea className="max-h-80">
          <div className="space-y-0.5 p-2">
            {mockNotifications.length === 0 ? (
              <p className="py-6 text-center text-sm text-muted-foreground">
                No notifications
              </p>
            ) : (
              mockNotifications.map((n) => (
                <NotificationItem key={n.id} notification={n} />
              ))
            )}
          </div>
        </ScrollArea>
      </PopoverContent>
    </Popover>
  );
}
