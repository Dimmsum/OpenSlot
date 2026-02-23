"use client";

import { useState } from "react";
import { Building2, AlertTriangle } from "lucide-react";
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
import { companies } from "@/lib/mock-data";

export default function CompanySettingsPage() {
  const company = companies[0];
  const [name, setName] = useState(company.name);
  const [slug, setSlug] = useState(company.slug);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Company Settings</h1>
        <p className="mt-1 text-muted-foreground">
          Manage your company profile and configuration.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Building2 className="h-5 w-5" />
            General
          </CardTitle>
          <CardDescription>
            Basic information about your company.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label>Company Name</Label>
              <Input
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label>Slug</Label>
              <Input
                value={slug}
                onChange={(e) => setSlug(e.target.value)}
              />
              <p className="text-xs text-muted-foreground">
                Used in URLs: openslot.app/{slug}
              </p>
            </div>
          </div>
          <Button
            onClick={() =>
              console.log("Saving company:", { name, slug })
            }
          >
            Save Changes
          </Button>
        </CardContent>
      </Card>

      <Card className="border-destructive/50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-destructive">
            <AlertTriangle className="h-5 w-5" />
            Danger Zone
          </CardTitle>
          <CardDescription>
            Irreversible actions that affect your entire company.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between rounded-lg border border-destructive/20 p-4">
            <div>
              <p className="font-medium">Delete Company</p>
              <p className="text-sm text-muted-foreground">
                Permanently delete this company and all associated data. This
                action cannot be undone.
              </p>
            </div>
            <Button variant="destructive" size="sm">
              Delete Company
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
