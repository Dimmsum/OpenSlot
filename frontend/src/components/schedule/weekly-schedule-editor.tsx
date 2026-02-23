"use client";

import { useState, useCallback, useRef } from "react";
import { Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import type { ScheduleBlock, BlockType } from "@/types";

const DAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const HOURS = Array.from({ length: 24 }, (_, i) => i);
const CELL_HEIGHT = 48;
const START_HOUR = 6;
const END_HOUR = 22;
const VISIBLE_HOURS = HOURS.slice(START_HOUR, END_HOUR);

function hourToY(hour: number) {
  return (hour - START_HOUR) * CELL_HEIGHT;
}

function timeToHour(time: string) {
  const [h, m] = time.split(":").map(Number);
  return h + m / 60;
}

function hourToTime(hour: number) {
  const h = Math.floor(hour);
  const m = Math.round((hour - h) * 60);
  return `${h.toString().padStart(2, "0")}:${m.toString().padStart(2, "0")}`;
}

function formatHour(h: number) {
  if (h === 0) return "12 AM";
  if (h < 12) return `${h} AM`;
  if (h === 12) return "12 PM";
  return `${h - 12} PM`;
}

function BlockElement({
  block,
  onClick,
}: {
  block: ScheduleBlock;
  onClick: (block: ScheduleBlock) => void;
}) {
  const startH = timeToHour(block.start_time);
  const endH = timeToHour(block.end_time);
  const top = hourToY(startH);
  const height = (endH - startH) * CELL_HEIGHT;

  const isAvailable = block.block_type === "available";

  return (
    <button
      type="button"
      className={cn(
        "absolute left-1 right-1 cursor-pointer rounded-md border px-2 py-1 text-left text-xs transition-opacity hover:opacity-80",
        isAvailable
          ? "border-primary/30 bg-primary/15 text-primary"
          : "border-destructive/30 bg-destructive/10 text-destructive"
      )}
      style={{ top: `${top}px`, height: `${height}px` }}
      onClick={() => onClick(block)}
    >
      <div className="truncate font-medium">
        {block.label || (isAvailable ? "Available" : "Busy")}
      </div>
      {height > 30 && (
        <div className="truncate opacity-70">
          {block.start_time} – {block.end_time}
        </div>
      )}
    </button>
  );
}

interface NewBlockDraft {
  day_of_week: number;
  startHour: number;
  endHour: number;
}

export function WeeklyScheduleEditor({
  initialBlocks,
  onSave,
}: {
  initialBlocks: ScheduleBlock[];
  onSave: (blocks: ScheduleBlock[]) => void;
}) {
  const [blocks, setBlocks] = useState<ScheduleBlock[]>(initialBlocks);
  const [editBlock, setEditBlock] = useState<ScheduleBlock | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [dialogLabel, setDialogLabel] = useState("");
  const [dialogType, setDialogType] = useState<BlockType>("available");
  const [dialogStart, setDialogStart] = useState("09:00");
  const [dialogEnd, setDialogEnd] = useState("10:00");

  const dragging = useRef(false);
  const dragStart = useRef<{ day: number; hour: number } | null>(null);
  const [draft, setDraft] = useState<NewBlockDraft | null>(null);

  const handlePointerDown = useCallback(
    (day: number, e: React.PointerEvent<HTMLDivElement>) => {
      const rect = e.currentTarget.getBoundingClientRect();
      const y = e.clientY - rect.top;
      const hour = Math.floor(y / CELL_HEIGHT) + START_HOUR;
      dragging.current = true;
      dragStart.current = { day, hour };
      setDraft({ day_of_week: day, startHour: hour, endHour: hour + 1 });
      (e.target as HTMLElement).setPointerCapture(e.pointerId);
    },
    []
  );

  const handlePointerMove = useCallback(
    (e: React.PointerEvent<HTMLDivElement>) => {
      if (!dragging.current || !dragStart.current) return;
      const rect = e.currentTarget.getBoundingClientRect();
      const y = e.clientY - rect.top;
      const hour = Math.max(
        START_HOUR,
        Math.min(END_HOUR, Math.floor(y / CELL_HEIGHT) + START_HOUR)
      );
      const start = Math.min(dragStart.current.hour, hour);
      const end = Math.max(dragStart.current.hour, hour) + 1;
      setDraft({
        day_of_week: dragStart.current.day,
        startHour: start,
        endHour: Math.min(end, END_HOUR),
      });
    },
    []
  );

  const handlePointerUp = useCallback(() => {
    if (!dragging.current || !draft) {
      dragging.current = false;
      return;
    }
    dragging.current = false;
    setDialogStart(hourToTime(draft.startHour));
    setDialogEnd(hourToTime(draft.endHour));
    setDialogType("available");
    setDialogLabel("");
    setEditBlock(null);
    setDialogOpen(true);
    setDraft(null);
  }, [draft]);

  const openEdit = (block: ScheduleBlock) => {
    setEditBlock(block);
    setDialogStart(block.start_time);
    setDialogEnd(block.end_time);
    setDialogType(block.block_type);
    setDialogLabel(block.label ?? "");
    setDialogOpen(true);
  };

  const saveDialog = () => {
    if (editBlock) {
      setBlocks((prev) =>
        prev.map((b) =>
          b.id === editBlock.id
            ? {
                ...b,
                start_time: dialogStart,
                end_time: dialogEnd,
                block_type: dialogType,
                label: dialogLabel || null,
              }
            : b
        )
      );
    } else if (draft || true) {
      const dayOfWeek =
        draft?.day_of_week ??
        dragStart.current?.day ??
        1;
      const newBlock: ScheduleBlock = {
        id: `sb-new-${Date.now()}`,
        schedule_id: "ws-001",
        block_type: dialogType,
        day_of_week: dayOfWeek,
        start_time: dialogStart,
        end_time: dialogEnd,
        label: dialogLabel || null,
      };
      setBlocks((prev) => [...prev, newBlock]);
    }
    setDialogOpen(false);
    setDraft(null);
  };

  const deleteBlock = () => {
    if (editBlock) {
      setBlocks((prev) => prev.filter((b) => b.id !== editBlock.id));
    }
    setDialogOpen(false);
  };

  const dayBlocks = (day: number) => blocks.filter((b) => b.day_of_week === day);

  return (
    <div className="space-y-4">
      <div className="overflow-x-auto rounded-lg border">
        <div className="min-w-[800px]">
          {/* Header */}
          <div className="grid grid-cols-[64px_repeat(7,1fr)] border-b bg-muted/30">
            <div className="p-2" />
            {DAYS.map((day) => (
              <div
                key={day}
                className="border-l p-2 text-center text-sm font-medium"
              >
                {day}
              </div>
            ))}
          </div>

          {/* Grid */}
          <div className="grid grid-cols-[64px_repeat(7,1fr)]">
            {/* Time labels */}
            <div className="relative">
              {VISIBLE_HOURS.map((h) => (
                <div
                  key={h}
                  className="flex items-start justify-end pr-2 text-xs text-muted-foreground"
                  style={{ height: `${CELL_HEIGHT}px` }}
                >
                  {formatHour(h)}
                </div>
              ))}
            </div>

            {/* Day columns */}
            {DAYS.map((_, dayIndex) => (
              <div
                key={dayIndex}
                className="relative cursor-crosshair select-none border-l"
                style={{ height: `${VISIBLE_HOURS.length * CELL_HEIGHT}px` }}
                onPointerDown={(e) => handlePointerDown(dayIndex, e)}
                onPointerMove={handlePointerMove}
                onPointerUp={handlePointerUp}
              >
                {VISIBLE_HOURS.map((h) => (
                  <div
                    key={h}
                    className="border-b border-dashed border-border/50"
                    style={{ height: `${CELL_HEIGHT}px` }}
                  />
                ))}

                {dayBlocks(dayIndex).map((block) => (
                  <BlockElement
                    key={block.id}
                    block={block}
                    onClick={openEdit}
                  />
                ))}

                {draft && draft.day_of_week === dayIndex && (
                  <div
                    className="absolute left-1 right-1 rounded-md border-2 border-dashed border-primary/50 bg-primary/10"
                    style={{
                      top: `${hourToY(draft.startHour)}px`,
                      height: `${(draft.endHour - draft.startHour) * CELL_HEIGHT}px`,
                    }}
                  />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4 text-sm text-muted-foreground">
          <div className="flex items-center gap-1.5">
            <div className="h-3 w-3 rounded-sm bg-primary/15 ring-1 ring-primary/30" />
            Available
          </div>
          <div className="flex items-center gap-1.5">
            <div className="h-3 w-3 rounded-sm bg-destructive/10 ring-1 ring-destructive/30" />
            Busy
          </div>
          <span>Drag on the grid to add blocks</span>
        </div>
        <Button onClick={() => onSave(blocks)}>Save Schedule</Button>
      </div>

      {/* Edit / Create Dialog */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {editBlock ? "Edit Block" : "New Block"}
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-2">
            <div className="space-y-2">
              <Label>Type</Label>
              <Select
                value={dialogType}
                onValueChange={(v) => setDialogType(v as BlockType)}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="available">Available</SelectItem>
                  <SelectItem value="busy">Busy</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Start</Label>
                <Input
                  type="time"
                  value={dialogStart}
                  onChange={(e) => setDialogStart(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label>End</Label>
                <Input
                  type="time"
                  value={dialogEnd}
                  onChange={(e) => setDialogEnd(e.target.value)}
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label>Label (optional)</Label>
              <Input
                placeholder="e.g. Deep work, Lunch"
                value={dialogLabel}
                onChange={(e) => setDialogLabel(e.target.value)}
              />
            </div>
          </div>
          <DialogFooter className="flex-row justify-between sm:justify-between">
            {editBlock && (
              <Button variant="destructive" size="sm" onClick={deleteBlock} className="gap-1">
                <Trash2 className="h-4 w-4" />
                Delete
              </Button>
            )}
            <div className="flex gap-2">
              <Button variant="outline" onClick={() => setDialogOpen(false)}>
                Cancel
              </Button>
              <Button onClick={saveDialog}>
                {editBlock ? "Update" : "Add Block"}
              </Button>
            </div>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
