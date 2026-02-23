"use client";

import { useState } from "react";
import { Link2, Unlink, Calendar, Check, AlertCircle } from "lucide-react";
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

export default function IntegrationsPage() {
  const [gcalConnected, setGcalConnected] = useState(true);
  const gcalEmail = "adam@gmail.com";

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Integrations</h1>
        <p className="mt-1 text-muted-foreground">
          Connect external services for a better scheduling experience.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Google Calendar</CardTitle>
          <CardDescription>
            Sync your Google Calendar to detect scheduling conflicts and
            automatically create events when meetings are booked.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="rounded-lg border p-6">
            <div className="flex items-start gap-4">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                <Calendar className="h-6 w-6 text-primary" />
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <h3 className="font-semibold">Google Calendar</h3>
                  {gcalConnected ? (
                    <Badge className="gap-1 bg-green-100 text-green-700 hover:bg-green-100">
                      <Check className="h-3 w-3" />
                      Connected
                    </Badge>
                  ) : (
                    <Badge variant="outline" className="gap-1 text-muted-foreground">
                      <AlertCircle className="h-3 w-3" />
                      Disconnected
                    </Badge>
                  )}
                </div>
                {gcalConnected && (
                  <p className="mt-1 text-sm text-muted-foreground">
                    Synced with {gcalEmail}
                  </p>
                )}
                <p className="mt-3 text-sm text-muted-foreground">
                  {gcalConnected
                    ? "Your calendar events are being used to detect conflicts when scheduling meetings. Events created by OpenSlot will appear in your Google Calendar."
                    : "Connect your Google Calendar to enable real-time conflict detection and automatic event creation."}
                </p>
              </div>
            </div>

            <Separator className="my-6" />

            {gcalConnected ? (
              <div className="flex items-center justify-between">
                <div className="text-sm text-muted-foreground">
                  Need to switch accounts or revoke access?
                </div>
                <Button
                  variant="outline"
                  className="gap-2 text-destructive hover:text-destructive"
                  onClick={() => setGcalConnected(false)}
                >
                  <Unlink className="h-4 w-4" />
                  Disconnect
                </Button>
              </div>
            ) : (
              <Button
                className="gap-2"
                onClick={() => setGcalConnected(true)}
              >
                <Link2 className="h-4 w-4" />
                Connect Google Calendar
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
