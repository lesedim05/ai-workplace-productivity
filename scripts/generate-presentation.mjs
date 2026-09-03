import pptxgen from 'pptxgenjs';

const pptx = new pptxgen();

pptx.defineLayout({ name: 'Wide', width: 13.33, height: 7.5 });
pptx.layout = 'Wide';

const COLORS = {
  primary: '2563EB',
  primaryDark: '1E40AF',
  accent: '06B6D4',
  ink: '0F172A',
  inkLight: '64748B',
  inkLighter: '94A3B8',
  bg: 'F8FAFC',
  white: 'FFFFFF',
  amber: 'F59E0B',
  emerald: '10B981',
  red: 'EF4444',
  violet: '7C3AED',
  cardBg: 'F1F5F9',
  border: 'E2E8F0',
};

const FONT = 'Calibri';

function addSlideBg(slide, color = COLORS.bg) {
  slide.background = { color };
}

function addHeader(slide, title, subtitle) {
  slide.addShape('rect', { x: 0, y: 0, w: 13.33, h: 1.1, fill: { color: COLORS.primary } });
  slide.addShape('rect', { x: 0, y: 1.05, w: 13.33, h: 0.06, fill: { color: COLORS.accent } });
  slide.addText(title, {
    x: 0.6, y: 0.2, w: 10, h: 0.5,
    fontFace: FONT, fontSize: 24, bold: true, color: COLORS.white,
  align: 'left',
  });
  if (subtitle) {
    slide.addText(subtitle, {
      x: 0.62, y: 0.7, w: 10, h: 0.35,
      fontFace: FONT, fontSize: 13, color: 'BFD4F7',
      align: 'left',
    });
  }
}

function addFooter(slide, pageNum) {
  slide.addText('FlowAI - AI Workplace Productivity Assistant', {
    x: 0.6, y: 7.05, w: 8, h: 0.35,
    fontFace: FONT, fontSize: 9, color: COLORS.inkLighter, align: 'left',
  });
  slide.addText(String(pageNum), {
    x: 12.4, y: 7.05, w: 0.5, h: 0.35,
    fontFace: FONT, fontSize: 9, color: COLORS.inkLighter, align: 'right',
  });
}

function addCodeBlock(slide, code, x, y, w, h, fontSize = 9) {
  slide.addShape('rect', { x, y, w, h, fill: { color: '1E293B' }, line: { color: '334155', width: 1 }, rectRadius: 0.08 });
  slide.addText(code, {
    x: x + 0.15, y: y + 0.1, w: w - 0.3, h: h - 0.2,
    fontFace: 'Consolas', fontSize, color: 'CBD5E1',
    align: 'left', valign: 'top', lineSpacingMultiple: 1.15,
  });
}

// ═══════════════════════════════════════════════════
// SLIDE 1 - Title
// ═══════════════════════════════════════════════════
{
  const slide = pptx.addSlide();
  slide.background = { color: COLORS.primary };

  slide.addShape('rect', { x: 0, y: 0, w: 13.33, h: 7.5, fill: { type: 'solid', color: '1E40AF', transparency: 30 } });
  slide.addShape('ellipse', { x: 8.5, y: -1.5, w: 6, h: 6, fill: { color: '2563EB', transparency: 60 } });
  slide.addShape('ellipse', { x: 9.5, y: 4, w: 5, h: 5, fill: { color: '06B6D4', transparency: 70 } });

  slide.addText('FlowAI', {
    x: 1, y: 1.8, w: 11, h: 1,
    fontFace: FONT, fontSize: 52, bold: true, color: COLORS.white,
    align: 'center',
  });

  slide.addText('AI Workplace Productivity Assistant', {
    x: 1, y: 2.9, w: 11, h: 0.6,
    fontFace: FONT, fontSize: 24, color: 'BFD4F7',
    align: 'center',
  });

  slide.addShape('rect', { x: 5.66, y: 3.7, w: 2, h: 0.04, fill: { color: COLORS.accent } });

  slide.addText('A modern web application that helps professionals automate\ndaily work tasks using AI', {
    x: 1, y: 4.0, w: 11, h: 0.8,
    fontFace: FONT, fontSize: 16, color: 'DBEAFE',
    align: 'center', lineSpacingMultiple: 1.3,
  });

  slide.addText('Presentation & Technical Overview', {
    x: 1, y: 5.2, w: 11, h: 0.4,
    fontFace: FONT, fontSize: 14, bold: true, color: COLORS.accent,
    align: 'center',
  });

  slide.addText('Built with React, TypeScript, Tailwind CSS & Lucide Icons', {
    x: 1, y: 6.2, w: 11, h: 0.35,
    fontFace: FONT, fontSize: 12, color: '93C5FD',
    align: 'center',
  });
}

