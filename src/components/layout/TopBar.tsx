import { Menu, Bell, Search } from 'lucide-react';
import { type ViewId, navItems } from './Sidebar';

export function TopBar({ active, onMenuClick }: { active: ViewId; onMenuClick: () => void }) {
  const current = navItems.find((n) => n.id === active);

  return (
    <header className="sticky top-0 z-20 h-16 bg-white/80 backdrop-blur-md border-b border-ink-200/60 flex items-center px-4 lg:px-8 gap-4">
      <button onClick={onMenuClick} className="lg:hidden p-2 rounded-lg hover:bg-ink-100 text-ink-600">
        <Menu className="w-5 h-5" />
      </button>

      <div className="flex-1 min-w-0">
        <h2 className="text-lg font-semibold text-ink-900 truncate">{current?.label || 'Dashboard'}</h2>
        <p className="text-xs text-ink-400 truncate hidden sm:block">{current?.description}</p>
      </div>

      {/* Search */}
      <div className="hidden md:flex items-center gap-2 px-3 py-2 rounded-xl bg-ink-50 border border-ink-200/60 w-64">
        <Search className="w-4 h-4 text-ink-400" />
        <input
          type="text"
          placeholder="Search..."
          className="bg-transparent text-sm text-ink-700 placeholder:text-ink-400 focus:outline-none flex-1"
        />
        <kbd className="text-[10px] text-ink-400 bg-white border border-ink-200 rounded px-1.5 py-0.5 font-mono">⌘K</kbd>
      </div>

      <button className="relative p-2 rounded-xl hover:bg-ink-100 text-ink-500 transition-colors">
        <Bell className="w-5 h-5" />
        <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-error-400 ring-2 ring-white" />
      </button>

      <div className="flex items-center gap-3 pl-2 border-l border-ink-200/60">
        <div className="w-9 h-9 rounded-full bg-gradient-to-br from-primary-400 to-primary-600 flex items-center justify-center text-white text-sm font-semibold">
          AK
        </div>
        <div className="hidden sm:block">
          <p className="text-sm font-medium text-ink-800">Alex Kim</p>
          <p className="text-[11px] text-ink-400">Product Manager</p>
        </div>
      </div>
    </header>
  );
}
