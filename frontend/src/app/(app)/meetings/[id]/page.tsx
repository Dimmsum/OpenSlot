"use client";

import { useParams, useRouter } from "next/navigation";
import {
  ArrowLeft,
  Calendar,
  Clock,
  Users,
  AlertTriangle,
  Pencil,
  Trash2,
  Wifi,
  WifiOff,
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
import { Separator } from "@/components/ui/separator";
import { meetings } from "@/lib/mock-data";

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
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

export default function MeetingDetailPage() {
  const params = useParams();
  const router = useRouter();
  const meeting = meetings.find((m) => m.id === params.id);

  if (!meeting) {
    return (
      <div className="flex flex-col items-center justify-center py-24">
        <p className="text-lg text-muted-foreground">Meeting not found.</p>
        <Button
          variant="ghost"
          className="mt-4"
          onClick={() => router.push("/meetings")}
        >
          Back to meetings
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" onClick={() => router.back()}>
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <div className="flex-1">
          <div className="flex items-center gap-3">
            <h1 className="text-2xl font-bold tracking-tight">
              {meeting.title}
            </h1>
            <Badge variant={STATUS_VARIANT[meeting.status] ?? "secondary"}>
              {meeting.status}
            </Badge>
            {meeting.has_conflict && (
              <Badge variant="outline" className="gap-1 border-amber-300 text-amber-600">
                <AlertTriangle className="h-3 w-3" />
                Conflict
              </Badge>
            )}
          </div>
          {meeting.description && (
            <p className="mt-1 text-muted-foreground">{meeting.description}</p>
          )}
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" className="gap-1">
            <Pencil className="h-4 w-4" />
            Edit
          </Button>
          <Button variant="destructive" size="sm" className="gap-1">
            <Trash2 className="h-4 w-4" />
            Cancel
          </Button>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Meeting Info */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Meeting Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                  <Calendar className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Date</p>
                  <p className="font-medium">
                    {meeting.start_at
                      ? formatDate(meeting.start_at)
                      : "Not scheduled"}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                  <Clock className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Time</p>
                  <p className="font-medium">
                    {meeting.start_at && meeting.end_at
                      ? `${formatTime(meeting.start_at)} – ${formatTime(meeting.end_at)}`
                      : "Not set"}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                  <Clock className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Duration</p>
                  <p className="font-medium">{meeting.duration_minutes} minutes</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                  <Users className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Attendees</p>
                  <p className="font-medium">
                    {meeting.attendees?.length ?? 0} people
                  </p>
                </div>
              </div>
            </div>

            <Separator />

            <div>
              <p className="text-sm text-muted-foreground">Created by</p>
              <p className="font-medium">
                {meeting.creator?.full_name ?? "Unknown"}
              </p>
              <p className="text-xs text-muted-foreground">
                {new Date(meeting.created_at).toLocaleDateString("en-US", {
                  month: "long",
                  day: "numeric",
                  year: "numeric",
                })}
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Attendees */}
        <Card>
          <CardHeader>
            <CardTitle>Attendees</CardTitle>
            <CardDescription>
              {meeting.attendees?.length ?? 0} people invited
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {(meeting.attendees ?? []).map((attendee) => (
                <div
                  key={attendee.id}
                  className="flex items-center gap-3 rounded-lg p-2"
                >
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-primary/10 text-sm font-semibold text-primary">
                    {attendee.user?.full_name
                      ?.split(" ")
                      .map((n) => n[0])
                      .join("") ?? "?"}
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-medium">
                      {attendee.user?.full_name ?? "Unknown"}
                    </p>
                    <p className="truncate text-xs text-muted-foreground">
                      {attendee.user?.email}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    {!attendee.is_required && (
                      <Badge variant="outline" className="text-xs">
                        Optional
                      </Badge>
                    )}
                    {attendee.gcal_connected ? (
                      <Wifi className="h-4 w-4 text-green-500" />
                    ) : (
                      <WifiOff className="h-4 w-4 text-amber-500" />
                    )}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