// ═══════════════════════════════════════════════════
// SLIDE 2 - What is FlowAI
// ═══════════════════════════════════════════════════
{
  const slide = pptx.addSlide();
  addSlideBg(slide);
  addHeader(slide, 'What is FlowAI?', 'An AI-powered productivity suite for professionals');

  const features = [
    { title: 'Smart Email Generator', desc: 'Draft professional emails with the right tone for any audience', icon: 'Mail', color: COLORS.primary },
    { title: 'Meeting Notes Summarizer', desc: 'Turn raw notes into structured summaries with action items', icon: 'Notes', color: COLORS.accent },
    { title: 'AI Task Planner', desc: 'Prioritize tasks and get a suggested daily schedule', icon: 'Tasks', color: COLORS.emerald },
    { title: 'AI Research Assistant', desc: 'Get structured insights and summaries on any topic', icon: 'Search', color: COLORS.violet },
    { title: 'AI Chatbot Interface', desc: 'Ask anything about productivity and workplace tasks', icon: 'Chat', color: COLORS.amber },
  ];

  features.forEach((f, i) => {
    const col = i < 3 ? i : i - 3;
    const row = i < 3 ? 0 : 1;
    const x = 0.6 + col * 4.1;
    const y = 1.4 + row * 2.6;

    slide.addShape('roundRect', { x, y, w: 3.8, h: 2.3, fill: { color: COLORS.white }, line: { color: COLORS.border, width: 1 }, rectRadius: 0.1 });
    slide.addShape('roundRect', { x: x + 0.25, y: y + 0.25, w: 0.55, h: 0.55, fill: { color: f.color }, rectRadius: 0.08 });
    slide.addText(f.icon[0], { x: x + 0.25, y: y + 0.25, w: 0.55, h: 0.55, fontFace: FONT, fontSize: 16, bold: true, color: COLORS.white, align: 'center', valign: 'middle' });
    slide.addText(f.title, { x: x + 0.95, y: y + 0.25, w: 2.7, h: 0.55, fontFace: FONT, fontSize: 14, bold: true, color: COLORS.ink, valign: 'middle' });
    slide.addText(f.desc, { x: x + 0.25, y: y + 0.95, w: 3.3, h: 1.2, fontFace: FONT, fontSize: 11, color: COLORS.inkLight, valign: 'top', lineSpacingMultiple: 1.25 });
  });

  addFooter(slide, 2);
}

// ═══════════════════════════════════════════════════
// SLIDE 3 - App Architecture
// ═══════════════════════════════════════════════════
{
  const slide = pptx.addSlide();
  addSlideBg(slide);
  addHeader(slide, 'App Architecture', 'How the application is structured');

  const layers = [
    { label: 'UI Layer (React + Tailwind)', desc: 'Pages: Dashboard, Email, Meeting, Tasks, Research, Chat', color: COLORS.primary, y: 1.4 },
    { label: 'Component Layer', desc: 'Sidebar, TopBar, Cards, Buttons, Forms, Loading States, Output Panels', color: COLORS.accent, y: 2.6 },
    { label: 'AI Engine Layer (TypeScript)', desc: 'emailEngine.ts, meetingEngine.ts, taskEngine.ts, researchEngine.ts, chatEngine.ts', color: COLORS.emerald, y: 3.8 },
    { label: 'Utilities', desc: 'simulateAiDelay(), generateId() - shared helpers for all features', color: COLORS.amber, y: 5.0 },
  ];

  layers.forEach(l => {
    slide.addShape('roundRect', { x: 0.8, y: l.y, w: 11.7, h: 1.0, fill: { color: COLORS.white }, line: { color: l.color, width: 2 }, rectRadius: 0.08 });
    slide.addShape('roundRect', { x: 0.8, y: l.y, w: 0.12, h: 1.0, fill: { color: l.color }, rectRadius: 0.02 });
    slide.addText(l.label, { x: 1.1, y: l.y + 0.12, w: 11, h: 0.35, fontFace: FONT, fontSize: 14, bold: true, color: COLORS.ink });
    slide.addText(l.desc, { x: 1.1, y: l.y + 0.5, w: 11, h: 0.4, fontFace: FONT, fontSize: 11, color: COLORS.inkLight });
  });

  addFooter(slide, 3);
}

