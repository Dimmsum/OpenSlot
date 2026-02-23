"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, Sparkles, X } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { SlotSuggester } from "@/components/meetings/slot-suggester";
import { companyMembers, slotSuggestions } from "@/lib/mock-data";
import type { SlotSuggestion, CompanyMember } from "@/types";

export default function NewMeetingPage() {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [duration, setDuration] = useState("60");
  const [selectedMembers, setSelectedMembers] = useState<CompanyMember[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);

  const availableMembers = companyMembers.filter(
    (m) => !selectedMembers.find((s) => s.id === m.id)
  );

  const addMember = (memberId: string) => {
    const member = companyMembers.find((m) => m.id === memberId);
    if (member) setSelectedMembers((prev) => [...prev, member]);
  };

  const removeMember = (memberId: string) => {
    setSelectedMembers((prev) => prev.filter((m) => m.id !== memberId));
  };

  const handleSuggest = () => {
    setShowSuggestions(true);
  };

  const handleConfirm = (slot: SlotSuggestion) => {
    console.log("Confirmed slot:", slot);
    router.push("/meetings");
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => router.back()}
        >
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <div>
          <h1 className="text-2xl font-bold tracking-tight">New Meeting</h1>
          <p className="mt-1 text-muted-foreground">
            Set up meeting details and find the best time.
          </p>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Form */}
        <Card>
          <CardHeader>
            <CardTitle>Meeting Details</CardTitle>
            <CardDescription>
              Fill in the meeting information and select attendees.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-5">
            <div className="space-y-2">
              <Label>Title</Label>
              <Input
                placeholder="e.g. Weekly Standup"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label>Description (optional)</Label>
              <Textarea
                placeholder="What is this meeting about?"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={3}
              />
            </div>

            <div className="space-y-2">
              <Label>Duration</Label>
              <Select value={duration} onValueChange={setDuration}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="15">15 minutes</SelectItem>
                  <SelectItem value="30">30 minutes</SelectItem>
                  <SelectItem value="45">45 minutes</SelectItem>
                  <SelectItem value="60">1 hour</SelectItem>
                  <SelectItem value="90">1.5 hours</SelectItem>
                  <SelectItem value="120">2 hours</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Attendees</Label>
              <Select onValueChange={addMember}>
                <SelectTrigger>
                  <SelectValue placeholder="Add team members..." />
                </SelectTrigger>
                <SelectContent>
                  {availableMembers.map((m) => (
                    <SelectItem key={m.id} value={m.id}>
                      {m.user?.full_name ?? m.user_id} — {m.role}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {selectedMembers.length > 0 && (
                <div className="mt-3 flex flex-wrap gap-2">
                  {selectedMembers.map((m) => (
                    <Badge key={m.id} variant="secondary" className="gap-1 py-1">
                      {m.user?.full_name ?? m.user_id}
                      <button
                        type="button"
                        onClick={() => removeMember(m.id)}
                        className="ml-0.5 hover:text-destructive"
                      >
                        <X className="h-3 w-3" />
                      </button>
                    </Badge>
                  ))}
                </div>
              )}
            </div>

            <Button
              onClick={handleSuggest}
              disabled={!title || selectedMembers.length === 0}
              className="w-full gap-2"
            >
              <Sparkles className="h-4 w-4" />
              Suggest Times
            </Button>
          </CardContent>
        </Card>

        {/* Suggestions */}
        <Card>
          <CardHeader>
            <CardTitle>Time Slots</CardTitle>
            <CardDescription>
              {showSuggestions
                ? "AI-ranked suggestions based on team availability"
                : "Fill in the details and click 'Suggest Times' to find optimal slots"}
            </CardDescription>
          </CardHeader>
          <CardContent>
            {showSuggestions ? (
              <SlotSuggester
                suggestions={slotSuggestions}
                onConfirm={handleConfirm}
              />
            ) : (
              <div className="flex flex-col items-center justify-center py-16 text-center">
                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-muted">
                  <Sparkles className="h-6 w-6 text-muted-foreground" />
                </div>
                <p className="mt-4 text-sm text-muted-foreground">
                  Suggestions will appear here after you set up your meeting.
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
