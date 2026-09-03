import { useState } from 'react';
import { FileText, Sparkles, Wand2, RotateCcw, Users, ListTodo, Gavel, Calendar, Target, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { TextArea, TextInput, Label } from '@/components/ui/Form';
import { LoadingState, EmptyState } from '@/components/ui/LoadingState';
import { Disclaimer } from '@/components/ui/Disclaimer';
import { Badge } from '@/components/ui/OutputPanel';
import { summarizeMeeting, type MeetingSummary } from '@/lib/ai/meetingEngine';
import { simulateAiDelay } from '@/lib/ai/utils';

const sampleNotes = `Q4 Product Launch Planning Meeting
Attendees: Sarah, Mike, Jennifer, Tom

Discussed the Q4 launch timeline. Decided to move launch date to November 15.
Action item: Sarah to finalize marketing plan by Oct 30 - high priority
Action item: Mike to prepare budget report before Oct 25
Tom will review the technical requirements - urgent blocker
Agreed on $50K additional budget for the campaign
Jennifer assigned to coordinate with the design team
Follow-up: Schedule stakeholder review for next week`;

export function MeetingSummarizer() {
  const [rawNotes, setRawNotes] = useState('');
  const [meetingTitle, setMeetingTitle] = useState('');
  const [participants, setParticipants] = useState('');
  const [loading, setLoading] = useState(false);
  const [summary, setSummary] = useState<MeetingSummary | null>(null);

  const canGenerate = rawNotes.trim().length > 0;

  const handleGenerate = async () => {
    if (!canGenerate) return;
    setLoading(true);
    setSummary(null);
    await simulateAiDelay();
    const result = summarizeMeeting({ rawNotes, meetingTitle, participants });
    setSummary(result);
    setLoading(false);
  };

  const handleLoadSample = () => {
    setRawNotes(sampleNotes);
    setMeetingTitle('Q4 Product Launch Planning');
    setParticipants('Sarah, Mike, Jennifer, Tom');
  };

  const handleReset = () => {
    setRawNotes('');
    setMeetingTitle('');
    setParticipants('');
    setSummary(null);
  };

  const priorityColor = (p: string) => (p === 'High' ? 'high' : p === 'Low' ? 'low' : 'medium') as 'high' | 'medium' | 'low';

  return (
    <div className="p-4 lg:p-8 max-w-6xl mx-auto animate-fade-in">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Input */}
        <div>
          <div className="flex items-center gap-3 mb-5">
            <div className="w-10 h-10 rounded-xl bg-cyan-100 text-cyan-600 flex items-center justify-center">
              <FileText className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-ink-900">Meeting Notes Summarizer</h2>
              <p className="text-xs text-ink-400">Extract key points, actions, and deadlines from raw notes</p>
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-ink-200/60 p-6 space-y-5">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>Meeting title</Label>
                <TextInput value={meetingTitle} onChange={(e) => setMeetingTitle(e.target.value)} placeholder="Weekly standup" />
              </div>
              <div>
                <Label>Participants (comma-separated)</Label>
                <TextInput value={participants} onChange={(e) => setParticipants(e.target.value)} placeholder="Sarah, Mike, Jen" />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-1.5">
                <Label>Paste your raw meeting notes *</Label>
                <button onClick={handleLoadSample} className="text-xs font-medium text-primary-600 hover:text-primary-700">
                  Load sample
                </button>
              </div>
              <TextArea
                rows={12}
                value={rawNotes}
                onChange={(e) => setRawNotes(e.target.value)}
                placeholder={'Paste your unstructured meeting notes here...\n\nThe AI will identify action items, decisions, key points, and deadlines automatically.'}
              />
            </div>

            <div className="flex gap-3 pt-1">
              <Button onClick={handleGenerate} disabled={!canGenerate || loading} className="flex-1">
                {loading ? <><Sparkles className="w-4 h-4 animate-pulse" /> Summarizing...</> : <><Wand2 className="w-4 h-4" /> Summarize Meeting</>}
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
              <h2 className="text-lg font-bold text-ink-900">Meeting Summary</h2>
              <p className="text-xs text-ink-400">Structured output with action items and deadlines</p>
            </div>
          </div>

          {loading ? (
            <div className="bg-white rounded-2xl border border-ink-200/60 p-6">
              <LoadingState message="Analyzing your notes..." />
            </div>
          ) : summary ? (
            <div className="space-y-4 animate-slide-up">
              {/* Summary */}
              <div className="bg-white rounded-2xl border border-ink-200/60 p-5">
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-7 h-7 rounded-lg bg-primary-50 text-primary-600 flex items-center justify-center">
                    <Target className="w-4 h-4" />
                  </div>
                  <h3 className="text-sm font-semibold text-ink-900">Executive Summary</h3>
                </div>
                <p className="text-sm text-ink-600 leading-relaxed">{summary.summary}</p>
                {summary.participants.length > 0 && (
                  <div className="flex items-center gap-2 mt-3 pt-3 border-t border-ink-100">
                    <Users className="w-3.5 h-3.5 text-ink-400" />
                    <div className="flex flex-wrap gap-1.5">
                      {summary.participants.map((p) => (
                        <Badge key={p}>{p}</Badge>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Key Points */}
              {summary.keyPoints.length > 0 && (
                <div className="bg-white rounded-2xl border border-ink-200/60 p-5">
                  <h3 className="text-sm font-semibold text-ink-900 mb-3">Key Points</h3>
                  <ul className="space-y-2">
                    {summary.keyPoints.map((point, i) => (
                      <li key={i} className="flex items-start gap-2.5 text-sm text-ink-600">
                        <span className="w-5 h-5 rounded-full bg-ink-100 text-ink-500 text-[10px] font-bold flex items-center justify-center flex-shrink-0 mt-0.5">
                          {i + 1}
                        </span>
                        {point}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Action Items */}
              {summary.actionItems.length > 0 && (
                <div className="bg-white rounded-2xl border border-ink-200/60 p-5">
                  <div className="flex items-center gap-2 mb-3">
                    <div className="w-7 h-7 rounded-lg bg-warning-50 text-warning-600 flex items-center justify-center">
                      <ListTodo className="w-4 h-4" />
                    </div>
                    <h3 className="text-sm font-semibold text-ink-900">Action Items</h3>
                  </div>
                  <div className="space-y-2.5">
                    {summary.actionItems.map((item, i) => (
                      <div key={i} className="flex items-start gap-3 p-3 rounded-xl bg-ink-50/50 border border-ink-100">
                        <div className="flex-1 min-w-0">
                          <p className="text-sm text-ink-700 font-medium">{item.task}</p>
                          <div className="flex flex-wrap items-center gap-2 mt-1.5">
                            <span className="text-xs text-ink-500">Assignee: <span className="font-medium text-ink-700">{item.assignee}</span></span>
                            <span className="text-ink-300">·</span>
                            <span className="inline-flex items-center gap-1 text-xs text-ink-500">
                              <Calendar className="w-3 h-3" /> {item.deadline}
                            </span>
                          </div>
                        </div>
                        <Badge color={priorityColor(item.priority)}>{item.priority}</Badge>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Decisions */}
              {summary.decisions.length > 0 && (
                <div className="bg-white rounded-2xl border border-ink-200/60 p-5">
                  <div className="flex items-center gap-2 mb-3">
                    <div className="w-7 h-7 rounded-lg bg-success-50 text-success-600 flex items-center justify-center">
                      <Gavel className="w-4 h-4" />
                    </div>
                    <h3 className="text-sm font-semibold text-ink-900">Decisions Made</h3>
                  </div>
                  <ul className="space-y-2">
                    {summary.decisions.map((d, i) => (
                      <li key={i} className="flex items-start gap-2.5 text-sm text-ink-600">
                        <CheckCircle className="w-4 h-4 text-success-500 flex-shrink-0 mt-0.5" />
                        {d}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          ) : (
            <div className="bg-white rounded-2xl border border-ink-200/60 p-6">
              <EmptyState
                icon={FileText}
                title="No summary yet"
                description="Paste your meeting notes on the left and click Summarize to extract key points, action items, and decisions."
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

