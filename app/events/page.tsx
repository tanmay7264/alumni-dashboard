"use client";
import HeroHeader from "@/components/HeroHeader";
import Modal from "@/components/Modal";
import { events, Event } from "@/lib/mock-data";
import { useApp } from "@/lib/AppState";
import { useTranslation } from "@/lib/i18n";
import { Calendar, MapPin, Users, Plus, Star, Search, Check, Share2 } from "lucide-react";
import { useMemo, useState } from "react";

function fmtDate(d: string) {
  return new Date(d).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" });
}

const TYPES = ["All", "Reunion", "Networking", "Career", "Talk", "Sports"];

export default function EventsPage() {
  const { rsvpEvents, toggleRsvp, showToast, prefs } = useApp();
  const t = useTranslation(prefs.language);
  const [filter, setFilter] = useState("All");
  const [query, setQuery] = useState("");
  const [proposeOpen, setProposeOpen] = useState(false);
  const [shareEvent, setShareEvent] = useState<Event | null>(null);

  const filtered = useMemo(() => {
    return events.filter(e => {
      if (filter !== "All" && e.type !== filter) return false;
      if (query && !(e.title + e.description + e.location).toLowerCase().includes(query.toLowerCase())) return false;
      return true;
    });
  }, [filter, query]);

  const featured = filtered.find(e => e.featured) || filtered[0];
  const rest = filtered.filter(e => e.id !== featured?.id);

  return (
    <>
      <HeroHeader
        eyebrow={t.events}
        title={t.upcomingEvents}
        subtitle={`${rsvpEvents.length} ${t.eventsOnCalendar} ${filtered.length} ${t.ofUpcoming} ${events.length} ${t.upcoming}`}
        action={
          <button onClick={() => setProposeOpen(true)} className="btn-gold">
            <Plus className="w-4 h-4" /> {t.proposeEvent}
          </button>
        }
      />

      <div className="card p-4 mb-6 flex flex-wrap items-center gap-3">
        <div className="relative flex-1 min-w-[240px]">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            value={query}
            onChange={e => setQuery(e.target.value)}
            type="text"
            placeholder={t.searchEvents}
            className="input pl-9"
          />
        </div>
        <div className="flex flex-wrap gap-2">
          {TYPES.map(cat => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={cat === filter
                ? "px-4 py-1.5 rounded-full bg-navy-700 text-white text-sm font-medium"
                : "px-4 py-1.5 rounded-full bg-white border border-navy-100 text-navy-700 text-sm font-medium hover:border-navy-300"}
            >
              {cat === "All" ? t.all : cat}
            </button>
          ))}
        </div>
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-12 bg-white rounded-xl border border-dashed border-gray-200">
          <p className="text-gray-500 mb-4">{t.noEventsMatch}</p>
          <button onClick={() => { setFilter("All"); setQuery(""); }} className="btn-outline">
            {t.clearFilters}
          </button>
        </div>
      )}

      {featured && (
        <div className="card card-hover mb-8 overflow-hidden">
          <div className="grid md:grid-cols-2">
            <div className="relative h-64 md:h-auto">
              <img src={featured.image} alt={featured.title} className="absolute inset-0 w-full h-full object-cover" />
              <div className="absolute top-4 left-4 chip-gold flex items-center gap-1">
                <Star className="w-3 h-3" /> Featured
              </div>
            </div>
            <div className="p-8">
              <div className="text-xs font-semibold uppercase tracking-wider text-gold-500 mb-2">{featured.type}</div>
              <h2 className="text-2xl font-bold text-navy-900 mb-3">{featured.title}</h2>
              <p className="text-gray-600 mb-5">{featured.description}</p>
              <div className="space-y-2 text-sm mb-6">
                <div className="flex items-center gap-2 text-navy-900"><Calendar className="w-4 h-4 text-navy-700" />{fmtDate(featured.date)} · {featured.time}</div>
                <div className="flex items-center gap-2 text-navy-900"><MapPin className="w-4 h-4 text-navy-700" />{featured.location}</div>
                <div className="flex items-center gap-2 text-navy-900"><Users className="w-4 h-4 text-navy-700" />{featured.attending + (rsvpEvents.includes(featured.id) ? 1 : 0)} / {featured.capacity} {t.attending.toLowerCase()}</div>
              </div>
              <div className="flex gap-3 flex-wrap">
                {rsvpEvents.includes(featured.id) ? (
                  <button onClick={() => toggleRsvp(featured.id, featured.title)} className="btn-success">
                    <Check className="w-4 h-4" /> {t.going} — {t.cancel.toLowerCase()}?
                  </button>
                ) : (
                  <button onClick={() => toggleRsvp(featured.id, featured.title)} className="btn-primary">
                    {t.rsvp}
                  </button>
                )}
                <button onClick={() => setShareEvent(featured)} className="btn-outline">
                  <Share2 className="w-4 h-4" /> Share
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {rest.map(e => {
          const rsvped = rsvpEvents.includes(e.id);
          return (
            <div key={e.id} className="card card-hover overflow-hidden flex flex-col">
              <div className="relative h-40">
                <img src={e.image} alt={e.title} className="absolute inset-0 w-full h-full object-cover" />
                <div className="absolute top-3 left-3 chip bg-white/95 text-navy-700">{e.type}</div>
                {rsvped && <div className="absolute top-3 right-3 chip-green"><Check className="w-3 h-3 mr-1" />{t.going}</div>}
              </div>
              <div className="p-5 flex-1 flex flex-col">
                <h3 className="font-bold text-navy-900 mb-2 line-clamp-2">{e.title}</h3>
                <p className="text-sm text-gray-600 line-clamp-2 mb-4 flex-1">{e.description}</p>
                <div className="space-y-1.5 text-xs text-gray-600 mb-4">
                  <div className="flex items-center gap-2"><Calendar className="w-3.5 h-3.5" />{fmtDate(e.date)}</div>
                  <div className="flex items-center gap-2"><MapPin className="w-3.5 h-3.5" />{e.location}</div>
                  <div className="flex items-center gap-2"><Users className="w-3.5 h-3.5" />{e.attending + (rsvped ? 1 : 0)} / {e.capacity}</div>
                </div>
                <button
                  onClick={() => toggleRsvp(e.id, e.title)}
                  className={rsvped ? "btn-success text-sm" : "btn-outline text-sm"}
                >
                  {rsvped ? <><Check className="w-3.5 h-3.5" /> {t.going}</> : t.rsvp}
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Propose Event Modal */}
      <Modal open={proposeOpen} onClose={() => setProposeOpen(false)} title="Propose an Event">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            setProposeOpen(false);
            showToast("✓ Event proposal submitted — alumni office will review within 3 days");
          }}
          className="space-y-4"
        >
          <div>
            <label className="block text-sm font-medium text-navy-900 mb-1">Event Title</label>
            <input required className="input bg-white border border-navy-100" placeholder="e.g. Vienna Alumni Wine Tasting" />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-sm font-medium text-navy-900 mb-1">Date</label>
              <input type="date" required className="input bg-white border border-navy-100" />
            </div>
            <div>
              <label className="block text-sm font-medium text-navy-900 mb-1">Type</label>
              <select required className="select w-full bg-white border border-navy-100">
                {TYPES.slice(1).map(t => <option key={t}>{t}</option>)}
              </select>
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-navy-900 mb-1">Location</label>
            <input required className="input bg-white border border-navy-100" placeholder="Address or 'Virtual'" />
          </div>
          <div>
            <label className="block text-sm font-medium text-navy-900 mb-1">Description</label>
            <textarea required rows={3} className="input bg-white border border-navy-100" placeholder="What is this event about?" />
          </div>
          <div className="flex gap-2 justify-end pt-2">
            <button type="button" onClick={() => setProposeOpen(false)} className="btn-outline">Cancel</button>
            <button type="submit" className="btn-primary">Submit Proposal</button>
          </div>
        </form>
      </Modal>

      {/* Share Modal */}
      <Modal open={!!shareEvent} onClose={() => setShareEvent(null)} title={`Share: ${shareEvent?.title}`}>
        {shareEvent && (
          <div className="space-y-4">
            <p className="text-sm text-gray-600">Copy this link and share with fellow alumni:</p>
            <div className="flex gap-2">
              <input
                readOnly
                value={`https://alumni.uni-bamberg.de/events/${shareEvent.id}`}
                className="input bg-navy-50 font-mono text-xs"
                onFocus={(e) => e.currentTarget.select()}
              />
              <button
                onClick={() => {
                  navigator.clipboard?.writeText(`https://alumni.uni-bamberg.de/events/${shareEvent.id}`);
                  showToast("Link copied to clipboard");
                  setShareEvent(null);
                }}
                className="btn-primary"
              >
                Copy
              </button>
            </div>
            <div className="grid grid-cols-3 gap-2 pt-2">
              <button onClick={() => { showToast("Posted to LinkedIn"); setShareEvent(null); }} className="btn-outline text-sm">LinkedIn</button>
              <button onClick={() => { showToast("Posted to X/Twitter"); setShareEvent(null); }} className="btn-outline text-sm">X / Twitter</button>
              <button onClick={() => { showToast("Email draft opened"); setShareEvent(null); }} className="btn-outline text-sm">Email</button>
            </div>
          </div>
        )}
      </Modal>
    </>
  );
}
