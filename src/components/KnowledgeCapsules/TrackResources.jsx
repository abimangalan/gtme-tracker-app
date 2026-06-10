import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import {
  ChevronDown, ChevronRight, ExternalLink, Lock,
  ListChecks, Code, Sparkles, Loader2, ArrowRight
} from 'lucide-react';
import { getSweResources, getGtmeResources } from '../../utils/extractTrackResources';

const DAY_ABBR = { Monday: 'Mon', Tuesday: 'Tue', Wednesday: 'Wed', Thursday: 'Thu', Friday: 'Fri', Saturday: 'Sat', Sunday: 'Sun' };

// Single resource row — title, day chips, summarize, navigate
function ResourceLinkRow({ link, navigateTo }) {
  const [summaryState, setSummaryState] = useState('idle'); // 'idle'|'loading'|'done'|'error'
  const [summary, setSummary] = useState('');

  const handleSummarize = async () => {
    if (summaryState !== 'idle') return;
    setSummaryState('loading');
    try {
      const res = await fetch('/api/summarize', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url: link.url })
      });
      const text = await res.text();
      let data;
      try { data = JSON.parse(text); } catch { throw new Error('Non-JSON response'); }
      if (!res.ok) throw new Error(data.error || 'Failed');
      setSummary(data.summary || 'No summary returned.');
      setSummaryState('done');
    } catch (err) {
      setSummary(err.message);
      setSummaryState('error');
    }
  };

  return (
    <li className="py-2.5 px-4 hover:bg-slate-50 transition-colors group">
      {/* Top row: title + actions */}
      <div className="flex items-start gap-2">
        <a
          href={link.url}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-start gap-1.5 flex-1 min-w-0 text-sm text-slate-700 hover:text-indigo-600 transition-colors"
        >
          <ExternalLink size={12} className="shrink-0 mt-0.5 text-slate-300 group-hover:text-indigo-400" />
          <span className="leading-snug">{link.title}</span>
        </a>

        <div className="flex items-center gap-1 shrink-0 opacity-0 group-hover:opacity-100 transition-opacity">
          {/* AI Summarize */}
          <button
            onClick={handleSummarize}
            disabled={summaryState !== 'idle'}
            title="Get AI summary"
            className="flex items-center gap-1 text-[10px] font-bold px-2 py-1 rounded-md bg-indigo-50 hover:bg-indigo-100 text-indigo-600 disabled:opacity-50 disabled:cursor-default transition-colors"
          >
            {summaryState === 'loading'
              ? <Loader2 size={10} className="animate-spin" />
              : <Sparkles size={10} />
            }
            {summaryState === 'loading' ? 'Loading…' : summaryState === 'done' ? 'Done' : 'Summarize'}
          </button>

          {/* Navigate to track */}
          {navigateTo && (
            <Link
              to={navigateTo}
              title={`Go to ${navigateTo === '/swe' ? 'SWE' : 'GTME'} track`}
              className="p-1 rounded-md bg-slate-100 hover:bg-slate-200 text-slate-500 hover:text-slate-700 transition-colors"
            >
              <ArrowRight size={12} />
            </Link>
          )}
        </div>
      </div>

      {/* Day context chips */}
      {link.days && link.days.length > 0 && (
        <div className="flex flex-wrap gap-1 mt-1.5 ml-4">
          {link.days.map((d, i) => (
            <span
              key={i}
              className="inline-flex items-center gap-1 text-[10px] font-medium bg-slate-100 text-slate-500 px-2 py-0.5 rounded-full"
            >
              <span className="font-bold text-slate-600">W{d.weekNumber}</span>
              <span className="text-slate-300">·</span>
              {DAY_ABBR[d.day] || d.day}
              <span className="text-slate-300">·</span>
              <span className="truncate max-w-[120px]">{d.task}</span>
            </span>
          ))}
        </div>
      )}

      {/* AI Summary */}
      {(summaryState === 'done' || summaryState === 'error') && (
        <p className={`mt-2 ml-4 text-xs leading-relaxed rounded-lg px-3 py-2 ${
          summaryState === 'error'
            ? 'bg-red-50 text-red-600'
            : 'bg-indigo-50 text-indigo-800'
        }`}>
          {summary}
        </p>
      )}
    </li>
  );
}

function ResourceGroup({ label, links, navigateTo }) {
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
          {open
            ? <ChevronDown size={14} className="text-slate-400" />
            : <ChevronRight size={14} className="text-slate-400" />
          }
        </div>
      </button>
      {open && (
        <ul className="divide-y divide-slate-100">
          {links.map((link, i) => (
            <ResourceLinkRow key={i} link={link} navigateTo={navigateTo} />
          ))}
        </ul>
      )}
    </div>
  );
}

function TrackSection({ icon: Icon, label, color, buckets, navigateTo }) {
  const [open, setOpen] = useState(false);
  const total = buckets.reduce((n, b) => n + b.links.length, 0);

  return (
    <div className={`rounded-xl border ${color.border} overflow-hidden`}>
      <button
        onClick={() => setOpen(o => !o)}
        className={`w-full flex items-center gap-3 px-5 py-3 ${color.header} text-left hover:opacity-90 transition-opacity`}
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
            <ResourceGroup key={i} label={bucket.label} links={bucket.links} navigateTo={navigateTo} />
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
      <button
        onClick={() => setOpen(o => !o)}
        className="w-full flex items-center gap-3 px-5 py-4 bg-slate-50 hover:bg-slate-100 transition-colors text-left"
      >
        <Lock size={15} className="text-slate-400 shrink-0" />
        <div className="flex-1 min-w-0">
          <span className="font-bold text-slate-600 text-sm">Track Reference Library</span>
          <span className="ml-2 text-xs text-slate-400 font-normal">
            Read-only · {totalCount} links · hover any row for AI summary
          </span>
        </div>
        {open
          ? <ChevronDown size={18} className="text-slate-400 shrink-0" />
          : <ChevronRight size={18} className="text-slate-400 shrink-0" />
        }
      </button>

      {open && (
        <div className="p-5 space-y-4 bg-slate-50/50">
          <p className="text-xs text-slate-400 italic">
            Auto-extracted from your GTME and SWE track data. Hover a row to summarize it with AI or jump to the track. Add your own discoveries above using "Add Link".
          </p>
          <TrackSection
            icon={ListChecks}
            label="GTME Resources"
            color={{ border: 'border-indigo-200', header: 'bg-indigo-600', body: 'bg-indigo-50/30' }}
            buckets={gtmeBuckets}
            navigateTo={null}
          />
          <TrackSection
            icon={Code}
            label="SWE Track Resources"
            color={{ border: 'border-purple-200', header: 'bg-purple-600', body: 'bg-purple-50/30' }}
            buckets={sweBuckets}
            navigateTo="/swe"
          />
        </div>
      )}
    </div>
  );
}
