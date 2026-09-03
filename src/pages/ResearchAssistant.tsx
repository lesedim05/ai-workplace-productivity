import { useState } from 'react';
import { Search, Sparkles, Wand2, RotateCcw, Lightbulb, TrendingUp, HelpCircle, CheckCircle2, FileSearch } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { TextArea, TextInput, Select, Label } from '@/components/ui/Form';
import { LoadingState, EmptyState } from '@/components/ui/LoadingState';
import { Disclaimer } from '@/components/ui/Disclaimer';
import { Badge } from '@/components/ui/OutputPanel';
import { researchTopic, type ResearchSummary } from '@/lib/ai/researchEngine';
import { simulateAiDelay } from '@/lib/ai/utils';

export function ResearchAssistant() {
  const [topic, setTopic] = useState('');
  const [questions, setQuestions] = useState('');
  const [depth, setDepth] = useState<'Overview' | 'Standard' | 'Deep Dive'>('Standard');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<ResearchSummary | null>(null);

  const canGenerate = topic.trim().length > 0;

  const handleGenerate = async () => {
    if (!canGenerate) return;
    setLoading(true);
    setResult(null);
    await simulateAiDelay(1200, 2400);
    const res = researchTopic({ topic, questions, depth });
    setResult(res);
    setLoading(false);
  };

  const handleReset = () => {
    setTopic('');
    setQuestions('');
    setResult(null);
  };

  const confidenceColor = (c: string) => (c === 'High' ? 'success' : c === 'Medium' ? 'info' : 'default') as 'success' | 'info' | 'default';

  return (
    <div className="p-4 lg:p-8 max-w-6xl mx-auto animate-fade-in">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Input */}
        <div>
          <div className="flex items-center gap-3 mb-5">
            <div className="w-10 h-10 rounded-xl bg-violet-100 text-violet-600 flex items-center justify-center">
              <Search className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-ink-900">AI Research Assistant</h2>
              <p className="text-xs text-ink-400">Structured insights and summaries on any topic</p>
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-ink-200/60 p-6 space-y-5">
            <div>
              <Label>What topic do you want to research? *</Label>
              <TextInput
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                placeholder="e.g., AI adoption in enterprise, remote work trends, competitor analysis"
              />
            </div>

            <div>
              <Label>Research depth</Label>
              <div className="grid grid-cols-3 gap-2">
                {(['Overview', 'Standard', 'Deep Dive'] as const).map((d) => (
                  <button
                    key={d}
                    onClick={() => setDepth(d)}
                    className={`px-3 py-2.5 rounded-xl text-sm font-medium transition-all ${
                      depth === d
                        ? 'bg-primary-600 text-white shadow-sm'
                        : 'bg-ink-50 text-ink-600 hover:bg-ink-100'
                    }`}
                  >
                    {d}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <Label>Specific questions to address (one per line)</Label>
              <TextArea
                rows={5}
                value={questions}
                onChange={(e) => setQuestions(e.target.value)}
                placeholder={'e.g.,\nWhat are the main trends?\nWho are the key players?\nWhat are the risks?'}
              />
            </div>

            <div className="flex gap-3 pt-1">
              <Button onClick={handleGenerate} disabled={!canGenerate || loading} className="flex-1">
                {loading ? <><Sparkles className="w-4 h-4 animate-pulse" /> Researching...</> : <><Wand2 className="w-4 h-4" /> Research Topic</>}
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
              <h2 className="text-lg font-bold text-ink-900">Research Findings</h2>
              <p className="text-xs text-ink-400">Structured analysis with insights and recommendations</p>
            </div>
          </div>

          {loading ? (
            <div className="bg-white rounded-2xl border border-ink-200/60 p-6">
              <LoadingState message="Researching your topic..." />
            </div>
          ) : result ? (
            <div className="space-y-4 animate-slide-up">
              {/* Executive Summary */}
              <div className="bg-gradient-to-br from-primary-50 to-violet-50 rounded-2xl border border-primary-100/50 p-5">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <div className="w-7 h-7 rounded-lg bg-white text-primary-600 flex items-center justify-center shadow-sm">
                      <FileSearch className="w-4 h-4" />
                    </div>
                    <h3 className="text-sm font-semibold text-ink-900">Executive Summary</h3>
                  </div>
                  <Badge color={confidenceColor(result.confidence)}>{result.confidence} Confidence</Badge>
                </div>
                <p className="text-sm text-ink-600 leading-relaxed">{result.executiveSummary}</p>
              </div>

              {/* Themes */}
              {result.themes.length > 0 && (
                <div className="bg-white rounded-2xl border border-ink-200/60 p-5">
                  <h3 className="text-sm font-semibold text-ink-900 mb-3">Key Themes</h3>
                  <div className="flex flex-wrap gap-2">
                    {result.themes.map((theme, i) => (
                      <span key={i} className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-violet-50 text-violet-700 text-xs font-medium border border-violet-100">
                        <TrendingUp className="w-3 h-3" />
                        {theme}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Key Insights */}
              <div className="bg-white rounded-2xl border border-ink-200/60 p-5">
                <h3 className="text-sm font-semibold text-ink-900 mb-3">Key Insights</h3>
                <div className="space-y-3">
                  {result.keyInsights.map((insight, i) => (
                    <div key={i} className="p-4 rounded-xl bg-ink-50/50 border border-ink-100">
                      <div className="flex items-start gap-2.5">
                        <span className="w-6 h-6 rounded-lg bg-primary-100 text-primary-600 text-xs font-bold flex items-center justify-center flex-shrink-0">
                          {i + 1}
                        </span>
                        <div className="flex-1">
                          <p className="text-sm font-semibold text-ink-800">{insight.title}</p>
                          <p className="text-sm text-ink-600 mt-1 leading-relaxed">{insight.detail}</p>
                          <p className="text-xs text-primary-600 mt-2 font-medium italic">{insight.relevance}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Recommendations */}
              <div className="bg-gradient-to-br from-emerald-50 to-teal-50 rounded-2xl border border-emerald-200/50 p-5">
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-7 h-7 rounded-lg bg-emerald-100 text-emerald-600 flex items-center justify-center">
                    <Lightbulb className="w-4 h-4" />
                  </div>
                  <h3 className="text-sm font-semibold text-ink-900">Recommendations</h3>
                </div>
                <ul className="space-y-2">
                  {result.recommendations.map((rec, i) => (
                    <li key={i} className="flex items-start gap-2.5 text-sm text-ink-600">
                      <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0 mt-0.5" />
                      {rec}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Further Questions */}
              <div className="bg-white rounded-2xl border border-ink-200/60 p-5">
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-7 h-7 rounded-lg bg-amber-50 text-amber-600 flex items-center justify-center">
                    <HelpCircle className="w-4 h-4" />
                  </div>
                  <h3 className="text-sm font-semibold text-ink-900">Questions for Further Exploration</h3>
                </div>
                <ul className="space-y-2">
                  {result.furtherQuestions.map((q, i) => (
                    <li key={i} className="flex items-start gap-2.5 text-sm text-ink-600">
                      <span className="text-amber-500 font-bold flex-shrink-0">?</span>
                      {q}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ) : (
            <div className="bg-white rounded-2xl border border-ink-200/60 p-6">
              <EmptyState
                icon={Search}
                title="No research yet"
                description="Enter a topic on the left, choose your depth, and click Research to get structured insights and recommendations."
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
