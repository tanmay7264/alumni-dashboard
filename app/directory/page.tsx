"use client";
import HeroHeader from "@/components/HeroHeader";
import Modal from "@/components/Modal";
import { directory, AlumniProfile } from "@/lib/mock-data";
import { useApp } from "@/lib/AppState";
import { useTranslation } from "@/lib/i18n";
import { MapPin, MessageCircle, UserPlus, Check, Clock, Search, Briefcase, GraduationCap } from "lucide-react";
import { useMemo, useState } from "react";

const YEARS = ["All Classes", "2020 — 2026", "2010 — 2019", "2000 — 2009"];
const INDUSTRIES = ["All Industries", "Technology", "Consulting", "Public Sector", "Academia", "Finance", "Healthcare", "Automotive"];
const LOCATIONS = ["All Locations", "Germany", "Europe", "Americas", "Asia"];

export default function DirectoryPage() {
  const { connections, pendingConnections, toggleConnect, showToast, prefs } = useApp();
  const t = useTranslation(prefs.language);
  const [query, setQuery] = useState("");
  const [year, setYear] = useState("All Classes");
  const [industry, setIndustry] = useState("All Industries");
  const [location, setLocation] = useState("All Locations");
  const [messageTarget, setMessageTarget] = useState<AlumniProfile | null>(null);
  const [profileTarget, setProfileTarget] = useState<AlumniProfile | null>(null);

  const filtered = useMemo(() => {
    return directory.filter(p => {
      if (query && !(p.name + p.role + p.company + p.location).toLowerCase().includes(query.toLowerCase())) return false;
      if (year !== "All Classes") {
        if (year.startsWith("2020") && (p.year < 2020 || p.year > 2026)) return false;
        if (year.startsWith("2010") && (p.year < 2010 || p.year > 2019)) return false;
        if (year.startsWith("2000") && (p.year < 2000 || p.year > 2009)) return false;
      }
      if (industry !== "All Industries" && p.industry !== industry) return false;
      if (location !== "All Locations") {
        const germanCities = ["Walldorf", "Herzogenaurach", "Munich", "Berlin", "Hamburg", "Frankfurt", "Bamberg"];
        const inEurope = germanCities.includes(p.location) || ["Brussels", "Zürich", "Dublin", "Stockholm", "London"].includes(p.location);
        if (location === "Germany" && !germanCities.includes(p.location)) return false;
        if (location === "Europe" && !inEurope) return false;
      }
      return true;
    });
  }, [query, year, industry, location]);

  return (
    <>
      <HeroHeader
        eyebrow="Network"
        title={t.alumniDirectory}
        subtitle={`24,800 alumni · ${connections.length} ${t.inYourNetwork} · ${pendingConnections.length} pending requests`}
      />

      <div className="card p-4 mb-6 flex flex-wrap gap-3">
        <div className="relative flex-1 min-w-[240px]">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input value={query} onChange={e => setQuery(e.target.value)} className="input pl-9" placeholder="Name, company, or keyword..." />
        </div>
        <select value={year} onChange={e => setYear(e.target.value)} className="select">{YEARS.map(y => <option key={y}>{y}</option>)}</select>
        <select value={industry} onChange={e => setIndustry(e.target.value)} className="select">{INDUSTRIES.map(i => <option key={i}>{i}</option>)}</select>
        <select value={location} onChange={e => setLocation(e.target.value)} className="select">{LOCATIONS.map(l => <option key={l}>{l}</option>)}</select>
      </div>

      <div className="mb-4 text-sm text-gray-600">
        Showing <span className="font-semibold text-navy-900">{filtered.length}</span> of 24,800 alumni
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {filtered.map(p => {
          const connected = connections.includes(p.id);
          const pending = pendingConnections.includes(p.id);
          return (
            <div key={p.id} className="card card-hover p-5 text-center">
              <button onClick={() => setProfileTarget(p)} className="relative inline-block mb-3 group">
                <img src={p.avatar} alt={p.name} className="w-20 h-20 rounded-full mx-auto border-4 border-navy-50 group-hover:border-navy-200 transition" />
                {connected && (
                  <div className="absolute bottom-0 right-0 w-6 h-6 rounded-full bg-gold-500 border-2 border-white flex items-center justify-center">
                    <Check className="w-3 h-3 text-navy-900" strokeWidth={3} />
                  </div>
                )}
              </button>
              <button onClick={() => setProfileTarget(p)} className="font-bold text-navy-900 hover:text-navy-700">{p.name}</button>
              <div className="text-xs text-gray-600 mb-1">{p.degree} · Class of {p.year}</div>
              <div className="text-sm font-medium text-navy-700 mb-1">{p.role}</div>
              <div className="text-xs text-gray-600 mb-2">{p.company}</div>
              <div className="flex items-center justify-center gap-1 text-xs text-gray-500 mb-3">
                <MapPin className="w-3 h-3" />{p.location}
              </div>
              <div className="text-xs text-gray-500 mb-4">
                <span className="font-semibold text-navy-700">{p.mutual}</span> mutual connections
              </div>
              <div className="flex gap-2">
                {connected ? (
                  <>
                    <button onClick={() => setMessageTarget(p)} className="btn-outline flex-1 text-sm py-1.5">
                      <MessageCircle className="w-3.5 h-3.5" /> {t.message}
                    </button>
                    <button onClick={() => toggleConnect(p.id, p.name)} className="btn-outline text-sm py-1.5" title={t.disconnect}>
                      <Check className="w-3.5 h-3.5" />
                    </button>
                  </>
                ) : pending ? (
                  <button onClick={() => toggleConnect(p.id, p.name)} className="btn-outline flex-1 text-sm py-1.5">
                    <Clock className="w-3.5 h-3.5" /> {t.pending}
                  </button>
                ) : (
                  <button onClick={() => toggleConnect(p.id, p.name)} className="btn-primary flex-1 text-sm py-1.5">
                    <UserPlus className="w-3.5 h-3.5" /> {t.connect}
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {filtered.length === 0 && (
        <div className="card p-12 text-center mt-6">
          <p className="text-gray-600">No alumni match your filters.</p>
          <button onClick={() => { setQuery(""); setYear("All Classes"); setIndustry("All Industries"); setLocation("All Locations"); }} className="btn-outline mt-4">
            Clear filters
          </button>
        </div>
      )}

      {/* Profile modal */}
      <Modal open={!!profileTarget} onClose={() => setProfileTarget(null)} maxWidth="max-w-xl">
        {profileTarget && (
          <div>
            <div className="flex items-start gap-5 mb-5">
              <img src={profileTarget.avatar} alt={profileTarget.name} className="w-24 h-24 rounded-full border-4 border-navy-100" />
              <div className="flex-1 pt-2">
                <h2 className="text-xl font-bold text-navy-900">{profileTarget.name}</h2>
                <p className="text-navy-700 font-medium">{profileTarget.role}</p>
                <p className="text-sm text-gray-600">{profileTarget.company}</p>
                <div className="flex flex-wrap gap-3 mt-3 text-xs text-gray-600">
                  <span className="flex items-center gap-1"><GraduationCap className="w-3.5 h-3.5" />{profileTarget.degree} · Class of {profileTarget.year}</span>
                  <span className="flex items-center gap-1"><MapPin className="w-3.5 h-3.5" />{profileTarget.location}</span>
                  <span className="flex items-center gap-1"><Briefcase className="w-3.5 h-3.5" />{profileTarget.industry}</span>
                </div>
              </div>
            </div>

            <div className="card p-4 bg-navy-50 mb-4">
              <div className="text-xs text-gray-600 mb-1">Mutual connections</div>
              <div className="text-2xl font-bold text-navy-900">{profileTarget.mutual}</div>
            </div>

            <div className="flex gap-2">
              {connections.includes(profileTarget.id) ? (
                <button onClick={() => { setMessageTarget(profileTarget); setProfileTarget(null); }} className="btn-primary flex-1">
                  <MessageCircle className="w-4 h-4" /> {t.message}
                </button>
              ) : pendingConnections.includes(profileTarget.id) ? (
                <button disabled className="btn-outline flex-1"><Clock className="w-4 h-4" />{t.pending}</button>
              ) : (
                <button onClick={() => toggleConnect(profileTarget.id, profileTarget.name)} className="btn-primary flex-1">
                  <UserPlus className="w-4 h-4" /> {t.connect}
                </button>
              )}
              <button onClick={() => setProfileTarget(null)} className="btn-outline">Close</button>
            </div>
          </div>
        )}
      </Modal>

      {/* Message modal */}
      <Modal open={!!messageTarget} onClose={() => setMessageTarget(null)} title={messageTarget ? `Message ${messageTarget.name}` : ""}>
        {messageTarget && (
          <form
            onSubmit={(e) => {
              e.preventDefault();
              showToast(`Message sent to ${messageTarget.name}`);
              setMessageTarget(null);
            }}
            className="space-y-4"
          >
            <div className="flex items-center gap-3 p-3 bg-navy-50 rounded-lg">
              <img src={messageTarget.avatar} alt="" className="w-10 h-10 rounded-full" />
              <div className="text-sm">
                <div className="font-semibold text-navy-900">{messageTarget.name}</div>
                <div className="text-xs text-gray-600">{messageTarget.role} · {messageTarget.company}</div>
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-navy-900 mb-1">Subject</label>
              <input required className="input bg-white border border-navy-100" placeholder="What is this about?" />
            </div>
            <div>
              <label className="block text-sm font-medium text-navy-900 mb-1">Message</label>
              <textarea required rows={5} className="input bg-white border border-navy-100" placeholder="Hi! I noticed we both graduated from Bamberg..." />
            </div>
            <div className="flex gap-2 justify-end pt-2">
              <button type="button" onClick={() => setMessageTarget(null)} className="btn-outline">Cancel</button>
              <button type="submit" className="btn-primary">Send Message</button>
            </div>
          </form>
        )}
      </Modal>
    </>
  );
}
