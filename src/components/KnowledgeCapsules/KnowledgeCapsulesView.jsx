import { useState, useMemo } from 'react';
import { Plus, PlayCircle, Briefcase, FileText, Globe, BookMarked, Loader2 } from 'lucide-react';
import { useKnowledgeCapsules } from '../../hooks/useKnowledgeCapsules';
import CapsuleCard from './CapsuleCard';
import AddCapsuleModal from './AddCapsuleModal';
import TrackResources from './TrackResources';

const SWIMLANES = [
  {
    key: 'youtube',
    label: 'YouTube',
    icon: PlayCircle,
    headerBg: 'bg-rose-600',
    sectionBg: 'bg-rose-50/50',
    borderColor: 'border-rose-200'
  },
  {
    key: 'linkedin',
    label: 'LinkedIn',
    icon: Briefcase,
    headerBg: 'bg-blue-600',
    sectionBg: 'bg-blue-50/50',
    borderColor: 'border-blue-200'
  },
  {
    key: 'article',
    label: 'Articles & Blogs',
    icon: FileText,
    headerBg: 'bg-emerald-600',
    sectionBg: 'bg-emerald-50/50',
    borderColor: 'border-emerald-200'
  },
  {
    key: 'other',
    label: 'Other',
    icon: Globe,
    headerBg: 'bg-purple-600',
    sectionBg: 'bg-purple-50/50',
    borderColor: 'border-purple-200'
  }
];

export default function KnowledgeCapsulesView({ user }) {
  const { capsules, loading, addCapsule, deleteCapsule } = useKnowledgeCapsules(user);
  const [showModal, setShowModal] = useState(false);

  const capsulesByCategory = useMemo(() => {
    return SWIMLANES.reduce((acc, lane) => {
      acc[lane.key] = capsules.filter(c => c.category === lane.key);
      return acc;
    }, {});
  }, [capsules]);

  const isLocalMode = user?.uid === 'local_dev';

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64 text-indigo-500">
        <Loader2 size={32} className="animate-spin" />
      </div>
    );
  }

  return (
    <div className="space-y-6">

      {/* Page header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-2.5 bg-indigo-100 rounded-xl">
            <BookMarked className="text-indigo-600" size={24} />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-slate-900">Knowledge Capsules</h2>
            <p className="text-slate-500 text-sm">
              {capsules.length} resource{capsules.length !== 1 ? 's' : ''} saved
            </p>
          </div>
        </div>
        <button
          onClick={() => setShowModal(true)}
          disabled={isLocalMode}
          className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 disabled:bg-slate-300 disabled:cursor-not-allowed text-white font-bold px-4 py-2.5 rounded-xl text-sm transition-colors shadow-sm"
        >
          <Plus size={18} /> Add Link
        </button>
      </div>

      {/* Local mode banner */}
      {isLocalMode && (
        <div className="bg-amber-50 border border-amber-200 rounded-xl px-4 py-3 text-sm text-amber-800 font-medium">
          Sign in with Google to save Knowledge Capsules.
        </div>
      )}

      {/* Empty state */}
      {!isLocalMode && capsules.length === 0 && (
        <div className="text-center py-20 text-slate-400">
          <div className="inline-flex p-5 bg-slate-100 rounded-full mb-4">
            <BookMarked size={40} className="opacity-40" />
          </div>
          <p className="font-bold text-slate-500 text-lg">No capsules yet</p>
          <p className="text-sm mt-1 max-w-xs mx-auto">
            Paste any URL and let AI summarize it for you — YouTube videos, LinkedIn posts, articles and more.
          </p>
          <button
            onClick={() => setShowModal(true)}
            className="mt-5 inline-flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white font-bold px-5 py-2.5 rounded-xl text-sm transition-colors"
          >
            <Plus size={16} /> Add your first link
          </button>
        </div>
      )}

      {/* Swimlanes */}
      {SWIMLANES.map(lane => {
        const items = capsulesByCategory[lane.key];
        if (!items || items.length === 0) return null;
        const Icon = lane.icon;

        return (
          <div key={lane.key} className={`rounded-2xl border ${lane.borderColor} ${lane.sectionBg} overflow-hidden`}>
            <div className={`${lane.headerBg} px-5 py-3 flex items-center gap-2`}>
              <Icon size={16} className="text-white" />
              <h3 className="text-white font-bold text-sm uppercase tracking-wider">
                {lane.label}
              </h3>
              <span className="ml-auto bg-white/20 text-white text-xs font-bold px-2.5 py-0.5 rounded-full">
                {items.length}
              </span>
            </div>

            <div className="p-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {items.map(capsule => (
                <CapsuleCard
                  key={capsule.id}
                  capsule={capsule}
                  onDelete={deleteCapsule}
                />
              ))}
            </div>
          </div>
        );
      })}

      {/* Divider before reference library */}
      <div className="pt-2">
        <TrackResources />
      </div>

      {showModal && (
        <AddCapsuleModal
          onClose={() => setShowModal(false)}
          onSave={addCapsule}
        />
      )}
    </div>
  );
}
