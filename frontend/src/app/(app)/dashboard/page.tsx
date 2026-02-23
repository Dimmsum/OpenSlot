"use client";

import Link from "next/link";
import {
  Calendar,
  Users,
  Mail,
  Clock,
  ArrowRight,
  AlertTriangle,
  CalendarCheck,
  Plus,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  currentUser,
  meetings,
  companyMembers,
  invitations,
  notifications,
} from "@/lib/mock-data";
import type { Meeting } from "@/types";

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
  });
}

function formatTime(iso: string) {
  return new Date(iso).toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
  });
}

const STATUS_VARIANT: Record<string, "default" | "secondary" | "destructive" | "outline"> = {
  scheduled: "default",
  draft: "outline",
  cancelled: "destructive",
};

function MeetingRow({ meeting }: { meeting: Meeting }) {
  return (
    <Link
      href={`/meetings/${meeting.id}`}
      className="flex items-center gap-4 rounded-lg border bg-card p-4 transition-colors hover:bg-muted/50"
    >
      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10">
        <Calendar className="h-5 w-5 text-primary" />
      </div>
      <div className="min-w-0 flex-1">
        <div className="flex items-center gap-2">
          <p className="truncate font-medium">{meeting.title}</p>
          {meeting.has_conflict && (
            <AlertTriangle className="h-4 w-4 shrink-0 text-amber-500" />
          )}
        </div>
        {meeting.start_at && (
          <p className="text-sm text-muted-foreground">
            {formatDate(meeting.start_at)} at {formatTime(meeting.start_at)}
            {" · "}
            {meeting.duration_minutes} min
          </p>
        )}
      </div>
      <Badge variant={STATUS_VARIANT[meeting.status] ?? "secondary"}>
        {meeting.status}
      </Badge>
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
        {(meeting.attendees?.length ?? 0) > 3 && (
          <div className="flex h-7 w-7 items-center justify-center rounded-full border-2 border-card bg-muted text-xs text-muted-foreground">
            +{(meeting.attendees?.length ?? 0) - 3}
          </div>
        )}
      </div>
    </Link>
  );
}

export default function DashboardPage() {
  const scheduledMeetings = meetings.filter((m) => m.status === "scheduled");
  const draftMeetings = meetings.filter((m) => m.status === "draft");
  const upcomingMeetings = scheduledMeetings.sort(
    (a, b) =>
      new Date(a.start_at!).getTime() - new Date(b.start_at!).getTime()
  );

  const stats = [
    {
      label: "Meetings This Week",
      value: scheduledMeetings.length,
      icon: CalendarCheck,
      color: "text-primary",
      bg: "bg-primary/10",
    },
    {
      label: "Team Members",
      value: companyMembers.length,
      icon: Users,
      color: "text-blue-600",
      bg: "bg-blue-50",
    },
    {
      label: "Pending Invites",
      value: invitations.filter((i) => !i.accepted_at).length,
      icon: Mail,
      color: "text-amber-600",
      bg: "bg-amber-50",
    },
    {
      label: "Draft Meetings",
      value: draftMeetings.length,
      icon: Clock,
      color: "text-violet-600",
      bg: "bg-violet-50",
    },
  ];

  return (
    <div className="space-y-8">
      {/* Welcome */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">
            Welcome back, {currentUser.full_name?.split(" ")[0]}
          </h1>
          <p className="mt-1 text-muted-foreground">
            Here&apos;s what&apos;s happening with your team this week.
          </p>
        </div>
        <Link href="/meetings/new">
          <Button className="gap-2">
            <Plus className="h-4 w-4" />
            New Meeting
          </Button>
        </Link>
      </div>

      {/* Stats */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <Card key={stat.label}>
            <CardContent className="flex items-center gap-4 p-5">
              <div
                className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-lg ${stat.bg}`}
              >
                <stat.icon className={`h-5 w-5 ${stat.color}`} />
              </div>
              <div>
                <p className="text-2xl font-bold">{stat.value}</p>
                <p className="text-sm text-muted-foreground">{stat.label}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Upcoming Meetings */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>Upcoming Meetings</CardTitle>
            <CardDescription>
              Your scheduled meetings for the coming days
            </CardDescription>
          </div>
          <Link href="/meetings">
            <Button variant="ghost" size="sm" className="gap-1 text-primary">
              View all <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
        </CardHeader>
        <CardContent className="space-y-3">
          {upcomingMeetings.length === 0 ? (
            <p className="py-8 text-center text-sm text-muted-foreground">
              No upcoming meetings this week.
            </p>
          ) : (
            upcomingMeetings.map((m) => <MeetingRow key={m.id} meeting={m} />)
          )}
        </CardContent>
      </Card>

      {/* Recent Activity */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Activity</CardTitle>
          <CardDescription>Latest updates and notifications</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {notifications.map((n) => (
              <div key={n.id} className="flex items-start gap-3">
                <div className="mt-0.5 h-2 w-2 shrink-0 rounded-full bg-primary" />
                <div>
                  <p className="text-sm">
                    {n.type === "meeting_created" &&
                      `New meeting created: ${n.payload.title}`}
                    {n.type === "meeting_updated" &&
                      `Meeting updated: ${n.payload.title}`}
                    {n.type === "invited" &&
                      `Invited to ${n.payload.company_name}`}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {new Date(n.created_at).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      hour: "numeric",
                      minute: "2-digit",
                    })}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
