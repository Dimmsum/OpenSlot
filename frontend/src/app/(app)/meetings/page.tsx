"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Plus,
  Search,
  Calendar,
  AlertTriangle,
  MoreHorizontal,
  Pencil,
  Trash2,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { meetings } from "@/lib/mock-data";
import type { Meeting, MeetingStatus } from "@/types";

function formatDateTime(iso: string) {
  const d = new Date(iso);
  return d.toLocaleDateString("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
  });
}

const STATUS_VARIANT: Record<string, "default" | "secondary" | "destructive" | "outline"> = {
  scheduled: "default",
  draft: "outline",
  cancelled: "destructive",
};

function MeetingCard({ meeting }: { meeting: Meeting }) {
  return (
    <div className="flex items-center gap-4 rounded-lg border bg-card p-4 transition-colors hover:bg-muted/30">
      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10">
        <Calendar className="h-5 w-5 text-primary" />
      </div>
      <div className="min-w-0 flex-1">
        <div className="flex items-center gap-2">
          <Link
            href={`/meetings/${meeting.id}`}
            className="truncate font-medium hover:text-primary"
          >
            {meeting.title}
          </Link>
          {meeting.has_conflict && (
            <AlertTriangle className="h-4 w-4 shrink-0 text-amber-500" />
          )}
          <Badge
            variant={STATUS_VARIANT[meeting.status] ?? "secondary"}
            className="shrink-0"
          >
            {meeting.status}
          </Badge>
        </div>
        <div className="mt-1 flex items-center gap-3 text-sm text-muted-foreground">
          {meeting.start_at ? (
            <span>{formatDateTime(meeting.start_at)}</span>
          ) : (
            <span className="italic">No time set</span>
          )}
          <span>·</span>
          <span>{meeting.duration_minutes} min</span>
          <span>·</span>
          <span>
            {meeting.attendees?.length ?? 0} attendee
            {(meeting.attendees?.length ?? 0) !== 1 ? "s" : ""}
          </span>
        </div>
      </div>
      <div className="flex items-center -space-x-2">
        {(meeting.attendees ?? []).slice(0, 3).map((a) => (
          <div
            key={a.id}
            className="flex h-7 w-7 items-center justify-center rounded-full border-2 border-card bg-primary/10 text-xs font-semibold text-primary"
          >
            {a.user?.full_name
              ?.split(" ")
              .map((n) => n[0])
              .join("") ?? "?"}
          </div>
        ))}
      </div>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="icon" className="h-8 w-8 shrink-0">
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem>
            <Pencil className="mr-2 h-4 w-4" />
            Edit
          </DropdownMenuItem>
          <DropdownMenuItem className="text-destructive">
            <Trash2 className="mr-2 h-4 w-4" />
            Cancel
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}

export default function MeetingsPage() {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<MeetingStatus | "all">(
    "all"
  );

  const filtered = meetings.filter((m) => {
    const matchesSearch = m.title
      .toLowerCase()
      .includes(search.toLowerCase());
    const matchesStatus =
      statusFilter === "all" || m.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Meetings</h1>
          <p className="mt-1 text-muted-foreground">
            Manage and track all your team meetings.
          </p>
        </div>
        <Link href="/meetings/new">
          <Button className="gap-2">
            <Plus className="h-4 w-4" />
            New Meeting
          </Button>
        </Link>
      </div>

      <Card>
        <CardHeader>
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <CardTitle>All Meetings</CardTitle>
              <CardDescription>
                {filtered.length} meeting{filtered.length !== 1 ? "s" : ""}
              </CardDescription>
            </div>
            <div className="flex items-center gap-3">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  placeholder="Search meetings..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-64 pl-9"
                />
              </div>
              <Tabs
                value={statusFilter}
                onValueChange={(v) =>
                  setStatusFilter(v as MeetingStatus | "all")
                }
              >
                <TabsList>
                  <TabsTrigger value="all">All</TabsTrigger>
                  <TabsTrigger value="scheduled">Scheduled</TabsTrigger>
                  <TabsTrigger value="draft">Draft</TabsTrigger>
                  <TabsTrigger value="cancelled">Cancelled</TabsTrigger>
                </TabsList>
              </Tabs>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-3">
          {filtered.length === 0 ? (
            <p className="py-12 text-center text-sm text-muted-foreground">
              No meetings found.
            </p>
          ) : (
            filtered.map((m) => <MeetingCard key={m.id} meeting={m} />)
          )}
        </CardContent>
      </Card>
    </div>
  );
}
