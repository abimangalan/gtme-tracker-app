import { useState } from 'react';
import { X, Link2, Loader2, Sparkles, AlertCircle, Save, BookMarked } from 'lucide-react';

function detectCategory(url) {
  try {
    const host = new URL(url).hostname.replace('www.', '');
    if (host === 'youtube.com' || host === 'youtu.be') return 'youtube';
    if (host === 'linkedin.com') return 'linkedin';
    return 'article';
  } catch {
    return 'other';
  }
}

export default function AddCapsuleModal({ onClose, onSave }) {
  const [step, setStep] = useState('input'); // 'input' | 'loading' | 'preview' | 'error'
  const [url, setUrl] = useState('');
  const [preview, setPreview] = useState(null);
  const [errorMsg, setErrorMsg] = useState('');
  const [saving, setSaving] = useState(false);

  const handleFetch = async (e) => {
    e.preventDefault();
    if (!url.trim()) return;

    setStep('loading');
    setErrorMsg('');

    try {
      const res = await fetch('/api/summarize', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url: url.trim() })
      });

      const text = await res.text();
      let data;
      try {
        data = JSON.parse(text);
      } catch {
        throw new Error(`Server returned non-JSON (status ${res.status}). Is netlify dev running with GEMINI_API_KEY set in .env?`);
      }
      if (!res.ok) throw new Error(data.error || 'Failed to process URL');

      setPreview(data);
      setStep('preview');
    } catch (err) {
      setErrorMsg(err.message);
      setStep('error');
    }
  };

  const handleSave = async () => {
    if (!preview || saving) return;
    setSaving(true);
    try {
      await onSave({
        url: url.trim(),
        title: preview.title,
        summary: preview.summary,
        category: preview.category,
        thumbnail: preview.thumbnail || null,
        domain: preview.domain || new URL(url.trim()).hostname.replace('www.', '')
      });
      onClose();
    } catch (err) {
      setErrorMsg('Failed to save. Please try again.');
      setStep('error');
      setSaving(false);
    }
  };

  const handleRetry = () => {
    setStep('input');
    setErrorMsg('');
  };

  return (
    <div className="fixed inset-0 z-[110] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg flex flex-col overflow-hidden max-h-[90vh]">

        {/* Header */}
        <div className="px-6 py-4 border-b border-slate-100 flex justify-between items-center bg-gradient-to-r from-indigo-50 to-purple-50 shrink-0">
          <div className="flex items-center gap-2 font-bold text-indigo-700 text-sm uppercase tracking-wider">
            <Sparkles size={16} /> Add Knowledge Capsule
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-slate-700 bg-white/70 hover:bg-white rounded-full p-1.5 transition-colors"
          >
            <X size={18} />
          </button>
        </div>

        {/* Body */}
        <div className="p-6 space-y-4 overflow-y-auto">

          {/* URL form */}
          <form onSubmit={handleFetch}>
            <label className="text-xs font-bold text-slate-500 uppercase tracking-wider block mb-1.5">
              Paste a link
            </label>
            <div className="flex gap-2">
              <div className="flex-1 relative">
                <Link2 size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="url"
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  placeholder="https://..."
                  required
                  disabled={step === 'loading'}
                  className="w-full border border-slate-200 rounded-lg pl-8 pr-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-transparent disabled:opacity-50 disabled:bg-slate-50"
                />
              </div>
              <button
                type="submit"
                disabled={!url.trim() || step === 'loading'}
                className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 disabled:bg-slate-200 disabled:text-slate-400 text-white font-bold px-4 py-2.5 rounded-lg text-sm transition-colors shrink-0"
              >
                {step === 'loading'
                  ? <><Loader2 size={15} className="animate-spin" /> Analyzing…</>
                  : <><Sparkles size={15} /> Fetch</>
                }
              </button>
            </div>
          </form>

          {/* Error */}
          {step === 'error' && (
            <div className="space-y-2">
              <div className="flex items-start gap-2 bg-red-50 border border-red-200 rounded-xl p-3 text-sm text-red-700">
                <AlertCircle size={16} className="shrink-0 mt-0.5" />
                <div className="flex-1">
                  <p>{errorMsg}</p>
                  <button onClick={handleRetry} className="text-red-600 underline text-xs mt-1 font-bold">Try again</button>
                </div>
              </div>
              {url && (
                <button
                  onClick={async () => {
                    setSaving(true);
                    try {
                      const parsedUrl = new URL(url.trim());
                      const domain = parsedUrl.hostname.replace('www.', '');
                      await onSave({
                        url: url.trim(),
                        title: domain,
                        summary: '',
                        category: detectCategory(url.trim()),
                        thumbnail: null,
                        domain
                      });
                      onClose();
                    } catch {
                      setSaving(false);
                    }
                  }}
                  disabled={saving}
                  className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-sm font-bold border-2 border-dashed border-slate-300 text-slate-500 hover:border-indigo-400 hover:text-indigo-600 transition-colors"
                >
                  {saving ? <Loader2 size={14} className="animate-spin" /> : <BookMarked size={14} />}
                  Save link without AI summary
                </button>
              )}
            </div>
          )}

          {/* Preview */}
          {step === 'preview' && preview && (
            <div className="space-y-3 animate-fade-in">
              {preview.thumbnail && (
                <img
                  src={preview.thumbnail}
                  alt=""
                  className="w-full h-36 object-cover rounded-xl"
                  onError={(e) => { e.target.style.display = 'none'; }}
                />
              )}

              <div>
                <label className="text-xs font-bold text-slate-500 uppercase tracking-wider block mb-1">Title</label>
                <input
                  type="text"
                  value={preview.title}
                  onChange={(e) => setPreview(p => ({ ...p, title: e.target.value }))}
                  className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-slate-500 uppercase tracking-wider block mb-1">
                  AI Summary <span className="text-indigo-400 normal-case font-normal">(editable)</span>
                </label>
                <textarea
                  value={preview.summary}
                  onChange={(e) => setPreview(p => ({ ...p, summary: e.target.value }))}
                  rows={4}
                  className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400 resize-none"
                />
              </div>

              <div className="flex items-center gap-2 text-xs text-slate-400 bg-slate-50 rounded-lg px-3 py-2">
                <span className="font-bold text-slate-500">Category:</span>
                <span className="capitalize font-medium text-slate-600">{preview.category}</span>
                <span>·</span>
                <span>{preview.domain}</span>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-slate-100 bg-slate-50 flex justify-end gap-3 shrink-0">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-lg text-sm font-bold text-slate-600 hover:bg-slate-200 transition-colors"
          >
            Cancel
          </button>
          {step === 'preview' && (
            <button
              onClick={handleSave}
              disabled={saving}
              className="flex items-center gap-2 px-5 py-2 rounded-lg text-sm font-bold bg-indigo-600 hover:bg-indigo-700 disabled:opacity-60 text-white transition-colors shadow-sm"
            >
              {saving ? <Loader2 size={14} className="animate-spin" /> : <Save size={14} />}
              Save Capsule
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
