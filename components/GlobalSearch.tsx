"use client";
import { Search, X, Calendar, Briefcase, Users, Newspaper, HandHeart, ArrowRight } from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { events, jobs, directory, news, mentors } from "@/lib/mock-data";
import { useApp } from "@/lib/AppState";
import { useTranslation } from "@/lib/i18n";

type Result = {
  type: "event" | "job" | "alumni" | "news" | "mentor";
  id: number;
  title: string;
  subtitle: string;
  href: string;
};

const TYPE_META = {
  event: { icon: Calendar, label: "Event", color: "text-purple-600 bg-purple-50" },
  job: { icon: Briefcase, label: "Job", color: "text-navy-700 bg-navy-50" },
  alumni: { icon: Users, label: "Alumni", color: "text-amber-700 bg-amber-50" },
  news: { icon: Newspaper, label: "News", color: "text-green-700 bg-green-50" },
  mentor: { icon: HandHeart, label: "Mentor", color: "text-pink-700 bg-pink-50" }
};

export default function GlobalSearch() {
  const { prefs } = useApp();
  const t = useTranslation(prefs.language);
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);
  const [highlighted, setHighlighted] = useState(0);
  const router = useRouter();
  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const results = useMemo<Result[]>(() => {
    if (!query.trim()) return [];
    const q = query.toLowerCase();
    const out: Result[] = [];
    events.forEach(e => {
      if ((e.title + e.description + e.location + e.type).toLowerCase().includes(q)) {
        out.push({ type: "event", id: e.id, title: e.title, subtitle: `${e.type} · ${e.location}`, href: "/events" });
      }
    });
    jobs.forEach(j => {
      if ((j.title + j.company + j.description + j.tags.join(" ")).toLowerCase().includes(q)) {
        out.push({ type: "job", id: j.id, title: j.title, subtitle: `${j.company} · ${j.location}`, href: "/jobs" });
      }
    });
    directory.forEach(p => {
      if ((p.name + p.role + p.company + p.location).toLowerCase().includes(q)) {
        out.push({ type: "alumni", id: p.id, title: p.name, subtitle: `${p.role} · ${p.company}`, href: "/directory" });
      }
    });
    news.forEach(n => {
      if ((n.title + n.excerpt + n.body).toLowerCase().includes(q)) {
        out.push({ type: "news", id: n.id, title: n.title, subtitle: `${n.category} · ${n.readTime} min read`, href: "/news" });
      }
    });
    mentors.forEach(m => {
      if ((m.name + m.role + m.expertise.join(" ")).toLowerCase().includes(q)) {
        out.push({ type: "mentor", id: m.id, title: m.name, subtitle: `${m.role} · ${m.expertise.slice(0, 2).join(", ")}`, href: "/mentorship" });
      }
    });
    return out.slice(0, 20);
  }, [query]);

  // close on outside click
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, []);

  // global cmd+k / ctrl+k to focus search
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        inputRef.current?.focus();
        setOpen(true);
      }
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, []);

  useEffect(() => setHighlighted(0), [query]);

  function goTo(r: Result) {
    setOpen(false);
    setQuery("");
    router.push(r.href);
  }

  function onKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (!open || results.length === 0) return;
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setHighlighted(h => Math.min(h + 1, results.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setHighlighted(h => Math.max(h - 1, 0));
    } else if (e.key === "Enter") {
      e.preventDefault();
      goTo(results[highlighted]);
    }
  }

  // group results by type
  const grouped = results.reduce<Record<string, Result[]>>((acc, r) => {
    (acc[r.type] = acc[r.type] || []).push(r);
    return acc;
  }, {});

  return (
    <div ref={containerRef} className="relative flex-1 max-w-md">
      <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
      <input
        ref={inputRef}
        value={query}
        onChange={e => { setQuery(e.target.value); setOpen(true); }}
        onFocus={() => setOpen(true)}
        onKeyDown={onKeyDown}
        type="text"
        placeholder={t.searchPlaceholder}
        className="w-full pl-9 pr-10 py-2 bg-navy-50 rounded-lg text-sm placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-navy-300 focus:bg-white transition-all"
      />
      {query && (
        <button
          onClick={() => { setQuery(""); inputRef.current?.focus(); }}
          className="absolute right-2 top-1/2 -translate-y-1/2 p-1 hover:bg-navy-100 rounded"
        >
          <X className="w-3.5 h-3.5 text-gray-400" />
        </button>
      )}

      {open && query.trim() && (
        <div className="absolute top-full mt-2 left-0 right-0 bg-white rounded-xl shadow-card-hover border border-navy-100 max-h-[70vh] overflow-y-auto z-30">
          {results.length === 0 ? (
            <div className="p-6 text-center text-sm text-gray-500">
              {t.noResults}
            </div>
          ) : (
            <>
              <div className="px-3 py-2 text-xs text-gray-500 border-b border-navy-50">
                {results.length} result{results.length === 1 ? "" : "s"} — ↑↓ navigate, ↵ open
              </div>
              {Object.entries(grouped).map(([type, items]) => {
                const meta = TYPE_META[type as keyof typeof TYPE_META];
                const Icon = meta.icon;
                return (
                  <div key={type}>
                    <div className="px-3 py-2 text-[10px] uppercase tracking-wider font-semibold text-gray-400 bg-navy-50/40">
                      {meta.label}s
                    </div>
                    {items.map(r => {
                      const idx = results.indexOf(r);
                      const isHi = idx === highlighted;
                      return (
                        <button
                          key={type + r.id}
                          onMouseEnter={() => setHighlighted(idx)}
                          onClick={() => goTo(r)}
                          className={`w-full flex items-center gap-3 px-3 py-2.5 text-left transition-colors ${isHi ? "bg-navy-50" : "hover:bg-navy-50/60"}`}
                        >
                          <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${meta.color}`}>
                            <Icon className="w-4 h-4" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="text-sm font-medium text-navy-900 truncate">{r.title}</div>
                            <div className="text-xs text-gray-500 truncate">{r.subtitle}</div>
                          </div>
                          <ArrowRight className="w-3.5 h-3.5 text-gray-400 shrink-0" />
                        </button>
                      );
                    })}
                  </div>
                );
              })}
            </>
          )}
        </div>
      )}

      {open && !query.trim() && (
        <div className="absolute top-full mt-2 left-0 right-0 bg-white rounded-xl shadow-card-hover border border-navy-100 p-3 z-30">
          <div className="text-xs uppercase tracking-wider font-semibold text-gray-400 mb-2 px-2">{t.quickLinks}</div>
          {[
            { label: t.events, href: "/events", icon: Calendar },
            { label: t.jobs, href: "/jobs", icon: Briefcase },
            { label: t.alumniDirectory, href: "/directory", icon: Users },
            { label: t.mentorship, href: "/mentorship", icon: HandHeart }
          ].map(l => {
            const Icon = l.icon;
            return (
              <button
                key={l.href}
                onClick={() => { router.push(l.href); setOpen(false); }}
                className="w-full flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-navy-50 text-sm text-navy-900"
              >
                <Icon className="w-4 h-4 text-navy-700" />
                {l.label}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
