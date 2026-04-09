import * as Dialog from '@radix-ui/react-dialog';
import { motion, AnimatePresence } from 'framer-motion';
import { useCall } from '../../context/CallContext';
import { X, FileText, ChevronRight } from 'lucide-react';
import { useState, useEffect } from 'react';

const easeOutExpo = [0.32, 0.72, 0, 1] as const;

export const CallSummaryModal = () => {
  const { status, client, duration, resetCall, generateSummary } = useCall();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (status === 'disconnected') {
      const timer = setTimeout(() => {
        setOpen(true);
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [status]);

  const handleClose = () => {
    setOpen(false);
    resetCall();
  };

  const handleSkip = () => {
    handleClose();
  };

  const handleSummarize = () => {
    generateSummary();
    handleClose();
  };

  return (
    <Dialog.Root open={open} onOpenChange={(val) => !val && handleClose()}>
      <AnimatePresence>
        {open && (
          <Dialog.Portal forceMount>
            <Dialog.Overlay asChild>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 bg-black/20 backdrop-blur-sm z-[200]"
              />
            </Dialog.Overlay>
            <Dialog.Content asChild>
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 20 }}
                transition={{ duration: 0.4, ease: easeOutExpo }}
                className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-[400px] bg-white rounded-[24px] shadow-premium p-6 z-[201] outline-none"
              >
                <div className="flex justify-between items-start mb-6">
                  <div>
                    <Dialog.Title className="text-xl font-bold text-gray-900">
                      Call Completed
                    </Dialog.Title>
                    <Dialog.Description className="text-sm text-gray-500 mt-1">
                      With {client?.name} • {Math.floor(duration/60)}m {duration%60}s
                    </Dialog.Description>
                  </div>
                  <Dialog.Close asChild>
                    <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                      <X className="w-5 h-5 text-gray-400" />
                    </button>
                  </Dialog.Close>
                </div>

                <div className="space-y-4">
                  <p className="text-sm font-medium text-gray-700">Would you like to summarize this call?</p>
                  
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={handleSummarize}
                    className="w-full flex items-center justify-between p-4 bg-radius-blue/5 border border-radius-blue/10 rounded-[16px] group transition-all"
                  >
                    <div className="flex items-center gap-3">
                      <div className="bg-radius-blue text-white p-2 rounded-xl">
                        <FileText className="w-5 h-5" />
                      </div>
                      <div className="text-left">
                        <span className="block font-semibold text-radius-blue">Summarize</span>
                        <span className="text-[11px] text-gray-500">Auto-generate notes from transcription</span>
                      </div>
                    </div>
                    <ChevronRight className="w-5 h-5 text-radius-blue opacity-50 group-hover:opacity-100 transition-opacity" />
                  </motion.button>

                  <button
                    onClick={handleSkip}
                    className="w-full py-4 text-sm font-medium text-gray-500 hover:text-gray-900 transition-colors"
                  >
                    Skip, just log it.
                  </button>
                </div>
              </motion.div>
            </Dialog.Content>
          </Dialog.Portal>
        )}
      </AnimatePresence>
    </Dialog.Root>
  );
};
