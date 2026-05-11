"use client";
import { useState } from "react";
import HeroHeader from "@/components/HeroHeader";
import { useApp } from "@/lib/AppState";
import { useTranslation } from "@/lib/i18n";
import { offers } from "@/lib/mock-data";
import { Tag, ExternalLink, Search } from "lucide-react";

export default function OffersPage() {
  const { prefs, showToast } = useApp();
  const t = useTranslation(prefs.language);
  const [filter, setFilter] = useState("All");
  const [search, setSearch] = useState("");

  const categories = ["All", ...Array.from(new Set(offers.map(o => o.category)))];

  const filteredOffers = offers.filter(o => {
    const matchesFilter = filter === "All" || o.category === filter;
    const matchesSearch = o.brand.toLowerCase().includes(search.toLowerCase()) || 
                          o.description.toLowerCase().includes(search.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  return (
    <div className="max-w-5xl mx-auto space-y-6 pb-12 animate-in fade-in">
      <HeroHeader 
        title={t.offers || "Store & Offers"}
        description={t.exclusiveDiscounts || "Exclusive discounts for our community"}
      />

      {/* Filters & Search */}
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
        <div className="flex flex-wrap gap-2">
          {categories.map(c => (
            <button
              key={c}
              onClick={() => setFilter(c)}
              className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors border ${
                filter === c 
                  ? "bg-navy-700 text-white border-navy-700" 
                  : "bg-white text-navy-700 border-navy-100 hover:bg-navy-50"
              }`}
            >
              {c === "All" ? t.all : c}
            </button>
          ))}
        </div>
        <div className="relative w-full sm:w-64 shrink-0">
          <Search className="absolute left-3 top-2.5 w-4 h-4 text-gray-500" />
          <input
            type="text"
            placeholder={t.searchBrands || "Search brands..."}
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="input pl-9"
          />
        </div>
      </div>

      <div className="text-sm text-gray-600">
        {t.showing} <span className="font-semibold text-navy-900">{filteredOffers.length}</span> {t.activeOffers || "active offers"}
      </div>

      {/* Grid */}
      {filteredOffers.length === 0 ? (
        <div className="text-center py-12 card text-gray-500">
          {t.noOffersMatch || "No offers match your filters."}
        </div>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredOffers.map(offer => (
            <div key={offer.id} className="card card-hover flex flex-col overflow-hidden">
              <div 
                className="h-32 flex items-center justify-center p-6 border-b border-navy-50"
                style={{ backgroundColor: '#ffffff' }} /* Force white background for brand logo compliance */
              >
                <img src={offer.logo} alt={offer.brand} className="max-h-full max-w-full object-contain" />
              </div>
              <div className="p-5 flex-1 flex flex-col">
                <div className="flex justify-between items-start mb-2 gap-2">
                  <h3 className="font-bold text-navy-900 text-lg leading-tight">{offer.brand}</h3>
                  <span className="chip-gold shrink-0">{offer.discount}</span>
                </div>
                <div className="text-xs text-gray-500 mb-3 uppercase tracking-wider font-semibold">{offer.category}</div>
                <p className="text-sm text-gray-700 mb-6 flex-1">
                  {offer.description}
                </p>
                <div className="pt-4 border-t border-navy-50 mt-auto flex items-center justify-between">
                  <div className="text-xs font-mono bg-navy-50 px-2 py-1.5 rounded text-navy-700 font-semibold border border-navy-100">
                    {offer.code}
                  </div>
                  <button onClick={() => window.open(offer.link, "_blank")} className="btn-outline text-sm py-1.5 px-3">
                    {t.redeem || "Redeem"} <ExternalLink className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