// ═══════════════════════════════════════════════════
// SLIDE 4 - App.tsx Code
// ═══════════════════════════════════════════════════
{
  const slide = pptx.addSlide();
  addSlideBg(slide);
  addHeader(slide, 'Code: Main App Component (App.tsx)', 'Entry point with view routing');

  const code = `import { useState } from 'react';
import { Sidebar, type ViewId } from '@/components/layout/Sidebar';
import { TopBar } from '@/components/layout/TopBar';
import { Dashboard } from '@/pages/Dashboard';
import { EmailGenerator } from '@/pages/EmailGenerator';
import { MeetingSummarizer } from '@/pages/MeetingSummarizer';
import { TaskPlanner } from '@/pages/TaskPlanner';
import { ResearchAssistant } from '@/pages/ResearchAssistant';
import { ChatInterface } from '@/pages/ChatInterface';

function App() {
  const [activeView, setActiveView] = useState<ViewId>('dashboard');
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  const renderView = () => {
    switch (activeView) {
      case 'dashboard': return <Dashboard onNavigate={setActiveView} />;
      case 'email':     return <EmailGenerator />;
      case 'meeting':   return <MeetingSummarizer />;
      case 'tasks':     return <TaskPlanner />;
      case 'research':  return <ResearchAssistant />;
      case 'chat':      return <ChatInterface />;
      default:          return <Dashboard onNavigate={setActiveView} />;
    }
  };

  return (
    <div className="flex min-h-screen bg-ink-50">
      <Sidebar active={activeView} onSelect={setActiveView}
        mobileOpen={mobileSidebarOpen}
        onCloseMobile={() => setMobileSidebarOpen(false)} />
      <div className="flex-1 flex flex-col min-w-0">
        <TopBar active={activeView}
          onMenuClick={() => setMobileSidebarOpen(true)} />
        <main className="flex-1 overflow-y-auto scrollbar-thin">
          {renderView()}
        </main>
      </div>
    </div>
  );
}
export default App;`;

  addCodeBlock(slide, code, 0.5, 1.3, 12.3, 5.5, 9.5);
  addFooter(slide, 4);
}

// ═══════════════════════════════════════════════════
// SLIDE 5 - Sidebar Code
// ═══════════════════════════════════════════════════
{
  const slide = pptx.addSlide();
  addSlideBg(slide);
  addHeader(slide, 'Code: Sidebar Navigation (Sidebar.tsx)', 'Navigation with 6 views and mobile support');

  const code = `import { LayoutDashboard, Mail, FileText, ListChecks,
  Search, MessageSquare, Sparkles, X } from 'lucide-react';

export type ViewId = 'dashboard' | 'email' | 'meeting'
  | 'tasks' | 'research' | 'chat';

const navItems: NavItem[] = [
  { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { id: 'email',     label: 'Email Generator', icon: Mail },
  { id: 'meeting',   label: 'Meeting Summarizer', icon: FileText },
  { id: 'tasks',     label: 'Task Planner', icon: ListChecks },
  { id: 'research',  label: 'Research Assistant', icon: Search },
  { id: 'chat',      label: 'AI Chat', icon: MessageSquare },
];

export function Sidebar({ active, onSelect, mobileOpen,
  onCloseMobile }: SidebarProps) {
  return (
    <aside className="fixed lg:sticky top-0 left-0 z-40
      h-screen w-72 bg-white border-r border-ink-200/60">
      {/* Logo */}
      <div className="flex items-center gap-2.5 px-6 h-16">
        <div className="w-9 h-9 rounded-xl bg-gradient-to-br
          from-primary-500 to-primary-700">
          <Sparkles className="w-5 h-5 text-white" />
        </div>
        <h1 className="text-base font-bold text-ink-900">FlowAI</h1>
      </div>
      {/* Navigation */}
      <nav className="flex-1 px-3 py-4 space-y-1">
        {navItems.map((item) => (
          <button key={item.id}
            onClick={() => { onSelect(item.id); onCloseMobile(); }}
            className={isActive ? 'bg-primary-50 text-primary-700'
              : 'text-ink-600 hover:bg-ink-50'}>
            <item.icon className="w-4.5 h-4.5" />
            <span>{item.label}</span>
          </button>
        ))}
      </nav>
    </aside>
  );
}`;

  addCodeBlock(slide, code, 0.5, 1.3, 12.3, 5.5, 9);
  addFooter(slide, 5);
}

