"use client";

import { useState } from "react";
import {
  Clock,
  Users,
  AlertTriangle,
  Check,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import type { SlotSuggestion } from "@/types";

function formatSlotTime(iso: string) {
  return new Date(iso).toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
  });
}

function formatSlotDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-US", {
    weekday: "long",
    month: "short",
    day: "numeric",
  });
}

function SlotCard({
  slot,
  rank,
  selected,
  onSelect,
}: {
  slot: SlotSuggestion;
  rank: number;
  selected: boolean;
  onSelect: () => void;
}) {
  const [expanded, setExpanded] = useState(false);

  return (
    <button
      type="button"
      onClick={onSelect}
      className={cn(
        "w-full rounded-lg border p-4 text-left transition-all",
        selected
          ? "border-primary bg-primary/5 ring-1 ring-primary"
          : "hover:border-primary/50 hover:bg-muted/30"
      )}
    >
      <div className="flex items-start justify-between">
        <div className="flex items-start gap-3">
          <div
            className={cn(
              "flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-sm font-bold",
              selected
                ? "bg-primary text-primary-foreground"
                : "bg-muted text-muted-foreground"
            )}
          >
            {selected ? <Check className="h-4 w-4" /> : rank}
          </div>
          <div>
            <p className="font-medium">{formatSlotDate(slot.start)}</p>
            <p className="text-sm text-muted-foreground">
              {formatSlotTime(slot.start)} – {formatSlotTime(slot.end)}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          {slot.has_conflict ? (
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger>
                  <Badge variant="outline" className="gap-1 border-amber-300 text-amber-600">
                    <AlertTriangle className="h-3 w-3" />
                    {slot.free_count}/{slot.total_count}
                  </Badge>
                </TooltipTrigger>
                <TooltipContent>
                  {slot.conflicts.length} attendee
                  {slot.conflicts.length !== 1 ? "s" : ""} unavailable
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          ) : (
            <Badge variant="outline" className="gap-1 border-green-300 text-green-600">
              <Users className="h-3 w-3" />
              All free
            </Badge>
          )}
          <div className="flex items-center gap-1 rounded bg-muted px-2 py-0.5 text-xs font-medium text-muted-foreground">
            <Clock className="h-3 w-3" />
            {slot.score}%
          </div>
        </div>
      </div>

      {slot.conflicts.length > 0 && (
        <div className="mt-3">
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              setExpanded(!expanded);
            }}
            className="flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground"
          >
            {expanded ? (
              <ChevronUp className="h-3 w-3" />
            ) : (
              <ChevronDown className="h-3 w-3" />
            )}
            {slot.conflicts.length} conflict{slot.conflicts.length !== 1 ? "s" : ""}
          </button>
          {expanded && (
            <div className="mt-2 space-y-1.5 rounded-md bg-muted/50 p-3">
              {slot.conflicts.map((c) => (
                <div key={c.user_id} className="flex items-center gap-2 text-sm">
                  <AlertTriangle className="h-3 w-3 text-amber-500" />
                  <span className="font-medium">{c.name}</span>
                  <span className="text-muted-foreground">
                    — {c.reason.replace(/_/g, " ")}
                    {c.event_summary && ` (${c.event_summary})`}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </button>
  );
}

export function SlotSuggester({
  suggestions,
  onConfirm,
}: {
  suggestions: SlotSuggestion[];
  onConfirm: (slot: SlotSuggestion) => void;
}) {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="font-semibold">Suggested Time Slots</h3>
          <p className="text-sm text-muted-foreground">
            Ranked by availability and convenience
          </p>
        </div>
      </div>
      <div className="space-y-2">
        {suggestions.map((slot, i) => (
          <SlotCard
            key={`${slot.start}-${slot.end}`}
            slot={slot}
            rank={i + 1}
            selected={selectedIndex === i}
            onSelect={() => setSelectedIndex(i)}
          />
        ))}
      </div>
      {selectedIndex !== null && (
        <Button
          onClick={() => onConfirm(suggestions[selectedIndex])}
          className="w-full"
        >
          Confirm & Book Selected Slot
        </Button>
      )}
    </div>
  );
}
