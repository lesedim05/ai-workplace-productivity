export interface ResearchInput {
  topic: string;
  questions: string;
  depth: 'Overview' | 'Standard' | 'Deep Dive';
}

export interface ResearchInsight {
  title: string;
  detail: string;
  relevance: string;
}

export interface ResearchSummary {
  topic: string;
  executiveSummary: string;
  keyInsights: ResearchInsight[];
  themes: string[];
  recommendations: string[];
  furtherQuestions: string[];
  confidence: 'High' | 'Medium' | 'Exploratory';
}

export function researchTopic(input: ResearchInput): ResearchSummary {
  const questions = input.questions
    .split('\n')
    .map((q) => q.trim())
    .filter(Boolean);

  const topic = input.topic.trim();
  const themes = extractThemes(topic, questions);
  const keyInsights = buildInsights(topic, questions, input.depth, themes);
  const executiveSummary = buildExecSummary(topic, keyInsights, input.depth);
  const recommendations = buildRecommendations(topic, themes);
  const furtherQuestions = buildFurtherQuestions(topic, questions, themes);
  const confidence = input.depth === 'Deep Dive' ? 'High' : input.depth === 'Standard' ? 'Medium' : 'Exploratory';

  return {
    topic,
    executiveSummary,
    keyInsights,
    themes,
    recommendations,
    furtherQuestions,
    confidence,
  };
}

function extractThemes(topic: string, questions: string[]): string[] {
  const themes: string[] = [];
  const lowerTopic = topic.toLowerCase();

  if (/\b(?:market|industry|competitor|trend)\b/i.test(lowerTopic)) themes.push('Market Landscape');
  if (/\b(?:ai|machine learning|ml|technology|software|automation)\b/i.test(lowerTopic)) themes.push('Technology & Innovation');
  if (/\b(?:customer|user|experience|product)\b/i.test(lowerTopic)) themes.push('Customer & Product');
  if (/\b(?:finance|revenue|cost|budget|roi|investment)\b/i.test(lowerTopic)) themes.push('Financial Impact');
  if (/\b(?:team|org|people|hiring|culture)\b/i.test(lowerTopic)) themes.push('Organizational');
  if (/\b(?:risk|compliance|security|regulation)\b/i.test(lowerTopic)) themes.push('Risk & Compliance');

  if (themes.length === 0) themes.push('Core Analysis', 'Strategic Implications', 'Practical Application');

  for (const q of questions.slice(0, 2)) {
    const shortQ = q.length > 40 ? q.slice(0, 40) + '…' : q;
    if (!themes.includes(shortQ)) themes.push(shortQ);
  }

  return themes.slice(0, 5);
}

function buildInsights(topic: string, questions: string[], depth: string, themes: string[]): ResearchInsight[] {
  const insights: ResearchInsight[] = [];
  const insightCount = depth === 'Deep Dive' ? 5 : depth === 'Standard' ? 4 : 3;

  const templates = [
    {
      title: `Foundational Understanding of ${topic}`,
      detail: `${topic} represents a significant area of consideration that spans multiple dimensions. At its core, it involves understanding the interplay between key factors and their downstream effects on outcomes.`,
      relevance: 'Establishes the baseline context necessary for informed decision-making.',
    },
    {
      title: `Current State & Key Dynamics`,
      detail: `The landscape surrounding ${topic} is characterized by evolving patterns and emerging signals. Several factors are converging to shape the trajectory, creating both opportunities and considerations for stakeholders.`,
      relevance: 'Highlights what is happening now and why it matters for your objectives.',
    },
    {
      title: `Strategic Implications`,
      detail: `From a strategic perspective, ${topic} carries implications that extend beyond the immediate horizon. Organizations engaging with this area should consider both short-term actions and long-term positioning.`,
      relevance: 'Connects findings to actionable strategy and planning.',
    },
    {
      title: `Practical Applications & Use Cases`,
      detail: `Practical engagement with ${topic} can take several forms. Common approaches include phased implementation, pilot initiatives, and iterative refinement based on feedback loops.`,
      relevance: 'Translates insight into concrete next steps and operational guidance.',
    },
    {
      title: `Risks & Considerations`,
      detail: `While ${topic} presents clear opportunities, it is important to acknowledge potential risks including resource constraints, adoption challenges, and the need for ongoing evaluation.`,
      relevance: 'Ensures balanced assessment and proactive risk management.',
    },
  ];

  for (let i = 0; i < insightCount && i < templates.length; i++) {
    insights.push(templates[i]);
  }

  if (questions.length > 0) {
    const qInsight: ResearchInsight = {
      title: `Addressing Your Specific Questions`,
      detail: `Your questions touch on ${questions.length} key area${questions.length !== 1 ? 's' : ''}. The analysis above provides a framework for approaching each, with themes of ${themes.slice(0, 2).join(' and ')} being most directly relevant.`,
      relevance: 'Directly maps the research to your stated inquiry areas.',
    };
    insights.push(qInsight);
  }

  return insights;
}

function buildExecSummary(topic: string, insights: ResearchInsight[], depth: string): string {
  return `This ${depth.toLowerCase()} analysis of "${topic}" synthesizes ${insights.length} key insights across multiple dimensions. The findings suggest that ${topic.toLowerCase()} is a multifaceted area warranting structured engagement. The research identifies clear themes, practical recommendations, and areas for further exploration. Decision-makers should approach ${topic.toLowerCase()} with both strategic intent and operational pragmatism, balancing ambition with realistic execution pathways.`;
}

function buildRecommendations(topic: string, themes: string[]): string[] {
  return [
    `Begin with a focused assessment of ${topic} scoped to your most immediate objective.`,
    `Establish clear success metrics before committing significant resources.`,
    `Adopt an iterative approach — start small, measure, and scale what works.`,
    `Engage key stakeholders early to align on priorities and expectations.`,
    `Document findings and revisit the analysis as the landscape evolves.`,
  ];
}

function buildFurtherQuestions(topic: string, questions: string[], themes: string[]): string[] {
  const further: string[] = [
    `What are the specific success criteria for engaging with ${topic}?`,
    `Who are the key stakeholders that should be involved in this initiative?`,
    `What resources (time, budget, expertise) are available to act on these findings?`,
    `How will progress be measured and over what timeframe?`,
  ];
  return further;
}
