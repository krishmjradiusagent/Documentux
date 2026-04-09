import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  User, CreditCard, PieChart, Users, Puzzle, 
  Sparkles, Bell, Mail, Phone, Settings as SettingsIcon,
  Search, PhoneIncoming, PhoneOutgoing, FileText, Plus
} from 'lucide-react';

const easeOutExpo = [0.19, 1, 0.22, 1] as const;

type LogCategory = 'Missed' | 'Received' | 'Outgoing' | 'Notes';

interface CallLog {
  id: string;
  name: string;
  number: string;
  type: 'missed' | 'received' | 'outgoing';
  time: string;
  duration?: string;
  hasNote: boolean;
  noteSnippet?: string;
  isUnknown?: boolean;
}

const mockLogs: CallLog[] = [
  { id: '1', name: 'Violet Cole', number: '(555) 123-4567', type: 'outgoing', time: 'Today, 2:45 PM', duration: '4:12', hasNote: true, noteSnippet: 'Discussed property on Mission St.' },
  { id: '2', name: 'Unknown Number', number: '(555) 987-6543', type: 'missed', time: 'Today, 10:15 AM', hasNote: false, isUnknown: true },
  { id: '3', name: 'Marc West', number: '(555) 234-5678', type: 'received', time: 'Yesterday, 4:30 PM', duration: '12:05', hasNote: true, noteSnippet: 'Client interested in listing their condo.' },
  { id: '4', name: 'Violet Cole', number: '(555) 123-4567', type: 'missed', time: 'Yesterday, 9:20 AM', hasNote: false },
  { id: '5', name: 'Sarah J.', number: '(555) 345-6789', type: 'outgoing', time: 'Apr 7, 1:15 PM', duration: '2:45', hasNote: false },
];

const tabs = [
  { id: 'accounts', label: 'Accounts', icon: User },
  { id: 'billing', label: 'Billing', icon: CreditCard },
  { id: 'finances', label: 'Finances', icon: PieChart },
  { id: 'team', label: 'Team settings', icon: Users },
  { id: 'integrations', label: 'Integrations', icon: Puzzle },
  { id: 'prospecting', label: 'AI prospecting', icon: Sparkles },
  { id: 'calling', label: 'Calling', icon: Phone },
  { id: 'notifications', label: 'Notification settings', icon: Bell },
  { id: 'email', label: 'Email templates', icon: Mail },
];

