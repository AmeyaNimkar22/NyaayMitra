import { Link } from "wouter";
import { Scale, ShieldCheck } from "lucide-react";
import LoginForm from "./LoginForm";

export default function LoginCard() {
  return (
    <div className="w-full max-w-[440px] relative z-10">
      <div className="bg-card rounded-2xl p-6 sm:p-10 shadow-lg shadow-foreground/5 flex flex-col relative overflow-hidden border border-border">
        <div className="flex items-center justify-between gap-3 mb-6">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-[#efe3d0] flex items-center justify-center text-[#6f4e37]">
              <Scale size={18} />
            </div>
            <span className="font-semibold text-[#6f4e37] tracking-tight" style={{ fontFamily: "'Newsreader', serif" }}>
              NyaayMitra
            </span>
          </div>
          <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#efe3d0] text-muted-foreground text-[11px] uppercase tracking-wider font-medium">
            <span className="w-1.5 h-1.5 rounded-full bg-[#a66f4f]" />
            <span>Citizen Access</span>
          </div>
        </div>

        <div className="mb-6">
          <h1
            className="text-3xl text-foreground font-normal leading-tight"
            style={{ fontFamily: "'Newsreader', serif" }}
          >
            Welcome back
          </h1>
          <p className="text-sm text-muted-foreground mt-1">
            Continue your journey towards understanding your rights.
          </p>
        </div>

        <LoginForm />

        <div className="mt-6 text-center text-sm text-muted-foreground">
          Don&apos;t have an account?{" "}
          <Link href="/signup" className="font-semibold text-[#a66f4f] hover:underline">
            Sign up
          </Link>
        </div>
      </div>

      <div className="mt-6 px-4 flex items-start gap-2.5 text-center justify-center">
        <ShieldCheck size={18} className="text-[#a66f4f] shrink-0 mt-0.5" />
        <p className="text-xs text-muted-foreground leading-snug">
          Public-interest civic platform • Non-partisan &amp; privacy-secured under Constitution of
          India guidelines
        </p>
      </div>
    </div>
  );
}
