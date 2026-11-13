import {
  Bot,
  Camera,
  Gamepad2,
  Home,
  Settings,
  UserRound,
  type LucideIcon,
} from "lucide-react";

export interface NavItem {
  label: string;
  href: string;
  icon: LucideIcon;
}

// The 4 core modules. Order matters: Home | Civic Advisor | Scan & Learn | Games.
export const primaryNav: NavItem[] = [
  { label: "Home", href: "/home", icon: Home },
  { label: "Legal Advisor", href: "/advisor", icon: Bot },
  { label: "Scan & Learn", href: "/scan-learn", icon: Camera },
  { label: "Games", href: "/games", icon: Gamepad2 },
];

// Secondary / account-level links, shown after a divider.
export const secondaryNav: NavItem[] = [
  { label: "Profile", href: "/profile", icon: UserRound },
  { label: "Settings", href: "/settings", icon: Settings },
];
