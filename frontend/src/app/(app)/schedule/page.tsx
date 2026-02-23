"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { WeeklyScheduleEditor } from "@/components/schedule/weekly-schedule-editor";
import { weeklySchedule } from "@/lib/mock-data";
import type { ScheduleBlock } from "@/types";

export default function SchedulePage() {
  const handleSave = (blocks: ScheduleBlock[]) => {
    console.log("Saving schedule blocks:", blocks);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">
          Weekly Availability
        </h1>
        <p className="mt-1 text-muted-foreground">
          Set your recurring weekly schedule. Drag on the grid to create time
          blocks, and click existing blocks to edit or remove them.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Schedule Editor</CardTitle>
          <CardDescription>
            Your availability for Acme Corp. Changes apply to future meeting
            suggestions.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <WeeklyScheduleEditor
            initialBlocks={weeklySchedule.blocks}
            onSave={handleSave}
          />
        </CardContent>
      </Card>
    </div>
  );
}
