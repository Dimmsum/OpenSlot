import Link from "next/link";
import {
  Calendar,
  Clock,
  Users,
  Shield,
  Zap,
  Globe,
  ArrowRight,
  Check,
  Star,
} from "lucide-react";
import { Button } from "@/components/ui/button";

const FEATURES = [
  {
    icon: Zap,
    title: "AI-Powered Suggestions",
    description:
      "Our scheduling engine analyses team availability and surfaces the best meeting times instantly.",
  },
  {
    icon: Calendar,
    title: "Google Calendar Sync",
    description:
      "Real-time integration with Google Calendar ensures conflict-free booking every time.",
  },
  {
    icon: Users,
    title: "Team-First Design",
    description:
      "Built for admins and team leads who need to coordinate across departments effortlessly.",
  },
  {
    icon: Clock,
    title: "Weekly Schedules",
    description:
      "Team members set their own availability windows for full control over when they can be booked.",
  },
  {
    icon: Globe,
    title: "Multi-Timezone",
    description:
      "Automatic timezone handling for distributed teams — no more manual conversions.",
  },
  {
    icon: Shield,
    title: "Enterprise Security",
    description:
      "Row-level security, encrypted tokens, and role-based access control out of the box.",
  },
];

const TESTIMONIALS = [
  {
    name: "Sarah Chen",
    role: "Engineering Manager",
    company: "TechFlow Inc.",
    quote:
      "OpenSlot eliminated the back-and-forth emails entirely. We now schedule cross-team meetings in seconds.",
  },
  {
    name: "Marcus Johnson",
    role: "Operations Lead",
    company: "ScaleUp Co.",
    quote:
      "The conflict detection alone saves us hours every week. It's become essential infrastructure for our org.",
  },
  {
    name: "Emily Nakamura",
    role: "Head of People Ops",
    company: "BrightPath",
    quote:
      "Our team adoption was instant. The availability editor is so intuitive that no training was needed.",
  },
];

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Navbar */}
      <header className="sticky top-0 z-50 border-b bg-background/80 backdrop-blur-md">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 lg:px-8">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
              <Calendar className="h-4 w-4 text-primary-foreground" />
            </div>
            <span className="text-xl font-bold tracking-tight">OpenSlot</span>
          </div>
          <nav className="hidden items-center gap-8 md:flex">
            <a href="#features" className="text-sm text-muted-foreground transition-colors hover:text-foreground">
              Features
            </a>
            <a href="#testimonials" className="text-sm text-muted-foreground transition-colors hover:text-foreground">
              Testimonials
            </a>
            <a href="#pricing" className="text-sm text-muted-foreground transition-colors hover:text-foreground">
              Pricing
            </a>
          </nav>
          <div className="flex items-center gap-3">
            <Link href="/login">
              <Button variant="ghost" size="sm">
                Sign in
              </Button>
            </Link>
            <Link href="/signup">
              <Button size="sm">
                Get started
                <ArrowRight className="ml-1 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <div className="absolute left-1/2 top-0 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/5 blur-3xl" />
          <div className="absolute right-0 top-1/2 h-[400px] w-[400px] -translate-y-1/2 rounded-full bg-accent/5 blur-3xl" />
        </div>
        <div className="mx-auto max-w-7xl px-4 py-24 text-center lg:px-8 lg:py-32">
          <div className="mx-auto mb-6 inline-flex items-center gap-2 rounded-full border bg-background px-4 py-1.5 text-sm">
            <Shield className="h-4 w-4 text-primary" />
            <span className="text-muted-foreground">Secure & reliable scheduling</span>
          </div>
          <h1 className="mx-auto max-w-4xl text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
            Schedule team meetings{" "}
            <span className="text-primary">effortlessly</span>
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground">
            Stop the endless email chains. OpenSlot analyses your team&apos;s availability
            and Google Calendar data to find the perfect meeting time — and books
            it with one click.
          </p>
          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link href="/signup">
              <Button size="lg" className="gap-2 px-8 text-base">
                Start free trial
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
            <Link href="/login">
              <Button variant="outline" size="lg" className="px-8 text-base">
                View demo
              </Button>
            </Link>
          </div>
          <div className="mt-12 flex items-center justify-center gap-8 text-sm text-muted-foreground">
            <div className="flex items-center gap-1.5">
              <Check className="h-4 w-4 text-primary" />
              Free 14-day trial
            </div>
            <div className="flex items-center gap-1.5">
              <Check className="h-4 w-4 text-primary" />
              No credit card required
            </div>
            <div className="flex items-center gap-1.5">
              <Check className="h-4 w-4 text-primary" />
              Cancel anytime
            </div>
          </div>
        </div>
      </section>

      {/* Trusted by */}
      <section className="border-y bg-muted/30">
        <div className="mx-auto max-w-7xl px-4 py-10 lg:px-8">
          <p className="mb-6 text-center text-xs font-semibold uppercase tracking-widest text-muted-foreground">
            Trusted by 800+ companies of every size
          </p>
          <div className="flex flex-wrap items-center justify-center gap-x-12 gap-y-4 opacity-40">
            {["TechFlow", "ScaleUp", "BrightPath", "Nexus", "Orion Labs"].map(
              (name) => (
                <span key={name} className="text-lg font-bold tracking-tight">
                  {name}
                </span>
              )
            )}
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="py-24">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              Everything you need to{" "}
              <span className="text-primary">schedule smarter</span>
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
              From AI-powered time suggestions to real-time calendar sync,
              OpenSlot handles the complexity so your team can focus on what
              matters.
            </p>
          </div>
          <div className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {FEATURES.map((feature) => (
              <div
                key={feature.title}
                className="group rounded-xl border bg-card p-6 transition-shadow hover:shadow-md"
              >
                <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-lg bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                  <feature.icon className="h-5 w-5" />
                </div>
                <h3 className="mb-2 text-lg font-semibold">{feature.title}</h3>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section id="testimonials" className="border-t bg-muted/20 py-24">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              Loved by <span className="text-primary">teams everywhere</span>
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-muted-foreground">
              See what teams are saying about OpenSlot.
            </p>
          </div>
          <div className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {TESTIMONIALS.map((t) => (
              <div
                key={t.name}
                className="flex flex-col rounded-xl border bg-card p-6"
              >
                <div className="mb-4 flex gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className="h-4 w-4 fill-primary text-primary"
                    />
                  ))}
                </div>
                <p className="flex-1 text-sm leading-relaxed text-muted-foreground">
                  &ldquo;{t.quote}&rdquo;
                </p>
                <div className="mt-6 flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-sm font-bold text-primary">
                    {t.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </div>
                  <div>
                    <p className="text-sm font-semibold">{t.name}</p>
                    <p className="text-xs text-muted-foreground">
                      {t.role}, {t.company}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <div className="rounded-2xl bg-primary px-8 py-16 text-center text-primary-foreground">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              Ready to simplify scheduling?
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-primary-foreground/80">
              Join hundreds of teams who have eliminated scheduling friction.
              Get started in minutes.
            </p>
            <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Link href="/signup">
                <Button
                  size="lg"
                  variant="secondary"
                  className="gap-2 px-8 text-base"
                >
                  Start free trial
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t bg-muted/30">
        <div className="mx-auto max-w-7xl px-4 py-12 lg:px-8">
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            <div>
              <div className="mb-4 flex items-center gap-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
                  <Calendar className="h-4 w-4 text-primary-foreground" />
                </div>
                <span className="text-lg font-bold">OpenSlot</span>
              </div>
              <p className="text-sm text-muted-foreground">
                Intelligent meeting scheduling for modern teams.
              </p>
            </div>
            <div>
              <h4 className="mb-3 text-sm font-semibold">Product</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#features" className="hover:text-foreground">Features</a></li>
                <li><a href="#pricing" className="hover:text-foreground">Pricing</a></li>
                <li><a href="#" className="hover:text-foreground">Integrations</a></li>
              </ul>
            </div>
            <div>
              <h4 className="mb-3 text-sm font-semibold">Company</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#" className="hover:text-foreground">About</a></li>
                <li><a href="#" className="hover:text-foreground">Careers</a></li>
                <li><a href="#" className="hover:text-foreground">Blog</a></li>
              </ul>
            </div>
            <div>
              <h4 className="mb-3 text-sm font-semibold">Legal</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#" className="hover:text-foreground">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-foreground">Terms of Service</a></li>
                <li><a href="#" className="hover:text-foreground">Security</a></li>
              </ul>
            </div>
          </div>
          <div className="mt-12 border-t pt-8 text-center text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} OpenSlot. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}
