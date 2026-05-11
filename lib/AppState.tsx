"use client";
import React, { createContext, useContext, useEffect, useState, useCallback } from "react";
import { newsfeed as seedNewsfeed, Activity, user as seedUser } from "@/lib/mock-data";

type Toast = { id: number; msg: string; kind: "success" | "info" | "error" };

export type NotificationItem = Activity & { unread?: boolean };

export type UserPrefs = {
  emailDigest: "daily" | "weekly" | "off";
  notifyEvents: boolean;
  notifyJobs: boolean;
  notifyConnections: boolean;
  notifyMentorship: boolean;
  notifyGiving: boolean;
  privacyDirectory: boolean;
  privacyEmail: boolean;
  privacyLocation: boolean;
  theme: "light" | "dark";
  language: "en" | "de";
};

export type UserProfile = {
  firstName: string;
  lastName: string;
  email: string;
  location: string;
  bio: string;
  jobTitle: string;
};

type State = {
  rsvpEvents: number[];
  savedJobs: number[];
  appliedJobs: number[];
  connections: number[];
  pendingConnections: number[];
  mentorRequests: number[];
  readArticles: number[];
  campaignBoost: Record<number, number>;
  donations: { id: number; date: string; campaign: string; amount: number }[];
  totalGivenBoost: number;
  notifications: NotificationItem[];
  readNotifIds: number[];
  prefs: UserPrefs;
  profile: UserProfile;
  toasts: Toast[];
};

type Actions = {
  toggleRsvp: (id: number, title: string) => void;
  toggleSave: (id: number, title: string) => void;
  applyJob: (id: number, title: string) => void;
  toggleConnect: (id: number, name: string) => void;
  requestMentor: (id: number, name: string) => void;
  markRead: (id: number) => void;
  donate: (campaignId: number, campaignTitle: string, amount: number) => void;
  showToast: (msg: string, kind?: Toast["kind"]) => void;
  dismissToast: (id: number) => void;
  pushNotification: (n: Omit<NotificationItem, "id" | "time" | "unread">) => void;
  markNotifRead: (id: number) => void;
  markAllNotifsRead: () => void;
  clearAllNotifs: () => void;
  updatePrefs: (p: Partial<UserPrefs>) => void;
  updateProfile: (p: Partial<UserProfile>) => void;
  signOut: () => void;
};

const Ctx = createContext<(State & Actions) | null>(null);

const LS_KEY = "uni-bamberg-alumni-state-v1";

const defaultPrefs: UserPrefs = {
  emailDigest: "weekly",
  notifyEvents: true,
  notifyJobs: true,
  notifyConnections: true,
  notifyMentorship: true,
  notifyGiving: false,
  privacyDirectory: true,
  privacyEmail: false,
  privacyLocation: true,
  theme: "light",
  language: "en"
};

