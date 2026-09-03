export interface MeetingNotesInput {
  rawNotes: string;
  meetingTitle: string;
  participants: string;
}

export interface MeetingActionItem {
  task: string;
  assignee: string;
  deadline: string;
  priority: 'High' | 'Medium' | 'Low';
}

export interface MeetingSummary {
  title: string;
  participants: string[];
  summary: string;
  keyPoints: string[];
  actionItems: MeetingActionItem[];
  decisions: string[];
  deadlines: string[];
}

export function summarizeMeeting(input: MeetingNotesInput): MeetingSummary {
  const lines = input.rawNotes
    .split('\n')
    .map((l) => l.trim())
    .filter(Boolean);

  const participants = input.participants
    .split(/[,\n]/)
    .map((p) => p.trim())
    .filter(Boolean);

  const { keyPoints, actionItems, decisions, deadlines } = parseNotes(lines, participants);

  const summary = buildSummary(input.meetingTitle, keyPoints, actionItems, lines);

  return {
    title: input.meetingTitle || 'Untitled Meeting',
    participants,
    summary,
    keyPoints,
    actionItems,
    decisions,
    deadlines,
  };
}

function parseNotes(lines: string[], participants: string[]) {
  const keyPoints: string[] = [];
  const actionItems: MeetingActionItem[] = [];
  const decisions: string[] = [];
  const deadlines: string[] = [];

  const actionPatterns = /\b(?:action|task|todo|follow.?up|assign|owner|responsible)\b/i;
  const decisionPatterns = /\b(?:decided|agreed|concluded|approved|resolution|finalize)\b/i;
  const deadlinePatterns = /\b(?:by|before|due|deadline|deadline:|before:)\s+(\w+\s?\d{0,2}(?:st|nd|rd|th)?|\w+|\d{1,2}\/\d{1,2})/i;

  for (const line of lines) {
    const lower = line.toLowerCase();

    if (actionPatterns.test(lower)) {
      const assignee = findAssignee(line, participants);
      const deadlineMatch = line.match(deadlinePatterns);
      const deadline = deadlineMatch ? deadlineMatch[1] : 'Next meeting';
      const priority = inferPriority(line);
      actionItems.push({
        task: cleanTask(line),
        assignee: assignee || 'Unassigned',
        deadline,
        priority,
      });
      if (deadlineMatch && deadlineMatch[1]) deadlines.push(deadlineMatch[1]);
    } else if (decisionPatterns.test(lower)) {
      decisions.push(cleanTask(line));
    } else {
      keyPoints.push(line);
    }
  }

  if (keyPoints.length === 0 && lines.length > 0) {
    keyPoints.push(...lines.slice(0, 5));
  }

  return { keyPoints, actionItems, decisions, deadlines };
}

function findAssignee(line: string, participants: string[]): string {
  for (const p of participants) {
    if (line.toLowerCase().includes(p.toLowerCase())) return p;
  }
  const assigneeMatch = line.match(/(?:assign(?:ed)? to|owner:|responsible:?)\s*[:\-]?\s*([A-Z][a-z]+)/i);
  if (assigneeMatch) return assigneeMatch[1];
  return '';
}

function inferPriority(line: string): 'High' | 'Medium' | 'Low' {
  const lower = line.toLowerCase();
  if (/\b(?:urgent|critical|asap|immediately|high priority|blocker)\b/i.test(lower)) return 'High';
  if (/\b(?:eventually|low priority|when possible|nice to have)\b/i.test(lower)) return 'Low';
  return 'Medium';
}

function cleanTask(line: string): string {
  return line
    .replace(/^\s*[-•*\d+.]+\s*/, '')
    .replace(/\s+/g, ' ')
    .trim();
}

function buildSummary(title: string, keyPoints: string[], actionItems: MeetingActionItem[], lines: string[]): string {
  const topicCount = keyPoints.length;
  const actionCount = actionItems.length;
  const highCount = actionItems.filter((a) => a.priority === 'High').length;

  return `This ${title ? `"${title}"` : 'meeting'} covered ${topicCount} key topic${topicCount !== 1 ? 's' : ''} with ${actionCount} action item${actionCount !== 1 ? 's' : ''} identified${highCount > 0 ? `, ${highCount} of which are high priority` : ''}. The discussion ${keyPoints.length > 0 ? 'centered on ' + keyPoints[0].toLowerCase().replace(/[.!?]$/, '') : 'covered several topics'}. All participants are aligned on next steps and deliverables.`;
}
