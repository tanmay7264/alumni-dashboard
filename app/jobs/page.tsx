"use client";
import HeroHeader from "@/components/HeroHeader";
import Modal from "@/components/Modal";
import { jobs, Job } from "@/lib/mock-data";
import { useApp } from "@/lib/AppState";
import { useTranslation } from "@/lib/i18n";
import { MapPin, Briefcase, Euro, Plus, Clock, Search, Bookmark, BookmarkCheck, Check, Users } from "lucide-react";
import { useMemo, useState } from "react";

const TYPES = ["Full-time", "Part-time", "Internship", "Contract"];
const LOCATIONS = ["Bamberg", "Munich", "Berlin", "Frankfurt", "Remote"];

export default function JobsPage() {
  const { savedJobs, appliedJobs, toggleSave, applyJob, showToast, prefs } = useApp();
  const t = useTranslation(prefs.language);
  const [query, setQuery] = useState("");
  const [typeFilter, setTypeFilter] = useState<Set<string>>(new Set());
  const [locationFilter, setLocationFilter] = useState<Set<string>>(new Set());
  const [referralOnly, setReferralOnly] = useState(false);
  const [savedOnly, setSavedOnly] = useState(false);
  const [postOpen, setPostOpen] = useState(false);
  const [applyTarget, setApplyTarget] = useState<Job | null>(null);

  const filtered = useMemo(() => {
    return jobs.filter(j => {
      if (query && !(j.title + j.company + j.description + j.tags.join(" ")).toLowerCase().includes(query.toLowerCase())) return false;
      if (typeFilter.size && !typeFilter.has(j.type)) return false;
      if (locationFilter.size && !Array.from(locationFilter).some(loc => j.location.includes(loc))) return false;
      if (referralOnly && !j.referralOffered) return false;
      if (savedOnly && !savedJobs.includes(j.id)) return false;
      return true;
    });
  }, [query, typeFilter, locationFilter, referralOnly, savedOnly, savedJobs]);

  const toggle = (set: Set<string>, setter: (s: Set<string>) => void, val: string) => {
    const next = new Set(set);
    if (next.has(val)) next.delete(val); else next.add(val);
    setter(next);
  };

  return (
    <>
      <HeroHeader
        eyebrow={t.career}
        title={t.jobBoard}
        subtitle={`${jobs.length} ${t.activeOpenings}`}
        action={<button onClick={() => setPostOpen(true)} className="btn-gold"><Briefcase className="w-4 h-4 mr-2" /> {t.postJob}</button>}
      />

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_280px] gap-6">
        <div>
          <div className="card p-4 mb-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                value={query}
                onChange={e => setQuery(e.target.value)}
                placeholder={t.searchJobs}
                className="input pl-9"
              />
            </div>
          </div>

          <div className="flex items-center justify-between mt-4 mb-4 text-sm text-gray-500">
            <div>{t.showing} {filtered.length} {t.of} {jobs.length} {t.jobsStr}</div>
            <div className="flex gap-4">
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" checked={referralOnly} onChange={e => setReferralOnly(e.target.checked)} className="rounded border-gray-300 text-navy-600 focus:ring-navy-600" />
                {t.referralOnly}
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" checked={savedOnly} onChange={e => setSavedOnly(e.target.checked)} className="rounded border-gray-300 text-navy-600 focus:ring-navy-600" />
                {t.savedOnly}
              </label>
            </div>
          </div>

          <div className="space-y-4">
            {filtered.map(j => {
              const saved = savedJobs.includes(j.id);
              const applied = appliedJobs.includes(j.id);
              return (
                <div key={j.id} className="card card-hover p-5">
                  <div className="flex items-start gap-4">
                    <div className="shrink-0 w-14 h-14 rounded-xl bg-navy-50 text-navy-700 flex items-center justify-center font-bold text-xl">
                      {j.company.charAt(0)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-3 flex-wrap mb-1">
                        <h3 className="font-bold text-navy-900 text-lg">{j.title}</h3>
                        <div className="flex gap-1.5">
                          {j.referralOffered && <span className="chip-gold"><Users className="w-3 h-3 mr-1 inline" /> {t.referralOffered}</span>}
                          {applied && <span className="chip-green">{t.applied}</span>}
                        </div>
                      </div>
                      <div className="text-sm text-navy-700 font-medium mb-3">{j.company}</div>
                      <div className="flex flex-wrap gap-x-5 gap-y-1 text-xs text-gray-600 mb-3">
                        <span className="flex items-center gap-1.5"><MapPin className="w-3.5 h-3.5" />{j.location}</span>
                        <span className="flex items-center gap-1.5"><Briefcase className="w-3.5 h-3.5" />{j.type}</span>
                        <span className="flex items-center gap-1.5"><Euro className="w-3.5 h-3.5" />{j.salary}</span>
                        <span className="flex items-center gap-1.5"><Clock className="w-3.5 h-3.5" />{j.postedDays}d ago</span>
                        <span>{j.applicants} {t.applicants.toLowerCase()}</span>
                      </div>
                      <p className="text-sm text-gray-700 mb-4">{j.description}</p>
                      <div className="flex flex-wrap gap-1.5 mb-4">
                        {j.tags.map(t => <span key={t} className="chip">{t}</span>)}
                      </div>
                      <div className="flex items-center justify-between flex-wrap gap-3 pt-3 border-t border-navy-50">
                        <div className="text-xs text-gray-600">
                          {t.postedBy} <span className="font-semibold text-navy-700">{j.postedBy}</span>
                        </div>
                        <div className="flex gap-2">
                          <button
                            onClick={() => toggleSave(j.id, j.title)}
                            className={saved ? "btn-success text-sm py-1.5" : "btn-outline text-sm py-1.5"}
                          >
                            {saved ? <BookmarkCheck className="w-3.5 h-3.5" /> : <Bookmark className="w-3.5 h-3.5" />}
                            {saved ? t.saved : t.save}
                          </button>
                          {applied ? (
                            <button disabled className="btn-success text-sm py-1.5">
                              <Check className="w-3.5 h-3.5" /> {t.applied}
                            </button>
                          ) : (
                            <button onClick={() => setApplyTarget(j)} className="btn-primary text-sm py-1.5">{t.apply}</button>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}

            {filtered.length === 0 && (
              <div className="text-center py-12 bg-white rounded-xl border border-dashed border-gray-200">
                <p className="text-gray-500 mb-4">{t.noJobsMatch}</p>
                <button onClick={() => { setTypeFilter(new Set()); setLocationFilter(new Set()); setReferralOnly(false); setSavedOnly(false); setQuery(""); }} className="btn-outline">
                  {t.clearAll}
                </button>
              </div>
            )}
          </div>
        </div>

        <aside className="space-y-4">
          <div className="card p-5 sticky top-24">
            <h3 className="font-bold text-navy-900 mb-4">{t.filters}</h3>

            <div className="mb-4">
              <div className="text-xs font-semibold uppercase tracking-wider text-gray-500 mb-2">{t.jobType}</div>
              {TYPES.map(tLabel => (
                <label key={tLabel} className="flex items-center gap-2 py-1 text-sm cursor-pointer">
                  <input
                    type="checkbox"
                    checked={typeFilter.has(tLabel)}
                    onChange={() => toggle(typeFilter, setTypeFilter, tLabel)}
                    className="accent-navy-700"
                  />
                  {tLabel}
                </label>
              ))}
            </div>

            <div className="mb-4">
              <div className="text-xs font-semibold uppercase tracking-wider text-gray-500 mb-2">{t.location}</div>
              {LOCATIONS.map(tLabel => (
                <label key={tLabel} className="flex items-center gap-2 py-1 text-sm cursor-pointer">
                  <input
                    type="checkbox"
                    checked={locationFilter.has(tLabel)}
                    onChange={() => toggle(locationFilter, setLocationFilter, tLabel)}
                    className="accent-navy-700"
                  />
                  {tLabel}
                </label>
              ))}
            </div>

            <button
              onClick={() => { setTypeFilter(new Set()); setLocationFilter(new Set()); setReferralOnly(false); setSavedOnly(false); setQuery(""); }}
              className="btn-outline w-full text-sm"
            >
              {t.clearAll}
            </button>
          </div>
        </aside>
      </div>

      {/* Post Job modal */}
      <Modal open={postOpen} onClose={() => setPostOpen(false)} title="Post a Job">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            setPostOpen(false);
            showToast("✓ Job posted — visible to alumni network within an hour");
          }}
          className="space-y-4"
        >
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-sm font-medium text-navy-900 mb-1">Job Title</label>
              <input required className="input bg-white border border-navy-100" placeholder="e.g. Senior Engineer" />
            </div>
            <div>
              <label className="block text-sm font-medium text-navy-900 mb-1">Company</label>
              <input required className="input bg-white border border-navy-100" />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-sm font-medium text-navy-900 mb-1">Location</label>
              <input required className="input bg-white border border-navy-100" placeholder="City, Country" />
            </div>
            <div>
              <label className="block text-sm font-medium text-navy-900 mb-1">Type</label>
              <select required className="select w-full bg-white border border-navy-100">
                {TYPES.map(t => <option key={t}>{t}</option>)}
              </select>
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-navy-900 mb-1">Salary Range</label>
            <input className="input bg-white border border-navy-100" placeholder="e.g. €70,000 — €90,000" />
          </div>
          <div>
            <label className="block text-sm font-medium text-navy-900 mb-1">Description</label>
            <textarea required rows={4} className="input bg-white border border-navy-100" />
          </div>
          <label className="flex items-center gap-2 text-sm">
            <input type="checkbox" className="accent-navy-700" defaultChecked />
            I can offer a referral to alumni applicants
          </label>
          <div className="flex gap-2 justify-end pt-2">
            <button type="button" onClick={() => setPostOpen(false)} className="btn-outline">Cancel</button>
            <button type="submit" className="btn-primary">Post Job</button>
          </div>
        </form>
      </Modal>

      {/* Apply modal */}
      <Modal open={!!applyTarget} onClose={() => setApplyTarget(null)} title={applyTarget ? `Apply: ${applyTarget.title}` : ""}>
        {applyTarget && (
          <form
            onSubmit={(e) => {
              e.preventDefault();
              applyJob(applyTarget.id, applyTarget.title);
              setApplyTarget(null);
            }}
            className="space-y-4"
          >
            <div className="p-3 bg-navy-50 rounded-lg text-sm">
              <div className="font-semibold text-navy-900">{applyTarget.company} · {applyTarget.location}</div>
              <div className="text-xs text-gray-600 mt-0.5">Posted by {applyTarget.postedBy}</div>
              {applyTarget.referralOffered && <div className="chip-gold mt-2">★ Referral will be offered to your application</div>}
            </div>
            <div>
              <label className="block text-sm font-medium text-navy-900 mb-1">CV / Resume</label>
              <div className="border border-dashed border-navy-200 rounded-lg p-4 text-center text-sm text-gray-600 bg-navy-50/40">
                <input type="file" className="hidden" id="cv-upload" />
                <label htmlFor="cv-upload" className="cursor-pointer text-navy-700 font-medium">Upload PDF</label>
                <div className="text-xs text-gray-500 mt-1">or use Sarah_Mueller_CV.pdf from your profile</div>
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-navy-900 mb-1">Cover note (optional)</label>
              <textarea rows={4} className="input bg-white border border-navy-100" placeholder="Why are you interested in this role?" />
            </div>
            <div className="flex gap-2 justify-end pt-2">
              <button type="button" onClick={() => setApplyTarget(null)} className="btn-outline">Cancel</button>
              <button type="submit" className="btn-primary">Submit Application</button>
            </div>
          </form>
        )}
      </Modal>
    </>
  );
}