// ═══════════════════════════════════════════════════
// SLIDE 6 - Email Engine Code
// ═══════════════════════════════════════════════════
{
  const slide = pptx.addSlide();
  addSlideBg(slide);
  addHeader(slide, 'Code: Smart Email Engine (emailEngine.ts)', 'Structured prompt engineering for tone & audience');

  const code = `export type EmailTone = 'professional' | 'friendly' |
  'persuasive' | 'urgent' | 'apologetic' | 'appreciative';
export type EmailAudience = 'client' | 'team' | 'manager' |
  'vendor' | 'candidate' | 'stakeholder';

// Tone descriptors define the style, opening, and closing
const toneDescriptors: Record<EmailTone, {
  style: string; opening: string; closing: string
}> = {
  professional: {
    style: 'formal, clear, and business-appropriate',
    opening: 'I hope this message finds you well.',
    closing: 'Thank you for your time and consideration.',
  },
  urgent: {
    style: 'direct, action-oriented, and time-sensitive',
    opening: 'I am reaching out regarding a time-sensitive matter.',
    closing: 'Please let me know at your earliest convenience.',
  },
  // ... 4 more tones
};

// Audience context guides the writing approach
const audienceContext: Record<EmailAudience, string> = {
  client: 'a valued client - maintain customer-first tone',
  manager: 'a senior executive - be concise, results-focused',
  // ... 4 more audiences
};

export function generateEmail(input: EmailInput): EmailOutput {
  const tone = toneDescriptors[input.tone];
  const points = input.keyPoints.split('\\n').filter(Boolean);
  const subject = buildEmailSubject(input, points);
  const body = buildEmailBody(input, tone, audience, pointsList);
  return { subject, body,
    signOff: \`Best regards,\\n\${input.senderName}\` };
  };
}`;

  addCodeBlock(slide, code, 0.5, 1.3, 12.3, 5.5, 9.5);
  addFooter(slide, 6);
}

// ═══════════════════════════════════════════════════
// SLIDE 7 - Meeting Engine Code
// ═══════════════════════════════════════════════════
{
  const slide = pptx.addSlide();
  addSlideBg(slide);
  addHeader(slide, 'Code: Meeting Notes Engine (meetingEngine.ts)', 'Regex-based parsing for action items, decisions & deadlines');

  const code = `export function summarizeMeeting(input: MeetingNotesInput):
  MeetingSummary {
  const lines = input.rawNotes.split('\\n').filter(Boolean);
  const participants = input.participants.split(',').filter(Boolean);

  const { keyPoints, actionItems, decisions, deadlines } =
    parseNotes(lines, participants);

  return { title: input.meetingTitle, participants,
    summary, keyPoints, actionItems, decisions, deadlines };
}

function parseNotes(lines: string[], participants: string[]) {
  // Regex patterns to identify different note types
  const actionPatterns =
    /\\b(?:action|task|todo|follow.?up|assign|owner)\\b/i;
  const decisionPatterns =
    /\\b(?:decided|agreed|concluded|approved|finalize)\\b/i;
  const deadlinePatterns =
    /\\b(?:by|before|due|deadline:)\\s+(\\w+\\s?\\d{0,2})/i;

  for (const line of lines) {
    if (actionPatterns.test(line)) {
      actionItems.push({
        task: cleanTask(line),
        assignee: findAssignee(line, participants),
        deadline: extractDeadline(line),
        priority: inferPriority(line),  // High/Medium/Low
      });
    } else if (decisionPatterns.test(line)) {
      decisions.push(cleanTask(line));
    } else {
      keyPoints.push(line);
    }
  }
}`;

  addCodeBlock(slide, code, 0.5, 1.3, 12.3, 5.5, 9.5);
  addFooter(slide, 7);
}

