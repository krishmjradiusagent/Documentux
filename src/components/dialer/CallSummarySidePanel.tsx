import { motion } from 'framer-motion';
import { useCall } from '../../context/CallContext';
import { ChevronLeft, Star } from 'lucide-react';

const easeOutExpo = [0.19, 1, 0.22, 1] as const;

export const CallSummarySidePanel = () => {
  const { summaryStatus, closeSummary, client } = useCall();

  if (summaryStatus !== 'viewing') return null;

  return (
    <>
      {/* Backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={closeSummary}
        className="fixed inset-0 bg-black/5 backdrop-blur-[2px] z-[100]"
      />
      
      {/* Side Panel */}
      <motion.div 
        initial={{ x: '100%' }}
        animate={{ x: 0 }}
        exit={{ x: '100%' }}
        transition={{ duration: 0.6, ease: easeOutExpo }}
        className="fixed top-0 right-0 h-screen w-[460px] bg-white shadow-2xl z-[101] flex flex-col overflow-hidden"
      >
        {/* Header */}
        <div className="flex flex-col p-6 pb-4 border-b border-gray-100">
          <div className="flex items-center gap-4">
            <button 
              onClick={closeSummary} 
              className="p-1 -ml-1 hover:bg-gray-100 rounded-lg transition-colors text-gray-800 active:scale-95"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <h2 className="text-[20px] font-bold text-gray-900 tracking-tight">
              Summary of {client?.name || 'Wendy cole'}
            </h2>
          </div>
          <p className="text-[12px] text-gray-400 mt-1 ml-9">
            Generated on March 12, 2025 at 9:41 AM
          </p>
        </div>

        {/* Content Area */}
        <div className="flex-1 overflow-y-auto p-6 pt-6">
          
          {/* Engagement Score Card */}
          <div className="p-5 border border-gray-100 rounded-2xl shadow-sm mb-8 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2 text-gray-900 font-bold">
                <Star className="w-5 h-5 text-gray-400" />
                <span>Engagement Score</span>
              </div>
              <span className="font-bold text-gray-900">8.5/10</span>
            </div>
            
            {/* Progress Bar */}
            <div className="h-2 w-full bg-gray-200 rounded-full mb-4 overflow-hidden">
              <motion.div 
                initial={{ width: 0 }}
                animate={{ width: '85%' }}
                transition={{ duration: 1.2, ease: easeOutExpo, delay: 0.2 }}
                className="h-full bg-[#5A5FF2] rounded-full"
              />
            </div>
            
            <p className="text-[13px] text-[#2ebd98] font-medium leading-relaxed">
              High engagement: Discussed budgets & property visits. Client showed strong interest in viewing properties.
            </p>
          </div>

          {/* MEL Badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-[#F8F9FB] border border-gray-100 rounded-full mb-6 text-[12px] font-bold text-gray-600 shadow-sm">
            <div className="flex items-center gap-1">
              <div className="w-4 h-4 bg-gradient-to-tr from-purple-500 to-blue-500 rounded-full flex items-center justify-center">
                <div className="w-2 h-2 bg-white rounded-full opacity-50" />
              </div>
            </div>
            MEL AI-generated summary
          </div>

          <p className="text-[14px] text-gray-900 mb-6 font-medium">
            Hi! I've analyzed their recent activity. Here's what stands out 👋
          </p>

          <div className="space-y-6 text-[14px] text-gray-700">
            {/* Section 1 */}
            <div>
              <h4 className="font-bold text-gray-900 mb-2">Key points:</h4>
              <ul className="list-disc pl-5 space-y-1 marker:text-gray-400">
                <li>Client wants a 3BHK under $850K.</li>
                <li>Prefers high-floor units with city views.</li>
                <li>Concerned about HOA fees.</li>
              </ul>
            </div>

            {/* Section 2 */}
            <div>
              <h4 className="font-bold text-gray-900 mb-1">Sentiment analysis:</h4>
              <p className="mb-2">High Interest (Urgent) — Wants to buy soon.</p>
              <ul className="list-disc pl-5 space-y-1 marker:text-gray-400">
                <li>I need to buy within the next month.</li>
                <li>Signal: Strong commitment, clear budget, ready for action.</li>
                <li>Suggested Action: Immediate follow-up, send listings ASAP.</li>
              </ul>
            </div>

            {/* Section 3 */}
            <div>
              <h4 className="font-bold text-gray-900 mb-2">Property preferences:</h4>
              <ul className="list-disc pl-5 space-y-1 marker:text-gray-400">
                <li>Focused on 3-4 bedroom homes</li>
                <li>Strong interest in North Shore area</li>
                <li>Price range: $750k-850k</li>
                <li>Must-haves: modern kitchen, good school zone</li>
                <li>Nice-to-have: home office space</li>
              </ul>
            </div>

            {/* Section 4 */}
            <div>
              <h4 className="font-bold text-gray-900 mb-1">Client persona snapshot:</h4>
              <p className="mb-1">First-Time Buyer</p>
              <ul className="list-disc pl-5 space-y-1 marker:text-gray-400">
                <li>Needs mortgage guidance.</li>
              </ul>
            </div>

            {/* Section 5 */}
            <div>
              <h4 className="font-bold text-gray-900 mb-2">Confidence vs. Doubts breakdown</h4>
              <ul className="list-disc pl-5 space-y-1 marker:text-gray-400">
                <li>What the client liked — "Prefers high-floor units"</li>
                <li>What concerns them — "Worried about HOA fees"</li>
              </ul>
            </div>

            {/* Section 6 */}
            <div className="pb-12">
              <h4 className="font-bold text-gray-900 mb-2">Suggested action items:</h4>
              <ul className="list-disc pl-5 space-y-1 marker:text-gray-400">
                <li>Send listings with city views by Friday.</li>
                <li>Schedule property visits for Saturday.</li>
                <li>Follow up on financing options next week.</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Sticky Footer Action */}
        <div className="p-6 border-t border-gray-100 bg-white/80 backdrop-blur-md">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="w-full py-3.5 bg-[#5A5FF2] text-white text-[14px] font-bold rounded-xl shadow-lg shadow-[#5A5FF2]/20 hover:bg-[#4d51d1] transition-all flex justify-center items-center gap-2"
          >
            Generate recommendations
          </motion.button>
        </div>
      </motion.div>
    </>
  );
};