export default function Settings() {
  const [activeTab, setActiveTab] = useState('calling');
  const [callCategory, setCallCategory] = useState<LogCategory>('Outgoing');
  const [hoveredNote, setHoveredNote] = useState<string | null>(null);

  const filteredLogs = mockLogs.filter(log => {
    if (callCategory === 'Missed') return log.type === 'missed';
    if (callCategory === 'Received') return log.type === 'received';
    if (callCategory === 'Outgoing') return log.type === 'outgoing';
    if (callCategory === 'Notes') return log.hasNote;
    return true;
  });

  return (
    <div className="flex flex-col h-full bg-white">
      {/* Header */}
      <div className="pt-8 px-8">
        <h1 className="text-[24px] font-semibold text-[#373758] tracking-[-0.48px] leading-[135%] mb-7">
          Settings
        </h1>
        
        {/* Tabs Container */}
        <div className="relative flex items-center gap-1 border-b border-[#F3F4FB]">
          {tabs.map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`relative px-4 py-3 text-[14px] font-semibold transition-colors duration-200 outline-none
                  ${isActive ? 'text-[#5A5FF2]' : 'text-[#373758] hover:text-[#5A5FF2]/80'}`}
              >
                {tab.label}
                {isActive && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#5A5FF2]"
                    transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
                  />
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Content Area */}
      <div className="flex-1 overflow-auto p-8">
        <AnimatePresence mode="wait">
          {activeTab === 'calling' && (
            <motion.div
              key="calling"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.4, ease: easeOutExpo }}
              className="max-w-4xl"
            >
              <div className="flex items-center justify-between mb-8">
                <div>
                  <h2 className="text-xl font-bold text-gray-900 tracking-tight">Calling</h2>
                  <p className="text-gray-500 text-sm mt-1">Manage your telephony and communication preferences.</p>
                </div>
                <div className="flex gap-2">
                  <button className="p-2 border border-gray-100 rounded-xl hover:bg-gray-50 transition-colors shadow-sm bg-white">
                    <Search className="w-4 h-4 text-gray-400" />
                  </button>
                </div>
              </div>

              {/* Subtabs for Calling */}
              <div className="flex bg-[#F8F9FE] p-1.5 rounded-2xl w-fit mb-6 shadow-inner border border-gray-100/50">
                {(['Missed', 'Received', 'Outgoing', 'Notes'] as LogCategory[]).map(cat => (
                  <button
                    key={cat}
                    onClick={() => setCallCategory(cat)}
                    className={`px-6 py-2.5 text-[12px] font-bold rounded-xl transition-all duration-300
                      ${callCategory === cat 
                        ? 'bg-white shadow-[0_4px_12px_rgba(0,0,0,0.08)] text-gray-900' 
                        : 'text-gray-400 hover:text-gray-600'}`}
                  >
                    {cat}
                  </button>
                ))}
              </div>

              <div className="space-y-2">
                {filteredLogs.map((log) => (
                  <motion.div 
                    layout
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    key={log.id} 
                    className="flex items-center justify-between p-5 bg-white border border-gray-100 rounded-2xl hover:border-radius-blue/20 hover:shadow-xl hover:shadow-radius-blue/5 group transition-all duration-300 relative"
                  >
                    <div className="flex items-center gap-5">
                      <div className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-transform group-hover:scale-110 ${
                        log.type === 'missed' ? 'bg-[#FFF2F2] text-[#FF5A5F]' : 
                        log.type === 'received' ? 'bg-[#F2FFF5] text-[#2D7A4D]' : 'bg-[#F2F6FF] text-radius-blue'
                      }`}>
                        {log.type === 'missed' && <PhoneIncoming className="w-5 h-5 rotate-45" />}
                        {log.type === 'received' && <PhoneIncoming className="w-5 h-5" />}
                        {log.type === 'outgoing' && <PhoneOutgoing className="w-5 h-5" />}
                      </div>
                      <div>
                        <div className="flex items-center gap-3">
                          <span className={`text-[15px] font-black tracking-tight ${log.type === 'missed' ? 'text-[#FF5A5F]' : 'text-gray-900'}`}>
                            {log.name}
                          </span>
                          {log.isUnknown && (
                            <button className="flex items-center gap-1 text-[10px] font-black text-radius-blue bg-radius-blue/5 px-3 py-1 rounded-lg border border-radius-blue/10 hover:bg-radius-blue/10 transition-colors uppercase tracking-wider">
                              <Plus className="w-3 h-3" /> Add as Contact
                            </button>
                          )}
                        </div>
                        <div className="flex items-center gap-2 text-[12px] text-gray-400 font-bold mt-1">
                          <span>{log.number}</span>
                          <span className="w-1 h-1 bg-gray-200 rounded-full" />
                          <span>{log.time}</span>
                          {log.duration && (
                            <>
                              <span className="w-1 h-1 bg-gray-200 rounded-full" />
                              <span>{log.duration}</span>
                            </>
                          )}
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-4">
                      {log.hasNote && (
                        <div 
                          onMouseEnter={() => setHoveredNote(log.id)}
                          onMouseLeave={() => setHoveredNote(null)}
                          className="p-2.5 bg-gray-50 rounded-xl text-gray-400 hover:text-radius-blue hover:bg-radius-blue/5 transition-all cursor-help relative"
                        >
                          <FileText className="w-4 h-4" />
                          <AnimatePresence>
                            {hoveredNote === log.id && (
                              <motion.div
                                initial={{ opacity: 0, scale: 0.9, y: 10 }}
                                animate={{ opacity: 1, scale: 1, y: 0 }}
                                exit={{ opacity: 0, scale: 0.9, y: 10 }}
                                className="absolute bottom-full right-0 mb-3 w-56 bg-gray-900 text-white p-4 rounded-2xl text-[12px] font-medium shadow-2xl z-50 pointer-events-none border border-white/10"
                              >
                                {log.noteSnippet}
                                <div className="absolute top-full right-5 transform -translate-y-1/2 rotate-45 w-2 h-2 bg-gray-900" />
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </div>
                      )}
                      <button className="px-6 py-2 bg-radius-blue/5 border border-radius-blue/20 text-radius-blue text-[12px] font-black rounded-xl hover:bg-radius-blue hover:text-white transition-all duration-300 transform active:scale-95 uppercase tracking-wider">
                        {log.type === 'missed' ? 'Call Back' : 'Call Again'}
                      </button>
                    </div>
                  </motion.div>
                ))}

                {filteredLogs.length === 0 && (
                  <div className="py-20 flex flex-col items-center justify-center text-gray-400 border-2 border-dashed border-gray-100 rounded-[32px]">
                    <Phone className="w-12 h-12 mb-4 opacity-10" />
                    <p className="text-sm font-medium">No calls found in this category.</p>
                  </div>
                )}
              </div>
            </motion.div>
          )}

          {activeTab !== 'calling' && (
            <motion.div
              key="placeholder"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex flex-col items-center justify-center h-64 text-gray-400"
            >
              <SettingsIcon className="w-12 h-12 mb-4 opacity-20" />
              <p>Configure {activeTab} settings here.</p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
