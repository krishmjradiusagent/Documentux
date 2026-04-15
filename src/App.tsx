import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CallProvider } from './context/CallContext';
import { DynamicIslandDialer } from './components/dialer/DynamicIslandDialer';
import { CallLauncherDialog } from './components/dialer/CallLauncherDialog';
import { CallSummaryModal } from './components/dialer/CallSummaryModal';
import { SummaryToast } from './components/dialer/SummaryToast';
import { CallSummarySidePanel } from './components/dialer/CallSummarySidePanel';
import { ClientProfile } from './pages/ClientProfile';
import Settings from './pages/Settings';
import { User, Settings as SettingsIcon, LayoutDashboard, Calendar, Users, MessageSquare, Search, ChevronDown, Phone } from 'lucide-react';

function App() {
  const [currentPage, setCurrentPage] = useState<'profile' | 'settings'>('profile');
  const [isProfileOpen, setIsProfileOpen] = useState(true);

  return (
    <CallProvider>
      <div className="flex h-screen bg-[#f7f8fc] font-sans selection:bg-radius-blue/20">
        <aside className="w-[88px] border-r border-gray-200/80 bg-white z-20 flex flex-col items-center py-5">
          <div className="mb-6 flex h-11 w-11 items-center justify-center rounded-2xl bg-radius-blue text-white text-lg font-bold shadow-lg shadow-radius-blue/20">
            R
          </div>
          <nav className="flex flex-1 flex-col items-center gap-3">
            <SidebarItem icon={<LayoutDashboard />} label="Dashboard" />
            <SidebarItem icon={<Calendar />} label="Calendar" />
            <SidebarItem
              icon={<Users />}
              label="Clients"
              active={currentPage === 'profile'}
              onClick={() => { setCurrentPage('profile'); setIsProfileOpen(true); }}
            />
            <SidebarItem icon={<MessageSquare />} label="Messages" />
            <SidebarItem icon={<User />} label="Account" />
            <SidebarItem
              icon={<SettingsIcon />}
              label="Settings"
              active={currentPage === 'settings'}
              onClick={() => { setCurrentPage('settings'); setIsProfileOpen(false); }}
            />
          </nav>
          <div className="mt-auto mb-2 text-[10px] font-semibold uppercase tracking-[0.18em] text-gray-400">
            Radius
          </div>
        </aside>

        <main className="flex-1 relative overflow-hidden flex flex-col">
          <header className="flex items-center justify-between border-b border-gray-200/70 bg-white/80 px-8 py-4 backdrop-blur-xl">
            <div>
              <div className="text-[11px] font-bold uppercase tracking-[0.25em] text-gray-400">Workspace</div>
              <h1 className="text-xl font-semibold tracking-tight text-gray-900">
                {currentPage === 'settings' ? 'Settings' : 'Clients'}
              </h1>
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={() => { setCurrentPage('profile'); setIsProfileOpen(true); }}
                className="inline-flex items-center gap-2 rounded-full border border-gray-200 bg-white px-4 py-2 text-sm font-semibold text-gray-700 transition-colors hover:border-radius-blue hover:text-radius-blue"
              >
                <Users className="h-4 w-4" />
                Client panel
              </button>
              <button
                onClick={() => { setCurrentPage('settings'); setIsProfileOpen(false); }}
                className="inline-flex items-center gap-2 rounded-full border border-gray-200 bg-white px-4 py-2 text-sm font-semibold text-gray-700 transition-colors hover:border-radius-blue hover:text-radius-blue"
              >
                <SettingsIcon className="h-4 w-4" />
                Settings
              </button>
              <button className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-gray-200 bg-white text-gray-500 transition-colors hover:border-radius-blue hover:text-radius-blue">
                <Phone className="h-4 w-4" />
              </button>
            </div>
          </header>

          {currentPage === 'settings' ? (
            <Settings />
          ) : (
            <ClientList onSelectClient={() => setIsProfileOpen(true)} />
          )}

          <AnimatePresence>
            {isProfileOpen && currentPage === 'profile' && (
              <>
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onClick={() => setIsProfileOpen(false)}
                  className="absolute inset-0 bg-black/5 backdrop-blur-[2px] z-30"
                />
                <ClientProfile onClose={() => setIsProfileOpen(false)} />
              </>
            )}
          </AnimatePresence>
        </main>

        {/* Global Floating Components */}
        <DynamicIslandDialer />
        <CallLauncherDialog />
        <CallSummaryModal />
        <SummaryToast />
        <CallSummarySidePanel />
      </div>
    </CallProvider>
  )
}

