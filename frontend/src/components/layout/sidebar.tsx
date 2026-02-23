"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Calendar,
  Clock,
  Users,
  Settings,
  ChevronLeft,
  ChevronRight,
  LogOut,
  Building2,
  Mail,
  Menu,
  X,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
import { CompanySwitcher } from "./company-switcher";
import { NotificationBell } from "@/components/notifications/notification-bell";

const NAV_ITEMS = [
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/meetings", label: "Meetings", icon: Calendar },
  { href: "/schedule", label: "Schedule", icon: Clock },
];

const COMPANY_ITEMS = [
  { href: "/company/members", label: "Members", icon: Users },
  { href: "/company/invitations", label: "Invitations", icon: Mail },
  { href: "/company/settings", label: "Company Settings", icon: Building2 },
];

const SETTINGS_ITEMS = [
  { href: "/settings", label: "Settings", icon: Settings },
];

function NavItem({
  href,
  label,
  icon: Icon,
  collapsed,
  active,
}: {
  href: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  collapsed: boolean;
  active: boolean;
}) {
  const content = (
    <Link
      href={href}
      className={cn(
        "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
        active
          ? "bg-primary/10 text-primary"
          : "text-muted-foreground hover:bg-muted hover:text-foreground",
        collapsed && "justify-center px-2"
      )}
    >
      <Icon className={cn("h-5 w-5 shrink-0", active && "text-primary")} />
      {!collapsed && <span>{label}</span>}
    </Link>
  );

  if (collapsed) {
    return (
      <Tooltip delayDuration={0}>
        <TooltipTrigger asChild>{content}</TooltipTrigger>
        <TooltipContent side="right" sideOffset={8}>
          {label}
        </TooltipContent>
      </Tooltip>
    );
  }

  return content;
}

function SidebarContent({
  collapsed,
  onToggle,
}: {
  collapsed: boolean;
  onToggle: () => void;
}) {
  const pathname = usePathname();

  return (
    <div className="flex h-full flex-col">
      {/* Logo */}
      <div
        className={cn(
          "flex h-16 items-center border-b border-[hsl(var(--sidebar-border))] px-4",
          collapsed ? "justify-center" : "gap-2"
        )}
      >
        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-primary">
          <Calendar className="h-4 w-4 text-primary-foreground" />
        </div>
        {!collapsed && (
          <span className="text-lg font-bold tracking-tight">OpenSlot</span>
        )}
      </div>

      {/* Company Switcher */}
      <div className="border-b border-[hsl(var(--sidebar-border))] px-3 py-3">
        <CompanySwitcher collapsed={collapsed} />
      </div>

      {/* Navigation */}
      <nav className="flex-1 space-y-1 overflow-y-auto px-3 py-4">
        <div className="space-y-1">
          {!collapsed && (
            <p className="mb-2 px-3 text-xs font-semibold uppercase tracking-wider text-[hsl(var(--sidebar-muted))]">
              Main
            </p>
          )}
          {NAV_ITEMS.map((item) => (
            <NavItem
              key={item.href}
              {...item}
              collapsed={collapsed}
              active={pathname.startsWith(item.href)}
            />
          ))}
        </div>

        <Separator className="my-4" />

        <div className="space-y-1">
          {!collapsed && (
            <p className="mb-2 px-3 text-xs font-semibold uppercase tracking-wider text-[hsl(var(--sidebar-muted))]">
              Company
            </p>
          )}
          {COMPANY_ITEMS.map((item) => (
            <NavItem
              key={item.href}
              {...item}
              collapsed={collapsed}
              active={pathname.startsWith(item.href)}
            />
          ))}
        </div>

        <Separator className="my-4" />

        <div className="space-y-1">
          {SETTINGS_ITEMS.map((item) => (
            <NavItem
              key={item.href}
              {...item}
              collapsed={collapsed}
              active={pathname === item.href || pathname.startsWith(item.href + "/")}
            />
          ))}
        </div>
      </nav>

      {/* Bottom section */}
      <div className="border-t border-[hsl(var(--sidebar-border))] px-3 py-3">
        <div
          className={cn(
            "flex items-center",
            collapsed ? "flex-col gap-2" : "justify-between"
          )}
        >
          <NotificationBell collapsed={collapsed} />
          <Button
            variant="ghost"
            size="icon"
            onClick={onToggle}
            className="h-8 w-8 text-muted-foreground hover:text-foreground"
          >
            {collapsed ? (
              <ChevronRight className="h-4 w-4" />
            ) : (
              <ChevronLeft className="h-4 w-4" />
            )}
          </Button>
        </div>

        <Separator className="my-3" />

        {/* User info */}
        <div
          className={cn(
            "flex items-center gap-3 rounded-lg px-2 py-2",
            collapsed && "justify-center"
          )}
        >
          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary/10 text-sm font-semibold text-primary">
            AR
          </div>
          {!collapsed && (
            <div className="flex-1 truncate">
              <p className="truncate text-sm font-medium">Adam Reynolds</p>
              <p className="truncate text-xs text-muted-foreground">
                adam@acmecorp.com
              </p>
            </div>
          )}
        </div>

        <Button
          variant="ghost"
          className={cn(
            "mt-1 w-full text-muted-foreground hover:text-foreground",
            collapsed ? "justify-center px-2" : "justify-start"
          )}
          size="sm"
        >
          <LogOut className="h-4 w-4 shrink-0" />
          {!collapsed && <span className="ml-2">Sign out</span>}
        </Button>
      </div>
    </div>
  );
}

export function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem("sidebar-collapsed");
    if (stored !== null) setCollapsed(JSON.parse(stored));
  }, []);

  const toggle = () => {
    setCollapsed((prev) => {
      const next = !prev;
      localStorage.setItem("sidebar-collapsed", JSON.stringify(next));
      return next;
    });
  };

  return (
    <TooltipProvider>
      {/* Mobile trigger */}
      <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
        <SheetTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
            className="fixed left-4 top-4 z-40 lg:hidden"
          >
            <Menu className="h-5 w-5" />
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="w-72 p-0">
          <Button
            variant="ghost"
            size="icon"
            className="absolute right-2 top-2 z-50"
            onClick={() => setMobileOpen(false)}
          >
            <X className="h-4 w-4" />
          </Button>
          <SidebarContent collapsed={false} onToggle={() => setMobileOpen(false)} />
        </SheetContent>
      </Sheet>

      {/* Desktop sidebar */}
      <aside
        className={cn(
          "hidden h-screen flex-col border-r border-[hsl(var(--sidebar-border))] bg-[hsl(var(--sidebar-bg))] transition-all duration-300 lg:flex",
          collapsed ? "w-[72px]" : "w-64"
        )}
      >
        <SidebarContent collapsed={collapsed} onToggle={toggle} />
      </aside>
    </TooltipProvider>
  );
}