// ═══════════════════════════════════════════════════
// SLIDE 8 - Task Planner Engine Code
// ═══════════════════════════════════════════════════
{
  const slide = pptx.addSlide();
  addSlideBg(slide);
  addHeader(slide, 'Code: AI Task Planner Engine (taskEngine.ts)', 'Priority inference, categorization & schedule building');

  const code = `export function planTasks(input: TaskPlannerInput): TaskPlan {
  const rawTasks = input.tasks.split('\\n').filter(Boolean);
  const planned = rawTasks.map((task, i) => analyzeTask(task, i));
  // Sort by priority: High first, then Medium, then Low
  const sorted = [...planned].sort((a, b) =>
    priorityRank(b.priority) - priorityRank(a.priority));

  const schedule = buildSchedule(sorted, input.workingHours);
  const totalMinutes = sorted.reduce((sum, t) =>
    sum + parseMinutes(t.estimatedTime), 0);

  return { tasks: sorted, schedule,
    totalEstimatedTime: formatMinutes(totalMinutes),
    recommendations: buildRecommendations(sorted, input) };
}

function inferPriority(lower: string): TaskPriority {
  if (/\\b(?:urgent|critical|asap|blocker|deadline)\\b/i.test(lower))
    return 'High';
  if (/\\b(?:eventually|low priority|optional)\\b/i.test(lower))
    return 'Low';
  return 'Medium';
}

function inferCategory(lower: string): TaskCategory {
  if (/\\b(?:strategy|vision|roadmap|goal)\\b/i.test(lower))
    return 'Strategic';
  if (/\\b(?:email|call|meet|communicate)\\b/i.test(lower))
    return 'Communication';
  if (/\\b(?:review|audit|analyze|report)\\b/i.test(lower))
    return 'Review';
  return 'Operational';
}`;

  addCodeBlock(slide, code, 0.5, 1.3, 12.3, 5.5, 9.5);
  addFooter(slide, 8);
}

// ═══════════════════════════════════════════════════
// SLIDE 9 - Research Engine Code
// ═══════════════════════════════════════════════════
{
  const slide = pptx.addSlide();
  addSlideBg(slide);
  addHeader(slide, 'Code: Research Assistant Engine (researchEngine.ts)', 'Theme extraction, insight generation & recommendations');

  const code = `export function researchTopic(input: ResearchInput):
  ResearchSummary {
  const questions = input.questions.split('\\n').filter(Boolean);
  const topic = input.topic.trim();

  const themes = extractThemes(topic, questions);
  const keyInsights = buildInsights(topic, questions,
    input.depth, themes);
  const executiveSummary = buildExecSummary(topic,
    keyInsights, input.depth);
  const recommendations = buildRecommendations(topic, themes);
  const furtherQuestions = buildFurtherQuestions(topic);

  const confidence = input.depth === 'Deep Dive' ? 'High'
    : input.depth === 'Standard' ? 'Medium' : 'Exploratory';

  return { topic, executiveSummary, keyInsights, themes,
    recommendations, furtherQuestions, confidence };
}

function extractThemes(topic: string, questions: string[]) {
  const themes: string[] = [];
  if (/\\b(?:market|industry|competitor|trend)\\b/i.test(topic))
    themes.push('Market Landscape');
  if (/\\b(?:ai|technology|software|automation)\\b/i.test(topic))
    themes.push('Technology & Innovation');
  if (/\\b(?:finance|revenue|budget|roi)\\b/i.test(topic))
    themes.push('Financial Impact');
  // Falls back to default themes if none matched
  if (themes.length === 0)
    themes.push('Core Analysis', 'Strategic Implications');
  return themes.slice(0, 5);
}`;

  addCodeBlock(slide, code, 0.5, 1.3, 12.3, 5.5, 9.5);
  addFooter(slide, 9);
}

