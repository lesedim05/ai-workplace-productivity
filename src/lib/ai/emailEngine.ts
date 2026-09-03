export type EmailTone = 'professional' | 'friendly' | 'persuasive' | 'urgent' | 'apologetic' | 'appreciative';
export type EmailAudience = 'client' | 'team' | 'manager' | 'vendor' | 'candidate' | 'stakeholder';

export interface EmailInput {
  topic: string;
  tone: EmailTone;
  audience: EmailAudience;
  keyPoints: string;
  senderName: string;
  senderRole: string;
}

export interface EmailOutput {
  subject: string;
  body: string;
  signOff: string;
}

const toneDescriptors: Record<EmailTone, { style: string; opening: string; closing: string }> = {
  professional: {
    style: 'formal, clear, and business-appropriate',
    opening: 'I hope this message finds you well.',
    closing: 'Thank you for your time and consideration.',
  },
  friendly: {
    style: 'warm, approachable, and conversational while remaining professional',
    opening: 'Hope you are having a great day!',
    closing: 'Looking forward to hearing from you.',
  },
  persuasive: {
    style: 'compelling and benefit-focused, emphasizing value and urgency',
    opening: 'I wanted to reach out because I believe there is a meaningful opportunity worth discussing.',
    closing: 'I would welcome the chance to explore this further at your convenience.',
  },
  urgent: {
    style: 'direct, action-oriented, and time-sensitive',
    opening: 'I am reaching out regarding a time-sensitive matter that requires prompt attention.',
    closing: 'Please let me know your thoughts at your earliest convenience.',
  },
  apologetic: {
    style: 'empathetic, accountable, and solution-oriented',
    opening: 'I wanted to personally reach out and acknowledge the situation at hand.',
    closing: 'Thank you for your understanding and patience.',
  },
  appreciative: {
    style: 'grateful, positive, and relationship-strengthening',
    opening: 'I wanted to take a moment to express my sincere appreciation.',
    closing: 'Thank you once again for your continued partnership.',
  },
};

const audienceContext: Record<EmailAudience, string> = {
  client: 'a valued client — maintain a customer-first tone that reinforces trust and partnership',
  team: 'an internal team member — be collaborative, clear, and aligned on next steps',
  manager: 'a senior manager or executive — be concise, results-focused, and highlight key outcomes',
  vendor: 'an external vendor or partner — be clear about expectations and deliverables',
  candidate: 'a job candidate — be welcoming, informative, and professional',
  stakeholder: 'a key stakeholder — be strategic, data-informed, and focused on business impact',
};

export function generateEmail(input: EmailInput): EmailOutput {
  const tone = toneDescriptors[input.tone];
  const audience = audienceContext[input.audience];
  const points = input.keyPoints
    .split('\n')
    .map((p) => p.trim())
    .filter(Boolean);

  const pointsList = points.length > 1
    ? points.map((p) => `  • ${p}`).join('\n')
    : points[0] || input.topic;

  const subject = buildEmailSubject(input, points);
  const body = buildEmailBody(input, tone, audience, pointsList);

  return {
    subject,
    body,
    signOff: `Best regards,\n${input.senderName || 'Your Name'}\n${input.senderRole || 'Your Title'}`,
  };
}

function buildEmailSubject(input: EmailInput, points: string[]): string {
  const topic = input.topic.trim();
  if (input.tone === 'urgent') return `Action Required: ${topic}`;
  if (input.tone === 'appreciative') return `Thank You — ${topic}`;
  if (input.tone === 'apologetic') return `Regarding ${topic} — Update & Next Steps`;
  if (input.audience === 'manager') return `${topic} — Summary & Recommendations`;
  if (input.audience === 'client') return `${topic} — Update from ${input.senderName || 'Our Team'}`;
  return topic;
}

function buildEmailBody(
  input: EmailInput,
  tone: { style: string; opening: string; closing: string },
  audience: string,
  pointsList: string,
): string {
  const greeting = `Dear ${audienceGreeting(input.audience)},`;
  const context = `I am writing to you regarding ${input.topic.toLowerCase()}.`;
  const keyPointsBlock = input.keyPoints.trim()
    ? `\nHere are the key points I would like to address:\n${pointsList}\n`
    : '';
  const callToAction = buildCallToAction(input.tone);

  return [
    greeting,
    '',
    tone.opening,
    '',
    context,
    keyPointsBlock,
    callToAction,
    '',
    tone.closing,
  ]
    .filter(Boolean)
    .join('\n');
}

function audienceGreeting(audience: EmailAudience): string {
  const greetings: Record<EmailAudience, string> = {
    client: 'Valued Client',
    team: 'Team',
    manager: 'Team',
    vendor: 'Partner',
    candidate: 'Candidate',
    stakeholder: 'Stakeholder',
  };
  return greetings[audience];
}

function buildCallToAction(tone: EmailTone): string {
  const ctas: Record<EmailTone, string> = {
    professional: 'Please let me know if you have any questions or would like to discuss this further.',
    friendly: 'Feel free to reply here or grab some time on my calendar — happy to chat!',
    persuasive: 'I would be happy to walk you through the details and answer any questions you may have.',
    urgent: 'Given the timeline, I would appreciate your input by end of day so we can proceed accordingly.',
    apologetic: 'I have outlined the steps we are taking to address this and would value your feedback.',
    appreciative: 'I look forward to continuing our collaboration and achieving great results together.',
  };
  return ctas[tone];
}
