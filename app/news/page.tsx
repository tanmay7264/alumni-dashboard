"use client";
import HeroHeader from "@/components/HeroHeader";
import Modal from "@/components/Modal";
import { news, NewsArticle } from "@/lib/mock-data";
import { useApp } from "@/lib/AppState";
import { useTranslation } from "@/lib/i18n";
import { Calendar, Clock, ArrowRight, Search, BookOpen } from "lucide-react";
import { useMemo, useState } from "react";

function fmtDate(d: string) {
  return new Date(d).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" });
}

const CATS = ["All", "University", "Alumni", "Research", "Partnership", "Events"];

export default function NewsPage() {
  const { readArticles, markRead, prefs } = useApp();
  const t = useTranslation(prefs.language);
  const [cat, setCat] = useState("All");
  const [query, setQuery] = useState("");
  const [reading, setReading] = useState<NewsArticle | null>(null);

  const filtered = useMemo(() => {
    return news.filter(n => {
      if (cat !== "All" && n.category !== cat) return false;
      if (query && !(n.title + n.excerpt + n.body).toLowerCase().includes(query.toLowerCase())) return false;
      return true;
    });
  }, [cat, query]);

  const [hero, ...rest] = filtered;

  function openArticle(n: NewsArticle) {
    setReading(n);
    markRead(n.id);
  }

  return (
    <>
      <HeroHeader
        eyebrow={t.newsUpdates}
        title="What's Happening at Bamberg"
        subtitle={`${news.length} stories · ${readArticles.length} ${t.readStatus.toLowerCase()}`}
      />

      <div className="card p-4 mb-6 flex flex-wrap items-center gap-3">
        <div className="relative flex-1 min-w-[240px]">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input value={query} onChange={e => setQuery(e.target.value)} placeholder="Search news..." className="input pl-9" />
        </div>
        <div className="flex flex-wrap gap-2">
          {CATS.map(c => (
            <button
              key={c}
              onClick={() => setCat(c)}
              className={c === cat
                ? "px-4 py-1.5 rounded-full bg-navy-700 text-white text-sm font-medium"
                : "px-4 py-1.5 rounded-full bg-white border border-navy-100 text-navy-700 text-sm font-medium hover:border-navy-300"}
            >
              {c}
            </button>
          ))}
        </div>
      </div>

      {hero && (
        <div onClick={() => openArticle(hero)} className="card card-hover overflow-hidden mb-8 grid md:grid-cols-2 cursor-pointer">
          <div className="relative h-72 md:h-auto">
            <img src={hero.image} alt={hero.title} className="absolute inset-0 w-full h-full object-cover" />
            {readArticles.includes(hero.id) && <span className="absolute top-3 right-3 chip-green">{t.readStatus}</span>}
          </div>
          <div className="p-8 flex flex-col justify-center">
            <span className="chip-gold w-fit mb-3">{hero.category}</span>
            <h2 className="text-2xl font-bold text-navy-900 mb-3">{hero.title}</h2>
            <p className="text-gray-600 mb-5">{hero.excerpt}</p>
            <div className="flex items-center gap-4 text-xs text-gray-500 mb-5">
              <span className="flex items-center gap-1"><Calendar className="w-3.5 h-3.5" />{fmtDate(hero.date)}</span>
              <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" />{hero.readTime} {t.minRead}</span>
              <span>{hero.author}</span>
            </div>
            <button className="btn-primary w-fit">Read article <ArrowRight className="w-4 h-4" /></button>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {rest.map(n => (
          <article key={n.id} onClick={() => openArticle(n)} className="card card-hover overflow-hidden flex flex-col cursor-pointer">
            <div className="relative h-44">
              <img src={n.image} alt={n.title} className="absolute inset-0 w-full h-full object-cover" />
              <span className="absolute top-3 left-3 chip bg-white/95 text-navy-700">{n.category}</span>
              {readArticles.includes(n.id) && <span className="absolute top-3 right-3 chip-green">{t.readStatus}</span>}
            </div>
            <div className="p-5 flex-1 flex flex-col">
              <h3 className="font-bold text-navy-900 mb-2 line-clamp-2">{n.title}</h3>
              <p className="text-sm text-gray-600 line-clamp-3 mb-4 flex-1">{n.excerpt}</p>
              <div className="flex items-center justify-between text-xs text-gray-500 pt-3 border-t border-navy-50">
                <span>{fmtDate(n.date)}</span>
                <span className="flex items-center gap-1"><Clock className="w-3 h-3" />{n.readTime} {t.minRead.split(' ')[0]}</span>
              </div>
            </div>
          </article>
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="card p-12 text-center">
          <p className="text-gray-600">No stories match your filters.</p>
        </div>
      )}

      {/* Article reader modal */}
      <Modal open={!!reading} onClose={() => setReading(null)} maxWidth="max-w-3xl">
        {reading && (
          <article>
            <div className="relative h-64 -mx-6 -mt-6 mb-6">
              <img src={reading.image} alt={reading.title} className="absolute inset-0 w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              <div className="absolute bottom-4 left-6 right-6">
                <span className="chip-gold mb-2">{reading.category}</span>
                <h1 className="text-2xl font-bold text-white mt-2">{reading.title}</h1>
              </div>
            </div>
            <div className="flex items-center gap-4 text-xs text-gray-500 mb-6 pb-4 border-b border-navy-50">
              <span className="flex items-center gap-1"><Calendar className="w-3.5 h-3.5" />{fmtDate(reading.date)}</span>
              <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" />{reading.readTime} {t.minRead}</span>
              <span className="flex items-center gap-1"><BookOpen className="w-3.5 h-3.5" />By {reading.author}</span>
            </div>
            <p className="text-base text-gray-700 leading-relaxed mb-4 font-medium">{reading.excerpt}</p>
            <p className="text-base text-gray-700 leading-relaxed">{reading.body}</p>
            <div className="flex gap-2 justify-end pt-6 mt-6 border-t border-navy-50">
              <button onClick={() => setReading(null)} className="btn-outline">Close</button>
            </div>
          </article>
        )}
      </Modal>
    </>
  );
}
