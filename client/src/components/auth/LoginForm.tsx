import { useState, type FormEvent } from "react";
import { useLocation } from "wouter";
import { ArrowRight, CheckCircle2, Eye, EyeOff, Loader2, Lock, Mail } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { cn } from "@/lib/utils";

type SubmitState = "idle" | "verifying" | "success";

export default function LoginForm() {
  const { login } = useAuth();
  const [, setLocation] = useLocation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [error, setError] = useState("");
  const [submitState, setSubmitState] = useState<SubmitState>("idle");

  function handleSubmit(event: FormEvent) {
    event.preventDefault();
    setError("");

    if (!email.trim() || !password.trim()) {
      setError("Please enter both email and password.");
      return;
    }

    setSubmitState("verifying");
    // Brief, honest UI delay so the "Verifying..." state is visible — the
    // actual auth check below is still the same mock login() as always.
    setTimeout(() => {
      const success = login(email, password);
      if (!success) {
        setSubmitState("idle");
        setError("Please enter both email and password.");
        return;
      }
      setSubmitState("success");
      setTimeout(() => setLocation("/home"), 500);
    }, 700);
  }

  const isBusy = submitState !== "idle";

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <div className="flex flex-col gap-1.5">
        <label htmlFor="citizenEmail" className="text-[11px] uppercase tracking-wider font-semibold text-muted-foreground">
          Email address
        </label>
        <div className="relative flex items-center">
          <Mail size={18} className="absolute left-3.5 text-muted-foreground pointer-events-none" />
          <input
            id="citizenEmail"
            type="email"
            required
            autoComplete="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="name@example.com"
            className="w-full pl-11 pr-4 py-3 bg-background rounded-xl text-sm text-foreground placeholder:text-muted-foreground/70 focus:outline-none focus:ring-2 focus:ring-[#a66f4f]/25 transition-all border border-border/60"
          />
        </div>
      </div>

      <div className="flex flex-col gap-1.5">
        <div className="flex items-center justify-between">
          <label htmlFor="citizenPassword" className="text-[11px] uppercase tracking-wider font-semibold text-muted-foreground">
            Password
          </label>
          <a href="#" className="text-[11px] font-semibold text-[#a66f4f] hover:underline">
            Forgot password?
          </a>
        </div>
        <div className="relative flex items-center">
          <Lock size={18} className="absolute left-3.5 text-muted-foreground pointer-events-none" />
          <input
            id="citizenPassword"
            type={showPassword ? "text" : "password"}
            required
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password"
            className="w-full pl-11 pr-11 py-3 bg-background rounded-xl text-sm text-foreground placeholder:text-muted-foreground/70 focus:outline-none focus:ring-2 focus:ring-[#a66f4f]/25 transition-all border border-border/60"
          />
          <button
            type="button"
            onClick={() => setShowPassword((v) => !v)}
            aria-label="Toggle password visibility"
            className="absolute right-3 p-1.5 text-muted-foreground hover:text-foreground transition-colors"
          >
            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        </div>
      </div>

      <label className="inline-flex items-center gap-2.5 cursor-pointer select-none pt-1">
        <input
          type="checkbox"
          checked={rememberMe}
          onChange={(e) => setRememberMe(e.target.checked)}
          className="sr-only peer"
        />
        <div className="w-5 h-5 rounded-md bg-muted peer-checked:bg-[#6f4e37] flex items-center justify-center text-white transition-colors">
          <svg
            viewBox="0 0 20 20"
            fill="none"
            className={cn("w-3 h-3 transition-opacity", rememberMe ? "opacity-100" : "opacity-0")}
          >
            <path d="M4 10l4 4 8-8" stroke="currentColor" strokeWidth={2.4} strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
        <span className="text-sm text-muted-foreground">Keep me signed in on this device</span>
      </label>

      {error && <p className="text-sm text-destructive">{error}</p>}

      <button
        type="submit"
        disabled={isBusy}
        className="w-full py-3.5 px-6 rounded-xl bg-[#6f4e37] hover:bg-[#5c3f2c] text-white font-semibold transition-all shadow-md shadow-[#6f4e37]/20 flex items-center justify-center gap-2 mt-2 active:scale-[0.99] disabled:opacity-90"
      >
        {submitState === "verifying" && (
          <>
            <Loader2 size={18} className="animate-spin" />
            <span>Verifying credentials...</span>
          </>
        )}
        {submitState === "success" && (
          <>
            <CheckCircle2 size={18} />
            <span>Authenticated</span>
          </>
        )}
        {submitState === "idle" && (
          <>
            <span>Login</span>
            <ArrowRight size={18} />
          </>
        )}
      </button>
    </form>
  );
}
