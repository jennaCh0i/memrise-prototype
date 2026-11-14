"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Icon from "./Icons";

// Nav_New — inactive = plum, active = yellow pill behind the plum icon.
const TABS = [
  { href: "/home", label: "home", icon: "home", match: (p) => p.startsWith("/home") },
  { href: "/", label: "lessons", icon: "lessons", match: (p) => p === "/" || p.startsWith("/lesson") },
  { href: "/play", label: "play", icon: "play", match: (p) => p.startsWith("/play") },
  { href: "/flashcards", label: "flash cards", icon: "cards", match: (p) => p.startsWith("/flashcards") },
  { href: "/community", label: "community", icon: "chat", match: (p) => p.startsWith("/community") },
];

export default function TabBar() {
  const path = usePathname();
  return (
    <nav className="tabbar" aria-label="Main">
      {TABS.map((t) => {
        const on = t.match(path);
        return (
          <Link key={t.href} href={t.href} className={`tab ${on ? "on" : ""}`} aria-current={on ? "page" : undefined}>
            <span className="ind"><Icon name={t.icon} /></span>
            <span className="t-tab">{t.label}</span>
          </Link>
        );
      })}
    </nav>
  );
}