const ClientList = ({ onSelectClient }: { onSelectClient: () => void }) => {
  return (
    <div className="p-8 h-full overflow-y-auto">
      <div className="max-w-6xl mx-auto">
        <header className="flex items-center gap-4 mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Clients</h1>
          <span className="px-3 py-1 bg-green-100 text-green-700 text-xs font-bold rounded-full">15000</span>
        </header>

        <div className="flex gap-4 mb-6">
          <div className="flex-1 relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input 
              type="text" 
              placeholder="Search by client name or email address"
              className="w-full pl-12 pr-4 py-3 bg-white border border-border rounded-xl focus:ring-2 focus:ring-radius-blue/20 outline-none transition-all"
            />
          </div>
          <button className="px-6 py-3 bg-white border border-border rounded-xl font-semibold text-sm flex items-center gap-2">
            View Clients For <ChevronDown className="w-4 h-4" />
          </button>
        </div>

        <div className="bg-white border border-border rounded-[24px] overflow-hidden">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-gray-100 bg-gray-50/50">
                <th className="p-4"><input type="checkbox" className="rounded" /></th>
                <th className="p-4 text-xs font-bold text-gray-400 uppercase">Client Name</th>
                <th className="p-4 text-xs font-bold text-gray-400 uppercase">Tags</th>
                <th className="p-4 text-xs font-bold text-gray-400 uppercase">Score</th>
                <th className="p-4 text-xs font-bold text-gray-400 uppercase">Created</th>
              </tr>
            </thead>
            <tbody>
              {[
                { name: 'Violet Cole', email: 'violet.cole@email.com', tags: ['NEW CLIENT', 'HIGH PRIORITY'], score: '+ 9.5', date: 'Jun 12 2024' },
                { name: 'Steve Owens', email: 'steve.o@email.com', tags: ['NEW CLIENT', 'HIGH PRIORITY'], score: '+ 8.2', date: 'Jun 22 2024' }
              ].map((client, i) => (
                <tr 
                  key={i} 
                  onClick={onSelectClient}
                  className="border-b border-gray-50 hover:bg-gray-50 cursor-pointer transition-colors"
                >
                  <td className="p-4"><input type="checkbox" className="rounded" /></td>
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-gray-200" />
                      <div>
                        <div className="text-sm font-bold text-radius-blue">{client.name}</div>
                        <div className="text-xs text-gray-400">{client.email}</div>
                      </div>
                    </div>
                  </td>
                  <td className="p-4">
                    <div className="flex gap-2">
                      {client.tags.map(t => (
                        <span key={t} className="px-2 py-1 bg-gray-100 text-[10px] font-bold text-gray-500 rounded-md">{t}</span>
                      ))}
                    </div>
                  </td>
                  <td className="p-4">
                    <span className="px-3 py-1 border border-radius-blue text-radius-blue text-xs font-bold rounded-full bg-radius-blue/5">{client.score}</span>
                  </td>
                  <td className="p-4 text-sm text-gray-400 font-medium">{client.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

const SidebarItem = ({ 
  icon, 
  label,
  active = false, 
  onClick 
}: { 
  icon: React.ReactNode; 
  label: string;
  active?: boolean;
  onClick?: () => void;
}) => (
  <button 
    onClick={onClick}
    title={label}
    className={`group flex h-11 w-11 items-center justify-center rounded-2xl transition-all duration-200 active:scale-95 ${active ? 'bg-[#5A5FF2]/10 text-[#5A5FF2] shadow-[0_8px_24px_-12px_rgba(90,95,242,0.45)]' : 'text-gray-400 hover:bg-gray-50 hover:text-gray-700'}`}
  >
    {React.isValidElement(icon) ? React.cloneElement(icon as React.ReactElement<any>, { size: 22 }) : icon}
  </button>
);

export default App
