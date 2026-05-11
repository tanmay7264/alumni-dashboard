"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard, Calendar, Briefcase, Users, Heart, Newspaper,
  HandHeart, GraduationCap, Settings, LogOut, Activity, Tag
} from "lucide-react";
import clsx from "clsx";
import { useState } from "react";
import SettingsModal from "./SettingsModal";
import { useApp } from "@/lib/AppState";
import { useTranslation } from "@/lib/i18n";

export default function Sidebar() {
  const path = usePathname();
  const { signOut, prefs } = useApp();
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [confirmSignOut, setConfirmSignOut] = useState(false);
  const t = useTranslation(prefs.language);

  const nav = [
    { href: "/dashboard", label: t.dashboard, icon: LayoutDashboard },
    { href: "/activity", label: t.myActivity, icon: Activity },
    { href: "/events", label: t.events, icon: Calendar },
    { href: "/jobs", label: t.jobs, icon: Briefcase },
    { href: "/directory", label: t.directory, icon: Users },
    { href: "/giving", label: t.giving, icon: Heart },
    { href: "/news", label: t.news, icon: Newspaper },
    { href: "/mentorship", label: t.mentorship, icon: HandHeart },
    { href: "/offers", label: t.offers, icon: Tag },
    { href: "/transcript", label: t.academicRecord, icon: GraduationCap }
  ];

  return (
    <>
      <aside className="fixed top-0 left-0 h-screen w-64 bg-navy-700 text-white flex flex-col z-10">
        <div className="px-6 py-6 border-b border-navy-600">
          <Link href="/dashboard" className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-white text-navy-700 flex items-center justify-center font-bold text-lg shrink-0">
              OF
            </div>
            <div className="leading-tight">
              <div className="font-bold text-sm">{t.alumniNetwork}</div>
              <div className="text-xs text-navy-100">Universität Bamberg</div>
            </div>
          </Link>
        </div>

        <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
          {nav.map(item => {
            const active = path === item.href;
            const Icon = item.icon;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={clsx(
                  "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors",
                  active
                    ? "bg-white text-navy-700 shadow-sm"
                    : "text-navy-100 hover:bg-navy-600 hover:text-white"
                )}
              >
                <Icon className="w-4 h-4 shrink-0" />
                <span>{item.label}</span>
                {active && <span className="ml-auto w-1.5 h-1.5 rounded-full bg-gold-500" />}
              </Link>
            );
          })}
        </nav>

        <div className="px-3 py-4 border-t border-navy-600 space-y-1">
          <button
            onClick={() => setSettingsOpen(true)}
            className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-navy-100 hover:bg-navy-600 hover:text-white transition-colors"
          >
            <Settings className="w-4 h-4" />
            {t.settings}
          </button>
          <button
            onClick={() => setConfirmSignOut(true)}
            className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-navy-100 hover:bg-navy-600 hover:text-white transition-colors"
          >
            <LogOut className="w-4 h-4" />
            {t.signOut}
          </button>
        </div>
      </aside>

      <SettingsModal open={settingsOpen} onClose={() => setSettingsOpen(false)} />

      {confirmSignOut && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-navy-900/60 backdrop-blur-sm" onClick={() => setConfirmSignOut(false)} />
          <div className="relative bg-white rounded-2xl shadow-card-hover w-full max-w-sm p-6">
            <h3 className="font-bold text-navy-900 text-lg mb-2">{t.signOut}?</h3>
            <p className="text-sm text-gray-600 mb-5">
              This will clear all your demo state (RSVPs, connections, donations, etc.).
            </p>
            <div className="flex gap-2 justify-end">
              <button onClick={() => setConfirmSignOut(false)} className="btn-outline">Cancel</button>
              <button
                onClick={() => { signOut(); setConfirmSignOut(false); }}
                className="btn-primary"
              >
                {t.signOut}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
