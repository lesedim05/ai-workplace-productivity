export type TaskPriority = 'High' | 'Medium' | 'Low';
export type TaskCategory = 'Strategic' | 'Operational' | 'Communication' | 'Planning' | 'Review';

export interface TaskPlannerInput {
  tasks: string;
  workingHours: string;
  deadline: string;
  focus: string;
}

export interface PlannedTask {
  id: string;
  name: string;
  priority: TaskPriority;
  category: TaskCategory;
  estimatedTime: string;
  suggestedSlot: string;
  rationale: string;
  dependencies: string;
}

export interface TaskPlan {
  tasks: PlannedTask[];
  schedule: ScheduleBlock[];
  totalEstimatedTime: string;
  recommendations: string[];
}

export interface ScheduleBlock {
  time: string;
  task: string;
  type: 'Deep Work' | 'Collaboration' | 'Admin' | 'Review' | 'Break';
}

export function planTasks(input: TaskPlannerInput): TaskPlan {
  const rawTasks = input.tasks
    .split('\n')
    .map((t) => t.trim())
    .filter(Boolean);

  const planned = rawTasks.map((task, i) => analyzeTask(task, i, input));
  const sorted = [...planned].sort((a, b) => priorityRank(b.priority) - priorityRank(a.priority));

  const schedule = buildSchedule(sorted, input.workingHours);
  const totalMinutes = sorted.reduce((sum, t) => sum + parseMinutes(t.estimatedTime), 0);
  const totalEstimatedTime = formatMinutes(totalMinutes);

  const recommendations = buildRecommendations(sorted, input);

  return {
    tasks: sorted,
    schedule,
    totalEstimatedTime,
    recommendations,
  };
}

function analyzeTask(task: string, index: number, input: TaskPlannerInput): PlannedTask {
  const lower = task.toLowerCase();
  const priority = inferPriority(lower, index, input);
  const category = inferCategory(lower);
  const estimatedTime = estimateTime(task);
  const suggestedSlot = suggestSlot(priority, category, input.workingHours);
  const rationale = buildRationale(task, priority, category, input);
  const dependencies = inferDependencies(lower);

  return {
    id: `task-${index + 1}`,
    name: task.replace(/^\s*[-•*\d+.]+\s*/, '').trim(),
    priority,
    category,
    estimatedTime,
    suggestedSlot,
    rationale,
    dependencies,
  };
}

function inferPriority(lower: string, index: number, input: TaskPlannerInput): TaskPriority {
  if (/\b(?:urgent|critical|asap|blocker|deadline|must|immediately|high priority)\b/i.test(lower)) return 'High';
  if (/\b(?:eventually|low priority|nice to have|optional|when possible|someday)\b/i.test(lower)) return 'Low';
  if (index === 0) return 'High';
  if (index <= 2) return 'Medium';
  return 'Low';
}

function inferCategory(lower: string): TaskCategory {
  if (/\b(?:strategy|vision|roadmap|plan|quarterly|annual|goal)\b/i.test(lower)) return 'Strategic';
  if (/\b(?:review|audit|check|inspect|analyze|report)\b/i.test(lower)) return 'Review';
  if (/\b(?:email|call|meet|present|communicate|reply|respond)\b/i.test(lower)) return 'Communication';
  if (/\b(?:schedule|organize|prepare|draft|outline)\b/i.test(lower)) return 'Planning';
  return 'Operational';
}

function estimateTime(task: string): string {
  const words = task.split(/\s+/).length;
  if (/\b(?:quick|brief|short|check|reply|confirm)\b/i.test(task)) return '15 min';
  if (/\b(?:draft|write|review|prepare|summarize)\b/i.test(task)) return '45 min';
  if (/\b(?:design|develop|build|create|analyze|research)\b/i.test(task)) return '90 min';
  if (words > 20) return '2 hours';
  return '30 min';
}

function suggestSlot(priority: TaskPriority, category: TaskCategory, workingHours: string): string {
  const start = parseStartHour(workingHours);
  if (priority === 'High' && category === 'Strategic') return `${formatHour(start)} (deep work block)`;
  if (priority === 'High') return `${formatHour(start + 1)} (priority window)`;
  if (category === 'Communication') return `${formatHour(start + 3)} (collaboration window)`;
  if (category === 'Review') return `${formatHour(start + 5)} (review block)`;
  return `${formatHour(start + 4)} (afternoon block)`;
}

