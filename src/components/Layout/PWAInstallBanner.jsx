import { useState, useEffect } from 'react';
import { Share, X, PlusSquare } from 'lucide-react';

export default function PWAInstallBanner() {
  const [showPrompt, setShowPrompt] = useState(false);

  useEffect(() => {
    // 1. Detect if iOS (iPhone/iPad/iPod) or iPadOS (which Safari reports as macOS)
    const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent) || 
      (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);
    
    // 2. Detect if already in standalone mode (running as PWA app)
    const isStandalone = window.matchMedia('(display-mode: standalone)').matches || window.navigator.standalone;
    
    // 3. Check if user has previously dismissed the prompt
    const isDismissed = localStorage.getItem('pwa-ios-prompt-dismissed') === 'true';

    // Show prompt only if on iOS, not running standalone, and not already dismissed
    if (isIOS && !isStandalone && !isDismissed) {
      setShowPrompt(true);
    }
  }, []);

  const handleDismiss = () => {
    localStorage.setItem('pwa-ios-prompt-dismissed', 'true');
    setShowPrompt(false);
  };

  if (!showPrompt) return null;

  return (
    <div className="fixed bottom-24 left-4 right-4 md:bottom-6 md:right-6 md:left-auto md:max-w-md bg-slate-900 border border-slate-800 text-white rounded-2xl shadow-2xl p-5 z-[90] animate-in fade-in slide-in-from-bottom-5 duration-300">
      <div className="flex items-start justify-between gap-3">
        <div className="flex-1">
          <h3 className="font-bold text-sm text-slate-100 flex items-center gap-1.5">
            ✨ Add LifeOS to Home Screen
          </h3>
          <p className="text-xs text-slate-400 mt-1 leading-relaxed">
            Install this app on your iPhone for full-screen view and quick access.
          </p>
          
          <div className="mt-3.5 flex flex-col gap-2.5 bg-slate-950/60 p-3.5 rounded-xl border border-slate-800/80 text-xs">
            <div className="flex items-start gap-3 text-slate-300">
              <span className="flex items-center justify-center bg-indigo-600/20 text-indigo-400 h-5 w-5 rounded-md text-[10px] font-black mt-0.5 shrink-0 border border-indigo-500/20">1</span>
              <span className="leading-normal">Tapping the <strong>Share</strong> button <Share className="inline-block text-indigo-400 mx-1" size={14} /> at the bottom of Safari.</span>
            </div>
            <div className="flex items-start gap-3 text-slate-300">
              <span className="flex items-center justify-center bg-emerald-600/20 text-emerald-400 h-5 w-5 rounded-md text-[10px] font-black mt-0.5 shrink-0 border border-emerald-500/20">2</span>
              <span className="leading-normal">Scroll down the options list and select <strong>Add to Home Screen</strong> <PlusSquare className="inline-block text-emerald-400 mx-1" size={14} />.</span>
            </div>
            <div className="text-[10px] text-amber-400/80 italic mt-1 font-medium leading-normal">
              * Note: If "Add to Home Screen" is missing, make sure you open the link in Safari directly (not from inside WhatsApp, Slack, or email in-app browsers).
            </div>
          </div>
        </div>
        <button 
          onClick={handleDismiss} 
          className="text-slate-500 hover:text-slate-300 transition-colors p-1"
          aria-label="Dismiss install prompt"
        >
          <X size={16} />
        </button>
      </div>
    </div>
  );
}
