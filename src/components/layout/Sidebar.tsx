import { LayoutDashboard, Mail, FileText, ListChecks, Search, MessageSquare, Sparkles, X } from 'lucide-react';

export type ViewId = 'dashboard' | 'email' | 'meeting' | 'tasks' | 'research' | 'chat';

interface NavItem {
  id: ViewId;
  label: string;
  icon: React.ElementType;
  description: string;
}

const navItems: NavItem[] = [
  { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard, description: 'Overview' },
  { id: 'email', label: 'Email Generator', icon: Mail, description: 'Smart email drafting' },
  { id: 'meeting', label: 'Meeting Summarizer', icon: FileText, description: 'Notes to summaries' },
  { id: 'tasks', label: 'Task Planner', icon: ListChecks, description: 'Prioritize & schedule' },
  { id: 'research', label: 'Research Assistant', icon: Search, description: 'Insights & summaries' },
  { id: 'chat', label: 'AI Chat', icon: MessageSquare, description: 'Ask anything' },
];

export function Sidebar({
  active,
  onSelect,
  mobileOpen,
  onCloseMobile,
}: {
  active: ViewId;
  onSelect: (id: ViewId) => void;
  mobileOpen: boolean;
  onCloseMobile: () => void;
}) {
  return (
    <>
      {mobileOpen && (
        <div className="fixed inset-0 z-30 bg-ink-950/40 backdrop-blur-sm lg:hidden" onClick={onCloseMobile} />
      )}
      <aside
        className={`fixed lg:sticky top-0 left-0 z-40 h-screen w-72 bg-white border-r border-ink-200/60 flex flex-col transition-transform duration-300 ${
          mobileOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}
      >
        {/* Logo */}
        <div className="flex items-center justify-between px-6 h-16 border-b border-ink-200/60">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-primary-500 to-primary-700 flex items-center justify-center shadow-sm">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <div>
              <h1 className="text-base font-bold text-ink-900 tracking-tight">FlowAI</h1>
              <p className="text-[10px] text-ink-400 font-medium uppercase tracking-wider">Productivity Suite</p>
            </div>
          </div>
          <button onClick={onCloseMobile} className="lg:hidden p-1.5 rounded-lg hover:bg-ink-100 text-ink-500">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto scrollbar-thin">
          <p className="px-3 mb-2 text-[10px] font-semibold text-ink-400 uppercase tracking-wider">Workspace</p>
          {navItems.map((item) => {
            const isActive = active === item.id;
            return (
              <button
                key={item.id}
                onClick={() => {
                  onSelect(item.id);
                  onCloseMobile();
                }}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200 group ${
                  isActive
                    ? 'bg-primary-50 text-primary-700'
                    : 'text-ink-600 hover:bg-ink-50 hover:text-ink-900'
                }`}
              >
                <div
                  className={`w-9 h-9 rounded-lg flex items-center justify-center transition-colors ${
                    isActive ? 'bg-primary-100 text-primary-600' : 'bg-ink-50 text-ink-400 group-hover:bg-ink-100 group-hover:text-ink-600'
                  }`}
                >
                  <item.icon className="w-4.5 h-4.5" strokeWidth={2} />
                </div>
                <div className="flex-1 text-left">
                  <p className={`text-sm font-medium ${isActive ? 'text-primary-700' : ''}`}>{item.label}</p>
                  <p className="text-[11px] text-ink-400">{item.description}</p>
                </div>
                {isActive && <div className="w-1.5 h-1.5 rounded-full bg-primary-500" />}
              </button>
            );
          })}
        </nav>

        {/* Footer */}
        <div className="px-4 py-4 border-t border-ink-200/60">
          <div className="rounded-xl bg-gradient-to-br from-primary-50 to-accent-50 p-4 border border-primary-100/50">
            <div className="flex items-center gap-2 mb-1.5">
              <Sparkles className="w-3.5 h-3.5 text-primary-500" />
              <p className="text-xs font-semibold text-ink-700">Pro Tip</p>
            </div>
            <p className="text-[11px] text-ink-500 leading-relaxed">
              Use the Task Planner first thing in the morning to set your daily priorities.
            </p>
          </div>
        </div>
      </aside>
    </>
  );
}

export { navItems };
export type { NavItem };
