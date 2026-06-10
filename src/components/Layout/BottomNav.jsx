import { NavLink } from 'react-router-dom';
import { LayoutDashboard, ListChecks, Code, CheckCircle2, BookMarked } from 'lucide-react';

export default function BottomNav() {
  const navItems = [
    { to: "/", icon: <LayoutDashboard size={20} />, label: "Overview" },
    { to: "/gtme", icon: <ListChecks size={20} />, label: "GTME" },
    { to: "/swe", icon: <Code size={20} />, label: "SWE" },
    { to: "/habits", icon: <CheckCircle2 size={20} />, label: "Habits" },
    { to: "/capsules", icon: <BookMarked size={20} />, label: "Capsules" }
  ];

  return (
    <nav className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-slate-200 px-2 pt-3 pb-[calc(env(safe-area-inset-bottom,12px)+16px)] z-[100] flex justify-between items-center shadow-[0_-8px_20px_rgba(0,0,0,0.04)]">
      {navItems.map((item) => (
        <NavLink
          key={item.to}
          to={item.to}
          className={({ isActive }) => `flex flex-col items-center gap-1.5 transition-all ${
            isActive ? 'text-indigo-600' : 'text-slate-400 hover:text-slate-600'
          }`}
        >
          <div className="p-0.5 transition-transform duration-200 active:scale-90">
            {item.icon}
          </div>
          <span className="text-[10px] font-black uppercase tracking-widest">{item.label}</span>
        </NavLink>
      ))}
    </nav>
  );
}
