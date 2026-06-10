import { ExternalLink, Trash2, PlayCircle, Briefcase, FileText, Globe } from 'lucide-react';

const CATEGORY_STYLES = {
  youtube: {
    bg: 'bg-white',
    border: 'border-rose-200',
    badge: 'bg-rose-100 text-rose-700',
    icon: <PlayCircle size={12} />,
    label: 'YouTube'
  },
  linkedin: {
    bg: 'bg-white',
    border: 'border-blue-200',
    badge: 'bg-blue-100 text-blue-700',
    icon: <Briefcase size={12} />,
    label: 'LinkedIn'
  },
  article: {
    bg: 'bg-white',
    border: 'border-emerald-200',
    badge: 'bg-emerald-100 text-emerald-700',
    icon: <FileText size={12} />,
    label: 'Article'
  },
  other: {
    bg: 'bg-white',
    border: 'border-purple-200',
    badge: 'bg-purple-100 text-purple-700',
    icon: <Globe size={12} />,
    label: 'Other'
  }
};

export default function CapsuleCard({ capsule, onDelete }) {
  const style = CATEGORY_STYLES[capsule.category] || CATEGORY_STYLES.other;

  return (
    <div className={`rounded-xl border ${style.border} ${style.bg} overflow-hidden shadow-sm hover:shadow-md transition-shadow flex flex-col`}>
      {capsule.thumbnail && (
        <img
          src={capsule.thumbnail}
          alt=""
          className="w-full h-36 object-cover"
          onError={(e) => { e.target.style.display = 'none'; }}
        />
      )}
      <div className="p-4 flex flex-col flex-1">
        <div className="flex items-start justify-between gap-2 mb-2">
          <span className={`inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full shrink-0 ${style.badge}`}>
            {style.icon} {style.label}
          </span>
          <button
            onClick={() => onDelete(capsule.id)}
            className="text-slate-300 hover:text-red-500 transition-colors p-0.5 shrink-0 mt-0.5"
            aria-label="Delete capsule"
          >
            <Trash2 size={14} />
          </button>
        </div>

        <h3 className="font-bold text-slate-800 text-sm leading-snug mb-1.5 line-clamp-2">
          {capsule.title}
        </h3>

        <p className="text-slate-500 text-xs leading-relaxed mb-3 line-clamp-3 flex-1">
          {capsule.summary}
        </p>

        <a
          href={capsule.url}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 text-xs font-medium text-slate-400 hover:text-indigo-600 transition-colors mt-auto"
        >
          <ExternalLink size={11} />
          <span className="truncate max-w-[180px]">{capsule.domain}</span>
        </a>
      </div>
    </div>
  );
}
