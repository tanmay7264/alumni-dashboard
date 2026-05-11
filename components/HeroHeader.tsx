type Props = {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  action?: React.ReactNode;
};

export default function HeroHeader({ eyebrow, title, subtitle, action }: Props) {
  return (
    <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-navy-800 via-navy-700 to-navy-600 text-white px-8 py-10 mb-8 shadow-card">
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <svg viewBox="0 0 800 200" className="w-full h-full">
          <circle cx="700" cy="50" r="80" fill="#ffd300" />
          <circle cx="100" cy="180" r="120" fill="#ffd300" />
        </svg>
      </div>
      <div className="relative flex items-end justify-between gap-6 flex-wrap">
        <div>
          {eyebrow && (
            <div className="text-xs font-semibold uppercase tracking-wider text-gold-300 mb-2">
              {eyebrow}
            </div>
          )}
          <h1 className="text-3xl font-bold tracking-tight">{title}</h1>
          {subtitle && <p className="text-navy-100 mt-2 max-w-2xl">{subtitle}</p>}
        </div>
        {action && <div>{action}</div>}
      </div>
    </div>
  );
}
