"use client";
import HeroHeader from "@/components/HeroHeader";
import Modal from "@/components/Modal";
import { givingCampaigns, givingHistory, user, Campaign } from "@/lib/mock-data";
import { useApp } from "@/lib/AppState";
import { useTranslation } from "@/lib/i18n";
import { Heart, TrendingUp, Calendar, Award, Download } from "lucide-react";
import { useState } from "react";

function fmtEur(n: number) {
  return "€" + n.toLocaleString("de-DE");
}

const PRESETS = [25, 50, 100, 250, 500, 1000];

export default function GivingPage() {
  const { campaignBoost, donations, totalGivenBoost, donate, showToast, prefs } = useApp();
  const t = useTranslation(prefs.language);
  const [donateTarget, setDonateTarget] = useState<Campaign | null>(null);
  const [amount, setAmount] = useState<number>(100);
  const [customAmount, setCustomAmount] = useState("");

  const allHistory = [...donations, ...givingHistory].sort((a, b) => b.date.localeCompare(a.date));
  const totalThisYear = allHistory
    .filter(g => g.date.startsWith("2026") || g.date.startsWith("2025-12"))
    .reduce((s, g) => s + g.amount, 0);

  function handleDonate(e: React.FormEvent) {
    e.preventDefault();
    if (!donateTarget) return;
    const finalAmount = customAmount ? parseInt(customAmount) : amount;
    if (!finalAmount || finalAmount < 1) {
      showToast("Enter a valid amount", "error");
      return;
    }
    donate(donateTarget.id, donateTarget.title, finalAmount);
    setDonateTarget(null);
    setCustomAmount("");
    setAmount(100);
  }

  return (
    <>
      <HeroHeader
        eyebrow="Giving Back"
        title="Support the Next Generation"
        subtitle="Your gifts have funded 312 scholarships and 14 research initiatives in the last 12 months."
        action={<button onClick={() => setDonateTarget(givingCampaigns[0])} className="btn-gold"><Heart className="w-4 h-4" /> Give Now</button>}
      />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <div className="card p-5">
          <div className="text-xs uppercase tracking-wider text-gray-500 font-semibold mb-1">Lifetime Giving</div>
          <div className="text-2xl font-bold text-navy-900">{fmtEur(user.totalGiven + totalGivenBoost)}</div>
          <div className="text-xs text-navy-600 mt-1 flex items-center gap-1">
            <Award className="w-3 h-3" /> Silver Donor recognition
          </div>
        </div>
        <div className="card p-5">
          <div className="text-xs uppercase tracking-wider text-gray-500 font-semibold mb-1">This Year</div>
          <div className="text-2xl font-bold text-navy-900">{fmtEur(totalThisYear)}</div>
          <div className="text-xs text-navy-600 mt-1 flex items-center gap-1">
            <TrendingUp className="w-3 h-3" /> {donations.length + 1} campaigns supported
          </div>
        </div>
        <div className="card p-5 bg-gradient-to-br from-gold-100 to-gold-200 border-gold-300">
          <div className="text-xs uppercase tracking-wider text-navy-700 font-semibold mb-1">{t.classOf} {user.classYear} {t.goal}</div>
          <div className="text-2xl font-bold text-navy-900">{fmtEur(38400 + totalGivenBoost)} / €50,000</div>
          <div className="h-1.5 bg-white/60 rounded-full overflow-hidden mt-2">
            <div className="h-full bg-navy-700 rounded-full transition-all" style={{ width: `${Math.min(100, ((38400 + totalGivenBoost) / 50000) * 100)}%` }} />
          </div>
          <div className="text-xs text-navy-800 mt-1">{Math.round(((38400 + totalGivenBoost) / 50000) * 100)}% — 47 days remaining</div>
        </div>
      </div>

      <h2 className="text-xl font-bold text-navy-900 mb-4">Active Campaigns</h2>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 mb-10">
        {givingCampaigns.map(c => {
          const boost = campaignBoost[c.id] || 0;
          const raised = c.raised + boost;
          const pct = Math.min(100, Math.round((raised / c.goal) * 100));
          return (
            <div key={c.id} className="card card-hover p-6 flex flex-col">
              <span className="chip mb-2 w-fit">{c.category}</span>
              <h3 className="font-bold text-navy-900 mb-2">{c.title}</h3>
              <p className="text-sm text-gray-600 mb-4 flex-1">{c.description}</p>
              <div className="flex items-baseline justify-between mb-1">
                <span className="text-lg font-bold text-navy-900">{fmtEur(raised)}</span>
                <span className="text-xs text-gray-500">of {fmtEur(c.goal)}</span>
              </div>
              <div className="h-2 bg-navy-50 rounded-full overflow-hidden mb-3">
                <div className="h-full bg-gradient-to-r from-navy-700 to-navy-500 rounded-full transition-all" style={{ width: `${pct}%` }} />
              </div>
              <div className="flex items-center justify-between text-xs text-gray-600 mb-4">
                <span>{c.donors + (boost > 0 ? 1 : 0)} {t.donors.toLowerCase()}</span>
                <span>{c.daysLeft} days left</span>
              </div>
              <button onClick={() => setDonateTarget(c)} className="btn-primary text-sm">
                <Heart className="w-3.5 h-3.5" /> Contribute
              </button>
            </div>
          );
        })}
      </div>

      <h2 className="text-xl font-bold text-navy-900 mb-4">My Giving History</h2>
      <div className="card overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-navy-50 text-navy-900">
            <tr>
              <th className="text-left px-6 py-3 font-semibold">Date</th>
              <th className="text-left px-6 py-3 font-semibold">Campaign</th>
              <th className="text-right px-6 py-3 font-semibold">Amount</th>
              <th className="text-right px-6 py-3 font-semibold">Receipt</th>
            </tr>
          </thead>
          <tbody>
            {allHistory.map((g, i) => (
              <tr key={g.id} className={i % 2 ? "bg-white" : "bg-navy-50/30"}>
                <td className="px-6 py-3 text-gray-700"><span className="inline-flex items-center gap-2"><Calendar className="w-3.5 h-3.5 text-gray-400" />{g.date}</span></td>
                <td className="px-6 py-3 font-medium text-navy-900">{g.campaign}</td>
                <td className="px-6 py-3 text-right font-semibold text-navy-900">{fmtEur(g.amount)}</td>
                <td className="px-6 py-3 text-right">
                  <button onClick={() => showToast(`Receipt PDF for ${g.campaign} sent to your email`)} className="text-navy-700 hover:text-navy-600 text-xs font-medium inline-flex items-center gap-1">
                    <Download className="w-3 h-3" /> PDF
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Donate modal */}
      <Modal open={!!donateTarget} onClose={() => { setDonateTarget(null); setCustomAmount(""); }} title="Make a Donation" maxWidth="max-w-xl">
        {donateTarget && (
          <form onSubmit={handleDonate} className="space-y-5">
            <div className="p-4 bg-navy-50 rounded-lg">
              <span className="chip mb-2 w-fit">{donateTarget.category}</span>
              <h3 className="font-bold text-navy-900 mt-1">{donateTarget.title}</h3>
              <p className="text-sm text-gray-600 mt-1">{donateTarget.description}</p>
            </div>

            <div>
              <label className="block text-sm font-semibold text-navy-900 mb-2">Choose an amount</label>
              <div className="grid grid-cols-3 gap-2 mb-3">
                {PRESETS.map(p => (
                  <button
                    type="button"
                    key={p}
                    onClick={() => { setAmount(p); setCustomAmount(""); }}
                    className={amount === p && !customAmount
                      ? "px-4 py-3 rounded-lg bg-navy-700 text-white font-semibold"
                      : "px-4 py-3 rounded-lg bg-white border border-navy-100 text-navy-700 hover:border-navy-300 font-semibold"}
                  >
                    €{p}
                  </button>
                ))}
              </div>
              <input
                type="number"
                min="1"
                value={customAmount}
                onChange={e => setCustomAmount(e.target.value)}
                placeholder="Or enter custom amount (€)"
                className="input bg-white border border-navy-100"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-navy-900 mb-2">Payment method</label>
              <div className="space-y-2">
                {["SEPA Direct Debit", "Credit / Debit Card", "PayPal"].map((m, i) => (
                  <label key={m} className="flex items-center gap-3 p-3 border border-navy-100 rounded-lg cursor-pointer hover:bg-navy-50">
                    <input type="radio" name="pay" defaultChecked={i === 0} className="accent-navy-700" />
                    <span className="text-sm font-medium text-navy-900">{m}</span>
                  </label>
                ))}
              </div>
            </div>

            <label className="flex items-start gap-2 text-sm text-gray-600">
              <input type="checkbox" defaultChecked className="accent-navy-700 mt-0.5" />
              Send me a tax-deductible receipt at {user.email}
            </label>

            <div className="flex gap-2 justify-end pt-2 border-t border-navy-50">
              <button type="button" onClick={() => { setDonateTarget(null); setCustomAmount(""); }} className="btn-outline">Cancel</button>
              <button type="submit" className="btn-primary">
                <Heart className="w-4 h-4" /> Donate €{customAmount || amount}
              </button>
            </div>
          </form>
        )}
      </Modal>
    </>
  );
}
