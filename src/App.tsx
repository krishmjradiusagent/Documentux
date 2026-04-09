import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CallProvider } from './context/CallContext';
import { DynamicIslandDialer } from './components/dialer/DynamicIslandDialer';
import { CallSummaryModal } from './components/dialer/CallSummaryModal';
import { SummaryToast } from './components/dialer/SummaryToast';
import { CallSummarySidePanel } from './components/dialer/CallSummarySidePanel';
import { ClientProfile } from './pages/ClientProfile';
import Settings from './pages/Settings';
import { User, Settings as SettingsIcon, LayoutDashboard, Calendar, Users, MessageSquare, Search, ChevronDown } from 'lucide-react';

function App() {
  const [currentPage, setCurrentPage] = useState<'profile' | 'settings'>('profile');
  const [isProfileOpen, setIsProfileOpen] = useState(true);

  return (
    <CallProvider>
      <div className="flex h-screen bg-[#f9fafb] font-sans selection:bg-radius-blue/20">
        {/* Sidebar */}
        <aside className="w-20 border-r border-border bg-white flex flex-col items-center py-8 gap-8 z-20">
           <div className="w-10 h-10 bg-radius-blue rounded-xl flex items-center justify-center text-white font-bold text-xl shadow-lg shadow-radius-blue/20">
             R
           </div>
           
           <nav className="flex flex-col gap-4">
             <SidebarItem icon={<LayoutDashboard />} />
             <SidebarItem icon={<Calendar />} />
             <SidebarItem icon={<Users />} active={currentPage === 'profile'} onClick={() => { setCurrentPage('profile'); setIsProfileOpen(true); }} />
             <SidebarItem icon={<MessageSquare />} />
             <SidebarItem icon={<User />} />
           </nav>

           <div className="mt-auto">
             <SidebarItem icon={<SettingsIcon />} active={currentPage === 'settings'} onClick={() => { setCurrentPage('settings'); setIsProfileOpen(false); }} />
           </div>
        </aside>

        {/* Main Content Area */}
        <main className="flex-1 relative overflow-hidden flex flex-col">
          {currentPage === 'settings' ? (
            <Settings />
          ) : (
            <ClientList onSelectClient={() => setIsProfileOpen(true)} />
          )}

          {/* Side Panel Overlay */}
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
  active = false, 
  onClick 
}: { 
  icon: React.ReactNode; 
  active?: boolean;
  onClick?: () => void;
}) => (
  <button 
    onClick={onClick}
    className={`p-3 rounded-2xl transition-all duration-300 ${active ? 'bg-radius-blue/10 text-radius-blue shadow-sm' : 'text-gray-400 hover:bg-gray-50 hover:text-gray-600'}`}
  >
    {React.isValidElement(icon) ? React.cloneElement(icon as React.ReactElement<any>, { size: 22 }) : icon}
  </button>
);

export default App
