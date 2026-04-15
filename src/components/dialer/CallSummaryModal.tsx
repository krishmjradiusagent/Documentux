import * as Dialog from '@radix-ui/react-dialog';
import { motion, AnimatePresence } from 'framer-motion';
import { useCall } from '../../context/CallContext';
import { X, FileText, ChevronRight } from 'lucide-react';
import { useState, useEffect } from 'react';
import { popupSystem } from '../ui/popupSystem';

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
                className={popupSystem.overlay.soft}
              />
            </Dialog.Overlay>
            <Dialog.Content asChild>
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 20 }}
                transition={{ duration: 0.4, ease: easeOutExpo }}
                className={`${popupSystem.frame.base} ${popupSystem.frame.summary}`}
              >
                <div className={popupSystem.header.base}>
                  <div className="flex items-center gap-4">
                    <div className={popupSystem.header.iconWrap}>
                      <FileText className="h-5 w-5" />
                    </div>
                    <div>
                      <Dialog.Title className={popupSystem.header.title}>Call completed</Dialog.Title>
                      <Dialog.Description className={popupSystem.header.subtitle}>
                        <span className="h-2.5 w-2.5 rounded-full bg-radius-blue/70" />
                        With {client?.name} • {Math.floor(duration / 60)}m {duration % 60}s
                      </Dialog.Description>
                    </div>
                  </div>
                  <Dialog.Close asChild>
                    <button className={popupSystem.header.close}>
                      <X className="h-6 w-6" />
                    </button>
                  </Dialog.Close>
                </div>

                <div className="p-6">
                  <p className="text-[13px] font-bold tracking-tight text-[#2C334B]">
                    Summarize this call now?
                  </p>
                  <p className="mt-1 text-[11px] text-[#8D96AE]">
                    Auto-generate notes from the call transcript.
                  </p>
                </div>

                <div className={popupSystem.footer.base}>
                  <button onClick={handleSkip} className={popupSystem.footer.secondary}>
                    Skip
                  </button>
                  <motion.button
                    whileTap={{ scale: 0.95 }}
                    onClick={handleSummarize}
                    className={popupSystem.footer.primary}
                  >
                    Summarize
                    <ChevronRight className="h-[18px] w-[18px]" />
                  </motion.button>
                </div>
              </motion.div>
            </Dialog.Content>
          </Dialog.Portal>
        )}
      </AnimatePresence>
    </Dialog.Root>
  );
};
