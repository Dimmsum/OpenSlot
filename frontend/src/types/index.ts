export interface User {
  id: string;
  email: string;
  full_name: string | null;
  avatar_url: string | null;
  timezone: string;
  created_at: string;
}

export interface Company {
  id: string;
  name: string;
  slug: string;
  owner_id: string;
  created_at: string;
}

export type MemberRole = "admin" | "team_lead" | "member";

export type AvailabilityStatus = "available" | "busy" | "in_meeting" | "offline";

export interface CompanyMember {
  id: string;
  company_id: string;
  user_id: string;
  role: MemberRole;
  joined_at: string;
  user?: User;
  availability?: AvailabilityStatus;
  current_activity?: string;
}

export interface Invitation {
  id: string;
  company_id: string;
  email: string;
  role: MemberRole;
  invited_by: string;
  accepted_at: string | null;
  created_at: string;
}

export interface WeeklySchedule {
  id: string;
  user_id: string;
  company_id: string;
  is_active: boolean;
  created_at: string;
  blocks: ScheduleBlock[];
}

export type BlockType = "available" | "busy";

export interface ScheduleBlock {
  id: string;
  schedule_id: string;
  block_type: BlockType;
  day_of_week: number; // 0=Sun, 6=Sat
  start_time: string; // HH:MM
  end_time: string; // HH:MM
  label: string | null;
}

export interface GoogleCalendarToken {
  id: string;
  user_id: string;
  calendar_email: string | null;
  connected_at: string;
}

export type MeetingStatus = "draft" | "scheduled" | "cancelled";

export interface Meeting {
  id: string;
  company_id: string;
  created_by: string;
  title: string;
  description: string | null;
  duration_minutes: number;
  start_at: string | null;
  end_at: string | null;
  status: MeetingStatus;
  has_conflict: boolean;
  google_event_id: string | null;
  created_at: string;
  attendees?: MeetingAttendee[];
  creator?: User;
}

export interface MeetingAttendee {
  id: string;
  meeting_id: string;
  user_id: string;
  is_required: boolean;
  gcal_connected: boolean;
  google_event_id: string | null;
  user?: User;
}

export type NotificationType =
  | "meeting_created"
  | "meeting_updated"
  | "invited";

export interface Notification {
  id: string;
  user_id: string;
  type: NotificationType;
  payload: Record<string, unknown>;
  read: boolean;
  created_at: string;
}

export interface SlotSuggestion {
  start: string;
  end: string;
  score: number;
  has_conflict: boolean;
  free_count: number;
  total_count: number;
  conflicts: SlotConflict[];
}

export interface SlotConflict {
  user_id: string;
  name: string;
  reason: string;
  event_summary?: string;
}
