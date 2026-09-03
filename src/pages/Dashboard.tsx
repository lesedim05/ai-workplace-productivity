import { Mail, FileText, ListChecks, Search, MessageSquare, ArrowRight, TrendingUp, Clock, CheckCircle2, Zap } from 'lucide-react';
import { type ViewId } from '@/components/layout/Sidebar';
import { Disclaimer } from '@/components/ui/Disclaimer';

const features = [
  {
    id: 'email' as ViewId,
    title: 'Smart Email Generator',
    description: 'Draft professional emails with the perfect tone for any audience — clients, teams, managers, and more.',
    icon: Mail,
    color: 'from-blue-500 to-blue-600',
    bg: 'bg-blue-50',
    iconBg: 'bg-blue-100 text-blue-600',
  },
  {
    id: 'meeting' as ViewId,
    title: 'Meeting Notes Summarizer',
    description: 'Transform raw meeting notes into structured summaries with action items, decisions, and deadlines.',
    icon: FileText,
    color: 'from-cyan-500 to-cyan-600',
    bg: 'bg-cyan-50',
    iconBg: 'bg-cyan-100 text-cyan-600',
  },
  {
    id: 'tasks' as ViewId,
    title: 'AI Task Planner',
    description: 'Prioritize your tasks intelligently and get a suggested daily schedule that maximizes focus.',
    icon: ListChecks,
    color: 'from-emerald-500 to-emerald-600',
    bg: 'bg-emerald-50',
    iconBg: 'bg-emerald-100 text-emerald-600',
  },
  {
    id: 'research' as ViewId,
    title: 'AI Research Assistant',
    description: 'Get structured insights, key findings, and recommendations on any topic — at the depth you need.',
    icon: Search,
    color: 'from-violet-500 to-violet-600',
    bg: 'bg-violet-50',
    iconBg: 'bg-violet-100 text-violet-600',
  },
  {
    id: 'chat' as ViewId,
    title: 'AI Chatbot Interface',
    description: 'Ask anything about productivity, communication, or workplace best practices — get instant answers.',
    icon: MessageSquare,
    color: 'from-amber-500 to-amber-600',
    bg: 'bg-amber-50',
    iconBg: 'bg-amber-100 text-amber-600',
  },
];

const stats = [
  { label: 'Tasks Completed', value: '24', change: '+12%', icon: CheckCircle2, color: 'text-success-600 bg-success-50' },
  { label: 'Hours Saved', value: '8.5h', change: '+3.2h', icon: Clock, color: 'text-primary-600 bg-primary-50' },
  { label: 'Emails Drafted', value: '47', change: '+8', icon: Mail, color: 'text-accent-600 bg-accent-50' },
  { label: 'Productivity Score', value: '92%', change: '+5%', icon: TrendingUp, color: 'text-violet-600 bg-violet-50' },
];

export function Dashboard({ onNavigate }: { onNavigate: (view: ViewId) => void }) {
  return (
    <div className="p-4 lg:p-8 max-w-7xl mx-auto animate-fade-in">
      {/* Hero */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-primary-600 via-primary-700 to-primary-800 p-8 lg:p-10 mb-8">
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-2xl" />
        <div className="absolute bottom-0 left-1/3 w-48 h-48 bg-accent-400/20 rounded-full translate-y-1/2 blur-2xl" />
        <div className="relative">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 backdrop-blur-sm text-white/90 text-xs font-medium mb-4">
            <Zap className="w-3.5 h-3.5" />
            AI-Powered Productivity
          </div>
          <h1 className="text-3xl lg:text-4xl font-bold text-white tracking-tight mb-3">
            Good morning, Alex. Let's make today productive.
          </h1>
          <p className="text-white/80 text-base max-w-2xl leading-relaxed">
            Your AI assistant is ready to help you draft emails, summarize meetings, plan tasks, research topics, and answer
            questions — all in one place.
          </p>
          <div className="flex flex-wrap gap-3 mt-6">
            <button
              onClick={() => onNavigate('tasks')}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white text-primary-700 text-sm font-semibold hover:bg-white/90 transition-colors"
            >
              Plan my day
              <ArrowRight className="w-4 h-4" />
            </button>
            <button
              onClick={() => onNavigate('email')}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white/10 backdrop-blur-sm text-white text-sm font-semibold hover:bg-white/20 transition-colors border border-white/20"
            >
              Draft an email
            </button>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {stats.map((stat) => (
          <div key={stat.label} className="bg-white rounded-2xl border border-ink-200/60 p-5 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between mb-3">
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${stat.color}`}>
                <stat.icon className="w-5 h-5" />
              </div>
              <span className="text-xs font-semibold text-success-600">{stat.change}</span>
            </div>
            <p className="text-2xl font-bold text-ink-900">{stat.value}</p>
            <p className="text-xs text-ink-400 mt-0.5">{stat.label}</p>
          </div>
        ))}
      </div>

      {/* Feature Cards */}
      <div className="mb-6">
        <h2 className="text-xl font-bold text-ink-900 mb-1">AI Tools</h2>
        <p className="text-sm text-ink-500">Choose a tool to get started</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {features.map((feature) => (
          <button
            key={feature.id}
            onClick={() => onNavigate(feature.id)}
            className="group text-left bg-white rounded-2xl border border-ink-200/60 p-6 hover:shadow-lg hover:border-ink-300 transition-all duration-300 hover:-translate-y-0.5"
          >
            <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 ${feature.iconBg} group-hover:scale-110 transition-transform`}>
              <feature.icon className="w-6 h-6" />
            </div>
            <h3 className="text-base font-semibold text-ink-900 mb-1.5 group-hover:text-primary-600 transition-colors">
              {feature.title}
            </h3>
            <p className="text-sm text-ink-500 leading-relaxed mb-4">{feature.description}</p>
            <div className="inline-flex items-center gap-1.5 text-sm font-medium text-primary-600 group-hover:gap-2.5 transition-all">
              Open tool
              <ArrowRight className="w-4 h-4" />
            </div>
          </button>
        ))}

        {/* Disclaimer card */}
        <div className="bg-ink-50/50 rounded-2xl border border-ink-200/60 p-6 flex flex-col justify-center">
          <Disclaimer />
        </div>
      </div>
    </div>
  );
}
