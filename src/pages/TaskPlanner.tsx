import { useState } from 'react';
import { ListChecks, Sparkles, Wand2, RotateCcw, Clock, Calendar, Lightbulb, ArrowRight, Layers } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { TextArea, TextInput, Select, Label } from '@/components/ui/Form';
import { LoadingState, EmptyState } from '@/components/ui/LoadingState';
import { Disclaimer } from '@/components/ui/Disclaimer';
import { Badge } from '@/components/ui/OutputPanel';
import { planTasks, type TaskPlan } from '@/lib/ai/taskEngine';
import { simulateAiDelay } from '@/lib/ai/utils';

const sampleTasks = `Finalize Q4 strategy presentation - urgent
Review team budget proposal
Reply to client emails about contract renewal
Prepare onboarding documentation for new hire
Research competitor pricing analysis
Schedule 1:1 with team members
Draft press release for product launch`;

export function TaskPlanner() {
  const [tasks, setTasks] = useState('');
  const [workingHours, setWorkingHours] = useState('9:00 AM - 5:00 PM');
  const [deadline, setDeadline] = useState('');
  const [focus, setFocus] = useState('');
  const [loading, setLoading] = useState(false);
  const [plan, setPlan] = useState<TaskPlan | null>(null);

  const canGenerate = tasks.trim().length > 0;

  const handleGenerate = async () => {
    if (!canGenerate) return;
    setLoading(true);
    setPlan(null);
    await simulateAiDelay(1000, 2200);
    const result = planTasks({ tasks, workingHours, deadline, focus });
    setPlan(result);
    setLoading(false);
  };

  const handleLoadSample = () => setTasks(sampleTasks);

  const handleReset = () => {
    setTasks('');
    setDeadline('');
    setFocus('');
    setPlan(null);
  };

  const priorityColor = (p: string) => (p === 'High' ? 'high' : p === 'Low' ? 'low' : 'medium') as 'high' | 'medium' | 'low';

  const scheduleTypeColor = (type: string) => {
    const colors: Record<string, string> = {
      'Deep Work': 'bg-primary-100 text-primary-700 border-primary-200',
      Collaboration: 'bg-accent-100 text-accent-700 border-accent-200',
      Admin: 'bg-warning-100 text-warning-700 border-warning-200',
      Review: 'bg-violet-100 text-violet-700 border-violet-200',
      Break: 'bg-success-100 text-success-700 border-success-200',
    };
    return colors[type] || 'bg-ink-100 text-ink-600 border-ink-200';
  };

  return (
    <div className="p-4 lg:p-8 max-w-6xl mx-auto animate-fade-in">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Input */}
        <div>
          <div className="flex items-center gap-3 mb-5">
            <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-600 flex items-center justify-center">
              <ListChecks className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-ink-900">AI Task Planner</h2>
              <p className="text-xs text-ink-400">Prioritize and schedule your tasks intelligently</p>
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-ink-200/60 p-6 space-y-5">
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <Label>Your tasks (one per line) *</Label>
                <button onClick={handleLoadSample} className="text-xs font-medium text-primary-600 hover:text-primary-700">
                  Load sample
                </button>
              </div>
              <TextArea
                rows={8}
                value={tasks}
                onChange={(e) => setTasks(e.target.value)}
                placeholder={'e.g.,\nFinalize Q4 strategy presentation - urgent\nReview team budget proposal\nReply to client emails'}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>Working hours</Label>
                <TextInput value={workingHours} onChange={(e) => setWorkingHours(e.target.value)} placeholder="9:00 AM - 5:00 PM" />
              </div>
              <div>
                <Label>Key deadline</Label>
                <TextInput value={deadline} onChange={(e) => setDeadline(e.target.value)} placeholder="e.g., Nov 15" />
              </div>
            </div>

            <div>
              <Label>Today's focus area (optional)</Label>
              <TextInput value={focus} onChange={(e) => setFocus(e.target.value)} placeholder="e.g., product launch" />
            </div>

            <div className="flex gap-3 pt-1">
              <Button onClick={handleGenerate} disabled={!canGenerate || loading} className="flex-1">
                {loading ? <><Sparkles className="w-4 h-4 animate-pulse" /> Planning...</> : <><Wand2 className="w-4 h-4" /> Plan My Day</>}
              </Button>
              <Button variant="outline" onClick={handleReset} disabled={loading}>
                <RotateCcw className="w-4 h-4" />
              </Button>
            </div>
          </div>

          <Disclaimer className="mt-4" />
        </div>

        {/* Output */}
        <div>
          <div className="flex items-center gap-3 mb-5">
            <div className="w-10 h-10 rounded-xl bg-primary-100 text-primary-600 flex items-center justify-center">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-ink-900">Optimized Plan</h2>
              <p className="text-xs text-ink-400">Prioritized tasks with suggested schedule</p>
            </div>
          </div>

          {loading ? (
            <div className="bg-white rounded-2xl border border-ink-200/60 p-6">
              <LoadingState message="Optimizing your schedule..." />
            </div>
          ) : plan ? (
            <div className="space-y-4 animate-slide-up">
              {/* Total time */}
              <div className="flex items-center gap-3 bg-gradient-to-r from-primary-50 to-accent-50 rounded-2xl border border-primary-100/50 p-4">
                <div className="w-10 h-10 rounded-xl bg-white text-primary-600 flex items-center justify-center shadow-sm">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-xs text-ink-500">Total estimated time</p>
                  <p className="text-lg font-bold text-ink-900">{plan.totalEstimatedTime}</p>
                </div>
                <div className="ml-auto text-right">
                  <p className="text-xs text-ink-500">Tasks</p>
                  <p className="text-lg font-bold text-ink-900">{plan.tasks.length}</p>
                </div>
              </div>

              {/* Prioritized Tasks */}
              <div className="bg-white rounded-2xl border border-ink-200/60 p-5">
                <h3 className="text-sm font-semibold text-ink-900 mb-3">Prioritized Tasks</h3>
                <div className="space-y-2.5">
                  {plan.tasks.map((task, i) => (
                    <div key={task.id} className="flex items-start gap-3 p-3 rounded-xl border border-ink-100 hover:bg-ink-50/50 transition-colors">
                      <span className="w-6 h-6 rounded-lg bg-ink-100 text-ink-500 text-xs font-bold flex items-center justify-center flex-shrink-0 mt-0.5">
                        {i + 1}
                      </span>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-ink-800">{task.name}</p>
                        <div className="flex flex-wrap items-center gap-2 mt-1.5">
                          <Badge color={priorityColor(task.priority)}>{task.priority}</Badge>
                          <span className="inline-flex items-center gap-1 text-xs text-ink-500">
                            <Layers className="w-3 h-3" /> {task.category}
                          </span>
                          <span className="inline-flex items-center gap-1 text-xs text-ink-500">
                            <Clock className="w-3 h-3" /> {task.estimatedTime}
                          </span>
                        </div>
                        <p className="text-xs text-ink-400 mt-1.5">{task.rationale}</p>
                        <p className="text-xs text-primary-600 mt-1 font-medium">Suggested: {task.suggestedSlot}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Schedule */}
              {plan.schedule.length > 0 && (
                <div className="bg-white rounded-2xl border border-ink-200/60 p-5">
                  <h3 className="text-sm font-semibold text-ink-900 mb-3">Suggested Schedule</h3>
                  <div className="relative pl-4 space-y-1">
                    <div className="absolute left-0 top-2 bottom-2 w-0.5 bg-ink-200" />
                    {plan.schedule.map((block, i) => (
                      <div key={i} className="relative flex items-center gap-3 py-2">
                        <div className={`absolute -left-4 w-2.5 h-2.5 rounded-full border-2 border-white ${scheduleTypeColor(block.type).split(' ')[0]}`} />
                        <div className="flex-1 flex items-center justify-between gap-3">
                          <div>
                            <p className="text-sm font-medium text-ink-800">{block.task}</p>
                            <p className="text-xs text-ink-400">{block.time}</p>
                          </div>
                          <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full border ${scheduleTypeColor(block.type)}`}>
                            {block.type}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Recommendations */}
              <div className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-2xl border border-amber-200/50 p-5">
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-7 h-7 rounded-lg bg-amber-100 text-amber-600 flex items-center justify-center">
                    <Lightbulb className="w-4 h-4" />
                  </div>
                  <h3 className="text-sm font-semibold text-ink-900">AI Recommendations</h3>
                </div>
                <ul className="space-y-2">
                  {plan.recommendations.map((rec, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-ink-600">
                      <ArrowRight className="w-3.5 h-3.5 text-amber-500 flex-shrink-0 mt-1" />
                      {rec}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ) : (
            <div className="bg-white rounded-2xl border border-ink-200/60 p-6">
              <EmptyState
                icon={ListChecks}
                title="No plan generated yet"
                description="List your tasks on the left and click Plan My Day to get a prioritized, scheduled plan with AI recommendations."
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
