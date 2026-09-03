import { useState } from 'react';
import { Sidebar, type ViewId } from '@/components/layout/Sidebar';
import { TopBar } from '@/components/layout/TopBar';
import { Dashboard } from '@/pages/Dashboard';
import { EmailGenerator } from '@/pages/EmailGenerator';
import { MeetingSummarizer } from '@/pages/MeetingSummarizer';
import { TaskPlanner } from '@/pages/TaskPlanner';
import { ResearchAssistant } from '@/pages/ResearchAssistant';
import { ChatInterface } from '@/pages/ChatInterface';

function App() {
  const [activeView, setActiveView] = useState<ViewId>('dashboard');
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  const renderView = () => {
    switch (activeView) {
      case 'dashboard':
        return <Dashboard onNavigate={setActiveView} />;
      case 'email':
        return <EmailGenerator />;
      case 'meeting':
        return <MeetingSummarizer />;
      case 'tasks':
        return <TaskPlanner />;
      case 'research':
        return <ResearchAssistant />;
      case 'chat':
        return <ChatInterface />;
      default:
        return <Dashboard onNavigate={setActiveView} />;
    }
  };

  return (
    <div className="flex min-h-screen bg-ink-50">
      <Sidebar
        active={activeView}
        onSelect={setActiveView}
        mobileOpen={mobileSidebarOpen}
        onCloseMobile={() => setMobileSidebarOpen(false)}
      />
      <div className="flex-1 flex flex-col min-w-0">
        <TopBar active={activeView} onMenuClick={() => setMobileSidebarOpen(true)} />
        <main className="flex-1 overflow-y-auto scrollbar-thin">{renderView()}</main>
      </div>
    </div>
  );
}

export default App;
