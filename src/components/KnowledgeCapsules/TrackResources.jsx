import { useState, useMemo } from 'react';
import { ChevronDown, ChevronRight, ExternalLink, Lock, ListChecks, Code } from 'lucide-react';
import { getSweResources, getGtmeResources } from '../../utils/extractTrackResources';

function ResourceGroup({ label, links }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="border border-slate-200 rounded-lg overflow-hidden">
      <button
        onClick={() => setOpen(o => !o)}
        className="w-full flex items-center justify-between px-4 py-2.5 bg-slate-50 hover:bg-slate-100 transition-colors text-left"
      >
        <span className="text-xs font-bold text-slate-600 uppercase tracking-wider">{label}</span>
        <div className="flex items-center gap-2 shrink-0">
          <span className="text-[10px] font-bold text-slate-400">{links.length}</span>
          {open ? <ChevronDown size={14} className="text-slate-400" /> : <ChevronRight size={14} className="text-slate-400" />}
        </div>
      </button>
      {open && (
        <ul className="divide-y divide-slate-100">
          {links.map((link, i) => (
            <li key={i}>
              <a
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-2 px-4 py-2 text-sm text-slate-600 hover:text-indigo-600 hover:bg-indigo-50/40 transition-colors"
              >
                <ExternalLink size={12} className="shrink-0 text-slate-300 group-hover:text-indigo-400" />
                <span className="leading-snug">{link.title}</span>
              </a>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

function TrackSection({ icon: Icon, label, color, buckets }) {
  const [open, setOpen] = useState(false);
  const total = buckets.reduce((n, b) => n + b.links.length, 0);

  return (
    <div className={`rounded-xl border ${color.border} overflow-hidden`}>
      <button
        onClick={() => setOpen(o => !o)}
        className={`w-full flex items-center gap-3 px-5 py-3 ${color.header} text-left transition-opacity hover:opacity-90`}
      >
        <Icon size={16} className="text-white shrink-0" />
        <span className="text-white font-bold text-sm uppercase tracking-wider flex-1">{label}</span>
        <span className="bg-white/20 text-white text-xs font-bold px-2.5 py-0.5 rounded-full">{total}</span>
        {open
          ? <ChevronDown size={16} className="text-white/70" />
          : <ChevronRight size={16} className="text-white/70" />
        }
      </button>
      {open && (
        <div className={`p-4 space-y-2 ${color.body}`}>
          {buckets.map((bucket, i) => (
            <ResourceGroup key={i} label={bucket.label} links={bucket.links} />
          ))}
        </div>
      )}
    </div>
  );
}

export default function TrackResources() {
  const [open, setOpen] = useState(false);

  const gtmeBuckets = useMemo(() => getGtmeResources(), []);
  const sweBuckets = useMemo(() => getSweResources(), []);
  const totalCount = useMemo(
    () => [...gtmeBuckets, ...sweBuckets].reduce((n, b) => n + b.links.length, 0),
    [gtmeBuckets, sweBuckets]
  );

  return (
    <div className="border-2 border-dashed border-slate-200 rounded-2xl overflow-hidden">
      {/* Panel toggle header */}
      <button
        onClick={() => setOpen(o => !o)}
        className="w-full flex items-center gap-3 px-5 py-4 bg-slate-50 hover:bg-slate-100 transition-colors text-left"
      >
        <Lock size={15} className="text-slate-400 shrink-0" />
        <div className="flex-1 min-w-0">
          <span className="font-bold text-slate-600 text-sm">Track Reference Library</span>
          <span className="ml-2 text-xs text-slate-400 font-normal">Read-only · {totalCount} links from GTME & SWE tracks</span>
        </div>
        {open
          ? <ChevronDown size={18} className="text-slate-400 shrink-0" />
          : <ChevronRight size={18} className="text-slate-400 shrink-0" />
        }
      </button>

      {open && (
        <div className="p-5 space-y-4 bg-slate-50/50">
          <p className="text-xs text-slate-400 italic">
            Auto-extracted from your GTME and SWE track data. Add links you discover yourself using the "Add Link" button above.
          </p>
          <TrackSection
            icon={ListChecks}
            label="GTME Resources"
            color={{
              border: 'border-indigo-200',
              header: 'bg-indigo-600',
              body: 'bg-indigo-50/30'
            }}
            buckets={gtmeBuckets}
          />
          <TrackSection
            icon={Code}
            label="SWE Track Resources"
            color={{
              border: 'border-purple-200',
              header: 'bg-purple-600',
              body: 'bg-purple-50/30'
            }}
            buckets={sweBuckets}
          />
        </div>
      )}
    </div>
  );
}
