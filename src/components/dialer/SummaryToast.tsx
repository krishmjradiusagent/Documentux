import { motion, AnimatePresence } from 'framer-motion';
import { useCall } from '../../context/CallContext';
import { Sparkles, CheckCircle2, X } from 'lucide-react';

const easeOutExpo = [0.19, 1, 0.22, 1] as const;

export const SummaryToast = () => {
  const { summaryStatus, viewSummary, closeSummary } = useCall();
  
  // Auto-hide when idle
  if (summaryStatus === 'idle' || summaryStatus === 'viewing') return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: 30, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95, y: 30 }}
        transition={{ duration: 0.5, ease: easeOutExpo }}
        className="fixed bottom-6 right-8 w-[380px] bg-white rounded-[20px] shadow-[0_16px_40px_-12px_rgba(0,0,0,0.15)] border border-gray-100 z-50 overflow-hidden group"
      >
        <div className="p-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className={`w-10 h-10 rounded-[12px] flex items-center justify-center transition-colors duration-500 ${
              summaryStatus === 'summarizing' ? 'bg-[#F2F6FF] text-[#5A5FF2]' : 'bg-[#EAFBF5] text-[#12B76A]'
            }`}>
              {summaryStatus === 'summarizing' ? (
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                >
                  <Sparkles className="w-5 h-5" />
                </motion.div>
              ) : (
                <motion.div
                  initial={{ scale: 0.5, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ type: "spring", stiffness: 400, damping: 25 }}
                >
                  <CheckCircle2 className="w-5 h-5" />
                </motion.div>
              )}
            </div>
            
            <div className="flex flex-col">
              <span className="text-[14px] font-bold text-gray-900 tracking-tight">
                {summaryStatus === 'summarizing' ? 'MEL is summarizing the call...' : 'Summary generated'}
              </span>
              <span className="text-[12px] font-medium text-gray-500">
                {summaryStatus === 'summarizing' ? 'This will just take a moment.' : 'Your call notes are ready.'}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {summaryStatus === 'ready' && (
              <motion.button
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={viewSummary}
                className="px-4 py-2 bg-[#5A5FF2] text-white text-[12px] font-bold rounded-lg hover:bg-[#4d51d1] transition-colors"
               >
                View
              </motion.button>
            )}
            
            {(summaryStatus === 'summarizing' || summaryStatus === 'ready') && (
              <button 
                onClick={closeSummary}
                className="p-1.5 text-gray-300 hover:text-gray-500 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>
        
        {/* Progress bar effect while summarizing */}
        {summaryStatus === 'summarizing' && (
          <motion.div 
            className="h-1 bg-[#5A5FF2] absolute bottom-0 left-0"
            initial={{ width: "0%" }}
            animate={{ width: "100%" }}
            transition={{ duration: 3, ease: easeOutExpo }}
          />
        )}
      </motion.div>
    </AnimatePresence>
  );
};