const initial: State = {
  rsvpEvents: [4],
  savedJobs: [],
  appliedJobs: [],
  connections: [1, 3, 4, 5, 8, 13],
  pendingConnections: [],
  mentorRequests: [],
  readArticles: [],
  campaignBoost: {},
  donations: [],
  totalGivenBoost: 0,
  notifications: seedNewsfeed.map(n => ({ ...n, unread: true })),
  readNotifIds: [],
  prefs: defaultPrefs,
  profile: {
    firstName: seedUser.firstName,
    lastName: "Müller",
    email: seedUser.email,
    location: seedUser.location,
    bio: seedUser.bio,
    jobTitle: seedUser.jobTitle
  },
  toasts: []
};

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<State>(initial);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    try {
      const saved = localStorage.getItem(LS_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        setState(s => ({ ...s, ...parsed, toasts: [], prefs: { ...defaultPrefs, ...parsed.prefs } }));
      }
    } catch {}
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    const { toasts, ...persist } = state;
    try { localStorage.setItem(LS_KEY, JSON.stringify(persist)); } catch {}
    
    // Apply theme to document
    if (state.prefs.theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [state, hydrated]);

  const showToast = useCallback((msg: string, kind: Toast["kind"] = "success") => {
    const id = Date.now() + Math.random();
    setState(s => ({ ...s, toasts: [...s.toasts, { id, msg, kind }] }));
    setTimeout(() => {
      setState(s => ({ ...s, toasts: s.toasts.filter(t => t.id !== id) }));
    }, 3500);
  }, []);

  const dismissToast = useCallback((id: number) => {
    setState(s => ({ ...s, toasts: s.toasts.filter(t => t.id !== id) }));
  }, []);

  const pushNotification: Actions["pushNotification"] = (n) => {
    const id = Date.now() + Math.floor(Math.random() * 1000);
    setState(s => ({
      ...s,
      notifications: [{ id, time: "just now", unread: true, ...n }, ...s.notifications].slice(0, 50)
    }));
  };

  const toggleRsvp = (id: number, title: string) => {
    setState(s => {
      const has = s.rsvpEvents.includes(id);
      showToast(has ? `Removed RSVP for "${title}"` : `✓ RSVP confirmed for "${title}"`, has ? "info" : "success");
      return { ...s, rsvpEvents: has ? s.rsvpEvents.filter(x => x !== id) : [...s.rsvpEvents, id] };
    });
    if (!state.rsvpEvents.includes(id)) {
      pushNotification({ type: "event", text: `RSVP confirmed: ${title}`, avatar: null });
    }
  };

  const toggleSave = (id: number, title: string) => {
    setState(s => {
      const has = s.savedJobs.includes(id);
      showToast(has ? `Removed "${title}" from saved` : `Saved "${title}"`, has ? "info" : "success");
      return { ...s, savedJobs: has ? s.savedJobs.filter(x => x !== id) : [...s.savedJobs, id] };
    });
  };

  const applyJob = (id: number, title: string) => {
    setState(s => {
      if (s.appliedJobs.includes(id)) return s;
      showToast(`✓ Application submitted for "${title}"`);
      return { ...s, appliedJobs: [...s.appliedJobs, id] };
    });
    pushNotification({ type: "job", text: `Application submitted: ${title}`, avatar: null });
  };

  const toggleConnect = (id: number, name: string) => {
    setState(s => {
      if (s.connections.includes(id)) {
        showToast(`Disconnected from ${name}`, "info");
        return { ...s, connections: s.connections.filter(x => x !== id) };
      }
      if (s.pendingConnections.includes(id)) {
        showToast(`Connection request to ${name} cancelled`, "info");
        return { ...s, pendingConnections: s.pendingConnections.filter(x => x !== id) };
      }
      showToast(`Connection request sent to ${name}`);
      return { ...s, pendingConnections: [...s.pendingConnections, id] };
    });
    if (!state.connections.includes(id) && !state.pendingConnections.includes(id)) {
      pushNotification({ type: "connection", text: `Connection request sent to ${name}`, avatar: null });
    }
  };

  const requestMentor = (id: number, name: string) => {
    setState(s => {
      if (s.mentorRequests.includes(id)) {
        showToast(`Already requested ${name}`, "info");
        return s;
      }
      showToast(`✓ Mentor request sent to ${name}`);
      return { ...s, mentorRequests: [...s.mentorRequests, id] };
    });
    pushNotification({ type: "connection", text: `Mentor session requested with ${name}`, avatar: null });
  };

  const markRead = (id: number) => {
    setState(s => s.readArticles.includes(id) ? s : { ...s, readArticles: [...s.readArticles, id] });
  };

  const donate = (campaignId: number, campaignTitle: string, amount: number) => {
    setState(s => {
      const today = new Date().toISOString().slice(0, 10);
      const donation = { id: Date.now(), date: today, campaign: campaignTitle, amount };
      showToast(`✓ Thank you! €${amount} donated to "${campaignTitle}"`);
      return {
        ...s,
        campaignBoost: { ...s.campaignBoost, [campaignId]: (s.campaignBoost[campaignId] || 0) + amount },
        donations: [donation, ...s.donations],
        totalGivenBoost: s.totalGivenBoost + amount
      };
    });
    pushNotification({ type: "giving", text: `Thank you! €${amount} donated to "${campaignTitle}"`, avatar: null });
  };

  const markNotifRead = (id: number) => {
    setState(s => ({
      ...s,
      notifications: s.notifications.map(n => n.id === id ? { ...n, unread: false } : n),
      readNotifIds: s.readNotifIds.includes(id) ? s.readNotifIds : [...s.readNotifIds, id]
    }));
  };

  const markAllNotifsRead = () => {
    setState(s => ({
      ...s,
      notifications: s.notifications.map(n => ({ ...n, unread: false })),
      readNotifIds: s.notifications.map(n => n.id)
    }));
  };

  const clearAllNotifs = () => {
    setState(s => ({ ...s, notifications: [], readNotifIds: [] }));
  };

  const updatePrefs = (p: Partial<UserPrefs>) => {
    setState(s => ({ ...s, prefs: { ...s.prefs, ...p } }));
  };

  const updateProfile = (p: Partial<UserProfile>) => {
    setState(s => ({ ...s, profile: { ...s.profile, ...p } }));
  };

  const signOut = () => {
    setState({ ...initial, toasts: [{ id: Date.now(), msg: "You have been signed out (demo)", kind: "info" }] });
    try { localStorage.removeItem(LS_KEY); } catch {}
  };

  return (
    <Ctx.Provider value={{
      ...state,
      toggleRsvp, toggleSave, applyJob, toggleConnect, requestMentor, markRead, donate,
      showToast, dismissToast, pushNotification, markNotifRead, markAllNotifsRead, clearAllNotifs,
      updatePrefs, updateProfile, signOut
    }}>
      {children}
    </Ctx.Provider>
  );
}

export function useApp() {
  const v = useContext(Ctx);
  if (!v) throw new Error("useApp must be used inside AppProvider");
  return v;
}
