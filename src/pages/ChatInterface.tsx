import { useState, useRef, useEffect } from 'react';
import { MessageSquare, Sparkles, Send, User, Bot, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Disclaimer } from '@/components/ui/Disclaimer';
import { generateChatResponse, getInitialSuggestions, type ChatMessage } from '@/lib/ai/chatEngine';
import { simulateAiDelay, generateId } from '@/lib/ai/utils';

export function ChatInterface() {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  const suggestions = getInitialSuggestions();

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: 'smooth' });
  }, [messages, loading]);

  const handleSend = async (text?: string) => {
    const content = (text || input).trim();
    if (!content || loading) return;

    const userMsg: ChatMessage = {
      id: generateId(),
      role: 'user',
      content,
      timestamp: Date.now(),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInput('');
    setLoading(true);

    await simulateAiDelay(600, 1400);

    const response = generateChatResponse(content);
    const aiMsg: ChatMessage = {
      id: generateId(),
      role: 'assistant',
      content: response.content,
      timestamp: Date.now(),
    };

    setMessages((prev) => [...prev, aiMsg]);
    setLoading(false);
    inputRef.current?.focus();
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleClear = () => {
    setMessages([]);
    setInput('');
  };

  return (
    <div className="p-4 lg:p-8 max-w-4xl mx-auto animate-fade-in">
      <div className="flex flex-col h-[calc(100vh-8rem)]">
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-600 flex items-center justify-center">
              <MessageSquare className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-ink-900">AI Chat Assistant</h2>
              <p className="text-xs text-ink-400">Ask me anything about productivity and workplace tasks</p>
            </div>
          </div>
          {messages.length > 0 && (
            <Button variant="ghost" size="sm" onClick={handleClear}>
              <Trash2 className="w-4 h-4" /> Clear
            </Button>
          )}
        </div>

        {/* Chat container */}
        <div className="flex-1 bg-white rounded-2xl border border-ink-200/60 flex flex-col overflow-hidden">
          {/* Messages */}
          <div ref={scrollRef} className="flex-1 overflow-y-auto scrollbar-thin p-4 lg:p-6 space-y-4">
            {messages.length === 0 && !loading && (
              <div className="flex flex-col items-center justify-center h-full text-center animate-fade-in">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-amber-100 to-amber-200 flex items-center justify-center mb-4">
                  <Sparkles className="w-8 h-8 text-amber-600" />
                </div>
                <h3 className="text-lg font-semibold text-ink-800 mb-1.5">How can I help you today?</h3>
                <p className="text-sm text-ink-400 max-w-md mb-6">
                  I can help with email drafting, meeting summaries, task planning, research, and general productivity advice.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 w-full max-w-lg">
                  {suggestions.map((suggestion, i) => (
                    <button
                      key={i}
                      onClick={() => handleSend(suggestion)}
                      className="text-left px-4 py-3 rounded-xl bg-ink-50 hover:bg-primary-50 hover:text-primary-700 text-sm text-ink-600 border border-ink-100 hover:border-primary-200 transition-all duration-200"
                    >
                      {suggestion}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex gap-3 animate-slide-up ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}
              >
                <div
                  className={`w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0 ${
                    msg.role === 'user'
                      ? 'bg-primary-600 text-white'
                      : 'bg-gradient-to-br from-amber-100 to-amber-200 text-amber-600'
                  }`}
                >
                  {msg.role === 'user' ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
                </div>
                <div
                  className={`max-w-[80%] rounded-2xl px-4 py-3 ${
                    msg.role === 'user'
                      ? 'bg-primary-600 text-white'
                      : 'bg-ink-50 text-ink-700 border border-ink-100'
                  }`}
                >
                  <div className="text-sm whitespace-pre-wrap leading-relaxed">{msg.content}</div>
                </div>
              </div>
            ))}

            {loading && (
              <div className="flex gap-3 animate-fade-in">
                <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-amber-100 to-amber-200 text-amber-600 flex items-center justify-center flex-shrink-0">
                  <Bot className="w-4 h-4" />
                </div>
                <div className="bg-ink-50 border border-ink-100 rounded-2xl px-4 py-3">
                  <div className="flex gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-amber-400 animate-bounce" style={{ animationDelay: '0ms' }} />
                    <span className="w-2 h-2 rounded-full bg-amber-400 animate-bounce" style={{ animationDelay: '150ms' }} />
                    <span className="w-2 h-2 rounded-full bg-amber-400 animate-bounce" style={{ animationDelay: '300ms' }} />
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Input */}
          <div className="border-t border-ink-200/60 p-4">
            <div className="flex items-end gap-2.5">
              <div className="flex-1 relative">
                <textarea
                  ref={inputRef}
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  rows={1}
                  placeholder="Type your message..."
                  className="w-full resize-none rounded-xl border border-ink-200 bg-ink-50/50 px-4 py-3 text-sm text-ink-900 placeholder:text-ink-400 transition-all focus:outline-none focus:ring-2 focus:ring-primary-500/30 focus:border-primary-400 focus:bg-white"
                  style={{ maxHeight: '120px' }}
                />
              </div>
              <Button
                onClick={() => handleSend()}
                disabled={!input.trim() || loading}
                size="md"
                className="!px-4"
              >
                <Send className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>

        <Disclaimer className="mt-4" />
      </div>
    </div>
  );
}
