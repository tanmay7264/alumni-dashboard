"use client";
import HeroHeader from "@/components/HeroHeader";
import { useApp } from "@/lib/AppState";
import { useTranslation } from "@/lib/i18n";
import { events, jobs, mentors } from "@/lib/mock-data";
import { Calendar, Briefcase, Users, Clock, MapPin, ArrowRight, Check } from "lucide-react";
import Link from "next/link";

export default function ActivityPage() {
  const { rsvpEvents, appliedJobs, mentorRequests, prefs } = useApp();
  const t = useTranslation(prefs.language);

  const myEvents = events.filter(e => rsvpEvents.includes(e.id));
  const myJobs = jobs.filter(j => appliedJobs.includes(j.id));
  const myMentors = mentors.filter(m => mentorRequests.includes(m.id));

  return (
    <>
      <HeroHeader
        eyebrow="My Hub"
        title={t.yourActivity}
        subtitle={t.manageActivity}
      />

      <div className="space-y-8">
        <section className="card p-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-lg bg-navy-50 text-navy-700 flex items-center justify-center">
              <Calendar className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-navy-900">Upcoming Events ({myEvents.length})</h2>
              <p className="text-sm text-gray-500">Events you have RSVP'd to</p>
            </div>
          </div>
          
          {myEvents.length === 0 ? (
            <div className="text-center py-8 bg-gray-50 rounded-xl border border-dashed border-gray-200">
              <p className="text-gray-500 mb-3">{t.noRsvps}</p>
              <Link href="/events" className="btn-outline">Browse Events</Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {myEvents.map(e => (
                <div key={e.id} className="flex gap-4 p-4 rounded-xl border border-navy-50 hover:border-navy-200 transition-colors">
                  <div className="shrink-0 w-16 h-16 rounded-lg bg-gradient-to-br from-navy-700 to-navy-500 text-white flex flex-col items-center justify-center">
                    <div className="text-[10px] uppercase tracking-wide font-semibold opacity-80">
                      {new Date(e.date).toLocaleString("en", { month: "short" })}
                    </div>
                    <div className="text-xl font-bold leading-none">{new Date(e.date).getDate()}</div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="chip">{e.type}</span>
                    </div>
                    <h3 className="font-semibold text-navy-900 truncate">{e.title}</h3>
                    <div className="flex items-center gap-4 text-xs text-gray-600 mt-2">
                      <span className="flex items-center gap-1"><Clock className="w-3 h-3" />{e.time}</span>
                      <span className="flex items-center gap-1"><MapPin className="w-3 h-3" />{e.location}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>

        <section className="card p-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-lg bg-navy-50 text-navy-700 flex items-center justify-center">
              <Briefcase className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-navy-900">Job Applications ({myJobs.length})</h2>
              <p className="text-sm text-gray-500">Jobs you have applied for</p>
            </div>
          </div>
          
          {myJobs.length === 0 ? (
            <div className="text-center py-8 bg-gray-50 rounded-xl border border-dashed border-gray-200">
              <p className="text-gray-500 mb-3">{t.noJobs}</p>
              <Link href="/jobs" className="btn-outline">Browse Jobs</Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {myJobs.map(j => (
                <div key={j.id} className="flex items-start gap-4 p-4 rounded-xl border border-navy-50 hover:border-navy-200 transition-colors">
                  <div className="shrink-0 w-12 h-12 rounded-lg bg-navy-50 text-navy-700 flex items-center justify-center font-bold">
                    {j.company.charAt(0)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-navy-900 truncate">{j.title}</h3>
                    <div className="text-sm text-gray-600">{j.company} · {j.location}</div>
                    <div className="mt-3">
                      <span className="chip-green"><Check className="w-3 h-3 mr-1 inline" /> Applied</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>

        <section className="card p-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-lg bg-navy-50 text-navy-700 flex items-center justify-center">
              <Users className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-navy-900">Mentorship Requests ({myMentors.length})</h2>
              <p className="text-sm text-gray-500">Sessions you have requested</p>
            </div>
          </div>
          
          {myMentors.length === 0 ? (
            <div className="text-center py-8 bg-gray-50 rounded-xl border border-dashed border-gray-200">
              <p className="text-gray-500 mb-3">{t.noMentors}</p>
              <Link href="/mentorship" className="btn-outline">Find a Mentor</Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {myMentors.map(m => (
                <div key={m.id} className="flex items-center gap-4 p-4 rounded-xl border border-navy-50 hover:border-navy-200 transition-colors">
                  <img src={m.avatar} alt={m.name} className="w-12 h-12 rounded-full" />
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-navy-900">{m.name}</h3>
                    <div className="text-sm text-gray-600 truncate">{m.role} at {m.company}</div>
                    <div className="mt-2">
                       <span className="chip-gold"><Clock className="w-3 h-3 mr-1 inline" /> Requested</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>
      </div>
    </>
  );
}
