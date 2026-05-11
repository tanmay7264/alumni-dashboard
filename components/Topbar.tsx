"use client";
import { user } from "@/lib/mock-data";
import { useState } from "react";
import GlobalSearch from "./GlobalSearch";
import NotificationPanel from "./NotificationPanel";
import SettingsModal from "./SettingsModal";
import { Sun, Moon } from "lucide-react";
import { useApp } from "@/lib/AppState";
import { useTranslation } from "@/lib/i18n";

export default function Topbar() {
  const [settingsOpen, setSettingsOpen] = useState(false);
  const { profile, prefs, updatePrefs } = useApp();
  const t = useTranslation(prefs.language);

  return (
    <>
      <header className="sticky top-0 z-20 bg-white/80 backdrop-blur border-b border-navy-50 px-8 py-3 flex items-center gap-4">
        <GlobalSearch />
        <div className="flex items-center gap-2">
          <button
            onClick={() => updatePrefs({ theme: prefs.theme === "dark" ? "light" : "dark" })}
            title={t.toggleTheme}
            className="w-8 h-8 rounded-lg flex items-center justify-center text-navy-700 hover:bg-navy-50 transition-colors"
          >
            {prefs.theme === "dark" ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          </button>
          <button
            onClick={() => updatePrefs({ language: prefs.language === "en" ? "de" : "en" })}
            className="w-8 h-8 rounded-lg flex items-center justify-center text-xs font-bold text-navy-700 hover:bg-navy-50 transition-colors uppercase"
          >
            {prefs.language}
          </button>
          <NotificationPanel />
        </div>
        <button
          onClick={() => setSettingsOpen(true)}
          className="flex items-center gap-3 pl-4 border-l border-navy-50 hover:opacity-80 transition-opacity"
        >
          <img src={user.avatar} alt={`${profile.firstName} ${profile.lastName}`} className="w-9 h-9 rounded-full border-2 border-navy-100" />
          <div className="leading-tight text-left">
            <div className="text-sm font-semibold text-navy-900">{profile.firstName} {profile.lastName}</div>
            <div className="text-xs text-gray-500">Class of {user.classYear}</div>
          </div>
        </button>
      </header>
      <SettingsModal open={settingsOpen} onClose={() => setSettingsOpen(false)} />
    </>
  );
}
