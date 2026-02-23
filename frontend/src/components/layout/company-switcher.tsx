"use client";

import { useState } from "react";
import { Check, ChevronsUpDown, Building2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { companies } from "@/lib/mock-data";

export function CompanySwitcher({ collapsed }: { collapsed: boolean }) {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState(companies[0]);

  if (collapsed) {
    return (
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
            className="h-9 w-9"
            aria-label="Switch company"
          >
            <Building2 className="h-4 w-4" />
          </Button>
        </PopoverTrigger>
        <PopoverContent side="right" align="start" className="w-56 p-2">
          {companies.map((company) => (
            <button
              key={company.id}
              className={cn(
                "flex w-full items-center gap-2 rounded-md px-3 py-2 text-sm hover:bg-muted",
                selected.id === company.id && "bg-primary/10 text-primary"
              )}
              onClick={() => {
                setSelected(company);
                setOpen(false);
              }}
            >
              <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded bg-primary/10 text-xs font-bold text-primary">
                {company.name[0]}
              </div>
              <span className="truncate">{company.name}</span>
              {selected.id === company.id && (
                <Check className="ml-auto h-4 w-4 text-primary" />
              )}
            </button>
          ))}
        </PopoverContent>
      </Popover>
    );
  }

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-full justify-between bg-background/50"
        >
          <div className="flex items-center gap-2 truncate">
            <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded bg-primary/10 text-xs font-bold text-primary">
              {selected.name[0]}
            </div>
            <span className="truncate text-sm">{selected.name}</span>
          </div>
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[var(--radix-popover-trigger-width)] p-2">
        {companies.map((company) => (
          <button
            key={company.id}
            className={cn(
              "flex w-full items-center gap-2 rounded-md px-3 py-2 text-sm hover:bg-muted",
              selected.id === company.id && "bg-primary/10 text-primary"
            )}
            onClick={() => {
              setSelected(company);
              setOpen(false);
            }}
          >
            <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded bg-primary/10 text-xs font-bold text-primary">
              {company.name[0]}
            </div>
            <span className="truncate">{company.name}</span>
            {selected.id === company.id && (
              <Check className="ml-auto h-4 w-4 text-primary" />
            )}
          </button>
        ))}
      </PopoverContent>
    </Popover>
  );
}
