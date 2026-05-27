import { NavLink } from 'react-router-dom';
import { LayoutDashboard, ListChecks, Code, CheckCircle2 } from 'lucide-react';

export default function BottomNav() {
  const navItems = [
    { to: "/", icon: <LayoutDashboard size={20} />, label: "Overview" },
    { to: "/gtme", icon: <ListChecks size={20} />, label: "GTME" },
    { to: "/swe", icon: <Code size={20} />, label: "SWE" },
    { to: "/habits", icon: <CheckCircle2 size={20} />, label: "Habits" }
  ];

  return (
    <nav className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-slate-200 px-6 py-2 pb-[env(safe-area-inset-bottom,12px)] z-[100] flex justify-between items-center shadow-[0_-4px_10px_rgba(0,0,0,0.05)]">
      {navItems.map((item) => (
        <NavLink
          key={item.to}
          to={item.to}
          className={({ isActive }) => `flex flex-col items-center gap-1 transition-all ${
            isActive ? 'text-indigo-600' : 'text-slate-400 hover:text-slate-600'
          }`}
        >
          <div className={`p-1 rounded-lg transition-colors ${
            // Special logic for active background if needed
            'transparent'
          }`}>
            {item.icon}
          </div>
          <span className="text-[10px] font-bold uppercase tracking-tighter">{item.label}</span>
        </NavLink>
      ))}
    </nav>
  );
}