// ═══════════════════════════════════════════════════
// SLIDE 10 - Chat Engine Code
// ═══════════════════════════════════════════════════
{
  const slide = pptx.addSlide();
  addSlideBg(slide);
  addHeader(slide, 'Code: AI Chatbot Engine (chatEngine.ts)', 'Keyword-based knowledge base with fallback responses');

  const code = `const KNOWLEDGE_BASE: {
  keywords: string[];
  response: (input: string) => string
}[] = [
  {
    keywords: ['email', 'draft', 'write email', 'compose'],
    response: (input) => \`Here is how I can help with email:
1. Use the Smart Email Generator in the sidebar
2. Quick guidance for email writing:
   - Start with a clear subject line
   - Open with context in the first sentence
   - Use bullet points for multiple items
   - End with a specific call-to-action\`,
  },
  {
    keywords: ['task', 'priority', 'schedule', 'plan'],
    response: (input) => \`For task planning, the AI Task Planner
will: prioritize, categorize, estimate time, schedule,
and recommend productivity strategies.\`,
  },
  // ... 4 more knowledge entries
];

export function generateChatResponse(userInput: string) {
  const lower = userInput.toLowerCase();
  for (const entry of KNOWLEDGE_BASE) {
    if (entry.keywords.some((kw) => lower.includes(kw))) {
      return { content: entry.response(userInput),
        suggestions: SUGGESTIONS.slice(0, 3) };
    }
  }
  return { content: FALLBACK_RESPONSE(userInput),
    suggestions: SUGGESTIONS.slice(0, 3) };
}`;

  addCodeBlock(slide, code, 0.5, 1.3, 12.3, 5.5, 9.5);
  addFooter(slide, 10);
}

// ═══════════════════════════════════════════════════
// SLIDE 11 - Email Generator Page Code
// ═══════════════════════════════════════════════════
{
  const slide = pptx.addSlide();
  addSlideBg(slide);
  addHeader(slide, 'Code: Email Generator Page (EmailGenerator.tsx)', 'React component with form inputs, loading & output states');

  const code = `export function EmailGenerator() {
  const [topic, setTopic] = useState('');
  const [tone, setTone] = useState<EmailTone>('professional');
  const [audience, setAudience] = useState<EmailAudience>('client');
  const [keyPoints, setKeyPoints] = useState('');
  const [loading, setLoading] = useState(false);
  const [output, setOutput] = useState<EmailOutput | null>(null);

  const canGenerate = topic.trim().length > 0;

  const handleGenerate = async () => {
    if (!canGenerate) return;
    setLoading(true);
    setOutput(null);
    await simulateAiDelay();  // Simulate AI processing time
    const result = generateEmail(
      { topic, tone, audience, keyPoints,
        senderName, senderRole });
    setOutput(result);
    setLoading(false);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Input Panel with form fields */}
      <TextInput value={topic} onChange={setTopic} />
      <Select value={tone} options={tones} />
      <Select value={audience} options={audiences} />
      <TextArea value={keyPoints} rows={5} />
      <Button onClick={handleGenerate}
        disabled={!canGenerate || loading}>
        {loading ? 'Generating...' : 'Generate Email'}
      </Button>

      {/* Output Panel with loading/empty/result states */}
      {loading ? <LoadingState message="Crafting email..." />
       : output ? <OutputPanel title="Email Body"
                    onCopy={copyText}>
                   {output.body}
                 </OutputPanel>
       : <EmptyState icon={Mail} />}
    </div>
  );
}`;

  addCodeBlock(slide, code, 0.5, 1.3, 12.3, 5.5, 9.5);
  addFooter(slide, 11);
}

