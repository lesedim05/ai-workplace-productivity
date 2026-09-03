import { useState } from 'react';
import { Mail, Sparkles, Wand2, RotateCcw } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { TextArea, TextInput, Select, Label } from '@/components/ui/Form';
import { LoadingState, EmptyState } from '@/components/ui/LoadingState';
import { OutputPanel } from '@/components/ui/OutputPanel';
import { Disclaimer } from '@/components/ui/Disclaimer';
import { generateEmail, type EmailTone, type EmailAudience, type EmailOutput } from '@/lib/ai/emailEngine';
import { simulateAiDelay } from '@/lib/ai/utils';

const tones: { value: EmailTone; label: string }[] = [
  { value: 'professional', label: 'Professional' },
  { value: 'friendly', label: 'Friendly' },
  { value: 'persuasive', label: 'Persuasive' },
  { value: 'urgent', label: 'Urgent' },
  { value: 'apologetic', label: 'Apologetic' },
  { value: 'appreciative', label: 'Appreciative' },
];

const audiences: { value: EmailAudience; label: string }[] = [
  { value: 'client', label: 'Client' },
  { value: 'team', label: 'Team Member' },
  { value: 'manager', label: 'Manager / Executive' },
  { value: 'vendor', label: 'Vendor / Partner' },
  { value: 'candidate', label: 'Job Candidate' },
  { value: 'stakeholder', label: 'Stakeholder' },
];

export function EmailGenerator() {
  const [topic, setTopic] = useState('');
  const [tone, setTone] = useState<EmailTone>('professional');
  const [audience, setAudience] = useState<EmailAudience>('client');
  const [keyPoints, setKeyPoints] = useState('');
  const [senderName, setSenderName] = useState('');
  const [senderRole, setSenderRole] = useState('');
  const [loading, setLoading] = useState(false);
  const [output, setOutput] = useState<EmailOutput | null>(null);

  const canGenerate = topic.trim().length > 0;

  const handleGenerate = async () => {
    if (!canGenerate) return;
    setLoading(true);
    setOutput(null);
    await simulateAiDelay();
    const result = generateEmail({ topic, tone, audience, keyPoints, senderName, senderRole });
    setOutput(result);
    setLoading(false);
  };

  const handleReset = () => {
    setTopic('');
    setKeyPoints('');
    setSenderName('');
    setSenderRole('');
    setOutput(null);
  };

  const copyText = () => {
    if (!output) return '';
    return `Subject: ${output.subject}\n\n${output.body}\n\n${output.signOff}`;
  };

  return (
    <div className="p-4 lg:p-8 max-w-6xl mx-auto animate-fade-in">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Input Panel */}
        <div>
          <div className="flex items-center gap-3 mb-5">
            <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center">
              <Mail className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-ink-900">Smart Email Generator</h2>
              <p className="text-xs text-ink-400">AI-powered email drafting with tone & audience targeting</p>
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-ink-200/60 p-6 space-y-5">
            <div>
              <Label>What is this email about? *</Label>
              <TextInput
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                placeholder="e.g., Project update for Q4 launch"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>Tone</Label>
                <Select value={tone} onChange={(e) => setTone(e.target.value as EmailTone)}>
                  {tones.map((t) => (
                    <option key={t.value} value={t.value}>{t.label}</option>
                  ))}
                </Select>
              </div>
              <div>
                <Label>Audience</Label>
                <Select value={audience} onChange={(e) => setAudience(e.target.value as EmailAudience)}>
                  {audiences.map((a) => (
                    <option key={a.value} value={a.value}>{a.label}</option>
                  ))}
                </Select>
              </div>
            </div>

            <div>
              <Label>Key points to include (one per line)</Label>
              <TextArea
                rows={5}
                value={keyPoints}
                onChange={(e) => setKeyPoints(e.target.value)}
                placeholder={'e.g.,\nLaunch date moved to Nov 15\nBudget approved for additional resources\nNeed feedback on marketing plan'}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>Your name</Label>
                <TextInput value={senderName} onChange={(e) => setSenderName(e.target.value)} placeholder="Alex Kim" />
              </div>
              <div>
                <Label>Your role</Label>
                <TextInput value={senderRole} onChange={(e) => setSenderRole(e.target.value)} placeholder="Product Manager" />
              </div>
            </div>

            <div className="flex gap-3 pt-1">
              <Button onClick={handleGenerate} disabled={!canGenerate || loading} className="flex-1">
                {loading ? <><Sparkles className="w-4 h-4 animate-pulse" /> Generating...</> : <><Wand2 className="w-4 h-4" /> Generate Email</>}
              </Button>
              <Button variant="outline" onClick={handleReset} disabled={loading}>
                <RotateCcw className="w-4 h-4" />
              </Button>
            </div>
          </div>

          <Disclaimer className="mt-4" />
        </div>

        {/* Output Panel */}
        <div>
          <div className="flex items-center gap-3 mb-5">
            <div className="w-10 h-10 rounded-xl bg-primary-100 text-primary-600 flex items-center justify-center">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-ink-900">Generated Email</h2>
              <p className="text-xs text-ink-400">Review and refine before sending</p>
            </div>
          </div>

          {loading ? (
            <div className="bg-white rounded-2xl border border-ink-200/60 p-6">
              <LoadingState message="Crafting your email..." />
            </div>
          ) : output ? (
            <div className="space-y-4 animate-slide-up">
              <OutputPanel title="Subject Line" onCopy={() => output.subject}>
                <p className="text-sm font-semibold text-ink-900">{output.subject}</p>
              </OutputPanel>
              <OutputPanel title="Email Body" onCopy={copyText}>
                <div className="space-y-4">
                  <pre className="text-sm text-ink-700 whitespace-pre-wrap font-sans leading-relaxed">{output.body}</pre>
                  <div className="pt-3 border-t border-ink-200/60">
                    <pre className="text-sm text-ink-600 whitespace-pre-wrap font-sans">{output.signOff}</pre>
                  </div>
                </div>
              </OutputPanel>
            </div>
          ) : (
            <div className="bg-white rounded-2xl border border-ink-200/60 p-6">
              <EmptyState
                icon={Mail}
                title="No email generated yet"
                description="Fill in the details on the left and click Generate Email to create a professional, tone-matched draft."
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