function parseStartHour(workingHours: string): number {
  const match = workingHours.match(/(\d{1,2})(?::(\d{2}))?\s*(am|pm)?/i);
  if (!match) return 9;
  let hour = parseInt(match[1], 10);
  const ampm = match[3]?.toLowerCase();
  if (ampm === 'pm' && hour !== 12) hour += 12;
  if (ampm === 'am' && hour === 12) hour = 0;
  return hour || 9;
}

function formatHour(hour: number): string {
  const period = hour >= 12 ? 'PM' : 'AM';
  const display = hour > 12 ? hour - 12 : hour === 0 ? 12 : hour;
  return `${display}:00 ${period}`;
}

function buildRationale(task: string, priority: TaskPriority, category: TaskCategory, input: TaskPlannerInput): string {
  const focus = input.focus.trim();
  const reasons: string[] = [];
  reasons.push(`${priority} priority due to ${priority === 'High' ? 'urgency and impact' : priority === 'Medium' ? 'moderate importance' : 'flexible timeline'}`);
  reasons.push(`categorized as ${category} work`);
  if (focus && task.toLowerCase().includes(focus.toLowerCase())) {
    reasons.push(`directly aligned with your stated focus on "${focus}"`);
  }
  return reasons.join(', ');
}

function inferDependencies(lower: string): string {
  if (/\b(?:after|once|when|depends|following)\b/i.test(lower)) return 'Has dependencies — review before starting';
  return 'No blocking dependencies';
}

function buildSchedule(sorted: PlannedTask[], workingHours: string): ScheduleBlock[] {
  const start = parseStartHour(workingHours);
  const blocks: ScheduleBlock[] = [];
  let currentHour = start;

  for (let i = 0; i < sorted.length && currentHour < start + 8; i++) {
    const task = sorted[i];
    const minutes = parseMinutes(task.estimatedTime);
    const slots = Math.ceil(minutes / 60);

    if (i === 2 && currentHour < start + 4) {
      blocks.push({ time: formatHour(currentHour), task: 'Break / Reset', type: 'Break' });
      currentHour += 0;
      blocks.push({ time: `${formatHour(currentHour)} – ${formatHour(currentHour + 0.5)}`, task: 'Break / Reset', type: 'Break' });
      currentHour += 0.5;
    }

    const type: ScheduleBlock['type'] =
      task.category === 'Communication' ? 'Collaboration' :
      task.category === 'Review' ? 'Review' :
      task.category === 'Planning' ? 'Admin' : 'Deep Work';

    blocks.push({
      time: `${formatHour(currentHour)} – ${formatHour(currentHour + slots * 0.5)}`,
      task: task.name,
      type,
    });
    currentHour += slots * 0.5;
  }

  return blocks;
}

function buildRecommendations(sorted: PlannedTask[], input: TaskPlannerInput): string[] {
  const recs: string[] = [];
  const highCount = sorted.filter((t) => t.priority === 'High').length;

  if (highCount > 3) {
    recs.push(`You have ${highCount} high-priority tasks — consider deferring lower-priority items to maintain focus.`);
  }
  recs.push('Tackle your most cognitively demanding task first when energy levels are highest.');
  recs.push('Group communication tasks together to reduce context switching.');
  if (input.deadline.trim()) {
    recs.push(`Work backward from your deadline (${input.deadline}) to ensure adequate buffer time.`);
  }
  recs.push('Block calendar notifications during deep work sessions to maintain flow state.');
  return recs;
}

function priorityRank(p: TaskPriority): number {
  return p === 'High' ? 3 : p === 'Medium' ? 2 : 1;
}

function parseMinutes(time: string): number {
  if (time.includes('min')) return parseInt(time, 10) || 30;
  if (time.includes('hour')) return parseInt(time, 10) * 60 || 60;
  return 30;
}

function formatMinutes(minutes: number): string {
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;
  if (hours === 0) return `${mins} min`;
  if (mins === 0) return `${hours} hour${hours > 1 ? 's' : ''}`;
  return `${hours}h ${mins}m`;
}
