"use client";

import { useState } from "react";
import {
  Users,
  Plus,
  MoreHorizontal,
  Shield,
  ShieldCheck,
  User,
  Wifi,
  WifiOff,
  Trash2,
  Video,
  Clock,
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
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
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
import { companyMembers } from "@/lib/mock-data";
import type { MemberRole, AvailabilityStatus } from "@/types";

const ROLE_CONFIG: Record<
  MemberRole,
  { icon: React.ComponentType<{ className?: string }>; variant: "default" | "secondary" | "outline" }
> = {
  admin: { icon: ShieldCheck, variant: "default" },
  team_lead: { icon: Shield, variant: "secondary" },
  member: { icon: User, variant: "outline" },
};

const AVAILABILITY_CONFIG: Record<
  AvailabilityStatus,
  { label: string; dotClass: string; textClass: string; icon?: React.ComponentType<{ className?: string }> }
> = {
  available: {
    label: "Available",
    dotClass: "bg-emerald-500",
    textClass: "text-emerald-600",
  },
  busy: {
    label: "Busy",
    dotClass: "bg-amber-500",
    textClass: "text-amber-600",
    icon: Clock,
  },
  in_meeting: {
    label: "In a meeting",
    dotClass: "bg-blue-500",
    textClass: "text-blue-600",
    icon: Video,
  },
  offline: {
    label: "Offline",
    dotClass: "bg-gray-400",
    textClass: "text-muted-foreground",
  },
};

export default function CompanyMembersPage() {
  const [inviteOpen, setInviteOpen] = useState(false);
  const [inviteEmail, setInviteEmail] = useState("");
  const [inviteRole, setInviteRole] = useState<MemberRole>("member");

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Team Members</h1>
          <p className="mt-1 text-muted-foreground">
            Manage your team and their roles within the company.
          </p>
        </div>
        <Button className="gap-2" onClick={() => setInviteOpen(true)}>
          <Plus className="h-4 w-4" />
          Invite Member
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="h-5 w-5" />
            Members ({companyMembers.length})
          </CardTitle>
          <CardDescription>
            All members of Acme Corp and their current roles.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Member</TableHead>
                <TableHead>Availability</TableHead>
                <TableHead>Role</TableHead>
                <TableHead>Google Calendar</TableHead>
                <TableHead>Joined</TableHead>
                <TableHead className="w-12" />
              </TableRow>
            </TableHeader>
            <TableBody>
              {companyMembers.map((member) => {
                const initials =
                  member.user?.full_name
                    ?.split(" ")
                    .map((n) => n[0])
                    .join("") ?? "?";
                const roleConfig = ROLE_CONFIG[member.role];
                const RoleIcon = roleConfig.icon;
                const gcalConnected = member.user_id !== "u-003";
                const status = member.availability ?? "offline";
                const availConfig = AVAILABILITY_CONFIG[status];
                const AvailIcon = availConfig.icon;

                return (
                  <TableRow key={member.id}>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <div className="relative">
                          <Avatar className="h-9 w-9">
                            <AvatarFallback className="bg-primary/10 text-sm font-semibold text-primary">
                              {initials}
                            </AvatarFallback>
                          </Avatar>
                          <span
                            className={cn(
                              "absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full border-2 border-card",
                              availConfig.dotClass,
                              status === "available" && "animate-pulse"
                            )}
                          />
                        </div>
                        <div>
                          <p className="font-medium">
                            {member.user?.full_name}
                          </p>
                          <p className="text-sm text-muted-foreground">
                            {member.user?.email}
                          </p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1.5">
                        {AvailIcon && (
                          <AvailIcon className={cn("h-3.5 w-3.5", availConfig.textClass)} />
                        )}
                        <span className={cn("text-sm font-medium", availConfig.textClass)}>
                          {availConfig.label}
                        </span>
                      </div>
                      {member.current_activity && (
                        <p className="mt-0.5 text-xs text-muted-foreground">
                          {member.current_activity}
                        </p>
                      )}
                    </TableCell>
                    <TableCell>
                      <Badge variant={roleConfig.variant} className="gap-1">
                        <RoleIcon className="h-3 w-3" />
                        {member.role.replace("_", " ")}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      {gcalConnected ? (
                        <div className="flex items-center gap-1.5 text-sm text-green-600">
                          <Wifi className="h-4 w-4" />
                          Connected
                        </div>
                      ) : (
                        <div className="flex items-center gap-1.5 text-sm text-amber-500">
                          <WifiOff className="h-4 w-4" />
                          Not connected
                        </div>
                      )}
                    </TableCell>
                    <TableCell className="text-sm text-muted-foreground">
                      {new Date(member.joined_at).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      })}
                    </TableCell>
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon" className="h-8 w-8">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>
                            <Shield className="mr-2 h-4 w-4" />
                            Change role
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem className="text-destructive">
                            <Trash2 className="mr-2 h-4 w-4" />
                            Remove
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Invite Dialog */}
      <Dialog open={inviteOpen} onOpenChange={setInviteOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Invite a Team Member</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-2">
            <div className="space-y-2">
              <Label>Email address</Label>
              <Input
                type="email"
                placeholder="colleague@company.com"
                value={inviteEmail}
                onChange={(e) => setInviteEmail(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label>Role</Label>
              <Select
                value={inviteRole}
                onValueChange={(v) => setInviteRole(v as MemberRole)}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="member">Member</SelectItem>
                  <SelectItem value="team_lead">Team Lead</SelectItem>
                  <SelectItem value="admin">Admin</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setInviteOpen(false)}>
              Cancel
            </Button>
            <Button
              onClick={() => {
                console.log("Inviting:", inviteEmail, inviteRole);
                setInviteOpen(false);
                setInviteEmail("");
              }}
              disabled={!inviteEmail}
            >
              Send Invitation
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