// ═══════════════════════════════════════════════════
// SLIDE 12 - Challenges Part 1
// ═══════════════════════════════════════════════════
{
  const slide = pptx.addSlide();
  addSlideBg(slide);
  addHeader(slide, 'Challenges of Using AI Productivity Tools (1/2)', 'What users should be aware of');

  const challenges = [
    {
      title: '1. AI Output Quality Is Not Guaranteed',
      desc: 'AI-generated emails, summaries, and research may contain errors, wrong facts, or unclear language. A human must always review and fix the output before using it.',
      color: COLORS.red,
    },
    {
      title: '2. Over-Reliance on AI',
      desc: 'If users trust AI too much, they may stop thinking critically. This can lead to poor decisions, missed details, and lower quality work over time.',
      color: COLORS.amber,
    },
    {
      title: '3. Privacy and Data Security',
      desc: 'Users may enter sensitive company information, client names, or internal plans into the tool. If the data is stored or sent to external servers, it could be leaked or misused.',
      color: COLORS.violet,
    },
  ];

  challenges.forEach((c, i) => {
    const y = 1.35 + i * 1.85;
    slide.addShape('roundRect', { x: 0.6, y, w: 12.1, h: 1.65, fill: { color: COLORS.white }, line: { color: COLORS.border, width: 1 }, rectRadius: 0.08 });
    slide.addShape('roundRect', { x: 0.6, y, w: 0.1, h: 1.65, fill: { color: c.color }, rectRadius: 0.02 });
    slide.addText(c.title, { x: 0.9, y: y + 0.15, w: 11.5, h: 0.4, fontFace: FONT, fontSize: 15, bold: true, color: COLORS.ink });
    slide.addText(c.desc, { x: 0.9, y: y + 0.6, w: 11.5, h: 0.95, fontFace: FONT, fontSize: 12, color: COLORS.inkLight, lineSpacingMultiple: 1.3, valign: 'top' });
  });

  addFooter(slide, 12);
}

// ═══════════════════════════════════════════════════
// SLIDE 13 - Challenges Part 2
// ═══════════════════════════════════════════════════
{
  const slide = pptx.addSlide();
  addSlideBg(slide);
  addHeader(slide, 'Challenges of Using AI Productivity Tools (2/2)', 'What users should be aware of');

  const challenges = [
    {
      title: '4. Tone and Context Misunderstanding',
      desc: 'AI may not fully understand the context of a situation. An email that should sound urgent might sound too soft, or a summary might miss the main point of a meeting.',
      color: COLORS.amber,
    },
    {
      title: '5. Generic or Repetitive Output',
      desc: 'Without a real LLM backend, the AI engine uses templates and patterns. This means outputs can feel similar or generic, especially when used many times.',
      color: COLORS.accent,
    },
    {
      title: '6. Integration with Real Workflows',
      desc: 'The app is a prototype. It does not connect to real email, calendar, or task management systems. Users must copy and paste results into their actual tools.',
      color: COLORS.primary,
    },
    {
      title: '7. Need for Human Review',
      desc: 'Every output includes a disclaimer: "AI-generated content may require human review." Users must verify accuracy, tone, and appropriateness before using any output.',
      color: COLORS.emerald,
    },
  ];

  challenges.forEach((c, i) => {
    const col = i % 2;
    const row = Math.floor(i / 2);
    const x = 0.6 + col * 6.15;
    const y = 1.35 + row * 2.75;

    slide.addShape('roundRect', { x, y, w: 5.9, h: 2.5, fill: { color: COLORS.white }, line: { color: COLORS.border, width: 1 }, rectRadius: 0.08 });
    slide.addShape('roundRect', { x, y, w: 5.9, h: 0.08, fill: { color: c.color }, rectRadius: 0.02 });
    slide.addText(c.title, { x: x + 0.25, y: y + 0.2, w: 5.4, h: 0.4, fontFace: FONT, fontSize: 13, bold: true, color: COLORS.ink });
    slide.addText(c.desc, { x: x + 0.25, y: y + 0.7, w: 5.4, h: 1.7, fontFace: FONT, fontSize: 11, color: COLORS.inkLight, lineSpacingMultiple: 1.3, valign: 'top' });
  });

  addFooter(slide, 13);
}

