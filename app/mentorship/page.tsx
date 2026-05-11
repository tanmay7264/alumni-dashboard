"use client";
import HeroHeader from "@/components/HeroHeader";
import Modal from "@/components/Modal";
import { mentors, Mentor } from "@/lib/mock-data";
import { useApp } from "@/lib/AppState";
import { useTranslation } from "@/lib/i18n";
import { Star, Users, Award, MessageCircle, HandHeart, Check, Clock } from "lucide-react";
import { useMemo, useState } from "react";

const EXPERTISE = ["All Expertise", "Product Management", "Engineering", "Consulting", "Public Sector", "Entrepreneurship", "Research", "Career Switching", "Interview Prep"];

const TIMES = ["Mon 14:00", "Tue 10:00", "Wed 16:00", "Thu 18:30", "Fri 11:00"];

export default function MentorshipPage() {
  const { mentorRequests, requestMentor, showToast, prefs } = useApp();
  const t = useTranslation(prefs.language);
  const [exp, setExp] = useState("All Expertise");
  const [bookMentor, setBookMentor] = useState<Mentor | null>(null);
  const [slot, setSlot] = useState(TIMES[0]);
  const [becomeOpen, setBecomeOpen] = useState(false);

  const filtered = useMemo(() => {
    if (exp === "All Expertise") return mentors;
    return mentors.filter(m => m.expertise.some(e => e.toLowerCase().includes(exp.toLowerCase().split(" ")[0])));
  }, [exp]);

  return (
    <>
      <HeroHeader
        eyebrow="Mentorship"
        title="Give and Receive Guidance"
        subtitle={`${mentors.length} mentors available · ${mentorRequests.length} of your requests pending`}
        action={<button onClick={() => setBecomeOpen(true)} className="btn-gold"><HandHeart className="w-4 h-4" /> Become a Mentor</button>}
      />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <div className="card p-5">
          <div className="w-10 h-10 rounded-lg bg-navy-50 text-navy-700 flex items-center justify-center mb-3"><Users className="w-5 h-5" /></div>
          <div className="text-2xl font-bold text-navy-900">487</div>
          <div className="text-sm text-gray-600">Active mentors</div>
        </div>
        <div className="card p-5">
          <div className="w-10 h-10 rounded-lg bg-navy-50 text-navy-700 flex items-center justify-center mb-3"><HandHeart className="w-5 h-5" /></div>
          <div className="text-2xl font-bold text-navy-900">{1243 + mentorRequests.length}</div>
          <div className="text-sm text-gray-600">Mentorship sessions this year</div>
        </div>
        <div className="card p-5 bg-gradient-to-br from-navy-50 to-white">
          <div className="w-10 h-10 rounded-lg bg-gold-500 text-navy-900 flex items-center justify-center mb-3"><Award className="w-5 h-5" /></div>
          <div className="text-2xl font-bold text-navy-900">My Status</div>
          <div className="text-sm text-gray-600">Mentee — {mentorRequests.length + 2} active mentorships</div>
        </div>
      </div>

      <h2 className="text-xl font-bold text-navy-900 mb-2">{t.findAMentor}</h2>
      <p className="text-sm text-gray-600 mb-6">Sessions are 30 minutes, free, scheduled at the mentor&apos;s availability.</p>

      <div className="flex flex-wrap gap-2 mb-6">
        {EXPERTISE.map(c => (
          <button
            key={c}
            onClick={() => setExp(c)}
            className={c === exp
              ? "px-4 py-1.5 rounded-full bg-navy-700 text-white text-sm font-medium"
              : "px-4 py-1.5 rounded-full bg-white border border-navy-100 text-navy-700 text-sm font-medium hover:border-navy-300"}
          >
            {c}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {filtered.map(m => {
          const isFull = m.availability.startsWith("Full");
          const requested = mentorRequests.includes(m.id);
          return (
            <div key={m.id} className="card card-hover p-6">
              <div className="flex items-start gap-4 mb-3">
                <img src={m.avatar} alt={m.name} className="w-16 h-16 rounded-full border-2 border-navy-100" />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="font-bold text-navy-900">{m.name}</h3>
                    <span className="text-xs text-gray-500">'{String(m.year).slice(2)}</span>
                  </div>
                  <p className="text-sm text-navy-700 font-medium">{m.role}</p>
                  <p className="text-xs text-gray-600">{m.company}</p>
                  <div className="flex items-center gap-3 text-xs text-gray-500 mt-1">
                    <span className="flex items-center gap-1"><Star className="w-3 h-3 fill-gold-500 text-gold-500" />{m.rating}</span>
                    <span>{m.mentees} mentees</span>
                  </div>
                </div>
              </div>

              <p className="text-sm text-gray-700 mb-3 italic">"{m.bio}"</p>

              <div className="flex flex-wrap gap-1.5 mb-4">
                {m.expertise.map(e => <span key={e} className="chip">{e}</span>)}
              </div>

              <div className="flex items-center justify-between pt-3 border-t border-navy-50">
                <span className={isFull ? "text-xs text-gray-400" : "text-xs text-navy-700 font-medium"}>{m.availability}</span>
                <div className="flex gap-2">
                  <button onClick={() => showToast(`Direct message to ${m.name} opened`)} className="btn-outline text-sm py-1.5">
                    <MessageCircle className="w-3.5 h-3.5" /> Message
                  </button>
                  {requested ? (
                    <button disabled className="btn-success text-sm py-1.5">
                      <Check className="w-3.5 h-3.5" /> {t.requested}
                    </button>
                  ) : isFull ? (
                    <button disabled className="btn-outline opacity-50 text-sm py-1.5">
                      <Clock className="w-3.5 h-3.5" /> Full
                    </button>
                  ) : (
                    <button onClick={() => setBookMentor(m)} className="btn-primary text-sm py-1.5">
                      {t.requestSession}
                    </button>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Book session modal */}
      <Modal open={!!bookMentor} onClose={() => setBookMentor(null)} title={bookMentor ? `Request session with ${bookMentor.name}` : ""}>
        {bookMentor && (
          <form
            onSubmit={(e) => {
              e.preventDefault();
              requestMentor(bookMentor.id, bookMentor.name);
              setBookMentor(null);
            }}
            className="space-y-5"
          >
            <div className="flex items-center gap-3 p-3 bg-navy-50 rounded-lg">
              <img src={bookMentor.avatar} className="w-12 h-12 rounded-full" alt="" />
              <div className="text-sm">
                <div className="font-bold text-navy-900">{bookMentor.name}</div>
                <div className="text-xs text-gray-600">{bookMentor.role} · {bookMentor.company}</div>
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-navy-900 mb-2">What would you like to discuss?</label>
              <select className="select w-full bg-white border border-navy-100">
                {bookMentor.expertise.map(e => <option key={e}>{e}</option>)}
                <option>Other (I&apos;ll specify below)</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-semibold text-navy-900 mb-2">Pick a time slot (30 min, this week)</label>
              <div className="grid grid-cols-3 gap-2">
                {TIMES.map(t => (
                  <button
                    type="button"
                    key={t}
                    onClick={() => setSlot(t)}
                    className={t === slot
                      ? "px-3 py-2 rounded-lg bg-navy-700 text-white text-sm font-medium"
                      : "px-3 py-2 rounded-lg bg-white border border-navy-100 text-navy-700 text-sm font-medium hover:border-navy-300"}
                  >
                    {t}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-navy-900 mb-2">Goals for this session</label>
              <textarea rows={3} className="input bg-white border border-navy-100" placeholder="e.g. Get feedback on transitioning into PM..." />
            </div>

            <div className="flex gap-2 justify-end pt-2">
              <button type="button" onClick={() => setBookMentor(null)} className="btn-outline">Cancel</button>
              <button type="submit" className="btn-primary">Send Request</button>
            </div>
          </form>
        )}
      </Modal>

      {/* Become a mentor modal */}
      <Modal open={becomeOpen} onClose={() => setBecomeOpen(false)} title="Become a Mentor">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            setBecomeOpen(false);
            showToast("✓ Mentor application submitted — alumni office will follow up");
          }}
          className="space-y-4"
        >
          <p className="text-sm text-gray-600">Pay it forward — share your experience with current students and recent grads.</p>
          <div>
            <label className="block text-sm font-medium text-navy-900 mb-1">Your expertise areas (select all)</label>
            <div className="flex flex-wrap gap-2">
              {EXPERTISE.slice(1).map(e => (
                <label key={e} className="flex items-center gap-1.5 px-3 py-1.5 border border-navy-100 rounded-full cursor-pointer text-sm hover:bg-navy-50">
                  <input type="checkbox" className="accent-navy-700" />
                  {e}
                </label>
              ))}
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-navy-900 mb-1">Availability</label>
            <select className="select w-full bg-white border border-navy-100">
              <option>1 slot / month</option>
              <option>2 slots / month</option>
              <option>3 slots / month</option>
              <option>Weekly</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-navy-900 mb-1">Short bio (will be visible to mentees)</label>
            <textarea rows={3} className="input bg-white border border-navy-100" placeholder="Tell mentees who you are and what you can help with..." />
          </div>
          <div className="flex gap-2 justify-end pt-2">
            <button type="button" onClick={() => setBecomeOpen(false)} className="btn-outline">Cancel</button>
            <button type="submit" className="btn-primary">Submit Application</button>
          </div>
        </form>
      </Modal>
    </>
  );
}
