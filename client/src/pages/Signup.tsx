import { useState, type FormEvent } from "react";
import { Link, useLocation } from "wouter";
import { ArrowRight, Bot, Scale, Shield, Trophy } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/contexts/AuthContext";

const highlights = [
  { icon: Bot, text: "Legal advisor that explains your situation in plain language" },
  { icon: Shield, text: "Verified rights & information from trusted, official sources" },
  { icon: Trophy, text: "Learn through scenarios, quizzes, XP, and badges" },
];

export default function Signup() {
  const { signup } = useAuth();
  const [, setLocation] = useLocation();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  function handleSubmit(event: FormEvent) {
    event.preventDefault();
    setError("");
    const success = signup(name, email, password);
    if (success) {
      setLocation("/home");
    } else {
      setError("Please fill in your name, email, and password.");
    }
  }

  return (
    <div className="min-h-screen w-full grid lg:grid-cols-2 bg-background">
      {/* Left: brand panel — hidden on small screens */}
      <div className="hidden lg:flex relative flex-col justify-between p-12 overflow-hidden bg-[#3e2c20] text-white">
        <div
          className="pointer-events-none absolute inset-0 opacity-30"
          style={{
            background:
              "radial-gradient(ellipse at 30% 20%, rgba(184,148,95,0.35), transparent 55%)",
          }}
        />
        <Link href="/" className="brand relative z-10">
          <span className="brand-mark" aria-hidden="true">
            <Shield size={18} strokeWidth={1.8} />
          </span>
          <span>NyaayMitra</span>
        </Link>

        <div className="relative z-10 max-w-md">
          <h1
            className="text-4xl font-medium leading-tight tracking-tight mb-4"
            style={{ fontFamily: "'Space Grotesk', sans-serif" }}
          >
            Understand your rights.
            <br />
            Act with confidence.
          </h1>
          <p className="text-white/60 text-sm leading-relaxed mb-10">
            Create an account to save your progress, track XP, and build a
            personal civic knowledge profile.
          </p>

          <ul className="space-y-4">
            {highlights.map(({ icon: Icon, text }) => (
              <li key={text} className="flex items-start gap-3 text-sm text-white/75">
                <span className="mt-0.5 grid place-items-center w-8 h-8 rounded-lg bg-white/10 shrink-0">
                  <Icon size={15} />
                </span>
                {text}
              </li>
            ))}
          </ul>
        </div>

        <p className="relative z-10 text-white/35 text-xs">
          This information is for awareness and guidance, not a substitute for legal advice.
        </p>
      </div>

      {/* Right: form panel */}
      <div className="flex flex-col items-center justify-center p-6 sm:p-12">
        <Link href="/" className="brand !text-foreground lg:hidden mb-10">
          <span
            className="brand-mark"
            style={{ color: "#8a6a4a", borderColor: "rgba(138,106,74,0.5)" }}
          >
            <Scale size={18} strokeWidth={1.8} />
          </span>
          <span>NyaayMitra</span>
        </Link>

        <div className="w-full max-w-sm">
          <h2 className="text-2xl font-semibold tracking-tight mb-1">Create your account</h2>
          <p className="text-muted-foreground text-sm mb-8">
            Start your civic learning journey with NyaayMitra.
          </p>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-2">
              <Label htmlFor="name">Full name</Label>
              <Input
                id="name"
                type="text"
                placeholder="Sanika Patil"
                value={name}
                onChange={(e) => setName(e.target.value)}
                autoComplete="name"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                autoComplete="email"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoComplete="new-password"
              />
            </div>

            {error && <p className="text-sm text-destructive">{error}</p>}

            <Button type="submit" className="w-full" size="lg">
              Create account <ArrowRight size={16} />
            </Button>
          </form>

          <p className="text-sm text-muted-foreground text-center mt-8">
            Already have an account?{" "}
            <Link href="/login" className="text-primary font-medium hover:underline">
              Log in
            </Link>
          </p>

          <p className="text-xs text-muted-foreground/70 text-center mt-4">
            This is a prototype signup for demo purposes — no real account is created.
          </p>
        </div>
      </div>
    </div>
  );
}
