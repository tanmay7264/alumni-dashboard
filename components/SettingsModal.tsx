"use client";
import { User, Bell, Lock, Palette, Globe, Trash2 } from "lucide-react";
import { useState, useEffect } from "react";
import Modal from "./Modal";
import { useApp } from "@/lib/AppState";
import { user as seedUser } from "@/lib/mock-data";

type Tab = "profile" | "notifications" | "privacy" | "appearance";

const TABS: { id: Tab; label: string; icon: any }[] = [
  { id: "profile", label: "Profile", icon: User },
  { id: "notifications", label: "Notifications", icon: Bell },
  { id: "privacy", label: "Privacy", icon: Lock },
  { id: "appearance", label: "Appearance", icon: Palette }
];

function Toggle({ checked, onChange, label, desc }: { checked: boolean; onChange: (b: boolean) => void; label: string; desc?: string }) {
  return (
    <label className="flex items-start justify-between gap-4 py-3 cursor-pointer">
      <div>
        <div className="text-sm font-medium text-navy-900">{label}</div>
        {desc && <div className="text-xs text-gray-500 mt-0.5">{desc}</div>}
      </div>
      <button
        type="button"
        onClick={() => onChange(!checked)}
        className={`relative w-10 h-6 rounded-full transition-colors shrink-0 ${checked ? "bg-navy-700" : "bg-gray-300"}`}
      >
        <span className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform ${checked ? "translate-x-4" : ""}`} />
      </button>
    </label>
  );
}

export default function SettingsModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  const { prefs, updatePrefs, showToast, clearAllNotifs, donations, profile: globalProfile, updateProfile } = useApp();
  const [tab, setTab] = useState<Tab>("profile");
  const [profile, setProfile] = useState(globalProfile);

  useEffect(() => {
    if (open) setProfile(globalProfile);
  }, [open, globalProfile]);

  function saveProfile(e: React.FormEvent) {
    e.preventDefault();
    updateProfile(profile);
    showToast("✓ Profile updated");
    onClose();
  }

  return (
    <Modal open={open} onClose={onClose} title="Settings" maxWidth="max-w-3xl">
      <div className="grid grid-cols-[180px_1fr] gap-6 -m-2">
        {/* Tabs */}
        <aside className="space-y-1">
          {TABS.map(t => {
            const Icon = t.icon;
            return (
              <button
                key={t.id}
                onClick={() => setTab(t.id)}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors text-left ${tab === t.id ? "bg-navy-700 text-white" : "text-navy-900 hover:bg-navy-50"}`}
              >
                <Icon className="w-4 h-4" />
                {t.label}
              </button>
            );
          })}
        </aside>

        {/* Content */}
        <div>
          {tab === "profile" && (
            <form onSubmit={saveProfile} className="space-y-4">
              <h3 className="font-bold text-navy-900">Profile Information</h3>

              <div className="flex items-center gap-4 pb-4 border-b border-navy-50">
                <img src={seedUser.avatar} alt="" className="w-16 h-16 rounded-full border-2 border-navy-100" />
                <div>
                  <button type="button" onClick={() => showToast("Photo upload (demo)")} className="btn-outline text-sm">Change Photo</button>
                  <p className="text-xs text-gray-500 mt-1">JPG or PNG, max 2MB</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm font-medium text-navy-900 mb-1">First name</label>
                  <input value={profile.firstName} onChange={e => setProfile({ ...profile, firstName: e.target.value })} className="input bg-white border border-navy-100" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-navy-900 mb-1">Last name</label>
                  <input value={profile.lastName} onChange={e => setProfile({ ...profile, lastName: e.target.value })} className="input bg-white border border-navy-100" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-navy-900 mb-1">Email</label>
                <input type="email" value={profile.email} onChange={e => setProfile({ ...profile, email: e.target.value })} className="input bg-white border border-navy-100" />
              </div>
              <div>
                <label className="block text-sm font-medium text-navy-900 mb-1">Current Role</label>
                <input value={profile.jobTitle} onChange={e => setProfile({ ...profile, jobTitle: e.target.value })} className="input bg-white border border-navy-100" />
              </div>
              <div>
                <label className="block text-sm font-medium text-navy-900 mb-1">Location</label>
                <input value={profile.location} onChange={e => setProfile({ ...profile, location: e.target.value })} className="input bg-white border border-navy-100" />
              </div>
              <div>
                <label className="block text-sm font-medium text-navy-900 mb-1">Bio</label>
                <textarea rows={3} value={profile.bio} onChange={e => setProfile({ ...profile, bio: e.target.value })} className="input bg-white border border-navy-100" />
              </div>

              <div className="flex gap-2 justify-end pt-2 border-t border-navy-50">
                <button type="button" onClick={onClose} className="btn-outline">Cancel</button>
                <button type="submit" className="btn-primary">Save Changes</button>
              </div>
            </form>
          )}

          {tab === "notifications" && (
            <div>
              <h3 className="font-bold text-navy-900 mb-4">Notification Preferences</h3>

              <div className="mb-4">
                <label className="block text-sm font-semibold text-navy-900 mb-2">Email digest</label>
                <div className="flex gap-2">
                  {(["daily", "weekly", "off"] as const).map(opt => (
                    <button
                      key={opt}
                      onClick={() => { updatePrefs({ emailDigest: opt }); showToast(`Email digest set to ${opt}`); }}
                      className={`px-4 py-2 rounded-lg text-sm font-medium capitalize ${prefs.emailDigest === opt ? "bg-navy-700 text-white" : "bg-white border border-navy-100 text-navy-700 hover:border-navy-300"}`}
                    >
                      {opt}
                    </button>
                  ))}
                </div>
              </div>

              <div className="divide-y divide-navy-50 border-y border-navy-50">
                <Toggle checked={prefs.notifyEvents} onChange={v => { updatePrefs({ notifyEvents: v }); showToast(`Event notifications ${v ? "enabled" : "disabled"}`); }} label="Events" desc="RSVPs, reminders, new events in your area" />
                <Toggle checked={prefs.notifyJobs} onChange={v => { updatePrefs({ notifyJobs: v }); showToast(`Job notifications ${v ? "enabled" : "disabled"}`); }} label="Jobs" desc="New job matches, application status, referrals" />
                <Toggle checked={prefs.notifyConnections} onChange={v => { updatePrefs({ notifyConnections: v }); showToast(`Connection notifications ${v ? "enabled" : "disabled"}`); }} label="Connections" desc="Connection requests, accepts, messages" />
                <Toggle checked={prefs.notifyMentorship} onChange={v => { updatePrefs({ notifyMentorship: v }); showToast(`Mentorship notifications ${v ? "enabled" : "disabled"}`); }} label="Mentorship" desc="Session requests, reminders" />
                <Toggle checked={prefs.notifyGiving} onChange={v => { updatePrefs({ notifyGiving: v }); showToast(`Giving notifications ${v ? "enabled" : "disabled"}`); }} label="Giving & Campaigns" desc="Campaign updates, year-end giving reminders" />
              </div>

              <div className="mt-6 pt-4 border-t border-navy-50">
                <button onClick={() => { clearAllNotifs(); showToast("All notifications cleared"); }} className="text-sm text-red-600 hover:bg-red-50 px-3 py-2 rounded-lg flex items-center gap-2">
                  <Trash2 className="w-4 h-4" />
                  Clear all notifications
                </button>
              </div>
            </div>
          )}

          {tab === "privacy" && (
            <div>
              <h3 className="font-bold text-navy-900 mb-4">Privacy</h3>
              <div className="divide-y divide-navy-50 border-y border-navy-50 mb-6">
                <Toggle checked={prefs.privacyDirectory} onChange={v => { updatePrefs({ privacyDirectory: v }); showToast(`Directory visibility ${v ? "on" : "off"}`); }} label="Show me in the alumni directory" desc="Other alumni can find your profile via search and filters" />
                <Toggle checked={prefs.privacyEmail} onChange={v => { updatePrefs({ privacyEmail: v }); showToast(`Email visibility ${v ? "on" : "off"}`); }} label="Show my email to connections" desc="Visible to alumni you've connected with" />
                <Toggle checked={prefs.privacyLocation} onChange={v => { updatePrefs({ privacyLocation: v }); showToast(`Location visibility ${v ? "on" : "off"}`); }} label="Show my location" desc="City and country on your profile" />
              </div>

              <div className="card p-4 bg-navy-50 mb-4">
                <h4 className="font-semibold text-navy-900 mb-1">Data export</h4>
                <p className="text-xs text-gray-600 mb-3">Download a copy of all your data including {donations.length} new donation{donations.length === 1 ? "" : "s"}.</p>
                <button onClick={() => showToast("Data export prepared — link sent to your email")} className="btn-outline text-sm">Request Data Export</button>
              </div>

              <div className="card p-4 border-red-100">
                <h4 className="font-semibold text-red-700 mb-1">Delete account</h4>
                <p className="text-xs text-gray-600 mb-3">Permanently remove your account and all associated data. Cannot be undone.</p>
                <button onClick={() => showToast("Account deletion request requires email confirmation (demo)", "info")} className="text-sm text-red-600 border border-red-200 hover:bg-red-50 px-3 py-1.5 rounded-lg">
                  Delete Account
                </button>
              </div>
            </div>
          )}

          {tab === "appearance" && (
            <div>
              <h3 className="font-bold text-navy-900 mb-4">Appearance & Language</h3>

              <div className="mb-6">
                <label className="block text-sm font-semibold text-navy-900 mb-2">Theme</label>
                <div className="grid grid-cols-2 gap-3">
                  {(["light", "dark"] as const).map(t => (
                    <button
                      key={t}
                      onClick={() => { updatePrefs({ theme: t }); showToast(`Theme set to ${t}`); }}
                      className={`p-4 rounded-lg border-2 text-sm font-medium capitalize ${prefs.theme === t ? "border-navy-700 bg-navy-50" : "border-navy-100 hover:border-navy-300"}`}
                    >
                      <Palette className="w-4 h-4 mb-2 mx-auto text-navy-700" />
                      {t}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-navy-900 mb-2">Language</label>
                <div className="grid grid-cols-2 gap-3">
                  {(["en", "de"] as const).map(l => (
                    <button
                      key={l}
                      onClick={() => { updatePrefs({ language: l }); showToast(`Language set to ${l === "en" ? "English" : "Deutsch"}`); }}
                      className={`p-4 rounded-lg border-2 text-sm font-medium ${prefs.language === l ? "border-navy-700 bg-navy-50" : "border-navy-100 hover:border-navy-300"}`}
                    >
                      <Globe className="w-4 h-4 mb-2 mx-auto text-navy-700" />
                      {l === "en" ? "English" : "Deutsch"}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </Modal>
  );
}