// ═══════════════════════════════════════════════════
// SLIDE 14 - Tech Stack
// ═══════════════════════════════════════════════════
{
  const slide = pptx.addSlide();
  addSlideBg(slide);
  addHeader(slide, 'Technology Stack', 'Tools and libraries used to build FlowAI');

  const stack = [
    { name: 'React 18', role: 'User interface framework', color: '61DAFB' },
    { name: 'TypeScript', role: 'Type-safe JavaScript', color: '3178C6' },
    { name: 'Tailwind CSS 3', role: 'Utility-first styling', color: '06B6D4' },
    { name: 'Lucide React', role: 'Icon library', color: '000000' },
    { name: 'Vite 5', role: 'Build tool & dev server', color: '646CFF' },
    { name: 'pptxgenjs', role: 'PowerPoint generation', color: 'F59E0B' },
  ];

  stack.forEach((s, i) => {
    const col = i % 3;
    const row = Math.floor(i / 3);
    const x = 0.6 + col * 4.1;
    const y = 1.5 + row * 2.5;

    slide.addShape('roundRect', { x, y, w: 3.8, h: 2.1, fill: { color: COLORS.white }, line: { color: COLORS.border, width: 1 }, rectRadius: 0.1 });
    slide.addShape('ellipse', { x: x + 0.3, y: y + 0.3, w: 0.7, h: 0.7, fill: { color: s.color } });
    slide.addText(s.name[0], { x: x + 0.3, y: y + 0.3, w: 0.7, h: 0.7, fontFace: FONT, fontSize: 18, bold: true, color: COLORS.white, align: 'center', valign: 'middle' });
    slide.addText(s.name, { x: x + 1.15, y: y + 0.3, w: 2.5, h: 0.4, fontFace: FONT, fontSize: 15, bold: true, color: COLORS.ink, valign: 'middle' });
    slide.addText(s.role, { x: x + 1.15, y: y + 0.75, w: 2.5, h: 0.35, fontFace: FONT, fontSize: 11, color: COLORS.inkLight, valign: 'middle' });
  });

  addFooter(slide, 14);
}

// ═══════════════════════════════════════════════════
// SLIDE 15 - Summary / Thank You
// ═══════════════════════════════════════════════════
{
  const slide = pptx.addSlide();
  slide.background = { color: COLORS.primary };
  slide.addShape('ellipse', { x: -2, y: -2, w: 7, h: 7, fill: { color: '1E40AF', transparency: 50 } });
  slide.addShape('ellipse', { x: 9, y: 3, w: 6, h: 6, fill: { color: '06B6D4', transparency: 70 } });

  slide.addText('Summary', {
    x: 1, y: 0.8, w: 11, h: 0.7,
    fontFace: FONT, fontSize: 36, bold: true, color: COLORS.white,
    align: 'center',
  });

  const points = [
    'FlowAI is a complete web app with 5 AI-powered productivity tools',
    'Built with React, TypeScript, Tailwind CSS, and Lucide icons',
    'Each tool uses structured prompt engineering for clear output',
    'Loading states, responsive design, and disclaimers are included',
    'Challenges include output quality, privacy, and over-reliance on AI',
    'Human review is always required before using AI-generated content',
  ];

  points.forEach((p, i) => {
    slide.addShape('ellipse', { x: 2.5, y: 1.9 + i * 0.7, w: 0.25, h: 0.25, fill: { color: COLORS.accent } });
    slide.addText(p, {
      x: 3.0, y: 1.8 + i * 0.7, w: 8, h: 0.5,
      fontFace: FONT, fontSize: 15, color: 'DBEAFE',
      valign: 'middle',
    });
  });

  slide.addShape('rect', { x: 5.16, y: 6.2, w: 3, h: 0.04, fill: { color: COLORS.accent } });
  slide.addText('Thank You', {
    x: 1, y: 6.35, w: 11, h: 0.6,
    fontFace: FONT, fontSize: 28, bold: true, color: COLORS.white,
    align: 'center',
  });
  slide.addText('FlowAI - AI Workplace Productivity Assistant', {
    x: 1, y: 6.95, w: 11, h: 0.35,
    fontFace: FONT, fontSize: 12, color: '93C5FD',
    align: 'center',
  });
}

// ═══════════════════════════════════════════════════
// Generate
// ═══════════════════════════════════════════════════
const outPath = process.cwd() + '/FlowAI_Presentation.pptx';
pptx.writeFile({ fileName: outPath }).then(() => {
  console.log('Presentation saved to: ' + outPath);
}).catch(err => {
  console.error('Error:', err);
  process.exit(1);
});
