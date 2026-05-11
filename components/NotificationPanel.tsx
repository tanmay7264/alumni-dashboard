"use client";
import { Bell, Check, X, Calendar, Briefcase, Users, Newspaper, Heart, Trash2 } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useApp } from "@/lib/AppState";

const TYPE_ICON = {
  event: Calendar,
  job: Briefcase,
  connection: Users,
  news: Newspaper,
  giving: Heart
};

const TYPE_COLOR = {
  event: "bg-purple-50 text-purple-600",
  job: "bg-navy-50 text-navy-700",
  connection: "bg-amber-50 text-amber-700",
  news: "bg-green-50 text-green-700",
  giving: "bg-pink-50 text-pink-700"
};

export default function NotificationPanel() {
  const { notifications, markNotifRead, markAllNotifsRead, clearAllNotifs } = useApp();
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const unreadCount = notifications.filter(n => n.unread).length;

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, []);

  return (
    <div ref={containerRef} className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="relative p-2 hover:bg-navy-50 rounded-lg transition-colors"
        title="Notifications"
      >
        <Bell className="w-5 h-5 text-navy-700" />
        {unreadCount > 0 && (
          <span className="absolute -top-0.5 -right-0.5 min-w-[18px] h-[18px] px-1 bg-gold-500 text-navy-900 text-[10px] font-bold rounded-full flex items-center justify-center border-2 border-white">
            {unreadCount > 9 ? "9+" : unreadCount}
          </span>
        )}
      </button>

      {open && (
        <div className="absolute right-0 top-full mt-2 w-96 bg-white rounded-xl shadow-card-hover border border-navy-100 z-30 overflow-hidden">
          <div className="flex items-center justify-between px-4 py-3 border-b border-navy-50">
            <div>
              <h3 className="font-bold text-navy-900">Notifications</h3>
              <p className="text-xs text-gray-500">{unreadCount} unread · {notifications.length} total</p>
            </div>
            <div className="flex gap-1">
              {unreadCount > 0 && (
                <button
                  onClick={markAllNotifsRead}
                  className="text-xs text-navy-700 hover:bg-navy-50 px-2 py-1 rounded font-medium"
                >
                  Mark all read
                </button>
              )}
              {notifications.length > 0 && (
                <button
                  onClick={clearAllNotifs}
                  className="p-1 hover:bg-red-50 rounded text-gray-400 hover:text-red-600"
                  title="Clear all"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          </div>

          <div className="max-h-[60vh] overflow-y-auto">
            {notifications.length === 0 ? (
              <div className="p-8 text-center text-sm text-gray-500">
                <Bell className="w-8 h-8 mx-auto mb-2 text-gray-300" />
                You&apos;re all caught up
              </div>
            ) : (
              notifications.map(n => {
                const Icon = TYPE_ICON[n.type];
                const color = TYPE_COLOR[n.type];
                return (
                  <button
                    key={n.id}
                    onClick={() => markNotifRead(n.id)}
                    className={`w-full flex items-start gap-3 px-4 py-3 text-left border-b border-navy-50 last:border-b-0 transition-colors ${n.unread ? "bg-navy-50/40 hover:bg-navy-50/70" : "hover:bg-navy-50/40"}`}
                  >
                    {n.avatar ? (
                      <img src={n.avatar} className="w-9 h-9 rounded-full shrink-0" alt="" />
                    ) : (
                      <div className={`w-9 h-9 rounded-full ${color} flex items-center justify-center shrink-0`}>
                        <Icon className="w-4 h-4" />
                      </div>
                    )}
                    <div className="flex-1 min-w-0">
                      <p className="text-sm text-navy-900 leading-snug">{n.text}</p>
                      <p className="text-xs text-gray-500 mt-0.5">{n.time}</p>
                    </div>
                    {n.unread && <span className="w-2 h-2 rounded-full bg-gold-500 mt-2 shrink-0" />}
                  </button>
                );
              })
            )}
          </div>

          <div className="px-4 py-2 border-t border-navy-50 text-center">
            <button onClick={() => setOpen(false)} className="text-xs text-gray-500 hover:text-navy-700">
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
