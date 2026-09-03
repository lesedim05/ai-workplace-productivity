export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: number;
}

export interface ChatResponse {
  content: string;
  suggestions: string[];
}

const SYSTEM_CONTEXT = `You are FlowAI, an AI workplace productivity assistant. You help professionals with:
- Email drafting and communication
- Meeting preparation and follow-up
- Task prioritization and time management
- Research and information synthesis
- General productivity advice

Always be professional, concise, and actionable. Structure responses with clear formatting when appropriate.`;

const KNOWLEDGE_BASE: { keywords: string[]; response: (input: string) => string }[] = [
  {
    keywords: ['email', 'draft', 'write email', 'compose'],
    response: (input) => `Here is how I can help with email:

1. **Use the Smart Email Generator** in the sidebar — it produces a complete, structured email with subject line, body, and sign-off based on your tone, audience, and key points.

2. **Quick guidance for email writing:**
   • Start with a clear subject line that signals the email's purpose
   • Open with context in the first sentence
   • Use bullet points for multiple items
   • End with a specific call-to-action
   • Keep it under 150 words for routine emails

Would you like me to help you draft a specific email? Just describe the topic and audience.`,
  },
  {
    keywords: ['meeting', 'notes', 'summarize', 'minutes', 'agenda'],
    response: (input) => `For meeting notes, I recommend using the **Meeting Notes Summarizer** feature. Here is what it produces:

• **Executive Summary** — a concise overview of the meeting
• **Key Points** — the main discussion topics
• **Action Items** — tasks with assignees, deadlines, and priority
• **Decisions** — what was agreed upon
• **Deadlines** — all time-bound commitments

**Best practices for meeting notes:**
- Capture decisions and action items verbatim
- Note who said what for accountability
- Flag anything with a deadline explicitly

Paste your raw notes into the Summarizer and I will structure them for you.`,
  },
  {
    keywords: ['task', 'priority', 'schedule', 'plan', 'time management', 'productivity'],
    response: (input) => `For task planning, the **AI Task Planner** is your best tool. It will:

1. **Prioritize** each task (High / Medium / Low) based on urgency signals
2. **Categorize** tasks (Strategic, Operational, Communication, Planning, Review)
3. **Estimate** time needed for each
4. **Schedule** tasks into your working hours with suggested time slots
5. **Recommend** productivity strategies

**Key principles I apply:**
- High-priority + strategic work goes in your morning deep work block
- Communication tasks are batched together
- Breaks are scheduled to prevent burnout

List your tasks and I will build an optimized plan.`,
  },
  {
    keywords: ['research', 'analyze', 'investigate', 'study', 'understand'],
    response: (input) => `The **AI Research Assistant** can help you explore any topic. It provides:

• **Executive Summary** — the big picture
• **Key Insights** — structured findings with relevance notes
• **Themes** — the main dimensions of the topic
• **Recommendations** — actionable next steps
• **Further Questions** — areas worth deeper exploration

Choose your depth: Overview, Standard, or Deep Dive.

What topic would you like to research?`,
  },
  {
    keywords: ['stress', 'overwhelm', 'burnout', 'too much', 'busy', 'overload'],
    response: (input) => `It sounds like you are dealing with a heavy workload. Here are some immediate strategies:

1. **Triage now** — List everything on your plate and use the AI Task Planner to prioritize
2. **Time-block** — Assign specific windows to specific task types
3. **Single-task** — Multitasking reduces productivity by up to 40%
4. **Protect deep work** — Block 90-minute focus sessions for your hardest tasks
5. **Learn to say "not right now"** — Defer non-urgent items explicitly

Would you like me to help you build a prioritized plan from your current task list?`,
  },
  {
    keywords: ['hello', 'hi', 'hey', 'help', 'what can you do', 'who are you'],
    response: (input) => `Hello! I am **FlowAI**, your AI Workplace Productivity Assistant. Here is what I can help you with:

📧 **Smart Email Generator** — Draft professional emails with the right tone for any audience
📝 **Meeting Notes Summarizer** — Turn raw notes into structured summaries with action items
📋 **AI Task Planner** — Prioritize and schedule your tasks intelligently
🔍 **AI Research Assistant** — Get structured insights on any topic
💬 **AI Chat** — Ask me anything about productivity and workplace best practices

What would you like to work on today?`,
  },
];

const FALLBACK_RESPONSE = (input: string): string => {
  return `I understand you are asking about "${input.slice(0, 100)}". 

Here are a few ways I can help:

1. **If this is about communication**, try the Smart Email Generator to draft a polished email.
2. **If this is about a meeting**, paste your notes into the Meeting Notes Summarizer.
3. **If this is about planning**, use the AI Task Planner to prioritize and schedule.
4. **If this is about a topic**, the Research Assistant can provide structured insights.

You can also ask me directly about productivity strategies, time management, or workplace best practices. What would be most useful?`;
};

const SUGGESTIONS = [
  'Help me prioritize my tasks',
  'Draft a follow-up email',
  'Summarize my meeting notes',
  'Research a topic for me',
  'Tips for managing workload',
];

export function generateChatResponse(userInput: string): ChatResponse {
  const lower = userInput.toLowerCase();

  for (const entry of KNOWLEDGE_BASE) {
    if (entry.keywords.some((kw) => lower.includes(kw))) {
      return {
        content: entry.response(userInput),
        suggestions: SUGGESTIONS.slice(0, 3),
      };
    }
  }

  return {
    content: FALLBACK_RESPONSE(userInput),
    suggestions: SUGGESTIONS.slice(0, 3),
  };
}

export function getInitialSuggestions(): string[] {
  return [
    'What can you help me with?',
    'How do I write a better email?',
    'Tips for managing a heavy workload',
    'How should I prioritize my day?',
  ];
}

export { SYSTEM_CONTEXT };
