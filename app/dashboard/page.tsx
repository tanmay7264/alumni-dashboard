"use client";
import HeroHeader from "@/components/HeroHeader";
import { user, events, newsfeed, jobs } from "@/lib/mock-data";
import { useApp } from "@/lib/AppState";
import { useTranslation } from "@/lib/i18n";
import {
  Calendar, Users, Briefcase, Heart, ArrowRight, TrendingUp, MapPin, Clock, Check
} from "lucide-react";
import Link from "next/link";

const iconMap = { calendar: Calendar, users: Users, briefcase: Briefcase, heart: Heart };

export default function Dashboard() {
  const { rsvpEvents, connections, savedJobs, appliedJobs, totalGivenBoost, toggleRsvp, profile, prefs } = useApp();
  const t = useTranslation(prefs.language);

  const upcomingEvents = events.slice(0, 3);
  const recentJobs = jobs.slice(0, 2);

  const liveStats = [
    { ...stats[0], label: t.upcomingEvents, value: rsvpEvents.length || stats[0].value, change: `${rsvpEvents.length} ${t.rsvpsActive}` },
    { ...stats[1], label: t.networkConnections, value: connections.length, change: `${connections.length - 6 > 0 ? "+" + (connections.length - 6) : connections.length} ${t.thisMonth}` },
    { ...stats[2], label: t.newJobPostings, value: jobs.length, change: `${savedJobs.length} ${t.saved.toLowerCase()} · ${appliedJobs.length} ${t.applied.toLowerCase()}` },
    { ...stats[3], label: t.donationsYtd, value: "€" + (450 + totalGivenBoost), change: `${t.classOf} 2019 ${t.goal}: 80%` }
  ];

  return (
    <>
      <HeroHeader
        eyebrow={`${t.classOf} ${user.classYear} · ${user.degree}`}
        title={`${t.welcomeBack}, ${profile.firstName}!`}
        subtitle={`${user.faculty}. ${t.networkGrown} ${connections.length - 6 > 0 ? connections.length - 6 : 0} ${t.connectionsThisMonth} ${t.stammtisch}`}
        action={
          <Link href="/directory" className="btn-gold">
            {t.viewNetwork} <ArrowRight className="w-4 h-4" />
          </Link>
        }
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {liveStats.map(s => {
          const Icon = iconMap[s.icon as keyof typeof iconMap];
          return (
            <div key={s.label} className="card card-hover p-5">
              <div className="flex items-start justify-between mb-3">
                <div className="w-10 h-10 rounded-lg bg-navy-50 text-navy-700 flex items-center justify-center">
                  <Icon className="w-5 h-5" />
                </div>
                <span className="chip-gold">
                  <TrendingUp className="w-3 h-3 mr-1" /> {t.live}
                </span>
              </div>
              <div className="text-2xl font-bold text-navy-900">{s.value}</div>
              <div className="text-sm text-gray-600 mt-0.5">{s.label}</div>
              <div className="text-xs text-navy-600 mt-2">{s.change}</div>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <div className="card p-6">
            <div className="flex items-center justify-between mb-5">
              <h2 className="text-lg font-bold text-navy-900">{t.upcomingEvents}</h2>
              <Link href="/events" className="text-sm font-medium text-navy-700 hover:text-navy-600 flex items-center gap-1">
                {t.viewAll} <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
            <div className="space-y-4">
              {upcomingEvents.map(e => {
                const rsvped = rsvpEvents.includes(e.id);
                return (
                  <div key={e.id} className="flex gap-4 p-3 rounded-xl hover:bg-navy-50 transition-colors group">
                    <div className="shrink-0 w-14 h-14 rounded-lg bg-gradient-to-br from-navy-700 to-navy-500 text-white flex flex-col items-center justify-center">
                      <div className="text-[10px] uppercase tracking-wide font-semibold opacity-80">
                        {new Date(e.date).toLocaleString("en", { month: "short" })}
                      </div>
                      <div className="text-lg font-bold leading-none">{new Date(e.date).getDate()}</div>
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="chip">{e.type}</span>
                        <span className="text-xs text-gray-500">{e.attending + (rsvped ? 1 : 0)} {t.attending.toLowerCase()}</span>
                      </div>
                      <h3 className="font-semibold text-navy-900 truncate">{e.title}</h3>
                      <div className="flex items-center gap-4 text-xs text-gray-600 mt-1">
                        <span className="flex items-center gap-1"><Clock className="w-3 h-3" />{e.time}</span>
                        <span className="flex items-center gap-1"><MapPin className="w-3 h-3" />{e.location}</span>
                      </div>
                    </div>
                    <button
                      onClick={() => toggleRsvp(e.id, e.title)}
                      className={rsvped ? "btn-success self-center text-xs py-1.5 px-3" : "btn-outline self-center text-xs py-1.5 px-3"}
                    >
                      {rsvped ? <><Check className="w-3 h-3" /> {t.going}</> : t.rsvp}
                    </button>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="card p-6">
            <div className="flex items-center justify-between mb-5">
              <h2 className="text-lg font-bold text-navy-900">{t.jobsFromAlumni}</h2>
              <Link href="/jobs" className="text-sm font-medium text-navy-700 hover:text-navy-600 flex items-center gap-1">
                {t.viewAll} <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
            <div className="space-y-3">
              {recentJobs.map(j => (
                <Link href="/jobs" key={j.id} className="flex items-start gap-4 p-3 rounded-xl border border-navy-50 hover:border-navy-200 hover:shadow-card transition-all">
                  <div className="shrink-0 w-12 h-12 rounded-lg bg-navy-50 text-navy-700 flex items-center justify-center font-bold">
                    {j.company.charAt(0)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-navy-900 truncate">{j.title}</h3>
                    <div className="text-sm text-gray-600">{j.company} · {j.location}</div>
                    <div className="flex flex-wrap gap-1.5 mt-2">
                      {j.tags.map(t => <span key={t} className="chip">{t}</span>)}
                      {j.referralOffered && <span className="chip-gold">{t.referralOffered}</span>}
                    </div>
                  </div>
                  <div className="text-right shrink-0">
                    <div className="text-xs text-gray-500">{j.postedDays}d ago</div>
                    <div className="text-xs text-navy-600 mt-1">{j.applicants} {t.applicants.toLowerCase()}</div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="card p-6">
            <h2 className="text-lg font-bold text-navy-900 mb-4">{t.recentActivity}</h2>
            <div className="space-y-4">
              {newsfeed.map(item => (
                <div key={item.id} className="flex gap-3">
                  <div className="shrink-0">
                    {item.avatar ? (
                      <img src={item.avatar} alt="" className="w-9 h-9 rounded-full" />
                    ) : (
                      <div className="w-9 h-9 rounded-full bg-navy-50 text-navy-700 flex items-center justify-center text-xs font-bold">OF</div>
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-navy-900 leading-snug">{item.text}</p>
                    <div className="text-xs text-gray-500 mt-0.5">{item.time}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="card p-6 bg-gradient-to-br from-gold-100 to-gold-200 border-gold-300">
            <div className="text-xs uppercase tracking-wider font-semibold text-navy-700 mb-2">
              {t.classOf} {user.classYear} {t.classGift}
            </div>
            <h3 className="font-bold text-navy-900 mb-2">€{(38400 + totalGivenBoost).toLocaleString("de-DE")} {t.raised} / €50,000 {t.goal}</h3>
            <div className="h-2 bg-white/60 rounded-full overflow-hidden mb-3">
              <div className="h-full bg-navy-700 rounded-full transition-all" style={{ width: `${Math.min(100, ((38400 + totalGivenBoost) / 50000) * 100)}%` }} />
            </div>
            <p className="text-sm text-navy-800 mb-4">
              {Math.round(((38400 + totalGivenBoost) / 50000) * 100)}% {t.raisedOfClassGoal} {t.closeGap}
            </p>
            <Link href="/giving" className="btn-primary w-full">{t.giveNow}</Link>
          </div>
        </div>
      </div>
    </>
  );
}

const stats = [
  { label: "Upcoming Events", value: 4, change: "+2 this month", icon: "calendar" as const },
  { label: "Network Connections", value: 142, change: "+8 this month", icon: "users" as const },
  { label: "New Job Postings", value: 27, change: "+12 this week", icon: "briefcase" as const },
  { label: "Donations YTD", value: "€450", change: "Class of 2019 goal: 80%", icon: "heart" as const }
];
